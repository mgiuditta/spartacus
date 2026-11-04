# Inventario: `@spartacus/storefront` + `@spartacus/styles`

Repo SHA `5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`. Conteggi = `git ls-files <dir> | grep -E '\.(ts|scss|html)$' | grep -v spec | wc -l`.
Le righe `Lx-Ly` dei simboli coprono decoratore + dichiarazione (fine = prima `}` a colonna 0; approssimazione per classi lunghe).

> ⚠️ Nota versioni: `core-libs/storefront/package.json:L3-L3` e `core-libs/styles/package.json:L3-L3` dichiarano `221121.22.0`; il root `package.json:L3-L3` dichiara `2612.0.0`.

---

## 1. Entry point e public_api

### @spartacus/storefront (Nx project `storefrontlib`, `core-libs/storefront/project.json:L2-L2`)
- Unico entry point: **nessun `ng-package.json` annidato** (Glob `core-libs/{storefront,styles}/**/ng-package.json` → solo la root).
- `core-libs/storefront/ng-package.json:L1-L8` — `dest: ../../dist/storefront`, `entryFile: ./public_api.ts`, `styleIncludePaths: ["../", "../styles/scss"]`.
- Build: executor custom `./tools/build-lib:declaration-merging` (`core-libs/storefront/project.json:L8-L13`); test vitest `core-libs/storefront/project.json:L21-L26`.
- Non esiste `index.ts` alla root della lib: l'API è in `core-libs/storefront/public_api.ts`.
- `core-libs/storefront/public_api.ts:L14-L14` — `/// <reference path="../../types.d.ts" />` (augmentation per `@HostListener` keydown.*).
- `core-libs/storefront/public_api.ts:L20-L30` — re-export barrel:
  `base-storefront.module`, `cms-components/index`, `cms-pages/index`, `cms-structure/index`, `context/index`, `events/index`, `layout/index`, `recipes/index`, `router/index`, `shared/index`, `utils/index`.
- `core-libs/storefront/public_api.ts:L32-L36` — blocco `AUGMENTABLE_TYPES` (`ICON_TYPE`, `BREAKPOINT`, `LAUNCH_CALLER`), tipi estendibili via declaration merging.
- Root module: `BaseStorefrontModule` `core-libs/storefront/base-storefront.module.ts:L26-L49` (importa `BaseCoreModule.forRoot()`, `OutletModule(.forRoot)`, `PwaModule`, `PageLayoutModule`, `SeoModule`, `PageComponentModule.forRoot()`, `PageSlotModule`, `SkipLinkModule`, `KeyboardFocusModule`, `LayoutModule`, `RoutingModule.forRoot()`, `MediaModule.forRoot()`, `CmsLcpModule.forRoot()`, `StorefrontComponentModule`, `GlobalMessageComponentModule`).
- Uso nell'app demo: `projects/storefrontapp/src/app/spartacus/spartacus.module.ts:L12-L20`.

### @spartacus/styles (Nx project `storefrontstyles`, `core-libs/styles/project.json:L2-L2`)
- Non è una lib ng-packagr: nessun `ng-package.json`, nessun `public_api.ts`. È un pacchetto Sass sorgente.
- Entry Sass: `core-libs/styles/package.json:L31-L31` → `"sass": "./_index.scss"`.
- `core-libs/styles/_index.scss:L1-L4` — `@import 'scss/app'`, `'scss/root'`, `'scss/page-template'`, `'scss/components'`.
- Entry tema alternativi: `core-libs/styles/theme-sparta.scss:L1-L4`, `core-libs/styles/theme-lambda.scss:L1-L3`, `core-libs/styles/theme-santorini.scss`.
- Entry "core" (solo variabili/mixin/funzioni, nessun CSS emesso): `core-libs/styles/scss/_core.scss:L1-L5`.
- Packaging: copia raw dei sorgenti, `ci-scripts/release-packer.sh:L42-L43` (`cp -r core-libs/styles/* ../.`).
- Unico target Nx: `test-jest` (`core-libs/styles/project.json:L6-L12`), test Sass in `core-libs/styles/test/`.

## 2. Dipendenze

### storefront — `core-libs/storefront/package.json`
| riga | tipo | pacchetto | versione |
|---|---|---|---|
| L13 | dependency | tslib | ^2.8.1 |
| L16 | peer | @angular/common | ^21.2.23 |
| L17 | peer | @angular/core | ^21.2.23 |
| L18 | peer | @angular/forms | ^21.2.23 |
| L19 | peer | @angular/platform-browser | ^21.2.23 |
| L20 | peer | @angular/router | ^21.2.23 |
| L21 | peer | @angular/service-worker | ^21.2.23 |
| L22 | peer | @ng-select/ng-select | ^21.1.4 |
| L23 | peer | @ngrx/effects | ^21.0.1 |
| L24 | peer | @ngrx/router-store | ^21.0.1 |
| L25 | peer | @ngrx/store | ^21.0.1 |
| L26 | peer | @spartacus/core | 221121.22.0 |
| L27 | peer | ngx-infinite-scroll | ^21.0.0 |
| L28 | peer | rxjs | ^7.8.0 |
| L31 | engines | node | ^22.22.0 |

