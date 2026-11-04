#!/usr/bin/env python3
"""Appendice A05: guard (classi CanActivate/CanActivateChild/CanDeactivate/CanMatch e funzioni *Fn)."""
import re
from collections import defaultdict
import tslite as T

IFACES = ['CanActivate', 'CanActivateChild', 'CanDeactivate', 'CanMatch', 'CanLoad']
METHODS = {'canActivate': 'CanActivate', 'canActivateChild': 'CanActivateChild',
           'canDeactivate': 'CanDeactivate', 'canMatch': 'CanMatch', 'canLoad': 'CanLoad'}
FNS = ['CanActivateFn', 'CanActivateChildFn', 'CanDeactivateFn', 'CanMatchFn', 'CanLoadFn']


def main():
    files = T.git_files()
    allcls = {}
    for f in files:
        for c in T.classes(f):
            allcls.setdefault(c['name'], []).append((f, c))
    rows = {}
    for f in files:
        for c in T.classes(f):
            impl = [i for i in c['implements'] if i in IFACES]
            meth = T.class_members(f, c, set(METHODS))
            if impl or meth:
                rows[(f, c['name'])] = dict(name=c['name'], file=f, c=c, impl=impl,
                                            meth=sorted({m for m, _ in meth}), how=[], parent=c['extends'])
    # ereditarietà ricorsiva
    changed = True
    while changed:
        changed = False
        guard_names = {k[1] for k in rows}
        for f in files:
            for c in T.classes(f):
                if (f, c['name']) not in rows and c['extends'] in guard_names:
                    rows[(f, c['name'])] = dict(name=c['name'], file=f, c=c, impl=[], meth=[],
                                                how=['eredita da ' + c['extends']], parent=c['extends'])
                    changed = True
    # funzioni guard
    fn_rows = []
    rx_fn = re.compile(r'\b(?:export\s+)?(?:const|let)\s+([A-Za-z_$][\w$]*)\s*:\s*(' + '|'.join(FNS) + r')\b')
    rx_fn2 = re.compile(r'\b(?:export\s+)?function\s+([A-Za-z_$][\w$]*)\s*(?:<[^>]*>)?\s*\(([^)]*)\)\s*:\s*(' + '|'.join(FNS) + r')\b')
    for f in files:
        code, _ = T.masks(f)
        if 'Fn' not in code:
            continue
        for m in rx_fn.finditer(code):
            fn_rows.append(dict(name=m.group(1), kind=m.group(2), how='const tipizzata', file=f, ref=T.ref(f, m.start(), m.end())))
        for m in rx_fn2.finditer(code):
            fn_rows.append(dict(name=m.group(1), kind=m.group(3), how='factory che ritorna ' + m.group(3), file=f,
                                ref=T.ref(f, m.start(), m.end())))
    # usi
    rx_use = re.compile(r'\b(guards|canActivate|canActivateChild|canDeactivate|canMatch)\s*:\s*\[')
    uses = defaultdict(lambda: defaultdict(int))
    for f in files:
        code, nostr = T.masks(f)
        for m in rx_use.finditer(code):
            e = T.match(nostr, m.end() - 1)
            for a, b in T.split_top(nostr, m.end(), e):
                name = re.match(r'[\w$.]*', code[a:b]).group(0).split('.')[-1]
                if name:
                    uses[name][m.group(1)] += 1
    out = sorted(rows.values(), key=lambda r: (r['name'].lower(), r['file']))
    by_iface = defaultdict(int)
    for r in out:
        for i in set(r['impl']) | {METHODS[m] for m in r['meth']}:
            by_iface[i] += 1
    counts = [
        ('Classi guard (righe tabella 1)', len(out)),
        ('di cui con `implements Can*` esplicito', sum(1 for r in out if r['impl'])),
        ('di cui solo strutturali (metodo `canActivate()` ecc. senza `implements`)', sum(1 for r in out if not r['impl'] and r['meth'])),
        ('di cui solo per ereditarietà (`extends` di una guard)', sum(1 for r in out if r['how'])),
    ] + [(f'Classi con `{k}` (implements o metodo)', v) for k, v in sorted(by_iface.items())] + [
        ('Funzioni guard tipizzate `Can*Fn` (tabella 2)', len(fn_rows)),
        ('Entry point coinvolti', len({T.library(r['file']) for r in out})),
    ]
    intro = ('Tabella 1: classi che (a) dichiarano `implements CanActivate|CanActivateChild|CanDeactivate|CanMatch|CanLoad`, '
             'oppure (b) definiscono a primo livello un metodo `canActivate()`/`canActivateChild()`/`canDeactivate()`/'
             '`canMatch()`/`canLoad()` senza `implements` (guard "strutturali": la maggior parte delle guard Spartacus, '
             'perché le interfacce class-based sono deprecate in Angular), oppure (c) estendono ricorsivamente una delle '
             'precedenti. "Usi" conta le occorrenze del nome come elemento di array `guards: [...]` (config `cmsComponents`) '
             'o `canActivate|canActivateChild|canDeactivate|canMatch: [...]` (route) nell\'ambito.\n\n'
             'Tabella 2: funzioni guard tipizzate (`const x: CanActivateFn = ...` o funzioni che ritornano `Can*Fn`).')
    L = T.header('Appendice A05 — Guard', 'a05_guards.py', counts, intro=intro)
    L += ['## Tabella 1 — Classi guard', '',
          '| # | Classe | `implements` | Metodi guard | Classe padre | Usi (`guards`/route) | Libreria | Riferimento |',
          '|---|---|---|---|---|---|---|---|']
    for i, r in enumerate(out, 1):
        u = uses.get(r['name'], {})
        us = ', '.join(f'{k}: {v}' for k, v in sorted(u.items()))
        L.append('| {} | {} | {} | {} | {} | {} | {} | `{}` |'.format(
            i, T.code_cell(r['name']), ', '.join(f'`{x}`' for x in r['impl']) or ('—' if not r['how'] else r['how'][0]),
            ', '.join(f'`{m}()`' for m in r['meth']), T.code_cell(r['parent'] or ''), us,
            T.code_cell(T.library(r['file'])), T.ref(r['file'], r['c']['start'], r['c']['cb'])))
    L += ['', '## Tabella 2 — Funzioni guard (`CanActivateFn` & co.)', '']
    if fn_rows:
        L += ['| # | Nome | Tipo | Forma | Libreria | Riferimento |', '|---|---|---|---|---|---|']
        for i, r in enumerate(sorted(fn_rows, key=lambda r: r['name']), 1):
            L.append('| {} | {} | {} | {} | {} | `{}` |'.format(i, T.code_cell(r['name']), T.code_cell(r['kind']),
                                                              r['how'], T.code_cell(T.library(r['file'])), r['ref']))
    else:
        L += ['Nessuna `const`/`function` tipizzata `CanActivateFn`/`CanActivateChildFn`/`CanDeactivateFn`/`CanMatchFn` '
              'trovata in ambito. `CanActivateFn` compare solo come tipo nell\'infrastruttura '
              '(es. `BEFORE_CMS_PAGE_GUARD`, `CmsRoutesImplService`, `GuardsComposer`).']
        rx = re.compile(r'\b(' + '|'.join(FNS) + r')\b')
        occ = []
        for f in files:
            code, _ = T.masks(f)
            for m in rx.finditer(code):
                occ.append(f"`{T.ref(f, m.start())}` ({m.group(1)})")
        if occ:
            L += ['', 'Occorrenze del tipo (non commenti): ' + ', '.join(occ)]
    T.write_out('A05-guard.md', L)


if __name__ == '__main__':
    main()
