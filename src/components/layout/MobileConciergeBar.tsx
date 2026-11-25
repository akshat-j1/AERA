import { useStudio } from '../../lib/StudioContext';

export function MobileConciergeBar() {
  const { openEnquiry, openWhatsappPreview, entranceActive } = useStudio();

  if (entranceActive) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-[#FCFAF7]/95 backdrop-blur-md border-t border-[#D4BEB0]/65 px-4 py-2.5 flex items-center gap-2.5 shadow-[0_-4px_20px_rgba(44,34,30,0.08)]">
      <button
        type="button"
        onClick={() => openEnquiry({ sourceLabel: 'Mobile Quick Bar' })}
        className="flex-1 py-2.5 text-[11px] uppercase tracking-[0.14em] rounded-sm bg-[#493B36] text-[#FCFAF7] font-medium cursor-pointer"
      >
        Book Appointment
      </button>
      <button
        type="button"
        onClick={() =>
          openWhatsappPreview({
            sourceLabel: 'Mobile Concierge',
            preferredWindow: 'Flexible This Week',
          })
        }
        className="px-4 py-2.5 text-[11px] uppercase tracking-[0.12em] rounded-sm border border-[#874030]/45 bg-[#F4E5DA] text-[#2C221E] font-medium cursor-pointer"
      >
        WhatsApp
      </button>
    </div>
  );
}
