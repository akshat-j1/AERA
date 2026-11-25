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
      eyebrow="The Studio Artisans"
      titlePrefix="Specialists shaped by"
      titleItalic="light, form & patience."
      description="Each AERA specialist leads one dedicated discipline—ensuring unhurried attention from diagnostic consultation through final finish."
      surface="porcelain"
    >
      <section className="py-14 md:py-20 bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-16">
          {artisans.map((artisan, idx) => {
            const pillar = mirrorPillars.find((m) => m.id === artisan.pillarId);
            const reverse = idx % 2 === 1;
            return (
              <article
                key={artisan.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-14 border-b border-[#C8B49D]/40 last:border-b-0"
              >
                <div className={`lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`}>
                  <div className="relative max-w-md mx-auto">
                    <div
                      className={`hidden sm:block absolute -inset-3 rounded-sm ${
                        idx % 2 === 0 ? 'bg-[#E6DDEB]' : 'bg-[#F3E6DF]'
                      }`}
                      aria-hidden="true"
                    />
                    <div className="relative aspect-[3/4] rounded-sm overflow-hidden border-2 border-[#F8F5F1] shadow-md">
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
                  <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#504348]">
                    <span>0{idx + 1} · {pillar?.title}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E6DDEB]/70">
                      {artisan.experienceYears} Years Practice
                    </span>
                  </div>

                  <div>
                    <h2 className="font-sculpt text-3xl md:text-4xl font-semibold text-[#2D2328]">
                      {artisan.name}
                    </h2>
                    <p className="text-sm font-medium text-[#504348] mt-1">{artisan.role}</p>
                  </div>

                  <blockquote className="font-whisper text-xl md:text-2xl text-[#2D2328]/90 leading-relaxed border-l-2 border-[#D5B4B8] pl-4">
                    “{artisan.quote}”
                  </blockquote>

                  <div className="flex flex-wrap gap-2">
                    {artisan.specialties.map((sp) => (
                      <span
                        key={sp}
                        className="px-3 py-1 rounded-full bg-[#F3EEF5] border border-[#C8B49D]/45 text-xs text-[#2D2328]"
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
                          sourceLabel: `Artisan Profile — ${artisan.name}`,
                        })
                      }
                      className="px-5 py-3 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.15em] hover:bg-[#3A2E33] cursor-pointer"
                    >
                      Request with {artisan.name.split(' ')[0]} →
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsappPreview({
                          sourceLabel: `Artisan Inquiry (${artisan.name})`,
                          artisanName: artisan.name,
                        })
                      }
                      className="px-4 py-3 rounded-sm border border-[#504348]/35 text-xs text-[#2D2328] hover:bg-[#E6DDEB]/45 cursor-pointer"
                    >
                      Preview Concierge Message
                    </button>
                    <span className="text-xs text-[#504348] tabular">
                      Consultations from {formatCurrency(artisan.consultationTierInr)}
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
