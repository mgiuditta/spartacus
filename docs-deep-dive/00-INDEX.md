# SAP Spartacus — Deep Dive di reverse engineering

STATO: COMPLETO

Documentazione didattica per capire Spartacus al 100% e poterlo riscrivere da zero.
Basata sul codice del repository alla revisione `8a84d3dc` (pacchetto root `2611.0.0`, librerie pubblicate `221121.18.0`; Angular 21.2, NgRx 21, RxJS 7.8, TypeScript 5.9, Nx 22, i18next 25, angular-oauth2-oidc 20).

## Come leggere

1. **Se hai poco tempo:** 01 → 04 → 07 → 20. Sono l'ossatura: monorepo, CMS, dati, riscrittura.
2. **Percorso completo:** in ordine numerico da 01 a 10, poi 20 e 21 con il codice in `examples/` aperto accanto.
3. **Ripasso:** 32 (diagrammi) e 30 (glossario); per mettersi alla prova, 31 (colloquio).
4. **Per navigare il repo:** 33 (mappa file) in ordine di lettura.

Ogni capitolo ha le stesse sezioni fisse: "In una frase", "Il problema che risolve", "Come è implementato (con path)", "Flusso passo-passo", "Codice minimo riscritto a mano", "Errori comuni", "Domande di autoverifica". Quando un'affermazione non è stata confermata nel codice c'è scritto "NON VERIFICATO NEL CODICE".

## Outline e conteggio righe

| File | Contenuto | Righe |
|---|---|---|
| [01-PANORAMICA-E-MONOREPO.md](01-PANORAMICA-E-MONOREPO.md) | Ricognizione (Fase 0) + monorepo, build, tooling (J) | 1207 |
| [02-BOOTSTRAP-E-CONFIG.md](02-BOOTSTRAP-E-CONFIG.md) | Avvio app, sistema di config, OccConfig, SiteContext, initializer (A) | 1140 |
| [03-COSTRUTTI-ANGULAR.md](03-COSTRUTTI-ANGULAR.md) | Costrutti Angular: DI, facade, lazy loading, direttive, pipe, guard, interceptor, signals (B) | 1430 |
| [04-CMS-DRIVEN-UI.md](04-CMS-DRIVEN-UI.md) | CMS-driven UI: pagine, slot, mapping componenti, outlet, defer, SmartEdit (C) | 1943 |
| [05-ROUTING.md](05-ROUTING.md) | Routing configurabile, semantic path, matcher, guard, router store (D) | 2091 |
| [06-STATE-NGRX-QUERY-COMMAND.md](06-STATE-NGRX-QUERY-COMMAND.md) | NgRx, StateUtils, meta-reducer, Query/Command, flusso "carica prodotto" (E) | 2308 |
| [07-DATA-LAYER-OCC.md](07-DATA-LAYER-OCC.md) | Connector/Adapter/Converter, OccEndpointsService, tabella di 279 endpoint OCC (F) | 1463 |
| [08-CONTRATTO-BACKEND.md](08-CONTRATTO-BACKEND.md) | Contratto backend OCC, OAuth2, header, errori, 10 JSON di esempio (G) | 1864 |
| [09-SSR.md](09-SSR.md) | SSR: server.ts, OptimizedSsrEngine, fallback CSR, cache, TransferState, hydration (H) | 1795 |
| [10-I18N-STYLE-EVENTI-UI.md](10-I18N-STYLE-EVENTI-UI.md) | i18n, stili, eventi, messaggi, dialog, focus, breakpoint, a11y (I) | 1983 |
| [20-RISCRIVERLO-DA-ZERO.md](20-RISCRIVERLO-DA-ZERO.md) | Mini-Spartacus in 12 step (+ step 0) con codice completo (Fase 2) | 5772 |
| [21-BACKEND-MOCK.md](21-BACKEND-MOCK.md) | Backend mock Express OCC (Fase 2) | 957 |
| [30-GLOSSARIO.md](30-GLOSSARIO.md) | Glossario (204 termini) | 1024 |
| [31-DOMANDE-COLLOQUIO.md](31-DOMANDE-COLLOQUIO.md) | 60 domande da colloquio con risposta | 818 |
| [32-DIAGRAMMI.md](32-DIAGRAMMI.md) | Tutti i 63 diagrammi Mermaid raccolti | 1574 |
| [33-MAPPA-FILE.md](33-MAPPA-FILE.md) | Mappa dei 150 file più importanti in ordine di lettura | 519 |
| **Totale capitoli** | | **27888** |
| [examples/](examples/) | `mini-spartacus/` (app Angular 21 standalone, 12 step, SSR) + `mock-backend/` (Express OCC) | 14320 (sorgenti, esclusi `node_modules`) |

