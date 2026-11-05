# Spartacus sotto il cofano — libro tecnico

Un libro tecnico, in italiano, che spiega **come funziona davvero** Spartacus, il meta-framework Angular per storefront e-commerce su SAP Commerce Cloud (backend OCC). Ogni affermazione rimanda a file e righe precise del codice sorgente.

## Di cosa parla

Le sintesi qui sotto riassumono le sezioni "1. A cosa serve e perché esiste" dei capitoli.

- **Parte I — Angular sotto il cofano.** I meccanismi di Angular 21 su cui Spartacus si appoggia, letti nei sorgenti di Angular: dependency injection (token, injector, multi provider), bootstrap standalone e per NgModule, lazy loading (code splitting più un nuovo injector a runtime), change detection, Zone, zoneless e signals, la pipeline del Router (recognize, guard, resolver, attivazione), la catena di interceptor di `HttpClient`, SSR con hydration e TransferState, schematics e builder.
- **Parte II — Spartacus sotto il cofano.** Si parte dall'avvio: configurazione definitiva, site context, rotte completate a runtime, stato di autenticazione. Poi la configurazione a chunk fusa con deep merge e i feature module lazy guidati dal CMS. Seguono site context e routing semantico con la route wildcard protetta da `CmsPageGuard`, e il CMS, sia core (pagine, slot, componenti) sia rendering dinamico. Poi outlet, layout, NgRx con i suoi higher-order reducer, facade proxy, command/query ed eventi, il livello OCC (adapter, connector, converter, endpoint) e l'autenticazione OAuth.
- Un capitolo per ogni dominio: utente, prodotto e ricerca, carrello, checkout, ordini, B2B, ASM, configuratore, quote, ticketing e subscription, pickup e store finder, tracking e SmartEdit, e le integration lib (CDC, CDS, OPF, S/4…). Poi gli aspetti trasversali: i18n su i18next, stili Sass, SSR ottimizzato, SEO e PWA, errori e global message, feature toggle e deprecazioni, schematics e migrazioni, tooling di test, componenti CMS di storefront, utility e app demo.
- **Parte III — Ricette.** Personalizzazioni che importano solo simboli esportati dai `public_api.ts` dei pacchetti `@spartacus/*`: configurazione, DI, interceptor ed eventi. Poi componenti CMS, outlet, route e layout, e i dati OCC (adapter, converter, endpoint, meta resolver). Infine feature lazy, carrello e checkout, stili e traduzioni, e una guida per far sopravvivere le estensioni al prossimo `ng update`.
- **Appendici A01–A12.** Tabelle generate da script a partire dal codice: token, config, componenti CMS, endpoint OCC, guard, interceptor, eventi, outlet, feature toggle, API deprecate, glossario e indice dei simboli.

## Codice e versioni analizzati

Fonte: [00-meta.md](00-meta.md).

| Voce | Valore |
|---|---|
| SHA analizzato | `5b7a1c2bf2808d7380bc20596d10f4fa710c3da1` (detached da `develop`) |
| Versione Spartacus | librerie `221121.22.0`, workspace root `2612.0.0` (vedi [DECISIONS.md](DECISIONS.md), D5/D7) |
| Angular / @angular/ssr | ~21.2.23 (sorgenti: tag `v21.2.23`) |
| NgRx | ~21.0.1 |
| RxJS | ~7.8.0 |
| zone.js | ^0.16.0 |
| TypeScript | ~5.9.3 |
| Node | engines `^22.22.0` |
| Nx | ^22.7.6 |
| Test | Jasmine ~6.3 + Karma ~6.4.4; Vitest ^4.1.10 |

Tutti i riferimenti `file:Lx-Ly` valgono per lo SHA indicato sopra. I riferimenti con prefisso `angular:` puntano al repo Angular al tag `v21.2.23`. Quelli con prefisso `deps:` puntano ai pacchetti npm pubblicati (`@angular/ssr`, NgRx, angular-oauth2-oidc, rxjs, i18next), estratti in sola lettura.

## Metodo

Il libro è stato prodotto da agenti, in fasi distinte:

