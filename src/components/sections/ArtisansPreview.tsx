import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
  const rail = useRef<HTMLDivElement>(null);
  const { openEnquiry } = useStudio();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      gsap.fromTo('[data-stylist-image]', {
        y: 16,
      }, {
        y: 0,
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', end: 'top 36%', scrub: 0.4 },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  function moveRail(direction: number) {
    const first = rail.current?.querySelector('[data-stylist-card]');
    if (!first || !rail.current) return;
    const gap = parseFloat(getComputedStyle(first.parentElement!).columnGap) || 0;
    rail.current.scrollBy({
      left: (first.getBoundingClientRect().width + gap) * direction,
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }

  return (
    <section
      id="meet-stylists"
      aria-label="Meet Our Stylists"
      className="aera-stylist-section scroll-mt-20"
    >
      <div ref={sectionRef} className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10 w-full space-y-7">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DED2DA] pb-5">
            <div className="space-y-1.5">
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#7B4A60]">
                Meet Our Stylists
              </p>
              <h2 className="font-campaign text-3xl sm:text-4xl font-bold text-[#2A2028]">
                A chair with your name on it.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="aera-stylist-controls flex items-center gap-2" role="group" aria-label="Stylist rail controls">
                <button type="button" aria-label="Previous stylists" aria-controls="studio-stylist-rail"
                  className="rounded-full border border-[#98647A] p-2 hover:bg-[#E8DFED] cursor-pointer" onClick={() => moveRail(-1)}>
                  <ArrowLeft aria-hidden="true" className="size-4" />
                </button>
                <button type="button" aria-label="Next stylists" aria-controls="studio-stylist-rail"
                  className="rounded-full border border-[#98647A] p-2 hover:bg-[#E8DFED] cursor-pointer" onClick={() => moveRail(1)}>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </div>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#2A2028] hover:text-[#7B4A60] transition-colors shrink-0"
              >
                All Stylists <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div ref={rail} id="studio-stylist-rail" data-stylist-rail
            className="aera-stylist-rail overflow-x-auto snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0">
            <div className="aera-stylist-track flex gap-5 md:gap-7 w-max items-start pb-4">
              {artisans.map((person, idx) => (
                <article
                  key={person.id}
                  data-stylist-card
                  className={`group aera-stylist-card snap-start shrink-0 min-w-0 space-y-3 ${
                    idx % 2 === 1 ? 'lg:mt-6' : ''
                  }`}
                >
                  <div data-stylist-image className="relative aspect-[10/11] rounded-t-[45%] rounded-b-sm overflow-hidden bg-[#FCFAFA]">
                    <StudioPicture
                      mediaId={person.mediaId}
                      objectPosition={person.imagePosition}
                      sizes="(max-width: 640px) 78vw, 430px"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover motion-safe:transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-campaign text-xl font-bold text-[#2A2028]">
                        {person.name}
                      </h3>
                      <span className="text-[11px] uppercase tracking-[0.12em] text-[#7B4A60] font-semibold">
                        {person.experienceYears} yrs
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#40343D]">{person.role}</p>
                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry({
                          artisanId: person.id,
                          sourceLabel: `Stylist Request — ${person.name}`,
                        })
                      }
                      className="pt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#2A2028] underline underline-offset-4 hover:text-[#7B4A60] cursor-pointer"
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
