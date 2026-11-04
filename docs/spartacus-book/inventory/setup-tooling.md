# Inventario — setup, SSR, schematics, assets, skills, demo app e tooling

> SHA `5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`. Conteggi file = file non-spec (`*.spec.ts` / `*_spec.ts` esclusi), ottenuti con `find` sul working tree; includono json/md/scss/snapshot non-spec.
> ⚠️ Versioni: la root `package.json` dichiara `2612.0.0` (`package.json:L3-L3`), ma i pacchetti pubblicati di quest'ambito dichiarano `221121.22.0` (`core-libs/setup/package.json:L3-L3`, `core-libs/schematics/package.json:L3-L3`, `core-libs/assets/package.json:L3-L3`, `core-libs/skills/package.json:L3-L3`). Il testo del libro deve tenerne conto.

---

## 1. Librerie e progetti

### 1.1 `@spartacus/setup` (`core-libs/setup`, 66 file)

| Voce | Valore |
|---|---|
| Entry point principale | `core-libs/setup/ng-package.json:L1-L7` → `public_api.ts`, dest `dist/setup` |
| `public_api` | `core-libs/setup/public_api.ts:L7-L7` → `export * from './recipes/index'` |
| Secondary entry `@spartacus/setup/ssr` | `core-libs/setup/ssr/ng-package.json:L1-L6` → `core-libs/setup/ssr/public_api.ts:L7-L16` |
| Peer deps | `@angular/core`, `@angular/ssr`, `@spartacus/cart`, `@spartacus/core`, `@spartacus/order`, `@spartacus/user` (`core-libs/setup/package.json:L21-L28`) |
| Optional deps | `@angular/platform-server`, `express ^5.3.0` (`core-libs/setup/package.json:L29-L32`) |
| Build | executor `@angular-devkit/build-angular:ng-packagr` (`core-libs/setup/project.json:L9-L12`) |
| Test | Jest (`jest-preset-angular`), target `test-jest` (`core-libs/setup/project.json:L20-L26`, `core-libs/setup/jest.config.js:L7-L7`) |

Albero:

```
core-libs/setup/                 66
├── recipes/                      4   ricette di configurazione (solo B2B)
│   └── b2b/config/               2   defaultB2bOccConfig
└── ssr/                         50   entry point @spartacus/setup/ssr
    ├── engine/                   3   ngExpressEngine + CxCommonEngine (wrapper di CommonEngine)
    ├── engine-decorator/         2   NgExpressEngineDecorator / decorateExpressEngine
    ├── optimized-engine/        12   OptimizedSsrEngine, opzioni, strategy resolver, request context
    │   └── rendering-cache/      5   RenderingCache, size manager/calculator
    ├── error-handling/           7   PROPAGATE_ERROR_TO_SERVER, error handler multi, express handlers
    ├── express-utils/            3   origin/url della request, origin validation middleware
    ├── logger/                  13   ExpressServerLogger, DefaultExpressServerLogger, W3C traceparent
    │   ├── loggers/              7
    │   └── services/             4   ExpressLoggerService, PrerenderingLoggerService
    ├── providers/                5   provideServer, getServerRequestProviders
    ├── testing/                  2   TestConfigServerModule (solo e2e)
    └── tokens/                   1   REQUEST / RESPONSE
```

Simboli chiave:

