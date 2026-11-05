#!/usr/bin/env python3
"""Genera appendici/A11-glossario.md: glossario dei termini chiave.

1. Estrae i candidati dai capitoli (tools/chapters.tsv):
   - termini in grassetto (**...**) e span inline in backtick, fuori dai blocchi di codice;
   - tenuti se compaiono in >= MIN_CH capitoli e sembrano termini tecnici
     (backtick: identificatore secondo il criterio SYM di tools/check-refs.py; grassetto: non stop-word italiana).
2. Unisce i candidati con le definizioni curate di a11_termini.py (che includono l'elenco base).
3. Per ogni termine definito conta i capitoli in cui compare (regex `match`), verifica che il
   capitolo principale lo citi e che ogni riferimento `refs` compaia letteralmente nel capitolo principale.
4. Scrive il glossario e l'elenco dei candidati ricorrenti non definiti.
"""
import collections
import re
import sys

import common3 as c
from a11_termini import TERMS

SCRIPT = 'a11_glossario.py'
MIN_CH = 3
LIST_MIN_CH = 6  # soglia per elencare i candidati non definiti
BOLD = re.compile(r'\*\*([^*\n]{2,60})\*\*')
STOP = set('''non prima solo senza dopo sempre tutte tutti ogni una sola volta un solo ultima subito primo due
stesso lo stesso sostituisce sincronamente dentro fuori in sequenza in place caution app alias ricerca stili errori
stato store modello registrazione test default core root una sola nota attenzione importante perché quando mai
note warning tip esempio sì no ancora anche già'''.split())


def norm_bold(t):
    t = t.strip().strip('`').strip().rstrip('.:,;').strip()
    return t


def candidates(chs):
    bold = collections.defaultdict(set)
    code = collections.defaultdict(set)
    for ch in chs:
        for _, line in c.prose_lines(ch['path']):
            for m in BOLD.finditer(line):
                t = norm_bold(m.group(1))
                if t and t.lower() not in STOP and not re.match(r'^[\d\W]', t):
                    bold[t.lower()].add(ch['id'])
            for m in c.CODE.finditer(line):
                t = m.group(1).strip()
                if c.SYM.match(t):
                    code[t].add(ch['id'])
    res = {}
    for t, s in bold.items():
        if len(s) >= MIN_CH:
            res[('grassetto', t)] = s
    for t, s in code.items():
        if len(s) >= MIN_CH:
            res[('backtick', t)] = s
    return res


def mentions(chs, term):
    rx = re.compile(term['match'], 0 if term.get('cs') else re.I)
    cnt = collections.Counter()
    for ch in chs:
        for _, line in c.prose_lines(ch['path']):
            n = len(rx.findall(line))
            if n:
                cnt[ch['id']] += n
    return cnt, rx


def anchor(t):
    a = re.sub(r'[^\w\- ]', '', t.lower(), flags=re.U).strip().replace(' ', '-')
    return a


