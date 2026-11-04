#!/usr/bin/env python3
"""Genera COVERAGE.csv da source-files.txt + rules.tsv. Preserva lo stato esistente."""
import csv, os, re, sys
here = os.path.dirname(os.path.abspath(__file__))
book = os.path.dirname(here)
rules = []
for line in open(os.path.join(here, 'rules.tsv')):
    if line.startswith('#') or not line.strip(): continue
    p, c = line.rstrip('\n').split('\t')[:2]
    rules.append((p, c))
rules.sort(key=lambda r: -len(r[0]))
old = {}
cov = os.path.join(book, 'COVERAGE.csv')
if os.path.exists(cov):
    for r in csv.DictReader(open(cov)): old[r['path']] = r
def lib(p):
    parts = p.split('/')
    return '/'.join(parts[:2])
rows = []
for f in open(os.path.join(here, 'source-files.txt')):
    f = f.strip()
    if not f: continue
    ch, st, why = '', 'todo', ''
    for p, c in rules:
        if f == p or f.startswith(p + '/') or f.startswith(p) and p.endswith('.ts'):
            ch = c; break
    if ch.startswith('X:'):
        st, why, ch = 'escluso', ch[2:], ''
    elif re.search(r'/assets/translations/|/assets/src/translations/|core-libs/assets/src/translations', f):
        st, why = 'escluso', 'dati di traduzione (chiavi/testi); meccanismo documentato nel cap. 37'
    elif re.search(r'(setup-jest|test-jest)\.ts$|/testing/|\.mock\.ts$|/test/', f):
        st, why = 'escluso', 'supporto ai test; strategia documentata nel cap. 44'
    if f in old and old[f]['stato'] in ('letto', 'documentato') and st != 'escluso':
        st, why = old[f]['stato'], old[f]['motivo']
    rows.append({'path': f, 'libreria': lib(f), 'capitolo': ch, 'stato': st, 'motivo': why})
with open(cov, 'w', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=['path', 'libreria', 'capitolo', 'stato', 'motivo'])
    w.writeheader(); w.writerows(rows)
from collections import Counter
print(Counter(r['stato'] for r in rows)); print('unmapped', sum(1 for r in rows if not r['capitolo'] and r['stato']!='escluso'))