| Simbolo | Riferimento |
|---|---|
| `defaultB2bOccConfig` | `core-libs/setup/recipes/b2b/config/default-b2b-occ-config.ts:L38-L49` |
| `ngExpressEngine` | `core-libs/setup/ssr/engine/ng-express-engine.ts:L82-L128` |
| `CxCommonEngine` | `core-libs/setup/ssr/engine/cx-common-engine.ts:L20-L67` |
| `NgExpressEngineDecorator.get` | `core-libs/setup/ssr/engine-decorator/ng-express-engine-decorator.ts:L36-L49` |
| `decorateExpressEngine` | `core-libs/setup/ssr/engine-decorator/ng-express-engine-decorator.ts:L51-L74` |
| `OptimizedSsrEngine` | `core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts:L37-L475` |
| `SsrOptimizationOptions` | `core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts:L18-L181` |
| `RenderingStrategy` (enum) | `core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts:L183-L187` |
| `defaultSsrOptimizationOptions` | `core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts:L220-L237` |
| `defaultRenderingStrategyResolver` | `core-libs/setup/ssr/optimized-engine/rendering-strategy-resolver.ts:L62-L72` |
| `RenderingCache` | `core-libs/setup/ssr/optimized-engine/rendering-cache/rendering-cache.ts:L11-L128` |
| `provideServer` | `core-libs/setup/ssr/providers/ssr-providers.ts:L27-L47` |
| `getServerRequestProviders` | `core-libs/setup/ssr/providers/ssr-providers.ts:L53-L66` |
| `REQUEST` / `RESPONSE` | `core-libs/setup/ssr/tokens/express.tokens.ts:L15-L17`, `:L24-L26` |
| `EXPRESS_SERVER_LOGGER` | `core-libs/setup/ssr/logger/loggers/express-server-logger.ts:L46-L48` |
| `DefaultExpressServerLogger` | `core-libs/setup/ssr/logger/loggers/default-express-server-logger.ts:L28-L133` |
| `ExpressLoggerService` | `core-libs/setup/ssr/logger/services/express-logger.service.ts:L25-L62` |
| `PropagatingToServerErrorHandler` | `core-libs/setup/ssr/error-handling/multi-error-handlers/propagating-to-server-error-handler.ts:L29-L38` |
| `defaultExpressErrorHandlers` | `core-libs/setup/ssr/error-handling/express-error-handlers/express-error-handlers.ts:L21-L32` |
| `getOriginValidationMiddleware` | `core-libs/setup/ssr/express-utils/express-origin-validation-middleware.ts:L51-L67` |
| `TestConfigServerModule` | `core-libs/setup/ssr/testing/test-config-server.module.ts:L37-L58` |

### 1.2 `@spartacus/schematics` (`core-libs/schematics`, src 293 file)

| Voce | Valore |
|---|---|
| Entry point | `main: index.js` (`core-libs/schematics/package.json:L12-L12`), compilato con `tsc -p tsconfig.schematics.json` (`core-libs/schematics/package.json:L14-L14`) — **non** ng-packagr |
| "public_api" | `core-libs/schematics/index.ts:L12-L13` (esporta `SpartacusOptions` + `src/shared/index`; commento L7-L11: utility per gli schematics delle altre lib, non API pubblica stabile) |
| Peer deps | `@angular-devkit/core`, `@angular-devkit/schematics`, `@angular/compiler`, `@schematics/angular`, `jsonc-parser`, `parse5`, `typescript` (`core-libs/schematics/package.json:L25-L33`) |
| Deps | `@angular/pwa`, `@angular/ssr`, `semver`, `ts-morph`, `tslib` (`core-libs/schematics/package.json:L18-L24`) |
| `ng-add` / `ng-update` | `core-libs/schematics/package.json:L42-L47` (`ng-update.migrations` → `./src/migrations/migrations.json`, `packageGroup` di tutte le lib) |
| Test | Jest, target `test-jest` (`core-libs/schematics/project.json:L14-L20`) |
| Pre-build | `copy-feature-toggles.js` copia `feature-toggles.ts` da core in `src/feature-toggles.copied-from-core-lib.ts` (`core-libs/schematics/copy-feature-toggles.js:L5-L10`), file git-ignored (`core-libs/schematics/.gitignore:L22-L22`) |

Albero (`src/`):

```
src/                                             293
├── collection.json                                  registro schematics
├── dependencies.json                                versioni deps (generato, vedi §5)
├── ng-add/                                       2  ng-add → add-spartacus (+ add-ssr)
├── add-spartacus/                               19  installazione e scaffolding app
├── add-ssr/                                     14  setup SSR (server.ts, app.config.server)
├── add-cms-component/                            4  generatore componente CMS
├── wrapper-module/                               4  generatore wrapper module di feature
├── ai-context/                                   3  copia skill AI (.claude/.agents)
├── migrations/                                  85  ng update (incl. migrations/test)
│   ├── migrations.json
│   ├── mechanism/                                9  motori generici di migrazione
│   ├── 2211_19/ 2211_36/ 221121_7/          16/6/20  migrazioni per versione
│   ├── add-or-update-ai-skills/                  2
│   └── test/                                        dati/fixture di test dei meccanismi
├── modernize-app-migrated-from-6_8-to-2211_19/  32  schematic manuale (+fixture)
├── modernize-app-migrated-from-2211_32-to-2211_36/ 30
├── modernize-app-to-standalone-bootstrap-application/ 27
└── shared/                                      70  utils condivise con le altre lib
    ├── lib-configs/                             35  SchematicConfig per feature (+integration-libs/ 14)
    └── utils/                                   31  ts-morph/AST/workspace/package helpers
```

