# 30 — Glossario

> Revisione del codice: versione `2611.0.0` (Angular 21.2, NgRx 21, RxJS 7.8, TS 5.9).
> Tutti i path sono relativi alla root del repository (`/home/user/spartacus`) e sono stati verificati con `test -e`.
> I capitoli citati tra parentesi (es. "file 04") sono gli altri file di questa cartella `docs-deep-dive/`.

---

## In una frase

Questo glossario è il **dizionario di Spartacus**: per ogni parola che incontri nel codice o negli altri capitoli trovi una definizione breve (massimo due righe) e il file dove quella cosa è definita.

---

## Il problema che risolve

Spartacus usa molte parole con un significato preciso, spesso diverso da quello "normale" di Angular:

1. **Parole uguali, cose diverse.** "Chunk" vuol dire una cosa nella configurazione (`ConfigChunk`) e un'altra nelle traduzioni (chunk i18n). "Serializer" esiste sia nel data layer (converter verso il backend) sia nell'URL (`SiteContextUrlSerializer`) sia nello state (`core-libs/core/src/state/utils/serializer.ts`).
2. **Parole che vengono dal backend SAP Commerce.** `typeCode`, `uid`, `flexType`, page template, content slot, base site: sono concetti del CMS e di OCC, non di Angular.
3. **Sigle.** ASM, CDC, CDS, OPF, OCC, SSR, CSR, B2B, EPD, S4OM, OMF: senza una tabella di riferimento si perde tempo.

Il glossario ti dà un punto unico dove cercare, con il file da aprire per approfondire.

---

## Come è implementato (con path)

Come usare questo file:

