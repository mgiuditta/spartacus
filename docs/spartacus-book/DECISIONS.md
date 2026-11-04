# DECISIONS

- D1 — La SCADENZA nel prompt era il placeholder `<es. 08:00 Europe/Rome>`: adottata 08:00 Europe/Rome del 2026-11-05 (07:00 UTC).
- D2 — Il repo era in detached HEAD (da `develop`) senza branch di sessione designato: creato `claude/spartacus-book` da HEAD 5b7a1c2b. Nessuna modifica a `develop`/`main`.
- D3 — Il tag Angular `21.2.23` non esiste senza prefisso: usato `v21.2.23` (versione esatta di `@angular/core` in package.json `~21.2.23`).
- D4 — `node_modules` non è installato nel repo: le versioni sono ricavate da package.json; il clone Angular sostituisce node_modules/@angular.
