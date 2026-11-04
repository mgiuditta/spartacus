#!/usr/bin/env python3
"""Appendice A06: HttpInterceptor (classi, registrazioni HTTP_INTERCEPTORS, interceptor funzionali)."""
import re
from collections import defaultdict
import tslite as T


def main():
    files = T.git_files()
    rows = {}
    for f in files:
        for c in T.classes(f):
            impl = 'HttpInterceptor' in c['implements']
            meth = T.class_members(f, c, {'intercept'})
            if impl or meth:
                rows[(f, c['name'])] = dict(name=c['name'], file=f, c=c, impl=impl, meth=bool(meth),
                                            parent=c['extends'], how='')
    changed = True
    while changed:
        changed = False
        names = {k[1] for k in rows}
        for f in files:
            for c in T.classes(f):
                if (f, c['name']) not in rows and c['extends'] in names:
                    rows[(f, c['name'])] = dict(name=c['name'], file=f, c=c, impl=False, meth=False,
                                                parent=c['extends'], how='eredita da ' + c['extends'])
                    changed = True
    # registrazioni
    regs = []
    rx = re.compile(r'\bprovide\s*:\s*HTTP_INTERCEPTORS\b')
    for f in files:
        code, nostr = T.masks(f)
        if 'HTTP_INTERCEPTORS' not in code:
            continue
        for m in rx.finditer(code):
            # oggetto provider che racchiude il match
            depth, i = 0, m.start()
            while i >= 0:
                ch = nostr[i]
                if ch in ')]}':
                    depth += 1
                elif ch in '([{':
                    if depth == 0 and ch == '{':
                        break
                    depth -= 1 if ch != '{' or depth else 0
                i -= 1
            ents, cb = T.object_entries(f, i)
            d = {e['key']: T.squash(code[e['vs']:e['ve']]) for e in ents}
            how = next((k for k in ('useExisting', 'useClass', 'useFactory', 'useValue') if k in d), '?')
            regs.append(dict(impl=d.get(how, '?'), how=how, multi=d.get('multi', ''), file=f,
                             cont=T.container(f, m.start()), ref=T.ref(f, i, cb)))
    reg_by = defaultdict(list)
    for r in regs:
        reg_by[r['impl']].append(r)
    # funzionali
    fn = []
    rx_fn = re.compile(r'\bHttpInterceptorFn\b|\bwithInterceptors\s*\(')
    for f in files:
        code, _ = T.masks(f)
        for m in rx_fn.finditer(code):
            fn.append(dict(file=f, what=m.group(0).rstrip('( '), ref=T.ref(f, m.start())))
    out = sorted(rows.values(), key=lambda r: (r['name'].lower(), r['file']))
    names = {r['name'] for r in out}
    counts = [
        ('Classi interceptor (righe tabella 1)', len(out)),
        ('di cui con `implements HttpInterceptor`', sum(1 for r in out if r['impl'])),
        ('di cui solo con metodo `intercept()` senza `implements`', sum(1 for r in out if not r['impl'] and r['meth'])),
        ('di cui solo per ereditarietà', sum(1 for r in out if r['how'])),
        ('Registrazioni `{ provide: HTTP_INTERCEPTORS, ... }` (righe tabella 2)', len(regs)),
        ('Classi interceptor senza registrazione `HTTP_INTERCEPTORS` in ambito', len(names - set(reg_by))),
        ('Interceptor funzionali (`HttpInterceptorFn` / `withInterceptors`)', len(fn)),
    ]
    intro = ('Tabella 1: classi che dichiarano `implements HttpInterceptor`, o che definiscono a primo livello un metodo '
             '`intercept()`, o che estendono (ricorsivamente) una di queste. La colonna "Registrazioni" rimanda alla '
             'tabella 2 (numero di provider `HTTP_INTERCEPTORS` con quella classe come `useExisting`/`useClass`).\n\n'
             'Tabella 2: ogni object literal provider con `provide: HTTP_INTERCEPTORS`. "Contenitore" è la dichiarazione '
             'top-level che lo contiene (es. `const interceptors: Provider[]` poi importata da un modulo, o la classe '
             '`@NgModule`). L\'ordine di registrazione determina l\'ordine della catena: vedi i capitoli sul modulo HTTP.')
    L = T.header('Appendice A06 — HTTP interceptor', 'a06_interceptors.py', counts, intro=intro)
    L += ['## Tabella 1 — Classi interceptor', '',
          '| # | Classe | `implements HttpInterceptor` | `intercept()` proprio | Classe padre | Registrazioni | Libreria | Riferimento |',
          '|---|---|---|---|---|---|---|---|']
    for i, r in enumerate(out, 1):
        rg = reg_by.get(r['name'], [])
        L.append('| {} | {} | {} | {} | {} | {} | {} | `{}` |'.format(
            i, T.code_cell(r['name']), 'sì' if r['impl'] else ('no' if not r['how'] else r['how']),
            'sì' if r['meth'] else 'no', T.code_cell(r['parent'] or ''), len(rg) if rg else '—',
            T.code_cell(T.library(r['file'])), T.ref(r['file'], r['c']['start'], r['c']['cb'])))
    L += ['', '## Tabella 2 — Registrazioni `HTTP_INTERCEPTORS`', '',
          '| # | Classe registrata | Importata da | Modalità | `multi` | Contenitore | Libreria | Riferimento |',
          '|---|---|---|---|---|---|---|---|']
    for i, r in enumerate(sorted(regs, key=lambda r: (r['file'], r['ref'])), 1):
        L.append('| {} | {} | {} | `{}` | {} | {} | {} | `{}` |'.format(
            i, T.code_cell(r['impl']), T.code_cell(T.import_source(r['file'], r['impl'])), r['how'], T.code_cell(r['multi']), T.code_cell(r['cont']),
            T.code_cell(T.library(r['file'])), r['ref']))
    unreg = sorted(names - set(reg_by))
    L += ['', '### Classi senza registrazione diretta in ambito', '',
          'Classi base astratte/estese, interceptor registrati altrove (es. app) o non registrati: '
          + (', '.join(f'`{n}`' for n in unreg) or '—')]
    L += ['', '## Tabella 3 — Interceptor funzionali', '']
    if fn:
        L += ['| # | Simbolo | Riferimento |', '|---|---|---|']
        for i, r in enumerate(fn, 1):
            L.append(f"| {i} | `{r['what']}` | `{r['ref']}` |")
    else:
        L += ['Nessuna occorrenza di `HttpInterceptorFn` o `withInterceptors(` (esclusi commenti) in ambito: '
              'tutti gli interceptor Spartacus sono class-based e registrati via `HTTP_INTERCEPTORS`.']
    T.write_out('A06-interceptor.md', L)


if __name__ == '__main__':
    main()
