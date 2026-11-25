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
      aria-label="Interactive Living Salon Mirrors"
      className="py-20 md:py-28 bg-[#F3EEF5] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#504348]">
              02 · The Living Mirror Room
            </p>
            <h2 className="font-sculpt text-3xl md:text-4xl font-semibold text-[#2D2328] leading-tight">
              Touch any studio mirror{' '}
              <span className="font-whisper font-normal text-[#504348]">to preview the ritual inside.</span>
            </h2>
          </div>
          <p className="text-xs text-[#504348] max-w-xs">
            Built directly into the porcelain plaster wall—select a mirror to clear the silk mist and view starting investments.
          </p>
        </div>

        {/* Continuous Panoramic Wall Elevation + Travertine Console Shelf */}
        <div className="rounded-sm overflow-hidden border border-[#C8B49D]/55 shadow-lg bg-[#F8F5F1]">
          {/* Horizontal Pan Wrapper on narrow screens so all 4 mirrors stay spacious and touchable */}
          <div ref={wallScrollRef} className="overflow-x-auto no-scrollbar">
            <div className="relative min-w-[700px] w-full aspect-[16/9]">
              <StudioPicture
                mediaId="mirror-wall"
                sizes="(max-width: 768px) 760px, 1280px"
                className="w-full h-full"
              />

              {/* Four Living Mirrors Embedded at Exact Plaster Wall Coordinates */}
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
                          ? 'mirror-active border-[#504348] ring-1 ring-[#F8F5F1]/75 shadow-[0_0_24px_rgba(200,180,157,0.55)]'
                          : 'border-transparent hover:border-[#504348]/45'
                      }`}
                      style={{
                        left: mirror.hotspotStyle.left,
                        top: mirror.hotspotStyle.top,
                        width: mirror.hotspotStyle.width,
                        height: mirror.hotspotStyle.height,
                        borderRadius: mirror.hotspotStyle.borderRadius,
                      }}
                    >
                      {/* Human portrait reflected visibly inside each mirror */}
                      <StudioPicture
                        mediaId={mirror.reflectionMediaId}
                        objectPosition={mirror.reflectionObjectPosition}
                        sizes="320px"
                        className="w-full h-full"
                        imgClassName={`w-full h-full object-cover transition-transform duration-700 ${
                          isActive ? 'scale-[1.03]' : 'scale-100 group-hover:scale-[1.02]'
                        }`}
                      />
                      {/* Translucent silk mist gently softens non-selected mirrors */}
                      <div className="mirror-veil absolute inset-0 pointer-events-none" />

                      {/* Crisp Architectural Mirror Label */}
                      <span
                        className={`absolute bottom-2 inset-x-1.5 py-1 px-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.12em] rounded-xs text-center whitespace-nowrap transition-colors ${
                          isActive
                            ? 'bg-[#504348] text-[#F8F5F1]'
                            : 'bg-[#F8F5F1]/92 text-[#2D2328]'
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

          {/* Mobile Quick Mirror Strip (Syncs directly without requiring horizontal wall scroll) */}
          <div className="flex md:hidden border-t border-[#C8B49D]/40 bg-[#EFE9E4] overflow-x-auto no-scrollbar">
            {mirrorPillars.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActivePillar(m.id)}
                className={`px-3.5 py-2.5 text-[11px] whitespace-nowrap border-r border-[#C8B49D]/35 ${
                  m.id === activePillar ? 'bg-[#504348] text-[#F8F5F1] font-medium' : 'text-[#504348]'
                }`}
              >
                {m.mirrorIndex} · {m.title}
              </button>
            ))}
          </div>

          {/* Travertine Console Shelf Ledger (Integrated below the physical shelf edge) */}
          <div
            id="mirror-console-ledger"
            role="tabpanel"
            className="p-6 md:p-8 bg-[#F8F5F1] border-t border-[#C8B49D]/55 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-5 space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#504348]">
                Mirror {currentMirror.mirrorIndex} · {currentMirror.startingLabel}
              </p>
              <h3 className="font-sculpt text-2xl font-semibold text-[#2D2328]">
                {currentMirror.title}
              </h3>
              <p className="text-xs md:text-sm text-[#504348] leading-relaxed">
                {currentMirror.subtitle}
              </p>
            </div>

            <div className="lg:col-span-4 space-y-2.5 border-y lg:border-y-0 lg:border-x border-[#C8B49D]/40 py-4 lg:py-0 lg:px-6">
              {pillarServices.map((svc) => (
                <div key={svc.id} className="flex items-baseline justify-between gap-3 text-xs">
                  <div>
                    <p className="font-medium text-[#2D2328]">{svc.name}</p>
                    <p className="text-[11px] text-[#504348]/80">{formatDuration(svc.durationMinutes)}</p>
                  </div>
                  <span className="font-semibold text-[#2D2328] tabular shrink-0">
                    {formatCurrency(svc.startingPriceInr)}
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
                    sourceLabel: `Living Mirror ${currentMirror.mirrorIndex} — ${currentMirror.title}`,
                  })
                }
                className="flex-1 py-3 px-4 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.14em] hover:bg-[#3A2E33] transition-colors cursor-pointer text-center"
              >
                Request Ritual
              </button>
              <Link
                to={`/services?pillar=${currentMirror.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-sm border border-[#504348]/35 text-xs text-[#2D2328] hover:bg-[#E6DDEB]/45 transition-colors"
              >
                Full Ritual Menu <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