1. **Inventario**: mappa del monorepo ([INVENTORY.md](INVENTORY.md)). Ogni file sorgente è assegnato a un capitolo in [COVERAGE.csv](COVERAGE.csv).
2. **Outline**: piano dei capitoli, con focus, file chiave e file assegnati ([OUTLINE.md](OUTLINE.md)).
3. **Dossier → capitolo**: per ogni capitolo, un analista raccoglie i fatti verificati in un dossier (cartella `dossier/`). Uno scrittore ne ricava il capitolo seguendo un template fisso di 11 sezioni, dalla "1. A cosa serve" alla "11. Domande di autoverifica".
4. **Review avversariale**: un verificatore ricontrolla i riferimenti e le affermazioni sul codice (cartella `review/`).
5. **Correzione**: un correttore applica i rilievi. Poi gli script di controllo e l'assemblaggio finale.

**Regole di verità** (testo completo in [tools/AGENT_RULES.md](tools/AGENT_RULES.md)):

- ogni affermazione sul funzionamento porta un riferimento `percorso:Lx-Ly`, con numeri di riga verificati allo SHA;
- niente simboli, file, chiavi di config o comportamenti inventati: ciò che non è stato letto nel codice non viene scritto;
- la documentazione ufficiale e la memoria valgono solo come indizi, da confermare sul codice;
- ciò che non si può verificare è marcato `⚠️ DA VERIFICARE`, con il motivo;
- gli snippet di codice "reale" sono copiati alla lettera, con path e righe.

Documenti di lavoro:

- [DECISIONS.md](DECISIONS.md): decisioni prese durante il lavoro;
- `REPORT.md`: rapporto finale (prodotto alla chiusura del lavoro);
- [INVENTORY.md](INVENTORY.md): inventario del monorepo;
- [OUTLINE.md](OUTLINE.md): piano dei capitoli;
- [COVERAGE.csv](COVERAGE.csv): stato di copertura di ogni file sorgente.

## Strumenti di consultazione

- **[Glossario](appendici/A11-glossario.md)** (A11)
- **[Indice dei simboli](appendici/A12-indice-simboli.md)** (A12): per ogni simbolo, dove è dichiarato e i capitoli che lo citano

---

## Indice

### Parte I — Angular sotto il cofano

