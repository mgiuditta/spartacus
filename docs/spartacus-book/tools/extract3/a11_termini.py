"""Definizioni curate del glossario (appendice A11).

Ogni voce:
- term: termine (come compare nel titolo della voce);
- match: regex (Python) usata dallo script per contare in quali capitoli il termine compare;
- cs: True se la regex è case-sensitive (default False);
- main: id del capitolo principale (tools/chapters.tsv) a cui la definizione si appoggia;
- refs: riferimenti `path:Lx-Ly` COPIATI dal capitolo principale (lo script verifica che compaiano
  letteralmente nel testo del capitolo `main`);
- text: definizione di 1-3 frasi che riassume ciò che afferma il capitolo principale
  (eventuali link markdown aggiuntivi puntano ai capitoli che supportano l'affermazione relativa);
- base: True se il termine fa parte dell'elenco base richiesto.

Regola: ogni affermazione di `text` deve essere supportata dal capitolo `main` (o dal capitolo
linkato esplicitamente nel testo). Non aggiungere voci senza aver letto il capitolo.
"""

L = lambda p: f'../parte-{p}'  # noqa: E731  (solo per leggibilità dei link interni)

TERMS = [
    # ------------------------------------------------------------------ DI / Angular
    dict(term='Injection token', match=r'injection ?token|InjectionToken', main='01', base=True,
         refs=['angular:packages/core/src/di/injection_token.ts:L110-L116',
               'angular:packages/core/src/di/injection_token.ts:L26-L29'],
         text="Chiave DI non legata a una classe: `InjectionToken<T>` ha una descrizione usata solo per debug e, "
              "se al costruttore si passano `options`, un `ɵprov` con `providedIn` che vale `'root'` per default. "
              "Due istanze con la stessa descrizione sono token diversi. In Spartacus sono token DI, tra gli altri, "
              "la configurazione globale e i normalizer OCC."),
    dict(term='Multi provider', match=r'multi[- ]provider|multi: true', main='01', base=True,
         refs=['angular:packages/core/src/di/r3_injector.ts:L497-L512',
               'angular:packages/core/src/di/r3_injector.ts:L347-L371',
               'core-libs/core/src/lazy-loading/unified-injector.ts:L79-L93'],
         text="Provider con `multi: true`: l'injector crea un record unico per il token e vi accumula i provider, "
              "per cui l'ordine di registrazione diventa l'ordine dell'array finale. Un multi token si ferma al primo "
              "injector che ha il record, quindi i multi provider registrati in moduli lazy non si vedono dal root: "
              "Spartacus li raccoglie da tutti gli injector con `UnifiedInjector.getMulti`. Converter, interceptor "
              "HTTP e chunk di configurazione sono multi provider."),
    dict(term='Environment injector', match=r'environment ?injector', main='01', base=True,
         refs=['angular:packages/core/src/application/create_application.ts:L64-L79',
               'angular:packages/core/src/render3/ng_module_ref.ts:L82-L95',
               'angular:packages/core/src/render3/ng_module_ref.ts:L193-L205'],
         text="Nodo dell'albero \"environment\" degli injector (`R3Injector`): il root injector applicativo di un avvio "
              "standalone è un `EnvironmentNgModuleRefAdapter` figlio del platform injector, e gli injector dei moduli "
              "lazy sono `NgModuleRef` con scope solo `'environment'`. `createEnvironmentInjector` è l'API pubblica per "
              "crearne uno figlio. Spartacus crea i componenti dei moduli lazy usando l'injector del modulo come "
              f"environment injector ([03]({L(1)}/03-lazy-loading.md))."),
    dict(term='NodeInjector', match=r'NodeInjector', cs=True, main='01', base=True,
         refs=['angular:packages/core/src/render3/di.ts:L893-L908',
               'angular:packages/core/src/render3/di.ts:L407-L439'],
         text="Injector dell'albero degli elementi: ogni componente/direttiva ne ha uno legato a `(tNode, lView)`. "
              "La ricerca risale i node injector (con un bloom filter) e infine ricade sull'environment injector; "
              "`Self`/`Host` limitano la risalita e impediscono il fallback."),
    dict(term='APP_INITIALIZER', match=r'APP_INITIALIZER|provideAppInitializer', cs=True, main='01',
         refs=['angular:packages/core/src/application/application_init.ts:L150-L152',
               'angular:packages/core/src/application/application_init.ts:L165-L202'],
         text="`InjectionToken` di Angular per funzioni eseguite all'avvio che possono restituire Observable o Promise; "
              "`provideAppInitializer(fn)` lo avvolge in `makeEnvironmentProviders`. Il token è deprecato dalla v19 "
              "in favore di `provideAppInitializer`. Spartacus lo usa, tra l'altro, per eseguire i `CONFIG_INITIALIZER` "
              "e i `MODULE_INITIALIZER` dei moduli eager."),
    dict(term='HTTP_INTERCEPTORS', match=r'HTTP_INTERCEPTORS', cs=True, main='01',
         refs=['core-libs/core/src/auth/user-auth/http-interceptors/index.ts:L12-L23',
               'projects/storefrontapp/src/app/app.config.ts:L26-L35',
               'core-libs/core/src/base-core.module.ts:L28-L28'],
         text="Multi token su cui Spartacus registra i propri interceptor HTTP con `useExisting`; l'app demo li abilita "
              "con `provideHttpClient(withFetch(), withInterceptorsFromDi())`. Poiché l'ordine di registrazione "
              "determina l'ordine nell'array, `ErrorHandlingModule.forRoot()` è importato per primo in `BaseCoreModule`."),
    dict(term='Zoneless', match=r'zoneless', main='04', base=True,
         refs=['angular:packages/core/src/application/create_application.ts:L64-L71',
               'projects/storefrontapp/src/app/app.config.ts:L26-L33'],
         text="Modalità di change detection senza Zone.js: sono le API Angular (`markForCheck`, `setInput`, listener, "
              "signal letti in template, effect…) a notificare uno scheduler che pianifica un tick. Dalla v21 è il "
              "default di Angular, ma la demo Spartacus fornisce esplicitamente "
              "`provideZoneChangeDetection({ eventCoalescing: true })`, quindi gira con Zone."),
    dict(term='PendingTasks', match=r'PendingTasks', cs=True, main='04', base=True,
         refs=['angular:packages/core/src/pending_tasks.ts:L18-L42',
               'angular:packages/core/src/application/application_ref.ts:L326-L334',
               'core-libs/storefront/cms-structure/page/component/handlers/lazy-component.handler.ts:L60-L71'],
         text="API pubblica di Angular che tiene traccia dei task che bloccano la stabilità dell'applicazione; in v21 "
              "`ApplicationRef.isStable` deriva dal contatore di `PendingTasksInternal`, ed è ciò che l'SSR attende "
              "prima di serializzare. Spartacus la usa per tenere aperta la stabilità durante l'`import()` dinamico dei "
              "componenti CMS lazy."),
    # ------------------------------------------------------------------ SSR
    dict(term='SSR (Server-Side Rendering)', match=r'\bSSR\b|server-side rendering', cs=True, main='07', base=True,
         refs=['angular:packages/platform-server/src/utils.ts:L342-L380',
               'core-libs/setup/ssr/engine/cx-common-engine.ts:L7-L23',
               'core-libs/core/src/util/ssr.tokens.ts:L9-L21'],
         text="L'applicazione viene avviata in Node su una platform server con DOM emulato, si attende che diventi "
              "stabile e il DOM viene serializzato in HTML. Spartacus usa il `CommonEngine` di `@angular/ssr/node` "
              "avvolto in `CxCommonEngine` e in un `ngExpressEngine`, ed espone URL e origin della richiesta con i "
              "token `SERVER_REQUEST_URL` / `SERVER_REQUEST_ORIGIN`."),
    dict(term='Hydration', match=r'hydration', main='07', base=True,
         refs=['angular:packages/core/src/hydration/annotate.ts:L243-L301',
               'angular:packages/core/src/hydration/api.ts:L211-L228'],
         text="Nel browser Angular non ricostruisce da zero il DOM ricevuto dal server ma lo \"reclama\" nodo per nodo, "
              "grazie alle annotazioni (`ngh`, `__nghData__`) scritte durante il render server."),
    dict(term='TransferState', match=r'TransferState|transfer state', main='07', base=True,
         refs=['angular:packages/core/src/transfer_state.ts:L66-L79',
               'core-libs/core/src/state/reducers/transfer-state.reducer.ts:L16-L16',
               'projects/storefrontapp/src/app/app.config.ts:L29-L29'],
         text="Dizionario chiave→valore JSON che il server serializza in `<script id=\"ng-state\">` e il browser rilegge "
              "al bootstrap. Spartacus vi trasferisce lo state NgRx (non le risposte HTTP) con un meta-reducer, sotto "
              "la chiave `cx-state`, e per questo disattiva la HTTP transfer cache di Angular con "
              "`withNoHttpTransferCache()`."),
    dict(term='OptimizedSsrEngine', match=r'OptimizedSsrEngine', cs=True, main='39', base=True,
         refs=['core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts:L37-L57',
               'core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts:L18-L181'],
         text="Wrapper di `@spartacus/setup/ssr` attorno alla funzione view-engine Express che aggiunge timeout con "
              "fallback CSR, limite di concorrenza, cache in memoria dei render, rendering strategy per richiesta, "
              "condivisione di un render tra richieste identiche e protezione dai render appesi. Le opzioni e i loro "
              "default sono in `SsrOptimizationOptions`."),
    dict(term='SERVER_REQUEST_URL / WindowRef', match=r'SERVER_REQUEST_URL|WindowRef', cs=True, main='07',
         refs=['core-libs/core/src/util/ssr.tokens.ts:L9-L21',
               'core-libs/core/src/window/window-ref.ts:L19-L27',
               'core-libs/core/src/window/window-ref.ts:L62-L89'],
         text="`SERVER_REQUEST_URL` e `SERVER_REQUEST_ORIGIN` sono i token con cui Spartacus espone URL e origin della "
              "richiesta in SSR; li consuma `WindowRef`, che in SSR restituisce una `location` parziale con solo "
              "`href` e `origin` e lancia un errore se i token mancano."),
    # ------------------------------------------------------------------ Config
    dict(term='ConfigChunk / DefaultConfigChunk', match=r'\b(?:Default)?ConfigChunk\b', cs=True, main='11', base=True,
         refs=['core-libs/core/src/config/config-tokens.ts:L49-L62',
               'core-libs/core/src/config/config-tokens.ts:L10-L12'],
         text="I due multi token su cui si contribuisce configurazione: `DefaultConfigChunk` per le librerie, "
              "`ConfigChunk` per l'applicazione. I due insiemi vengono fusi separatamente e il root viene combinato per "
              "ultimo, quindi qualsiasi `ConfigChunk` vince su qualsiasi `DefaultConfigChunk` indipendentemente "
              "dall'ordine di import."),
    dict(term='provideConfig / provideDefaultConfig', match=r'provideConfig|provideDefaultConfig', cs=True, main='11',
         refs=['core-libs/core/src/config/config-providers.ts:L18-L27',
               'core-libs/core/src/config/config-providers.ts:L55-L61',
               'core-libs/core/src/config/config-providers.ts:L69-L79'],
         text="Helper che producono i provider dei chunk di configurazione: `provideConfig` registra un `ValueProvider` "
              "su `ConfigChunk` (o su `DefaultConfigChunk` se `defaultConfig`), `provideDefaultConfig` su "
              "`DefaultConfigChunk`; le varianti `*Factory` producono un `FactoryProvider`. Una regola ESLint di "
              "workspace vieta `provideConfig()` nei file `**/*.module.ts` delle librerie."),
    dict(term='deepMerge', match=r'deepMerge', cs=True, main='11',
         refs=['core-libs/core/src/config/utils/deep-merge.ts:L18-L49',
               'core-libs/core/src/config/config-tokens.ts:L10-L47'],
         text="Merge ricorsivo che muta il primo argomento, usato dalle factory dei token `DefaultConfig`, `RootConfig` "
              "e `Config` per trasformare i chunk di configurazione in un unico oggetto."),
    dict(term='CONFIG_INITIALIZER', match=r'CONFIG_INITIALIZER', cs=True, main='11', base=True,
         refs=['core-libs/core/src/config/config-initializer/config-initializer.service.ts:L130-L175',
               'core-libs/core/src/config/config-initializer/config-initializer.service.ts:L35-L37'],
         text="Meccanismo per la configurazione che arriva in ritardo durante il bootstrap (config asincrona, ad esempio "
              "dal backend): gli initializer sono orchestrati da `ConfigInitializerService`, che tiene traccia degli "
              "scope in corso. Un location initializer trattiene la navigazione iniziale finché `getStable()` non emette."),
    dict(term='getStable', match=r'getStable', cs=True, main='11',
         refs=['core-libs/core/src/config/config-initializer/config-initializer.service.ts:L35-L37'],
         text="Metodo di `ConfigInitializerService` che restituisce subito la configurazione se è stabile, altrimenti "
              "attende che gli scope richiesti non siano più in corso. Il JSDoc lo indica come il modo raccomandato per "
              "leggere la config da codice che può girare prima della fine dell'inizializzazione."),
    # ------------------------------------------------------------------ Bootstrap / lazy loading
    dict(term='BaseCoreModule / BaseStorefrontModule', match=r'Base(?:Core|Storefront)Module', cs=True, main='10',
         refs=['core-libs/storefront/base-storefront.module.ts:L26-L49',
               'core-libs/core/src/base-core.module.ts:L26-L53'],
         text="Punto di aggregazione dell'inizializzazione: importando `BaseStorefrontModule` (che importa per primo "
              "`BaseCoreModule.forRoot()`, poi l'infrastruttura CMS/layout/routing/media/outlet) un'applicazione ottiene "
              "in un colpo solo l'intera catena di inizializzatori. `BaseCoreModule` aggrega 17 moduli core in un ordine "
              "esplicito."),
    dict(term='Feature module', match=r'feature[- ]module', main='12', base=True,
         refs=['feature-libs/cart/base/root/cart-base-root.module.ts:L77-L81',
               'feature-libs/cart/base/root/cart-base-root.module.ts:L26-L83',
               'projects/storefrontapp/src/app/spartacus/features/cart/cart-base-feature.module.ts:L23-L55'],
         text="Unità di codice di una feature lib caricata con il sistema di lazy loading di Spartacus, indipendente dal "
              "router: il codice va caricato quando il CMS chiede un tipo di componente della feature, non quando il "
              "router entra in una route. Il pattern è \"root module eager + modulo lazy\": il root module dichiara quali "
              "componenti CMS la feature copre, l'app fornisce dove trovare il codice (`module: () => import(...)`)."),
    dict(term='Root module (feature lib)', match=r'root module', main='12',
         refs=['feature-libs/cart/base/root/cart-base-root.module.ts:L77-L81',
               'feature-libs/cart/base/root/facade/active-cart.facade.ts:L13-L16'],
         text="Modulo piccolo di una feature lib (es. `CartBaseRootModule`), importato eager, che dichiara quali "
              "componenti CMS la feature copre. Le facade astratte vivono nello stesso entry point `root` come classi "
              "`providedIn: 'root'` con factory `facadeFactory`."),
    dict(term='featureModules', match=r'featureModules', cs=True, main='12', base=True,
         refs=['core-libs/core/src/cms/config/cms-config.ts:L109-L134'],
         text="Chiave di configurazione dichiarativa che associa un nome di feature a un `import()` dinamico, a delle "
              "dipendenze e ai tipi di componente CMS che la feature implementa. È l'unico modo di dichiarare le "
              "feature lazy (con `provideConfig` / `provideDefaultConfig`)."),
    dict(term='MODULE_INITIALIZER', match=r'MODULE_INITIALIZER', cs=True, main='12', base=True,
         refs=['core-libs/core/src/lazy-loading/tokens.ts:L9-L20'],
         text="Hook di inizializzazione per moduli lazy: fa per un modulo lazy ciò che `APP_INITIALIZER` fa per l'app. "
              f"Se il modulo è eager viene eseguito in un `APP_INITIALIZER`, se è lazy alla creazione del modulo "
              f"([01]({L(1)}/01-dependency-injection.md))."),
    dict(term='UnifiedInjector', match=r'UnifiedInjector', cs=True, main='01', base=True,
         refs=['core-libs/core/src/lazy-loading/unified-injector.ts:L32-L35',
               'core-libs/core/src/lazy-loading/unified-injector.ts:L52-L68',
               'core-libs/core/src/lazy-loading/unified-injector.ts:L79-L93'],
         text="Ponte fra il DI di Angular e i moduli lazy di Spartacus: `injectors$` emette il root injector e poi "
              "l'injector di ogni modulo lazy inizializzato; `get` interroga il root normalmente e gli altri con "
              "`{self: true}`; `getMulti` accumula gli array di un multi token da tutti gli injector. Così i servizi del "
              "root vedono multi provider e config chunk registrati in moduli caricati più tardi."),
    dict(term='Facade', match=r'facade', main='20', base=True,
         refs=['core-libs/core/src/lazy-loading/facade-factory/facade-factory.service.ts:L22-L36',
               'core-libs/core/src/lazy-loading/facade-factory/facade-factory.ts:L20-L24',
               'feature-libs/cart/base/root/facade/active-cart.facade.ts:L13-L46'],
         text="Classe astratta che i componenti (e le altre feature) iniettano come API stabile della feature. Con "
              "`facadeFactory` viene fornita nel root injector come proxy che, alla prima chiamata di metodo o alla prima "
              "sottoscrizione di una proprietà, scarica il modulo lazy della feature e inoltra la chiamata "
              "all'implementazione reale: per questo un header può iniettare `ActiveCartFacade` senza portare nel bundle "
              "iniziale il codice del carrello."),
    dict(term='facadeFactory', match=r'facadeFactory', cs=True, main='20',
         refs=['core-libs/core/src/lazy-loading/facade-factory/facade-factory.ts:L20-L24',
               'core-libs/core/src/lazy-loading/facade-factory/facade-descriptor.ts:L10-L37',
               'core-libs/core/src/lazy-loading/facade-factory/facade-factory.service.ts:L70-L82'],
         text="Funzione che crea la facade proxy chiamando `inject(FacadeFactoryService).create(descriptor)`, quindi va "
              "usata in un injection context (tipicamente `useFactory`). Il descrittore ha `facade` e `feature` "
              "obbligatori, `methods`, `properties` e `async` opzionali; la chiamata di un metodo del proxy scarica il "
              "modulo ed esegue il metodo reale anche se il chiamante non si sottoscrive."),
    dict(term='Command / Query', match=r'\bCommand\b|\bQuery\b|CommandService|QueryService', cs=True, main='20', base=True,
         refs=['core-libs/core/src/util/command-query/command.service.ts:L27-L38',
               'core-libs/core/src/util/command-query/command.service.ts:L122-L132',
               'core-libs/core/src/util/command-query/query.service.ts:L33-L60'],
         text="Astrazioni di `@spartacus/core` alternative a NgRx, usate dalle feature più recenti (es. checkout). "
              "`Command` modella le scritture con una strategia di concorrenza esplicita (`Queue`, `Parallel`, "
              "`CancelPrevious`, `ErrorPrevious`) e parte anche senza sottoscrizione; `Query` modella le letture con "
              "stato `{loading, error, data}`, caricamento lazy alla sottoscrizione e invalidazione tramite eventi "
              "(`reloadOn`, `resetOn`)."),
    dict(term='EventService', match=r'EventService', cs=True, main='20', base=True,
         refs=['core-libs/core/src/event/event.service.ts:L47-L113',
               'core-libs/core/src/state/event/state-event.service.ts:L16-L76'],
         text="Bus di eventi tipizzato per classi: si può registrare una sorgente observable per un tipo di evento, "
              "dispatchare un'istanza o ascoltare un tipo (e quindi anche i suoi sottotipi). `StateEventService` "
              "trasforma azioni NgRx in eventi, e `@spartacus/storefront` aggiunge una catena di eventi di pagina per "
              "tracking e personalizzazione."),
    # ------------------------------------------------------------------ State
    dict(term='LoaderState', match=r'\bLoaderState\b', cs=True, main='19', base=True,
         refs=['core-libs/core/src/state/utils/loader/loader-state.ts:L7-L12',
               'core-libs/core/src/state/utils/loader/loader.reducer.ts:L11-L16'],
         text="Forma generica di una cella di stato NgRx caricata dal backend: `{ loading?, error?, success?, value? }`, "
              "con stato iniziale a flag `false` e `value: undefined`. È gestita dall'higher-order reducer "
              "`loaderReducer`, che interpreta `action.meta` invece di `action.type`."),
    dict(term='EntityLoaderState', match=r'EntityLoaderState', cs=True, main='19', base=True,
         refs=['core-libs/core/src/state/utils/entity-loader/entity-loader-state.ts:L10-L10',
               'core-libs/core/src/state/utils/entity-loader/entity-loader.reducer.ts:L13-L25'],
         text="`EntityState<LoaderState<T>>`: una mappa di `LoaderState` indicizzata per id di entità, prodotta da "
              "`entityLoaderReducer` (composizione di `entityReducer` e `loaderReducer`). Il selettore restituisce lo "
              "stato iniziale per id inesistenti."),
    dict(term='Process state', match=r'process state|ProcessesLoaderState|ProcessModule|processesCount', main='19', base=True,
         refs=['core-libs/core/src/state/utils/processes-loader/processes-loader-state.ts:L9-L11',
               'core-libs/core/src/process/store/process-store.module.ts:L13-L17',
               'core-libs/core/src/state/utils/processes-loader/processes-loader.selectors.ts:L9-L17'],
         text="`ProcessesLoaderState` aggiunge a `LoaderState` il contatore `processesCount` (stabile = nessun processo "
              "e nessun caricamento). `ProcessModule` registra la feature NgRx generica `process`, un "
              "`EntityLoaderState` indicizzato per process id, per tracciare operazioni \"fire and forget\" senza una "
              "slice dedicata per ognuna."),
    # ------------------------------------------------------------------ OCC
    dict(term='OCC', match=r'\bOCC\b|Omni Commerce Connect', cs=True, main='21', base=True,
         refs=['core-libs/core/src/occ/services/occ-endpoints.service.ts:L111-L150',
               'core-libs/core/src/occ/adapters/product/occ-product.adapter.ts:L54-L59'],
         text="Omni Commerce Connect, l'API REST di SAP Commerce Cloud. Il \"livello OCC\" di Spartacus separa la "
              "logica di dominio dal formato delle chiamate HTTP con adapter astratti e connector, endpoint "
              "configurabili, converter impilabili e scope di caricamento."),
    dict(term='Adapter', match=r'adapter', main='21', base=True,
         refs=['core-libs/core/src/product/connectors/product/product.adapter.ts:L11-L30',
               'core-libs/core/src/occ/adapters/product/product-occ.module.ts:L30-L76'],
         text="Classe astratta da cui dipende il dominio (`ProductAdapter`, `CmsPageAdapter`, `SiteAdapter`, …); il "
              "modulo OCC la lega via DI all'implementazione concreta (`OccProductAdapter`, …). Cambiare backend "
              "significa fornire un altro adapter, senza toccare facade e store."),
    dict(term='Connector', match=r'connector', main='21', base=True,
         refs=['core-libs/core/src/product/connectors/product/product.connector.ts:L13-L33'],
         text="Servizio `providedIn: 'root'` che delega all'adapter astratto della propria area (es. `ProductConnector` "
              "→ `ProductAdapter`): è ciò che il dominio chiama, mentre l'implementazione concreta resta sostituibile."),
    dict(term='Converter / normalizer / serializer', match=r'converter|normalizer|serializer', main='21', base=True,
         refs=['core-libs/core/src/util/converter.service.ts:L13-L30',
               'core-libs/core/src/util/converter.service.ts:L130-L137'],
         text="I dati raw (`Occ.*`) passano per `ConverterService`, che applica in catena tutti i converter registrati "
              "come multi provider su un `InjectionToken`: i *normalizer* convertono backend→UI, i *serializer* "
              "UI→backend."),
    dict(term='OccEndpoints', match=r'OccEndpoints\b', cs=True, main='21',
         refs=['core-libs/core/src/occ/occ-models/occ-endpoints.model.ts:L21-L33',
               'core-libs/core/public_api.ts:L50-L51',
               'feature-libs/cart/base/occ/model/occ-cart-endpoints.model.ts:L97-L98'],
         text="Interfaccia della configurazione `backend.occ.endpoints`, in cui ogni voce è un template di URL o una "
              "mappa scope → template (`OccEndpoint`). È un tipo augmentabile: le feature lib la estendono via module "
              "augmentation di `@spartacus/core`."),
    # ------------------------------------------------------------------ CMS / routing
    dict(term='CMS', match=r'\bCMS\b', cs=True, main='15', base=True,
         refs=['core-libs/core/src/cms/connectors/page/cms-page.connector.ts:L30-L54',
               'core-libs/core/src/cms/facade/cms.service.ts:L33-L46'],
         text="Spartacus è uno storefront guidato dal CMS: le pagine non sono route Angular statiche ma una struttura "
              "pagina → template → slot → componenti che arriva da SAP Commerce Cloud (o da config statica o da un CMS "
              "di terze parti tramite adapter). Il modulo `cms` di core ottiene la struttura da un `PageContext`, separa "
              "struttura e dati dei componenti e la espone con la facade `CmsService`."),
    dict(term='Slot', match=r'\bslot\b', main='15', base=True,
         refs=['core-libs/core/src/cms/model/content-slot-component-data.model.ts:L7-L12',
               'core-libs/core/src/cms/store/cms-state.ts:L22-L62'],
         text="Area di una pagina CMS che contiene componenti. Nel modello normalizzato lo slot porta solo riferimenti "
              "leggeri ai componenti (`uid`, `typeCode`, `flexType`, `properties`), mentre i dati completi stanno in un "
              "ramo separato dello store indicizzato per `uid`. Lato storefront ogni slot è reso da `PageSlotComponent` "
              f"([16]({L(2)}/16-cms-rendering.md))."),
    dict(term='cmsComponents', match=r'cmsComponents', cs=True, main='15', base=True,
         refs=['core-libs/core/src/cms/config/cms-config.ts:L124-L138',
               'core-libs/storefront/cms-structure/services/cms-components.service.ts:L67-L67'],
         text="Chiave di configurazione con cui lo storefront mappa i tipi di componente CMS su componenti Angular: la "
              "definizione è in core, la lettura nello storefront. L'implementazione può essere una classe Angular, "
              "`() => import(...)` o un web component, anche dentro feature module lazy "
              f"([16]({L(2)}/16-cms-rendering.md))."),
    dict(term='PageContext', match=r'PageContext', cs=True, main='15', base=True,
         refs=['core-libs/core/src/routing/models/page-context.model.ts:L15-L30',
               'core-libs/core/src/model/cms.model.ts:L38-L42'],
         text="Contesto che identifica una pagina CMS: `{ id: string; type?: PageType }`, con gli id speciali "
              "`HOME_PAGE_CONTEXT` e `SMART_EDIT_CONTEXT`; `PageType` vale `ContentPage`, `ProductPage`, `CategoryPage` o "
              "`CatalogPage`. È calcolato da un serializer custom del router-state NgRx "
              f"([14]({L(2)}/14-routing.md))."),
    dict(term='Route semantica', match=r'route semantic|semantic route|cxRoute', main='14', base=True,
         refs=['core-libs/core/src/routing/configurable-routes/routes-config.ts:L16-L57',
               'core-libs/core/src/routing/configurable-routes/configurable-routes.service.ts:L77-L109',
               'core-libs/core/src/routing/configurable-routes/url-translation/semantic-path.service.ts:L41-L68'],
         text="Meccanismo che toglie gli URL dal codice dei componenti: `RoutingConfig.routing.routes` è un dizionario "
              "nome route → `{ paths, matchers, paramsMapping, ... }`; le route Angular dichiarano solo il nome in "
              "`data.cxRoute` e all'avvio `ConfigurableRoutesService` ne riscrive `path`/`matcher`. I link si generano "
              "con i comandi `{ cxRoute, params }`, tradotti da `SemanticPathService` e dalla pipe `cxUrl`."),
    dict(term='CmsPageGuard', match=r'CmsPageGuard\b', cs=True, main='14',
         refs=['core-libs/storefront/cms-structure/routing/cms-route/add-cms-route.ts:L12-L25',
               'core-libs/storefront/cms-structure/guards/cms-page.guard.ts:L51-L84'],
         text="Guard della route wildcard `**` aggiunta in coda alla config del Router: carica la pagina CMS che "
              "corrisponde al `PageContext` della navigazione in corso e, se non esiste, mostra la pagina `notFound`."),
    dict(term='Site context', match=r'site context|SiteContext', main='13', base=True,
         refs=['core-libs/core/src/site-context/providers/context-ids.ts:L7-L10',
               'core-libs/core/src/site-context/config/site-context-config.ts:L10-L19',
               'core-libs/core/src/site-context/config/context-config-utils.ts:L28-L34'],
         text="Sottosistema di `@spartacus/core` che mantiene la terna attiva base site / lingua / valuta, la inizializza "
              "(URL → `localStorage` → default di config), la codifica nell'URL e la propaga a router, HTTP e UI. È "
              "guidato dalla chiave di configurazione `context`, in cui il default di ogni parametro è il primo elemento "
              "del suo array."),
    dict(term='Base site', match=r'base ?site', main='13', base=True,
         refs=['core-libs/core/src/occ/services/occ-endpoints.service.ts:L86-L102',
               'core-libs/core/src/site-context/config/config-loader/site-context-config-initializer.ts:L24-L27'],
         text="Parametro di contesto che identifica il sito SAP Commerce (il segmento `/electronics-spa/` nel path OCC), "
              "inserito nell'URL delle chiamate tramite `OccEndpointsService.getBaseUrl()`. La configurazione `context` "
              "può essere derivata dinamicamente dal base site del backend il cui `urlPatterns` corrisponde all'URL "
              "corrente (`SiteContextConfigInitializer`, scope `context`)."),
    # ------------------------------------------------------------------ Rendering / layout
    dict(term='Outlet', match=r'\boutlet', main='17', base=True,
         refs=['core-libs/storefront/cms-structure/outlet/outlet.model.ts:L9-L13',
               'core-libs/storefront/cms-structure/outlet/outlet.service.ts:L10-L18',
               'core-libs/storefront/cms-structure/outlet/outlet.providers.ts:L34-L47'],
         text="Punto nominato in un template in cui l'applicazione può inserire contenuto prima, dopo o al posto di "
              "quello di default (`OutletPosition`: `before`, `after`, `replace`), senza fare fork dei template. Si "
              "dichiara con `[cxOutlet]`, si registra con `[cxOutletRef]` o con `provideOutlet()`; il registro è "
              "`OutletService`. Storefront, layout di pagina, slot e componenti CMS sono tutti avvolti in outlet."),
    dict(term='Page layout', match=r'page layout|PageLayout', main='16', base=True,
         refs=['core-libs/storefront/cms-structure/page/page-layout/page-layout.service.ts:L54-L80'],
         text="Disposizione degli slot di una pagina: `PageLayoutComponent` (`cx-page-layout`) calcola nome del layout e "
              "slot e rende un outlet e un `cx-page-slot` per slot; `PageLayoutService` risolve quali slot mostrare e in "
              "che ordine da `LayoutConfig`, in base a page template, sezione e breakpoint."),
    dict(term='LayoutConfig', match=r'LayoutConfig', cs=True, main='18', base=True,
         refs=['core-libs/storefront/layout/config/layout-config.ts:L90-L125',
               'core-libs/storefront/layout/config/layout-config.ts:L84-L89'],
         text="Configurazione che dice quali slot CMS mostrare in ogni sezione (header, footer, …) o page template, "
              "eventualmente diversi per breakpoint, più i breakpoint stessi, la strategia di deferred loading e la "
              "configurazione dei dialog (`launch`). Il design adattivo è per breakpoint: il DOM viene (ri)renderizzato, "
              "non nascosto via CSS."),
    dict(term='Breakpoint', match=r'breakpoint', main='18', base=True,
         refs=['core-libs/storefront/layout/breakpoint/breakpoint.service.ts:L40-L46',
               'core-libs/storefront/layout/breakpoint/breakpoint.service.ts:L123-L131'],
         text="Fascia di larghezza della finestra (`xs`…`xl`, enum `BREAKPOINT`). `BreakpointService` trasforma la "
              "larghezza in un valore osservabile, con fallback \"mobile first\" in SSR; `LayoutConfig` può definire "
              "slot diversi per breakpoint."),
    dict(term='LAUNCH_CALLER', match=r'LAUNCH_CALLER', cs=True, main='18', base=True,
         refs=['core-libs/storefront/layout/launch-dialog/services/launch-dialog.service.ts:L78-L97',
               'core-libs/storefront/layout/launch-dialog/launch-dialog.module.ts:L18-L41'],
         text="Chiave che identifica un componente aperto da `LaunchDialogService` (dialog, popover, sidebar, ma anche "
              "navigazioni); il servizio sceglie una di quattro strategie di rendering in base alla configurazione. È "
              f"uno dei tipi augmentabili di storefront ([54]({L(3)}/54-upgrade-safe.md))."),
    dict(term='PageMetaResolver', match=r'PageMetaResolver', cs=True, main='40', base=True,
         refs=['core-libs/core/src/cms/page/page-meta.resolver.ts:L31-L45',
               'core-libs/core/src/cms/page/config/default-page-meta.config.ts:L9-L40'],
         text="Resolver dei meta di pagina (`PageMeta`: title, heading, description, robots, image, breadcrumbs, "
              "canonical). `PageMetaService` sceglie tra più `PageMetaResolver` quello con lo score migliore per tipo, "
              "template e uid della pagina; il resolver espone metodi `resolve*` che restituiscono `Observable` e una "
              "configurazione decide quale metodo alimenta quale proprietà."),
    # ------------------------------------------------------------------ Errori
    dict(term='HttpErrorHandler', match=r'HttpErrorHandler\b', cs=True, main='41',
         refs=['core-libs/core/src/global-message/http-interceptors/index.ts:L22-L63',
               'core-libs/core/src/global-message/http-interceptors/handlers/http-error.handler.ts:L42-L44'],
         text="Classe astratta degli handler di global message per gli errori HTTP, uno per status: ne sono registrati 8 "
              "come multi provider con `useExisting` e `HttpErrorInterceptor` li raccoglie con "
              "`UnifiedInjector.getMulti`. L'`hasMatch` di default confronta lo status della risposta con "
              "`responseStatus`."),
    dict(term='LoggerService', match=r'LoggerService', cs=True, main='41',
         refs=['core-libs/core/src/logger/logger.service.ts:L9-L22',
               'core-libs/setup/ssr/logger/services/server-logger-service-factory.ts:L12-L17'],
         text="Servizio `providedIn: 'root'` che delega al `console` ed è pensato come extension point per redirigere i "
              "log; in SSR è sostituito da una versione server."),
    # ------------------------------------------------------------------ Feature toggle / upgrade
    dict(term='Feature toggle', match=r'feature toggle|FeatureToggles|featureToggles', main='42', base=True,
         refs=['core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L10-L14',
               'core-libs/core/src/features-config/features-config.module.ts:L28-L52',
               'core-libs/core/src/features-config/directives/feature.directive.ts:L11-L17'],
         text="Flag booleano con nome che protegge una correzione scritta accanto al vecchio comportamento, così che il "
              "cliente la attivi quando è pronto. L'API attuale è `FeatureToggles` con `provideFeatureToggles(...)`, la "
              "legacy `FeaturesConfig` è deprecata; `FeaturesConfigModule.forRoot()` installa un ponte toggle → config "
              "perché la direttiva `*cxFeature` passa ancora dal servizio legacy."),
    dict(term='Schematics', match=r'schematic', main='43', base=True,
         refs=['core-libs/schematics/package.json:L43-L89',
               'core-libs/schematics/index.ts:L7-L13'],
         text="Trasformazioni di codice su un file system virtuale, motore di `ng add`, `ng generate` e `ng update` "
              f"([08]({L(1)}/08-schematics-builder.md)). Il pacchetto `@spartacus/schematics` le usa per installare "
              "Spartacus in un'app Angular, per i generatori di supporto e per le migrazioni; le sue utility servono agli "
              "schematics delle altre librerie ma non sono API pubblica."),
    dict(term='Migrazione (ng update)', match=r'migrat|migrazion', main='43', base=True,
         refs=['core-libs/schematics/package.json:L46-L47',
               'core-libs/schematics/src/migrations/migrations.json:L3-L127'],
         text="Trasformazione eseguita da `ng update` per adattare il codice del cliente ai breaking change: "
              "`ng-update.migrations` del `package.json` di `@spartacus/schematics` punta a `migrations.json`, che allo "
              "SHA contiene 25 voci per quattro versioni. Gli upgrade più invasivi sono affidati a schematics di "
              "modernizzazione lanciati a mano (`modernize-app-*`)."),
    dict(term='public_api', match=r'public_api', main='54', base=True,
         refs=['core-libs/core/ng-package.json:L1-L7',
               'core-libs/core/public_api.ts:L7-L36'],
         text="File indicato come `entryFile` nell'`ng-package.json` di ogni pacchetto o entry point: ciò che è "
              "raggiungibile da lì è la superficie pubblica coperta dal versionamento semantico. Il resto, anche se "
              "`export`ato in un file sorgente, è implementazione e può cambiare senza preavviso."),
    dict(term='Entry point', match=r'entry[- ]point', main='54', base=True,
         refs=['core-libs/setup/ssr/ng-package.json:L1-L6',
               'docs/libs/library-structure.md:L4-L16'],
         text="Pacchetto importabile (`@spartacus/<lib>` o secondario `@spartacus/<lib>/<entry>`) con il proprio "
              "`ng-package.json` e `public_api.ts`; è il contratto pubblico. Per convenzione `root/` è eager (facade "
              "astratte, modelli, eventi, token, config), mentre `core/`, `components/`, `occ/` sono lazy."),
    dict(term='Tipi augmentabili', match=r'augment', main='54', base=True,
         refs=['core-libs/core/public_api.ts:L38-L58',
               'core-libs/storefront/public_api.ts:L32-L36',
               'feature-libs/checkout/b2b/root/model/augmented-types.ts:L11-L23'],
         text="Tipi pensati per la module augmentation, riesportati per nome nei blocchi "
              "`AUGMENTABLE_TYPES_START`…`_END` dei `public_api.ts` (in core, ad esempio `Config`, `Product`, "
              "`OccEndpoints`; in storefront `ICON_TYPE`, `BREAKPOINT`, `LAUNCH_CALLER`). Le librerie stesse li "
              "estendono e aggiungono i valori runtime degli enum con un cast; i `const enum` sono vietati da una regola "
              "ESLint."),
]
