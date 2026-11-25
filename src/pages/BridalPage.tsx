import { bridalPackages, bridalTimeline } from '../config/bridal.config';
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
      description="Private bridal suites reserved exclusively for your trial and wedding day—combining airy Indian floral hair styling, luminous skin finishes, and thoughtful draping support."
      surface="peach"
    >
      <section className="py-14 md:py-20 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-20">
          {/* Editorial Bridal Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-end">
              <div className="col-span-7 aspect-[3/4] rounded-t-[180px] rounded-b-sm overflow-hidden shadow-lg border border-[#D4BEB0]">
                <StudioPicture mediaId="bridal-indian" sizes="440px" className="w-full h-full" />
              </div>
              <div className="col-span-5 aspect-[3/4] rounded-sm overflow-hidden shadow-md border border-[#D4BEB0] mb-6">
                <StudioPicture mediaId="suite-dusk" sizes="320px" className="w-full h-full" />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#874030]">
                The Private Bridal Suite
              </p>
              <h2 className="font-editorial text-3xl md:text-4xl font-medium text-[#2C221E]">
                Light, comfortable hair &amp; makeup built to last through every ceremony.
              </h2>
              <p className="text-sm text-[#493B36] leading-relaxed">
                From fresh mogra-wrapped braids and low silk chignons to soft, breathable foundation calibrated against Bengaluru sunlight, we test everything gently with your outfits during a relaxed 2-hour trial beforehand.
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
                className="px-6 py-3.5 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs uppercase tracking-[0.15em] hover:bg-[#874030] transition-colors cursor-pointer"
              >
                Book Your Bridal Trial →
              </button>
            </div>
          </div>

          {/* Preparation Timeline */}
          <div className="p-6 md:p-10 rounded-sm bg-[#EFE0D5] border border-[#D4BEB0] space-y-8">
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#874030]">
                Wedding Timeline
              </p>
              <h2 className="font-editorial text-2xl md:text-3xl font-medium text-[#2C221E]">
                12 weeks out to wedding morning.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {bridalTimeline.map((step, i) => (
                <div
                  key={step.phase}
                  className="p-5 rounded-sm bg-[#FCFAF7] border border-[#D4BEB0]/80 space-y-2.5"
                >
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#874030] font-medium">
                    0{i + 1} · {step.phase}
                  </span>
                  <h3 className="font-sculpt text-lg font-semibold text-[#2C221E]">{step.title}</h3>
                  <p className="text-xs text-[#493B36] leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bridal Packages */}
          <div className="space-y-6">
            <h2 className="font-editorial text-3xl font-medium text-[#2C221E]">Bridal Suites</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {bridalPackages.map((pkg) => (
                <article
                  key={pkg.id}
                  className="p-6 rounded-sm bg-[#FCFAF7] border border-[#D4BEB0] flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#874030] font-medium">
                      {pkg.durationSummary}
                    </p>
                    <h3 className="font-sculpt text-2xl font-semibold text-[#2C221E]">{pkg.name}</h3>
                    <p className="text-xs text-[#493B36] leading-relaxed">{pkg.subtitle}</p>

                    <div className="pt-3 border-t border-[#D4BEB0]/60">
                      <p className="font-sculpt text-xl font-semibold text-[#2C221E] tabular">
                        {pkg.startingInvestmentInr
                          ? `From ${formatCurrency(pkg.startingInvestmentInr)}`
                          : pkg.customQuoteLabel}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 text-xs text-[#493B36]">
                      {pkg.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2">
                          <span className="text-[#874030] mt-0.5">•</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#D4BEB0]/60">
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
                      className="w-full py-3 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs uppercase tracking-[0.14em] hover:bg-[#874030] transition-colors cursor-pointer"
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
                      className="w-full py-2.5 rounded-sm border border-[#D4BEB0] text-xs text-[#2C221E] hover:bg-[#F4E5DA] cursor-pointer"
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