### 1.3 `@spartacus/assets` (`core-libs/assets`, 233 file)

| Voce | Valore |
|---|---|
| Entry point | `core-libs/assets/ng-package.json:L1-L7` → `src/public_api.ts`, dest `dist/assets` |
| `public_api` | `core-libs/assets/src/public_api.ts` (righe 7-8: `translation-chunks-config`, `translations`) |
| Peer deps | nessuna (solo `tslib`, `core-libs/assets/package.json:L12-L14`) |
| Build | `nx build assets` + `generate:translations:ts-2-json` (`core-libs/assets/package.json:L7-L7`) |

```
core-libs/assets/                      233
├── generate-translations-*.ts          3  conversioni ts⇄json⇄properties
└── src/translations/                 223
    ├── translations.ts                    translationChunksConfig (L7-L66)
    ├── translation-chunks-config.ts       interfaccia TranslationChunksConfig
    └── <17 lingue>/                   13 ciascuna: 12 chunk *.json + index.ts
```

- `translationChunksConfig`: `core-libs/assets/src/translations/translations.ts:L7-L66`.
- Le risorse sono JSON importati da `index.ts`, es. `core-libs/assets/src/translations/en/index.ts:L7-L32`.
- `generate-translations-ts-2-json.ts` scrive in `dist/assets/i18n-assets/<lang>/` (`core-libs/assets/generate-translations-ts-2-json.ts:L10-L18`).
- Lingue: cs, de, en, es, es_CO, fr, hi, hu, id, it, ja, ko, pl, pt, ru, zh, zh_TW.

### 1.4 `@spartacus/skills` (`core-libs/skills`, 25 file)

- Nessun codice né build: `targets: {}` (`core-libs/skills/project.json:L1-L7`); pacchetto npm con un'unica skill `spartacus-developer` (`core-libs/skills/README.md:L1-L7`).
- `skills/spartacus-developer/SKILL.md` + `references/` (20 file `.md`: backend-communication, cms-component-wiring, ssr-safety, state-management, …).
- Viene copiata nei progetti dallo schematic `ai-context` (`core-libs/schematics/src/ai-context/index.ts:L41-L78`) e dalla migrazione `add-or-update-ai-skills` (`core-libs/schematics/src/migrations/add-or-update-ai-skills/index.ts:L32-L86`).

### 1.5 `projects/storefrontapp` (app demo, 144 file)

```
projects/storefrontapp/                144
├── esbuild/plugins.ts                  1  inietta CX_* come buildProcess.env
├── public/                            19  icone, splash
└── src/                              117
    ├── main.ts / main.server.ts / server.ts
    ├── app/                           68
    │   ├── app.config(.server).ts, app.module(.server).ts, app.component.ts
    │   ├── private/                    1  privateProviders (solo test interni)
    │   └── spartacus/                 62  SpartacusModule, features/ (33 cartelle/file di feature)
    ├── environments/                   5  environment(.prod).ts + models/
    ├── styles/                        24
    └── test-outlets/                  11  outlet di test e2e
```

### 1.6 `projects/ssr-tests` (13 file)

- Jest con `globalSetup: ./validate-ssr-build.ts` e `testEnvironment` custom (`projects/ssr-tests/jest.config.js:L25-L26`).
- Unico spec `src/ssr-testing.spec.ts` (`describe('SSR E2E')` a L10).
- Utils: `startSsrServer`/`killSsrServer` (`projects/ssr-tests/src/utils/ssr.utils.ts:L47-L47`, `:L67-L67`), `startBackendProxyServer` (`projects/ssr-tests/src/utils/proxy.utils.ts:L58-L58`), `sendRequestToSsrServer` (`projects/ssr-tests/src/utils/http.utils.ts:L42-L42`), helper dei log (`projects/ssr-tests/src/utils/log.utils.ts:L23-L86`).
- Avvio: `npm run test:ssr` → `env-cmd -e dev -- nx test ssr-tests` (`package.json:L156-L156`).

### 1.7 `projects/storefrontapp-e2e-cypress` (solo struttura)

`cypress/` 543 file: `e2e/` 287 (a11y 60, b2b 46, regression 126, ssr 2, vendor 53), `helpers/` 187, `support/` 39, `sample-data/` 20, `fixtures/` 6, `plugins/` 2. Config: `cypress.config.ts`, `cypress.config.ci.ts`, `cypress-jdk21-asm.config.ci.ts`. Script `cy:*` in `projects/storefrontapp-e2e-cypress/package.json:L9-L12+`, richiamati dagli `e2e:*` della root (`package.json:L65-L124`).

