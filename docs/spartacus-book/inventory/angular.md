# Inventario Angular (v21.2.23) per la PARTE I

> Cartografia dei file interni di Angular che implementano i meccanismi usati da Spartacus.
> Sorgenti: `/tmp/angular` @ tag `v21.2.23` (prefisso `angular:`). Spartacus: branch `claude/spartacus-book`
> (HEAD `489cc650`, discendente di `5b7a1c2b`, nessuna differenza in `core-libs/ feature-libs/ integration-libs/`).
>
> Le righe "chiave" indicano l'inizio-fine della dichiarazione (funzione/classe/metodo), ricavate con `grep -n`
> e ricerca della graffa di chiusura allo stesso livello di indentazione.
>
> **Conteggi Spartacus**: numero di file `.ts` non-spec in `core-libs feature-libs integration-libs`
> (totale 6412 file) che contengono la regex indicata (`grep -lE`). Il conteggio include commenti, schematics
> (`core-libs/schematics`) e file di test-setup: è un indicatore, non una misura esatta dell'uso a runtime.

---

## 1. Dependency Injection

| file Angular | simboli | righe chiave |
|---|---|---|
| `angular:packages/core/src/di/r3_injector.ts` | `EnvironmentInjector` (abstract) | `:L130-L189` |
| `angular:packages/core/src/di/r3_injector.ts` | `R3Injector` (classe) | `:L191-L569` |
| `angular:packages/core/src/di/r3_injector.ts` | `R3Injector.get()` | `:L323-L423` |
| `angular:packages/core/src/di/r3_injector.ts` | `resolveInjectorInitializers()` (esegue `ENVIRONMENT_INITIALIZER`) | `:L426-L455` |
| `angular:packages/core/src/di/r3_injector.ts` | `processProvider()` (gestione `multi: true` a `:L497-L522`) | `:L473-L522` |
| `angular:packages/core/src/di/r3_injector.ts` | `injectableDefInScope()` (`providedIn` root/platform/any/environment) | `:L551-L561` |
| `angular:packages/core/src/di/r3_injector.ts` | `injectableDefOrInjectorDefFactory()`, `providerToFactory()` | `:L571-L596`, `:L639-L681` |
| `angular:packages/core/src/di/injection_token.ts` | `InjectionToken<T>` (con `providedIn`/`factory`) | `:L65-L129` |
| `angular:packages/core/src/di/injector_compatibility.ts` | `injectInjectorOnly()`, `ɵɵinject`, `inject()` (overload + impl.) | `:L93-L120`, `:L132-L132`, `:L177-L297` |
| `angular:packages/core/src/render3/di.ts` | `getOrCreateInjectable()` (risoluzione element → environment) | `:L457-L494` |
| `angular:packages/core/src/render3/di.ts` | `searchTokensOnInjector()`, `getNodeInjectable()` | `:L627-L673`, `:L735-L811` |
| `angular:packages/core/src/render3/di.ts` | `NodeInjector` | `:L893-L908` |
| `angular:packages/core/src/di/interface/defs.ts` | `ɵɵInjectableDeclaration.providedIn`, `ɵɵdefineInjectable` | `:L46-L46`, `:L167-L171` |
| `angular:packages/core/src/di/provider_collection.ts` | `makeEnvironmentProviders`, `provideEnvironmentInitializer` | `:L46-L52`, `:L81-L89` |
| `angular:packages/core/src/di/provider_collection.ts` | `importProvidersFrom`, `walkProviderTree` (appiattisce NgModule → provider) | `:L144-L149`, `:L232-L363` |
| `angular:packages/core/src/di/initializer_token.ts` | `ENVIRONMENT_INITIALIZER` | `:L24-L26` |
| `angular:packages/core/src/di/injector.ts` | `Injector` (abstract), `Injector.create` | `:L45-L45`, `:L86-L106` |
| `angular:packages/core/src/di/create_injector.ts` | `createInjector`, `createInjectorWithoutInjectorInstances` | `:L21-L21`, `:L42-L42` |
| `angular:packages/core/src/application/application_init.ts` | `APP_INITIALIZER` (deprecated in favore di `provideAppInitializer`) | `:L150-L152` |
| `angular:packages/core/src/application/application_init.ts` | `provideAppInitializer()` | `:L192-L202` |
| `angular:packages/core/src/application/application_init.ts` | `ApplicationInitStatus`, `runInitializers()` | `:L210-L276`, `:L239-L275` |

Altri file della cartella: `angular:packages/core/src/di/{forward_ref,injectable,metadata,null_injector,contextual,scope,internal_tokens}.ts`
(`contextual.ts` ospita `runInInjectionContext`, usato dal router in `angular:packages/router/src/router_config_loader.ts:L62-L62`).

