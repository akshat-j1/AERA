import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { transformationStages } from '../../config/lookbook.config';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { StudioPicture } from '../layout/StudioPicture';
import { TransformationComparison } from './TransformationComparison';

gsap.registerPlugin(ScrollTrigger);

export function TransformationSection() {
  const [stageIndex, setStageIndex] = useState(0);
  const stickyHostRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeStageRef = useRef(0);
  const animatedStageRef = useRef(0);
  const dispMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const activeMaskRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const currentStage = transformationStages[stageIndex]!;

  function selectStage(index: number) {
    if (activeStageRef.current === index) return;
    activeStageRef.current = index;
    setStageIndex(index);
  }

  useGSAP(() => {
    const changed = stageIndex !== animatedStageRef.current;
    animatedStageRef.current = stageIndex;
    if (!changed || reducedMotion || !dispMapRef.current || !turbRef.current || !activeMaskRef.current) return;

    gsap.timeline()
      .fromTo(dispMapRef.current, { attr: { scale: 0 } }, {
        attr: { scale: 88 }, duration: 0.28, ease: 'power2.in',
      }, 0)
      .to(dispMapRef.current, { attr: { scale: 0 }, duration: 0.68, ease: 'power3.out' }, 0.28)
      .fromTo(turbRef.current, { attr: { baseFrequency: '0.008 0.014' } }, {
        attr: { baseFrequency: '0.022 0.044' }, duration: 0.3, ease: 'power2.in',
      }, 0)
      .to(turbRef.current, { attr: { baseFrequency: '0.008 0.014' }, duration: 0.66, ease: 'power3.out' }, 0.3)
      .fromTo(activeMaskRef.current, { clipPath: 'circle(16% at 50% 50%)' }, {
        clipPath: 'circle(92% at 50% 50%)', duration: 0.82, ease: 'power2.out',
      }, 0);
  }, { scope: stickyHostRef, dependencies: [stageIndex, reducedMotion], revertOnUpdate: true });

  useGSAP(() => {
    if (reducedMotion || !stickyHostRef.current) return;
    const media = gsap.matchMedia();
    media.add('(min-width: 1024px)', () => {
      const sync = ({ progress }: ScrollTrigger) => {
        const stage = Math.min(transformationStages.length - 1, Math.floor(progress * transformationStages.length));
        selectStage(stage);
        const bar = Math.max(progress, (stage + 1) / transformationStages.length);
        progressBarRef.current?.style.setProperty('transform', `scaleY(${bar})`);
      };
      ScrollTrigger.create({
        trigger: stickyHostRef.current,
        start: 'top top+=64',
        end: 'bottom bottom',
        onUpdate: sync,
        onRefresh: sync,
      });
    });
    return () => media.revert();
  }, { scope: stickyHostRef, dependencies: [reducedMotion], revertOnUpdate: true });

  function handleStageClick(index: number) {
    const host = stickyHostRef.current;
    if (reducedMotion || !host || !matchMedia('(min-width: 1024px)').matches) {
      selectStage(index);
      return;
    }
    const top = host.getBoundingClientRect().top + window.scrollY - 64;
    const range = Math.max(1, host.offsetHeight - (window.innerHeight - 64));
    window.scrollTo({ top: top + range * ((index + 0.16) / transformationStages.length), behavior: 'smooth' });
  }

  return (
    <section
      id="transformation-section"
      aria-label="Our Process and Transformation Study"
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
        className="relative lg:motion-safe:enhanced:h-[172vh] bg-[#E7DFEB]/45 border-y border-[#DCD2D8]"
      >
        <div className="py-16 lg:motion-safe:enhanced:py-0 lg:motion-safe:enhanced:sticky lg:motion-safe:enhanced:top-16 lg:motion-safe:enhanced:h-[calc(100vh-4rem)] flex items-center">
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
                  ref={progressBarRef}
                  className="hidden lg:motion-safe:enhanced:block absolute left-[-1.5px] top-0 w-[3px] bg-[#844D60] origin-top"
                  style={{
                    height: '100%',
                    transform: 'scaleY(0.3333)',
                  }}
                />

                <div className="flex flex-wrap items-center gap-4">
                  {transformationStages.map((stage, idx) => {
                    const active = idx === stageIndex;
                    return (
                      <button
                        key={stage.code}
                        type="button"
                        data-stage-step={idx}
                        aria-pressed={active}
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
                    {transformationStages.map((s, idx) => (
                      <div
                        key={s.code}
                        ref={idx === stageIndex ? activeMaskRef : undefined}
                        aria-hidden={idx !== stageIndex}
                        className="absolute inset-0 motion-safe:transition-opacity duration-500"
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

      <TransformationComparison />
    </section>
  );
}
