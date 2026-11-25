import { useStudio } from '../../lib/StudioContext';

export function MobileConciergeBar() {
  const { openEnquiry, openWhatsappPreview, entranceActive } = useStudio();

  if (entranceActive) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-[#F8F5F1]/95 backdrop-blur-md border-t border-[#C8B49D]/55 px-4 py-2.5 flex items-center gap-2.5 shadow-[0_-4px_20px_rgba(45,35,40,0.06)]">
      <button
        type="button"
        onClick={() => openEnquiry({ sourceLabel: 'Mobile Sticky Concierge' })}
        className="flex-1 py-2.5 text-[11px] uppercase tracking-[0.14em] rounded-sm bg-[#504348] text-[#F8F5F1] font-medium"
      >
        Demo Request
      </button>
      <button
        type="button"
        onClick={() =>
          openWhatsappPreview({
            sourceLabel: 'Mobile Sticky Bar',
            preferredWindow: 'Flexible This Week',
          })
        }
        className="px-3.5 py-2.5 text-[11px] uppercase tracking-[0.12em] rounded-sm border border-[#504348]/35 bg-[#E6DDEB]/55 text-[#2D2328]"
      >
        WhatsApp Preview
      </button>
    </div>
  );
}