| # | Capitolo | Di cosa parla |
|---|---|---|
| 01 | [Dependency Injection in Angular e in Spartacus](parte-1/01-dependency-injection.md) | Token, injector e provider. Perché un `provideConfig` vince sui default, come si sostituisce un adapter, perché i multi provider dei moduli lazy richiedono `UnifiedInjector`. |
| 02 | [NgModule, standalone e bootstrap dell'applicazione](parte-1/02-ngmodule-standalone-bootstrap.md) | `bootstrapApplication` contro `bootstrapModule`: la funzione interna comune e l'appiattimento dei provider dei moduli. |
| 03 | [Lazy loading: router e moduli caricati a runtime](parte-1/03-lazy-loading.md) | Code splitting e nuovo injector a runtime. `loadChildren`/`loadComponent` di Angular, e perché Spartacus non usa il lazy loading del router. |
| 04 | [Change detection, Zone, zoneless e signals](parte-1/04-change-detection-zone-signals.md) | Come Angular riallinea il DOM allo stato, il ruolo di Zone e del modo zoneless, la stabilità per SSR, i signals. |
| 05 | [Il Router di Angular](parte-1/05-router.md) | La pipeline URL → `UrlTree` → recognize → guard → resolver → attivazione, e i suoi eventi. |
| 06 | [HttpClient e interceptor](parte-1/06-httpclient-interceptor.md) | La catena di interceptor tra l'adapter e il `fetch()`, su cui Spartacus appoggia auth, site context ed errori. |
| 07 | [SSR, hydration e TransferState](parte-1/07-ssr-hydration-transferstate.md) | Render su Node, hydration nel browser, TransferState. Le scelte di Spartacus: `CxCommonEngine` e lo state NgRx trasferito. |
| 08 | [Schematics e builder](parte-1/08-schematics-builder.md) | Trasformazioni su `Tree` per `ng add`/`ng update` e builder Architect eseguiti da Nx. |

### Parte II — Spartacus sotto il cofano

| # | Capitolo | Di cosa parla |
|---|---|---|
| 10 | [Bootstrap e ordine di inizializzazione](parte-2/10-bootstrap-inizializzazione.md) | Cosa deve sapere lo storefront prima di renderizzare (config, site context, rotte, auth) e come lo attende. |
| 11 | [Configurazione: provideConfig, default, merge, validator, initializer](parte-2/11-configurazione.md) | Chunk di config, deep merge, `CONFIG_INITIALIZER`, config unificata dei moduli lazy, validator. |
| 12 | [Feature module e lazy loading in Spartacus](parte-2/12-feature-module-lazy.md) | Il lazy loading guidato dal CMS e non dalle route: `featureModules`, chunk, facade. |
| 13 | [Site context e site theme](parte-2/13-site-context-theme.md) | Base site, lingua e valuta: da dove arrivano e come si propagano a router, HTTP e UI. |
| 14 | [Routing: route semantiche, URL, page guard, contesto](parte-2/14-routing.md) | Route semantiche configurabili e route wildcard CMS protetta da `CmsPageGuard`. Protected routes. |
| 15 | [CMS (core): pagine, slot, componenti, caricamento](parte-2/15-cms-core.md) | Struttura di pagina da `PageContext`, separazione struttura/dati, caricamento accorpato dei componenti, `CmsService`. |
| 16 | [CMS (storefront): rendering dinamico delle pagine](parte-2/16-cms-rendering.md) | Layout degli slot, componenti differiti, mapping `cmsComponents`, injector per componente, guard CMS. |
| 17 | [Outlet](parte-2/17-outlet.md) | Punti nominati nei template per inserire o sostituire UI senza fork. |
| 18 | [Layout, breakpoint, launch dialog e accessibilità](parte-2/18-layout-breakpoint-a11y.md) | Il "guscio" dello storefront in `core-libs/storefront/layout/`: breakpoint, dialog, a11y, direction, header. |
| 19 | [State management: NgRx, loader/entity/process state](parte-2/19-state-management.md) | Higher-order reducer, azioni base e selector per dati in caricamento, caricati o falliti, indicizzati per id. |
| 20 | [Facade, command & query, eventi](parte-2/20-facade-command-query-eventi.md) | Facade proxy lazy, command con strategie di concorrenza, query con invalidazione a eventi, `EventService`. |
| 21 | [Livello OCC: adapter, connector, converter, endpoint](parte-2/21-occ.md) | Adapter astratti e connector, endpoint configurabili, converter impilabili, scope di caricamento. |
| 22 | [Autenticazione: OAuth, token, interceptor, refresh](parte-2/22-auth.md) | Flow OAuth, conservazione del token, 401 → refresh → retry, token client, guard di auth. |
| 23 | [Utente, profilo, consensi](parte-2/23-user.md) | Un dominio diviso in tre strati di età e stile architetturale diversi. |
| 24 | [Prodotto e ricerca](parte-2/24-product-search.md) | Caricamento "a pezzi" del prodotto con gli scope, ricerca PLP e search box. |
| 25 | [Carrello](parte-2/25-cart.md) | `@spartacus/cart`, esposta solo tramite secondary entry point: active cart, saved cart, wish list, quick order, import/export. |
| 26 | [Checkout](parte-2/26-checkout.md) | Dal carrello all'ordine: indirizzo, delivery mode, pagamento, revisione. Le tre sotto-feature della libreria. |
| 27 | [Ordini](parte-2/27-order.md) | Place order, storia e dettaglio ordini, resi, ordini ricorrenti, reorder, allegati. |
| 28 | [B2B: organization](parte-2/28-organization-b2b.md) | Amministrazione aziendale, approvazioni, ordini dell'unità, estratto conto, registrazione B2B. |
| 29 | [ASM (Assisted Service Module)](parte-2/29-asm.md) | Il customer support agent che emula un cliente: ricerca, sessione, carrello, Customer 360. |
| 30 | [Product configurator](parte-2/30-product-configurator.md) | Prodotti configurabili: pagina di configurazione, conflitti, prezzi, overview. |
| 31 | [Quote, customer ticketing, subscription billing](parte-2/31-quote-ticketing-subscription.md) | Tre feature lib di account con la stessa architettura a quattro strati, usata in modi diversi. |
| 32 | [Pickup in store, store finder, delivery date](parte-2/32-pickup-storefinder-delivery.md) | "Dove e quando arriva la merce": data di consegna richiesta e stimata, store finder, ritiro in negozio. |
| 33 | [Tracking, SmartEdit, Qualtrics](parte-2/33-tracking-smartedit-qualtrics.md) | Librerie che collegano lo storefront a sistemi esterni (GTM, AEP, SmartEdit, Qualtrics). |
| 34 | [Integration libs: CDC, CDP, CDS, segment-refs](parte-2/34-integration-cdc-cdp-cds.md) | Integrazioni con Customer Data Cloud, CDP, Context-Driven Services, segmenti. |
| 35 | [Integration libs: OPF, digital payments, OPPS](parte-2/35-integration-opf-payments.md) | Open Payment Framework, Digital payments, Omnichannel Promotion Pricing. |
| 36 | [Integration libs: S/4, OMF, CPQ quote, punchout, EPD](parte-2/36-integration-s4-omf-cpq-punchout-epd.md) | Librerie per backend Commerce arricchiti da addon o sistemi SAP esterni. |
| 37 | [Internazionalizzazione (i18n)](parte-2/37-i18n.md) | Chiavi di traduzione a runtime su i18next, chunk, pipe di formattazione, istanza per richiesta in SSR. |
| 38 | [Stili e theming](parte-2/38-stili-theming.md) | `@spartacus/styles`, una libreria Sass distribuita come sorgente, e il theming. |
| 39 | [SSR ottimizzato](parte-2/39-ssr-ottimizzato.md) | Cosa succede attorno al render SSR sotto traffico reale. |
| 40 | [SEO e PWA](parte-2/40-seo-pwa.md) | Title, meta, canonical e JSON-LD anche in SSR. Supporto PWA. |
| 41 | [Errori HTTP, error handling, logger e global message](parte-2/41-errori-global-message.md) | Due sottosistemi distinti: global message (UX) e error handling (osservabilità/SSR). |
| 42 | [Feature toggle e deprecazioni](parte-2/42-feature-toggle-deprecazioni.md) | Correzioni protette da flag con nome, per non rompere le estensioni a valle. Gestione delle deprecazioni. |
| 43 | [Schematics e migrazioni di Spartacus](parte-2/43-schematics-migrazioni.md) | `@spartacus/schematics`: installazione in un'app `ng new` e migrazioni ai breaking change. |
| 44 | [Strategia di test e tooling del monorepo](parte-2/44-test-tooling.md) | Tre runner di unit test, utility di test, E2E SSR e Cypress, validazioni statiche, tool interni. |
| 45 | [Componenti CMS e shared components di storefront](parte-2/45-componenti-storefront.md) | Componenti per i tipi CMS di base (dati, normalizzazione, link, a11y) e building block `shared/`. |
| 46 | [Utility, window e modelli di dominio](parte-2/46-util-modelli.md) | Gli "attrezzi" di `@spartacus/core`: `ConverterService`, `resolveApplicable`, `backOff`, normalizzazione degli errori. |
| 47 | [L'app demo storefrontapp](parte-2/47-app-demo.md) | Il banco di prova che accende qualunque combinazione di librerie, guidato dai test e2e. |

### Parte III — Ricette

| # | Capitolo | Di cosa parla |
|---|---|---|
| 50 | [Ricette: configurazione, DI, interceptor, eventi](parte-3/50-ricette-config-di.md) | Override di config, sostituzione di servizi e facade, interceptor ed error handler, eventi custom. |
| 51 | [Ricette: componenti CMS, outlet, route e layout](parte-3/51-ricette-cms-outlet-layout.md) | Sostituire o creare componenti CMS, `provideOutlet`, route e layout. |
| 52 | [Ricette: OCC, adapter, converter, endpoint, meta resolver](parte-3/52-ricette-occ-dati.md) | Adapter e connector, normalizer e serializer, `fields` ed endpoint, `PageMetaResolver`. |
| 53 | [Ricette: feature lib lazy, carrello/checkout, stili, traduzioni](parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) | Una feature lazy propria, estensioni di carrello e checkout, stili senza fork, traduzioni. |
| 54 | [API pubblica vs interna, upgrade, anti-pattern, checklist](parte-3/54-upgrade-safe.md) | La mia estensione sopravvivrà al prossimo `ng update`? |

### Appendici

| # | Appendice | Contenuto |
|---|---|---|
| A01 | [InjectionToken](appendici/A01-injection-token.md) | Token DI dichiarati nel codice |
| A02 | [Configurazione](appendici/A02-config.md) | Interfacce e chiavi di configurazione |
| A03 | [Componenti CMS](appendici/A03-cms-components.md) | Mapping dei type code in `cmsComponents` |
| A04 | [Endpoint OCC](appendici/A04-occ-endpoints.md) | Endpoint di default in `backend.occ.endpoints` |
| A05 | [Guard](appendici/A05-guard.md) | Guard di route |
| A06 | [HTTP interceptor](appendici/A06-interceptor.md) | Classi interceptor e registrazioni |
| A07 | [Eventi](appendici/A07-eventi.md) | Gerarchia degli eventi che derivano da `CxEvent` |
| A08 | [Outlet](appendici/A08-outlet.md) | Enum `*Outlets` e nomi degli outlet |
| A09 | [Feature toggle](appendici/A09-feature-toggle.md) | Flag di feature toggle |
| A10 | [API deprecate](appendici/A10-deprecated.md) | Simboli marcati `@deprecated` |
| A11 | [Glossario](appendici/A11-glossario.md) | Termini del libro |
| A12 | [Indice dei simboli](appendici/A12-indice-simboli.md) | Simbolo → dichiarazione → capitoli |

---

## Percorsi di lettura

### 1. "Sono nuovo sul progetto"

Obiettivo: capire come si avvia uno storefront e come una pagina arriva sullo schermo, dall'URL al componente.

1. [02 — NgModule, standalone e bootstrap](parte-1/02-ngmodule-standalone-bootstrap.md): come nasce l'app.
2. [01 — Dependency Injection](parte-1/01-dependency-injection.md): il meccanismo su cui si regge tutto Spartacus.
3. [10 — Bootstrap e ordine di inizializzazione](parte-2/10-bootstrap-inizializzazione.md): cosa attende lo storefront prima del primo render.
4. [11 — Configurazione](parte-2/11-configurazione.md): da dove viene quasi ogni comportamento.
5. [12 — Feature module e lazy loading](parte-2/12-feature-module-lazy.md): perché le feature si caricano dal CMS e non dalle route.
6. [14 — Routing](parte-2/14-routing.md): route semantiche e route wildcard CMS.
7. [15 — CMS core](parte-2/15-cms-core.md) e [16 — CMS rendering](parte-2/16-cms-rendering.md): dalla struttura di pagina ai componenti.
8. [19 — State management](parte-2/19-state-management.md): NgRx e i suoi reducer generici.
9. [20 — Facade, command & query, eventi](parte-2/20-facade-command-query-eventi.md): l'API che i componenti usano davvero.
10. [21 — Livello OCC](parte-2/21-occ.md): come i dati arrivano dal backend.
11. Poi un dominio a scelta, per vedere i pattern applicati: [25 — Carrello](parte-2/25-cart.md), [24 — Prodotto e ricerca](parte-2/24-product-search.md) o [22 — Auth](parte-2/22-auth.md). Infine [47 — L'app demo](parte-2/47-app-demo.md), per vedere tutto montato insieme.

### 2. "Devo estendere Spartacus"

Obiettivo: conoscere gli extension point e usarli senza rompere gli upgrade.

1. I meccanismi: [11 — Configurazione](parte-2/11-configurazione.md), [12 — Feature module](parte-2/12-feature-module-lazy.md), [20 — Facade ed eventi](parte-2/20-facade-command-query-eventi.md) e [21 — OCC](parte-2/21-occ.md). In ciascuno conviene leggere almeno la sezione "8. Extension point".
2. La UI: [16 — CMS rendering](parte-2/16-cms-rendering.md) per i mapping dei componenti, [17 — Outlet](parte-2/17-outlet.md) per inserire UI nei punti nominati.
3. Le ricette, in ordine: [50 — config, DI, interceptor, eventi](parte-3/50-ricette-config-di.md) → [51 — CMS, outlet, layout](parte-3/51-ricette-cms-outlet-layout.md) → [52 — OCC e dati](parte-3/52-ricette-occ-dati.md) → [53 — feature lazy, carrello/checkout, stili, i18n](parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) → [54 — upgrade-safe](parte-3/54-upgrade-safe.md). Il capitolo 54 è da leggere prima di consegnare.
4. Le appendici come catalogo degli extension point: [A02 — Config](appendici/A02-config.md), [A03 — Componenti CMS](appendici/A03-cms-components.md), [A04 — Endpoint OCC](appendici/A04-occ-endpoints.md), [A08 — Outlet](appendici/A08-outlet.md). Prima di agganciarsi a un simbolo vale la pena controllare anche [A10 — API deprecate](appendici/A10-deprecated.md).

### 3. "Devo fare debug"

Obiettivo: arrivare in fretta al punto del codice in cui un comportamento nasce. Ogni capitolo ha una sezione "10. Come fare debug": i link qui sotto portano direttamente lì.

1. [41 — Errori e global message](parte-2/41-errori-global-message.md#10-come-fare-debug): da dove viene un messaggio d'errore, e perché un render SSR fallisce.
2. [07 — SSR, hydration e TransferState](parte-1/07-ssr-hydration-transferstate.md#10-come-fare-debug) e [39 — SSR ottimizzato](parte-2/39-ssr-ottimizzato.md#10-come-fare-debug): differenze server/browser, hydration, fallback CSR, timeout.
3. [05 — Router](parte-1/05-router.md#10-come-fare-debug) e [14 — Routing](parte-2/14-routing.md#10-come-fare-debug): perché un URL porta alla pagina sbagliata o a una 404.
4. [16 — CMS rendering](parte-2/16-cms-rendering.md#10-come-fare-debug) e [15 — CMS core](parte-2/15-cms-core.md#10-come-fare-debug): un componente che non compare o compare vuoto.
5. [10 — Bootstrap](parte-2/10-bootstrap-inizializzazione.md#10-come-fare-debug) e [11 — Configurazione](parte-2/11-configurazione.md#10-come-fare-debug): ordine di inizializzazione e valore effettivo della config.
6. [21 — OCC](parte-2/21-occ.md#10-come-fare-debug), [06 — HttpClient e interceptor](parte-1/06-httpclient-interceptor.md#10-come-fare-debug) e [22 — Auth](parte-2/22-auth.md#10-come-fare-debug): URL, header, converter, token e refresh.
7. [19 — State management](parte-2/19-state-management.md#10-come-fare-debug): ispezionare lo stato NgRx di loader ed entity.
8. Le appendici come mappe di ricerca: [A06 — HTTP interceptor](appendici/A06-interceptor.md) per sapere chi tocca una richiesta, [A07 — Eventi](appendici/A07-eventi.md) per sapere chi emette o ascolta un evento, [A09 — Feature toggle](appendici/A09-feature-toggle.md) per sapere quale flag cambia un comportamento.

---

## Come rigenerare e verificare

Tutti i comandi vanno eseguiti da questa cartella (`docs/spartacus-book`).

| Comando | Cosa fa |
|---|---|
| `python3 tools/check-refs.py [file.md ...]` | Controlla che ogni riferimento `path:Lx-Ly` punti a un file esistente con un range valido, che i simboli in backtick esistano nel codice e che i link interni `.md` non siano rotti. Senza argomenti controlla capitoli, appendici e README. |
| `node tools/extract/check-public-api.js [file.md ...]` | Controlla che gli esempi della Parte III importino da `@spartacus/*` solo simboli esportati dal `public_api` dell'entry point indicato (usa ts-morph, installato in `tools/extract/node_modules`). |
| `python3 tools/update-coverage.py` | Ricalcola la colonna `stato` di [COVERAGE.csv](COVERAGE.csv) (`documentato` / `letto` / `todo`). |
| `node tools/extract/a01-injection-tokens.js`, `a02-config.js`, `a09-feature-toggles.js`, `a10-deprecated.js` (nella stessa cartella) | Rigenerano le appendici A01, A02, A09 e A10. |
| `bash tools/extract2/run_all.sh` | Rigenera le appendici A03–A08: componenti CMS, endpoint OCC, guard, interceptor, eventi, outlet. |
| `python3 tools/extract3/a12_indice_simboli.py` | Rigenera l'appendice A12 (indice dei simboli). |

Le appendici sono generate e non vanno modificate a mano: ognuna riporta in testa lo script che la produce. Se cambia lo SHA analizzato, bisogna rigenerare le appendici e poi rieseguire `tools/check-refs.py` su tutto il libro.
