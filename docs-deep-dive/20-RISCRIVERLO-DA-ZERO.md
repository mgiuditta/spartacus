# 20 - Riscriverlo da zero: mini-Spartacus in 12 step

STATO: COMPLETO

> Tutto il codice di questa guida esiste davvero ed e' compilato: si trova in
> `docs-deep-dive/examples/mini-spartacus/` (app Angular 21 standalone) e
> `docs-deep-dive/examples/mock-backend/` (backend OCC finto, vedi `21-BACKEND-MOCK.md`).
> I blocchi di codice qui sotto sono copiati 1:1 da quei file (il path e' indicato sopra ogni blocco).
> Verifiche fatte: `tsc --noEmit` a zero errori, `ng build` (con `strictTemplates`) riuscito,
> SSR provato con `curl` e flusso completo provato in un browser headless (home, prodotto, carrello, login,
> token scaduto con refresh, cambio valuta, ricerca, logout).

---

## In una frase

Spartacus e' un'app Angular in cui **quasi nulla e' scritto "fisso"**: rotte, endpoint, layout, componenti
e perfino il caricamento delle feature vengono decisi da **configurazione fusa a runtime** e da **dati CMS**
arrivati dal backend OCC; questa guida ricostruisce quei meccanismi uno alla volta in una app piccola.

## Il problema che risolve

Uno storefront e-commerce "normale" e' scritto a mano pagina per pagina: la home ha il suo componente,
la pagina prodotto il suo, e cosi' via. Con SAP Commerce questo non basta perche':

1. **Le pagine le decide il business, non lo sviluppatore.** Il CMS di SAP Commerce dice quale *template*
   usa una pagina e quali *componenti* stanno in ogni *slot*. Il frontend deve saper disegnare qualunque
   combinazione senza essere ricompilato.
2. **Lo stesso codice serve molti clienti.** Spartacus e' una libreria: ogni cliente deve poter cambiare
   un endpoint, un path, un componente, senza fare fork. Da qui: config a pezzi, token multi, outlet, facade.
3. **Il sito e' multi-sito, multi-lingua, multi-valuta.** `/electronics-spa/en/USD/...` deve funzionare
   ovunque, e ogni chiamata al backend deve portarsi dietro lingua e valuta.
4. **Deve essere veloce e indicizzabile.** Bundle iniziale piccolo (lazy loading delle feature) e
   Server-Side Rendering con protezioni (timeout, fallback CSR) perche' il backend puo' essere lento.

Riscrivendo questi pezzi in piccolo si capisce *perche'* il codice di Spartacus e' fatto cosi'.

## Come è implementato (con path)

| Step | Codice di esempio (`docs-deep-dive/examples/mini-spartacus/src/app/...`) | Originale Spartacus |
|---|---|---|
| 01 | `step01-config/config.ts`, `deep-merge.ts` | `core-libs/core/src/config/config-tokens.ts`, `config-providers.ts`, `utils/deep-merge.ts` |
| 02 | `step02-site-context/*` | `core-libs/core/src/site-context/services/site-context-url-serializer.ts`, `site-context-routes-handler.ts`, `core-libs/core/src/occ/adapters/site-context/site-context.interceptor.ts` |
| 03 | `step03-occ-endpoints/*` | `core-libs/core/src/occ/services/occ-endpoints.service.ts`, `core-libs/core/src/config/utils/string-template.ts`, `core-libs/core/src/occ/config/default-occ-config.ts` |
| 04 | `step04-auth/*` | `core-libs/core/src/auth/user-auth/http-interceptors/auth.interceptor.ts`, `services/auth-http-header.service.ts`, `facade/auth.service.ts` |
| 05 | `step05-product-data/*` | `core-libs/core/src/product/connectors/product/*`, `core-libs/core/src/occ/adapters/product/occ-product.adapter.ts`, `core-libs/core/src/util/converter.service.ts` |
| 06 | `step06-ngrx-product/*` | `core-libs/core/src/state/utils/loader/*`, `state/utils/entity-loader/*`, `core-libs/core/src/product/store/*`, `product/facade/product.service.ts` |
| 07 | `step07-routing/*` | `core-libs/core/src/routing/configurable-routes/configurable-routes.service.ts`, `url-translation/semantic-path.service.ts`, `url-translation/url.pipe.ts` |
| 08 | `step08-cms/*` | `core-libs/core/src/cms/facade/cms.service.ts`, `core-libs/core/src/occ/adapters/cms/occ-cms-page.adapter.ts`, `core-libs/storefront/cms-structure/guards/cms-page.guard.ts` |
| 09 | `step09-page-layout/*` | `core-libs/storefront/cms-structure/page/page-layout/page-layout.component.ts`, `page/slot/page-slot.component.ts`, `page/component/component-wrapper.directive.ts` |
| 10 | `step10-outlets/*` | `core-libs/storefront/cms-structure/outlet/outlet.service.ts`, `outlet.directive.ts`, `outlet-ref/outlet-ref.directive.ts`, `outlet.providers.ts` |
| 11 | `step11-lazy-feature/*` | `core-libs/core/src/lazy-loading/feature-modules.service.ts`, `lazy-loading/facade-factory/*`, `feature-libs/cart/base/root/facade/active-cart.facade.ts` |
| 12 | `step12-ssr/*`, `src/server.ts` | `core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts`, `core-libs/core/src/state/reducers/transfer-state.reducer.ts`, `projects/storefrontapp/src/server.ts` |

Struttura finale del progetto:

```text
docs-deep-dive/examples/
  .gitignore                     node_modules, dist, .angular
  mock-backend/                  server Express OCC finto (porta 9002)
  mini-spartacus/
    package.json  angular.json  tsconfig.json  tsconfig.app.json  README.md
    src/
      index.html  styles.css  main.ts  main.server.ts  server.ts
      app/
        app.component.ts  app.config.ts  app.config.server.ts  app.routes.ts
        step01-config/ ... step12-ssr/
```

## Flusso passo-passo

Cosa succede quando il browser (o il server SSR) apre `http://localhost:4000/electronics-spa/de/EUR/product/300938/x`:

1. **Bootstrap.** `bootstrapApplication` legge `app.config.ts`. Tutti i `provideDefaultConfig(...)` delle
   "librerie" e il `provideConfig(...)` dell'app sono solo provider multi: nessuno ha ancora fuso nulla. (Step 01)
2. **App initializer.** `SiteContextRoutesHandler.init()` legge l'URL: `electronics-spa`, `de`, `EUR` sono
   valori ammessi dalla config, quindi diventano i valori attivi. `ConfigurableRoutesService.init()`
   sostituisce i path segnaposto delle rotte con quelli configurati (`product/:productCode/:name`). (Step 02, 07)
   La prima `inject(Config)` fa scattare la fusione: `deepMerge({}, defaults..., app...)`.
3. **Parse dell'URL.** Il Router chiama il nostro `SiteContextUrlSerializer.parse`, che toglie il prefisso:
   il Router vede solo `/product/300938/x` e sceglie la rotta `cxRoute: 'product'`. (Step 02)
4. **Guard CMS.** `cmsPageGuard` calcola il `PageContext` `{ id: '300938', type: 'ProductPage' }` e chiede
   la pagina a `CmsService`. `OccCmsPageAdapter` costruisce l'URL con `OccEndpointsService.buildUrl('pages', ...)`:
   `http://localhost:9002/occ/v2/electronics-spa/cms/pages?fields=DEFAULT&pageType=ProductPage&code=300938`. (Step 03, 08)
5. **Interceptor.** Sulla richiesta passano in ordine: `siteContextInterceptor` (aggiunge `lang=de&curr=EUR`),
   `authInterceptor` (Bearer se loggato, refresh+retry su 401), `cmsTransferStateInterceptor` (SSR). (Step 02, 04, 12)
6. **Normalizzazione.** La risposta OCC (`contentSlots.contentSlot[].components.component[]`) diventa una
   `Page` con `slots` indicizzati per `position`; i dati dei componenti vanno nella cache di `CmsService`. (Step 08)
7. **Layout.** La rotta si attiva, `PageLayoutComponent` legge `page.template` (`ProductDetailsPageTemplate`)
   e dalla config `layoutSlots` ricava l'elenco di slot (`['Summary']`). Ogni slot e' un `cxOutlet`. (Step 09, 10)
8. **Slot e wrapper.** `PageSlotComponent` legge i componenti dello slot; per ognuno
   `ComponentWrapperDirective` cerca il mapping `cmsComponents[flexType]` e crea il componente Angular con un
   injector che contiene `CmsComponentData`. Se il componente e' dichiarato in una feature lazy
   (`ProductAddToCartComponent`), prima viene scaricato il chunk `cart-feature`. (Step 09, 11)
9. **Dati prodotto.** `ProductIntroComponent` chiede `ProductService.get('300938')`: lo store e' vuoto, quindi
   il facade lancia `LoadProduct`; l'effect chiama `ProductConnector` -> `OccProductAdapter` -> HTTP ->
   `PRODUCT_NORMALIZER` (immagini + nome) -> `LoadProductSuccess` -> reducer entity-loader. (Step 05, 06)
10. **SSR.** Sul server, quando non ci sono piu' task pendenti (HTTP, `import()` tracciato con `PendingTasks`),
    `CommonEngine` serializza l'HTML e il `TransferState` (store `product` + risposte CMS) nello
    `<script id="ng-state">`. Se il render supera `SSR_TIMEOUT`, il server risponde con `index.csr.html`
    e `Cache-Control: no-store`, e il render continua per la cache. Nel browser l'app riparte e trova i dati
    gia' pronti: **zero** chiamate al backend per la prima pagina. (Step 12)

## Codice minimo riscritto a mano

Prima di entrare negli step, ecco **il cuore dell'idea in un solo file** (circa 100 righe, compilato con
`tsc` e `ngc` in modalita' strict): configurazione a pezzi, pagina CMS da OCC, wrapper che crea componenti
Angular a partire dal `typeCode`. Tutto il resto della guida e' questo file, reso robusto e configurabile.

```ts
// mini-core.ts - il "cuore" di Spartacus in un solo file (config a chunk + CMS + wrapper dinamico)
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component, Directive, inject, Injectable, InjectionToken, Injector, Input, OnInit, Type, ValueProvider, ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

// 1) Configurazione a pezzi: ogni provider aggiunge un chunk, il token finale li fonde.
export interface MiniConfig {
  occBaseUrl?: string;
  site?: string;
  cmsComponents?: Record<string, Type<unknown>>;
}
export const CONFIG_CHUNK = new InjectionToken<MiniConfig[]>('CONFIG_CHUNK');
export const MINI_CONFIG = new InjectionToken<MiniConfig>('MINI_CONFIG', {
  providedIn: 'root',
  factory: () => Object.assign({}, ...(inject(CONFIG_CHUNK, { optional: true }) ?? [])),
});
export const provideMiniConfig = (chunk: MiniConfig): ValueProvider => ({ provide: CONFIG_CHUNK, useValue: chunk, multi: true });

// 2) CMS: pagina OCC -> slot con componenti (dati inclusi).
interface OccComponent { uid: string; typeCode: string; [key: string]: unknown }
interface OccPage { template: string; contentSlots: { contentSlot: { position: string; components: { component: OccComponent[] } }[] } }
export interface MiniPage { template: string; slots: Record<string, OccComponent[]> }

@Injectable({ providedIn: 'root' })
export class MiniCmsService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(MINI_CONFIG);

  load(label: string): Observable<MiniPage> {
    const url = `${this.config.occBaseUrl}/occ/v2/${this.config.site}/cms/pages` +
      `?pageType=ContentPage&pageLabelOrId=${encodeURIComponent(label)}`;
    return this.http.get<OccPage>(url).pipe(
      map((occ) => ({
        template: occ.template,
        slots: Object.fromEntries(occ.contentSlots.contentSlot.map((s) => [s.position, s.components.component])),
      })),
      shareReplay({ bufferSize: 1, refCount: false })
    );
  }
}

// 3) Wrapper: typeCode -> componente Angular, con i dati CMS iniettabili.
export abstract class MiniComponentData {
  abstract readonly data: OccComponent;
}

@Directive({ selector: '[miniWrapper]' })
export class MiniWrapperDirective implements OnInit {
  @Input({ required: true }) miniWrapper!: OccComponent;
  private readonly vcr = inject(ViewContainerRef);
  private readonly config = inject(MINI_CONFIG);

  ngOnInit(): void {
    const type = this.config.cmsComponents?.[this.miniWrapper.typeCode];
    if (type) {
      const injector = Injector.create({
        providers: [{ provide: MiniComponentData, useValue: { data: this.miniWrapper } }],
        parent: this.vcr.injector,
      });
      this.vcr.createComponent(type, { injector });
    }
  }
}

// 4) Pagina: tutti gli slot, nell'ordine in cui arrivano.
@Component({
  selector: 'mini-page',
  imports: [AsyncPipe, MiniWrapperDirective],
  template: `
    @if (page$ | async; as page) {
      @for (slot of slotNames(page); track slot) {
        <section [class]="slot">
          @for (c of page.slots[slot]; track c.uid) { <ng-container [miniWrapper]="c" /> }
        </section>
      }
    }
  `,
})
export class MiniPageComponent implements OnInit {
  @Input() label = 'homepage';
  private readonly cms = inject(MiniCmsService);
  page$?: Observable<MiniPage>;

  ngOnInit(): void {
    this.page$ = this.cms.load(this.label); // l'input e' disponibile solo da ngOnInit in poi
  }
  slotNames(page: MiniPage): string[] {
    return Object.keys(page.slots);
  }
}

// 5) Un componente CMS e la sua registrazione.
@Component({ selector: 'mini-paragraph', template: `<div [innerHTML]="content"></div>` })
export class MiniParagraphComponent {
  readonly content = String(inject(MiniComponentData).data['content'] ?? '');
}

export const miniProviders = [
  provideMiniConfig({ occBaseUrl: 'http://localhost:9002', site: 'electronics-spa' }),
  provideMiniConfig({ cmsComponents: { CMSParagraphComponent: MiniParagraphComponent } }),
];
```

Per provarlo: aggiungi `provideHttpClient()` e `...miniProviders` ai provider di una app vuota e metti
`<mini-page label="homepage" />` nel template radice, con il mock backend acceso.

---

## Step 0 - Il progetto: da `ng new` all'app vuota

**Obiettivo:** avere una app Angular 21 standalone, zoneless, con SSR, su cui far crescere gli step.

**File originali di riferimento:** `projects/storefrontapp/src/main.ts`, `projects/storefrontapp/src/main.server.ts`,
`projects/storefrontapp/src/app/app.config.ts`, `projects/storefrontapp/src/app/app.config.server.ts`,
`projects/storefrontapp/project.json` (target `build` con `server` e `ssr.entry`).

Si parte cosi' (oppure si copia la cartella degli esempi):

```bash
npx @angular/cli@21 new mini-spartacus --ssr --style=css --zoneless --skip-tests
cd mini-spartacus
npm install @ngrx/store@21 @ngrx/effects@21
```

`ng new --ssr` genera un `server.ts` basato su `AngularNodeAppEngine`. Noi lo sostituiamo (Step 12) con uno
basato su `CommonEngine`, come fa lo storefront di Spartacus (`projects/storefrontapp/src/server.ts`), perche'
ci serve controllare il render per implementare timeout e fallback CSR. Per questo in `angular.json` **non**
c'e' `outputMode`: e' la modalita' "ssr.entry" classica.

`examples/mini-spartacus/package.json`

```json
{
  "name": "mini-spartacus",
  "version": "0.0.0",
  "private": true,
  "description": "Mini Spartacus didattico: una storefront Angular 21 standalone che cresce in 12 step",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "serve:ssr": "node dist/mini-spartacus/server/server.mjs",
    "typecheck": "tsc --noEmit -p tsconfig.app.json"
  },
  "dependencies": {
    "@angular/common": "~21.2.0",
    "@angular/compiler": "~21.2.0",
    "@angular/core": "~21.2.0",
    "@angular/platform-browser": "~21.2.0",
    "@angular/platform-server": "~21.2.0",
    "@angular/router": "~21.2.0",
    "@angular/ssr": "~21.2.0",
    "@ngrx/effects": "~21.0.0",
    "@ngrx/store": "~21.0.0",
    "express": "^5.1.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.8.0"
  },
  "devDependencies": {
    "@angular/build": "~21.2.0",
    "@angular/cli": "~21.2.0",
    "@angular/compiler-cli": "~21.2.0",
    "@types/express": "^5.0.0",
    "@types/node": "^22.10.0",
    "typescript": "~5.9.3"
  }
}
```

`examples/mini-spartacus/angular.json`

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "mini-spartacus": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "prefix": "cx",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "outputPath": "dist/mini-spartacus",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "server": "src/main.server.ts",
            "ssr": { "entry": "src/server.ts" },
            "prerender": false,
            "tsConfig": "tsconfig.app.json",
            "styles": ["src/styles.css"]
          },
          "configurations": {
            "production": { "optimization": true, "outputHashing": "all" },
            "development": { "optimization": false, "extractLicenses": false, "sourceMap": true }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": { "buildTarget": "mini-spartacus:build:production" },
            "development": { "buildTarget": "mini-spartacus:build:development" }
          },
          "defaultConfiguration": "development"
        }
      }
    }
  },
  "cli": { "analytics": false }
}
```

`examples/mini-spartacus/tsconfig.json`

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "preserve",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "dom"]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

`examples/mini-spartacus/tsconfig.app.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist/out-tsc/app",
    "types": ["node"]
  },
  "files": ["src/main.ts", "src/main.server.ts", "src/server.ts"],
  "include": ["src/**/*.d.ts"]
}
```

`examples/mini-spartacus/src/index.html`

```html
<!doctype html>
<html lang="it">
  <head>
    <meta charset="utf-8" />
    <title>Mini Spartacus</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <cx-root></cx-root>
  </body>
</html>
```

`examples/mini-spartacus/src/main.ts`

```ts
/**
 * Avvio nel browser.
 * Ispirato a: projects/storefrontapp/src/main.ts (bootstrapApplication(AppComponent, appConfig))
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((error: unknown) => console.error(error));
```

`examples/mini-spartacus/src/main.server.ts`

```ts
/**
 * Avvio sul server: una nuova applicazione per ogni richiesta (il context arriva da CommonEngine).
 * Ispirato a: projects/storefrontapp/src/main.server.ts
 */
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
```

`examples/mini-spartacus/src/app/app.config.ts`

```ts
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
```

`examples/mini-spartacus/src/app/app.config.server.ts`

```ts
/**
 * Configurazione aggiuntiva per il server (SSR).
 * Ispirato a: projects/storefrontapp/src/app/app.config.server.ts (mergeApplicationConfig + provideServerRendering)
 */
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

`examples/mini-spartacus/src/app/app.routes.ts`

```ts
/**
 * Rotte dell'app. Le rotte con data.cxRoute hanno un path SEGNAPOSTO: il path vero
 * arriva dalla configurazione (STEP 07, ConfigurableRoutesService).
 * Ispirato a:
 *  - core-libs/storefront/cms-structure/routing/cms-route/add-cms-route.ts (rotta '**' con CmsPageGuard aggiunta all'avvio)
 *  - core-libs/storefront/cms-pages/product-details-page/product-details-page.module.ts
 *    (rotta { path: null, canActivate: [CmsPageGuard], component: PageLayoutComponent, data: { cxRoute: 'product' } })
 */
import { Route, Routes } from '@angular/router';
import { UNCONFIGURED_ROUTE_PREFIX } from './step07-routing/configurable-routes.service';
import { cmsPageGuard } from './step08-cms/cms-page.guard';
import { PageType } from './step08-cms/cms.model';
import { PageLayoutComponent } from './step09-page-layout/page-layout.component';

function cmsRoute(cxRoute: string, data: Record<string, unknown> = {}): Route {
  return {
    path: `${UNCONFIGURED_ROUTE_PREFIX}/${cxRoute}`,
    pathMatch: 'full',
    component: PageLayoutComponent,
    canActivate: [cmsPageGuard],
    runGuardsAndResolvers: 'always',
    data: { cxRoute, ...data },
  };
}

export const routes: Routes = [
  cmsRoute('home', { pageLabel: 'homepage' }),
  cmsRoute('product', { pageType: PageType.PRODUCT_PAGE }),
  cmsRoute('search', { pageLabel: 'search' }),
  cmsRoute('cart', { pageLabel: '/cart' }),
  cmsRoute('login', { pageLabel: '/login' }),
  // Tutto il resto: ContentPage CMS con label = URL (es. /faq). Se non esiste -> pagina CMS 'notFound'.
  { path: '**', component: PageLayoutComponent, canActivate: [cmsPageGuard], runGuardsAndResolvers: 'always' },
];
```

`examples/mini-spartacus/src/app/app.component.ts`

