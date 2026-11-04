#!/usr/bin/env python3
"""Appendice A03: mapping CMS type code -> componente (cmsComponents) e liste lazy featureModules."""
import re
from collections import defaultdict, OrderedDict
import tslite as T

def array_items(path, s, e):
    code, nostr = T.masks(path)
    return [code[a:b] for a, b in T.split_top(nostr, s + 1, e)]


def summarize_providers(path, vs, ve):
    code, nostr = T.masks(path)
    if code[vs] != '[':
        return T.squash(code[vs:ve], 100)
    out = []
    for a, b in T.split_top(nostr, vs + 1, T.match(nostr, vs)):
        seg = code[a:b]
        if seg.startswith('{'):
            ents, _ = T.object_entries(path, a)
            d = {x['key']: T.squash(code[x['vs']:x['ve']], 60) for x in ents}
            prov = d.get('provide', '?')
            impl = next((f'{k}: {d[k]}' for k in ('useClass', 'useExisting', 'useValue', 'useFactory') if k in d), '')
            out.append(f'{prov} → {impl}' if impl else prov)
        else:
            out.append(T.squash(seg, 60))
    return '; '.join(out)


def resolve_key(e, path):
    if e['kind'] == 'computed':
        v, _ = T.resolve_const(e['key'], path)
        return (v if isinstance(v, str) else f"[{e['key']}]"), True
    return e['key'], False