### styles — `core-libs/styles/package.json`
| riga | tipo | pacchetto | versione |
|---|---|---|---|
| L17 | dependency | hamburgers | ^1.2.1 |
| L21 | peer | @fontsource/open-sans | ^5.3.0 |
| L22 | peer | @fortawesome/fontawesome-free | 7.1.0 |
| L23 | peer | @ng-select/ng-select | ^21.1.4 |
| L26 | engines | node | ^22.22.0 |

Nota: `@spartacus/styles` non dipende da `@spartacus/storefront` (e viceversa nel package.json); il legame è via selettori `cx-*` e `styleIncludePaths` (`core-libs/storefront/ng-package.json:L6-L6`). Nessun componente storefront usa `styleUrl(s)` (grep vuoto): gli stili sono globali.

## 3. Albero cartelle

### core-libs/storefront (totale per cartella di 1° livello in grassetto)
```
base-storefront.module.ts                    root NgModule
cms-components/ (243)                        componenti CMS mappati per typeCode
  anonymous-consent-management/ (7)          banner + open-dialog consensi anonimi
  content/ (30)                              banner, banner-carousel, link, paragraph, pdf, tab(8), tab-paragraph-container, video
  misc/ (34)                                 global-message(4), icon(9), message(4), promotions(4), site-context-selector(7), site-theme-switcher(5)
  myaccount/ (48)                            consent-management(7), my-account-v2(17), my-coupons(13), my-interests(3), notification-preference(4), payment-methods(3)
  navigation/ (33)                           breadcrumb, category-navigation, footer-navigation, navigation(7), page-header(4), scroll-to-top, search-box(9)
  product/ (81)                              carousel(11), config(1), product-images, product-intro, product-list(39), product-summary(4), product-tabs(11), stock-notification(6)
  user/ (9)                                  login-route(2), logout(4), utils(1)
cms-pages/ (7)                               product-details-page(3), product-listing-page(3) – URL matcher + route
cms-structure/ (107)                         motore CMS
  cms-lcp-context/ (7)                       LCP presence per componenti CMS (config 3)
  guards/ (5)                                CmsPageGuard, BEFORE_CMS_PAGE_GUARD
  outlet/ (9)                                cxOutlet, OutletService, provideOutlet; outlet-ref(2)
  page/ (31)                                 component(16) wrapper/handlers, model(2), page-layout(7), slot(5)
  pwa/ (9)                                   PwaModule, add-to-home-screen (components 5, services 1)
  routing/ (8)                               RoutingModule, cms-route(3), suffix-routes(2)
  seo/ (25)                                  SeoMeta, PageMetaLink, html lang, config(3), structured-data(16)
  services/ (9)                              CmsComponentsService, CmsRoutesImpl, CmsGuards, GuardsComposer
  utils/ (3)                                 provideCmsStructure, PageSection
context/ (4)                                 ContextService, RoutingContextService
events/ (15)                                 home(4), navigation(4), page(2), product(4) – event builder UI
layout/ (99)
  a11y/ (58)                                 keyboard-focus(35), skip-link(9), btn-like-link(3), on-dom-change(3), truncation-tooltip(3), focus-first-invalid-field(2), native-select-space(2)
  breakpoint/ (2)                            BreakpointService
  config/ (3)                                LayoutConfig, BREAKPOINT
  direction/ (6)                             LTR/RTL (config 3)
  header/ (5)                                hamburger-menu(4)
  launch-dialog/ (11)                        LaunchDialogService + render strategies (config 2, services 7)
  loading/ (4)                               DeferLoader, IntersectionService
  main/ (5)                                  StorefrontComponent (cx-storefront), outlets
  theme/ (3)                                 ThemeService/ThemeModule
recipes/ (5)                                 config(4): layoutConfig, mediaConfig, defaultCmsContentProviders
router/ (6)                                  AppRoutingModule, OnNavigateService (config 3)
shared/ (202)                                building block riutilizzabili
  components/ (158)                          captcha(10), card, carousel(6), carousel-scrolling, chat-messaging(9), form(26), generic-link, item-counter,
                                             list-navigation(20), media(8), ng-select-a11y, popover(7), progress-button, read-more, spinner,
                                             split-view(11), star-rating, table(13), truncate-text-popover(5), anonymous-consents-dialog, assistive-technology-message
  config/ (4)                                FormConfig, ViewConfig
  directives/ (7)                            horizontal-scrolling-position(3), roving-tabindex(3)
  lcp-context/ (8)                           LcpContextDirective, LCP_PRESENCE
  pipes/ (3)                                 supplement-hash-anchors(2)
  services/ (11)                             file(9: csv import/export, download, reader), positioning(1)
  test/ (6)                                  mock/testing helpers (non spec)
  utils/ (4)                                 forms(2), validators(1)
utils/ (4)                                   DirectiveStateTransferService, address utils
```

### core-libs/styles
```
_index.scss, theme-sparta.scss, theme-lambda.scss, theme-santorini.scss   entry Sass
scss/ (189)
  _core.scss _features.scss _versioning.scss _functions.scss _mixins.scss _theme.scss _fonts.scss _site-theme.scss
  _components.scss _page-template.scss app.scss root.scss                 aggregatori
  components/ (113)        stili componenti per area: content(23), product(29), misc(24), myaccount(16), layout(8), cpq-quote(4), cds(3), pwa(3), digital-payments(2)
  cxbase/ (32)             base: _variables, _mixins, _functions, _spatial, _animations; blocks(14), functions(2), layout(3), mixins(7)
  layout/ (17)             page-templates(13), _ghost, _page-fold, _screen-reader
  misc/ (4)                _dialog, _hamburger, _table, _truncation-tooltip
  theme/ (11)              sparta(2), santorini(2), santorini-updated(2), lambda(1), high-contrast(4)
vendor/bootstrap/scss (90) copia vendorizzata di Bootstrap 4 (scss, mixins, utilities)
test/ (1 non-spec)         versioning-test-util.scss + spec scss/jest
docs/ (0)                  flex-styling.md, hamburger.md
```

