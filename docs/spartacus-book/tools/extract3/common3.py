"""Utility condivise dagli estrattori delle appendici A11/A12 (tools/extract3).

Riusa il mini-parser lessicale di tools/extract2/tslite.py (mascheratura commenti/stringhe).
"""
import os
import re
import sys
import subprocess
from functools import lru_cache

HERE = os.path.dirname(os.path.abspath(__file__))
BOOK = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(BOOK, 'tools', 'extract2'))
import tslite  # noqa: E402

REPO = tslite.REPO
SHA_SHORT = tslite.SHA_SHORT
SHA = '5b7a1c2bf2808d7380bc20596d10f4fa710c3da1'

FENCE = re.compile(r'^\s*(```|~~~)')
CODE = re.compile(r'`([^`\n]+)`')
# stesso criterio di tools/check-refs.py (SYM)
SYM = re.compile(r'^(?:[A-Z][A-Za-z0-9]+|[A-Z][A-Z0-9_]{3,}|[a-z][A-Za-z0-9]+\(\))$')


def chapters():
    """Lista di dict {id, part, slug, title, path(rel a BOOK), link(rel a appendici/)} per i capitoli esistenti."""
    res = []
    with open(os.path.join(BOOK, 'tools', 'chapters.tsv'), encoding='utf-8') as fh:
        for line in fh:
            if line.startswith('#') or not line.strip():
                continue
            cid, part, slug, title = line.rstrip('\n').split('\t')
            rel = f'parte-{part}/{slug}.md'
            if os.path.isfile(os.path.join(BOOK, rel)):
                res.append(dict(id=cid, part=part, slug=slug, title=title, path=rel, link='../' + rel))
    return res


@lru_cache(maxsize=None)
def chapter_text(rel):
    with open(os.path.join(BOOK, rel), encoding='utf-8') as fh:
        return fh.read()


def prose_lines(rel):
    """(numero_riga, testo) delle righe fuori dai blocchi di codice recintati."""
    infence = False
    for i, line in enumerate(chapter_text(rel).split('\n'), 1):
        if FENCE.match(line):
            infence = not infence
            continue
        if not infence:
            yield i, line


def inline_codes(rel):
    for i, line in prose_lines(rel):
        for m in CODE.finditer(line):
            yield i, m.group(1).strip()


def git_ts_files():
    out = subprocess.check_output(
        ['git', '-C', REPO, 'ls-files', 'core-libs', 'feature-libs', 'integration-libs'], text=True)
    return sorted(f for f in out.splitlines() if f.endswith('.ts') and not f.endswith('.spec.ts'))


DECL = re.compile(r'^[ \t]*export[ \t]+(?:declare[ \t]+)?(abstract[ \t]+)?(class|interface|const|function|enum|type)[ \t]+([A-Za-z_$][\w$]*)', re.M)


def _decl_end(nostr, start, kind):
    """Offset di fine della dichiarazione che inizia in start (testo mascherato)."""
    n = len(nostr)
    depth = 0
    j = start
    if kind in ('class', 'interface', 'enum', 'function'):
        while j < n:
            ch = nostr[j]
            if ch in '([':
                depth += 1
            elif ch in ')]':
                depth -= 1
            elif ch == ';' and depth == 0:
                return j
            elif ch == '{' and depth == 0:
                k = tslite.match(nostr, j)
                return k if k > 0 else j
            j += 1
        return start
    # const / type: fino a ';' di primo livello oppure a una riga vuota / nuova dichiarazione
    while j < n:
        ch = nostr[j]
        if ch in '([{':
            depth += 1
        elif ch in ')]}':
            depth -= 1
        elif ch == ';' and depth == 0:
            return j
        elif ch == '\n' and depth == 0:
            rest = nostr[j + 1:j + 200]
            if re.match(r'\s*(?:$|export\b|import\b|const\b|let\b|function\b|class\b|interface\b|type\b|@|declare\b)', rest) \
                    and not re.search(r'[=|&,:(<]\s*$', nostr[start:j]):
                return j - 1 if j > start else j
        j += 1
    return n - 1


@lru_cache(maxsize=None)
def exported_declarations():
    """name -> lista di (path, kind, Lstart, Lend)."""
    res = {}
    for f in git_ts_files():
        try:
            code, nostr = tslite.masks(f)
        except (UnicodeDecodeError, FileNotFoundError):
            continue
        if 'export' not in code:
            continue
        for m in DECL.finditer(code):
            kind, name = m.group(2), m.group(3)
            a = m.start(2) - (len(m.group(1)) if m.group(1) else 0)
            # inizio riga della keyword export
            a = code.rfind('\n', 0, m.start()) + 1
            while a < len(code) and code[a] in ' \t':
                a += 1
            e = _decl_end(nostr, m.end(), kind)
            la = tslite.line_of(f, a)
            lb = max(la, tslite.line_of(f, e))
            res.setdefault(name, []).append((f, kind, la, lb))
    return res


def decl_rank(d):
    """Ordine di preferenza: codice di produzione prima di testing/mock/schematics."""
    p = d[0]
    bad = 0
    if re.search(r'/testing/|\.mock\.ts$|mock', p):
        bad += 2
    if '/schematics/' in p:
        bad += 1
    return (bad, p.count('/'), p)


def md_header(title, script, counts, intro=''):
    lines = [f'# {title}', '',
             f'> Generata da `tools/extract3/{script}` allo SHA {SHA_SHORT} (`{SHA}`). Non modificare a mano: rigenerare.', '']
    if intro:
        lines += [intro, '']
    lines += ['## Conteggi', '']
    for k, v in counts:
        lines.append(f'- {k}: **{v}**')
    lines += ['', '## Come rigenerare', '', '```bash', 'cd docs/spartacus-book',
              f'python3 tools/extract3/{script}', '# oppure entrambe le appendici: bash tools/extract3/run_all.sh', '```', '']
    return lines


def write_out(name, lines):
    out = os.path.join(BOOK, 'appendici', name)
    with open(out, 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(lines).rstrip() + '\n')
    print('scritto', out)