### Uso in Spartacus

| API | file | esempi |
|---|---|---|
| `new InjectionToken` | 119 | `core-libs/storefront/cms-structure/guards/before-cms-page-guard.token.ts:L22-L24` (token con `providedIn: 'root'` + `factory`) |
| `inject(` | 645 | `core-libs/storefront/cms-structure/page/component/handlers/lazy-component.handler.ts:L31-L31` |
| `providedIn: 'root'` | 799 | `core-libs/core/src/anonymous-consents/facade/anonymous-consents.service.ts:L21-L21` |
| `multi: true` | 106 | `core-libs/core/src/anonymous-consents/http-interceptors/index.ts:L11-L17` |
| `APP_INITIALIZER` | 29 | `core-libs/core/src/config/config-initializer/config-initializer.module.ts:L51-L59`; `core-libs/storefront/router/app-routing.module.ts:L22-L28` |
| `provideAppInitializer` | 5 | `core-libs/core/src/routing/routing.module.ts:L93-L95`; `integration-libs/opf/base/root/opf-base-root.module.ts:L19-L19` |
| `makeEnvironmentProviders` / `ENVIRONMENT_INITIALIZER` / `provideEnvironmentInitializer` | 0 / 0 / 0 | non usati nelle librerie |
| `EnvironmentInjector` | 1 | solo in un commento: `core-libs/core/src/routing/location-initialized-multi/location-initialized-multi.ts:L20-L20` |

---

## 2. NgModule vs standalone, bootstrap, ApplicationRef

| file Angular | simboli | righe chiave |
|---|---|---|
| `angular:packages/platform-browser/src/browser.ts` | `bootstrapApplication()`, `createApplication()` | `:L125-L140`, `:L157-L166` |
| `angular:packages/platform-browser/src/browser.ts` | `platformBrowser`, `BrowserModule` | `:L231-L231`, `:L291-L308` |
| `angular:packages/core/src/application/create_application.ts` | `internalCreateApplication()`; aggiunge **sempre** `provideZonelessChangeDetectionInternal()` ai provider app | `:L38-L43`, `:L65-L70` |
| `angular:packages/core/src/platform/bootstrap.ts` | `bootstrap()` (path comune module/standalone; warning zone+zoneless) | `:L75-L83`, `:L92-L104` |
| `angular:packages/core/src/platform/platform_ref.ts` | `PlatformRef`, `bootstrapModule()`, `bootstrapModuleFactory()` | `:L33-L33`, `:L87-L102`, `:L47-L47` |
| `angular:packages/core/src/application/application_ref.ts` | `ApplicationRef` | `:L260-L858` |
| `angular:packages/core/src/application/application_ref.ts` | `isStable` (getter su `PendingTasksInternal`), `whenStable()` | `:L330-L334`, `:L344-L344` |
| `angular:packages/core/src/application/application_ref.ts` | `bootstrap()` (impl.), `tick()`, `tickImpl`, `attachView()` | `:L490-L495`, `:L570-L575`, `:L591-L619`, `:L758-L763` |
| `angular:packages/core/src/render3/ng_module_ref.ts` | `createNgModule`, `NgModuleRef`, `NgModuleFactory`, `EnvironmentNgModuleRefAdapter` | `:L37-L42`, `:L51-L125`, `:L127-L127`, `:L145-L145` |
| `angular:packages/core/src/metadata/ng_module.ts` | `interface NgModule`, decorator `NgModule` | `:L33-L202`, `:L207-L207` |
| `angular:packages/core/src/metadata/directives.ts` | `standalone?` (Directive/Component/Pipe), `changeDetection?` | `:L337-L337`, `:L553-L553` |
| `angular:packages/core/src/application/application_config.ts` | `ApplicationConfig`, `mergeApplicationConfig` | `:L16-L16`, `:L31-L38` |

### Uso in Spartacus

| API | file | esempi |
|---|---|---|
| `@NgModule(` | 839 | `core-libs/storefront/router/app-routing.module.ts:L13-L30` |
| `standalone: true` / `standalone: false` | 17 / 2 | `core-libs/storefront/shared/components/read-more/read-more.component.ts:L26-L26` |
| `importProvidersFrom` | 4 (tutti in `core-libs/schematics`) | `core-libs/schematics/src/add-spartacus/update-app-config.ts:L49-L71`; app demo: `projects/storefrontapp/src/app/app.config.ts:L33-L33` |
| `bootstrapApplication` | 3 (schematics) | `core-libs/schematics/src/modernize-app-to-standalone-bootstrap-application/csr-and-ssr/update-main-ts.ts:L16-L19`; demo: `projects/storefrontapp/src/main.ts:L17-L17`, `projects/storefrontapp/src/main.server.ts:L24-L24` |
| `ApplicationRef` | 3 | `core-libs/storefront/layout/launch-dialog/services/inline-root-render.strategy.ts:L33-L33`, `:L50-L50` (`attachView`); `core-libs/storefront/router/on-navigate.service.ts:L46-L46` |
| `NgModuleRef` | 9 | `core-libs/core/src/lazy-loading/feature-modules.service.ts:L42-L42` |