- I termini sono **in ordine alfabetico** (maiuscole e minuscole non contano; i simboli come `@` o `_` sono ignorati), raggruppati per lettera.
- Ogni voce ha: **nome** (in grassetto, com'è scritto nel codice), **definizione** (max 2 righe), **Path** (il file dove è definito o il punto migliore da cui partire).
- Quando un termine è un concetto (es. "Facade") il path punta a un esempio canonico.
- Le librerie principali, per orientarti nei path:

| Cartella | Pacchetto npm | Contenuto |
|---|---|---|
| `core-libs/core` | `@spartacus/core` | logica non UI: config, OCC, state, auth, CMS dati, routing, i18n, eventi |
| `core-libs/storefront` | `@spartacus/storefront` | UI: motore CMS, layout, componenti condivisi |
| `core-libs/setup` | `@spartacus/setup` e `@spartacus/setup/ssr` | ricette (B2B) e motore SSR |
| `core-libs/styles` | `@spartacus/styles` | SCSS |
| `core-libs/assets` | `@spartacus/assets` | traduzioni inglesi di default |
| `core-libs/schematics` | `@spartacus/schematics` | installazione e migrazioni (`ng add`, `ng update`) |
| `feature-libs/*` | `@spartacus/cart`, `@spartacus/checkout`, ... | feature opzionali per backend standard |
| `integration-libs/*` | `@spartacus/cdc`, `@spartacus/opf`, ... | integrazioni che richiedono addon lato backend |

---

## A

**ActivatedRoutesService**
Servizio che espone come Observable l'elenco delle route Angular attive (dalla radice alla foglia); usato per leggere `data` delle route.
Path: `core-libs/core/src/routing/services/activated-routes.service.ts`

**ActiveCartFacade**
Facade astratta del carrello "attivo" dell'utente (metodi `getActive`, `addEntry`, ...). È creata con `facadeFactory`, quindi carica la feature cart solo quando serve.
Path: `feature-libs/cart/base/root/facade/active-cart.facade.ts`

**ActiveCartService**
Implementazione reale di `ActiveCartFacade`: sceglie quale carrello è attivo (anonimo, utente, guest) e delega a `MultiCartService`.
Path: `feature-libs/cart/base/core/facade/active-cart.service.ts`

**Adapter**
Classe astratta che dice *cosa* chiedere al backend (es. `CartAdapter.load`). L'implementazione OCC (es. `OccCartAdapter`) dice *come* farlo in HTTP.
Path: `feature-libs/cart/base/core/connectors/cart/cart.adapter.ts`

**Anonymous consents (consensi anonimi)**
Consensi (cookie, tracking) raccolti prima del login; un interceptor li manda al backend in un header HTTP.
Path: `core-libs/core/src/anonymous-consents/facade/anonymous-consents.service.ts`

**AppRoutingModule**
Modulo di `@spartacus/storefront` che registra il router Angular con le route di base (tra cui la route "catch-all" gestita dal CMS).
Path: `core-libs/storefront/router/app-routing.module.ts`

**ASM (Assisted Service Module)**
Feature per il personale di vendita: un agente fa login e "impersona" (emula) un cliente per aiutarlo. Si attiva con il parametro URL `?asm=true`.
Path: `feature-libs/asm/root/asm-root.module.ts`

**AsmConfig**
Configurazione ASM (es. timeout della sessione agente, paginazione della ricerca clienti).
Path: `feature-libs/asm/root/config/asm-config.ts`

**AuthGuard / NotAuthGuard**
Guard di route: `AuthGuard` blocca le pagine se l'utente non è loggato; `NotAuthGuard` blocca pagine come il login se lo è già.
Path: `core-libs/core/src/auth/user-auth/guards/auth.guard.ts`

**AuthInterceptor**
Interceptor HTTP che aggiunge `Authorization: Bearer <token>` alle chiamate OCC e gestisce il refresh del token su errore 401.
Path: `core-libs/core/src/auth/user-auth/http-interceptors/auth.interceptor.ts`

**AuthRedirectService**
Ricorda l'URL richiesto prima del login e, dopo il login, riporta l'utente lì.
Path: `core-libs/core/src/auth/user-auth/services/auth-redirect.service.ts`

**AuthStorageService**
Dove vive il token OAuth dell'utente (in memoria, poi sincronizzato nello storage del browser).
Path: `core-libs/core/src/auth/user-auth/services/auth-storage.service.ts`

## B

**B2B / B2C**
B2C = negozio per consumatori (default dell'app demo). B2B = negozio per aziende (unità organizzative, budget, approvazioni, centri di costo); si attiva con la ricetta B2B.
Path: `core-libs/setup/recipes/b2b/config/default-b2b-occ-config.ts`

**B2BUserRole**
Enum dei ruoli B2B (amministratore, acquirente, approvatore, ...), usato dalle feature di organizzazione.
Path: `core-libs/core/src/model/org-unit.model.ts`

**Base site**
Il "sito" su SAP Commerce (es. `electronics-spa`): definisce catalogo, lingue, valute. È il primo segmento degli URL OCC (`/occ/v2/{baseSite}/...`).
Path: `core-libs/core/src/site-context/facade/base-site.service.ts`

**BaseCoreModule**
Modulo radice di `@spartacus/core`: importa config, state, site context, OCC, auth, CMS, i18n, routing e altri moduli base.
Path: `core-libs/core/src/base-core.module.ts`

**BaseSiteService**
Facade del site context per il base site attivo: `getActive()`, `setActive()`, `get()` (dati del sito da OCC).
Path: `core-libs/core/src/site-context/facade/base-site.service.ts`

**BaseStorefrontModule**
Modulo radice di `@spartacus/storefront`: include `BaseCoreModule`, il router, il layout, il motore CMS e i moduli UI di base.
Path: `core-libs/storefront/base-storefront.module.ts`

**BreadcrumbComponent**
Componente CMS che mostra il "percorso" (Home > Categoria > Prodotto) calcolato dai `PageMetaResolver`.
Path: `core-libs/storefront/cms-components/navigation/breadcrumb/breadcrumb.component.ts`

**BreakpointService**
Dice in quale breakpoint (xs, sm, md, lg, xl) si trova la finestra; usato per layout diversi in base allo schermo.
Path: `core-libs/storefront/layout/breakpoint/breakpoint.service.ts`

## C

**CarouselComponent**
Componente condiviso che mostra una lista di elementi a scorrimento (es. prodotti correlati).
Path: `core-libs/storefront/shared/components/carousel/carousel.component.ts`

**CART_BASE_CORE_FEATURE**
Nome "logico" di feature (stringa) usato da `facadeFactory` per sapere quale modulo lazy caricare per le facade del carrello.
Path: `feature-libs/cart/base/root/feature-name.ts`

**CartType**
Enum dei tipi di carrello (attivo, wishlist, selettivo, nuovo creato, ...) gestiti in parallelo dal multi-cart.
Path: `feature-libs/cart/base/root/models/cart.model.ts`

**CDC (SAP Customer Data Cloud, ex Gigya)**
Integration lib che sostituisce login e registrazione di Spartacus con il servizio esterno CDC.
Path: `integration-libs/cdc/root/cdc-root.module.ts`

**CDS (Context-Driven Services)**
Integration lib per merchandising personalizzato (caroselli "strategie") e tracciamento del profilo (`profiletag`).
Path: `integration-libs/cds/src/cds.module.ts`

**CheckoutAuthGuard**
Guard che permette l'accesso al checkout solo a utenti loggati o guest; altrimenti manda al login.
Path: `feature-libs/checkout/base/components/guards/checkout-auth.guard.ts`

**Chunk (config) — `ConfigChunk` / `DefaultConfigChunk`**
Pezzo di configurazione registrato con `provideConfig`/`provideDefaultConfig`. Tutti i chunk vengono fusi (`deepMerge`) nell'unico oggetto `Config`.
Path: `core-libs/core/src/config/config-tokens.ts`

**Chunk (i18n)**
Gruppo di chiavi di traduzione caricate insieme (es. `common`, `cart`, `checkout`). La mappa chunk → chiavi di primo livello sta in `i18n.chunks`.
Path: `core-libs/assets/src/translations/translation-chunks-config.ts`

**ClientTokenInterceptor**
Aggiunge un token "client" (OAuth `client_credentials`, senza utente) alle chiamate che lo richiedono, es. registrazione.
Path: `core-libs/core/src/auth/client-auth/http-interceptors/client-token.interceptor.ts`

**CMSFlexComponent**
Tipo CMS "contenitore": non ha logica propria, il componente Angular da usare si sceglie dal suo `flexType`.
Path: `core-libs/core/src/cms/config/cms-config.ts`

**CmsComponent**
Interfaccia base dei dati di un componente CMS (`uid`, `typeCode`, `name`, `flexType`, proprietà specifiche).
Path: `core-libs/core/src/model/cms.model.ts`

**CmsComponentData**
Oggetto iniettato in ogni componente CMS: contiene `uid` e `data$` (Observable con i dati del componente dal CMS).
Path: `core-libs/storefront/cms-structure/page/model/cms-component-data.ts`

**cmsComponents**
Chiave di `CmsConfig`: mappa `typeCode` → `CmsComponentMapping` (componente Angular, guard, provider, `deferLoading`, `childRoutes`, `i18nKeys`).
Path: `core-libs/core/src/cms/config/cms-config.ts`

**CmsComponentsService**
Legge la mappatura `cmsComponents`, carica le feature lazy necessarie e fornisce componente, guard e child routes per un `typeCode`.
Path: `core-libs/storefront/cms-structure/services/cms-components.service.ts`

**CmsConfig**
Configurazione CMS: `cmsComponents`, `featureModules`, `componentsLoading`. Estende `OccConfig`.
Path: `core-libs/core/src/cms/config/cms-config.ts`

**CmsFeaturesService**
Dato un `typeCode`, trova in `featureModules` quale feature lazy lo fornisce e la carica.
Path: `core-libs/storefront/cms-structure/services/cms-features.service.ts`

**CmsGuardsService**
Esegue le guard dichiarate nei `CmsComponentMapping` dei componenti presenti in una pagina.
Path: `core-libs/storefront/cms-structure/services/cms-guards.service.ts`

**CmsPageAdapter / CmsPageConnector**
Adapter e connector per scaricare la struttura di una pagina CMS (slot + componenti) dal backend.
Path: `core-libs/core/src/cms/connectors/page/cms-page.connector.ts`

**CmsPageGuard**
Guard della route "catch-all": carica la pagina CMS per l'URL, esegue le guard dei componenti e gestisce il 404.
Path: `core-libs/storefront/cms-structure/guards/cms-page.guard.ts`

**CmsService**
Facade dei dati CMS: `getCurrentPage()`, `getContentSlot()`, `getComponentData()`, `refreshLatestPage()`.
Path: `core-libs/core/src/cms/facade/cms.service.ts`

**CmsStructureConfig**
Configurazione di pagine/slot/componenti "statici" che si aggiungono (o sostituiscono) quelli arrivati dal CMS.
Path: `core-libs/core/src/cms/config/cms-structure.config.ts`

**Command / CommandService**
Pattern per le operazioni di scrittura (es. "aggiungi indirizzo"): `CommandService.create(fn, { strategy })` restituisce un `Command` con `execute(params)`.
Path: `core-libs/core/src/util/command-query/command.service.ts`

**CommandStrategy**
Enum di come gestire comandi concorrenti: `Parallel`, `Queue`, `CancelPrevious`, `ErrorPrevious`.
Path: `core-libs/core/src/util/command-query/command.service.ts`

**ComponentDecorator / SlotDecorator**
Classi estensibili che aggiungono attributi al DOM di componenti e slot (usate per esempio da SmartEdit).
Path: `core-libs/core/src/cms/decorators/component-decorator.ts`

**ComponentHandler**
Strategia che sa "creare" un tipo di componente (Angular di default, lazy, web component).
Path: `core-libs/storefront/cms-structure/page/component/handlers/component-handler.ts`

**ComponentWrapperDirective (`[cxComponentWrapper]`)**
Direttiva che, per ogni componente di uno slot, trova il componente Angular mappato e lo istanzia con `CmsComponentData`.
Path: `core-libs/storefront/cms-structure/page/component/component-wrapper.directive.ts`

**Config**
Classe astratta usata come token DI per l'intera configurazione fusa. Ogni config specifica (`OccConfig`, `CmsConfig`, ...) la estende con declaration merging.
Path: `core-libs/core/src/config/config-tokens.ts`

**CONFIG_INITIALIZER / ConfigInitializer**
Token per configurazioni che si calcolano in modo asincrono all'avvio (es. site context letto da OCC).
Path: `core-libs/core/src/config/config-initializer/config-initializer.ts`

**ConfigInitializerService**
Aspetta che tutti i `ConfigInitializer` abbiano finito e offre `getStable(...)` per leggere la config "definitiva".
Path: `core-libs/core/src/config/config-initializer/config-initializer.service.ts`

**ConfigurationService**
Tiene la config unificata e la aggiorna quando un modulo lazy porta nuovi chunk di config.
Path: `core-libs/core/src/config/services/configuration.service.ts`

**ConfigValidator**
Funzione che controlla la config all'avvio (in dev) e stampa un warning se manca qualcosa (es. `baseSite`).
Path: `core-libs/core/src/config/config-validator/config-validator.ts`

**Connector**
Servizio concreto che la facade/effect usa per parlare col backend. Chiama l'adapter astratto; così il backend è sostituibile.
Path: `feature-libs/cart/base/core/connectors/cart/cart.connector.ts`

**ContentSlotComponentData**
Riferimento a un componente dentro uno slot (`uid`, `typeCode`, `flexType`, `properties`).
Path: `core-libs/core/src/cms/model/content-slot-component-data.model.ts`

**Converter**
Interfaccia con un metodo `convert(source, target?)`: trasforma un modello in un altro (OCC ↔ UI).
Path: `core-libs/core/src/util/converter.service.ts`

**ConverterService**
Esegue in catena tutti i converter registrati su un `InjectionToken` (es. `PRODUCT_NORMALIZER`); offre `pipeable()` per usarlo in RxJS.
Path: `core-libs/core/src/util/converter.service.ts`

**CrossSiteRequestForgeryService**
Gestisce il token CSRF quando il backend lo richiede.
Path: `core-libs/core/src/auth/client-auth/services/cross-site-request-forgery.service.ts`

**CurrencyService**
Facade del site context per la valuta attiva (`getActive`, `setActive`, `getAll`).
Path: `core-libs/core/src/site-context/facade/currency.service.ts`

**CxDatePipe**
Pipe `cxDate`: formatta date usando la lingua attiva di Spartacus (non il `LOCALE_ID` fisso di Angular).
Path: `core-libs/core/src/i18n/date.pipe.ts`

**CxErrorHandler**
`ErrorHandler` Angular di Spartacus: inoltra gli errori al `LoggerService` e ai gestori multipli.
Path: `core-libs/core/src/error-handling/cx-error-handler.ts`

**CxEvent**
Classe base degli eventi Spartacus (es. `CartAddEntrySuccessEvent`, `LoginEvent`).
Path: `core-libs/core/src/event/cx-event.ts`

**cxRoute**
Nome di una route semantica usato nei comandi URL: `{ cxRoute: 'product', params: product }` diventa `/product/123/nome`.
Path: `core-libs/core/src/routing/configurable-routes/url-translation/url-command.ts`

## D

**Declaration merging**
Tecnica TypeScript con cui ogni lib "aggiunge" campi all'interfaccia `Config` (`declare module ... { interface Config extends CmsConfig {} }`).
Path: `tools/build-lib/declaration-merging/index.ts`

**deepMerge**
Funzione che fonde oggetti annidati (usata per unire default, chunk e config dell'app). Gli array vengono sostituiti, non concatenati.
Path: `core-libs/core/src/config/utils/deep-merge.ts`

**DefaultConfig / RootConfig**
Token con, rispettivamente, la somma dei default delle lib e la somma della config dell'app. `Config` = merge di entrambi (l'app vince).
Path: `core-libs/core/src/config/config-tokens.ts`

**deferLoading / DeferLoadingStrategy**
Strategia di rendering dei componenti CMS: `DEFER` (crea il componente solo quando entra nel viewport) o `INSTANT`.
Path: `core-libs/core/src/cms/config/cms-config.ts`

**DeferLoaderService**
Usa `IntersectionService` per sapere quando un elemento è visibile e quindi quando renderizzarlo (solo nel browser).
Path: `core-libs/storefront/layout/loading/defer-loader.service.ts`

**DirectionService**
Imposta la direzione del testo (`ltr`/`rtl`) in base alla lingua attiva.
Path: `core-libs/storefront/layout/direction/direction.service.ts`

**DynamicAttributeService**
Aggiunge attributi dinamici ai componenti e slot usando i decorator (`ComponentDecorator`, `SlotDecorator`).
Path: `core-libs/core/src/cms/services/dynamic-attribute.service.ts`

## E

**EffectsErrorHandlerModule**
Raccoglie gli errori delle action NgRx di fallimento e li manda all'`ErrorHandler`.
Path: `core-libs/core/src/error-handling/effects-error-handler/effects-error-handler.module.ts`

**EntityLoaderState**
Tipo `EntityState<LoaderState<T>>`: un dizionario di `LoaderState`, uno per id (es. un prodotto per codice).
Path: `core-libs/core/src/state/utils/entity-loader/entity-loader-state.ts`

**EntityProcessesLoaderState**
Come `EntityLoaderState`, ma ogni entità ha anche un contatore di processi in corso (usato dal multi-cart).
Path: `core-libs/core/src/state/utils/entity-processes-loader/entity-processes-loader-state.ts`

**EventService**
Bus di eventi tipizzati: `register(EventType, source$)`, `get(EventType)`, `dispatch(event)`.
Path: `core-libs/core/src/event/event.service.ts`

**ExternalRoutes**
Configurazione di URL che devono essere gestiti fuori da Spartacus (redirect a un'altra app); una guard li intercetta.
Path: `core-libs/core/src/routing/external-routes/external-routes.guard.ts`

## F

**Facade**
Classe astratta pubblica (in `root`) che nasconde la logica interna di una feature (NgRx, Query, ...). I componenti dipendono solo da lei.
Path: `feature-libs/user/account/root/facade/user-account.facade.ts`

**facadeFactory**
Funzione che crea un proxy della facade: alla prima chiamata carica il modulo lazy della feature e inoltra i metodi all'implementazione reale.
Path: `core-libs/core/src/lazy-loading/facade-factory/facade-factory.ts`

**FacadeDescriptor**
Descrizione passata a `facadeFactory`: `facade`, `feature`, `methods`, `properties`, `async`.
Path: `core-libs/core/src/lazy-loading/facade-factory/facade-descriptor.ts`

**FacadeFactoryService**
Servizio che realizza il proxy: risolve la feature con `FeatureModulesService` e inoltra le chiamate.
Path: `core-libs/core/src/lazy-loading/facade-factory/facade-factory.service.ts`

**Feature lib**
Libreria opzionale in `feature-libs/` (cart, checkout, order, user, ...) divisa in entry point `root`, `core`, `occ`, `components`, `assets`.
Path: `feature-libs/cart/package.json`

**Feature toggle**
Flag booleano (in `FeatureToggles`) che attiva un comportamento nuovo senza rompere chi aggiorna; si imposta con `provideFeatureToggles`.
Path: `core-libs/core/src/features-config/feature-toggles/config/feature-toggles.ts`

**FeatureConfigService**
Servizio che legge feature toggle e feature level: `isEnabled('nome')`, `isLevel('x.y')`.
Path: `core-libs/core/src/features-config/services/feature-config.service.ts`

**`[cxFeature]` / `[cxFeatureLevel]`**
Direttive strutturali che mostrano un pezzo di template solo se un feature toggle è attivo (o un livello è raggiunto).
Path: `core-libs/core/src/features-config/directives/feature.directive.ts`

**featureModules**
Chiave di `CmsConfig`: mappa nome feature → `{ module: () => import(...), cmsComponents: [...], dependencies }`. È il cuore del lazy loading.
Path: `core-libs/core/src/cms/config/cms-config.ts`

**FeatureModulesService**
Carica una feature per nome (con le sue dipendenze) leggendo `featureModules`, e ne restituisce il `NgModuleRef`.
Path: `core-libs/core/src/lazy-loading/feature-modules.service.ts`

**flexType**
Per un `CMSFlexComponent`, stringa che indica quale mappatura `cmsComponents` usare al posto del `typeCode`.
Path: `core-libs/storefront/cms-structure/utils/cms-structure.util.ts`

## G

**GlobalMessage / GlobalMessageService**
Messaggi globali (toast in alto): `add(text, type, timeout)`, `remove(type)`. Mostrati da `GlobalMessageComponent`.
Path: `core-libs/core/src/global-message/facade/global-message.service.ts`

**GlobalMessageType**
Enum dei tipi di messaggio: conferma, errore, warning, informazione.
Path: `core-libs/core/src/global-message/models/global-message.model.ts`

**Guest**
Utente non registrato che fa checkout inserendo solo l'email. Le chiamate usano `anonymous`; un carrello è "guest" se il suo utente ha nome `guest` (`OCC_USER_ID_GUEST`).
Path: `core-libs/core/src/occ/utils/occ-user-ids.ts`

## H

**HamburgerMenuService**
Gestisce apertura e chiusura del menu mobile.
Path: `core-libs/storefront/layout/header/hamburger-menu/hamburger-menu.service.ts`

**HttpErrorHandler**
Classe astratta di gestori per status HTTP (400, 401, 403, 404, 500, ...) che mostrano un GlobalMessage.
Path: `core-libs/core/src/global-message/http-interceptors/handlers/http-error.handler.ts`

**HttpErrorInterceptor**
Interceptor che, su errore HTTP, sceglie l'`HttpErrorHandler` giusto per priorità e status.
Path: `core-libs/core/src/global-message/http-interceptors/http-error.interceptor.ts`

**HttpErrorHandlerInterceptor**
Interceptor che inoltra gli errori HTTP all'`ErrorHandler` (utile soprattutto in SSR per non mettere in cache pagine rotte).
Path: `core-libs/core/src/error-handling/http-error-handler/http-error-handler.interceptor.ts`

**HttpTimeoutInterceptor**
Applica un timeout configurabile alle chiamate HTTP (diverso tra browser e server).
Path: `core-libs/core/src/http/http-timeout/http-timeout.interceptor.ts`

**Hydration**
Riuso nel browser del DOM prodotto dall'SSR invece di ridisegnarlo; nell'app demo si attiva con `provideClientHydration(...)`.
Path: `projects/storefrontapp/src/app/app.config.ts`

## I

**I18nConfig**
Configurazione i18n: `resources` (traduzioni), `chunks`, `fallbackLang`, `backend.loader` / `loadPath`.
Path: `core-libs/core/src/i18n/config/i18n-config.ts`

**i18next**
Libreria di traduzione usata sotto `TranslationService`; Spartacus la inizializza e la collega alla lingua attiva.
Path: `core-libs/core/src/i18n/i18next/i18next-translation.service.ts`

**ICON_TYPE / IconComponent**
Enum dei nomi di icona e componente `<cx-icon>` che li traduce in classi CSS, SVG o immagini secondo `IconConfig`.
Path: `core-libs/storefront/cms-components/misc/icon/icon.model.ts`

**Integration lib**
Libreria in `integration-libs/` che richiede un addon o un servizio esterno lato backend (CDC, CDS, OPF, Digital Payments, EPD, S4OM, OMF, CPQ, ...).
Path: `integration-libs/opf/base/root/opf-base-root.module.ts`

**IntersectionService**
Wrapper di `IntersectionObserver` per sapere quando un elemento entra nel viewport.
Path: `core-libs/storefront/layout/loading/intersection.service.ts`

## J

**JSON-LD / Structured data**
Dati strutturati Schema.org (prodotto, breadcrumb) inseriti in `<script type="application/ld+json">` per la SEO.
Path: `core-libs/storefront/cms-structure/seo/structured-data/json-ld-script.factory.ts`

**JspIncludeComponent**
Tipo CMS "legacy" di SAP Commerce: rappresenta un pezzo di pagina JSP; Spartacus lo mappa tramite il suo `uid`.
Path: `core-libs/core/src/cms/config/cms-config.ts`

## K

**KeyboardFocus (`[cxFocus]`)**
Direttiva di accessibilità che gestisce autofocus, blocco del focus e navigazione con tastiera.
Path: `core-libs/storefront/layout/a11y/keyboard-focus/focus.directive.ts`

## L

**LanguageService**
Facade del site context per la lingua attiva; cambiarla ricarica traduzioni e dati CMS.
Path: `core-libs/core/src/site-context/facade/language.service.ts`

**LAUNCH_CALLER**
Enum degli identificatori dei dialog/popup che si possono aprire con `LaunchDialogService`.
Path: `core-libs/storefront/layout/launch-dialog/config/launch-config.ts`

**LaunchDialog / LaunchDialogService**
Sistema per aprire dialog (modali, popover inline, route) configurati per `LAUNCH_CALLER`: `openDialog(...)`, `closeDialog(reason)`.
Path: `core-libs/storefront/layout/launch-dialog/services/launch-dialog.service.ts`

**LayoutConfig**
Configurazione di layout: breakpoint, `layoutSlots` (quali slot mostrare per template e breakpoint), `pageFold`, `launch`, `deferredLoading`.
Path: `core-libs/storefront/layout/config/layout-config.ts`

**layoutSlots**
Chiave di `LayoutConfig`: per ogni page template elenca gli slot in ordine, anche diversi per breakpoint.
Path: `core-libs/storefront/recipes/config/layout-config.ts`

**Lazy loading (Spartacus)**
Caricamento di feature on demand, innescato da un componente CMS, da una facade o da una dipendenza, tramite `featureModules`.
Path: `core-libs/core/src/lazy-loading/lazy-modules.service.ts`

**LazyModulesService**
Risolve `import()` di un modulo, lo istanzia con l'injector giusto e fa partire i suoi `MODULE_INITIALIZER`.
Path: `core-libs/core/src/lazy-loading/lazy-modules.service.ts`

**LoaderState**
Forma standard di un dato caricato nello store: `{ loading, error, success, value }`.
Path: `core-libs/core/src/state/utils/loader/loader-state.ts`

**Loading scopes**
Config che dice quali scope includono altri (es. `details` include `list` e `variants`) e quando un dato va ricaricato (`maxAge`, `reloadOn`).
Path: `core-libs/core/src/occ/config/loading-scopes-config.ts`

**LoggerService**
Servizio di log da usare al posto di `console`; in SSR viene sostituito da un logger strutturato per Express.
Path: `core-libs/core/src/logger/logger.service.ts`

**LoginFormComponent**
Componente del form di login (feature user account).
Path: `feature-libs/user/account/components/login-form/login-form.component.ts`

## M

**MediaComponent / MediaService**
Componente `<cx-media>` che sceglie l'immagine giusta per dimensione (`srcset`) partendo dai formati OCC.
Path: `core-libs/storefront/shared/components/media/media.component.ts`

**Meta-reducer**
Funzione NgRx che avvolge tutti i reducer; Spartacus ne usa per transfer state e pulizia dello stato al logout.
Path: `core-libs/core/src/state/reducers/index.ts`

**MODULE_INITIALIZER**
Token tipo `APP_INITIALIZER` ma per i moduli lazy: funzioni eseguite quando la feature viene caricata.
Path: `core-libs/core/src/lazy-loading/tokens.ts`

**ModuleInitializedEvent**
Evento emesso quando una feature lazy è stata caricata e inizializzata.
Path: `core-libs/core/src/lazy-loading/events/module-initialized-event.ts`

**MultiCartService**
Gestisce più carrelli contemporaneamente nello store NgRx (per id carrello), base di `ActiveCartService` e wishlist.
Path: `feature-libs/cart/base/core/facade/multi-cart.service.ts`

**MultiErrorHandler**
Permette di registrare più gestori d'errore che ricevono tutti lo stesso errore.
Path: `core-libs/core/src/error-handling/multi-error-handler/multi-error-handler.ts`

## N

**NgExpressEngineDecorator**
Avvolge il motore Express di Angular con `OptimizedSsrEngine` e aggiunge i provider server di Spartacus.
Path: `core-libs/setup/ssr/engine-decorator/ng-express-engine-decorator.ts`

**Normalizer**
Converter in ingresso: da modello OCC a modello UI (es. `ProductImageNormalizer`). Registrato su token `*_NORMALIZER`.
Path: `core-libs/core/src/product/connectors/product/converters.ts`

**Nx**
Strumento del monorepo: grafo delle dipendenze, cache e target (`build`, `test`, `lint`) per ogni progetto.
Path: `nx.json`

## O

**OAuthLibWrapperService**
Involucro di `angular-oauth2-oidc`: login con password, refresh e revoca del token.
Path: `core-libs/core/src/auth/user-auth/services/oauth-lib-wrapper.service.ts`

**OCC (Omni Commerce Connect)**
API REST di SAP Commerce (`/occ/v2/{baseSite}/...`). È il backend "di default" di Spartacus.
Path: `core-libs/core/src/occ/config/occ-config.ts`

**OCC_CART_ID_CURRENT**
Costante `'current'`: nell'URL OCC indica "il carrello attuale dell'utente" senza conoscerne il codice.
Path: `core-libs/core/src/occ/utils/occ-constants.ts`

**OCC_USER_ID_CURRENT / ANONYMOUS / GUEST**
Costanti `'current'`, `'anonymous'`, `'guest'` usate nel segmento `users/{userId}` degli URL OCC.
Path: `core-libs/core/src/occ/utils/occ-user-ids.ts`

**OccConfig**
Configurazione del backend: `backend.occ.baseUrl`, `prefix` (default `/occ/v2/`), `endpoints`, `useWithCredentials`, `backend.media`, `backend.loadingScopes`.
Path: `core-libs/core/src/occ/config/occ-config.ts`

**OccEndpoints (endpoint)**
Mappa nome → template URL (es. `product: 'products/${productCode}?fields=...'`), divisa per scope.
Path: `core-libs/core/src/occ/occ-models/occ-endpoints.model.ts`

**OccEndpointsService**
Costruisce l'URL completo di una chiamata: `buildUrl('product', { urlParams, queryParams, scope })`.
Path: `core-libs/core/src/occ/services/occ-endpoints.service.ts`

**OccFieldsService / OccRequestsOptimizerService**
Unisce più richieste dello stesso endpoint con `fields` diversi in una sola chiamata (ottimizzazione degli scope prodotto).
Path: `core-libs/core/src/occ/services/occ-requests-optimizer.service.ts`

**OnNavigateService**
Gestisce lo scroll alla navigazione (ripristino posizione, scroll in alto).
Path: `core-libs/storefront/router/on-navigate.service.ts`

**OPF (Open Payment Framework)**
Integration lib per pagamenti esterni (checkout OPF, quick buy, CTA, gift card).
Path: `integration-libs/opf/base/root/config/opf-config.ts`

**OptimizedSsrEngine**
Motore SSR di Spartacus: timeout con fallback a CSR, cache delle render, limite di concorrenza, riuso di render in corso.
Path: `core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts`

**Outlet (`*cxOutlet`)**
Punto di estensione nel template: un nome (spesso = nome slot o template) dove si può sostituire o affiancare un template.
Path: `core-libs/storefront/cms-structure/outlet/outlet.directive.ts`

**OutletPosition**
Enum: `REPLACE`, `BEFORE`, `AFTER`. Dice dove inserire il template registrato su un outlet.
Path: `core-libs/storefront/cms-structure/outlet/outlet.model.ts`

**OutletRefDirective (`*cxOutletRef`) / provideOutlet**
Due modi per registrare contenuto su un outlet: da template (`cxOutletRef`) o da provider (`provideOutlet({ id, component, position })`).
Path: `core-libs/storefront/cms-structure/outlet/outlet.providers.ts`

**OutletService**
Registro interno degli outlet: tiene, per nome e posizione, i template o componenti da rendere.
Path: `core-libs/storefront/cms-structure/outlet/outlet.service.ts`

## P

**Page (modello)**
Modello UI di una pagina CMS: `pageId`, `template`, `title`, `slots` (ognuno con i suoi componenti).
Path: `core-libs/core/src/cms/model/page.model.ts`

**Page template**
Nome del layout della pagina scelto nel CMS (es. `LandingPage2Template`, `ProductDetailsPageTemplate`). Decide quali slot mostrare.
Path: `core-libs/storefront/cms-structure/page/page-layout/page-layout.service.ts`

**PageContext / PageType**
Chiave per caricare una pagina CMS: `{ id, type }`, con `type` in `ContentPage`, `ProductPage`, `CategoryPage`, `CatalogPage`.
Path: `core-libs/core/src/routing/models/page-context.model.ts`

**pageFold**
Nome dello slot che segna "la piega" della pagina: in SSR vengono renderizzati gli slot fino a lì, il resto è differito.
Path: `core-libs/storefront/layout/config/layout-config.ts`

**PageLayoutComponent (`<cx-page-layout>`)**
Componente che legge il template della pagina e disegna i suoi slot con `cx-page-slot`.
Path: `core-libs/storefront/cms-structure/page/page-layout/page-layout.component.ts`

**PageMetaResolver / PageMetaService**
Resolver (uno per tipo di pagina) che calcolano title, description, robots, canonical, breadcrumb; il service sceglie quello con punteggio migliore.
Path: `core-libs/core/src/cms/page/page-meta.resolver.ts`

**PageSlotComponent (`cx-page-slot`)**
Disegna uno slot: legge i componenti da `CmsService` e usa `cxComponentWrapper` per ognuno, con defer loading.
Path: `core-libs/storefront/cms-structure/page/slot/page-slot.component.ts`

**Personalization**
Feature di tracking che legge header di personalizzazione dal backend e li rimanda nelle chiamate successive.
Path: `feature-libs/tracking/personalization/root/personalization-root.module.ts`

**PickupInStore (BOPIS)**
Feature "compra online e ritira in negozio".
Path: `feature-libs/pickup-in-store/root/pickup-in-store-root.module.ts`

**ProcessesLoaderState**
`LoaderState` con in più `processesCount`: serve a sapere se ci sono operazioni in corso su un dato.
Path: `core-libs/core/src/state/utils/processes-loader/processes-loader-state.ts`

**ProductScope**
Enum degli scope di caricamento prodotto (`list`, `details`, `attributes`, `variants`, `price`, `stock`, ...).
Path: `core-libs/core/src/product/model/product-scope.ts`

**ProductService / ProductLoadingService**
Facade prodotto: `get(code, scope)`. Il loading service decide se caricare, unire scope o ricaricare.
Path: `core-libs/core/src/product/services/product-loading.service.ts`

**ProtectedRoutesGuard**
Guard globale che, se l'app è "chiusa" (`routing.protected: true`), obbliga al login per tutte le route non esplicitamente pubbliche.
Path: `core-libs/core/src/routing/protected-routes/protected-routes.guard.ts`

**provideConfig / provideDefaultConfig**
Funzioni che registrano un chunk di config (dell'app) o un chunk di default (della lib).
Path: `core-libs/core/src/config/config-providers.ts`

**provideFeatureToggles**
Registra valori di feature toggle (default o dell'app).
Path: `core-libs/core/src/features-config/feature-toggles/feature-toggles-providers.ts`

**provideServer**
Funzione di `@spartacus/setup/ssr` che aggiunge i provider server (logger, gestione errori, URL della richiesta).
Path: `core-libs/setup/ssr/providers/ssr-providers.ts`

**Punchout**
Integration lib B2B: un sistema di acquisti esterno (procurement) apre Spartacus in una sessione dedicata e riceve il carrello.
Path: `integration-libs/punchout/root/punchout.root.module.ts`

**PWA**
Supporto Progressive Web App (service worker, add-to-home-screen) configurabile.
Path: `core-libs/storefront/cms-structure/pwa/pwa.module.ts`

## Q

**Query / QueryService**
Pattern per le letture senza NgRx: `QueryService.create(loaderFn, { reloadOn, resetOn })` restituisce un `Query` con `get()` e `getState()`.
Path: `core-libs/core/src/util/command-query/query.service.ts`

**QueryState**
Stato di una query: `{ loading, error, data }`.
Path: `core-libs/core/src/util/command-query/query.service.ts`

## R

**Recipe (ricetta)**
Insieme preconfezionato di config e moduli (es. B2B, layout di default, struttura CMS statica).
Path: `core-libs/storefront/recipes/config/static-cms-structure.ts`

**RenderingCache**
Cache in memoria delle pagine renderizzate dall'SSR (e anche delle render in corso), con limite di dimensione.
Path: `core-libs/setup/ssr/optimized-engine/rendering-cache/rendering-cache.ts`

**Rendering strategy**
Per ogni richiesta, `ALWAYS_SSR`, `ALWAYS_CSR` o `DEFAULT`. Il resolver di default forza CSR su `checkout`, `my-account`, `punchout`, `opf` e `?asm`.
Path: `core-libs/setup/ssr/optimized-engine/rendering-strategy-resolver.ts`

**REQUEST / RESPONSE**
Token che, in SSR, danno accesso agli oggetti `Request` e `Response` di Express.
Path: `core-libs/setup/ssr/tokens/express.tokens.ts`

**RootModule (pattern)**
Modulo `XxxRootModule` nell'entry point `root` di una feature: sempre caricato, contiene solo config, facade proxy e mappature `featureModules`; il resto è lazy.
Path: `feature-libs/cart/base/root/cart-base-root.module.ts`

**RoutingConfig / RoutesConfig**
Config delle route semantiche: per ogni nome (`product`, `category`, `cart`, ...) i `paths` (es. `product/:productCode/:name`) e `paramsMapping`.
Path: `core-libs/core/src/routing/configurable-routes/config/routing-config.ts`

**RoutingService**
Facade di navigazione: `go(UrlCommands)`, `getUrl`, `getPageContext`, `getParams`, `back`.
Path: `core-libs/core/src/routing/facade/routing.service.ts`

## S

**S4OM (S/4HANA Order Management)**
Integration lib per ordini gestiti da S/4HANA (es. prezzi e disponibilità in tempo reale).
Path: `integration-libs/s4om/root/s4om-root.module.ts`

**Schematics**
Script Angular CLI (`ng add @spartacus/schematics`, `ng update`) che installano le lib, generano i moduli feature e migrano il codice tra versioni.
Path: `core-libs/schematics/src/collection.json`

**Scope (OCC / prodotto)**
Nome di una "vista" dello stesso endpoint con `fields` diversi (es. `list` vs `details`), per non scaricare più dati del necessario.
Path: `core-libs/core/src/occ/services/loading-scopes.service.ts`

**SearchboxService**
Facade per i suggerimenti di ricerca (prodotti e parole) mostrati da `SearchBoxComponent`.
Path: `core-libs/core/src/product/facade/searchbox.service.ts`

**Secondary entry point**
Sotto-pacchetto importabile separatamente (es. `@spartacus/cart/base/root`), definito da un proprio `ng-package.json`; permette tree-shaking e lazy loading.
Path: `feature-libs/cart/base/root/ng-package.json`

**Semantic route / SemanticPathService**
Route indicata per nome (`cxRoute`) invece che per percorso; il service traduce nome + parametri nel percorso configurato.
Path: `core-libs/core/src/routing/configurable-routes/url-translation/semantic-path.service.ts`

**Serializer**
Converter in uscita: da modello UI a modello OCC (es. `ADDRESS_SERIALIZER`) prima di una POST/PUT.
Path: `core-libs/core/src/user/connectors/address/converters.ts`

**SERVER_REQUEST_URL / SERVER_REQUEST_ORIGIN**
Token con URL e origine della richiesta, disponibili in SSR (dove non esiste `window.location`).
Path: `core-libs/core/src/util/ssr.tokens.ts`

**Site context**
Contesto corrente della vetrina: base site, lingua, valuta (e tema). Influenza URL, chiamate OCC e traduzioni.
Path: `core-libs/core/src/site-context/site-context.module.ts`

**SiteContextConfig**
Config `context`: valori possibili di `baseSite`, `language`, `currency` e `urlParameters` (quali mettere nell'URL).
Path: `core-libs/core/src/site-context/config/site-context-config.ts`

**SiteContextInterceptor**
Aggiunge `lang` e `curr` come query parameter a ogni chiamata OCC.
Path: `core-libs/core/src/occ/adapters/site-context/site-context.interceptor.ts`

**SiteContextUrlSerializer**
`UrlSerializer` Angular che toglie/aggiunge i parametri di contesto come prefisso dell'URL (es. `/electronics-spa/en/USD/...`).
Path: `core-libs/core/src/site-context/services/site-context-url-serializer.ts`

**SiteThemeService**
Applica il tema grafico (classe CSS) scelto per il sito.
Path: `core-libs/core/src/site-theme/facade/site-theme.service.ts`

**SkipLink**
Link "salta al contenuto" per utenti da tastiera e screen reader.
Path: `core-libs/storefront/layout/a11y/skip-link/component/skip-link.component.ts`

**Slot (content slot)**
Area con nome dentro un page template (es. `Section1`, `SiteLogo`) che contiene una lista di componenti CMS.
Path: `core-libs/storefront/cms-structure/page/slot/page-slot.component.ts`

**SmartEdit**
Editor visuale di SAP Commerce: apre la vetrina in un iframe con un `cmsTicketId` in anteprima e decora il DOM.
Path: `feature-libs/smartedit/root/smart-edit-root.module.ts`

**SplitViewComponent**
Componente di layout a pannelli affiancati (usato nell'amministrazione B2B).
Path: `core-libs/storefront/shared/components/split-view/split/split-view.component.ts`

**SSR (Server-Side Rendering)**
Il server Node/Express esegue l'app Angular e restituisce HTML già pieno; poi il browser idrata.
Path: `projects/storefrontapp/src/server.ts`

**SsrOptimizationOptions**
Opzioni dell'engine: `timeout` (3000 ms), `cache`, `concurrency` (10), `forcedSsrTimeout`, `maxRenderTime`, `reuseCurrentRendering`, `renderingStrategyResolver`, `logger`.
Path: `core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts`

**StateConfig**
Config dello state: `state.ssrTransfer.keys` (quali parti dello store passare dal server al browser).
Path: `core-libs/core/src/state/config/state-config.ts`

**StatePersistenceService**
Sincronizza una parte di stato con `localStorage`/`sessionStorage` (es. id del carrello, token).
Path: `core-libs/core/src/state/services/state-persistence.service.ts`

**StateUtils**
Namespace di utility NgRx: action, reducer e selector per loader, entity loader, processes loader, scoped loader.
Path: `core-libs/core/src/state/utils/utils-group.ts`

**StorageSyncType**
Enum: `NO_STORAGE`, `LOCAL_STORAGE`, `SESSION_STORAGE`.
Path: `core-libs/core/src/state/config/state-config.ts`

**StorefrontComponent (`<cx-storefront>`)**
Componente radice della vetrina: header, main con `router-outlet`, footer, messaggi globali.
Path: `core-libs/storefront/layout/main/storefront.component.ts`

**Styles (`@spartacus/styles`)**
Libreria SCSS con variabili CSS, stili dei componenti e temi (`theme-sparta`, `theme-santorini`, `theme-lambda`).
Path: `core-libs/styles/_index.scss`

## T

**TestConfigModule**
Modulo per iniettare config nei test e2e leggendo JSON da un cookie, senza ricompilare.
Path: `core-libs/core/src/config/test-config.module.ts`

**TransferState (Spartacus)**
Il server copia le parti di store indicate in `ssrTransfer.keys` nella chiave `cx-state` di Angular `TransferState`; il browser le rilegge all'avvio.
Path: `core-libs/core/src/state/reducers/transfer-state.reducer.ts`

**TranslatePipe (`cxTranslate`)**
Pipe di traduzione: `{{ 'common.save' | cxTranslate }}`; carica il chunk giusto se manca.
Path: `core-libs/core/src/i18n/translate.pipe.ts`

**TranslationChunkService**
Dato una chiave (`cart.title`), trova il chunk che la contiene secondo `i18n.chunks`.
Path: `core-libs/core/src/i18n/translation-chunk.service.ts`

**TranslationService**
Classe astratta di traduzione (`translate(key, options)` → Observable); l'implementazione usa i18next.
Path: `core-libs/core/src/i18n/translation.service.ts`

**TrapFocusDirective**
Tiene il focus dentro un elemento (es. un dialog) finché resta aperto.
Path: `core-libs/storefront/layout/a11y/keyboard-focus/trap/trap-focus.directive.ts`

**typeCode**
Tipo del componente CMS nel backend (es. `SimpleBannerComponent`). È la chiave con cui si cerca la mappatura in `cmsComponents`.
Path: `core-libs/core/src/cms/model/content-slot-component-data.model.ts`

## U

**uid**
Identificativo unico di un componente (o slot) nel catalogo CMS. Serve a scaricare i dati del componente e a mappare i `JspIncludeComponent`.
Path: `core-libs/core/src/model/cms.model.ts`

**UnifiedInjector**
Injector "unione" che vede sia i provider della root sia quelli dei moduli lazy già caricati.
Path: `core-libs/core/src/lazy-loading/unified-injector.ts`

**UrlCommands / `cxUrl` pipe**
Comandi URL che possono contenere oggetti `{ cxRoute, params }`. La pipe `cxUrl` e `RoutingService.go` li traducono in percorsi.
Path: `core-libs/core/src/routing/configurable-routes/url-translation/url.pipe.ts`

**UrlMatcherService**
Crea `UrlMatcher` Angular a partire dai `paths` configurati (supporta parametri e wildcard).
Path: `core-libs/core/src/routing/services/url-matcher.service.ts`

**UserIdService**
Fornisce l'id da mettere negli URL OCC: `current` se loggato, `anonymous` se no, o l'id del cliente emulato in ASM.
Path: `core-libs/core/src/auth/user-auth/facade/user-id.service.ts`

## V

**Variants (varianti prodotto)**
Feature per prodotti con varianti (taglia, colore): selettori nella pagina prodotto.
Path: `feature-libs/product/variants/root/product-variants-root.module.ts`

## W

**WindowRef**
Accesso sicuro a `window` e `document`: `isBrowser()` evita errori in SSR, dove `window` non esiste.
Path: `core-libs/core/src/window/window-ref.ts`

**Wish list**
Lista dei desideri: è un carrello speciale (`CartType.WISH_LIST`) gestito dal multi-cart.
Path: `feature-libs/cart/wish-list/core/facade/wish-list.service.ts`

**WithCredentialsInterceptor**
Aggiunge `withCredentials: true` alle chiamate OCC se configurato (cookie cross-origin).
Path: `core-libs/core/src/occ/interceptors/with-credentials.interceptor.ts`

---

## Errori comuni

Coppie di termini che si confondono spesso:

| Si confonde... | ...con | Differenza |
|---|---|---|
| **Chunk di config** (`ConfigChunk`) | **Chunk i18n** (`i18n.chunks`) | Il primo è un pezzo di configurazione fuso con `deepMerge`; il secondo è un gruppo di chiavi di traduzione caricate insieme. |
| **Outlet** (`cxOutlet`) | **Slot** (`cx-page-slot`) | Lo slot è dati del CMS (lista di componenti); l'outlet è un punto di estensione nel template Angular. Uno slot ha un outlet con lo stesso nome, ma sono due cose diverse. |
| **Slot** | **Page template** | Il template decide *quali* slot e in che ordine (via `layoutSlots`); lo slot contiene i componenti. |
| **typeCode** | **uid** | `typeCode` è il *tipo* (tanti componenti, stesso tipo); `uid` è l'*istanza* (uno solo). La mappatura `cmsComponents` usa il `typeCode`. |
| **typeCode** | **flexType** | Per i `CMSFlexComponent` il `typeCode` è sempre `CMSFlexComponent`; conta il `flexType`. |
| **Normalizer** | **Serializer** | Normalizer: backend → UI (in lettura). Serializer (converter): UI → backend (in scrittura). |
| **Serializer (converter)** | **`SiteContextUrlSerializer`** e `core-libs/core/src/state/utils/serializer.ts` | Stesso nome, compiti diversi: il primo gestisce l'URL del browser, il secondo trasforma una `SearchConfig` in una stringa-chiave per lo store. |
| **Adapter** | **Connector** | L'adapter è astratto e specifico del backend (OCC); il connector è il punto stabile che il resto del codice usa. |
| **Facade** | **Service core** | La facade (in `root`) è il contratto pubblico e spesso un proxy lazy; il service in `core` è l'implementazione vera. |
| **Query** | **Command** | Query legge e mette in cache (con `reloadOn`/`resetOn`); Command esegue scritture con una strategia di concorrenza. |
| **LoaderState** | **QueryState** | `LoaderState` vive nello store NgRx (`loading`, `error`, `success`, `value`); `QueryState` è fuori da NgRx (`loading`, `error`, `data`). |
| **EntityLoaderState** | **ProcessesLoaderState** | Il primo è un dizionario per id; il secondo aggiunge un contatore di processi a un singolo `LoaderState`. |
| **`OCC_USER_ID_CURRENT`** | **`OCC_CART_ID_CURRENT`** | Hanno lo stesso valore (`'current'`) ma stanno in segmenti URL diversi (`users/current` e `carts/current`). |
| **anonymous** | **guest** | `anonymous` = non loggato (qualsiasi visitatore); `guest` = ha scelto il checkout come ospite con la sua email. |
| **ASM** | **CDC / CDS** | ASM è una feature lib (agente che emula il cliente); CDC (login esterno) e CDS (merchandising) sono integration lib. |
| **Feature toggle** | **Feature level** | Toggle = interruttore singolo con nome; level = versione minima di comportamento (`cxFeatureLevel`). |
| **`provideConfig`** | **`provideDefaultConfig`** | Il primo è per l'app (vince); il secondo è per le lib (viene sovrascritto). |
| **`APP_INITIALIZER`** | **`MODULE_INITIALIZER`** | Il primo gira all'avvio dell'app; il secondo quando si carica una feature lazy. |
| **SSR fallback (CSR)** | **Errore SSR** | Se il render supera `timeout`, l'engine manda l'HTML "vuoto" (CSR) e il browser fa tutto: non è un errore, è previsto. |
| **Angular HTTP transfer cache** | **TransferState di Spartacus** | L'app demo disattiva la cache HTTP di Angular (`withNoHttpTransferCache`); Spartacus trasferisce lo *store NgRx* con la chiave `cx-state`. |
| **Secondary entry point** | **Modulo lazy** | L'entry point è un confine di pacchetto (import); il lazy loading è un `import()` a runtime. Spesso coincidono (`core` di una feature), ma non sempre. |
| **Recipe B2B** | **Integration lib** | La ricetta B2B cambia config OCC e aggiunge moduli; non serve un addon esterno oltre al backend B2B standard. |

---

## Domande di autoverifica

1. Qual è la differenza tra `typeCode`, `uid` e `flexType`? Quale dei tre usa `cmsComponents`?
2. In quale file è definita la classe `Config`, e perché è una classe astratta e non un'interfaccia?
3. Se l'app e una lib registrano lo stesso valore di config, chi vince? Con quali funzioni?
4. Che cosa fa `facadeFactory` alla prima chiamata di un metodo della facade?
5. Che differenza c'è tra un chunk di config e un chunk i18n?
6. Quale costante vale `'current'` nel segmento `carts/` e dove è definita?
7. Quando `UserIdService` restituisce `anonymous` e quando l'id di un altro cliente?
8. Qual è la differenza tra normalizer e serializer? Fai un esempio di token per ciascuno.
9. Che cosa succede se una render SSR supera il `timeout` di `OptimizedSsrEngine`?
10. Quali URL e parametri forzano il CSR con il `renderingStrategyResolver` di default?
11. Dove si configura quali slot mostrare per un page template? E dove la "piega" della pagina?
12. Che differenza c'è tra `DeferLoadingStrategy.DEFER` e `INSTANT`?
13. Che cosa sono `REPLACE`, `BEFORE`, `AFTER` e dove si usano?
14. Che differenza c'è tra `LoaderState`, `EntityLoaderState` e `QueryState`?
15. Che cos'è un secondary entry point e come si riconosce nel repository?
16. Perché `SiteContextUrlSerializer` è necessario, e che cosa produce per `/electronics-spa/en/USD/cart`?
17. Qual è il ruolo di un `XxxRootModule` in una feature lib?
18. In che cosa differiscono ASM, CDC e CDS?
19. Quale chiave di `TransferState` usa Spartacus e in quale file?
20. Perché si usa `WindowRef` invece di `window`?
