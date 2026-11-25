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
      className="fixed inset-0 z-50 flex justify-end bg-[#2D2328]/40 backdrop-blur-xs"
      onClick={closeLookbook}
    >
      <div
        className="w-full max-w-md h-full bg-[#F8F5F1] text-[#2D2328] border-l border-[#C8B49D]/60 overflow-y-auto p-6 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-[#C8B49D]/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#504348]">
                {selectedLook.indexCode}
              </span>
              <span className="px-2 py-0.5 text-[10px] rounded bg-[#E6DDEB] text-[#504348]">
                {selectedLook.mood}
              </span>
            </div>
            <button
              type="button"
              onClick={closeLookbook}
              aria-label="Close lookbook dossier"
              className="p-1.5 rounded-sm border border-[#C8B49D]/60 hover:bg-[#E6DDEB]/40 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="aspect-[3/4] max-h-72 w-full rounded-sm overflow-hidden border border-[#C8B49D]/40">
            <StudioPicture
              mediaId={selectedLook.mediaId}
              objectPosition={selectedLook.imagePosition}
              sizes="420px"
              className="w-full h-full"
            />
          </div>

          <div className="space-y-2">
            <h2 id="lookbook-dossier-title" className="font-sculpt text-2xl font-semibold">
              {selectedLook.title}
            </h2>
            <p className="text-xs text-[#504348] leading-relaxed">{selectedLook.summary}</p>
          </div>

          <div className="p-4 rounded-sm bg-[#F3EEF5] border border-[#C8B49D]/45 space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#504348] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#504348]/75">Recommended Ritual</p>
                <p className="font-medium text-[#2D2328]">{service?.name ?? selectedLook.title}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <User className="w-4 h-4 text-[#504348] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#504348]/75">Specialist Match</p>
                <p className="font-medium text-[#2D2328]">
                  {artisan ? `${artisan.name} · ${artisan.role}` : 'Lead Studio Specialist'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#504348] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#504348]/75">Chair Time &amp; Starting Investment</p>
                <p className="font-medium text-[#2D2328] tabular">
                  {formatDuration(selectedLook.durationMinutes)} · From {formatCurrency(selectedLook.startingPriceInr)}
                </p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#504348]/90 italic border-l-2 border-[#D5B4B8] pl-3">
            {selectedLook.careNote}
          </p>
        </div>

        <div className="pt-6 space-y-2.5 border-t border-[#C8B49D]/40 mt-6">
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
            className="w-full py-3 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#3A2E33] transition-colors cursor-pointer"
          >
            Pre-fill Demo Request →
          </button>
          <button
            type="button"
            onClick={() => {
              closeLookbook();
              openWhatsappPreview({
                sourceLabel: `Lookbook (${selectedLook.indexCode})`,
                ritualName: `${selectedLook.title} — ${service?.name ?? ''}`,
                artisanName: artisan?.name,
              });
            }}
            className="w-full py-2.5 rounded-sm border border-[#504348]/35 text-[#2D2328] text-xs hover:bg-[#E6DDEB]/45 transition-colors cursor-pointer"
          >
            Preview WhatsApp Concierge Message
          </button>
        </div>
      </div>
    </div>
  );
}
