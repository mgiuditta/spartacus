# Appendice A11 - Glossario

> Generata da `tools/extract3/a11_glossario.py` allo SHA 5b7a1c2b (`5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`). Non modificare a mano: rigenerare.

Glossario dei termini chiave del libro. Ogni definizione riassume ciò che afferma il **capitolo principale** linkato (e, se presente, il capitolo linkato dentro il testo); i riferimenti `path:Lx-Ly` sono copiati da quel capitolo e lo script verifica che vi compaiano letteralmente. La riga *Citato in* riporta i capitoli in cui il termine compare (conteggio delle occorrenze nel testo fuori dai blocchi di codice, con la regex della voce in `tools/extract3/a11_termini.py`).

Le definizioni sono curate a mano in `tools/extract3/a11_termini.py`; lo script estrae i candidati, conta le citazioni e verifica i riferimenti. Per i simboli TypeScript vedi anche [A12 — Indice dei simboli](A12-indice-simboli.md).

## Conteggi

- Voci definite: **58**
- di cui dall'elenco base: **45**
- Candidati estratti (grassetto o backtick in almeno 3 capitoli): **514**
- Candidati coperti da una voce definita: **91**
- Candidati non definiti elencati in fondo (almeno 6 capitoli): **89**
- Capitoli scansionati: **51**

## Come rigenerare

```bash
cd docs/spartacus-book
python3 tools/extract3/a11_glossario.py
# oppure entrambe le appendici: bash tools/extract3/run_all.sh
```

## Indice

