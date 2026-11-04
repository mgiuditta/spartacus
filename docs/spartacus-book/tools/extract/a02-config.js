/*
 * A02 - Classi/interfacce di config (*Config) e costanti default*Config.
 * Uso: node a02-config.js
 */
'use strict';
const { SyntaxKind, Node } = require('ts-morph');
const c = require('./common');

const files = c.scopeFiles();
const fileSet = new Set(files);
const project = c.createProject(files);
const pub = c.publicDeclarations(project);

const configs = []; // {lib, kind, name, ctx, decorators, heritage, members[], ref, public}
const defaults = []; // {lib, name, type, value, ref, public, root}

function rootOfConfig(name) {
  return name.replace(/Config$/, '').toLowerCase();
}
function rootOfDefault(name) {
  return name.replace(/^default/i, '').replace(/Config$/i, '').toLowerCase();
}

function moduleContext(node) {
  const md = node.getFirstAncestorByKind(SyntaxKind.ModuleDeclaration);
  return md ? `declare module ${md.getName()}` : '';
}

function memberRows(members) {
  const out = [];
  for (const m of members) {
    if (Node.isPropertySignature(m) || Node.isPropertyDeclaration(m)) {
      if (Node.isPropertyDeclaration(m) && m.isStatic()) continue;
      const tn = m.getTypeNode();
      out.push({
        key: m.getName(),
        type: tn ? c.oneLine(tn.getText(), 160) : '(implicito)',
        optional: m.hasQuestionToken() ? 'sì' : 'no',
      });
    } else if (Node.isIndexSignatureDeclaration(m)) {
      out.push({
        key: `[${m.getKeyName()}: ${m.getKeyType().getText()}]`,
        type: c.oneLine(m.getReturnTypeNode() ? m.getReturnTypeNode().getText() : '', 160),
        optional: '-',
      });
    } else if (Node.isMethodSignature(m) || Node.isMethodDeclaration(m)) {
      out.push({ key: m.getName() + '()', type: '(metodo)', optional: m.hasQuestionToken && m.hasQuestionToken() ? 'sì' : 'no' });
    }
  }
  return out;
}

for (const sf of project.getSourceFiles()) {
  const relPath = c.rel(sf);
  if (!fileSet.has(relPath)) continue;
  const lib = c.libraryOf(relPath);

  for (const cls of sf.getDescendantsOfKind(SyntaxKind.ClassDeclaration)) {
    const name = cls.getName();
    if (!name || !/Config$/.test(name)) continue;
    const heritage = [];
    if (cls.getExtends()) heritage.push('extends ' + cls.getExtends().getText());
    if (cls.getImplements().length) heritage.push('implements ' + cls.getImplements().map((i) => i.getText()).join(', '));
    configs.push({
      lib,
      kind: (cls.isAbstract() ? 'abstract class' : 'class'),
      name,
      ctx: moduleContext(cls),
      decorators: cls.getDecorators().map((d) => '@' + d.getName()).join(' '),
      heritage: c.oneLine(heritage.join(' '), 200),
      members: memberRows(cls.getMembers()),
      ref: c.ref(relPath, cls.getStartLineNumber(), cls.getEndLineNumber()),
      public: pub.has(cls) ? 'sì' : 'no',
    });
  }
  for (const itf of sf.getDescendantsOfKind(SyntaxKind.InterfaceDeclaration)) {
    const name = itf.getName();
    if (!/Config$/.test(name)) continue;
    const ext = itf.getExtends().map((e) => e.getText());
    configs.push({
      lib,
      kind: 'interface',
      name,
      ctx: moduleContext(itf),
      decorators: '',
      heritage: ext.length ? c.oneLine('extends ' + ext.join(', '), 200) : '',
      members: memberRows(itf.getMembers()),
      ref: c.ref(relPath, itf.getStartLineNumber(), itf.getEndLineNumber()),
      public: pub.has(itf) ? 'sì' : 'no',
    });
  }
  for (const vd of sf.getDescendantsOfKind(SyntaxKind.VariableDeclaration)) {
    const name = vd.getName();
    if (!/^default[A-Z0-9_]\w*Config$/.test(name)) continue;
    const vs = vd.getVariableStatement();
    const anchor = vs || vd;
    const init = vd.getInitializer();
    defaults.push({
      lib,
      name,
      type: vd.getTypeNode() ? c.oneLine(vd.getTypeNode().getText(), 120) : '',
      value: init ? c.oneLine(init.getText(), 120) : '',
      ref: c.ref(relPath, anchor.getStartLineNumber(), anchor.getEndLineNumber()),
      public: pub.has(vd) ? 'sì' : 'no',
      root: rootOfDefault(name),
    });
  }
}

