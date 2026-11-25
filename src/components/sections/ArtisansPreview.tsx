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
  const stickyHostRef = useRef<HTMLDivElement>(null);
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { openEnquiry } = useStudio();

  useGSAP(
    () => {
      if (reducedMotion || !stickyHostRef.current || !trackRef.current || !trackWrapRef.current) {
        return;
      }
      const mm = gsap.matchMedia();

      // Sticky horizontal pan driven cleanly by host container -> zero pin DOM reparenting & zero CLS
      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current!;
        const wrap = trackWrapRef.current!;
        const getScrollDistance = () => Math.max(160, track.scrollWidth - wrap.clientWidth + 24);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stickyHostRef.current,
            start: 'top top+=64',
            end: 'bottom bottom',
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          track,
          {
            x: () => -getScrollDistance(),
            ease: 'none',
          },
          0
        );

        track.querySelectorAll('[data-stylist-card]').forEach((card, idx) => {
          tl.fromTo(
            card,
            { y: idx % 2 === 0 ? 10 : -10 },
            { y: idx % 2 === 0 ? -10 : 10, ease: 'none' },
            0
          );
        });
      });

      return () => mm.revert();
    },
    { scope: stickyHostRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="meet-stylists"
      aria-label="Meet Our Stylists"
      className="bg-[#F4E5DA]/60 border-t border-[#D4BEB0]/60"
    >
      <div ref={stickyHostRef} className="relative lg:h-[185vh]">
        <div className="py-14 lg:py-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 md:px-10 w-full space-y-6">
            {/* Heading Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D4BEB0] pb-4">
              <div className="space-y-1.5">
                <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#874030]">
                  04 · Meet Our Stylists
                </p>
                <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#2C221E]">
                  Dedicated hands behind every appointment.
                </h2>
              </div>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#2C221E] hover:text-[#874030] transition-colors shrink-0"
              >
                All Team Profiles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Desktop: Horizontal Scroll Track | Mobile/Tablet: Native Touch Swipe */}
            <div
              ref={trackWrapRef}
              className="overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar -mx-5 px-5 lg:mx-0 lg:px-0"
            >
              <div ref={trackRef} className="flex gap-6 md:gap-7 w-max items-start pb-2">
                {artisans.map((person, idx) => (
                  <article
                    key={person.id}
                    data-stylist-card
                    className={`group snap-start shrink-0 w-[270px] sm:w-[310px] lg:w-[330px] space-y-3 ${
                      idx % 2 === 1 ? 'lg:mt-4' : ''
                    }`}
                  >
                    <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-[#D4BEB0] bg-[#EFE0D5] shadow-md">
                      <StudioPicture
                        mediaId={person.mediaId}
                        objectPosition={person.imagePosition}
                        sizes="(max-width: 640px) 270px, 340px"
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-sculpt text-xl font-semibold text-[#2C221E]">
                          {person.name}
                        </h3>
                        <span className="text-[11px] uppercase tracking-[0.12em] text-[#874030] font-medium">
                          {person.experienceYears} yrs
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#493B36]">{person.role}</p>
                      <p className="text-xs text-[#493B36]/90 leading-relaxed line-clamp-2">
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
                        className="pt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#2C221E] underline underline-offset-4 hover:text-[#874030] cursor-pointer"
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
      </div>
    </section>
  );
}
