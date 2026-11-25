import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rawDir = path.resolve('src/assets/media/raw');
const videoDir = path.resolve('public/media/local-reels');
const outFile = path.resolve(process.argv[2] ?? 'audit-captures/photography-contact-sheet.jpg');

const imageFiles = fs
  .readdirSync(rawDir)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort()
  .map((f) => ({ label: f.replace(/\.[^.]+$/, ''), file: path.join(rawDir, f) }));

const videoPosters = process.env.AERA_ENABLE_LOCAL_REELS === '1' && fs.existsSync(videoDir)
  ? fs
      .readdirSync(videoDir)
      .filter((f) => /-poster\.(jpe?g|webp)$/i.test(f))
      .sort()
      .map((f) => ({ label: f.replace(/\.(jpe?g|webp)$/i, ''), file: path.join(videoDir, f) }))
  : [];

const items = [...imageFiles, ...videoPosters];
const cols = 5;
const tileW = 240;
const tileH = 180;
const labelH = 34;
const gap = 22;
const pad = 28;
const rows = Math.ceil(items.length / cols);
const width = pad * 2 + cols * tileW + (cols - 1) * gap;
const height = pad * 2 + rows * (tileH + labelH) + (rows - 1) * gap;

const composites = [];
const svgLabels = [];

for (let i = 0; i < items.length; i++) {
  const item = items[i];
  const col = i % cols;
  const row = Math.floor(i / cols);
  const x = pad + col * (tileW + gap);
  const y = pad + row * (tileH + labelH + gap);

  const thumb = await sharp(item.file)
    .resize(tileW, tileH, { fit: 'contain', background: { r: 242, g: 238, b: 241, alpha: 1 } })
    .jpeg({ quality: 88 })
    .toBuffer();

  composites.push({ input: thumb, left: x, top: y });
  const safe = item.label.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  svgLabels.push(
    `<text x="${x + 4}" y="${y + tileH + 22}" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#2A2128">${safe}</text>`
  );
}

const labelOverlay = Buffer.from(
  `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${svgLabels.join('')}</svg>`
);

fs.mkdirSync(path.dirname(outFile), { recursive: true });
await sharp({
  create: { width, height, channels: 3, background: { r: 247, g: 244, b: 246 } },
})
  .composite([...composites, { input: labelOverlay, left: 0, top: 0 }])
  .jpeg({ quality: 90 })
  .toFile(outFile);

console.log(`Contact sheet (${items.length} media assets) -> ${outFile}`);
