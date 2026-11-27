import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, RotateCcw } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { heroRoom } from '../../config/media.config';
import { studioConfig } from '../../config/studio.config';
import { useStudio } from '../../lib/StudioContext';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { StudioPicture } from '../layout/StudioPicture';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { openEnquiry, triggerEntranceReplay } = useStudio();
  const reducedMotion = useReducedMotion();
  const hero = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion || !hero.current) return;

    gsap.timeline({
      scrollTrigger: { trigger: hero.current, start: 'top top', end: 'bottom 20%', scrub: 0.45 },
    })
      .to('[data-hero-stage]', { scale: 1.045, y: -34, ease: 'none' }, 0)
      .to('[data-hero-detail]', { x: 22, y: 54, rotate: 2, ease: 'none' }, 0)
      .to('[data-hero-thread]', { scaleY: 0.2, y: 28, ease: 'none' }, 0);
  }, { scope: hero, dependencies: [reducedMotion], revertOnUpdate: true });

  return (
    <section ref={hero} id="studio-hero" aria-label={`${studioConfig.brand.fullName} Welcome`} className="aera-hero">
      <div className="aera-hero-inner">
        <div className="aera-hero-coordinate">
          <span>{studioConfig.locale.neighborhood}, {studioConfig.locale.city}</span>
          <button
            type="button"
            onClick={triggerEntranceReplay}
            className="inline-flex items-center gap-2 hover:text-[#7B4A60] motion-reduce:hidden cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> Replay Entrance
          </button>
        </div>

        <div className="aera-hero-scene">
          <div data-hero-stage className="aera-hero-room">
            <StudioPicture
              mediaId={heroRoom.mediaId}
              priority
              objectPosition="52% 48%"
              sizes={heroRoom.sizes}
              className="w-full h-full"
            />
          </div>
          <div className="aera-hero-wash" aria-hidden="true" />
          <div data-hero-detail className="aera-hero-portrait">
            <Link to="/services?pillar=hair-craft" aria-label="Explore haircuts and styling" className="group block size-full">
              <StudioPicture
                mediaId="hero-craft"
                objectPosition="57% 34%"
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 195px, 140px"
                className="size-full"
                imgClassName="size-full object-cover motion-safe:transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </Link>
          </div>
          <div className="aera-hero-copy">
            <p className="text-[11px] uppercase tracking-[0.23em] font-semibold text-[#7B4A60]">
              {studioConfig.brand.entranceSubline}
            </p>
            <h1 className="aera-hero-wordmark font-campaign">{studioConfig.brand.name}</h1>
            <p className="aera-hero-headline font-whisper">{studioConfig.brand.heroHeadline}</p>
            <p className="aera-hero-description">{studioConfig.brand.heroDescription}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
              <button
                type="button"
                onClick={() => openEnquiry({ sourceLabel: 'Homepage Hero CTA' })}
                className="px-6 py-3.5 rounded-full bg-[#40343D] text-[#FCFAFA] text-[11px] uppercase tracking-[0.16em] font-semibold hover:bg-[#7B4A60] transition-colors cursor-pointer"
              >
                Book a Visit
              </button>
              <a
                href="#living-mirrors"
                onClick={(event) => {
                  const target = document.getElementById('living-mirrors');
                  if (!target) return;
                  event.preventDefault();
                  target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });
                  target.focus({ preventScroll: true });
                }}
                className="inline-flex items-center gap-1.5 py-2 text-[11px] uppercase tracking-[0.14em] font-semibold border-b border-[#98647A] hover:text-[#7B4A60] transition-colors"
              >
                Explore Mirrors <ArrowDown aria-hidden="true" className="w-3.5 h-3.5 text-[#7B4A60]" />
              </a>
            </div>
          </div>
          <div data-hero-thread className="aera-hero-thread" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
