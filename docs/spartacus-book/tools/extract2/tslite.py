"""Mini-parser lessicale TypeScript condiviso dagli estrattori delle appendici.

Nessuna dipendenza esterna. Fornisce:
- elenco file in ambito (git ls-files),
- mascheratura di commenti/stringhe preservando offset e newline,
- bracket matching, split di object/array literal al livello superiore,
- conversione offset -> numero di riga, nome entry point della libreria.
"""
import os
import re
import subprocess
from functools import lru_cache

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..'))
SHA_SHORT = '5b7a1c2b'
EXCLUDE = re.compile(r'\.spec\.ts$|/testing/|\.mock\.ts$|/schematics/')


def git_files(ext='.ts'):
    out = subprocess.check_output(
        ['git', '-C', REPO, 'ls-files', 'core-libs', 'feature-libs', 'integration-libs'],
        text=True)
    files = [f for f in out.splitlines() if f.endswith(ext) and not EXCLUDE.search(f)]
    return sorted(files)


@lru_cache(maxsize=None)
def read(path):
    with open(os.path.join(REPO, path), encoding='utf-8') as fh:
        return fh.read()


@lru_cache(maxsize=None)
def masks(path):
    """Ritorna (code, nostr): code = testo con commenti sostituiti da spazi;
    nostr = come code ma con il contenuto di stringhe/template sostituito da spazi
    (delimitatori mantenuti). Gli offset coincidono con il testo originale."""
    t = read(path)
    code = list(t)
    nostr = list(t)
    i, n = 0, len(t)
    # stack per template literal con ${ } annidati
    tmpl_depth = []
    while i < n:
        c = t[i]
        if c == '/' and i + 1 < n and t[i + 1] == '/':
            j = t.find('\n', i)
            j = n if j < 0 else j
            for k in range(i, j):
                code[k] = nostr[k] = ' '
            i = j
            continue
        if c == '/' and i + 1 < n and t[i + 1] == '*':
            j = t.find('*/', i + 2)
            j = n if j < 0 else j + 2
            for k in range(i, j):
                if t[k] != '\n':
                    code[k] = nostr[k] = ' '
            i = j
            continue
        if c == '/' and _regex_ctx(t, i):
            j = i + 1
            in_cls = False
            while j < n and t[j] != '\n':
                if t[j] == '\\':
                    j += 2
                    continue
                if t[j] == '[':
                    in_cls = True
                elif t[j] == ']':
                    in_cls = False
                elif t[j] == '/' and not in_cls:
                    break
                j += 1
            for k in range(i + 1, min(j, n)):
                nostr[k] = ' '
            i = j + 1
            continue
        if c in '\'"':
            j = i + 1
            while j < n and t[j] != c and t[j] != '\n':
                j += 2 if t[j] == '\\' else 1
            for k in range(i + 1, min(j, n)):
                nostr[k] = ' '
            i = j + 1
            continue
        if c == '`' or (c == '}' and tmpl_depth and tmpl_depth[-1] == 0):
            if c == '}':
                tmpl_depth.pop()
            j = i + 1
            while j < n:
                if t[j] == '\\':
                    j += 2
                    continue
                if t[j] == '`':
                    break
                if t[j] == '$' and j + 1 < n and t[j + 1] == '{':
                    break
                j += 1
            for k in range(i + 1, min(j, n)):
                if t[k] != '\n':
                    nostr[k] = ' '
            if j < n and t[j] == '$':
                tmpl_depth.append(0)
                i = j + 2
            else:
                i = j + 1
            continue
        if tmpl_depth:
            if c == '{':
                tmpl_depth[-1] += 1
            elif c == '}':
                tmpl_depth[-1] -= 1
        i += 1
    return ''.join(code), ''.join(nostr)


def _regex_ctx(t, i):
    j = i - 1
    while j >= 0 and t[j] in ' \t\r\n':
        j -= 1
    if j < 0 or t[j] in '(,=:[!&|?{};+-*%<>~^':
        return True
    m = re.search(r'([A-Za-z_$][\w$]*)$', t[max(0, j - 10):j + 1])
    return bool(m and m.group(1) in ('return', 'typeof', 'case', 'in', 'of', 'void', 'delete', 'throw'))


