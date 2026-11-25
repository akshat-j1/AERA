import { useState } from 'react';
import { lookbookEntries, lookbookMoods, type LookbookMood } from '../config/lookbook.config';
import { formatCurrency } from '../lib/format';
import { useStudio } from '../lib/StudioContext';
import { PageShell } from '../components/layout/PageShell';
import { StudioPicture } from '../components/layout/StudioPicture';
import { TransformationSection } from '../components/sections/TransformationSection';

export function GalleryPage() {
  const [mood, setMood] = useState<LookbookMood>('All');
  const { openLookbook } = useStudio();

  const items =
    mood === 'All' ? lookbookEntries : lookbookEntries.filter((l) => l.mood === mood);

  return (
    <PageShell
      eyebrow="Lookbook"
      titlePrefix="Hair, colour, skincare"
      titleAccent="& bridal studies."
      description="Explore concept looks by focus area, then open a portrait for service timing and pricing."
      surface="alabaster"
    >
      <section className="py-14 md:py-20 bg-[#FAF8F7]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-10">
          <div className="flex flex-wrap gap-2">
            {lookbookMoods.map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mood === m}
                onClick={() => setMood(m)}
                className={`px-4 py-2 rounded-full text-xs cursor-pointer transition-colors ${
                  mood === m
                    ? 'bg-[#493D46] text-[#FAF8F7]'
                    : 'bg-[#F2EEF1] text-[#2A2128] hover:bg-[#E7DFEB]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((look, idx) => (
              <article key={look.id} className={`space-y-3 ${idx % 3 === 1 ? 'lg:mt-8' : ''}`}>
                <button
                  type="button"
                  onClick={() => openLookbook(look)}
                  className="w-full text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-[#F2EEF1]">
                    <StudioPicture
                      mediaId={look.mediaId}
                      objectPosition={look.imagePosition}
                      sizes="400px"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] bg-[#FAF8F7]/94 text-[#2A2128] font-medium">
                      {look.indexCode} · {look.mood}
                    </span>
                  </div>
                </button>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-editorial text-lg font-semibold text-[#2A2128]">{look.title}</h2>
                    <span className="text-xs font-semibold tabular text-[#844D60]">
                      From {formatCurrency(look.startingPriceInr)}
                    </span>
                  </div>
                  <p className="text-xs text-[#493D46]">{look.summary}</p>
                  <button
                    type="button"
                    onClick={() => openLookbook(look)}
                    className="pt-1 inline-block text-xs font-medium underline underline-offset-4 text-[#2A2128] hover:text-[#844D60] cursor-pointer"
                  >
                    Get This Look →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TransformationSection />
    </PageShell>
  );
}
