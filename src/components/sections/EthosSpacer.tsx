import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '../../lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function EthosSpacer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current || !trackRef.current) return;

      gsap.fromTo(
        trackRef.current,
        { xPercent: 4 },
        {
          xPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        }
      );

      gsap.from('[data-ethos-fade]', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 78%',
          once: true,
        },
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Our Studio Philosophy"
      className="py-16 md:py-24 bg-[#F4E5DA] border-y border-[#D4BEB0]/60 overflow-hidden"
    >
      {/* Scrubbed Typographic Rhythm Carrying Smoothly Across Viewport (passes WCAG 3:1 large text contrast on #F4E5DA) */}
      <div className="mb-10 md:mb-14 select-none pointer-events-none" aria-hidden="true">
        <div
          ref={trackRef}
          className="flex items-center gap-10 whitespace-nowrap font-editorial text-3xl sm:text-5xl md:text-6xl font-normal text-[#7B665D]"
        >
          <span>Precision Haircuts</span>
          <span className="text-[#874030]">·</span>
          <span>Daylight Hair Colour</span>
          <span className="text-[#874030]">·</span>
          <span>Restorative Skincare</span>
          <span className="text-[#874030]">·</span>
          <span>Calm Bridal Mornings</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div data-ethos-fade className="lg:col-span-6 space-y-2">
          <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#874030]">
            01 · Our Philosophy
          </p>
          <h2 className="font-sculpt text-2xl md:text-4xl font-semibold text-[#2C221E] leading-tight">
            Designed around unhurried time, clear natural lighting, and wearable beauty.
          </h2>
        </div>

        <div data-ethos-fade className="lg:col-span-6 text-sm md:text-base text-[#493B36] leading-relaxed">
          <p>
            Instead of harsh overhead spotlights and rushed seat turnovers, every appointment begins with an honest conversation by pure daylight—pairing gentle formulations with cuts and colour crafted to look good months later.
          </p>
        </div>
      </div>
    </section>
  );
}
