#!/usr/bin/env python3
"""Appendice A04: chiavi endpoint OCC (backend.occ.endpoints) e augmentation di OccEndpoints."""
import re
import tslite as T

KEYBEFORE = re.compile(r'''(?:([A-Za-z_$][\w$]*)|'([^']*)'|"([^"]*)"|\[([^\]]+)\])\s*:\s*(?:<[^>]*>\s*)?$''')


def key_path(path, off):
    """Percorso delle chiavi degli object literal che racchiudono off (dal più esterno)."""
    code, nostr = T.masks(path)
    keys = []
    depth = 0
    i = off - 1
    while i >= 0:
        ch = nostr[i]
        if ch in ')]}':
            depth += 1
        elif ch in '([{':
            if depth == 0:
                if ch == '{':
                    m = KEYBEFORE.search(code[max(0, i - 200):i])
                    if m:
                        keys.append(next(g for g in m.groups() if g is not None))
                    else:
                        # dichiarazione top-level: const X: T = {  /  return {
                        m2 = re.search(r'(?:const|let|var)\s+([A-Za-z_$][\w$]*)[^=]*=\s*$', code[max(0, i - 200):i])
                        if m2:
                            keys.append(m2.group(1))
                            break
            else:
                depth -= 1
        i -= 1
    return list(reversed(keys))


def interface_members(path, ob):
    code, nostr = T.masks(path)
    cb = T.match(nostr, ob)
    members = []
    depth = 0
    start = ob + 1
    for j in range(ob + 1, cb + 1):
        ch = nostr[j]
        if ch in '([{<' and j < cb:
            depth += 1
        elif ch in ')]}>' and j < cb:
            depth -= 1
        if (ch == ';' and depth == 0) or j == cb:
            seg = code[start:j]
            m = re.match(r'''\s*(?:readonly\s+)?([A-Za-z_$][\w$]*|'[^']*'|"[^"]*")(\??)\s*:\s*(.*)$''', seg, re.S)
            if m:
                a = start + seg.index(m.group(1))
                members.append(dict(name=m.group(1).strip('\'"'), opt=bool(m.group(2)),
                                    type=T.squash(m.group(3), 60), ref=T.ref(path, a, j)))
            start = j + 1
    return members, cb


def find_const_object(name, prefer):
    """Trova `const NAME[: T] = {` (prima nello stesso file, poi in ambito). Ritorna (path, open_idx)."""
    rx = re.compile(r'\bconst\s+' + re.escape(name) + r'\b[^=;]*=\s*\{')
    files = [prefer] + [x for x in T.git_files() if x != prefer]
    for f in files:
        code, _ = T.masks(f)
        if name not in code:
            continue
        m = rx.search(code)
        if m:
            return f, m.end() - 1
    return None, None


def endpoint_rows(f, ents, kpath, cfg, origin, seen=()):
    code, nostr = T.masks(f)
    rows = []
    for e in ents:
        val = code[e['vs']:e['ve']]
        if e['kind'] == 'spread':
            name = e['key']
            sf, sob = find_const_object(name, f) if name not in seen else (None, None)
            if sf:
                sents, _ = T.object_entries(sf, sob)
                rows += endpoint_rows(sf, sents, kpath, cfg,
                                      (origin + ' → ' if origin else '') + f'...{name} ({T.ref(f, e["ks"], e["ve"])})',
                                      seen + (name,))
                continue
            rows.append(dict(key='...' + name, val='⚠️ DA VERIFICARE: spread non risolto', kind='spread', scopes='',
                             kpath=kpath, cfg=cfg, file=f, ref=T.ref(f, e['ks'], e['ve']), origin=origin))
            continue
        kind = 'oggetto (scope)' if val.startswith('{') else 'stringa'
        key = e['key']
        if e['kind'] == 'computed':
            v, _ = T.resolve_const(e['key'], f)
            key = v if isinstance(v, str) else f"[{e['key']}]"
        if val.startswith('{'):
            sub, _ = T.object_entries(f, e['vs'])
            valtxt = '{ ' + ', '.join(f"{x['key']}: {T.squash(code[x['vs']:x['ve']])}" for x in sub) + ' }'
            scopes = ', '.join(x['key'] for x in sub)
        else:
            valtxt = T.squash(val)
            scopes = ''
            if not re.fullmatch(r'''(['"`])[^'"`]*\1''', valtxt):
                kind = 'espressione'
                if re.fullmatch(r'[A-Za-z_$][\w$]*', valtxt):
                    v, c = T.resolve_const(valtxt, f)
                    if isinstance(v, str):
                        valtxt += f" = '{v}'"
                        kind = f'costante ({T.ref(c[1], c[2])})'
        rows.append(dict(key=key, val=valtxt, kind=kind, scopes=scopes, kpath=kpath, cfg=cfg,
                         file=f, ref=T.ref(f, e['ks'], e['ve']), origin=origin))
    return rows


