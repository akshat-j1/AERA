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
      eyebrow="Services & Pricing"
      titlePrefix="Clear pricing"
      titleAccent="by hair length and time."
      description="Every appointment includes personal consultation by window daylight, scalp relaxation, and aftercare tips—with transparent ₹ INR pricing."
      surface="peach"
      rightSlot={
        <div className="p-4 rounded-sm bg-[#FCFAF7] border border-[#D4BEB0] text-xs text-[#493B36]">
          <strong className="block text-[#2C221E] mb-1">Patch Test &amp; Allergy Note</strong>
          First-time colour clients receive a quick complimentary patch check 48 hours prior to their session.
        </div>
      }
    >
      <section className="py-14 md:py-20 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 border-b border-[#D4BEB0]/60 pb-6">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs cursor-pointer transition-colors ${
                filter === 'all'
                  ? 'bg-[#493B36] text-[#FCFAF7]'
                  : 'bg-[#F4E5DA] text-[#2C221E] hover:bg-[#EFE0D5]'
              }`}
            >
              All Services ({salonServices.length})
            </button>
            {mirrorPillars.map((pillar) => (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setFilter(pillar.id)}
                className={`px-4 py-2 rounded-full text-xs cursor-pointer transition-colors ${
                  filter === pillar.id
                    ? 'bg-[#493B36] text-[#FCFAF7]'
                    : 'bg-[#F4E5DA] text-[#2C221E] hover:bg-[#EFE0D5]'
                }`}
              >
                {pillar.mirrorIndex} · {pillar.title}
              </button>
            ))}
          </div>

          {/* Crisp Hairline Ledger */}
          <div className="divide-y divide-[#D4BEB0]/60 border-y border-[#D4BEB0]/60">
            {filtered.map((svc) => {
              const pillar = mirrorPillars.find((m) => m.id === svc.pillarId);
              return (
                <article
                  key={svc.id}
                  className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                  <div className="lg:col-span-5 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#874030]">
                      {pillar?.title} · {formatDuration(svc.durationMinutes)}
                    </p>
                    <h2 className="font-sculpt text-2xl font-semibold text-[#2C221E]">{svc.name}</h2>
                    <p className="text-xs md:text-sm text-[#493B36] leading-relaxed">{svc.summary}</p>
                    <p className="text-[11px] text-[#493B36]/85 italic pt-1">{svc.consultationNote}</p>
                  </div>

                  <div className="lg:col-span-4 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#493B36]/80">
                      Pricing (INR)
                    </p>
                    {svc.lengthTiers ? (
                      <div className="space-y-1.5 bg-[#F4E5DA]/65 p-4 rounded-sm border border-[#D4BEB0]/60">
                        {svc.lengthTiers.map((tier) => (
                          <div key={tier.label} className="flex justify-between text-xs">
                            <span className="text-[#493B36]">{tier.label}</span>
                            <span className="font-semibold text-[#2C221E] tabular">
                              {formatCurrency(tier.priceInr)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#F4E5DA]/65 p-4 rounded-sm border border-[#D4BEB0]/60 flex justify-between text-xs">
                        <span className="text-[#493B36]">Single Session</span>
                        <span className="font-semibold text-[#2C221E] tabular">
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
                      className="w-full lg:w-auto px-5 py-3 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs uppercase tracking-[0.14em] hover:bg-[#874030] transition-colors cursor-pointer"
                    >
                      Book Service →
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsappPreview({
                          sourceLabel: `Service Inquiry — ${svc.name}`,
                          ritualName: svc.name,
                        })
                      }
                      className="w-full lg:w-auto px-5 py-2.5 rounded-sm border border-[#D4BEB0] text-xs text-[#2C221E] hover:bg-[#F4E5DA] cursor-pointer"
                    >
                      Message on WhatsApp
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Warm Consultation Callout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 md:p-8 rounded-sm bg-[#EFE0D5] border border-[#D4BEB0]">
            <div className="md:col-span-5 aspect-[16/10] rounded-sm overflow-hidden">
              <StudioPicture mediaId="mirror-wall" sizes="540px" className="w-full h-full" />
            </div>
            <div className="md:col-span-7 space-y-3">
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#874030]">
                Not sure where to begin?
              </p>
              <h3 className="font-editorial text-2xl md:text-3xl font-medium text-[#2C221E]">
                Book a 15-minute in-studio consultation first.
              </h3>
              <p className="text-xs md:text-sm text-[#493B36] leading-relaxed">
                Tell us your hair history, upcoming plans, or skin sensitivity—our stylists recommend the exact time and treatment approach before any service begins.
              </p>
              <button
                type="button"
                onClick={() => openEnquiry({ sourceLabel: 'Services Consultation' })}
                className="px-6 py-3 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs uppercase tracking-[0.15em] hover:bg-[#874030] transition-colors cursor-pointer"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
