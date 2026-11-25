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
      titleAccent="& bridal looks."
      description="Filter our latest styles from the salon, see timing and pricing per look, or scroll down to view our process and before & after comparisons."
      surface="clay"
    >
      <section className="py-14 md:py-20 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-10">
          <div className="flex flex-wrap gap-2">
            {lookbookMoods.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                className={`px-4 py-2 rounded-full text-xs cursor-pointer transition-colors ${
                  mood === m
                    ? 'bg-[#493B36] text-[#FCFAF7]'
                    : 'bg-[#F4E5DA] text-[#2C221E] hover:bg-[#EFE0D5]'
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
                  className="w-full text-left group cursor-pointer focus:outline-none"
                >
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-[#F4E5DA]">
                    <StudioPicture
                      mediaId={look.mediaId}
                      objectPosition={look.imagePosition}
                      sizes="400px"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] bg-[#FCFAF7]/92 text-[#2C221E] font-medium">
                      {look.indexCode} · {look.mood}
                    </span>
                  </div>
                </button>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-sculpt text-lg font-semibold text-[#2C221E]">{look.title}</h2>
                    <span className="text-xs font-semibold tabular text-[#874030]">
                      From {formatCurrency(look.startingPriceInr)}
                    </span>
                  </div>
                  <p className="text-xs text-[#493B36]">{look.summary}</p>
                  <button
                    type="button"
                    onClick={() => openLookbook(look)}
                    className="pt-1 inline-block text-xs font-medium underline underline-offset-4 text-[#2C221E] hover:text-[#874030] cursor-pointer"
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