---

## 2. Schematics

### 2.1 `collection.json` (`core-libs/schematics/src/collection.json`)

| Schematic | Factory | Alias |
|---|---|---|
| `ng-add` (private/hidden) | `./ng-add/index` (default export) | `install` |
| `add-spartacus` | `./add-spartacus/index#addSpartacus` | `spa` |
| `add-ssr` | `./add-ssr/index#addSSR` | `ssr` |
| `add-cms-component` | `./add-cms-component/index#addCmsComponent` | `cms` |
| `wrapper-module` | `./wrapper-module/index#generateWrapperModule` | `wrapper` |
| `ai-context` | `./ai-context/index#addAiContextSchematic` | `ai` |
| `modernize-app-migrated-from-6_8-to-2211_19` | `…/index#migrate` | — |
| `modernize-app-migrated-from-2211_32-to-2211_36` | `…/index#migrate` | — |
| `modernize-app-to-standalone-bootstrap-application` | `…/index#migrate` | — |

### 2.2 ng-add / add-spartacus / add-ssr

- `ng-add` = `chain([schematic('add-spartacus'), options.ssr ? schematic('add-ssr') : noop()])` — `core-libs/schematics/src/ng-add/index.ts:L17-L24`.
- `addSpartacus` — `core-libs/schematics/src/add-spartacus/index.ts:L531-L592`: rileva la struttura app, crea/aggiorna app module/app config, store modules, `SpartacusModule`, `SpartacusFeaturesModule`, configurazione, feature toggles, stili, budget, feature scelte (`addFeatures`), AI context, dipendenze package.json + installazione, `finalizeInstallation`.
  - `setupSpartacusModule` `core-libs/schematics/src/add-spartacus/spartacus.ts:L27-L51`
  - `setupSpartacusFeaturesModule` `core-libs/schematics/src/add-spartacus/spartacus-features.ts:L25-L49`
  - `addSpartacusConfiguration` `core-libs/schematics/src/add-spartacus/configuration.ts:L35-L35`; `addFeatureToggles` `core-libs/schematics/src/add-spartacus/spartacus-feature-toggles.ts:L26-L26`
  - `updateAppConfig` / `createAppModule` / `updateAppModule`: `update-app-config.ts:L19-L19`, `create-app-module.ts:L22-L22`, `update-app-module.ts:L33-L33` (cartella `add-spartacus/`).
- `addSSR` — `core-libs/schematics/src/add-ssr/index.ts:L437-L465`; helper `updateAppConfigServer` (`add-ssr/update-app-config-server.ts:L22-L22`), `createAppServerModule` (`add-ssr/create-app-server-module.ts:L22-L22`), template in `add-ssr/files/`.
- `generateWrapperModule` — `core-libs/schematics/src/wrapper-module/index.ts:L527-L541`.

### 2.3 `migrations.json` (`core-libs/schematics/src/migrations/migrations.json`)

25 voci ordinate per prefisso numerico all'interno di ogni `version`:

| Versione | Migrazioni (cartella) |
|---|---|
| `2211.19.0` | ssr, config-deprecations, constructor-deprecations, css, dependency-management, methods-and-properties-deprecations, missing-packages, removed-public-api-deprecations, rename-symbol, angular-json-styles |
| `2211.36.0` | dependency-management, ssr (server.ts → `dist/server/index.server.ts`), bootstrap (import path), silence-sass-deprecations |
| `221121.7.0` | angular-config, angular-providers (`provideBrowserGlobalErrorListeners`), ssr/express-v5, tsconfig-update, move-zone-change-detection-to-main, ssr/build-ssr-script, constructor-/methods-and-properties-/removed-public-api-deprecations, rename-symbol |
| `221121.22.0` | add-or-update-ai-skills |

### 2.4 Struttura delle migrazioni

Schema a tre livelli: **mechanism** (motore generico) ← **wrapper per versione** (`<ver>/<tipo>/<tipo>.ts`, esporta `migrate()`) ← **data** (`<ver>/<tipo>/data/generated-*.migration.ts`). Esempio: `core-libs/schematics/src/migrations/221121_7/constructor-deprecations/constructor-deprecations.ts:L7-L19` importa `migrateConstructorDeprecation` e `GENERATED_CONSTRUCTOR_MIGRATIONS`.