## 4. Simboli chiave per cartella (storefront)

### cms-structure / outlet
- `OutletDirective` (`[cxOutlet]`) `core-libs/storefront/cms-structure/outlet/outlet.directive.ts:L33-L236`
- `OutletService` `core-libs/storefront/cms-structure/outlet/outlet.service.ts:L10-L98`
- `OutletRendererService` `core-libs/storefront/cms-structure/outlet/outlet-renderer.service.ts:L13-L49`
- `OutletPosition`, `AVOID_STACKED_OUTLETS`, `USE_STACKED_OUTLETS`, `OutletContextData` `core-libs/storefront/cms-structure/outlet/outlet.model.ts:L9-L44`
- `PROVIDE_OUTLET_OPTIONS` / `provideOutlet()` `core-libs/storefront/cms-structure/outlet/outlet.providers.ts:L13-L47`
- `OutletModule` + `registerOutletsFactory` `core-libs/storefront/cms-structure/outlet/outlet.module.ts:L29-L89`
- `OutletRefDirective` `core-libs/storefront/cms-structure/outlet/outlet-ref/outlet-ref.directive.ts:L17-L36`
- `StorefrontOutlets` enum `core-libs/storefront/layout/main/storefront-outlets.model.ts:L7-L9`

### cms-structure / page (rendering CMS)
- `PageLayoutComponent` `core-libs/storefront/cms-structure/page/page-layout/page-layout.component.ts:L17-L58`
- `PageLayoutService` `core-libs/storefront/cms-structure/page/page-layout/page-layout.service.ts:L26-L278`
- `PageTemplateDirective` `core-libs/storefront/cms-structure/page/page-layout/page-template.directive.ts:L46-L156`
- `PAGE_LAYOUT_HANDLER` `core-libs/storefront/cms-structure/page/page-layout/page-layout-handler.ts:L11-L13`
- `PageSlotComponent` `core-libs/storefront/cms-structure/page/slot/page-slot.component.ts:L48-L218`; `PageSlotService` `.../page/slot/page-slot.service.ts:L13-L74`
- `ComponentWrapperDirective` `core-libs/storefront/cms-structure/page/component/component-wrapper.directive.ts:L42-L151`
- `InnerComponentsHostDirective` `.../page/component/inner-components-host.directive.ts:L28-L87`
- `ComponentHandler` (abstract) `.../page/component/handlers/component-handler.ts:L21-L45`; `DefaultComponentHandler` `.../handlers/default-component.handler.ts:L24-L86`; `LazyComponentHandler` `.../handlers/lazy-component.handler.ts:L27-L82`; `WebComponentHandler` `.../handlers/web-component.handler.ts:L27-L137`
- `ComponentHandlerService` `.../page/component/services/component-handler.service.ts:L30-L89`; `CmsInjectorService` `.../services/cms-injector.service.ts:L19-L51`; `ComponentDataProvider` `.../services/component-data.provider.ts:L19-L60`; `CxApiService` `.../services/cx-api.service.ts:L33-L76`
- `CmsComponentData` `core-libs/storefront/cms-structure/page/model/cms-component-data.ts:L10-L13`
- `ComponentEvent` / `ComponentCreateEvent` / `ComponentDestroyEvent` `.../page/component/events/component.event.ts:L15-L48`
- `PageComponentModule` `.../page/component/page-component.module.ts:L15-L41`

### cms-structure / services
- `CmsComponentsService` `core-libs/storefront/cms-structure/services/cms-components.service.ts:L36-L277` (SSR check `L188-L188`)
- `CmsFeaturesService` `.../services/cms-features.service.ts:L30-L206`
- `CmsRoutesImplService` `.../services/cms-routes-impl.service.ts:L32-L183`; `CmsRoutesService` `.../services/cms-routes.service.ts:L13-L24`
- `CmsGuardsService` `.../services/cms-guards.service.ts:L19-L49`; `GuardsComposer` `.../services/guards-composer.ts:L30-L94`
- `CmsI18nService` `.../services/cms-i18n.service.ts:L11-L29`
- `provideCmsStructure()` `core-libs/storefront/cms-structure/utils/cms-structure.util.ts:L31-L33`; `PageSection` `.../utils/cms-structure.model.ts:L9-L13`

