import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { mirrorPillars, salonServices, type PillarId } from '../../config/services.config';
import { formatCurrency, formatDuration } from '../../lib/format';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { useStudio } from '../../lib/StudioContext';
import { StudioPicture } from '../layout/StudioPicture';

gsap.registerPlugin(ScrollTrigger);

export function LivingMirrorWall() {
  const [activePillar, setActivePillar] = useState<PillarId>('hair-craft');
  const sectionRef = useRef<HTMLDivElement>(null);
  const wallScrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const { openEnquiry } = useStudio();

  const currentMirror = mirrorPillars.find((m) => m.id === activePillar) ?? mirrorPillars[0]!;
  const pillarServices = salonServices.filter((s) => s.pillarId === activePillar).slice(0, 2);

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;
      gsap.fromTo('[data-mirror-reveal]', {
        clipPath: 'inset(0 0 8% 4% round 7% 5% 1% 2%)',
        x: -16,
        y: 22,
      }, {
        clipPath: 'inset(0 0 0 0 round 2px)',
        x: 0,
        y: 0,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 94%', end: 'top 46%', scrub: 0.4 },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  useEffect(() => {
    const container = wallScrollRef.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;

    const leftPct = parseFloat(currentMirror.hotspotStyle.left) / 100;
    const widthPct = parseFloat(currentMirror.hotspotStyle.width) / 100;
    const centerPx = (leftPct + widthPct / 2) * container.scrollWidth;
    const targetScroll = Math.max(0, centerPx - container.clientWidth / 2);

    container.scrollTo({
      left: targetScroll,
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }, [currentMirror, reducedMotion]);

  const focusMirrorAt = (targetIdx: number) => {
    const target = mirrorPillars[targetIdx];
    if (!target) return;
    setActivePillar(target.id);
    tabRefs.current[targetIdx]?.focus();
  };

  const handleMirrorKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusMirrorAt((idx + 1) % mirrorPillars.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusMirrorAt((idx - 1 + mirrorPillars.length) % mirrorPillars.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusMirrorAt(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusMirrorAt(mirrorPillars.length - 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="living-mirrors"
      tabIndex={-1}
      aria-label="Interactive Salon Mirrors"
      className="aera-mirror-room pt-12 pb-14 md:pt-16 md:pb-18 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-7">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7 space-y-2">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#7B4A60]">
              The Mirror Room
            </p>
            <h2 className="font-campaign text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2028] leading-[1.04]">
              Find your ritual.
            </h2>
          </div>
          <p className="md:col-span-5 text-sm text-[#40343D] md:text-right leading-relaxed">
            Select a mirror for treatments, timing and prices.
          </p>
        </div>

        <div
          className="rounded-sm overflow-hidden border border-[#DED2DA] bg-[#F5F0F3]"
        >
          <div data-mirror-reveal ref={wallScrollRef} className="overflow-x-auto no-scrollbar">
            <div className="relative min-w-[700px] w-full aspect-[1376/768]">
              <StudioPicture
                mediaId="mirror-wall"
                sizes="(max-width: 768px) 760px, 1280px"
                className="w-full h-full"
              />

              <div role="tablist" aria-label="Salon Service Mirrors">
                {mirrorPillars.map((mirror, idx) => {
                  const isActive = mirror.id === activePillar;
                  return (
                    <button
                      key={mirror.id}
                      ref={(el) => {
                        tabRefs.current[idx] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`mirror-tab-${mirror.id}`}
                      aria-label={`${mirror.mirrorIndex} · ${mirror.shortLabel}`}
                      tabIndex={isActive ? 0 : -1}
                      aria-selected={isActive}
                      aria-controls="mirror-console-ledger"
                      onClick={() => setActivePillar(mirror.id)}
                      onPointerEnter={(event) => {
                        if (event.pointerType === 'mouse' && !event.currentTarget.closest('[role="tablist"]')?.matches(':focus-within')) {
                          setActivePillar(mirror.id);
                        }
                      }}
                      onKeyDown={(e) => handleMirrorKeyDown(e, idx)}
                      className={`group absolute overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 border motion-safe:transition-colors duration-300 ${
                        isActive
                          ? 'mirror-active border-[#65524e]'
                          : 'border-transparent hover:border-[#65524e]/70'
                      }`}
                      style={{
                        left: mirror.hotspotStyle.left,
                        top: mirror.hotspotStyle.top,
                        width: mirror.hotspotStyle.width,
                        height: mirror.hotspotStyle.height,
                        borderRadius: mirror.hotspotStyle.borderRadius,
                      }}
                    >
                      <StudioPicture
                        mediaId={mirror.reflectionMediaId}
                        altOverride=""
                        objectPosition={mirror.reflectionObjectPosition}
                        sizes="360px"
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover mirror-reflection"
                      />

                      <div className="mirror-glass-sheen absolute inset-0 pointer-events-none" />
                      <div className="mirror-veil absolute inset-0 pointer-events-none" />

                      <span
                        aria-hidden="true"
                        className={`absolute bottom-2.5 inset-x-2 py-1 px-2 text-[9px] md:text-[10px] uppercase tracking-[0.14em] rounded-xs text-center whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-[#2A2028]/88 text-[#FCFAFA] font-medium backdrop-blur-xs'
                            : 'bg-[#FCFAFA]/82 text-[#40343D] backdrop-blur-xs'
                        }`}
                      >
                        {mirror.mirrorIndex} · {mirror.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex md:hidden border-t border-[#DED2DA] bg-[#E8DFED]/55 overflow-x-auto no-scrollbar">
            {mirrorPillars.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActivePillar(m.id)}
                aria-pressed={m.id === activePillar}
                className={`px-4 py-3 text-[11px] whitespace-nowrap border-r border-[#DED2DA] cursor-pointer ${
                  m.id === activePillar
                    ? 'bg-[#40343D] text-[#FCFAFA] font-medium'
                    : 'text-[#40343D]'
                }`}
              >
                {m.mirrorIndex} · {m.title}
              </button>
            ))}
          </div>

          <div
            id="mirror-console-ledger"
            role="tabpanel"
            aria-labelledby={`mirror-tab-${activePillar}`}
            className="p-6 md:p-8 bg-[#FCFAFA] border-t border-[#DED2DA] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div key={activePillar} className="aera-ledger-copy lg:col-span-5 space-y-2">
              <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#7B4A60]">
                Mirror {currentMirror.mirrorIndex} · {currentMirror.startingLabel}
              </p>
              <h3 className="font-campaign text-2xl font-bold text-[#2A2028]">
                {currentMirror.title}
              </h3>
              <p className="text-xs md:text-sm text-[#40343D] leading-relaxed">
                {currentMirror.subtitle}
              </p>
            </div>

            <div className="lg:col-span-4 space-y-3 border-y lg:border-y-0 lg:border-x border-[#DED2DA] py-4 lg:py-0 lg:px-6">
              {pillarServices.map((svc) => (
                <div key={svc.id} className="flex items-baseline justify-between gap-3 text-xs">
                  <div>
                    <p className="font-medium text-[#2A2028]">{svc.name}</p>
                    <p className="text-[11px] text-[#40343D]/80">
                      {formatDuration(svc.durationMinutes)}
                    </p>
                  </div>
                  <span className="font-semibold text-[#2A2028] tabular shrink-0">
                    From {formatCurrency(svc.startingPriceInr)}
                  </span>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3 flex flex-wrap lg:flex-col gap-2.5">
              <button
                type="button"
                onClick={() =>
                  openEnquiry({
                    serviceId: pillarServices[0]?.id,
                    sourceLabel: `${currentMirror.title} Inquiry`,
                  })
                }
                className="flex-1 py-3 px-4 rounded-full bg-[#40343D] text-[#FCFAFA] text-xs uppercase tracking-[0.14em] hover:bg-[#7B4A60] transition-colors cursor-pointer text-center"
              >
                Book Service
              </button>
              <Link
                to={`/services?pillar=${currentMirror.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-sm border border-[#DED2DA] bg-[#FCFAFA] text-xs uppercase tracking-[0.12em] text-[#2A2028] hover:border-[#7B4A60]/55 hover:bg-[#F5F0F3] transition-colors"
              >
                Full Menu <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
