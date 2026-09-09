import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const brand = path.join(root, 'assets/brand');
const photos = path.join(root, 'assets/photography');

await fs.mkdir(brand, { recursive: true });
await fs.mkdir(photos, { recursive: true });

async function trimLogo(input, name, width) {
  const image = sharp(path.join(brand, input));
  const metadata = await image.metadata();
  const stats = await image.stats();
  console.log(`${input}: ${metadata.width}x${metadata.height}, alpha=${metadata.hasAlpha}, opaque=${stats.isOpaque}`);
  await image
    .trim({ background: '#ffffff', threshold: 12 })
    .resize({ width, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(brand, `${name}.png`));
}

async function photoSet(input, name, position) {
  const source = sharp(path.join(photos, input)).rotate();
  await source
    .clone()
    .resize({ width: 2400, withoutEnlargement: true })
    .greyscale()
    .linear(1.12, -7)
    .sharpen()
    .webp({ quality: 86 })
    .toFile(path.join(photos, `${name}-2400.webp`));
  await source
    .clone()
    .resize({ width: 1600, withoutEnlargement: true })
    .greyscale()
    .linear(1.12, -7)
    .sharpen()
    .webp({ quality: 84 })
    .toFile(path.join(photos, `${name}-1600.webp`));
  await source
    .clone()
    .resize(900, 1200, { fit: 'cover', position })
    .greyscale()
    .linear(1.12, -7)
    .sharpen()
    .webp({ quality: 84 })
    .toFile(path.join(photos, `${name}-portrait.webp`));
}

await trimLogo('kcva-wordmark-original.png', 'kcva-wordmark', 900);
await trimLogo('kcva-emblem-original.png', 'kcva-emblem', 720);
await photoSet('dsc01294-original.jpg', 'tournament-team', 'center');
await photoSet('dsc01260-original.jpg', 'community-team', 'center');