const defaultsByRoot = new Map();
for (const d of defaults) {
  if (!defaultsByRoot.has(d.root)) defaultsByRoot.set(d.root, []);
  defaultsByRoot.get(d.root).push(d);
}

const libs = [...new Set([...configs.map((x) => x.lib), ...defaults.map((x) => x.lib)])].sort();
configs.sort((a, b) => a.name.localeCompare(b.name) || a.ref.localeCompare(b.ref));
defaults.sort((a, b) => a.name.localeCompare(b.name) || a.ref.localeCompare(b.ref));

let keyRows = 0;
for (const cf of configs) keyRows += Math.max(cf.members.length, 1);
const totalRows = keyRows + defaults.length;

let md = c.header(
  'Appendice A02 - Configurazione (`*Config`)',
  'a02-config.js',
  totalRows,
  "Per ogni libreria: (1) tabella chiavi di ogni classe/interfaccia il cui nome termina in `Config` (proprietà dichiarate direttamente, non ereditate; tipo dal codice; opzionalità = `?`); (2) tabella delle `const default*Config` con valore letterale troncato a 120 caratteri. Il default è associato a una config quando la radice coincide (es. `CartConfig` ↔ `defaultCartConfig`, confronto case-insensitive su nome senza `default`/`Config`). *public API*: dichiarazione raggiungibile dall'`entryFile` di un `ng-package.json`. Le interfacce `Config` dentro `declare module` sono module augmentation."
);

md += '\n## Riepilogo per libreria\n\n| Libreria | Classi/interfacce `*Config` | Chiavi (righe) | `default*Config` |\n|---|---:|---:|---:|\n';
for (const l of libs) {
  const cs = configs.filter((x) => x.lib === l);
  const k = cs.reduce((s, x) => s + Math.max(x.members.length, 1), 0);
  md += `| ${l} | ${cs.length} | ${k} | ${defaults.filter((x) => x.lib === l).length} |\n`;
}
md += `| **Totale** | **${configs.length}** | **${keyRows}** | **${defaults.length}** |\n`;

for (const l of libs) {
  md += `\n## ${l}\n`;
  const cs = configs.filter((x) => x.lib === l);
  if (cs.length) {
    md += '\n### Classi e interfacce `*Config`\n\n| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |\n|---|---|---|---|---|---|---|\n';
    for (const cf of cs) {
      const meta = [cf.kind, cf.decorators, cf.heritage, cf.ctx, cf.public === 'sì' ? 'public API' : ''].filter(Boolean).join('; ');
      const root = rootOfConfig(cf.name);
      const all = root ? defaultsByRoot.get(root) || [] : [];
      const same = all.filter((d) => d.lib === cf.lib);
      const ds = same.length ? same : all;
      const dcell = ds.map((d) => `${c.code(d.name)} = ${c.code(d.value)} (${c.code(d.ref)})`).join('<br>');
      const rowsM = cf.members.length ? cf.members : [{ key: '(nessuna chiave propria)', type: '', optional: '' }];
      rowsM.forEach((m, i) => {
        md += `| ${i === 0 ? c.code(cf.name) : '〃'} | ${i === 0 ? c.cell(meta) : ''} | ${c.code(m.key)} | ${c.code(m.type)} | ${m.optional} | ${i === 0 ? dcell : ''} | ${i === 0 ? c.code(cf.ref) : ''} |\n`;
      });
    }
  }
  const ds = defaults.filter((x) => x.lib === l);
  if (ds.length) {
    md += '\n### Costanti `default*Config`\n\n| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |\n|---|---|---|---|---|\n';
    for (const d of ds) {
      md += `| ${c.code(d.name)} | ${c.code(d.type)} | ${c.code(d.value)} | ${d.public} | ${c.code(d.ref)} |\n`;
    }
  }
}

c.writeOut('A02-config.md', md);
console.log('config:', configs.length, 'chiavi:', keyRows, 'default:', defaults.length, 'righe:', totalRows);
