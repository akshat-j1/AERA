import { MapPin, Clock, Sparkles } from 'lucide-react';
import { studioConfig } from '../config/studio.config';
import { useStudio } from '../lib/StudioContext';
import { PageShell } from '../components/layout/PageShell';
import { StudioPicture } from '../components/layout/StudioPicture';

export function AboutPage() {
  const { openEnquiry, openWhatsappPreview } = useStudio();

  return (
    <PageShell
      eyebrow="Our Studio"
      titlePrefix="A calm salon"
      titleAccent="in Indiranagar."
      description="Thoughtfully designed around true window daylight, unhurried chairs, and low-toxicity hair and skin rituals suited to daily life."
      surface="porcelain"
    >
      <section className="py-14 md:py-20 bg-[#FAF8F7]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <h2 className="font-campaign text-3xl md:text-4xl font-bold text-[#2A2128]">
                Why daylight matters more than spotlights.
              </h2>
              <p className="text-sm text-[#493D46] leading-relaxed">
                Cool overhead ceiling lighting distorts natural undertones and masks uneven texture. Inside AERA, sheer linen daylight windows and travertine mirrors let stylists balance colour and layers honestly as you wear them outdoors.
              </p>
              <p className="text-sm text-[#493D46] leading-relaxed">
                Our care blends eliminate harsh ammonia fumes and sticky waxes—focusing on bond integrity, relaxed scalp health, and calm facial sculpting.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openEnquiry({ sourceLabel: 'Our Studio Page' })}
                  className="px-6 py-3 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs uppercase tracking-[0.15em] hover:bg-[#844D60] transition-colors cursor-pointer"
                >
                  Book a Visit
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsappPreview({
                      sourceLabel: 'Studio Location Page',
                    })
                  }
                  className="px-4 py-3 rounded-full border border-[#DCD2D8] text-xs text-[#2A2128] hover:bg-[#E7DFEB] cursor-pointer"
                >
                  Message on WhatsApp
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-end">
              <div className="col-span-7 aspect-[16/11] rounded-sm overflow-hidden shadow-md border border-[#DCD2D8]">
                <StudioPicture mediaId="studio-aisle-daylight" sizes="440px" className="w-full h-full" />
              </div>
              <div className="col-span-5 aspect-[2/3] rounded-t-[140px] rounded-b-sm overflow-hidden shadow-md border border-[#DCD2D8]">
                <StudioPicture mediaId="studio-courtyard" sizes="320px" className="w-full h-full" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-sm bg-[#E7DFEB]/50 border border-[#DCD2D8] space-y-3">
              <MapPin className="w-5 h-5 text-[#844D60]" />
              <h3 className="font-campaign text-lg font-bold text-[#2A2128]">Salon Address</h3>
              <p className="text-xs text-[#493D46] leading-relaxed">
                {studioConfig.location.addressLine1}
                <br />
                {studioConfig.location.addressLine2} {studioConfig.location.postalCode}
              </p>
              <p className="text-[11px] text-[#493D46]/85">{studioConfig.location.directionsNote}</p>
              <p className="text-[11px] text-[#493D46]/85">Example address for this fictional studio.</p>
            </div>

            <div className="p-6 rounded-sm bg-[#F2EEF1] border border-[#DCD2D8] space-y-3">
              <Clock className="w-5 h-5 text-[#844D60]" />
              <h3 className="font-campaign text-lg font-bold text-[#2A2128]">Opening Hours</h3>
              <div className="space-y-1.5 text-xs text-[#493D46]">
                {studioConfig.location.hours.map((h) => (
                  <p key={h.days}>
                    <strong className="text-[#2A2128]">{h.days}:</strong> {h.hours}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-sm bg-[#FAF8F7] border border-[#DCD2D8] space-y-3">
              <Sparkles className="w-5 h-5 text-[#844D60]" />
              <h3 className="font-campaign text-lg font-bold text-[#2A2128]">Unisex &amp; Welcome</h3>
              <p className="text-xs text-[#493D46] leading-relaxed">
                Open to all hair types and textures across precision cuts, custom colour, facial rituals, and Indian bridal styling.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
