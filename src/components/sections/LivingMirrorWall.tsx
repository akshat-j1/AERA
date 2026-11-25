import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mirrorPillars, salonServices, type PillarId } from '../../config/services.config';
import { formatCurrency, formatDuration } from '../../lib/format';
import { useStudio } from '../../lib/StudioContext';
import { StudioPicture } from '../layout/StudioPicture';

export function LivingMirrorWall() {
  const [activePillar, setActivePillar] = useState<PillarId>('hair-craft');
  const wallScrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { openEnquiry } = useStudio();

  const currentMirror = mirrorPillars.find((m) => m.id === activePillar) ?? mirrorPillars[0]!;
  const pillarServices = salonServices.filter((s) => s.pillarId === activePillar).slice(0, 2);

  useEffect(() => {
    const container = wallScrollRef.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;

    const leftPct = parseFloat(currentMirror.hotspotStyle.left) / 100;
    const widthPct = parseFloat(currentMirror.hotspotStyle.width) / 100;
    const centerPx = (leftPct + widthPct / 2) * container.scrollWidth;
    const targetScroll = Math.max(0, centerPx - container.clientWidth / 2);

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  }, [activePillar, currentMirror]);

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
      id="living-mirrors"
      aria-label="Interactive Salon Mirrors"
      className="py-20 md:py-28 bg-[#FCFAF7] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-10">
        {/* Clean Natural Section Intro */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7 space-y-2">
            <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#874030]">
              02 · Services Overview
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium text-[#2C221E] leading-[1.06]">
              Look into each studio mirror to explore our services.
            </h2>
          </div>
          <p className="md:col-span-5 text-sm text-[#493B36] md:text-right leading-relaxed">
            Select a mirror on the salon wall to clear the frost and view signature treatments and pricing.
          </p>
        </div>

        {/* Living Mirror Elevation Wall + Warm Travertine Console */}
        <div className="rounded-sm overflow-hidden border border-[#D4BEB0] shadow-[0_20px_50px_rgba(44,34,30,0.08)] bg-[#F4E5DA]">
          <div ref={wallScrollRef} className="overflow-x-auto no-scrollbar">
            <div className="relative min-w-[700px] w-full aspect-[16/9]">
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
                      tabIndex={isActive ? 0 : -1}
                      aria-selected={isActive}
                      aria-controls="mirror-console-ledger"
                      onClick={() => setActivePillar(mirror.id)}
                      onMouseEnter={() => setActivePillar(mirror.id)}
                      onKeyDown={(e) => handleMirrorKeyDown(e, idx)}
                      className={`group absolute overflow-hidden cursor-pointer focus:outline-none border transition-all duration-500 ${
                        isActive
                          ? 'mirror-active border-[#874030] ring-2 ring-[#FCFAF7]/90 shadow-[0_0_28px_rgba(183,110,93,0.42)]'
                          : 'border-transparent hover:border-[#B76E5D]/60'
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
                        objectPosition={mirror.reflectionObjectPosition}
                        sizes="360px"
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-[1.02]"
                      />

                      <div className="mirror-veil absolute inset-0 pointer-events-none" />

                      <span
                        className={`absolute bottom-2 inset-x-1.5 py-1 px-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.12em] rounded-xs text-center whitespace-nowrap transition-colors ${
                          isActive
                            ? 'bg-[#493B36] text-[#FCFAF7] font-medium'
                            : 'bg-[#FCFAF7]/94 text-[#2C221E]'
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

          {/* Mobile Quick Selector Bar */}
          <div className="flex md:hidden border-t border-[#D4BEB0]/60 bg-[#EFE0D5] overflow-x-auto no-scrollbar">
            {mirrorPillars.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActivePillar(m.id)}
                className={`px-4 py-3 text-[11px] whitespace-nowrap border-r border-[#D4BEB0]/50 cursor-pointer ${
                  m.id === activePillar
                    ? 'bg-[#493B36] text-[#FCFAF7] font-medium'
                    : 'text-[#493B36]'
                }`}
              >
                {m.mirrorIndex} · {m.title}
              </button>
            ))}
          </div>

          {/* Integrated Service Ledger Below Wall Shelf */}
          <div
            id="mirror-console-ledger"
            role="tabpanel"
            className="p-6 md:p-8 bg-[#FCFAF7] border-t border-[#D4BEB0]/70 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-5 space-y-2">
              <p className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#874030]">
                Mirror {currentMirror.mirrorIndex} · {currentMirror.startingLabel}
              </p>
              <h3 className="font-sculpt text-2xl font-semibold text-[#2C221E]">
                {currentMirror.title}
              </h3>
              <p className="text-xs md:text-sm text-[#493B36] leading-relaxed">
                {currentMirror.subtitle}
              </p>
            </div>

            <div className="lg:col-span-4 space-y-3 border-y lg:border-y-0 lg:border-x border-[#D4BEB0]/55 py-4 lg:py-0 lg:px-6">
              {pillarServices.map((svc) => (
                <div key={svc.id} className="flex items-baseline justify-between gap-3 text-xs">
                  <div>
                    <p className="font-medium text-[#2C221E]">{svc.name}</p>
                    <p className="text-[11px] text-[#493B36]/80">
                      {formatDuration(svc.durationMinutes)}
                    </p>
                  </div>
                  <span className="font-semibold text-[#2C221E] tabular shrink-0">
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
                className="flex-1 py-3 px-4 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs uppercase tracking-[0.14em] hover:bg-[#874030] transition-colors cursor-pointer text-center"
              >
                Book This Service
              </button>
              <Link
                to={`/services?pillar=${currentMirror.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-sm border border-[#493B36]/35 text-xs text-[#2C221E] hover:bg-[#F4E5DA] transition-colors"
              >
                Full Service Menu <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
