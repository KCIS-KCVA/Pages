import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const routes = ['/', '/sports/', '/tournament-1/', '/register/', '/matches/', '/results/', '/media/', '/sponsor/', '/about/', '/staff/', '/safety/', '/privacy/', '/contact/'];
const errors = [];
for (const route of routes) {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}index.html`;
  const body = await fs.readFile(path.join(root, file), 'utf8').catch(() => '');
  if (!body) errors.push(`${route}: missing index.html`);
  if (/26[–-]27 KCVA Volleyball Tournament One|9 October 2026|10 月 9 日截止/.test(body)) errors.push(`${route}: stale tournament name or registration deadline`);
  if (!body.includes('/assets/brand/kcva-emblem-white.png')) errors.push(`${route}: white favicon missing`);
  for (const token of ['<title>', 'description', 'canonical', 'data-site-header', 'data-site-footer']) {
    if (!body.includes(token)) errors.push(`${route}: missing ${token}`);
  }
}
const config = await fs.readFile(path.join(root, 'data/site-config.js'), 'utf8');
if (!config.includes('X5lZme')) errors.push('published Jinshuju registration link missing');
if (!config.includes('sponsors:')) errors.push('sponsor configuration missing');
if (!config.includes('26-27 KCVA X Volleywoods Volleyball Tournament 1')) errors.push('current tournament name missing');
if (!config.includes('7 September–12 October 2026')) errors.push('12 October registration deadline missing');
const sports = await fs.readFile(path.join(root, 'sports/index.html'), 'utf8');
for (const sport of ['Volleyball', 'Ultimate', 'Basketball']) {
  if (!sports.includes(sport)) errors.push(`sports hub missing ${sport}`);
}
if (sports.includes('data-registration-link')) errors.push('sports hub must not imply registration for future sports');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated ${routes.length} routes, SEO hooks, registration configuration, and sponsor data.`);