```ts
/**
 * Componente radice: header e footer guidati dal CMS, contenuto della pagina nel router-outlet.
 * Ispirato a:
 *  - core-libs/storefront/layout/main/storefront.component.ts / storefront.component.html
 *    (<cx-page-layout section="header">, <router-outlet>, <cx-page-layout section="footer">)
 *  - projects/storefrontapp/src/app/app.component.ts (<cx-storefront>)
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLayoutComponent } from './step09-page-layout/page-layout.component';
import { OutletDemoComponent } from './step10-outlets/outlet-demo.component';

@Component({
  selector: 'cx-root',
  imports: [RouterOutlet, PageLayoutComponent, OutletDemoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <cx-page-layout section="header" />
    </header>
    <main>
      <router-outlet />
    </main>
    <footer>
      <cx-page-layout section="footer" />
    </footer>
    <!-- STEP 10: registra template sugli outlet (non disegna nulla qui) -->
    <cx-outlet-demo />
  `,
})
export class AppComponent {}
```

`examples/mini-spartacus/src/styles.css`

```css
/* Stili minimi: Spartacus usa @spartacus/styles (SCSS), qui bastano poche regole. */
body { font-family: system-ui, sans-serif; margin: 0; color: #1d2d3e; }
header .header { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; padding: 0.5rem 1rem; background: #0a2e5c; color: #fff; }
header a, header label { color: #fff; }
main { padding: 1rem; min-height: 60vh; }
footer { padding: 1rem; background: #eef2f6; }
.carousel { display: flex; gap: 1rem; list-style: none; padding: 0; flex-wrap: wrap; }
.carousel li { border: 1px solid #ccd; padding: 0.5rem; width: 170px; }
.carousel a { display: flex; flex-direction: column; }
.promo-bar { background: #ffd54f; padding: 0.25rem 1rem; text-align: center; }
.error { color: #b00020; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
```

**Punti chiave:**

- `provideZonelessChangeDetection()`: niente zone.js. Il rendering si aggiorna grazie ad `async` pipe e signal.
  Spartacus usa ancora zone.js (`"polyfills": ["zone.js"]` in `projects/storefrontapp/project.json`).
- `provideHttpClient(withFetch(), withInterceptors([...]))`: interceptor **funzionali**, eseguiti nell'ordine
  dell'array. Spartacus usa `withInterceptorsFromDi()` e interceptor a classe registrati con `HTTP_INTERCEPTORS`.
- Ogni step ha una funzione `provideXxx()` che restituisce `EnvironmentProviders`: e' l'equivalente standalone
  dei `XxxModule.forRoot()` di Spartacus.
- `provideConfig({...})` dell'app e' **l'ultimo** e contiene solo cio' che e' specifico del progetto.
- `app.routes.ts`: le rotte "con nome" hanno un path segnaposto `__cx-unconfigured__/...` che non combacia mai;
  `runGuardsAndResolvers: 'always'` fa rieseguire la guard CMS anche quando cambia solo l'URL della rotta `**`.

**Come testarlo:** `npm install && npm run build` deve terminare senza errori.

---

## Step 01 - Configurazione a pezzi con deep merge

**Obiettivo:** ogni parte dell'app (step, feature, cliente) aggiunge un **pezzo** di configurazione; all'avvio
i pezzi vengono fusi in profondita' e i valori dell'app vincono sui default delle librerie.

**File originali Spartacus:**
- `core-libs/core/src/config/config-tokens.ts` - `Config`, `ConfigChunk`, `DefaultConfigChunk`, `RootConfig`, `DefaultConfig`, `configFactory`
- `core-libs/core/src/config/config-providers.ts` - `provideConfig`, `provideDefaultConfig`, `provideConfigFactory`
- `core-libs/core/src/config/utils/deep-merge.ts` - `deepMerge`, `isObject`

`examples/mini-spartacus/src/app/step01-config/deep-merge.ts`

```ts
/**
 * STEP 01 - deepMerge
 * Ispirato a: core-libs/core/src/config/utils/deep-merge.ts (funzioni isObject, deepMerge)
 *
 * Unisce "in profondita'" piu' oggetti nel primo (target).
 * - Gli oggetti annidati vengono fusi chiave per chiave.
 * - Array, stringhe, numeri, funzioni e classi vengono SOSTITUITI (vince l'ultimo).
 * - Le chiavi pericolose (__proto__, constructor) vengono ignorate (prototype pollution).
 */
export type PlainObject = Record<string, unknown>;

export function isObject(item: unknown): item is PlainObject {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}

function isRestricted(key: string): boolean {
  return key === '__proto__' || key === 'constructor';
}

export function deepMerge<T extends object>(target: T, ...sources: unknown[]): T {
  const result = target as unknown as PlainObject;
  for (const source of sources) {
    if (!isObject(source)) {
      continue; // null, undefined, array: saltati come in Spartacus
    }
    for (const key of Object.keys(source)) {
      if (isRestricted(key)) {
        continue;
      }
      const value = source[key];
      if (value instanceof Date) {
        result[key] = value;
      } else if (isObject(value)) {
        if (!isObject(result[key])) {
          result[key] = {};
        }
        deepMerge(result[key] as PlainObject, value);
      } else {
        result[key] = value;
      }
    }
  }
  return target;
}
```

`examples/mini-spartacus/src/app/step01-config/config.ts`

```ts
/**
 * STEP 01 - Sistema di configurazione
 * Ispirato a:
 *  - core-libs/core/src/config/config-tokens.ts   (Config, ConfigChunk, DefaultConfigChunk, RootConfig, DefaultConfig)
 *  - core-libs/core/src/config/config-providers.ts (provideConfig, provideDefaultConfig, provideConfigFactory)
 *
 * Idea: ogni libreria/feature registra un PEZZO ("chunk") di configurazione con un
 * token multi. All'avvio tutti i pezzi vengono fusi con deepMerge:
 *   Config finale = deepMerge({}, ...defaultChunks, ...rootChunks)
 * I "default" (scritti dalle librerie) perdono sempre contro i "root" (scritti dall'app).
 */
import { FactoryProvider, inject, Injectable, InjectionToken, ValueProvider } from '@angular/core';
import { deepMerge } from './deep-merge';

/**
 * La configurazione globale. E' una classe astratta usata come token DI:
 * `inject(Config)` restituisce l'oggetto fuso.
 *
 * E' VUOTA di proposito: ogni step la estende con il "declaration merging" di TypeScript:
 *   declare module '../step01-config/config' { interface Config extends OccConfig {} }
 * Esattamente come fa Spartacus (es. core-libs/core/src/occ/config/occ-config.ts).
 */
@Injectable({
  providedIn: 'root',
  useFactory: () => deepMerge({}, inject(DefaultConfig), inject(RootConfig)),
})
export abstract class Config {}

/** Pezzi di configurazione scritti dall'APPLICAZIONE (priorita' alta). */
export const ConfigChunk = new InjectionToken<Config[]>('ConfigurationChunk');

/** Pezzi di configurazione di DEFAULT scritti dalle librerie/feature (priorita' bassa). */
export const DefaultConfigChunk = new InjectionToken<Config[]>('DefaultConfigurationChunk');

/** Tutti i default fusi insieme. */
export const DefaultConfig = new InjectionToken<Config>('DefaultConfiguration', {
  providedIn: 'root',
  factory: () => deepMerge({}, ...(inject(DefaultConfigChunk, { optional: true }) ?? [])),
});

/** Tutti i chunk dell'app fusi insieme. */
export const RootConfig = new InjectionToken<Config>('RootConfiguration', {
  providedIn: 'root',
  factory: () => deepMerge({}, ...(inject(ConfigChunk, { optional: true }) ?? [])),
});

/** Registra un pezzo di configurazione dell'app (o di default se defaultConfig = true). */
export function provideConfig(config: Config = {}, defaultConfig = false): ValueProvider {
  return { provide: defaultConfig ? DefaultConfigChunk : ConfigChunk, useValue: config, multi: true };
}

/** Registra un pezzo di configurazione di default (usato dalle "librerie"). */
export function provideDefaultConfig(config: Config = {}): ValueProvider {
  return { provide: DefaultConfigChunk, useValue: config, multi: true };
}

/**
 * Come provideConfig ma calcolato da una factory eseguita in contesto di injection
 * (quindi dentro la factory si puo' usare inject()).
 */
export function provideConfigFactory(factory: () => Config, defaultConfig = false): FactoryProvider {
  return { provide: defaultConfig ? DefaultConfigChunk : ConfigChunk, useFactory: factory, multi: true };
}
```

**Spiegazione riga per riga dei punti chiave:**

- `isObject(item)`: vero solo per oggetti "semplici". Gli array **non** vengono fusi ma sostituiti: se un default
  ha `urlParameters: ['baseSite','language','currency']` e l'app scrive `urlParameters: ['baseSite']`, vince
  l'array dell'app intero. E' voluto: fondere array di path o di lingue creerebbe risultati imprevedibili.
- `isRestricted(key)`: salta `__proto__` e `constructor`. Una config puo' arrivare da fonti esterne
  (meta tag, backend): senza questo controllo `deepMerge` sarebbe una porta per la *prototype pollution*.
- `value instanceof Date`: le date si copiano per riferimento (altrimenti verrebbero trasformate in `{}`).
- `@Injectable({ providedIn: 'root', useFactory: ... }) export abstract class Config {}`: una classe astratta
  usata come token. Chi fa `inject(Config)` riceve l'oggetto fuso. E' `abstract` perche' nessuno deve fare `new Config()`.
- `useFactory: () => deepMerge({}, inject(DefaultConfig), inject(RootConfig))`: prima tutti i default, poi tutta
  l'app. Il primo argomento `{}` e' importante: `deepMerge` **modifica** il target, e non vogliamo sporcare i chunk.
- `ConfigChunk` / `DefaultConfigChunk`: token **multi**. Angular raccoglie in un array tutti i provider con quel
  token, nell'ordine in cui sono registrati. Per questo `provideConfig` dell'app va messo dopo le librerie se due
  chunk "app" toccano la stessa chiave.
- `inject(ConfigChunk, { optional: true }) ?? []`: se nessuno ha registrato chunk, niente errore.
- **Declaration merging:** ogni step fa `declare module '../step01-config/config' { interface Config extends OccConfig {} }`.
  TypeScript unisce l'interfaccia alla classe astratta: da quel momento `config.backend?.occ?.baseUrl` e' tipizzato,
  senza che `config.ts` conosca gli step. E' esattamente il trucco usato in `core-libs/core/src/occ/config/occ-config.ts`.
- `provideConfigFactory(factory)`: utile quando il valore dipende da altri servizi (la factory gira in contesto di
  injection, quindi puo' usare `inject()`).

**Come testarlo:**

1. Aggiungi temporaneamente in `AppComponent` il campo pubblico `readonly debug = console.log(inject(Config));`
   (import di `inject` da `@angular/core` e di `Config` da `./step01-config/config`) e avvia `npm start`.
2. Verifica che `backend.occ.prefix` sia `/occ/v2/` (default dello Step 03) e `backend.occ.baseUrl` sia
   `http://localhost:9002` (dall'app): due chunk diversi, fusi nello stesso oggetto.
3. Aggiungi in `app.config.ts` un secondo `provideConfig({ context: { language: ['de'] } })`: la lingua di default diventa `de`.

**Differenze rispetto a Spartacus reale:**

- Spartacus ha anche `ConfigInitializer` (config caricata in modo asincrono prima dell'avvio, ad esempio da
  `/basesites`, vedi `core-libs/core/src/config/config-initializer/config-initializer.ts`) e `ConfigValidator`
  (controlli in dev mode). Qui non servono.
- In Spartacus `Config` e' anche la base di molte classi astratte di config (`OccConfig`, `SiteContextConfig`...)
  registrate con `useExisting: Config`, cosi' si possono iniettare in modo tipizzato. Qui iniettiamo sempre `Config`.
- Spartacus supporta config "da meta tag" (`provideConfigFromMetaTags`, `core-libs/core/src/occ/config/config-from-meta-tag-factory.ts`)
  per cambiare `baseUrl` senza ricompilare.

---

## Step 02 - Site context: baseSite, lingua e valuta nell'URL

**Obiettivo:** l'URL `/electronics-spa/en/USD/product/123` deve funzionare senza che le rotte conoscano il
prefisso; cambiare lingua deve aggiornare l'URL; ogni chiamata OCC deve avere `?lang=..&curr=..`.

**File originali Spartacus:**
- `core-libs/core/src/site-context/config/site-context-config.ts` - `SiteContextConfig`
- `core-libs/core/src/site-context/services/site-context-params.service.ts` - `SiteContextParamsService`
- `core-libs/core/src/site-context/services/site-context-url-serializer.ts` - `SiteContextUrlSerializer`
- `core-libs/core/src/site-context/services/site-context-routes-handler.ts` - `SiteContextRoutesHandler`
- `core-libs/core/src/occ/adapters/site-context/site-context.interceptor.ts` - `SiteContextInterceptor`

`examples/mini-spartacus/src/app/step02-site-context/site-context.config.ts`

```ts
/**
 * STEP 02 - Configurazione del Site Context
 * Ispirato a:
 *  - core-libs/core/src/site-context/config/site-context-config.ts (SiteContextConfig + declare module)
 *  - core-libs/core/src/site-context/providers/context-ids.ts      (BASE_SITE_CONTEXT_ID, ...)
 *  - core-libs/core/src/site-context/config/context-config-utils.ts (getContextParameterDefault)
 */
import { Config } from '../step01-config/config';

export const BASE_SITE_CONTEXT_ID = 'baseSite';
export const LANGUAGE_CONTEXT_ID = 'language';
export const CURRENCY_CONTEXT_ID = 'currency';

export interface SiteContextConfig {
  context?: {
    /** Quali parametri finiscono nel prefisso dell'URL e in che ordine: /electronics-spa/en/USD/... */
    urlParameters?: string[];
    /** Valori ammessi per ogni parametro. Il PRIMO e' il default. */
    [contextName: string]: string[] | undefined;
  };
}

// Declaration merging: da ora Config "conosce" anche la sezione context.
declare module '../step01-config/config' {
  interface Config extends SiteContextConfig {}
}

export const defaultSiteContextConfig: SiteContextConfig = {
  context: {
    urlParameters: [BASE_SITE_CONTEXT_ID, LANGUAGE_CONTEXT_ID, CURRENCY_CONTEXT_ID],
  },
};

/** Primo valore configurato = valore di default (come getContextParameterDefault). */
export function getContextParameterDefault(config: Config, param: string): string | undefined {
  return config.context?.[param]?.[0];
}
```

`examples/mini-spartacus/src/app/step02-site-context/site-context.service.ts`

```ts
/**
 * STEP 02 - Stato del Site Context (baseSite, language, currency)
 * Ispirato a:
 *  - core-libs/core/src/site-context/services/site-context-params.service.ts (SiteContextParamsService)
 *  - core-libs/core/src/site-context/facade/language.service.ts / currency.service.ts / base-site.service.ts
 *
 * Spartacus tiene questi valori nello store NgRx e ha un servizio per parametro.
 * Qui usiamo un solo servizio con un BehaviorSubject per parametro: piu' semplice, stessa API.
 */
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Config } from '../step01-config/config';
import { getContextParameterDefault } from './site-context.config';

@Injectable({ providedIn: 'root' })
export class SiteContextService {
  private readonly config = inject(Config);
  private readonly state = new Map<string, BehaviorSubject<string>>();

  /** Parametri da codificare nell'URL, es. ['baseSite', 'language', 'currency']. */
  getUrlEncodingParameters(): string[] {
    return this.config.context?.urlParameters ?? [];
  }

  /** Valori ammessi per un parametro (dalla config). */
  getValues(param: string): string[] {
    return this.config.context?.[param] ?? [];
  }

  /** Valore attivo, in modo sincrono (utile negli interceptor e nel serializer). */
  getActiveValue(param: string): string {
    return this.subject(param).value;
  }

  /** Valore attivo come stream: emette ad ogni cambio. */
  getActive(param: string): Observable<string> {
    return this.subject(param).pipe(distinctUntilChanged());
  }

  /** Cambia il valore attivo. I valori non ammessi vengono ignorati (come isValid() in Spartacus). */
  setActive(param: string, value: string): void {
    if (this.getValues(param).includes(value)) {
      this.subject(param).next(value);
    }
  }

  private subject(param: string): BehaviorSubject<string> {
    let subject = this.state.get(param);
    if (!subject) {
      subject = new BehaviorSubject<string>(getContextParameterDefault(this.config, param) ?? '');
      this.state.set(param, subject);
    }
    return subject;
  }
}
```

`examples/mini-spartacus/src/app/step02-site-context/site-context-url-serializer.ts`

```ts
/**
 * STEP 02 - URL con prefisso di contesto: /electronics-spa/en/USD/product/123
 * Ispirato a: core-libs/core/src/site-context/services/site-context-url-serializer.ts (SiteContextUrlSerializer)
 *
 * Il Router di Angular usa un UrlSerializer per passare da stringa a UrlTree e viceversa.
 * Noi lo estendiamo:
 *  - parse():     toglie il prefisso (/electronics-spa/en/USD) e lo salva in tree.siteContext
 *  - serialize(): rimette davanti il prefisso con i valori attivi
 * Cosi' le rotte dell'app NON devono sapere nulla del prefisso.
 */
import { inject, Injectable } from '@angular/core';
import { DefaultUrlSerializer, UrlTree } from '@angular/router';
import { SiteContextService } from './site-context.service';

export interface SiteContextUrlParams {
  [name: string]: string;
}

export interface UrlTreeWithSiteContext extends UrlTree {
  siteContext?: SiteContextUrlParams;
}

@Injectable({ providedIn: 'root' })
export class SiteContextUrlSerializer extends DefaultUrlSerializer {
  private readonly siteContext = inject(SiteContextService);
  /** Divide l'URL in path e parte query/fragment. */
  private readonly URL_SPLIT = /(^[^#?]*)(.*)/;

  override parse(url: string): UrlTreeWithSiteContext {
    const { url: shortUrl, params } = this.urlExtractContextParameters(url);
    const tree = super.parse(shortUrl) as UrlTreeWithSiteContext;
    tree.siteContext = params;
    return tree;
  }

  override serialize(tree: UrlTreeWithSiteContext): string {
    const params = tree.siteContext ?? {};
    const url = super.serialize(tree);
    const prefix = this.siteContext
      .getUrlEncodingParameters()
      .map((param) => params[param] ?? this.siteContext.getActiveValue(param))
      .filter((value) => !!value)
      .join('/');
    return prefix ? `/${prefix}${url === '/' ? '' : url}` : url;
  }

  /**
   * Riconosce i parametri nei primi segmenti. Un segmento e' accettato solo se
   * e' tra i valori configurati; altrimenti si passa al parametro successivo
   * (stesso algoritmo "a due indici" di Spartacus).
   */
  urlExtractContextParameters(url: string): { url: string; params: SiteContextUrlParams } {
    const [, pathPart = '', queryPart = ''] = this.URL_SPLIT.exec(url) ?? [];
    const segments = pathPart.split('/');
    if (segments[0] === '') {
      segments.shift();
    }
    const names = this.siteContext.getUrlEncodingParameters();
    const params: SiteContextUrlParams = {};
    let paramIndex = 0;
    let segmentIndex = 0;
    while (paramIndex < names.length && segmentIndex < segments.length) {
      const name = names[paramIndex];
      if (this.siteContext.getValues(name).includes(segments[segmentIndex])) {
        params[name] = segments[segmentIndex];
        segmentIndex++;
      }
      paramIndex++;
    }
    return { url: '/' + segments.slice(segmentIndex).join('/') + queryPart, params };
  }
}
```

`examples/mini-spartacus/src/app/step02-site-context/site-context-routes-handler.ts`

```ts
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
```

`examples/mini-spartacus/src/app/step02-site-context/site-context.interceptor.ts`

```ts
/**
 * STEP 02 - Aggiunge ?lang=..&curr=.. a tutte le chiamate OCC
 * Ispirato a: core-libs/core/src/occ/adapters/site-context/site-context.interceptor.ts (SiteContextInterceptor)
 *
 * Nota: usa OccEndpointsService (STEP 03) per sapere qual e' la base URL OCC,
 * esattamente come l'originale. Le chiamate verso altri host non vengono toccate.
 */
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OccEndpointsService } from '../step03-occ-endpoints/occ-endpoints.service';
import { CURRENCY_CONTEXT_ID, LANGUAGE_CONTEXT_ID } from './site-context.config';
import { SiteContextService } from './site-context.service';

export const siteContextInterceptor: HttpInterceptorFn = (request, next) => {
  const siteContext = inject(SiteContextService);
  const occEndpoints = inject(OccEndpointsService);

  if (request.url.includes(occEndpoints.getBaseUrl())) {
    request = request.clone({
      setParams: {
        lang: siteContext.getActiveValue(LANGUAGE_CONTEXT_ID),
        curr: siteContext.getActiveValue(CURRENCY_CONTEXT_ID),
      },
    });
  }
  return next(request);
};
```

`examples/mini-spartacus/src/app/step02-site-context/site-context.providers.ts`

```ts
/**
 * STEP 02 - Provider del Site Context
 * Ispirato a:
 *  - core-libs/core/src/site-context/site-context.module.ts (SiteContextModule.forRoot)
 *  - core-libs/core/src/site-context/providers/site-context-params-providers.ts (UrlSerializer + initializer)
 */
import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { provideDefaultConfig } from '../step01-config/config';
import { defaultSiteContextConfig } from './site-context.config';
import { SiteContextRoutesHandler } from './site-context-routes-handler';
import { SiteContextUrlSerializer } from './site-context-url-serializer';

export function provideSiteContext(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideDefaultConfig(defaultSiteContextConfig),
    // Il Router usera' il NOSTRO serializer (che conosce il prefisso di contesto).
    { provide: UrlSerializer, useExisting: SiteContextUrlSerializer },
    // Prima della navigazione iniziale leggiamo baseSite/lingua/valuta dall'URL.
    provideAppInitializer(() => inject(SiteContextRoutesHandler).init()),
  ]);
}
```

**Spiegazione riga per riga dei punti chiave:**

- `context.urlParameters`: **l'ordine conta**. `['baseSite','language','currency']` significa che il primo
  segmento viene provato come baseSite, il secondo come lingua, ecc.
- `getContextParameterDefault`: il **primo** valore della lista e' il default. Per questo in `app.config.ts`
  scriviamo `language: ['en', 'de']`: `en` e' il default.
- `SiteContextService.subject(param)`: crea il `BehaviorSubject` al primo uso, col valore di default. Un
  `BehaviorSubject` ha sempre un valore: serve perche' serializer e interceptor leggono in modo **sincrono**.
- `setActive` ignora i valori non ammessi: se qualcuno scrive `/xx/` nell'URL non si rompe nulla.
- `SiteContextUrlSerializer extends DefaultUrlSerializer`: e' il punto magico. Il Router chiama `parse()` per ogni
  URL in ingresso e `serialize()` per ogni link generato (`routerLink`, `navigate`).
- `urlExtractContextParameters`: algoritmo a due indici. Se `segments[0]` non e' un baseSite valido, si passa a
  controllare lo stesso segmento come lingua. Cosi' `/en/cart` funziona anche senza baseSite nell'URL.
- `tree.siteContext = params`: salviamo i valori letti dentro l'`UrlTree` (proprieta' custom).
- `serialize`: `params[param] ?? getActiveValue(param)`: se l'albero non porta valori (link generati dall'app)
  si usano quelli attivi. Risultato: **tutti** i link generati contengono il prefisso giusto.
- `SiteContextRoutesHandler.init`: gira in un `provideAppInitializer`, prima della navigazione iniziale. Legge
  `location.path(true)` (in SSR e' l'URL della richiesta).
- `NavigationStart` -> `setContextFromUrl(event.url)`: se l'utente incolla un URL con altra lingua, la lingua cambia.
- `getActive(param).subscribe(...)` -> `location.replaceState(...)`: quando l'utente sceglie EUR dalla tendina,
  l'URL visibile cambia in `/electronics-spa/en/EUR/...` **senza** rinavigare. `delete tree.siteContext` forza
  l'uso dei valori attivi (altrimenti ritroveremmo quelli vecchi letti dall'URL).
- `siteContextInterceptor`: `request.url.includes(occEndpoints.getBaseUrl())` limita l'aggiunta di `lang`/`curr`
  alle chiamate OCC del sito corrente (non al token endpoint, non a host esterni).
- `{ provide: UrlSerializer, useExisting: SiteContextUrlSerializer }`: sostituisce il serializer di default del Router.

**Come testarlo:**

1. Apri `http://localhost:4200/electronics-spa/de/EUR/`: nei tab Network le chiamate OCC hanno `lang=de&curr=EUR`
   e i prezzi sono in euro.
2. Apri `http://localhost:4200/`: l'URL resta `/`, ma tutti i link della pagina iniziano con `/electronics-spa/en/USD`.
3. Cambia valuta dalla tendina: l'URL cambia senza ricaricare la pagina e i prezzi si aggiornano.

**Differenze rispetto a Spartacus reale:**

- Spartacus tiene lingua, valuta e baseSite nello **store NgRx** (`core-libs/core/src/site-context/store/`), con
  un servizio per parametro (`LanguageService`, `CurrencyService`, `BaseSiteService`) collegati tramite
  `ContextServiceMap` (`core-libs/core/src/site-context/providers/context-service-map.ts`).
- Spartacus persiste lingua e valuta nel browser (`LanguageStatePersistenceService`, `CurrencyStatePersistenceService`).
- Se `context.baseSite` non e' configurato, Spartacus carica la config del contesto da `GET /basesites`
  (`SiteContextConfigInitializer`, scelta del sito tramite `urlPatterns`). Qui la config e' statica.
- Il nostro interceptor e' funzionale; quello di Spartacus e' una classe che si iscrive ai servizi in costruzione.

---

## Step 03 - OccEndpointsService: endpoint da configurazione

**Obiettivo:** nessun URL scritto a mano nei servizi. Il codice chiede `buildUrl('product', {...})` e riceve
l'URL completo: host + prefisso + baseSite + template risolto + query.

**File originali Spartacus:**
- `core-libs/core/src/occ/services/occ-endpoints.service.ts` - `OccEndpointsService.buildUrl`, `getBaseUrl`, `getRawEndpointValue`
- `core-libs/core/src/config/utils/string-template.ts` - `StringTemplate.resolve`
- `core-libs/core/src/occ/utils/occ-url-util.ts` - `urlPathJoin`
- `core-libs/core/src/occ/config/default-occ-config.ts` - `prefix: '/occ/v2/'`
- `core-libs/core/src/occ/adapters/product/default-occ-product-config.ts` - endpoint `product` con scope `default`, `list`, `details`...

`examples/mini-spartacus/src/app/step03-occ-endpoints/occ-config.ts`

```ts
/**
 * STEP 03 - Configurazione OCC ed endpoint di default
 * Ispirato a:
 *  - core-libs/core/src/occ/config/occ-config.ts          (OccConfig + declare module)
 *  - core-libs/core/src/occ/config/default-occ-config.ts  (prefix '/occ/v2/')
 *  - core-libs/core/src/occ/occ-models/occ-endpoints.model.ts (OccEndpoint, DEFAULT_SCOPE)
 *  - core-libs/core/src/occ/adapters/product/default-occ-product-config.ts (endpoint product con scope)
 *  - core-libs/core/src/occ/adapters/site-context/default-occ-site-context-config.ts
 *  - core-libs/core/src/cms/config/default-cms-config.ts
 *  - feature-libs/cart/base/occ/config/default-occ-cart-config-factory.ts
 */
export const DEFAULT_SCOPE = 'default';

/** Un endpoint puo' essere una stringa o una mappa scope -> stringa (scope = diversi "fields"). */
export interface OccEndpoint {
  [scope: string]: string;
}

export interface OccEndpoints {
  [endpointName: string]: string | OccEndpoint;
}

export interface OccConfig {
  backend?: {
    occ?: {
      /** Es. 'http://localhost:9002'. Vuoto = stesso host dell'app. */
      baseUrl?: string;
      /** Es. '/occ/v2/'. */
      prefix?: string;
      endpoints?: OccEndpoints;
    };
    media?: {
      /** Base per le immagini; se assente si usa backend.occ.baseUrl. */
      baseUrl?: string;
    };
  };
}

declare module '../step01-config/config' {
  interface Config extends OccConfig {}
}

export const defaultOccConfig: OccConfig = {
  backend: {
    occ: {
      prefix: '/occ/v2/',
      endpoints: {
        baseSites: 'basesites?fields=FULL',
        languages: 'languages',
        currencies: 'currencies',
        // Endpoint con SCOPE: stesso URL, "fields" diversi a seconda di quanto dato serve.
        product: {
          default: 'products/${productCode}?fields=DEFAULT,description,images(FULL),stock(FULL),categories(FULL)',
          list: 'products/${productCode}?fields=code,name,summary,price(formattedValue),images(DEFAULT)',
        },
        productSearch:
          'products/search?fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL)),pagination(DEFAULT),freeTextSearch',
        // In Spartacus 2611 i CMS endpoint sono 'users/${userId}/cms/pages': qui la forma classica.
        pages: 'cms/pages?fields=DEFAULT',
        page: 'cms/pages/${id}?fields=DEFAULT',
        components: 'cms/components?fields=DEFAULT',
        user: 'users/${userId}',
        carts: 'users/${userId}/carts?fields=DEFAULT',
        cart: 'users/${userId}/carts/${cartId}?fields=DEFAULT',
        createCart: 'users/${userId}/carts?fields=DEFAULT',
        addEntries: 'users/${userId}/carts/${cartId}/entries',
        updateEntries: 'users/${userId}/carts/${cartId}/entries/${entryNumber}',
        removeEntries: 'users/${userId}/carts/${cartId}/entries/${entryNumber}',
      },
    },
  },
};
```

`examples/mini-spartacus/src/app/step03-occ-endpoints/url-utils.ts`

```ts
/**
 * STEP 03 - Utility per costruire gli URL
 * Ispirato a:
 *  - core-libs/core/src/config/utils/string-template.ts (StringTemplate.resolve)
 *  - core-libs/core/src/occ/utils/occ-url-util.ts       (urlPathJoin)
 */

/** Sostituisce ${nome} con il valore (codificato per URL) di templateVariables[nome]. */
export function resolveTemplate(template: string, variables: Record<string, unknown>, encode = true): string {
  let result = template;
  for (const [name, value] of Object.entries(variables)) {
    const placeholder = new RegExp('\\$\\{' + name + '\\}', 'g');
    const text = String(value ?? '');
    result = result.replace(placeholder, encode ? encodeURIComponent(text) : text);
  }
  return result;
}

/** Unisce pezzi di URL con un solo '/' tra l'uno e l'altro, tenendo lo '/' iniziale e finale. */
export function urlPathJoin(...parts: (string | undefined)[]): string {
  const present = parts.filter((part): part is string => !!part);
  if (!present.length) {
    return '';
  }
  const cleaned = present.map((part) => part.replace(/^\/+/, '').replace(/\/+$/, '')).filter((p) => p.length);
  let joined = cleaned.join('/');
  if (present[0].startsWith('/')) {
    joined = '/' + joined;
  }
  if (present[present.length - 1].endsWith('/') && present.length > 1) {
    joined += '/';
  }
  return joined;
}
```

`examples/mini-spartacus/src/app/step03-occ-endpoints/occ-endpoints.service.ts`

```ts
/**
 * STEP 03 - OccEndpointsService: da "nome endpoint" a URL completo
 * Ispirato a: core-libs/core/src/occ/services/occ-endpoints.service.ts
 *   (OccEndpointsService.buildUrl, getBaseUrl, getRawEndpointValue, getEndpointForScope)
 *
 * buildUrl('product', { urlParams: { productCode: '300938' }, scope: 'list' })
 *   -> http://localhost:9002/occ/v2/electronics-spa/products/300938?fields=code,name,...
 */
import { HttpParams } from '@angular/common/http';
import { inject, Injectable, isDevMode } from '@angular/core';
import { Config } from '../step01-config/config';
import { BASE_SITE_CONTEXT_ID } from '../step02-site-context/site-context.config';
import { SiteContextService } from '../step02-site-context/site-context.service';
import { DEFAULT_SCOPE } from './occ-config';
import { resolveTemplate, urlPathJoin } from './url-utils';

export interface DynamicAttributes {
  /** Valori per i segnaposto ${...} nel path. */
  urlParams?: Record<string, unknown>;
  /** Parametri di query aggiuntivi (undefined = ignorato, null = rimosso). */
  queryParams?: Record<string, string | number | boolean | null | undefined>;
  /** Variante dell'endpoint (es. 'list' vs 'default'): cambia i "fields" richiesti. */
  scope?: string;
}

export interface BaseOccUrlProperties {
  baseUrl?: boolean;
  prefix?: boolean;
  baseSite?: boolean;
}

@Injectable({ providedIn: 'root' })
export class OccEndpointsService {
  private readonly config = inject(Config);
  private readonly siteContext = inject(SiteContextService);

  /** http://host + /occ/v2/ + baseSite attivo. Ogni pezzo si puo' omettere. */
  getBaseUrl(props: BaseOccUrlProperties = { baseUrl: true, prefix: true, baseSite: true }): string {
    const occ = this.config.backend?.occ;
    const baseUrl = props.baseUrl === false ? '' : (occ?.baseUrl ?? '');
    const prefix = props.prefix === false ? '' : (occ?.prefix ?? '');
    const baseSite = props.baseSite === false ? '' : this.siteContext.getActiveValue(BASE_SITE_CONTEXT_ID);
    return urlPathJoin(baseUrl, prefix, baseSite);
  }

  /** Il template grezzo configurato, per lo scope richiesto. */
  getRawEndpointValue(endpoint: string, scope?: string): string {
    const value = this.config.backend?.occ?.endpoints?.[endpoint];
    if (typeof value === 'string') {
      return value;
    }
    if (scope && value?.[scope]) {
      return value[scope];
    }
    if (scope && isDevMode()) {
      console.warn(`${endpoint} endpoint configuration missing for scope "${scope}"`);
    }
    // fallback: scope di default, altrimenti il nome stesso dell'endpoint
    return value?.[DEFAULT_SCOPE] ?? endpoint;
  }

  buildUrl(endpoint: string, attributes: DynamicAttributes = {}, omit?: BaseOccUrlProperties): string {
    let url = this.getRawEndpointValue(endpoint, attributes.scope);

    if (attributes.urlParams) {
      url = resolveTemplate(url, attributes.urlParams, true);
    }

    if (attributes.queryParams) {
      // I parametri gia' presenti nel template (es. fields=...) vengono conservati.
      const [path, existingQuery] = url.split('?');
      let params = new HttpParams({ fromString: existingQuery ?? '' });
      for (const [key, value] of Object.entries(attributes.queryParams)) {
        if (value === null) {
          params = params.delete(key);
        } else if (value !== undefined) {
          params = params.set(key, String(value));
        }
      }
      const query = params.toString();
      url = query ? `${path}?${query}` : path;
    }

    return urlPathJoin(this.getBaseUrl(omit), url);
  }
}
```

`examples/mini-spartacus/src/app/step03-occ-endpoints/occ.providers.ts`

```ts
/**
 * STEP 03 - Provider OCC
 * Ispirato a: core-libs/core/src/occ/base-occ.module.ts (BaseOccModule.forRoot -> provideDefaultConfig(defaultOccConfig))
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideDefaultConfig } from '../step01-config/config';
import { defaultOccConfig } from './occ-config';

export function provideOcc(): EnvironmentProviders {
  return makeEnvironmentProviders([provideDefaultConfig(defaultOccConfig)]);
}
```

**Spiegazione riga per riga dei punti chiave:**

- `product: { default: '...fields=DEFAULT,...', list: '...fields=code,name,...' }`: lo **scope** e' una variante
  dello stesso endpoint con un `fields` diverso. OCC restituisce solo i campi richiesti: una card di catalogo
  (`list`) scarica molti meno dati di una pagina prodotto (`default`).
- `'products/${productCode}?...'`: attenzione, nel file TS e' una stringa tra apici singoli, **non** un template
  literal: `${productCode}` resta testo e viene sostituito a runtime da `resolveTemplate`.
- `resolveTemplate(..., encode = true)`: i valori vengono passati da `encodeURIComponent`. Un codice prodotto
  con `/` o spazi non rompe l'URL.
- `urlPathJoin`: unisce pezzi senza doppi `/`. Mantiene lo `/` iniziale se il primo pezzo lo ha (baseUrl vuoto =
  URL relativo `/occ/v2/...`).
- `getBaseUrl({ baseSite: false })`: usato dall'`authInterceptor` per riconoscere qualunque chiamata OCC,
  indipendentemente dal sito.
- `getRawEndpointValue`: prima la stringa semplice; poi lo scope richiesto; poi lo scope `default`; infine il nome
  stesso dell'endpoint (cosi' `buildUrl('languages')` funziona anche senza config). In dev mode avvisa se manca uno scope.
- `queryParams`: si parte dai parametri gia' nel template (`fromString: existingQuery`) e si aggiungono gli altri;
  `null` rimuove un parametro del template, `undefined` lo ignora (stessa semantica di Spartacus).

**Come testarlo:** in un componente qualunque:
`console.log(inject(OccEndpointsService).buildUrl('product', { urlParams: { productCode: 'A B' }, scope: 'list' }))`
deve stampare `http://localhost:9002/occ/v2/electronics-spa/products/A%20B?fields=code,name,summary,price(formattedValue),images(DEFAULT)`.

**Differenze rispetto a Spartacus reale:**

- Spartacus ha `OccFieldsService` e `OccRequestsOptimizerService` (`core-libs/core/src/occ/services/`) che **uniscono**
  piu' scope richiesti insieme in una sola chiamata (fusione dei `fields`), e `loadingScopes` per dire che lo scope
  `details` include `list`.
- Spartacus codifica i parametri con `HttpParamsURIEncoder` (`core-libs/core/src/util/http-params-uri.encoder.ts`).
- In Spartacus 2611 gli endpoint CMS sono `users/${userId}/cms/pages` (`core-libs/core/src/cms/config/default-cms-config.ts`):
  qui usiamo la forma classica `cms/pages`. Il mock backend le accetta entrambe.

---

## Step 04 - Autenticazione OAuth2 con refresh e retry

**Obiettivo:** login con *password grant*, token salvato nel browser, header `Authorization: Bearer` su tutte
le chiamate OCC, e se il token scade: refresh automatico e **ripetizione** della richiesta fallita.

**File originali Spartacus:**
- `core-libs/core/src/auth/user-auth/http-interceptors/auth.interceptor.ts` - `AuthInterceptor.intercept`, `isExpiredToken`
- `core-libs/core/src/auth/user-auth/services/auth-http-header.service.ts` - `alterRequest`, `handleExpiredAccessToken`, `handleExpiredRefreshToken`
- `core-libs/core/src/auth/user-auth/facade/auth.service.ts` - `loginWithCredentials`, `coreLogout`, `refreshInProgress$`
- `core-libs/core/src/auth/user-auth/services/oauth-lib-wrapper.service.ts` - `authorizeWithPasswordFlow`, `refreshToken`
- `core-libs/core/src/auth/user-auth/services/auth-storage.service.ts`, `auth-state-persistence.service.ts`
- `core-libs/core/src/auth/user-auth/config/default-auth-config.ts` - `client_id: 'mobile_android'`, `tokenEndpoint: '/oauth/token'`
- `core-libs/core/src/auth/user-auth/facade/user-id.service.ts` - `OCC_USER_ID_CURRENT`, `OCC_USER_ID_ANONYMOUS`

`examples/mini-spartacus/src/app/step04-auth/auth.model.ts`

```ts
/**
 * STEP 04 - Modelli e configurazione dell'autenticazione
 * Ispirato a:
 *  - core-libs/core/src/auth/user-auth/models/auth-token.model.ts (AuthToken)
 *  - core-libs/core/src/auth/user-auth/config/auth-config.ts       (AuthConfig)
 *  - core-libs/core/src/auth/user-auth/config/default-auth-config.ts (client_id 'mobile_android', tokenEndpoint '/oauth/token')
 *  - core-libs/core/src/auth/user-auth/facade/user-id.service.ts   (OCC_USER_ID_CURRENT / ANONYMOUS)
 */
export const OCC_USER_ID_CURRENT = 'current';
export const OCC_USER_ID_ANONYMOUS = 'anonymous';

/** Token salvato lato client. */
export interface AuthToken {
  access_token: string;
  refresh_token?: string;
  /** Istante di scadenza in millisecondi (Date.now() + expires_in * 1000). */
  expires_at?: number;
  token_type?: string;
  granted_scopes?: string[];
}

/** Risposta dell'Authorization Server di SAP Commerce (RFC 6749). */
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
}

export interface AuthConfig {
  authentication?: {
    client_id?: string;
    client_secret?: string;
    /** Base dell'Authorization Server. Default: backend.occ.baseUrl + '/authorizationserver'. */
    baseUrl?: string;
    tokenEndpoint?: string;
  };
}

declare module '../step01-config/config' {
  interface Config extends AuthConfig {}
}

export const defaultAuthConfig: AuthConfig = {
  authentication: {
    client_id: 'mobile_android',
    client_secret: 'secret',
    tokenEndpoint: '/oauth/token',
  },
};

/** Utente OCC (sottoinsieme di Occ.User in core-libs/core/src/occ/occ-models/occ.models.ts). */
export interface User {
  uid?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  displayUid?: string;
}
```

`examples/mini-spartacus/src/app/step04-auth/auth-storage.service.ts`

```ts
/**
 * STEP 04 - Dove vive il token
 * Ispirato a:
 *  - core-libs/core/src/auth/user-auth/services/auth-storage.service.ts (AuthStorageService: getToken/setToken)
 *  - core-libs/core/src/auth/user-auth/services/auth-state-persistence.service.ts (persistenza in localStorage)
 *
 * In memoria un BehaviorSubject; nel browser anche localStorage, cosi' il login sopravvive al refresh.
 * Sul server (SSR) NON c'e' localStorage: l'utente e' sempre anonimo.
 */
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthToken } from './auth.model';

const STORAGE_KEY = 'mini-spartacus-auth';

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly token$ = new BehaviorSubject<AuthToken | undefined>(this.readFromStorage());

  getToken(): Observable<AuthToken | undefined> {
    return this.token$.asObservable();
  }

  getTokenValue(): AuthToken | undefined {
    return this.token$.value;
  }

  setToken(token: AuthToken | undefined): void {
    this.token$.next(token);
    this.writeToStorage(token);
  }

  private readFromStorage(): AuthToken | undefined {
    if (!this.isBrowser) {
      return undefined;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthToken) : undefined;
    } catch {
      return undefined; // storage bloccato o JSON corrotto: si riparte da anonimo
    }
  }

  private writeToStorage(token: AuthToken | undefined): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      if (token) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // storage non disponibile (modalita' privata): il token resta solo in memoria
    }
  }
}
```

`examples/mini-spartacus/src/app/step04-auth/auth.service.ts`

```ts
/**
 * STEP 04 - Login OAuth2 "password grant" + refresh token
 * Ispirato a:
 *  - core-libs/core/src/auth/user-auth/facade/auth.service.ts (AuthService.loginWithCredentials, coreLogout, refreshInProgress$)
 *  - core-libs/core/src/auth/user-auth/services/oauth-lib-wrapper.service.ts (authorizeWithPasswordFlow, refreshToken)
 *  - core-libs/core/src/auth/user-auth/services/auth-config.service.ts (getTokenEndpoint)
 *  - core-libs/core/src/auth/user-auth/facade/user-id.service.ts (UserIdService.getUserId)
 *
 * Spartacus usa la libreria angular-oauth2-oidc; qui facciamo le POST a mano per vedere cosa succede.
 */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { distinctUntilChanged, finalize, map, shareReplay, tap } from 'rxjs/operators';
import { Config } from '../step01-config/config';
import { AuthStorageService } from './auth-storage.service';
import { AuthToken, OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT, TokenResponse } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(Config);
  private readonly storage = inject(AuthStorageService);

  /** Refresh in corso: condiviso fra tutte le richieste che ricevono 401 nello stesso momento. */
  private refreshInProgress$?: Observable<AuthToken>;

  getTokenEndpoint(): string {
    const auth = this.config.authentication;
    const base = auth?.baseUrl ?? `${this.config.backend?.occ?.baseUrl ?? ''}/authorizationserver`;
    return base + (auth?.tokenEndpoint ?? '/oauth/token');
  }

  /** 'current' se loggato, 'anonymous' altrimenti: e' il ${userId} degli endpoint OCC. */
  getUserId(): Observable<string> {
    return this.storage.getToken().pipe(
      map((token) => (token?.access_token ? OCC_USER_ID_CURRENT : OCC_USER_ID_ANONYMOUS)),
      distinctUntilChanged()
    );
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.getUserId().pipe(map((id) => id === OCC_USER_ID_CURRENT));
  }

  /** grant_type=password. Risolve la Promise quando il token e' salvato. */
  async loginWithCredentials(username: string, password: string): Promise<void> {
    const token = await firstValueFrom(this.requestToken({ grant_type: 'password', username, password }));
    this.storage.setToken(token);
  }

  /** grant_type=refresh_token. Una sola richiesta anche se chiamato N volte in parallelo. */
  refreshToken(): Observable<AuthToken> {
    const refreshToken = this.storage.getTokenValue()?.refresh_token;
    if (!refreshToken) {
      return throwError(() => new Error('Nessun refresh token disponibile'));
    }
    if (!this.refreshInProgress$) {
      this.refreshInProgress$ = this.requestToken({ grant_type: 'refresh_token', refresh_token: refreshToken }).pipe(
        tap((token) => this.storage.setToken(token)),
        finalize(() => (this.refreshInProgress$ = undefined)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }
    return this.refreshInProgress$;
  }

  /** Logout: revoca (best effort) e cancella il token locale. */
  logout(): void {
    const token = this.storage.getTokenValue();
    this.storage.setToken(undefined);
    if (token?.access_token) {
      const revokeUrl = this.getTokenEndpoint().replace(/\/token$/, '/revoke');
      this.http
        .post(revokeUrl, new HttpParams().set('token', token.access_token), { headers: this.formHeaders() })
        .subscribe({ error: () => undefined });
    }
  }

  private requestToken(params: Record<string, string>): Observable<AuthToken> {
    const auth = this.config.authentication;
    const body = new HttpParams({
      fromObject: { ...params, client_id: auth?.client_id ?? '', client_secret: auth?.client_secret ?? '' },
    });
    return this.http.post<TokenResponse>(this.getTokenEndpoint(), body, { headers: this.formHeaders() }).pipe(
      map((response) => ({
        access_token: response.access_token,
        refresh_token: response.refresh_token,
        token_type: response.token_type,
        expires_at: response.expires_in ? Date.now() + response.expires_in * 1000 : undefined,
        granted_scopes: response.scope?.split(' '),
      }))
    );
  }

  private formHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  }
}
```

`examples/mini-spartacus/src/app/step04-auth/auth.interceptor.ts`

```ts
/**
 * STEP 04 - AuthInterceptor: header Bearer + retry dopo refresh su 401
 * Ispirato a:
 *  - core-libs/core/src/auth/user-auth/http-interceptors/auth.interceptor.ts (AuthInterceptor.intercept, isExpiredToken)
 *  - core-libs/core/src/auth/user-auth/services/auth-http-header.service.ts (alterRequest, handleExpiredAccessToken,
 *    handleExpiredRefreshToken, shouldAddAuthorizationHeader)
 *
 * Flusso:
 *  1. se la richiesta va a OCC e abbiamo un token -> aggiungo "Authorization: Bearer ..."
 *  2. se OCC risponde 401 con errors[0].type = InvalidTokenError -> refresh del token
 *  3. rifaccio la STESSA richiesta col token nuovo (una sola volta)
 *  4. se anche il refresh fallisce -> logout e rilancio l'errore originale
 */
import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { OccEndpointsService } from '../step03-occ-endpoints/occ-endpoints.service';
import { AuthStorageService } from './auth-storage.service';
import { AuthService } from './auth.service';

function withBearer(request: HttpRequest<unknown>, accessToken: string | undefined): HttpRequest<unknown> {
  // Se il chiamante ha gia' messo un Authorization (es. client_credentials) non lo tocchiamo.
  if (!accessToken || request.headers.has('Authorization')) {
    return request;
  }
  return request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
}

function isExpiredToken(error: HttpErrorResponse): boolean {
  const type = (error.error as { errors?: { type?: string }[] } | null)?.errors?.[0]?.type;
  return type === 'InvalidTokenError' || type === 'InvalidBearerTokenError';
}

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const storage = inject(AuthStorageService);
  const occEndpoints = inject(OccEndpointsService);

  const isOccRequest = request.url.includes(occEndpoints.getBaseUrl({ baseSite: false }));
  const isTokenRequest = request.url.includes(authService.getTokenEndpoint());
  if (!isOccRequest || isTokenRequest) {
    return next(request);
  }

  const token = storage.getTokenValue();
  const authorized = withBearer(request, token?.access_token);

  return next(authorized).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && token?.refresh_token && isExpiredToken(error)) {
        return authService.refreshToken().pipe(
          catchError(() => {
            // refresh token scaduto/invalid_grant -> utente sloggato (handleExpiredRefreshToken)
            authService.logout();
            return throwError(() => error);
          }),
          switchMap((newToken) => next(withBearer(request, newToken.access_token)))
        );
      }
      return throwError(() => error);
    })
  );
};
```

`examples/mini-spartacus/src/app/step04-auth/user-account.service.ts`

```ts
/**
 * STEP 04 - Dati dell'utente loggato (GET users/current)
 * Ispirato a:
 *  - feature-libs/user/account/core/facade/user-account.service.ts (UserAccountService.get)
 *  - feature-libs/user/account/occ/adapters/config/default-occ-user-account-endpoint.config.ts (user: 'users/${userId}')
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';
import { OccEndpointsService } from '../step03-occ-endpoints/occ-endpoints.service';
import { OCC_USER_ID_CURRENT, User } from './auth.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserAccountService {
  private readonly http = inject(HttpClient);
  private readonly occEndpoints = inject(OccEndpointsService);
  private readonly authService = inject(AuthService);

  private readonly user$: Observable<User | undefined> = this.authService.getUserId().pipe(
    switchMap((userId) =>
      userId === OCC_USER_ID_CURRENT
        ? this.http
            .get<User>(this.occEndpoints.buildUrl('user', { urlParams: { userId } }))
            .pipe(catchError(() => of(undefined)))
        : of(undefined)
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  get(): Observable<User | undefined> {
    return this.user$;
  }
}
```

`examples/mini-spartacus/src/app/step04-auth/login-form.component.ts`

```ts
/**
 * STEP 04 - Form di login (componente CMS 'ReturningCustomerLoginComponent')
 * Ispirato a:
 *  - feature-libs/user/account/components/login-form/login-form.component.ts (LoginFormComponent)
 *  - feature-libs/user/account/components/login-form/login-form-component.service.ts (login -> AuthService.loginWithCredentials)
 */
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SemanticPathService } from '../step07-routing/semantic-path.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'cx-login-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="cx-login-form" (submit)="submit($event, email.value, password.value)">
      <h2>Accedi</h2>
      <label>Email <input #email type="email" name="email" autocomplete="username" value="demo@spartacus.test" /></label>
      <label>Password <input #password type="password" name="password" autocomplete="current-password" value="Password123." /></label>
      <button type="submit" [disabled]="busy()">Accedi</button>
      @if (error()) {
        <p role="alert" class="error">{{ error() }}</p>
      }
    </form>
  `,
})
export class LoginFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly semanticPath = inject(SemanticPathService);

  readonly busy = signal(false);
  readonly error = signal<string | undefined>(undefined);

  async submit(event: Event, email: string, password: string): Promise<void> {
    event.preventDefault();
    this.busy.set(true);
    this.error.set(undefined);
    try {
      await this.authService.loginWithCredentials(email, password);
      await this.router.navigate(this.semanticPath.transform({ cxRoute: 'home' }));
    } catch {
      this.error.set('Credenziali non valide');
    } finally {
      this.busy.set(false);
    }
  }
}
```

`examples/mini-spartacus/src/app/step04-auth/login-status.component.ts`

```ts
/**
 * STEP 04 - "Ciao Mario / Accedi" nell'header (componente CMS 'LoginComponent')
 * Ispirato a: feature-libs/user/account/components/login/login.component.ts (LoginComponent)
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UrlPipe } from '../step07-routing/url.pipe';
import { AuthService } from './auth.service';
import { UserAccountService } from './user-account.service';

@Component({
  selector: 'cx-login-status',
  imports: [AsyncPipe, RouterLink, UrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (user$ | async; as user) {
      <span>Ciao {{ user.firstName ?? user.uid }}</span>
      <button type="button" (click)="logout()">Esci</button>
    } @else {
      <a [routerLink]="{ cxRoute: 'login' } | cxUrl">Accedi</a>
    }
  `,
})
export class LoginStatusComponent {
  private readonly authService = inject(AuthService);
  readonly user$ = inject(UserAccountService).get();

  logout(): void {
    this.authService.logout();
  }
}
```

`examples/mini-spartacus/src/app/step04-auth/auth.providers.ts`

```ts
/**
 * STEP 04 - Provider dell'autenticazione
 * Ispirato a: core-libs/core/src/auth/user-auth/user-auth.module.ts (UserAuthModule.forRoot)
 * L'interceptor si registra in app.config.ts con withInterceptors([... authInterceptor ...]).
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideDefaultConfig } from '../step01-config/config';
import { defaultAuthConfig } from './auth.model';

export function provideAuth(): EnvironmentProviders {
  return makeEnvironmentProviders([provideDefaultConfig(defaultAuthConfig)]);
}
```

**Spiegazione riga per riga dei punti chiave:**

- `getTokenEndpoint()`: se `authentication.baseUrl` non e' configurato si usa `backend.occ.baseUrl + '/authorizationserver'`,
  proprio come Spartacus. Il token endpoint e' **fuori** da `/occ/v2`.
- `requestToken`: body `application/x-www-form-urlencoded` (non JSON!) con `grant_type`, `client_id`,
  `client_secret` e i parametri del grant. E' lo standard OAuth2 (RFC 6749).
- `expires_at: Date.now() + expires_in * 1000`: salviamo l'istante di scadenza, non la durata.
- `getUserId()`: `'current'` se c'e' un token, `'anonymous'` altrimenti. E' il valore di `${userId}` negli
  endpoint OCC (`users/${userId}/carts`...). Un solo Observable guida tutto il resto (utente, carrello).
- `refreshToken()`: **single-flight**. Se tre richieste ricevono 401 insieme, parte **una** sola POST di refresh;
  le altre si agganciano allo stesso Observable grazie a `shareReplay`. `finalize` azzera la variabile quando finisce.
- `authInterceptor`:
  - `isTokenRequest` -> passa diretto: non bisogna mai mettere il Bearer sulla richiesta del token.
  - `withBearer` non sovrascrive un `Authorization` gia' presente.
  - `catchError`: si reagisce solo a `401` con `errors[0].type === 'InvalidTokenError'` (formato errori OCC) e
    solo se abbiamo un refresh token.
  - `switchMap((newToken) => next(withBearer(request, newToken.access_token)))`: si ripete la richiesta
    **originale** (senza il vecchio header) col token nuovo. Si usa `next`, non `HttpClient`, per non ripassare
    dagli interceptor precedenti.
  - Se il refresh fallisce: `logout()` e si rilancia l'errore **originale** (quello che il chiamante si aspetta).
- `AuthStorageService`: `isPlatformBrowser` + `try/catch` su `localStorage`. In SSR non c'e' storage e l'utente e'
  sempre anonimo: questo e' anche il motivo per cui una pagina renderizzata dal server non contiene mai dati personali.
- `LoginFormComponent`: `await loginWithCredentials(...)` e poi navigazione alla home con `SemanticPathService` (Step 07).

**Come testarlo:**

1. Avvia il mock con `TOKEN_TTL=5 npm start` (token che scade dopo 5 secondi).
2. Fai login con `demo@spartacus.test` / `Password123.`: l'header mostra "Ciao Demo".
3. Aspetta 6 secondi e apri il carrello. Nel tab Network vedrai: `GET ... 401`, `POST /authorizationserver/oauth/token`,
   di nuovo la stessa `GET` con esito 200. (Verificato: e' esattamente la sequenza registrata nel test headless.)

**Differenze rispetto a Spartacus reale:**

- Spartacus usa la libreria `angular-oauth2-oidc` tramite `OAuthLibWrapperService` e supporta anche
  *Implicit* e *Authorization Code* flow (login su pagina esterna).
- `AuthHttpHeaderService.getStableToken()` fa **attendere** le richieste mentre un refresh o un logout e' in corso,
  e gestisce anche `400 invalid_grant` sul refresh; alla scadenza del refresh token reindirizza al login con messaggio globale.
- `TokenRevocationInterceptor` e il logout completo passano dallo store (reset di tutti i dati utente).
- Il client anonimo con `client_credentials` (usato da registrazione e alcune API) e' in `ClientAuthModule`
  (`core-libs/core/src/auth/client-auth/`).

---

## Step 05 - Connector, Adapter, Converter

**Obiettivo:** separare *cosa* serve all'app (un `Product`) da *come* lo si prende (OCC, altro backend) e da
*come* lo si trasforma (normalizzatori estendibili senza toccare il codice).

**File originali Spartacus:**
- `core-libs/core/src/util/converter.service.ts` - `Converter`, `ConverterService.pipeable/convert/convertMany`
- `core-libs/core/src/product/connectors/product/product.adapter.ts` - `ProductAdapter`
- `core-libs/core/src/product/connectors/product/product.connector.ts` - `ProductConnector`
- `core-libs/core/src/product/connectors/product/converters.ts` - `PRODUCT_NORMALIZER`
- `core-libs/core/src/occ/adapters/product/occ-product.adapter.ts` - `OccProductAdapter`
- `core-libs/core/src/occ/adapters/product/converters/product-image-normalizer.ts`, `product-name-normalizer.ts`
- `core-libs/core/src/occ/adapters/product/product-occ.module.ts` - registrazione multi

`examples/mini-spartacus/src/app/step05-product-data/converter.service.ts`

```ts
/**
 * STEP 05 - Converter: trasformano i dati OCC nel modello dell'app
 * Ispirato a: core-libs/core/src/util/converter.service.ts (Converter, ConverterService.pipeable/convert/convertMany)
 *
 * Un "token di converter" e' un InjectionToken MULTI: chiunque puo' aggiungere un converter
 * (anche una feature o l'app) senza toccare il codice originale.
 * I converter vengono applicati in catena: l'output di uno e' il "target" del successivo.
 */
