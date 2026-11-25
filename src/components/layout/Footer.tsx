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
    <footer className="bg-[#F2EEF1] text-[#2A2128] border-t border-[#DCD2D8] pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Salon Identity */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="font-campaign text-base font-bold tracking-[0.28em] text-[#2A2128]">
              {studioConfig.brand.wordmark}
            </Link>
            <p className="text-sm text-[#493D46] leading-relaxed max-w-sm">
              {studioConfig.brand.tagline}
            </p>
            <button
              type="button"
              onClick={handleReplayEntrance}
              className="inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.15em] rounded-full border border-[#493D46]/35 bg-[#FAF8F7] text-[#2A2128] hover:border-[#844D60] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#844D60]" />
              Replay Salon Entrance
            </button>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#844D60]">Explore</p>
            <ul className="space-y-2 text-xs text-[#2A2128]">
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
                <Link to="/enquire" className="hover:underline underline-offset-4">Book Appointment</Link>
              </li>
            </ul>
          </div>

          {/* Salon Address & Hours */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#844D60]">Salon &amp; Hours</p>
            <div className="text-xs text-[#493D46] space-y-1 leading-relaxed">
              <p className="font-medium text-[#2A2128]">
                {studioConfig.locale.neighborhood}, {studioConfig.locale.city}
              </p>
              <p>{studioConfig.location.addressLine1}</p>
              <p>
                {studioConfig.location.addressLine2} {studioConfig.location.postalCode}
              </p>
            </div>
            <div className="pt-2 space-y-1 text-xs text-[#493D46]">
              {studioConfig.location.hours.map((h) => (
                <p key={h.days}>
                  <span className="text-[#2A2128] font-medium">{h.days}:</span> {h.hours}
                </p>
              ))}
            </div>
          </div>

          {/* Direct Booking & WhatsApp */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#844D60]">Appointments</p>
            <p className="text-xs text-[#493D46] leading-relaxed">
              Schedule your consultation online or compose a formatted WhatsApp inquiry directly.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => openEnquiry({ sourceLabel: 'Footer Booking' })}
                className="px-4 py-2.5 text-xs rounded-full bg-[#493D46] text-[#FAF8F7] text-center hover:bg-[#844D60] transition-colors cursor-pointer"
              >
                Book a Visit →
              </button>
              <button
                type="button"
                onClick={() =>
                  openWhatsappPreview({
                    sourceLabel: 'Salon Inquiry',
                    preferredWindow: 'Weekday Morning (10:30 – 13:30)',
                  })
                }
                className="px-4 py-2.5 text-xs rounded-full border border-[#493D46]/35 bg-[#FAF8F7]/80 text-[#2A2128] text-center hover:bg-[#FAF8F7] transition-colors cursor-pointer"
              >
                Message on WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Single Discreet Portfolio Showcase Disclosure */}
        <div className="pt-6 border-t border-[#DCD2D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-[#493D46]">
          <p>{studioConfig.brand.footerDisclosure}</p>
          <p className="shrink-0">{studioConfig.brand.fullName} · {studioConfig.locale.city}</p>
        </div>
      </div>
    </footer>
  );
}
