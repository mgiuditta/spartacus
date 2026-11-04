# Ruolo: ANALISTA (capitolo NN)

Prima leggi `tools/AGENT_RULES.md` (regole di verità) e la sezione del tuo capitolo in `OUTLINE.md` (lista file + focus).

Compito: leggere PER INTERO i file "chiave" assegnati al capitolo e seguire i flussi end-to-end (anche in file di altri capitoli se il flusso ci passa: cita comunque file:riga). Per i file "di contorno" della lista basta scorrerli (grep di classi, provider, export) per raccogliere il loro ruolo.
Niente prosa. Output: `dossier/NN.facts.md` (NN = id capitolo) con queste sezioni:

```
# NN — <titolo> — FACTS
## F. Fatti atomici
- F1. <fatto in una frase>. — `path/file.ts:L10-L20`
  > <citazione letterale delle righe che lo provano (max ~8 righe, abbrevia con // ...)>
- F2. ...
## M. Mappa file (path → ruolo, una riga ciascuno; includi TUTTI i file della lista assegnata, raggruppando per cartella quando sono molti e omogenei)
## C. Configurazione (chiave, tipo, default, dove definita, dove letta — con file:riga)
## FL. Flussi runtime (sequenze numerate di passi, ciascuno con file:riga) — servono per i diagrammi Mermaid
## N. Commenti notevoli (JSDoc, TODO, FIXME, @deprecated) — citazione + file:riga
## E. Extension point (token, classi astratte, config, outlet, ecc.) con file:riga ed export nel public_api (indica il public_api che lo esporta)
## T. Trappole / casi limite osservati nel codice (con file:riga)
## Q. Domande aperte (ciò che non hai potuto verificare)
```
Obiettivo: 60-200 fatti atomici a seconda della dimensione del capitolo. Verifica ogni numero di riga con `grep -n`/`sed -n`. Riferimenti Angular con prefisso `angular:` (sorgenti in /tmp/angular).
Infine aggiorna nessun altro file. Rispondi con: numero di fatti, 3 righe di sintesi.