### cms-structure / guards + routing
- `CmsPageGuard` `core-libs/storefront/cms-structure/guards/cms-page.guard.ts:L23-L92`
- `CmsPageGuardService` `.../guards/cms-page-guard.service.ts:L35-L144`
- `BEFORE_CMS_PAGE_GUARD` `.../guards/before-cms-page-guard.token.ts:L22-L24`; `BeforeCmsPageGuardService` `.../guards/before-cms-page-guard.service.ts:L17-L33`
- `RoutingModule` `core-libs/storefront/cms-structure/routing/routing.module.ts:L18-L40` (importa `CoreRoutingModule.forRoot()`, `CmsRouteModule`)
- `defaultRoutesConfigFactory` `.../routing/default-routing-config.ts:L10-L115`
- `addCmsRoute` `.../routing/cms-route/add-cms-route.ts:L18-L25`; `CmsRouteModule` `.../cms-route/cms-route.module.ts:L10-L20`
- `getSuffixUrlMatcher` `.../routing/suffix-routes/suffix-url-matcher.ts:L18-L22`
- `PRODUCT_DETAILS_URL_MATCHER` `core-libs/storefront/cms-pages/product-details-page/product-details-url-matcher.ts:L42-L42`; `ProductDetailsPageModule` `.../product-details-page.module.ts:L14-L38`
- `PRODUCT_LISTING_URL_MATCHER` `core-libs/storefront/cms-pages/product-listing-page/product-listing-url-matcher.ts:L42-L42`; `ProductListingPageModule` `.../product-listing-page.module.ts:L13-L53`

### router + context
- `AppRoutingModule` `core-libs/storefront/router/app-routing.module.ts:L13-L34`
- `OnNavigateService` `core-libs/storefront/router/on-navigate.service.ts:L27-L211`; `OnNavigateConfig` `.../router/config/on-navigate-config.ts:L10-L27`; default `.../config/default-on-navigate-config.ts:L9-L16`
- `ContextService` `core-libs/storefront/context/context.service.ts:L16-L38`; `RoutingContextService` `.../context/routing-context.service.ts:L18-L64`

### seo
- `SeoModule` + `initSeoService` `core-libs/storefront/cms-structure/seo/seo.module.ts:L14-L35`
- `SeoMetaService` `.../seo/seo-meta.service.ts:L19-L94`; `PageMetaLinkService` `.../seo/page-meta-link.service.ts:L16-L72`; `MediaPreconnectService` `.../seo/media-preconnect.service.ts:L12-L35`
- `htmlLangProvider` / `setHtmlLangAttribute` `.../seo/html-lang-provider.ts:L10-L23`
- `SeoConfig` `.../seo/config/seo.config.ts:L10-L16`; `defaultSeoConfig` `.../seo/config/default-seo.config.ts:L9-L15`
- Structured data: `StructuredDataModule` `.../structured-data/structured-data.module.ts:L16-L36`, `StructuredDataFactory` `.../structured-data.factory.ts:L17-L54`, `JsonLdScriptFactory` `.../json-ld-script.factory.ts:L19-L89`, `JsonLdDirective` `.../json-ld.directive.ts:L21-L47`, `SCHEMA_BUILDER` / `JSONLD_PRODUCT_BUILDER` `.../builders/tokens.ts:L15-L23`, `JsonLdBuilderModule` `.../builders/json-ld-builder.module.ts:L21-L52`, `ProductSchemaBuilder` `.../builders/product/product-schema.builder.ts:L20-L59`, `BreadcrumbSchemaBuilder` `.../builders/breadcrumb/breadcrumb-schema.builder.ts:L13-L57`

### pwa
- `PwaModule` + `pwaFactory`/`pwaConfigurationFactory` `core-libs/storefront/cms-structure/pwa/pwa.module.ts:L19-L56`
- `PWAModuleConfig` / `defaultPWAModuleConfig` `.../pwa/pwa.module-config.ts:L10-L26`
- `AddToHomeScreenService` `.../pwa/services/add-to-home-screen.service.ts:L16-L72`; componenti banner/btn `.../pwa/components/*`

### LCP context
- `CmsLcpModule` `core-libs/storefront/cms-structure/cms-lcp-context/cms-lcp.module.ts:L11-L19`; `CmsLcpService` `.../cms-lcp.service.ts:L13-L66`; `LcpCmsComponentsConfig` `.../config/lcp-cms-components.config.ts:L14-L48`; `provideLcpPresenceForCmsComponent` `.../provide-lcp-presence-for-cms-component.ts:L20-L36`
- `LCP_PRESENCE` / `DEFAULT_LCP_PRESENCE` `core-libs/storefront/shared/lcp-context/lcp-presence.token.ts:L11-L32`; `LcpContextDirective` `.../lcp-context.directive.ts:L45-L84`

### layout
- `LayoutModule` `core-libs/storefront/layout/layout.module.ts:L15-L25`
- `BREAKPOINT` `core-libs/storefront/layout/config/layout-config.ts:L22-L28`; `LayoutConfig` `.../layout-config.ts:L90-L125`; `defaultLayoutConfig` `.../config/default-layout.config.ts:L9-L19`
- `BreakpointService` `core-libs/storefront/layout/breakpoint/breakpoint.service.ts:L34-L207` (`isPlatformBrowser` `L40-L40`)
- `StorefrontComponent` `core-libs/storefront/layout/main/storefront.component.ts:L51-L229`; `StorefrontComponentModule` `.../main/storefront-component.module.ts:L19-L34`
- `DirectionService` `core-libs/storefront/layout/direction/direction.service.ts:L28-L118`; `DirectionModule` `.../direction.module.ts:L12-L35`; `DirectionMode` `.../config/direction.model.ts:L14-L23`
- `ThemeService` `core-libs/storefront/layout/theme/theme.service.ts:L18-L62`; `ThemeModule` `.../theme/theme.module.ts:L10-L25`
- `HamburgerMenuService` `core-libs/storefront/layout/header/hamburger-menu/hamburger-menu.service.ts:L12-L36`
- `DeferLoaderService` `core-libs/storefront/layout/loading/defer-loader.service.ts:L19-L65`; `IntersectionService` `.../loading/intersection.service.ts:L23-L132`
- Recipes: `layoutConfig` `core-libs/storefront/recipes/config/layout-config.ts:L27-L189`, `layoutConfigFactory` `L190-L198`; `mediaConfig` `.../recipes/config/default-media.config.ts:L9-L38`; `defaultCmsContentProviders` `.../recipes/config/static-cms-structure.ts:L10-L19`

