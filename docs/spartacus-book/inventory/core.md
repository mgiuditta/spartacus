# Inventario: `core-libs/core` (`@spartacus/core`)

SHA `5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`. Mappa sintetica per la pianificazione dei capitoli.
Conteggi = file `.ts` non spec tracciati da git (`git ls-files <dir> | grep -E '\.ts$' | grep -v spec | wc -l`).
Totale `core-libs/core/src`: **837** file `.ts` non spec (1236 file tracciati in tutto).

---

## 1. Entry point

| Tipo | Nome import | Config | Public API |
|---|---|---|---|
| primario | `@spartacus/core` | `core-libs/core/ng-package.json:L1-L7` (`dest: ../../dist/core`, `entryFile: ./public_api.ts`) | `core-libs/core/public_api.ts:L1-L58` |
| secondari | — nessuno | unico `ng-package.json` nella libreria (ricerca glob `core-libs/core/**/ng-package.json`) | — |

Note su `core-libs/core/public_api.ts`:
- `L10-L36`: 27 `export * from './src/<cartella>/index'` (una per cartella di primo livello) + `./src/base-core.module` (`L12-L12`).
- `L38-L58`: blocco `AUGMENTABLE_TYPES_START/END` con re-export espliciti dei tipi estendibili via module augmentation:
  `AuthToken`, `Config`, `Address`, `B2BUnit`, `B2BUser`, `B2BUserRole`, `CostCenter`, `Facet`, `ProductSearchPage`,
  `Price`, `Product`, `Stock`, `BackendConfig`, `OccEndpoints`, `ProductScope`, `RoutingConfigDefinition`,
  `OccHttpErrorReason`, `OccHttpErrorType`.
- Le sottocartelle `testing/` (es. `i18n/testing`, `logger/testing`, `routing/.../url-translation/testing`) sono esportate dall'entry primario (non hanno entry dedicato).

## 2. Dipendenze (`core-libs/core/package.json`)

- `name: "@spartacus/core"` — `:L2-L2`; `version: "221121.22.0"` — `:L3-L3` (⚠️ DA VERIFICARE: AGENT_RULES indica Spartacus 2612.0.0; il package.json allo SHA riporta `221121.22.0`).
- `dependencies` — `:L14-L16`: `tslib ^2.8.1` (`:L15-L15`).
- `peerDependencies` — `:L17-L30`:

| Pacchetto | Versione | Riga |
|---|---|---|
| `@angular/common` | ^21.2.23 | `:L18-L18` |
| `@angular/core` | ^21.2.23 | `:L19-L19` |
| `@angular/platform-browser` | ^21.2.23 | `:L20-L20` |
| `@angular/router` | ^21.2.23 | `:L21-L21` |
| `@ngrx/effects` | ^21.0.1 | `:L22-L22` |
| `@ngrx/router-store` | ^21.0.1 | `:L23-L23` |
| `@ngrx/store` | ^21.0.1 | `:L24-L24` |
| `angular-oauth2-oidc` | ^20.0.2 | `:L25-L25` |
| `i18next` | ^25.7.4 | `:L26-L26` |
| `i18next-http-backend` | ^3.0.6 | `:L27-L27` |
| `i18next-resources-to-backend` | ^1.2.2 | `:L28-L28` |
| `rxjs` | ^7.8.0 | `:L29-L29` |

- `engines.node: ^22.22.0` — `:L31-L33`.

## 3. Albero di `src/` (ruolo + n. file .ts non spec)

Legenda store: `store/` contiene di norma `actions/ effects/ reducers/ selectors/` (conteggi tra parentesi a/e/r/s).

