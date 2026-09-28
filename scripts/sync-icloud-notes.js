import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetNotesDir = path.join(__dirname, '../public/notes');
const outputFile = path.join(__dirname, '../public/notes-manifest.json');

function scanDirectory(dir, categoryName = '') {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item.startsWith('.')) continue;

    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(scanDirectory(fullPath, item));
    } else if (item.endsWith('.pdf')) {
      const relativeUrl = '/notes/' + path.relative(targetNotesDir, fullPath).replace(/\\/g, '/');
      const title = item.replace('.pdf', '');

      results.push({
        id: 'note-' + relativeUrl.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
        title: title,
        category: categoryName || 'General',
        notebookName: item,
        date: stat.mtime.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        tags: [categoryName || 'General'],
        fileUrl: relativeUrl,
        lastModified: stat.mtime.getTime()
      });
    }
  }
  return results;
}

try {
  console.log('Scanning public/notes directory for PDF notebooks...');
  const manifest = scanDirectory(targetNotesDir);
  manifest.sort((a, b) => b.lastModified - a.lastModified);

  fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
  console.log(`Successfully generated clean notes-manifest.json with ${manifest.length} notebooks.`);
} catch (err) {
  console.error('Error scanning notes:', err);
}
