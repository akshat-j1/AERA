import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { studioConfig } from '../../config/studio.config';

gsap.registerPlugin(ScrollTrigger);

export function EthosSpacer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from('[data-ethos-line]', {
        opacity: 0,
        y: 22,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Studio Philosophy"
      className="py-16 md:py-24 bg-[#F5EFEA] border-y border-[#C8B49D]/35"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div data-ethos-line className="md:col-span-4 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#504348]">01 · Spatial Breath</p>
          <p className="font-sculpt text-xl font-medium text-[#2D2328]">
            Unhurried appointments calibrated in natural daylight.
          </p>
        </div>

        <div data-ethos-line className="md:col-span-5 text-sm text-[#504348] leading-relaxed">
          <p>
            Rather than harsh overhead bulbs or rushed chair turnovers, AERA pairs dry architectural cutting, ammonia-free mineral glosses, and calming lymphatic skin work with unhurried personal consultations.
          </p>
        </div>

        <div data-ethos-line className="md:col-span-3 md:text-right space-y-1 text-xs text-[#504348]">
          <p className="uppercase tracking-[0.16em] text-[#2D2328] font-medium">
            {studioConfig.locale.neighborhood}, {studioConfig.locale.city}
          </p>
          <p>Tue – Sun · 10:30 AM Onward</p>
          <p className="text-[11px] opacity-80">Demo Showcase Configuration</p>
        </div>
      </div>
    </section>
  );
}