```
src/                                   837
├── base-core.module.ts                  1  NgModule radice che importa i moduli core .forRoot()
├── test.ts                              1  bootstrap test (non API)
├── anonymous-consents/                 32  consensi utente anonimo (cookie/consent banner)
│   ├── config/                          2  AnonymousConsentsConfig + default
│   ├── connectors/                      4  adapter/connector template consensi + converter token
│   ├── facade/                          2  AnonymousConsentsService
│   ├── http-interceptors/               2  header consensi su richieste OCC
│   ├── services/                        2  persistenza stato consensi
│   └── store/                          18  NgRx (a3/e2/r4/s6)
├── auth/                               70  autenticazione (2 file top-level: auth.module, index)
│   ├── client-auth/                    23  token client (client_credentials) per chiamate OCC anonime
│   │   ├── http-interceptors/           2  ClientTokenInterceptor
│   │   ├── models/                      1
│   │   ├── services/                    5  ClientTokenService, ClientAuthenticationTokenService...
│   │   └── store/                      13  NgRx client token
│   └── user-auth/                      45  login utente OAuth2 (angular-oauth2-oidc)
│       ├── config/                      4  AuthConfig + default
│       ├── events/                      4  LoginEvent/LogoutEvent + builder
│       ├── facade/                      5  AuthService, UserIdService
│       ├── guards/                      6  AuthGuard, NotAuthGuard, LogoutGuard...
│       ├── http-interceptors/           3  AuthInterceptor, TokenRevocationInterceptor
│       ├── models/                      5  AuthToken, ecc.
│       ├── services/                   11  AuthStorage, OAuthLibWrapper, AuthHttpHeader, AuthRedirect...
│       ├── store/                       3  (residuo NgRx: azioni login/logout)
│       └── utils/                       2
├── checkout/                            6  solo converter token (POS, payment details) condivisi
│   └── connectors/{checkout,payment}    5
├── cms/                                66  dati CMS (pagine, componenti, slot) lato core
│   ├── config/                          4  CmsConfig, CmsStructureConfig
│   ├── connectors/                      9  CmsPage/CmsComponent connector+adapter (component 4, page 4)
│   ├── decorators/                      3  CmsComponentDecorator, CmsSlotDecorator
│   ├── facade/                          3  CmsService, PageMetaService
│   ├── model/                           4  modelli pagina/strutture
│   ├── page/                           14  page meta resolver (SEO), config/ 3, routing/ 5
│   ├── services/                        3
│   ├── store/                          23  NgRx (a5/e4/r5/s6)
│   └── utils/                           1
├── config/                             17  sistema di configurazione globale (Config, chunk, provide*)
│   ├── config-initializer/              4  CONFIG_INITIALIZER, ConfigInitializerService
│   ├── config-validator/                3  ConfigValidatorToken, validateConfig
│   ├── services/                        1  ConfigurationService (config "unificata" lazy)
│   └── utils/                           3  deepMerge, getCookie, stringTemplate
├── cost-center/                         5  converter token cost center (B2B)
│   └── connectors/cost-center/          2
├── error-handling/                     16  ErrorHandler globale Spartacus
│   ├── effects-error-handler/           5  errori da NgRx effects
│   ├── http-error-handler/              4  interceptor errori HTTP verso ErrorHandler
│   └── multi-error-handler/             4  MULTI_ERROR_HANDLER, LoggingErrorHandler
├── event/                               4  EventService, CxEvent
│   └── utils/                           1  MergingSubject
├── features-config/                    16  feature level + feature toggles
│   ├── config/                          1  FeaturesConfig
│   ├── directives/                      2  *cxFeature, *cxFeatureLevel
│   ├── feature-toggles/                 7  token/provider toggles (config/ 1, testing/ 2)
│   ├── services/                        2  FeatureConfigService
│   └── utils/                           2  isFeatureEnabled
├── federated-login/                    10  login federato (config 2, model 2, services 4)
├── global-message/                     34  messaggi globali utente + gestione errori HTTP→messaggio
│   ├── config/ 2 · facade/ 2 · models/ 2
│   ├── http-interceptors/              12  HttpErrorInterceptor + handlers/ 10 (400,401,403,404,409,500...)
│   └── store/                          14  NgRx (a3/e2/r2/s4)
├── http/                                7  HttpModule
│   └── http-timeout/                    5  HttpTimeoutInterceptor + config
├── i18n/                               31  traduzioni (9 file top-level: pipe, TranslationService, chunk)
│   ├── config/                          3  I18nConfig
│   ├── i18next/                        13  implementazione i18next (backend/ 7, plugins/ 1)
│   └── testing/                         6  I18nTestingModule, mock
├── lazy-loading/                       12  feature modules lazy, facade factory, UnifiedInjector
│   ├── events/                          2  ModuleInitializedEvent
│   └── facade-factory/                  4  facadeFactory, FacadeFactoryService
├── logger/                              5  LoggerService
│   └── testing/                         3
├── model/                              16  modelli di dominio condivisi (Product, Address, cms, ...)
├── occ/                                78  layer OCC (2 file top-level: base-occ.module, index)
│   ├── adapters/                       53  adapter OCC: cms 7, cost-center 7, product 15, site-context 7, user 16
│   ├── config/                          6  OccConfig, default, meta-tag config, validator
│   ├── interceptors/                    2  WithCredentialsInterceptor
│   ├── occ-models/                      3  OccEndpoints, modelli raw OCC
│   ├── services/                        5  OccEndpointsService, OccFieldsService, LoadingScopes...
│   └── utils/                           7  OCC_HTTP_TOKEN, InterceptorUtil, user id constants
├── process/                            10  stato "process" (loading/success/error per id)
│   └── store/                           8  reducers 1, selectors 4
├── product/                            76  prodotto + ricerca + recensioni + referenze
│   ├── connectors/                     20  product 7, references 4, reviews 4, search 4
│   ├── event/                           4  ProductEventBuilder
│   ├── facade/                          9  ProductService, ProductSearchService, SearchboxService...
│   ├── model/                           3  ProductScope
│   ├── services/                        7  ProductLoadingService, page meta resolver prodotto/categoria/ricerca
│   └── store/                          31  NgRx (a8/e7/r4/s9)
├── routing/                            51  routing Angular+NgRx, rotte configurabili, URL semantici
│   ├── configurable-routes/            17  config 1, secure-portal-config 2, url-translation 10 (UrlPipe, SemanticPath)
│   ├── external-routes/                 6  ExternalRoutesGuard/Service
│   ├── facade/                          2  RoutingService, RoutingParamsService
│   ├── location-initialized-multi/      1  LOCATION_INITIALIZED_MULTI
│   ├── models/                          2  CmsRoute, PageContext
│   ├── protected-routes/                3  ProtectedRoutesGuard/Service
│   ├── services/                        3  UrlMatcherService
│   ├── store/                          12  router-store (a3/e2/r2/s3), CustomSerializer
│   └── url-matcher/                     3  DEFAULT_URL_MATCHER
├── site-context/                       58  base site, lingua, valuta, contesto URL
│   ├── config/                          6  SiteContextConfig, config-loader/ 1
│   ├── connectors/                      4  SiteAdapter/SiteConnector + converter token
│   ├── events/                          4  LanguageSetEvent, CurrencySetEvent
│   ├── facade/                          5  BaseSiteService, LanguageService, CurrencyService
│   ├── providers/                       6  initializer contesto, ContextServiceMap
│   ├── services/                        9  SiteContextUrlSerializer, RoutesHandler, ParamsService
│   └── store/                          22  NgRx (a5/e4/r4/s6)
├── site-theme/                         26  tema per sito (config 3, facade 2, providers 3, services 2, store 14)
├── state/                              45  infrastruttura NgRx (2 file top-level: state.module, index)
│   ├── config/                          1  StateConfig (storageSync, transfer state)
│   ├── event/                           4  StateEventService (azioni → eventi)
│   ├── reducers/                        2  meta-reducer TransferState
│   ├── services/                        1  StatePersistenceService (browser storage)
│   └── utils/                          35  loader, entity, entity-loader, processes-loader,
│                                           entity-processes-loader, scoped-loader (4-5 ciascuno)
├── user/                              106  dati utente (indirizzi, consensi, coupon, interessi, notifiche, pagamenti)
│   ├── config/                          3
│   ├── connectors/                     27  address, consent, cost-center, customer-coupon, interests,
│   │                                       notification-preference, payment
│   ├── events/                          4  UserEventBuilder
│   ├── facade/                          9  UserAddressService, UserConsentService...
│   └── store/                          60  NgRx (a16/e13/r13/s15)
├── util/                               36  utility trasversali (converter, applicable, glob, ssr tokens...)
│   ├── browser-tab-notification/        2
│   ├── command-query/                   3  CommandService, QueryService
│   ├── java-reg-exp-converter/          2
│   └── rxjs/                            7  backOff, withdrawOn, uniteLatest, getLastValueSync...
└── window/                              2  WindowRef (astrazione window/document/platform)
```