| Mechanism | Riferimento |
|---|---|
| `migrateConstructorDeprecation` | `core-libs/schematics/src/migrations/mechanism/constructor-deprecations/constructor-deprecations.ts:L22-L79` |
| `migrateMethodPropertiesDeprecation` | `core-libs/schematics/src/migrations/mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations.ts:L20-L48` |
| `removedPublicApiDeprecation` | `core-libs/schematics/src/migrations/mechanism/removed-public-api-deprecations/removed-public-api-deprecation.ts:L19-L49` |
| `migrateRenamedSymbols` | `core-libs/schematics/src/migrations/mechanism/rename-symbol/rename-symbol.ts:L14-L85` |
| `migrateConfigDeprecation` | `core-libs/schematics/src/migrations/mechanism/config-deprecations/config-deprecation.ts:L17-L39` |
| `migrateComponentMigration` | `core-libs/schematics/src/migrations/mechanism/component-deprecations/component-deprecations.ts:L27-L69` |
| `migrateDependencies` | `core-libs/schematics/src/migrations/mechanism/dependency-management/dependency-management.ts:L28-L55` |
| `migrateMissingPackage` | `core-libs/schematics/src/migrations/mechanism/missing-packages/missing-packages.ts:L18-L67` |

### 2.5 Deprecation data

- File generati: `2211_19/*/data/` (constructor 1861 righe, methods-and-properties 364, removed-public-api 24, rename-symbols 52) e `221121_7/*/data/` (191, 350, 306, 17) — conteggi `wc -l`.
- Generati da `tools/breaking-changes/generate-*.ts`; output in `${MIGRATION_SCHEMATICS_HOME}/constructor-deprecations/data/generated-constructor.migration.ts` (`tools/breaking-changes/generate-constructors.ts:L34-L34`), con `MIGRATION_SCHEMATICS_HOME = ../../core-libs/schematics/src/migrations/${NEW_VERSION}` e `NEW_VERSION = '221121_7'` (`tools/breaking-changes/common.ts:L12-L18`).
- `migrations/test/*/data/` contiene dati di esempio per i test dei mechanism (es. `migrations/test/migrations-test.json`).

### 2.6 Shared utils (`src/shared`)

- `src/shared/index.ts` riesporta `constants`, `lib-configs`, `libs-constants`, `utils` (righe 7-10).
- `lib-utils.ts`: `SchematicConfig` (`core-libs/schematics/src/shared/utils/lib-utils.ts:L115-L199`), `addLibraryFeature` (`:L239-L273`), `finalizeInstallation` (`:L897-L909`).
- `lib-configs/*-schematics-config.ts`: un `SchematicConfig` per feature lib (asm, cart, checkout, order, organization, product, …) + `integration-libs/`.
- `libs-constants.ts` (434 righe), `schematics-config-mappings.ts` (399), `constants.ts` (es. `DEFAULT_B2B_OCC_CONFIG`, `core-libs/schematics/src/shared/constants.ts:L94-L94`).
- utils: `config-utils`, `dependency-utils`, `feature-utils`, `file-utils`, `graph-utils` (ordinamento cross-feature), `import-utils`, `module-file-utils`, `new-module-utils`, `package-utils`, `program`, `styling-utils`, `transform-utils`, `workspace-utils`, `test-utils`.

---

## 3. Setup e SSR

### 3.1 provideSpartacus / recipes

- **Non esiste** `provideSpartacus` nel codice (grep su `core-libs/` e `projects/`: nessun risultato). L'app demo e lo scaffolding usano `NgModule` (`SpartacusModule`) importati con `importProvidersFrom` (§4).
- L'unica "recipe" è `defaultB2bOccConfig` (`core-libs/setup/recipes/b2b/config/default-b2b-occ-config.ts:L38-L49`), usata in `projects/storefrontapp/src/app/spartacus/spartacus-b2b-configuration.providers.ts:L10-L20` e iniettata dagli schematics (`core-libs/schematics/src/shared/utils/config-utils.ts:L133-L136`).

### 3.2 Pipeline SSR

