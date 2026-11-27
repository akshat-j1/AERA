import { bridalPackages, bridalTimeline } from '../config/bridal.config';
import { studioConfig } from '../config/studio.config';
import { formatCurrency } from '../lib/format';
import { useStudio } from '../lib/StudioContext';
import { PageShell } from '../components/layout/PageShell';
import { StudioPicture } from '../components/layout/StudioPicture';

export function BridalPage() {
  const { openEnquiry, openWhatsappPreview } = useStudio();

  return (
    <PageShell
      eyebrow="Bridal & Makeup"
      titlePrefix="Calm wedding mornings"
      titleAccent="in natural daylight."
      description="Private bridal suites reserved exclusively for your trial and ceremony—combining airy jasmine floral hair styling, breathable luminous skin, and thoughtful draping support."
      surface="lilac"
    >
      <section className="py-14 md:py-20 bg-[#FCFAFA]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-end">
              <div className="col-span-7 aspect-[3/4] rounded-t-[180px] rounded-b-sm overflow-hidden shadow-lg border border-[#DED2DA]">
                <StudioPicture mediaId="bridal-indian" sizes="440px" className="w-full h-full" />
              </div>
              <div className="col-span-5 aspect-[3/4] rounded-sm overflow-hidden shadow-md border border-[#DED2DA] mb-6">
                <StudioPicture mediaId="suite-dusk" sizes="320px" className="w-full h-full" />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#7B4A60]">
                The Private Bridal Suite
              </p>
              <h2 className="font-campaign text-3xl md:text-4xl font-bold text-[#2A2028]">
                Light, comfortable styling built to last effortlessly.
              </h2>
              <p className="text-sm text-[#40343D] leading-relaxed">
                From fresh mogra-wrapped braids and low silk chignons to soft skin-first makeup calibrated against {studioConfig.locale.city} sunlight, we test everything gently with your jewellery during a 2-hour trial beforehand.
              </p>
              <button
                type="button"
                onClick={() =>
                  openEnquiry({
                    serviceId: 'bridal-atelier-trial',
                    artisanId: 'ananya-krishnan',
                    sourceLabel: 'Bridal Trial Request',
                  })
                }
                className="px-6 py-3.5 rounded-full bg-[#40343D] text-[#FCFAFA] text-xs uppercase tracking-[0.15em] hover:bg-[#7B4A60] transition-colors cursor-pointer"
              >
                Book Your Bridal Trial →
              </button>
            </div>
          </div>

          <div className="p-6 md:p-10 rounded-sm bg-[#F5F0F3] border border-[#DED2DA] space-y-8">
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7B4A60]">
                Wedding Timeline
              </p>
              <h2 className="font-campaign text-2xl md:text-3xl font-bold text-[#2A2028]">
                12 weeks out to ceremony morning.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {bridalTimeline.map((step, i) => (
                <div
                  key={step.phase}
                  className="p-5 rounded-sm bg-[#FCFAFA] border border-[#DED2DA] space-y-2.5"
                >
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#7B4A60] font-semibold">
                    0{i + 1} · {step.phase}
                  </span>
                  <h3 className="font-editorial text-lg font-semibold text-[#2A2028]">{step.title}</h3>
                  <p className="text-xs text-[#40343D] leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-campaign text-3xl font-bold text-[#2A2028]">Bridal Suites</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {bridalPackages.map((pkg) => (
                <article
                  key={pkg.id}
                  className="p-6 rounded-sm bg-[#FCFAFA] border border-[#DED2DA] flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#7B4A60] font-semibold">
                      {pkg.durationSummary}
                    </p>
                    <h3 className="font-campaign text-2xl font-bold text-[#2A2028]">{pkg.name}</h3>
                    <p className="text-xs text-[#40343D] leading-relaxed">{pkg.subtitle}</p>

                    <div className="pt-3 border-t border-[#DED2DA]">
                      <p className="font-editorial text-xl font-semibold text-[#2A2028] tabular">
                        {pkg.startingInvestmentInr
                          ? `From ${formatCurrency(pkg.startingInvestmentInr)}`
                          : pkg.customQuoteLabel}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 text-xs text-[#40343D]">
                      {pkg.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2">
                          <span className="text-[#7B4A60] mt-0.5">•</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#DED2DA]">
                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry({
                          serviceId: 'bridal-atelier-trial',
                          artisanId: 'ananya-krishnan',
                          notes: `Bridal Inquiry: ${pkg.name}`,
                          sourceLabel: `Bridal Page — ${pkg.name}`,
                        })
                      }
                      className="w-full py-3 rounded-full bg-[#40343D] text-[#FCFAFA] text-xs uppercase tracking-[0.14em] hover:bg-[#7B4A60] transition-colors cursor-pointer"
                    >
                      Book Trial &amp; Dates
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsappPreview({
                          sourceLabel: `Bridal Suite Inquiry — ${pkg.name}`,
                          ritualName: pkg.name,
                          artisanName: 'Ananya Krishnan',
                        })
                      }
                      className="w-full py-2.5 rounded-sm border border-[#DED2DA] text-xs text-[#2A2028] hover:border-[#7B4A60]/55 hover:bg-[#F5F0F3] cursor-pointer"
                    >
                      Message on WhatsApp
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
