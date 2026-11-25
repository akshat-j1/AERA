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
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { TeamPage } from './pages/TeamPage';
import { BridalPage } from './pages/BridalPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { EnquirePage } from './pages/EnquirePage';

export function App() {
  return (
    <StudioProvider>
      <SmoothScrollProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#504348] focus:text-[#F8F5F1] focus:rounded-sm focus:text-xs"
        >
          Skip to main content
        </a>

        <Header />
        <SilkVeilTransition />

        <main id="main-content" className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/bridal" element={<BridalPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/enquire" element={<EnquirePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
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