### launch-dialog
- `LaunchDialogModule` `core-libs/storefront/layout/launch-dialog/launch-dialog.module.ts:L18-L49`
- `LaunchConfig`, `LaunchDialog`, `LaunchOutletDialog`, `LaunchInlineDialog`, `LaunchInlineRootDialog`, `LaunchRoute`, `DIALOG_TYPE`, `LAUNCH_CALLER` `.../launch-dialog/config/launch-config.ts:L9-L103`
- `LaunchDialogService` `.../services/launch-dialog.service.ts:L24-L186`; `LaunchRenderStrategy` (abstract) `.../services/launch-render.strategy.ts:L24-L158`; `OutletRenderStrategy` `L26-L99`, `InlineRenderStrategy` `L23-L76`, `InlineRootRenderStrategy` `L21-L70`, `RoutingRenderStrategy` `L13-L32` (file omonimi in `.../services/`)

### a11y / keyboard-focus
- `KeyboardFocusModule` `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.module.ts:L25-L29`; `FocusDirective` (`cxFocus`) `.../focus.directive.ts:L12-L25`
- Catena di direttive: `BaseFocusDirective` `.../base/base-focus.directive.ts:L29-L113` → `VisibleFocusDirective` `.../visible/visible-focus.directive.ts:L24-L87` → `BlockFocusDirective` `.../block/block-focus.directive.ts:L14-L36` → `PersistFocusDirective` `.../persist/persist-focus.directive.ts:L47-L154` → `EscapeFocusDirective` `.../escape/escape-focus.directive.ts:L26-L63` → `AutoFocusDirective` `.../autofocus/auto-focus.directive.ts:L40-L120` → `TabFocusDirective` `.../tab/tab-focus.directive.ts:L17-L45` → `TrapFocusDirective` `.../trap/trap-focus.directive.ts:L16-L66` → `LockFocusDirective` `.../lock/lock-focus.directive.ts:L32-L222` (⚠️ DA VERIFICARE ordine di ereditarietà: dedotto dalla struttura cartelle, non dagli `extends`)
- `KeyboardFocusService` `.../services/keyboard-focus.service.ts:L10-L13`; `SelectFocusUtility` `.../services/select-focus.util.ts:L10-L93`; `FOCUS_ATTR`, `MOVE_FOCUS`, `TrapFocus` `.../keyboard-focus.model.ts:L8-L117`
- `SkipLinkModule` `core-libs/storefront/layout/a11y/skip-link/skip-link.module.ts:L25-L53`; `SkipLinkService` `.../service/skip-link.service.ts:L12-L112`; `SkipLinkConfig` `.../config/skip-link.config.ts:L10-L16`
- Altre: `BtnLikeLinkDirective` `.../a11y/btn-like-link/btn-like-link.directive.ts:L18-L36`, `FocusFirstInvalidFieldDirective` `.../focus-first-invalid-field/focus-first-invalid-field.directive.ts:L30-L53`, `NativeSelectSpaceDirective` `.../native-select-space/native-select-space.directive.ts:L22-L49`, `DomChangeDirective` `.../on-dom-change/dom-change.directive.ts:L28-L66`, `TruncationTooltipDirective` `.../truncation-tooltip/truncation-tooltip.directive.ts:L30-L65`
- `CxRovingTabindexDirective` `core-libs/storefront/shared/directives/roving-tabindex/roving-tabindex.directive.ts:L55-L430`; `NgSelectA11yDirective` `core-libs/storefront/shared/components/ng-select-a11y/ng-select-a11y.directive.ts:L40-L267`; `AtMessageDirective` `core-libs/storefront/shared/components/assistive-technology-message/assistive-technology-message.directive.ts:L22-L71`

### global-message-ui
- `GlobalMessageComponent` `core-libs/storefront/cms-components/misc/global-message/global-message.component.ts:L21-L51`
- `GlobalMessageComponentModule` `.../global-message/global-message.module.ts:L13-L17` (importato da `BaseStorefrontModule`, `core-libs/storefront/base-storefront.module.ts:L30-L30`)

### events (UI)
- `PageEvent` `core-libs/storefront/events/page/page.events.ts:L13-L18`
- `NavigationEvent` `.../events/navigation/navigation.event.ts:L13-L34`; `NavigationEventBuilder` `.../navigation-event.builder.ts:L23-L65`; `NavigationEventModule` `.../navigation-event.module.ts:L10-L15`
- `HomePageEvent` `.../events/home/home-page.events.ts:L12-L15`; `HomePageEventBuilder` `.../home-page-event.builder.ts:L14-L36`
- `ProductDetailsPageEvent`, `CategoryPageResultsEvent`, `SearchPageResultsEvent` `.../events/product/product-page.events.ts:L13-L42`; `ProductPageEventBuilder` `.../product-page-event.builder.ts:L23-L125`

