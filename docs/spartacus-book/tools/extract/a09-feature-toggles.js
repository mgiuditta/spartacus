/*
 * A09 - Feature toggle: chiavi di FeatureTogglesInterface (alla base di FeatureToggles),
 * JSDoc (prima frase), default in defaultFeatureToggles, conteggio usi nel codice.
 * Uso: node a09-feature-toggles.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { SyntaxKind, Node } = require('ts-morph');
const c = require('./common');

// Nota: il prompt indica core-libs/core/src/features-config/feature-toggles.ts; allo SHA il file reale è:
const FT = 'core-libs/core/src/features-config/feature-toggles/config/feature-toggles.ts';
const TOKENS = 'core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts';

const project = c.createProject([FT]);
const sf = project.getSourceFileOrThrow(path.join(c.REPO, FT));
const itf = sf.getInterfaceOrThrow('FeatureTogglesInterface');
const defVar = sf.getVariableDeclarationOrThrow('defaultFeatureToggles');
const obj = defVar.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);

const defaults = new Map();
for (const p of obj.getProperties()) {
  if (Node.isPropertyAssignment(p)) {
    defaults.set(p.getName(), { value: p.getInitializer().getText(), line: p.getStartLineNumber() });
  } else if (Node.isShorthandPropertyAssignment(p)) {
    defaults.set(p.getName(), { value: '(shorthand)', line: p.getStartLineNumber() });
  }
}

function firstSentence(text) {
  const t = c.oneLine(text);
  if (!t) return '';
  // prima frase: fino al primo ". " / ".\n" / fine, ignorando punti dentro backtick
  let inCode = false;
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (ch === '`') inCode = !inCode;
    if (!inCode && ch === '.' && (i === t.length - 1 || t[i + 1] === ' ') && !/\b(e\.g|i\.e|etc|vs)$/i.test(t.slice(0, i))) {
      return t.slice(0, i + 1);
    }
  }
  return t;
}

// File su cui contare gli usi (escluso il file stesso e spec/schematics).
const tsFiles = c.scopeFiles().filter((f) => f !== FT);
const htmlFiles = c.trackedFiles(/\.html$/);
const scssFiles = c.trackedFiles(/\.scss$/).filter((f) => !/\/test\//.test(f));
const read = (f) => fs.readFileSync(path.join(c.REPO, f), 'utf8');
const tsTexts = tsFiles.map((f) => [f, read(f)]);
const htmlTexts = htmlFiles.map((f) => [f, read(f)]);
const scssTexts = scssFiles.map((f) => [f, read(f)]);

function esc(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function countIn(texts, re) {
  let n = 0;
  const filesHit = new Set();
  for (const [f, t] of texts) {
    const m = t.match(re);
    if (m) {
      n += m.length;
      filesHit.add(f);
    }
  }
  return { n, files: filesHit.size };
}

const rows = [];
for (const prop of itf.getProperties()) {
  const key = prop.getName();
  const docs = prop.getJsDocs().map((d) => d.getDescription()).join(' ');
  const def = defaults.get(key);
  const k = esc(key);
  // TS: stringa con apici singoli/doppi (anche negata '!key') oppure `key:` come proprietà
  const tsQuoted = countIn(tsTexts, new RegExp(`['"\`]!?${k}['"\`]`, 'g'));
  const tsColon = countIn(tsTexts, new RegExp(`\\b${k}\\??\\s*:`, 'g'));
  const tsDot = countIn(tsTexts, new RegExp(`\\.${k}\\b`, 'g'));
  const html = countIn(htmlTexts, new RegExp(`['"]!?${k}['"]`, 'g'));
  const scss = countIn(scssTexts, new RegExp(`['"]?!?\\b${k}\\b['"]?`, 'g'));
  rows.push({
    key,
    doc: firstSentence(docs),
    def: def ? def.value : '(assente)',
    tsQuoted,
    tsColon,
    tsDot,
    html,
    scss,
    ref: c.ref(FT, prop.getStartLineNumber(true), prop.getEndLineNumber()),
    defRef: def ? c.ref(FT, def.line, def.line) : '',
  });
}

const missingInInterface = [...defaults.keys()].filter((k) => !rows.find((r) => r.key === k));
const trueCount = rows.filter((r) => r.def === 'true').length;
const unused = rows.filter((r) => r.tsQuoted.n + r.tsColon.n + r.tsDot.n + r.html.n + r.scss.n === 0).length;

let md = c.header(
  'Appendice A09 - Feature toggle',
  'a09-feature-toggles.js',
  rows.length,
  `Fonte: \`FeatureTogglesInterface\` e \`defaultFeatureToggles\` in \`${FT}\`; \`FeatureToggles\` estende \`FeatureTogglesInterface\` in \`${TOKENS}\`. Conteggi usi = numero di occorrenze (tra parentesi: numero di file) di: **TS quoted** \`'chiave'\`/\`"chiave"\`/\`'!chiave'\`; **TS \`chiave:\`** proprietà \`chiave:\` o \`chiave?:\` (può includere omonimi non legati al toggle); **TS \`.chiave\`** accesso a proprietà (es. \`this.featureToggles.chiave\`; può includere omonimi); **HTML** \`'chiave'\`/\`'!chiave'\` nei template (es. \`*cxFeature\`); **SCSS** parola \`chiave\` nei file \`.scss\` (es. mixin \`forFeature\`), esclusi \`/test/\`. Ambito TS: file dell'ambito estrattore escluso il file sorgente; HTML/SCSS: file tracciati in core-libs, feature-libs, integration-libs esclusi spec e schematics.`
);
md += `\n## Riepilogo\n\n- Chiavi: **${rows.length}**; default \`true\`: **${trueCount}**; default \`false\`: **${rows.filter((r) => r.def === 'false').length}**.\n- Chiavi senza alcun uso rilevato: **${unused}**.\n- Chiavi presenti in \`defaultFeatureToggles\` ma non nell'interfaccia: ${missingInInterface.length ? missingInInterface.map(c.code).join(', ') : 'nessuna'}.\n`;
md += '\n## Elenco\n\n| # | Chiave | Descrizione (prima frase JSDoc) | Default | TS quoted | TS `chiave:` | TS `.chiave` | HTML | SCSS | Riferimento (interfaccia) | Riferimento (default) |\n|---:|---|---|---|---:|---:|---:|---:|---:|---|---|\n';
const f = (x) => `${x.n} (${x.files})`;
rows.forEach((r, i) => {
  md += `| ${i + 1} | ${c.code(r.key)} | ${c.cell(r.doc)} | ${c.code(r.def)} | ${f(r.tsQuoted)} | ${f(r.tsColon)} | ${f(r.tsDot)} | ${f(r.html)} | ${f(r.scss)} | ${c.code(r.ref)} | ${c.code(r.defRef)} |\n`;
});
c.writeOut('A09-feature-toggle.md', md);
console.log('chiavi:', rows.length, 'true:', trueCount, 'senza usi:', unused, 'mancanti interfaccia:', missingInInterface.length);
