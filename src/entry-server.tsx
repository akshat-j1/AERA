import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './App';
import { getRouteSeo, getSeoUrls, buildSalonJsonLd } from './lib/seo';
import { loadRoutePage } from './lib/routePages';
import { getRoutePath, routePaths } from './lib/routePaths';
import { getMediaAsset, heroRoom } from './config/media.config';
import { studioConfig } from './config/studio.config';

export const prerenderConfig = {
  routePaths,
  siteUrl: studioConfig.seo.siteUrl,
  allowIndexing: Boolean(studioConfig.seo.siteUrl) && studioConfig.seo.allowIndexing && !studioConfig.whatsapp.demoMode,
};

export async function renderRoute(url: string) {
  const route = getRoutePath(url);
  const InitialPage = await loadRoutePage(route);
  const html = renderToString(
    <StaticRouter location={url}>
      <App initialRoute={route} InitialPage={InitialPage} />
    </StaticRouter>
  );

  const seo = getRouteSeo(url);
  const urls = getSeoUrls(seo);
  const jsonLd = route === '/404' ? null : buildSalonJsonLd();
  const heroSource = getMediaAsset(heroRoom.mediaId);
  const headTags = renderToStaticMarkup(
    <>
      {route === '/' && (
        <link rel="preload" as="image" type="image/avif" imageSrcSet={heroSource.avifSrcset}
          imageSizes={heroRoom.sizes} fetchPriority="high" />
      )}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {(!prerenderConfig.allowIndexing || route === '/404') && <meta name="robots" content="noindex, follow" />}
      {route !== '/404' && <>
        {urls && <link rel="canonical" href={urls.canonical} />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        {urls && <>
          <meta property="og:image" content={urls.image} />
          <meta property="og:url" content={urls.canonical} />
        </>}
        <meta name="twitter:card" content="summary_large_image" />
      </>}
    </>
  );

  return {
    html,
    headTags: jsonLd
      ? headTags + `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`
      : headTags,
    entranceBrand: renderToStaticMarkup(<>{studioConfig.brand.name}</>),
    entranceSubline: renderToStaticMarkup(<>{studioConfig.brand.entranceSubline}</>),
  };
}
