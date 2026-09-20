import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const skip = new Set(['.git', 'node_modules', '.pnpm', 'dist', 'artifacts']);
const textExtensions = new Set(['.html', '.css', '.js', '.json']);
const problems = [];

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

async function exists(sitePath) {
  const clean = sitePath.split(/[?#]/)[0];
  if (!clean || clean === '/') return true;
  const relative = clean.replace(/^\//, '');
  const target = path.join(root, relative);
  try {
    const stat = await fs.stat(target);
    if (stat.isDirectory()) await fs.access(path.join(target, 'index.html'));
    return true;
  } catch {
    return false;
  }
}

const files = await walk(root);
for (const file of files) {
  if (!textExtensions.has(path.extname(file))) continue;
  const body = await fs.readFile(file, 'utf8');
  const candidates = new Set();
  for (const match of body.matchAll(/(?:src|href)=["']([^"']+)["']/g)) candidates.add(match[1]);
  for (const match of body.matchAll(/url\(["']?([^"')]+)["']?\)/g)) candidates.add(match[1]);
  for (const match of body.matchAll(/["'`](\/(?:assets|styles|scripts|data)\/[^"'`$]+)["'`]/g)) candidates.add(match[1]);

  for (const candidate of candidates) {
    if (candidate.includes('${')) continue;
    if (/^(?:https?:|mailto:|tel:|#|data:)/.test(candidate)) continue;
    const sitePath = candidate.startsWith('/')
      ? candidate
      : `/${path.relative(root, path.resolve(path.dirname(file), candidate))}`;
    if (!await exists(sitePath)) problems.push(`${path.relative(root, file)} -> ${candidate}`);
  }
}

const staff = JSON.parse(await fs.readFile(path.join(root, 'assets/data/staff.json'), 'utf8'));
for (const member of staff) {
  if (member.photo && !await exists(`/assets/staff/${member.photo}`)) problems.push(`assets/data/staff.json -> ${member.photo}`);
}

if (problems.length) {
  console.error(`Broken local references:\n${problems.join('\n')}`);
  process.exit(1);
}

console.log(`Validated local references across ${files.length} packaged files and ${staff.length} staff records.`);
