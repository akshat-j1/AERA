import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { studioConfig } from '../../config/studio.config';
import { useReducedMotion } from '../../lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function EthosSpacer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackTopRef = useRef<HTMLDivElement>(null);
  const trackBottomRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current) return;

      if (trackTopRef.current) {
        gsap.fromTo(
          trackTopRef.current,
          { xPercent: 7 },
          {
            xPercent: -13,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.65,
            },
          }
        );
      }

      if (trackBottomRef.current) {
        gsap.fromTo(
          trackBottomRef.current,
          { xPercent: -13 },
          {
            xPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.65,
            },
          }
        );
      }
    },
    { scope: containerRef, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Studio Craft Disciplines"
      className="aera-ethos py-8 md:py-10 overflow-hidden select-none"
    >
      <div className="space-y-3 md:space-y-4">
        <div
          ref={trackTopRef}
          className="aera-ethos-track flex items-center gap-x-8 gap-y-2 md:gap-x-12 whitespace-nowrap motion-reduce:whitespace-normal motion-reduce:flex-wrap font-campaign text-2xl sm:text-4xl md:text-5xl font-bold text-[#40343D]"
        >
          <span>Precision Haircuts</span>
          <span className="text-[#7B4A60]">·</span>
          <span>Daylight Hair Colour</span>
          <span className="text-[#7B4A60]">·</span>
          <span>Sculpted Radiance Facials</span>
          <span className="text-[#7B4A60]">·</span>
          <span>Calm Bridal Mornings</span>
        </div>

        <div
          ref={trackBottomRef}
          className="aera-ethos-track flex items-center gap-x-8 gap-y-2 md:gap-x-12 whitespace-nowrap motion-reduce:whitespace-normal motion-reduce:flex-wrap font-editorial text-sm sm:text-base md:text-lg uppercase tracking-[0.26em] text-[#7B4A60]"
        >
          <span>{studioConfig.locale.neighborhood} {studioConfig.locale.city}</span>
          <span className="text-[#40343D]">·</span>
          <span>Unhurried Daylight Chairs</span>
          <span className="text-[#40343D]">·</span>
          <span>Ammonia-Free Formulations</span>
          <span className="text-[#40343D]">·</span>
          <span>Tailored Aftercare</span>
        </div>
      </div>
    </section>
  );
}
