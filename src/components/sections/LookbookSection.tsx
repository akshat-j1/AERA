import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { lookbookEntries, lookbookMoods, type LookbookMood } from '../../config/lookbook.config';
import { formatCurrency } from '../../lib/format';
import { useStudio } from '../../lib/StudioContext';
import { StudioPicture } from '../layout/StudioPicture';

export function LookbookSection() {
  const [selectedMood, setSelectedMood] = useState<LookbookMood>('All');
  const { openLookbook } = useStudio();

  const visibleLooks =
    selectedMood === 'All'
      ? lookbookEntries
      : lookbookEntries.filter((l) => l.mood === selectedMood);

  return (
    <section aria-label="Curated Studio Lookbook" className="py-20 md:py-28 bg-[#E6DDEB] text-[#2D2328]">
      <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-10">
        {/* Header & Concept B Mood Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#504348]">
              05 · Curated Beauty Campaign
            </p>
            <h2 className="font-sculpt text-3xl md:text-4xl font-semibold leading-tight">
              Three moods, five plates{' '}
              <span className="font-whisper font-normal text-[#504348]">to make your own.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {lookbookMoods.map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() => setSelectedMood(mood)}
                className={`px-3.5 py-2 rounded-full text-xs transition-colors cursor-pointer ${
                  selectedMood === mood
                    ? 'bg-[#504348] text-[#F8F5F1]'
                    : 'bg-[#F8F5F1]/75 text-[#2D2328] hover:bg-[#F8F5F1]'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Staggered Editorial Spreads (No shopping hearts or retail e-commerce badges) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {visibleLooks.map((look, idx) => (
            <article
              key={look.id}
              className={`bg-[#F8F5F1] p-3.5 rounded-sm border border-[#C8B49D]/45 shadow-xs space-y-3.5 transition-transform duration-500 ${
                idx % 3 === 1 ? 'lg:mt-8' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => openLookbook(look)}
                className="block w-full text-left group cursor-pointer focus:outline-none"
              >
                <div className="relative aspect-[3/4] rounded-xs overflow-hidden bg-[#ECE6E2]">
                  <StudioPicture
                    mediaId={look.mediaId}
                    objectPosition={look.imagePosition}
                    sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 380px"
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] bg-[#F8F5F1]/92 text-[#2D2328]">
                    {look.indexCode}
                  </span>
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] rounded-full bg-[#E6DDEB]/92 text-[#504348]">
                    {look.mood}
                  </span>
                </div>
              </button>

              <div className="px-1 space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-sculpt text-lg font-semibold">{look.title}</h3>
                  <span className="text-xs font-semibold tabular text-[#504348] shrink-0">
                    From {formatCurrency(look.startingPriceInr)}
                  </span>
                </div>
                <p className="text-xs text-[#504348] leading-relaxed">{look.summary}</p>
                <div className="pt-1 flex items-center justify-between border-t border-[#C8B49D]/30">
                  <button
                    type="button"
                    onClick={() => openLookbook(look)}
                    className="text-xs font-medium underline underline-offset-4 text-[#2D2328] hover:text-[#504348] cursor-pointer"
                  >
                    Get This Look →
                  </button>
                  <span className="text-[11px] text-[#504348]/75 tabular">{look.durationMinutes} min</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#F8F5F1] text-[#2D2328] border border-[#C8B49D]/60 text-xs uppercase tracking-[0.15em] hover:bg-[#F3E6DF] transition-colors"
          >
            Open Full Archive &amp; Transformations <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
