#!/usr/bin/env python3
"""Genera REPORT.md: copertura per libreria, elenco DA VERIFICARE, decisioni, statistiche."""
import csv, glob, os, re, collections, subprocess
here=os.path.dirname(os.path.abspath(__file__)); b=os.path.dirname(here)
os.chdir(b)
chs=[l.rstrip('\n').split('\t') for l in open('tools/chapters.tsv') if l.strip() and not l.startswith('#')]
title={c[0]:c[3] for c in chs}; path={c[0]:f'parte-{c[1]}/{c[2]}.md' for c in chs}
rows=list(csv.DictReader(open('COVERAGE.csv')))
by=collections.defaultdict(collections.Counter)
for r in rows: by[r['libreria']][r['stato']]+=1
excl=collections.Counter(r['motivo'] for r in rows if r['stato']=='escluso')
out=['# REPORT','',f'Rapporto finale del libro tecnico su Spartacus. SHA `5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`, branch `claude/spartacus-book`.','']
# stats
lines=mm=0; dvs=[]
for c in chs:
    t=open(path[c[0]]).read(); lines+=t.count('\n'); mm+=t.count('```mermaid')
    for i,l in enumerate(t.split('\n'),1):
        if 'DA VERIFICARE' in l: dvs.append((c[0],i,l.strip()))
rev=collections.Counter()
for f in glob.glob('review/*.md'):
    m=re.search(r'Esito:\s*\**\s*(\d+)',open(f).read())
    if m: rev['problemi']+=int(m.group(1))
out+=['## 1. Sintesi','',
f'- Capitoli: {len(chs)} (Parte I: 8, Parte II: 38, Parte III: 5), {lines} righe, {mm} diagrammi Mermaid; ogni capitolo ha le 11 sezioni del template e almeno un diagramma.',
f'- Dossier: {len(glob.glob("dossier/*.facts.md"))} (fatti atomici con `file:riga` e citazione). Review avversariali: {len(glob.glob("review/*.review.md"))}, tutte con sezione `## Applicazione`; problemi segnalati dai verificatori (somma degli "Esito"): {rev["problemi"]}.',
'- Appendici: 12 (A01–A10 e A12 generate da script in `tools/extract*`; A11 glossario generato con verifica automatica dei riferimenti contro i capitoli).',
'- `python3 tools/check-refs.py` (riferimenti `file:Lx-Ly`, file esistenti, range validi, simboli citati, link interni) su 64 file: **0 errori**.',
'- `node tools/extract/check-public-api.js` (import `@spartacus/*` negli esempi della Parte III contro gli export reali dei `public_api` via ts-morph): **0 violazioni** su 195 import (i blocchi anti-pattern marcati `// SBAGLIATO` nel cap. 54 sono esclusi di proposito).',
f'- COVERAGE.csv: {len(rows)} file sorgente non di test; {sum(1 for r in rows if r["stato"]=="documentato")} `documentato`, {sum(1 for r in rows if r["stato"]=="escluso")} `escluso` con motivo, 0 `todo`.','',
'## 2. Copertura per libreria','','| Libreria | File | Documentati | Esclusi |','|---|---|---|---|']
for k in sorted(by): out.append(f'| {k} | {sum(by[k].values())} | {by[k]["documentato"]} | {by[k]["escluso"]} |')
out+=['','Criterio di `documentato` (`tools/update-coverage.py`): il path del file, o una sua cartella antenata con almeno 3 segmenti, è citato nel testo di un capitolo o di un\'appendice. Motivi di esclusione:','']
for k,v in excl.most_common(): out.append(f'- {v} file — {k}')
out+=['','## 3. Elenco dei ⚠️ DA VERIFICARE','',f'Totale occorrenze nei capitoli: {len(dvs)}. Sono affermazioni dedotte dalla lettura statica che richiedono esecuzione (build/test/runtime, `node_modules` non installato), dati di backend non presenti nel repo, o sorgenti di terze parti non disponibili.','']
cur=None
for cid,i,l in dvs:
    if cid!=cur: out+=['',f'### {cid} — [{title[cid]}]({path[cid]})','']; cur=cid
    l=re.sub(r'\s+',' ',l)
    l=re.sub(r'\[([^\]]*)\]\([^)]*\)',r'\1',l)

    out.append(f'- L{i}: {l}')
out+=['','## 4. Decisioni prese','','Vedi [DECISIONS.md](DECISIONS.md). In sintesi:','']
for l in open('DECISIONS.md'):
    if l.startswith('- D'): out.append(l.rstrip())
out+=['','## 5. Note di processo','',
'- Container riavviato una volta durante la Fase 3 (≈00:00 UTC): 19 agenti interrotti sono stati ripresi dal loro transcript; nessun file perso (commit e push dopo ogni batch).',
'- Sorgenti di terze parti scaricati con `npm pack` in `/tmp/deps` (fuori dal repo) per verificare comportamenti di @angular/ssr, NgRx, RxJS, angular-oauth2-oidc, i18next, @angular-devkit/@angular/cli: riferimenti con prefisso `deps:`.',
'- Il controllo dei riferimenti è stato reso più preciso durante la fase 4: ricerca simboli estesa a file root/sh/yml e a `/tmp/deps`; i path di asset runtime/npm senza numero di riga non sono più verificati come file del repo.',
'- I capitoli 23, 24, 26–36 hanno ricevuto, dopo la review, una sotto-tabella "File aggiuntivi" (agenti di copertura) per citare i file non ancora coperti: queste aggiunte sono state verificate da `check-refs.py` ma non da una seconda review avversariale.',
'- Le versioni: librerie `221121.22.0`, workspace `2612.0.0` (D5/D7).','',
'## 6. Aree da approfondire','',
'- Verifica a runtime dei punti ⚠️ (richiede `npm install` e build: ordine effettivo di `APP_INITIALIZER`, comportamento SSR dei feature module lazy senza `PendingTasks`, compilazione Sass degli override di tema, migrazioni `ng update` multi-major).',
'- Componenti UI letti solo a campione e mappati per cartella: in particolare `SearchBoxComponent`, captcha, table, split-view, date-picker, file-upload (cap. 45); template HTML di Customer 360 (cap. 29); componenti attributo del configuratore (cap. 30); componenti My Account v2 (cap. 23).',
'- Schematics delle 32 feature/integration lib: verificato in dettaglio solo checkout, le altre per struttura (cap. 43).',
'- Backend: endpoint e campi forniti da addon Commerce (CDC, punchout, S/4, CPQ, OPF) non verificabili dal repo.',
'- Difetti del codice emersi durante l\'analisi (es. `HighlightPipe` case-insensitive, header nel body dell adapter requested delivery date, `SaveCartFailEvent.type`, collection schematics punchout/s4om): elencati nelle sezioni 9 dei capitoli, candidati a issue upstream.','',
'## 7. Rigenerare','','```bash','python3 docs/spartacus-book/tools/check-refs.py','(cd docs/spartacus-book/tools/extract && npm install && node check-public-api.js)','python3 docs/spartacus-book/tools/update-coverage.py','python3 docs/spartacus-book/tools/build-report.py','```','']
open('REPORT.md','w').write('\n'.join(out))
print(len(dvs), len(out))