Nota: le librerie sono ancora prevalentemente NgModule-based; l'app demo è standalone e importa `AppModule` via `importProvidersFrom`.

---

## 3. Lazy loading (router + API programmatiche)

| file Angular | simboli | righe chiave |
|---|---|---|
| `angular:packages/router/src/router_config_loader.ts` | `RouterConfigLoader`, `loadComponent()`, `loadChildren()` (metodo) | `:L42-L110`, `:L49-L79`, `:L81-L109` |
| `angular:packages/router/src/router_config_loader.ts` | `loadChildren()` (funzione: `NgModuleFactory.create(parentInjector)`, lettura `ROUTES` con `self: true`) | `:L120-L163` (vedi `:L151-L151`, `:L157-L157`) |
| `angular:packages/router/src/router_config_loader.ts` | `maybeUnwrapDefaultExport()` | `:L172-L172` |
| `angular:packages/router/src/utils/config.ts` | `getOrCreateRouteInjectorIfNeeded()` → `createEnvironmentInjector(route.providers, …)` | `:L31-L43` |
| `angular:packages/router/src/router_preloader.ts` | `RouterPreloader` (anche lui chiama `createEnvironmentInjector` a `:L125-L125`), `PreloadAllModules`, `NoPreloading` | `:L93-L193`, `:L56-L56`, `:L74-L74` |
| `angular:packages/core/src/render3/ng_module_ref.ts` | `createEnvironmentInjector()`, `createNgModule()` | `:L193-L205`, `:L37-L42` |
| `angular:packages/router/src/models.ts` | `Route.loadComponent?`, `Route.loadChildren?`, `LoadChildrenCallback`, `LoadChildren` | `:L626-L626`, `:L738-L738`, `:L267-L267`, `:L283-L283` |

### Uso in Spartacus

| API | file | esempi |
|---|---|---|
| `loadChildren` / `loadComponent` (router) | 0 / 0 rilevanti | le 8 occorrenze di `loadComponent` sono omonimi (es. NgRx effect `loadComponent$` in `core-libs/core/src/cms/store/effects/components.effect.ts:L41-L41`) |
| `createEnvironmentInjector` / `createNgModule` | 0 / 0 | — |
| `NgModuleFactory` + `Compiler.compileModuleAsync` (meccanismo proprio) | — | `core-libs/core/src/lazy-loading/lazy-modules.service.ts:L220-L236` (`resolveModuleFactory`), `:L96-L97` e `:L123-L124` (`moduleFactory.create(injector)`) |
| `PendingTasks` attorno a `import()` dinamico di componenti CMS | 1 | `core-libs/storefront/cms-structure/page/component/handlers/lazy-component.handler.ts:L60-L71` |

Spartacus non usa il lazy loading del router: carica feature module con un proprio servizio (`LazyModulesService`)
basato su `NgModuleFactory.create()` e un `CombinedInjector` (`core-libs/core/src/lazy-loading/lazy-modules.service.ts:L90-L93`).

---

## 4. Change detection, zone, zoneless, PendingTasks

| file Angular | simboli | righe chiave |
|---|---|---|
| `angular:packages/core/src/change_detection/constants.ts` | `ChangeDetectionStrategy` (`OnPush = 0`, `Eager = 1`) | `:L18-L41` |
| `angular:packages/core/src/change_detection/change_detector_ref.ts` | `ChangeDetectorRef` (`markForCheck`, `detectChanges`) | `:L61-L127` |
| `angular:packages/core/src/render3/instructions/change_detection.ts` | `detectChangesInternal()`, `detectChangesInViewWhileDirty()` | `:L80-L100`, `:L102-L102` |
| `angular:packages/core/src/render3/instructions/change_detection.ts` | `refreshView()` | `:L180-L373` |
| `angular:packages/core/src/render3/instructions/change_detection.ts` | `detectChangesInComponent()`, `detectChangesInView()` (logica Dirty/CheckAlways/Targeted) | `:L420-L420`, `:L458-L517` |
| `angular:packages/core/src/render3/instructions/mark_view_dirty.ts` | `markViewDirty()` | `:L26-L52` |
| `angular:packages/core/src/zone/ng_zone.ts` | `NgZone`, `onStable`, `run()`, `runOutsideAngular()` | `:L106-L284`, `:L132-L132`, `:L234-L236`, `:L281-L283` |
| `angular:packages/core/src/change_detection/scheduling/ng_zone_scheduling.ts` | `NgZoneChangeDetectionScheduler`, `internalProvideZoneChangeDetection`, `provideZoneChangeDetection` | `:L37-L73`, `:L84-L87`, `:L153-L167` |
| `angular:packages/core/src/change_detection/scheduling/zoneless_scheduling_impl.ts` | `ChangeDetectionSchedulerImpl`, `notify()` | `:L60-L329`, `:L138-L225` |
| `angular:packages/core/src/change_detection/scheduling/zoneless_scheduling_impl.ts` | `provideZonelessChangeDetection()`, `provideZonelessChangeDetectionInternal()` | `:L367-L386`, `:L388-L388` |
| `angular:packages/core/src/pending_tasks.ts` | `PendingTasks`, `add()`, `run()` | `:L42-L87`, `:L50-L61`, `:L76-L79` |
| `angular:packages/core/src/pending_tasks_internal.ts` | `PendingTasksInternal`, `hasPendingTasks`, `hasPendingTasksObservable` | `:L20-L91`, `:L27-L27`, `:L36-L36` |

