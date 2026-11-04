/*
 * A10 - Tutte le occorrenze di `@deprecated` nei commenti dell'ambito file,
 * con simbolo a cui il commento è agganciato (risolto con ts-morph).
 * Uso: node a10-deprecated.js
 */
'use strict';
const { Node, SyntaxKind } = require('ts-morph');
const c = require('./common');

const files = c.scopeFiles();
const fileSet = new Set(files);
const project = c.createProject(files);

/** Nodo al cui leading trivia appartiene la posizione `pos` (o null se dentro un token). */
function ownerAt(sf, pos) {
  let cur = sf;
  for (;;) {
    const kids = cur.getChildren();
    const child = kids.find((k) => k.getPos() <= pos && pos < k.getEnd());
    if (!child) return { node: cur, inToken: false, trailing: true };
    if (pos < child.getStart()) {
      if (child.getKind() === SyntaxKind.SyntaxList) {
        cur = child;
        continue;
      }
      return { node: child, inToken: false };
    }
    if (Node.isJSDoc(child)) {
      // JSDoc figlio di una dichiarazione: il proprietario è `cur`
      return { node: cur, inToken: false };
    }
    if (child.getChildCount() === 0) return { node: child, inToken: true };
    cur = child;
  }
}

function containerName(n) {
  const p = n.getFirstAncestor(
    (a) =>
      Node.isClassDeclaration(a) ||
      Node.isClassExpression(a) ||
      Node.isInterfaceDeclaration(a) ||
      Node.isEnumDeclaration(a) ||
      Node.isModuleDeclaration(a) ||
      Node.isVariableDeclaration(a) ||
      Node.isTypeAliasDeclaration(a)
  );
  if (!p) return '';
  const nm = p.getName ? p.getName() : '';
  return nm ? nm + '.' : '';
}

function describe(n) {
  const kind = n.getKindName();
  if (Node.isVariableStatement(n)) {
    return { sym: n.getDeclarations().map((d) => d.getName()).join(', '), kind: 'variable' };
  }
  if (Node.isConstructorDeclaration(n)) return { sym: containerName(n) + 'constructor', kind: 'constructor' };
  if (Node.isParameterDeclaration(n)) {
    const fn = n.getParent();
    const fnName = Node.isConstructorDeclaration(fn) ? 'constructor' : fn.getName ? fn.getName() || '' : '';
    return { sym: `${containerName(n)}${fnName}(${n.getName()})`, kind: 'parameter' };
  }
  if (Node.isIndexSignatureDeclaration(n)) {
    return { sym: `${containerName(n)}[${n.getKeyName()}: ${n.getKeyType().getText()}]`, kind };
  }
  if (Node.isExportDeclaration(n) || Node.isExportAssignment(n) || Node.isExpressionStatement(n)) {
    return { sym: c.oneLine(n.getText(), 70), kind };
  }
  if (typeof n.getName === 'function') {
    let nm;
    try {
      nm = n.getName();
    } catch (e) {
      nm = undefined;
    }
    if (nm) {
      const top =
        Node.isClassDeclaration(n) ||
        Node.isInterfaceDeclaration(n) ||
        Node.isFunctionDeclaration(n) ||
        Node.isEnumDeclaration(n) ||
        Node.isTypeAliasDeclaration(n) ||
        Node.isModuleDeclaration(n);
      return { sym: (top ? '' : containerName(n)) + nm, kind };
    }
  }
  if (n.getChildCount() === 0) {
    return { sym: `(nessun simbolo: prima di \`${c.oneLine(n.getText(), 20) || 'EOF'}\`)`, kind };
  }
  return { sym: c.oneLine(n.getText(), 70), kind };
}

