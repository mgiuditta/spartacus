#!/usr/bin/env python3
"""Verifica riferimenti file:riga e simboli citati nei capitoli.
Uso: check-refs.py [file.md ...]  (default: parte-*/ *.md, appendici/*.md)
Controlli:
 1. ogni `path:Lx-Ly` -> file esistente (repo o angular:) e range valido (1<=x<=y<=n righe)
 2. ogni path citato senza riga -> esistente
 3. ogni simbolo in backtick in stile identificatore (PascalCase / CONSTANT_CASE / camelCase con parentesi) -> trovato con grep nel repo o in angular
Exit code 1 se errori."""
import os, re, sys, glob, subprocess, json, functools
REPO='/home/user/spartacus'; NG='/tmp/angular'
here=os.path.dirname(os.path.abspath(__file__)); book=os.path.dirname(here)
REF=re.compile(r'(angular:|deps:)?((?:[\w@.-]+/)+[\w@.-]+\.(?:ts|scss|html|json|js|mjs|cjs|md|sh|yml|yaml|bazel|d\.ts))(?::L?(\d+)(?:\s*[-–]\s*L?(\d+))?)?')
CODE=re.compile(r'`([^`\n]+)`')
SYM=re.compile(r'^(?:[A-Z][A-Za-z0-9]+|[A-Z][A-Z0-9_]{3,}|[a-z][A-Za-z0-9]+\(\))$')
@functools.lru_cache(None)
def nlines(p):
    try:
        with open(p,'rb') as f: return f.read().count(b'\n')+1
    except Exception: return None
@functools.lru_cache(None)
def resolve(path, ng):
    if ng=='deps:':
        p=os.path.join('/tmp/deps',path); return p if os.path.isfile(p) else None
    roots=[NG] if ng else [REPO, book, NG]
    for r in roots:
        p=os.path.join(r,path)
        if os.path.isfile(p): return p
    if not ng and path.startswith('packages/') and os.path.isfile(os.path.join(NG,path)): return os.path.join(NG,path)
    return None
_symcache={}
def sym_exists(s):
    if s in _symcache: return _symcache[s]
    name=s[:-2] if s.endswith('()') else s
    ok=False
    for root,args in ((REPO,['core-libs','feature-libs','integration-libs','projects','tools','scripts','ci-scripts','package.json','nx.json','.env-cmdrc','tsconfig.json']),(NG,['packages'])):
        try:
            r=subprocess.run(['grep','-rqw','--include=*.ts','--include=*.html','--include=*.scss','--include=*.json','--include=*.js','--include=*.mjs','--include=*.sh','--include=*.yml','--include=*.cjs',name]+args,cwd=root,capture_output=True)
            if r.returncode==0: ok=True; break
        except Exception: pass
    _symcache[s]=ok; return ok
SKIP_SYM=set('TODO FIXME OK Map Set Promise Observable Array Object String Number Boolean JSON Date Error RegExp HTML CSS URL HTTP SSR CSR OCC CMS API NgRx RxJS DI PDP PLP ASM B2B B2C SEO PWA CDN ID UID DOM YES NO True False None Mermaid README'.split())
def check(md):
    errs=[]; text=open(md,encoding='utf-8').read()
    infence=False
    for i,line in enumerate(text.split('\n'),1):
        if line.strip().startswith('```'): infence=not infence; continue
        segs = [line] if infence else CODE.findall(line) + [line]
        seen=set()
        for seg in segs:
            for m in REF.finditer(seg):
                ng,path,a,b=m.group(1),m.group(2),m.group(3),m.group(4)
                if path.startswith(('http','www.')) or '://' in seg[max(0,m.start()-10):m.start()]: continue
                if path.startswith(('../','./')) or path.endswith('.md') and not ng: continue  # link interni: controllati altrove
                key=(path,a,b)
                if key in seen: continue
                seen.add(key)
                ROOTS=('tools/extract','core-libs/','feature-libs/','integration-libs/','projects/','packages/','tools/','scripts/','ci-scripts/','docs/','.github/')
                if not ng and not path.startswith(ROOTS) and '/' in path and not a:
                    continue  # path non di repo senza riga (es. asset runtime, import npm): non verificabile
                p=resolve(path, ng or '')
                if not p:
                    if '*' in path or '<' in path: continue
                    errs.append(f'{md}:{i}: file inesistente: {ng or ""}{path}'); continue
                if a:
                    n=nlines(p); x=int(a); y=int(b) if b else x
                    if not (1<=x<=y<=n): errs.append(f'{md}:{i}: range non valido {path}:L{x}-L{y} (file ha {n} righe)')
        if not infence:
            for c in CODE.findall(line):
                c=c.strip()
                if SYM.match(c) and c not in SKIP_SYM and not sym_exists(c):
                    errs.append(f'{md}:{i}: simbolo non trovato: {c}')
    return errs
def links(md):
    errs=[]; d=os.path.dirname(md)
    for i,line in enumerate(open(md,encoding='utf-8'),1):
        for m in re.finditer(r'\]\(([^)#\s]+\.md)(#[^)]*)?\)', line):
            t=m.group(1)
            if t.startswith('http'): continue
            if not os.path.exists(os.path.normpath(os.path.join(d,t))): errs.append(f'{md}:{i}: link interno rotto: {t}')
    return errs
if __name__=='__main__':
    files=sys.argv[1:] or sorted(glob.glob(f'{book}/parte-*/*.md')+glob.glob(f'{book}/appendici/*.md')+glob.glob(f'{book}/README.md'))
    allerr=[]
    for f in files: allerr+=check(f)+links(f)
    for e in allerr: print(e.replace(book+'/',''))
    print(f'# {len(files)} file, {len(allerr)} errori', file=sys.stderr)
    sys.exit(1 if allerr else 0)
