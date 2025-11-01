/*
  Generates required PNG icons from existing SVGs for PWA install
  Outputs: icon-192.png, icon-512.png, maskable-icon-192.png, maskable-icon-512.png, apple-touch-icon.png
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = process.cwd();
const iconsDir = path.join(root, 'public', 'icons');

const sources = {
  normal: path.join(iconsDir, 'icon.svg'),
  maskable: path.join(iconsDir, 'maskable-icon.svg'),
};

const outputs = [
  { src: 'normal', file: 'icon-192.png', size: 192 },
  { src: 'normal', file: 'icon-512.png', size: 512 },
  { src: 'maskable', file: 'maskable-icon-192.png', size: 192 },
  { src: 'maskable', file: 'maskable-icon-512.png', size: 512 },
  { src: 'normal', file: 'apple-touch-icon.png', size: 180 },
];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function generate() {
  await ensureDir(iconsDir);
  const results = [];
  for (const out of outputs) {
    const srcPath = sources[out.src];
    const destPath = path.join(iconsDir, out.file);

    if (!fs.existsSync(srcPath)) {
      console.error(`Source SVG missing: ${srcPath}`);
      continue;
    }

    try {
      const svg = await fs.promises.readFile(srcPath);
      const png = await sharp(svg, { density: 384 })
        .resize(out.size, out.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toBuffer();
      await fs.promises.writeFile(destPath, png);
      results.push(destPath);
      console.log(`Generated ${destPath}`);
    } catch (err) {
      console.error(`Failed generating ${destPath}:`, err.message);
    }
  }
  console.log('Icon generation complete. Files:', results);
}

generate();