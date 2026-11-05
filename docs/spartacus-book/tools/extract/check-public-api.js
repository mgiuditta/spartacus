/*
 * Fase 4: verifica che gli esempi della Parte III (parte-3/*.md) importino da @spartacus/*
 * solo simboli esportati dal public_api dell'entry point indicato.
 * Uso: node check-public-api.js [file.md ...]   -> exit 1 se ci sono violazioni.
 * Risoluzione: nome import '@spartacus/<pkg>[/sub]' -> ng-package.json con quel nome npm
 * (package.json "name" + percorso relativo) -> entryFile -> getExportedDeclarations (ts-morph).
 */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const { Project } = require('ts-morph');
const REPO = path.resolve(__dirname, '../../../..'), BOOK = path.resolve(__dirname, '../..');
// mappa entry point -> file
const ngPkgs = execSync("git ls-files 'core-libs' 'feature-libs' 'integration-libs' | grep 'ng-package.json$'", { cwd: REPO, encoding: 'utf8' }).split('\n').filter(Boolean);
const entries = {};
for (const ng of ngPkgs) {
  const dir = path.dirname(path.join(REPO, ng));
  let root = dir, pkgName = null;
  while (root.startsWith(REPO)) { const pj = path.join(root, 'package.json'); if (fs.existsSync(pj)) { pkgName = JSON.parse(fs.readFileSync(pj, 'utf8')).name; break; } root = path.dirname(root); }
  if (!pkgName) continue;
  const rel = path.relative(root, dir).split(path.sep).join('/');
  const name = rel ? `${pkgName}/${rel}` : pkgName;
  const cfg = JSON.parse(fs.readFileSync(path.join(REPO, ng), 'utf8'));
  const entryFile = (cfg.lib && cfg.lib.entryFile) || 'public_api.ts';
  entries[name] = path.join(dir, entryFile);
}
const project = new Project({ skipAddingFilesFromTsConfig: true, compilerOptions: { allowJs: false } });
const cache = {};
function exportsOf(name) {
  if (cache[name]) return cache[name];
  const f = entries[name]; if (!f || !fs.existsSync(f)) return (cache[name] = null);
  const sf = project.addSourceFileAtPath(f); project.resolveSourceFileDependencies();
  return (cache[name] = new Set([...sf.getExportedDeclarations().keys()]));
}
const files = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(path.join(BOOK, 'parte-3')).filter(f => f.endsWith('.md')).map(f => path.join(BOOK, 'parte-3', f));
let bad = 0, checked = 0;
for (const md of files) {
  const text = fs.readFileSync(md, 'utf8');
  const blocks = [...text.matchAll(/```(?:ts|typescript)\n([\s\S]*?)```/g)];
  for (const b of blocks) {
    if (/^\s*\/\/\s*SBAGLIATO/m.test(b[1])) { continue; } // anti-pattern dichiarati (cap. 54): esclusi
    for (const m of b[1].matchAll(/import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+'(@spartacus\/[^']+)'/g)) {
      const pkg = m[2];
      const ex = exportsOf(pkg);
      const syms = m[1].split(',').map(s => s.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0]).filter(Boolean);
      for (const s of syms) {
        checked++;
        if (ex === null) { console.log(`${path.relative(BOOK, md)}: entry point inesistente: ${pkg} (${s})`); bad++; }
        else if (!ex.has(s)) { console.log(`${path.relative(BOOK, md)}: ${s} NON esportato da ${pkg}`); bad++; }
      }
    }
  }
}
console.error(`# ${files.length} file, ${checked} import controllati, ${bad} violazioni`);
process.exit(bad ? 1 : 0);
