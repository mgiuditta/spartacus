/**
 * STEP 02 - Sincronizza URL <-> Site Context
 * Ispirato a: core-libs/core/src/site-context/services/site-context-routes-handler.ts (SiteContextRoutesHandler)
 *
 * 1. All'avvio legge il prefisso dall'URL corrente e imposta i valori attivi.
 * 2. Ad ogni navigazione (NavigationStart) rilegge il prefisso dall'URL di destinazione.
 * 3. Se l'utente cambia lingua/valuta da UI, riscrive l'URL (replaceState) col nuovo prefisso.
 */
import { Location } from '@angular/common';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SiteContextUrlSerializer } from './site-context-url-serializer';
import { SiteContextService } from './site-context.service';

@Injectable({ providedIn: 'root' })
export class SiteContextRoutesHandler {
  private readonly siteContext = inject(SiteContextService);
  private readonly serializer = inject(SiteContextUrlSerializer);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);

  private isNavigating = false;
  private initialized = false;

  init(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    const params = this.siteContext.getUrlEncodingParameters();
    if (!params.length) {
      return;
    }
    // 1. valori iniziali presi dall'URL (vale anche in SSR: Location legge l'URL della richiesta)
    this.setContextFromUrl(this.location.path(true));

    // 2. navigazioni successive
    const routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationStart || e instanceof NavigationEnd))
      .subscribe((event) => {
        this.isNavigating = event instanceof NavigationStart;
        if (event instanceof NavigationStart) {
          this.setContextFromUrl(event.url);
        }
      });

    // 3. cambio da UI -> aggiorno l'URL visibile senza rinavigare
    const valueSubs = params.map((param) =>
      this.siteContext.getActive(param).subscribe(() => {
        if (!this.isNavigating && this.router.navigated) {
          const tree = this.router.parseUrl(this.router.url);
          delete (tree as { siteContext?: unknown }).siteContext; // vogliamo i valori ATTIVI
          this.location.replaceState(this.router.serializeUrl(tree));
        }
      })
    );

    this.destroyRef.onDestroy(() => {
      routerSub.unsubscribe();
      valueSubs.forEach((s) => s.unsubscribe());
    });
  }

  private setContextFromUrl(url: string): void {
    const { params } = this.serializer.urlExtractContextParameters(url);
    Object.entries(params).forEach(([param, value]) => this.siteContext.setActive(param, value));
  }
}