Avvio rapido degli esempi:

```bash
cd docs-deep-dive/examples/mock-backend && npm install && npm start      # http://localhost:9002
cd docs-deep-dive/examples/mini-spartacus && npm install && npm start    # http://localhost:4200
```

## Assunzioni

1. **Versione.** "Versione Spartacus" = pacchetto root `2611.0.0`. Le librerie pubblicate hanno `221121.18.0` (`tools/config/const.ts`, `PUBLISHING_VERSION`). Non ho verificato la release ufficiale.
2. **Niente `node_modules` nella root.** Il repo non ha dipendenze installate. Il comportamento interno di Angular, `@angular/ssr`, `angular-oauth2-oidc` ed Express è descritto dalla documentazione pubblica o dai `node_modules` installati localmente negli esempi, ed è marcato "NON VERIFICATO NEL CODICE" dove conta.
3. **Nomi che nel prompt non esistono più.** Nel testo uso il nome reale e segnalo la differenza:
   - `defaultStorefrontRoutesConfig` → `defaultRoutesConfigFactory`;
   - `OccConfigLoaderService` → `SiteContextConfigInitializer`;
   - `storageSync` → rimosso (resta `StatePersistenceService`);
   - `EntityResetAction` → `EntityLoaderResetAction`;
   - `cacheSize` → `cacheSizeMemory`;
   - `SERVER_LOGGER` → `EXPRESS_SERVER_LOGGER`;
   - `UrlTranslationService`, `UnauthorizedErrorHandler`, `UserIdInterceptor` e la direttiva `cxTranslate` non esistono (c'è solo la pipe);
   - "cxSupplement" è `cxSupplementHashAnchors`;
   - `angular.json` → un `project.json` per ogni progetto.
4. **Test.** Il comando `nx run <lib>:test` citato in `.claude/CLAUDE.md` vale solo per alcune lib. `core`, `storefrontlib` e le feature-libs espongono `test-vitest`; Karma resta sulle integration-libs e sull'app; Jest su setup, schematics, styles e ssr-tests (dettagli in 01).
5. **Login di default.** In 2611 il login di default è Authorization Code + PKCE (`authorizationCodeFlowByDefault`). Il capitolo 08 descrive entrambi i flussi. Mock e mini-Spartacus usano il password grant; per provare il login dello storefrontapp reale contro il mock bisogna mettere il toggle a `false` (spiegato in 21).
6. **JSON di esempio.** Nel repo non esiste un JSON completo di `/cms/pages`. Gli esempi in 04 e 08 uniscono mock reali (spec e fixture Cypress, citati uno per uno). I campi aggiunti sono marcati "(campo aggiunto per completezza)".
7. **Tabella endpoint (07).** Il metodo HTTP è ricavato dall'adapter che chiama `buildUrl`. 4 endpoint non vengono mai chiamati e sono marcati "(da verificare)". Gli endpoint OPF (`OpfEndpointsService`) sono elencati a parte perché non sono OCC.
8. **Grafo delle dipendenze.** È costruito dalle `peerDependencies` `@spartacus/*`, non dagli import effettivi.
9. **Ordine degli interceptor core.** È dedotto dall'ordine degli import dei moduli, non misurato a runtime (in 03 c'è il metodo per verificarlo).
10. **Codice didattico.** Il codice "riscritto a mano" nei capitoli è semplificato apposta. Il codice in `examples/` invece è stato compilato (`tsc --noEmit` a zero errori, `ng build` con `strictTemplates`) ed eseguito contro il mock, sia in SSR sia in un browser headless.
11. **Scelta dei 150 file (33).** È editoriale: il repo non ha una classifica ufficiale.

