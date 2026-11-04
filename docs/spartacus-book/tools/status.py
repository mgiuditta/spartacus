#!/usr/bin/env python3
"""Stato pipeline per capitolo, dedotto dai file presenti."""
import os
here=os.path.dirname(os.path.abspath(__file__)); b=os.path.dirname(here)
chs=[l.rstrip('\n').split('\t') for l in open(os.path.join(here,'chapters.tsv')) if l.strip() and not l.startswith('#')]
rows=[]
for cid,part,slug,title in chs:
    d=os.path.exists(f'{b}/dossier/{cid}.facts.md'); c=os.path.exists(f'{b}/parte-{part}/{slug}.md')
    rp=f'{b}/review/{cid}.review.md'; r=os.path.exists(rp); a=r and '## Applicazione' in open(rp).read()
    st='corretto' if a else 'review' if r else 'scritto' if c else 'dossier' if d else 'todo'
    rows.append((cid,st))
import collections; print(collections.Counter(s for _,s in rows)); print(' '.join(f'{c}:{s}' for c,s in rows))
