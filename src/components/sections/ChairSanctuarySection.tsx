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
  const [windowChoice, setWindowChoice] = useState('Weekday Late Morning (11:00 – 13:30 IST)');

  const sectionRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { openEnquiry, openWhatsappPreview } = useStudio();

  useGSAP(
    () => {
      if (reducedMotion || !haloRef.current) return;
      gsap.fromTo(
        haloRef.current,
        { opacity: 0.2 },
        {
          opacity: 0.85,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
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
      aria-label="Your Chair Awaits Closing Sanctuary"
      className="py-20 md:py-28 text-[#2D2328]"
      style={{
        background: 'linear-gradient(135deg, #F3E6DF 0%, #EADBD7 60%, #E6DDEB 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Bright Welcoming Sunlit Sanctuary Chair + Soft Indirect Halo */}
        <div className="lg:col-span-7 relative">
          <div className="relative rounded-sm overflow-hidden border-2 border-[#F8F5F1] shadow-xl">
            <StudioPicture
              mediaId="sanctuary-sunlit"
              sizes="(max-width: 1024px) 94vw, 720px"
              className="aspect-[16/10] w-full"
            />
            <div
              ref={haloRef}
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: reducedMotion ? 0.65 : 0.2,
                background:
                  'radial-gradient(circle at 50% 42%, rgba(248, 245, 241, 0.42), rgba(200, 180, 157, 0.16) 45%, transparent 72%)',
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 px-4 py-2.5 rounded-sm bg-[#F8F5F1]/90 backdrop-blur-md border border-[#C8B49D]/45 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-medium text-[#2D2328]">Indiranagar Daylight Suite · Private Chair</span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#504348]">
                Demo Showcase Mode
              </span>
            </div>
          </div>
        </div>

        {/* Embedded Consultative Demo Request Composer */}
        <div className="lg:col-span-5 bg-[#F8F5F1]/92 backdrop-blur-md p-6 md:p-8 rounded-sm border border-[#C8B49D]/60 shadow-lg space-y-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#504348]">
              06 · Your Chair Awaits
            </span>
            <span className="px-2.5 py-0.5 text-[10px] rounded-full bg-[#E6DDEB] text-[#504348]">
              Demo Request Only
            </span>
          </div>

          <h2 className="font-sculpt text-3xl font-semibold leading-tight">
            Ready when{' '}
            <span className="font-whisper font-normal text-[#504348]">you step in.</span>
          </h2>

          <p className="text-xs text-[#504348] leading-relaxed">
            Choose a ritual and preferred time window to test AERA’s consultative booking flow or inspect a formatted concierge payload.
          </p>

          <div className="space-y-3 text-xs">
            <label className="block space-y-1">
              <span className="uppercase tracking-[0.14em] text-[10px] text-[#504348]">Select Ritual</span>
              <select
                value={ritualId}
                onChange={(e) => setRitualId(e.target.value)}
                className="w-full p-2.5 rounded-sm border border-[#C8B49D]/70 bg-[#F8F5F1] text-[#2D2328]"
              >
                {salonServices.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({formatCurrency(s.startingPriceInr)})
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-1">
              <span className="uppercase tracking-[0.14em] text-[10px] text-[#504348]">Preferred Window</span>
              <select
                value={windowChoice}
                onChange={(e) => setWindowChoice(e.target.value)}
                className="w-full p-2.5 rounded-sm border border-[#C8B49D]/70 bg-[#F8F5F1] text-[#2D2328]"
              >
                <option value="Weekday Late Morning (11:00 – 13:30 IST)">Weekday Late Morning (11:00 – 13:30 IST)</option>
                <option value="Afternoon Quiet Hours (14:00 – 17:30 IST)">Afternoon Quiet Hours (14:00 – 17:30 IST)</option>
                <option value="Weekend Atelier Slot (Sat/Sun)">Weekend Atelier Slot (Sat/Sun)</option>
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
                  sourceLabel: 'Closing Sanctuary Chair',
                })
              }
              className="w-full py-3 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#3A2E33] transition-colors cursor-pointer"
            >
              Request This Demo Chair →
            </button>
            <button
              type="button"
              onClick={() =>
                openWhatsappPreview({
                  sourceLabel: 'Closing Sanctuary Chair',
                  ritualName: activeService.name,
                  preferredWindow: windowChoice,
                })
              }
              className="w-full py-2.5 rounded-sm border border-[#504348]/35 text-xs text-[#2D2328] hover:bg-[#E6DDEB]/50 transition-colors cursor-pointer"
            >
              Preview WhatsApp Concierge Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