import { inject, Injectable, InjectionToken, Injector } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Converter<SOURCE, TARGET> {
  convert(source: SOURCE, target?: TARGET): TARGET;
}

@Injectable({ providedIn: 'root' })
export class ConverterService {
  private readonly injector = inject(Injector);
  private readonly cache = new Map<InjectionToken<unknown>, Converter<unknown, unknown>[]>();

  private getConverters<S, T>(token: InjectionToken<Converter<S, T>[]>): Converter<S, T>[] {
    if (!this.cache.has(token)) {
      // [] come valore di default: nessun converter registrato = dato passato cosi' com'e'.
      this.cache.set(token, this.injector.get(token, [] as Converter<S, T>[]) as Converter<unknown, unknown>[]);
    }
    return this.cache.get(token) as Converter<S, T>[];
  }

  hasConverters<S, T>(token: InjectionToken<Converter<S, T>[]>): boolean {
    return this.getConverters(token).length > 0;
  }

  convert<S, T>(source: S, token: InjectionToken<Converter<S, T>[]>): T {
    const converters = this.getConverters(token);
    if (!converters.length) {
      return source as unknown as T;
    }
    return converters.reduce<T | undefined>((target, converter) => converter.convert(source, target), undefined) as T;
  }

  convertMany<S, T>(sources: S[], token: InjectionToken<Converter<S, T>[]>): T[] {
    return sources.map((source) => this.convert(source, token));
  }

  /** Operatore RxJS: http.get(...).pipe(converter.pipeable(PRODUCT_NORMALIZER)) */
  pipeable<S, T>(token: InjectionToken<Converter<S, T>[]>): OperatorFunction<S, T> {
    return (source$: Observable<S>) => source$.pipe(map((value) => this.convert(value, token)));
  }
}
```

`examples/mini-spartacus/src/app/step05-product-data/product.model.ts`

```ts
/**
 * STEP 05 - Modelli: OCC (backend) vs App (frontend)
 * Ispirato a:
 *  - core-libs/core/src/occ/occ-models/occ.models.ts (Occ.Product, Occ.Image, Occ.Price, Occ.Stock)
 *  - core-libs/core/src/model/product.model.ts       (Product: images normalizzate, nameHtml, slug)
 *  - core-libs/core/src/model/image.model.ts         (Images, ImageGroup)
 */

// ---- Formato OCC (quello che arriva dal backend) -------------------------------
export interface OccPrice {
  currencyIso?: string;
  value?: number;
  formattedValue?: string;
}

export interface OccImage {
  imageType?: 'PRIMARY' | 'GALLERY';
  format?: string;
  url?: string;
  altText?: string;
  galleryIndex?: number;
}

export interface OccProduct {
  code?: string;
  name?: string;
  summary?: string;
  description?: string;
  url?: string;
  price?: OccPrice;
  images?: OccImage[];
  purchasable?: boolean;
  stock?: { stockLevel?: number; stockLevelStatus?: string };
}

export interface OccProductSearchPage {
  products?: OccProduct[];
  freeTextSearch?: string;
  pagination?: { currentPage?: number; pageSize?: number; totalPages?: number; totalResults?: number };
}

// ---- Formato APP (quello che usano componenti e store) -------------------------
export interface Image {
  url?: string;
  altText?: string;
  format?: string;
}

/** Immagini raggruppate per formato: images.PRIMARY.product.url */
export interface ImageGroup {
  [format: string]: Image;
}

export interface Images {
  PRIMARY?: ImageGroup;
  GALLERY?: ImageGroup[];
}

export interface Product extends Omit<OccProduct, 'images'> {
  images?: Images;
  /** Nome originale con eventuale HTML (es. <em> nei risultati di ricerca). */
  nameHtml?: string;
  /** Nome "url friendly" per le rotte: 'PowerShot A480' -> 'powershot-a480'. */
  slug?: string;
}

export interface ProductSearchPage {
  products: Product[];
  freeTextSearch?: string;
  totalResults: number;
}
```

`examples/mini-spartacus/src/app/step05-product-data/product-normalizers.ts`

```ts
/**
 * STEP 05 - Normalizer del prodotto (token PRODUCT_NORMALIZER multi)
 * Ispirato a:
 *  - core-libs/core/src/product/connectors/product/converters.ts (PRODUCT_NORMALIZER)
 *  - core-libs/core/src/occ/adapters/product/converters/product-image-normalizer.ts (ProductImageNormalizer)
 *  - core-libs/core/src/occ/adapters/product/converters/product-name-normalizer.ts  (ProductNameNormalizer)
 *  - core-libs/core/src/occ/adapters/product/product-occ.module.ts (registrazione multi dei normalizer)
 */
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Config } from '../step01-config/config';
import { Converter } from './converter.service';
import { Images, OccImage, OccProduct, Product } from './product.model';

/** Copia superficiale senza le immagini OCC (che hanno un formato diverso da Product.images). */
function copyWithoutImages(source: OccProduct): Product {
  const { images: _occImages, ...rest } = source;
  return { ...rest };
}

export const PRODUCT_NORMALIZER = new InjectionToken<Converter<OccProduct, Product>[]>('ProductNormalizer');

/** Da lista piatta di immagini a mappa per tipo/formato; URL resi assoluti. */
@Injectable({ providedIn: 'root' })
export class ProductImageNormalizer implements Converter<OccProduct, Product> {
  private readonly config = inject(Config);

  convert(source: OccProduct, target?: Product): Product {
    const result: Product = target ?? copyWithoutImages(source);
    if (source.images) {
      result.images = this.normalize(source.images);
    }
    return result;
  }

  normalize(source: OccImage[]): Images {
    const images: Images = {};
    for (const image of source) {
      if (!image.imageType || !image.format) {
        continue;
      }
      const normalized = { ...image, url: this.normalizeImageUrl(image.url ?? '') };
      if (image.imageType === 'GALLERY') {
        const gallery = (images.GALLERY ??= []);
        const index = image.galleryIndex ?? 0;
        gallery[index] = { ...(gallery[index] ?? {}), [image.format]: normalized };
      } else {
        images.PRIMARY = { ...(images.PRIMARY ?? {}), [image.format]: normalized };
      }
    }
    return images;
  }

  private normalizeImageUrl(url: string): string {
    if (/^(https?:)?\/\//.test(url)) {
      return url;
    }
    const base = this.config.backend?.media?.baseUrl ?? this.config.backend?.occ?.baseUrl ?? '';
    return base + url;
  }
}