Fatto rilevante (v21): `internalCreateApplication` inserisce `provideZonelessChangeDetectionInternal()` per default
(`angular:packages/core/src/application/create_application.ts:L65-L70`); un'app che vuole Zone.js deve fornire
`provideZoneChangeDetection` esplicitamente (warning se presenti entrambi: `angular:packages/core/src/platform/bootstrap.ts:L96-L104`).

### Uso in Spartacus

| API | file | esempi |
|---|---|---|
| `ChangeDetectionStrategy.OnPush` | 399 | `core-libs/storefront/cms-components/content/banner/banner.component.ts:L35-L35` |
| `markForCheck` | 33 | — |
| `NgZone` | 8 | `core-libs/storefront/cms-structure/page/component/services/cx-api.service.ts:L74-L74`; `feature-libs/smartedit/core/services/smart-edit.service.ts:L33-L33`; `integration-libs/cdc/components/gigya-raas/gigya-raas.component.ts:L48-L48` |
| `provideZoneChangeDetection` | 10 (test setup + schematics) | `core-libs/core/src/test.ts:L28-L28`; migrazione `core-libs/schematics/src/migrations/221121_7/move-zone-change-detection-to-main/add-zone-change-detection-to-app-module/index.ts:L56-L56`; demo `projects/storefrontapp/src/app/app.config.ts:L30-L30` |
| `provideZonelessChangeDetection` | 0 | — |
| `PendingTasks` | 1 | `core-libs/storefront/cms-structure/page/component/handlers/lazy-component.handler.ts:L31-L31`, `:L67-L70` |
| `isStable` | 39 (molti omonimi, es. `ConfigInitializerService.isStable`) | `core-libs/core/src/config/config-initializer/config-initializer.service.ts:L42-L42` |

---

## 5. Signals

| file Angular | simboli | righe chiave |
|---|---|---|
| `angular:packages/core/src/render3/reactivity/signal.ts` | `signal()`, `signalAsReadonlyFn` | `:L72-L89`, `:L91-L91` |
| `angular:packages/core/src/render3/reactivity/computed.ts` | `computed()` | `:L32-L42` |
| `angular:packages/core/src/render3/reactivity/effect.ts` | `EffectRefImpl`, `effect()`, `ROOT_EFFECT_NODE`, `VIEW_EFFECT_NODE` | `:L49-L59`, `:L137-L197`, `:L254-L254`, `:L275-L275` |
| `angular:packages/core/src/render3/reactivity/root_effect_scheduler.ts`, `view_effect_runner.ts` | scheduling effetti root/view | (file interi) |
| `angular:packages/core/primitives/signals/src/signal.ts` | `createSignal`, `signalSetFn`, `signalUpdateFn` | `:L53-L73`, `:L86-L95`, `:L97-L97` |
| `angular:packages/core/primitives/signals/src/computed.ts` | `createComputed`, `COMPUTED_NODE` | `:L59-L93`, `:L117-L117` |
| `angular:packages/core/primitives/signals/src/graph.ts` | `producerAccessed`, `producerUpdateValueVersion`, `producerNotifyConsumers`, `consumerMarkDirty` | `:L204-L283`, `:L297-L297`, `:L327-L349`, `:L359-L363` |
| `angular:packages/core/rxjs-interop/src/to_signal.ts` | `toSignal()` | `:L81-L225` |
| `angular:packages/core/rxjs-interop/src/to_observable.ts` | `toObservable()` | `:L48-L75` |
| `angular:packages/core/rxjs-interop/src/take_until_destroyed.ts` | `takeUntilDestroyed()` | `:L25-L43` |

### Uso in Spartacus