## 4. Simboli principali per cartella

Path relativi a `core-libs/core/src/` (prefisso omesso per brevità; il path completo è `core-libs/core/src/<...>`).
Range = da decoratore (se presente) a chiusura.

### root
- `BaseCoreModule` — `base-core.module.ts:L26-L53` (importa ErrorHandling, State, Config, ConfigInitializer, ConfigValidator, I18n, Cms, GlobalMessage, Process, FeaturesConfig, SiteContext, MetaTagConfig, BaseOcc, LazyLoading, Http, SiteTheme `.forRoot()` + FederatedLoginModule)

### config
- `Config` (abstract, `providedIn: 'root'`, factory) — `config/config-tokens.ts:L16-L21`; `configFactory` — `:L10-L12`
- token `DefaultConfig` `:L32-L35`, `RootConfig` `:L44-L47`, `ConfigChunk` `:L53-L53`, `DefaultConfigChunk` `:L60-L62` (`config/config-tokens.ts`)
- `provideConfig` `config/config-providers.ts:L18-L27`, `provideConfigFactory` `:L37-L48`, `provideDefaultConfig` `:L55-L61`, `provideDefaultConfigFactory` `:L69-L79`
- `ConfigModule` — `config/config.module.ts:L13-L67`
- `CONFIG_INITIALIZER` `config/config-initializer/config-initializer.ts:L33-L35`, `CONFIG_INITIALIZER_FORROOT_GUARD` `:L37-L39`
- `ConfigInitializerService` — `config/config-initializer/config-initializer.service.ts:L21-L176`; `ConfigInitializerModule` — `config/config-initializer/config-initializer.module.ts:L41-L68`
- `ConfigValidatorToken` `config/config-validator/config-validator.ts:L11-L13`, `validateConfig` `:L37-L48`; `ConfigValidatorModule` `config/config-validator/config-validator.module.ts:L45-L63`
- `ConfigurationService` — `config/services/configuration.service.ts:L21-L114`
- `deepMerge` — `config/utils/deep-merge.ts:L18-L49`
- `TestConfigModule` `config/test-config.module.ts:L74-L106`, `TEST_CONFIG` `:L42-L55`, `TEST_CONFIG_COOKIE_NAME` `:L31-L33`

### features-config
- `FeaturesConfig` — `features-config/config/features-config.ts:L27-L118`; `FeaturesConfigModule` — `features-config/features-config.module.ts:L23-L53`
- `FeatureToggles` (abstract, root) — `features-config/feature-toggles/feature-toggles-tokens.ts:L15-L24`; token `DefaultFeatureToggles` `:L33-L43`, `RootFeatureToggles` `:L48-L58`, `FeatureTogglesChunk` `:L64-L67`, `DefaultFeatureTogglesChunk` `:L75-L78`
- `provideFeatureToggles` `features-config/feature-toggles/feature-toggles-providers.ts:L25-L33`, `provideFeatureTogglesFactory` `:L44-L52`, `provideDefaultFeatureToggles` `:L61-L69`
- `FeatureConfigService` `features-config/services/feature-config.service.ts:L18-L34`; `isFeatureEnabled` `features-config/utils/feature-config-utils.ts:L48-L65`
- `FeatureDirective` `features-config/directives/feature.directive.ts:L11-L30`; `FeatureLevelDirective` `features-config/directives/feature-level.directive.ts:L13-L32`