/** Toglie l'HTML dal nome e calcola lo slug per l'URL del prodotto. */
@Injectable({ providedIn: 'root' })
export class ProductNameNormalizer implements Converter<OccProduct, Product> {
  convert(source: OccProduct, target?: Product): Product {
    const result: Product = target ?? copyWithoutImages(source);
    if (source.name) {
      result.nameHtml = source.name;
      result.name = source.name.replace(/<[^>]*>/g, '');
      result.slug = result.name
        .toLowerCase()
        .replace(/[ !*'();:@&=+$,/?%#[\]]/g, '-')
        .replace(/-+/g, '-');
    }
    return result;
  }
}
```

`examples/mini-spartacus/src/app/step05-product-data/product.connector.ts`

```ts
/**
 * STEP 05 - Connector / Adapter per il prodotto
 * Ispirato a:
 *  - core-libs/core/src/product/connectors/product/product.adapter.ts   (ProductAdapter: classe astratta = "porta")
 *  - core-libs/core/src/product/connectors/product/product.connector.ts (ProductConnector: usato da effect/servizi)
 *  - core-libs/core/src/occ/adapters/product/occ-product.adapter.ts     (OccProductAdapter: implementazione OCC)
 *
 * Tre livelli:
 *   ProductConnector  -> API stabile per il resto dell'app
 *   ProductAdapter    -> contratto astratto (sostituibile: OCC, mock, altro backend...)
 *   OccProductAdapter -> HTTP + endpoint OCC + converter
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OccEndpointsService } from '../step03-occ-endpoints/occ-endpoints.service';
import { ConverterService } from './converter.service';
import { PRODUCT_NORMALIZER } from './product-normalizers';
import { OccProduct, Product } from './product.model';

export abstract class ProductAdapter {
  abstract load(productCode: string, scope?: string): Observable<Product>;
}

@Injectable()
export class OccProductAdapter implements ProductAdapter {
  private readonly http = inject(HttpClient);
  private readonly occEndpoints = inject(OccEndpointsService);
  private readonly converter = inject(ConverterService);

  load(productCode: string, scope?: string): Observable<Product> {
    const url = this.occEndpoints.buildUrl('product', { urlParams: { productCode }, scope });
    return this.http.get<OccProduct>(url).pipe(this.converter.pipeable(PRODUCT_NORMALIZER));
  }
}

@Injectable({ providedIn: 'root' })
export class ProductConnector {
  private readonly adapter = inject(ProductAdapter);

  get(productCode: string, scope = ''): Observable<Product> {
    return this.adapter.load(productCode, scope || undefined);
  }
}
```

`examples/mini-spartacus/src/app/step05-product-data/product-search.service.ts`

```ts
/**
 * STEP 05 - Ricerca prodotti (riusa gli stessi converter del dettaglio)
 * Ispirato a:
 *  - core-libs/core/src/occ/adapters/product/occ-product-search.adapter.ts (OccProductSearchAdapter.search)
 *  - core-libs/core/src/occ/adapters/product/converters/occ-product-search-page-normalizer.ts
 *    (i prodotti della pagina passano da PRODUCT_NORMALIZER con convertMany)
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OccEndpointsService } from '../step03-occ-endpoints/occ-endpoints.service';
import { ConverterService } from './converter.service';
import { PRODUCT_NORMALIZER } from './product-normalizers';
import { OccProductSearchPage, ProductSearchPage } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductSearchService {
  private readonly http = inject(HttpClient);
  private readonly occEndpoints = inject(OccEndpointsService);
  private readonly converter = inject(ConverterService);

  search(query: string, pageSize = 20): Observable<ProductSearchPage> {
    const url = this.occEndpoints.buildUrl('productSearch', { queryParams: { query, pageSize } });
    return this.http.get<OccProductSearchPage>(url).pipe(
      map((page) => ({
        products: this.converter.convertMany(page.products ?? [], PRODUCT_NORMALIZER),
        freeTextSearch: page.freeTextSearch,
        totalResults: page.pagination?.totalResults ?? 0,
      }))
    );
  }
}
```

`examples/mini-spartacus/src/app/step05-product-data/product-data.providers.ts`

```ts
/**
 * STEP 05 - Registrazione di adapter e normalizer
 * Ispirato a: core-libs/core/src/occ/adapters/product/product-occ.module.ts (ProductOccModule)
 *
 * Per aggiungere un campo calcolato basta un altro provider:
 *   { provide: PRODUCT_NORMALIZER, useClass: MioNormalizer, multi: true }
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { OccProductAdapter, ProductAdapter } from './product.connector';
import { PRODUCT_NORMALIZER, ProductImageNormalizer, ProductNameNormalizer } from './product-normalizers';

export function provideProductData(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ProductAdapter, useClass: OccProductAdapter },
    { provide: PRODUCT_NORMALIZER, useExisting: ProductImageNormalizer, multi: true },
    { provide: PRODUCT_NORMALIZER, useExisting: ProductNameNormalizer, multi: true },
  ]);
}
```

**Spiegazione riga per riga dei punti chiave:**

- `InjectionToken<Converter<OccProduct, Product>[]>`: il token e' tipizzato come **array** perche' e' multi.
- `injector.get(token, [])`: il secondo argomento e' il valore se nessuno ha registrato converter. Niente converter
  = il dato passa invariato (`source as unknown as T`).
- `converters.reduce((target, converter) => converter.convert(source, target), undefined)`: **catena**. Il primo
  converter riceve `target = undefined` e crea l'oggetto; i successivi lo arricchiscono. Tutti leggono lo stesso `source`.
- `pipeable(token)`: un operatore RxJS da mettere dopo `http.get`: `http.get(url).pipe(converter.pipeable(TOKEN))`.
- `ProductImageNormalizer.normalize`: OCC manda una lista piatta `[{imageType:'PRIMARY', format:'product', url}]`;
  l'app vuole `images.PRIMARY.product.url`. Le immagini `GALLERY` diventano un array indicizzato da `galleryIndex`.
- `normalizeImageUrl`: gli URL OCC sono relativi (`/medias/...`), vanno prefissati con `backend.media.baseUrl`
  (o `backend.occ.baseUrl`).
- `ProductNameNormalizer`: `nameHtml` conserva l'HTML (i risultati di ricerca evidenziano con `<em>`), `name` e' ripulito,
  `slug` e' la versione per l'URL (`paramsMapping: { name: 'slug' }` nello Step 07).
- `abstract class ProductAdapter`: la classe astratta **e'** il token DI. `{ provide: ProductAdapter, useClass: OccProductAdapter }`
  e' l'unico punto che lega l'app a OCC.
- `ProductSearchService`: riusa `PRODUCT_NORMALIZER` con `convertMany`: le card di ricerca hanno lo stesso formato del dettaglio.

**Come testarlo:** apri una pagina prodotto: l'`<img>` ha `src="http://localhost:9002/medias/300938-product.svg"`
(URL assoluto: ha lavorato `ProductImageNormalizer`). Aggiungi un tuo normalizer che scrive `name.toUpperCase()`
con `{ provide: PRODUCT_NORMALIZER, useValue: { convert: (s, t) => ({ ...t, name: t.name.toUpperCase() }) }, multi: true }`
dopo `provideProductData()`: tutti i nomi diventano maiuscoli senza toccare altro.

**Differenze rispetto a Spartacus reale:**

- `ConverterService` in Spartacus usa `UnifiedInjector` (`core-libs/core/src/lazy-loading/unified-injector.ts`) per
  trovare converter registrati anche nei moduli **lazy**, e svuota la cache quando nasce un nuovo injector.
- Esistono anche i *serializer* (direzione opposta, app -> OCC), es. `ADDRESS_SERIALIZER`, e `loadMany` per caricare
  piu' prodotti/scope in una chiamata.

---

## Step 06 - NgRx: LoaderState per entita' e facade

**Obiettivo:** tenere i prodotti in uno store NgRx con stato di caricamento **per prodotto** (loading/success/error)
senza scrivere a mano reducer ripetitivi, e nascondere lo store dietro un facade.

**File originali Spartacus:**
- `core-libs/core/src/state/utils/loader/loader-state.ts`, `loader.action.ts`, `loader.reducer.ts`
- `core-libs/core/src/state/utils/entity-loader/entity-loader.reducer.ts`, `entity-loader.action.ts`
- `core-libs/core/src/product/store/actions/product.action.ts` - `LoadProduct`, `LoadProductSuccess`, `LoadProductFail`
- `core-libs/core/src/product/store/effects/product.effect.ts` - `ProductEffects`
- `core-libs/core/src/product/store/selectors/product.selectors.ts`
- `core-libs/core/src/product/facade/product.service.ts`, `core-libs/core/src/product/services/product-loading.service.ts`

`examples/mini-spartacus/src/app/step06-ngrx-product/loader-state.ts`

```ts
/**
 * STEP 06 - StateUtils in miniatura: LoaderState ed EntityLoaderState
 * Ispirato a:
 *  - core-libs/core/src/state/utils/loader/loader-state.ts      (LoaderState)
 *  - core-libs/core/src/state/utils/loader/loader.action.ts     (LoaderMeta, loadMeta, failMeta, successMeta)
 *  - core-libs/core/src/state/utils/loader/loader.reducer.ts    (loaderReducer)
 *  - core-libs/core/src/state/utils/entity-loader/*              (entityLoaderReducer, entityLoadMeta, ...)
 *  - core-libs/core/src/state/utils/entity/entity.reducer.ts    (entityId null = "tutte le entita'", removed)
 *
 * L'idea di Spartacus: NON scrivere a mano loading/error/success per ogni dato.
 * Le azioni portano un "meta" che dice al reducer generico cosa fare.
 */
import { Action } from '@ngrx/store';

export interface LoaderState<T> {
  loading: boolean;
  error: boolean;
  success: boolean;
  value?: T;
}

export interface EntityLoaderState<T> {
  entities: { [id: string]: LoaderState<T> };
}

export interface EntityLoaderMeta {
  entityType: string;
  /** Id dell'entita'; null = tutte. */
  entityId: string | null;
  loader?: { load?: boolean; error?: unknown; success?: boolean };
  removed?: boolean;
}

export interface EntityLoaderAction extends Action {
  readonly payload?: unknown;
  readonly meta?: EntityLoaderMeta;
}

export const initialLoaderState: LoaderState<never> = { loading: false, error: false, success: false, value: undefined };
export const initialEntityLoaderState: EntityLoaderState<never> = { entities: {} };

// ---- helper per costruire i meta ---------------------------------------------
export const entityLoadMeta = (entityType: string, entityId: string): EntityLoaderMeta => ({
  entityType, entityId, loader: { load: true },
});
export const entitySuccessMeta = (entityType: string, entityId: string): EntityLoaderMeta => ({
  entityType, entityId, loader: { success: true },
});
export const entityFailMeta = (entityType: string, entityId: string, error: unknown): EntityLoaderMeta => ({
  entityType, entityId, loader: { error: error ?? true },
});
export const entityRemoveAllMeta = (entityType: string): EntityLoaderMeta => ({
  entityType, entityId: null, removed: true,
});

/** Reducer per UN valore caricato in modo asincrono. */
export function loaderReducer<T>(entityType: string) {
  return (state: LoaderState<T> = initialLoaderState, action: EntityLoaderAction): LoaderState<T> => {
    const loader = action.meta?.entityType === entityType ? action.meta.loader : undefined;
    if (!loader) {
      return state;
    }
    if (loader.load) {
      return { ...state, loading: true };
    }
    if (loader.error) {
      return { ...state, loading: false, error: true, success: false, value: undefined };
    }
    if (loader.success) {
      return { ...state, loading: false, error: false, success: true, value: action.payload as T };
    }
    return initialLoaderState;
  };
}

/** Reducer per una MAPPA id -> LoaderState (un prodotto per codice). */
export function entityLoaderReducer<T>(entityType: string) {
  const inner = loaderReducer<T>(entityType);
  return (state: EntityLoaderState<T> = initialEntityLoaderState, action: EntityLoaderAction): EntityLoaderState<T> => {
    const meta = action.meta;
    if (!meta || meta.entityType !== entityType) {
      return state;
    }
    if (meta.entityId === null) {
      return meta.removed ? initialEntityLoaderState : state;
    }
    if (meta.removed) {
      const { [meta.entityId]: _removed, ...rest } = state.entities;
      return { entities: rest };
    }
    const previous = state.entities[meta.entityId];
    const next = inner(previous, action);
    return next === previous ? state : { entities: { ...state.entities, [meta.entityId]: next } };
  };
}

/** Selettore di comodo: stato di un'entita' (o stato iniziale se mai caricata). */
export function entityLoaderStateSelector<T>(state: EntityLoaderState<T>, id: string): LoaderState<T> {
  return state.entities[id] ?? initialLoaderState;
}
```

`examples/mini-spartacus/src/app/step06-ngrx-product/product.actions.ts`

```ts
/**
 * STEP 06 - Azioni del prodotto (classi con meta, come in Spartacus)
 * Ispirato a: core-libs/core/src/product/store/actions/product.action.ts
 *   (LoadProduct, LoadProductSuccess, LoadProductFail, PRODUCT_DETAIL_ENTITY)
 */
import { Product } from '../step05-product-data/product.model';
import {
  EntityLoaderAction,
  EntityLoaderMeta,
  entityFailMeta,
  entityLoadMeta,
  entityRemoveAllMeta,
  entitySuccessMeta,
} from './loader-state';

export const PRODUCT_DETAIL_ENTITY = '[Product] Detail Entity';

export const LOAD_PRODUCT = '[Product] Load Product Data';
export const LOAD_PRODUCT_SUCCESS = '[Product] Load Product Data Success';
export const LOAD_PRODUCT_FAIL = '[Product] Load Product Data Fail';
export const CLEAR_PRODUCTS = '[Product] Clear Products';

export class LoadProduct implements EntityLoaderAction {
  readonly type = LOAD_PRODUCT;
  readonly meta: EntityLoaderMeta;
  constructor(public readonly payload: string) {
    this.meta = entityLoadMeta(PRODUCT_DETAIL_ENTITY, payload);
  }
}

export class LoadProductSuccess implements EntityLoaderAction {
  readonly type = LOAD_PRODUCT_SUCCESS;
  readonly meta: EntityLoaderMeta;
  constructor(public readonly payload: Product) {
    this.meta = entitySuccessMeta(PRODUCT_DETAIL_ENTITY, payload.code ?? '');
  }
}

export class LoadProductFail implements EntityLoaderAction {
  readonly type = LOAD_PRODUCT_FAIL;
  readonly meta: EntityLoaderMeta;
  /** L'errore deve essere serializzabile (niente HttpErrorResponse nello store). */
  constructor(productCode: string, public readonly payload: { status?: number; message: string }) {
    this.meta = entityFailMeta(PRODUCT_DETAIL_ENTITY, productCode, payload);
  }
}

/** Svuota tutti i prodotti: usata al cambio di lingua/valuta (prezzi e nomi cambiano). */
export class ClearProducts implements EntityLoaderAction {
  readonly type = CLEAR_PRODUCTS;
  readonly meta = entityRemoveAllMeta(PRODUCT_DETAIL_ENTITY);
}

export type ProductAction = LoadProduct | LoadProductSuccess | LoadProductFail | ClearProducts;
```

`examples/mini-spartacus/src/app/step06-ngrx-product/product.reducer.ts`

```ts
/**
 * STEP 06 - Reducer e selettori del prodotto
 * Ispirato a:
 *  - core-libs/core/src/product/store/product-state.ts            (PRODUCT_FEATURE, ProductsState)
 *  - core-libs/core/src/product/store/reducers/index.ts           (reducer costruiti con StateUtils)
 *  - core-libs/core/src/product/store/selectors/product.selectors.ts (getSelectedProductStateFactory, ...)
 */
import { ActionReducerMap, createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Product } from '../step05-product-data/product.model';
import { PRODUCT_DETAIL_ENTITY } from './product.actions';
import { EntityLoaderState, entityLoaderReducer, entityLoaderStateSelector, LoaderState } from './loader-state';

export const PRODUCT_FEATURE = 'product';

export interface ProductState {
  details: EntityLoaderState<Product>;
}

export const productReducers: ActionReducerMap<ProductState> = {
  details: entityLoaderReducer<Product>(PRODUCT_DETAIL_ENTITY),
};

export const getProductState = createFeatureSelector<ProductState>(PRODUCT_FEATURE);

export const getProductDetailsState = createSelector(getProductState, (state) => state.details);

type RootState = object;

export function getSelectedProductStateFactory(code: string): MemoizedSelector<RootState, LoaderState<Product>> {
  return createSelector(getProductDetailsState, (details) => entityLoaderStateSelector(details, code));
}

export function getSelectedProductFactory(code: string): MemoizedSelector<RootState, Product | undefined> {
  return createSelector(getSelectedProductStateFactory(code), (state) => state.value);
}

export function getSelectedProductLoadingFactory(code: string): MemoizedSelector<RootState, boolean> {
  return createSelector(getSelectedProductStateFactory(code), (state) => state.loading);
}

export function getSelectedProductErrorFactory(code: string): MemoizedSelector<RootState, boolean> {
  return createSelector(getSelectedProductStateFactory(code), (state) => state.error);
}
```

`examples/mini-spartacus/src/app/step06-ngrx-product/product.effects.ts`

```ts
/**
 * STEP 06 - Effect: l'azione LoadProduct diventa una chiamata HTTP
 * Ispirato a:
 *  - core-libs/core/src/product/store/effects/product.effect.ts (ProductEffects.loadProduct$)
 *  - core-libs/core/src/util/try-normalize-http-error.ts         (tryNormalizeHttpError: errore reso serializzabile)
 *  - il reset dei prodotti al cambio lingua/valuta (in Spartacus: reducer che reagiscono a
 *    LANGUAGE_CHANGE / CURRENCY_CHANGE, vedi core-libs/core/src/site-context/store/actions)
 */
import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { catchError, map, mergeMap, skip } from 'rxjs/operators';
import { CURRENCY_CONTEXT_ID, LANGUAGE_CONTEXT_ID } from '../step02-site-context/site-context.config';
import { SiteContextService } from '../step02-site-context/site-context.service';
import { ProductConnector } from '../step05-product-data/product.connector';
import { ClearProducts, LOAD_PRODUCT, LoadProduct, LoadProductFail, LoadProductSuccess } from './product.actions';

function normalizeHttpError(error: unknown): { status?: number; message: string } {
  if (error instanceof HttpErrorResponse) {
    return { status: error.status, message: error.message };
  }
  return { message: error instanceof Error ? error.message : String(error) };
}

@Injectable()
export class ProductEffects {
  private readonly actions$ = inject(Actions);
  private readonly connector = inject(ProductConnector);
  private readonly siteContext = inject(SiteContextService);

  /** mergeMap: piu' prodotti possono caricarsi in parallelo. */
  readonly loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadProduct>(LOAD_PRODUCT),
      mergeMap((action) =>
        this.connector.get(action.payload).pipe(
          map((product) => new LoadProductSuccess({ ...product, code: product.code ?? action.payload })),
          catchError((error: unknown) => of(new LoadProductFail(action.payload, normalizeHttpError(error))))
        )
      )
    )
  );

  /** Lingua o valuta cambiata (dopo il valore iniziale) -> svuoto la cache dei prodotti. */
  readonly clearOnContextChange$ = createEffect(() =>
    merge(
      this.siteContext.getActive(LANGUAGE_CONTEXT_ID).pipe(skip(1)),
      this.siteContext.getActive(CURRENCY_CONTEXT_ID).pipe(skip(1))
    ).pipe(map(() => new ClearProducts()))
  );
}
```

`examples/mini-spartacus/src/app/step06-ngrx-product/product.service.ts`

```ts
/**
 * STEP 06 - Facade ProductService: i componenti NON vedono lo store
 * Ispirato a:
 *  - core-libs/core/src/product/facade/product.service.ts            (ProductService.get/isLoading/hasError)
 *  - core-libs/core/src/product/services/product-loading.service.ts  (carica "on demand" quando qualcuno osserva)
 *
 * get(code) restituisce un Observable del prodotto. Se nello store non c'e' nulla
 * (ne' in caricamento, ne' caricato, ne' in errore) il facade lancia LoadProduct.
 */
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Product } from '../step05-product-data/product.model';
import { LoadProduct } from './product.actions';
import {
  getSelectedProductErrorFactory,
  getSelectedProductLoadingFactory,
  getSelectedProductStateFactory,
} from './product.reducer';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly store = inject(Store);

  get(productCode: string | undefined): Observable<Product | undefined> {
    if (!productCode) {
      return of(undefined);
    }
    return this.store.select(getSelectedProductStateFactory(productCode)).pipe(
      tap((state) => {
        if (!state.loading && !state.success && !state.error) {
          this.store.dispatch(new LoadProduct(productCode));
        }
      }),
      map((state) => state.value),
      distinctUntilChanged()
    );
  }

  isLoading(productCode: string): Observable<boolean> {
    return this.store.select(getSelectedProductLoadingFactory(productCode));
  }

  hasError(productCode: string): Observable<boolean> {
    return this.store.select(getSelectedProductErrorFactory(productCode));
  }
}
```

`examples/mini-spartacus/src/app/step06-ngrx-product/product-store.providers.ts`

```ts
/**
 * STEP 06 - Registrazione del feature state "product"
 * Ispirato a: core-libs/core/src/product/store/product-store.module.ts
 *   (StoreModule.forFeature(PRODUCT_FEATURE, reducerToken) + EffectsModule.forFeature(effects))
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ProductEffects } from './product.effects';
import { PRODUCT_FEATURE, productReducers } from './product.reducer';

export function provideProductStore(): EnvironmentProviders {
  return makeEnvironmentProviders([provideState(PRODUCT_FEATURE, productReducers), provideEffects(ProductEffects)]);
}
```

**Spiegazione riga per riga dei punti chiave:**

- `meta: { entityType, entityId, loader: { load | success | error } }`: l'azione **descrive** cosa fare; il
  reducer generico lo esegue. Il `type` dell'azione serve solo a effect e devtools.
- `loaderReducer`: `load` -> `loading: true` (il vecchio `value` resta: niente sfarfallio); `success` ->
  `value = payload`; `error` -> `value = undefined`, `error: true`.
- `entityLoaderReducer`: applica `loaderReducer` alla sola entita' `entityId`. `entityId: null` + `removed` = svuota tutto.
  `next === previous ? state : ...` evita di creare nuovi oggetti quando nulla cambia (selettori memoizzati felici).
- `class LoadProduct implements EntityLoaderAction`: le azioni sono **classi** con `meta` calcolato nel costruttore,
  come in Spartacus. `readonly type = LOAD_PRODUCT` fa si' che `ofType<LoadProduct>(LOAD_PRODUCT)` funzioni.
- `LoadProductFail(..., payload: { status, message })`: nello store solo dati serializzabili, mai un `HttpErrorResponse`.
- `mergeMap` nell'effect: piu' prodotti in parallelo (con `switchMap` il secondo annullerebbe il primo!).
- `clearOnContextChange$`: al cambio di lingua o valuta i nomi e i prezzi nello store sono sbagliati: si svuota tutto.
  `skip(1)` ignora il valore iniziale.
- `ProductService.get(code)`: seleziona lo stato del prodotto e, se e' "vergine" (`!loading && !success && !error`),
  lancia `LoadProduct`. E' il pattern *load on demand*: il componente chiede, il facade decide se caricare.
  Dopo `ClearProducts` lo stato torna vergine e i componenti ancora a schermo ricaricano da soli.
- `provideState(PRODUCT_FEATURE, productReducers)` + `provideEffects(ProductEffects)`: versione standalone di
  `StoreModule.forFeature` / `EffectsModule.forFeature`.

**Come testarlo:** installa l'estensione Redux DevTools e aggiungi `provideStoreDevtools()` (pacchetto
`@ngrx/store-devtools`): aprendo la home vedrai 4 `LoadProduct` seguite da 4 `LoadProductSuccess`, e lo stato
`product.details.entities['300938'] = { loading: false, success: true, value: {...} }`.
Cambiando valuta vedrai `[Product] Clear Products` e poi di nuovo le `LoadProduct`.

**Differenze rispetto a Spartacus reale:**

- Spartacus usa `EntityScopedLoaderState`: una entita' per **codice e scope** (`list`, `details`, ...), con
  `ProductLoadingService` che unisce gli scope e gestisce ricaricamenti (`reloadOn`, `maxAge`).
- Spartacus ha anche `ProcessesLoaderState` (conteggio di processi in corso, usato dal carrello) e le utility
  `StateUtils` esportate pubblicamente.
- Oggi Spartacus sta migrando parte dei dati da NgRx al pattern **Query/Command** (`core-libs/core/src/util/command-query/`).

---

## Step 07 - Routing configurabile e pipe cxUrl

**Obiettivo:** le rotte hanno un **nome** (`product`, `cart`...). I path reali vengono dalla configurazione e
i link si generano per nome: `{ cxRoute: 'product', params: product } | cxUrl`.

**File originali Spartacus:**
- `core-libs/core/src/routing/configurable-routes/routes-config.ts` - `RouteConfig`, `ParamsMapping`
- `core-libs/core/src/routing/configurable-routes/configurable-routes.service.ts` - `ConfigurableRoutesService`
- `core-libs/core/src/routing/configurable-routes/url-translation/semantic-path.service.ts` - `SemanticPathService`
- `core-libs/core/src/routing/configurable-routes/url-translation/url.pipe.ts` - `UrlPipe`
- `core-libs/storefront/cms-structure/routing/default-routing-config.ts` - rotte di default

`examples/mini-spartacus/src/app/step07-routing/routing-config.ts`

```ts
/**
 * STEP 07 - Rotte configurabili
 * Ispirato a:
 *  - core-libs/core/src/routing/configurable-routes/routes-config.ts (RoutesConfig, RouteConfig, ParamsMapping)
 *  - core-libs/core/src/routing/configurable-routes/config/routing-config.ts (RoutingConfig + declare module)
 *  - core-libs/storefront/cms-structure/routing/default-routing-config.ts (default: product/:productCode/:name ...)
 *
 * Le rotte dell'app hanno un NOME (data.cxRoute). Il PATH vero viene dalla configurazione,
 * quindi un cliente puo' cambiare 'product/:productCode' in 'p/:productCode' senza toccare codice.
 */
export interface ParamsMapping {
  /** nome parametro nel path -> nome proprieta' nell'oggetto passato a cxUrl */
  [paramName: string]: string;
}

export interface RouteConfig {
  /** Il primo path "riempibile" coi parametri dati viene usato per generare i link. */
  paths?: string[];
  paramsMapping?: ParamsMapping;
  /** true = rotta spenta. */
  disabled?: boolean;
}

export interface RoutesConfig {
  [routeName: string]: RouteConfig | undefined;
}

export interface RoutingConfig {
  routing?: {
    routes?: RoutesConfig;
  };
}

declare module '../step01-config/config' {
  interface Config extends RoutingConfig {}
}

export const defaultRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      home: { paths: [''] },
      product: {
        paths: ['product/:productCode/:name', 'product/:productCode'],
        paramsMapping: { productCode: 'code', name: 'slug' },
      },
      search: { paths: ['search/:query'] },
      cart: { paths: ['cart'] },
      login: { paths: ['login'] },
    },
  },
};
```

`examples/mini-spartacus/src/app/step07-routing/configurable-routes.service.ts`

```ts
/**
 * STEP 07 - Applica i path configurati alle rotte con data.cxRoute
 * Ispirato a: core-libs/core/src/routing/configurable-routes/configurable-routes.service.ts
 *   (ConfigurableRoutesService.init/configure/configureRoutes/configureRoute)
 *
 * Differenza: Spartacus con piu' path usa un UrlMatcher combinato (UrlMatcherService.getFromPaths).
 * Qui, per semplicita', duplichiamo la rotta: una copia per ogni path.
 */
import { inject, Injectable, isDevMode } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { Config } from '../step01-config/config';
import { RouteConfig } from './routing-config';

/** Path segnaposto: una rotta cxRoute non configurata non deve mai combaciare. */
export const UNCONFIGURED_ROUTE_PREFIX = '__cx-unconfigured__';

@Injectable({ providedIn: 'root' })
export class ConfigurableRoutesService {
  private readonly config = inject(Config);
  private readonly router = inject(Router);
  private initialized = false;

  init(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.router.resetConfig(this.configureRoutes(this.router.config));
  }

  getRouteConfig(routeName: string): RouteConfig | undefined {
    return this.config.routing?.routes?.[routeName];
  }

  private configureRoutes(routes: Routes): Routes {
    return routes.flatMap((route) => {
      const configured = this.configureRoute(route);
      return configured.map((r) => (r.children?.length ? { ...r, children: this.configureRoutes(r.children) } : r));
    });
  }

  private configureRoute(route: Route): Route[] {
    const routeName = route.data?.['cxRoute'] as string | undefined;
    if (!routeName) {
      return [route]; // rotta "normale": invariata
    }
    const routeConfig = this.getRouteConfig(routeName);
    if (!routeConfig?.paths?.length || routeConfig.disabled) {
      if (isDevMode() && !routeConfig?.disabled) {
        console.warn(`Nessun path configurato per la rotta "${routeName}"`);
      }
      return []; // rotta spenta
    }
    return routeConfig.paths.map((path) => ({ ...route, path }));
  }
}
```

`examples/mini-spartacus/src/app/step07-routing/semantic-path.service.ts`

```ts
/**
 * STEP 07 - Da { cxRoute: 'product', params: prodotto } a ['/', 'product', '300938', 'photosmart']
 * Ispirato a:
 *  - core-libs/core/src/routing/configurable-routes/url-translation/semantic-path.service.ts
 *    (SemanticPathService.get/transform/generateUrlPart/findPathWithFillableParams/provideParamsValues)
 *  - core-libs/core/src/routing/configurable-routes/url-translation/url-command.ts (UrlCommand, UrlCommandRoute)
 *  - core-libs/core/src/routing/configurable-routes/url-translation/path-utils.ts (isParam, getParamName)
 */
import { inject, Injectable } from '@angular/core';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { ParamsMapping, RouteConfig } from './routing-config';

