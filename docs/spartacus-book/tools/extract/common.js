/*
 * Utility condivise dagli script di estrazione delle appendici.
 * Nessuna modifica al repo: solo lettura dei sorgenti.
 */
'use strict';
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '../../../..');
const BOOK = path.resolve(__dirname, '../..');
const SHA_SHORT = '5b7a1c2b';

/** Ambito file concordato (vedi prompt estrattore). */
function scopeFiles() {
  const out = execSync(
    "git ls-files core-libs feature-libs integration-libs | grep '\\.ts$' | grep -vE '\\.spec\\.ts$|/testing/|\\.mock\\.ts$|/schematics/'",
    { cwd: REPO, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  return out.split('\n').filter(Boolean).sort();
}

/** File tracciati con estensione data (per conteggi grep), esclusi spec/schematics. */
function trackedFiles(extRegex) {
  const out = execSync('git ls-files core-libs feature-libs integration-libs', {
    cwd: REPO,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  return out
    .split('\n')
    .filter(Boolean)
    .filter((f) => extRegex.test(f))
    .filter((f) => !/\.spec\.(ts|scss)$|\/schematics\//.test(f))
    .sort();
}

const pkgCache = new Map();
/** Libreria = prime due cartelle (es. feature-libs/cart) + nome npm se presente. */
function libraryOf(rel) {
  const parts = rel.split('/');
  const dir = parts.slice(0, 2).join('/');
  if (!pkgCache.has(dir)) {
    let name = dir;
    const pj = path.join(REPO, dir, 'package.json');
    if (fs.existsSync(pj)) {
      try {
        name = JSON.parse(fs.readFileSync(pj, 'utf8')).name || dir;
      } catch (e) {
        /* ignore */
      }
    }
    pkgCache.set(dir, name);
  }
  return pkgCache.get(dir);
}

/** Entry point pubblici: entryFile di ogni ng-package.json (esclusi schematics). */
function entryFiles() {
  const out = execSync(
    'git ls-files core-libs feature-libs integration-libs | grep -E "ng-package\\.json$" | grep -v schematics',
    { cwd: REPO, encoding: 'utf8' }
  );
  return out
    .split('\n')
    .filter(Boolean)
    .map((p) => {
      const j = JSON.parse(fs.readFileSync(path.join(REPO, p), 'utf8'));
      const entry = (j.lib && j.lib.entryFile) || 'src/public_api.ts';
      return path.posix.normalize(path.posix.join(path.posix.dirname(p), entry));
    })
    .filter((p) => fs.existsSync(path.join(REPO, p)));
}

function createProject(files) {
  const { Project } = require('ts-morph');
  const project = new Project({
    compilerOptions: {
      target: 99,
      module: 99,
      moduleResolution: 2,
      experimentalDecorators: true,
      allowJs: false,
      noResolve: false,
    },
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: true,
  });
  for (const f of files) project.addSourceFileAtPath(path.join(REPO, f));
  return project;
}

/**
 * Insieme di nodi dichiarazione raggiungibili dagli entry point pubblici
 * (risolve `export *` e re-export relativi).
 */
function publicDeclarations(project) {
  const set = new Set();
  for (const e of entryFiles()) {
    let sf = project.getSourceFile(path.join(REPO, e));
    if (!sf) sf = project.addSourceFileAtPath(path.join(REPO, e));
    let map;
    try {
      map = sf.getExportedDeclarations();
    } catch (err) {
      console.error('WARN exports', e, err.message);
      continue;
    }
    for (const decls of map.values()) for (const d of decls) set.add(d);
  }
  return set;
}

function rel(sf) {
  return path.relative(REPO, sf.getFilePath()).split(path.sep).join('/');
}

function ref(relPath, a, b) {
  return `${relPath}:L${a}-L${b === undefined ? a : b}`;
}

/** Collassa spazi e tronca. */
function oneLine(s, max) {
  let t = String(s).replace(/\s+/g, ' ').trim();
  if (max && t.length > max) t = t.slice(0, max - 1) + '…';
  return t;
}

/** Cella markdown in code span, con pipe escapati. */
function code(s) {
  if (s === undefined || s === null || s === '') return '';
  const t = String(s).replace(/\|/g, '\\|');
  return t.includes('`') ? '`` ' + t + ' ``' : '`' + t + '`';
}

function cell(s) {
  return String(s === undefined || s === null ? '' : s)
    .replace(/\|/g, '\\|')
    .replace(/\s+/g, ' ')
    .trim();
}

function header(title, script, rows, extra) {
  return [
    `# ${title}`,
    '',
    `> Generata da \`tools/extract/${script}\` allo SHA 5b7a1c2b (\`5b7a1c2bf2808d7380bc20596d10f4fa710c3da1\`). Non modificare a mano.`,
    `>`,
    `> Righe di tabella: **${rows}**.`,
    `>`,
    `> Rigenerazione: \`cd docs/spartacus-book/tools/extract && npm install && node ${script}\``,
    extra ? `>\n> ${extra}` : '',
    '',
  ].join('\n');
}

function writeOut(name, content) {
  const p = path.join(BOOK, 'appendici', name);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
  console.log('scritto', path.relative(BOOK, p));
}

module.exports = {
  REPO,
  BOOK,
  SHA_SHORT,
  scopeFiles,
  trackedFiles,
  libraryOf,
  entryFiles,
  createProject,
  publicDeclarations,
  rel,
  ref,
  oneLine,
  code,
  cell,
  header,
  writeOut,
};
