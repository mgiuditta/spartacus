# INVENTORY

Inventario del monorepo allo SHA `5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`. Frammenti prodotti dai cartografi (Fase 1):

- [inventory/core.md](inventory/core.md)
- [inventory/storefront-styles.md](inventory/storefront-styles.md)
- [inventory/setup-tooling.md](inventory/setup-tooling.md)
- [inventory/feature-libs-a.md](inventory/feature-libs-a.md)
- [inventory/feature-libs-b.md](inventory/feature-libs-b.md)
- [inventory/integration-libs.md](inventory/integration-libs.md)
- [inventory/angular.md](inventory/angular.md)

## Conteggio file sorgente non di test per libreria (da COVERAGE.csv)

| Libreria | File | Esclusi |
|---|---|---|
| core-libs/assets | 23 | 19 |
| core-libs/core | 839 | 13 |
| core-libs/schematics | 268 | 32 |
| core-libs/setup | 54 | 3 |
| core-libs/storefront | 695 | 9 |
| core-libs/styles | 290 | 97 |
| feature-libs/asm | 288 | 38 |
| feature-libs/cart | 528 | 91 |
| feature-libs/checkout | 319 | 55 |
| feature-libs/customer-ticketing | 115 | 19 |
| feature-libs/estimated-delivery-date | 39 | 19 |
| feature-libs/order | 359 | 21 |
| feature-libs/organization | 826 | 91 |
| feature-libs/pdf-invoices | 57 | 19 |
| feature-libs/pickup-in-store | 184 | 19 |
| feature-libs/product | 198 | 73 |
| feature-libs/product-configurator | 558 | 23 |
| feature-libs/product-multi-dimensional | 59 | 19 |
| feature-libs/qualtrics | 20 | 1 |
| feature-libs/quote | 152 | 21 |
| feature-libs/requested-delivery-date | 58 | 19 |
| feature-libs/smartedit | 20 | 1 |
| feature-libs/storefinder | 124 | 19 |
| feature-libs/subscription-billing | 100 | 3 |
| feature-libs/tracking | 38 | 1 |
| feature-libs/user | 251 | 37 |
| integration-libs/cdc | 116 | 19 |
| integration-libs/cdp | 10 | 1 |
| integration-libs/cds | 111 | 19 |
| integration-libs/cpq-quote | 41 | 19 |
| integration-libs/digital-payments | 58 | 19 |
| integration-libs/epd-visualization | 130 | 21 |
| integration-libs/omf | 16 | 1 |
| integration-libs/opf | 583 | 42 |
| integration-libs/opps | 18 | 1 |
| integration-libs/punchout | 86 | 20 |
| integration-libs/s4-service | 119 | 19 |
| integration-libs/s4om | 41 | 19 |
| integration-libs/segment-refs | 12 | 1 |
| projects/ssr-tests | 6 | 0 |
| projects/storefrontapp | 116 | 0 |
| projects/storefrontapp-e2e-cypress | 247 | 247 |

## Differenze del fork rispetto a upstream

Il branch `develop` del fork (`mgiuditta/spartacus`) punta allo stesso SHA di `SAP/spartacus` develop (`5b7a1c2b`, verificato con `git ls-remote`): nessuna differenza di codice rilevabile. Il clone è shallow (70 commit), autori tutti del team upstream. Unico ref aggiuntivo sul fork: `claude/spartacus-reverse-engineering-8ls959` (non analizzato, fuori dal ref assegnato).

## Note trasversali dai cartografi

- Versione librerie `221121.22.0` vs root `2612.0.0` (DECISIONS D5).
- `@spartacus/core` e `@spartacus/storefront` hanno un solo entry point; feature-libs e integration-libs usano entry point secondari (`root`, `core`, `occ`, `components`, `assets`).
- Codice Angular non presente in /tmp/angular: `@angular/ssr`, `@angular-devkit/*` (repo angular/angular-cli).