export interface UrlCommandRoute {
  cxRoute: string;
  params?: object;
}
export type UrlCommand = UrlCommandRoute | string;
export type UrlCommands = UrlCommand | UrlCommand[];

const isParam = (segment: string): boolean => segment.startsWith(':');
const getParamName = (segment: string): string => segment.slice(1);

@Injectable({ providedIn: 'root' })
export class SemanticPathService {
  private readonly routes = inject(ConfigurableRoutesService);
  readonly ROOT_URL = ['/'];

  /** Path "grezzo" della rotta (primo configurato), es. '/cart'. */
  get(routeName: string): string | undefined {
    const paths = this.routes.getRouteConfig(routeName)?.paths;
    return paths ? '/' + paths[0] : undefined;
  }

  /** Trasforma i comandi in un array utilizzabile da routerLink / router.navigate. */
  transform(commands: UrlCommands): string[] {
    const list = Array.isArray(commands) ? commands : [commands];
    const result: string[] = [];
    for (const command of list) {
      if (typeof command === 'string') {
        result.push(command);
        continue;
      }
      const part = this.generateUrlPart(command);
      if (part === null) {
        return this.ROOT_URL; // rotta sconosciuta o parametri mancanti -> home
      }
      result.push(...part);
    }
    if (typeof list[0] !== 'string') {
      result.unshift('/'); // i comandi cxRoute generano URL assoluti
    }
    return result;
  }

  private generateUrlPart(command: UrlCommandRoute): string[] | null {
    const routeConfig = this.routes.getRouteConfig(command.cxRoute);
    if (!routeConfig?.paths) {
      return null;
    }
    const params = (command.params ?? {}) as Record<string, unknown>;
    const path = this.findPathWithFillableParams(routeConfig, params);
    if (path === undefined) {
      return null;
    }
    return this.provideParamsValues(path, params, routeConfig.paramsMapping);
  }

  /** Il primo path i cui parametri sono tutti disponibili vince. */
  private findPathWithFillableParams(routeConfig: RouteConfig, params: Record<string, unknown>): string | undefined {
    return routeConfig.paths?.find((path) =>
      path
        .split('/')
        .filter(isParam)
        .every((segment) => {
          const name = getParamName(segment);
          const mapped = routeConfig.paramsMapping?.[name] ?? name;
          return params[mapped] !== undefined && params[mapped] !== null && params[mapped] !== '';
        })
    );
  }

  private provideParamsValues(path: string, params: Record<string, unknown>, mapping?: ParamsMapping): string[] {
    return path
      .split('/')
      .filter((segment) => segment !== '')
      .map((segment) => {
        if (!isParam(segment)) {
          return segment;
        }
        const name = getParamName(segment);
        return String(params[mapping?.[name] ?? name]);
      });
  }
}
```

`examples/mini-spartacus/src/app/step07-routing/url.pipe.ts`

```ts
/**
 * STEP 07 - Pipe cxUrl
 * Ispirato a: core-libs/core/src/routing/configurable-routes/url-translation/url.pipe.ts (UrlPipe)
 *
 * Uso: <a [routerLink]="{ cxRoute: 'product', params: product } | cxUrl">...</a>
 */
import { inject, Pipe, PipeTransform } from '@angular/core';
import { SemanticPathService, UrlCommands } from './semantic-path.service';

@Pipe({ name: 'cxUrl' })
export class UrlPipe implements PipeTransform {
  private readonly semanticPath = inject(SemanticPathService);

  transform(commands: UrlCommands): string[] {
    return this.semanticPath.transform(commands);
  }
}
```

`examples/mini-spartacus/src/app/step07-routing/routing.providers.ts`

```ts
/**
 * STEP 07 - Provider del routing configurabile
 * Ispirato a: core-libs/core/src/routing/routing.module.ts (RoutingModule.forRoot: initializer che chiama
 *   ConfigurableRoutesService.init prima della navigazione iniziale)
 */
import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { provideDefaultConfig } from '../step01-config/config';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { defaultRoutingConfig } from './routing-config';

export function provideConfigurableRoutes(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideDefaultConfig(defaultRoutingConfig),
    provideAppInitializer(() => inject(ConfigurableRoutesService).init()),
  ]);
}
```

**Spiegazione riga per riga dei punti chiave:**

- `paths: ['product/:productCode/:name', 'product/:productCode']`: la **prima** coppia di path e' per i link
  (se i parametri ci sono tutti); entrambi sono validi in ingresso.
- `paramsMapping: { productCode: 'code', name: 'slug' }`: il parametro `:productCode` si legge da `product.code`,
  `:name` da `product.slug`. Cosi' il template passa l'intero oggetto prodotto senza sapere come e' fatto il path.
- `router.resetConfig(this.configureRoutes(this.router.config))`: le rotte vengono riscritte **una volta**, in un
  app initializer, prima della navigazione iniziale.
- `configureRoute`: rotta senza `data.cxRoute` -> invariata; rotta non configurata o `disabled` -> eliminata;
  altrimenti una copia per ogni path (`flatMap`).
- `SemanticPathService.transform`: stringhe passate cosi' come sono; oggetti `{ cxRoute }` trasformati in segmenti.
  Se manca un parametro o la rotta: si torna a `['/']` (mai link rotti).
- `result.unshift('/')`: un comando che inizia con `cxRoute` produce sempre un URL assoluto.
- `UrlPipe` e' **pura** (default): con lo stesso oggetto in ingresso non ricalcola.
- Il prefisso `/electronics-spa/en/USD` **non** compare qui: lo aggiunge il serializer dello Step 02 quando il Router
  trasforma i comandi in URL.

**Come testarlo:** aggiungi in `app.config.ts` `provideConfig({ routing: { routes: { product: { paths: ['p/:productCode'] } } } })`:
i link del carosello diventano `/electronics-spa/en/USD/p/300938` e la pagina prodotto continua a funzionare,
senza toccare componenti o rotte.

**Differenze rispetto a Spartacus reale:**

- Spartacus usa `UrlMatcher` combinati (`core-libs/core/src/routing/services/url-matcher.service.ts`) invece di
  duplicare le rotte; supporta `matchers` custom (es. `product-details-url-matcher.ts` per URL SEO) e rotte
  `protected` (login richiesto) con `AuthGuard` e `ProtectedRoutesGuard`.
- Esiste `ProductURLPipe` / `cxProductUrl` e il sistema di i18n dei path.

---

## Step 08 - CmsService: la pagina arriva dal backend

**Obiettivo:** per ogni rotta, capire **quale pagina CMS** serve (`PageContext`), caricarla da
`/cms/pages?pageType=...&pageLabelOrId=...` (o `code=...`), normalizzarla e renderla disponibile ai componenti.

**File originali Spartacus:**
- `core-libs/core/src/occ/adapters/cms/occ-cms-page.adapter.ts` - `OccCmsPageAdapter.load`, `getPagesRequestParams`
- `core-libs/core/src/occ/adapters/cms/converters/occ-cms-page-normalizer.ts` - `OccCmsPageNormalizer`
- `core-libs/core/src/occ/adapters/cms/occ-cms-component.adapter.ts` - `findComponentsByIds`
- `core-libs/core/src/cms/facade/cms.service.ts` - `getCurrentPage`, `getContentSlot`, `getComponentData`
- `core-libs/core/src/routing/models/page-context.model.ts` - `PageContext`, `HOME_PAGE_CONTEXT`
- `core-libs/storefront/cms-structure/guards/cms-page.guard.ts` - `CmsPageGuard`

`examples/mini-spartacus/src/app/step08-cms/cms.model.ts`

```ts
/**
 * STEP 08 - Modelli CMS
 * Ispirato a:
 *  - core-libs/core/src/model/cms.model.ts               (PageType, CmsComponent, ContentSlotComponentData)
 *  - core-libs/core/src/cms/model/page.model.ts          (Page, ContentSlotData, CmsStructureModel)
 *  - core-libs/core/src/routing/models/page-context.model.ts (PageContext, HOME_PAGE_CONTEXT)
 *  - core-libs/core/src/occ/occ-models/occ.models.ts     (Occ.CMSPage, Occ.ContentSlot, Occ.Component)
 */

export enum PageType {
  CONTENT_PAGE = 'ContentPage',
  PRODUCT_PAGE = 'ProductPage',
  CATEGORY_PAGE = 'CategoryPage',
  CATALOG_PAGE = 'CatalogPage',
}

/** "Quale pagina CMS mi serve?": id + tipo. */
export interface PageContext {
  id: string;
  type?: PageType;
}

export const HOME_PAGE_CONTEXT = '__HOMEPAGE__';
export const NOT_FOUND_CONTEXT: PageContext = { id: 'notFound', type: PageType.CONTENT_PAGE };

/** Dati di un componente CMS. Le proprieta' dipendono dal tipo (content, media, productCodes...). */
export interface CmsComponent {
  uid?: string;
  typeCode?: string;
  name?: string;
  flexType?: string;
  [property: string]: unknown;
}

/** Riferimento a un componente dentro uno slot. */
export interface ContentSlotComponentData {
  uid: string;
  typeCode: string;
  /** Per i CMSFlexComponent il "vero" tipo e' flexType; per gli altri coincide con typeCode. */
  flexType: string;
}

export interface ContentSlotData {
  components: ContentSlotComponentData[];
}

export interface Page {
  pageId: string;
  type: PageType;
  template: string;
  title: string;
  label?: string;
  /** position -> slot */
  slots: { [position: string]: ContentSlotData };
}

/** Risultato normalizzato del caricamento: la pagina + i dati dei componenti trovati. */
export interface CmsStructureModel {
  page: Page;
  components: CmsComponent[];
}

// ---- Formato OCC -----------------------------------------------------------------
export interface OccCmsComponent extends CmsComponent {
  uid: string;
  typeCode: string;
}

export interface OccContentSlot {
  slotId?: string;
  position?: string;
  components?: { component?: OccCmsComponent[] };
}

export interface OccCmsPage {
  uid?: string;
  typeCode?: string;
  template?: string;
  title?: string;
  name?: string;
  label?: string;
  contentSlots?: { contentSlot?: OccContentSlot[] };
}

export interface OccCmsComponentList {
  component?: OccCmsComponent[];
}
```

`examples/mini-spartacus/src/app/step08-cms/occ-cms.adapter.ts`

```ts
/**
 * STEP 08 - Caricamento pagine e componenti CMS da OCC
 * Ispirato a:
 *  - core-libs/core/src/cms/connectors/page/cms-page.adapter.ts   (CmsPageAdapter)
 *  - core-libs/core/src/cms/connectors/page/converters.ts         (CMS_PAGE_NORMALIZER)
 *  - core-libs/core/src/occ/adapters/cms/occ-cms-page.adapter.ts  (OccCmsPageAdapter.load, getPagesRequestParams)
 *  - core-libs/core/src/occ/adapters/cms/converters/occ-cms-page-normalizer.ts (OccCmsPageNormalizer)
 *  - core-libs/core/src/occ/adapters/cms/occ-cms-component.adapter.ts (OccCmsComponentAdapter.findComponentsByIds)
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OccEndpointsService } from '../step03-occ-endpoints/occ-endpoints.service';
import { Converter, ConverterService } from '../step05-product-data/converter.service';
import {
  CmsComponent,
  CmsStructureModel,
  ContentSlotData,
  HOME_PAGE_CONTEXT,
  OccCmsComponentList,
  OccCmsPage,
  PageContext,
  PageType,
} from './cms.model';

export const CMS_PAGE_NORMALIZER = new InjectionToken<Converter<OccCmsPage, CmsStructureModel>[]>('CmsPageNormalizer');

/** Contratto astratto: come si carica una pagina CMS (OCC, mock, headless CMS...). */
export abstract class CmsPageAdapter {
  abstract load(pageContext: PageContext): Observable<CmsStructureModel>;
  abstract loadComponents(uids: string[]): Observable<CmsComponent[]>;
}

@Injectable()
export class OccCmsPageAdapter implements CmsPageAdapter {
  private readonly http = inject(HttpClient);
  private readonly occEndpoints = inject(OccEndpointsService);
  private readonly converter = inject(ConverterService);

  load(pageContext: PageContext): Observable<CmsStructureModel> {
    const url = this.occEndpoints.buildUrl('pages', { queryParams: this.getPagesRequestParams(pageContext) });
    return this.http.get<OccCmsPage>(url).pipe(this.converter.pipeable(CMS_PAGE_NORMALIZER));
  }

  loadComponents(uids: string[]): Observable<CmsComponent[]> {
    const url = this.occEndpoints.buildUrl('components', { queryParams: { componentIds: uids.join(',') } });
    return this.http.get<OccCmsComponentList>(url).pipe(map((list) => list.component ?? []));
  }

  /**
   * ContentPage -> ?pageType=ContentPage&pageLabelOrId=/faq
   * Altri tipi  -> ?pageType=ProductPage&code=300938
   * Homepage    -> nessun parametro (il backend restituisce la homepage)
   */
  private getPagesRequestParams(context: PageContext): Record<string, string> {
    if (context.id === HOME_PAGE_CONTEXT) {
      return {};
    }
    const params: Record<string, string> = {};
    if (context.type) {
      params['pageType'] = context.type;
    }
    if (context.type === PageType.CONTENT_PAGE) {
      params['pageLabelOrId'] = context.id;
    } else {
      params['code'] = context.id;
    }
    return params;
  }
}

/** OCC CMSPage -> Page (slot indicizzati per position) + lista piatta dei componenti. */
@Injectable({ providedIn: 'root' })
export class OccCmsPageNormalizer implements Converter<OccCmsPage, CmsStructureModel> {
  convert(source: OccCmsPage, target?: CmsStructureModel): CmsStructureModel {
    const result: CmsStructureModel = target ?? {
      page: {
        pageId: source.uid ?? '',
        type: (source.typeCode as PageType) ?? PageType.CONTENT_PAGE,
        template: source.template ?? '',
        title: source.title ?? source.name ?? '',
        label: source.label,
        slots: {},
      },
      components: [],
    };
    for (const slot of source.contentSlots?.contentSlot ?? []) {
      if (!slot.position) {
        continue;
      }
      const slotData: ContentSlotData = { components: [] };
      for (const component of slot.components?.component ?? []) {
        slotData.components.push({
          uid: component.uid,
          typeCode: component.typeCode,
          flexType: component.typeCode === 'CMSFlexComponent' ? (component.flexType ?? component.typeCode) : component.typeCode,
        });
        result.components.push(component);
      }
      result.page.slots[slot.position] = slotData;
    }
    return result;
  }
}
```

`examples/mini-spartacus/src/app/step08-cms/page-context.ts`

```ts
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
```

`examples/mini-spartacus/src/app/step08-cms/cms.service.ts`

```ts
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
```

`examples/mini-spartacus/src/app/step08-cms/cms-page.guard.ts`

```ts
/**
 * STEP 08 - Guard: la rotta si attiva solo quando la pagina CMS e' pronta
 * Ispirato a:
 *  - core-libs/storefront/cms-structure/guards/cms-page.guard.ts        (CmsPageGuard.canActivate)
 *  - core-libs/storefront/cms-structure/guards/cms-page-guard.service.ts (canActivatePage / canActivateNotFoundPage)
 *
 * Vantaggio: niente "flash" di pagina vuota, e in SSR il render aspetta i dati CMS.
 */
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { CmsService } from './cms.service';
import { pageContextFromSnapshot } from './page-context';

export const cmsPageGuard: CanActivateFn = (route) =>
  inject(CmsService)
    .loadPageOrNotFound(pageContextFromSnapshot(route))
    .pipe(
      take(1),
      map(() => true)
    );
```

`examples/mini-spartacus/src/app/step08-cms/cms.providers.ts`

```ts
/**
 * STEP 08 - Provider CMS
 * Ispirato a:
 *  - core-libs/core/src/occ/adapters/cms/cms-occ.module.ts (CmsPageAdapter -> OccCmsPageAdapter, CMS_PAGE_NORMALIZER)
 *  - core-libs/core/src/cms/cms.module.ts                   (CmsModule.forRoot)
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { CMS_PAGE_NORMALIZER, CmsPageAdapter, OccCmsPageAdapter, OccCmsPageNormalizer } from './occ-cms.adapter';

export function provideCms(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: CmsPageAdapter, useClass: OccCmsPageAdapter },
    { provide: CMS_PAGE_NORMALIZER, useExisting: OccCmsPageNormalizer, multi: true },
  ]);
}
```

**Spiegazione riga per riga dei punti chiave:**

- `getPagesRequestParams`: **ContentPage** si cerca per label (`pageLabelOrId=/faq`), gli altri tipi per codice
  (`code=300938`). E' la regola di OCC, copiata dall'originale.
- `flexType`: per un `CMSFlexComponent` il "tipo vero" e' il campo `flexType` (es. `CartComponent`); per tutti gli
  altri e' il `typeCode`. Il mapping dello Step 09 usa sempre `flexType`.
- `OccCmsPageNormalizer`: da `contentSlots.contentSlot[]` a `slots[position]`. I **dati** dei componenti (content,
  media, productCodes...) finiscono in `components[]` e poi nella cache di `CmsService`; lo slot conserva solo i riferimenti.
- `pageContextFromSnapshot`: la foglia della rotta decide: `pageType: ProductPage` + `:productCode`, oppure
  `data.pageLabel`, oppure l'URL stesso (rotta `**`: `/faq` e' la label della ContentPage).
- `PageContextService.pageContext$`: ricalcolato ad ogni `NavigationEnd`; `filter(() => router.navigated)` evita il
  contesto "vuoto" prima della prima navigazione.
- `CmsService.loadPage`: cache per `lingua|valuta|tipo|id`. `shareReplay({ refCount: false })` = una sola richiesta
  anche se guard, layout e slot la chiedono insieme. `catchError(() => of(null))`: una 404 non rompe l'app.
- `loadPageOrNotFound`: pagina inesistente -> pagina CMS `notFound`. Stesso comportamento di `CmsPageGuard`.
- `getComponentData`: se i dati mancano (componente non incluso nella pagina) li chiede all'endpoint `components`
  con `componentIds=...`. `requestedComponents` evita richieste doppie.
- `cmsPageGuard`: la rotta si attiva **solo** quando la pagina e' in cache. In SSR significa che il render aspetta il CMS.

**Come testarlo:** con il mock acceso, `/electronics-spa/en/USD/faq` mostra "FAQ" (ContentPage per label),
`/electronics-spa/en/USD/qualunque-cosa` mostra "404 - Pagina non trovata" (pagina CMS `notFound`),
`/electronics-spa/en/USD/product/300938/x` usa il template `ProductDetailsPageTemplate`.

**Differenze rispetto a Spartacus reale:**

- Spartacus salva pagine e componenti nello store NgRx `cms` (con `pageData`, `components` per contesto, `navigation`),
  con effect che ricaricano al cambio lingua e al login.
- Il `PageContext` e' calcolato dal `CustomSerializer` del router store (`core-libs/core/src/routing/store/reducers/router.reducer.ts`),
  che conosce anche le pagine categoria, le pagine "semantic" e l'anteprima SmartEdit.
- `CmsPageGuard` gestisce redirect, pagine protette e `BEFORE_CMS_PAGE_GUARD`; in SSR imposta lo status 404.
- Il caricamento dei componenti mancanti e' raggruppato (`componentsLoading.pageSize: 50`) e sensibile alla pagina.

---

## Step 09 - PageLayout, PageSlot e ComponentWrapper

**Obiettivo:** trasformare `template + slot + componenti` in componenti Angular a schermo, scegliendo il
componente giusto per ogni `typeCode` **a runtime**, con `createComponent` e un injector dedicato.

**File originali Spartacus:**
- `core-libs/storefront/cms-structure/page/page-layout/page-layout.component.ts` - `PageLayoutComponent`
- `core-libs/storefront/cms-structure/page/page-layout/page-layout.service.ts` - `getSlots`, `resolveSlots`
- `core-libs/storefront/cms-structure/page/slot/page-slot.component.ts` - `PageSlotComponent`
- `core-libs/storefront/cms-structure/page/component/component-wrapper.directive.ts` - `ComponentWrapperDirective`
- `core-libs/storefront/cms-structure/page/component/handlers/default-component.handler.ts` - `DefaultComponentHandler.launcher`
- `core-libs/storefront/cms-structure/page/component/services/cms-injector.service.ts` - `CmsInjectorService.getInjector`
- `core-libs/storefront/cms-structure/page/model/cms-component-data.ts` - `CmsComponentData`
- `core-libs/storefront/cms-structure/services/cms-components.service.ts` - `CmsComponentsService`

`examples/mini-spartacus/src/app/step09-page-layout/layout-config.ts`

```ts
/**
 * STEP 09 - Configurazione di layout e mapping dei componenti CMS
 * Ispirato a:
 *  - core-libs/storefront/layout/config/layout-config.ts (LayoutConfig.layoutSlots, LayoutSlotConfig)
 *  - core-libs/storefront/recipes/config/layout-config.ts (layout di default: header, footer, LandingPage2Template...)
 *  - core-libs/core/src/cms/config/cms-config.ts          (CmsConfig.cmsComponents, CmsComponentMapping)
 */
import { Provider, Type } from '@angular/core';

export interface LayoutSlotConfig {
  slots?: string[];
}

export interface CmsComponentMapping {
  /** Componente Angular da istanziare per questo typeCode/flexType. */
  component?: Type<unknown>;
  /** Provider extra dati solo a questa istanza (nell'injector creato dal wrapper). */
  providers?: Provider[];
}

export interface CmsComponentsMapping {
  [typeCode: string]: CmsComponentMapping | undefined;
}

export interface LayoutConfig {
  /** Nome template (o sezione) -> elenco ordinato degli slot da mostrare. */
  layoutSlots?: { [templateOrSection: string]: LayoutSlotConfig | undefined };
  cmsComponents?: CmsComponentsMapping;
}

declare module '../step01-config/config' {
  interface Config extends LayoutConfig {}
}

export const defaultLayoutConfig: LayoutConfig = {
  layoutSlots: {
    header: { slots: ['SiteContext', 'SiteLogo', 'SearchBox', 'SiteLogin', 'MiniCart'] },
    footer: { slots: ['Footer'] },
    LandingPage2Template: { slots: ['Section1', 'Section2A', 'Section3'] },
    ProductDetailsPageTemplate: { slots: ['Summary'] },
    CartPageTemplate: { slots: ['TopContent'] },
    LoginPageTemplate: { slots: ['LeftContentSlot'] },
    SearchResultsListPageTemplate: { slots: ['SearchResultsListSlot'] },
    ContentPage1Template: { slots: ['Section2A'] },
  },
};
```

`examples/mini-spartacus/src/app/step09-page-layout/cms-component-data.ts`

```ts
/**
 * STEP 09 - CmsComponentData: cosa riceve ogni componente CMS
 * Ispirato a: core-libs/storefront/cms-structure/page/model/cms-component-data.ts (CmsComponentData)
 *
 * Il wrapper crea un injector dedicato in cui CmsComponentData = { uid, data$ }.
 * Il componente fa: data$ = inject(CmsComponentData<CmsParagraphComponent>).data$
 */
import { Observable } from 'rxjs';
import { CmsComponent } from '../step08-cms/cms.model';

export abstract class CmsComponentData<T extends CmsComponent = CmsComponent> {
  abstract readonly uid: string;
  abstract readonly data$: Observable<T | undefined>;
}
```

`examples/mini-spartacus/src/app/step09-page-layout/cms-components.service.ts`

```ts
/**
 * STEP 09 - Risoluzione del mapping typeCode -> componente
 * Ispirato a: core-libs/storefront/cms-structure/services/cms-components.service.ts
 *   (CmsComponentsService.determineMappings / getMapping: prima la config, poi le feature lazy)
 *
 * Punto di estensione: CMS_MAPPING_RESOLVERS. Lo STEP 11 registra un resolver che
 * trova il componente dentro una feature caricata in lazy loading.
 */
import { EnvironmentInjector, inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Config } from '../step01-config/config';
import { CmsComponentMapping } from './layout-config';

export interface ResolvedCmsMapping {
  mapping: CmsComponentMapping;
  /** Injector "di ambiente" da cui dipende il componente (root o quello della feature lazy). */
  injector: EnvironmentInjector;
}

export interface CmsMappingResolver {
  /** undefined = "non e' roba mia", altrimenti l'Observable del mapping risolto. */
  resolve(typeCode: string): Observable<ResolvedCmsMapping | undefined> | undefined;
}

export const CMS_MAPPING_RESOLVERS = new InjectionToken<CmsMappingResolver[]>('CmsMappingResolvers');

@Injectable({ providedIn: 'root' })
export class CmsComponentsService {
  private readonly config = inject(Config);
  private readonly rootInjector = inject(EnvironmentInjector);
  private readonly resolvers = inject(CMS_MAPPING_RESOLVERS, { optional: true }) ?? [];

  getMapping(typeCode: string): Observable<ResolvedCmsMapping | undefined> {
    const mapping = this.config.cmsComponents?.[typeCode];
    if (mapping?.component) {
      return of({ mapping, injector: this.rootInjector });
    }
    for (const resolver of this.resolvers) {
      const resolved = resolver.resolve(typeCode);
      if (resolved) {
        return resolved;
      }
    }
    return of(undefined); // componente non mappato: non si renderizza nulla (come Spartacus)
  }
}
```

`examples/mini-spartacus/src/app/step09-page-layout/component-wrapper.directive.ts`

```ts
/**
 * STEP 09 - ComponentWrapperDirective: istanzia il componente Angular giusto per un componente CMS
 * Ispirato a:
 *  - core-libs/storefront/cms-structure/page/component/component-wrapper.directive.ts (ComponentWrapperDirective)
 *  - core-libs/storefront/cms-structure/page/component/handlers/default-component.handler.ts (createComponent)
 *  - core-libs/storefront/cms-structure/page/component/services/cms-injector.service.ts (Injector con CmsComponentData)
 */
import {
  ComponentRef,
  Directive,
  inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ContentSlotComponentData } from '../step08-cms/cms.model';
import { CmsService } from '../step08-cms/cms.service';
import { CmsComponentData } from './cms-component-data';
import { CmsComponentsService } from './cms-components.service';

@Directive({ selector: '[cxComponentWrapper]' })
export class ComponentWrapperDirective implements OnInit, OnDestroy {
  @Input({ required: true }) cxComponentWrapper!: ContentSlotComponentData;

  private readonly vcr = inject(ViewContainerRef);
  private readonly cmsComponents = inject(CmsComponentsService);
  private readonly cmsService = inject(CmsService);
  private readonly renderer = inject(Renderer2);

  private componentRef?: ComponentRef<unknown>;
  private subscription?: Subscription;