1. `server.ts` crea l'engine: `NgExpressEngineDecorator.get(engine, ssrOptions)` (`projects/storefrontapp/src/server.ts:L22-L29`).
2. `decorateExpressEngine` aggiunge `getServerRequestProviders()` e, se ci sono opzioni, avvolge l'istanza in `new OptimizedSsrEngine(...).engineInstance` (`core-libs/setup/ssr/engine-decorator/ng-express-engine-decorator.ts:L51-L74`).
3. `ngExpressEngine` crea un `CxCommonEngine` e per ogni render calcola `url`, `documentFilePath`, provider `REQUEST/RESPONSE`, `publicPath`, poi `engine.render()` (`core-libs/setup/ssr/engine/ng-express-engine.ts:L82-L128`).
4. `OptimizedSsrEngine`: metodi `getRenderingStrategy` (L118), `shouldRender` (L133), concorrenza (L166), `shouldTimeout`/`getTimeout` (L187/L200), `returnCachedRender` (L212), `renderResponse` (L240), `fallbackToCsr` (L103), `handleRender`/`startRender` (L329/L389) in `core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts`.
5. Default: `cache: false`, `concurrency: 10`, `timeout: 3_000`, `forcedSsrTimeout: 60_000`, `maxRenderTime: 300_000`, `reuseCurrentRendering: true` (`core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts:L220-L237`).
6. Lato app: `provideServer()` registra `SERVER_REQUEST_ORIGIN`, `SERVER_REQUEST_URL`, `LoggerService` server e `PropagatingToServerErrorHandler` come `MULTI_ERROR_HANDLER` (`core-libs/setup/ssr/providers/ssr-providers.ts:L27-L47`); errori finali → `defaultExpressErrorHandlers` (404 per `CmsPageNotFoundOutboundHttpError`, altrimenti 500; `core-libs/setup/ssr/error-handling/express-error-handlers/express-error-handlers.ts:L21-L32`).

---

## 4. App demo

| File | Ruolo | Riferimento |
|---|---|---|
| `src/main.ts` | `bootstrapApplication(AppComponent, appConfig)` | `projects/storefrontapp/src/main.ts:L7-L23` |
| `src/main.server.ts` | `bootstrap(context)` con `config` server | `projects/storefrontapp/src/main.server.ts:L7-L26` |
| `src/server.ts` | Express app, engine decorato, origin middleware, static, error handlers | `projects/storefrontapp/src/server.ts:L22-L97` |
| `app/app.config.ts` | `provideHttpClient(withFetch(), withInterceptorsFromDi())`, `provideClientHydration(withEventReplay(), withNoHttpTransferCache())`, `provideZoneChangeDetection`, `importProvidersFrom(AppModule)` | `projects/storefrontapp/src/app/app.config.ts:L26-L35` |
| `app/app.config.server.ts` | `provideServerRendering()`, `AppServerModule`, `TestConfigServerModule.forRoot()` + `mergeApplicationConfig` | `projects/storefrontapp/src/app/app.config.server.ts:L17-L30` |
| `app/app.module.ts` | `BrowserModule`, `StoreModule.forRoot({})`, `AppRoutingModule`, `EffectsModule.forRoot([])`, `SpartacusModule`, `privateProviders` | `projects/storefrontapp/src/app/app.module.ts:L15-L25` |
| `app/app.module.server.ts` | `provideServer({ serverRequestOrigin })` | `projects/storefrontapp/src/app/app.module.server.ts:L10-L17` |
| `app/app.component.ts` | template `<cx-storefront />` | `projects/storefrontapp/src/app/app.component.ts:L14-L19` |
| `spartacus/spartacus.module.ts` | `BaseStorefrontModule` + Features + Configuration | `projects/storefrontapp/src/app/spartacus/spartacus.module.ts:L12-L20` |
| `spartacus/spartacus-configuration.module.ts` | layout/media/CMS config, i18n statico (en/ja/de/zh), B2B vs B2C | `projects/storefrontapp/src/app/spartacus/spartacus-configuration.module.ts:L40-L72` |
| `spartacus/spartacus-features.module.ts` | moduli core/UI eager + feature module per lib + feature toggles | `projects/storefrontapp/src/app/spartacus/spartacus-features.module.ts:L115-L411` |
| `private/private.providers.ts` | backend OCC da environment, routing e2e, `TestConfigModule`, devtools | `projects/storefrontapp/src/app/private/private.providers.ts:L19-L40` |

