# 31 — Domande da colloquio

> Revisione del codice: versione `2611.0.0` (Angular 21.2, NgRx 21, RxJS 7.8, TS 5.9).
> Tutti i path sono relativi alla root del repository (`/home/user/spartacus`) e sono stati verificati con `test -e`.
> Per i termini usa `30-GLOSSARIO.md`; per approfondire ogni risposta c'è il capitolo indicato tra parentesi (es. "file 04").

---

## In una frase

Sessanta domande con risposta, dal livello junior al livello architetto, per verificare (o dimostrare in un colloquio) di aver capito come funziona Spartacus sopra Angular, SSR e OCC.

---

## Il problema che risolve

Leggere il codice non basta per un colloquio: bisogna saper **spiegare a voce**, in poco tempo, *perché* una cosa è fatta così e *dove* sta nel codice. I problemi tipici sono:

1. **Risposte troppo generiche** ("Spartacus usa NgRx"): chi fa il colloquio vuole il meccanismo (quale token, quale servizio, quale flusso).
2. **Confusione tra Angular e Spartacus**: molte domande sono sul confine (router Angular vs route semantiche, `APP_INITIALIZER` vs `CONFIG_INITIALIZER`, `TransferState` Angular vs `cx-state`).
3. **Nessun esempio concreto**: una risposta con un path e tre righe di codice vale molto di più.

Questo file dà, per ogni domanda, una risposta breve (5–15 righe), almeno un path reale e, dove serve, uno snippet.

---

## Come è implementato (con path)

Come è organizzato il file:

| Livello | Domande | Cosa si verifica |
|---|---|---|
| Junior | J1–J15 | vocabolario, struttura delle librerie, uso base (config, CMS, traduzioni, URL) |
| Mid | M1–M20 | meccanismi interni: config, data layer, rendering CMS, outlet, routing, state, eventi, auth |
| Senior | S1–S15 | lazy loading, facade proxy, SSR ottimizzato, transfer state, multi-cart, performance |
| Architetto | A1–A10 | scelte di progetto: nuove feature lib, backend alternativo, multi-sito, produzione, migrazioni |

Dopo le domande trovi: "Flusso passo-passo" (come prepararsi), "Codice minimo riscritto a mano" (3 esercizi di coding con soluzione), "Errori comuni", "Domande di autoverifica".

---

## Livello Junior (15)

### J1. Che cos'è Spartacus?