### lazy-loading
- `LazyLoadingModule` — `lazy-loading/lazy-loading.module.ts:L38-L53`
- `MODULE_INITIALIZER` — `lazy-loading/tokens.ts:L19-L20`
- `LazyModulesService` `lazy-loading/lazy-modules.service.ts:L38-L246`; `FeatureModulesService` `lazy-loading/feature-modules.service.ts:L13-L124`
- `UnifiedInjector` `lazy-loading/unified-injector.ts:L24-L94`
- `facadeFactory` `lazy-loading/facade-factory/facade-factory.ts:L20-L24`; `FacadeFactoryService` `lazy-loading/facade-factory/facade-factory.service.ts:L29-L141`
- `ModuleInitializedEvent` `lazy-loading/events/module-initialized-event.ts:L16-L32`

### state / process
- `StateModule` `state/state.module.ts:L10-L18`; `StateConfig` `state/config/state-config.ts:L20-L35`; `StorageSyncType` `:L10-L14`; `StateTransferType` `:L16-L18`
- `TRANSFER_STATE_META_REDUCER` `state/reducers/index.ts:L23-L25`; `stateMetaReducers` `:L27-L43`
- `getTransferStateReducer` `state/reducers/transfer-state.reducer.ts:L18-L40`, `getServerTransferStateReducer` `:L42-L62`, `getBrowserTransferStateReducer` `:L64-L96`
- `StatePersistenceService` `state/services/state-persistence.service.ts:L18-L132`; `StateEventService` `state/event/state-event.service.ts:L19-L77`; `getStateSlice` `state/utils/get-state-slice.ts:L38-L55`
- `loaderReducer` `state/utils/loader/loader.reducer.ts:L24-L84`; `LoaderState` `state/utils/loader/loader-state.ts:L7-L12`; `LoaderAction` `state/utils/loader/loader.action.ts:L26-L29`
- `entityLoaderReducer` `state/utils/entity-loader/entity-loader.reducer.ts:L17-L25`; `processesLoaderReducer` `state/utils/processes-loader/processes-loader.reducer.ts:L20-L71`; `entityProcessesLoaderReducer` `state/utils/entity-processes-loader/entity-processes-loader.reducer.ts:L17-L25`
- `ProcessModule` `process/process.module.ts:L10-L20`; `ProcessStoreModule` `process/store/process-store.module.ts:L13-L17`; `PROCESS_FEATURE` `process/store/process-state.ts:L9-L9`; `getProcessStateFactory` `process/store/selectors/process.selectors.ts:L18-L26`
- pattern ricorrente `reducerToken`/`reducerProvider` in ogni `*/store/reducers/index.ts` (es. `site-context/store/reducers/index.ts:L22-L28`, `product/store/reducers/index.ts:L37-L43`, `cms/store/reducers/index.ts:L67-L73`, `user/store/reducers/index.ts:L91-L97`)

### event
- `CxEvent` `event/cx-event.ts:L12-L17`; `EventService` `event/event.service.ts:L44-L223`
- event builder per dominio: `UserAuthEventBuilder` `auth/user-auth/events/user-auth-event.builder.ts:L17-L64`, `SiteContextEventBuilder` `site-context/events/site-context-event.builder.ts:L19-L73`, `ProductEventBuilder` `product/event/product-event.builder.ts:L19-L117`, `UserEventBuilder` `user/events/user-event.builder.ts:L16-L54`
- `createFrom` `util/create-from.ts:L15-L17`

### util (facade / command-query / converter)
- `Command` `util/command-query/command.service.ts:L27-L29`; `CommandService` `:L40-L140`; `QueryService` `util/command-query/query.service.ts:L44-L160`
- `ConverterService` `util/converter.service.ts:L32-L142`; `resolveApplicable` `util/applicable.ts:L63-L87`
- `SERVER_REQUEST_URL` `util/ssr.tokens.ts:L12-L14`; `SERVER_REQUEST_ORIGIN` `:L19-L21`
- `ScriptLoader` `util/script-loader.service.ts:L15-L122`; `GlobService` `util/glob.service.ts:L10-L33`; `CombinedInjector` `util/combined-injector.ts:L27-L72`; `JavaRegExpConverter` `util/java-reg-exp-converter/java-reg-exp-converter.ts:L10-L59`
- rxjs: `backOff` `util/rxjs/back-off.ts:L39-L62`, `withdrawOn` `util/rxjs/withdraw-on.ts:L19-L27`, `uniteLatest` `util/rxjs/unite-latest.ts:L26-L47`, `getLastValueSync` `util/rxjs/get-last-value-sync.ts:L19-L23`
- `OccHttpErrorType` `util/occ-http-error-constants.ts:L9-L12`; `tryNormalizeHttpError` `util/try-normalize-http-error.ts:L21-L26`
- `AbstractBrowserTabNotificationService` `util/browser-tab-notification/abstract-browser-tab-notification.service.ts:L49-L135`

### window / logger
- `WindowRef` `window/window-ref.ts:L13-L108`
- `LoggerService` `logger/logger.service.ts:L15-L39`; `LoggerTestingModule` `logger/testing/logger-testing.module.ts:L11-L14`; `MockLoggerService` `logger/testing/mock-logger.service.ts:L11-L22`

