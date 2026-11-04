#!/usr/bin/env python3
import os, re
here = os.path.dirname(os.path.abspath(__file__)); book = os.path.dirname(here)
chs = [l.rstrip('\n').split('\t') for l in open(os.path.join(here,'chapters.tsv')) if l.strip() and not l.startswith('#')]
focus = {}; cur = None
for l in open(os.path.join(here,'focus.md')):
    m = re.match(r'^## (\d+)\s*$', l)
    if m: cur = m.group(1); focus[cur] = []; continue
    if cur: focus[cur].append(l.rstrip('\n'))
parts = {'1':'PARTE I — Angular sotto il cofano','2':'PARTE II — Architettura di Spartacus','3':'PARTE III — Estendere Spartacus'}
out = ['# OUTLINE', '', 'Indice completo del libro. Ogni capitolo ha: file di output, dossier, review e **lista esatta dei file** assegnati in `outline/NN.files.txt` (generata da `tools/build-outline-lists.py` a partire da `COVERAGE.csv` e `tools/rules.tsv`).', '']
lastp = None
for cid, part, slug, title in chs:
    if part != lastp:
        out += ['', f'## {parts[part]}', '']; lastp = part
    fl = os.path.join(book,'outline',f'{cid}.files.txt')
    n = sum(1 for _ in open(fl)) if os.path.exists(fl) else 0
    out += [f'### {cid} — {title}', f'- Output: `parte-{part}/{slug}.md`', f'- Dossier: `dossier/{cid}.facts.md` · Review: `review/{cid}.review.md`',
            f'- File assegnati: {n} → `outline/{cid}.files.txt`' if n else '- File assegnati: nessuno in COVERAGE (capitolo trasversale: vedi file chiave)']
    out += ['- ' + x if x and not x.startswith('<!--') else x for x in focus.get(cid, []) if x.strip()]
    out.append('')
out += ['', '## APPENDICI (generate da script in `tools/`)', '',
 '- A01 — Tutti gli InjectionToken → `appendici/A01-injection-token.md`',
 '- A02 — Interfacce di config (chiavi, tipi, default) → `appendici/A02-config.md`',
 '- A03 — Mappa CMS component type → componente → modulo → `appendici/A03-cms-components.md`',
 '- A04 — Endpoint OCC → `appendici/A04-occ-endpoints.md`',
 '- A05 — Guard → `appendici/A05-guard.md`',
 '- A06 — Interceptor → `appendici/A06-interceptor.md`',
 '- A07 — Eventi → `appendici/A07-eventi.md`',
 '- A08 — Outlet reference → `appendici/A08-outlet.md`',
 '- A09 — Feature toggle → `appendici/A09-feature-toggle.md`',
 '- A10 — Simboli @deprecated → `appendici/A10-deprecated.md`',
 '- A11 — Glossario → `appendici/A11-glossario.md`',
 '- A12 — Indice simbolo → capitolo → `appendici/A12-indice-simboli.md`', '']
open(os.path.join(book,'OUTLINE.md'),'w').write('\n'.join(out))
print(len(out))
