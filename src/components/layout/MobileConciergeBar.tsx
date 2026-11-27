import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStudio } from '../../lib/StudioContext';

export function MobileConciergeBar() {
  const { openEnquiry, openWhatsappPreview, entranceActive } = useStudio();
  const { pathname } = useLocation();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 440);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (entranceActive || pathname === '/enquire') return null;
  if (pathname === '/' && !pastHero) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-[#FCFAFA]/95 backdrop-blur-md border-t border-[#DED2DA] px-4 py-2.5 flex items-center gap-2.5 shadow-[0_-4px_20px_rgba(42,32,40,0.08)]">
      <button
        type="button"
        onClick={() => openEnquiry({ sourceLabel: 'Mobile Quick Bar' })}
        className="flex-1 py-2.5 text-[11px] uppercase tracking-[0.14em] rounded-full bg-[#40343D] text-[#FCFAFA] font-medium cursor-pointer"
      >
        Book a Visit
      </button>
      <button
        type="button"
        onClick={() =>
          openWhatsappPreview({
            sourceLabel: 'Mobile Concierge',
            preferredWindow: 'Flexible This Week',
          })
        }
        className="px-4 py-2.5 text-[11px] uppercase tracking-[0.12em] rounded-full border border-[#7B4A60]/45 bg-[#E8DFED] text-[#2A2028] font-medium cursor-pointer"
      >
        WhatsApp
      </button>
    </div>
  );
}