### error-handling
- `ErrorHandlingModule` `error-handling/error-handling.module.ts:L13-L32`; `CxErrorHandler` `error-handling/cx-error-handler.ts:L18-L31`
- `MULTI_ERROR_HANDLER` `error-handling/multi-error-handler/multi-error-handler.ts:L25-L27`; `MultiErrorHandler` `:L16-L18`; `LoggingErrorHandler` `error-handling/multi-error-handler/logging-error-handler.ts:L17-L26`; `provideMultiErrorHandler` `error-handling/multi-error-handler/provide-multi-error-handler.ts:L11-L19`
- `HttpErrorHandlerModule` `error-handling/http-error-handler/http-error-handler.module.ts:L11-L25`; `HttpErrorHandlerInterceptor` `error-handling/http-error-handler/http-error-handler.interceptor.ts:L40-L99`; `OutboundHttpError` `error-handling/http-error-handler/outbound-http-error.ts:L10-L14`
- `EffectsErrorHandlerModule` `error-handling/effects-error-handler/effects-error-handler.module.ts:L12-L22`; `CxErrorHandlerEffect` `error-handling/effects-error-handler/cx-error-handler.effect.ts:L18-L33`; `ErrorActionService` `error-handling/effects-error-handler/error-action.service.ts:L19-L57`

### global-message / http
- `GlobalMessageModule` `global-message/global-message.module.ts:L19-L33`; `GlobalMessageService` `global-message/facade/global-message.service.ts:L21-L73`; `GlobalMessageConfig` `global-message/config/global-message-config.ts:L15-L27`; `GlobalMessageType` `global-message/models/global-message.model.ts:L9-L15`
- `HttpErrorInterceptor` `global-message/http-interceptors/http-error.interceptor.ts:L22-L66`; `HttpErrorHandler` (abstract, Applicable) `global-message/http-interceptors/handlers/http-error.handler.ts:L12-L74`
- `HttpModule` `http/http.module.ts:L10-L19`; `HttpTimeoutModule` `http/http-timeout/http-timeout.module.ts:L13-L23`; `HttpTimeoutInterceptor` `http/http-timeout/http-timeout.interceptor.ts:L26-L125`

### site-context / site-theme
- `SiteContextModule` `site-context/site-context.module.ts:L43-L66`; `SiteContextConfig` `site-context/config/site-context-config.ts:L10-L19`
- `BaseSiteService` `site-context/facade/base-site.service.ts:L21-L109`; `LanguageService` `site-context/facade/language.service.ts:L24-L96`; `CurrencyService` `site-context/facade/currency.service.ts:L25-L104`
- `SiteContextUrlSerializer` `site-context/services/site-context-url-serializer.ts:L30-L160`; `SiteContextRoutesHandler` `site-context/services/site-context-routes-handler.ts:L22-L173`; `SiteContextParamsService` `site-context/services/site-context-params.service.ts:L19-L108`
- `contextInitializerProviders` `site-context/providers/context-initializer-providers.ts:L36-L55`; `ContextServiceMap` `site-context/providers/context-service-map.ts:L18-L20`; `initializeContext` `site-context/providers/context-service-providers.ts:L15-L21`; `siteContextParamsProviders` `site-context/providers/site-context-params-providers.ts:L14-L18`
- `SiteAdapter` `site-context/connectors/site.adapter.ts:L17-L57`; `SiteConnector` `site-context/connectors/site.connector.ts:L19-L56`; `BASE_SITE_NORMALIZER` & co. `site-context/connectors/converters.ts:L12-L38`
- `LanguageSetEvent` `site-context/events/site-context.events.ts:L12-L18`; `CurrencySetEvent` `:L23-L29`
- `SiteThemeModule` `site-theme/site-theme.module.ts:L15-L29`; `SiteThemeService` `site-theme/facade/site-theme.service.ts:L27-L138`; `SiteThemeConfig` `site-theme/config/site-theme-config.ts:L11-L19`

### routing
- `RoutingModule` `routing/routing.module.ts:L73-L109`; `RoutingService` `routing/facade/routing.service.ts:L25-L170`; `RoutingParamsService` `routing/facade/routing-params.service.ts:L18-L45`
- `CustomSerializer` `routing/store/reducers/router.reducer.ts:L108-L240`; `RouterState` `routing/store/routing-state.ts:L13-L16`; `CmsRoute` `routing/models/cms-route.ts:L15-L17`; `PageContext` `routing/models/page-context.model.ts:L22-L30`
- `RoutingConfig` `routing/configurable-routes/config/routing-config.ts:L22-L28`; `RoutingConfigService` `routing/configurable-routes/routing-config.service.ts:L12-L93`; `ConfigurableRoutesService` `routing/configurable-routes/configurable-routes.service.ts:L21-L186`
- `SemanticPathService` `routing/configurable-routes/url-translation/semantic-path.service.ts:L14-L172`; `UrlPipe` `routing/configurable-routes/url-translation/url.pipe.ts:L11-L18`; `UrlModule` `routing/configurable-routes/url-translation/url.module.ts:L12-L16`
- `ExternalRoutesModule` `routing/external-routes/external-routes.module.ts:L14-L29`; `ExternalRoutesService` `routing/external-routes/external-routes.service.ts:L16-L71`; `ExternalRoutesGuard` `routing/external-routes/external-routes.guard.ts:L12-L42`; `ExternalRoutesConfig` `routing/external-routes/external-routes-config.ts:L14-L20`
- `ProtectedRoutesGuard` `routing/protected-routes/protected-routes.guard.ts:L13-L34`; `ProtectedRoutesService` `routing/protected-routes/protected-routes.service.ts:L11-L90`
- `UrlMatcherService` `routing/services/url-matcher.service.ts:L17-L198`; `DEFAULT_URL_MATCHER` `routing/url-matcher/default-url-matcher.ts:L35-L45`; `getDefaultUrlMatcherFactory` `:L13-L24`
- `LOCATION_INITIALIZED_MULTI` `routing/location-initialized-multi/location-initialized-multi.ts:L36-L38`

