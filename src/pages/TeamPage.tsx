import { studioConfig } from '../config/studio.config';
import { artisans } from '../config/team.config';
import { mirrorPillars } from '../config/services.config';
import { formatCurrency } from '../lib/format';
import { useStudio } from '../lib/StudioContext';
import { PageShell } from '../components/layout/PageShell';
import { StudioPicture } from '../components/layout/StudioPicture';

export function TeamPage() {
  const { openEnquiry, openWhatsappPreview } = useStudio();

  return (
    <PageShell
      eyebrow="Meet Our Stylists"
      titlePrefix="Experienced hands,"
      titleAccent="welcoming care."
      description={`Every ${studioConfig.brand.name} specialist works unhurriedly by window light—pairing technical precision with thoughtful listening.`}
      surface="porcelain"
    >
      <section className="py-14 md:py-20 bg-[#FCFAFA]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-16">
          {artisans.map((artisan, idx) => {
            const pillar = mirrorPillars.find((m) => m.id === artisan.pillarId);
            const reverse = idx % 2 === 1;
            return (
              <article
                key={artisan.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-14 border-b border-[#DED2DA] last:border-b-0"
              >
                <div className={`lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`}>
                  <div className="relative max-w-md mx-auto">
                    <div className="aspect-[3/4] rounded-sm overflow-hidden border border-[#DED2DA] shadow-sm bg-[#F5F0F3]">
                      <StudioPicture
                        mediaId={artisan.mediaId}
                        objectPosition={artisan.imagePosition}
                        sizes="(max-width: 1024px) 90vw, 440px"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-7 space-y-5 ${reverse ? 'lg:order-1' : ''}`}>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#7B4A60] font-semibold">
                    <span>
                      0{idx + 1} · {pillar?.title}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E8DFED] text-[#40343D]">
                      {artisan.experienceYears} Years Experience
                    </span>
                  </div>

                  <div>
                    <h2 className="font-campaign text-3xl md:text-4xl font-bold text-[#2A2028]">
                      {artisan.name}
                    </h2>
                    <p className="text-sm font-medium text-[#40343D] mt-1">{artisan.role}</p>
                  </div>

                  <blockquote className="font-whisper text-xl md:text-2xl text-[#2A2028] leading-relaxed border-l-2 border-[#98647A] pl-4">
                    “{artisan.quote}”
                  </blockquote>

                  <div className="flex flex-wrap gap-2">
                    {artisan.specialties.map((sp) => (
                      <span
                        key={sp}
                        className="px-3.5 py-1 rounded-full bg-[#F5F0F3] text-xs text-[#2A2028]"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry({
                          artisanId: artisan.id,
                          sourceLabel: `Stylist Profile — ${artisan.name}`,
                        })
                      }
                      className="px-6 py-3 rounded-full bg-[#40343D] text-[#FCFAFA] text-xs uppercase tracking-[0.15em] hover:bg-[#7B4A60] transition-colors cursor-pointer"
                    >
                      Book with {artisan.name.split(' ')[0]} →
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsappPreview({
                          sourceLabel: `Stylist Request (${artisan.name})`,
                          artisanName: artisan.name,
                        })
                      }
                      className="px-4 py-3 rounded-sm border border-[#DED2DA] text-xs text-[#2A2028] hover:border-[#7B4A60]/55 hover:bg-[#F5F0F3] cursor-pointer"
                    >
                      Message on WhatsApp
                    </button>
                    <span className="text-xs text-[#40343D] tabular">
                      Appointments from {formatCurrency(artisan.consultationTierInr)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