def main():
    chs = c.chapters()
    byid = {ch['id']: ch for ch in chs}
    cands = candidates(chs)
    errors = []
    rows = []
    for t in TERMS:
        cnt, rx = mentions(chs, t)
        main_id = t['main']
        if main_id not in byid:
            errors.append(f"{t['term']}: capitolo principale {main_id} inesistente")
            continue
        if not cnt.get(main_id):
            errors.append(f"{t['term']}: il capitolo principale {main_id} non cita il termine")
        text = c.chapter_text(byid[main_id]['path'])
        for r in t['refs']:
            if r not in text:
                errors.append(f"{t['term']}: riferimento non presente nel capitolo {main_id}: {r}")
        rows.append((t, cnt, rx))
    if errors:
        for e in errors:
            print('ERRORE', e, file=sys.stderr)
        sys.exit(1)

    # candidati coperti da una voce definita
    covered = set()
    for key, s in cands.items():
        kind, tok = key
        for t, cnt, rx in rows:
            if rx.search(tok) or tok.lower() == t['term'].lower():
                covered.add(key)
                break
    undefined = sorted(((len(s), k) for k, s in cands.items() if k not in covered and len(s) >= LIST_MIN_CH),
                       key=lambda x: (-x[0], x[1][1].lower()))

    rows.sort(key=lambda r: r[0]['term'].lower())
    nbase = sum(1 for t, _, _ in rows if t.get('base'))
    counts = [('Voci definite', len(rows)),
              ('di cui dall\'elenco base', nbase),
              ('Candidati estratti (grassetto o backtick in almeno %d capitoli)' % MIN_CH, len(cands)),
              ('Candidati coperti da una voce definita', len(covered)),
              ('Candidati non definiti elencati in fondo (almeno %d capitoli)' % LIST_MIN_CH, len(undefined)),
              ('Capitoli scansionati', len(chs))]
    intro = ('Glossario dei termini chiave del libro. Ogni definizione riassume ciò che afferma il **capitolo '
             'principale** linkato (e, se presente, il capitolo linkato dentro il testo); i riferimenti `path:Lx-Ly` '
             'sono copiati da quel capitolo e lo script verifica che vi compaiano letteralmente. La riga *Citato in* '
             'riporta i capitoli in cui il termine compare (conteggio delle occorrenze nel testo fuori dai blocchi di '
             'codice, con la regex della voce in `tools/extract3/a11_termini.py`).\n\n'
             'Le definizioni sono curate a mano in `tools/extract3/a11_termini.py`; lo script estrae i candidati, '
             'conta le citazioni e verifica i riferimenti. Per i simboli TypeScript vedi anche '
             '[A12 — Indice dei simboli](A12-indice-simboli.md).')
    lines = c.md_header('Appendice A11 - Glossario', SCRIPT, counts, intro)
    letters = collections.OrderedDict()
    for r in rows:
        letters.setdefault(r[0]['term'][0].upper(), []).append(r)
    lines += ['## Indice', '']
    for L, rs in letters.items():
        lines.append(f'- **{L}**: ' + ' · '.join(f'[{r[0]["term"]}](#{anchor(r[0]["term"])})' for r in rs))
    lines.append('')
    for L, rs in letters.items():
        lines += [f'## {L}', '']
        for t, cnt, _ in rs:
            mch = byid[t['main']]
            lines += [f'### {t["term"]}', '']
            lines += [t['text'], '']
            lines.append(f'- Capitolo principale: [{mch["id"]} — {mch["title"]}]({mch["link"]})')
            lines.append('- Riferimenti: ' + ', '.join(f'`{r}`' for r in t['refs']))
            others = [(k, v) for k, v in cnt.most_common() if k != t['main']]
            others.sort(key=lambda kv: (-kv[1], kv[0]))
            cited = ', '.join(f'[{k}]({byid[k]["link"]}) ({v})' for k, v in others[:8])
            more = f' e altri {len(others) - 8}' if len(others) > 8 else ''
            lines.append(f'- Citato in {len(cnt)} capitoli' + (f'; i più frequenti oltre al principale: {cited}{more}' if cited else ''))
            lines.append('')
    lines += ['## Candidati ricorrenti non definiti', '',
              f'Termini in grassetto o in backtick che compaiono in almeno {LIST_MIN_CH} capitoli e non sono coperti '
              'da una voce del glossario (estrazione automatica, senza definizione). I simboli dichiarati nel codice '
              'sono descritti in [A12](A12-indice-simboli.md).', '',
              '| Termine | Fonte | Capitoli |', '|---|---|---:|']
    for n, (kind, tok) in undefined:
        cell = f'`{tok}`' if kind == 'backtick' else tok
        lines.append(f'| {cell} | {kind} | {n} |')
    lines += ['', '---', '', 'Legenda capitoli:', '']
    for ch in chs:
        lines.append(f'- [{ch["id"]}]({ch["link"]}) {ch["title"]}')
    c.write_out('A11-glossario.md', lines)


if __name__ == '__main__':
    main()