### cms (+ seo/meta)
- `CmsModule` `cms/cms.module.ts:L14-L24`; `CmsStoreModule` `cms/store/cms-store.module.ts:L33-L45`; `CmsConfig` `cms/config/cms-config.ts:L124-L134`; `CmsStructureConfig` `cms/config/cms-structure.config.ts:L75-L85`
- `CmsService` `cms/facade/cms.service.ts:L33-L310`
- `CmsPageConnector` `cms/connectors/page/cms-page.connector.ts:L16-L71`; `CmsComponentConnector` `cms/connectors/component/cms-component.connector.ts:L16-L87`; `CMS_PAGE_NORMALIZER` `cms/connectors/page/converters.ts:L11-L11`+; `CMS_COMPONENT_NORMALIZER` `cms/connectors/component/converters.ts:L11-L11`+
- `PageType` `model/cms.model.ts:L38-L43`
- SEO: `PageMetaModule` `cms/page/page-meta.module.ts:L13-L29`; `PageMetaService` `cms/facade/page-meta.service.ts:L29-L140`; `PageMetaResolver` `cms/page/page-meta.resolver.ts:L17-L54`; `BasePageMetaResolver` `cms/page/base-page-meta.resolver.ts:L25-L108`; `ContentPageMetaResolver` `cms/page/content-page-meta.resolver.ts:L29-L65`; `RoutingPageMetaResolver` `cms/page/routing/routing-page-meta.resolver.ts:L37-L199`; `DefaultRoutePageMetaResolver` `cms/page/routing/default-route-page-meta.resolver.ts:L21-L79`; `PageLinkService` `cms/page/routing/page-link.service.ts:L18-L103`

### occ
- `BaseOccModule` `occ/base-occ.module.ts:L17-L35`; `OccConfig` `occ/config/occ-config.ts:L42-L48`; `BackendConfig` `:L13-L40`; `defaultOccConfig` `occ/config/default-occ-config.ts:L9-L15`; `occConfigValidator` `occ/config/occ-config-validator.ts:L9-L17`; `MetaTagConfigModule` `occ/config/meta-tag-config.module.ts:L10-L18`
- `OccEndpointsService` `occ/services/occ-endpoints.service.ts:L31-L249`; `OccFieldsService` `occ/services/occ-fields.service.ts:L42-L134`; `OccRequestsOptimizerService` `occ/services/occ-requests-optimizer.service.ts:L19-L80`; `LoadingScopesService` `occ/services/loading-scopes.service.ts:L11-L78`
- `OccEndpoint` `occ/occ-models/occ-endpoints.model.ts:L9-L12`; `OCC_HTTP_TOKEN` `occ/utils/occ-http-token.ts:L20-L20`; `InterceptorUtil` `occ/utils/interceptor-util.ts:L13-L47`; `OCC_USER_ID_CONSTANTS` `occ/utils/index.ts:L19-L21`; `OCC_USER_ID_CURRENT` `occ/utils/occ-user-ids.ts:L7-L7`
- `WithCredentialsInterceptor` `occ/interceptors/with-credentials.interceptor.ts:L20-L53`; `SiteContextInterceptor` `occ/adapters/site-context/site-context.interceptor.ts:L25-L69`
- moduli adapter: `SiteContextOccModule` `occ/adapters/site-context/site-context-occ.module.ts:L18-L38`, `ProductOccModule` `occ/adapters/product/product-occ.module.ts:L30-L76`, `CmsOccModule` `occ/adapters/cms/cms-occ.module.ts:L16-L34`, `UserOccModule` `occ/adapters/user/user-occ.module.ts:L34-L72`, `CostCenterOccModule` `occ/adapters/cost-center/cost-center-occ.module.ts:L20-L40`
- adapter esempio: `OccSiteAdapter` `occ/adapters/site-context/occ-site.adapter.ts:L33-L141`; `OccProductAdapter` `occ/adapters/product/occ-product.adapter.ts:L20-L60`; `OccCmsPageAdapter` `occ/adapters/cms/occ-cms-page.adapter.ts:L31-L103`

### auth
- `AuthModule` `auth/auth.module.ts:L12-L24`; `UserAuthModule` `auth/user-auth/user-auth.module.ts:L98-L124`; `ClientAuthModule` `auth/client-auth/client-auth.module.ts:L19-L29`
- `AuthConfig` `auth/user-auth/config/auth-config.ts:L32-L143`; `USE_AUTHORIZATION_CODE_FLOW_BY_DEFAULT` `auth/user-auth/config/default-auth-config.ts:L15-L19`
- `AuthService` `auth/user-auth/facade/auth.service.ts:L44-L336`; `UserIdService` `auth/user-auth/facade/user-id.service.ts:L21-L89`
- `AuthStorageService` `auth/user-auth/services/auth-storage.service.ts:L15-L119`; `OAuthLibWrapperService` `auth/user-auth/services/oauth-lib-wrapper.service.ts:L29-L308`; `AuthHttpHeaderService` `auth/user-auth/services/auth-http-header.service.ts:L87-L397`; `DEFAULT_AUTH_HTTP_HEADER_SERVICE` `:L55-L71`; `DELEGATED_AUTH_HTTP_HEADER_SERVICE` `:L79-L82`; `EXPIRED_REFRESH_TOKEN_HANDLERS` `auth/user-auth/services/auth-http-header-handler.ts:L21-L23`
- `AuthRedirectService` `auth/user-auth/services/auth-redirect.service.ts:L24-L162`; `AuthRedirectStorageService` `auth/user-auth/services/auth-redirect-storage.service.ts:L14-L45`; `AuthStatePersistenceService` `auth/user-auth/services/auth-state-persistence.service.ts:L28-L126`; `AuthMultisiteIsolationService` `auth/user-auth/services/auth-multisite-isolation.service.ts:L12-L50`
- `AuthInterceptor` `auth/user-auth/http-interceptors/auth.interceptor.ts:L24-L111`; `TokenRevocationInterceptor` `auth/user-auth/http-interceptors/token-revocation.interceptor.ts:L22-L59`
- `AuthGuard` `auth/user-auth/guards/auth.guard.ts:L19-L43`; `NotAuthGuard` `auth/user-auth/guards/not-auth.guard.ts:L18-L41`
- `LoginEvent` `auth/user-auth/events/user-auth.events.ts:L28-L33`; `LogoutEvent` `:L15-L20`
- `ClientTokenService` `auth/client-auth/services/client-token.service.ts:L21-L69`; `ClientTokenInterceptor` `auth/client-auth/http-interceptors/client-token.interceptor.ts:L31-L112`
- `FederatedLoginModule` `federated-login/federated-login.module.ts:L14-L17`; `FederatedLoginService` `federated-login/services/federated-login.service.ts:L16-L106`