### ssr-aware (nessuna cartella `ssr` in storefront)
- `DirectiveStateTransferService` `core-libs/storefront/utils/directive-state-transfer.service.ts:L17-L42`
- `isPlatformServer/Browser` in: `cms-structure/services/cms-components.service.ts:L188-L188`, `layout/loading/defer-loader.service.ts:L59-L59`, `layout/breakpoint/breakpoint.service.ts:L40-L40`, `cms-structure/page/slot/page-slot.service.ts:L31-L31`, `cms-structure/seo/structured-data/json-ld-script.factory.ts:L48-L48` (path relativi a `core-libs/storefront/`); anche `web-component.handler.ts`, `intersection.service.ts`, `ng-select-a11y.directive.ts`.
- Engine SSR vero e proprio: fuori scope, in `core-libs/setup/ssr`.

### cms-components (moduli principali)
- product: `ProductListModule` `core-libs/storefront/cms-components/product/product-list/product-list.module.ts:L39-L103`, `ProductListComponentService` `.../product-list/container/product-list-component.service.ts:L39-L302`, `ProductCarouselModule` `.../carousel/product-carousel/product-carousel.module.ts:L27-L53`, `ProductImagesModule` `.../product-images/product-images.module.ts:L18-L40`, `ProductSummaryModule` `.../product-summary/product-summary.module.ts:L19-L39`, `ProductTabsModule` `.../product-tabs/product-tabs.module.ts:L12-L19`, `ProductReviewsModule` `.../product-tabs/product-reviews/product-reviews.module.ts:L26-L51`, `StockNotificationModule` `.../stock-notification/stock-notification.module.ts:L23-L48`, facet: `ProductFacetNavigationModule` `.../product-list/product-facet-navigation/product-facet-navigation.module.ts:L14-L32`
- navigation: `NavigationModule` `core-libs/storefront/cms-components/navigation/navigation/navigation.module.ts:L21-L43`, `NavigationUIComponent` `.../navigation/navigation-ui.component.ts:L39-L408`, `NavigationService` `.../navigation/navigation.service.ts:L18-L224`, `SearchBoxModule` `.../search-box/search-box.module.ts:L25-L51`, `BreadcrumbModule` `.../breadcrumb/breadcrumb.module.ts:L19-L39`, `CategoryNavigationModule`, `FooterNavigationModule`, `PageTitleModule`, `ScrollToTopModule`
- content: `BannerModule` `core-libs/storefront/cms-components/content/banner/banner.module.ts:L20-L47`, `BannerCarouselModule`, `LinkModule`, `CmsParagraphModule` `.../paragraph/paragraph.module.ts:L14-L35`, `PDFModule`, `TabModule`, `TabParagraphContainerModule` `.../tab-paragraph-container/tab-paragraph-container.module.ts:L20-L41`, `VideoModule`
- misc: `IconModule` `core-libs/storefront/cms-components/misc/icon/icon.module.ts:L14-L23`, `IconComponent` `.../icon/icon.component.ts:L42-L131`, `IconLoaderService` `.../icon/icon-loader.service.ts:L19-L171`, `SiteContextSelectorModule` `.../site-context-selector/site-context-selector.module.ts:L23-L55`, `SiteContextComponentService` `L27-L137`, `SiteThemeSwitcherModule` `.../site-theme-switcher/site-theme-switcher.module.ts:L20-L40`, `MessageComponentModule`, `PromotionsModule`
- myaccount: `ConsentManagementModule` `core-libs/storefront/cms-components/myaccount/consent-management/consent-management.module.ts:L35-L63`, `MyCouponsModule` `.../my-coupons/my-coupons.module.ts:L35-L86`, `MyInterestsModule`, `NotificationPreferenceModule`, `PaymentMethodsModule`, `MyAccountV2Module` `.../my-account-v2/my-account-v2.module.ts:L10-L13`
- user: `UserComponentModule` `core-libs/storefront/cms-components/user/user.module.ts:L14-L23`, `LoginRouteModule`, `LogoutModule`
- anonymous consent: `AnonymousConsentManagementBannerModule` `core-libs/storefront/cms-components/anonymous-consent-management/anonymous-consent-management.module.ts:L21-L49`

### shared-components (selezione)
- `MediaModule` `core-libs/storefront/shared/components/media/media.module.ts:L20-L43`; `MediaService` `.../media/media.service.ts:L30-L429`
- `PopoverDirective` `core-libs/storefront/shared/components/popover/popover.directive.ts:L32-L236`; `PositioningService` `core-libs/storefront/shared/services/positioning/positioning.service.ts:L24-L349`
- `TableModule` `core-libs/storefront/shared/components/table/table.module.ts:L19-L30`, `TableService` `L31-L186`, `TableConfig` `.../table/config/table.config.ts:L20-L43`
- `SplitViewModule` `core-libs/storefront/shared/components/split-view/split-view.module.ts:L42-L46`, `SplitViewService` `.../split-view.service.ts:L16-L183`
- `CarouselModule` `core-libs/storefront/shared/components/carousel/carousel.module.ts:L16-L29`; `CaptchaModule` `.../captcha/captcha.module.ts:L15-L25`; `CardModule`; `ItemCounterModule`; `ListNavigationModule` / `PaginationModule` / `SortingModule`; `SpinnerModule`; `StarRatingModule`; form: `DatePickerModule`, `FileUploadModule`, `FormErrorsModule`, `PasswordVisibilityToggleModule`
- Config: `FormConfig` `core-libs/storefront/shared/config/form-config.ts:L10-L18`, `ViewConfig` `.../shared/config/view-config.ts:L10-L26`
- `HorizontalScrollingPositionDirective` `core-libs/storefront/shared/directives/horizontal-scrolling-position/horizontal-scrolling-position.directive.ts:L52-L261`
- File: `ImportCsvFileService` `core-libs/storefront/shared/services/file/csv/import-csv-file.service.ts:L14-L121`, `ExportCsvFileService` `.../csv/export-csv-file.service.ts:L11-L53`, `FileDownloadService`, `FileReaderService`

