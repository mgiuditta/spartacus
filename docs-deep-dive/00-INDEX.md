# SAP Spartacus — Deep Dive di reverse engineering

STATO: IN CORSO

Documentazione didattica per capire Spartacus al 100% e poterlo riscrivere da zero.
Basata sul codice del repository alla revisione `8a84d3dc` (versione `2611.0.0`, Angular 21.2, NgRx 21, RxJS 7.8, TypeScript 5.9, Nx 22).

## Outline

| File | Contenuto |
|---|---|
| 01-PANORAMICA-E-MONOREPO.md | Ricognizione, stack, librerie, grafo dipendenze, build e tooling |
| 02-BOOTSTRAP-E-CONFIG.md | Avvio app, sistema di config, OccConfig, SiteContext, initializer |
| 03-COSTRUTTI-ANGULAR.md | DI avanzata, facade, lazy loading, direttive, pipe, guard, interceptor |
| 04-CMS-DRIVEN-UI.md | Pagine descritte dal CMS, slot, mapping componenti, outlet, defer |
| 05-ROUTING.md | Routing configurabile, semantic path, guard, router store |
| 06-STATE-NGRX-QUERY-COMMAND.md | NgRx, StateUtils, meta-reducer, Query/Command |
| 07-DATA-LAYER-OCC.md | Connector/Adapter/Converter, OccEndpointsService, tabella endpoint |
| 08-CONTRATTO-BACKEND.md | Contratto OCC, auth OAuth2, errori, JSON di esempio |
| 09-SSR.md | Server-side rendering, OptimizedSsrEngine, TransferState |
| 10-I18N-STYLE-EVENTI-UI.md | i18n, stili, eventi, messaggi, dialog, accessibilità |
| 20-RISCRIVERLO-DA-ZERO.md | Guida in 12 step per un mini-Spartacus |
| 21-BACKEND-MOCK.md | Server Express mock OCC |
| 30-GLOSSARIO.md | Glossario |
| 31-DOMANDE-COLLOQUIO.md | 60 domande con risposta |
| 32-DIAGRAMMI.md | Tutti i diagrammi Mermaid |
| 33-MAPPA-FILE.md | 150 file più importanti in ordine di lettura |
| examples/ | Codice completo degli step e del mock server |

## Assunzioni

(in aggiornamento)
