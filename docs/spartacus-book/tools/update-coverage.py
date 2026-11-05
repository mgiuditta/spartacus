#!/usr/bin/env python3
"""Aggiorna lo stato in COVERAGE.csv.
documentato = il path del file (o una sua cartella antenata con >=3 segmenti) è citato in un capitolo/appendice;
letto       = citato solo nel dossier del capitolo (mappa M o fatti) ma non nel testo dei capitoli;
todo        = altrimenti. Gli 'escluso' restano tali."""
import csv, glob, os, re, collections
here=os.path.dirname(os.path.abspath(__file__)); b=os.path.dirname(here)
def corpus(globs):
    t=[]
    for g in globs:
        for f in glob.glob(os.path.join(b,g)): t.append(open(f,encoding='utf-8').read())
    return '\n'.join(t)
book=corpus(['parte-*/*.md','appendici/*.md'])
dos=corpus(['dossier/*.md'])
def cited(path, text):
    if path in text: return True
    parts=path.split('/')
    for k in range(len(parts)-1, 2, -1):
        d='/'.join(parts[:k])
        if re.search(re.escape(d)+r'(/|`|\s|\*|\))', text): return True
    return False
rows=list(csv.DictReader(open(os.path.join(b,'COVERAGE.csv'))))
for r in rows:
    if r['stato']=='escluso': continue
    if cited(r['path'], book): r['stato']='documentato'; r['motivo']=''
    elif cited(r['path'], dos): r['stato']='letto'; r['motivo']='citato nel dossier del capitolo, non nel testo'
    else: r['stato']='todo'
with open(os.path.join(b,'COVERAGE.csv'),'w',newline='') as fh:
    w=csv.DictWriter(fh,fieldnames=['path','libreria','capitolo','stato','motivo']); w.writeheader(); w.writerows(rows)
c=collections.Counter(r['stato'] for r in rows); print(c)
bylib=collections.defaultdict(collections.Counter)
for r in rows: bylib[r['libreria']][r['stato']]+=1
for k in sorted(bylib): print(k, dict(bylib[k]))
