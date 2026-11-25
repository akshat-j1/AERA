import { useEffect } from 'react';
import { X, Sparkles, Clock, User } from 'lucide-react';
import { useStudio } from '../../lib/StudioContext';
import { salonServices } from '../../config/services.config';
import { artisans } from '../../config/team.config';
import { formatCurrency, formatDuration } from '../../lib/format';
import { StudioPicture } from '../layout/StudioPicture';

export function LookbookDossierDrawer() {
  const { selectedLook, closeLookbook, openEnquiry, openWhatsappPreview } = useStudio();

  useEffect(() => {
    if (!selectedLook) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLookbook();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedLook, closeLookbook]);

  if (!selectedLook) return null;

  const service = salonServices.find((s) => s.id === selectedLook.recommendedServiceId);
  const artisan = artisans.find((a) => a.id === selectedLook.recommendedArtisanId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lookbook-dossier-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#2C221E]/45 backdrop-blur-xs"
      onClick={closeLookbook}
    >
      <div
        className="w-full max-w-md h-full bg-[#FCFAF7] text-[#2C221E] border-l border-[#D4BEB0] overflow-y-auto p-6 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-[#D4BEB0]/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#874030]">
                Look {selectedLook.indexCode}
              </span>
              <span className="px-2.5 py-0.5 text-[10px] rounded-full bg-[#F4E5DA] text-[#493B36]">
                {selectedLook.mood}
              </span>
            </div>
            <button
              type="button"
              onClick={closeLookbook}
              aria-label="Close lookbook details"
              className="p-1.5 rounded-sm border border-[#D4BEB0] hover:bg-[#F4E5DA] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="aspect-[3/4] max-h-72 w-full rounded-sm overflow-hidden border border-[#D4BEB0]/60">
            <StudioPicture
              mediaId={selectedLook.mediaId}
              objectPosition={selectedLook.imagePosition}
              sizes="420px"
              className="w-full h-full"
            />
          </div>

          <div className="space-y-2">
            <h2 id="lookbook-dossier-title" className="font-editorial text-2xl font-medium">
              {selectedLook.title}
            </h2>
            <p className="text-xs text-[#493B36] leading-relaxed">{selectedLook.summary}</p>
          </div>

          <div className="p-4 rounded-sm bg-[#F4E5DA]/75 border border-[#D4BEB0]/60 space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#874030] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#493B36]/80">
                  Recommended Service
                </p>
                <p className="font-medium text-[#2C221E]">{service?.name ?? selectedLook.title}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <User className="w-4 h-4 text-[#874030] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#493B36]/80">
                  Stylist
                </p>
                <p className="font-medium text-[#2C221E]">
                  {artisan ? `${artisan.name} · ${artisan.role}` : 'Senior Salon Stylist'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#874030] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#493B36]/80">
                  Estimated Time &amp; Price
                </p>
                <p className="font-medium text-[#2C221E] tabular">
                  {formatDuration(selectedLook.durationMinutes)} · From{' '}
                  {formatCurrency(selectedLook.startingPriceInr)}
                </p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#493B36] border-l-2 border-[#B76E5D] pl-3 leading-relaxed">
            {selectedLook.careNote}
          </p>
        </div>

        <div className="pt-6 space-y-2.5 border-t border-[#D4BEB0]/60 mt-6">
          <button
            type="button"
            onClick={() =>
              openEnquiry({
                serviceId: selectedLook.recommendedServiceId,
                artisanId: selectedLook.recommendedArtisanId,
                lookId: selectedLook.id,
                sourceLabel: `Lookbook — ${selectedLook.title}`,
              })
            }
            className="w-full py-3 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#874030] transition-colors cursor-pointer"
          >
            Book This Look →
          </button>

          <button
            type="button"
            onClick={() => {
              closeLookbook();
              openWhatsappPreview({
                sourceLabel: `Lookbook: ${selectedLook.title}`,
                ritualName: service?.name,
                artisanName: artisan?.name,
              });
            }}
            className="w-full py-2.5 rounded-sm border border-[#493B36]/35 text-xs text-[#2C221E] hover:bg-[#F4E5DA] transition-colors cursor-pointer"
          >
            Message on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
