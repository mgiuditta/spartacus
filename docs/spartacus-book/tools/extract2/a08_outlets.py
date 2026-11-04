#!/usr/bin/env python3
"""Appendice A08: enum di outlet (*Outlets), nomi outlet nei template HTML (cxOutlet), provideOutlet()."""
import re
import subprocess
from collections import defaultdict
import tslite as T


def html_files():
    out = subprocess.check_output(['git', '-C', T.REPO, 'ls-files', 'core-libs', 'feature-libs', 'integration-libs'],
                                  text=True)
    return sorted(f for f in out.splitlines() if f.endswith('.html') and not re.search(r'/testing/|/schematics/', f))


def mask_html_comments(t):
    return re.sub(r'<!--.*?-->', lambda m: re.sub(r'[^\n]', ' ', m.group(0)), t, flags=re.S)


def main():
    # 1) enum *Outlets
    enums = []
    rx_enum = re.compile(r'\benum\s+([A-Za-z_$][\w$]*Outlets)\s*\{')
    rx_dm = re.compile(r'''declare\s+module\s+['"]([^'"]+)['"]\s*\{''')
    for f in T.git_files():
        code, nostr = T.masks(f)
        if 'Outlets' not in code:
            continue
        dms = [(m.end() - 1, T.match(nostr, m.end() - 1), m.group(1)) for m in rx_dm.finditer(code)]
        for m in rx_enum.finditer(code):
            ents, cb = T.object_entries(f, m.end() - 1)
            aug = next((d[2] for d in dms if d[0] < m.start() < d[1]), '')
            members = []
            t = T.read(f)
            for e in ents:
                # sintassi enum `KEY = 'value'` (KEY_RE cerca ':' quindi l'entry arriva come 'shorthand')
                seg = t[e['ks']:e['ve']].strip()
                mm = re.fullmatch(r'''([A-Za-z_$][\w$]*)\s*=\s*(['"])(.*)\2''', seg, re.S)
                key, val = (mm.group(1), mm.group(3)) if mm else (seg, '⚠️ valore non letterale')
                members.append(dict(key=key, val=val, ref=T.ref(f, e['ks'], e['ve'])))
            enums.append(dict(name=m.group(1), file=f, aug=aug, members=members, ref=T.ref(f, m.start(), cb)))
    enum_by_lower = defaultdict(list)
    member_index = defaultdict(set)
    for en in enums:
        enum_by_lower[en['name'].lower()].append(en)
        for mb in en['members']:
            member_index[mb['key']].add((en['name'], mb['val']))

    def resolve(expr):
        expr = expr.strip()
        m = re.fullmatch(r'''(['"])(.*)\1''', expr)
        if m:
            return m.group(2), 'letterale'
        m = re.fullmatch(r'([A-Za-z_$][\w$]*)\??\.([A-Za-z_$][\w$]*)', expr)
        if m:
            obj, mem = m.group(1), m.group(2)
            for en in enum_by_lower.get(obj.lower(), []):
                for mb in en['members']:
                    if mb['key'] == mem:
                        return mb['val'], f'{en["name"]}.{mem}'
            c = member_index.get(mem, set())
            vals = {v for _, v in c}
            if len(vals) == 1:
                en = sorted(n for n, _ in c)
                return vals.pop(), f'{"/".join(en)}.{mem} (risolto per nome membro)'
        return None, 'dinamico'

    # 2) template HTML
    uses = []
    rx_use = re.compile(r'''(\*cxOutlet|\[cxOutlet\]|(?<![\w\[*-])cxOutlet)(?:\s*=\s*"([^"]*)")?(?=[\s>/])''')
    rx_ref = re.compile(r'''(\[cxOutletRef\]|(?<![\w\[-])cxOutletRef)\s*=\s*"([^"]*)"''')
    hfiles = html_files()
    for f in hfiles:
        t = mask_html_comments(T.read(f))
        for rx, kind in ((rx_use, 'cxOutlet'), (rx_ref, 'cxOutletRef')):
            for m in rx.finditer(t):
                expr = (m.group(2) or '').strip()
                if kind == 'cxOutlet' and m.group(1) == '*cxOutlet':
                    expr = expr.split(';')[0].strip()
                if m.group(1) in ('cxOutlet', 'cxOutletRef'):
                    expr_eval = f"'{expr}'"  # attributo statico = stringa
                else:
                    expr_eval = expr
                val, how = resolve(expr_eval)
                uses.append(dict(kind=kind, syntax=m.group(1), expr=expr, val=val, how=how, file=f,
                                 line=t.count('\n', 0, m.start()) + 1))
    by_name = defaultdict(list)
    for u in uses:
        by_name[u['val'] if u['val'] is not None else '⟨dinamico⟩ ' + u['expr']].append(u)

    # 3) provideOutlet
    prov = []
    rx_po = re.compile(r'\bprovideOutlet\s*\(\s*\{')
    for f in T.git_files():
        code, nostr = T.masks(f)
        if 'provideOutlet' not in code:
            continue
        for m in rx_po.finditer(code):
            ents, cb = T.object_entries(f, m.end() - 1)
            d = {e['key']: T.squash(code[e['vs']:e['ve']]) for e in ents}
            idexpr = d.get('id', '')
            val, how = resolve(idexpr)
            prov.append(dict(id=idexpr, val=val, comp=d.get('component', ''), pos=d.get('position', ''),
                             other=', '.join(k for k in d if k not in ('id', 'component', 'position')),
                             file=f, cont=T.container(f, m.start()), ref=T.ref(f, m.start(), cb + 1)))

    all_vals = {mb['val'] for en in enums for mb in en['members']}
    used_vals = {u['val'] for u in uses if u['val']} | {p['val'] for p in prov if p['val']}
    counts = [
        ('Enum `*Outlets` (incluse augmentation)', len(enums)),
        ('Membri totali negli enum', sum(len(en['members']) for en in enums)),
        ('File `.html` in ambito', len(hfiles)),
        ('Usi `cxOutlet` nei template (statico, `[cxOutlet]`, `*cxOutlet`; commenti HTML esclusi)', sum(1 for u in uses if u['kind'] == 'cxOutlet')),
        ('Usi `cxOutletRef` nei template', sum(1 for u in uses if u['kind'] == 'cxOutletRef')),
        ('Nomi outlet distinti risolti nei template', len({u['val'] for u in uses if u['val'] is not None})),
        ('Usi non risolvibili staticamente (espressioni dinamiche)', sum(1 for u in uses if u['val'] is None)),
        ('Chiamate `provideOutlet({...})`', len(prov)),
        ('Valori enum mai usati né in template né in `provideOutlet`', len(all_vals - used_vals)),
    ]
    intro = ('Tabella 1: membri degli `enum` il cui nome termina con `Outlets` (es. `CartOutlets`, '
             '`ProductListOutlets`), incluse le augmentation in `declare module`. `OutletPosition` è escluso (non è un '
             'elenco di nomi outlet).\n\n'
             'Tabella 2: usi della direttiva outlet nei template `.html` (`git ls-files ... | grep \'\\.html$\'`): '
             '`cxOutlet="nome"` (attributo statico), `[cxOutlet]="expr"`, `*cxOutlet="expr"`. Le espressioni '
             '`Enum.MEMBRO` o `proprietà.MEMBRO` (es. `cartOutlets.X` dove `cartOutlets = CartOutlets`) sono risolte sul '
             'valore dell\'enum (per nome enum case-insensitive, altrimenti per nome membro se univoco). I riferimenti '
             'HTML sono nel formato `file.html:Lx-Lx`.\n\n'
             'Tabella 3: chiamate `provideOutlet({ id, component, position })`.')
    L = T.header('Appendice A08 — Outlet', 'a08_outlets.py', counts, intro=intro)
    L += ['## Tabella 1 — Enum `*Outlets`', '',
          '| # | Enum | Membro | Valore (nome outlet) | Usi template | `provideOutlet` | Augmentation di | Libreria | Riferimento |',
          '|---|---|---|---|---|---|---|---|---|']
    i = 0
    for en in sorted(enums, key=lambda e: (e['name'], e['file'])):
        for mb in en['members']:
            i += 1
            nu = sum(1 for u in uses if u['val'] == mb['val'])
            npv = sum(1 for p in prov if p['val'] == mb['val'])
            L.append('| {} | {} | {} | {} | {} | {} | {} | {} | `{}` |'.format(
                i, T.code_cell(en['name']), T.code_cell(mb['key']), T.code_cell(mb['val']), nu or '', npv or '',
                T.code_cell(en['aug']), T.code_cell(T.library(en['file'])), mb['ref']))
    L += ['', '## Tabella 2 — Nomi outlet nei template HTML', '',
          '| # | Nome outlet (valore) | Usi | Espressioni sorgente | File | Riferimenti |', '|---|---|---|---|---|---|']
    for i, (name, us) in enumerate(sorted(by_name.items(), key=lambda kv: (-len(kv[1]), kv[0])), 1):
        exprs = sorted({f"{u['syntax']}=\"{u['expr']}\"" if u['expr'] else u['syntax'] for u in us})
        refs = '<br>'.join(f"`{u['file']}:L{u['line']}-L{u['line']}`" for u in us)
        L.append('| {} | {} | {} | {} | {} | {} |'.format(
            i, T.code_cell(name), len(us), '<br>'.join(T.code_cell(x) for x in exprs), len({u['file'] for u in us}), refs))
    L += ['', '## Tabella 3 — `provideOutlet(...)`', '',
          '| # | `id` | Nome outlet risolto | `component` | `position` | Altre chiavi | Contenitore | Libreria | Riferimento |',
          '|---|---|---|---|---|---|---|---|---|']
    for i, p in enumerate(sorted(prov, key=lambda p: (p['file'], p['ref'])), 1):
        L.append('| {} | {} | {} | {} | {} | {} | {} | {} | `{}` |'.format(
            i, T.code_cell(p['id']), T.code_cell(p['val'] or '⚠️ non risolto'), T.code_cell(p['comp']),
            T.code_cell(p['pos']) or '(default)', T.md_escape(p['other']), T.code_cell(p['cont']),
            T.code_cell(T.library(p['file'])), p['ref']))
    unused = sorted(all_vals - used_vals)
    L += ['', '### Valori enum non usati in template `.html` né in `provideOutlet` (in ambito)', '',
          'Possono essere usati in config TypeScript, in template inline, nelle app, o essere punti di estensione per '
          'i clienti: ' + (', '.join(f'`{v}`' for v in unused) or '—')]
    T.write_out('A08-outlet.md', L)


if __name__ == '__main__':
    main()