## 5. @spartacus/styles: struttura Sass

### Come si compila / importa
- Nessuna build nella lib: i sorgenti `.scss` vengono pubblicati tal quali (`ci-scripts/release-packer.sh:L42-L43`) e compilati dall'app consumer (Angular CLI / esbuild).
- Nel monorepo `@spartacus/styles` risolve via npm workspaces (`package.json:L6-L10`, include `core-libs/*`).
- Ordine di import nell'app demo `projects/storefrontapp/src/styles.scss:L1-L29`:
  1. `styles-config` (es. `$useLatestStyles: true`, `projects/storefrontapp/src/styles-config.scss`)
  2. `@spartacus/styles/scss/core` (variabili/mixin/funzioni) `L4-L4`
  3. parziali Bootstrap vendorizzati `@spartacus/styles/vendor/bootstrap/scss/*` `L8-L22`
  4. `@spartacus/styles` (→ `_index.scss`) `L25-L25`
  5. `cms-themes` (override CSS custom properties) `L29-L29`
- Stili delle feature-lib come bundle separati: `projects/storefrontapp/project.json:L43-L101` (es. `projects/storefrontapp/src/styles/lib-cart.scss:L1-L2` → `@import '../styles-config'; @import '@spartacus/cart';`). `silenceDeprecations: ["import"]` in `projects/storefrontapp/project.json:L137-L141` (uso di `@import` Sass).
- Le lib Angular trovano i parziali via `styleIncludePaths` (es. `core-libs/storefront/ng-package.json:L6-L6`, `integration-libs/opf/gift-card/ng-package.json:L5-L5`).

### Meccanismo placeholder / allowlist
- `core-libs/styles/scss/_components.scss:L7-L19` — `$skipComponentStyles` e `$<area>-components-allowlist` (`!default`).
- `core-libs/styles/scss/_components.scss:L21-L44` — merge allowlist e `@extend %#{$selector} !optional` per ogni selettore `cx-*` non in skip; `L47-L50` estende `%<selector>__body` su `body`.
- `core-libs/styles/scss/_page-template.scss:L9-L27` — `$page-template-allowlist` (LandingPage2Template, ProductDetailsPageTemplate, …) → `cx-page-layout.<Template>` estende `%<Template>`; `$page-template-blocklist`.
- `core-libs/styles/scss/components/index.scss:L1-L9` — importa le aree: content, product, misc, myaccount, layout, pwa, cds, digital-payments, cpq-quote.

### Theme / variabili
- Tema default: `core-libs/styles/scss/_theme.scss:L10-L10` → `theme/santorini/variables` (`santorini-updated` commentato `L12-L12`).
- `core-libs/styles/scss/root.scss:L1-L45` — `:root` con `--cx-color-#{$color}` da `$theme-colors` (`L4-L6`), `--cx-page-width-max`, font-weight, border-radius, `--cx-direction`; feature toggle a11y `L36-L44`, `L60-L69` (`getFeatureCssClass`).
- Site theme (high contrast): `core-libs/styles/scss/_site-theme.scss:L1-L3` (dark/light variables + `high-contrast.scss`), incluso da `app.scss:L39-L39`. Lato TS: `ThemeService` `core-libs/storefront/layout/theme/theme.service.ts:L18-L62`, `SiteThemeSwitcherModule`.
- Font: `core-libs/styles/scss/_fonts.scss:L2-L2` → `theme/sparta/fonts`.

### cxbase (base, mixins, functions)
- `core-libs/styles/scss/app.scss:L2-L39` — font, Font Awesome css `L4`, ng-select theme `L6`, `cxbase/index`, `cxbase/blocks/*` (buttons, forms, modal, alert, message, tooltip, tables, card, accordion, tabs, carousel, link, dropdown, paragraph), `cxbase/layout/*`, animations, `misc/*`, `site-theme`.
- `core-libs/styles/scss/_mixins.scss:L1-L2` → `cxbase/mixins` + `theme/high-contrast/mixins/mixins`; `core-libs/styles/scss/_functions.scss:L1-L1` → `cxbase/functions`.
- Variabili base: `core-libs/styles/scss/cxbase/_variables.scss`; mixin: `core-libs/styles/scss/cxbase/mixins/_visible-focus.scss`, `_type.scss`, `_button-reset.scss`, …

### Feature flag e versioning Sass
- `getFeatureCssClass()` `core-libs/styles/scss/_features.scss:L12-L12`; `@mixin forFeature` `core-libs/styles/scss/_features.scss:L41-L41`.
- `@mixin forVersion($from, $to)` `core-libs/styles/scss/_versioning.scss:L64-L64`; funzioni `getVersion` `L79`, `compareVersion` `L147`, `isStableVersion` `L194`, `addBreakingChange` `L204`.
- Test: `core-libs/styles/test/versioning-*.spec.scss`, `core-libs/styles/test/features.spec.scss`.

