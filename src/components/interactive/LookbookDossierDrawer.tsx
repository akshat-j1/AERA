import { StudioDialog } from '../layout/StudioDialog';
import { X, Sparkles, Clock, User } from 'lucide-react';
import { useStudio } from '../../lib/StudioContext';
import { salonServices } from '../../config/services.config';
import { artisans } from '../../config/team.config';
import { formatCurrency, formatDuration } from '../../lib/format';
import { StudioPicture } from '../layout/StudioPicture';

export function LookbookDossierDrawer() {
  const { selectedLook, closeLookbook, openEnquiry, openWhatsappPreview } = useStudio();


  if (!selectedLook) return null;

  const service = salonServices.find((s) => s.id === selectedLook.recommendedServiceId);
  const artisan = artisans.find((a) => a.id === selectedLook.recommendedArtisanId);

  return (
    <StudioDialog
      labelledBy="lookbook-dossier-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#2A2028]/45 backdrop-blur-xs"
      onDismiss={closeLookbook}
      dismissOnBackdrop
    >
      <div
        className="w-full max-w-md h-full bg-[#FCFAFA] text-[#2A2028] border-l border-[#DED2DA] overflow-y-auto p-6 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-[#DED2DA] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7B4A60]">
                Look {selectedLook.indexCode}
              </span>
              <span className="px-2.5 py-0.5 text-[10px] rounded-full bg-[#E8DFED] text-[#40343D]">
                {selectedLook.mood}
              </span>
            </div>
            <button
              type="button"
              onClick={closeLookbook}
            data-dialog-initial-focus
              aria-label="Close lookbook details"
              className="p-1.5 rounded-sm border border-[#DED2DA] hover:bg-[#E8DFED] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="aspect-[3/4] max-h-72 w-full rounded-sm overflow-hidden border border-[#DED2DA]">
            <StudioPicture
              mediaId={selectedLook.mediaId}
              objectPosition={selectedLook.imagePosition}
              sizes="420px"
              className="w-full h-full"
            />
          </div>

          <div className="space-y-2">
            <h2 id="lookbook-dossier-title" className="font-campaign text-2xl font-bold">
              {selectedLook.title}
            </h2>
            <p className="text-xs text-[#40343D] leading-relaxed">{selectedLook.summary}</p>
          </div>

          <div className="p-4 rounded-sm bg-[#F5F0F3] border border-[#DED2DA] space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#7B4A60] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#40343D]/80">
                  Recommended Service
                </p>
                <p className="font-medium text-[#2A2028]">{service?.name ?? selectedLook.title}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <User className="w-4 h-4 text-[#7B4A60] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#40343D]/80">
                  Stylist
                </p>
                <p className="font-medium text-[#2A2028]">
                  {artisan ? `${artisan.name} · ${artisan.role}` : 'Senior Salon Stylist'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#7B4A60] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#40343D]/80">
                  Estimated Time &amp; Price
                </p>
                <p className="font-medium text-[#2A2028] tabular">
                  {formatDuration(selectedLook.durationMinutes)} · From{' '}
                  {formatCurrency(selectedLook.startingPriceInr)}
                </p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#40343D] border-l-2 border-[#98647A] pl-3 leading-relaxed">
            {selectedLook.careNote}
          </p>
        </div>

        <div className="pt-6 space-y-2.5 border-t border-[#DED2DA] mt-6">
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
            className="w-full py-3 rounded-full bg-[#40343D] text-[#FCFAFA] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#7B4A60] transition-colors cursor-pointer"
          >
            Book This Look →
          </button>

          <button
            type="button"
            onClick={() => {
              openWhatsappPreview({
                sourceLabel: `Lookbook: ${selectedLook.title}`,
                ritualName: service?.name,
                artisanName: artisan?.name,
              });
            }}
            className="w-full py-2.5 rounded-full border border-[#40343D]/35 text-xs text-[#2A2028] hover:bg-[#E8DFED] transition-colors cursor-pointer"
          >
            Message on WhatsApp
          </button>
        </div>
      </div>
    </StudioDialog>
  );
}
