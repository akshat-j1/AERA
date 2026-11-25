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
    title: 'Quiet Daylight Mapping',
    description:
      'Every appointment starts beside natural window light—studying your dry hair movement, density, and face framing before making the first cut.',
    mediaId: 'stage-consultation',
  },
  {
    code: '02',
    title: 'Hand-Painted Dimension',
    description:
      'Custom ammonia-free shades are placed with gentle brushwork in true daylight so subtle highlights grow out seamlessly without harsh banding.',
    mediaId: 'stage-colour',
  },
  {
    code: '03',
    title: 'Weightless Gloss Finish',
    description:
      'Restorative botanical moisture mist and relaxed brushwork leave hair bouncy, reflective, and naturally effortless days later.',
    mediaId: 'stage-blowout',
  },
];

export function TransformationSection() {
  const [stageIndex, setStageIndex] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const [studyIndex, setStudyIndex] = useState(0);
  // 96% = 100% Before revealed, 6% = After revealed across frame
  const [dividerPct, setDividerPct] = useState(96);
  const [manualOverride, setManualOverride] = useState(false);

  const stickyHostRef = useRef<HTMLDivElement>(null);
  const activeStageRef = useRef(0);
  const dispMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const activeMaskRef = useRef<HTMLDivElement>(null);

  const baPinHostRef = useRef<HTMLDivElement>(null);
  const baFrameRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const manualRef = useRef(false);

  const reducedMotion = useReducedMotion();
  const { openEnquiry } = useStudio();

  const currentStage = STAGES[stageIndex] ?? STAGES[0]!;
  const currentStudy = transformationStudies[studyIndex] ?? transformationStudies[0]!;

  const triggerLiquidWave = () => {
    if (reducedMotion || !dispMapRef.current) return;
    const disp = dispMapRef.current;
    const turb = turbRef.current;

    gsap.killTweensOf(disp);
    if (turb) gsap.killTweensOf(turb);

    const tl = gsap.timeline();
    tl.fromTo(
      disp,
      { attr: { scale: 0 } },
      { attr: { scale: 88 }, duration: 0.28, ease: 'power2.in' }
    ).to(disp, {
      attr: { scale: 0 },
      duration: 0.68,
      ease: 'power3.out',
    });

    if (turb) {
      gsap
        .timeline()
        .fromTo(
          turb,
          { attr: { baseFrequency: '0.008 0.014' } },
          { attr: { baseFrequency: '0.022 0.044' }, duration: 0.3, ease: 'power2.in' }
        )
        .to(turb, {
          attr: { baseFrequency: '0.008 0.014' },
          duration: 0.66,
          ease: 'power3.out',
        });
    }

    if (activeMaskRef.current) {
      gsap.fromTo(
        activeMaskRef.current,
        { clipPath: 'circle(16% at 50% 50%)' },
        { clipPath: 'circle(92% at 50% 50%)', duration: 0.82, ease: 'power2.out' }
      );
    }
  };

  useEffect(() => {
    if (stageIndex !== activeStageRef.current) {
      activeStageRef.current = stageIndex;
      triggerLiquidWave();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIndex]);

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

  // Pinned Before & After Scroll Wipe
  useGSAP(
    () => {
      if (!baPinHostRef.current) return;
      if (reducedMotion) {
        setDividerPct(42);
        return;
      }

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const st = ScrollTrigger.create({
          trigger: baPinHostRef.current,
          start: 'top top+=64',
          end: 'bottom bottom',
          scrub: 0.25,
          onUpdate: (self) => {
            if (manualRef.current || draggingRef.current) return;
            const next = Math.round(96 - self.progress * 90);
            setDividerPct(next);
          },
        });
        return () => st.kill();
      });

      mm.add('(max-width: 1023px)', () => {
        const st = ScrollTrigger.create({
          trigger: baPinHostRef.current,
          start: 'top 76%',
          end: 'bottom 58%',
          scrub: 0.3,
          onUpdate: (self) => {
            if (manualRef.current || draggingRef.current) return;
            const next = Math.round(96 - self.progress * 72);
            setDividerPct(next);
          },
        });
        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: baPinHostRef, dependencies: [reducedMotion] }
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

  const handleDividerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      manualRef.current = true;
      setManualOverride(true);
      setDividerPct((p) => Math.max(4, p - 4));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      manualRef.current = true;
      setManualOverride(true);
      setDividerPct((p) => Math.min(96, p + 4));
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
      aria-label="Our Process and Before & After"
      className="text-[#2A2128] scroll-mt-20"
    >
      {/* Hidden SVG Liquid Wave Displacement Filter */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="aera-silk-refract" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.008 0.014"
              numOctaves="3"
              seed="11"
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

      {/* PART A: Sticky Our Process Sequence + Bleed-Safe Liquid Ripple */}
      <div
        ref={stickyHostRef}
        className="relative lg:h-[225vh] bg-[#E7DFEB]/45 border-y border-[#DCD2D8]"
      >
        <div className="py-16 lg:py-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] flex items-center">
          <div className="max-w-7xl mx-auto px-5 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#844D60]">
                  02 · Our Process
                </p>
                <h2 className="font-campaign text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.03] text-[#2A2128]">
                  Crafted slowly, from quiet diagnosis to weightless shine.
                </h2>
              </div>

              <div className="relative pl-6 border-l border-[#DCD2D8] space-y-6">
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute left-[-1.5px] top-0 w-[3px] bg-[#844D60] transition-transform duration-150 origin-top"
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
                            ? 'border-[#844D60] text-[#2A2128] font-semibold'
                            : 'border-transparent text-[#493D46] hover:text-[#844D60]'
                        }`}
                      >
                        {stage.code} · {stage.title.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3 min-h-[128px]">
                  <h3 className="font-editorial text-2xl md:text-3xl font-semibold text-[#2A2128]">
                    {currentStage.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#493D46] max-w-lg leading-relaxed">
                    {currentStage.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Static outer arch + oversized inner bleed (-inset-4) so wave refraction NEVER leaves white border teeth */}
            <div className="lg:col-span-6">
              <div className="relative max-w-md mx-auto">
                <div className="relative aspect-[3/4] rounded-t-[220px] rounded-b-sm overflow-hidden shadow-2xl border-2 border-[#FAF8F7] bg-[#F2EEF1]">
                  <div
                    className="absolute -inset-4"
                    style={{ filter: reducedMotion ? 'none' : 'url(#aera-silk-refract)' }}
                  >
                    {STAGES.map((s, idx) => (
                      <div
                        key={s.code}
                        ref={idx === stageIndex ? activeMaskRef : undefined}
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                          opacity: idx === stageIndex ? 1 : 0,
                          zIndex: idx === stageIndex ? 2 : 1,
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
                  <div className="absolute inset-x-4 bottom-4 z-10 px-4 py-3 rounded-sm backdrop-blur-md bg-[#FAF8F7]/92 border border-[#DCD2D8] text-xs flex items-center justify-between">
                    <span className="font-medium text-[#2A2128]">
                      Step {currentStage.code} — {currentStage.title}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#844D60] font-semibold tabular">
                      {stageIndex + 1} / 3
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART B: Pinned Before & After Transformation (Clean Architectural Glaze Inside Photo — Zero Mid-Frame Text Slice) */}
      <div ref={baPinHostRef} className="relative lg:h-[210vh] bg-[#FAF8F7] border-b border-[#DCD2D8]">
        <div className="py-16 lg:py-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] flex items-center">
          <div className="max-w-7xl mx-auto px-5 md:px-10 w-full space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#844D60]">
                  03 · Before &amp; After
                </p>
                <h3 className="font-campaign text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2128] leading-tight">
                  Scroll slowly to reveal the cut &amp; gloss plan—or drag directly inside the photo.
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
                        ? 'bg-[#493D46] text-[#FAF8F7] border-[#493D46]'
                        : 'bg-[#F2EEF1] text-[#2A2128] border-[#DCD2D8] hover:bg-[#E7DFEB]'
                    }`}
                  >
                    {study.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Interactive Photo Canvas Only — Zero Mid-Image Sliced Text & Zero Separate Control Bar */}
              <div className="lg:col-span-6 space-y-2.5">
                <div
                  ref={baFrameRef}
                  data-ba-divider={dividerPct}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className="relative aspect-[3/4] max-h-[500px] max-w-[400px] mx-auto rounded-sm overflow-hidden border border-[#DCD2D8] shadow-xl select-none touch-none cursor-ew-resize bg-[#F2EEF1]"
                >
                  {/* Base Before Subject */}
                  <StudioPicture
                    mediaId={currentStudy.beforeMediaId}
                    altOverride={currentStudy.beforeCaption}
                    sizes="420px"
                    className="w-full h-full pointer-events-none"
                  />
                  <span className="absolute bottom-3.5 left-3.5 z-10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] font-medium rounded-xs bg-[#FAF8F7]/94 text-[#2A2128] shadow-xs pointer-events-none">
                    Before
                  </span>

                  {/* Sweeping After Layer: either genuine same-subject render OR clean lilac architectural mapping glaze over identical locked subject */}
                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ clipPath: `inset(0 0 0 ${dividerPct}%)` }}
                  >
                    {currentStudy.afterMediaId ? (
                      <StudioPicture
                        mediaId={currentStudy.afterMediaId}
                        altOverride={currentStudy.afterCaption}
                        sizes="420px"
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <StudioPicture
                          mediaId={currentStudy.beforeMediaId}
                          altOverride={currentStudy.afterCaption}
                          sizes="420px"
                          className="w-full h-full"
                        />
                        {/* Clean Silk Lilac-Rose Architectural Hairline Glaze (Zero Cut Paragraph Cards!) */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-tr from-[#493D46]/25 via-[#E7DFEB]/65 to-[#D8ADB6]/60"
                        />
                        <svg
                          viewBox="0 0 400 533"
                          className="absolute inset-0 w-full h-full opacity-70 pointer-events-none"
                          aria-hidden="true"
                        >
                          <path
                            d="M170 118 C238 145, 295 240, 326 355"
                            fill="none"
                            stroke="#FAF8F7"
                            strokeWidth="2"
                            strokeDasharray="5 5"
                          />
                          <path
                            d="M155 152 C215 190, 268 275, 296 365"
                            fill="none"
                            stroke="#844D60"
                            strokeWidth="1.75"
                          />
                          <circle cx="296" cy="365" r="5" fill="#FAF8F7" stroke="#844D60" strokeWidth="2" />
                          <circle cx="326" cy="355" r="4" fill="#844D60" />
                        </svg>
                        <span className="absolute top-3.5 right-3.5 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-semibold rounded-xs bg-[#FAF8F7]/92 text-[#844D60]">
                          Consultation Plan
                        </span>
                      </div>
                    )}

                    <span className="absolute bottom-3.5 right-3.5 px-3 py-1 text-[10px] uppercase tracking-[0.14em] font-medium rounded-xs bg-[#493D46] text-[#FAF8F7] shadow-xs">
                      {currentStudy.afterMediaId ? 'After' : 'After Plan'}
                    </span>
                  </div>

                  {/* Single Accessible Direct-Drag Divider Inside Photograph */}
                  <div
                    role="slider"
                    id="ba-split-slider"
                    tabIndex={0}
                    aria-label="Before and After transformation divider"
                    aria-valuemin={4}
                    aria-valuemax={96}
                    aria-valuenow={dividerPct}
                    onKeyDown={handleDividerKeyDown}
                    className="sr-only"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ transform: `translate3d(${dividerPct}%, 0, 0)` }}
                  >
                    <div className="absolute inset-y-0 left-0 w-[2px] bg-[#FAF8F7] shadow-[0_0_16px_rgba(42,33,40,0.45)]">
                      <div className="w-10 h-10 -ml-5 rounded-full bg-[#FAF8F7] border-2 border-[#493D46] text-[#493D46] flex items-center justify-center shadow-lg absolute top-1/2 -translate-y-1/2">
                        <MoveHorizontal className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#493D46] text-center max-w-md mx-auto">
                  {currentStudy.subtitle}
                </p>
              </div>

              {/* Complete Transformation Breakdown + Target Swatch in Clean Non-Clipped Column */}
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2 border-b border-[#DCD2D8] pb-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#844D60]">
                    {currentStudy.durationLabel}
                  </p>
                  <p className="text-sm text-[#493D46] leading-relaxed">
                    {currentStudy.recommendedSummary}
                  </p>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="p-4 rounded-sm bg-[#F2EEF1] border-l-2 border-[#B77F91] space-y-1">
                    <p className="font-semibold text-[#2A2128]">{currentStudy.beforeCaption}</p>
                    <p className="text-[#493D46] leading-relaxed">{currentStudy.beforeNote}</p>
                  </div>

                  <div className="p-4 rounded-sm bg-[#E7DFEB]/55 border-l-2 border-[#493D46] space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-14 rounded-xs overflow-hidden border border-[#DCD2D8] shrink-0">
                        <StudioPicture
                          mediaId={currentStudy.targetSwatchMediaId}
                          altOverride={currentStudy.targetSwatchLabel}
                          sizes="64px"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-[#2A2128]">{currentStudy.afterCaption}</p>
                        <p className="text-[11px] text-[#844D60] font-medium">
                          {currentStudy.targetSwatchLabel}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-1 text-[#493D46]">
                      {currentStudy.proposedSteps.map((step) => (
                        <li key={step} className="flex items-start gap-1.5">
                          <span className="text-[#844D60]">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-[11px] text-[#493D46]/85 pt-1 border-t border-[#DCD2D8]/80">
                      {currentStudy.afterNote}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      openEnquiry({
                        serviceId: currentStudy.serviceId,
                        sourceLabel: `Before & After (${currentStudy.label})`,
                      })
                    }
                    className="px-6 py-3 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#844D60] transition-colors cursor-pointer"
                  >
                    Book This Transformation →
                  </button>

                  {manualOverride && (
                    <button
                      type="button"
                      onClick={resyncScrollCompare}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#DCD2D8] text-xs text-[#2A2128] hover:bg-[#E7DFEB] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Resume Scroll Wipe
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
