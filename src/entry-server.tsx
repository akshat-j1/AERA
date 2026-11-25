import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './App';
import { getRouteSeo, buildSalonJsonLd } from './lib/seo';
import { studioConfig } from './config/studio.config';

export function renderRoute(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );

  const seo = getRouteSeo(url);
  const canonicalUrl = `${studioConfig.seo.siteUrl}${seo.path === '/' ? '' : seo.path}`;
  const jsonLd = buildSalonJsonLd();

  const headTags = [
    `<title>${seo.title}</title>`,
    `<meta name="description" content="${seo.description.replace(/"/g, '&quot;')}" />`,
    `<link rel="canonical" href="${canonicalUrl}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${seo.title.replace(/"/g, '&quot;')}" />`,
    `<meta property="og:description" content="${seo.description.replace(/"/g, '&quot;')}" />`,
    `<meta property="og:image" content="${studioConfig.seo.siteUrl}${seo.ogImage}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ');

  return { html, headTags };
}