### product
- `ProductModule` `product/product.module.ts:L39-L49`; `ProductStoreModule` `product/store/product-store.module.ts:L32-L43`
- `ProductService` `product/facade/product.service.ts:L17-L89`; `ProductSearchService` `product/facade/product-search.service.ts:L16-L43`; `SearchboxService` `product/facade/searchbox.service.ts:L16-L100`; `ProductReviewService` `product/facade/product-review.service.ts:L16-L44`; `ProductReferenceService` `product/facade/product-reference.service.ts:L15-L52`
- `ProductLoadingService` `product/services/product-loading.service.ts:L33-L243`; `ProductScope` `product/model/product-scope.ts:L7-L21`; `ScopedProductData` `product/connectors/product/scoped-product-data.ts:L13-L15`
- `ProductAdapter` `product/connectors/product/product.adapter.ts:L11-L30`; `ProductConnector` `product/connectors/product/product.connector.ts:L13-L33`; `ProductSearchConnector` `product/connectors/search/product-search.connector.ts:L17-L48`; `PRODUCT_NORMALIZER` `product/connectors/product/converters.ts:L11-L11`+
- SEO prodotto: `ProductPageMetaResolver` `product/services/product-page-meta.resolver.ts:L37-L210`; `CategoryPageMetaResolver` `product/services/category-page-meta.resolver.ts:L33-L143`; `SearchPageMetaResolver` `product/services/search-page-meta.resolver.ts:L28-L88`

### user / anonymous-consents / cost-center / checkout
- `UserModule` `user/user.module.ts:L14-L27`; `UserStoreModule` `user/store/user-store.module.ts:L17-L27`; `UserAddressService` `user/facade/user-address.service.ts:L30-L319`; `UserConsentService` `user/facade/user-consent.service.ts:L37-L308`; `ADDRESS_NORMALIZER` `user/connectors/address/converters.ts:L12-L12`+
- `AnonymousConsentsModule` `anonymous-consents/anonymous-consents.module.ts:L14-L28`; `AnonymousConsentsService` `anonymous-consents/facade/anonymous-consents.service.ts:L21-L377`; `AnonymousConsentsInterceptor` `anonymous-consents/http-interceptors/anonymous-consents-interceptor.ts:L27-L136`
- `CostCenterModule` `cost-center/cost-center.module.ts:L9-L17`; `COST_CENTER_NORMALIZER` `cost-center/connectors/cost-center/converters.ts:L12-L12`+
- `POINT_OF_SERVICE_NORMALIZER` `checkout/connectors/checkout/converters.ts:L11-L11`+; `PAYMENT_DETAILS_NORMALIZER` `checkout/connectors/payment/converters.ts:L11-L11`+

### i18n
- `I18nModule` `i18n/i18n.module.ts:L36-L57`; `I18nConfig` `i18n/config/i18n-config.ts:L14-L92`
- `TranslationService` (abstract) `i18n/translation.service.ts:L9-L35`; `I18nextTranslationService` `i18n/i18next/i18next-translation.service.ts:L16-L124`; `TranslationChunkService` `i18n/translation-chunk.service.ts:L11-L66`; `TranslatePipe` `i18n/translate.pipe.ts:L25-L96`
- `I18NEXT_INSTANCE` `i18n/i18next/i18next-instance.ts:L19-L22`; `I18NEXT_HTTP_BACKEND_CLIENT` `i18n/i18next/i18next-backend/i18next-http-backend-client.ts:L16-L44`; `I18NEXT_LOGGER_PLUGIN` `i18n/i18next/i18next-plugins/i18next-logger-plugin.ts:L17-L40`
- `I18nTestingModule` `i18n/testing/i18n-testing.module.ts:L13-L20`

(`+` = solo riga di apertura del token verificata; la chiusura è 1-3 righe dopo.)

## 5. Assegnazione cartella → tema/capitolo

