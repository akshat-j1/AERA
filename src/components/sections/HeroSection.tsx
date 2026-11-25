import { ArrowDown, RotateCcw } from 'lucide-react';
import { studioConfig } from '../../config/studio.config';
import { useStudio } from '../../lib/StudioContext';
import { StudioPicture } from '../layout/StudioPicture';

export function HeroSection() {
  const { openEnquiry, triggerEntranceReplay } = useStudio();

  const scrollToMirrors = () => {
    const el = document.getElementById('living-mirrors');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      aria-label="AERA Beauty Studio Welcome"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-[#F8F5F1] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left: Expressive Sculptural Typography & Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#E6DDEB]/70 text-[#504348] text-[10px] uppercase tracking-[0.22em]">
              Step Inside · Quietly Transformed
            </span>
            <button
              type="button"
              onClick={triggerEntranceReplay}
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#504348]/80 hover:text-[#2D2328] cursor-pointer"
              title="Replay closed-to-open salon door entrance"
            >
              <RotateCcw className="w-3 h-3" />
              Replay Entrance
            </button>
          </div>

          <h1 className="font-sculpt text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.03] text-[#2D2328]">
            Sunlight, movement,{' '}
            <span className="font-whisper font-normal text-[#504348] block sm:inline">
              and effortless craft.
            </span>
          </h1>

          <p className="text-sm md:text-base text-[#504348] max-w-lg leading-relaxed">
            {studioConfig.brand.subline}
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => openEnquiry({ sourceLabel: 'Homepage Hero CTA' })}
              className="px-6 py-3.5 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#3A2E33] transition-colors cursor-pointer"
            >
              Request Demo Appointment
            </button>
            <button
              type="button"
              onClick={scrollToMirrors}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-sm border border-[#504348]/35 text-xs uppercase tracking-[0.15em] text-[#2D2328] hover:bg-[#E6DDEB]/45 transition-colors cursor-pointer"
            >
              Explore Living Mirrors
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-[#504348]/80 pt-1">
            Bengaluru Showcase Concept · Transparent ₹ INR Rates · Demo Enquiry Flow
          </p>
        </div>

        {/* Right: Concept B Enriched Overlapping Human-Centered Portrait Composition */}
        <div className="lg:col-span-6 relative">
          <div className="relative max-w-lg mx-auto lg:ml-auto">
            {/* Soft Lilac & Peach Chromatic Backing Planes */}
            <div
              className="hidden sm:block absolute -top-5 -right-5 w-4/5 h-4/5 rounded-sm bg-[#E6DDEB]"
              aria-hidden="true"
            />
            <div
              className="hidden sm:block absolute -bottom-5 -left-4 w-3/5 h-3/5 rounded-sm bg-[#F3E6DF]"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-12 gap-3 items-end">
              <div className="col-span-9 sm:col-span-8 aspect-[3/4] rounded-sm overflow-hidden shadow-xl border-2 border-[#F8F5F1]">
                <StudioPicture
                  mediaId="portrait-silk-waves"
                  priority
                  sizes="(max-width: 768px) 80vw, 380px"
                  className="w-full h-full"
                />
              </div>

              <div className="col-span-5 sm:col-span-5 -ml-10 sm:-ml-12 mb-6 relative z-20 space-y-2.5">
                <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-lg border-2 border-[#F8F5F1]">
                  <StudioPicture
                    mediaId="portrait-chignon"
                    sizes="(max-width: 768px) 40vw, 220px"
                    className="w-full h-full"
                  />
                </div>
                <div className="px-3 py-2.5 rounded-sm bg-[#F8F5F1]/95 backdrop-blur-md border border-[#C8B49D]/55 shadow-sm text-[11px]">
                  <p className="uppercase tracking-[0.15em] text-[9px] text-[#504348]/80">
                    Northlight Atelier
                  </p>
                  <p className="font-medium text-[#2D2328] tabular">Rituals from ₹2,400</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
