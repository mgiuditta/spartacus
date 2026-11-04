#!/usr/bin/env python3
"""Scrive outline/NN.files.txt (lista esatta dei file per capitolo) da COVERAGE.csv."""
import csv, os, collections
here = os.path.dirname(os.path.abspath(__file__)); book = os.path.dirname(here)
os.makedirs(os.path.join(book, 'outline'), exist_ok=True)
by = collections.defaultdict(list)
for r in csv.DictReader(open(os.path.join(book, 'COVERAGE.csv'))):
    if r['capitolo']: by[r['capitolo']].append(r['path'])
for ch, files in sorted(by.items()):
    with open(os.path.join(book, 'outline', f'{ch}.files.txt'), 'w') as fh:
        fh.write('\n'.join(sorted(files)) + '\n')
    print(ch, len(files))