| API | file | esempi |
|---|---|---|
| `signal(` | 7 | `core-libs/storefront/cms-components/myaccount/consent-management/components/consent-management.component.ts:L72-L72` |
| `computed(` | 5 | `feature-libs/subscription-billing/components/actions-modal/subscription-actions-modal.component.ts:L89-L92` |
| `effect(` | 3 | `core-libs/storefront/shared/components/ng-select-a11y/ng-select-a11y.directive.ts:L190-L190` |
| `toSignal` | 7 | `core-libs/core/src/error-handling/http-error-handler/http-error-handler.interceptor.ts:L46-L46` |
| `toObservable` | 3 (omonimi, es. `wrapIntoObservable`) | `core-libs/core/src/util/rxjs/wrap-into-observable.ts:L17-L17` |
| `takeUntilDestroyed` | 20 | `core-libs/core/src/auth/user-auth/facade/auth.service.ts:L243-L243` |

L'uso dei signals è marginale: Spartacus resta basato su RxJS/NgRx.

---

## 6. Router

| file Angular | simboli | righe chiave |
|---|---|---|
| `angular:packages/router/src/router.ts` | `Router`, `resetConfig()`, `navigateByUrl()` | `:L89-L89`, `:L389-L393`, `:L537-L537` |
| `angular:packages/router/src/navigation_transition.ts` | `NavigationTransitions`, `setupNavigations()` (pipeline: `recognize` `:L537`, `checkGuards` `:L649`, `resolveData` `:L690`) | `:L341-L341`, `:L440-L966` |
| `angular:packages/router/src/operators/recognize.ts` | operatore `recognize` | `:L19-L19` |
| `angular:packages/router/src/recognize.ts` | `recognize()`, `Recognizer`, `processSegment()`, `processSegmentAgainstRoute()`, `matchSegmentAgainstRoute()` | `:L46-L66`, `:L70-L532`, `:L235-L235`, `:L270-L322`, `:L402-L493` |
| `angular:packages/router/src/apply_redirects.ts` | `ApplyRedirects` | `:L61-L192` |
| `angular:packages/router/src/utils/config_matching.ts` | `matchWithChecks()`, `match()` (usa `route.matcher \|\| defaultUrlMatcher` a `:L101-L102`), `split()` | `:L54-L80`, `:L82-L122`, `:L124-L124` |
| `angular:packages/router/src/shared.ts` | `defaultUrlMatcher()`, `convertToParamMap()` | `:L153-L218`, `:L116-L116` |
| `angular:packages/router/src/models.ts` | `UrlMatcher`, `Route`, `CanActivate`, `CanActivateFn`, `CanMatchFn`, `Resolve`, `ResolveFn` | `:L181-L181`, `:L567-L793`, `:L858-L858`, `:L915-L915`, `:L1187-L1187`, `:L1312-L1312`, `:L1422-L1422` |
| `angular:packages/router/src/operators/check_guards.ts` | `checkGuards()`, `runCanActivate()`, `runCanMatchGuards()` | `:L56-L78`, `:L149-L172`, `:L265-L287` |
| `angular:packages/router/src/operators/resolve_data.ts` | `resolveData()`, `resolveNode()`, `getResolver()` | `:L28-L69`, `:L101-L127`, `:L129-L129` |
| `angular:packages/router/src/utils/functional_guards.ts` | `mapToCanActivate()`, `mapToCanMatch()` | `:L50-L56`, `:L33-L33` |
| `angular:packages/router/src/url_tree.ts` | `UrlTree`, `UrlSerializer` (abstract), `DefaultUrlSerializer`, `UrlParser` | `:L260-L260`, `:L421-L427`, `:L447-L463`, `:L610-L822` |
| `angular:packages/router/src/router_module.ts` | `RouterModule.forRoot()`, `forChild()` | `:L133-L166`, `:L184-L189` |
| `angular:packages/router/src/provide_router.ts` | `provideRouter()`, `withEnabledBlockingInitialNavigation()`, `withInMemoryScrolling()` | `:L99-L116`, `:L441-L441`, `:L227-L227` |

### Uso in Spartacus

