import { useSyncExternalStore } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mirrorPillars, salonServices, type PillarId } from '../config/services.config';
import { formatCurrency, formatDuration } from '../lib/format';
import { useStudio } from '../lib/StudioContext';
import { PageShell } from '../components/layout/PageShell';
import { StudioPicture } from '../components/layout/StudioPicture';

const subscribe = () => () => {};

export function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const client = useSyncExternalStore(subscribe, () => true, () => false);
  const filter = client
    ? mirrorPillars.find((pillar) => pillar.id === searchParams.get('pillar'))?.id ?? 'all'
    : 'all';

  function setFilter(pillar: PillarId | 'all') {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (pillar === 'all') next.delete('pillar');
      else next.set('pillar', pillar);
      return next;
    });
  }
  const { openEnquiry, openWhatsappPreview } = useStudio();

  const filtered =
    filter === 'all' ? salonServices : salonServices.filter((s) => s.pillarId === filter);

  return (
    <PageShell
      eyebrow="Services & Pricing"
      titlePrefix="Clear pricing"
      titleAccent="by length & time."
      description="Every session begins with an unhurried daylight consultation, relaxing scalp care, and transparent ₹ INR pricing."
      surface="lilac"
      rightSlot={
        <div className="p-4 rounded-sm bg-[#FCFAFA] border border-[#DED2DA] text-xs text-[#40343D]">
          <strong className="block text-[#2A2028] mb-1">Patch Check &amp; Consultation</strong>
          First-time colour appointments include a complimentary 48-hour patch check before pigment mixing.
        </div>
      }
    >
      <section className="py-9 md:py-14 bg-[#FCFAFA]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-7">
          <div className="flex flex-wrap gap-2 border-b border-[#DED2DA] pb-6">
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs cursor-pointer transition-colors ${
                filter === 'all'
                  ? 'bg-[#40343D] text-[#FCFAFA]'
                  : 'bg-[#F5F0F3] text-[#2A2028] hover:bg-[#E8DFED]'
              }`}
            >
              All Services ({salonServices.length})
            </button>
            {mirrorPillars.map((pillar) => (
              <button
                key={pillar.id}
                type="button"
                aria-pressed={filter === pillar.id}
                onClick={() => setFilter(pillar.id)}
                className={`px-4 py-2 rounded-full text-xs cursor-pointer transition-colors ${
                  filter === pillar.id
                    ? 'bg-[#40343D] text-[#FCFAFA]'
                    : 'bg-[#F5F0F3] text-[#2A2028] hover:bg-[#E8DFED]'
                }`}
              >
                {pillar.mirrorIndex} · {pillar.title}
              </button>
            ))}
          </div>

          <div className="divide-y divide-[#DED2DA] border-y border-[#DED2DA]">
            {filtered.map((svc) => {
              const pillar = mirrorPillars.find((m) => m.id === svc.pillarId);
              return (
                <article
                  key={svc.id}
                  className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                  <div className="lg:col-span-5 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7B4A60]">
                      {pillar?.title} · {formatDuration(svc.durationMinutes)}
                    </p>
                    <h2 className="font-campaign text-2xl font-bold text-[#2A2028]">{svc.name}</h2>
                    <p className="text-xs md:text-sm text-[#40343D] leading-relaxed">{svc.summary}</p>
                    <p className="text-[11px] text-[#40343D]/85 italic pt-1">{svc.consultationNote}</p>
                  </div>

                  <div className="lg:col-span-4 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#40343D]/80">
                      Pricing (INR)
                    </p>
                    {svc.lengthTiers ? (
                      <div className="space-y-1.5 bg-[#F5F0F3] p-4 rounded-sm border border-[#DED2DA]">
                        {svc.lengthTiers.map((tier) => (
                          <div key={tier.label} className="flex justify-between text-xs">
                            <span className="text-[#40343D]">{tier.label}</span>
                            <span className="font-semibold text-[#2A2028] tabular">
                              {formatCurrency(tier.priceInr)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#F5F0F3] p-4 rounded-sm border border-[#DED2DA] flex justify-between text-xs">
                        <span className="text-[#40343D]">Single Session</span>
                        <span className="font-semibold text-[#2A2028] tabular">
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
                      className="w-full lg:w-auto px-5 py-3 rounded-full bg-[#40343D] text-[#FCFAFA] text-xs uppercase tracking-[0.14em] hover:bg-[#7B4A60] transition-colors cursor-pointer"
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
                      className="w-full lg:w-auto px-5 py-2.5 rounded-sm border border-[#DED2DA] text-xs text-[#2A2028] hover:border-[#7B4A60]/55 hover:bg-[#F5F0F3] cursor-pointer"
                    >
                      Message on WhatsApp
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 md:p-8 rounded-sm bg-[#E8DFED]/55 border border-[#DED2DA]">
            <div className="md:col-span-5 aspect-[16/10] rounded-sm overflow-hidden">
              <StudioPicture mediaId="mirror-wall" sizes="540px" className="w-full h-full" />
            </div>
            <div className="md:col-span-7 space-y-3">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7B4A60]">
                Not sure where to begin?
              </p>
              <h3 className="font-campaign text-2xl md:text-3xl font-bold text-[#2A2028]">
                Book a 15-minute daylight consultation first.
              </h3>
              <p className="text-xs md:text-sm text-[#40343D] leading-relaxed">
                Share your hair history, upcoming events, or skin goals—we tailor timing and formulas before any service begins.
              </p>
              <button
                type="button"
                onClick={() => openEnquiry({ sourceLabel: 'Services Consultation' })}
                className="px-6 py-3 rounded-full bg-[#40343D] text-[#FCFAFA] text-xs uppercase tracking-[0.15em] hover:bg-[#7B4A60] transition-colors cursor-pointer"
              >
                Book a Visit
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