## Checklist di completamento

- [x] Tutti i 17 file esistono (16 capitoli + questo indice) e nessuno contiene "TODO" o sezioni vuote. Tutti i capitoli hanno le 7 sezioni fisse (controllo con grep).
- [x] Ogni affermazione tecnica cita path reali. Controllo automatico: 825 path distinti citati, **825 esistenti**. A campione ho controllato con grep 20 coppie simbolo↔file (es. `defaultRoutesConfigFactory`, `cacheSizeMemory`, `EntityLoaderResetAction`, `cxOutletPos`, `facadeFactory`, `NgExpressEngineDecorator`): **20/20 OK**.
- [x] La tabella endpoint OCC in 07 è completa: **279 righe** in tabella contro **279 definizioni** trovate con grep in 51 file di config (il comando è riportato nel capitolo).
- [x] I 10 JSON di esempio in 08 derivano da mock reali del repo; il file sorgente è citato per ciascuno.
- [x] Il codice in `examples/` è TypeScript valido: `npx tsc --noEmit -p tsconfig.app.json` (mini-spartacus) e `npx tsc --noEmit -p tsconfig.json` (mock-backend) danno **0 errori**. Anche `ng build` riesce.
- [x] Questo file riporta "STATO: COMPLETO" e il conteggio righe di ogni file.
- [x] Ultima riga: riepilogo in 10 punti.

## Cosa devi sapere per riscriverlo da zero

**Riepilogo in 10 punti:**
1. La config è fatta di chunk: `provideDefaultConfig`/`provideConfig` sono token multi, uniti con `deepMerge` (prima i default, poi la root).
2. Il site context (base site, lingua, valuta) vive nell'URL (`SiteContextUrlSerializer`) e finisce nelle chiamate OCC tramite `OccEndpointsService` e `SiteContextInterceptor`.
3. Ogni chiamata al backend passa da Connector → Adapter → `Occ*Adapter`, con endpoint da config (template `${...}` + `fields`) e normalizer/serializer multi-token.
4. L'auth OAuth2 si appoggia su `angular-oauth2-oidc`: `AuthInterceptor` aggiunge il Bearer e, su 401 `InvalidTokenError`, fa refresh e ripete la richiesta.
5. Lo stato è in NgRx con `StateUtils` (loader, entity e processes); le feature più recenti usano `QueryService`/`CommandService`. Le facade nascondono entrambi.
6. Le pagine sono descritte dal CMS: la route `**` con `CmsPageGuard` carica `/cms/pages`, poi `PageLayoutComponent` → `PageSlotComponent` → `ComponentWrapperDirective` risolvono `typeCode` → componente tramite `cmsComponents`.
7. I componenti ricevono i dati via `CmsComponentData`; `LayoutConfig` decide gli slot per template e breakpoint; gli outlet (BEFORE/REPLACE/AFTER) estendono la UI senza toccare il core.
8. Il routing è semantico: `routing.routes.<nome>.paths` + `cxUrl`/`SemanticPathService`; `ConfigurableRoutesService` riempie i path a runtime; i guard proteggono auth e checkout.
9. Le feature si caricano lazy con `featureModules` + `facadeFactory`: la facade astratta sta nel `root` entry point e l'implementazione arriva al primo uso.
10. L'SSR usa `NgExpressEngineDecorator` + `OptimizedSsrEngine` (timeout → fallback CSR, cache, concorrenza, rendering strategy) e passa lo stato (`cx-state`) al browser col TransferState; i contenuti autenticati si renderizzano solo nel browser.
