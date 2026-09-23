/**
 * Configurazione dell'applicazione (browser). Qui si "montano" tutti gli step.
 * Ispirato a:
 *  - projects/storefrontapp/src/app/app.config.ts (provideClientHydration, provideHttpClient(withFetch(), ...))
 *  - projects/storefrontapp/src/app/spartacus/spartacus-b2c-configuration.providers.ts (provideConfig({ context: ... }))
 *  - projects/storefrontapp/src/app/private/private.providers.ts (provideConfig({ backend: { occ: { baseUrl } } }))
 */
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { META_REDUCERS, provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { provideConfig } from './step01-config/config';
import { siteContextInterceptor } from './step02-site-context/site-context.interceptor';
import { provideSiteContext } from './step02-site-context/site-context.providers';
import { provideOcc } from './step03-occ-endpoints/occ.providers';
import { authInterceptor } from './step04-auth/auth.interceptor';
import { provideAuth } from './step04-auth/auth.providers';
import { provideProductData } from './step05-product-data/product-data.providers';
import { provideProductStore } from './step06-ngrx-product/product-store.providers';
import { provideConfigurableRoutes } from './step07-routing/routing.providers';
import { provideCms } from './step08-cms/cms.providers';
import { providePageLayout } from './step09-page-layout/page-layout.providers';
import { DeliveryBadgeComponent } from './step10-outlets/outlet-demo.component';
import { OutletPosition } from './step10-outlets/outlet.model';
import { provideOutlet, provideOutlets } from './step10-outlets/outlet.providers';
import { provideLazyCartFeature } from './step11-lazy-feature/lazy-feature.providers';
import { cmsTransferStateInterceptor, transferStateMetaReducerFactory } from './step12-ssr/transfer-state';

/** URL del backend OCC (il mock di examples/mock-backend ascolta su 9002). Assoluto: serve anche in SSR. */
export const OCC_BASE_URL = 'http://localhost:9002';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    // Ordine degli interceptor = ordine di esecuzione sulla richiesta.
    provideHttpClient(
      withFetch(),
      withInterceptors([siteContextInterceptor, authInterceptor, cmsTransferStateInterceptor])
    ),

    // NgRx: store radice vuoto; le feature (product) si registrano con provideState.
    provideStore(),
    { provide: META_REDUCERS, useFactory: transferStateMetaReducerFactory, multi: true }, // STEP 12

    // "Librerie" (ognuna porta i suoi default con provideDefaultConfig)
    provideSiteContext(), // STEP 02
    provideOcc(), // STEP 03
    provideAuth(), // STEP 04
    provideProductData(), // STEP 05
    provideProductStore(), // STEP 06
    provideConfigurableRoutes(), // STEP 07
    provideCms(), // STEP 08
    providePageLayout(), // STEP 09
    provideOutlets(), // STEP 10
    provideOutlet({ id: 'Summary', position: OutletPosition.AFTER, component: DeliveryBadgeComponent }),
    provideLazyCartFeature(), // STEP 11

    // Configurazione dell'APP: vince sempre sui default (STEP 01)
    provideConfig({
      backend: { occ: { baseUrl: OCC_BASE_URL } },
      context: {
        baseSite: ['electronics-spa'],
        language: ['en', 'de'],
        currency: ['USD', 'EUR'],
      },
    }),
  ],
};
