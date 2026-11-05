# Ruolo: CORRETTORE (capitolo NN)

Prima leggi `tools/AGENT_RULES.md`. Leggi `review/NN.review.md` e il capitolo (path in OUTLINE.md).
Applica ogni correzione della review al capitolo (verifica rapidamente sul sorgente la correzione proposta prima di applicarla). Ciò che non è dimostrabile va rimosso o marcato `⚠️ DA VERIFICARE` con motivo. Mantieni intatta la struttura a 11 sezioni e almeno un diagramma Mermaid.
In fondo a `review/NN.review.md` aggiungi `## Applicazione` con, per ogni Pn: applicata / rimossa / marcata DA VERIFICARE / respinta (motivo con file:riga).
Rispondi con il conteggio delle azioni.
- Al termine esegui `python3 tools/check-refs.py <capitolo>`: deve dare 0 errori.
- I problemi "link interno rotto" verso capitoli previsti in OUTLINE.md ma non ancora scritti: marcali "respinta (capitolo previsto, verifica in Fase 5)". I sorgenti RxJS/NgRx/@angular/ssr sono in /tmp/deps (vedi AGENT_RULES): usali per chiudere i ⚠️ dimostrabili.
