import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mirrorPillars, salonServices, type PillarId } from '../config/services.config';
import { formatCurrency, formatDuration } from '../lib/format';
import { useStudio } from '../lib/StudioContext';
import { PageShell } from '../components/layout/PageShell';
import { StudioPicture } from '../components/layout/StudioPicture';

export function ServicesPage() {
  const [searchParams] = useSearchParams();
  const initialPillar = searchParams.get('pillar') as PillarId | null;
  const [filter, setFilter] = useState<'all' | PillarId>(
    initialPillar && mirrorPillars.some((m) => m.id === initialPillar) ? initialPillar : 'all'
  );
  const { openEnquiry, openWhatsappPreview } = useStudio();

  const filtered =
    filter === 'all' ? salonServices : salonServices.filter((s) => s.pillarId === filter);

  return (
    <PageShell
      eyebrow="Ritual Menu & Investment"
      titlePrefix="Transparent craft"
      titleItalic="by length and ritual."
      description="Every appointment includes personal texture mapping in natural light, scalp care, and unhurried consultation notes—priced transparently in INR."
      surface="lilac"
      rightSlot={
        <div className="p-4 rounded-sm bg-[#F8F5F1]/90 border border-[#C8B49D]/55 text-xs text-[#504348]">
          <strong className="block text-[#2D2328] mb-1">Consultation Pledge</strong>
          First-time colour reservations include a 48-hour patch-test note prior to appointment confirmation.
        </div>
      }
    >
      <section className="py-14 md:py-20 bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-10">
          {/* Category Filter Strip */}
          <div className="flex flex-wrap gap-2 border-b border-[#C8B49D]/40 pb-6">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs cursor-pointer transition-colors ${
                filter === 'all'
                  ? 'bg-[#504348] text-[#F8F5F1]'
                  : 'bg-[#F3EEF5] text-[#2D2328] hover:bg-[#E6DDEB]'
              }`}
            >
              All Rituals ({salonServices.length})
            </button>
            {mirrorPillars.map((pillar) => (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setFilter(pillar.id)}
                className={`px-4 py-2 rounded-full text-xs cursor-pointer transition-colors ${
                  filter === pillar.id
                    ? 'bg-[#504348] text-[#F8F5F1]'
                    : 'bg-[#F3EEF5] text-[#2D2328] hover:bg-[#E6DDEB]'
                }`}
              >
                {pillar.mirrorIndex} · {pillar.title}
              </button>
            ))}
          </div>

          {/* Editorial Ritual Ledger */}
          <div className="divide-y divide-[#C8B49D]/45 border-y border-[#C8B49D]/45">
            {filtered.map((svc) => {
              const pillar = mirrorPillars.find((m) => m.id === svc.pillarId);
              return (
                <article
                  key={svc.id}
                  className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                  <div className="lg:col-span-5 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#504348]">
                      {pillar?.title} · {formatDuration(svc.durationMinutes)}
                    </p>
                    <h2 className="font-sculpt text-2xl font-semibold text-[#2D2328]">{svc.name}</h2>
                    <p className="text-xs md:text-sm text-[#504348] leading-relaxed">{svc.summary}</p>
                    <p className="text-[11px] text-[#504348]/85 italic pt-1">{svc.consultationNote}</p>
                  </div>

                  <div className="lg:col-span-4 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#504348]/80">
                      Investment Guide (INR)
                    </p>
                    {svc.lengthTiers ? (
                      <div className="space-y-1.5 bg-[#F3EEF5] p-3.5 rounded-sm border border-[#C8B49D]/35">
                        {svc.lengthTiers.map((tier) => (
                          <div key={tier.label} className="flex justify-between text-xs">
                            <span className="text-[#504348]">{tier.label}</span>
                            <span className="font-semibold text-[#2D2328] tabular">
                              {formatCurrency(tier.priceInr)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#F3EEF5] p-3.5 rounded-sm border border-[#C8B49D]/35 flex justify-between text-xs">
                        <span className="text-[#504348]">Standard Session</span>
                        <span className="font-semibold text-[#2D2328] tabular">
                          From {formatCurrency(svc.startingPriceInr)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-3 flex flex-col gap-2 lg:items-end justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry({
                          serviceId: svc.id,
                          sourceLabel: `Services Menu — ${svc.name}`,
                        })
                      }
                      className="w-full lg:w-auto px-5 py-2.5 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.14em] hover:bg-[#3A2E33] cursor-pointer"
                    >
                      Request Ritual →
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsappPreview({
                          sourceLabel: 'Services Directory',
                          ritualName: svc.name,
                        })
                      }
                      className="w-full lg:w-auto px-5 py-2 rounded-sm border border-[#504348]/35 text-xs text-[#2D2328] hover:bg-[#E6DDEB]/45 cursor-pointer"
                    >
                      Preview Concierge Note
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Quiet Visual Anchor */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 md:p-8 rounded-sm bg-[#F3E6DF]/70 border border-[#C8B49D]/50">
            <div className="md:col-span-5 aspect-[16/10] rounded-sm overflow-hidden">
              <StudioPicture mediaId="mirror-wall" sizes="540px" className="w-full h-full" />
            </div>
            <div className="md:col-span-7 space-y-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#504348]">Unsure Which Ritual Fits?</p>
              <h3 className="font-sculpt text-2xl font-semibold text-[#2D2328]">
                Start with a calm 15-minute diagnostic note.
              </h3>
              <p className="text-xs md:text-sm text-[#504348] leading-relaxed">
                Share your hair history or skin sensitivity in the consultative request drawer—our demo workflow previews how specialists recommend the right ritual length and tone.
              </p>
              <button
                type="button"
                onClick={() => openEnquiry({ sourceLabel: 'Services Consultation Prompt' })}
                className="px-5 py-2.5 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.14em] cursor-pointer"
              >
                Open Demo Consultation Request
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