def find_interface(name, prefer):
    rx = re.compile(r'\binterface\s+' + re.escape(name) + r'\b[^{]*\{')
    for f in [prefer] + [x for x in T.git_files() if x != prefer]:
        code, _ = T.masks(f)
        if name not in code:
            continue
        m = rx.search(code)
        if m:
            return f, m.end() - 1, m.start()
    return None, None, None


def main():
    occ_rows, other_rows = [], []
    rx = re.compile(r'\bendpoints\s*:\s*\{')
    for f in T.git_files():
        code, nostr = T.masks(f)
        if 'endpoints' not in code:
            continue
        for m in rx.finditer(code):
            kp = key_path(f, m.start())
            ents, close = T.object_entries(f, m.end() - 1)
            cfg = kp[0] if kp and not kp[0] in ('backend',) else ''
            if not cfg:
                cfg = T.container(f, m.start())
            kpath = '.'.join(k for k in kp if k != cfg) + '.endpoints'
            kpath = kpath[kpath.index('backend.'):] if 'backend.' in kpath else kpath
            for row in endpoint_rows(f, ents, kpath, cfg, ''):
                (occ_rows if kpath.startswith('backend.occ.') else other_rows).append(row)

    # augmentation
    aug = []
    base = None
    rx_dm = re.compile(r'''declare\s+module\s+['"]([^'"]+)['"]\s*\{''')
    for f in T.git_files():
        code, nostr = T.masks(f)
        if 'OccEndpoints' not in code:
            continue
        for m in rx_dm.finditer(code):
            mod_ob = m.end() - 1
            mod_cb = T.match(nostr, mod_ob)
            for im in re.finditer(r'\binterface\s+OccEndpoints\b\s*(?:extends\s+([^{]+))?\{', code[mod_ob:mod_cb]):
                ob = mod_ob + im.end() - 1
                mem, cb = interface_members(f, ob)
                ext = [x.strip() for x in (im.group(1) or '').split(',') if x.strip()]
                ext_refs = []
                for x in ext:
                    xf, xob, xstart = find_interface(x, f)
                    if xf:
                        xm, xcb = interface_members(xf, xob)
                        mem += xm
                        ext_refs.append(f"`{x}` (`{T.ref(xf, xstart, xcb)}`)")
                    else:
                        ext_refs.append(f"`{x}` ⚠️ DA VERIFICARE: non trovata")
                aug.append(dict(module=m.group(1), file=f, ref=T.ref(f, mod_ob + im.start(), cb), members=mem,
                                ext=', '.join(ext_refs)))
        bm = re.search(r'export\s+interface\s+OccEndpoints\b[^{]*\{', code)
        if bm:
            mem, cb = interface_members(f, bm.end() - 1)
            base = dict(file=f, ref=T.ref(f, bm.start(), cb), members=mem)

    occ_rows.sort(key=lambda r: (r['key'].lower(), r['file']))
    other_rows.sort(key=lambda r: (r['kpath'], r['key'].lower(), r['file']))
    aug.sort(key=lambda a: a['file'])
    occ_keys = {r['key'] for r in occ_rows}
    aug_keys = {x['name'] for a in aug for x in a['members']}
    base_keys = {x['name'] for x in base['members']} if base else set()
    declared = aug_keys | base_keys
    counts = [
        ('Chiavi endpoint in `backend.occ.endpoints` (righe tabella 1)', len(occ_rows)),
        ('Chiavi OCC distinte', len(occ_keys)),
        ('di cui con template a oggetto (scope)', sum(1 for r in occ_rows if r['kind'].startswith('oggetto'))),
        ('File default config OCC', len({r['file'] for r in occ_rows})),
        ('Chiavi in altri `endpoints` non OCC (es. `backend.opfApi.endpoints`) (tabella 2)', len(other_rows)),
        ('Blocchi `declare module ... { interface OccEndpoints }` (tabella 3)', len(aug)),
        ('Membri dichiarati via augmentation / nell\'interfaccia base', f'{len(aug_keys)} / {len(base_keys)}'),
        ('Chiavi OCC con default ma non dichiarate in `OccEndpoints` (base+augmentation)', len(occ_keys - declared)),
        ('Membri di `OccEndpoints` senza default in ambito', len(declared - occ_keys)),
    ]
    intro = ('Tabella 1: ogni chiave dentro un object literal `endpoints: { ... }` il cui percorso di chiavi è '
             '`backend.occ.endpoints` (default config OCC, tipicamente `default-occ-*-config.ts`, incluse le factory). '
             'Il valore è riportato come scritto nel sorgente (stringa template OCC, oggetto con scope, o espressione). '
             'Gli spread (`...orderEndpoints`) sono espansi risolvendo la `const` corrispondente: la riga punta alla '
             'definizione della chiave, la colonna "Via spread" al punto di spread. '
             'Una chiave ripetuta indica più default (es. override in librerie diverse, merge con priorità di config).\n\n'
             'Tabella 2: altri blocchi `endpoints` (es. OPF API) per completezza.\n\n'
             'Tabella 3: le interface augmentation `interface OccEndpoints` dentro `declare module \'...\'`.')
    L = T.header('Appendice A04 — Endpoint OCC', 'a04_occ_endpoints.py', counts, intro=intro)
    L += ['## Tabella 1 — `backend.occ.endpoints`', '',
          '| # | Chiave | Template URL / valore | Tipo | Scope | Config | Via spread | Libreria | Riferimento |',
          '|---|---|---|---|---|---|---|---|---|']
    for i, r in enumerate(occ_rows, 1):
        L.append('| {} | {} | {} | {} | {} | {} | {} | {} | `{}` |'.format(
            i, T.code_cell(r['key']), T.code_cell(r['val']), r['kind'], T.md_escape(r['scopes']),
            T.code_cell(r['cfg']), T.md_escape(r['origin']), T.code_cell(T.library(r['file'])), r['ref']))
    L += ['', '## Tabella 2 — Altri blocchi `endpoints` (non `backend.occ`)', '',
          '| # | Percorso | Chiave | Valore | Config | Libreria | Riferimento |',
          '|---|---|---|---|---|---|---|']
    for i, r in enumerate(other_rows, 1):
        L.append('| {} | {} | {} | {} | {} | {} | `{}` |'.format(
            i, T.code_cell(r['kpath']), T.code_cell(r['key']), T.code_cell(r['val']), T.code_cell(r['cfg']),
            T.code_cell(T.library(r['file'])), r['ref']))
    L += ['', '## Tabella 3 — Augmentation di `OccEndpoints`', '']
    if base:
        L += [f"Interfaccia base: `{base['ref']}` ({len(base['members'])} membri: "
              + ', '.join(f"`{x['name']}`" for x in base['members']) + ').', '']
    L += ['| # | Modulo augmentato | `extends` | Membri (diretti + ereditati) | N. | Libreria | Riferimento |', '|---|---|---|---|---|---|---|']
    for i, a in enumerate(aug, 1):
        L.append('| {} | {} | {} | {} | {} | {} | `{}` |'.format(
            i, T.code_cell(a['module']), a['ext'], ', '.join(f"`{x['name']}`" for x in a['members']), len(a['members']),
            T.code_cell(T.library(a['file'])), a['ref']))
    nd = sorted(occ_keys - declared)
    nv = sorted(declared - occ_keys)
    L += ['', '### Incroci', '',
          '- Chiavi con default ma non dichiarate in `OccEndpoints`: ' + (', '.join(f'`{k}`' for k in nd) or '—'),
          '- Membri di `OccEndpoints` senza default `backend.occ.endpoints` in ambito: ' + (', '.join(f'`{k}`' for k in nv) or '—')]
    T.write_out('A04-occ-endpoints.md', L)


if __name__ == '__main__':
    main()
