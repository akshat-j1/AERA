import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { artisans } from '../../config/team.config';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { useStudio } from '../../lib/StudioContext';
import { StudioPicture } from '../layout/StudioPicture';

gsap.registerPlugin(ScrollTrigger);

export function ArtisansPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { openEnquiry } = useStudio();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      gsap.from('[data-stylist-card]', {
        opacity: 0,
        y: 26,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  return (
    <section
      id="meet-stylists"
      aria-label="Meet Our Stylists"
      className="bg-[#F2EEF1] border-b border-[#DCD2D8] scroll-mt-20"
    >
      <div ref={sectionRef} className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10 w-full space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DCD2D8] pb-5">
            <div className="space-y-1.5">
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#844D60]">
                04 · Meet Our Stylists
              </p>
              <h2 className="font-campaign text-3xl sm:text-4xl font-bold text-[#2A2128]">
                Calm specialists dedicated to your hair and skin.
              </h2>
            </div>
            <Link
              to="/team"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#2A2128] hover:text-[#844D60] transition-colors shrink-0"
            >
              All Stylists <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar -mx-5 px-5 lg:mx-0 lg:px-0">
            <div className="flex gap-6 lg:grid lg:grid-cols-3 lg:gap-8 w-max lg:w-full items-start pb-2 lg:pb-0">
              {artisans.map((person, idx) => (
                <article
                  key={person.id}
                  data-stylist-card
                  className={`group snap-start shrink-0 w-[280px] sm:w-[330px] lg:w-auto lg:min-w-0 space-y-3.5 ${
                    idx % 2 === 1 ? 'lg:mt-6' : ''
                  }`}
                >
                  <div className="relative aspect-[3/4] max-h-[440px] rounded-sm overflow-hidden border border-[#DCD2D8] bg-[#FAF8F7] shadow-[0_14px_34px_rgba(42,33,40,0.06)]">
                    <StudioPicture
                      mediaId={person.mediaId}
                      objectPosition={person.imagePosition}
                      sizes="(max-width: 640px) 280px, 410px"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-campaign text-xl font-bold text-[#2A2128]">
                        {person.name}
                      </h3>
                      <span className="text-[11px] uppercase tracking-[0.12em] text-[#844D60] font-semibold">
                        {person.experienceYears} yrs
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#493D46]">{person.role}</p>
                    <p className="text-xs text-[#493D46]/90 leading-relaxed line-clamp-2">
                      “{person.quote}”
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry({
                          artisanId: person.id,
                          sourceLabel: `Stylist Request — ${person.name}`,
                        })
                      }
                      className="pt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#2A2128] underline underline-offset-4 hover:text-[#844D60] cursor-pointer"
                    >
                      Book with {person.name.split(' ')[0]} →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