**Caricamento feature**: `spartacus-features.module.ts` importa moduli eager (auth, CMS base, user, product, anonymous consents) e un `*FeatureModule` per ogni lib (`L176-L286`); le feature opzionali sono aggiunte a `featureModules` in base ai flag `environment.*` (`L115-L175`). Ogni `*FeatureModule` importa il modulo `root` e dichiara il lazy loading via `provideConfig({ featureModules: { [KEY]: { module: () => import(...) } } })`, es. `projects/storefrontapp/src/app/spartacus/features/cart/cart-base-feature.module.ts:L23-L55`. Feature toggle dell'app: `provideFeatureTogglesFactory` (`spartacus-features.module.ts:L297-L302+`).

**Environments**: `environment.ts` legge i flag da `buildProcess.env.CX_*` (`projects/storefrontapp/src/environments/environment.ts:L22-L44`); il plugin esbuild definisce `buildProcess.env` dalle variabili `CX_*` (`projects/storefrontapp/esbuild/plugins.ts:L10-L31`); i valori arrivano da `.env-cmdrc` tramite `env-cmd -e dev,b2c,$SPA_ENV` (`package.json:L16-L16`). Interfaccia: `projects/storefrontapp/src/environments/models/environment.model.ts:L7-L18+`.

**Build app**: executor `@angular-builders/custom-esbuild:application`, `browser: src/main.ts`, `server: src/main.server.ts`, `ssr.entry: src/server.ts` (`projects/storefrontapp/project.json:L10-L24`, `:L142-L146`); target extra `build-csr` (L190), `prerender` (L202), `serve` (L218), `test` karma (L230-L235).

---

## 5. Tooling del monorepo

| Area | Dettaglio | Riferimento |
|---|---|---|
| Workspaces | `feature-libs/*`, `integration-libs/*`, `core-libs/*` | `package.json:L6-L10` |
| Nx | `targetDefaults` (build con `dependsOn: ["^build"]`, cache su build/lint/test/e2e), `useInferencePlugins: false` | `nx.json:L1-L23` |
| Build lib | `ng-packagr` via `@angular-devkit/build-angular:ng-packagr`; `build:libs` sequenzia core → storefrontlib → schematics/user → … → setup → s4-service, preceduto da validazione JSON i18n | `package.json:L35-L35`, `core-libs/setup/project.json:L9-L12` |
| Builder custom | `augmented-types`, `declaration-merging` (fix `.d.ts` flattened) | `tools/build-lib/builders.json:L1-L14` |
| tsconfig | `tsconfig.json`: strict, `moduleResolution: bundler`, `paths` `@spartacus/*` → sorgenti (es. setup L20-L21, schematics L19); `tsconfig.base.json` estende e include `**/*.ts` | `tsconfig.json:L1-L21`, `tsconfig.base.json:L1-L4` |
| Test Karma/Jasmine | target `test` (lib residue: storefrontapp, epd-visualization, opf, punchout hanno `karma.conf.js`) | `ci-scripts/unit-tests.sh:L30-L42` |
| Test Jest | `JEST_PROJECTS=storefrontstyles,schematics,setup`, target `test-jest` | `ci-scripts/unit-tests.sh:L5-L6`, `:L44-L56` |
| Test Vitest | target `test-vitest` = `npx vitest run --config vitest.config.ts`; config con `@analogjs/vite-plugin-angular`, `nxViteTsPaths`, `jsdom`, `pool: 'forks'`, soglie coverage | `core-libs/core/project.json:L20-L26`, `core-libs/core/vitest.config.ts:L11-L60` |
| Script test | `test:libs` lancia vitest/karma per lib | `package.json:L147-L147` |
| Lint | flat config ESLint 9 (typescript-eslint, angular-eslint, `@nx/enforce-module-boundaries`, regole `@nx/workspace-*`) | `eslint.config.mjs:L1-L8`, `:L129-L129`, `:L232-L256` |
| Regole lint custom | `tools/eslint-rules/rules/*` (no-const-enum, use-provide-default-config, feature-toggles-must-be-private, …) esportate in `module.exports.rules` | `tools/eslint-rules/index.ts:L76-L101` |
| Config check | `config:check` / `config:update` → `tools/config/index.ts` (paths tsconfig, deps, lock files) | `package.json:L62-L63`, `tools/config/manage-dependencies.ts:L145-L285`, `tools/config/check-lock-files.ts:L190-L272` |
| Deps schematics | `generate:deps` → `tools/schematics/dependency-collector.ts` scrive `core-libs/schematics/src/dependencies.json` | `package.json:L64-L64`, `tools/schematics/dependency-collector.ts:L21-L21` |
| API extractor | `tools/breaking-changes`: `@microsoft/api-extractor`, pipeline extract → parse → compare → generate-* (dati migrazione) | `tools/breaking-changes/package.json:L8-L26`, `tools/breaking-changes/api-extractor.json:L48-L66`, `tsconfig.api-extractor.json` |
| i18n scripts | `scripts/i18n/` (convert ts⇄json, validate JSON) | `package.json:L35-L35` |
| CI | `.github/workflows/ci.yml` job: detect_changes, prepare_unit_shards, unit_tests (`ci-scripts/unit-tests.sh`), linting (`validate-lint.sh`), build_libs, build_apps (e2e via `e2e-cypress.sh`), ssr_tests | `.github/workflows/ci.yml:L28-L322`, `:L102-L102`, `:L117-L117`, `:L232-L298` |

