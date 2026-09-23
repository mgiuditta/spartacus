/**
 * STEP 08 - CmsService: pagina corrente, slot e dati dei componenti
 * Ispirato a:
 *  - core-libs/core/src/cms/facade/cms.service.ts (CmsService.getCurrentPage, getContentSlot,
 *    getComponentData, loadPageData/hasPage)
 *  - core-libs/core/src/cms/connectors/page/cms-page.connector.ts (CmsPageConnector.get)
 *
 * Spartacus salva pagine e componenti nello store NgRx ('cms'). Qui usiamo una cache
 * di Observable condivisi (shareReplay): stesso comportamento osservabile, meno codice.
 */
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { CURRENCY_CONTEXT_ID, LANGUAGE_CONTEXT_ID } from '../step02-site-context/site-context.config';
import { SiteContextService } from '../step02-site-context/site-context.service';
import { CmsComponent, ContentSlotData, NOT_FOUND_CONTEXT, Page, PageContext } from './cms.model';
import { CmsPageAdapter } from './occ-cms.adapter';
import { PageContextService } from './page-context';

@Injectable({ providedIn: 'root' })
export class CmsService {
  private readonly adapter = inject(CmsPageAdapter);
  private readonly siteContext = inject(SiteContextService);
  private readonly pageContextService = inject(PageContextService);

  private readonly pages = new Map<string, Observable<Page | null>>();
  private readonly components = new Map<string, BehaviorSubject<CmsComponent | undefined>>();
  private readonly requestedComponents = new Set<string>();

  /** La pagina della rotta corrente, ricaricata anche al cambio di lingua/valuta. */
  private readonly currentPage$: Observable<Page | null> = combineLatest([
    this.pageContextService.pageContext$,
    this.siteContext.getActive(LANGUAGE_CONTEXT_ID),
    this.siteContext.getActive(CURRENCY_CONTEXT_ID),
  ]).pipe(
    switchMap(([context]) => this.loadPageOrNotFound(context)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getCurrentPage(): Observable<Page | null> {
    return this.currentPage$;
  }

  getContentSlot(position: string): Observable<ContentSlotData | undefined> {
    return this.currentPage$.pipe(
      map((page) => page?.slots[position]),
      distinctUntilChanged()
    );
  }

  /**
   * Dati di un componente. Di norma arrivano gia' con la pagina; se mancano
   * li chiediamo all'endpoint 'components' (come fa Spartacus con i componenti "lazy").
   */
  getComponentData<T extends CmsComponent>(uid: string): Observable<T | undefined> {
    return this.currentPage$.pipe(
      map(() => this.componentKey(uid)),
      distinctUntilChanged(),
      switchMap((key) => {
        const subject = this.componentSubject(key);
        if (subject.value === undefined && !this.requestedComponents.has(key)) {
          this.requestedComponents.add(key);
          this.adapter
            .loadComponents([uid])
            .pipe(take(1))
            .subscribe({ next: (list) => list.forEach((c) => this.storeComponent(c)), error: () => undefined });
        }
        return subject as Observable<T | undefined>;
      })
    );
  }

  /** Carica (una volta sola per contesto+lingua+valuta) la pagina. null = pagina inesistente. */
  loadPage(context: PageContext): Observable<Page | null> {
    const key = [
      this.siteContext.getActiveValue(LANGUAGE_CONTEXT_ID),
      this.siteContext.getActiveValue(CURRENCY_CONTEXT_ID),
      context.type,
      context.id,
    ].join('|');
    let page$ = this.pages.get(key);
    if (!page$) {
      page$ = this.adapter.load(context).pipe(
        tap((structure) => structure.components.forEach((component) => this.storeComponent(component))),
        map((structure) => structure.page),
        catchError(() => of(null)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
      this.pages.set(key, page$);
    }
    return page$;
  }

  /** Come loadPage, ma se la pagina non esiste carica la pagina CMS 'notFound' (come CmsPageGuard). */
  loadPageOrNotFound(context: PageContext): Observable<Page | null> {
    return this.loadPage(context).pipe(
      switchMap((page) => (page || context.id === NOT_FOUND_CONTEXT.id ? of(page) : this.loadPage(NOT_FOUND_CONTEXT)))
    );
  }

  private storeComponent(component: CmsComponent): void {
    if (component.uid) {
      this.componentSubject(this.componentKey(component.uid)).next(component);
    }
  }

  private componentKey(uid: string): string {
    return `${this.siteContext.getActiveValue(LANGUAGE_CONTEXT_ID)}|${uid}`;
  }

  private componentSubject(key: string): BehaviorSubject<CmsComponent | undefined> {
    let subject = this.components.get(key);
    if (!subject) {
      subject = new BehaviorSubject<CmsComponent | undefined>(undefined);
      this.components.set(key, subject);
    }
    return subject;
  }
}