OPEN = {'(': ')', '[': ']', '{': '}', '<': '>'}


def match(nostr, i):
    """Indice della parentesi che chiude quella in posizione i (su testo mascherato)."""
    o = nostr[i]
    c = OPEN[o]
    depth = 0
    for j in range(i, len(nostr)):
        ch = nostr[j]
        if ch in '([{':
            depth += 1
        elif ch in ')]}':
            depth -= 1
            if depth == 0:
                return j
    return -1


def split_top(nostr, start, end):
    """Divide nostr[start:end] (contenuto tra parentesi) alle virgole di primo livello.
    Ritorna lista di (s, e) senza spazi esterni."""
    parts = []
    depth = 0
    s = start
    for j in range(start, end):
        ch = nostr[j]
        if ch in '([{':
            depth += 1
        elif ch in ')]}':
            depth -= 1
        elif ch == ',' and depth == 0:
            parts.append((s, j))
            s = j + 1
    parts.append((s, end))
    out = []
    for a, b in parts:
        while a < b and nostr[a].isspace():
            a += 1
        while b > a and nostr[b - 1].isspace():
            b -= 1
        if a < b:
            out.append((a, b))
    return out


KEY_RE = re.compile(r'''\s*(?:(?P<id>[A-Za-z_$][\w$]*)|'(?P<sq>[^']*)'|"(?P<dq>[^"]*)"|\[(?P<comp>[^\]]+)\])\s*:''')


def object_entries(path, open_idx):
    """Entry di primo livello dell'object literal che inizia in open_idx ('{').
    Ritorna lista di dict {key, kind, vs, ve, ks} (kind: id|str|computed|spread|shorthand)."""
    code, nostr = masks(path)
    close = match(nostr, open_idx)
    res = []
    for a, b in split_top(nostr, open_idx + 1, close):
        seg = code[a:b]
        if seg.startswith('...'):
            res.append(dict(key=seg[3:].strip(), kind='spread', ks=a, vs=a + 3, ve=b))
            continue
        m = KEY_RE.match(code, a)
        if m and m.end() <= b:
            if m.group('id') is not None:
                key, kind = m.group('id'), 'id'
            elif m.group('comp') is not None:
                key, kind = m.group('comp').strip(), 'computed'
            else:
                key, kind = (m.group('sq') if m.group('sq') is not None else m.group('dq')), 'str'
            vs = m.end()
            while vs < b and code[vs].isspace():
                vs += 1
            res.append(dict(key=key, kind=kind, ks=a, vs=vs, ve=b))
        else:
            res.append(dict(key=seg.strip(), kind='shorthand', ks=a, vs=a, ve=b))
    return res, close


def line_of(path, off):
    return read(path).count('\n', 0, off) + 1


def ref(path, a, b=None):
    la = line_of(path, a)
    lb = line_of(path, b if b is not None else a)
    return f'{path}:L{la}-L{lb}'


@lru_cache(maxsize=None)
def _pkg_dirs():
    out = subprocess.check_output(
        ['git', '-C', REPO, 'ls-files', 'core-libs', 'feature-libs', 'integration-libs'], text=True)
    pkg, ng = {}, set()
    for f in out.splitlines():
        if '/schematics/' in f:
            continue
        d, base = os.path.split(f)
        if base == 'package.json':
            m = re.search(r'"name"\s*:\s*"([^"]+)"', read(f))
            if m:
                pkg[d] = m.group(1)
        elif base == 'ng-package.json':
            ng.add(d)
    return pkg, ng


@lru_cache(maxsize=None)
def library(path):
    """Entry point npm del file, es. feature-libs/cart/base/root/x.ts -> @spartacus/cart/base/root."""
    pkg, ng = _pkg_dirs()
    d = os.path.dirname(path)
    ep = None
    while d:
        if ep is None and d in ng:
            ep = d
        if d in pkg:
            if ep is None:
                ep = d
            return pkg[d] + ep[len(d):]
        d = os.path.dirname(d)
    return '?'


