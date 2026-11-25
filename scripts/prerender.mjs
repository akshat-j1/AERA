import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST_DIR = path.resolve('dist');
const SSR_ENTRY = path.resolve('dist-ssr/entry-server.js');
const ROUTES = ['/', '/services', '/team', '/bridal', '/gallery', '/about', '/enquire'];

const template = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
const { renderRoute } = await import(pathToFileURL(SSR_ENTRY).href);

for (const route of ROUTES) {
  const { html, headTags } = renderRoute(route);

  // Replace base title/description and embed exact route marker to guarantee clean hydration
  let pageHtml = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta name="description"[\s\S]*?>/, '')
    .replace('<!--app-head-->', () => headTags)
    .replace('<div id="root"><!--app-html--></div>', () => `<div id="root" data-ssr-path="${route}">${html}</div>`);

  const outFile =
    route === '/'
      ? path.join(DIST_DIR, 'index.html')
      : path.join(DIST_DIR, route.slice(1), 'index.html');

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, pageHtml, 'utf8');
  console.log(`Prerendered ${route} -> ${path.relative(process.cwd(), outFile)}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) =>
    `  <url><loc>https://aera-beauty-studio.example${r === '/' ? '' : r}</loc><changefreq>monthly</changefreq></url>`
).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap, 'utf8');
console.log('Generated dist/sitemap.xml');