| API | file | esempi |
|---|---|---|
| `UrlMatcher` | 10 | `core-libs/core/src/routing/configurable-routes/configurable-routes.service.ts:L93-L93`, `:L112-L112` |
| `resetConfig` | 4 | `core-libs/core/src/routing/configurable-routes/configurable-routes.service.ts:L48-L52`; `core-libs/storefront/cms-structure/services/cms-routes-impl.service.ts:L119-L119` |
| `CanActivateFn` | 3 | `core-libs/storefront/cms-structure/services/cms-routes-impl.service.ts:L164-L183` (wrapper che risolve guard tramite `UnifiedInjector`) |
| `implements CanActivate` (classi) | 4 | `core-libs/core/src/auth/user-auth/guards/custom-login.guard.ts:L50-L50`; `feature-libs/quote/components/cart-guard/quote-cart.guard.ts:L28-L28` |
| `CanMatchFn` / `ResolveFn` | 0 / 0 | — |
| `UrlSerializer` | 5 | `core-libs/core/src/site-context/providers/site-context-params-providers.ts:L14-L18`; `SiteContextUrlSerializer extends DefaultUrlSerializer` in `core-libs/core/src/site-context/services/site-context-url-serializer.ts:L31-L31` (`parse` `:L62-L62`, `serialize` `:L126-L126`) |
| `RouterModule.forRoot` / `forChild` | 2 / 25 | `core-libs/storefront/router/app-routing.module.ts:L15-L18` (`initialNavigation: 'enabledBlocking'`) |
| `provideRouter` | 0 | — |

---

## 7. HttpClient e interceptor

| file Angular | simboli | righe chiave |
|---|---|---|
| `angular:packages/common/http/src/client.ts` | `HttpClient` (classe intera), `request()` | `:L133-L5024`, `:L154-L154` |
| `angular:packages/common/http/src/backend.ts` | `HttpBackend`, `HttpInterceptorHandler` (costruisce la catena), `HttpHandler` | `:L46-L46`, `:L58-L136`, `:L151-L151` |
| `angular:packages/common/http/src/interceptor.ts` | `HttpInterceptor` (classe), `HttpInterceptorFn` | `:L54-L63`, `:L127-L127` |
| `angular:packages/common/http/src/interceptor.ts` | `interceptorChainEndFn`, `adaptLegacyInterceptorToChain`, `chainedInterceptorFn` | `:L149-L154`, `:L160-L168`, `:L174-L185` |
| `angular:packages/common/http/src/interceptor.ts` | `HTTP_INTERCEPTORS`, `HTTP_INTERCEPTOR_FNS` | `:L195-L197`, `:L202-L205` |
| `angular:packages/common/http/src/interceptor.ts` | `legacyInterceptorFnFactory()` (adatta gli interceptor DI) | `:L227-L252` |
| `angular:packages/common/http/src/provider.ts` | `provideHttpClient()`, `withInterceptors()`, `withInterceptorsFromDi()`, `withFetch()` | `:L94-L140`, `:L150-L163`, `:L180-L197`, `:L302-L308` |
| `angular:packages/common/http/src/context.ts` | `HttpContextToken`, `HttpContext` | `:L16-L18`, `:L55-L114` |
| `angular:packages/common/http/src/request.ts` | `HttpRequest` (campo `context`) | `:L135-L805` |
| `angular:packages/common/http/src/xhr.ts`, `fetch.ts` | `HttpXhrBackend`, `FetchBackend` | `xhr.ts:L108-L444`, `fetch.ts:L58-L377` |
| `angular:packages/common/http/src/module.ts` | `HttpClientModule` (deprecated) | `:L103-L103` |

### Uso in Spartacus

| API | file | esempi |
|---|---|---|
| `HttpClient` | 98 | `core-libs/core/src/occ/adapters/product/occ-product-search.adapter.ts:L55-L56` |
| `implements HttpInterceptor` | 22 | `core-libs/core/src/auth/user-auth/http-interceptors/auth.interceptor.ts:L25-L25`; `core-libs/core/src/auth/client-auth/http-interceptors/client-token.interceptor.ts:L32-L32` |
| `HTTP_INTERCEPTORS` | 19 | `core-libs/core/src/anonymous-consents/http-interceptors/index.ts:L11-L17` |
| `HttpInterceptorFn` / `withInterceptors(` | 0 / 0 | solo interceptor a classi |
| `withInterceptorsFromDi` / `provideHttpClient` / `withFetch` | 3 / 4 / 3 (schematics) | `core-libs/schematics/src/add-spartacus/update-app-config.ts:L84-L100`; demo `projects/storefrontapp/src/app/app.config.ts:L28-L28` |
| `HttpContextToken` | 3 | `core-libs/core/src/http/http-timeout/http-timeout.config.ts:L16-L18`; `core-libs/core/src/occ/utils/occ-http-token.ts:L20-L20` |
| `HttpContext` | 6 | `core-libs/core/src/occ/adapters/product/occ-product-search.adapter.ts:L51-L53` |

---

## 8. SSR: platform-server e @angular/ssr

