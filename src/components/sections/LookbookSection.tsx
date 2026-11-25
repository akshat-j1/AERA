import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { lookbookEntries, lookbookMoods, type LookbookMood } from '../../config/lookbook.config';
import { formatCurrency } from '../../lib/format';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { useStudio } from '../../lib/StudioContext';
import { StudioPicture } from '../layout/StudioPicture';

gsap.registerPlugin(ScrollTrigger);

export function LookbookSection() {
  const [selectedMood, setSelectedMood] = useState<LookbookMood>('All');
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { openLookbook } = useStudio();

  const visibleLooks =
    selectedMood === 'All'
      ? lookbookEntries
      : lookbookEntries.filter((l) => l.mood === selectedMood);

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;
      gsap.from('[data-lookbook-item]', {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const [featured, ...rest] = visibleLooks;

  return (
    <section
      ref={sectionRef}
      aria-label="Salon Lookbook"
      className="py-20 md:py-28 bg-[#EFE0D5] text-[#2C221E]"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-12">
        {/* Top Row: Natural Editorial Title & Category Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#D4BEB0] pb-6">
          <div className="space-y-2 max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#874030]">
              05 · Lookbook
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium leading-tight">
              Recent looks from the studio chairs.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {lookbookMoods.map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() => setSelectedMood(mood)}
                className={`px-4 py-2 rounded-full text-xs transition-colors cursor-pointer ${
                  selectedMood === mood
                    ? 'bg-[#493B36] text-[#FCFAF7]'
                    : 'bg-[#FCFAF7]/80 text-[#2C221E] hover:bg-[#FCFAF7]'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight Featured Look Asymmetric Composition */}
        {featured && (
          <article
            data-lookbook-item
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            <div className="lg:col-span-6">
              <button
                type="button"
                onClick={() => openLookbook(featured)}
                className="block w-full text-left group cursor-pointer focus:outline-none"
              >
                <div className="aspect-[3/4] max-h-[540px] w-full rounded-t-[200px] rounded-b-sm overflow-hidden shadow-lg border border-[#FCFAF7]">
                  <StudioPicture
                    mediaId={featured.mediaId}
                    objectPosition={featured.imagePosition}
                    sizes="(max-width: 1024px) 92vw, 560px"
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </button>
            </div>

            <div className="lg:col-span-6 space-y-5 lg:pl-6">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
                <span className="text-[#874030] font-semibold">Look {featured.indexCode}</span>
                <span className="px-3 py-0.5 rounded-full bg-[#FCFAF7]/85 text-[#493B36]">
                  {featured.mood}
                </span>
              </div>
              <h3 className="font-editorial text-3xl md:text-4xl font-medium text-[#2C221E]">
                {featured.title}
              </h3>
              <p className="text-sm md:text-base text-[#493B36] max-w-md leading-relaxed">
                {featured.summary}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-5 border-t border-[#D4BEB0]">
                <button
                  type="button"
                  onClick={() => openLookbook(featured)}
                  className="px-6 py-3 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs uppercase tracking-[0.15em] hover:bg-[#874030] transition-colors cursor-pointer"
                >
                  Get This Look →
                </button>
                <span className="text-xs text-[#493B36] tabular">
                  {featured.durationMinutes} min · From {formatCurrency(featured.startingPriceInr)}
                </span>
              </div>
            </div>
          </article>
        )}

        {/* Asymmetric Editorial Mosaic for Remaining Looks (No Generic White Box Frames) */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {rest.map((look, idx) => (
              <article
                key={look.id}
                data-lookbook-item
                className={`space-y-3 ${idx % 2 === 1 ? 'lg:mt-10' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => openLookbook(look)}
                  className="block w-full text-left group cursor-pointer focus:outline-none"
                >
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-[#F4E5DA]">
                    <StudioPicture
                      mediaId={look.mediaId}
                      objectPosition={look.imagePosition}
                      sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 380px"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] bg-[#FCFAF7]/92 text-[#2C221E] font-medium">
                      {look.indexCode} · {look.mood}
                    </span>
                  </div>
                </button>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-sculpt text-lg font-semibold text-[#2C221E]">
                      {look.title}
                    </h3>
                    <span className="text-xs font-semibold tabular text-[#874030] shrink-0">
                      From {formatCurrency(look.startingPriceInr)}
                    </span>
                  </div>
                  <p className="text-xs text-[#493B36] leading-relaxed">{look.summary}</p>
                  <button
                    type="button"
                    onClick={() => openLookbook(look)}
                    className="pt-0.5 inline-block text-xs font-medium underline underline-offset-4 text-[#2C221E] hover:text-[#874030] cursor-pointer"
                  >
                    Get This Look →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[#FCFAF7] text-[#2C221E] border border-[#D4BEB0] text-xs uppercase tracking-[0.15em] hover:bg-[#F4E5DA] transition-colors"
          >
            View Complete Lookbook <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
