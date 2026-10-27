import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'dist');
const entries = ['index.html', 'CNAME', 'robots.txt', 'sitemap.xml', '404.html', 'about', 'tournaments', 'shop', 'sports', 'tournament-1', 'frisbee-tournament', 'register', 'matches', 'results', 'media', 'sponsor', 'safety', 'privacy', 'contact', 'staff', 'join', 'assets', 'styles', 'scripts', 'data'];
await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });
for (const entry of entries) {
  const source = path.join(root, entry);
  try { await fs.cp(source, path.join(out, entry), { recursive: true }); } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
console.log(`Built static site to ${out}`);