Altri `ci-scripts/`: `compute-unit-shards.sh`/`shard-lib.sh` (sharding unit test), `test-distribution*.sh` ed `e2e-a11y-helpers.sh` (distribuzione e2e), `check-peer-deps.sh`, `release-packer.sh`, `release-packages-list-generator.sh`, `update-rbsc-descriptors.sh`, `validate-translations.sh`, `prepend-license.sh`, `lhci.sh`, `skill-scan/` (scansione skill AI, `scan.mjs`).

⚠️ DA VERIFICARE: `test:libs` invoca `nx test setup --code-coverage` (`package.json:L147-L147`), ma `core-libs/setup/project.json` definisce solo `build`, `test-jest`, `lint` (nessun target `test`). Possibile script obsoleto; non eseguibile qui (no `node_modules`).
⚠️ DA VERIFICARE: le regole `@nx/workspace-*` sono collegate a `tools/eslint-rules` per convenzione Nx (nessun riferimento esplicito in `eslint.config.mjs`); meccanismo non verificato sul codice di Nx.

---

## 6. Mappa tematica

| cartella | tema | note |
|---|---|---|
| `core-libs/setup/recipes` | bootstrap/setup | solo `defaultB2bOccConfig`; nessun `provideSpartacus` |
| `core-libs/setup/ssr/engine*`, `optimized-engine` | ssr-engine | cuore SSR: decorator → OptimizedSsrEngine → CxCommonEngine |
| `core-libs/setup/ssr/providers`, `tokens`, `express-utils` | ssr-engine | provider server, REQUEST/RESPONSE, origin validation |
| `core-libs/setup/ssr/logger`, `error-handling` | ssr-engine | logging strutturato + propagazione errori a Express |
| `core-libs/setup/ssr/testing` | testing | `TestConfigServerModule`, solo e2e |
| `core-libs/schematics/src/{ng-add,add-spartacus,add-ssr,wrapper-module,add-cms-component}` | schematics/migrazioni | installazione e generatori |
| `core-libs/schematics/src/migrations` | schematics/migrazioni | ng update: mechanism + per-versione + data generati |
| `core-libs/schematics/src/modernize-*` | schematics/migrazioni | schematics manuali di modernizzazione (+fixture integration-test) |
| `core-libs/schematics/src/shared` | schematics/migrazioni | API riusata dagli schematics delle feature lib |
| `core-libs/schematics/src/ai-context`, `core-libs/skills` | tooling | skill AI per progetti clienti |
| `core-libs/assets` | assets/i18n | traduzioni JSON core in 17 lingue + chunk config |
| `scripts/i18n` | assets/i18n | conversione/validazione traduzioni |
| `projects/storefrontapp` | demo-app | bootstrap standalone + NgModule Spartacus, feature via env flag |
| `projects/ssr-tests` | testing | E2E SSR su Node/Jest contro build reale |
| `projects/storefrontapp-e2e-cypress` | e2e | **escluso dall'analisi di dettaglio**: solo struttura (richiesta d'ambito); è test browser, non parte del runtime della libreria |
| `nx.json`, `package.json`, `tsconfig*.json` | tooling | workspace, script, path alias |
| `eslint.config.mjs`, `tools/eslint-rules`, `tools/stylelint-rules` | tooling | lint |
| `tools/build-lib`, `tools/config`, `tools/schematics` | tooling | builder ng-packagr custom, config check, deps |
| `tools/breaking-changes` | tooling / schematics | api-extractor → dati di deprecazione delle migrazioni |
| `ci-scripts/`, `.github/workflows` | tooling / testing | CI, sharding, release |
| `*/vitest.config.ts`, `*/karma.conf.js`, `*/jest.config.js` | testing | tre runner coesistenti (Vitest maggioritario) |
