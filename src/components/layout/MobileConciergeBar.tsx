import { useStudio } from '../../lib/StudioContext';

export function MobileConciergeBar() {
  const { openEnquiry, openWhatsappPreview, entranceActive } = useStudio();

  if (entranceActive) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-[#FAF8F7]/95 backdrop-blur-md border-t border-[#DCD2D8] px-4 py-2.5 flex items-center gap-2.5 shadow-[0_-4px_20px_rgba(42,33,40,0.08)]">
      <button
        type="button"
        onClick={() => openEnquiry({ sourceLabel: 'Mobile Quick Bar' })}
        className="flex-1 py-2.5 text-[11px] uppercase tracking-[0.14em] rounded-full bg-[#493D46] text-[#FAF8F7] font-medium cursor-pointer"
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
        className="px-4 py-2.5 text-[11px] uppercase tracking-[0.12em] rounded-full border border-[#844D60]/45 bg-[#E7DFEB] text-[#2A2128] font-medium cursor-pointer"
      >
        WhatsApp
      </button>
    </div>
  );
}
