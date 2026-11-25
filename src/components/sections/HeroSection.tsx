import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, RotateCcw } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { studioConfig } from '../../config/studio.config';
import { useStudio } from '../../lib/StudioContext';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { StudioPicture } from '../layout/StudioPicture';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { openEnquiry, triggerEntranceReplay, entranceActive } = useStudio();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion || !heroRef.current) return;

      gsap.to('[data-hero-stage]', {
        scale: 1.03,
        y: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.65,
        },
      });

      gsap.to('[data-hero-detail]', {
        y: -36,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.75,
        },
      });
    },
    { scope: heroRef, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  const scrollToMirrors = () => {
    const el = document.getElementById('living-mirrors');
    el?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="studio-hero"
      aria-label="AERA Beauty Studio Welcome"
      className="relative min-h-[min(94vh,860px)] pt-20 pb-12 md:pt-24 md:pb-16 bg-[#FAF8F7] overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle Expressive Architectural Wash Behind Main Studio Composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-full lg:w-[58%] bg-gradient-to-b from-[#E7DFEB]/65 via-[#F2EEF1]/55 to-[#FAF8F7]"
      />

      {/* Restrained Location Coordinate Line */}
      <div
        className={`relative z-20 max-w-7xl w-full mx-auto px-5 md:px-10 transition-all duration-700 ${
          entranceActive ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCD2D8]/80 pb-3 text-[11px] uppercase tracking-[0.2em] text-[#493D46]">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B77F91]" aria-hidden="true" />
            {studioConfig.locale.neighborhood}, {studioConfig.locale.city} · Tue – Sun
          </span>

          <button
            type="button"
            onClick={triggerEntranceReplay}
            className="inline-flex items-center gap-1.5 text-[#493D46] hover:text-[#844D60] transition-colors cursor-pointer"
            title="Replay salon entrance door sequence"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Replay Entrance
          </button>
        </div>
      </div>

      {/* Unified Architectural Hero Composition: Direct Continuation of Opening Salon Threshold */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-5 md:px-10 my-auto py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Editorial Focal Statement (Present Behind Opening Doors So Zero Blank Flash) */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-5 lg:pr-4">
            <p className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#844D60]">
              {studioConfig.brand.entranceSubline}
            </p>

            <h1 className="font-campaign text-6xl sm:text-7xl xl:text-[5.5rem] font-bold leading-[0.9] tracking-[0.14em] text-[#2A2128]">
              {studioConfig.brand.name}
            </h1>

            <p className="text-xl sm:text-2xl text-[#2A2128] leading-[1.28] max-w-md">
              <span className="font-whisper text-[#844D60]">Daylight craft</span>{' '}
              <span className="font-editorial font-medium">
                for quiet confidence, movement, and luminous skin.
              </span>
            </p>

            <p className="text-xs sm:text-sm text-[#493D46] max-w-md leading-relaxed">
              {studioConfig.brand.subline}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => openEnquiry({ sourceLabel: 'Homepage Hero CTA' })}
                className="px-7 py-3.5 rounded-full bg-[#493D46] text-[#FAF8F7] text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[#844D60] transition-colors cursor-pointer shadow-[0_12px_30px_rgba(42,33,40,0.14)]"
              >
                Book a Visit
              </button>

              <button
                type="button"
                onClick={scrollToMirrors}
                className="inline-flex items-center gap-1.5 py-2 text-[11px] uppercase tracking-[0.2em] font-medium text-[#2A2128] border-b border-[#B77F91] hover:text-[#844D60] hover:border-[#844D60] transition-colors cursor-pointer"
              >
                Explore Mirrors
                <ArrowDown className="w-3.5 h-3.5 text-[#844D60]" />
              </button>
            </div>
          </div>

          {/* Decisive Single Studio Focal Stage (Right 7 Cols Desktop, Top Visual Mobile) */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative md:pb-8 lg:pb-0">
            {/* Soft Lilac Architectural Offset Field */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute -top-5 -right-5 w-[78%] h-[88%] rounded-sm bg-[#E7DFEB]/85 border border-[#DCD2D8]/80 pointer-events-none"
            />

            <div
              data-hero-stage
              className="relative aspect-[16/10] sm:aspect-[16/10] lg:aspect-[15/10] w-full rounded-sm overflow-hidden border border-[#DCD2D8] shadow-[0_28px_72px_rgba(42,33,40,0.1)] bg-[#F2EEF1]"
            >
              <StudioPicture
                mediaId="sanctuary-sunlit"
                priority
                objectPosition="50% 48%"
                sizes="(max-width: 1024px) 95vw, 760px"
                className="w-full h-full"
              />
            </div>

            {/* Single Overlapping Human Craft Portrait Detail (Desktop & Tablet Framing) */}
            <div
              data-hero-detail
              className={`hidden md:block absolute md:left-5 md:bottom-0 lg:-left-8 lg:-bottom-7 w-36 lg:w-48 aspect-[3/4] rounded-sm overflow-hidden border-[5px] border-[#FAF8F7] shadow-[0_20px_50px_rgba(42,33,40,0.16)] bg-[#F2EEF1] transition-all duration-700 delay-100 ${
                entranceActive ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <Link to="/services?pillar=hair-craft" aria-label="Explore Haircuts and Styling rituals" className="block w-full h-full group">
                <StudioPicture
                  mediaId="hero-craft"
                  objectPosition="52% 24%"
                  sizes="220px"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