  ngOnInit(): void {
    const { uid, flexType } = this.cxComponentWrapper;
    this.subscription = this.cmsComponents
      .getMapping(flexType)
      .pipe(take(1))
      .subscribe((resolved) => {
        if (!resolved?.mapping.component) {
          return;
        }
        // Injector dedicato: CmsComponentData + eventuali provider del mapping.
        const injector = Injector.create({
          providers: [
            { provide: CmsComponentData, useValue: { uid, data$: this.cmsService.getComponentData(uid) } },
            ...(resolved.mapping.providers ?? []),
          ],
          parent: resolved.injector,
        });
        this.componentRef = this.vcr.createComponent(resolved.mapping.component, {
          injector,
          environmentInjector: resolved.injector,
        });
        // Classe CSS utile per stili e test: <cx-paragraph class="CMSParagraphComponent">
        this.renderer.addClass(this.componentRef.location.nativeElement, flexType);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.componentRef?.destroy();
  }
}
```

`examples/mini-spartacus/src/app/step09-page-layout/page-slot.component.ts`

```ts
/**
 * STEP 09 - PageSlotComponent: renderizza i componenti di UNO slot
 * Ispirato a: core-libs/storefront/cms-structure/page/slot/page-slot.component.ts
 *   (PageSlotComponent: position -> CmsService.getContentSlot -> *ngFor cxComponentWrapper)
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsService } from '../step08-cms/cms.service';
import { ComponentWrapperDirective } from './component-wrapper.directive';

@Component({
  selector: 'cx-page-slot',
  imports: [AsyncPipe, ComponentWrapperDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.position]': 'position', '[class]': 'position' },
  template: `
    @for (component of components$ | async; track component.uid) {
      <ng-container [cxComponentWrapper]="component" />
    }
  `,
})
export class PageSlotComponent {
  private readonly cmsService = inject(CmsService);
  private readonly position$ = new BehaviorSubject<string | undefined>(undefined);

  @Input() set position(value: string | undefined) {
    this.position$.next(value);
  }
  get position(): string | undefined {
    return this.position$.value;
  }

  readonly components$ = this.position$.pipe(
    switchMap((position) => (position ? this.cmsService.getContentSlot(position) : of(undefined))),
    map((slot) => slot?.components ?? [])
  );
}
```

`examples/mini-spartacus/src/app/step09-page-layout/page-layout.component.ts`

```ts
/**
 * STEP 09 - PageLayoutComponent: dal template CMS all'elenco di slot
 * Ispirato a:
 *  - core-libs/storefront/cms-structure/page/page-layout/page-layout.component.ts (PageLayoutComponent: section, layoutName$, slots$)
 *  - core-libs/storefront/cms-structure/page/page-layout/page-layout.service.ts   (PageLayoutService.getSlots/resolveSlots)
 *
 * Due usi:
 *   <cx-page-layout section="header" />  -> slot della sezione 'header' (layoutSlots.header)
 *   <cx-page-layout />                   -> slot del TEMPLATE della pagina corrente (es. LandingPage2Template)
 *
 * Le righe con cxOutlet sono il punto di aggancio dello STEP 10: il layout intero e ogni slot
 * sono "outlet" che l'app puo' sostituire o arricchire (BEFORE/REPLACE/AFTER).
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Config } from '../step01-config/config';
import { Page } from '../step08-cms/cms.model';
import { CmsService } from '../step08-cms/cms.service';
import { OutletDirective } from '../step10-outlets/outlet.directive';
import { PageSlotComponent } from './page-slot.component';

interface LayoutViewModel {
  layoutName: string;
  slots: string[];
  page: Page | null;
}

@Component({
  selector: 'cx-page-layout',
  imports: [AsyncPipe, PageSlotComponent, OutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (layout$ | async; as layout) {
      <ng-template [cxOutlet]="layout.layoutName" [cxOutletContext]="layout">
        <div class="cx-layout" [class]="layout.layoutName">
          @for (slot of layout.slots; track slot) {
            <ng-template [cxOutlet]="slot" [cxOutletContext]="layout.page">
              <cx-page-slot [position]="slot" />
            </ng-template>
          }
        </div>
      </ng-template>
    }
  `,
})
export class PageLayoutComponent {
  private readonly cmsService = inject(CmsService);
  private readonly config = inject(Config);
  private readonly section$ = new BehaviorSubject<string | undefined>(undefined);

  @Input() set section(value: string | undefined) {
    this.section$.next(value);
  }

  readonly layout$: Observable<LayoutViewModel | null> = this.section$.pipe(
    switchMap((section) =>
      section
        ? of({ layoutName: section, slots: this.getSlots(section), page: null })
        : this.cmsService.getCurrentPage().pipe(
            map((page) =>
              page
                ? { layoutName: page.template, slots: this.getSlots(page.template, Object.keys(page.slots)), page }
                : null
            )
          )
    )
  );

  /** Slot configurati per template/sezione; se il template non e' configurato, tutti quelli della pagina. */
  private getSlots(templateOrSection: string, fallback: string[] = []): string[] {
    return this.config.layoutSlots?.[templateOrSection]?.slots ?? fallback;
  }
}
```

`examples/mini-spartacus/src/app/step09-page-layout/page-layout.providers.ts`

```ts
/**
 * STEP 09 - Layout di default + mapping dei componenti CMS "eager"
 * Ispirato a:
 *  - core-libs/storefront/cms-components/content/paragraph/paragraph.module.ts
 *    (ogni modulo di componente fa provideDefaultConfig({ cmsComponents: { CMSParagraphComponent: {...} } }))
 *  - core-libs/storefront/recipes/config/layout-config.ts (layoutSlots di default)
 *
 * La mappa usa il flexType: per i CMSFlexComponent e' il campo flexType, per gli altri il typeCode.
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideDefaultConfig } from '../step01-config/config';
import { LoginFormComponent } from '../step04-auth/login-form.component';
import { LoginStatusComponent } from '../step04-auth/login-status.component';
import { BannerComponent, ParagraphComponent } from './components/content.components';
import {
  ProductCarouselComponent,
  ProductImagesComponent,
  ProductIntroComponent,
  ProductSummaryComponent,
} from './components/product.components';
import { SearchBoxComponent, SearchResultsComponent } from './components/search.components';
import { SiteContextSelectorComponent } from './components/site-context-selector.component';
import { defaultLayoutConfig } from './layout-config';

export function providePageLayout(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideDefaultConfig(defaultLayoutConfig),
    provideDefaultConfig({
      cmsComponents: {
        CMSParagraphComponent: { component: ParagraphComponent },
        SimpleBannerComponent: { component: BannerComponent },
        ProductCarouselComponent: { component: ProductCarouselComponent },
        ProductIntroComponent: { component: ProductIntroComponent },
        ProductImagesComponent: { component: ProductImagesComponent },
        ProductSummaryComponent: { component: ProductSummaryComponent },
        SearchBoxComponent: { component: SearchBoxComponent },
        SearchResultsListComponent: { component: SearchResultsComponent },
        CMSSiteContextComponent: { component: SiteContextSelectorComponent },
        ReturningCustomerLoginComponent: { component: LoginFormComponent },
        LoginComponent: { component: LoginStatusComponent },
      },
    }),
  ]);
}
```

I componenti CMS mappati (ognuno e' un normale componente standalone che legge i dati da `CmsComponentData`
o dai servizi):

`examples/mini-spartacus/src/app/step09-page-layout/components/current-product.service.ts`

```ts
/**
 * STEP 09 - Prodotto della pagina corrente (dal parametro :productCode)
 * Ispirato a: core-libs/storefront/cms-components/product/current-product.service.ts (CurrentProductService.getProduct)
 */
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { Product } from '../../step05-product-data/product.model';
import { ProductService } from '../../step06-ngrx-product/product.service';

@Injectable({ providedIn: 'root' })
export class CurrentProductService {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  private readonly productCode$: Observable<string | undefined> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(undefined),
    map(() => {
      let route = this.router.routerState.snapshot.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route.params['productCode'] as string | undefined;
    }),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getProduct(): Observable<Product | undefined> {
    return this.productCode$.pipe(switchMap((code) => this.productService.get(code)));
  }

  getProductCode(): Observable<string | undefined> {
    return this.productCode$;
  }
}
```

`examples/mini-spartacus/src/app/step09-page-layout/components/content.components.ts`

```ts
/**
 * STEP 09 - Componenti CMS di contenuto: paragrafo e banner
 * Ispirato a:
 *  - core-libs/storefront/cms-components/content/paragraph/paragraph.component.ts (ParagraphComponent)
 *  - core-libs/storefront/cms-components/content/banner/banner.component.ts       (BannerComponent)
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Config } from '../../step01-config/config';
import { CmsComponent } from '../../step08-cms/cms.model';
import { CmsComponentData } from '../cms-component-data';

export interface CmsParagraphComponent extends CmsComponent {
  content?: string;
}

export interface CmsBannerComponent extends CmsComponent {
  urlLink?: string;
  media?: { url?: string; altText?: string };
}

@Component({
  selector: 'cx-paragraph',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // innerHTML passa dal sanitizer di Angular: script e handler inline vengono rimossi.
  template: `
    @if (data$ | async; as data) {
      <div [innerHTML]="data.content"></div>
    }
  `,
})
export class ParagraphComponent {
  readonly data$ = inject<CmsComponentData<CmsParagraphComponent>>(CmsComponentData).data$;
}

@Component({
  selector: 'cx-banner',
  imports: [AsyncPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (data$ | async; as data) {
      <a [routerLink]="data.urlLink ?? '/'">
        <img [src]="mediaUrl(data.media?.url)" [alt]="data.media?.altText ?? ''" />
      </a>
    }
  `,
})
export class BannerComponent {
  private readonly config = inject(Config);
  readonly data$ = inject<CmsComponentData<CmsBannerComponent>>(CmsComponentData).data$;

  mediaUrl(url: string | undefined): string {
    if (!url) {
      return '';
    }
    const base = this.config.backend?.media?.baseUrl ?? this.config.backend?.occ?.baseUrl ?? '';
    return /^(https?:)?\/\//.test(url) ? url : base + url;
  }
}
```

`examples/mini-spartacus/src/app/step09-page-layout/components/product.components.ts`

```ts
/**
 * STEP 09 - Componenti CMS del prodotto
 * Ispirato a:
 *  - core-libs/storefront/cms-components/product/carousel/product-carousel/product-carousel.component.ts (ProductCarouselComponent)
 *  - core-libs/storefront/cms-components/product/product-intro/product-intro.component.ts   (ProductIntroComponent)
 *  - core-libs/storefront/cms-components/product/product-images/product-images.component.ts (ProductImagesComponent)
 *  - core-libs/storefront/cms-components/product/product-summary/product-summary.component.ts (ProductSummaryComponent,
 *    che usa l'outlet ProductDetailOutlets.PRICE = 'PDP.PRICE')
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../../step05-product-data/product.model';
import { ProductService } from '../../step06-ngrx-product/product.service';
import { UrlPipe } from '../../step07-routing/url.pipe';
import { CmsComponent } from '../../step08-cms/cms.model';
import { OutletDirective } from '../../step10-outlets/outlet.directive';
import { CmsComponentData } from '../cms-component-data';
import { CurrentProductService } from './current-product.service';

export interface CmsProductCarouselComponent extends CmsComponent {
  title?: string;
  /** Codici separati da spazio, come in OCC: "300938 1934793" */
  productCodes?: string;
}

@Component({
  selector: 'cx-product-carousel',
  imports: [AsyncPipe, RouterLink, UrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>{{ (title$ | async) ?? '' }}</h3>
    <ul class="carousel">
      @for (product of products$ | async; track product.code) {
        <li>
          <a [routerLink]="{ cxRoute: 'product', params: product } | cxUrl">
            <img [src]="product.images?.PRIMARY?.['product']?.url ?? ''" [alt]="product.name ?? ''" width="150" />
            <span>{{ product.name }}</span>
          </a>
          <strong>{{ product.price?.formattedValue }}</strong>
        </li>
      }
    </ul>
  `,
})
export class ProductCarouselComponent {
  private readonly productService = inject(ProductService);
  private readonly data$ = inject<CmsComponentData<CmsProductCarouselComponent>>(CmsComponentData).data$;

  readonly title$ = this.data$.pipe(map((data) => data?.title));

  readonly products$: Observable<Product[]> = this.data$.pipe(
    map((data) => (data?.productCodes ?? '').split(' ').filter(Boolean)),
    switchMap((codes) => (codes.length ? combineLatest(codes.map((code) => this.productService.get(code))) : of([]))),
    map((products) => products.filter((p): p is Product => !!p))
  );
}

@Component({
  selector: 'cx-product-intro',
  imports: [AsyncPipe, OutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product$ | async; as product) {
      <h1>{{ product.name }}</h1>
      <ng-template cxOutlet="PDP.PRICE" [cxOutletContext]="product">
        <p class="price">{{ product.price?.formattedValue }}</p>
      </ng-template>
    }
  `,
})
export class ProductIntroComponent {
  readonly product$ = inject(CurrentProductService).getProduct();
}

@Component({
  selector: 'cx-product-images',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product$ | async; as product) {
      <img [src]="product.images?.PRIMARY?.['product']?.url ?? ''" [alt]="product.name ?? ''" width="300" />
    }
  `,
})
export class ProductImagesComponent {
  readonly product$ = inject(CurrentProductService).getProduct();
}

@Component({
  selector: 'cx-product-summary',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product$ | async; as product) {
      <p>{{ product.summary }}</p>
      <p>Disponibilita': {{ product.stock?.stockLevelStatus ?? 'n.d.' }}</p>
      <div [innerHTML]="product.description"></div>
    }
  `,
})
export class ProductSummaryComponent {
  readonly product$ = inject(CurrentProductService).getProduct();
}
```

`examples/mini-spartacus/src/app/step09-page-layout/components/search.components.ts`

```ts
/**
 * STEP 09 - Ricerca: box nell'header e lista risultati
 * Ispirato a:
 *  - core-libs/storefront/cms-components/navigation/search-box/search-box.component.ts (SearchBoxComponent.launchSearchResult)
 *  - core-libs/storefront/cms-components/product/product-list/container/product-list.component.ts (lista risultati)
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import { ProductSearchPage } from '../../step05-product-data/product.model';
import { ProductSearchService } from '../../step05-product-data/product-search.service';
import { SemanticPathService } from '../../step07-routing/semantic-path.service';
import { UrlPipe } from '../../step07-routing/url.pipe';

@Component({
  selector: 'cx-searchbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form role="search" (submit)="search($event, box.value)">
      <label>
        <span class="visually-hidden">Cerca</span>
        <input #box type="search" name="q" placeholder="Cerca prodotti" />
      </label>
      <button type="submit">Cerca</button>
    </form>
  `,
})
export class SearchBoxComponent {
  private readonly router = inject(Router);
  private readonly semanticPath = inject(SemanticPathService);

  search(event: Event, query: string): void {
    event.preventDefault();
    if (query.trim()) {
      void this.router.navigate(this.semanticPath.transform({ cxRoute: 'search', params: { query: query.trim() } }));
    }
  }
}

@Component({
  selector: 'cx-search-results',
  imports: [AsyncPipe, RouterLink, UrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (result$ | async; as result) {
      <h2>{{ result.totalResults }} risultati per "{{ result.freeTextSearch }}"</h2>
      <ul>
        @for (product of result.products; track product.code) {
          <li>
            <a [routerLink]="{ cxRoute: 'product', params: product } | cxUrl">{{ product.name }}</a>
            - {{ product.price?.formattedValue }}
          </li>
        }
      </ul>
    }
  `,
})
export class SearchResultsComponent {
  private readonly searchService = inject(ProductSearchService);
  private readonly router = inject(Router);

  /**
   * Nota: i componenti CMS sono creati con un injector figlio dell'injector "di ambiente",
   * NON dentro il RouterOutlet: ActivatedRoute qui sarebbe la rotta radice. Leggiamo quindi
   * il parametro :query dalla foglia dello snapshot del router.
   */
  readonly result$: Observable<ProductSearchPage | undefined> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(undefined),
    map(() => {
      let leaf = this.router.routerState.snapshot.root;
      while (leaf.firstChild) {
        leaf = leaf.firstChild;
      }
      return (leaf.params['query'] as string | undefined) ?? '';
    }),
    distinctUntilChanged(),
    switchMap((query) => this.searchService.search(query).pipe(catchError(() => of(undefined))))
  );
}
```

`examples/mini-spartacus/src/app/step09-page-layout/components/site-context-selector.component.ts`

```ts
/**
 * STEP 09 - Selettore lingua/valuta (componente CMS 'CMSSiteContextComponent')
 * Ispirato a:
 *  - core-libs/storefront/cms-components/misc/site-context-selector/site-context-selector.component.ts
 *  - core-libs/storefront/cms-components/misc/site-context-selector/site-context-component.service.ts
 *    (context 'LANGUAGE' | 'CURRENCY' letto dai dati CMS -> servizio giusto)
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CURRENCY_CONTEXT_ID, LANGUAGE_CONTEXT_ID } from '../../step02-site-context/site-context.config';
import { SiteContextService } from '../../step02-site-context/site-context.service';
import { CmsComponent } from '../../step08-cms/cms.model';
import { CmsComponentData } from '../cms-component-data';

export interface CmsSiteContextComponent extends CmsComponent {
  context?: 'LANGUAGE' | 'CURRENCY';
}

interface SelectorViewModel {
  param: string;
  label: string;
  values: string[];
  active: string;
}

@Component({
  selector: 'cx-site-context-selector',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (vm$ | async; as vm) {
      <label>
        {{ vm.label }}
        <select (change)="select(vm.param, $any($event.target).value)">
          @for (value of vm.values; track value) {
            <option [value]="value" [selected]="value === vm.active">{{ value }}</option>
          }
        </select>
      </label>
    }
  `,
})
export class SiteContextSelectorComponent {
  private readonly siteContext = inject(SiteContextService);
  private readonly data$ = inject<CmsComponentData<CmsSiteContextComponent>>(CmsComponentData).data$;

  readonly vm$: Observable<SelectorViewModel | undefined> = this.data$.pipe(
    switchMap((data) => {
      if (!data?.context) {
        return of(undefined);
      }
      const param = data.context === 'LANGUAGE' ? LANGUAGE_CONTEXT_ID : CURRENCY_CONTEXT_ID;
      return combineLatest([of(param), this.siteContext.getActive(param)]).pipe(
        map(([p, active]) => ({
          param: p,
          label: data.context === 'LANGUAGE' ? 'Lingua' : 'Valuta',
          values: this.siteContext.getValues(p),
          active,
        }))
      );
    })
  );

  select(param: string, value: string): void {
    this.siteContext.setActive(param, value);
  }
}
```

**Spiegazione riga per riga dei punti chiave:**

- `layoutSlots.LandingPage2Template.slots`: **il frontend decide l'ordine** degli slot per ogni template; il CMS
  decide cosa c'e' dentro. Se un template non e' configurato si mostrano tutti gli slot ricevuti (`fallback`).
- `cmsComponents: { CMSParagraphComponent: { component: ParagraphComponent } }`: la mappa e' **config**. Un cliente
  sostituisce un componente con `provideConfig({ cmsComponents: { CMSParagraphComponent: { component: MioParagrafo } } })`.
- `CmsComponentsService.getMapping`: prima la config, poi i `CMS_MAPPING_RESOLVERS` (punto di estensione usato dallo
  Step 11 per i componenti lazy). Componente sconosciuto -> nulla a schermo, nessun errore.
- `Injector.create({ providers: [{ provide: CmsComponentData, useValue: { uid, data$ } }, ...mapping.providers], parent })`:
  ogni **istanza** di componente CMS riceve i **suoi** dati. Due paragrafi nella stessa pagina usano la stessa classe
  ma leggono `data$` diversi.
- `vcr.createComponent(type, { injector, environmentInjector })`: API moderna (niente `ComponentFactoryResolver`,
  deprecato). `environmentInjector` conta per i componenti delle feature lazy (Step 11).
- `renderer.addClass(..., flexType)`: con `Renderer2` funziona anche in SSR; la classe aiuta stili e test.
- `ngOnDestroy -> componentRef.destroy()`: niente memory leak quando la pagina cambia.
- `PageSlotComponent`: `host: { '[attr.position]': 'position', '[class]': 'position' }` come l'originale (utile al CSS).
  `@for (...; track component.uid)`: Angular riusa i componenti se lo slot si aggiorna.
- `PageLayoutComponent`: con `section` mostra una sezione fissa (`header`, `footer`); senza, il template della pagina.
  I `ng-template [cxOutlet]` intorno al layout e agli slot sono i punti di aggancio dello Step 10.
- Nota importante nei componenti (vedi `SearchResultsComponent`): i componenti CMS **non** nascono dentro il
  `RouterOutlet`, quindi `ActivatedRoute` non e' la rotta corrente. Si leggono i parametri dallo snapshot del Router
  (come fa `CurrentProductService`, ispirato a `core-libs/storefront/cms-components/product/current-product.service.ts`).

**Come testarlo:** ispeziona il DOM della home: `cx-page-layout > div.LandingPage2Template > cx-page-slot.Section1 >
cx-banner.SimpleBannerComponent`. Poi, in `app.config.ts`, aggiungi
`provideConfig({ layoutSlots: { LandingPage2Template: { slots: ['Section3', 'Section1'] } } })`: il carosello sale
in cima e sparisce il paragrafo, senza toccare il CMS.

**Differenze rispetto a Spartacus reale:**

- Spartacus ha layout **responsive** per breakpoint (`lg`, `md`...), `pageFold` per il lazy rendering "sotto la piega",
  `PageLayoutHandler` per modificare gli slot a runtime (es. carrello vuoto) e `deferLoading` con IntersectionObserver.
- Ci sono piu' *handler* di lancio: componenti Angular, **web component** (`WebComponentHandler`) e componenti lazy
  (`LazyComponentHandler`), scelti in base al mapping.
- Il mapping `CmsComponentMapping` (`core-libs/core/src/cms/config/cms-config.ts`) ha anche `guards` (guard per componente),
  `childRoutes`, `disableSSR`, `data` e `deferLoading`.
- Supporto a SmartEdit (attributi di contratto sul DOM) e alle direttive `cxComponentWrapper` annidate.

---

## Step 10 - Outlet: BEFORE, REPLACE, AFTER

**Obiettivo:** permettere a chiunque di **aggiungere prima, sostituire o aggiungere dopo** un pezzo di UI
esistente (un intero template, uno slot, un pezzo di componente) senza modificarne il codice.

**File originali Spartacus:**
- `core-libs/storefront/cms-structure/outlet/outlet.model.ts` - `OutletPosition`, `OutletContextData`
- `core-libs/storefront/cms-structure/outlet/outlet.service.ts` - `OutletService.add/get/remove`
- `core-libs/storefront/cms-structure/outlet/outlet.directive.ts` - `OutletDirective` (`build`, `buildOutlet`, `create`)
- `core-libs/storefront/cms-structure/outlet/outlet-ref/outlet-ref.directive.ts` - `OutletRefDirective`
- `core-libs/storefront/cms-structure/outlet/outlet.providers.ts` - `provideOutlet`, `PROVIDE_OUTLET_OPTIONS`

`examples/mini-spartacus/src/app/step10-outlets/outlet.model.ts`

```ts
/**
 * STEP 10 - Modello degli outlet
 * Ispirato a: core-libs/storefront/cms-structure/outlet/outlet.model.ts (OutletPosition, OutletContextData)
 */
export enum OutletPosition {
  REPLACE = 'replace',
  BEFORE = 'before',
  AFTER = 'after',
}

/** Iniettabile nei COMPONENTI registrati su un outlet: sa dove e con quale contesto sono renderizzati. */
export abstract class OutletContextData<T = unknown> {
  abstract readonly reference: string;
  abstract readonly position: OutletPosition;
  abstract readonly context: T;
}
```

`examples/mini-spartacus/src/app/step10-outlets/outlet.service.ts`

```ts
/**
 * STEP 10 - OutletService: registro "nome outlet -> template/componenti"
 * Ispirato a: core-libs/storefront/cms-structure/outlet/outlet.service.ts (OutletService.add/get/remove)
 *
 * Differenze:
 *  - Spartacus registra TemplateRef o ComponentFactory; qui TemplateRef o Type (API moderna, niente factory).
 *  - Aggiungiamo changes$ per ri-renderizzare un outlet se un template arriva DOPO che l'outlet
 *    e' gia' stato disegnato (in Spartacus se ne occupa OutletRendererService).
 */
import { Injectable, TemplateRef, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OutletPosition } from './outlet.model';

export type OutletContent = TemplateRef<unknown> | Type<unknown>;

@Injectable({ providedIn: 'root' })
export class OutletService {
  private readonly store: Record<OutletPosition, Map<string, OutletContent[]>> = {
    [OutletPosition.BEFORE]: new Map(),
    [OutletPosition.REPLACE]: new Map(),
    [OutletPosition.AFTER]: new Map(),
  };
  private readonly changesSubject = new Subject<string>();

  /** Emette il nome dell'outlet ogni volta che il suo contenuto cambia. */
  readonly changes$: Observable<string> = this.changesSubject.asObservable();

  add(outlet: string, content: OutletContent, position: OutletPosition = OutletPosition.REPLACE): void {
    const map = this.store[position];
    map.set(outlet, [...(map.get(outlet) ?? []), content]);
    this.changesSubject.next(outlet);
  }

  /** Tutti i contenuti registrati ("stacked"); per REPLACE di solito si usa solo il primo. */
  get(outlet: string, position: OutletPosition = OutletPosition.REPLACE): OutletContent[] {
    return this.store[position].get(outlet) ?? [];
  }

  remove(outlet: string, position: OutletPosition = OutletPosition.REPLACE, content?: OutletContent): void {
    const map = this.store[position];
    if (!content) {
      map.delete(outlet);
    } else {
      map.set(outlet, (map.get(outlet) ?? []).filter((c) => c !== content));
    }
    this.changesSubject.next(outlet);
  }
}
```

`examples/mini-spartacus/src/app/step10-outlets/outlet.directive.ts`

```ts
/**
 * STEP 10 - Direttiva strutturale cxOutlet
 * Ispirato a: core-libs/storefront/cms-structure/outlet/outlet.directive.ts
 *   (OutletDirective: build() -> buildOutlet(BEFORE/REPLACE/AFTER) -> create(template|factory), getComponentInjector)
 *
 * <ng-template cxOutlet="PDP.PRICE" [cxOutletContext]="product"> contenuto di default </ng-template>
 *
 * Ordine di render: [tutti i BEFORE] [primo REPLACE oppure il contenuto di default] [tutti gli AFTER]
 */
import {
  Directive,
  inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { OutletContextData, OutletPosition } from './outlet.model';
import { OutletContent, OutletService } from './outlet.service';

@Directive({ selector: '[cxOutlet]' })
export class OutletDirective<T = unknown> implements OnChanges, OnDestroy {
  @Input({ required: true }) cxOutlet!: string;
  @Input() cxOutletContext?: T;

  private readonly vcr = inject(ViewContainerRef);
  private readonly defaultTemplate = inject<TemplateRef<unknown>>(TemplateRef);
  private readonly outletService = inject(OutletService);
  private readonly injector = inject(Injector);

  /** Se qualcuno registra/rimuove contenuti per QUESTO outlet dopo il primo render, ridisegno. */
  private readonly subscription = this.outletService.changes$
    .pipe(filter((name) => name === this.cxOutlet))
    .subscribe(() => this.render());

  ngOnChanges(): void {
    this.render();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private render(): void {
    if (!this.cxOutlet) {
      return;
    }
    this.vcr.clear();
    this.renderPosition(OutletPosition.BEFORE);
    this.renderPosition(OutletPosition.REPLACE);
    this.renderPosition(OutletPosition.AFTER);
  }

  private renderPosition(position: OutletPosition): void {
    let contents: OutletContent[] = this.outletService.get(this.cxOutlet, position);
    if (position === OutletPosition.REPLACE) {
      contents = contents.length ? [contents[0]] : [this.defaultTemplate];
    }
    for (const content of contents) {
      if (content instanceof TemplateRef) {
        this.vcr.createEmbeddedView(content, { $implicit: this.cxOutletContext });
      } else {
        this.vcr.createComponent(content, { injector: this.componentInjector(position) });
      }
    }
  }

  /** I componenti registrati sull'outlet ricevono OutletContextData (riferimento, posizione, contesto). */
  private componentInjector(position: OutletPosition): Injector {
    const data: OutletContextData<T | undefined> = {
      reference: this.cxOutlet,
      position,
      context: this.cxOutletContext,
    };
    return Injector.create({ providers: [{ provide: OutletContextData, useValue: data }], parent: this.injector });
  }
}
```

`examples/mini-spartacus/src/app/step10-outlets/outlet-ref.directive.ts`

```ts
/**
 * STEP 10 - cxOutletRef: registra un template su un outlet dal template HTML
 * Ispirato a: core-libs/storefront/cms-structure/outlet/outlet-ref/outlet-ref.directive.ts (OutletRefDirective)
 *
 * <ng-template cxOutletRef="PDP.PRICE" cxOutletPos="after" let-product> IVA inclusa </ng-template>
 */
import { Directive, inject, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { OutletPosition } from './outlet.model';
import { OutletService } from './outlet.service';

@Directive({ selector: '[cxOutletRef]' })
export class OutletRefDirective implements OnInit, OnDestroy {
  @Input({ required: true }) cxOutletRef!: string;
  @Input() cxOutletPos: OutletPosition | `${OutletPosition}` = OutletPosition.REPLACE;

  private readonly template = inject<TemplateRef<unknown>>(TemplateRef);
  private readonly outletService = inject(OutletService);

  ngOnInit(): void {
    this.outletService.add(this.cxOutletRef, this.template, this.cxOutletPos as OutletPosition);
  }

  ngOnDestroy(): void {
    this.outletService.remove(this.cxOutletRef, this.cxOutletPos as OutletPosition, this.template);
  }
}
```

`examples/mini-spartacus/src/app/step10-outlets/outlet.providers.ts`

```ts
/**
 * STEP 10 - provideOutlet: registra un COMPONENTE su un outlet senza scrivere template
 * Ispirato a:
 *  - core-libs/storefront/cms-structure/outlet/outlet.providers.ts (provideOutlet, PROVIDE_OUTLET_OPTIONS)
 *  - core-libs/storefront/cms-structure/outlet/outlet.service.ts   (lettura delle opzioni registrate)
 */
import {
  EnvironmentProviders,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  provideAppInitializer,
  Type,
} from '@angular/core';
import { OutletPosition } from './outlet.model';
import { OutletService } from './outlet.service';

export interface ProvideOutletOptions {
  id: string;
  component: Type<unknown>;
  position?: OutletPosition;
}

export const PROVIDE_OUTLET_OPTIONS = new InjectionToken<ProvideOutletOptions[]>('PROVIDE_OUTLET_OPTIONS');

export function provideOutlet(options: ProvideOutletOptions): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: PROVIDE_OUTLET_OPTIONS, useValue: options, multi: true }]);
}

