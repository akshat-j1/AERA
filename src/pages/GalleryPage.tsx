import { useState } from 'react';
import { Link } from 'react-router-dom';
import { lookbookEntries, lookbookMoods, type LookbookMood } from '../config/lookbook.config';
import { formatCurrency } from '../lib/format';
import { useStudio } from '../lib/StudioContext';
import { PageShell } from '../components/layout/PageShell';
import { StudioPicture } from '../components/layout/StudioPicture';

export function GalleryPage() {
  const [mood, setMood] = useState<LookbookMood>('All');
  const { openLookbook, openEnquiry } = useStudio();

  const items =
    mood === 'All' ? lookbookEntries : lookbookEntries.filter((l) => l.mood === mood);

  return (
    <PageShell
      eyebrow="Lookbook"
      titlePrefix="Hair, colour, skincare"
      titleAccent="& bridal studies."
      description="Explore curated salon studies by focus area, then open any portrait for tailored timing and transparent INR guidance."
      surface="alabaster"
    >
      <section className="py-14 md:py-20 bg-[#FCFAFA] border-b border-[#DED2DA]">
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
                    ? 'bg-[#40343D] text-[#FCFAFA]'
                    : 'bg-[#F5F0F3] text-[#2A2028] hover:bg-[#E8DFED]'
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
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-[#F5F0F3]">
                    <StudioPicture
                      mediaId={look.mediaId}
                      objectPosition={look.imagePosition}
                      sizes="400px"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] bg-[#FCFAFA]/94 text-[#2A2028] font-medium">
                      {look.indexCode} · {look.mood}
                    </span>
                  </div>
                </button>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-editorial text-lg font-semibold text-[#2A2028]">{look.title}</h2>
                    <span className="text-xs font-semibold tabular text-[#7B4A60]">
                      From {formatCurrency(look.startingPriceInr)}
                    </span>
                  </div>
                  <p className="text-xs text-[#40343D]">{look.summary}</p>
                  <button
                    type="button"
                    onClick={() => openLookbook(look)}
                    className="pt-1 inline-block text-xs font-medium underline underline-offset-4 text-[#2A2028] hover:text-[#7B4A60] cursor-pointer"
                  >
                    Get This Look →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#F5F0F3]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#7B4A60]">
              Daylight Consultation
            </p>
            <h2 className="font-campaign text-2xl sm:text-3xl font-bold text-[#2A2028]">
              Ready to adapt a study to your hair texture?
            </h2>
            <p className="text-sm text-[#40343D] leading-relaxed">
              Bring look references or book a calm 15-minute colour &amp; layer mapping session before deciding.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => openEnquiry({ sourceLabel: 'Gallery Look Consultation' })}
              className="px-6 py-3 rounded-full bg-[#40343D] text-[#FCFAFA] text-xs uppercase tracking-[0.16em] hover:bg-[#7B4A60] transition-colors cursor-pointer"
            >
              Book Consultation
            </button>
            <Link
              to="/services"
              className="px-5 py-3 rounded-full border border-[#DED2DA] bg-[#FCFAFA] text-xs uppercase tracking-[0.14em] text-[#2A2028] hover:bg-[#E8DFED] transition-colors"
            >
              Full Service Menu
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
