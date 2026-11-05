# Integrazione per gli SCRITTORI della Parte III (ricette)

Oltre a `tools/ROLE_WRITER.md`:
- Mantieni le 11 sezioni del template. Nella sezione 3 metti UNA sottosezione per ogni ricetta (extension point), ciascuna con esattamente questi sottotitoli:
  - **Quando usarlo**
  - **Esempio** — blocco di codice TypeScript completo (import inclusi) che usa SOLO simboli esportati dai public_api dei pacchetti `@spartacus/*` (o da `@angular/*`, `rxjs`). Gli import devono essere da entry point pubblici (es. `@spartacus/core`, `@spartacus/storefront`, `@spartacus/cart/base/root`), mai da path interni. Marca il blocco come "esempio illustrativo, non presente nel repo" e indica per ogni simbolo `@spartacus/*` la catena di export (`public_api.ts:Lx` → `index.ts:Ly` → definizione `file:Lz`) presa dal dossier.
  - **Perché funziona (file sorgente)** — riferimenti `path:Lx-Ly` ai meccanismi che lo rendono possibile.
  - **Limiti e trappole**
- Sezione 2 (mappa file): i file sorgente abilitanti. Sezione 4: almeno un diagramma Mermaid. Sezione 5: estratti reali di esempi d'uso nel repo da cui l'esempio è modellato.
- Prima di consegnare verifica con `grep` che OGNI simbolo importato negli esempi da `@spartacus/<pkg>` sia raggiungibile dal relativo public_api (lo controllerà anche uno script in Fase 4).