- **A**: [Adapter](#adapter) · [APP_INITIALIZER](#app_initializer)
- **B**: [Base site](#base-site) · [BaseCoreModule / BaseStorefrontModule](#basecoremodule--basestorefrontmodule) · [Breakpoint](#breakpoint)
- **C**: [CMS](#cms) · [cmsComponents](#cmscomponents) · [CmsPageGuard](#cmspageguard) · [Command / Query](#command--query) · [CONFIG_INITIALIZER](#config_initializer) · [ConfigChunk / DefaultConfigChunk](#configchunk--defaultconfigchunk) · [Connector](#connector) · [Converter / normalizer / serializer](#converter--normalizer--serializer)
- **D**: [deepMerge](#deepmerge)
- **E**: [EntityLoaderState](#entityloaderstate) · [Entry point](#entry-point) · [Environment injector](#environment-injector) · [EventService](#eventservice)
- **F**: [Facade](#facade) · [facadeFactory](#facadefactory) · [Feature module](#feature-module) · [Feature toggle](#feature-toggle) · [featureModules](#featuremodules)
- **G**: [getStable](#getstable)
- **H**: [HTTP_INTERCEPTORS](#http_interceptors) · [HttpErrorHandler](#httperrorhandler) · [Hydration](#hydration)
- **I**: [Injection token](#injection-token)
- **L**: [LAUNCH_CALLER](#launch_caller) · [LayoutConfig](#layoutconfig) · [LoaderState](#loaderstate) · [LoggerService](#loggerservice)
- **M**: [Migrazione (ng update)](#migrazione-ng-update) · [MODULE_INITIALIZER](#module_initializer) · [Multi provider](#multi-provider)
- **N**: [NodeInjector](#nodeinjector)
- **O**: [OCC](#occ) · [OccEndpoints](#occendpoints) · [OptimizedSsrEngine](#optimizedssrengine) · [Outlet](#outlet)
- **P**: [Page layout](#page-layout) · [PageContext](#pagecontext) · [PageMetaResolver](#pagemetaresolver) · [PendingTasks](#pendingtasks) · [Process state](#process-state) · [provideConfig / provideDefaultConfig](#provideconfig--providedefaultconfig) · [public_api](#public_api)
- **R**: [Root module (feature lib)](#root-module-feature-lib) · [Route semantica](#route-semantica)
- **S**: [Schematics](#schematics) · [SERVER_REQUEST_URL / WindowRef](#server_request_url--windowref) · [Site context](#site-context) · [Slot](#slot) · [SSR (Server-Side Rendering)](#ssr-server-side-rendering)
- **T**: [Tipi augmentabili](#tipi-augmentabili) · [TransferState](#transferstate)
- **U**: [UnifiedInjector](#unifiedinjector)
- **Z**: [Zoneless](#zoneless)

## A

### Adapter

Classe astratta da cui dipende il dominio (`ProductAdapter`, `CmsPageAdapter`, `SiteAdapter`, …); il modulo OCC la lega via DI all'implementazione concreta (`OccProductAdapter`, …). Cambiare backend significa fornire un altro adapter, senza toccare facade e store.

- Capitolo principale: [21 — Livello OCC: adapter, connector, converter, endpoint](../parte-2/21-occ.md)
- Riferimenti: `core-libs/core/src/product/connectors/product/product.adapter.ts:L11-L30`, `core-libs/core/src/occ/adapters/product/product-occ.module.ts:L30-L76`
- Citato in 35 capitoli; i più frequenti oltre al principale: [52](../parte-3/52-ricette-occ-dati.md) (211), [24](../parte-2/24-product-search.md) (126), [25](../parte-2/25-cart.md) (113), [23](../parte-2/23-user.md) (102), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (102), [35](../parte-2/35-integration-opf-payments.md) (101), [15](../parte-2/15-cms-core.md) (92), [27](../parte-2/27-order.md) (78) e altri 26

### APP_INITIALIZER

`InjectionToken` di Angular per funzioni eseguite all'avvio che possono restituire Observable o Promise; `provideAppInitializer(fn)` lo avvolge in `makeEnvironmentProviders`. Il token è deprecato dalla v19 in favore di `provideAppInitializer`. Spartacus lo usa, tra l'altro, per eseguire i `CONFIG_INITIALIZER` e i `MODULE_INITIALIZER` dei moduli eager.

- Capitolo principale: [01 — Dependency Injection in Angular e in Spartacus](../parte-1/01-dependency-injection.md)
- Riferimenti: `angular:packages/core/src/application/application_init.ts:L150-L152`, `angular:packages/core/src/application/application_init.ts:L165-L202`
- Citato in 29 capitoli; i più frequenti oltre al principale: [10](../parte-2/10-bootstrap-inizializzazione.md) (38), [11](../parte-2/11-configurazione.md) (13), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (13), [13](../parte-2/13-site-context-theme.md) (12), [34](../parte-2/34-integration-cdc-cdp-cds.md) (12), [12](../parte-2/12-feature-module-lazy.md) (9), [05](../parte-1/05-router.md) (7), [14](../parte-2/14-routing.md) (7) e altri 20

## B

### Base site

Parametro di contesto che identifica il sito SAP Commerce (il segmento `/electronics-spa/` nel path OCC), inserito nell'URL delle chiamate tramite `OccEndpointsService.getBaseUrl()`. La configurazione `context` può essere derivata dinamicamente dal base site del backend il cui `urlPatterns` corrisponde all'URL corrente (`SiteContextConfigInitializer`, scope `context`).

- Capitolo principale: [13 — Site context e site theme](../parte-2/13-site-context-theme.md)
- Riferimenti: `core-libs/core/src/occ/services/occ-endpoints.service.ts:L86-L102`, `core-libs/core/src/site-context/config/config-loader/site-context-config-initializer.ts:L24-L27`
- Citato in 23 capitoli; i più frequenti oltre al principale: [10](../parte-2/10-bootstrap-inizializzazione.md) (49), [21](../parte-2/21-occ.md) (35), [22](../parte-2/22-auth.md) (25), [34](../parte-2/34-integration-cdc-cdp-cds.md) (19), [46](../parte-2/46-util-modelli.md) (17), [35](../parte-2/35-integration-opf-payments.md) (12), [11](../parte-2/11-configurazione.md) (10), [25](../parte-2/25-cart.md) (10) e altri 14

### BaseCoreModule / BaseStorefrontModule

Punto di aggregazione dell'inizializzazione: importando `BaseStorefrontModule` (che importa per primo `BaseCoreModule.forRoot()`, poi l'infrastruttura CMS/layout/routing/media/outlet) un'applicazione ottiene in un colpo solo l'intera catena di inizializzatori. `BaseCoreModule` aggrega 17 moduli core in un ordine esplicito.

- Capitolo principale: [10 — Bootstrap e ordine di inizializzazione](../parte-2/10-bootstrap-inizializzazione.md)
- Riferimenti: `core-libs/storefront/base-storefront.module.ts:L26-L49`, `core-libs/core/src/base-core.module.ts:L26-L53`
- Citato in 31 capitoli; i più frequenti oltre al principale: [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (33), [06](../parte-1/06-httpclient-interceptor.md) (10), [41](../parte-2/41-errori-global-message.md) (8), [47](../parte-2/47-app-demo.md) (7), [25](../parte-2/25-cart.md) (4), [52](../parte-3/52-ricette-occ-dati.md) (4), [11](../parte-2/11-configurazione.md) (3), [12](../parte-2/12-feature-module-lazy.md) (3) e altri 22

### Breakpoint

Fascia di larghezza della finestra (`xs`…`xl`, enum `BREAKPOINT`). `BreakpointService` trasforma la larghezza in un valore osservabile, con fallback "mobile first" in SSR; `LayoutConfig` può definire slot diversi per breakpoint.

- Capitolo principale: [18 — Layout, breakpoint, launch dialog e accessibilità](../parte-2/18-layout-breakpoint-a11y.md)
- Riferimenti: `core-libs/storefront/layout/breakpoint/breakpoint.service.ts:L40-L46`, `core-libs/storefront/layout/breakpoint/breakpoint.service.ts:L123-L131`
- Citato in 35 capitoli; i più frequenti oltre al principale: [16](../parte-2/16-cms-rendering.md) (36), [38](../parte-2/38-stili-theming.md) (20), [51](../parte-3/51-ricette-cms-outlet-layout.md) (12), [45](../parte-2/45-componenti-storefront.md) (8), [46](../parte-2/46-util-modelli.md) (8), [17](../parte-2/17-outlet.md) (6), [10](../parte-2/10-bootstrap-inizializzazione.md) (4), [29](../parte-2/29-asm.md) (4) e altri 26

## C

### CMS

Spartacus è uno storefront guidato dal CMS: le pagine non sono route Angular statiche ma una struttura pagina → template → slot → componenti che arriva da SAP Commerce Cloud (o da config statica o da un CMS di terze parti tramite adapter). Il modulo `cms` di core ottiene la struttura da un `PageContext`, separa struttura e dati dei componenti e la espone con la facade `CmsService`.

- Capitolo principale: [15 — CMS (core): pagine, slot, componenti, caricamento](../parte-2/15-cms-core.md)
- Riferimenti: `core-libs/core/src/cms/connectors/page/cms-page.connector.ts:L30-L54`, `core-libs/core/src/cms/facade/cms.service.ts:L33-L46`
- Citato in 46 capitoli; i più frequenti oltre al principale: [28](../parte-2/28-organization-b2b.md) (40), [45](../parte-2/45-componenti-storefront.md) (33), [51](../parte-3/51-ricette-cms-outlet-layout.md) (31), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (29), [16](../parte-2/16-cms-rendering.md) (28), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (28), [31](../parte-2/31-quote-ticketing-subscription.md) (24), [03](../parte-1/03-lazy-loading.md) (21) e altri 37

### cmsComponents

Chiave di configurazione con cui lo storefront mappa i tipi di componente CMS su componenti Angular: la definizione è in core, la lettura nello storefront. L'implementazione può essere una classe Angular, `() => import(...)` o un web component, anche dentro feature module lazy ([16](../parte-2/16-cms-rendering.md)).

- Capitolo principale: [15 — CMS (core): pagine, slot, componenti, caricamento](../parte-2/15-cms-core.md)
- Riferimenti: `core-libs/core/src/cms/config/cms-config.ts:L124-L138`, `core-libs/storefront/cms-structure/services/cms-components.service.ts:L67-L67`
- Citato in 28 capitoli; i più frequenti oltre al principale: [16](../parte-2/16-cms-rendering.md) (23), [12](../parte-2/12-feature-module-lazy.md) (18), [51](../parte-3/51-ricette-cms-outlet-layout.md) (14), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (13), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (11), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (8), [28](../parte-2/28-organization-b2b.md) (7), [34](../parte-2/34-integration-cdc-cdp-cds.md) (6) e altri 19

### CmsPageGuard

Guard della route wildcard `**` aggiunta in coda alla config del Router: carica la pagina CMS che corrisponde al `PageContext` della navigazione in corso e, se non esiste, mostra la pagina `notFound`.

- Capitolo principale: [14 — Routing: route semantiche, URL, page guard, contesto](../parte-2/14-routing.md)
- Riferimenti: `core-libs/storefront/cms-structure/routing/cms-route/add-cms-route.ts:L12-L25`, `core-libs/storefront/cms-structure/guards/cms-page.guard.ts:L51-L84`
- Citato in 19 capitoli; i più frequenti oltre al principale: [05](../parte-1/05-router.md) (25), [51](../parte-3/51-ricette-cms-outlet-layout.md) (9), [10](../parte-2/10-bootstrap-inizializzazione.md) (3), [15](../parte-2/15-cms-core.md) (3), [16](../parte-2/16-cms-rendering.md) (3), [27](../parte-2/27-order.md) (3), [31](../parte-2/31-quote-ticketing-subscription.md) (3), [12](../parte-2/12-feature-module-lazy.md) (2) e altri 10

### Command / Query

Astrazioni di `@spartacus/core` alternative a NgRx, usate dalle feature più recenti (es. checkout). `Command` modella le scritture con una strategia di concorrenza esplicita (`Queue`, `Parallel`, `CancelPrevious`, `ErrorPrevious`) e parte anche senza sottoscrizione; `Query` modella le letture con stato `{loading, error, data}`, caricamento lazy alla sottoscrizione e invalidazione tramite eventi (`reloadOn`, `resetOn`).

- Capitolo principale: [20 — Facade, command & query, eventi](../parte-2/20-facade-command-query-eventi.md)
- Riferimenti: `core-libs/core/src/util/command-query/command.service.ts:L27-L38`, `core-libs/core/src/util/command-query/command.service.ts:L122-L132`, `core-libs/core/src/util/command-query/query.service.ts:L33-L60`
- Citato in 15 capitoli; i più frequenti oltre al principale: [23](../parte-2/23-user.md) (17), [26](../parte-2/26-checkout.md) (13), [31](../parte-2/31-quote-ticketing-subscription.md) (13), [35](../parte-2/35-integration-opf-payments.md) (7), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (7), [46](../parte-2/46-util-modelli.md) (6), [27](../parte-2/27-order.md) (5), [29](../parte-2/29-asm.md) (4) e altri 6

### CONFIG_INITIALIZER

Meccanismo per la configurazione che arriva in ritardo durante il bootstrap (config asincrona, ad esempio dal backend): gli initializer sono orchestrati da `ConfigInitializerService`, che tiene traccia degli scope in corso. Un location initializer trattiene la navigazione iniziale finché `getStable()` non emette.

- Capitolo principale: [11 — Configurazione: provideConfig, default, merge, validator, initializer](../parte-2/11-configurazione.md)
- Riferimenti: `core-libs/core/src/config/config-initializer/config-initializer.service.ts:L130-L175`, `core-libs/core/src/config/config-initializer/config-initializer.service.ts:L35-L37`
- Citato in 10 capitoli; i più frequenti oltre al principale: [10](../parte-2/10-bootstrap-inizializzazione.md) (22), [01](../parte-1/01-dependency-injection.md) (19), [13](../parte-2/13-site-context-theme.md) (4), [37](../parte-2/37-i18n.md) (2), [50](../parte-3/50-ricette-config-di.md) (2), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [06](../parte-1/06-httpclient-interceptor.md) (1), [14](../parte-2/14-routing.md) (1) e altri 1

### ConfigChunk / DefaultConfigChunk

I due multi token su cui si contribuisce configurazione: `DefaultConfigChunk` per le librerie, `ConfigChunk` per l'applicazione. I due insiemi vengono fusi separatamente e il root viene combinato per ultimo, quindi qualsiasi `ConfigChunk` vince su qualsiasi `DefaultConfigChunk` indipendentemente dall'ordine di import.

- Capitolo principale: [11 — Configurazione: provideConfig, default, merge, validator, initializer](../parte-2/11-configurazione.md)
- Riferimenti: `core-libs/core/src/config/config-tokens.ts:L49-L62`, `core-libs/core/src/config/config-tokens.ts:L10-L12`
- Citato in 17 capitoli; i più frequenti oltre al principale: [01](../parte-1/01-dependency-injection.md) (20), [50](../parte-3/50-ricette-config-di.md) (13), [12](../parte-2/12-feature-module-lazy.md) (10), [42](../parte-2/42-feature-toggle-deprecazioni.md) (10), [47](../parte-2/47-app-demo.md) (6), [51](../parte-3/51-ricette-cms-outlet-layout.md) (6), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (6), [03](../parte-1/03-lazy-loading.md) (3) e altri 8

### Connector

Servizio `providedIn: 'root'` che delega all'adapter astratto della propria area (es. `ProductConnector` → `ProductAdapter`): è ciò che il dominio chiama, mentre l'implementazione concreta resta sostituibile.

- Capitolo principale: [21 — Livello OCC: adapter, connector, converter, endpoint](../parte-2/21-occ.md)
- Riferimenti: `core-libs/core/src/product/connectors/product/product.connector.ts:L13-L33`
- Citato in 25 capitoli; i più frequenti oltre al principale: [52](../parte-3/52-ricette-occ-dati.md) (62), [15](../parte-2/15-cms-core.md) (59), [30](../parte-2/30-product-configurator.md) (50), [25](../parte-2/25-cart.md) (32), [23](../parte-2/23-user.md) (25), [24](../parte-2/24-product-search.md) (17), [27](../parte-2/27-order.md) (15), [32](../parte-2/32-pickup-storefinder-delivery.md) (15) e altri 16

### Converter / normalizer / serializer

I dati raw (`Occ.*`) passano per `ConverterService`, che applica in catena tutti i converter registrati come multi provider su un `InjectionToken`: i *normalizer* convertono backend→UI, i *serializer* UI→backend.

- Capitolo principale: [21 — Livello OCC: adapter, connector, converter, endpoint](../parte-2/21-occ.md)
- Riferimenti: `core-libs/core/src/util/converter.service.ts:L13-L30`, `core-libs/core/src/util/converter.service.ts:L130-L137`
- Citato in 37 capitoli; i più frequenti oltre al principale: [52](../parte-3/52-ricette-occ-dati.md) (190), [46](../parte-2/46-util-modelli.md) (111), [15](../parte-2/15-cms-core.md) (77), [31](../parte-2/31-quote-ticketing-subscription.md) (72), [13](../parte-2/13-site-context-theme.md) (67), [25](../parte-2/25-cart.md) (56), [24](../parte-2/24-product-search.md) (50), [30](../parte-2/30-product-configurator.md) (49) e altri 28

## D

### deepMerge

Merge ricorsivo che muta il primo argomento, usato dalle factory dei token `DefaultConfig`, `RootConfig` e `Config` per trasformare i chunk di configurazione in un unico oggetto.

- Capitolo principale: [11 — Configurazione: provideConfig, default, merge, validator, initializer](../parte-2/11-configurazione.md)
- Riferimenti: `core-libs/core/src/config/utils/deep-merge.ts:L18-L49`, `core-libs/core/src/config/config-tokens.ts:L10-L47`
- Citato in 26 capitoli; i più frequenti oltre al principale: [47](../parte-2/47-app-demo.md) (7), [50](../parte-3/50-ricette-config-di.md) (7), [01](../parte-1/01-dependency-injection.md) (6), [12](../parte-2/12-feature-module-lazy.md) (6), [42](../parte-2/42-feature-toggle-deprecazioni.md) (6), [13](../parte-2/13-site-context-theme.md) (5), [52](../parte-3/52-ricette-occ-dati.md) (5), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (5) e altri 17

## E

### EntityLoaderState

`EntityState<LoaderState<T>>`: una mappa di `LoaderState` indicizzata per id di entità, prodotta da `entityLoaderReducer` (composizione di `entityReducer` e `loaderReducer`). Il selettore restituisce lo stato iniziale per id inesistenti.

- Capitolo principale: [19 — State management: NgRx, loader/entity/process state](../parte-2/19-state-management.md)
- Riferimenti: `core-libs/core/src/state/utils/entity-loader/entity-loader-state.ts:L10-L10`, `core-libs/core/src/state/utils/entity-loader/entity-loader.reducer.ts:L13-L25`
- Citato in 2 capitoli; i più frequenti oltre al principale: [15](../parte-2/15-cms-core.md) (2)

### Entry point

Pacchetto importabile (`@spartacus/<lib>` o secondario `@spartacus/<lib>/<entry>`) con il proprio `ng-package.json` e `public_api.ts`; è il contratto pubblico. Per convenzione `root/` è eager (facade astratte, modelli, eventi, token, config), mentre `core/`, `components/`, `occ/` sono lazy.

- Capitolo principale: [54 — API pubblica vs interna, upgrade, anti-pattern, checklist](../parte-3/54-upgrade-safe.md)
- Riferimenti: `core-libs/setup/ssr/ng-package.json:L1-L6`, `docs/libs/library-structure.md:L4-L16`
- Citato in 26 capitoli; i più frequenti oltre al principale: [32](../parte-2/32-pickup-storefinder-delivery.md) (8), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (6), [10](../parte-2/10-bootstrap-inizializzazione.md) (5), [12](../parte-2/12-feature-module-lazy.md) (4), [35](../parte-2/35-integration-opf-payments.md) (4), [47](../parte-2/47-app-demo.md) (4), [28](../parte-2/28-organization-b2b.md) (3), [30](../parte-2/30-product-configurator.md) (3) e altri 17

### Environment injector

Nodo dell'albero "environment" degli injector (`R3Injector`): il root injector applicativo di un avvio standalone è un `EnvironmentNgModuleRefAdapter` figlio del platform injector, e gli injector dei moduli lazy sono `NgModuleRef` con scope solo `'environment'`. `createEnvironmentInjector` è l'API pubblica per crearne uno figlio. Spartacus crea i componenti dei moduli lazy usando l'injector del modulo come environment injector ([03](../parte-1/03-lazy-loading.md)).

- Capitolo principale: [01 — Dependency Injection in Angular e in Spartacus](../parte-1/01-dependency-injection.md)
- Riferimenti: `angular:packages/core/src/application/create_application.ts:L64-L79`, `angular:packages/core/src/render3/ng_module_ref.ts:L82-L95`, `angular:packages/core/src/render3/ng_module_ref.ts:L193-L205`
- Citato in 11 capitoli; i più frequenti oltre al principale: [03](../parte-1/03-lazy-loading.md) (44), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (19), [17](../parte-2/17-outlet.md) (7), [12](../parte-2/12-feature-module-lazy.md) (3), [04](../parte-1/04-change-detection-zone-signals.md) (2), [06](../parte-1/06-httpclient-interceptor.md) (2), [10](../parte-2/10-bootstrap-inizializzazione.md) (2), [07](../parte-1/07-ssr-hydration-transferstate.md) (1) e altri 2

### EventService

Bus di eventi tipizzato per classi: si può registrare una sorgente observable per un tipo di evento, dispatchare un'istanza o ascoltare un tipo (e quindi anche i suoi sottotipi). `StateEventService` trasforma azioni NgRx in eventi, e `@spartacus/storefront` aggiunge una catena di eventi di pagina per tracking e personalizzazione.

- Capitolo principale: [20 — Facade, command & query, eventi](../parte-2/20-facade-command-query-eventi.md)
- Riferimenti: `core-libs/core/src/event/event.service.ts:L47-L113`, `core-libs/core/src/state/event/state-event.service.ts:L16-L76`
- Citato in 22 capitoli; i più frequenti oltre al principale: [50](../parte-3/50-ricette-config-di.md) (13), [19](../parte-2/19-state-management.md) (8), [12](../parte-2/12-feature-module-lazy.md) (5), [22](../parte-2/22-auth.md) (4), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (4), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (4), [25](../parte-2/25-cart.md) (3), [54](../parte-3/54-upgrade-safe.md) (3) e altri 13

## F

### Facade

Classe astratta che i componenti (e le altre feature) iniettano come API stabile della feature. Con `facadeFactory` viene fornita nel root injector come proxy che, alla prima chiamata di metodo o alla prima sottoscrizione di una proprietà, scarica il modulo lazy della feature e inoltra la chiamata all'implementazione reale: per questo un header può iniettare `ActiveCartFacade` senza portare nel bundle iniziale il codice del carrello.

- Capitolo principale: [20 — Facade, command & query, eventi](../parte-2/20-facade-command-query-eventi.md)
- Riferimenti: `core-libs/core/src/lazy-loading/facade-factory/facade-factory.service.ts:L22-L36`, `core-libs/core/src/lazy-loading/facade-factory/facade-factory.ts:L20-L24`, `feature-libs/cart/base/root/facade/active-cart.facade.ts:L13-L46`
- Citato in 42 capitoli; i più frequenti oltre al principale: [25](../parte-2/25-cart.md) (184), [23](../parte-2/23-user.md) (153), [31](../parte-2/31-quote-ticketing-subscription.md) (148), [27](../parte-2/27-order.md) (147), [12](../parte-2/12-feature-module-lazy.md) (137), [26](../parte-2/26-checkout.md) (123), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (115), [35](../parte-2/35-integration-opf-payments.md) (112) e altri 33

### facadeFactory

Funzione che crea la facade proxy chiamando `inject(FacadeFactoryService).create(descriptor)`, quindi va usata in un injection context (tipicamente `useFactory`). Il descrittore ha `facade` e `feature` obbligatori, `methods`, `properties` e `async` opzionali; la chiamata di un metodo del proxy scarica il modulo ed esegue il metodo reale anche se il chiamante non si sottoscrive.

- Capitolo principale: [20 — Facade, command & query, eventi](../parte-2/20-facade-command-query-eventi.md)
- Riferimenti: `core-libs/core/src/lazy-loading/facade-factory/facade-factory.ts:L20-L24`, `core-libs/core/src/lazy-loading/facade-factory/facade-descriptor.ts:L10-L37`, `core-libs/core/src/lazy-loading/facade-factory/facade-factory.service.ts:L70-L82`
- Citato in 20 capitoli; i più frequenti oltre al principale: [12](../parte-2/12-feature-module-lazy.md) (9), [35](../parte-2/35-integration-opf-payments.md) (6), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (6), [25](../parte-2/25-cart.md) (5), [26](../parte-2/26-checkout.md) (4), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (4), [01](../parte-1/01-dependency-injection.md) (3), [29](../parte-2/29-asm.md) (3) e altri 11

### Feature module

Unità di codice di una feature lib caricata con il sistema di lazy loading di Spartacus, indipendente dal router: il codice va caricato quando il CMS chiede un tipo di componente della feature, non quando il router entra in una route. Il pattern è "root module eager + modulo lazy": il root module dichiara quali componenti CMS la feature copre, l'app fornisce dove trovare il codice (`module: () => import(...)`).

- Capitolo principale: [12 — Feature module e lazy loading in Spartacus](../parte-2/12-feature-module-lazy.md)
- Riferimenti: `feature-libs/cart/base/root/cart-base-root.module.ts:L77-L81`, `feature-libs/cart/base/root/cart-base-root.module.ts:L26-L83`, `projects/storefrontapp/src/app/spartacus/features/cart/cart-base-feature.module.ts:L23-L55`
- Citato in 34 capitoli; i più frequenti oltre al principale: [03](../parte-1/03-lazy-loading.md) (19), [47](../parte-2/47-app-demo.md) (17), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (15), [20](../parte-2/20-facade-command-query-eventi.md) (12), [27](../parte-2/27-order.md) (11), [50](../parte-3/50-ricette-config-di.md) (11), [43](../parte-2/43-schematics-migrazioni.md) (10), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (9) e altri 25

### Feature toggle

Flag booleano con nome che protegge una correzione scritta accanto al vecchio comportamento, così che il cliente la attivi quando è pronto. L'API attuale è `FeatureToggles` con `provideFeatureToggles(...)`, la legacy `FeaturesConfig` è deprecata; `FeaturesConfigModule.forRoot()` installa un ponte toggle → config perché la direttiva `*cxFeature` passa ancora dal servizio legacy.

- Capitolo principale: [42 — Feature toggle e deprecazioni](../parte-2/42-feature-toggle-deprecazioni.md)
- Riferimenti: `core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L10-L14`, `core-libs/core/src/features-config/features-config.module.ts:L28-L52`, `core-libs/core/src/features-config/directives/feature.directive.ts:L11-L17`
- Citato in 35 capitoli; i più frequenti oltre al principale: [54](../parte-3/54-upgrade-safe.md) (23), [44](../parte-2/44-test-tooling.md) (19), [47](../parte-2/47-app-demo.md) (17), [43](../parte-2/43-schematics-migrazioni.md) (10), [13](../parte-2/13-site-context-theme.md) (7), [04](../parte-1/04-change-detection-zone-signals.md) (6), [22](../parte-2/22-auth.md) (6), [23](../parte-2/23-user.md) (6) e altri 26

### featureModules

Chiave di configurazione dichiarativa che associa un nome di feature a un `import()` dinamico, a delle dipendenze e ai tipi di componente CMS che la feature implementa. È l'unico modo di dichiarare le feature lazy (con `provideConfig` / `provideDefaultConfig`).

- Capitolo principale: [12 — Feature module e lazy loading in Spartacus](../parte-2/12-feature-module-lazy.md)
- Riferimenti: `core-libs/core/src/cms/config/cms-config.ts:L109-L134`
- Citato in 29 capitoli; i più frequenti oltre al principale: [47](../parte-2/47-app-demo.md) (15), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (12), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (11), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (10), [03](../parte-1/03-lazy-loading.md) (8), [16](../parte-2/16-cms-rendering.md) (8), [50](../parte-3/50-ricette-config-di.md) (7), [34](../parte-2/34-integration-cdc-cdp-cds.md) (6) e altri 20

## G

### getStable

Metodo di `ConfigInitializerService` che restituisce subito la configurazione se è stabile, altrimenti attende che gli scope richiesti non siano più in corso. Il JSDoc lo indica come il modo raccomandato per leggere la config da codice che può girare prima della fine dell'inizializzazione.

- Capitolo principale: [11 — Configurazione: provideConfig, default, merge, validator, initializer](../parte-2/11-configurazione.md)
- Riferimenti: `core-libs/core/src/config/config-initializer/config-initializer.service.ts:L35-L37`
- Citato in 13 capitoli; i più frequenti oltre al principale: [10](../parte-2/10-bootstrap-inizializzazione.md) (23), [13](../parte-2/13-site-context-theme.md) (11), [50](../parte-3/50-ricette-config-di.md) (9), [22](../parte-2/22-auth.md) (8), [01](../parte-1/01-dependency-injection.md) (6), [54](../parte-3/54-upgrade-safe.md) (3), [12](../parte-2/12-feature-module-lazy.md) (2), [16](../parte-2/16-cms-rendering.md) (2) e altri 4

## H

### HTTP_INTERCEPTORS

Multi token su cui Spartacus registra i propri interceptor HTTP con `useExisting`; l'app demo li abilita con `provideHttpClient(withFetch(), withInterceptorsFromDi())`. Poiché l'ordine di registrazione determina l'ordine nell'array, `ErrorHandlingModule.forRoot()` è importato per primo in `BaseCoreModule`.

- Capitolo principale: [01 — Dependency Injection in Angular e in Spartacus](../parte-1/01-dependency-injection.md)
- Riferimenti: `core-libs/core/src/auth/user-auth/http-interceptors/index.ts:L12-L23`, `projects/storefrontapp/src/app/app.config.ts:L26-L35`, `core-libs/core/src/base-core.module.ts:L28-L28`
- Citato in 16 capitoli; i più frequenti oltre al principale: [06](../parte-1/06-httpclient-interceptor.md) (18), [21](../parte-2/21-occ.md) (4), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (4), [35](../parte-2/35-integration-opf-payments.md) (4), [50](../parte-3/50-ricette-config-di.md) (4), [34](../parte-2/34-integration-cdc-cdp-cds.md) (3), [41](../parte-2/41-errori-global-message.md) (3), [22](../parte-2/22-auth.md) (2) e altri 7

### HttpErrorHandler

Classe astratta degli handler di global message per gli errori HTTP, uno per status: ne sono registrati 8 come multi provider con `useExisting` e `HttpErrorInterceptor` li raccoglie con `UnifiedInjector.getMulti`. L'`hasMatch` di default confronta lo status della risposta con `responseStatus`.

- Capitolo principale: [41 — Errori HTTP, error handling, logger e global message](../parte-2/41-errori-global-message.md)
- Riferimenti: `core-libs/core/src/global-message/http-interceptors/index.ts:L22-L63`, `core-libs/core/src/global-message/http-interceptors/handlers/http-error.handler.ts:L42-L44`
- Citato in 12 capitoli; i più frequenti oltre al principale: [50](../parte-3/50-ricette-config-di.md) (12), [31](../parte-2/31-quote-ticketing-subscription.md) (6), [32](../parte-2/32-pickup-storefinder-delivery.md) (6), [28](../parte-2/28-organization-b2b.md) (5), [06](../parte-1/06-httpclient-interceptor.md) (4), [54](../parte-3/54-upgrade-safe.md) (4), [25](../parte-2/25-cart.md) (3), [30](../parte-2/30-product-configurator.md) (3) e altri 3

### Hydration

Nel browser Angular non ricostruisce da zero il DOM ricevuto dal server ma lo "reclama" nodo per nodo, grazie alle annotazioni (`ngh`, `__nghData__`) scritte durante il render server.

- Capitolo principale: [07 — SSR, hydration e TransferState](../parte-1/07-ssr-hydration-transferstate.md)
- Riferimenti: `angular:packages/core/src/hydration/annotate.ts:L243-L301`, `angular:packages/core/src/hydration/api.ts:L211-L228`
- Citato in 25 capitoli; i più frequenti oltre al principale: [06](../parte-1/06-httpclient-interceptor.md) (11), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (7), [45](../parte-2/45-componenti-storefront.md) (6), [47](../parte-2/47-app-demo.md) (5), [05](../parte-1/05-router.md) (4), [39](../parte-2/39-ssr-ottimizzato.md) (4), [16](../parte-2/16-cms-rendering.md) (3), [19](../parte-2/19-state-management.md) (3) e altri 16

## I

### Injection token

Chiave DI non legata a una classe: `InjectionToken<T>` ha una descrizione usata solo per debug e, se al costruttore si passano `options`, un `ɵprov` con `providedIn` che vale `'root'` per default. Due istanze con la stessa descrizione sono token diversi. In Spartacus sono token DI, tra gli altri, la configurazione globale e i normalizer OCC.

- Capitolo principale: [01 — Dependency Injection in Angular e in Spartacus](../parte-1/01-dependency-injection.md)
- Riferimenti: `angular:packages/core/src/di/injection_token.ts:L110-L116`, `angular:packages/core/src/di/injection_token.ts:L26-L29`
- Citato in 16 capitoli; i più frequenti oltre al principale: [11](../parte-2/11-configurazione.md) (5), [14](../parte-2/14-routing.md) (5), [21](../parte-2/21-occ.md) (5), [46](../parte-2/46-util-modelli.md) (5), [05](../parte-1/05-router.md) (3), [15](../parte-2/15-cms-core.md) (3), [16](../parte-2/16-cms-rendering.md) (3), [23](../parte-2/23-user.md) (3) e altri 7

## L

### LAUNCH_CALLER

Chiave che identifica un componente aperto da `LaunchDialogService` (dialog, popover, sidebar, ma anche navigazioni); il servizio sceglie una di quattro strategie di rendering in base alla configurazione. È uno dei tipi augmentabili di storefront ([54](../parte-3/54-upgrade-safe.md)).

- Capitolo principale: [18 — Layout, breakpoint, launch dialog e accessibilità](../parte-2/18-layout-breakpoint-a11y.md)
- Riferimenti: `core-libs/storefront/layout/launch-dialog/services/launch-dialog.service.ts:L78-L97`, `core-libs/storefront/layout/launch-dialog/launch-dialog.module.ts:L18-L41`
- Citato in 12 capitoli; i più frequenti oltre al principale: [31](../parte-2/31-quote-ticketing-subscription.md) (8), [54](../parte-3/54-upgrade-safe.md) (7), [25](../parte-2/25-cart.md) (4), [29](../parte-2/29-asm.md) (4), [32](../parte-2/32-pickup-storefinder-delivery.md) (4), [30](../parte-2/30-product-configurator.md) (2), [34](../parte-2/34-integration-cdc-cdp-cds.md) (2), [24](../parte-2/24-product-search.md) (1) e altri 3

### LayoutConfig

Configurazione che dice quali slot CMS mostrare in ogni sezione (header, footer, …) o page template, eventualmente diversi per breakpoint, più i breakpoint stessi, la strategia di deferred loading e la configurazione dei dialog (`launch`). Il design adattivo è per breakpoint: il DOM viene (ri)renderizzato, non nascosto via CSS.

- Capitolo principale: [18 — Layout, breakpoint, launch dialog e accessibilità](../parte-2/18-layout-breakpoint-a11y.md)
- Riferimenti: `core-libs/storefront/layout/config/layout-config.ts:L90-L125`, `core-libs/storefront/layout/config/layout-config.ts:L84-L89`
- Citato in 12 capitoli; i più frequenti oltre al principale: [16](../parte-2/16-cms-rendering.md) (7), [51](../parte-3/51-ricette-cms-outlet-layout.md) (7), [17](../parte-2/17-outlet.md) (5), [29](../parte-2/29-asm.md) (4), [27](../parte-2/27-order.md) (3), [30](../parte-2/30-product-configurator.md) (3), [26](../parte-2/26-checkout.md) (2), [32](../parte-2/32-pickup-storefinder-delivery.md) (2) e altri 3

### LoaderState

Forma generica di una cella di stato NgRx caricata dal backend: `{ loading?, error?, success?, value? }`, con stato iniziale a flag `false` e `value: undefined`. È gestita dall'higher-order reducer `loaderReducer`, che interpreta `action.meta` invece di `action.type`.

- Capitolo principale: [19 — State management: NgRx, loader/entity/process state](../parte-2/19-state-management.md)
- Riferimenti: `core-libs/core/src/state/utils/loader/loader-state.ts:L7-L12`, `core-libs/core/src/state/utils/loader/loader.reducer.ts:L11-L16`
- Citato in 6 capitoli; i più frequenti oltre al principale: [30](../parte-2/30-product-configurator.md) (2), [32](../parte-2/32-pickup-storefinder-delivery.md) (2), [15](../parte-2/15-cms-core.md) (1), [23](../parte-2/23-user.md) (1), [29](../parte-2/29-asm.md) (1)

### LoggerService

Servizio `providedIn: 'root'` che delega al `console` ed è pensato come extension point per redirigere i log; in SSR è sostituito da una versione server.

- Capitolo principale: [41 — Errori HTTP, error handling, logger e global message](../parte-2/41-errori-global-message.md)
- Riferimenti: `core-libs/core/src/logger/logger.service.ts:L9-L22`, `core-libs/setup/ssr/logger/services/server-logger-service-factory.ts:L12-L17`
- Citato in 10 capitoli; i più frequenti oltre al principale: [39](../parte-2/39-ssr-ottimizzato.md) (18), [07](../parte-1/07-ssr-hydration-transferstate.md) (4), [37](../parte-2/37-i18n.md) (4), [11](../parte-2/11-configurazione.md) (2), [12](../parte-2/12-feature-module-lazy.md) (2), [46](../parte-2/46-util-modelli.md) (2), [20](../parte-2/20-facade-command-query-eventi.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1) e altri 1

## M

### Migrazione (ng update)

Trasformazione eseguita da `ng update` per adattare il codice del cliente ai breaking change: `ng-update.migrations` del `package.json` di `@spartacus/schematics` punta a `migrations.json`, che allo SHA contiene 25 voci per quattro versioni. Gli upgrade più invasivi sono affidati a schematics di modernizzazione lanciati a mano (`modernize-app-*`).

- Capitolo principale: [43 — Schematics e migrazioni di Spartacus](../parte-2/43-schematics-migrazioni.md)
- Riferimenti: `core-libs/schematics/package.json:L46-L47`, `core-libs/schematics/src/migrations/migrations.json:L3-L127`
- Citato in 16 capitoli; i più frequenti oltre al principale: [08](../parte-1/08-schematics-builder.md) (147), [54](../parte-3/54-upgrade-safe.md) (94), [44](../parte-2/44-test-tooling.md) (16), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (15), [04](../parte-1/04-change-detection-zone-signals.md) (11), [42](../parte-2/42-feature-toggle-deprecazioni.md) (10), [07](../parte-1/07-ssr-hydration-transferstate.md) (7), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) e altri 7

### MODULE_INITIALIZER

Hook di inizializzazione per moduli lazy: fa per un modulo lazy ciò che `APP_INITIALIZER` fa per l'app. Se il modulo è eager viene eseguito in un `APP_INITIALIZER`, se è lazy alla creazione del modulo ([01](../parte-1/01-dependency-injection.md)).

- Capitolo principale: [12 — Feature module e lazy loading in Spartacus](../parte-2/12-feature-module-lazy.md)
- Riferimenti: `core-libs/core/src/lazy-loading/tokens.ts:L9-L20`
- Citato in 12 capitoli; i più frequenti oltre al principale: [10](../parte-2/10-bootstrap-inizializzazione.md) (13), [03](../parte-1/03-lazy-loading.md) (12), [01](../parte-1/01-dependency-injection.md) (11), [17](../parte-2/17-outlet.md) (7), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (5), [25](../parte-2/25-cart.md) (4), [51](../parte-3/51-ricette-cms-outlet-layout.md) (3), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (2) e altri 3

### Multi provider

Provider con `multi: true`: l'injector crea un record unico per il token e vi accumula i provider, per cui l'ordine di registrazione diventa l'ordine dell'array finale. Un multi token si ferma al primo injector che ha il record, quindi i multi provider registrati in moduli lazy non si vedono dal root: Spartacus li raccoglie da tutti gli injector con `UnifiedInjector.getMulti`. Converter, interceptor HTTP e chunk di configurazione sono multi provider.

- Capitolo principale: [01 — Dependency Injection in Angular e in Spartacus](../parte-1/01-dependency-injection.md)
- Riferimenti: `angular:packages/core/src/di/r3_injector.ts:L497-L512`, `angular:packages/core/src/di/r3_injector.ts:L347-L371`, `core-libs/core/src/lazy-loading/unified-injector.ts:L79-L93`
- Citato in 30 capitoli; i più frequenti oltre al principale: [52](../parte-3/52-ricette-occ-dati.md) (15), [50](../parte-3/50-ricette-config-di.md) (10), [41](../parte-2/41-errori-global-message.md) (9), [46](../parte-2/46-util-modelli.md) (9), [15](../parte-2/15-cms-core.md) (6), [21](../parte-2/21-occ.md) (6), [35](../parte-2/35-integration-opf-payments.md) (6), [06](../parte-1/06-httpclient-interceptor.md) (5) e altri 21

## N

### NodeInjector

Injector dell'albero degli elementi: ogni componente/direttiva ne ha uno legato a `(tNode, lView)`. La ricerca risale i node injector (con un bloom filter) e infine ricade sull'environment injector; `Self`/`Host` limitano la risalita e impediscono il fallback.

- Capitolo principale: [01 — Dependency Injection in Angular e in Spartacus](../parte-1/01-dependency-injection.md)
- Riferimenti: `angular:packages/core/src/render3/di.ts:L893-L908`, `angular:packages/core/src/render3/di.ts:L407-L439`
- Citato in 1 capitoli

## O

### OCC

Omni Commerce Connect, l'API REST di SAP Commerce Cloud. Il "livello OCC" di Spartacus separa la logica di dominio dal formato delle chiamate HTTP con adapter astratti e connector, endpoint configurabili, converter impilabili e scope di caricamento.

- Capitolo principale: [21 — Livello OCC: adapter, connector, converter, endpoint](../parte-2/21-occ.md)
- Riferimenti: `core-libs/core/src/occ/services/occ-endpoints.service.ts:L111-L150`, `core-libs/core/src/occ/adapters/product/occ-product.adapter.ts:L54-L59`
- Citato in 38 capitoli; i più frequenti oltre al principale: [23](../parte-2/23-user.md) (30), [52](../parte-3/52-ricette-occ-dati.md) (26), [31](../parte-2/31-quote-ticketing-subscription.md) (24), [22](../parte-2/22-auth.md) (21), [34](../parte-2/34-integration-cdc-cdp-cds.md) (19), [46](../parte-2/46-util-modelli.md) (19), [15](../parte-2/15-cms-core.md) (16), [24](../parte-2/24-product-search.md) (16) e altri 29

### OccEndpoints

Interfaccia della configurazione `backend.occ.endpoints`, in cui ogni voce è un template di URL o una mappa scope → template (`OccEndpoint`). È un tipo augmentabile: le feature lib la estendono via module augmentation di `@spartacus/core`.

- Capitolo principale: [21 — Livello OCC: adapter, connector, converter, endpoint](../parte-2/21-occ.md)
- Riferimenti: `core-libs/core/src/occ/occ-models/occ-endpoints.model.ts:L21-L33`, `core-libs/core/public_api.ts:L50-L51`, `feature-libs/cart/base/occ/model/occ-cart-endpoints.model.ts:L97-L98`
- Citato in 11 capitoli; i più frequenti oltre al principale: [52](../parte-3/52-ricette-occ-dati.md) (11), [25](../parte-2/25-cart.md) (4), [10](../parte-2/10-bootstrap-inizializzazione.md) (2), [27](../parte-2/27-order.md) (2), [31](../parte-2/31-quote-ticketing-subscription.md) (2), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2), [54](../parte-3/54-upgrade-safe.md) (2), [23](../parte-2/23-user.md) (1) e altri 2

### OptimizedSsrEngine

Wrapper di `@spartacus/setup/ssr` attorno alla funzione view-engine Express che aggiunge timeout con fallback CSR, limite di concorrenza, cache in memoria dei render, rendering strategy per richiesta, condivisione di un render tra richieste identiche e protezione dai render appesi. Le opzioni e i loro default sono in `SsrOptimizationOptions`.

- Capitolo principale: [39 — SSR ottimizzato](../parte-2/39-ssr-ottimizzato.md)
- Riferimenti: `core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts:L37-L57`, `core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts:L18-L181`
- Citato in 3 capitoli; i più frequenti oltre al principale: [07](../parte-1/07-ssr-hydration-transferstate.md) (6), [47](../parte-2/47-app-demo.md) (6)

### Outlet

Punto nominato in un template in cui l'applicazione può inserire contenuto prima, dopo o al posto di quello di default (`OutletPosition`: `before`, `after`, `replace`), senza fare fork dei template. Si dichiara con `[cxOutlet]`, si registra con `[cxOutletRef]` o con `provideOutlet()`; il registro è `OutletService`. Storefront, layout di pagina, slot e componenti CMS sono tutti avvolti in outlet.

- Capitolo principale: [17 — Outlet](../parte-2/17-outlet.md)
- Riferimenti: `core-libs/storefront/cms-structure/outlet/outlet.model.ts:L9-L13`, `core-libs/storefront/cms-structure/outlet/outlet.service.ts:L10-L18`, `core-libs/storefront/cms-structure/outlet/outlet.providers.ts:L34-L47`
- Citato in 41 capitoli; i più frequenti oltre al principale: [51](../parte-3/51-ricette-cms-outlet-layout.md) (227), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (64), [18](../parte-2/18-layout-breakpoint-a11y.md) (62), [32](../parte-2/32-pickup-storefinder-delivery.md) (48), [16](../parte-2/16-cms-rendering.md) (36), [47](../parte-2/47-app-demo.md) (29), [28](../parte-2/28-organization-b2b.md) (25), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (25) e altri 32

## P

### Page layout

Disposizione degli slot di una pagina: `PageLayoutComponent` (`cx-page-layout`) calcola nome del layout e slot e rende un outlet e un `cx-page-slot` per slot; `PageLayoutService` risolve quali slot mostrare e in che ordine da `LayoutConfig`, in base a page template, sezione e breakpoint.

- Capitolo principale: [16 — CMS (storefront): rendering dinamico delle pagine](../parte-2/16-cms-rendering.md)
- Riferimenti: `core-libs/storefront/cms-structure/page/page-layout/page-layout.service.ts:L54-L80`
- Citato in 16 capitoli; i più frequenti oltre al principale: [30](../parte-2/30-product-configurator.md) (10), [51](../parte-3/51-ricette-cms-outlet-layout.md) (9), [14](../parte-2/14-routing.md) (5), [18](../parte-2/18-layout-breakpoint-a11y.md) (4), [25](../parte-2/25-cart.md) (4), [05](../parte-1/05-router.md) (3), [10](../parte-2/10-bootstrap-inizializzazione.md) (2), [15](../parte-2/15-cms-core.md) (2) e altri 7

### PageContext

Contesto che identifica una pagina CMS: `{ id: string; type?: PageType }`, con gli id speciali `HOME_PAGE_CONTEXT` e `SMART_EDIT_CONTEXT`; `PageType` vale `ContentPage`, `ProductPage`, `CategoryPage` o `CatalogPage`. È calcolato da un serializer custom del router-state NgRx ([14](../parte-2/14-routing.md)).

- Capitolo principale: [15 — CMS (core): pagine, slot, componenti, caricamento](../parte-2/15-cms-core.md)
- Riferimenti: `core-libs/core/src/routing/models/page-context.model.ts:L15-L30`, `core-libs/core/src/model/cms.model.ts:L38-L42`
- Citato in 5 capitoli; i più frequenti oltre al principale: [14](../parte-2/14-routing.md) (27), [51](../parte-3/51-ricette-cms-outlet-layout.md) (9), [05](../parte-1/05-router.md) (7), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1)

### PageMetaResolver

Resolver dei meta di pagina (`PageMeta`: title, heading, description, robots, image, breadcrumbs, canonical). `PageMetaService` sceglie tra più `PageMetaResolver` quello con lo score migliore per tipo, template e uid della pagina; il resolver espone metodi `resolve*` che restituiscono `Observable` e una configurazione decide quale metodo alimenta quale proprietà.

- Capitolo principale: [40 — SEO e PWA](../parte-2/40-seo-pwa.md)
- Riferimenti: `core-libs/core/src/cms/page/page-meta.resolver.ts:L31-L45`, `core-libs/core/src/cms/page/config/default-page-meta.config.ts:L9-L40`
- Citato in 10 capitoli; i più frequenti oltre al principale: [52](../parte-3/52-ricette-occ-dati.md) (18), [24](../parte-2/24-product-search.md) (7), [31](../parte-2/31-quote-ticketing-subscription.md) (6), [28](../parte-2/28-organization-b2b.md) (4), [26](../parte-2/26-checkout.md) (3), [51](../parte-3/51-ricette-cms-outlet-layout.md) (3), [15](../parte-2/15-cms-core.md) (2), [46](../parte-2/46-util-modelli.md) (2) e altri 1

### PendingTasks

API pubblica di Angular che tiene traccia dei task che bloccano la stabilità dell'applicazione; in v21 `ApplicationRef.isStable` deriva dal contatore di `PendingTasksInternal`, ed è ciò che l'SSR attende prima di serializzare. Spartacus la usa per tenere aperta la stabilità durante l'`import()` dinamico dei componenti CMS lazy.

- Capitolo principale: [04 — Change detection, Zone, zoneless e signals](../parte-1/04-change-detection-zone-signals.md)
- Riferimenti: `angular:packages/core/src/pending_tasks.ts:L18-L42`, `angular:packages/core/src/application/application_ref.ts:L326-L334`, `core-libs/storefront/cms-structure/page/component/handlers/lazy-component.handler.ts:L60-L71`
- Citato in 8 capitoli; i più frequenti oltre al principale: [07](../parte-1/07-ssr-hydration-transferstate.md) (16), [03](../parte-1/03-lazy-loading.md) (6), [16](../parte-2/16-cms-rendering.md) (6), [06](../parte-1/06-httpclient-interceptor.md) (3), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (2), [12](../parte-2/12-feature-module-lazy.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1)

### Process state

`ProcessesLoaderState` aggiunge a `LoaderState` il contatore `processesCount` (stabile = nessun processo e nessun caricamento). `ProcessModule` registra la feature NgRx generica `process`, un `EntityLoaderState` indicizzato per process id, per tracciare operazioni "fire and forget" senza una slice dedicata per ognuna.

- Capitolo principale: [19 — State management: NgRx, loader/entity/process state](../parte-2/19-state-management.md)
- Riferimenti: `core-libs/core/src/state/utils/processes-loader/processes-loader-state.ts:L9-L11`, `core-libs/core/src/process/store/process-store.module.ts:L13-L17`, `core-libs/core/src/state/utils/processes-loader/processes-loader.selectors.ts:L9-L17`
- Citato in 7 capitoli; i più frequenti oltre al principale: [25](../parte-2/25-cart.md) (12), [30](../parte-2/30-product-configurator.md) (4), [27](../parte-2/27-order.md) (3), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (2), [28](../parte-2/28-organization-b2b.md) (1), [42](../parte-2/42-feature-toggle-deprecazioni.md) (1)

### provideConfig / provideDefaultConfig

Helper che producono i provider dei chunk di configurazione: `provideConfig` registra un `ValueProvider` su `ConfigChunk` (o su `DefaultConfigChunk` se `defaultConfig`), `provideDefaultConfig` su `DefaultConfigChunk`; le varianti `*Factory` producono un `FactoryProvider`. Una regola ESLint di workspace vieta `provideConfig()` nei file `**/*.module.ts` delle librerie.

- Capitolo principale: [11 — Configurazione: provideConfig, default, merge, validator, initializer](../parte-2/11-configurazione.md)
- Riferimenti: `core-libs/core/src/config/config-providers.ts:L18-L27`, `core-libs/core/src/config/config-providers.ts:L55-L61`, `core-libs/core/src/config/config-providers.ts:L69-L79`
- Citato in 45 capitoli; i più frequenti oltre al principale: [50](../parte-3/50-ricette-config-di.md) (41), [01](../parte-1/01-dependency-injection.md) (32), [51](../parte-3/51-ricette-cms-outlet-layout.md) (29), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (27), [52](../parte-3/52-ricette-occ-dati.md) (19), [54](../parte-3/54-upgrade-safe.md) (19), [42](../parte-2/42-feature-toggle-deprecazioni.md) (18), [47](../parte-2/47-app-demo.md) (15) e altri 36

### public_api

File indicato come `entryFile` nell'`ng-package.json` di ogni pacchetto o entry point: ciò che è raggiungibile da lì è la superficie pubblica coperta dal versionamento semantico. Il resto, anche se `export`ato in un file sorgente, è implementazione e può cambiare senza preavviso.

- Capitolo principale: [54 — API pubblica vs interna, upgrade, anti-pattern, checklist](../parte-3/54-upgrade-safe.md)
- Riferimenti: `core-libs/core/ng-package.json:L1-L7`, `core-libs/core/public_api.ts:L7-L36`
- Citato in 45 capitoli; i più frequenti oltre al principale: [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (70), [52](../parte-3/52-ricette-occ-dati.md) (55), [50](../parte-3/50-ricette-config-di.md) (34), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (24), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (22), [51](../parte-3/51-ricette-cms-outlet-layout.md) (19), [10](../parte-2/10-bootstrap-inizializzazione.md) (15), [34](../parte-2/34-integration-cdc-cdp-cds.md) (15) e altri 36

## R

### Root module (feature lib)

Modulo piccolo di una feature lib (es. `CartBaseRootModule`), importato eager, che dichiara quali componenti CMS la feature copre. Le facade astratte vivono nello stesso entry point `root` come classi `providedIn: 'root'` con factory `facadeFactory`.

- Capitolo principale: [12 — Feature module e lazy loading in Spartacus](../parte-2/12-feature-module-lazy.md)
- Riferimenti: `feature-libs/cart/base/root/cart-base-root.module.ts:L77-L81`, `feature-libs/cart/base/root/facade/active-cart.facade.ts:L13-L16`
- Citato in 23 capitoli; i più frequenti oltre al principale: [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (17), [35](../parte-2/35-integration-opf-payments.md) (13), [24](../parte-2/24-product-search.md) (5), [32](../parte-2/32-pickup-storefinder-delivery.md) (5), [25](../parte-2/25-cart.md) (4), [26](../parte-2/26-checkout.md) (4), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (4), [34](../parte-2/34-integration-cdc-cdp-cds.md) (4) e altri 14

### Route semantica

Meccanismo che toglie gli URL dal codice dei componenti: `RoutingConfig.routing.routes` è un dizionario nome route → `{ paths, matchers, paramsMapping, ... }`; le route Angular dichiarano solo il nome in `data.cxRoute` e all'avvio `ConfigurableRoutesService` ne riscrive `path`/`matcher`. I link si generano con i comandi `{ cxRoute, params }`, tradotti da `SemanticPathService` e dalla pipe `cxUrl`.

- Capitolo principale: [14 — Routing: route semantiche, URL, page guard, contesto](../parte-2/14-routing.md)
- Riferimenti: `core-libs/core/src/routing/configurable-routes/routes-config.ts:L16-L57`, `core-libs/core/src/routing/configurable-routes/configurable-routes.service.ts:L77-L109`, `core-libs/core/src/routing/configurable-routes/url-translation/semantic-path.service.ts:L41-L68`
- Citato in 26 capitoli; i più frequenti oltre al principale: [51](../parte-3/51-ricette-cms-outlet-layout.md) (12), [05](../parte-1/05-router.md) (11), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (9), [30](../parte-2/30-product-configurator.md) (8), [18](../parte-2/18-layout-breakpoint-a11y.md) (7), [28](../parte-2/28-organization-b2b.md) (7), [31](../parte-2/31-quote-ticketing-subscription.md) (6), [20](../parte-2/20-facade-command-query-eventi.md) (5) e altri 17

## S

### Schematics

Trasformazioni di codice su un file system virtuale, motore di `ng add`, `ng generate` e `ng update` ([08](../parte-1/08-schematics-builder.md)). Il pacchetto `@spartacus/schematics` le usa per installare Spartacus in un'app Angular, per i generatori di supporto e per le migrazioni; le sue utility servono agli schematics delle altre librerie ma non sono API pubblica.

- Capitolo principale: [43 — Schematics e migrazioni di Spartacus](../parte-2/43-schematics-migrazioni.md)
- Riferimenti: `core-libs/schematics/package.json:L43-L89`, `core-libs/schematics/index.ts:L7-L13`
- Citato in 34 capitoli; i più frequenti oltre al principale: [08](../parte-1/08-schematics-builder.md) (490), [44](../parte-2/44-test-tooling.md) (64), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (55), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (49), [34](../parte-2/34-integration-cdc-cdp-cds.md) (48), [54](../parte-3/54-upgrade-safe.md) (48), [31](../parte-2/31-quote-ticketing-subscription.md) (41), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (34) e altri 25

### SERVER_REQUEST_URL / WindowRef

`SERVER_REQUEST_URL` e `SERVER_REQUEST_ORIGIN` sono i token con cui Spartacus espone URL e origin della richiesta in SSR; li consuma `WindowRef`, che in SSR restituisce una `location` parziale con solo `href` e `origin` e lancia un errore se i token mancano.

- Capitolo principale: [07 — SSR, hydration e TransferState](../parte-1/07-ssr-hydration-transferstate.md)
- Riferimenti: `core-libs/core/src/util/ssr.tokens.ts:L9-L21`, `core-libs/core/src/window/window-ref.ts:L19-L27`, `core-libs/core/src/window/window-ref.ts:L62-L89`
- Citato in 16 capitoli; i più frequenti oltre al principale: [46](../parte-2/46-util-modelli.md) (22), [13](../parte-2/13-site-context-theme.md) (9), [45](../parte-2/45-componenti-storefront.md) (5), [40](../parte-2/40-seo-pwa.md) (3), [19](../parte-2/19-state-management.md) (2), [34](../parte-2/34-integration-cdc-cdp-cds.md) (2), [47](../parte-2/47-app-demo.md) (2), [14](../parte-2/14-routing.md) (1) e altri 7

### Site context

Sottosistema di `@spartacus/core` che mantiene la terna attiva base site / lingua / valuta, la inizializza (URL → `localStorage` → default di config), la codifica nell'URL e la propaga a router, HTTP e UI. È guidato dalla chiave di configurazione `context`, in cui il default di ogni parametro è il primo elemento del suo array.

- Capitolo principale: [13 — Site context e site theme](../parte-2/13-site-context-theme.md)
- Riferimenti: `core-libs/core/src/site-context/providers/context-ids.ts:L7-L10`, `core-libs/core/src/site-context/config/site-context-config.ts:L10-L19`, `core-libs/core/src/site-context/config/context-config-utils.ts:L28-L34`
- Citato in 26 capitoli; i più frequenti oltre al principale: [10](../parte-2/10-bootstrap-inizializzazione.md) (29), [06](../parte-1/06-httpclient-interceptor.md) (16), [21](../parte-2/21-occ.md) (16), [45](../parte-2/45-componenti-storefront.md) (15), [11](../parte-2/11-configurazione.md) (14), [05](../parte-1/05-router.md) (12), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (10), [37](../parte-2/37-i18n.md) (8) e altri 17

### Slot

Area di una pagina CMS che contiene componenti. Nel modello normalizzato lo slot porta solo riferimenti leggeri ai componenti (`uid`, `typeCode`, `flexType`, `properties`), mentre i dati completi stanno in un ramo separato dello store indicizzato per `uid`. Lato storefront ogni slot è reso da `PageSlotComponent` ([16](../parte-2/16-cms-rendering.md)).

- Capitolo principale: [15 — CMS (core): pagine, slot, componenti, caricamento](../parte-2/15-cms-core.md)
- Riferimenti: `core-libs/core/src/cms/model/content-slot-component-data.model.ts:L7-L12`, `core-libs/core/src/cms/store/cms-state.ts:L22-L62`
- Citato in 22 capitoli; i più frequenti oltre al principale: [16](../parte-2/16-cms-rendering.md) (122), [51](../parte-3/51-ricette-cms-outlet-layout.md) (47), [17](../parte-2/17-outlet.md) (36), [18](../parte-2/18-layout-breakpoint-a11y.md) (25), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (19), [04](../parte-1/04-change-detection-zone-signals.md) (6), [30](../parte-2/30-product-configurator.md) (6), [32](../parte-2/32-pickup-storefinder-delivery.md) (5) e altri 13

### SSR (Server-Side Rendering)

L'applicazione viene avviata in Node su una platform server con DOM emulato, si attende che diventi stabile e il DOM viene serializzato in HTML. Spartacus usa il `CommonEngine` di `@angular/ssr/node` avvolto in `CxCommonEngine` e in un `ngExpressEngine`, ed espone URL e origin della richiesta con i token `SERVER_REQUEST_URL` / `SERVER_REQUEST_ORIGIN`.

- Capitolo principale: [07 — SSR, hydration e TransferState](../parte-1/07-ssr-hydration-transferstate.md)
- Riferimenti: `angular:packages/platform-server/src/utils.ts:L342-L380`, `core-libs/setup/ssr/engine/cx-common-engine.ts:L7-L23`, `core-libs/core/src/util/ssr.tokens.ts:L9-L21`
- Citato in 41 capitoli; i più frequenti oltre al principale: [44](../parte-2/44-test-tooling.md) (36), [41](../parte-2/41-errori-global-message.md) (26), [39](../parte-2/39-ssr-ottimizzato.md) (24), [46](../parte-2/46-util-modelli.md) (21), [04](../parte-1/04-change-detection-zone-signals.md) (20), [16](../parte-2/16-cms-rendering.md) (20), [37](../parte-2/37-i18n.md) (19), [47](../parte-2/47-app-demo.md) (18) e altri 32

## T

### Tipi augmentabili

Tipi pensati per la module augmentation, riesportati per nome nei blocchi `AUGMENTABLE_TYPES_START`…`_END` dei `public_api.ts` (in core, ad esempio `Config`, `Product`, `OccEndpoints`; in storefront `ICON_TYPE`, `BREAKPOINT`, `LAUNCH_CALLER`). Le librerie stesse li estendono e aggiungono i valori runtime degli enum con un cast; i `const enum` sono vietati da una regola ESLint.

- Capitolo principale: [54 — API pubblica vs interna, upgrade, anti-pattern, checklist](../parte-3/54-upgrade-safe.md)
- Riferimenti: `core-libs/core/public_api.ts:L38-L58`, `core-libs/storefront/public_api.ts:L32-L36`, `feature-libs/checkout/b2b/root/model/augmented-types.ts:L11-L23`
- Citato in 41 capitoli; i più frequenti oltre al principale: [52](../parte-3/52-ricette-occ-dati.md) (46), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (21), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (20), [46](../parte-2/46-util-modelli.md) (18), [26](../parte-2/26-checkout.md) (16), [18](../parte-2/18-layout-breakpoint-a11y.md) (15), [32](../parte-2/32-pickup-storefinder-delivery.md) (15), [08](../parte-1/08-schematics-builder.md) (12) e altri 32

### TransferState

Dizionario chiave→valore JSON che il server serializza in `<script id="ng-state">` e il browser rilegge al bootstrap. Spartacus vi trasferisce lo state NgRx (non le risposte HTTP) con un meta-reducer, sotto la chiave `cx-state`, e per questo disattiva la HTTP transfer cache di Angular con `withNoHttpTransferCache()`.

- Capitolo principale: [07 — SSR, hydration e TransferState](../parte-1/07-ssr-hydration-transferstate.md)
- Riferimenti: `angular:packages/core/src/transfer_state.ts:L66-L79`, `core-libs/core/src/state/reducers/transfer-state.reducer.ts:L16-L16`, `projects/storefrontapp/src/app/app.config.ts:L29-L29`
- Citato in 20 capitoli; i più frequenti oltre al principale: [19](../parte-2/19-state-management.md) (29), [15](../parte-2/15-cms-core.md) (6), [13](../parte-2/13-site-context-theme.md) (5), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (4), [39](../parte-2/39-ssr-ottimizzato.md) (4), [06](../parte-1/06-httpclient-interceptor.md) (3), [03](../parte-1/03-lazy-loading.md) (2), [04](../parte-1/04-change-detection-zone-signals.md) (2) e altri 11

## U

### UnifiedInjector

Ponte fra il DI di Angular e i moduli lazy di Spartacus: `injectors$` emette il root injector e poi l'injector di ogni modulo lazy inizializzato; `get` interroga il root normalmente e gli altri con `{self: true}`; `getMulti` accumula gli array di un multi token da tutti gli injector. Così i servizi del root vedono multi provider e config chunk registrati in moduli caricati più tardi.

- Capitolo principale: [01 — Dependency Injection in Angular e in Spartacus](../parte-1/01-dependency-injection.md)
- Riferimenti: `core-libs/core/src/lazy-loading/unified-injector.ts:L32-L35`, `core-libs/core/src/lazy-loading/unified-injector.ts:L52-L68`, `core-libs/core/src/lazy-loading/unified-injector.ts:L79-L93`
- Citato in 20 capitoli; i più frequenti oltre al principale: [03](../parte-1/03-lazy-loading.md) (13), [12](../parte-2/12-feature-module-lazy.md) (11), [11](../parte-2/11-configurazione.md) (4), [16](../parte-2/16-cms-rendering.md) (4), [21](../parte-2/21-occ.md) (4), [28](../parte-2/28-organization-b2b.md) (4), [40](../parte-2/40-seo-pwa.md) (4), [50](../parte-3/50-ricette-config-di.md) (4) e altri 11

## Z

### Zoneless

Modalità di change detection senza Zone.js: sono le API Angular (`markForCheck`, `setInput`, listener, signal letti in template, effect…) a notificare uno scheduler che pianifica un tick. Dalla v21 è il default di Angular, ma la demo Spartacus fornisce esplicitamente `provideZoneChangeDetection({ eventCoalescing: true })`, quindi gira con Zone.

- Capitolo principale: [04 — Change detection, Zone, zoneless e signals](../parte-1/04-change-detection-zone-signals.md)
- Riferimenti: `angular:packages/core/src/application/create_application.ts:L64-L71`, `projects/storefrontapp/src/app/app.config.ts:L26-L33`
- Citato in 4 capitoli; i più frequenti oltre al principale: [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (16), [06](../parte-1/06-httpclient-interceptor.md) (1), [07](../parte-1/07-ssr-hydration-transferstate.md) (1)

## Candidati ricorrenti non definiti

Termini in grassetto o in backtick che compaiono in almeno 6 capitoli e non sono coperti da una voce del glossario (estrazione automatica, senza definizione). I simboli dichiarati nel codice sono descritti in [A12](A12-indice-simboli.md).

| Termine | Fonte | Capitoli |
|---|---|---:|
| `Config` | backtick | 34 |
| `forRoot()` | backtick | 24 |
| `inject()` | backtick | 18 |
| `BehaviorSubject` | backtick | 17 |
| `EMPTY` | backtick | 16 |
| `TypeError` | backtick | 15 |
| `RoutingConfig` | backtick | 14 |
| `AppModule` | backtick | 12 |
| `ReplaySubject` | backtick | 12 |
| `UrlTree` | backtick | 12 |
| `import()` | backtick | 11 |
| `ModuleWithProviders` | backtick | 11 |
| `SpartacusFeaturesModule` | backtick | 11 |
| `ConfigurationService` | backtick | 10 |
| `getActive()` | backtick | 10 |
| `Injector` | backtick | 10 |
| `Map` | backtick | 10 |
| `AuthGuard` | backtick | 9 |
| `CxEvent` | backtick | 9 |
| `initialize()` | backtick | 9 |
| `SpartacusModule` | backtick | 9 |
| `USE_CLIENT_TOKEN` | backtick | 9 |
| `AppRoutingModule` | backtick | 8 |
| `BEFORE_CMS_PAGE_GUARD` | backtick | 8 |
| `CmsComponentsService` | backtick | 8 |
| `CmsConfig` | backtick | 8 |
| `CmsFeaturesService` | backtick | 8 |
| `ComponentFactoryResolver` | backtick | 8 |
| `DefaultConfig` | backtick | 8 |
| eager | grassetto | 8 |
| `Error` | backtick | 8 |
| `getBaseUrl()` | backtick | 8 |
| `LANGUAGE_CHANGE` | backtick | 8 |
| `LaunchDialogService` | backtick | 8 |
| `NgModuleRef` | backtick | 8 |
| `R3Injector` | backtick | 8 |
| `RootConfig` | backtick | 8 |
| `Router` | backtick | 8 |
| `SERVER_REQUEST_ORIGIN` | backtick | 8 |
| `ActionsSubject` | backtick | 7 |
| `CartBaseModule` | backtick | 7 |
| `CmsRoutesImplService` | backtick | 7 |
| `FeatureModuleConfig` | backtick | 7 |
| `HttpErrorInterceptor` | backtick | 7 |
| `isDevMode()` | backtick | 7 |
| `LazyModulesService` | backtick | 7 |
| `LOCATION_INITIALIZED` | backtick | 7 |
| `LOCATION_INITIALIZED_MULTI` | backtick | 7 |
| `NavigationEnd` | backtick | 7 |
| `OrderEntry` | backtick | 7 |
| `PageSlotComponent` | backtick | 7 |
| `Renderer2` | backtick | 7 |
| `StorefrontComponent` | backtick | 7 |
| `Subject` | backtick | 7 |
| `APP_BOOTSTRAP_LISTENER` | backtick | 6 |
| `CancelPrevious` | backtick | 6 |
| `CART_BASE_FEATURE` | backtick | 6 |
| `CartBaseWrapperModule` | backtick | 6 |
| `ComponentFactory` | backtick | 6 |
| `ComponentRef` | backtick | 6 |
| `ComponentWrapperDirective` | backtick | 6 |
| `ConfigInitializer` | backtick | 6 |
| `ConfigInitializerService` | backtick | 6 |
| `CURRENCY_CHANGE` | backtick | 6 |
| `ENVIRONMENT_INITIALIZER` | backtick | 6 |
| `ErrorHandler` | backtick | 6 |
| `FeatureModulesService` | backtick | 6 |
| `get()` | backtick | 6 |
| `GuardsComposer` | backtick | 6 |
| `HttpClient` | backtick | 6 |
| `init()` | backtick | 6 |
| lazy | grassetto | 6 |
| `LazyComponentHandler` | backtick | 6 |
| `LoginEvent` | backtick | 6 |
| `LOGOUT` | backtick | 6 |
| `LogoutEvent` | backtick | 6 |
| `OccConfig` | backtick | 6 |
| `OccEndpointsService` | backtick | 6 |
| `OrderModule` | backtick | 6 |
| `OrderWrapperModule` | backtick | 6 |
| `PageMetaService` | backtick | 6 |
| `Product` | backtick | 6 |
| redux devtools | grassetto | 6 |
| `Set` | backtick | 6 |
| `TestConfigModule` | backtick | 6 |
| `TranslationChunksConfig` | backtick | 6 |
| `using()` | backtick | 6 |
| `ViewContainerRef` | backtick | 6 |
| `withInterceptorsFromDi()` | backtick | 6 |

---

Legenda capitoli:

- [01](../parte-1/01-dependency-injection.md) Dependency Injection in Angular e in Spartacus
- [02](../parte-1/02-ngmodule-standalone-bootstrap.md) NgModule, standalone e bootstrap dell'applicazione
- [03](../parte-1/03-lazy-loading.md) Lazy loading: router e moduli caricati a runtime
- [04](../parte-1/04-change-detection-zone-signals.md) Change detection, Zone, zoneless e signals
- [05](../parte-1/05-router.md) Il Router di Angular
- [06](../parte-1/06-httpclient-interceptor.md) HttpClient e interceptor
- [07](../parte-1/07-ssr-hydration-transferstate.md) SSR, hydration e TransferState
- [08](../parte-1/08-schematics-builder.md) Schematics e builder
- [10](../parte-2/10-bootstrap-inizializzazione.md) Bootstrap e ordine di inizializzazione
- [11](../parte-2/11-configurazione.md) Configurazione: provideConfig, default, merge, validator, initializer
- [12](../parte-2/12-feature-module-lazy.md) Feature module e lazy loading in Spartacus
- [13](../parte-2/13-site-context-theme.md) Site context e site theme
- [14](../parte-2/14-routing.md) Routing: route semantiche, URL, page guard, contesto
- [15](../parte-2/15-cms-core.md) CMS (core): pagine, slot, componenti, caricamento
- [16](../parte-2/16-cms-rendering.md) CMS (storefront): rendering dinamico delle pagine
- [17](../parte-2/17-outlet.md) Outlet
- [18](../parte-2/18-layout-breakpoint-a11y.md) Layout, breakpoint, launch dialog e accessibilità
- [19](../parte-2/19-state-management.md) State management: NgRx, loader/entity/process state
- [20](../parte-2/20-facade-command-query-eventi.md) Facade, command & query, eventi
- [21](../parte-2/21-occ.md) Livello OCC: adapter, connector, converter, endpoint
- [22](../parte-2/22-auth.md) Autenticazione: OAuth, token, interceptor, refresh
- [23](../parte-2/23-user.md) Utente, profilo, consensi
- [24](../parte-2/24-product-search.md) Prodotto e ricerca
- [25](../parte-2/25-cart.md) Carrello
- [26](../parte-2/26-checkout.md) Checkout
- [27](../parte-2/27-order.md) Ordini
- [28](../parte-2/28-organization-b2b.md) B2B: organization
- [29](../parte-2/29-asm.md) ASM (Assisted Service Module)
- [30](../parte-2/30-product-configurator.md) Product configurator
- [31](../parte-2/31-quote-ticketing-subscription.md) Quote, customer ticketing, subscription billing
- [32](../parte-2/32-pickup-storefinder-delivery.md) Pickup in store, store finder, delivery date
- [33](../parte-2/33-tracking-smartedit-qualtrics.md) Tracking, SmartEdit, Qualtrics
- [34](../parte-2/34-integration-cdc-cdp-cds.md) Integration libs: CDC, CDP, CDS, segment-refs
- [35](../parte-2/35-integration-opf-payments.md) Integration libs: OPF, digital payments, OPPS
- [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) Integration libs: S/4, OMF, CPQ quote, punchout, EPD
- [37](../parte-2/37-i18n.md) Internazionalizzazione (i18n)
- [38](../parte-2/38-stili-theming.md) Stili e theming
- [39](../parte-2/39-ssr-ottimizzato.md) SSR ottimizzato
- [40](../parte-2/40-seo-pwa.md) SEO e PWA
- [41](../parte-2/41-errori-global-message.md) Errori HTTP, error handling, logger e global message
- [42](../parte-2/42-feature-toggle-deprecazioni.md) Feature toggle e deprecazioni
- [43](../parte-2/43-schematics-migrazioni.md) Schematics e migrazioni di Spartacus
- [44](../parte-2/44-test-tooling.md) Strategia di test e tooling del monorepo
- [45](../parte-2/45-componenti-storefront.md) Componenti CMS e shared components di storefront
- [46](../parte-2/46-util-modelli.md) Utility, window e modelli di dominio
- [47](../parte-2/47-app-demo.md) L'app demo storefrontapp
- [50](../parte-3/50-ricette-config-di.md) Ricette: configurazione, DI, interceptor, eventi
- [51](../parte-3/51-ricette-cms-outlet-layout.md) Ricette: componenti CMS, outlet, route e layout
- [52](../parte-3/52-ricette-occ-dati.md) Ricette: OCC, adapter, converter, endpoint, meta resolver
- [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) Ricette: feature lib lazy, carrello/checkout, stili, traduzioni
- [54](../parte-3/54-upgrade-safe.md) API pubblica vs interna, upgrade, anti-pattern, checklist
