import { Suspense, useEffect, type ComponentType } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { StudioProvider } from './lib/StudioContext';
import { SmoothScrollProvider } from './lib/SmoothScrollProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SilkVeilTransition } from './components/layout/SilkVeilTransition';
import { MobileConciergeBar } from './components/layout/MobileConciergeBar';
import { LookbookDossierDrawer } from './components/interactive/LookbookDossierDrawer';
import { EnquiryDrawer } from './components/interactive/EnquiryDrawer';
import { WhatsappPreviewModal } from './components/interactive/WhatsappPreviewModal';
import { lazyPages } from './lib/routePages';
import { routePaths, type RoutePath } from './lib/routePaths';
import { getRouteSeo, getSeoUrls } from './lib/seo';
import { studioConfig } from './config/studio.config';

interface AppProps {
  initialRoute: RoutePath;
  InitialPage: ComponentType;
}

export function App({ initialRoute, InitialPage }: AppProps) {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = getRouteSeo(pathname);
    const urls = getSeoUrls(seo);
    const found = seo.path !== '/404';
    const indexable = found && studioConfig.seo.siteUrl && studioConfig.seo.allowIndexing &&
      !studioConfig.whatsapp.demoMode;
    document.title = seo.title;

    function setMeta(attribute: 'name' | 'property', key: string, content?: string) {
      const current = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (content === undefined) {
        current?.remove();
        return;
      }
      const element = current ?? document.createElement('meta');
      element.setAttribute(attribute, key);
      element.content = content;
      if (!current) document.head.append(element);
    }

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (urls) {
      const element = canonical ?? document.createElement('link');
      element.rel = 'canonical';
      element.href = urls.canonical;
      if (!canonical) document.head.append(element);
    } else {
      canonical?.remove();
    }
    setMeta('name', 'description', seo.description);
    setMeta('name', 'robots', indexable ? undefined : 'noindex, follow');
    setMeta('name', 'twitter:card', found ? 'summary_large_image' : undefined);
    setMeta('property', 'og:type', found ? 'website' : undefined);
    setMeta('property', 'og:title', found ? seo.title : undefined);
    setMeta('property', 'og:description', found ? seo.description : undefined);
    setMeta('property', 'og:url', urls?.canonical);
    setMeta('property', 'og:image', urls?.image);
  }, [pathname]);

  function pageElement(path: RoutePath) {
    const Page = path === initialRoute ? InitialPage : lazyPages.get(path)!;
    return <Page />;
  }

  return (
    <StudioProvider>
      <SmoothScrollProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#40343D] focus:text-[#FCFAFA] focus:rounded-sm focus:text-xs"
        >
          Skip to main content
        </a>

        <Header />
        <SilkVeilTransition />

        <main id="main-content" tabIndex={-1} className="min-h-screen">
          <Suspense fallback={<p role="status" className="sr-only">Loading page…</p>}>
            <Routes>
              {routePaths.flatMap((path) => {
                const index = `${path === '/' ? '' : path}/index.html`;
                return [
                  <Route key={path} caseSensitive path={path} element={pageElement(path)} />,
                  <Route key={index} caseSensitive path={index} element={pageElement(path)} />,
                ];
              })}
              <Route path="*" element={pageElement('/404')} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <MobileConciergeBar />
        <LookbookDossierDrawer />
        <EnquiryDrawer />
        <WhatsappPreviewModal />
      </SmoothScrollProvider>
    </StudioProvider>
  );
}
