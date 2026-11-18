// Scans /posts/*/ and writes posts.json for the Archive gallery.
// Each post = one folder: images (01.jpg, 02.jpg ...) + optional info.yaml
// Folders starting with "_" are ignored (e.g. _example).
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'posts';
const IMG = /\.(jpe?g|png|webp|gif)$/i;
const TAGS = ['BOOK', 'NOTE', 'GRAPHIC', 'LAB'];

const readInfo = (dir) => {
  const f = join(dir, 'info.yaml');
  if (!existsSync(f)) return {};
  const out = {};
  for (const line of readFileSync(f, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([a-zA-Z]+)\s*:\s*(.*?)\s*$/);
    if (m) out[m[1].toLowerCase()] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
};

const posts = !existsSync(ROOT) ? [] : readdirSync(ROOT)
  .filter((d) => !d.startsWith('_') && !d.startsWith('.') && statSync(join(ROOT, d)).isDirectory())
  .map((d) => {
    const dir = join(ROOT, d);
    const imgs = readdirSync(dir).filter((f) => IMG.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (!imgs.length) return null;
    const info = readInfo(dir);
    const tag = (info.tag || 'NOTE').toUpperCase();
    return {
      t: info.title || d.replace(/^\d{4}-\d{2}(-\d{2})?-?/, ''),
      g: TAGS.includes(tag) ? tag : 'NOTE',
      date: info.date || d.slice(0, 10),
      imgs: imgs.map((f) => `${ROOT}/${encodeURIComponent(d)}/${encodeURIComponent(f)}`),
    };
  })
  .filter(Boolean)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

writeFileSync('posts.json', JSON.stringify(posts, null, 2));
console.log(`posts.json: ${posts.length} post(s)`);
