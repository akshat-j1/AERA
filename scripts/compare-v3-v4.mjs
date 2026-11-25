import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const v3Dir = path.resolve('audit-captures');
const v4Dir = path.resolve('audit-captures/v4-phase2/journey');
const outFile = path.resolve('audit-captures/v4-phase2/v3-vs-v4-comparison.jpg');

const pairs = [
  ['v3-desktop-01-entrance-closed.png', 'v4-desktop-01-entrance-closed.png', 'Entrance Closed (Desktop)'],
  ['v3-desktop-02-entrance-swinging.png', 'v4-desktop-02-entrance-swinging.png', 'Entrance Opening (Desktop)'],
  ['v3-desktop-04-hero-settled.png', 'v4-desktop-04-hero-settled.png', 'Hero Settled (Desktop)'],
  ['v3-desktop-05-living-mirrors.png', 'v4-desktop-05-living-mirrors.png', 'Living Mirrors (Desktop)'],
  ['v3-mobile-03-hero.png', 'v4-mobile-03-hero.png', 'Mobile Hero (390x844)'],
  ['v3-mobile-05-in-motion.png', 'v4-mobile-05-in-motion.png', 'Mobile Reels Rail (390x844)'],
];

const cellW = 540;
const cellH = 340;
const gap = 20;
const pad = 28;
const rowLabelH = 26;
const width = pad * 2 + cellW * 2 + gap;
const height = pad * 2 + pairs.length * (cellH + rowLabelH) + (pairs.length - 1) * gap;

const composites = [];
const labels = [];

for (let i = 0; i < pairs.length; i++) {
  const [v3Name, v4Name, title] = pairs[i];
  const yTop = pad + i * (cellH + rowLabelH + gap);
  labels.push(`<text x="${pad}" y="${yTop + 18}" font-family="ui-sans-serif, system-ui" font-size="14" font-weight="700" fill="#2A2128">V3: ${title}</text>`);
  labels.push(`<text x="${pad + cellW + gap}" y="${yTop + 18}" font-family="ui-sans-serif, system-ui" font-size="14" font-weight="700" fill="#844D60">V4: ${title}</text>`);

  for (const [col, file] of [path.join(v3Dir, v3Name), path.join(v4Dir, v4Name)].entries()) {
    if (!fs.existsSync(file)) continue;
    const buf = await sharp(file)
      .resize(cellW, cellH, { fit: 'contain', background: { r: 247, g: 244, b: 246, alpha: 1 } })
      .jpeg({ quality: 88 })
      .toBuffer();
    composites.push({ input: buf, left: pad + col * (cellW + gap), top: yTop + rowLabelH });
  }
}

const svg = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${labels.join('')}</svg>`);
await sharp({ create: { width, height, channels: 3, background: { r: 250, g: 248, b: 247 } } })
  .composite([...composites, { input: svg, left: 0, top: 0 }])
  .jpeg({ quality: 90 })
  .toFile(outFile);

console.log('Comparison sheet ->', outFile);
