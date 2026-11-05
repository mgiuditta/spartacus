#!/usr/bin/env python3
"""Genera appendici/A12-indice-simboli.md: indice simbolo -> capitoli.

Criteri:
- token = contenuto di uno span inline in backtick (fuori dai blocchi ``` ) nei capitoli di tools/chapters.tsv;
- il token deve essere un identificatore TypeScript plausibile (stesso criterio SYM di tools/check-refs.py):
  PascalCase, CONSTANT_CASE >= 4 caratteri, oppure camelCase seguito da `()`;
- il nome (senza `()`) deve comparire come dichiarazione esportata
  `export (abstract )?(class|interface|const|function|enum|type) NOME` in un file .ts tracciato
  di core-libs/feature-libs/integration-libs, esclusi i *.spec.ts.
"""
import collections
import common3 as c

SCRIPT = 'a12_indice_simboli.py'


def main():
    decls = c.exported_declarations()
    chs = c.chapters()
    occ = collections.defaultdict(collections.Counter)  # name -> Counter(chapter id)
    shown = {}  # name -> forma del token (con o senza ())
    tokens_total = 0
    for ch in chs:
        for _, tok in c.inline_codes(ch['path']):
            if not c.SYM.match(tok):
                continue
            name = tok[:-2] if tok.endswith('()') else tok
            if name not in decls:
                continue
            tokens_total += 1
            occ[name][ch['id']] += 1
            shown.setdefault(name, tok)
    byid = {ch['id']: ch for ch in chs}
    names = sorted(occ, key=lambda s: (s.lower(), s))
    letters = collections.OrderedDict()
    for n in names:
        letters.setdefault(n[0].upper(), []).append(n)
    kinds = collections.Counter()
    for n in names:
        kinds[sorted(decls[n], key=c.decl_rank)[0][1]] += 1
    counts = [('Simboli indicizzati', len(names)),
              ('Occorrenze in backtick conteggiate', tokens_total),
              ('Capitoli scansionati', len(chs)),
              ('Simboli per tipo di dichiarazione (prima dichiarazione)',
               ', '.join(f'{k} {v}' for k, v in sorted(kinds.items())))]
    intro = ('Indice dei simboli TypeScript citati in backtick nei capitoli e dichiarati come `export` nel codice. '
             'Per ogni simbolo: tipo e posizione della dichiarazione (`path:Lx-Ly`; se il nome è dichiarato in più file '
             'si mostra la dichiarazione di produzione più vicina alla radice e il numero di dichiarazioni ulteriori) e i capitoli '
             'che lo citano, con il numero di occorrenze tra parentesi.\n\n'
             'Criteri: token = span inline in backtick fuori dai blocchi di codice; identificatore plausibile = PascalCase, '
             'CONSTANT_CASE di almeno 4 caratteri, o camelCase seguito da `()` (stesso criterio di `tools/check-refs.py`); '
             'dichiarazione = `export (abstract )?(class|interface|const|function|enum|type) NOME` in file `.ts` tracciati di '
             '`core-libs/`, `feature-libs/`, `integration-libs/`, esclusi `*.spec.ts`. I simboli citati solo dentro blocchi di '
             'codice, o dichiarati solo in Angular/dipendenze, non compaiono.')
    lines = c.md_header('Appendice A12 - Indice dei simboli', SCRIPT, counts, intro)
    lines += ['## Indice per lettera', '', ' · '.join(f'[{L}](#{L.lower()})' for L in letters), '']
    for L, ns in letters.items():
        lines += [f'## {L}', '', '| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |', '|---|---|---|---|']
        for n in ns:
            ds = sorted(decls[n], key=c.decl_rank)
            f, kind, la, lb = ds[0]
            extra = f' (+{len(ds) - 1})' if len(ds) > 1 else ''
            chcell = ', '.join(f'[{cid}]({byid[cid]["link"]}) ({k})'
                               for cid, k in sorted(occ[n].items()))
            lines.append(f'| `{shown[n]}` | {kind} | `{f}:L{la}-L{lb}`{extra} | {chcell} |')
        lines.append('')
    lines += ['---', '', 'Legenda capitoli:', '']
    for ch in chs:
        lines.append(f'- [{ch["id"]}]({ch["link"]}) {ch["title"]}')
    c.write_out('A12-indice-simboli.md', lines)


if __name__ == '__main__':
    main()
