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
        <div className="p-4 rounded-sm bg-[#FAF8F7] border border-[#DCD2D8] text-xs text-[#493D46]">
          <strong className="block text-[#2A2128] mb-1">Patch Check &amp; Consultation</strong>
          First-time colour appointments include a complimentary 48-hour patch check before pigment mixing.
        </div>
      }
    >
      <section className="py-14 md:py-20 bg-[#FAF8F7]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-10">
          <div className="flex flex-wrap gap-2 border-b border-[#DCD2D8] pb-6">
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs cursor-pointer transition-colors ${
                filter === 'all'
                  ? 'bg-[#493D46] text-[#FAF8F7]'
                  : 'bg-[#F2EEF1] text-[#2A2128] hover:bg-[#E7DFEB]'
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
                    ? 'bg-[#493D46] text-[#FAF8F7]'
                    : 'bg-[#F2EEF1] text-[#2A2128] hover:bg-[#E7DFEB]'
                }`}
              >
                {pillar.mirrorIndex} · {pillar.title}
              </button>
            ))}
          </div>

          <div className="divide-y divide-[#DCD2D8] border-y border-[#DCD2D8]">
            {filtered.map((svc) => {
              const pillar = mirrorPillars.find((m) => m.id === svc.pillarId);
              return (
                <article
                  key={svc.id}
                  className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                  <div className="lg:col-span-5 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#844D60]">
                      {pillar?.title} · {formatDuration(svc.durationMinutes)}
                    </p>
                    <h2 className="font-campaign text-2xl font-bold text-[#2A2128]">{svc.name}</h2>
                    <p className="text-xs md:text-sm text-[#493D46] leading-relaxed">{svc.summary}</p>
                    <p className="text-[11px] text-[#493D46]/85 italic pt-1">{svc.consultationNote}</p>
                  </div>

                  <div className="lg:col-span-4 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#493D46]/80">
                      Pricing (INR)
                    </p>
                    {svc.lengthTiers ? (
                      <div className="space-y-1.5 bg-[#F2EEF1] p-4 rounded-sm border border-[#DCD2D8]">
                        {svc.lengthTiers.map((tier) => (
                          <div key={tier.label} className="flex justify-between text-xs">
                            <span className="text-[#493D46]">{tier.label}</span>
                            <span className="font-semibold text-[#2A2128] tabular">
                              {formatCurrency(tier.priceInr)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#F2EEF1] p-4 rounded-sm border border-[#DCD2D8] flex justify-between text-xs">
                        <span className="text-[#493D46]">Single Session</span>
                        <span className="font-semibold text-[#2A2128] tabular">
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
                      className="w-full lg:w-auto px-5 py-3 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs uppercase tracking-[0.14em] hover:bg-[#844D60] transition-colors cursor-pointer"
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
                      className="w-full lg:w-auto px-5 py-2.5 rounded-sm border border-[#DCD2D8] text-xs text-[#2A2128] hover:border-[#844D60]/55 hover:bg-[#F2EEF1] cursor-pointer"
                    >
                      Message on WhatsApp
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 md:p-8 rounded-sm bg-[#E7DFEB]/55 border border-[#DCD2D8]">
            <div className="md:col-span-5 aspect-[16/10] rounded-sm overflow-hidden">
              <StudioPicture mediaId="mirror-wall" sizes="540px" className="w-full h-full" />
            </div>
            <div className="md:col-span-7 space-y-3">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#844D60]">
                Not sure where to begin?
              </p>
              <h3 className="font-campaign text-2xl md:text-3xl font-bold text-[#2A2128]">
                Book a 15-minute daylight consultation first.
              </h3>
              <p className="text-xs md:text-sm text-[#493D46] leading-relaxed">
                Share your hair history, upcoming events, or skin goals—we tailor timing and formulas before any service begins.
              </p>
              <button
                type="button"
                onClick={() => openEnquiry({ sourceLabel: 'Services Consultation' })}
                className="px-6 py-3 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs uppercase tracking-[0.15em] hover:bg-[#844D60] transition-colors cursor-pointer"
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