### Layout Sass
- `core-libs/styles/scss/layout/_index.scss:L1-L21` — `_page-fold`, `_ghost`, `_screen-reader`, `page-templates/*` (13 file), `%CheckoutLoginPageTemplate` estende `%LoginPageTemplate` `L19-L21`.
- Breakpoint Sass da Bootstrap mixins vendorizzati: `core-libs/styles/vendor/bootstrap/scss/mixins/_breakpoints.scss` (corrispondenza con `BREAKPOINT` TS: ⚠️ DA VERIFICARE, non confrontati i valori).

## 6. Tabella tematica

| cartella | tema | note |
|---|---|---|
| `core-libs/storefront/cms-structure/page/` + `services/` | cms-rendering | PageLayout → PageSlot → ComponentWrapper → ComponentHandler (default/lazy/web) |
| `core-libs/storefront/cms-structure/cms-lcp-context/`, `shared/lcp-context/` | cms-rendering (LCP) | LcpPresence, CmsLcpModule.forRoot |
| `core-libs/storefront/cms-structure/outlet/` | outlet | `cxOutlet`, `provideOutlet`, OutletPosition, stacked outlets |
| `core-libs/storefront/layout/main/` | outlet/layout | `cx-storefront`, `StorefrontOutlets` |
| `core-libs/storefront/layout/config/`, `breakpoint/`, `recipes/config/layout-config.ts` | layout/breakpoint | `LayoutConfig`, `BREAKPOINT`, default `layoutConfig` |
| `core-libs/storefront/layout/direction/`, `header/`, `loading/` | layout | RTL, hamburger, defer loading |
| `core-libs/storefront/cms-structure/routing/`, `guards/`, `cms-pages/`, `router/` | routing/page-guard | CmsPageGuard, BEFORE_CMS_PAGE_GUARD, URL matcher PDP/PLP, OnNavigate |
| `core-libs/storefront/context/` | routing | RoutingContextService |
| `core-libs/storefront/cms-structure/seo/` | seo | meta, link canonical, html lang, JSON-LD builders |
| `core-libs/storefront/cms-structure/pwa/` | pwa | `@angular/service-worker`, add-to-home-screen |
| `core-libs/storefront/utils/` + file con `isPlatform*` | ssr | solo punti SSR-aware; engine in `core-libs/setup/ssr` |
| `core-libs/storefront/cms-components/misc/global-message/` | global-message-ui | importato in BaseStorefrontModule |
| `core-libs/storefront/cms-components/product/` | components: product | product-list (39 file) dominante, facet, carousel, tabs |
| `core-libs/storefront/cms-components/navigation/` | components: navigation | NavigationUIComponent, search-box, breadcrumb |
| `core-libs/storefront/cms-components/content/` | components: content | banner, paragraph, tab, video, pdf |
| `core-libs/storefront/cms-components/misc/` | components: misc | icon (ICON_TYPE augmentabile), site-context, site-theme-switcher |
| `core-libs/storefront/cms-components/myaccount/` | components: myaccount | consents, coupons, interests, my-account-v2 |
| `core-libs/storefront/cms-components/user/`, `anonymous-consent-management/` | components: user/consent | login-route, logout, banner consensi |
| `core-libs/storefront/shared/` | shared-components | media, popover, table, split-view, form, carousel, file services |
| `core-libs/storefront/layout/a11y/`, `shared/directives/roving-tabindex/`, `shared/components/ng-select-a11y/` | keyboard-focus/a11y | catena `cxFocus`, skip-link, roving tabindex |
| `core-libs/storefront/layout/launch-dialog/` | launch-dialog | LAUNCH_CALLER augmentabile, render strategy outlet/inline/inline-root/routing |
| `core-libs/storefront/layout/theme/`, `cms-components/misc/site-theme-switcher/` | styles/theming (TS) | ThemeService, classi high-contrast |
| `core-libs/styles/scss/` (`_theme`, `root`, `theme/`, `_site-theme`) | styles/theming | santorini default, CSS custom props `--cx-*` |
| `core-libs/styles/scss/components/` | styles/components | placeholder `%cx-*` + allowlist |
| `core-libs/styles/scss/layout/`, `_page-template.scss` | styles/layout | page templates |
| `core-libs/styles/scss/_features.scss`, `_versioning.scss` | styles/theming | feature toggle CSS + `forVersion` |
| `core-libs/styles/vendor/bootstrap/` | styles/vendor | Bootstrap 4 vendorizzato |
| `core-libs/storefront/events/` | events-ui | PageEvent, NavigationEvent, HomePage/PDP/PLP events |
| `core-libs/storefront/recipes/` | recipes (storefront-foundation) | solo config (`layoutConfig`, `mediaConfig`, `defaultCmsContentProviders`); nessun `StorefrontFoundationModule`/`StorefrontModule` nel codice storefront: il ruolo "foundation" è di `BaseStorefrontModule` (`core-libs/storefront/base-storefront.module.ts:L26-L49`). ⚠️ DA VERIFICARE: unico riferimento residuo a `StorefrontFoundation` in `core-libs/schematics/src/shared/constants.ts` |
