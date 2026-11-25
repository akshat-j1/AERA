import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
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
          { xPercent: 4 },
          {
            xPercent: -14,
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
          { xPercent: -14 },
          {
            xPercent: 4,
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
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Studio Craft Disciplines"
      className="py-10 md:py-14 bg-[#E7DFEB]/40 border-y border-[#DCD2D8] overflow-hidden select-none pointer-events-none"
    >
      <div className="space-y-3 md:space-y-4">
        <div
          ref={trackTopRef}
          className="flex items-center gap-8 md:gap-12 whitespace-nowrap font-campaign text-2xl sm:text-4xl md:text-5xl font-bold text-[#493D46]"
        >
          <span>Precision Haircuts</span>
          <span className="text-[#844D60]">·</span>
          <span>Daylight Hair Colour</span>
          <span className="text-[#844D60]">·</span>
          <span>Sculpted Radiance Facials</span>
          <span className="text-[#844D60]">·</span>
          <span>Calm Bridal Mornings</span>
        </div>

        <div
          ref={trackBottomRef}
          className="flex items-center gap-8 md:gap-12 whitespace-nowrap font-editorial text-sm sm:text-base md:text-lg uppercase tracking-[0.26em] text-[#844D60]"
        >
          <span>Indiranagar Bengaluru</span>
          <span className="text-[#493D46]">·</span>
          <span>Unhurried Daylight Chairs</span>
          <span className="text-[#493D46]">·</span>
          <span>Ammonia-Free Formulations</span>
          <span className="text-[#493D46]">·</span>
          <span>Tailored Aftercare</span>
        </div>
      </div>
    </section>
  );
}