Spartacus è un insieme di **librerie Angular** (non un'app) per costruire una vetrina e-commerce "headless" sopra SAP Commerce Cloud. Il frontend parla con il backend solo via REST (API OCC). L'app cliente installa le librerie, le configura e le estende.
- `@spartacus/core` (`core-libs/core`) contiene la logica senza UI.
- `@spartacus/storefront` (`core-libs/storefront`) contiene il motore CMS e la UI.
- Le feature opzionali sono in `feature-libs/`, le integrazioni con addon in `integration-libs/`.
L'app demo del repository è `projects/storefrontapp/`.
Punto chiave da dire: la pagina è **guidata dal CMS**, cioè il backend decide quali componenti mostrare (file 01, 04).

### J2. Che differenza c'è tra `@spartacus/core` e `@spartacus/storefront`?

`core` non ha componenti visuali: config, site context, OCC, auth, stato NgRx, dati CMS, routing, i18n, eventi.
Il suo modulo radice è `BaseCoreModule` in `core-libs/core/src/base-core.module.ts`.
`storefront` contiene tutto ciò che si vede: il motore che trasforma pagine CMS in componenti Angular (`core-libs/storefront/cms-structure/`), layout, componenti CMS standard e componenti condivisi.
Il suo modulo radice è `BaseStorefrontModule` in `core-libs/storefront/base-storefront.module.ts`, che importa anche `BaseCoreModule`.
Separarli permette di usare `core` anche con una UI completamente diversa.

### J3. Come parte l'app demo?

1. `projects/storefrontapp/src/main.ts` chiama `bootstrapApplication(AppComponent, appConfig)`.
2. `projects/storefrontapp/src/app/app.config.ts` registra `provideHttpClient(withFetch(), withInterceptorsFromDi())`, l'hydration, Zone.js e `importProvidersFrom(AppModule)`.
3. `projects/storefrontapp/src/app/app.module.ts` importa `StoreModule.forRoot({})`, `EffectsModule.forRoot([])` e `SpartacusModule`.
4. `SpartacusModule` (`projects/storefrontapp/src/app/spartacus/spartacus.module.ts`) importa `BaseStorefrontModule` e i moduli di feature e configurazione.
Quindi: guscio standalone moderno, contenuto a `NgModule`. `withInterceptorsFromDi()` è obbligatorio perché gli interceptor Spartacus usano `HTTP_INTERCEPTORS` (file 02).

### J4. Che cos'è OCC e com'è fatto un URL OCC?

OCC (Omni Commerce Connect) è l'API REST di SAP Commerce. Un URL tipico è:
`{baseUrl}/occ/v2/{baseSite}/products/{code}?fields=...&lang=en&curr=USD`.
- `baseUrl` e `prefix` vengono da `OccConfig` (`core-libs/core/src/occ/config/occ-config.ts`; il prefisso di default `/occ/v2/` è in `core-libs/core/src/occ/config/default-occ-config.ts`).
- `baseSite` viene dal site context.
- Il resto (`products/${productCode}?fields=...`) è un template di endpoint, es. in `core-libs/core/src/occ/adapters/product/default-occ-product-config.ts`.
- `lang` e `curr` li aggiunge `SiteContextInterceptor`.
L'URL completo lo costruisce `OccEndpointsService.buildUrl(...)` (file 07).

### J5. Come arriva un componente CMS sulla pagina?

Il backend restituisce la pagina: un template (es. `LandingPage2Template`) e, per ogni slot, una lista di componenti con `uid` e `typeCode`. Spartacus cerca il `typeCode` in `cmsComponents` (config) e trova il componente Angular da usare.
```ts
provideConfig({
  cmsComponents: {
    SimpleBannerComponent: { component: MyBannerComponent },
  },
});
```
La mappatura è tipizzata in `core-libs/core/src/cms/config/cms-config.ts`. L'istanza la crea `ComponentWrapperDirective` (`core-libs/storefront/cms-structure/page/component/component-wrapper.directive.ts`). Se nessuno mappa quel `typeCode`, il componente semplicemente non viene mostrato (file 04).

### J6. Come legge i suoi dati un componente CMS custom?

Spartacus inietta un `CmsComponentData<T>` che ha `uid` e `data$` (Observable con i dati del CMS). È definito in `core-libs/storefront/cms-structure/page/model/cms-component-data.ts`.
```ts
@Component({
  selector: 'app-my-banner',
  template: `<h2 *ngIf="data$ | async as d">{{ d.headline }}</h2>`,
})
export class MyBannerComponent {
  data$ = inject(CmsComponentData<CmsBannerComponent>).data$;
}
```
Non si chiama il backend: i dati arrivano già con la pagina o vengono caricati da `CmsService` (`core-libs/core/src/cms/facade/cms.service.ts`).

### J7. Come configuri backend e sito?

Con `provideConfig`, che registra un chunk di configurazione:
```ts
provideConfig({
  backend: { occ: { baseUrl: 'https://api.example.com' } },
  context: {
    baseSite: ['electronics-spa'],
    language: ['en', 'de'],
    currency: ['USD'],
    urlParameters: ['baseSite', 'language', 'currency'],
  },
});
```
`provideConfig` è in `core-libs/core/src/config/config-providers.ts`. L'app demo lo fa in `projects/storefrontapp/src/app/spartacus/spartacus-b2c-configuration.providers.ts`. Il primo valore di ogni lista è il default (file 02).

### J8. Che cos'è il site context?

È "dove sei e come vuoi vedere il negozio": **base site**, **lingua**, **valuta** (più tema). Ogni parte ha un servizio: `BaseSiteService`, `LanguageService`, `CurrencyService` in `core-libs/core/src/site-context/facade/`.
Il contesto influenza:
- gli URL del browser (`/electronics-spa/en/USD/...`) tramite `SiteContextUrlSerializer`;
- le chiamate OCC (base site nel path, `lang`/`curr` come query parameter);
- le traduzioni e i dati CMS (cambiare lingua li ricarica).
Il modulo è `core-libs/core/src/site-context/site-context.module.ts`.

### J9. Come si traduce un testo?

Con la pipe `cxTranslate`: `{{ 'common.cancel' | cxTranslate }}` (`core-libs/core/src/i18n/translate.pipe.ts`).
La prima parte della chiave non è per forza il chunk: il chunk si trova con la mappa `i18n.chunks` (es. `core-libs/assets/src/translations/translation-chunks-config.ts`).
Se il chunk non è ancora caricato, il `TranslationService` (basato su i18next) lo carica e poi emette il testo.
Parametri: `{{ 'cart.items' | cxTranslate: { count: 3 } }}`.
Le traduzioni inglesi di default stanno in `core-libs/assets/src/translations/translations.ts` (file 10).

### J10. Come crei un link alla pagina prodotto?

Non si scrive `/product/123` a mano: si usa una **route semantica**.
```html
<a [routerLink]="{ cxRoute: 'product', params: product } | cxUrl">{{ product.name }}</a>
```
`cxUrl` (`core-libs/core/src/routing/configurable-routes/url-translation/url.pipe.ts`) chiede a `SemanticPathService` il percorso configurato per `product`. Di default è `product/:productCode/:name` con `paramsMapping: { productCode: 'code' }` (`core-libs/storefront/cms-structure/routing/default-routing-config.ts`).
Vantaggio: se il cliente cambia il formato degli URL, cambia solo la config.

### J11. Che cos'è una facade e perché i componenti la usano?

È una classe astratta pubblica (nell'entry point `root` della feature) con i metodi che un componente può chiamare. Esempio: `ActiveCartFacade` in `feature-libs/cart/base/root/facade/active-cart.facade.ts`.
Motivi:
1. **Isolamento**: il componente non sa se sotto c'è NgRx, Query o altro.
2. **Lazy loading**: la facade è creata con `facadeFactory`, quindi il codice vero (store, effects, connector) si scarica solo alla prima chiamata.
3. **Personalizzazione**: si può sostituire l'implementazione con un provider.
L'implementazione vera è in `core`, es. `feature-libs/cart/base/core/facade/active-cart.service.ts`.

### J12. Come mostri un messaggio all'utente?

Con `GlobalMessageService` (`core-libs/core/src/global-message/facade/global-message.service.ts`):
```ts
this.globalMessageService.add(
  { key: 'addressForm.userAddressAddSuccess' },
  GlobalMessageType.MSG_TYPE_CONFIRMATION
);
```
Il testo può essere una chiave di traduzione o un testo semplice (`{ raw: '...' }`). Il tipo (`GlobalMessageType`, in `core-libs/core/src/global-message/models/global-message.model.ts`) decide colore e durata. Molti messaggi di errore HTTP sono aggiunti in automatico da `HttpErrorInterceptor`.

### J13. Che cos'è l'SSR e perché serve a un e-commerce?

Server-Side Rendering: un server Node/Express esegue l'app Angular e restituisce HTML già pieno di contenuto. Vantaggi:
- **SEO**: i motori di ricerca vedono prodotti e prezzi.
- **Prima visualizzazione più veloce** (LCP) e anteprime dei link sui social.
Poi il browser scarica il JavaScript e "idrata" la pagina.
Nell'app demo il server è `projects/storefrontapp/src/server.ts` e usa `NgExpressEngineDecorator` da `@spartacus/setup/ssr` (`core-libs/setup/ssr/engine-decorator/ng-express-engine-decorator.ts`) (file 09).

### J14. Perché in Spartacus si usa `WindowRef` invece di `window`?

Perché lo stesso codice gira anche sul server (SSR), dove `window`, `document` e `localStorage` non esistono o sono finti. `WindowRef` (`core-libs/core/src/window/window-ref.ts`) offre `isBrowser()` e `nativeWindow` (che in SSR è `undefined`).
```ts
if (this.winRef.isBrowser()) {
  this.winRef.nativeWindow?.scrollTo(0, 0);
}
```
Usare `window` direttamente può far fallire il render SSR con `ReferenceError`.

### J15. Come si aggiunge una feature (es. checkout) a un progetto?

Con gli schematics: `ng add @spartacus/checkout`. Gli schematics:
1. installano il pacchetto npm e le sue dipendenze;
2. generano un modulo feature nell'app (come `projects/storefrontapp/src/app/spartacus/features/cart/cart-base-feature.module.ts`) con `featureModules` lazy e traduzioni;
3. importano quel modulo in `spartacus-features.module.ts` e aggiornano gli stili.
La collezione è `core-libs/schematics/src/collection.json`.
La configurazione di ogni lib per gli schematics è in `core-libs/schematics/src/shared/lib-configs/` (es. `core-libs/schematics/src/shared/lib-configs/cart-schematics-config.ts`).

---

## Livello Mid (20)

### M1. Come funziona il sistema di configurazione?

Ogni lib registra default con `provideDefaultConfig(...)` (token `DefaultConfigChunk`); l'app registra i suoi valori con `provideConfig(...)` (token `ConfigChunk`). I token sono in `core-libs/core/src/config/config-tokens.ts`.
- `DefaultConfig` = `deepMerge` di tutti i default.
- `RootConfig` = `deepMerge` di tutti i chunk dell'app.
- `Config` = `deepMerge({}, DefaultConfig, RootConfig)`: l'app vince.
`deepMerge` (`core-libs/core/src/config/utils/deep-merge.ts`) fonde gli oggetti ma **sostituisce** gli array. Quando una feature lazy porta nuova config, `ConfigurationService` (`core-libs/core/src/config/services/configuration.service.ts`) la unisce a runtime. Tutte le classi di config (`OccConfig`, `CmsConfig`) sono alias di `Config` (`useExisting: Config`).

### M2. Perché `Config` è una classe astratta e come fa ad avere tutti i campi?

Una classe astratta può essere usata come token di DI (un'interfaccia no, perché sparisce dopo la compilazione). I campi arrivano con il **declaration merging** di TypeScript: ogni file di config aggiunge sé stesso a `Config`.
```ts
declare module '../../config/config-tokens' {
  interface Config extends CmsConfig {}
}
```
Esempio in `core-libs/core/src/cms/config/cms-config.ts`. In build, uno strumento del repo gestisce questi blocchi per i pacchetti pubblicati: `tools/build-lib/declaration-merging/index.ts`. Risultato: `provideConfig({...})` ha autocompletamento su tutte le lib installate.

### M3. Descrivi il flusso Connector → Adapter → Converter.

Esempio carrello:
1. La facade/effect chiama `CartConnector.load(userId, cartId)` (`feature-libs/cart/base/core/connectors/cart/cart.connector.ts`).
2. Il connector delega all'**adapter astratto** `CartAdapter` (`feature-libs/cart/base/core/connectors/cart/cart.adapter.ts`).
3. L'implementazione OCC `OccCartAdapter` (`feature-libs/cart/base/occ/adapters/occ-cart.adapter.ts`) costruisce l'URL con `OccEndpointsService.buildUrl('cart', ...)`, fa la GET e applica `converterService.pipeable(CART_NORMALIZER)`.
4. I normalizer trasformano `Occ.Cart` nel modello UI `Cart`.
Per cambiare backend si sostituisce solo l'adapter (`{ provide: CartAdapter, useClass: MyAdapter }`); connector, store e UI restano uguali (file 07).

### M4. Normalizer e serializer: come aggiungi un tuo normalizer?

Un normalizer converte backend → UI, un serializer UI → backend. Sono converter registrati come **multi provider** su un `InjectionToken`; `ConverterService` (`core-libs/core/src/util/converter.service.ts`) li esegue tutti in ordine, passando il risultato come `target` al successivo.
```ts
@Injectable({ providedIn: 'root' })
export class BrandNormalizer implements Converter<Occ.Product, Product> {
  convert(source: Occ.Product, target: Product = {} as Product): Product {
    return { ...target, brand: (source as any).brand?.toUpperCase() };
  }
}
// nel modulo
{ provide: PRODUCT_NORMALIZER, useExisting: BrandNormalizer, multi: true }
```
`PRODUCT_NORMALIZER` è in `core-libs/core/src/product/connectors/product/converters.ts`; un serializer d'esempio è `ADDRESS_SERIALIZER` in `core-libs/core/src/user/connectors/address/converters.ts`.

### M5. Come cambi i `fields` di un endpoint OCC?

Sovrascrivi il template in config; `OccEndpointsService.buildUrl` (`core-libs/core/src/occ/services/occ-endpoints.service.ts`) lo legge ogni volta.
```ts
provideConfig({
  backend: { occ: { endpoints: {
    product: { details: 'products/${productCode}?fields=DEFAULT,brand,images(FULL)' },
  } } },
});
```
`${productCode}` viene sostituito con i `urlParams` (con `StringTemplate`, `core-libs/core/src/config/utils/string-template.ts`). Endpoint come `product` sono divisi per **scope** (`list`, `details`, ...). Attenzione: `deepMerge` sostituisce la stringa intera, quindi devi riscrivere tutti i campi che ti servono.

### M6. Che cosa sono gli scope di caricamento del prodotto?

Lo stesso prodotto si carica con "viste" diverse:
`list` (poche proprietà per la lista), `details` (pagina prodotto), `attributes`, `variants`, `price`, `stock`...
(enum `ProductScope` in `core-libs/core/src/product/model/product-scope.ts`).
`ProductService.get(code, scope)` chiede solo lo scope che serve;
`ProductLoadingService` (`core-libs/core/src/product/services/product-loading.service.ts`) evita doppie richieste.
I **loading scopes** (`core-libs/core/src/occ/config/loading-scopes-config.ts`) dicono che `details` include `list` e `variants`, e possono impostare `maxAge` o `reloadOn`.
`OccRequestsOptimizerService` unisce richieste parallele dello stesso prodotto in una sola chiamata con `fields` uniti.

### M7. Racconta il rendering di una pagina CMS, dall'URL al componente.

1. Il router Angular arriva alla route catch-all `**` (`core-libs/storefront/cms-structure/routing/cms-route/add-cms-route.ts`) protetta da `CmsPageGuard`.
2. `CmsPageGuard` (`core-libs/storefront/cms-structure/guards/cms-page.guard.ts`) calcola il `PageContext` e chiama `CmsService.getPage(...)`; se la pagina non esiste gestisce la pagina 404.
3. La pagina (template + slot + componenti) finisce nello store NgRx.
4. `PageLayoutComponent` legge il template e, con `layoutSlots`, l'elenco degli slot.
5. Ogni `PageSlotComponent` (`core-libs/storefront/cms-structure/page/slot/page-slot.component.ts`) prende i componenti dello slot.
6. `ComponentWrapperDirective` risolve il `typeCode` con `CmsComponentsService`, carica la feature lazy se serve e crea il componente con `CmsComponentData` (file 04).

### M8. Come sostituisci un pezzo di UI senza toccare la lib?

Con gli **outlet**. Ogni slot, template e molti punti dei componenti hanno un `*cxOutlet` con un nome. Puoi registrare un tuo contenuto con `REPLACE`, `BEFORE` o `AFTER` (`core-libs/storefront/cms-structure/outlet/outlet.model.ts`).
```html
<ng-template cxOutletRef="ProductAddToCartComponent" cxOutletPos="before">
  <app-shipping-info></app-shipping-info>
</ng-template>
```
Oppure da codice con `provideOutlet({ id: 'cx-header', component: MyHeader, position: OutletPosition.REPLACE })` (`core-libs/storefront/cms-structure/outlet/outlet.providers.ts`). La direttiva che rende gli outlet è `core-libs/storefront/cms-structure/outlet/outlet.directive.ts`. Per sostituire un intero componente CMS è più semplice ri-mappare il suo `typeCode` in `cmsComponents`.

### M9. Che cos'è `layoutSlots` e come aggiungi uno slot a un template?

`layoutSlots` (in `LayoutConfig`, `core-libs/storefront/layout/config/layout-config.ts`) dice, per ogni page template, **quali slot** mostrare e in che ordine, anche diversi per breakpoint. I default sono in `core-libs/storefront/recipes/config/layout-config.ts`, ad esempio:
```ts
LandingPage2Template: {
  pageFold: 'Section2B',
  slots: ['Section1', 'Section2A', 'Section2B', 'Section2C', 'Section3', 'Section4', 'Section5'],
},
```
Per aggiungere uno slot: `provideConfig({ layoutSlots: { LandingPage2Template: { slots: [...tutti, 'MySlot'] } } })`. Serve riscrivere tutta la lista perché gli array non si fondono. Lo slot deve esistere anche nel CMS (o in `CmsStructureConfig`), altrimenti resta vuoto.

### M10. Come funziona il routing configurabile?

Le route hanno un **nome** e dei `paths` in config (`RoutingConfig`, `core-libs/core/src/routing/configurable-routes/config/routing-config.ts`). All'avvio `ConfigurableRoutesService` (`core-libs/core/src/routing/configurable-routes/configurable-routes.service.ts`) prende le route Angular che hanno `data: { cxRoute: 'nome' }` e sostituisce il loro `path` con un `UrlMatcher` costruito dai `paths` configurati.
```ts
provideConfig({
  routing: { routes: { product: { paths: ['p/:productCode'] } } },
});
```
Nel codice si naviga per nome con `RoutingService.go({ cxRoute: 'product', params })` (`core-libs/core/src/routing/facade/routing.service.ts`) o con la pipe `cxUrl` (file 05).

### M11. Come finiscono lingua e valuta nell'URL del browser?

Se `context.urlParameters` contiene, ad esempio, `['baseSite', 'language', 'currency']`, `SiteContextUrlSerializer` (`core-libs/core/src/site-context/services/site-context-url-serializer.ts`) sostituisce l'`UrlSerializer` di Angular:
- in **lettura** toglie i primi segmenti (`/electronics-spa/en/USD`) e li salva come parametri di contesto;
- in **scrittura** li rimette davanti a ogni URL generato.
Così le route Angular non devono conoscere questi segmenti.
`SiteContextRoutesHandler` (`core-libs/core/src/site-context/services/site-context-routes-handler.ts`) sincronizza il cambio di contesto con la navigazione.

### M12. Che cos'è `StateUtils` e che forma ha un `LoaderState`?

`StateUtils` (`core-libs/core/src/state/utils/utils-group.ts`) è un gruppo di utility NgRx per non riscrivere sempre la stessa logica di caricamento.
- `LoaderState<T>` = `{ loading, error, success, value }` (`core-libs/core/src/state/utils/loader/loader-state.ts`).
- `EntityLoaderState<T>` = un `LoaderState` per id.
- `ProcessesLoaderState<T>` = `LoaderState` + `processesCount`.
Le action "loader" portano un `meta` con il tipo di entità; un reducer generico (`loaderReducer`) aggiorna `loading/success/error` e delega al reducer specifico solo il `value`. I selector come `loaderValueSelector` leggono la parte che serve (file 06).

### M13. Query e Command: che cosa sono e perché esistono?

Sono un'alternativa leggera a NgRx per le feature più nuove.
- `QueryService.create(loader, { reloadOn, resetOn })` (`core-libs/core/src/util/command-query/query.service.ts`) restituisce una `Query` con `get()` e `getState()`: tiene in cache il risultato e lo ricarica su eventi.
- `CommandService.create(fn, { strategy })` (`core-libs/core/src/util/command-query/command.service.ts`) restituisce un `Command` con `execute(params)`; la `CommandStrategy` decide cosa fare con chiamate concorrenti.
Esempio reale in `feature-libs/user/account/core/facade/user-account.service.ts`:
```ts
protected userQuery = this.query.create(() => this.loadUser(), {
  reloadOn: [UserAccountChangedEvent],
  resetOn: [LoginEvent, LogoutEvent],
});
```

### M14. Come reagisci a "prodotto aggiunto al carrello"?

Con `EventService` (`core-libs/core/src/event/event.service.ts`), senza dipendere dallo store:
```ts
this.events.get(CartAddEntrySuccessEvent).subscribe((e) => {
  analytics.track('add_to_cart', { code: e.productCode, qty: e.quantity });
});
```
L'evento è definito in `feature-libs/cart/base/root/events/cart.events.ts`. Gli eventi si registrano con `register(EventType, source$)` (spesso partendo da action NgRx tramite `StateEventService`, `core-libs/core/src/state/event/state-event.service.ts`) o si emettono con `dispatch(event)`. Tutti estendono `CxEvent`.

### M15. Come funziona l'autenticazione con OCC?

OAuth2:
`AuthService.loginWithCredentials` usa `OAuthLibWrapperService` (`core-libs/core/src/auth/user-auth/services/oauth-lib-wrapper.service.ts`) per chiamare `{baseUrl}/authorizationserver/oauth/token` (default in `core-libs/core/src/auth/user-auth/config/default-auth-config.ts`).
Il token finisce in `AuthStorageService` e `UserIdService` passa da `anonymous` a `current`.
`AuthInterceptor` (`core-libs/core/src/auth/user-auth/http-interceptors/auth.interceptor.ts`) aggiunge `Authorization:
Bearer ...` alle chiamate OCC.
Su **401 con token scaduto** chiede ad `AuthHttpHeaderService` di fare il refresh e ripete la richiesta; se il refresh fallisce, fa logout e manda al login.
Le chiamate senza utente (es. registrazione) usano un token client (`ClientTokenInterceptor`).

### M16. Quali guard usa Spartacus?

- **Guard di route classiche**:
`AuthGuard`, `NotAuthGuard` (`core-libs/core/src/auth/user-auth/guards/auth.guard.ts`), `ProtectedRoutesGuard` per negozi "chiusi".
- **`CmsPageGuard`** sulla route catch-all: carica la pagina CMS.
- **Guard dei componenti CMS**: in `cmsComponents` si può scrivere `guards: [CheckoutAuthGuard]`.
Visto che le pagine sono dinamiche, `CmsGuardsService` (`core-libs/storefront/cms-structure/services/cms-guards.service.ts`) esegue le guard di **tutti i componenti presenti nella pagina**.
Esempio:
`feature-libs/checkout/base/components/guards/checkout-auth.guard.ts` protegge i componenti del checkout.
Così la protezione segue il contenuto, non l'URL.

### M17. Come vengono caricate le traduzioni di una feature lazy?

Il modulo feature dell'app registra risorse e chunk:
```ts
provideConfig({
  i18n: {
    resources: { en: cartBaseTranslationsEn },
    chunks: cartBaseTranslationChunksConfig,
    fallbackLang: 'en',
  },
}),
```
(vedi `projects/storefrontapp/src/app/spartacus/features/cart/cart-base-feature.module.ts`). `TranslationChunkService` (`core-libs/core/src/i18n/translation-chunk.service.ts`) trova il chunk di una chiave; `I18nextTranslationService` carica il chunk alla prima richiesta. In alternativa, con `i18n.backend.loadPath`, le traduzioni si scaricano via HTTP invece di essere nel bundle.

### M18. Che cos'è un feature toggle e perché Spartacus ne ha tanti?

È un booleano in `FeatureToggles` (`core-libs/core/src/features-config/feature-toggles/config/feature-toggles.ts`) che attiva un comportamento nuovo (spesso di accessibilità) senza rompere le app esistenti a un aggiornamento minore. Le app nuove li ricevono accesi dagli schematics.
```ts
provideFeatureToggles({ a11yKeyboardAccessibleZoom: true })
```
```html
<div *cxFeature="'a11yKeyboardAccessibleZoom'">...</div>
```
Nel codice TS si legge con `FeatureConfigService.isEnabled('...')` (`core-libs/core/src/features-config/services/feature-config.service.ts`). Il toggle viene tolto (e il comportamento diventa standard) in una versione major.

### M19. Come si apre un dialog in Spartacus?

Con `LaunchDialogService` (`core-libs/storefront/layout/launch-dialog/services/launch-dialog.service.ts`). Ogni dialog ha un identificatore (`LAUNCH_CALLER` o una stringa) e una config in `launch` che dice quale componente e come aprirlo (inline, root, route).
```ts
this.launchDialogService
  .openDialog(LAUNCH_CALLER.ANONYMOUS_CONSENT, this.element, this.vcr, { consentId })
  ?.pipe(take(1))
  .subscribe();
```
Il componente del dialog legge i dati con `launchDialogService.data$` e si chiude con `closeDialog(reason)`. L'enum è in `core-libs/storefront/layout/launch-dialog/config/launch-config.ts`.

### M20. Come personalizzi il comportamento di un servizio Spartacus?

Quasi tutti i membri sono `protected` apposta. Si estende la classe e si sostituisce il provider:
```ts
@Injectable({ providedIn: 'root' })
export class MyProductNameNormalizer extends ProductNameNormalizer {
  override convert(source: Occ.Product, target?: Product): Product {
    const result = super.convert(source, target);
    return { ...result, name: result.name?.trim() };
  }
}
providers: [{ provide: ProductNameNormalizer, useClass: MyProductNameNormalizer }]
```
Il normalizer originale è in `core-libs/core/src/occ/adapters/product/converters/product-name-normalizer.ts`. Per le facade lazy si sostituisce il servizio in `core` nel modulo lazy (o la facade stessa). Regola: meglio config, poi outlet, poi override di provider, e solo alla fine copiare codice.

---

## Livello Senior (15)

### S1. Come funziona `facadeFactory` internamente?

`facadeFactory(descriptor)` (`core-libs/core/src/lazy-loading/facade-factory/facade-factory.ts`) è usato come `useFactory` di `@Injectable` sulla facade astratta. Crea un **oggetto proxy**:
- per ogni nome in `methods`, un metodo che prima risolve la feature (`FeatureModulesService.resolveFeature(feature)`), poi prende dall'injector del modulo lazy l'implementazione reale della facade e le inoltra la chiamata;
- se il metodo restituisce un Observable, il proxy restituisce subito un Observable che si "attacca" a quello reale quando la feature è pronta; se restituisce `void`, la chiamata parte comunque (fire-and-forget);
- `properties` funziona uguale per le proprietà Observable;
- `async: true` aspetta un tick dopo il caricamento, per dare tempo allo store lazy di inizializzarsi.
Il tipo `FacadeDescriptor` (`core-libs/core/src/lazy-loading/facade-factory/facade-descriptor.ts`) vieta metodi che restituiscono altro che Observable o void, perché un proxy non può restituire un valore sincrono non ancora disponibile.

### S2. Come si innesca il lazy loading di una feature?

Tre modi, tutti basati su `featureModules` in `CmsConfig` (`core-libs/core/src/cms/config/cms-config.ts`):
1. **Da CMS**: la feature dichiara `cmsComponents: ['MiniCartComponent']`; quando una pagina contiene quel `typeCode`, `CmsFeaturesService` carica il modulo.
2. **Da facade**: `facadeFactory` risolve la feature per nome (es. `CART_BASE_CORE_FEATURE`).
3. **Da dipendenza**: `dependencies` in una feature fa caricare prima altre feature.
Gli alias sono stringhe: `[CART_BASE_CORE_FEATURE]: CART_BASE_FEATURE` (in `feature-libs/cart/base/root/cart-base-root.module.ts`). L'`import()` vero lo scrive l'app (es. `projects/storefrontapp/src/app/spartacus/features/cart/cart-base-feature.module.ts`), così il bundler crea un chunk JS separato. Il caricamento lo fa `LazyModulesService` (`core-libs/core/src/lazy-loading/lazy-modules.service.ts`).

### S3. Che cosa succede quando un modulo lazy viene caricato?

`LazyModulesService`:
1. esegue `import()` e crea il `NgModuleRef` con come parent l'injector root (o quello delle dipendenze);
2. rende visibili i chunk di config del modulo (`provideDefaultConfig` dentro il modulo): `ConfigurationService` (`core-libs/core/src/config/services/configuration.service.ts`) legge `ConfigChunk`/`DefaultConfigChunk` tramite `UnifiedInjector`, anche dai moduli lazy, e rifà il merge;
3. esegue le funzioni `MODULE_INITIALIZER` (`core-libs/core/src/lazy-loading/tokens.ts`), l'equivalente lazy di `APP_INITIALIZER`;
4. emette `ModuleInitializedEvent`.
Esempio di `MODULE_INITIALIZER` e meta-reducer registrati in un modulo lazy: `feature-libs/cart/base/core/cart-persistence.module.ts`. `UnifiedInjector` (`core-libs/core/src/lazy-loading/unified-injector.ts`) permette di cercare provider `multi` sia in root sia nei moduli lazy già caricati (usato ad esempio per i page meta resolver).

### S4. Come funziona `OptimizedSsrEngine`?

È un wrapper intorno al motore Express di Angular (`core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts`). Per ogni richiesta:
1. chiede al `renderingStrategyResolver` se fare SSR o CSR;
2. se c'è una render in cache (con `cache: true`) la restituisce;
3. se ci sono già troppe render (`concurrency`, default 10) risponde con CSR;
4. avvia la render; se supera `timeout` (default 3000 ms) invia subito l'HTML vuoto (**fallback CSR**) ma lascia finire la render in background per metterla in cache;
5. con `reuseCurrentRendering` più richieste uguali aspettano la stessa render invece di avviarne altre.
Opzioni e default in `core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts`. L'app demo legge `SSR_TIMEOUT` e `SSR_CACHE` da variabili d'ambiente in `projects/storefrontapp/src/server.ts`.

### S5. Perché checkout e my-account non vengono renderizzate lato server?

Il resolver di default (`core-libs/setup/ssr/optimized-engine/rendering-strategy-resolver.ts`, opzioni in `core-libs/setup/ssr/optimized-engine/rendering-strategy-resolver-options.ts`) restituisce `ALWAYS_CSR` per URL che contengono `checkout`, `my-account`, `punchout`, `opf` e per il parametro `asm`.
Motivi:
- sono pagine **personali**: il server non ha il token dell'utente (sta nel browser), quindi renderizzerebbe una pagina sbagliata o vuota;
- **non servono alla SEO**;
- metterle in cache sarebbe un rischio di **fuga di dati** tra utenti.
Si può forzare con una funzione custom `renderingStrategyResolver` che restituisce `RenderingStrategy.ALWAYS_SSR`/`ALWAYS_CSR`/`DEFAULT`.

### S6. Come passa lo stato dal server al browser?

Due meccanismi, uno solo attivo nell'app demo per l'HTTP:
- L'app demo **disattiva** la transfer cache HTTP di Angular con `withNoHttpTransferCache()` (`projects/storefrontapp/src/app/app.config.ts`).
- Spartacus usa un **meta-reducer** (`core-libs/core/src/state/reducers/transfer-state.reducer.ts`): sul server, a render finita, copia nel `TransferState` di Angular (chiave `cx-state`) le parti di store elencate in `state.ssrTransfer.keys` (`core-libs/core/src/state/config/state-config.ts`), per esempio i dati CMS e i prodotti; nel browser, all'avvio, le rimette nello store.
Se l'utente è già loggato nel browser, lo stato trasferito viene ignorato, perché il server lo ha calcolato come anonimo.
Risultato: niente doppie chiamate OCC dopo l'idratazione.

### S7. Che ruolo hanno `pageFold` e il defer loading in SSR?

Con `DeferLoadingStrategy.DEFER` (`core-libs/core/src/cms/config/cms-config.ts`) un componente o slot viene creato solo quando entra nel viewport (`IntersectionService`, `core-libs/storefront/layout/loading/intersection.service.ts`).
Ma sul server non c'è viewport: si renderizzano tutti gli slot **fino a `pageFold`** (config per template in `layoutSlots`, campo in `core-libs/storefront/layout/config/layout-config.ts`), il resto è rimandato al browser.
Vantaggi:
HTML più piccolo e render SSR più veloce (meno rischio di timeout), mentre la parte "above the fold" è subito visibile e indicizzabile.
`DeferLoaderService` (`core-libs/storefront/layout/loading/defer-loader.service.ts`) decide in base alla piattaforma.

### S8. Come si gestiscono gli errori durante l'SSR?

Obiettivo: non mettere in cache (e non servire con status 200) una pagina rotta.
- `HttpErrorHandlerInterceptor` (`core-libs/core/src/error-handling/http-error-handler/http-error-handler.interceptor.ts`) manda gli errori HTTP all'`ErrorHandler`.
- `CxErrorHandler` (`core-libs/core/src/error-handling/cx-error-handler.ts`) e `MultiErrorHandler` distribuiscono l'errore; in SSR uno dei gestori lo propaga al server (`core-libs/setup/ssr/error-handling/error-response/propagate-error-to-server.ts`).
- L'engine vede l'errore, non salva la render in cache (`shouldCacheRenderingResult` di default è `!err`) e passa agli error handler Express (`defaultExpressErrorHandlers` in `core-libs/setup/ssr/error-handling/express-error-handlers/express-error-handlers.ts`), che rispondono con lo status giusto (es. 404, 500) e l'HTML CSR.
I log strutturati passano da `LoggerService` → `ExpressServerLogger`.

### S9. Come funziona il multi-cart e perché `OCC_CART_ID_CURRENT` è speciale?

Lo store `multi-cart` (`feature-libs/cart/base/core/store/reducers/multi-cart.reducer.ts`) tiene più carrelli per id con `EntityProcessesLoaderState`: ogni carrello ha `LoaderState` + contatore di processi.
`isStable()` è vero solo quando non ci sono processi in corso: si usa per non leggere un carrello "a metà" durante add/remove multipli.
`OCC_CART_ID_CURRENT` (`'current'`, in `core-libs/core/src/occ/utils/occ-constants.ts`) si usa quando non si conosce ancora il codice del carrello dell'utente loggato.
In `OccCartAdapter.load` (`feature-libs/cart/base/occ/adapters/occ-cart.adapter.ts`) se `cartId === 'current'` si caricano **tutti** i carrelli e si prende quello senza `saveTime` (cioè non salvato).
`ActiveCartService` gestisce poi il merge tra carrello anonimo e carrello utente al login.

### S10. A cosa servono i meta-reducer in Spartacus?

Un meta-reducer avvolge tutti i reducer e vede ogni action. Spartacus li usa per:
- il **transfer state** (S6), registrato in `core-libs/core/src/state/reducers/index.ts` come `META_REDUCERS` multi;
- logica trasversale di singole feature, per esempio `feature-libs/cart/base/core/cart-persistence.module.ts` registra un meta-reducer che reimposta lo stato del carrello attivo in certe condizioni.
Sono utili quando serve agire "prima" di tutti i reducer o su tutto lo stato.
Svantaggio: sono difficili da debuggare, quindi vanno usati solo per preoccupazioni globali.

### S11. Quali leve di performance offre Spartacus?

- **Lazy loading** di feature (`featureModules`) e di traduzioni (chunk).
- **Defer loading** di slot e componenti fuori viewport, e `pageFold` per l'SSR.
- **Scope OCC** e `fields` minimi; `OccRequestsOptimizerService` (`core-libs/core/src/occ/services/occ-requests-optimizer.service.ts`) unisce richieste.
- **Transfer state** per non ripetere chiamate dopo l'idratazione.
- **Cache SSR** (`RenderingCache`, `core-libs/setup/ssr/optimized-engine/rendering-cache/rendering-cache.ts`) e cache CDN davanti.
- **Immagini responsive** con `MediaComponent` (`srcset`, `core-libs/storefront/shared/components/media/media.component.ts`).
- **Paginazione** del caricamento componenti (`componentsLoading.pageSize` in `CmsConfig`).

### S12. Come si carica la config in modo asincrono all'avvio?

Con un `ConfigInitializer` registrato su `CONFIG_INITIALIZER` (`core-libs/core/src/config/config-initializer/config-initializer.ts`).
Ha `scopes` (le parti di config che fornisce) e `configFactory()` che restituisce una Promise.
Esempio:
`SiteContextConfigInitializer` (`core-libs/core/src/site-context/config/config-loader/site-context-config-initializer.ts`) con `scopes = ['context']` è attivo solo se l'app **non** configura `context.baseSite` (vedi `initSiteContextConfig` in `core-libs/core/src/site-context/site-context.module.ts`): scarica tutti i base site da OCC, sceglie quello i cui pattern URL corrispondono all'URL corrente e ne ricava base site, lingue, valute e `urlParameters`.
Chi ha bisogno di quella parte usa `ConfigInitializerService.getStable('context')` (`core-libs/core/src/config/config-initializer/config-initializer.service.ts`), che aspetta la fine degli initializer.
L'avvio dell'app aspetta tutti gli initializer tramite un `APP_INITIALIZER` interno.

### S13. Che cosa succede quando l'utente cambia lingua?

1. `LanguageService.setActive('de')` aggiorna lo store del site context e lo persiste.
2. `SiteContextUrlSerializer` produce i nuovi URL (`/electronics-spa/de/USD/...`) e il routes handler aggiorna l'URL.
3. `SiteContextInterceptor` aggiunge `lang=de` alle chiamate OCC successive.
4. I servizi che ascoltano il cambio di contesto ricaricano: CMS (pagina e componenti), prodotti, traduzioni (`i18next.changeLanguage`), direzione del testo (`DirectionService`).
5. Viene emesso un evento di cambio contesto (`core-libs/core/src/site-context/events/site-context.events.ts`).
I servizi sono in `core-libs/core/src/site-context/facade/language.service.ts` e `core-libs/core/src/site-context/services/site-context-routes-handler.ts`.

### S14. Quali strumenti di accessibilità offre Spartacus?

- `[cxFocus]` (`core-libs/storefront/layout/a11y/keyboard-focus/focus.directive.ts`): autofocus, blocco del focus, ritorno del focus, navigazione con frecce.
- Trap del focus nei dialog (`core-libs/storefront/layout/a11y/keyboard-focus/trap/trap-focus.directive.ts`).
- **Skip link** per saltare al contenuto (`core-libs/storefront/layout/a11y/skip-link/component/skip-link.component.ts`).
- Molti **feature toggle `a11y...`** che attivano correzioni di accessibilità senza rompere chi aggiorna.
- `DirectionService` per lingue RTL.
Nel repository le modifiche di accessibilità devono seguire gli standard SAP indicati nelle istruzioni di progetto (`.claude/CLAUDE.md`).

### S15. Che cosa sono i secondary entry point e perché contano?

Un pacchetto come `@spartacus/cart` ha molti sotto-pacchetti importabili separatamente: `@spartacus/cart/base/root`, `.../core`, `.../occ`, `.../components`, `.../assets`. Ognuno ha un proprio `ng-package.json` (es. `feature-libs/cart/base/root/ng-package.json`) e un `public_api.ts`.
Perché contano:
- **Lazy loading**: l'app importa `root` subito e `core`/`occ`/`components` solo dentro `import()`. Se un file sempre caricato importasse da `core`, il codice lazy finirebbe nel bundle principale.
- **API pubblica**: solo ciò che è esportato da `public_api.ts` è contratto; il resto può cambiare.
- **Tree-shaking** migliore.
Regola: `root` non deve mai importare da `core`/`components` della stessa feature.

---

## Livello Architetto (10)

### A1. Come struttureresti una nuova feature lib "loyalty"?

Seguirei il pattern di `feature-libs/cart/base/`:
- `root/`: facade astratte con `facadeFactory`, modelli, eventi, feature name, `LoyaltyRootModule` con `provideDefaultConfig({ featureModules: { loyalty: { cmsComponents: ['LoyaltyPointsComponent'] } } })`.
- `core/`: implementazione delle facade (Query/Command per una feature nuova), connector e adapter astratto.
- `occ/`: adapter OCC, endpoint di default, normalizer.
- `components/`: componenti CMS e loro mapping `cmsComponents`.
- `assets/`: traduzioni e chunk.
Più: schematics per `ng add`, feature toggle per i cambi futuri, test. Esempio completo da imitare: `feature-libs/cart/base/root/cart-base-root.module.ts` e `projects/storefrontapp/src/app/spartacus/features/cart/cart-base-feature.module.ts`.

### A2. Il cliente vuole usare un backend che non è SAP Commerce. Come fai?

Il data layer è pensato per questo: la UI e lo store dipendono da **connector** e **adapter astratti**, non da OCC.
1. Per ogni area usata (prodotto, carrello, CMS, utente) scrivi un adapter che implementa l'interfaccia astratta, es. `CmsPageAdapter` (`core-libs/core/src/cms/connectors/page/cms-page.adapter.ts`) e `CartAdapter`.
2. Scrivi normalizer dal formato del tuo backend ai modelli Spartacus.
3. Registra `{ provide: CartAdapter, useClass: MyCartAdapter }` e non importare i moduli OCC di quella feature.
Punti critici: il **CMS** (devi produrre pagine con template, slot e componenti), l'**auth** (OAuth diverso), gli **ID speciali** (`current`, `anonymous`) e le funzioni che OCC dà "gratis" (merge dei carrelli, promozioni). Spesso conviene un BFF che espone un'API compatibile OCC.

### A3. Come gestisci più brand o paesi con una sola app?

- **Più base site** in `context.baseSite` e `urlParameters` con `baseSite` (o mappatura dominio → sito): in alternativa, senza `context.baseSite` statico, `SiteContextConfigInitializer` sceglie il sito dall'URL corrente (pattern URL dei base site in OCC), quindi un dominio per brand funziona senza config diverse.
- **Temi** per brand con `SiteThemeService` (`core-libs/core/src/site-theme/facade/site-theme.service.ts`) e i temi SCSS di `core-libs/styles/`.
- **Layout e componenti** diversi guidati dal CMS (template diversi per sito), non dal codice.
- **Config per sito** con `ConfigInitializer` o config lato server se serve (es. meta tag `occ-backend-base-url`, `core-libs/core/src/occ/config/config-from-meta-tag-factory.ts`).
- **Cache SSR** con chiave che include dominio e contesto (`renderKeyResolver`).
Si evita di fare build diverse per brand: un solo artefatto, differenze in dati e config.

### A4. Come porteresti l'SSR in produzione?

- **Cache**: CDN davanti con TTL brevi sulle pagine pubbliche; `cache: true` dell'engine solo se la memoria è controllata (`cacheSizeMemory`), altrimenti affidarsi al CDN.
- **Timeout**: `timeout` basso (default 3 s) per garantire risposta veloce; `forcedSsrTimeout` per i bot se si forza SSR; `maxRenderTime` per liberare render bloccate.
- **Concorrenza**: `concurrency` tarata sulla CPU; scalare orizzontalmente (Node è single-thread).
- **Sicurezza**: `getOriginValidationMiddleware` (`core-libs/setup/ssr/express-utils/express-origin-validation-middleware.ts`) per validare l'origine, `trust proxy` corretto.
- **Osservabilità**: logger JSON strutturato (`core-libs/setup/ssr/logger/loggers/default-express-server-logger.ts`), metriche su fallback CSR e tempi di render.
- **Pagine personali** in CSR (rendering strategy).
Opzioni in `core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts`.

### A5. Come gestisci gli aggiornamenti di versione di Spartacus?

- `ng update @spartacus/schematics` esegue le **migrazioni** elencate in `core-libs/schematics/src/migrations/migrations.json` (rinomina import, avvisi su costruttori cambiati, commenti nel codice).
- I cambi di comportamento arrivano dietro **feature toggle** nelle minor; diventano default nelle major.
- Il codice custom deve dipendere solo dall'**API pubblica** (`public_api.ts` degli entry point) e usare estensione (`extends` + provider) invece di copie.
- Nel progetto: test e2e sulle personalizzazioni, un aggiornamento alla volta, lettura della documentazione di migrazione tecnica.
Più personalizzazioni sono fatte via config e outlet, meno costano gli upgrade.

### A6. In una feature nuova usi NgRx o Query/Command?

**Query/Command** se lo stato è "dati del server letti e scritti" senza logiche complesse tra più parti: meno codice, cache e ricarica su eventi incluse (`core-libs/core/src/util/command-query/query.service.ts`).
Esempio:
`feature-libs/user/account/core/facade/user-account.service.ts`.
**NgRx** se: più componenti modificano lo stesso stato in modo concorrente, serve uno stato derivato complesso, serve persistenza o transfer SSR tramite store, o ci sono molte transizioni (come il multi-cart, `feature-libs/cart/base/core/store/reducers/multi-cart.reducer.ts`).
In ogni caso la **facade** non cambia: i componenti non devono sapere cosa c'è sotto, così si può migrare in futuro.

### A7. Spartacus 2611 è standalone o a NgModule?

È ibrido. L'app demo parte in modo **standalone** (`bootstrapApplication` in `projects/storefrontapp/src/main.ts`, `ApplicationConfig` in `projects/storefrontapp/src/app/app.config.ts`), ma quasi tutta la libreria è ancora basata su **NgModule** con `forRoot()` e provider DI classici. Il ponte è `importProvidersFrom(AppModule)`.
Conseguenze:
- servono `withInterceptorsFromDi()` e le API "classiche" (`HTTP_INTERCEPTORS`, `APP_INITIALIZER`);
- il lazy loading delle feature resta a moduli (`NgModuleRef` creati da `LazyModulesService`);
- i componenti nuovi possono essere standalone ma vanno mappati comunque in `cmsComponents`.
Una migrazione completa a standalone richiederebbe di ripensare `featureModules` e `MODULE_INITIALIZER`.

### A8. Che cosa cambia architetturalmente tra B2C e B2B?

- **Config OCC**: la ricetta B2B sovrascrive endpoint (es. carrello e checkout con utenti di un'organizzazione): `core-libs/setup/recipes/b2b/config/default-b2b-occ-config.ts`.
- **Feature aggiuntive**: amministrazione organizzazione (`feature-libs/organization/administration/`), approvazione ordini (`feature-libs/organization/order-approval/root/order-approval-root.module.ts`), checkout B2B con centri di costo e tipo di pagamento (`feature-libs/checkout/b2b/root/checkout-b2b-root.module.ts`), ordini ricorrenti.
- **Ruoli** (`B2BUserRole`, `core-libs/core/src/model/org-unit.model.ts`) e spesso sito "chiuso" (`routing.protected: true`, `ProtectedRoutesGuard`).
- **SSR**: meno pagine pubbliche, quindi meno beneficio SEO.
L'app demo ha due file di configurazione: `projects/storefrontapp/src/app/spartacus/spartacus-b2c-configuration.providers.ts` e `projects/storefrontapp/src/app/spartacus/spartacus-b2b-configuration.providers.ts`.

### A9. Come si integrano servizi esterni come CDC, CDS, OPF?

Come **integration lib** con lo stesso pattern delle feature lib (root/core/occ/components), ma con punti di aggancio diversi:
- **CDC** (`integration-libs/cdc/root/cdc-root.module.ts`) sostituisce login e registrazione: si aggancia alle facade/servizi auth e ai componenti CMS di login.
- **CDS** (`integration-libs/cds/src/cds.module.ts`) aggiunge componenti CMS di merchandising e un tracciamento basato su `EventService`.
- **OPF** (`integration-libs/opf/base/root/opf-base-root.module.ts`) aggiunge un checkout e componenti di pagamento che parlano con un servizio esterno.
I punti di estensione usati sono sempre gli stessi: mapping `cmsComponents`, override di provider, eventi, outlet, config. Per questo, una buona architettura di progetto usa gli stessi meccanismi per le proprie integrazioni.

### A10. Come progetti osservabilità ed error handling end-to-end?

- **Browser**: `CxErrorHandler` (`core-libs/core/src/error-handling/cx-error-handler.ts`) come unico `ErrorHandler`; `MultiErrorHandler` per aggiungere un gestore che invia a un sistema esterno (Sentry o simili) senza sostituire quello di Spartacus.
- **Log**: sempre `LoggerService` (`core-libs/core/src/logger/logger.service.ts`), mai `console`, così in SSR i log sono strutturati e legati alla richiesta (`core-libs/setup/ssr/optimized-engine/request-context.ts`).
- **Errori HTTP**: `HttpErrorInterceptor` per i messaggi all'utente, `HttpErrorHandlerInterceptor` per la propagazione.
- **Errori NgRx**: le action di fallimento arrivano all'`ErrorHandler` (`core-libs/core/src/error-handling/effects-error-handler/effects-error-handler.module.ts`).
- **Server**: status HTTP corretti e niente cache delle pagine con errore.
Metriche chiave: tasso di fallback CSR, tempo di render, errori 5xx OCC.

---

## Flusso passo-passo

Come prepararsi a un colloquio su Spartacus in 7 passi:

1. **Vocabolario (1 giorno).** Leggi `30-GLOSSARIO.md` e la sezione "Errori comuni". Devi saper spiegare in una frase: facade, connector/adapter/converter, slot/outlet, typeCode/uid, chunk config/i18n.
2. **Avvio (mezza giornata).** Apri in ordine `projects/storefrontapp/src/main.ts`, `projects/storefrontapp/src/app/app.config.ts`, `projects/storefrontapp/src/app/app.module.ts`, `projects/storefrontapp/src/app/spartacus/spartacus.module.ts`. Disegna la catena dei moduli (file 02).
3. **Un dato dall'API allo schermo (1 giorno).** Segui un prodotto: `core-libs/core/src/product/facade/product.service.ts` → store → `core-libs/core/src/occ/adapters/product/occ-product.adapter.ts` → normalizer → componente (file 06, 07).
4. **Una pagina CMS (1 giorno).** Segui M7 con il codice aperto: `CmsPageGuard`, `PageLayoutComponent`, `PageSlotComponent`, `ComponentWrapperDirective` (file 04).
5. **Una feature lazy (mezza giornata).** Leggi `feature-libs/cart/base/root/cart-base-root.module.ts`, `feature-libs/cart/base/root/facade/active-cart.facade.ts` e il modulo feature dell'app. Spiega a voce S1–S3.
6. **SSR (1 giorno).** Leggi `projects/storefrontapp/src/server.ts` e `core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts`. Prova `npm run build:ssr` e simula un timeout (file 09).
7. **Esercizi a mano (1 giorno).** Rifai senza guardare i 3 esercizi qui sotto e rispondi alle domande di autoverifica. Per ogni risposta, cita un path: è ciò che distingue una risposta "da manuale" da una "da chi ha letto il codice".

Durante il colloquio: rispondi con la struttura **cosa → perché → dove (path) → esempio**.

---

## Codice minimo riscritto a mano

Tre esercizi tipici da lavagna. Le soluzioni sono semplificate: servono a dimostrare che hai capito il meccanismo, non a copiare Spartacus riga per riga.

### Esercizio 1 — Scrivi `deepMerge` come quello della config

Requisiti: fonde oggetti annidati da sinistra a destra, gli array e i valori semplici vengono **sostituiti**, ignora `__proto__` e `constructor` (sicurezza). Riferimento: `core-libs/core/src/config/utils/deep-merge.ts`.

```ts
function isObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

export function deepMerge(target: Record<string, any> = {}, ...sources: any[]): any {
  for (const source of sources) {
    if (!isObject(source)) continue;
    for (const key of Object.keys(source)) {
      if (key === '__proto__' || key === 'constructor') continue;
      const value = source[key];
      if (value instanceof Date) {
        target[key] = value;
      } else if (isObject(value)) {
        if (!isObject(target[key])) target[key] = {};
        deepMerge(target[key], value);
      } else {
        target[key] = value; // array e primitivi: sostituzione
      }
    }
  }
  return target;
}

// Uso: la config dell'app vince sui default
const config = deepMerge({}, { backend: { occ: { prefix: '/occ/v2/' } } },
                             { backend: { occ: { baseUrl: 'https://api' } } });
// { backend: { occ: { prefix: '/occ/v2/', baseUrl: 'https://api' } } }
```

Domanda di follow-up tipica: "perché gli array non vengono concatenati?" Risposta: perché non si potrebbe più *togliere* un elemento (es. uno slot da `layoutSlots`).

### Esercizio 2 — Una catena di converter con `pipeable`

Requisiti: più converter registrati sullo stesso token vengono eseguiti in ordine; il risultato di uno è il `target` del successivo; si usa come operatore RxJS. Riferimento: `core-libs/core/src/util/converter.service.ts`.

```ts
import { Injectable, InjectionToken, inject, Injector } from '@angular/core';
import { OperatorFunction, map } from 'rxjs';

export interface Converter<S, T> {
  convert(source: S, target?: T): T;
}

export const PRODUCT_NORMALIZER = new InjectionToken<Converter<any, any>[]>('ProductNormalizer');

@Injectable({ providedIn: 'root' })
export class MiniConverterService {
  private injector = inject(Injector);

  convert<S, T>(source: S, token: InjectionToken<Converter<S, T>[]>): T {
    const converters = this.injector.get(token, []);
    if (!converters.length) return source as unknown as T;
    return converters.reduce<T>(
      (target, c) => c.convert(source, target),
      undefined as unknown as T
    );
  }

  pipeable<S, T>(token: InjectionToken<Converter<S, T>[]>): OperatorFunction<S, T> {
    return map((source: S) => this.convert(source, token));
  }
}

// Registrazione (multi provider)
// { provide: PRODUCT_NORMALIZER, useClass: BaseProductNormalizer, multi: true },
// { provide: PRODUCT_NORMALIZER, useClass: ImageNormalizer, multi: true },
```

Follow-up: "che cosa succede se nessuno registra converter?" Il dato passa invariato (Spartacus fa lo stesso: se non ci sono converter restituisce la sorgente).

### Esercizio 3 — Una facade lazy con proxy

Requisiti: la facade astratta è iniettabile subito; alla prima chiamata carica il modulo con `import()` e inoltra la chiamata all'implementazione vera; i metodi restituiscono Observable. Riferimento: `core-libs/core/src/lazy-loading/facade-factory/facade-factory.ts`.

```ts
import { Injectable, Injector, createNgModule, inject, Type, AbstractType } from '@angular/core';
import { Observable, defer, from, shareReplay, switchMap } from 'rxjs';

function lazyFacade<T extends object>(
  facade: AbstractType<T>,
  load: () => Promise<Type<unknown>>,
  methods: (keyof T)[]
): T {
  const parent = inject(Injector);
  // carica il modulo una sola volta e restituisce l'implementazione
  const impl$ = defer(() => from(load())).pipe(
    switchMap(async (moduleType) => createNgModule(moduleType, parent).injector.get(facade)),
    shareReplay(1)
  );
  const proxy: any = {};
  for (const m of methods) {
    proxy[m] = (...args: unknown[]) =>
      impl$.pipe(switchMap((impl: any) => impl[m](...args) as Observable<unknown>));
  }
  return proxy as T;
}

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    lazyFacade(LoyaltyFacade, () => import('./loyalty-core.module').then((m) => m.LoyaltyCoreModule), ['getPoints']),
})
export abstract class LoyaltyFacade {
  abstract getPoints(): Observable<number>;
}
// Nel LoyaltyCoreModule: providers: [{ provide: LoyaltyFacade, useClass: LoyaltyService }]
```

Follow-up: "perché i metodi devono restituire Observable o void?" Perché al momento della chiamata l'implementazione può non essere ancora caricata: un valore sincrono non si può restituire. "Perché `injector.get(facade)` non restituisce di nuovo il proxy?" Perché il modulo lazy fornisce `LoyaltyFacade` nel **suo** injector, che ha la precedenza su quello root.

---

## Errori comuni

Errori che si sentono spesso nei colloqui (e nei progetti):

1. **"Spartacus è un'app Angular"**. No: è un insieme di librerie; l'app è del cliente. `projects/storefrontapp` è solo una demo.
2. **Confondere slot e outlet**. Lo slot è un dato del CMS; l'outlet è un punto di estensione del template (vedi `30-GLOSSARIO.md`).
3. **Mappare componenti per `uid`** invece che per `typeCode` (eccezione: `JspIncludeComponent` e `CMSFlexComponent` usano `uid`/`flexType`).
4. **Aspettarsi che `provideConfig` concateni gli array**: `deepMerge` sostituisce gli array (es. `layoutSlots.slots`, `routing.routes.x.paths`).
5. **Importare da `@spartacus/xxx/core` in un modulo sempre caricato**: distrugge il lazy loading della feature.
6. **Aggiungere metodi sincroni a una facade** con `facadeFactory`: il proxy non può restituirli.
7. **Usare `window`, `document`, `localStorage` direttamente**: rompe l'SSR. Usare `WindowRef` e `isPlatformBrowser`.
8. **Pensare che il fallback CSR sia un errore**: è il comportamento previsto quando la render supera `timeout`.
9. **Abilitare SSR su pagine personali** (checkout, account) o metterle in cache: rischio di mostrare dati di un altro utente.
10. **Riattivare la transfer cache HTTP di Angular** insieme al transfer state di Spartacus: dati duplicati e incoerenze.
11. **Scrivere URL a mano** (`'/product/' + code`) invece di `{ cxRoute: 'product', params }`: si rompe quando cambia la config.
12. **Dimenticare `withInterceptorsFromDi()`** nel bootstrap standalone: nessun interceptor Spartacus funziona (niente token, niente `lang`/`curr`).
13. **Confondere `OCC_USER_ID_CURRENT` e `OCC_CART_ID_CURRENT`**: stesso valore, significati diversi.
14. **Copiare un componente intero per cambiare una riga**: prima valutare config, outlet, `extends` + provider.
15. **Rispondere senza path**: al livello senior/architetto una risposta senza riferimento al codice sembra teoria.

---

## Domande di autoverifica

Prova a rispondere in 2 minuti ciascuna, a voce, citando un file:

1. Disegna la catena da `main.ts` a `BaseCoreModule`. Perché serve `importProvidersFrom`?
2. Perché `OccConfig` e `CmsConfig` hanno `useExisting: Config`?
3. Scrivi a memoria un `provideConfig` che cambia `baseUrl`, aggiunge una lingua e ri-mappa `SimpleBannerComponent`.
4. Qual è la differenza tra `ProductAdapter` e `ProductConnector`? Quale dei due sostituiresti per un backend diverso?
5. Che cosa fa `CmsPageGuard` quando il CMS risponde 404?
6. Come aggiungi un tuo componente *prima* dell'add-to-cart senza sostituirlo?
7. Quali tre modi innescano il caricamento di una feature lazy?
8. Che cosa restituisce un proxy di `facadeFactory` quando la feature non è ancora caricata?
9. Quali sono i default di `timeout` e `concurrency` dell'engine SSR, e che cosa succede quando vengono superati?
10. Perché il transfer state viene ignorato se l'utente è loggato nel browser?
11. Quando sceglieresti Query/Command invece di NgRx in una feature nuova?
12. Che cosa fa `OccCartAdapter.load` quando `cartId` è `current`?
13. Come faresti a cambiare il formato dell'URL prodotto in `p/:productCode`? Che cosa devi aggiornare nel codice?
14. Come si aggiunge un gestore d'errore che invia gli errori a un servizio esterno senza togliere quello di Spartacus?
15. Quali file creeresti per una nuova feature lib, e in quale entry point metteresti la facade?
