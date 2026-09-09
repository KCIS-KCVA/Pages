import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const routes = ['/', '/tournament-1/', '/register/', '/matches/', '/results/', '/media/', '/sponsor/', '/about/', '/staff/', '/safety/', '/privacy/', '/contact/'];
const errors = [];
for (const route of routes) {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}index.html`;
  const body = await fs.readFile(path.join(root, file), 'utf8').catch(() => '');
  if (!body) errors.push(`${route}: missing index.html`);
  for (const token of ['<title>', 'description', 'canonical', 'data-site-header', 'data-site-footer']) {
    if (!body.includes(token)) errors.push(`${route}: missing ${token}`);
  }
}
const config = await fs.readFile(path.join(root, 'data/site-config.js'), 'utf8');
if (!config.includes('X5lZme')) errors.push('published Jinshuju registration link missing');
if (!config.includes('sponsors:')) errors.push('sponsor configuration missing');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated ${routes.length} routes, SEO hooks, registration configuration, and sponsor data.`);
