import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MoveHorizontal, RotateCcw } from 'lucide-react';
import { transformationStudies } from '../../config/lookbook.config';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { useStudio } from '../../lib/StudioContext';
import { StudioPicture } from '../layout/StudioPicture';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    code: '01',
    title: 'Personal Hair Mapping',
    description:
      'Every appointment starts beside soft daylight—studying your dry hair movement, density, and face framing before making the first cut.',
    mediaId: 'stage-consultation',
  },
  {
    code: '02',
    title: 'Hand-Painted Colour',
    description:
      'Custom ammonia-free shades are placed with gentle brushwork in natural light so soft highlights grow out evenly without harsh lines.',
    mediaId: 'stage-colour',
  },
  {
    code: '03',
    title: 'Weightless Finish',
    description:
      'Restorative moisture mist and effortless styling leave your hair bouncy, glossy, and easy to manage every morning.',
    mediaId: 'stage-blowout',
  },
];

export function TransformationSection() {
  const [stageIndex, setStageIndex] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const [studyIndex, setStudyIndex] = useState(0);
  // dividerPct = percentage from left where divider line sits (96 = Before, 20 = After revealed)
  const [dividerPct, setDividerPct] = useState(96);
  const [manualOverride, setManualOverride] = useState(false);

  const stickyHostRef = useRef<HTMLDivElement>(null);
  const activeStageRef = useRef(0);
  const dispMapRef = useRef<SVGFEDisplacementMapElement>(null);

  const baContainerRef = useRef<HTMLDivElement>(null);
  const baFrameRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const manualRef = useRef(false);

  const reducedMotion = useReducedMotion();
  const { openEnquiry } = useStudio();

  const currentStage = STAGES[stageIndex] ?? STAGES[0]!;
  const currentStudy = transformationStudies[studyIndex] ?? transformationStudies[0]!;

  const triggerSilkRipple = () => {
    if (reducedMotion || !dispMapRef.current) return;
    const disp = dispMapRef.current;
    gsap.killTweensOf(disp);
    const tl = gsap.timeline();
    tl.to(disp, { attr: { scale: 34 }, duration: 0.32, ease: 'power2.in' }).to(disp, {
      attr: { scale: 0 },
      duration: 0.54,
      ease: 'power3.out',
    });
  };

  useEffect(() => {
    if (stageIndex !== activeStageRef.current) {
      activeStageRef.current = stageIndex;
      triggerSilkRipple();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIndex]);

  // Sticky-scroll progression (uses native CSS sticky -> zero DOM pin-spacer layout shift!)
  useGSAP(
    () => {
      if (reducedMotion || !stickyHostRef.current) return;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const st = ScrollTrigger.create({
          trigger: stickyHostRef.current,
          start: 'top top+=64',
          end: 'bottom bottom',
          scrub: 0.35,
          onUpdate: (self) => {
            setStageProgress(self.progress);
            const computed = Math.min(2, Math.floor(self.progress * 3));
            if (computed !== activeStageRef.current) {
              setStageIndex(computed);
            }
          },
        });
        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: stickyHostRef, dependencies: [reducedMotion] }
  );

  // Scroll-driven Before -> After wipe (pure compositor clip-path + translateX -> zero CLS)
  useGSAP(
    () => {
      if (!baContainerRef.current) return;
      if (reducedMotion) {
        setDividerPct(42);
        return;
      }

      const st = ScrollTrigger.create({
        trigger: baContainerRef.current,
        start: 'top 78%',
        end: 'bottom 58%',
        scrub: 0.35,
        onUpdate: (self) => {
          if (manualRef.current || draggingRef.current) return;
          const next = Math.round(96 - self.progress * 76);
          setDividerPct(next);
        },
      });

      return () => st.kill();
    },
    { scope: baContainerRef, dependencies: [reducedMotion] }
  );

  const handleStageClick = (idx: number) => {
    setStageIndex(idx);
    const host = stickyHostRef.current;
    if (host && typeof window !== 'undefined' && window.innerWidth >= 1024) {
      const hostTop = host.getBoundingClientRect().top + window.scrollY - 64;
      const scrollableRange = Math.max(1, host.offsetHeight - (window.innerHeight - 64));
      const targetProgress = (idx + 0.16) / 3;
      window.scrollTo({ top: hostTop + targetProgress * scrollableRange, behavior: 'smooth' });
    }
  };

  const updateDividerFromClientX = (clientX: number) => {
    const el = baFrameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const pct = Math.max(4, Math.min(96, Math.round(((clientX - rect.left) / rect.width) * 100)));
    manualRef.current = true;
    setManualOverride(true);
    setDividerPct(pct);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateDividerFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateDividerFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer already released
    }
  };

  const resyncScrollCompare = () => {
    manualRef.current = false;
    setManualOverride(false);
    ScrollTrigger.refresh();
  };

  return (
    <section
      id="transformation-section"
      aria-label="How We Craft Your Look & Before / After"
      className="text-[#2C221E]"
    >
      {/* Hidden SVG Liquid Displacement Filter */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="aera-silk-refract" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.024"
              numOctaves="2"
              seed="9"
              result="noise"
            />
            <feDisplacementMap
              ref={dispMapRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* PART A: Sticky Scroll-Driven Liquid Craft Progression */}
      <div
        ref={stickyHostRef}
        className="relative lg:h-[220vh] bg-[#F4E5DA] border-y border-[#D4BEB0]/60"
      >
        <div className="py-16 lg:py-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] flex items-center">
          <div className="max-w-7xl mx-auto px-5 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Integrated Typographic Progression & Progress Line */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#874030]">
                  03 · Our Process
                </p>
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.03] text-[#2C221E]">
                  Every step unfolds calmly as you scroll.
                </h2>
              </div>

              <div className="relative pl-6 border-l border-[#D4BEB0] space-y-6">
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute left-[-1.5px] top-0 w-[3px] bg-[#874030] transition-transform duration-150 origin-top"
                  style={{
                    height: '100%',
                    transform: `scaleY(${Math.max(0.2, Math.min(1, Math.max(stageProgress, (stageIndex + 1) / 3)))})`,
                  }}
                />

                <div className="flex flex-wrap items-center gap-4">
                  {STAGES.map((stage, idx) => {
                    const active = idx === stageIndex;
                    return (
                      <button
                        key={stage.code}
                        type="button"
                        data-stage-step={idx}
                        onClick={() => handleStageClick(idx)}
                        className={`pb-1.5 text-xs uppercase tracking-[0.18em] border-b-2 transition-colors cursor-pointer ${
                          active
                            ? 'border-[#874030] text-[#2C221E] font-semibold'
                            : 'border-transparent text-[#493B36] hover:text-[#874030]'
                        }`}
                      >
                        {stage.code} · {stage.title.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                {/* Stable fixed-min-height copy container (prevents any layout shift across steps) */}
                <div className="space-y-3 min-h-[128px]">
                  <h3 className="font-sculpt text-2xl md:text-3xl font-semibold text-[#2C221E]">
                    {currentStage.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#493B36] max-w-lg leading-relaxed">
                    {currentStage.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Arched Portrait with Inner Liquid Displacement Layer */}
            <div className="lg:col-span-6">
              <div className="relative max-w-md mx-auto">
                <div className="relative aspect-[3/4] rounded-t-[220px] rounded-b-sm overflow-hidden shadow-2xl border-2 border-[#FCFAF7] bg-[#EFE0D5]">
                  <div
                    className="absolute inset-0"
                    style={{ filter: reducedMotion ? 'none' : 'url(#aera-silk-refract)' }}
                  >
                    {STAGES.map((s, idx) => (
                      <div
                        key={s.code}
                        className="absolute inset-0 transition-all duration-700"
                        style={{
                          opacity: idx === stageIndex ? 1 : 0,
                          clipPath: idx === stageIndex ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
                        }}
                      >
                        <StudioPicture
                          mediaId={s.mediaId}
                          sizes="(max-width: 768px) 90vw, 440px"
                          className="w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-x-4 bottom-4 z-10 px-4 py-3 rounded-sm backdrop-blur-md bg-[#FCFAF7]/92 border border-[#D4BEB0]/60 text-xs flex items-center justify-between">
                    <span className="font-medium text-[#2C221E]">
                      Step {currentStage.code} — {currentStage.title}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#874030] font-medium tabular">
                      {stageIndex + 1} / 3
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART B: Scroll-Driven + Direct Drag Interactive Before & After */}
      <div ref={baContainerRef} className="py-20 md:py-28 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#874030]">
                Before &amp; After
              </p>
              <h3 className="font-editorial text-3xl sm:text-4xl font-medium text-[#2C221E] leading-tight">
                Scroll to reveal the transformation, or drag across the photograph.
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {transformationStudies.map((study, idx) => (
                <button
                  key={study.id}
                  type="button"
                  onClick={() => {
                    setStudyIndex(idx);
                    manualRef.current = false;
                    setManualOverride(false);
                  }}
                  className={`px-4 py-2 text-xs rounded-full border transition-colors cursor-pointer ${
                    idx === studyIndex
                      ? 'bg-[#493B36] text-[#FCFAF7] border-[#493B36]'
                      : 'bg-[#F4E5DA] text-[#2C221E] border-[#D4BEB0] hover:bg-[#EFE0D5]'
                  }`}
                >
                  {study.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image IS the Interactive Reveal Control */}
            <div className="lg:col-span-7 space-y-3">
              <div
                ref={baFrameRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="relative aspect-[3/4] max-h-[540px] max-w-lg mx-auto rounded-sm overflow-hidden border border-[#D4BEB0] shadow-xl select-none touch-none cursor-ew-resize"
              >
                {/* Before Photograph */}
                <StudioPicture
                  mediaId={currentStudy.beforeMediaId}
                  altOverride={currentStudy.beforeCaption}
                  sizes="520px"
                  className="w-full h-full"
                />
                <span className="absolute bottom-3.5 left-3.5 z-10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] font-medium rounded-xs bg-[#FCFAF7]/94 text-[#2C221E] shadow-xs pointer-events-none">
                  Before
                </span>

                {/* After Photograph Sweeping Cleanly Over From Right to Left */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 0 0 ${dividerPct}%)` }}
                >
                  <StudioPicture
                    mediaId={currentStudy.afterMediaId}
                    altOverride={currentStudy.afterCaption}
                    sizes="520px"
                    className="w-full h-full"
                  />
                  <span className="absolute bottom-3.5 right-3.5 px-3 py-1 text-[10px] uppercase tracking-[0.14em] font-medium rounded-xs bg-[#493B36]/95 text-[#FCFAF7] shadow-xs">
                    After
                  </span>
                </div>

                {/* Pure Compositor-Driven Divider Handle (Zero CLS!) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{ transform: `translate3d(${dividerPct}%, 0, 0)` }}
                >
                  <div className="absolute inset-y-0 left-0 w-[2px] bg-[#FCFAF7] shadow-[0_0_16px_rgba(44,34,30,0.45)]">
                    <div className="w-10 h-10 -ml-5 rounded-full bg-[#FCFAF7] border-2 border-[#493B36] text-[#493B36] flex items-center justify-center shadow-lg absolute top-1/2 -translate-y-1/2">
                      <MoveHorizontal className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Accessible Keyboard Range Overlay Inside Image */}
                <input
                  id="ba-split-slider"
                  type="range"
                  min={4}
                  max={96}
                  value={dividerPct}
                  aria-label="Before and After transformation divider"
                  onChange={(e) => {
                    manualRef.current = true;
                    setManualOverride(true);
                    setDividerPct(Number(e.target.value));
                  }}
                  className="aera-overlay-range absolute inset-0 w-full h-full z-20"
                />
              </div>

              <p className="text-[11px] text-[#493B36]/90 text-center">{currentStudy.subtitle}</p>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2 border-b border-[#D4BEB0]/60 pb-5">
                <p className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#874030]">
                  {currentStudy.durationLabel}
                </p>
                <p className="text-sm text-[#493B36] leading-relaxed">
                  {currentStudy.recommendedSummary}
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-sm bg-[#F4E5DA]/65 border-l-2 border-[#B76E5D] space-y-1">
                  <p className="font-semibold text-[#2C221E]">{currentStudy.beforeCaption}</p>
                  <p className="text-[#493B36] leading-relaxed">{currentStudy.beforeNote}</p>
                </div>
                <div className="p-4 rounded-sm bg-[#EFE0D5] border-l-2 border-[#493B36] space-y-1">
                  <p className="font-semibold text-[#2C221E]">{currentStudy.afterCaption}</p>
                  <p className="text-[#493B36] leading-relaxed">{currentStudy.afterNote}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    openEnquiry({
                      serviceId: currentStudy.serviceId,
                      sourceLabel: `Before & After (${currentStudy.label})`,
                    })
                  }
                  className="px-6 py-3.5 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#874030] transition-colors cursor-pointer"
                >
                  Book This Service
                </button>

                {manualOverride && (
                  <button
                    type="button"
                    onClick={resyncScrollCompare}
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-sm border border-[#D4BEB0] text-xs text-[#493B36] hover:bg-[#F4E5DA] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Sync to Scroll
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
