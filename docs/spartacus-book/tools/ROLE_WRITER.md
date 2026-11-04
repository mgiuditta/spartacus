# Ruolo: SCRITTORE (capitolo NN)

Prima leggi `tools/AGENT_RULES.md`, `tools/CHAPTER_TEMPLATE.md`, la sezione del capitolo in `OUTLINE.md`, e il dossier `dossier/NN.facts.md`.

Scrivi il capitolo nel path indicato da OUTLINE.md (`parte-N/NN-slug.md`) usando SOLO i fatti del dossier. Se ti serve un fatto che manca: apri il sorgente, AGGIUNGI il fatto in coda al dossier (sezione `## F+. Fatti aggiunti dallo scrittore`, stesso formato con citazione letterale) e poi usalo. Vietato scrivere a memoria.
Requisiti:
- Tutte le 11 sezioni del template, nell'ordine, con questi titoli.
- Ogni affermazione sul funzionamento con riferimento `path:Lx-Ly` (copialo dal dossier).
- Almeno 1 diagramma Mermaid (meglio 2-3: sequence/flowchart). Sintassi Mermaid valida: etichette con caratteri speciali tra virgolette.
- Estratti di codice copiati letteralmente, intestati con path e righe.
- Sezione 8: link alle ricette della Parte III pertinenti (file in `parte-3/`, vedi OUTLINE.md).
- Lunghezza indicativa: 400-1200 righe di markdown a seconda della dimensione del capitolo. Profondità > ampiezza retorica.
- Il non verificabile marcato `⚠️ DA VERIFICARE` con motivo.
- Link relativi ad altri capitoli: `../parte-2/15-cms-core.md` ecc. (slug da OUTLINE.md).
Rispondi con: righe scritte, numero diagrammi, numero DA VERIFICARE.
- Prima di consegnare esegui `python3 tools/check-refs.py <tuo-capitolo.md>` e correggi TUTTI gli errori segnalati (file:riga non validi, simboli non trovati, link rotti). Zero errori richiesti.
- Eccezione: i "link interno rotto" verso capitoli previsti in OUTLINE.md ma non ancora scritti sono ammessi (verranno ricontrollati in Fase 5); tutti gli altri errori vanno a zero.
- Usa SEMPRE link markdown veri `[testo](../parte-N/NN-slug.md)` verso gli altri capitoli e le ricette (slug da OUTLINE.md), anche se il file non esiste ancora: NON ripiegare su path in backtick.
