import { Link, useNavigate } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { studioConfig } from '../../config/studio.config';
import { useStudio } from '../../lib/StudioContext';

export function Footer() {
  const { openEnquiry, openWhatsappPreview, triggerEntranceReplay } = useStudio();
  const navigate = useNavigate();

  const handleReplayEntrance = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'auto' });
    triggerEntranceReplay();
  };

  return (
    <footer className="bg-[#F3EEF5] text-[#2D2328] border-t border-[#C8B49D]/45 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Studio Identity */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="font-sculpt text-base font-semibold tracking-[0.28em]">
              {studioConfig.brand.wordmark}
            </Link>
            <p className="text-sm text-[#504348] leading-relaxed max-w-sm">
              {studioConfig.brand.tagline}
            </p>
            <button
              type="button"
              onClick={handleReplayEntrance}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-[11px] uppercase tracking-[0.15em] rounded-sm border border-[#504348]/30 bg-[#F8F5F1]/75 text-[#2D2328] hover:bg-[#F8F5F1] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Replay Salon Entrance
            </button>
          </div>

          {/* Directory Routes */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#504348]/75">Directory</p>
            <ul className="space-y-2 text-xs text-[#2D2328]">
              <li>
                <Link to="/" className="hover:underline underline-offset-4">Home</Link>
              </li>
              {studioConfig.navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:underline underline-offset-4">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/enquire" className="hover:underline underline-offset-4">Demo Request</Link>
              </li>
            </ul>
          </div>

          {/* Bengaluru Concept Coordinates */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#504348]/75">Showcase Location</p>
            <div className="text-xs text-[#504348] space-y-1 leading-relaxed">
              <p className="font-medium text-[#2D2328]">{studioConfig.locale.neighborhood}, {studioConfig.locale.city}</p>
              <p>{studioConfig.location.addressLine1}</p>
              <p>{studioConfig.location.addressLine2} {studioConfig.location.postalCode}</p>
            </div>
            <div className="pt-2 space-y-1 text-xs text-[#504348]">
              {studioConfig.location.hours.map((h) => (
                <p key={h.days}>
                  <span className="text-[#2D2328]">{h.days}:</span> {h.hours}
                </p>
              ))}
            </div>
          </div>

          {/* Concierge Actions */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#504348]/75">Demo Concierge</p>
            <p className="text-xs text-[#504348] leading-relaxed">
              Preview consultative requests or inspect generated WhatsApp concierge messages prior to live client configuration.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => openEnquiry({ sourceLabel: 'Footer Concierge' })}
                className="px-4 py-2.5 text-xs rounded-sm bg-[#504348] text-[#F8F5F1] text-left hover:bg-[#3A2E33] transition-colors cursor-pointer"
              >
                Open Demo Request Drawer →
              </button>
              <button
                type="button"
                onClick={() =>
                  openWhatsappPreview({
                    sourceLabel: 'Footer Concierge Preview',
                    preferredWindow: 'Weekday Morning (10:30 – 13:30)',
                  })
                }
                className="px-4 py-2.5 text-xs rounded-sm border border-[#504348]/35 text-[#2D2328] text-left hover:bg-[#F8F5F1]/70 transition-colors cursor-pointer"
              >
                Preview WhatsApp Payload
              </button>
            </div>
          </div>
        </div>

        {/* Honest Showcase Disclaimer Bar */}
        <div className="pt-6 border-t border-[#C8B49D]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-[#504348]">
          <p>{studioConfig.brand.demoNotice}</p>
          <p className="shrink-0">{studioConfig.brand.fullName} · Portfolio Showcase</p>
        </div>
      </div>
    </footer>
  );
}