| cartella | tema | note |
|---|---|---|
| `base-core.module.ts` | bootstrap | ordine di import dei `.forRoot()` (commenti su ErrorHandling e SiteContext) |
| `config/` | config | Config/RootConfig/DefaultConfig, chunk, provide*, deepMerge |
| `config/config-initializer/` | config | CONFIG_INITIALIZER, init asincrona (collega a site-context config-loader) |
| `config/config-validator/` | config | validazione config in dev |
| `config/services/` | config / lazy-loading | ConfigurationService ricalcola config con chunk lazy |
| `features-config/` (escl. feature-toggles) | feature-toggle | FeaturesConfig level, direttive *cxFeature |
| `features-config/feature-toggles/` | feature-toggle | token Default/Root FeatureToggles, provideFeatureToggles |
| `lazy-loading/` | feature-modules/lazy | LazyModulesService, FeatureModulesService, UnifiedInjector, MODULE_INITIALIZER |
| `lazy-loading/facade-factory/` | facade/command-query | facadeFactory = facade proxy verso feature lazy |
| `state/` | state(ngrx/loader/process/entity) | StateModule, StateConfig, persistence |
| `state/reducers/` | ssr/transfer-state | meta-reducer TransferState server/browser |
| `state/utils/` | state(ngrx/loader/process/entity) | loader/entity/processes reducer & azioni |
| `state/event/` | events | StateEventService azioni→eventi |
| `process/` | process | feature `process` per stato chiamate per id |
| `event/` | events | EventService, CxEvent |
| `util/command-query/` | facade/command-query | CommandService, QueryService |
| `util/converter.service.ts`, `util/applicable.ts` | occ (adapter/connector/converter/endpoint) | ConverterService + Applicable usati da converter/resolver |
| `util/ssr.tokens.ts` | ssr/transfer-state | SERVER_REQUEST_URL/ORIGIN |
| `util/` (resto, `rxjs/`, `java-reg-exp-converter/`, `browser-tab-notification/`) | util | helper trasversali |
| `window/` | window/platform | WindowRef |
| `logger/` | logger | LoggerService + testing |
| `error-handling/` | error-handling | CxErrorHandler, MULTI_ERROR_HANDLER |
| `error-handling/http-error-handler/` | error-handling | interceptor errori HTTP → ErrorHandler |
| `error-handling/effects-error-handler/` | error-handling / state | errori da effects NgRx |
| `global-message/` | global-message/http-errors | GlobalMessageService, store |
| `global-message/http-interceptors/` | global-message/http-errors | HttpErrorInterceptor + handlers per status |
| `http/` | misc (http) / error-handling | HttpTimeoutInterceptor |
| `site-context/` | site-context | Language/Currency, URL serializer, providers, store |
| `site-context/facade/base-site.service.ts` | base-site | BaseSiteService |
| `site-context/config/config-loader/` | base-site / config | `site-context-config-initializer.ts` (CONFIG_INITIALIZER per contesto sito da base site) |
| `site-theme/` | site-context | tema per sito come contesto aggiuntivo |
| `routing/` (facade, store, models) | routing | RoutingService, router-store, CustomSerializer |
| `routing/configurable-routes/` | routing | RoutingConfig, URL semantici, UrlPipe |
| `routing/external-routes/`, `protected-routes/`, `url-matcher/`, `services/`, `location-initialized-multi/` | routing | guard e matcher |
| `cms/` (facade, store, connectors, config, model) | cms | CmsService, dati pagina/componenti |
| `cms/decorators/` | cms / outlet/layout | decorator componenti/slot |
| `cms/page/` | seo/meta | PageMetaResolver & co. |
| `cms/facade/page-meta.service.ts` | seo/meta | PageMetaService |
| `occ/` (config, services, occ-models, utils, interceptors) | occ (adapter/connector/converter/endpoint) | OccConfig, OccEndpointsService, OCC_HTTP_TOKEN |
| `occ/config/meta-tag-config.module.ts` | config / ssr | config da meta tag |
| `occ/adapters/*` | occ | adapter per dominio (assegnabili anche al capitolo del dominio) |
| `*/connectors/` (ogni dominio) | occ | pattern adapter/connector/converter token |
| `auth/user-auth/` | auth | OAuth, interceptor, guard, storage |
| `auth/client-auth/` | auth | client token |
| `federated-login/` | auth | login federato |
| `user/` | user | address, consent, coupon, interests, notifications, payment |
| `anonymous-consents/` | anonymous-consents | facade+store+interceptor |
| `product/` (facade, store, connectors, services) | product | ProductService, scopes, loading |
| `product/facade/product-search.service.ts`, `searchbox.service.ts`, `connectors/search/` | search | ricerca prodotti e suggerimenti |
| `product/services/*-page-meta.resolver.ts` | seo/meta | resolver meta pagine prodotto/categoria/ricerca |
| `product/event/`, `user/events/`, `site-context/events/`, `auth/user-auth/events/` | events | event builder di dominio |
| `i18n/` | i18n | TranslationService, i18next, pipe date/numeric |
| `model/` | misc | modelli di dominio condivisi (augmentabili, vedi public_api) |
| `checkout/`, `cost-center/` | misc | solo converter token/moduli residui condivisi con feature-libs |
| `test.ts` | misc | non API |

Note per i capitoli:
- outlet/layout non ha cartella dedicata in core (vive in `core-libs/storefront`); in core solo `cms/decorators/`.
- ssr/transfer-state: materiale distribuito tra `state/reducers/`, `state/config/state-config.ts` (`StateTransferType`), `util/ssr.tokens.ts`, `window/`; il resto è in `core-libs/setup/ssr`.
- bootstrap: `base-core.module.ts` + `config-initializer` + `site-context/providers/context-initializer-providers.ts`.
