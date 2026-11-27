import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { transformationStages } from '../../config/lookbook.config';
import { getProcessFrame } from '../../lib/processProgress';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { StudioPicture } from '../layout/StudioPicture';
import { TransformationComparison } from './TransformationComparison';

gsap.registerPlugin(ScrollTrigger);

const steps = transformationStages.length;
const stepCenter = (index: number) => (index + 0.5) / steps;

export function TransformationSection() {
  const [stageIndex, setStageIndex] = useState(0);
  const host = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const stageCopy = useRef<HTMLDivElement>(null);
  const glass = useRef<HTMLDivElement>(null);
  const displacement = useRef<SVGFEDisplacementMapElement>(null);
  const plates = useRef<(HTMLDivElement | null)[]>([]);
  const active = useRef(0);
  const cursor = useRef({ progress: stepCenter(0) });
  const target = useRef(0);
  const ripple = useRef<gsap.core.Tween | null>(null);
  const reducedMotion = useReducedMotion();
  const stage = transformationStages[stageIndex]!;

  function select(index: number) {
    if (active.current === index) return;
    active.current = index;
    setStageIndex(index);
  }

  function draw(progress: number, desktop: boolean) {
    const frame = getProcessFrame(progress, steps);
    const blending = frame.from !== frame.to;
    const bend = blending ? Math.sin(Math.PI * frame.mix) ** 1.55 : 0;
    const scale = Math.round(bend * (desktop ? 69 : 46));
    const visible = blending ? frame.from : frame.active;
    select(frame.active);
    if (displacement.current?.getAttribute('scale') !== String(scale)) {
      displacement.current?.setAttribute('scale', String(scale));
    }
    if (glass.current) glass.current.style.filter = scale > 0 ? 'url(#aera-silk-refract)' : '';
    if (bar.current) bar.current.style.transform = `scaleY(${Math.max(0.08, progress)})`;

    plates.current.forEach((plate, index) => {
      if (!plate) return;
      const revealing = blending && index === frame.to;
      plate.style.visibility = index === visible || revealing ? 'visible' : 'hidden';
      plate.style.zIndex = revealing ? '1' : '';
      plate.style.clipPath = revealing
        ? `ellipse(${Math.round(frame.mix * 139)}% ${Math.round(frame.mix * 98)}% at 94% 48%)`
        : '';
    });

    if (stageCopy.current) {
      const shift = blending ? -5 * Math.sin(2 * Math.PI * frame.mix) : 0;
      stageCopy.current.style.transform = shift ? `translateY(${shift.toFixed(1)}px)` : '';
      stageCopy.current.style.opacity = bend ? String((1 - bend * 0.21).toFixed(2)) : '';
    }
  }

  function animateStage(index: number, desktop: boolean) {
    if (index === target.current) return;
    target.current = index;
    ripple.current?.kill();
    ripple.current = gsap.to(cursor.current, {
      progress: stepCenter(index),
      duration: Math.abs(cursor.current.progress - stepCenter(index)) > 1 / steps + 0.01 ? 1.05 : 0.78,
      ease: 'power1.inOut',
      onUpdate: () => draw(cursor.current.progress, desktop),
      onComplete: () => { ripple.current = null; },
    });
  }

  useGSAP(() => {
    if (reducedMotion || !host.current) return;
    const panel = host.current;
    const photo = glass.current?.parentElement;
    const media = gsap.matchMedia();
    target.current = active.current;
    cursor.current.progress = stepCenter(active.current);
    media.add({ desktop: '(min-width: 1024px)', tablet: '(768px <= width < 1024px)' }, ({ conditions }) => {
      const desktop = !!conditions?.desktop;
      let scrollStage = -1;
      function sync({ progress }: ScrollTrigger) {
        const index = Math.min(steps - 1, Math.floor(progress * steps));
        if (index === scrollStage) return;
        scrollStage = index;
        animateStage(index, desktop);
      }
      ScrollTrigger.create({
        trigger: desktop ? panel : photo,
        start: desktop ? 'top top+=64' : 'top 85%',
        end: desktop ? 'bottom bottom' : 'bottom 22%',
        onUpdate: sync,
        onRefresh: sync,
      });
      return () => {
        ripple.current?.kill();
        ripple.current = null;
        target.current = active.current;
        cursor.current.progress = stepCenter(active.current);
        draw(cursor.current.progress, false);
      };
    });

    return () => {
      media.revert();
      ripple.current?.kill();
      ripple.current = null;
      for (const plate of plates.current) {
        plate?.style.removeProperty('visibility');
        plate?.style.removeProperty('z-index');
        plate?.style.removeProperty('clip-path');
      }
      stageCopy.current?.removeAttribute('style');
      glass.current?.style.removeProperty('filter');
      displacement.current?.setAttribute('scale', '0');
    };
  }, { scope: host, dependencies: [reducedMotion], revertOnUpdate: true });

  function choose(index: number) {
    if (reducedMotion) {
      select(index);
      return;
    }
    const wrapper = host.current;
    if (wrapper && matchMedia('(min-width: 1024px)').matches) {
      const top = wrapper.getBoundingClientRect().top + window.scrollY - 64;
      const range = wrapper.offsetHeight - window.innerHeight + 64;
      window.scrollTo({ top: top + range * stepCenter(index), behavior: 'smooth' });
      return;
    }

    animateStage(index, false);
  }

  return (
    <section id="transformation-section" aria-label="Our Process and Transformation Study" className="text-[#2A2028] scroll-mt-20">
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="aera-silk-refract" x="-12%" y="-12%" width="124%" height="124%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.010 0.017" numOctaves="2" seed="11" result="noise" />
            <feDisplacementMap ref={displacement} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="warped" />
            <feComposite in="warped" in2="SourceGraphic" operator="over" />
          </filter>
        </defs>
      </svg>

      <div ref={host} className="aera-process-host relative lg:motion-safe:enhanced:h-[176vh]">
        <div className="py-12 lg:motion-safe:enhanced:py-0 lg:motion-safe:enhanced:sticky lg:motion-safe:enhanced:top-16 lg:motion-safe:enhanced:h-[calc(100vh-4rem)] flex items-center">
          <div className="max-w-7xl mx-auto px-5 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.21em] font-semibold text-[#7B4A60]">Our Process</p>
                <h2 className="font-campaign text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.04]">
                  Crafted in daylight.
                </h2>
              </div>
              <div className="relative pl-5 border-l border-[#DED2DA] space-y-5">
                <div ref={bar} aria-hidden="true" className="hidden lg:motion-safe:block absolute inset-y-0 -left-px w-[2px] bg-[#7B4A60] origin-top scale-y-[.08]" />
                <div className="flex flex-wrap items-center gap-4">
                  {transformationStages.map((item, index) => (
                    <button key={item.code} type="button" data-stage-step={index} aria-pressed={index === stageIndex}
                      onClick={() => choose(index)}
                      className={`pb-1.5 text-xs border-b-2 transition-colors cursor-pointer ${index === stageIndex
                        ? 'border-[#7B4A60] text-[#2A2028] font-semibold'
                        : 'border-transparent text-[#40343D] hover:text-[#7B4A60]'}`}>
                      {item.shortLabel}
                    </button>
                  ))}
                </div>
                <div ref={stageCopy} className="space-y-2 min-h-[6.8rem] md:max-lg:min-h-32">
                  <h3 className="font-editorial text-2xl md:text-3xl font-semibold">{stage.title}</h3>
                  <p className="text-sm md:text-base text-[#40343D] max-w-lg leading-relaxed">{stage.description}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative max-w-[400px] mx-auto aspect-[4/5] rounded-t-[48%] rounded-b-sm overflow-hidden border border-[#DED2DA] bg-[#F5F0F3]">
                <div ref={glass} className="absolute -inset-5">
                  {transformationStages.map((item, index) => (
                    <div key={item.code} ref={(element) => { plates.current[index] = element; }}
                      data-process-plate aria-hidden={index !== stageIndex} className="aera-process-image absolute inset-0">
                      <StudioPicture mediaId={item.mediaId} sizes="(max-width: 768px) 90vw, 420px" className="w-full h-full" />
                    </div>
                  ))}
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