function tagText(lines, idx, col) {
  const clean = (s) =>
    s
      .replace(/\*\/.*$/, '')
      .replace(/^\s*(\/\/+|\/\*+|\*+)\s?/, '')
      .trim();
  let t = lines[idx].slice(col + '@deprecated'.length).replace(/\*\/.*$/, '').trim();
  if (!t && idx + 1 < lines.length) {
    const nx = clean(lines[idx + 1]);
    if (nx && !nx.startsWith('@') && /^\s*(\*|\/\/)/.test(lines[idx + 1])) t = nx;
  }
  return t;
}

const rows = [];
let skippedInToken = 0;
for (const sf of project.getSourceFiles()) {
  const relPath = c.rel(sf);
  if (!fileSet.has(relPath)) continue;
  const text = sf.getFullText();
  if (!text.includes('@deprecated')) continue;
  const lines = text.split('\n');
  const lineStarts = [];
  let acc = 0;
  for (const l of lines) {
    lineStarts.push(acc);
    acc += l.length + 1;
  }
  const re = /@deprecated\b/g;
  let m;
  while ((m = re.exec(text))) {
    const pos = m.index;
    let li = lineStarts.length - 1;
    while (lineStarts[li] > pos) li--;
    const own = ownerAt(sf, pos);
    if (own.inToken) {
      skippedInToken++;
      continue;
    }
    const d = describe(own.node);
    const startLine = own.node.getChildCount() === 0 && own.node.getKind() === SyntaxKind.EndOfFileToken
      ? li + 1
      : own.node.getStartLineNumber();
    rows.push({
      lib: c.libraryOf(relPath),
      sym: d.sym,
      kind: d.kind,
      text: c.oneLine(tagText(lines, li, pos - lineStarts[li]), 200),
      ref: c.ref(relPath, li + 1, Math.max(li + 1, startLine)),
    });
  }
}

rows.sort((a, b) => a.lib.localeCompare(b.lib) || a.ref.localeCompare(b.ref, 'en', { numeric: true }));
const byLib = {};
for (const r of rows) byLib[r.lib] = (byLib[r.lib] || 0) + 1;
const byKind = {};
for (const r of rows) byKind[r.kind] = (byKind[r.kind] || 0) + 1;
const emptyText = rows.filter((r) => !r.text).length;

let md = c.header(
  'Appendice A10 - API deprecate (`@deprecated`)',
  'a10-deprecated.js',
  rows.length,
  "Ogni riga è un'occorrenza di `@deprecated` in un commento (JSDoc o `//`) dei file dell'ambito (esclusi spec, testing, mock, schematics). *Simbolo*: dichiarazione a cui il commento è agganciato (leading trivia, risolto con ts-morph), qualificata con il contenitore. *Testo*: resto della riga del tag; se vuoto, riga di commento successiva. *Riferimento*: dalla riga del tag alla riga d'inizio del simbolo."
);
md += `\n## Conteggi per libreria\n\n| Libreria | Occorrenze |\n|---|---:|\n`;
for (const [l, n] of Object.entries(byLib).sort()) md += `| ${l} | ${n} |\n`;
md += `| **Totale** | **${rows.length}** |\n`;
md += `\n## Conteggi per tipo di simbolo\n\n| Kind (ts) | Occorrenze |\n|---|---:|\n`;
for (const [k, n] of Object.entries(byKind).sort((a, b) => b[1] - a[1])) md += `| ${k} | ${n} |\n`;
md += `\nOccorrenze senza testo dopo il tag: ${emptyText}. Occorrenze di \`@deprecated\` dentro stringhe/template (escluse): ${skippedInToken}.\n`;
md += '\n## Elenco\n\n| # | Simbolo | Kind | Testo del tag (prima riga) | Libreria | Riferimento |\n|---:|---|---|---|---|---|\n';
rows.forEach((r, i) => {
  md += `| ${i + 1} | ${c.code(r.sym)} | ${r.kind} | ${c.cell(r.text)} | ${r.lib} | ${c.code(r.ref)} |\n`;
});
c.writeOut('A10-deprecated.md', md);
console.log('deprecated:', rows.length, 'in stringhe escluse:', skippedInToken, byLib);