/** Da includere una volta: all'avvio copia le opzioni registrate dentro OutletService. */
export function provideOutlets(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      const outletService = inject(OutletService);
      for (const option of inject(PROVIDE_OUTLET_OPTIONS, { optional: true }) ?? []) {
        outletService.add(option.id, option.component, option.position);
      }
    }),
  ]);
}
```

`examples/mini-spartacus/src/app/step10-outlets/outlet-demo.component.ts`

```ts
/**
 * STEP 10 - Esempi d'uso degli outlet (BEFORE / REPLACE / AFTER)
 * Ispirato a: projects/storefrontapp/src/test-outlets/ (TestOutletModule: esempi di cxOutletRef usati negli e2e)
 *
 * Questo componente non mostra nulla "al suo posto": registra template su outlet che
 * vivono altrove (header, slot Footer, prezzo nella pagina prodotto).
 */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Page } from '../step08-cms/cms.model';
import { OutletContextData } from './outlet.model';
import { OutletRefDirective } from './outlet-ref.directive';

@Component({
  selector: 'cx-outlet-demo',
  imports: [OutletRefDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- BEFORE: una barra promozionale sopra l'intero header -->
    <ng-template cxOutletRef="header" cxOutletPos="before">
      <div class="promo-bar">Spedizione gratuita sopra i 100 USD</div>
    </ng-template>

    <!-- REPLACE: lo slot CMS "Footer" viene sostituito da un footer scritto a mano -->
    <ng-template cxOutletRef="Footer" cxOutletPos="replace">
      <p class="custom-footer">Footer sostituito tramite outlet (REPLACE)</p>
    </ng-template>

    <!-- AFTER: nota dopo il prezzo; il contesto ($implicit) e' il prodotto -->
    <ng-template cxOutletRef="PDP.PRICE" cxOutletPos="after" let-product>
      @if (product) {
        <small class="vat-note">IVA inclusa - codice {{ asProduct(product).code }}</small>
      }
    </ng-template>
  `,
})
export class OutletDemoComponent {
  asProduct(value: unknown): { code?: string } {
    return value as { code?: string };
  }
}

/** Componente registrato con provideOutlet() dopo lo slot 'Summary' della pagina prodotto. */
@Component({
  selector: 'cx-delivery-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p class="delivery-badge">Consegna in 24h ({{ pageTitle }})</p>`,
})
export class DeliveryBadgeComponent {
  private readonly outlet = inject(OutletContextData) as OutletContextData<Page | null>;
  readonly pageTitle = this.outlet.context?.title ?? '';
}
```

**Spiegazione riga per riga dei punti chiave:**

- `OutletService.store`: tre mappe, una per posizione. Ogni outlet puo' avere **piu'** contenuti BEFORE/AFTER (impilati).
- `OutletDirective` e' una direttiva **strutturale**: si mette su `<ng-template>`, quindi riceve il `TemplateRef`
  del contenuto di default e decide lei se e dove disegnarlo.
- `renderPosition(REPLACE)`: se qualcuno ha registrato un REPLACE si usa il **primo**; altrimenti il template di default.
- `createEmbeddedView(content, { $implicit: this.cxOutletContext })`: il contesto dell'outlet (es. il prodotto) arriva
  al template registrato come `let-product`.
- `componentInjector`: ai **componenti** registrati (non ai template) arriva `OutletContextData` con `reference`,
  `position` e `context` (vedi `DeliveryBadgeComponent`).
- `changes$`: `OutletDemoComponent` registra i suoi template **dopo** che l'header e' gia' stato disegnato; grazie a
  `changes$` l'outlet si ridisegna. Senza, la barra promozionale non comparirebbe.
- `OutletRefDirective`: `ngOnInit` -> `add`, `ngOnDestroy` -> `remove`. Se il componente che registra sparisce,
  sparisce anche la personalizzazione.
- `provideOutlet(...)` + `provideOutlets()`: registrazione da codice di un componente su un outlet, senza template.
- Nomi degli outlet: il layout usa il **nome del template** (`LandingPage2Template`) e il **nome dello slot**
  (`Section1`, `Footer`); i componenti definiscono outlet propri (`PDP.PRICE`, come `ProductDetailOutlets.PRICE` in Spartacus).

**Come testarlo:** in SSR (o nel browser) la home mostra la barra gialla **prima** dell'header (BEFORE), il footer
dice "Footer sostituito tramite outlet (REPLACE)", la pagina prodotto mostra "IVA inclusa - codice 300938" dopo il
prezzo (AFTER con contesto) e "Consegna in 24h" dopo lo slot Summary (componente via `provideOutlet`).

**Differenze rispetto a Spartacus reale:**

- Spartacus registra `ComponentFactory` (API legacy) oltre ai `TemplateRef`, e usa `OutletRendererService` per
  ri-renderizzare gli outlet invece di un `changes$`.
- `cxOutletDefer` rimanda il render finche' l'outlet non e' visibile (IntersectionObserver).
- `USE_STACKED_OUTLETS` / `AVOID_STACKED_OUTLETS` controllano se si prende un solo contenuto o tutti.
- `OutletContextData.context$` e' un Observable: il componente si aggiorna se cambia il contesto senza essere ricreato.

---

## Step 11 - Feature lazy e facade proxy

**Obiettivo:** tenere fuori dal bundle iniziale il codice del carrello. Si scarica solo quando serve: quando in
pagina c'e' un componente CMS del carrello, o quando qualcuno chiama un metodo del facade.

**File originali Spartacus:**
- `core-libs/core/src/cms/config/cms-config.ts` - `FeatureModuleConfig` (`module`, `cmsComponents`, `dependencies`)
- `core-libs/core/src/lazy-loading/feature-modules.service.ts` - `FeatureModulesService.resolveFeature`
- `core-libs/core/src/lazy-loading/lazy-modules.service.ts` - `LazyModulesService.resolveModuleInstance`
- `core-libs/core/src/lazy-loading/facade-factory/facade-factory.ts` - `facadeFactory`
- `core-libs/core/src/lazy-loading/facade-factory/facade-factory.service.ts` - `FacadeFactoryService.create/call/get`
- `feature-libs/cart/base/root/facade/active-cart.facade.ts` - `ActiveCartFacade` con `useFactory: () => facadeFactory(...)`
- `feature-libs/cart/base/core/facade/active-cart.service.ts` - `ActiveCartService`
- `feature-libs/cart/base/root/cart-base-root.module.ts` - `featureModules` con `cmsComponents`

`examples/mini-spartacus/src/app/step11-lazy-feature/feature-modules.ts`

```ts
/**
 * STEP 11 - Feature lazy: configurazione e caricamento
 * Ispirato a:
 *  - core-libs/core/src/cms/config/cms-config.ts                 (FeatureModuleConfig: module, cmsComponents, dependencies)
 *  - core-libs/core/src/lazy-loading/feature-modules.service.ts   (FeatureModulesService.isConfigured/resolveFeature)
 *  - core-libs/core/src/lazy-loading/lazy-modules.service.ts      (LazyModulesService.resolveModuleInstance)
 *
 * Differenza: Spartacus carica un NgModule e ne crea l'istanza (createNgModule).
 * Nel mondo standalone la feature esporta un array di provider e noi creiamo un
 * EnvironmentInjector figlio con createEnvironmentInjector.
 */
import {
  createEnvironmentInjector,
  EnvironmentInjector,
  EnvironmentProviders,
  inject,
  Injectable,
  PendingTasks,
  Provider,
} from '@angular/core';
import { defer, from, Observable, throwError } from 'rxjs';
import { finalize, map, shareReplay } from 'rxjs/operators';
import { Config } from '../step01-config/config';
import { CmsComponentsMapping } from '../step09-page-layout/layout-config';

/** Cio' che un file di feature (caricato con import()) deve esportare. */
export interface FeatureDefinition {
  providers: (Provider | EnvironmentProviders)[];
  cmsComponents?: CmsComponentsMapping;
}

export interface FeatureModuleConfig {
  /** Funzione con import() dinamico: il bundler crea un chunk separato. */
  module: () => Promise<FeatureDefinition>;
  /** Componenti CMS che, se presenti in pagina, fanno caricare la feature. */
  cmsComponents?: string[];
}

export interface FeatureModulesConfig {
  featureModules?: { [featureName: string]: FeatureModuleConfig | undefined };
}

declare module '../step01-config/config' {
  interface Config extends FeatureModulesConfig {}
}

export interface ResolvedFeature {
  name: string;
  injector: EnvironmentInjector;
  definition: FeatureDefinition;
}

@Injectable({ providedIn: 'root' })
export class FeatureModulesService {
  private readonly config = inject(Config);
  private readonly rootInjector = inject(EnvironmentInjector);
  /** Un import() non e' una richiesta HTTP: senza PendingTasks l'SSR non lo aspetterebbe. */
  private readonly pendingTasks = inject(PendingTasks);
  private readonly features = new Map<string, Observable<ResolvedFeature>>();

  isConfigured(featureName: string): boolean {
    return !!this.config.featureModules?.[featureName]?.module;
  }

  /** Quale feature dichiara questo componente CMS? */
  findFeatureForComponent(typeCode: string): string | undefined {
    const entries = Object.entries(this.config.featureModules ?? {});
    return entries.find(([, feature]) => feature?.cmsComponents?.includes(typeCode))?.[0];
  }

  /** Carica la feature UNA volta sola (cache + shareReplay) e crea il suo injector. */
  resolveFeature(featureName: string): Observable<ResolvedFeature> {
    const featureConfig = this.config.featureModules?.[featureName];
    if (!featureConfig?.module) {
      return throwError(() => new Error(`Feature ${featureName} non configurata`));
    }
    let feature$ = this.features.get(featureName);
    if (!feature$) {
      feature$ = defer(() => {
        const removeTask = this.pendingTasks.add();
        return from(featureConfig.module()).pipe(finalize(removeTask));
      }).pipe(
        map((definition) => ({
          name: featureName,
          definition,
          injector: createEnvironmentInjector(definition.providers, this.rootInjector, `feature:${featureName}`),
        })),
        shareReplay({ bufferSize: 1, refCount: false })
      );
      this.features.set(featureName, feature$);
    }
    return feature$;
  }
}
```

`examples/mini-spartacus/src/app/step11-lazy-feature/facade-factory.ts`

```ts
/**
 * STEP 11 - facadeFactory: un proxy che carica la feature al primo utilizzo
 * Ispirato a:
 *  - core-libs/core/src/lazy-loading/facade-factory/facade-factory.ts         (facadeFactory)
 *  - core-libs/core/src/lazy-loading/facade-factory/facade-factory.service.ts (FacadeFactoryService.create/call/get/getResolver)
 *  - core-libs/core/src/lazy-loading/facade-factory/facade-descriptor.ts      (FacadeDescriptor, MethodKeys, PropertyKeys)
 *
 * Il facade astratto e' "providedIn: root" con useFactory: () => facadeFactory({...}).
 * Finche' la feature non e' caricata, chi inietta il facade riceve il PROXY.
 * Ogni metodo del proxy: carica la feature -> prende il servizio vero dal suo injector -> lo chiama.
 */
import { AbstractType, inject } from '@angular/core';
import { connectable, EMPTY, isObservable, Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { FeatureModulesService } from './feature-modules';

/** Solo metodi che restituiscono void o Observable si possono "proxare" (il risultato arriva dopo). */
type MethodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: never[]) => void | Observable<unknown> ? K : never;
}[keyof T];

type PropertyKeys<T> = {
  [K in keyof T]: T[K] extends Observable<unknown> ? K : never;
}[keyof T];

export interface FacadeDescriptor<T> {
  facade: AbstractType<T>;
  feature: string;
  methods?: MethodKeys<T>[];
  properties?: PropertyKeys<T>[];
}

export function facadeFactory<T extends object>(descriptor: FacadeDescriptor<T>): T {
  const featureModules = inject(FeatureModulesService);

  // Il servizio "vero", preso dall'injector della feature appena caricata.
  const realService$: Observable<Record<string, unknown>> = featureModules.resolveFeature(descriptor.feature).pipe(
    map((feature) => feature.injector.get(descriptor.facade) as unknown as Record<string, unknown>),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  // Il proxy estende la classe astratta: "instanceof" continua a funzionare.
  const ProxyClass = class extends (descriptor.facade as unknown as new () => object) {};
  const proxy = new ProxyClass() as Record<string, unknown>;

  for (const method of descriptor.methods ?? []) {
    proxy[method as string] = (...args: unknown[]) => {
      // connectable + connect(): la chiamata parte SUBITO, anche se nessuno fa subscribe
      // (serve per i metodi "void" come addEntry).
      const result$ = connectable(
        realService$.pipe(map((service) => (service[method as string] as (...a: unknown[]) => unknown)(...args))),
        { connector: () => new ReplaySubject<unknown>(1), resetOnDisconnect: false }
      );
      result$.connect();
      return result$.pipe(switchMap((result) => (isObservable(result) ? result : EMPTY)));
    };
  }

  for (const property of descriptor.properties ?? []) {
    proxy[property as string] = realService$.pipe(switchMap((service) => service[property as string] as Observable<unknown>));
  }

  proxy['proxyFacadeInstance'] = true;
  return proxy as unknown as T;
}
```

`examples/mini-spartacus/src/app/step11-lazy-feature/lazy-cms-mapping.resolver.ts`

```ts
/**
 * STEP 11 - Componenti CMS che vivono dentro una feature lazy
 * Ispirato a: core-libs/storefront/cms-structure/services/cms-components.service.ts
 *   (CmsComponentsService.determineMappings: se un componente e' dichiarato in featureModules[x].cmsComponents,
 *    la feature viene caricata e il mapping letto dalla sua configurazione)
 */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsMappingResolver, ResolvedCmsMapping } from '../step09-page-layout/cms-components.service';
import { FeatureModulesService } from './feature-modules';

@Injectable({ providedIn: 'root' })
export class LazyCmsMappingResolver implements CmsMappingResolver {
  private readonly featureModules = inject(FeatureModulesService);

  resolve(typeCode: string): Observable<ResolvedCmsMapping | undefined> | undefined {
    const featureName = this.featureModules.findFeatureForComponent(typeCode);
    if (!featureName) {
      return undefined;
    }
    return this.featureModules.resolveFeature(featureName).pipe(
      map((feature) => {
        const mapping = feature.definition.cmsComponents?.[typeCode];
        return mapping ? { mapping, injector: feature.injector } : undefined;
      })
    );
  }
}
```

`examples/mini-spartacus/src/app/step11-lazy-feature/cart/cart.model.ts`

```ts
/**
 * STEP 11 - Modello carrello (sottoinsieme di Occ.Cart / Occ.OrderEntry)
 * Ispirato a:
 *  - core-libs/core/src/occ/occ-models/occ.models.ts (Occ.Cart, Occ.OrderEntry, Occ.CartModification)
 *  - feature-libs/cart/base/root/models/cart.model.ts (Cart, OrderEntry)
 */
import { OccPrice, OccProduct } from '../../step05-product-data/product.model';

export interface OrderEntry {
  entryNumber?: number;
  quantity?: number;
  product?: OccProduct;
  basePrice?: OccPrice;
  totalPrice?: OccPrice;
}

