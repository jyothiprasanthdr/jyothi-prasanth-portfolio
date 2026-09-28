// Renders every notebook PDF in public/notes-manifest.json to WebP page images.
// macOS only (uses PDFKit via scripts/render-pdf-page.swift, plus cwebp). Output is committed,
// so CI builds never need to run this. Unchanged PDFs are skipped.
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync, readdirSync, rmSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { slugify } from '../src/lib/slug.js';

const READ_WIDTH = 1100;
const SHELF_WIDTH = 440;
const OUT_ROOT = 'public/notebook-pages';

// Noteful exports open with one or more blank cover pages. The shelf shows the first handwritten page:
// among the first four, the one with the most ink, measured by compressed size (blank pages compress to almost nothing).
function makeShelf(outDir) {
  const candidates = readdirSync(outDir).filter((f) => /^p-00[1-4]\.webp$/.test(f)).sort();
  const best = candidates.reduce((a, b) => (statSync(path.join(outDir, b)).size > statSync(path.join(outDir, a)).size ? b : a));
  execFileSync('cwebp', ['-quiet', '-q', '72', '-resize', String(SHELF_WIDTH), '0', path.join(outDir, best), '-o', path.join(outDir, 'shelf.webp')]);
  return Number(best.slice(2, 5));
}

// The reader opens on the first written page: leading cover pages are the ones far smaller than the densest early page.
function firstWrittenPage(outDir) {
  const early = readdirSync(outDir).filter((f) => /^p-00[1-4]\.webp$/.test(f)).sort();
  const sizes = early.map((f) => statSync(path.join(outDir, f)).size);
  const max = Math.max(...sizes);
  return sizes.findIndex((size) => size >= max * 0.3) + 1;
}

const manifest = JSON.parse(readFileSync('public/notes-manifest.json', 'utf8'));
const index = {};

for (const note of manifest) {
  const pdf = path.join('public', decodeURIComponent(note.fileUrl));
  const slug = slugify(note.title);
  const outDir = path.join(OUT_ROOT, slug);
  const stampFile = path.join(outDir, '.source-mtime');
  const metaFile = path.join(outDir, 'meta.json');
  const mtime = String(statSync(pdf).mtimeMs);

  if (existsSync(stampFile) && readFileSync(stampFile, 'utf8') === mtime && existsSync(metaFile)) {
    index[slug] = { ...JSON.parse(readFileSync(metaFile, 'utf8')), shelfPage: makeShelf(outDir), firstPage: firstWrittenPage(outDir) };
    continue;
  }

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'nb-'));

  execFileSync('swift', ['scripts/render-pdf-page.swift', pdf, tmp, String(READ_WIDTH)], { stdio: ['ignore', 'pipe', 'inherit'] });
  const pngs = readdirSync(tmp).filter((f) => f.endsWith('.png')).sort();

  for (const png of pngs) {
    execFileSync('cwebp', ['-quiet', '-q', '70', path.join(tmp, png), '-o', path.join(outDir, png.replace('.png', '.webp'))]);
  }

  const dims = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', path.join(tmp, pngs[0])]).toString();
  const width = Number(/pixelWidth: (\d+)/.exec(dims)[1]);
  const height = Number(/pixelHeight: (\d+)/.exec(dims)[1]);

  const meta = { pages: pngs.length, width, height, shelfPage: makeShelf(outDir), firstPage: firstWrittenPage(outDir) };
  writeFileSync(metaFile, JSON.stringify(meta));
  writeFileSync(stampFile, mtime);
  rmSync(tmp, { recursive: true, force: true });
  index[slug] = meta;
  console.log(`rendered ${slug}: ${pngs.length} pages`);
}

writeFileSync('src/data/notebook-pages.json', JSON.stringify(index, null, 2) + '\n');
console.log(`indexed ${Object.keys(index).length} notebooks`);
