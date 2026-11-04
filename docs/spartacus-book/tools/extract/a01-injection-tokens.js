/*
 * A01 - Elenco di tutti i `new InjectionToken` nell'ambito file.
 * Uso: node a01-injection-tokens.js
 */
'use strict';
const { SyntaxKind, Node } = require('ts-morph');
const c = require('./common');

const files = c.scopeFiles();
const project = c.createProject(files);
const pub = c.publicDeclarations(project);

const rows = [];
for (const sf of project.getSourceFiles()) {
  const relPath = c.rel(sf);
  if (!files.includes(relPath)) continue;
  for (const ne of sf.getDescendantsOfKind(SyntaxKind.NewExpression)) {
    if (ne.getExpression().getText() !== 'InjectionToken') continue;
    const args = ne.getArguments();
    let desc = '';
    if (args[0]) {
      desc = Node.isStringLiteral(args[0]) || Node.isNoSubstitutionTemplateLiteral(args[0])
        ? args[0].getLiteralText()
        : '(espr.) ' + c.oneLine(args[0].getText(), 80);
    }
    let generic = ne.getTypeArguments().map((t) => t.getText()).join(', ');
    let name = '(inline)';
    let exportedKw = false;
    let isPublic = 'no';
    let anchor = ne;
    const vd = ne.getFirstAncestorByKind(SyntaxKind.VariableDeclaration);
    if (vd && vd.getInitializer() === ne) {
      name = vd.getName();
      if (!generic && vd.getTypeNode()) generic = '(annot.) ' + vd.getTypeNode().getText();
      const vs = vd.getVariableStatement();
      exportedKw = !!(vs && vs.isExported());
      isPublic = pub.has(vd) ? 'sì' : 'no';
      anchor = vs || vd;
    } else {
      const pd = ne.getFirstAncestor(
        (a) => Node.isPropertyDeclaration(a) || Node.isPropertyAssignment(a)
      );
      if (pd) {
        const cls = pd.getFirstAncestorByKind(SyntaxKind.ClassDeclaration);
        name = `(inline) ${cls && cls.getName() ? cls.getName() + '.' : ''}${pd.getName()}`;
        anchor = pd;
      }
      isPublic = 'n/d';
    }
    rows.push({
      lib: c.libraryOf(relPath),
      name,
      desc,
      generic: c.oneLine(generic, 140),
      exportedKw: exportedKw ? 'sì' : 'no',
      isPublic,
      ref: c.ref(relPath, anchor.getStartLineNumber(), anchor.getEndLineNumber()),
    });
  }
}

rows.sort((a, b) => a.lib.localeCompare(b.lib) || a.name.localeCompare(b.name) || a.ref.localeCompare(b.ref));

const byLib = {};
for (const r of rows) byLib[r.lib] = (byLib[r.lib] || 0) + 1;
const pubCount = rows.filter((r) => r.isPublic === 'sì').length;

let md = c.header(
  'Appendice A01 - InjectionToken',
  'a01-injection-tokens.js',
  rows.length,
  "Colonna *public API*: `sì` se la `const` è raggiungibile (anche via `export *`) dall'`entryFile` di almeno un `ng-package.json` (risoluzione ts-morph `getExportedDeclarations`). *export*: la `const` ha la keyword `export` nel file. Ambito: file `.ts` tracciati in core-libs, feature-libs, integration-libs esclusi spec, testing, mock e schematics."
);
md += '\n## Conteggi per libreria\n\n| Libreria | Token |\n|---|---:|\n';
for (const [l, n] of Object.entries(byLib)) md += `| ${l} | ${n} |\n`;
md += `| **Totale** | **${rows.length}** (public API: ${pubCount}) |\n`;
md += '\n## Elenco\n\n| # | Nome const | Descrizione (stringa) | Tipo generico | Libreria | export | public API | Riferimento |\n|---:|---|---|---|---|---|---|---|\n';
rows.forEach((r, i) => {
  md += `| ${i + 1} | ${c.code(r.name)} | ${c.code(r.desc)} | ${c.code(r.generic)} | ${r.lib} | ${r.exportedKw} | ${r.isPublic} | ${c.code(r.ref)} |\n`;
});
c.writeOut('A01-injection-token.md', md);
console.log('token:', rows.length, 'public:', pubCount);
