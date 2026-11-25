import { MapPin, Clock, ShieldCheck } from 'lucide-react';
import { studioConfig } from '../config/studio.config';
import { useStudio } from '../lib/StudioContext';
import { PageShell } from '../components/layout/PageShell';
import { StudioPicture } from '../components/layout/StudioPicture';

export function AboutPage() {
  const { openEnquiry, openWhatsappPreview } = useStudio();

  return (
    <PageShell
      eyebrow="About The Studio"
      titlePrefix="Crafted around"
      titleItalic="quiet hospitality & light."
      description="AERA is a fictional Bengaluru soft-luxury studio showcase designed to demonstrate spatial web storytelling and effortless client configurability."
      surface="porcelain"
    >
      <section className="py-14 md:py-20 bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-16">
          {/* Architectural + Material Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <h2 className="font-sculpt text-3xl font-semibold text-[#2D2328]">
                Why light matters more than glare.
              </h2>
              <p className="text-sm text-[#504348] leading-relaxed">
                Traditional salons often pair harsh halogen overhead spots with rushed turnaround times. Inside the AERA concept, north-facing sheer drapery, matte porcelain plaster, honed travertine consoles, and soft-lilac reflections ensure colour tones read cleanly before you ever step back outside.
              </p>
              <p className="text-sm text-[#504348] leading-relaxed">
                Every bottle on our vanity shelves prioritizes low-ammonia mineral colour chemistry, plant ceramides, and biodegradable botanical cleansers—with zero exaggerated claims, fake reviews, or synthetic shine.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openEnquiry({ sourceLabel: 'About Studio Page' })}
                  className="px-5 py-3 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.15em] cursor-pointer"
                >
                  Test Demo Request Flow
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsappPreview({
                      sourceLabel: 'Studio Location Page',
                    })
                  }
                  className="px-4 py-3 rounded-sm border border-[#504348]/35 text-xs text-[#2D2328] cursor-pointer"
                >
                  Preview Concierge Message
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-6 aspect-[2/3] rounded-sm overflow-hidden shadow-md">
                <StudioPicture mediaId="studio-courtyard" sizes="360px" className="w-full h-full" />
              </div>
              <div className="col-span-6 aspect-[3/4] rounded-sm overflow-hidden shadow-md">
                <StudioPicture mediaId="sanctuary-sunlit" sizes="360px" className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Bengaluru Showcase Coordinates & Hours */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-sm bg-[#F3EEF5] border border-[#C8B49D]/50 space-y-3">
              <MapPin className="w-5 h-5 text-[#504348]" />
              <h3 className="font-sculpt text-lg font-semibold text-[#2D2328]">
                Showcase Location (Fictional)
              </h3>
              <p className="text-xs text-[#504348] leading-relaxed">
                {studioConfig.location.addressLine1}
                <br />
                {studioConfig.location.addressLine2} {studioConfig.location.postalCode}
              </p>
              <p className="text-[11px] text-[#504348]/80">{studioConfig.location.directionsNote}</p>
            </div>

            <div className="p-6 rounded-sm bg-[#F3E6DF]/70 border border-[#C8B49D]/50 space-y-3">
              <Clock className="w-5 h-5 text-[#504348]" />
              <h3 className="font-sculpt text-lg font-semibold text-[#2D2328]">Studio Hours</h3>
              <div className="space-y-1.5 text-xs text-[#504348]">
                {studioConfig.location.hours.map((h) => (
                  <p key={h.days}>
                    <strong className="text-[#2D2328]">{h.days}:</strong> {h.hours}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-sm bg-[#F8F5F1] border border-[#C8B49D]/60 space-y-3">
              <ShieldCheck className="w-5 h-5 text-[#504348]" />
              <h3 className="font-sculpt text-lg font-semibold text-[#2D2328]">
                Reusability &amp; Honesty
              </h3>
              <p className="text-xs text-[#504348] leading-relaxed">
                Designed as a white-label-ready commercial foundation. Swapping brand details, verified WhatsApp numbers, local SEO schema flags, and photography happens entirely inside <code>src/config/*</code>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
