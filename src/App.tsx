import { Suspense, type ComponentType } from 'react';
import { Route, Routes } from 'react-router-dom';
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

interface AppProps {
  initialRoute: RoutePath;
  InitialPage: ComponentType;
}

export function App({ initialRoute, InitialPage }: AppProps) {
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
