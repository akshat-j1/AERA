import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const entry = path.resolve('dist-ssr/entry-server.js');
if (process.env.AERA_ENABLE_LOCAL_REELS !== '1') {
  fs.rmSync(path.join(dist, 'media/local-reels'), { recursive: true, force: true });
}
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
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
const sitemapUrl = new URL('/sitemap.xml', prerenderConfig.siteUrl);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${prerenderConfig.routePaths.map(
  (route) => `  <url><loc>${xmlEscape(new URL(route, prerenderConfig.siteUrl).href)}</loc></url>`
).join('\n')}
</urlset>
`;

const robots = 'User-agent: *\nAllow: /\n';
if (prerenderConfig.allowIndexing) {
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');
}
fs.writeFileSync(path.join(dist, 'robots.txt'), prerenderConfig.allowIndexing
  ? `${robots}\nSitemap: ${sitemapUrl.href}\n`
  : robots, 'utf8');
