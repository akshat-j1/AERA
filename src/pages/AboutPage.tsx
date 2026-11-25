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
      titlePrefix="A calmer salon"
      titleAccent="in the heart of Indiranagar."
      description="Designed around soft daylight, unhurried chairs, and gentle hair and skin care that fits naturally into your everyday routine."
      surface="white"
    >
      <section className="py-14 md:py-20 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-16">
          {/* Salon Environment Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <h2 className="font-editorial text-3xl md:text-4xl font-medium text-[#2C221E]">
                Why daylight matters more than bright spotlights.
              </h2>
              <p className="text-sm text-[#493B36] leading-relaxed">
                Many salons use cool artificial ceiling lights that distort hair colour tones. At AERA, tall sheer linen windows and honed travertine mirrors keep natural skin tones and subtle colour shades balanced—so what looks right in your chair looks right outdoors too.
              </p>
              <p className="text-sm text-[#493B36] leading-relaxed">
                Our formulas avoid heavy harsh fumes and silicones, focusing on bond health during lightening, scalp comfort, and restorative lymphatic skincare rituals.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openEnquiry({ sourceLabel: 'Our Studio Page' })}
                  className="px-6 py-3 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs uppercase tracking-[0.15em] hover:bg-[#874030] transition-colors cursor-pointer"
                >
                  Book an Appointment
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsappPreview({
                      sourceLabel: 'Studio Location Page',
                    })
                  }
                  className="px-4 py-3 rounded-sm border border-[#D4BEB0] text-xs text-[#2C221E] hover:bg-[#F4E5DA] cursor-pointer"
                >
                  Message on WhatsApp
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-end">
              <div className="col-span-7 aspect-[16/11] rounded-sm overflow-hidden shadow-md border border-[#D4BEB0]">
                <StudioPicture mediaId="studio-aisle-daylight" sizes="440px" className="w-full h-full" />
              </div>
              <div className="col-span-5 aspect-[2/3] rounded-t-[140px] rounded-b-sm overflow-hidden shadow-md border border-[#D4BEB0]">
                <StudioPicture mediaId="studio-courtyard" sizes="320px" className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Bengaluru Coordinates & Hours */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-sm bg-[#F4E5DA] border border-[#D4BEB0] space-y-3">
              <MapPin className="w-5 h-5 text-[#874030]" />
              <h3 className="font-sculpt text-lg font-semibold text-[#2C221E]">Salon Address</h3>
              <p className="text-xs text-[#493B36] leading-relaxed">
                {studioConfig.location.addressLine1}
                <br />
                {studioConfig.location.addressLine2} {studioConfig.location.postalCode}
              </p>
              <p className="text-[11px] text-[#493B36]/85">{studioConfig.location.directionsNote}</p>
            </div>

            <div className="p-6 rounded-sm bg-[#EFE0D5] border border-[#D4BEB0] space-y-3">
              <Clock className="w-5 h-5 text-[#874030]" />
              <h3 className="font-sculpt text-lg font-semibold text-[#2C221E]">Opening Hours</h3>
              <div className="space-y-1.5 text-xs text-[#493B36]">
                {studioConfig.location.hours.map((h) => (
                  <p key={h.days}>
                    <strong className="text-[#2C221E]">{h.days}:</strong> {h.hours}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-sm bg-[#FCFAF7] border border-[#D4BEB0] space-y-3">
              <Sparkles className="w-5 h-5 text-[#874030]" />
              <h3 className="font-sculpt text-lg font-semibold text-[#2C221E]">Unisex &amp; Welcome</h3>
              <p className="text-xs text-[#493B36] leading-relaxed">
                Open to all hair types and textures across cuts, bespoke colour, restorative facials, and Indian bridal styling.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