| file Angular | simboli | righe chiave |
|---|---|---|
| `angular:packages/platform-server/src/utils.ts` | `createServerPlatform`, `prepareForHydration`, `insertEventRecordScript` | `:L55-L74`, `:L95-L125`, `:L157-L186` |
| `angular:packages/platform-server/src/utils.ts` | `renderInternal()`, `renderModule()`, `renderApplication()` | `:L197-L234`, `:L283-L309`, `:L342-L380` |
| `angular:packages/platform-server/src/server.ts` | `INTERNAL_SERVER_PLATFORM_PROVIDERS`, `ServerModule`, `platformServer()` | `:L47-L47`, `:L93-L93`, `:L130-L149` |
| `angular:packages/platform-server/src/provide_server.ts` | `provideServerRendering()` | `:L28-L34` |
| `angular:packages/platform-server/src/platform_state.ts` | `PlatformState.renderToString()` | `:L30-L64` |
| `angular:packages/platform-server/src/tokens.ts` | `INITIAL_CONFIG`, `BEFORE_APP_SERIALIZED`, `ENABLE_DOM_EMULATION` | `:L34-L34`, `:L42-L44`, `:L46-L46` |
| `angular:packages/platform-server/src/http.ts` | `ServerXhr`, `SERVER_HTTP_PROVIDERS` (interceptor URL relativi) | `:L29-L29`, `:L103-L110` |
| `angular:packages/ssr/docs/BUILD.bazel` | solo stub di documentazione: "`@angular/ssr` package located in the Angular/CLI repository" | `:L16-L16` |

**`@angular/ssr` (`CommonEngine`, `AngularNodeAppEngine`, `AngularAppEngine`) NON è in questo repo**: è in `angular/angular-cli`
(`packages/angular/ssr`). Qui esiste solo `angular:packages/ssr/docs/_index.ts` che ri-esporta `@angular/ssr` da `node_modules`
per generare la API doc. ⚠️ DA VERIFICARE nel repo angular-cli per i chapter su `CommonEngine`.

### Uso in Spartacus

| API | file | esempi |
|---|---|---|
| `CommonEngine` (`@angular/ssr/node`) | 5 | `core-libs/setup/ssr/engine/cx-common-engine.ts:L20-L23`, `:L41-L59` (`render()` override che aggiunge `PROPAGATE_ERROR_TO_SERVER`); `core-libs/setup/ssr/engine-decorator/ng-express-engine-decorator.ts:L8-L10` |
| `AngularNodeAppEngine` / `AngularAppEngine` | 0 / 0 | — |
| `renderApplication` / `renderModule` | 0 / 0 | (invocati indirettamente da `CommonEngine`, fuori da questo repo) |
| `provideServerRendering` | 2 (schematics) | `core-libs/schematics/src/modernize-app-to-standalone-bootstrap-application/ssr/create-app-config-server.ts:L30-L36`; demo `projects/storefrontapp/src/app/app.config.server.ts:L19-L19` |
| `platformServer` | 1 (`platformServerTesting`) | `core-libs/setup/setup-jest.ts:L17-L17` |

---

## 9. Hydration e TransferState

| file Angular | simboli | righe chiave |
|---|---|---|
| `angular:packages/platform-browser/src/hydration.ts` | `provideClientHydration()`, `withEventReplay()`, `withIncrementalHydration()`, `withNoHttpTransferCache()`, `withHttpTransferCacheOptions()` | `:L225-L266`, `:L124-L126`, `:L143-L145`, `:L72-L72`, `:L88-L88` |
| `angular:packages/core/src/hydration/api.ts` | `withDomHydration()`, `whenStableWithTimeout()`, `withIncrementalHydration()` (core) | `:L211-L325`, `:L164-L164`, `:L358-L398` |
| `angular:packages/core/src/hydration/event_replay.ts` | `withEventReplay()` (core) | `:L76-L202` |
| `angular:packages/core/src/hydration/annotate.ts` | `annotateForHydration()` (lato server) | `:L243-L301` |
| `angular:packages/core/src/hydration/tokens.ts` | `IS_HYDRATION_DOM_REUSE_ENABLED`, `IS_EVENT_REPLAY_ENABLED`, `IS_INCREMENTAL_HYDRATION_ENABLED` | `:L15-L15`, `:L46-L46`, `:L71-L71` |
| `angular:packages/core/src/defer/triggering.ts` | `triggerHydrationFromBlockName()` (incremental via `@defer`) | `:L393-L446` |
| `angular:packages/core/src/transfer_state.ts` | `makeStateKey()`, `TransferState` (`get`, `set`, `toJson`), `retrieveTransferredState()` | `:L47-L49`, `:L66-L148`, `:L150-L169` |
| `angular:packages/platform-server/src/transfer_state.ts` | `TRANSFER_STATE_SERIALIZATION_PROVIDERS` (multi su `BEFORE_APP_SERIALIZED`), `serializeTransferStateFactory()` | `:L31-L37`, `:L70-L111` |
| `angular:packages/common/http/src/transfer_cache.ts` | `transferCacheInterceptorFn()`, `withHttpTransferCache()` | `:L252-L316`, `:L439-L468` |

