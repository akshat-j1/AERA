import fs from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const entry = path.resolve('dist-ssr/entry-server.js');
if (process.env.AERA_ENABLE_LOCAL_REELS !== '1') {
  fs.rmSync(path.join(dist, 'media/local-reels'), { recursive: true, force: true });
}
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const manifestConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const policy = manifestConfig.headers.flatMap(({ headers }) => headers)
  .find(({ key }) => key === 'Content-Security-Policy')?.value;
const entranceScript = template.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!entranceScript || !policy?.includes(`'sha256-${createHash('sha256').update(entranceScript).digest('base64')}'`)) {
  throw new Error('The built entrance script must match the Vercel Content-Security-Policy hash.');
}
const { renderRoute, prerenderConfig } = await import(pathToFileURL(entry).href);

const doorPath = path.join(dist, 'media/doors-closed-480.avif');
const doorTexture = fs.existsSync(doorPath) ? fs.readFileSync(doorPath).toString('base64') : '';

const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite/manifest.json'), 'utf8'));
const homeChunk = manifest['src/pages/HomePage.tsx']?.file;
const homeModulePreload = homeChunk ? `<link rel="modulepreload" href="/${homeChunk}">` : '';

for (const route of [...prerenderConfig.routePaths, '/404']) {
  const { html, headTags, entranceBrand, entranceSubline } = await renderRoute(route);

  const pageHtml = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta name="description"[\s\S]*?>/, '')
    .replace('<!--app-head-->', () => (route === '/' ? homeModulePreload : '') + headTags)
    .replace('data-entrance-facade', route === '/' && doorTexture
      ? `data-entrance-facade style="--aera-facade-image:url(data:image/avif;base64,${doorTexture})"`
      : 'data-entrance-facade')
    .replace(/<!--entrance-brand-->.*?<!--\/entrance-brand-->/, () => entranceBrand)
    .replace(/<!--entrance-subline-->.*?<!--\/entrance-subline-->/, () => entranceSubline)
    .replace('<div id="root"><!--app-html--></div>', () => `<div id="root" data-ssr-path="${route}">${html}</div>`);

  const file = route === '/404' ? '404.html' : route === '/' ? 'index.html' : `${route.slice(1)}/index.html`;
  const outFile = path.join(dist, file);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, pageHtml, 'utf8');
  console.log(`Prerendered ${route} -> ${path.relative(process.cwd(), outFile)}`);
}

const xmlEscape = (value) => value.replace(/[<>&'"]/g, (character) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
})[character]);
const robots = 'User-agent: *\nAllow: /\n';
let robotsContent = robots;
if (prerenderConfig.allowIndexing) {
  const sitemapUrl = new URL('/sitemap.xml', prerenderConfig.siteUrl);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${prerenderConfig.routePaths.map(
  (route) => `  <url><loc>${xmlEscape(new URL(route, prerenderConfig.siteUrl).href)}</loc></url>`
).join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');
  robotsContent += `Sitemap: ${sitemapUrl.href}\n`;
}
fs.writeFileSync(path.join(dist, 'robots.txt'), robotsContent, 'utf8');
