import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { salonServices } from '../../config/services.config';
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
  const reducedMotion = useReducedMotion();
  const { openEnquiry, openWhatsappPreview } = useStudio();

  useGSAP(
    () => {
      if (reducedMotion || !photoRef.current || !sectionRef.current) return;
      gsap.fromTo(
        photoRef.current,
        { scale: 1.05 },
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
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const activeService = salonServices.find((s) => s.id === ritualId) ?? salonServices[0]!;

  return (
    <section
      ref={sectionRef}
      aria-label="Book Your Chair"
      className="py-20 md:py-28 bg-[#FCFAF7] text-[#2C221E]"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Inviting Integrated Salon View + Floating Porcelain Booking Card */}
        <div className="relative rounded-sm overflow-hidden border border-[#D4BEB0]/70 shadow-[0_24px_60px_rgba(44,34,30,0.09)] bg-[#F4E5DA]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Active Sunlit Salon Panorama Flowing From Previous Sections */}
            <div ref={photoRef} className="lg:col-span-7 relative min-h-[300px] lg:min-h-[540px] overflow-hidden">
              <StudioPicture
                mediaId="sanctuary-sunlit"
                sizes="(max-width: 1024px) 94vw, 760px"
                className="w-full h-full"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#2C221E]/10 pointer-events-none"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-2 text-xs text-[#FCFAF7]">
                <span className="px-3.5 py-1.5 rounded-sm bg-[#2C221E]/65 backdrop-blur-md">
                  Indiranagar Studio · Styling Floor
                </span>
              </div>
            </div>

            {/* Warm Minimal Appointment Starter Seamlessly Attached */}
            <div className="lg:col-span-5 bg-[#FCFAF7] p-7 md:p-10 lg:p-12 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#874030]">
                  06 · Book an Appointment
                </p>
                <h2 className="font-editorial text-3xl md:text-4xl font-medium leading-[1.06] text-[#2C221E]">
                  Save a quiet chair for your next visit.
                </h2>
                <p className="text-xs md:text-sm text-[#493B36] leading-relaxed">
                  Choose a service and preferred time window below—our team personally matches the right stylist and consultation length.
                </p>
              </div>

              <div className="space-y-3.5 text-xs">
                <label className="block space-y-1">
                  <span className="uppercase tracking-[0.14em] text-[10px] font-medium text-[#493B36]">
                    Service
                  </span>
                  <select
                    value={ritualId}
                    onChange={(e) => setRitualId(e.target.value)}
                    className="w-full p-3 rounded-sm border border-[#D4BEB0] bg-[#FCFAF7] text-[#2C221E]"
                  >
                    {salonServices.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (From {formatCurrency(s.startingPriceInr)})
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1">
                  <span className="uppercase tracking-[0.14em] text-[10px] font-medium text-[#493B36]">
                    Preferred Time
                  </span>
                  <select
                    value={windowChoice}
                    onChange={(e) => setWindowChoice(e.target.value)}
                    className="w-full p-3 rounded-sm border border-[#D4BEB0] bg-[#FCFAF7] text-[#2C221E]"
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
                  className="w-full py-3.5 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#874030] transition-colors cursor-pointer"
                >
                  Book This Appointment →
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
                  className="w-full py-3 rounded-sm border border-[#493B36]/35 text-xs text-[#2C221E] hover:bg-[#F4E5DA] transition-colors cursor-pointer"
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
