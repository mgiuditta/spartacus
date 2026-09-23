/**
 * STEP 08 - Dalla rotta Angular al PageContext CMS
 * Ispirato a:
 *  - core-libs/core/src/routing/store/reducers/router.reducer.ts (CustomSerializer: calcola il PageContext
 *    guardando data.pageLabel, params.productCode, l'URL per le content page)
 *  - core-libs/core/src/routing/facade/routing.service.ts         (RoutingService.getPageContext)
 *
 * Spartacus salva il PageContext nello store del router (NgRx router-store).
 * Qui lo calcoliamo direttamente dallo snapshot del router.
 */
import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, startWith } from 'rxjs/operators';
import { PageContext, PageType } from './cms.model';

export function pageContextFromSnapshot(route: ActivatedRouteSnapshot): PageContext {
  let leaf = route;
  while (leaf.firstChild) {
    leaf = leaf.firstChild;
  }
  if (leaf.data['pageType'] === PageType.PRODUCT_PAGE && leaf.params['productCode']) {
    return { id: leaf.params['productCode'], type: PageType.PRODUCT_PAGE };
  }
  if (typeof leaf.data['pageLabel'] === 'string') {
    return { id: leaf.data['pageLabel'], type: PageType.CONTENT_PAGE };
  }
  // Rotta "catch-all": l'URL stesso e' la label della ContentPage (es. /faq)
  const path = '/' + leaf.url.map((segment) => segment.path).join('/');
  return { id: path, type: PageType.CONTENT_PAGE };
}

@Injectable({ providedIn: 'root' })
export class PageContextService {
  private readonly router = inject(Router);

  readonly pageContext$: Observable<PageContext> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(undefined),
    filter(() => this.router.navigated),
    map(() => pageContextFromSnapshot(this.router.routerState.snapshot.root)),
    distinctUntilChanged((a, b) => a.id === b.id && a.type === b.type),
    shareReplay({ bufferSize: 1, refCount: false })
  );
}
