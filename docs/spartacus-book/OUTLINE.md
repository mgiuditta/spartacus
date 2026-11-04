# OUTLINE

Indice completo del libro. Ogni capitolo ha: file di output, dossier, review e **lista esatta dei file** assegnati in `outline/NN.files.txt` (generata da `tools/build-outline-lists.py` a partire da `COVERAGE.csv` e `tools/rules.tsv`).


## PARTE I — Angular sotto il cofano

### 01 — Dependency Injection in Angular e in Spartacus
- Output: `parte-1/01-dependency-injection.md`
- Dossier: `dossier/01.facts.md` · Review: `review/01.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus: gerarchia injector (platform, environment/R3Injector, NodeInjector, element), provider (useClass/useValue/useFactory/useExisting), multi provider, InjectionToken (con factory/providedIn), inject(), runInInjectionContext, makeEnvironmentProviders, EnvironmentInjector/createEnvironmentInjector, ENVIRONMENT_INITIALIZER, provideAppInitializer/APP_INITIALIZER. Poi uso in Spartacus: token di config (Config, provideConfig/provideDefaultConfig), multi provider di Spartacus (CONFIG_INITIALIZER, converter token, HTTP_INTERCEPTORS, MODULE_INITIALIZER), override tramite DI.
- Angular chiave: angular:packages/core/src/di/ (r3_injector.ts, injection_token.ts, injector_compatibility.ts, provider_collection.ts, interface/provider.ts, create_injector.ts, initializer_token.ts, contextual.ts), angular:packages/core/src/render3/di.ts, angular:packages/core/src/application/application_init.ts
- Spartacus chiave: core-libs/core/src/config/config-providers.ts, core-libs/core/src/config/config-tokens.ts, core-libs/core/src/config/config-initializer/*, core-libs/core/src/util/converter.service.ts, core-libs/core/src/lazy-loading/*

### 02 — NgModule, standalone e bootstrap dell'applicazione
- Output: `parte-1/02-ngmodule-standalone-bootstrap.md`
- Dossier: `dossier/02.facts.md` · Review: `review/02.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus: NgModule (ModuleWithProviders, forRoot, imports transitivi), componenti standalone, bootstrapApplication vs platformBrowser().bootstrapModule, ApplicationRef, ApplicationConfig, importProvidersFrom. Uso in Spartacus: BaseCoreModule/BaseStorefrontModule e forRoot, app demo (main.ts, app.config/app.module), schematics "modernize-app-to-standalone-bootstrap-application".
- Angular chiave: angular:packages/core/src/metadata/ng_module.ts, angular:packages/core/src/di/provider_collection.ts (importProvidersFrom, walkProviderTree), angular:packages/platform-browser/src/browser.ts, angular:packages/core/src/application/application_ref.ts, create_application.ts
- Spartacus chiave: core-libs/core/src/base-core.module.ts, core-libs/storefront/base-storefront.module.ts, projects/storefrontapp/src/main.ts, projects/storefrontapp/src/app/*

### 03 — Lazy loading: router e moduli caricati a runtime
- Output: `parte-1/03-lazy-loading.md`
- Dossier: `dossier/03.facts.md` · Review: `review/03.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus: lazy loading Angular (NB dall inventario: Spartacus NON usa loadChildren/createNgModule/createEnvironmentInjector nelle librerie ma NgModuleFactory + Compiler.compileModuleAsync in core-libs/core/src/lazy-loading/lazy-modules.service.ts — documenta comunque i meccanismi Angular e il confronto) (loadChildren/loadComponent, RouterConfigLoader, createEnvironmentInjector per route, createNgModule, import() dinamici) e come Spartacus carica moduli fuori dal router (LazyModulesService, FeatureModulesService, CmsFeaturesService, combinazione di injector, MODULE_INITIALIZER).
- Angular chiave: angular:packages/router/src/router_config_loader.ts, angular:packages/core/src/render3/ng_module_ref.ts (createNgModule), angular:packages/core/src/di/r3_injector.ts
- Spartacus chiave: core-libs/core/src/lazy-loading/*, core-libs/storefront/cms-structure/services/cms-features.service.ts, core-libs/core/src/util/combined-injector.ts (se esiste)

### 04 — Change detection, Zone, zoneless e signals
- Output: `parte-1/04-change-detection-zone-signals.md`
- Dossier: `dossier/04.facts.md` · Review: `review/04.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus: change detection (ApplicationRef.tick, OnPush, markForCheck, async pipe), NgZone/zone.js, zoneless (provideZonelessChangeDetection), PendingTasks e stabilità (importante per SSR), signals (signal, computed, effect, toSignal, linkedSignal). Uso in Spartacus: OnPush nei componenti, ngZone.runOutsideAngular, PendingTasks per lazy component import, signals se usati.
- Angular chiave: angular:packages/core/src/zone/ng_zone.ts, angular:packages/core/src/change_detection/scheduling/*, angular:packages/core/src/pending_tasks.ts, angular:packages/core/primitives/signals/, angular:packages/core/src/render3/reactivity/*, angular:packages/core/rxjs-interop/src/to_signal.ts
- Spartacus chiave: grep di NgZone, PendingTasks, signal(, toSignal, ChangeDetectionStrategy.OnPush in core-libs e feature-libs

### 05 — Il Router di Angular
- Output: `parte-1/05-router.md`
- Dossier: `dossier/05.facts.md` · Review: `review/05.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus: Router: configurazione Routes, recognize/matching (UrlMatcher, pathMatch), guard funzionali e di classe (CanActivate), resolver, eventi di navigazione, UrlSerializer, RouterModule.forRoot, scroll restoration. Uso in Spartacus: route generate dalla config (ConfigurableRoutesService, UrlMatcherService), CmsPageGuard, ProtectedRoutesGuard, app-routing, router-state NgRx (custom serializer).
- Angular chiave: angular:packages/router/src/recognize.ts, angular:packages/router/src/utils/config_matching.ts, angular:packages/router/src/shared.ts (defaultUrlMatcher), angular:packages/router/src/operators/check_guards.ts, angular:packages/router/src/navigation_transition.ts, angular:packages/router/src/url_tree.ts
- Spartacus chiave: core-libs/core/src/routing/configurable-routes/*, core-libs/storefront/router/*, core-libs/storefront/cms-structure/guards/*, core-libs/core/src/routing/store/*

### 06 — HttpClient e interceptor
- Output: `parte-1/06-httpclient-interceptor.md`
- Dossier: `dossier/06.facts.md` · Review: `review/06.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus: HttpClient, HttpHandler/backend, catena di interceptor (classi via HTTP_INTERCEPTORS + withInterceptorsFromDi, interceptor funzionali), HttpContext/HttpContextToken, HttpParams. Uso in Spartacus: tutti gli HTTP_INTERCEPTORS registrati (auth, client-token, site-context, consents, http-errors, ecc.), OCC_HTTP_TOKEN context.
- Angular chiave: angular:packages/common/http/src/client.ts, interceptor.ts, provider.ts, backend.ts, context.ts, xhr.ts, fetch.ts
- Spartacus chiave: grep di HTTP_INTERCEPTORS in core-libs/ feature-libs/ integration-libs/; core-libs/core/src/http/*; core-libs/core/src/occ/utils/occ-http-token? (verifica)

### 07 — SSR, hydration e TransferState
- Output: `parte-1/07-ssr-hydration-transferstate.md`
- Dossier: `dossier/07.facts.md` · Review: `review/07.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus: SSR Angular (platform-server, renderApplication/renderModule, INITIAL_CONFIG, REQUEST tokens in @angular/core/@angular/ssr), @angular/ssr CommonEngine/AngularNodeAppEngine, stabilità app e PendingTasks, hydration (provideClientHydration, withEventReplay, withIncrementalHydration, ngSkipHydration), TransferState (makeStateKey, serializzazione), HttpTransferCache. Uso in Spartacus: TransferState nello state NgRx, DirectiveStateTransferService, SERVER_REQUEST_URL/ORIGIN token, hydration nel demo app.
- Angular chiave: angular:packages/platform-server/src/utils.ts, server.ts, transfer_state.ts; angular:packages/core/src/transfer_state.ts; angular:packages/core/src/hydration/*; angular:packages/platform-browser/src/hydration.ts; angular:packages/common/http/src/transfer_cache.ts; angular:packages/ssr (se presente nel repo, altrimenti ⚠️)
- Spartacus chiave: core-libs/core/src/state/* (transfer state), core-libs/core/src/util/ssr.tokens.ts, core-libs/storefront/utils/directive-state-transfer.service.ts, core-libs/setup/ssr/*, projects/storefrontapp/src/app/*.server.ts

### 08 — Schematics e builder
- Output: `parte-1/08-schematics-builder.md`
- Dossier: `dossier/08.facts.md` · Review: `review/08.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus: Angular schematics e builder: dove stanno (angular-devkit è nel repo angular/angular-cli, NON in /tmp/angular: dichiaralo), cosa c'è in /tmp/angular (es. packages/core/schematics per le migrazioni di Angular, packages/localize/schematics). Uso in Spartacus: core-libs/schematics/collection.json, migrations.json, uso di @angular-devkit/schematics e @schematics/angular nel codice Spartacus, builder/nx executors usati nel monorepo (angular.json/project.json).
- Angular chiave: angular:packages/core/schematics/ (collection.json, migrations.json, ng-generate/*)
- Spartacus chiave: core-libs/schematics/src/collection.json, core-libs/schematics/src/migrations/migrations.json, core-libs/schematics/src/shared/utils/*, project.json di core-libs/*


## PARTE II — Architettura di Spartacus

### 10 — Bootstrap e ordine di inizializzazione
- Output: `parte-2/10-bootstrap-inizializzazione.md`
- Dossier: `dossier/10.facts.md` · Review: `review/10.review.md`
- File assegnati: 14 → `outline/10.files.txt`
- Focus: ordine di inizializzazione completo: main.ts → bootstrap → provider Spartacus → CONFIG_INITIALIZER → MODULE_INITIALIZER → site-context init → routing config → primo render. BaseCoreModule, BaseStorefrontModule, recipes (storefront/recipes, setup/recipes), public_api dei pacchetti core/storefront/setup.
- Spartacus chiave: outline/10.files.txt + core-libs/core/src/config/config-initializer/*, core-libs/core/src/site-context/providers/*, projects/storefrontapp/src/app/*

### 11 — Configurazione: provideConfig, default, merge, validator, initializer
- Output: `parte-2/11-configurazione.md`
- Dossier: `dossier/11.facts.md` · Review: `review/11.review.md`
- File assegnati: 17 → `outline/11.files.txt`
- Focus: provideConfig/provideDefaultConfig/provideConfigFactory, token Config/DefaultConfig/RootConfig, chunk e merge (deepMerge), ConfigInitializer e ConfigInitializerService (config asincrona), validator (provideConfigValidator, ConfigValidator), ConfigurationService e unifiedConfig per moduli lazy.
- Spartacus chiave: tutti i file di outline/11.files.txt + core-libs/core/src/util/deep-merge.ts (o equivalente)

### 12 — Feature module e lazy loading in Spartacus
- Output: `parte-2/12-feature-module-lazy.md`
- Dossier: `dossier/12.facts.md` · Review: `review/12.review.md`
- File assegnati: 12 → `outline/12.files.txt`
- Focus: featureModules config, provideFeature?, LazyModulesService, FeatureModulesService, MODULE_INITIALIZER, dipendenze tra feature, unifiedInjector, CmsFeaturesService (lato storefront), come una feature lib definisce root module con cmsComponents che puntano a una feature.
- Spartacus chiave: outline/12.files.txt, core-libs/storefront/cms-structure/services/cms-features.service.ts, esempio: feature-libs/cart/base/root/*

### 13 — Site context e site theme
- Output: `parte-2/13-site-context-theme.md`
- Dossier: `dossier/13.facts.md` · Review: `review/13.review.md`
- File assegnati: 84 → `outline/13.files.txt`
- Focus: SiteContext (base site, language, currency), SiteContextConfig, persistenza, inizializzazione da URL (SiteContextRoutesHandler, SiteContextUrlSerializer), SiteContextInterceptor, BaseSiteService, site-theme.
- Spartacus chiave: outline/13.files.txt

### 14 — Routing: route semantiche, URL, page guard, contesto
- Output: `parte-2/14-routing.md`
- Dossier: `dossier/14.facts.md` · Review: `review/14.review.md`
- File assegnati: 74 → `outline/14.files.txt`
- Focus: route semantiche (RoutingConfig, paths, paramsMapping), SemanticPathService, UrlTranslation (cxUrl pipe), ConfigurableRoutesService, UrlMatcherService, RoutingService e router-state NgRx, PageContext/PageType, CmsPageGuard e logica di risoluzione pagina, ProtectedRoutesGuard, context (ContextService, RoutingContextService), OnNavigateService.
- Spartacus chiave: outline/14.files.txt

### 15 — CMS (core): pagine, slot, componenti, caricamento
- Output: `parte-2/15-cms-core.md`
- Dossier: `dossier/15.facts.md` · Review: `review/15.review.md`
- File assegnati: 66 → `outline/15.files.txt`
- Focus: CmsService, store CMS (page, component, navigation), CmsPageConnector/Adapter, CmsStructureConfig, normalizer delle pagine (OccCmsPageNormalizer), CmsComponentConnector (batching), page structure, smartedit hooks, CmsConfig e cmsComponents mapping (definizione).
- Spartacus chiave: outline/15.files.txt

### 16 — CMS (storefront): rendering dinamico delle pagine
- Output: `parte-2/16-cms-rendering.md`
- Dossier: `dossier/16.facts.md` · Review: `review/16.review.md`
- File assegnati: 66 → `outline/16.files.txt`
- Focus: PageLayoutComponent, PageSlotComponent, ComponentWrapperDirective, ComponentHandler (default/lazy/web component), CmsComponentsService (mapping, guard, i18n chunk, featureModules), CmsComponentData, CmsInjectorService, PageLayoutService/handler, CmsRoutesService (child routes), cms-pages (PDP/PLP), LCP context.
- Spartacus chiave: outline/16.files.txt

### 17 — Outlet
- Output: `parte-2/17-outlet.md`
- Dossier: `dossier/17.facts.md` · Review: `review/17.review.md`
- File assegnati: 9 → `outline/17.files.txt`
- Focus: OutletDirective, OutletService, OutletPosition, OutletRefDirective, provideOutlet, deferred loading, outlet context, OutletRendererService.
- Spartacus chiave: outline/17.files.txt

### 18 — Layout, breakpoint, launch dialog e accessibilità
- Output: `parte-2/18-layout-breakpoint-a11y.md`
- Dossier: `dossier/18.facts.md` · Review: `review/18.review.md`
- File assegnati: 90 → `outline/18.files.txt`
- Focus: LayoutConfig (layoutSlots, breakpoints), BreakpointService, LaunchDialogService e LAUNCH_CALLER, header/main/storefront component, loading, a11y: keyboard focus (TrapFocus, AutoFocus, LockFocus, PersistFocus...), skip link.
- Spartacus chiave: outline/18.files.txt

### 19 — State management: NgRx, loader/entity/process state
- Output: `parte-2/19-state-management.md`
- Dossier: `dossier/19.facts.md` · Review: `review/19.review.md`
- File assegnati: 55 → `outline/19.files.txt`
- Focus: StateModule, StateConfig, transfer state NgRx (state-transfer), storage sync, loader state (LoaderAction, loaderReducer), entity state, entity-loader, processes-loader, process (ProcessModule), utils (StateUtils), meta reducers.
- Spartacus chiave: outline/19.files.txt

### 20 — Facade, command & query, eventi
- Output: `parte-2/20-facade-command-query-eventi.md`
- Dossier: `dossier/20.facts.md` · Review: `review/20.review.md`
- File assegnati: 19 → `outline/20.files.txt`
- Focus: facade pattern (facadeFactory, FacadeDescriptor, lazy facade in root module), Command/CommandService/CommandStrategy, Query/QueryService, EventService (register, get, dispatch), StateEventService (createFrom actions), eventi storefront (page/navigation/product/home builders).
- Spartacus chiave: outline/20.files.txt + core-libs/core/src/util/command-query/*, core-libs/core/src/lazy-loading/facade-factory/*

### 21 — Livello OCC: adapter, connector, converter, endpoint
- Output: `parte-2/21-occ.md`
- Dossier: `dossier/21.facts.md` · Review: `review/21.review.md`
- File assegnati: 85 → `outline/21.files.txt`
- Focus: OccConfig/BackendConfig, OccEndpointsService (buildUrl, scope, fields), OccEndpoints, ConverterService e normalizer/serializer token, adapter/connector pattern, OCC interceptor e header, occ-http-error, OCC models, LoadingScopes, ProductScope. Esempio end-to-end: product load.
- Spartacus chiave: outline/21.files.txt

### 22 — Autenticazione: OAuth, token, interceptor, refresh
- Output: `parte-2/22-auth.md`
- Dossier: `dossier/22.facts.md` · Review: `review/22.review.md`
- File assegnati: 80 → `outline/22.files.txt`
- Focus: AuthService, AuthStorageService, OAuthLibWrapperService, AuthInterceptor, AuthHttpHeaderService (refresh, retry), TokenRevocation, ClientTokenInterceptor e ClientAuth store, AuthRedirectService, UserIdService, guard (AuthGuard, NotAuthGuard), federated-login, AuthConfig.
- Spartacus chiave: outline/22.files.txt

### 23 — Utente, profilo, consensi
- Output: `parte-2/23-user.md`
- Dossier: `dossier/23.facts.md` · Review: `review/23.review.md`
- File assegnati: 453 → `outline/23.files.txt`
- Focus: core user (UserIdService? dove sta, user store legacy, consents, addresses, payments, notification prefs, customer coupons), anonymous consents, feature-libs/user (account: login, logout; profile: register, update, close account) con pattern root/core/occ/components, componenti storefront myaccount/user.
- Spartacus chiave: outline/23.files.txt (leggi per intero root, core facade, occ adapter; per componenti campiona)

### 24 — Prodotto e ricerca
- Output: `parte-2/24-product-search.md`
- Dossier: `dossier/24.facts.md` · Review: `review/24.review.md`
- File assegnati: 414 → `outline/24.files.txt`
- Focus: ProductService, ProductLoadingService (scopes), product store, ProductSearchService, search box/autocomplete, ProductReferences, Reviews, PageMetaResolver prodotto, componenti storefront product (PDP, PLP, facet, carousel), feature-libs/product (variants, bulk-pricing, future-stock, image-zoom), product-multi-dimensional.
- Spartacus chiave: outline/24.files.txt

### 25 — Carrello
- Output: `parte-2/25-cart.md`
- Dossier: `dossier/25.facts.md` · Review: `review/25.review.md`
- File assegnati: 528 → `outline/25.files.txt`
- Focus: cart/base (ActiveCartService, MultiCartService, store multi-cart, CartConnector/OccCartAdapter, cart entries, eventi, cart validation, add-to-cart, mini-cart), saved-cart, wish-list, quick-order, import-export. Pattern root/core/occ/components.
- Spartacus chiave: outline/25.files.txt (per intero: base/root, base/core facade e connectors, base/occ; campiona components)

### 26 — Checkout
- Output: `parte-2/26-checkout.md`
- Dossier: `dossier/26.facts.md` · Review: `review/26.review.md`
- File assegnati: 325 → `outline/26.files.txt`
- Focus: checkout base (CheckoutStepService, CheckoutConfig steps, guards, delivery address/mode, payment, place order, command/query facades), b2b checkout, scheduled replenishment, core/src/checkout.
- Spartacus chiave: outline/26.files.txt

### 27 — Ordini
- Output: `parte-2/27-order.md`
- Dossier: `dossier/27.facts.md` · Review: `review/27.review.md`
- File assegnati: 416 → `outline/27.files.txt`
- Focus: order (OrderHistoryFacade, OrderFacade, return requests, replenishment orders, reorder, order details components), document-flow, pdf-invoices.
- Spartacus chiave: outline/27.files.txt

### 28 — B2B: organization
- Output: `parte-2/28-organization-b2b.md`
- Dossier: `dossier/28.facts.md` · Review: `review/28.review.md`
- File assegnati: 831 → `outline/28.files.txt`
- Focus: organization administration (framework list/form/card condiviso, ItemService, ListService, configurazione routing B2B, budgets, cost centers, units, users, user groups, permissions), account-summary, order-approval, unit-order, user-registration, core/src/cost-center.
- Spartacus chiave: outline/28.files.txt

### 29 — ASM (Assisted Service Module)
- Output: `parte-2/29-asm.md`
- Dossier: `dossier/29.facts.md` · Review: `review/29.review.md`
- File assegnati: 288 → `outline/29.files.txt`
- Focus: ASM: root (AsmLoaderModule, config), core (AsmService, CSAgentAuthService, CsAgentAuthService token handling, customer search), occ, components (UI, emulation), customer-360 (framework sezioni e componenti), interazione con auth (CSAgent token).
- Spartacus chiave: outline/29.files.txt

### 30 — Product configurator
- Output: `parte-2/30-product-configurator.md`
- Dossier: `dossier/30.facts.md` · Review: `review/30.review.md`
- File assegnati: 558 → `outline/30.files.txt`
- Focus: product-configurator: common (ConfiguratorRouter, add-to-cart integration), rulebased (Configurator store, ConfiguratorCommonsService, OCC adapter vs CPQ adapter, componenti attributi), textfield. 
- Spartacus chiave: outline/30.files.txt

### 31 — Quote, customer ticketing, subscription billing
- Output: `parte-2/31-quote-ticketing-subscription.md`
- Dossier: `dossier/31.facts.md` · Review: `review/31.review.md`
- File assegnati: 367 → `outline/31.files.txt`
- Focus: quote (QuoteFacade, stati, azioni), customer-ticketing, subscription-billing.
- Spartacus chiave: outline/31.files.txt

### 32 — Pickup in store, store finder, delivery date
- Output: `parte-2/32-pickup-storefinder-delivery.md`
- Dossier: `dossier/32.facts.md` · Review: `review/32.review.md`
- File assegnati: 405 → `outline/32.files.txt`
- Focus: pickup-in-store, storefinder, requested-delivery-date, estimated-delivery-date.
- Spartacus chiave: outline/32.files.txt

### 33 — Tracking, SmartEdit, Qualtrics
- Output: `parte-2/33-tracking-smartedit-qualtrics.md`
- Dossier: `dossier/33.facts.md` · Review: `review/33.review.md`
- File assegnati: 78 → `outline/33.files.txt`
- Focus: tracking (personalization, tms: GTM/Adobe launch con eventi), smartedit, qualtrics.
- Spartacus chiave: outline/33.files.txt

### 34 — Integration libs: CDC, CDP, CDS, segment-refs
- Output: `parte-2/34-integration-cdc-cdp-cds.md`
- Dossier: `dossier/34.facts.md` · Review: `review/34.review.md`
- File assegnati: 249 → `outline/34.files.txt`
- Focus: CDC (Gigya, override di auth/user), CDP, CDS (merchandising, profile tag), segment-refs. Evidenzia ogni override via DI di servizi core.
- Spartacus chiave: outline/34.files.txt

### 35 — Integration libs: OPF, digital payments, OPPS
- Output: `parte-2/35-integration-opf-payments.md`
- Dossier: `dossier/35.facts.md` · Review: `review/35.review.md`
- File assegnati: 659 → `outline/35.files.txt`
- Focus: OPF (base, checkout, payment, quick-buy, cta, global-functions), digital-payments, opps. Evidenzia override via DI.
- Spartacus chiave: outline/35.files.txt

### 36 — Integration libs: S/4, OMF, CPQ quote, punchout, EPD
- Output: `parte-2/36-integration-s4-omf-cpq-punchout-epd.md`
- Dossier: `dossier/36.facts.md` · Review: `review/36.review.md`
- File assegnati: 433 → `outline/36.files.txt`
- Focus: s4-service, s4om, omf, cpq-quote, punchout, epd-visualization. Evidenzia override via DI.
- Spartacus chiave: outline/36.files.txt

### 37 — Internazionalizzazione (i18n)
- Output: `parte-2/37-i18n.md`
- Dossier: `dossier/37.facts.md` · Review: `review/37.review.md`
- File assegnati: 54 → `outline/37.files.txt`
- Focus: I18nConfig, TranslationService (i18next), translate pipe, chunk e lazy loading traduzioni, fallback, backend (http/resources), DateTimePicker/CxDatePipe/CxNumericPipe, core-libs/assets e script di generazione, translation chunks delle feature lib.
- Spartacus chiave: outline/37.files.txt

### 38 — Stili e theming
- Output: `parte-2/38-stili-theming.md`
- Dossier: `dossier/38.facts.md` · Review: `review/38.review.md`
- File assegnati: 202 → `outline/38.files.txt`
- Focus: @spartacus/styles: struttura SCSS (cxbase, components con placeholder %cx-*, layout, theme santorini/sparta/lambda, versioning/feature flags SCSS), integrazione nell'app, ThemeService/direzione (RTL), site-theme lato UI, Bootstrap vendorizzato.
- Spartacus chiave: outline/38.files.txt

### 39 — SSR ottimizzato
- Output: `parte-2/39-ssr-ottimizzato.md`
- Dossier: `dossier/39.facts.md` · Review: `review/39.review.md`
- File assegnati: 49 → `outline/39.files.txt`
- Focus: OptimizedSsrEngine (timeout, concurrency, cache, rendering strategy, fallback CSR), SsrOptimizationOptions, ExpressJS utils, providers SSR (provideServer), logger SSR (ExpressServerLogger), error handling SSR, engine-decorator, tokens.
- Spartacus chiave: outline/39.files.txt

### 40 — SEO e PWA
- Output: `parte-2/40-seo-pwa.md`
- Dossier: `dossier/40.facts.md` · Review: `review/40.review.md`
- File assegnati: 34 → `outline/40.files.txt`
- Focus: SEO: PageMetaService, PageMetaResolver (base/content/product/category/search), html title, meta tags, canonical (PageLinkService), structured data (JSON-LD builders), robots; PWA: PwaModule, AddToHomeScreen.
- Spartacus chiave: outline/40.files.txt

### 41 — Errori HTTP, error handling, logger e global message
- Output: `parte-2/41-errori-global-message.md`
- Dossier: `dossier/41.facts.md` · Review: `review/41.review.md`
- File assegnati: 55 → `outline/41.files.txt`
- Focus: HttpErrorInterceptor e HttpErrorHandler (per status), GlobalMessageService e store, GlobalMessageConfig, error-handling (CxErrorHandler, effects error, ErrorHandler di Angular), LoggerService.
- Spartacus chiave: outline/41.files.txt

### 42 — Feature toggle e deprecazioni
- Output: `parte-2/42-feature-toggle-deprecazioni.md`
- Dossier: `dossier/42.facts.md` · Review: `review/42.review.md`
- File assegnati: 16 → `outline/42.files.txt`
- Focus: FeaturesConfig, FeatureConfigService (isEnabled, isLevel), feature toggle (feature-toggles.ts), FeatureDirective/FeatureLevelDirective, pipe, uso negli SCSS (versioning), @deprecated e politica di deprecazione (grep di @deprecated per conteggi).
- Spartacus chiave: outline/42.files.txt

### 43 — Schematics e migrazioni di Spartacus
- Output: `parte-2/43-schematics-migrazioni.md`
- Dossier: `dossier/43.facts.md` · Review: `review/43.review.md`
- File assegnati: 268 → `outline/43.files.txt`
- Focus: core-libs/schematics: ng-add/add-spartacus, add-ssr, add-cms-component, wrapper-module, migrations (struttura per versione, dati di deprecazione costruttori/componenti, rename symbol), shared utils (feature config, lib-utils, dependency graph), modernize-app-*, ai-context, core-libs/skills; schematics nelle feature/integration libs.
- Spartacus chiave: outline/43.files.txt + cartelle */schematics delle librerie

