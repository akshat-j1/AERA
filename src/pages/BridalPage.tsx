import { bridalPackages, bridalTimeline } from '../config/bridal.config';
import { formatCurrency } from '../lib/format';
import { useStudio } from '../lib/StudioContext';
import { PageShell } from '../components/layout/PageShell';
import { StudioPicture } from '../components/layout/StudioPicture';

export function BridalPage() {
  const { openEnquiry, openWhatsappPreview } = useStudio();

  return (
    <PageShell
      eyebrow="Bridal & Private Sanctuary"
      titlePrefix="Serene preparation"
      titleItalic="without ceremony rush."
      description="Private daylight bridal suites reserved exclusively for your trial and ceremony morning—combining weightless hair architecture, heirloom veil pinning, and calm barrier skin radiance."
      surface="peach"
    >
      <section className="py-14 md:py-20 bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-20">
          {/* Editorial Bridal Suite Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-end">
              <div className="col-span-7 aspect-[3/4] rounded-sm overflow-hidden shadow-md border border-[#F8F5F1]">
                <StudioPicture mediaId="portrait-chignon" sizes="420px" className="w-full h-full" />
              </div>
              <div className="col-span-5 aspect-[3/4] rounded-sm overflow-hidden shadow-md border border-[#F8F5F1] mb-6">
                <StudioPicture mediaId="suite-dusk" sizes="320px" className="w-full h-full" />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#504348]">
                Private Suite Ethos
              </p>
              <h2 className="font-sculpt text-3xl font-semibold text-[#2D2328]">
                Engineered for natural movement across long celebrations.
              </h2>
              <p className="text-sm text-[#504348] leading-relaxed">
                Whether pairing with sheer organza veils, jasmine gajras, or sculptural minimal sarees, we structure every knot and wave during a calm 2-hour trial so nothing feels tight, stiff, or overly heavy on the wedding morning.
              </p>
              <button
                type="button"
                onClick={() =>
                  openEnquiry({
                    serviceId: 'bridal-atelier-trial',
                    artisanId: 'ananya-krishnan',
                    sourceLabel: 'Bridal Suite Trial Request',
                  })
                }
                className="px-6 py-3 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.15em] hover:bg-[#3A2E33] cursor-pointer"
              >
                Request Bridal Suite Demo Consultation →
              </button>
            </div>
          </div>

          {/* 4-Phase Bridal Timeline */}
          <div className="p-6 md:p-10 rounded-sm bg-[#F3EEF5] border border-[#C8B49D]/50 space-y-8">
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#504348]">Preparation Cadence</p>
              <h2 className="font-sculpt text-2xl md:text-3xl font-semibold text-[#2D2328]">
                12 Weeks to{' '}
                <span className="font-whisper font-normal text-[#504348]">Ceremony Morning.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {bridalTimeline.map((step, i) => (
                <div
                  key={step.phase}
                  className="p-5 rounded-sm bg-[#F8F5F1] border border-[#C8B49D]/45 space-y-2.5"
                >
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#504348]">
                    0{i + 1} · {step.phase}
                  </span>
                  <h3 className="font-sculpt text-lg font-semibold text-[#2D2328]">{step.title}</h3>
                  <p className="text-xs text-[#504348] leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Packages */}
          <div className="space-y-6">
            <h2 className="font-sculpt text-3xl font-semibold text-[#2D2328]">
              Curated Bridal Suites
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {bridalPackages.map((pkg) => (
                <article
                  key={pkg.id}
                  className="p-6 rounded-sm bg-[#F8F5F1] border border-[#C8B49D]/60 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#504348]">
                      {pkg.durationSummary}
                    </p>
                    <h3 className="font-sculpt text-2xl font-semibold text-[#2D2328]">{pkg.name}</h3>
                    <p className="text-xs text-[#504348] leading-relaxed">{pkg.subtitle}</p>

                    <div className="pt-2 border-t border-[#C8B49D]/35">
                      <p className="font-sculpt text-xl font-semibold text-[#2D2328] tabular">
                        {pkg.startingInvestmentInr
                          ? `From ${formatCurrency(pkg.startingInvestmentInr)}`
                          : pkg.customQuoteLabel}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 text-xs text-[#504348]">
                      {pkg.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2">
                          <span className="text-[#504348] mt-0.5">•</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#C8B49D]/35">
                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry({
                          serviceId: 'bridal-atelier-trial',
                          artisanId: 'ananya-krishnan',
                          notes: `Interested in package: ${pkg.name}`,
                          sourceLabel: `Bridal Suite — ${pkg.name}`,
                        })
                      }
                      className="w-full py-2.5 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.14em] cursor-pointer"
                    >
                      Request Suite Proposal
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsappPreview({
                          sourceLabel: 'Bridal Sanctuary',
                          ritualName: pkg.name,
                          artisanName: 'Ananya Krishnan',
                        })
                      }
                      className="w-full py-2 rounded-sm border border-[#504348]/35 text-xs text-[#2D2328] cursor-pointer"
                    >
                      Preview Concierge Payload
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
