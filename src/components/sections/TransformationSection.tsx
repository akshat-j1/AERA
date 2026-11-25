import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MoveHorizontal } from 'lucide-react';
import { transformationStudies } from '../../config/lookbook.config';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { useStudio } from '../../lib/StudioContext';
import { StudioPicture } from '../layout/StudioPicture';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    code: '01',
    title: 'Northlight Diagnostic',
    description:
      'Every appointment starts with unhurried curl, porosity, and skin-barrier mapping beside pure north window daylight.',
    mediaId: 'portrait-natural-profile',
    accentColor: '#F3E6DF',
  },
  {
    code: '02',
    title: 'Mineral & Lipid Alchemy',
    description:
      'Botanical ceramides and ammonia-free champagne-espresso pigments nourish the fiber while shifting tone smoothly.',
    mediaId: 'portrait-silk-waves',
    accentColor: '#E6DDEB',
  },
  {
    code: '03',
    title: 'Weightless Finish',
    description:
      'Diffused airflow and silk serum lock in soft cuticle light reflection that wears gracefully weeks after leaving the chair.',
    mediaId: 'portrait-balayage',
    accentColor: '#D5B4B8',
  },
];

export function TransformationSection() {
  const [stageIndex, setStageIndex] = useState(0);
  const [studyIndex, setStudyIndex] = useState(0);
  const [splitPct, setSplitPct] = useState(50);

  const sectionRef = useRef<HTMLDivElement>(null);
  const stageImageWrapRef = useRef<HTMLDivElement>(null);
  const dispMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const reducedMotion = useReducedMotion();
  const { openEnquiry } = useStudio();

  const currentStage = STAGES[stageIndex] ?? STAGES[0]!;
  const currentStudy = transformationStudies[studyIndex] ?? transformationStudies[0]!;

  // Trigger gentle SVG silk refraction wave when stage changes
  useEffect(() => {
    if (reducedMotion || !dispMapRef.current) return;
    const disp = dispMapRef.current;
    const tl = gsap.timeline();
    tl.to(disp, { attr: { scale: 34 }, duration: 0.36, ease: 'power2.in' }).to(disp, {
      attr: { scale: 0 },
      duration: 0.56,
      ease: 'power3.out',
    });
    return () => {
      tl.kill();
    };
  }, [stageIndex, reducedMotion]);

  // Gentle scroll-linked step update on desktop
  useGSAP(
    () => {
      if (reducedMotion) return;
      const triggers = STAGES.map((_, idx) =>
        ScrollTrigger.create({
          trigger: `[data-stage-step="${idx}"]`,
          start: 'top 62%',
          end: 'bottom 45%',
          onEnter: () => setStageIndex(idx),
          onEnterBack: () => setStageIndex(idx),
        })
      );
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="The Transformation Ritual"
      className="py-20 md:py-28 bg-[#F8F5F1] text-[#2D2328]"
    >
      {/* Hidden SVG Liquid Silk Displacement Filter */}
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

      <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-24">
        {/* Beat A: Scroll-Driven Layered Silk Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#504348]">
                03 · The Transformation
              </p>
              <h2 className="font-sculpt text-3xl md:text-5xl font-semibold leading-[1.06]">
                Silk chemistry{' '}
                <span className="font-whisper font-normal text-[#504348]">without harsh lift.</span>
              </h2>
            </div>

            <div className="space-y-4">
              {STAGES.map((stage, idx) => {
                const active = idx === stageIndex;
                return (
                  <button
                    key={stage.code}
                    type="button"
                    data-stage-step={idx}
                    onClick={() => setStageIndex(idx)}
                    className={`w-full text-left p-5 rounded-sm border transition-all duration-400 cursor-pointer ${
                      active
                        ? 'border-[#504348]/45 bg-[#F3EEF5] shadow-xs'
                        : 'border-[#C8B49D]/35 bg-[#F8F5F1] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-sculpt text-lg font-semibold">
                        {stage.code}. {stage.title}
                      </span>
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: active ? '#504348' : stage.accentColor }}
                      />
                    </div>
                    <p className="text-xs md:text-sm text-[#504348] mt-2 leading-relaxed">
                      {stage.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Silk-Refracted Visual Frame */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="relative max-w-md mx-auto">
              <div
                className="absolute -inset-4 rounded-sm transition-colors duration-700"
                style={{ backgroundColor: currentStage.accentColor, opacity: 0.65 }}
                aria-hidden="true"
              />
              <div
                ref={stageImageWrapRef}
                className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-xl border-2 border-[#F8F5F1]"
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
                <div className="absolute inset-x-4 bottom-4 p-3.5 rounded-sm backdrop-blur-md bg-[#F8F5F1]/88 border border-[#C8B49D]/40 text-xs flex items-center justify-between">
                  <span className="font-medium text-[#2D2328]">
                    Stage {currentStage.code} · {currentStage.title}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#504348]">
                    Silk Reveal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beat B: Accessible Daylight Before & After Study */}
        <div className="p-6 md:p-10 rounded-sm bg-[#F5EFEA] border border-[#C8B49D]/45 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#504348]">
                Daylight Texture &amp; Tone Comparison
              </p>
              <h3 className="font-sculpt text-2xl md:text-3xl font-semibold">
                Explore the finish{' '}
                <span className="font-whisper font-normal text-[#504348]">across natural light.</span>
              </h3>
              <p className="text-xs text-[#504348] max-w-xl">{currentStudy.subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {transformationStudies.map((study, idx) => (
                <button
                  key={study.id}
                  type="button"
                  onClick={() => setStudyIndex(idx)}
                  className={`px-3.5 py-2 text-xs rounded-sm border transition-colors cursor-pointer ${
                    idx === studyIndex
                      ? 'bg-[#504348] text-[#F8F5F1] border-[#504348]'
                      : 'bg-[#F8F5F1] text-[#2D2328] border-[#C8B49D]/60 hover:bg-[#E6DDEB]/50'
                  }`}
                >
                  {study.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="relative aspect-[3/4] max-h-[460px] max-w-md mx-auto rounded-sm overflow-hidden border border-[#C8B49D]/70 shadow-md select-none">
                {/* After Image */}
                <StudioPicture
                  mediaId={currentStudy.mediaId}
                  altOverride={currentStudy.afterCaption}
                  sizes="480px"
                  className="w-full h-full"
                />
                <span className="absolute bottom-3 right-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] rounded-xs bg-[#504348]/90 text-[#F8F5F1]">
                  After
                </span>

                {/* Before Layer (tonally muted unglazed demo comparison) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - splitPct}% 0 0)` }}
                >
                  <StudioPicture
                    mediaId={currentStudy.mediaId}
                    altOverride={currentStudy.beforeCaption}
                    sizes="480px"
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover saturate-[0.52] contrast-[0.9] brightness-[0.94]"
                  />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] rounded-xs bg-[#F8F5F1]/92 text-[#2D2328]">
                    Before (Demo Sim)
                  </span>
                </div>

                {/* Hairline Daylight Divider */}
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 w-px bg-[#F8F5F1] shadow-[0_0_12px_rgba(248,245,241,0.95)] pointer-events-none"
                  style={{ left: `${splitPct}%` }}
                >
                  <div className="w-8 h-8 -ml-4 rounded-full bg-[#F8F5F1] border border-[#504348] text-[#504348] flex items-center justify-center shadow-md absolute top-1/2 -translate-y-1/2">
                    <MoveHorizontal className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] uppercase tracking-[0.15em] text-[#504348]">
                  <label htmlFor="ba-split-slider">Drag or Use Arrow Keys</label>
                  <span className="font-mono tabular">{splitPct}%</span>
                </div>
                <input
                  id="ba-split-slider"
                  type="range"
                  min={10}
                  max={90}
                  value={splitPct}
                  onChange={(e) => setSplitPct(Number(e.target.value))}
                  className="aera-slider w-full"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 text-xs">
                <div className="p-3.5 rounded-sm bg-[#F8F5F1] border border-[#C8B49D]/45 space-y-1">
                  <p className="font-semibold text-[#2D2328]">{currentStudy.beforeCaption}</p>
                  <p className="text-[#504348]">{currentStudy.beforeNote}</p>
                </div>
                <div className="p-3.5 rounded-sm bg-[#E6DDEB]/55 border border-[#C8B49D]/45 space-y-1">
                  <p className="font-semibold text-[#2D2328]">{currentStudy.afterCaption}</p>
                  <p className="text-[#504348]">{currentStudy.afterNote}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  openEnquiry({
                    serviceId: currentStudy.serviceId,
                    sourceLabel: `Transformation Study (${currentStudy.label})`,
                  })
                }
                className="w-full sm:w-auto px-5 py-3 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.15em] hover:bg-[#3A2E33] transition-colors cursor-pointer"
              >
                Request Consultation for This Ritual
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