### 44 — Strategia di test e tooling del monorepo
- Output: `parte-2/44-test-tooling.md`
- Dossier: `dossier/44.facts.md` · Review: `review/44.review.md`
- File assegnati: 23 → `outline/44.files.txt`
- Focus: Jasmine/Karma vs Vitest (config per lib, ci-scripts/unit-tests.sh), testing utilities, ssr-tests, e2e Cypress (struttura), CI scripts, nx targets, lint, api-extractor, tools/config.
- Spartacus chiave: outline/44.files.txt + ci-scripts/*, tools/*, nx.json, projects/storefrontapp-e2e-cypress (struttura)

### 45 — Componenti CMS e shared components di storefront
- Output: `parte-2/45-componenti-storefront.md`
- Dossier: `dossier/45.facts.md` · Review: `review/45.review.md`
- File assegnati: 286 → `outline/45.files.txt`
- Focus: componenti CMS generici di storefront (content: banner, paragraph, link, tab; navigation; misc: icon, site-context selector; myaccount escluso), shared components (carousel, form errors, item counter, media, pagination, spinner, star rating, popover, card, ...), directives, pipes, servizi condivisi.
- Spartacus chiave: outline/45.files.txt

### 46 — Utility, window e modelli di dominio
- Output: `parte-2/46-util-modelli.md`
- Dossier: `dossier/46.facts.md` · Review: `review/46.review.md`
- File assegnati: 57 → `outline/46.files.txt`
- Focus: core util (deep-merge? type guards, serialization, command-query (se non in 20), java-reg-exp, testing helpers), window (WindowRef), model (tipi di dominio, module augmentation).
- Spartacus chiave: outline/46.files.txt

### 47 — L'app demo storefrontapp
- Output: `parte-2/47-app-demo.md`
- Dossier: `dossier/47.facts.md` · Review: `review/47.review.md`
- File assegnati: 116 → `outline/47.files.txt`
- Focus: projects/storefrontapp: main.ts/main.server.ts, server.ts (Express + OptimizedSsrEngine), app config, spartacus-features/ spartacus-configuration, environments e env-cmd (b2c/b2b), feature flag del build.
- Spartacus chiave: outline/47.files.txt


## PARTE III — Estendere Spartacus

### 50 — Ricette: configurazione, DI, interceptor, eventi
- Output: `parte-3/50-ricette-config-di.md`
- Dossier: `dossier/50.facts.md` · Review: `review/50.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus (Parte III): ricette — override di configurazione (provideConfig, ordine, unified), override di service/facade via DI (useExisting/useClass, facade lazy), interceptor custom, eventi custom (EventService.register, StateEventService, ascolto). Ogni ricetta: quando usarla, esempio di codice che usa SOLO simboli esportati dai public_api (verifica con grep nei public_api.ts/index.ts), file sorgente che la rendono possibile, limiti.
- File chiave: core-libs/core/public_api.ts e index.ts collegati, core-libs/core/src/config/*, core-libs/core/src/event/*, core-libs/core/src/lazy-loading/facade-factory/*

### 51 — Ricette: componenti CMS, outlet, route e layout
- Output: `parte-3/51-ricette-cms-outlet-layout.md`
- Dossier: `dossier/51.facts.md` · Review: `review/51.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus (Parte III): ricette — sostituire un componente CMS (cmsComponents mapping), estendere un componente (ereditarietà + CmsComponentData), creare un nuovo componente CMS, outlet (provideOutlet, cxOutlet replace/before/after), route custom e page layout (RoutingConfig, CmsRoute, LayoutConfig, ContentPage route).
- File chiave: core-libs/storefront/public_api.ts, core-libs/core/src/cms/config/*, core-libs/storefront/cms-structure/*

### 52 — Ricette: OCC, adapter, converter, endpoint, meta resolver
- Output: `parte-3/52-ricette-occ-dati.md`
- Dossier: `dossier/52.facts.md` · Review: `review/52.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus (Parte III): ricette — adapter/connector custom, converter custom (normalizer multi provider), campi OCC aggiuntivi (endpoints fields, scope), endpoint custom (OccEndpoints augmentation + OccEndpointsService.buildUrl), meta resolver custom (PageMetaResolver).
- File chiave: core-libs/core/src/occ/*, core-libs/core/src/util/converter.service.ts, core-libs/core/src/cms/page/* (resolver), feature-libs/cart/base/occ/*

### 53 — Ricette: feature lib lazy, carrello/checkout, stili, traduzioni
- Output: `parte-3/53-ricette-feature-cart-checkout-stili-i18n.md`
- Dossier: `dossier/53.facts.md` · Review: `review/53.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus (Parte III): ricette — feature lib custom lazy-loaded (root module + featureModules + cmsComponents + facadeFactory), estensione carrello (add-to-cart, entry fields) e checkout (step config, nuovi step, guard), stili (override SCSS, placeholder, theme), traduzioni (provideConfig i18n resources, chunk, override chiavi).
- File chiave: feature-libs/cart/base/root/*, feature-libs/checkout/base/root/*, core-libs/core/src/i18n/*, core-libs/styles/scss/*

### 54 — API pubblica vs interna, upgrade, anti-pattern, checklist
- Output: `parte-3/54-upgrade-safe.md`
- Dossier: `dossier/54.facts.md` · Review: `review/54.review.md`
- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)
- Focus (Parte III): API pubblica vs interna (public_api, simboli non esportati, ɵ/internal), cosa si rompe negli upgrade (migrazioni schematics, deprecation data, feature toggles), anti-pattern (import da path interni, override di classi non esportate, mutazione di config), checklist upgrade-safe.
- File chiave: core-libs/*/public_api.ts, core-libs/schematics/src/migrations/*, core-libs/core/src/features-config/*


## APPENDICI (generate da script in `tools/`)

- A01 — Tutti gli InjectionToken → `appendici/A01-injection-token.md`
- A02 — Interfacce di config (chiavi, tipi, default) → `appendici/A02-config.md`
- A03 — Mappa CMS component type → componente → modulo → `appendici/A03-cms-components.md`
- A04 — Endpoint OCC → `appendici/A04-occ-endpoints.md`
- A05 — Guard → `appendici/A05-guard.md`
- A06 — Interceptor → `appendici/A06-interceptor.md`
- A07 — Eventi → `appendici/A07-eventi.md`
- A08 — Outlet reference → `appendici/A08-outlet.md`
- A09 — Feature toggle → `appendici/A09-feature-toggle.md`
- A10 — Simboli @deprecated → `appendici/A10-deprecated.md`
- A11 — Glossario → `appendici/A11-glossario.md`
- A12 — Indice simbolo → capitolo → `appendici/A12-indice-simboli.md`
