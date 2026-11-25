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

      gsap.to('[data-hero-arches]', {
        scale: 1.045,
        y: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.65,
        },
      });

      gsap.to('[data-hero-left]', {
        x: -22,
        y: -52,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.75,
        },
      });

      gsap.to('[data-hero-right]', {
        x: 22,
        y: -68,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.75,
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
      className="relative min-h-[min(100vh,880px)] pt-20 pb-14 md:pt-24 md:pb-20 bg-[#FAF8F7] overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle Ambient Soft Lilac Bloom Behind Twin Arches */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 72% 62% at 50% 48%, rgba(231,223,235,0.72), rgba(250,248,247,0) 76%)',
        }}
      />

      {/* Quiet Top Bar: Location & Replay Control */}
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

      {/* Unified Seamless Centerpiece (Identical Environment Revealed Behind Swinging Doors) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-5 md:px-10 my-auto py-8 md:py-10">
        <div className="relative flex flex-col items-center justify-center">
          {/* Left Floating Contemporary Skincare Vignette */}
          <div
            data-hero-left
            className={`hidden xl:block absolute left-2 top-8 w-52 space-y-2 transition-all duration-700 delay-100 ${
              entranceActive ? 'opacity-0 -translate-x-8 translate-y-4' : 'opacity-100 translate-x-0 translate-y-0'
            }`}
          >
            <Link
              to="/services?pillar=botanical-skin"
              className="group block bg-[#F2EEF1] p-2.5 border border-[#DCD2D8] shadow-[0_14px_34px_rgba(42,33,40,0.08)]"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <StudioPicture
                  mediaId="skincare-facial"
                  sizes="220px"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="pt-2.5 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#493D46]">
                <span className="text-[#844D60] font-semibold">01 · Skincare</span>
                <span>→</span>
              </div>
            </Link>
          </div>

          {/* Right Floating Dimensional Colour Vignette */}
          <div
            data-hero-right
            className={`hidden xl:block absolute right-2 bottom-2 w-56 space-y-2 transition-all duration-700 delay-150 ${
              entranceActive ? 'opacity-0 translate-x-8 translate-y-4' : 'opacity-100 translate-x-0 translate-y-0'
            }`}
          >
            <Link
              to="/services?pillar=sculptural-colour"
              className="group block bg-[#FAF8F7] p-2.5 border border-[#D8ADB6] shadow-[0_14px_34px_rgba(42,33,40,0.08)]"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <StudioPicture
                  mediaId="portrait-balayage"
                  sizes="240px"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="pt-2.5 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#493D46]">
                <span className="text-[#844D60] font-semibold">02 · Hair Colour</span>
                <span>→</span>
              </div>
            </Link>
          </div>

          {/* TWIN ARCHED SALON SANCTUARY PORTAL + CENTRAL FLOATING TYPOGRAPHY (No heavy box outline!) */}
          <div
            className={`relative w-full max-w-[700px] mx-auto transition-transform duration-1000 ${
              entranceActive ? 'scale-[0.94]' : 'scale-100'
            }`}
          >
            <div
              data-hero-arches
              className="relative grid grid-cols-2 gap-3 sm:gap-6 px-4 sm:px-8 pt-7 pb-8 rounded-sm bg-[#E7DFEB]/55 border border-[#DCD2D8] shadow-[0_24px_70px_rgba(42,33,40,0.08)]"
            >
              <div className="aspect-[3/4] sm:aspect-[4/5] rounded-t-[170px] rounded-b-sm overflow-hidden bg-[#F2EEF1] relative">
                <StudioPicture
                  mediaId="sanctuary-sunlit"
                  priority
                  objectPosition="24% 48%"
                  sizes="(max-width: 768px) 44vw, 330px"
                  className="w-full h-full opacity-75"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-[#FAF8F7]/20 via-[#E7DFEB]/25 to-[#FAF8F7]/65"
                />
              </div>
              <div className="aspect-[3/4] sm:aspect-[4/5] rounded-t-[170px] rounded-b-sm overflow-hidden bg-[#F2EEF1] relative">
                <StudioPicture
                  mediaId="sanctuary-sunlit"
                  priority
                  objectPosition="76% 48%"
                  sizes="(max-width: 768px) 44vw, 330px"
                  className="w-full h-full opacity-75"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-[#FAF8F7]/20 via-[#E7DFEB]/25 to-[#FAF8F7]/65"
                />
              </div>

              {/* Seamless Borderless Luminous Radial Halo Behind Centered AERA Wordmark */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
                <div
                  className="px-6 py-6 sm:px-12 sm:py-8 space-y-3 sm:space-y-4 pointer-events-auto rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(250,248,247,0.88) 0%, rgba(250,248,247,0.68) 54%, rgba(250,248,247,0) 78%)',
                  }}
                >
                  <h1 className="font-campaign text-5xl sm:text-7xl md:text-[5.5rem] font-bold leading-none tracking-[0.22em] indent-[0.22em] text-[#2A2128]">
                    {studioConfig.brand.name}
                  </h1>
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.34em] indent-[0.34em] font-semibold text-[#493D46]">
                    Hair · Skin · Beauty
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => openEnquiry({ sourceLabel: 'Homepage Hero CTA' })}
                      className="px-7 py-3 rounded-full bg-[#493D46] text-[#FAF8F7] text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[#844D60] transition-colors cursor-pointer shadow-md"
                    >
                      Book a Visit
                    </button>
                    <button
                      type="button"
                      onClick={scrollToMirrors}
                      className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#493D46]/30 bg-[#FAF8F7]/92 text-[11px] uppercase tracking-[0.16em] text-[#2A2128] hover:bg-[#E7DFEB] transition-colors cursor-pointer"
                    >
                      Mirrors
                      <ArrowDown className="w-3.5 h-3.5 text-[#844D60]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p
            className={`mt-7 text-center text-xs sm:text-sm text-[#493D46] max-w-xl leading-relaxed transition-all duration-700 delay-200 ${
              entranceActive ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
          >
            {studioConfig.brand.subline}
          </p>
        </div>
      </div>

      {/* Mobile Compact Hair & Skin Teaser Duo */}
      <div
        className={`relative z-10 xl:hidden max-w-2xl w-full mx-auto px-5 grid grid-cols-2 gap-3 transition-all duration-700 ${
          entranceActive ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
        }`}
      >
        <Link
          to="/services?pillar=botanical-skin"
          className="flex items-center gap-3 p-2 rounded-sm bg-[#F2EEF1] border border-[#DCD2D8]"
        >
          <div className="w-12 h-14 rounded-xs overflow-hidden shrink-0">
            <StudioPicture mediaId="skincare-facial" sizes="80px" className="w-full h-full" />
          </div>
          <span className="text-[11px] font-medium text-[#2A2128] leading-snug">
            Skin &amp; Dew Facials
          </span>
        </Link>
        <Link
          to="/services?pillar=sculptural-colour"
          className="flex items-center gap-3 p-2 rounded-sm bg-[#F2EEF1] border border-[#DCD2D8]"
        >
          <div className="w-12 h-14 rounded-xs overflow-hidden shrink-0">
            <StudioPicture mediaId="portrait-balayage" sizes="80px" className="w-full h-full" />
          </div>
          <span className="text-[11px] font-medium text-[#2A2128] leading-snug">
            Daylight Colour
          </span>
        </Link>
      </div>
    </section>
  );
}