Altri file: `angular:packages/core/src/hydration/{cleanup,compression,i18n,node_lookup_utils,skip_hydration,views,utils}.ts`.

### Uso in Spartacus

| API | file | esempi |
|---|---|---|
| `provideClientHydration` / `withEventReplay` | 2 / 2 (schematics) | `core-libs/schematics/src/add-ssr/update-app-config-in-ssr.ts:L55-L57`, `:L105-L112`; demo `projects/storefrontapp/src/app/app.config.ts:L29-L29` (`withEventReplay(), withNoHttpTransferCache()`) |
| `withIncrementalHydration` / `withHttpTransferCache` | 0 / 0 | — |
| `TransferState` / `makeStateKey` | 3 / 1 | `core-libs/core/src/state/reducers/transfer-state.reducer.ts:L14-L16` (`CX_KEY`), `:L42-L62` (meta-reducer NgRx che scrive lo stato in `TransferState` lato server); provider in `core-libs/core/src/state/reducers/index.ts:L30-L33` |
| `BEFORE_APP_SERIALIZED` | 0 | — |

---

## 10. Schematics e builder

| file Angular | simboli | righe chiave |
|---|---|---|
| `angular:packages/core/schematics/collection.json` | schematics `ng generate` (`standalone-migration`, `inject-migration`, `route-lazy-loading-migration`, `signal-input-migration`, …) | `:L2-L49` |
| `angular:packages/core/schematics/migrations.json` | migrazioni `ng update` v21 (`control-flow-migration`, `router-current-navigation`, `application-config-core`, `add-bootstrap-context-to-server-main`, `bootstrap-options-migration`, …) | `:L2-L30` |
| `angular:packages/core/schematics/migrations/`, `ng-generate/`, `utils/` | implementazioni delle migrazioni/generatori di `@angular/core` | (cartelle) |
| `angular:packages/localize/schematics/ng-add` | `ng add @angular/localize` | (cartella) |

Non presenti in questo repo: `@angular-devkit/schematics`, `@angular-devkit/architect`, `@angular/build`/`@angular-devkit/build-angular`
(builder), `@schematics/angular` → tutti in `angular/angular-cli`. Router, common e platform-* non hanno cartelle `schematics/`.

### Uso in Spartacus

| API | file | esempi |
|---|---|---|
| `@angular-devkit/schematics` | 158 | `core-libs/schematics/src/add-spartacus/index.ts:L14-L14` |
| `@angular-devkit/architect` | 0 | — |
| Collezioni Spartacus | — | `core-libs/schematics/package.json:L43-L47` (`ng-add`, `ng-update` → `./src/migrations/migrations.json`), `:L90-L90` (`./src/collection.json`) |

---

## Riepilogo conteggi (file non-spec nelle librerie)

| tema | API più usate (conteggio) | API assenti |
|---|---|---|
| DI | `providedIn: 'root'` 799, `inject(` 645, `InjectionToken` 119, `multi: true` 106, `APP_INITIALIZER` 29, `provideAppInitializer` 5 | `makeEnvironmentProviders`, `ENVIRONMENT_INITIALIZER`, `provideEnvironmentInitializer` |
| NgModule/standalone | `@NgModule(` 839, `standalone: true` 17, `NgModuleRef` 9 | `bootstrapApplication` (solo schematics/demo) |
| Lazy loading | `NgModuleFactory` + `compileModuleAsync` (servizio proprio) | `loadChildren`, `createEnvironmentInjector`, `createNgModule` |
| CD/zone | `OnPush` 399, `markForCheck` 33, `NgZone` 8, `PendingTasks` 1 | `provideZonelessChangeDetection` |
| Signals | `takeUntilDestroyed` 20, `signal` 7, `toSignal` 7, `computed` 5, `effect` 3 | — |
| Router | `RouterModule.forChild` 25, `UrlMatcher` 10, `UrlSerializer` 5, `resetConfig` 4, `CanActivate` 4+3 | `CanMatchFn`, `ResolveFn`, `provideRouter`, `loadChildren` |
| HTTP | `HttpClient` 98, `HttpInterceptor` (classi) 22, `HTTP_INTERCEPTORS` 19, `HttpContext` 6 | `HttpInterceptorFn`, `withInterceptors` |
| SSR | `CommonEngine` 5 | `AngularNodeAppEngine`, `renderApplication`/`renderModule` diretti |
| Hydration | `TransferState` 3, `provideClientHydration` 2 | `withIncrementalHydration`, `withHttpTransferCache` |
| Schematics | `@angular-devkit/schematics` 158 | `@angular-devkit/architect` |
