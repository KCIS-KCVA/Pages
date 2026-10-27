import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const routes = ['/', '/tournaments/', '/tournament-1/', '/frisbee-tournament/', '/register/', '/matches/', '/results/', '/about/', '/shop/', '/shop/training-long-sleeve/', '/shop/pearl-white-short-sleeve/', '/shop/frisbee-white-long-sleeve/', '/shop/frisbee-black-long-sleeve/', '/sports/', '/media/', '/sponsor/', '/staff/', '/safety/', '/privacy/', '/contact/'];
const errors = [];
for (const route of routes) {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}index.html`;
  const body = await fs.readFile(path.join(root, file), 'utf8').catch(() => '');
  if (!body) errors.push(`${route}: missing index.html`);
  if (/26[–-]27 KCVA Volleyball Tournament One|9 October 2026|10 月 9 日截止/.test(body)) errors.push(`${route}: stale tournament name or registration deadline`);
  if (!body.includes('/assets/brand/kcva-emblem-white.png') && !(route === '/frisbee-tournament/' && body.includes('/assets/brand/frisbee/kcva-frisbee-logo-original.png'))) errors.push(`${route}: brand favicon missing`);
  for (const token of ['<title>', 'description', 'canonical', 'data-site-header', 'data-site-footer']) {
    if (!body.includes(token)) errors.push(`${route}: missing ${token}`);
  }
}
const config = await fs.readFile(path.join(root, 'data/site-config.js'), 'utf8');
if (!config.includes('X5lZme')) errors.push('published Jinshuju registration link missing');
if (!config.includes('dsktsS')) errors.push('frisbee team registration link missing');
if (!config.includes('sponsors:')) errors.push('sponsor configuration missing');
if (!config.includes('26-27 KCVA X Volleywoods Volleyball Tournament 1')) errors.push('current tournament name missing');
if (!config.includes('7 September–12 October 2026')) errors.push('12 October registration deadline missing');
const sports = await fs.readFile(path.join(root, 'sports/index.html'), 'utf8');
for (const sport of ['Volleyball', 'Ultimate', 'Basketball']) {
  if (!sports.includes(sport)) errors.push(`sports hub missing ${sport}`);
}
if (sports.includes('data-registration-link')) errors.push('sports hub must not imply registration for future sports');
const tournaments = await fs.readFile(path.join(root, 'tournaments/index.html'), 'utf8');
for (const sport of ['frisbee', 'volleyball', 'basketball']) {
  if (!tournaments.includes(`id="${sport}"`)) errors.push(`tournaments page missing ${sport} row`);
}
if (!/id="frisbee"[\s\S]*id="volleyball"[\s\S]*id="basketball"/.test(tournaments)) errors.push('tournaments sport order must be frisbee, volleyball, basketball');
if (!tournaments.includes('dsc00453-1600.webp')) errors.push('official album tournament cover missing');
if (!tournaments.includes('5–6 DECEMBER 2026 · TENTATIVE')) errors.push('tentative frisbee date missing');
const frisbee = await fs.readFile(path.join(root, 'frisbee-tournament/index.html'), 'utf8');
if (!frisbee.includes('/assets/brand/frisbee/kcva-frisbee-logo-transparent.png')) errors.push('frisbee detail missing transparent logo');
if (!frisbee.includes('26-27 Frisbee Tournament 1') || !frisbee.includes('data-frisbee-registration-link')) errors.push('frisbee detail title or registration link missing');
const volleyball = await fs.readFile(path.join(root, 'tournament-1/index.html'), 'utf8');
if (!volleyball.includes('/assets/brand/kcva-emblem-original.png')) errors.push('volleyball detail missing original emblem');
const home = await fs.readFile(path.join(root, 'index.html'), 'utf8');
if (!home.includes('split-sport-hero') || !home.includes('/assets/events/volleyball-home-photo.webp') || !home.includes('/assets/events/frisbee-home-photo.webp')) errors.push('home split sport cover missing');
if (!home.includes('/assets/brand/frisbee/kcva-frisbee-logo-transparent.png')) errors.push('home transparent frisbee logo missing');
const products = await fs.readFile(path.join(root, 'data/products.js'), 'utf8');
for (const slug of ['training-long-sleeve', 'pearl-white-short-sleeve', 'frisbee-white-long-sleeve', 'frisbee-black-long-sleeve']) {
  if (!products.includes(`slug: '${slug}'`)) errors.push(`product catalog missing ${slug}`);
}
for (const price of ['priceCny: 119.9', 'priceCny: 99.9']) {
  if (!products.includes(price)) errors.push(`confirmed product price missing: ${price}`);
}
if (!products.includes('Price to be announced / 价格待公布')) errors.push('TBA price label missing');
const siteScript = await fs.readFile(path.join(root, 'scripts/site.js'), 'utf8');
if (!siteScript.includes("'15858204360'")) errors.push('WeChat consultation number missing');
if (/data-custom-cursor|brand-field\.js|kcva-r-cursor/.test(siteScript)) errors.push('custom cursor still active');
if (!siteScript.includes('electro-x-wordmark-en.png') || siteScript.includes('electro-x-wordmark-bilingual.png') || siteScript.includes('electro-x-symbol.png')) errors.push('sponsor must use only the official English Electro X wordmark');
if (!siteScript.includes("copy('VIEW TOURNAMENT','查看赛事')")) errors.push('header tournament CTA missing');
const buildScript = await fs.readFile(path.join(root, 'scripts/build.mjs'), 'utf8');
for (const entry of ["'tournaments'", "'shop'"]) {
  if (!buildScript.includes(entry)) errors.push(`deployment build missing ${entry}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated ${routes.length} routes, SEO hooks, registration configuration, and sponsor data.`);
