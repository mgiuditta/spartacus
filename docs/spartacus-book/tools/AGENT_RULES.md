# Regole comuni per tutti gli agenti (LEGGERE PER INTERO)

## Contesto
- Repo Spartacus: `/home/user/spartacus`, SHA `5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`, branch `claude/spartacus-book`. NON modificare nulla fuori da `docs/spartacus-book/`. NON fare git commit/push (lo fa l'orchestratore). NON cambiare ref.
- NB: HEAD del branch è avanti rispetto allo SHA solo per commit sotto `docs/spartacus-book/` (nessuna differenza nel codice): non serve verificarlo né segnalarlo.
- Sorgenti Angular: `/tmp/angular` @ tag `v21.2.23`. Nei riferimenti usa il prefisso `angular:` + path relativo, es. `angular:packages/core/src/di/r3_injector.ts:L120-L140`.
- OUT_DIR: `/home/user/spartacus/docs/spartacus-book`.
- Versioni: Angular 21.2.x, NgRx 21.0.x, RxJS 7.8, TypeScript 5.9, Node 22. Spartacus 2612.0.0.
- `node_modules` NON è installato: non tentare build/test del repo.
- Lingua: italiano; simboli, nomi file e termini tecnici in inglese.

## Regole di verità (obbligatorie)
1. Ogni affermazione sul funzionamento ha un riferimento `percorso/file.ts:L10-L42` (path relativo alla root del repo, numeri di riga reali allo SHA sopra). Verifica i numeri di riga con `grep -n` / `sed -n 'X,Yp'` prima di scriverli.
2. Mai inventare simboli, file, config key o comportamenti. Non letto nel codice = non scritto.
3. Documentazione ufficiale e memoria valgono solo come indizio da confermare sul codice.
4. Il non verificabile va marcato `⚠️ DA VERIFICARE` con motivo.
5. Gli snippet di codice "reale" devono essere copiati letteralmente dal file (puoi abbreviare con `// ...`), con path e righe nell'intestazione.

## Formato riferimenti
- Spartacus: `core-libs/core/src/config/config-tokens.ts:L12-L20`
- Angular: `angular:packages/router/src/router.ts:L100-L130`
- Usa sempre `:L<inizio>-L<fine>` (anche per riga singola: `:L12-L12`).