def lib_root(path):
    """Prime due componenti del path, es. feature-libs/cart."""
    return '/'.join(path.split('/')[:2])


def md_escape(s):
    return s.replace('|', '\\|').replace('\n', ' ')


def squash(s, limit=None):
    s = re.sub(r'\s+', ' ', s).strip()
    s = re.sub(r',\s*([\]}\)])', r'\1', s)
    s = re.sub(r'([\[{(])\s+', r'\1', s)
    s = re.sub(r'\s+([\]})])', r'\1', s)
    if limit and len(s) > limit:
        s = s[:limit - 1] + '…'
    return s


def code_cell(s):
    s = md_escape(s)
    if not s:
        return ''
    return '`' + s.replace('`', "'") + '`'


def header(title, script, counts, regen_extra='', intro=''):
    lines = [f'# {title}', '',
             f'> Generata da `tools/extract2/{script}` allo SHA {SHA_SHORT}. Non modificare a mano: rigenerare.', '']
    if intro:
        lines += [intro, '']
    lines += ['## Conteggi', '']
    for k, v in counts:
        lines.append(f'- {k}: **{v}**')
    lines += ['', '## Come rigenerare', '', '```bash',
              'cd docs/spartacus-book',
              f'python3 tools/extract2/{script}' + (' ' + regen_extra if regen_extra else ''),
              '# oppure tutte le appendici: bash tools/extract2/run_all.sh',
              '```', '',
              'Ambito: `git ls-files core-libs feature-libs integration-libs | grep \'\\.ts$\' | '
              'grep -vE \'\\.spec\\.ts$|/testing/|\\.mock\\.ts$|/schematics/\'`. '
              'La colonna "Libreria" è l\'entry point npm ricavato dal `package.json`/`ng-package.json` più vicino.', '']
    return lines


def write_out(name, lines):
    out = os.path.join(REPO, 'docs', 'spartacus-book', 'appendici', name)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(lines).rstrip() + '\n')
    print('scritto', out)


# ---- tabella simboli: const stringa / array di stringhe esportati ----
@lru_cache(maxsize=None)
def const_table():
    """Mappa nome -> (valore, path, offset) per `const X = 'str'` e `const X: string[] = ['a', ...]`."""
    tbl = {}
    rx = re.compile(r'\bconst\s+([A-Za-z_$][\w$]*)\s*(?::\s*[^=]+?)?=\s*')
    for f in git_files():
        code, nostr = masks(f)
        for m in rx.finditer(code):
            name = m.group(1)
            p = m.end()
            if p >= len(code):
                continue
            ch = code[p]
            if ch in '\'"':
                q = code.find(ch, p + 1)
                tbl.setdefault(name, []).append((code[p + 1:q], f, m.start()))
            elif ch == '[':
                e = match(nostr, p)
                items = []
                ok = True
                for a, b in split_top(nostr, p + 1, e):
                    s = code[a:b].strip()
                    mm = re.fullmatch(r'''['"]([^'"]*)['"]''', s)
                    if mm:
                        items.append(mm.group(1))
                    elif re.fullmatch(r'\.\.\.[A-Za-z_$][\w$]*', s):
                        items.append(s)  # spread, espanso da expand_list()
                    else:
                        ok = False
                if ok:
                    tbl.setdefault(name, []).append((items, f, m.start()))
    return tbl


def resolve_const(name, prefer_path=None):
    """Risolve un identificatore a valore costante; se ambiguo preferisce lo stesso file/lib."""
    cands = const_table().get(name, [])
    if not cands:
        return None, None
    if prefer_path:
        same = [c for c in cands if c[1] == prefer_path]
        if same:
            return same[0][0], same[0]
        lr = lib_root(prefer_path)
        same = [c for c in cands if lib_root(c[1]) == lr]
        if same:
            return same[0][0], same[0]
    vals = {repr(c[0]) for c in cands}
    if len(vals) == 1:
        return cands[0][0], cands[0]
    return None, None


