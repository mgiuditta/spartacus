# mini-spartacus

Una storefront Angular 21 **standalone** (niente NgModule applicativi) che riscrive in piccolo i
meccanismi principali di SAP Spartacus, in 12 step. Ogni cartella `src/app/stepNN-*` contiene il
codice di uno step; ogni file cita in testa il file originale di Spartacus da cui prende l'idea.

La guida completa, step per step, e' in `../../20-RISCRIVERLO-DA-ZERO.md`.
Il backend finto e' in `../mock-backend` (spiegato in `../../21-BACKEND-MOCK.md`).

## Requisiti

- Node.js 20.19+ o 22.12+ (testato con Node 22)
- npm 10+

## Avvio rapido

```bash
# 1. backend finto (terminale 1)
cd docs-deep-dive/examples/mock-backend
npm install
npm start                      # http://localhost:9002/occ/v2/

# 2. storefront in sviluppo, solo browser (terminale 2)
cd docs-deep-dive/examples/mini-spartacus
npm install
npm start                      # http://localhost:4200/electronics-spa/en/USD/
```

## Build e SSR

```bash
npm run build                  # dist/mini-spartacus/{browser,server}
npm run serve:ssr              # http://localhost:4000/electronics-spa/en/USD/
```

Variabili del server SSR (`src/server.ts`):

| Variabile | Default | Significato |
|---|---|---|
| `PORT` | 4000 | porta HTTP |
| `SSR_TIMEOUT` | 3000 | ms massimi di attesa del render; oltre si risponde con la pagina CSR |
| `SSR_CACHE` | false | `true` = riusa i render riusciti |
| `SSR_CONCURRENCY` | 10 | render contemporanei massimi |

Ogni risposta ha l'header `X-Render-Strategy` (`ssr`, `cache`, `csr-timeout`, `csr-concurrency`, `csr-error`).
Per provare il fallback: avvia il mock con `MOCK_DELAY_MS=1500` e il server con `SSR_TIMEOUT=1000`.

## Type-check

```bash
npm run typecheck              # tsc --noEmit -p tsconfig.app.json (solo TypeScript)
npm run build                  # controllo completo, compresi i template (strictTemplates)
```

## Utente demo

- email: `demo@spartacus.test`
- password: `Password123.`

## Mappa degli step

| Step | Cartella | Cosa fa |
|---|---|---|
| 01 | `step01-config` | `provideConfig` / `provideDefaultConfig`, chunk multi e `deepMerge` |
| 02 | `step02-site-context` | baseSite/lingua/valuta nel prefisso URL, interceptor `lang`/`curr` |
| 03 | `step03-occ-endpoints` | `OccEndpointsService.buildUrl` con template `${...}`, scope e `fields` |
| 04 | `step04-auth` | OAuth2 password grant, refresh token, `authInterceptor` con retry su 401 |
| 05 | `step05-product-data` | Connector / Adapter / Converter, `PRODUCT_NORMALIZER` multi |
| 06 | `step06-ngrx-product` | store NgRx con `LoaderState` per entita', facade `ProductService` |
| 07 | `step07-routing` | rotte con nome (`cxRoute`), path da config, pipe `cxUrl` |
| 08 | `step08-cms` | `CmsService`: pagina CMS da `/cms/pages` per `pageType`/`pageLabelOrId` |
| 09 | `step09-page-layout` | `PageLayoutComponent`, `PageSlotComponent`, `ComponentWrapperDirective` |
| 10 | `step10-outlets` | `OutletService`, `cxOutlet`, `cxOutletRef`, BEFORE/REPLACE/AFTER |
| 11 | `step11-lazy-feature` | `featureModules` + `facadeFactory` con `import()` dinamico (carrello) |
| 12 | `step12-ssr` | `CommonEngine`, `TransferState`, timeout con fallback CSR |
