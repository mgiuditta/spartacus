#!/usr/bin/env python3
"""Appendice A07: classi evento (discendenti di CxEvent) e loro registrazione/dispatch."""
import re
from collections import defaultdict
import tslite as T


def main():
    files = T.git_files()
    allc = []
    for f in files:
        for c in T.classes(f):
            allc.append((f, c))
    events = {}
    frontier = {'CxEvent'}
    root = [(f, c) for f, c in allc if c['name'] == 'CxEvent']
    for f, c in root:
        events[(f, c['name'])] = dict(f=f, c=c, depth=0)
    depth = 0
    while frontier:
        depth += 1
        new = set()
        for f, c in allc:
            if c['extends'] in frontier and (f, c['name']) not in events:
                events[(f, c['name'])] = dict(f=f, c=c, depth=depth)
                new.add(c['name'])
        frontier = new
    names = {k[1] for k in events}
    children = defaultdict(int)
    for e in events.values():
        if e['c']['extends']:
            children[e['c']['extends']] += 1
    # type statico + abstract
    for e in events.values():
        f, c = e['f'], e['c']
        code, _ = T.masks(f)
        t = T.read(f)
        body = t[c['ob']:c['cb']]
        m = re.search(r'static\s+(?:readonly\s+)?type\s*(?::\s*[\w<>]+\s*)?=\s*([\'"`])([^\'"`]*)\1', body)
        e['type'] = m.group(2) if m else ''
        e['abstract'] = bool(re.match(r'(?:export\s+)?(?:default\s+)?abstract\b', code[c['start']:c['ob']]))
    # registrazioni
    regs = defaultdict(list)
    rx_obj = re.compile(r'\b([A-Za-z_$][\w$.]*)\s*\(\s*\{')
    rx_reg = re.compile(r'\b([A-Za-z_$][\w$]*)\.register\s*\(\s*([A-Z][\w$]*)\s*[,)]')
    rx_disp = re.compile(r'\.dispatch\s*\(\s*(?:new\s+([A-Z][\w$]*)|createFrom\s*\(\s*([A-Z][\w$]*))')
    rx_disp2 = re.compile(r'\.dispatch\s*(?:<[^>]*>)?\s*\(')
    disp = defaultdict(list)
    for f in files:
        code, nostr = T.masks(f)
        if 'register' in code or 'event' in code:
            for m in rx_obj.finditer(code):
                callee = m.group(1)
                if 'register' not in callee.lower():
                    continue
                ents, cb = T.object_entries(f, m.end() - 1)
                d = {x['key']: T.squash(code[x['vs']:x['ve']]) for x in ents}
                if 'event' in d and d['event'] in names:
                    regs[d['event']].append(dict(how=callee.split('.')[-1] if callee.startswith('this.') else callee,
                                                 action=d.get('action', ''), factory='factory' in d,
                                                 ref=T.ref(f, m.start(), cb), file=f))
            for m in rx_reg.finditer(code):
                if m.group(2) in names and m.group(1).lower().endswith('eventservice'):
                    regs[m.group(2)].append(dict(how=f'{m.group(1)}.register', action='', factory=False,
                                                 ref=T.ref(f, m.start(), m.end()), file=f))
        if 'dispatch' in code:
            for m in rx_disp.finditer(code):
                n = m.group(1) or m.group(2)
                if n in names:
                    disp[n].append(T.ref(f, m.start()))
            # eventService.dispatch(obj, EventType)
            for m in rx_disp2.finditer(code):
                ob = m.end() - 1
                cb = T.match(nostr, ob)
                parts = T.split_top(nostr, ob + 1, cb)
                if len(parts) >= 2:
                    n = code[parts[1][0]:parts[1][1]].strip()
                    if n in names:
                        disp[n].append(T.ref(f, m.start()))
    rows = sorted(events.values(), key=lambda e: (T.lib_root(e['f']) != 'core-libs/core', e['f'], e['c']['start']))
    regd = {n for n in regs}
    counts = [
        ('Classi evento (discendenti di `CxEvent`, incluso `CxEvent`)', len(rows)),
        ('Profondità massima della gerarchia', max(e['depth'] for e in rows) if rows else 0),
        ('Classi `abstract`', sum(1 for e in rows if e['abstract'])),
        ('Classi con `static type` letterale', sum(1 for e in rows if e['type'])),
        ('Classi usate come genitore di altri eventi', sum(1 for e in rows if children.get(e['c']['name']))),
        ('Classi con almeno una registrazione rilevata', len(regd)),
        ('Siti di registrazione rilevati (totale)', sum(len(v) for v in regs.values())),
        ('Classi con almeno un `dispatch` rilevato', len(disp)),
        ('Entry point coinvolti', len({T.library(e['f']) for e in rows})),
    ]
    intro = ('Le classi evento sono individuate risalendo ricorsivamente le clausole `extends` a partire da '
             '`CxEvent` (`core-libs/core/src/event/cx-event.ts`). "Profondità" = distanza da `CxEvent`. '
             '"Registrazioni" individua (a) chiamate `xxxregister*({ action, event: X, ... })` — '
             '`stateEventService.register` o helper come `registerMapped` — con `action` mostrata, e '
             '(b) `<...>eventService.register(X, source$)`. "Dispatch" conta `.dispatch(new X(...))`, '
             '`.dispatch(createFrom(X, ...))` e `.dispatch(obj, X)`. Eventi senza registrazione/dispatch possono essere '
             'classi padre astratte, emessi tramite builder generici o registrati con forme non rilevate '
             '(⚠️ in tal caso verificare sul codice).')
    L = T.header('Appendice A07 — Eventi (`CxEvent`)', 'a07_events.py', counts, intro=intro)
    L += ['## Tabella — Classi evento', '',
          '| # | Classe | `static type` | Classe padre | Prof. | Abstract | Figli | Registrazioni | Dispatch | Libreria | Riferimento |',
          '|---|---|---|---|---|---|---|---|---|---|---|']
    for i, e in enumerate(rows, 1):
        n = e['c']['name']
        rg = regs.get(n, [])
        rgs = '<br>'.join(
            f"{r['how']}" + (f" ← `{r['action']}`" if r['action'] else '') + (' (factory)' if r['factory'] else '')
            + f" `{r['ref']}`" for r in rg)
        ds = '<br>'.join(f'`{x}`' for x in disp.get(n, []))
        L.append('| {} | {} | {} | {} | {} | {} | {} | {} | {} | {} | `{}` |'.format(
            i, T.code_cell(n), T.code_cell(e['type']), T.code_cell(e['c']['extends'] or ''), e['depth'],
            'sì' if e['abstract'] else '', children.get(n, '') or '', rgs, ds,
            T.code_cell(T.library(e['f'])), T.ref(e['f'], e['c']['start'], e['c']['cb'])))
    dup = defaultdict(list)
    for e in rows:
        dup[e['c']['name']].append(e['f'])
    dups = {k: v for k, v in dup.items() if len(v) > 1}
    if dups:
        L += ['', '### Nomi di classe evento duplicati', '',
              'Registrazioni e dispatch sono associati per nome: per questi nomi l\'attribuzione può essere ambigua.', '']
        for k, v in sorted(dups.items()):
            L.append(f'- `{k}`: ' + ', '.join(f'`{x}`' for x in v))
    T.write_out('A07-eventi.md', L)


if __name__ == '__main__':
    main()
