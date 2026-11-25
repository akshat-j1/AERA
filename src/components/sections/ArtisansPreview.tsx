import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { artisans } from '../../config/team.config';
import { useStudio } from '../../lib/StudioContext';
import { StudioPicture } from '../layout/StudioPicture';

export function ArtisansPreview() {
  const { openEnquiry } = useStudio();

  return (
    <section aria-label="Lead Studio Artisans" className="py-20 md:py-24 bg-[#F8F5F1]">
      <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C8B49D]/40 pb-6">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#504348]">04 · The Artisans</p>
            <h2 className="font-sculpt text-3xl md:text-4xl font-semibold text-[#2D2328]">
              Craftspeople behind{' '}
              <span className="font-whisper font-normal text-[#504348]">every mirror.</span>
            </h2>
          </div>
          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#2D2328] hover:text-[#504348]"
          >
            Meet All Specialists <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artisans.map((person, idx) => (
            <article
              key={person.id}
              className={`group space-y-4 ${idx % 2 === 1 ? 'lg:mt-8' : ''}`}
            >
              <div className="aspect-[3/4] rounded-sm overflow-hidden border border-[#C8B49D]/45 bg-[#F3EEF5]">
                <StudioPicture
                  mediaId={person.mediaId}
                  objectPosition={person.imagePosition}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 280px"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-sculpt text-lg font-semibold text-[#2D2328]">{person.name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-[#504348]/80">
                    {person.experienceYears} yrs
                  </span>
                </div>
                <p className="text-xs font-medium text-[#504348]">{person.role}</p>
                <p className="text-xs text-[#504348]/85 leading-relaxed line-clamp-2">
                  “{person.quote}”
                </p>
                <button
                  type="button"
                  onClick={() =>
                    openEnquiry({
                      artisanId: person.id,
                      sourceLabel: `Artisan Profile — ${person.name}`,
                    })
                  }
                  className="pt-1 inline-block text-xs underline underline-offset-4 text-[#2D2328] hover:text-[#504348] cursor-pointer"
                >
                  Request with {person.name.split(' ')[0]} →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
