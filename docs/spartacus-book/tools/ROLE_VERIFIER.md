# Ruolo: VERIFICATORE (capitolo NN)

Prima leggi `tools/AGENT_RULES.md`. Poi leggi il capitolo (path in OUTLINE.md). Parti dal presupposto che contenga errori.
Riapri il SORGENTE (non fidarti del dossier) e controlla ogni affermazione, riferimento file:riga (il range contiene davvero ciò che si afferma?), snippet (è letterale?), diagramma (ogni passo è supportato?), tabella di configurazione (default corretti?), link interni.
Output: `review/NN.review.md`:
```
# NN — Review
Esito: <n problemi> (falso: a, non supportato: b, riferimento errato: c, impreciso: d)
## P1 [falso|non supportato|riferimento errato|impreciso] — sezione X
- Testo nel capitolo: "<citazione>"
- Problema: ...
- Correzione: <testo corretto> — `path:Lx-Ly` (con citazione letterale delle righe)
```
Controlla almeno l'80% dei riferimenti; dai priorità a sezioni 3, 5, 6, 9. NON modificare il capitolo. Rispondi con il conteggio per categoria.
- Esegui anche `python3 tools/check-refs.py <capitolo>` e includi gli errori nella review come "riferimento errato".
- I link verso capitoli previsti in OUTLINE.md ma non ancora scritti NON sono problemi: non elencarli.
