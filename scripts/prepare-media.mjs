import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.join(process.cwd(), 'assets/media/wlsa-2026');
const original = path.join(root, 'original');
const files = (await fs.readdir(original)).filter(file => /\.(jpe?g|png)$/i.test(file));
for (const file of files) {
  const slug = path.parse(file).name.toLowerCase();
  const input = path.join(original, file);
  for (const width of [480, 960, 1600]) {
    await sharp(input).rotate().resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 }).toFile(path.join(root, `${slug}-${width}.webp`));
    await sharp(input).rotate().resize({ width, withoutEnlargement: true })
      .avif({ quality: 58 }).toFile(path.join(root, `${slug}-${width}.avif`));
  }
}
console.log(`Prepared ${files.length} media originals`);