def main():
    mappings = []
    lazy = []
    rx_cms = re.compile(r'\bcmsComponents\s*:\s*\{')
    rx_feat = re.compile(r'\bfeatureModules\s*:\s*\{')
    for f in T.git_files():
        code, nostr = T.masks(f)
        if 'cmsComponents' not in code:
            continue
        for m in rx_cms.finditer(code):
            ob = m.end() - 1
            ents, close = T.object_entries(f, ob)
            cont = T.container(f, m.start())
            for e in ents:
                key, computed = resolve_key(e, f)
                row = dict(type=key, file=f, ref=T.ref(f, e['ks'], e['ve']), cont=cont,
                           comp='', guards='', providers='', extra='')
                if e['kind'] in ('spread', 'shorthand'):
                    row['type'] = ('...' if e['kind'] == 'spread' else '') + e['key']
                    row['extra'] = e['kind']
                    mappings.append(row)
                    continue
                if code[e['vs']] == '{':
                    sub, _ = T.object_entries(f, e['vs'])
                    others = []
                    for s in sub:
                        val = code[s['vs']:s['ve']]
                        if s['key'] == 'component':
                            row['comp'] = T.squash(val, 120)
                        elif s['key'] == 'guards':
                            row['guards'] = T.squash(val, 120)
                        elif s['key'] == 'providers':
                            row['providers'] = summarize_providers(f, s['vs'], s['ve'])
                        else:
                            others.append(s['key'] if s['kind'] != 'spread' else '...' + s['key'])
                    row['extra'] = ', '.join(others)
                else:
                    row['comp'] = '(valore: ' + T.squash(code[e['vs']:e['ve']], 80) + ')'
                if computed:
                    row['extra'] = (row['extra'] + ', ' if row['extra'] else '') + f"chiave calcolata [{e['key']}]"
                mappings.append(row)
        for m in rx_feat.finditer(code):
            ents, _ = T.object_entries(f, m.end() - 1)
            for e in ents:
                feat, _c = resolve_key(e, f)
                if e['kind'] in ('spread', 'shorthand') or code[e['vs']] != '{':
                    continue
                sub, _ = T.object_entries(f, e['vs'])
                for s in sub:
                    if s['key'] != 'cmsComponents':
                        continue
                    if s['kind'] == 'shorthand':
                        src = 'cmsComponents'
                    else:
                        src = code[s['vs']:s['ve']].strip()
                    items, origin = None, ''
                    if src.startswith('['):
                        items = [re.sub(r'''^['"]|['"]$''', '', x.strip()) for x in array_items(f, s['vs'], T.match(nostr, s['vs']))]
                        origin = T.ref(f, s['ks'], s['ve'])
                    else:
                        v, c = T.resolve_const(src, f)
                        if isinstance(v, list):
                            items = v
                            origin = T.ref(c[1], c[2], c[2] + len(T.read(c[1])[c[2]:].split(']')[0]))
                    spread_ok, spread_ko = [], []
                    if items is not None:
                        items, spread_ok, spread_ko = T.expand_list(items, f)
                    lazy.append(dict(feature=feat, featkey=e['key'] if e['kind'] == 'computed' else '',
                                     file=f, ref=T.ref(f, e['ks'], e['ve']), items=items or [],
                                     src=src if not src.startswith('[') else '', origin=origin,
                                     unresolved=items is None, spread_ok=spread_ok, spread_ko=spread_ko))

    lazy_by_type = defaultdict(list)
    for L in lazy:
        for t in L['items']:
            lazy_by_type[t].append(L['feature'])

    mappings.sort(key=lambda r: (r['type'].lower(), r['file']))
    types = {r['type'] for r in mappings if r['extra'] not in ('spread', 'shorthand')}
    lazy_types = {t for L in lazy for t in L['items']}
    files = {r['file'] for r in mappings}
    libs = {T.library(r['file']) for r in mappings}
    n_lazy_items = sum(len(L['items']) for L in lazy)
    counts = [
        ('Occorrenze di mapping `cmsComponents: { ... }` (righe tabella 1)', len(mappings)),
        ('Type code distinti mappati', len(types)),
        ('File che dichiarano mapping', len(files)),
        ('Entry point (librerie) coinvolti', len(libs)),
        ('Mapping con `guards`', sum(1 for r in mappings if r['guards'])),
        ('Mapping con `providers`', sum(1 for r in mappings if r['providers'])),
        ('Feature lazy con `cmsComponents: [...]` (righe tabella 2)', len(lazy)),
        ('Type code dichiarati nelle liste lazy (con ripetizioni / distinti)', f'{n_lazy_items} / {len(lazy_types)}'),
        ('Type code lazy senza mapping statico trovato in ambito', len(lazy_types - types)),
    ]
    intro = ('Tabella 1: ogni chiave dentro un object literal `cmsComponents: { ... }` (in `provideDefaultConfig`, '
             '`provideConfig`, `<CmsConfig>{...}`, factory, ecc.). Un type code compare più volte se è mappato in più punti '
             '(es. override in librerie diverse o varianti). "Contenitore" è la dichiarazione top-level che racchiude il '
             'mapping (classe `@NgModule` o funzione/const factory). "Altre chiavi" elenca le proprietà diverse da '
             '`component`/`guards`/`providers` (es. `childRoutes`, `deferLoading`, `data`). La colonna "Lazy in feature" '
             'incrocia con la tabella 2.\n\nTabella 2: per ogni `featureModules.<feature>.cmsComponents` nei root module, '
             'i type code che, quando presenti in pagina, causano il caricamento lazy della feature. Le chiavi calcolate '
             '(`[CART_BASE_FEATURE]`) e le liste referenziate per costante (`CHECKOUT_BASE_CMS_COMPONENTS`) sono risolte '
             'tramite la tabella delle costanti stringa/array del codice.')
    L = T.header('Appendice A03 — Componenti CMS (`cmsComponents`)', 'a03_cms_components.py', counts, intro=intro)
    L += ['## Tabella 1 — Mapping type code → componente', '',
          '| # | Type code CMS | Componente | Guards | Providers | Altre chiavi | Lazy in feature | Contenitore | Libreria | Riferimento |',
          '|---|---|---|---|---|---|---|---|---|---|']
    for i, r in enumerate(mappings, 1):
        lz = ', '.join(sorted(set(lazy_by_type.get(r['type'], []))))
        L.append('| {} | {} | {} | {} | {} | {} | {} | {} | {} | `{}` |'.format(
            i, T.code_cell(r['type']), T.code_cell(r['comp']), T.code_cell(r['guards']),
            T.code_cell(r['providers']), T.md_escape(r['extra']), T.md_escape(lz),
            T.code_cell(r['cont']), T.code_cell(T.library(r['file'])), r['ref']))
    L += ['', '## Tabella 2 — Type code lazy per feature (`featureModules.<feature>.cmsComponents`)', '',
          '| # | Feature | Chiave sorgente | N. | Type code | Spread espansi | Lista definita in | Libreria | Riferimento (entry feature) |',
          '|---|---|---|---|---|---|---|---|---|']
    lazy.sort(key=lambda x: (x['file'], x['feature']))
    for i, x in enumerate(lazy, 1):
        tcs = ', '.join(f'`{t}`' for t in x['items']) if not x['unresolved'] else f"⚠️ DA VERIFICARE: `{x['src']}` non risolto"
        sp = ', '.join(f'`...{n}`' for n in x['spread_ok'])
        if x['spread_ko']:
            sp += (' ' if sp else '') + '⚠️ DA VERIFICARE non risolti: ' + ', '.join(f'`...{n}`' for n in x['spread_ko'])
        L.append('| {} | {} | {} | {} | {} | {} | {} | {} | `{}` |'.format(
            i, T.code_cell(x['feature']), T.code_cell(f"[{x['featkey']}]" if x['featkey'] else '') +
            (' / ' + T.code_cell(x['src']) if x['src'] else ''), len(x['items']), tcs, sp,
            f"`{x['origin']}`" if x['origin'] else '', T.code_cell(T.library(x['file'])), x['ref']))
    missing = sorted(lazy_types - types)
    if missing:
        L += ['', '### Type code lazy senza mapping `cmsComponents` statico in ambito', '',
              'Possono essere mappati in file esclusi dall\'ambito, in config costruite dinamicamente, o essere solo '
              'dichiarati per attivare il caricamento della feature.', '',
              ', '.join(f'`{t}`' for t in missing)]
    T.write_out('A03-cms-components.md', L)


if __name__ == '__main__':
    main()