def expand_list(items, prefer_path=None, seen=None):
    """Espande ricorsivamente gli elementi '...NOME' usando const_table().
    Ritorna (lista_espansa, spread_risolti, spread_non_risolti)."""
    seen = set(seen or ())
    out, ok, ko = [], [], []
    for it in items:
        if it.startswith('...'):
            name = it[3:]
            v, c = resolve_const(name, prefer_path)
            if isinstance(v, list) and name not in seen:
                sub, o2, k2 = expand_list(v, c[1], seen | {name})
                out += sub
                ok += [name] + o2
                ko += k2
            else:
                ko.append(name)
        else:
            out.append(it)
    return out, ok, ko


TOP_RE = re.compile(
    r'^(?:export\s+)?(?:default\s+)?(?:abstract\s+)?(?:declare\s+)?'
    r'(?:(?:class|function|const|let|var|interface|enum)\s+([A-Za-z_$][\w$]*)|@(\w+))', re.M)
CLASS_RE = re.compile(r'\bclass\s+([A-Za-z_$][\w$]*)')


def container(path, off):
    code, _ = masks(path)
    last = None
    for m in TOP_RE.finditer(code):
        if m.start() > off:
            break
        last = m
    if not last:
        return '?'
    if last.group(1):
        return last.group(1)
    cm = CLASS_RE.search(code, last.end())
    return cm.group(1) if cm else '@' + last.group(2)


CLASS_DECL_RE = re.compile(
    r'\b(?:export\s+)?(?:default\s+)?(?:abstract\s+)?class\s+([A-Za-z_$][\w$]*)\s*(?:<)?')


@lru_cache(maxsize=None)
def classes(path):
    """Dichiarazioni di classe: name, extends (nome base senza generics), implements (lista), start, ob, cb."""
    code, nostr = masks(path)
    out = []
    for m in CLASS_DECL_RE.finditer(code):
        i = m.end() - (1 if code[m.end() - 1] == '<' else 0)
        # salta generics della classe
        if code[i] == '<':
            depth = 0
            while i < len(code):
                if code[i] == '<':
                    depth += 1
                elif code[i] == '>' and code[i - 1] != '=':
                    depth -= 1
                    if depth == 0:
                        i += 1
                        break
                i += 1
        ob = nostr.find('{', i)
        if ob < 0:
            continue
        head = code[i:ob]
        # rimuove generics nell'header per semplificare
        h = head
        prev = None
        while prev != h:
            prev = h
            h = re.sub(r'<[^<>]*>', '', h)
        ext = re.search(r'\bextends\s+([A-Za-z_$][\w$.]*)', h)
        imp = re.search(r'\bimplements\s+(.+)$', h, re.S)
        impl = [x.strip() for x in imp.group(1).split(',')] if imp else []
        impl = [x.split('.')[-1] for x in impl if x]
        cb = match(nostr, ob)
        out.append(dict(name=m.group(1), extends=ext.group(1).split('.')[-1] if ext else None,
                        implements=impl, start=m.start(), ob=ob, cb=cb,
                        head_end=ob))
    return out


def class_members(path, cls, names):
    """Metodi/proprietà di primo livello del corpo classe il cui nome è in names. Ritorna [(name, off)]."""
    code, nostr = masks(path)
    res = []
    depth = 0
    rx = re.compile(r'(?:(?:public|protected|private|static|readonly|async|override)\s+)*([A-Za-z_$][\w$]*)\s*[(<:=?]')
    j = cls['ob'] + 1
    stmt_start = True
    while j < cls['cb']:
        ch = nostr[j]
        if ch in '([{':
            depth += 1
        elif ch in ')]}':
            depth -= 1
            if depth == 0:
                stmt_start = True
        elif depth == 0 and ch in ';\n':
            stmt_start = True
        elif depth == 0 and not ch.isspace() and stmt_start:
            stmt_start = False
            if ch == '@':
                pass
            else:
                m = rx.match(code, j)
                if m and m.group(1) in names:
                    res.append((m.group(1), j))
        j += 1
    return res