export interface Cart {
  code?: string;
  guid?: string;
  entries?: OrderEntry[];
  totalItems?: number;
  totalUnitCount?: number;
  totalPrice?: OccPrice;
  user?: { uid?: string; name?: string };
}
```

`examples/mini-spartacus/src/app/step11-lazy-feature/cart/active-cart.facade.ts`

```ts
/**
 * STEP 11 - Facade "root" del carrello: sempre disponibile, implementazione lazy
 * Ispirato a: feature-libs/cart/base/root/facade/active-cart.facade.ts
 *   (@Injectable({ providedIn: 'root', useFactory: () => facadeFactory({ facade: ActiveCartFacade,
 *    feature: CART_BASE_CORE_FEATURE, methods: [...] }) }))
 *
 * Questo file e' piccolo e sta nel bundle principale. Il codice vero (ActiveCartService)
 * sta nel chunk lazy della feature 'cart'.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facadeFactory } from '../facade-factory';
import { Cart } from './cart.model';

export const CART_FEATURE = 'cart';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory<ActiveCartFacade>({
      facade: ActiveCartFacade,
      feature: CART_FEATURE,
      methods: ['getActive', 'addEntry', 'updateEntry', 'removeEntry'],
    }),
})
export abstract class ActiveCartFacade {
  abstract getActive(): Observable<Cart | undefined>;
  abstract addEntry(productCode: string, quantity: number): void;
  abstract updateEntry(entryNumber: number, quantity: number): void;
  abstract removeEntry(entryNumber: number): void;
}
```

`examples/mini-spartacus/src/app/step11-lazy-feature/cart/active-cart.service.ts`

```ts
/**
 * STEP 11 - Implementazione vera del carrello (vive nel chunk lazy)
 * Ispirato a:
 *  - feature-libs/cart/base/core/facade/active-cart.service.ts   (ActiveCartService: carrello anonimo/utente, merge al login)
 *  - feature-libs/cart/base/core/facade/multi-cart.service.ts    (createCart, addEntry, updateEntry, removeEntry)
 *  - feature-libs/cart/base/occ/adapters/occ-cart.adapter.ts      (POST users/{userId}/carts?oldCartId=... per il merge)
 *  - feature-libs/cart/base/occ/adapters/occ-cart-entry.adapter.ts (POST entries JSON {product:{code},quantity}, PATCH, DELETE)
 *  - feature-libs/cart/base/core/services/multi-cart-state-persistence.service.ts (guid anonimo persistito nel browser)
 *
 * Regole OCC da ricordare:
 *  - utente anonimo: il carrello si identifica col GUID ->  users/anonymous/carts/{guid}
 *  - utente loggato: col CODE (o 'current')           ->  users/current/carts/{code}
 */
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { catchError, finalize, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { OccEndpointsService } from '../../step03-occ-endpoints/occ-endpoints.service';
import { OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT } from '../../step04-auth/auth.model';
import { AuthService } from '../../step04-auth/auth.service';
import { ActiveCartFacade } from './active-cart.facade';
import { Cart } from './cart.model';

const CART_STORAGE_KEY = 'mini-spartacus-anonymous-cart';
const JSON_HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable()
export class ActiveCartService implements ActiveCartFacade, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly occEndpoints = inject(OccEndpointsService);
  private readonly authService = inject(AuthService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly cart$ = new BehaviorSubject<Cart | undefined>(undefined);
  private userId: string | undefined;
  private cartCreation$?: Observable<string>;

  private readonly subscription = this.authService.getUserId().subscribe((userId) => this.onUserChange(userId));

  getActive(): Observable<Cart | undefined> {
    return this.cart$.asObservable();
  }

  addEntry(productCode: string, quantity: number): void {
    this.ensureCart()
      .pipe(
        switchMap((cartId) =>
          this.http.post(
            this.url('addEntries', { cartId }),
            { product: { code: productCode }, quantity },
            { headers: JSON_HEADERS }
          )
        ),
        switchMap(() => this.reload())
      )
      .subscribe({ error: (e: unknown) => console.error('addEntry fallita', e) });
  }

  updateEntry(entryNumber: number, quantity: number): void {
    const cartId = this.currentCartId();
    if (!cartId) {
      return;
    }
    this.http
      .patch(this.url('updateEntries', { cartId, entryNumber }), { quantity }, { headers: JSON_HEADERS })
      .pipe(switchMap(() => this.reload()))
      .subscribe({ error: (e: unknown) => console.error('updateEntry fallita', e) });
  }

  removeEntry(entryNumber: number): void {
    const cartId = this.currentCartId();
    if (!cartId) {
      return;
    }
    this.http
      .delete(this.url('removeEntries', { cartId, entryNumber }))
      .pipe(switchMap(() => this.reload()))
      .subscribe({ error: (e: unknown) => console.error('removeEntry fallita', e) });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ---------------------------------------------------------------------------

  private onUserChange(userId: string): void {
    const previous = this.userId;
    this.userId = userId;
    if (!this.isBrowser) {
      return; // in SSR niente carrello: e' un dato personale, non va in cache ne' in TransferState
    }
    if (userId === OCC_USER_ID_CURRENT) {
      const anonymousGuid = previous !== OCC_USER_ID_CURRENT ? this.readGuid() : undefined;
      const load$ = anonymousGuid
        ? // login con carrello anonimo: il backend lo fonde in un carrello utente
          this.http.post<Cart>(this.url('createCart', {}, { oldCartId: anonymousGuid }), {}, { headers: JSON_HEADERS })
        : this.http.get<Cart>(this.url('cart', { cartId: 'current' }));
      load$.pipe(catchError(() => of(undefined))).subscribe((cart) => {
        this.writeGuid(undefined);
        this.cart$.next(cart);
      });
    } else if (previous === OCC_USER_ID_CURRENT) {
      this.cart$.next(undefined); // logout: si riparte senza carrello
    } else {
      const guid = this.readGuid();
      if (guid) {
        this.http
          .get<Cart>(this.url('cart', { cartId: guid }))
          .pipe(catchError(() => of(undefined)))
          .subscribe((cart) => {
            if (!cart) {
              this.writeGuid(undefined);
            }
            this.cart$.next(cart);
          });
      }
    }
  }

  /** Restituisce l'id del carrello, creandolo se non esiste (una sola creazione anche con doppio click). */
  private ensureCart(): Observable<string> {
    const existing = this.currentCartId();
    if (existing) {
      return of(existing);
    }
    if (!this.cartCreation$) {
      this.cartCreation$ = this.http.post<Cart>(this.url('createCart'), {}, { headers: JSON_HEADERS }).pipe(
        tap((cart) => {
          this.cart$.next(cart);
          if (this.userId !== OCC_USER_ID_CURRENT) {
            this.writeGuid(cart.guid);
          }
        }),
        map(() => this.currentCartId() ?? ''),
        finalize(() => (this.cartCreation$ = undefined)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }
    return this.cartCreation$;
  }

  private reload(): Observable<Cart | undefined> {
    const cartId = this.currentCartId();
    if (!cartId) {
      return EMPTY;
    }
    return this.http.get<Cart>(this.url('cart', { cartId })).pipe(tap((cart) => this.cart$.next(cart)));
  }

  private currentCartId(): string | undefined {
    const cart = this.cart$.value;
    return this.userId === OCC_USER_ID_CURRENT ? cart?.code : cart?.guid;
  }

  private url(endpoint: string, urlParams: Record<string, unknown> = {}, queryParams?: Record<string, string>): string {
    return this.occEndpoints.buildUrl(endpoint, {
      urlParams: { userId: this.userId ?? OCC_USER_ID_ANONYMOUS, ...urlParams },
      queryParams,
    });
  }

  private readGuid(): string | undefined {
    try {
      return localStorage.getItem(CART_STORAGE_KEY) ?? undefined;
    } catch {
      return undefined;
    }
  }

  private writeGuid(guid: string | undefined): void {
    try {
      if (guid) {
        localStorage.setItem(CART_STORAGE_KEY, guid);
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    } catch {
      // storage non disponibile: il carrello anonimo vive solo in memoria
    }
  }
}
```

`examples/mini-spartacus/src/app/step11-lazy-feature/cart/cart.components.ts`

```ts
/**
 * STEP 11 - Componenti CMS del carrello (nel chunk lazy)
 * Ispirato a:
 *  - feature-libs/cart/base/components/add-to-cart/add-to-cart.component.ts   (AddToCartComponent -> 'ProductAddToCartComponent')
 *  - feature-libs/cart/base/components/cart-details/cart-details.component.ts (CartDetailsComponent -> flexType 'CartComponent')
 *
 * Nota: questi componenti vengono creati con l'injector della feature, quindi
 * inject(ActiveCartFacade) restituisce direttamente ActiveCartService (non il proxy).
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CurrentProductService } from '../../step09-page-layout/components/current-product.service';
import { ActiveCartFacade } from './active-cart.facade';

@Component({
  selector: 'cx-add-to-cart',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (productCode$ | async; as code) {
      <div class="add-to-cart">
        <label>Quantita' <input type="number" min="1" [value]="quantity()" (input)="quantity.set(+$any($event.target).value || 1)" /></label>
        <button type="button" (click)="add(code)">Aggiungi al carrello</button>
        @if (added()) {
          <span role="status">Aggiunto!</span>
        }
      </div>
    }
  `,
})
export class AddToCartComponent {
  private readonly activeCart = inject(ActiveCartFacade);
  readonly productCode$ = inject(CurrentProductService).getProductCode();
  readonly quantity = signal(1);
  readonly added = signal(false);

  add(productCode: string): void {
    this.activeCart.addEntry(productCode, this.quantity());
    this.added.set(true);
  }
}

@Component({
  selector: 'cx-cart-details',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (cart$ | async; as cart) {
      <h2>Carrello {{ cart.code }}</h2>
      <table>
        <tbody>
          @for (entry of cart.entries ?? []; track entry.entryNumber) {
            <tr>
              <td>{{ entry.product?.name }}</td>
              <td>
                <input type="number" min="0" [value]="entry.quantity"
                  (change)="update(entry.entryNumber ?? 0, +$any($event.target).value)" />
              </td>
              <td>{{ entry.totalPrice?.formattedValue }}</td>
              <td><button type="button" (click)="remove(entry.entryNumber ?? 0)">Rimuovi</button></td>
            </tr>
          }
        </tbody>
      </table>
      <p><strong>Totale: {{ cart.totalPrice?.formattedValue }}</strong></p>
    } @else {
      <p>Il carrello e' vuoto.</p>
    }
  `,
})
export class CartDetailsComponent {
  private readonly activeCart = inject(ActiveCartFacade);
  readonly cart$ = this.activeCart.getActive();

  update(entryNumber: number, quantity: number): void {
    if (quantity > 0) {
      this.activeCart.updateEntry(entryNumber, quantity);
    } else {
      this.activeCart.removeEntry(entryNumber);
    }
  }

  remove(entryNumber: number): void {
    this.activeCart.removeEntry(entryNumber);
  }
}
```

`examples/mini-spartacus/src/app/step11-lazy-feature/cart/cart-feature.ts`

```ts
/**
 * STEP 11 - Punto d'ingresso del chunk lazy 'cart'
 * Ispirato a:
 *  - feature-libs/cart/base/cart-base.module.ts          (modulo caricato in lazy: core + occ + componenti)
 *  - feature-libs/cart/base/root/cart-base-root.module.ts (featureModules: { cartBase: { module: () => import(...), cmsComponents: [...] } })
 *
 * Tutto cio' che e' importato SOLO da qui finisce nel chunk separato.
 */
import { FeatureDefinition } from '../feature-modules';
import { ActiveCartFacade } from './active-cart.facade';
import { ActiveCartService } from './active-cart.service';
import { AddToCartComponent, CartDetailsComponent } from './cart.components';

export const cartFeature: FeatureDefinition = {
  providers: [ActiveCartService, { provide: ActiveCartFacade, useExisting: ActiveCartService }],
  cmsComponents: {
    ProductAddToCartComponent: { component: AddToCartComponent },
    CartComponent: { component: CartDetailsComponent },
  },
};
```

`examples/mini-spartacus/src/app/step11-lazy-feature/mini-cart.component.ts`

```ts
/**
 * STEP 11 - Mini carrello nell'header (bundle principale, usa il PROXY del facade)
 * Ispirato a:
 *  - feature-libs/cart/base/components/mini-cart/mini-cart.component.ts        (MiniCartComponent)
 *  - feature-libs/cart/base/components/mini-cart/mini-cart-component.service.ts (conta le unita' del carrello attivo)
 *
 * inject(ActiveCartFacade) qui restituisce il proxy creato da facadeFactory:
 * la prima chiamata a getActive() scarica il chunk 'cart' e poi inoltra al servizio vero.
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { UrlPipe } from '../step07-routing/url.pipe';
import { ActiveCartFacade } from './cart/active-cart.facade';

@Component({
  selector: 'cx-mini-cart',
  imports: [AsyncPipe, RouterLink, UrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a [routerLink]="{ cxRoute: 'cart' } | cxUrl" aria-label="Carrello">
      Carrello ({{ (units$ | async) ?? 0 }})
    </a>
  `,
})
export class MiniCartComponent {
  readonly units$ = inject(ActiveCartFacade)
    .getActive()
    .pipe(map((cart) => cart?.totalUnitCount ?? 0));
}
```

`examples/mini-spartacus/src/app/step11-lazy-feature/lazy-feature.providers.ts`

```ts
/**
 * STEP 11 - Registrazione della feature lazy 'cart'
 * Ispirato a: feature-libs/cart/base/root/cart-base-root.module.ts
 *   (provideDefaultConfig({ featureModules: { [CART_BASE_FEATURE]: { cmsComponents: [...] } } }))
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideDefaultConfig } from '../step01-config/config';
import { CMS_MAPPING_RESOLVERS } from '../step09-page-layout/cms-components.service';
import { CART_FEATURE } from './cart/active-cart.facade';
import { LazyCmsMappingResolver } from './lazy-cms-mapping.resolver';
import { MiniCartComponent } from './mini-cart.component';

export function provideLazyCartFeature(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideDefaultConfig({
      featureModules: {
        [CART_FEATURE]: {
          // import() dinamico = chunk separato generato dal bundler (esbuild)
          module: () => import('./cart/cart-feature').then((m) => m.cartFeature),
          cmsComponents: ['ProductAddToCartComponent', 'CartComponent'],
        },
      },
      // Il mini-cart e' eager (sta nell'header di ogni pagina), ma parla col facade proxy.
      cmsComponents: {
        MiniCartComponent: { component: MiniCartComponent },
      },
    }),
    { provide: CMS_MAPPING_RESOLVERS, useExisting: LazyCmsMappingResolver, multi: true },
  ]);
}
```

**Spiegazione riga per riga dei punti chiave:**

- `module: () => import('./cart/cart-feature').then((m) => m.cartFeature)`: l'`import()` dinamico e' cio' che fa
  creare al bundler un **chunk separato**. Nel build: `chunk-XXXX.js | cart-feature | 5.41 kB` tra i *Lazy chunk files*.
- `cmsComponents: ['ProductAddToCartComponent', 'CartComponent']`: la config root **sa** che quei componenti
  esistono, ma non importa il loro codice.
- `createEnvironmentInjector(definition.providers, this.rootInjector, ...)`: l'injector figlio della feature. I
  servizi della feature vivono qui; quelli root restano visibili (il figlio chiede al padre).
- `PendingTasks.add()` ... `finalize(removeTask)`: senza questo, in SSR la pagina carrello veniva renderizzata con lo
  slot vuoto, perche' Angular considera l'app "stabile" quando non ci sono HTTP in corso e un `import()` non e' HTTP.
  (Problema trovato davvero durante la verifica di questo esempio.)
- `shareReplay` nella cache delle feature: il chunk si scarica e l'injector si crea **una volta sola**.
- `facadeFactory`:
  - `class extends descriptor.facade`: il proxy e' una sottoclasse del facade astratto, quindi `instanceof` funziona.
  - Ogni metodo del proxy chiama `realService$` (feature caricata + `injector.get(facade)` nell'injector **figlio**,
    dove `ActiveCartFacade` punta ad `ActiveCartService`).
  - `connectable(...).connect()`: la chiamata parte subito anche se nessuno si iscrive. Serve per i metodi `void`
    (`addEntry`): il componente chiama e basta.
  - Il valore restituito e' un Observable che rilancia il risultato se era un Observable (es. `getActive()`).
- `@Injectable({ providedIn: 'root', useFactory: () => facadeFactory({...}) }) abstract class ActiveCartFacade`:
  **finche' la feature non e' caricata**, chi inietta il facade riceve il proxy. Nella feature
  `{ provide: ActiveCartFacade, useExisting: ActiveCartService }` fa si' che i componenti della feature (creati con
  l'injector della feature) ricevano direttamente il servizio vero.
- `ActiveCartService`: anonimo -> carrello identificato dal **guid** (salvato in `localStorage`); loggato -> dal **code**
  o `current`. Al login con carrello anonimo: `POST users/current/carts?oldCartId=<guid>` (merge lato backend).
- `ensureCart` con `cartCreation$` condiviso: due click veloci su "Aggiungi" non creano due carrelli.
- `MiniCartComponent` e' nel bundle principale ma usa solo il facade: il primo `getActive()` scarica il chunk.

**Come testarlo:** `npm run build` e controlla la riga `cart-feature` tra i *Lazy chunk files*. Nel browser, tab
Network: il file `chunk-...js` del carrello arriva dopo il `main`. Aggiungi un prodotto: il mini carrello mostra
"Carrello (1)"; fai login: resta "(1)" (merge del carrello anonimo); vai al carrello e cambia quantita'/rimuovi.

**Differenze rispetto a Spartacus reale:**

- Spartacus carica **NgModule** (`createNgModule`) con `dependencies` fra feature e alias
  (`featureModules: { cartBase: ..., cart: 'cartBase' }`); qui solo provider standalone.
- `FacadeFactoryService` supporta `properties` (Observable esposti come proprieta') e `async: true` (ritardo di un tick).
- `ConverterService`, `UnifiedInjector` e gli eventi (`ModuleInitializedEvent`) sanno "vedere" gli injector lazy.
- Il carrello vero e' in NgRx (`MultiCartService`, processi in corso, carrelli multipli: wishlist, saved cart,
  selective cart) con persistenza tramite `MultiCartStatePersistenceService`.

---

## Step 12 - SSR: CommonEngine, TransferState, timeout con fallback CSR

**Obiettivo:** renderizzare le pagine sul server (SEO, primo caricamento veloce), non chiedere di nuovo al backend
nel browser i dati gia' usati dal server, e **non bloccare mai** l'utente se il server e' lento.

**File originali Spartacus:**
- `projects/storefrontapp/src/server.ts` - Express + `NgExpressEngineDecorator.get(engine, ssrOptions)`
- `core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts` - `OptimizedSsrEngine.renderResponse`, `fallbackToCsr`, `getTimeout`
- `core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts` - `defaultSsrOptimizationOptions` (`timeout: 3_000`, `concurrency: 10`, `cache: false`)
- `core-libs/setup/ssr/engine/cx-common-engine.ts` - `CxCommonEngine`
- `core-libs/core/src/state/reducers/transfer-state.reducer.ts` - `CX_KEY`, `getServerTransferStateReducer`, `getBrowserTransferStateReducer`
- `core-libs/core/src/product/store/product-store.module.ts` - `state.ssrTransfer.keys`

`examples/mini-spartacus/src/app/step12-ssr/transfer-state.ts`

```ts
/**
 * STEP 12 - TransferState: i dati caricati dal server non vengono richiesti di nuovo dal browser
 * Ispirato a:
 *  - core-libs/core/src/state/reducers/transfer-state.reducer.ts
 *    (CX_KEY, getServerTransferStateReducer, getBrowserTransferStateReducer)
 *  - core-libs/core/src/product/store/product-store.module.ts (provideDefaultConfig({ state: { ssrTransfer: { keys: { product: ... } } } }))
 *
 * Due tecniche:
 *  A) meta-reducer NgRx (come Spartacus): sul server copia le slice scelte in TransferState ad ogni azione;
 *     nel browser, all'azione INIT, le rimette nello stato iniziale.
 *  B) interceptor HTTP per le chiamate CMS: sul server salva la risposta, nel browser la riusa UNA volta.
 *     (Spartacus disattiva il transfer cache HTTP di Angular con withNoHttpTransferCache() e usa solo A;
 *      B e' qui per mostrare l'API TransferState "a mano".)
 */
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject, makeStateKey, PLATFORM_ID, StateKey, TransferState } from '@angular/core';
import { ActionReducer, INIT, MetaReducer } from '@ngrx/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { deepMerge } from '../step01-config/deep-merge';
import { PRODUCT_FEATURE } from '../step06-ngrx-product/product.reducer';

export const CX_STATE_KEY: StateKey<Record<string, unknown>> = makeStateKey<Record<string, unknown>>('cx-state');

/** Slice dello store da trasferire. Mai dati personali (carrello, utente)! */
export const TRANSFERRED_STATE_KEYS = [PRODUCT_FEATURE];

function pick(state: Record<string, unknown>, keys: string[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of keys) {
    if (state[key] !== undefined) {
      result[key] = state[key];
    }
  }
  return result;
}

/** Factory usata con il token META_REDUCERS (eseguita in contesto di injection). */
export function transferStateMetaReducerFactory(): MetaReducer<Record<string, unknown>> {
  const platformId = inject(PLATFORM_ID);
  const transferState = inject(TransferState);

  if (isPlatformServer(platformId)) {
    return (reducer: ActionReducer<Record<string, unknown>>) => (state, action) => {
      const newState = reducer(state, action);
      transferState.set(CX_STATE_KEY, pick(newState, TRANSFERRED_STATE_KEYS));
      return newState;
    };
  }

  if (isPlatformBrowser(platformId)) {
    return (reducer: ActionReducer<Record<string, unknown>>) => (state, action) => {
      if (action.type === INIT && transferState.hasKey(CX_STATE_KEY)) {
        const initial = reducer(state, action);
        const transferred = transferState.get(CX_STATE_KEY, {});
        transferState.remove(CX_STATE_KEY);
        return deepMerge({ ...initial }, transferred);
      }
      return reducer(state, action);
    };
  }

  return (reducer) => reducer;
}

/** Interceptor per le GET CMS: server -> salva; browser -> riusa (e cancella) la risposta. */
export const cmsTransferStateInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.method !== 'GET' || !request.url.includes('/cms/')) {
    return next(request);
  }
  const transferState = inject(TransferState);
  const platformId = inject(PLATFORM_ID);
  const key = makeStateKey<unknown>('cms:' + request.urlWithParams);

  if (isPlatformBrowser(platformId) && transferState.hasKey(key)) {
    const body = transferState.get(key, null);
    transferState.remove(key); // una volta sola: le navigazioni successive vanno in rete
    return of(new HttpResponse({ body, status: 200, url: request.urlWithParams }));
  }

  return next(request).pipe(
    tap((event) => {
      if (isPlatformServer(platformId) && event instanceof HttpResponse) {
        transferState.set(key, event.body);
      }
    })
  );
};
```

`examples/mini-spartacus/src/app/step12-ssr/ssr-engine.ts`

```ts
/**
 * STEP 12 - Motore SSR con timeout e fallback CSR
 * Ispirato a:
 *  - core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts (OptimizedSsrEngine.renderResponse, fallbackToCsr,
 *    getTimeout, renderingCache: se il render supera il timeout si risponde con index.html "vuoto" (CSR)
 *    e il render continua in background per riempire la cache)
 *  - core-libs/setup/ssr/engine/cx-common-engine.ts (CxCommonEngine: wrapper di CommonEngine)
 *  - core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts (timeout, cache, concurrency)
 *
 * Questo file gira SOLO su Node (e' importato da src/server.ts), non dall'app Angular.
 */
import { StaticProvider } from '@angular/core';
import { CommonEngine, CommonEngineRenderOptions } from '@angular/ssr/node';

export interface SsrOptions {
  /** Millisecondi massimi di attesa del render; 0 = aspetta sempre. Spartacus: default 3000. */
  timeout: number;
  /** Se true i render riusciti vengono messi in cache e riusati alla richiesta successiva. */
  cache: boolean;
  /** Numero massimo di render contemporanei; oltre si va subito in CSR. Spartacus: default 10. */
  concurrency: number;
}

export type RenderStrategy = 'ssr' | 'cache' | 'csr-timeout' | 'csr-concurrency' | 'csr-error';

export interface RenderResult {
  html: string;
  strategy: RenderStrategy;
}

export interface RenderRequest {
  url: string;
  providers?: StaticProvider[];
}

export class TimeoutSsrEngine {
  private readonly cache = new Map<string, string>();
  private currentConcurrency = 0;

  constructor(
    private readonly engine: CommonEngine,
    private readonly baseRenderOptions: Omit<CommonEngineRenderOptions, 'url' | 'providers'>,
    /** Contenuto di index.html per il browser: l'app parte da zero lato client (CSR). */
    private readonly csrIndexHtml: string,
    private readonly options: SsrOptions
  ) {}

  async render(request: RenderRequest): Promise<RenderResult> {
    const key = request.url;

    const cached = this.cache.get(key);
    if (cached) {
      if (!this.options.cache) {
        this.cache.delete(key); // render "avanzato" da un timeout precedente: usato una volta sola
      }
      return { html: cached, strategy: 'cache' };
    }

    if (this.currentConcurrency >= this.options.concurrency) {
      return { html: this.csrIndexHtml, strategy: 'csr-concurrency' };
    }

    this.currentConcurrency++;
    const rendering = this.engine
      .render({ ...this.baseRenderOptions, url: request.url, providers: request.providers })
      .finally(() => this.currentConcurrency--);

    if (!this.options.timeout) {
      return this.finish(key, rendering);
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<'timeout'>((resolve) => {
      timer = setTimeout(() => resolve('timeout'), this.options.timeout);
    });

    try {
      const winner = await Promise.race([rendering, timeout]);
      if (winner === 'timeout') {
        // Il render NON viene interrotto: quando finisce, il risultato serve la prossima richiesta.
        rendering.then((html) => this.cache.set(key, html)).catch(() => undefined);
        return { html: this.csrIndexHtml, strategy: 'csr-timeout' };
      }
      return this.store(key, winner);
    } catch {
      return { html: this.csrIndexHtml, strategy: 'csr-error' };
    } finally {
      clearTimeout(timer);
    }
  }

  private async finish(key: string, rendering: Promise<string>): Promise<RenderResult> {
    try {
      return this.store(key, await rendering);
    } catch {
      return { html: this.csrIndexHtml, strategy: 'csr-error' };
    }
  }

  private store(key: string, html: string): RenderResult {
    if (this.options.cache) {
      this.cache.set(key, html);
    }
    return { html, strategy: 'ssr' };
  }
}
```

`examples/mini-spartacus/src/server.ts`

```ts
/**
 * STEP 12 - Server Express per SSR con CommonEngine, timeout e fallback CSR.
 * Ispirato a:
 *  - projects/storefrontapp/src/server.ts (express + NgExpressEngineDecorator + static + defaultExpressErrorHandlers)
 *  - core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts (timeout -> fallbackToCsr con Cache-Control: no-store)
 *
 * Avvio dopo "ng build": node dist/mini-spartacus/server/server.mjs  (porta 4000, SSR_TIMEOUT=ms)
 */
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express, { NextFunction, Request, Response } from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TimeoutSsrEngine } from './app/step12-ssr/ssr-engine';
import bootstrap from './main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexServerHtml = join(serverDistFolder, 'index.server.html');
  // HTML per il fallback CSR: l'index del browser (senza contenuto renderizzato).
  const csrIndexPath = [join(browserDistFolder, 'index.csr.html'), join(browserDistFolder, 'index.html')].find((p) =>
    existsSync(p)
  );
  const csrIndexHtml = csrIndexPath ? readFileSync(csrIndexPath, 'utf-8') : readFileSync(indexServerHtml, 'utf-8');

  const ssrEngine = new TimeoutSsrEngine(
    new CommonEngine({ bootstrap, allowedHosts: ['localhost', '127.0.0.1'] }),
    { documentFilePath: indexServerHtml, publicPath: browserDistFolder },
    csrIndexHtml,
    {
      timeout: Number(process.env['SSR_TIMEOUT'] ?? 3000),
      cache: process.env['SSR_CACHE'] === 'true',
      concurrency: Number(process.env['SSR_CONCURRENCY'] ?? 10),
    }
  );

  // File statici (js, css, immagini): tutto cio' che ha un'estensione.
  server.get(/.*\..*/, express.static(browserDistFolder, { maxAge: '1y', index: false }));

  // Tutte le altre rotte: render Angular.
  server.get(/.*/, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { protocol, originalUrl, headers } = req;
      const result = await ssrEngine.render({
        url: `${protocol}://${headers.host}${originalUrl}`,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      });
      if (result.strategy !== 'ssr' && result.strategy !== 'cache') {
        res.set('Cache-Control', 'no-store'); // la pagina CSR non deve finire in cache (CDN/proxy)
      }
      res.set('X-Render-Strategy', result.strategy);
      res.send(result.html);
    } catch (error) {
      next(error);
    }
  });

  return server;
}

if (isMainModule(import.meta.url)) {
  const port = Number(process.env['PORT'] ?? 4000);
  app().listen(port, () => {
    console.log(`Mini Spartacus SSR in ascolto su http://localhost:${port}`);
  });
}
```

**Spiegazione riga per riga dei punti chiave:**

- `CX_STATE_KEY = makeStateKey('cx-state')`: una chiave nel `TransferState`, che Angular serializza nel
  `<script id="ng-state" type="application/json">` alla fine dell'HTML.
- Meta-reducer **server**: dopo ogni azione copia le slice scelte (`product`) nel TransferState. Alla fine del render
  c'e' l'ultimo stato.
- Meta-reducer **browser**: all'azione `INIT` fonde lo stato trasferito nello stato iniziale e cancella la chiave.
  Quando poi arriva `provideState('product', ...)`, NgRx trova la slice gia' piena: `ProductService.get` vede
  `success: true` e **non** lancia `LoadProduct`.
- `TRANSFERRED_STATE_KEYS = [PRODUCT_FEATURE]`: mai trasferire carrello o utente (dati personali in HTML cacheabile).
- `cmsTransferStateInterceptor`: stessa idea per le GET `/cms/`: il server salva il body con chiave `cms:<url completo>`,
  il browser lo riusa **una volta** (`remove`) e poi torna in rete.
- `{ provide: META_REDUCERS, useFactory: transferStateMetaReducerFactory, multi: true }` in `app.config.ts`: la factory
  gira in contesto di injection, quindi puo' leggere `PLATFORM_ID` e `TransferState`.
- `TimeoutSsrEngine.render`:
  - cache: un render finito *dopo* il timeout serve la richiesta successiva (anche con `cache: false`, una volta sola:
    e' la "renderingCache" di Spartacus).
  - `currentConcurrency >= concurrency` -> CSR immediato (protegge il server sotto carico).
  - `Promise.race([rendering, timeout])`: vince il primo. Se vince il timeout si risponde con `index.csr.html` e il
    render **continua** in background.
- `server.ts`:
  - `index.server.html` (nella cartella `server`) e' il documento per il render; `index.csr.html` (nella cartella
    `browser`) e' la pagina vuota per il fallback: l'app partira' nel browser da zero (CSR).
  - `Cache-Control: no-store` sul fallback: una CDN non deve memorizzare la pagina "vuota" al posto di quella completa.
  - `X-Render-Strategy`: header di debug per vedere cosa e' successo.
  - `allowedHosts`: protezione SSRF di `@angular/ssr` (l'host della richiesta deve essere noto).
  - `isMainModule(import.meta.url)`: il server parte solo se eseguito direttamente (non quando importato da test o serverless).
- `PendingTasks` (Step 11) e `HttpClient` (che registra da solo un pending task) sono cio' che tiene "instabile" l'app
  sul server finche' i dati non sono arrivati: `CommonEngine` serializza solo quando l'app e' stabile.

**Come testarlo (comandi verificati):**

```bash
cd docs-deep-dive/examples/mock-backend && npm start          # terminale 1
cd docs-deep-dive/examples/mini-spartacus && npm run build && npm run serve:ssr   # terminale 2
curl -s -D - -o /dev/null http://localhost:4000/electronics-spa/en/USD/ | grep -i x-render
# X-Render-Strategy: ssr
curl -s http://localhost:4000/electronics-spa/en/USD/ | grep -o '<script id="ng-state"[^>]*>' 
# <script id="ng-state" type="application/json">
```

Fallback CSR: riavvia il mock con `MOCK_DELAY_MS=1500 npm start` e il server con `SSR_TIMEOUT=1000 npm run serve:ssr`:

```bash
curl -s -D - -o /dev/null http://localhost:4000/electronics-spa/en/USD/faq | grep -i "x-render\|cache-control"
# Cache-Control: no-store
# X-Render-Strategy: csr-timeout        (HTML di ~600 byte: solo <cx-root></cx-root>)
sleep 5
curl -s -D - -o /dev/null http://localhost:4000/electronics-spa/en/USD/faq | grep -i x-render
# X-Render-Strategy: cache              (il render finito in background)
```

Nel browser, aprendo la home servita dal server, il tab Network **non** mostra chiamate a `localhost:9002` per CMS e
prodotti: arrivano tutte dal TransferState (verificato nel test headless: lista richieste vuota).

**Differenze rispetto a Spartacus reale:**

- `OptimizedSsrEngine` ha molte piu' opzioni: `renderingStrategyResolver` (es. CSR per bot o per certi URL),
  `forcedSsrTimeout`, `maxRenderTime`, `reuseCurrentRendering` (richieste uguali in parallelo condividono il render),
  cache LRU con limite di memoria, logging strutturato, gestione errori (`defaultExpressErrorHandlers`) e
  `SSR_ALLOWED_ORIGINS` (`getOriginValidationMiddleware`).
- Spartacus abilita l'hydration (`provideClientHydration(withEventReplay(), withNoHttpTransferCache())` in
  `projects/storefrontapp/src/app/app.config.ts`); qui **non** e' abilitata: il browser ridisegna la pagina da zero
  (niente errori di mismatch con i componenti creati dinamicamente). Per provarla basta aggiungere
  `provideClientHydration(withNoHttpTransferCache())` ad `app.config.ts`.
- Il TransferState di Spartacus e' configurabile per slice (`state.ssrTransfer.keys`) ed evita di usare lo stato
  trasferito se l'utente e' loggato nel browser.
- Spartacus propaga lo status HTTP (404 per pagina non trovata) e i messaggi di errore dal render all'Express response.

---

## Errori comuni

1. **Mettere `provideConfig` dell'app prima delle librerie e aspettarsi che vinca sempre.** Default e root sono
   fusi separatamente: `provideDefaultConfig` perde sempre contro `provideConfig`. Ma fra due `provideConfig` vince
   l'**ultimo**.
2. **Aspettarsi che gli array vengano fusi.** `deepMerge` sostituisce gli array. `context.language: ['de']`
   sostituisce la lista intera.
3. **Scrivere endpoint con i backtick.** `` `products/${productCode}` `` in TypeScript viene valutato subito
   (errore o `undefined` nell'URL). Gli endpoint vanno tra apici singoli: `'products/${productCode}'`.
4. **Iniettare `ActivatedRoute` in un componente CMS.** Il componente e' creato con un injector che non passa dal
   `RouterOutlet`: si ottiene la rotta radice. Usare lo snapshot del Router o un servizio dedicato (`CurrentProductService`).
5. **Dimenticare `runGuardsAndResolvers: 'always'` sulla rotta `**`.** Navigando da `/faq` a `/contatti` la guard
   non gira e la pagina CMS non viene caricata in tempo.
6. **Dispatch dentro un effect con `switchMap` per entita' diverse.** Caricando 4 prodotti insieme, `switchMap`
   annulla i primi 3. Per richieste indipendenti serve `mergeMap`.
7. **Mettere `HttpErrorResponse` nello store.** Non e' serializzabile e rompe devtools e TransferState: normalizzare.
8. **Leggere `localStorage` senza `isPlatformBrowser`.** In SSR `localStorage` non esiste: l'app va in errore sul
   server (o peggio, un utente vede i dati di un altro se si usa uno storage condiviso sul server).
9. **Non tracciare un'operazione asincrona non-HTTP in SSR.** Un `import()`, un `setTimeout` o una Promise non sono
   aspettati da Angular: l'HTML esce incompleto. Usare `PendingTasks`.
10. **Trasferire nel TransferState dati personali.** Carrello e utente non vanno nell'HTML (che puo' essere messo in
    cache e servito ad altri).
11. **Refresh del token in parallelo.** Senza *single-flight*, N richieste con 401 fanno N refresh: col refresh token
    "a uso singolo" (come nel mock) tutti tranne il primo falliscono e l'utente viene sloggato.
12. **Ripetere la richiesta col vecchio header.** Dopo il refresh bisogna clonare la richiesta **originale** e mettere il
    nuovo token, non quella gia' modificata con il token scaduto.
13. **Dimenticare il `Cache-Control: no-store` sul fallback CSR.** La CDN salva la pagina vuota e la serve a tutti.
14. **Fidarsi del `typeCode` per i `CMSFlexComponent`.** Il tipo significativo e' `flexType`.
15. **Guardare solo `tsc` per la verifica.** `tsc` non controlla i template: serve `ng build` (o `ngc`) con `strictTemplates`.

## Domande di autoverifica

1. Perche' `Config` e' una classe astratta e non un'interfaccia?
   *Risposta:* perche' le interfacce spariscono a runtime e non possono fare da token DI; una classe astratta resta
   come valore JavaScript, si puo' iniettare e, con il declaration merging, estendere nei tipi da ogni step.
2. In che ordine vengono fusi i chunk di configurazione?
   *Risposta:* prima tutti i `DefaultConfigChunk` (nell'ordine di registrazione), poi tutti i `ConfigChunk`; il
   risultato e' `deepMerge({}, defaults, root)`.
3. Cosa succede se nell'URL c'e' `/electronics-spa/xx/USD/cart` e `xx` non e' una lingua valida?
   *Risposta:* `electronics-spa` viene riconosciuto come baseSite; `xx` non e' una lingua valida, quindi si prova
   `xx` come valuta (non valida) e il ciclo finisce. Lingua e valuta restano quelle attive, e il path che vede il
   Router e' `/xx/USD/cart`: finisce sulla rotta `**`, la label `/xx/USD/cart` non esiste e si vede la pagina CMS `notFound`.
4. Perche' `SiteContextService` usa `BehaviorSubject` invece di un semplice Observable?
   *Risposta:* serializer e interceptor devono leggere il valore **subito**, in modo sincrono (`getActiveValue`).
5. Che differenza c'e' fra scope e `fields`?
   *Risposta:* `fields` e' il parametro OCC che dice quali campi restituire; lo scope e' il nome della variante
   dell'endpoint nella config, ognuna con i suoi `fields`.
6. Quando l'`authInterceptor` prova il refresh?
   *Risposta:* solo se la risposta e' 401 con `errors[0].type` `InvalidTokenError` (o `InvalidBearerTokenError`),
   la richiesta non e' quella del token, e c'e' un refresh token.
7. Come si evita che tre richieste scadute facciano tre refresh?
   *Risposta:* `refreshInProgress$` condiviso con `shareReplay`; si azzera in `finalize`.
8. Perche' il Connector esiste se c'e' gia' l'Adapter?
   *Risposta:* il Connector e' l'API stabile usata dall'app (effect, servizi); l'Adapter e' il punto sostituibile per
   backend diversi. Il Connector puo' anche combinare piu' adapter o aggiungere logica (es. `getMany`).
9. In che ordine vengono applicati i converter di `PRODUCT_NORMALIZER`?
   *Risposta:* nell'ordine di registrazione dei provider multi; ognuno riceve il `source` originale e il `target`
   prodotto dal precedente.
10. Perche' l'azione `LoadProduct` porta un `meta`?
    *Risposta:* il reducer generico `entityLoaderReducer` si basa su `meta.entityType`, `meta.entityId` e
    `meta.loader` per aggiornare lo stato giusto senza conoscere il tipo di azione.
11. Perche' `ProductService.get` puo' lanciare un'azione dentro `tap`?
    *Risposta:* e' il "load on demand": lo stato vergine significa "nessuno l'ha mai chiesto". Dopo il dispatch lo
    stato diventa `loading` e la condizione non e' piu' vera, quindi non si crea un ciclo.
12. A cosa serve `paramsMapping`?
    *Risposta:* a dire da quale proprieta' dell'oggetto passato a `cxUrl` prendere ogni parametro del path.
13. Perche' le rotte con `cxRoute` hanno un path segnaposto?
    *Risposta:* Angular richiede un `path` o un `matcher`; il path vero arriva dalla config in un app initializer,
    e fino ad allora la rotta non deve combaciare con nulla.
14. Come si decide quale pagina CMS chiedere per `/faq`?
    *Risposta:* la rotta `**` non ha `pageLabel`, quindi il `PageContext` e' `{ id: '/faq', type: ContentPage }` e
    la richiesta e' `pageType=ContentPage&pageLabelOrId=/faq`.
15. Chi decide l'ordine degli slot e chi il loro contenuto?
    *Risposta:* l'ordine lo decide il frontend (`layoutSlots`), il contenuto il CMS (componenti nello slot).
16. Come riceve i propri dati un componente CMS?
    *Risposta:* il wrapper crea un injector con `CmsComponentData = { uid, data$ }`; il componente fa `inject(CmsComponentData)`.
17. Qual e' la differenza fra `cxOutlet` e `cxOutletRef`?
    *Risposta:* `cxOutlet` **dichiara** un punto estendibile (con contenuto di default); `cxOutletRef` **registra**
    un template su un outlet esistente in una posizione.
18. Cosa riceve un template registrato con `let-product` su `PDP.PRICE`?
    *Risposta:* il `cxOutletContext` dell'outlet (il prodotto), come `$implicit`.
19. Perche' il facade del carrello ha `useFactory: () => facadeFactory(...)`?
    *Risposta:* per restituire un proxy finche' la feature non e' caricata; il codice vero sta nel chunk lazy.
20. Perche' nel facade proxy si usa `connectable(...).connect()`?
    *Risposta:* per eseguire subito i metodi `void` anche se nessuno si iscrive al risultato.
21. Perche' in SSR serve `PendingTasks` per il caricamento delle feature?
    *Risposta:* Angular aspetta solo i task che conosce (HTTP, change detection); un `import()` non lo e', quindi
    l'HTML verrebbe serializzato prima che il componente lazy esista.
22. Cosa finisce nel `TransferState` e cosa no?
    *Risposta:* dati pubblici (prodotti, pagine CMS); mai carrello o utente.
23. Cosa fa il server se il render supera `SSR_TIMEOUT`?
    *Risposta:* risponde con `index.csr.html` e `Cache-Control: no-store`, lascia finire il render e lo usa per la
    richiesta successiva.
24. Perche' il mini carrello e' eager ma il carrello e' lazy?
    *Risposta:* il mini carrello e' in ogni header e deve apparire subito; usa pero' solo il facade (poche righe), e il
    codice pesante arriva dopo col chunk.
25. Cosa cambia per l'app se passo da OCC a un altro backend?
    *Risposta:* solo adapter e normalizer (Step 05, 08, 11) e la config degli endpoint; facade, store e componenti restano uguali.
