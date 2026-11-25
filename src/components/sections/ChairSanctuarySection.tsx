import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { salonServices } from '../../config/services.config';
import { studioConfig } from '../../config/studio.config';
import { formatCurrency } from '../../lib/format';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { useStudio } from '../../lib/StudioContext';
import { StudioPicture } from '../layout/StudioPicture';

gsap.registerPlugin(ScrollTrigger);

export function ChairSanctuarySection() {
  const [ritualId, setRitualId] = useState(salonServices[0]!.id);
  const [windowChoice, setWindowChoice] = useState('Weekday Morning (10:30 – 13:30)');

  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { openEnquiry, openWhatsappPreview } = useStudio();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { scale: 1.06 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 0.7,
            },
          }
        );
      }

      if (haloRef.current) {
        gsap.fromTo(
          haloRef.current,
          { opacity: 0.25, scale: 0.84 },
          {
            opacity: 0.9,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom bottom',
              scrub: 0.8,
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  const activeService = salonServices.find((s) => s.id === ritualId) ?? salonServices[0]!;

  return (
    <section
      ref={sectionRef}
      aria-label="Book Your Chair"
      className="py-20 md:py-28 bg-[#E7DFEB]/50 text-[#2A2128] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="relative rounded-sm overflow-hidden border border-[#DCD2D8] shadow-[0_24px_65px_rgba(42,33,40,0.09)] bg-[#FAF8F7]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Empty Bouclé Salon Chair Facing Illuminating Arched Mirror */}
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[540px] overflow-hidden bg-[#F2EEF1]">
              <div
                ref={haloRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    'radial-gradient(circle at 48% 36%, rgba(250,248,247,0.34), rgba(216,173,182,0.16) 44%, transparent 72%)',
                }}
              />
              <div ref={photoRef} className="w-full h-full">
                <StudioPicture
                  mediaId="booking-station"
                  sizes="(max-width: 1024px) 94vw, 760px"
                  className="w-full h-full"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#2A2128]/35 via-transparent to-transparent pointer-events-none"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-2 text-xs text-[#FAF8F7] z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-[#2A2128]/65 backdrop-blur-md">
                  {studioConfig.locale.neighborhood} Studio · Styling Floor
                </span>
              </div>
            </div>

            {/* Clean Booking Finale Card */}
            <div className="lg:col-span-5 bg-[#FAF8F7] p-7 md:p-10 lg:p-12 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#844D60]">
                  06 · Booking Finale
                </p>
                <h2 className="font-campaign text-3xl md:text-4xl font-bold leading-[1.04] text-[#2A2128]">
                  A quiet chair held just for your visit.
                </h2>
                <p className="text-xs md:text-sm text-[#493D46] leading-relaxed">
                  Select a service and time window below—our team matches the right specialist and unhurried consultation time.
                </p>
              </div>

              <div className="space-y-3.5 text-xs">
                <label className="block space-y-1">
                  <span className="uppercase tracking-[0.14em] text-[10px] font-medium text-[#493D46]">
                    Service
                  </span>
                  <select
                    value={ritualId}
                    onChange={(e) => setRitualId(e.target.value)}
                    className="w-full p-3 rounded-sm border border-[#DCD2D8] bg-[#FAF8F7] text-[#2A2128]"
                  >
                    {salonServices.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (From {formatCurrency(s.startingPriceInr)})
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1">
                  <span className="uppercase tracking-[0.14em] text-[10px] font-medium text-[#493D46]">
                    Preferred Time
                  </span>
                  <select
                    value={windowChoice}
                    onChange={(e) => setWindowChoice(e.target.value)}
                    className="w-full p-3 rounded-sm border border-[#DCD2D8] bg-[#FAF8F7] text-[#2A2128]"
                  >
                    <option>Weekday Morning (10:30 – 13:30)</option>
                    <option>Weekday Afternoon (14:00 – 17:30)</option>
                    <option>Weekend Studio Hours</option>
                  </select>
                </label>
              </div>

              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    openEnquiry({
                      serviceId: ritualId,
                      preferredWindow: windowChoice,
                      sourceLabel: 'Homepage Booking Section',
                    })
                  }
                  className="w-full py-3.5 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#844D60] transition-colors cursor-pointer"
                >
                  Book a Visit →
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsappPreview({
                      sourceLabel: 'Homepage Quick Booking',
                      ritualName: activeService.name,
                      preferredWindow: windowChoice,
                    })
                  }
                  className="w-full py-3 rounded-full border border-[#493D46]/35 text-xs text-[#2A2128] hover:bg-[#E7DFEB] transition-colors cursor-pointer"
                >
                  Message on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
