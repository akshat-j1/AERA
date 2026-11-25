import { useRef } from 'react';
import { ArrowDown, RotateCcw } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { studioConfig } from '../../config/studio.config';
import { useStudio } from '../../lib/StudioContext';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { StudioPicture } from '../layout/StudioPicture';

gsap.registerPlugin(ScrollTrigger);

const QUICK_DISCIPLINES = [
  { label: 'Haircuts & Styling', mirror: 'hair-craft' },
  { label: 'Hair Colour', mirror: 'sculptural-colour' },
  { label: 'Skincare', mirror: 'botanical-skin' },
  { label: 'Bridal & Makeup', mirror: 'bridal-suite' },
] as const;

export function HeroSection() {
  const { openEnquiry, triggerEntranceReplay } = useStudio();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion || !heroRef.current) return;

      gsap.to('[data-hero-arch]', {
        y: -28,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.to('[data-hero-inset]', {
        y: -54,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    },
    { scope: heroRef, dependencies: [reducedMotion] }
  );

  const scrollToMirrors = () => {
    const el = document.getElementById('living-mirrors');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      aria-label="AERA Beauty Studio Welcome"
      className="relative pt-20 pb-14 md:pt-28 md:pb-24 bg-[#FCFAF7] overflow-hidden"
    >
      {/* Warm architectural Soft Peach wash on the right studio canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-full lg:w-[46%] h-full bg-[#F4E5DA]/75 lg:rounded-bl-[140px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 space-y-6 md:space-y-12">
        {/* Top editorial studio strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D4BEB0]/55 pb-3.5">
          <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-[#493B36]">
            <span className="w-2 h-2 rounded-full bg-[#B76E5D]" aria-hidden="true" />
            <span>
              {studioConfig.locale.neighborhood}, {studioConfig.locale.city} · Tue – Sun
            </span>
          </div>

          <button
            type="button"
            onClick={triggerEntranceReplay}
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#493B36] hover:text-[#874030] transition-colors cursor-pointer"
            title="Replay salon entrance door sequence"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Replay Entrance
          </button>
        </div>

        {/* Expressive Full-Width Headline Break + Asymmetric Composition Below */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6 space-y-5 md:space-y-7 pt-1 lg:pt-6">
            <h1 className="font-editorial text-[2.2rem] sm:text-5xl lg:text-[4.15rem] font-medium leading-[1.0] text-[#2C221E]">
              Thoughtful hair &amp; radiant skin, shaped in natural light.
            </h1>

            <p className="text-sm md:text-base text-[#493B36] max-w-md leading-relaxed">
              {studioConfig.brand.subline}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openEnquiry({ sourceLabel: 'Homepage Hero CTA' })}
                className="px-6 py-3.5 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#874030] transition-colors cursor-pointer"
              >
                Book an Appointment
              </button>
              <button
                type="button"
                onClick={scrollToMirrors}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-sm border border-[#493B36]/40 bg-[#FCFAF7]/85 text-xs uppercase tracking-[0.14em] text-[#2C221E] hover:bg-[#F4E5DA] transition-colors cursor-pointer"
              >
                Explore Services
                <ArrowDown className="w-3.5 h-3.5 text-[#874030]" />
              </button>
            </div>

            {/* Clean inline service jumps (Desktop/Tablet row, tucked cleanly on narrow phones so hero arch stays above fold) */}
            <div className="hidden sm:grid pt-4 border-t border-[#D4BEB0]/55 grid-cols-4 gap-3 text-xs">
              {QUICK_DISCIPLINES.map((item, idx) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={scrollToMirrors}
                  className="text-left group cursor-pointer space-y-0.5 py-1"
                >
                  <span className="block text-[10px] font-medium text-[#874030] tabular">
                    0{idx + 1}
                  </span>
                  <span className="block text-[#2C221E] font-medium group-hover:text-[#874030] transition-colors">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Arched Sculptural Hair Craft Composition + Parallax Walk-in Studio Window */}
          <div className="lg:col-span-6 relative pb-4 lg:pb-10">
            <div data-hero-arch className="relative max-w-md lg:max-w-lg mx-auto lg:ml-auto">
              <div className="aspect-[4/5] sm:aspect-[3/4] rounded-t-[200px] sm:rounded-t-[260px] rounded-b-sm overflow-hidden border border-[#D4BEB0]/70 shadow-[0_24px_60px_rgba(44,34,30,0.12)] bg-[#EFE0D5]">
                <StudioPicture
                  mediaId="hero-craft"
                  priority
                  sizes="(max-width: 1024px) 92vw, 520px"
                  className="w-full h-full"
                />
              </div>

              {/* Parallax Studio Corridor Inset Window Echoing Entrance Depth */}
              <div
                data-hero-inset
                className="hidden sm:block absolute -bottom-7 -left-10 w-56 md:w-64 aspect-[16/10] rounded-sm overflow-hidden border-2 border-[#FCFAF7] shadow-xl"
              >
                <StudioPicture
                  mediaId="studio-aisle-daylight"
                  sizes="280px"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
