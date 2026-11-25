import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MoveHorizontal, RotateCcw } from 'lucide-react';
import { StudioPicture } from '../layout/StudioPicture';
import { transformationStudies } from '../../config/lookbook.config';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { useStudio } from '../../lib/StudioContext';

gsap.registerPlugin(ScrollTrigger);

interface Drag {
  id: number;
  x: number;
  y: number;
  active: boolean;
}

export function TransformationComparison() {
  const [studyIndex, setStudyIndex] = useState(0);
  const [manualOverride, setManualOverride] = useState(false);
  const study = transformationStudies[studyIndex]!;
  const label = study.afterMediaId ? 'After' : 'Consultation plan';
  const host = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const value = useRef(100);
  const scrollValue = useRef(100);
  const manual = useRef(false);
  const drag = useRef<Drag | null>(null);
  const reducedMotion = useReducedMotion();
  const { openEnquiry } = useStudio();

  function applyDivider(next: number) {
    const percent = Math.min(100, Math.max(0, Math.round(next)));
    value.current = percent;
    const canvas = frame.current;
    if (canvas && canvas.dataset.baDivider !== String(percent)) {
      canvas.style.setProperty('--divider', `${percent}%`);
      canvas.dataset.baDivider = String(percent);
      canvas.toggleAttribute('data-before-label', percent >= 28);
      canvas.toggleAttribute('data-after-label', percent <= 45);
      canvas.toggleAttribute('data-plan-visible', percent <= 12);
      slider.current?.setAttribute('aria-valuenow', String(percent));
    }
    slider.current?.setAttribute('aria-valuetext', `${100 - percent}% ${label.toLowerCase()} revealed`);
  }

  useGSAP(() => {
    if (reducedMotion || !host.current || !frame.current) return;
    const media = gsap.matchMedia();
    media.add({ desktop: '(min-width: 1024px)', mobile: '(max-width: 1023px)' }, ({ conditions }) => {
      const desktop = conditions?.desktop;
      const sync = ({ progress }: ScrollTrigger) => {
        scrollValue.current = (1 - progress) * 100;
        if (!manual.current && !drag.current?.active) applyDivider(scrollValue.current);
      };
      ScrollTrigger.create({
        trigger: desktop ? host.current : frame.current,
        start: desktop ? 'top top+=64' : 'top 62%',
        end: desktop ? 'bottom bottom' : 'bottom 34%',
        onUpdate: sync,
        onRefresh: sync,
      });
    });
    return () => media.revert();
  }, { scope: host, dependencies: [reducedMotion, label], revertOnUpdate: true });

  function beginManual() {
    if (manual.current) return;
    manual.current = true;
    setManualOverride(true);
  }

  function resumeScroll() {
    manual.current = false;
    setManualOverride(false);
    applyDivider(reducedMotion ? 100 : scrollValue.current);
  }

  function moveDivider(clientX: number) {
    const bounds = frame.current?.getBoundingClientRect();
    if (bounds?.width) applyDivider(((clientX - bounds.left) / bounds.width) * 100);
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    const active = event.pointerType === 'mouse';
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, active };
    if (active) {
      event.currentTarget.setPointerCapture(event.pointerId);
      slider.current?.focus({ preventScroll: true });
      beginManual();
      moveDivider(event.clientX);
    }
  }

  function updateDrag(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    if (!current.active) {
      const x = Math.abs(event.clientX - current.x);
      const y = Math.abs(event.clientY - current.y);
      if (y >= 8 && y >= x) {
        drag.current = null;
        return;
      }
      if (x < 8) return;
      current.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      beginManual();
    }
    moveDivider(event.clientX);
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.id === event.pointerId) drag.current = null;
  }

  function moveByKey(event: KeyboardEvent<HTMLDivElement>) {
    let next = value.current;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown': next -= 4; break;
      case 'ArrowRight':
      case 'ArrowUp': next += 4; break;
      case 'PageDown': next -= 10; break;
      case 'PageUp': next += 10; break;
      case 'Home': next = 0; break;
      case 'End': next = 100; break;
      default: return;
    }
    event.preventDefault();
    beginManual();
    applyDivider(next);
  }

  return (
    <div ref={host} className="relative lg:motion-safe:enhanced:h-[210vh] bg-[#FAF8F7] border-b border-[#DCD2D8]">
      <div className="py-16 lg:motion-safe:enhanced:py-0 lg:motion-safe:enhanced:sticky lg:motion-safe:enhanced:top-16 lg:motion-safe:enhanced:h-[calc(100vh-4rem)] flex items-center">
        <div className="max-w-7xl mx-auto px-5 md:px-10 w-full space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#844D60]">
                03 · {study.afterMediaId ? 'Before & After' : 'Transformation Consultation'}
              </p>
              <h3 className="font-campaign text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2128] leading-tight">
                {study.afterMediaId ? 'Explore the finished transformation.' : 'Explore the proposed cut and colour.'}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {transformationStudies.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={index === studyIndex}
                  onClick={() => {
                    if (index === studyIndex) return;
                    drag.current = null;
                    setStudyIndex(index);
                    resumeScroll();
                  }}
                  className={`px-4 py-2 text-xs rounded-full border transition-colors cursor-pointer ${
                    index === studyIndex
                      ? 'bg-[#493D46] text-[#FAF8F7] border-[#493D46]'
                      : 'bg-[#F2EEF1] text-[#2A2128] border-[#DCD2D8] hover:bg-[#E7DFEB]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-6 space-y-2.5">
              <div
                ref={frame}
                data-ba-divider="100"
                data-before-label=""
                onPointerDown={startDrag}
                onPointerMove={updateDrag}
                onPointerUp={finishDrag}
                onPointerCancel={finishDrag}
                onLostPointerCapture={finishDrag}
                className="aera-compare relative aspect-[3/4] max-h-[500px] max-w-[400px] mx-auto rounded-sm overflow-hidden border border-[#DCD2D8] shadow-xl select-none cursor-ew-resize bg-[#F2EEF1]"
              >
                <div className="absolute inset-0 pointer-events-none" style={{ clipPath: 'inset(0 calc(100% - var(--divider)) 0 0)' }}>
                  <StudioPicture mediaId={study.beforeMediaId} altOverride={study.beforeCaption} sizes="420px" className="w-full h-full" />
                  <span aria-hidden="true" className="aera-before-label absolute bottom-3.5 left-3.5 px-3 py-1 text-[10px] uppercase tracking-[0.14em] rounded-xs bg-[#FAF8F7]/94 text-[#2A2128]">Before</span>
                </div>
                <div className="absolute inset-0 pointer-events-none" style={{ clipPath: 'inset(0 0 0 var(--divider))' }}>
                  {study.afterMediaId ? (
                    <StudioPicture mediaId={study.afterMediaId} altOverride={study.afterCaption} sizes="420px" className="w-full h-full" />
                  ) : (
                    <div className="absolute inset-0 grid place-content-center px-8 text-center bg-[#E7DFEB]">
                      <div className="aera-plan-copy">
                        <p className="font-campaign text-2xl font-bold text-[#493D46]">Consultation plan</p>
                        <p className="mt-2 text-sm text-[#493D46]">A matched result photo is pending.</p>
                      </div>
                    </div>
                  )}
                  <span aria-hidden="true" className="aera-after-label absolute bottom-3.5 right-3.5 px-3 py-1 text-[10px] uppercase tracking-[0.14em] rounded-xs bg-[#493D46] text-[#FAF8F7]">{label}</span>
                </div>

                <div
                  ref={slider}
                  role="slider"
                  tabIndex={0}
                  aria-label={study.afterMediaId ? 'Before and After divider' : 'Before photo and consultation plan divider'}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={value.current}
                  aria-valuetext={`${100 - value.current}% ${label.toLowerCase()} revealed`}
                  onKeyDown={moveByKey}
                  className="aera-compare-slider absolute inset-0 pointer-events-none outline-none"
                >
                  <div aria-hidden="true" className="absolute inset-0" style={{ transform: 'translateX(var(--divider))' }}>
                    <div className="absolute inset-y-0 left-0 w-0.5 bg-[#FAF8F7] shadow-md" />
                  </div>
                  <div aria-hidden="true" className="absolute inset-0" style={{ transform: 'translateX(clamp(22px, var(--divider), calc(100% - 22px)))' }}>
                    <div className="aera-compare-handle w-10 h-10 -ml-5 rounded-full bg-[#FAF8F7] border-2 border-[#493D46] text-[#493D46] flex items-center justify-center shadow-lg absolute top-1/2 -translate-y-1/2">
                      <MoveHorizontal className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#493D46] text-center max-w-md mx-auto">
                {study.afterMediaId ? 'Drag the divider or use the arrow keys to compare.' : `A matched result photo is pending. ${study.subtitle}`}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2 border-b border-[#DCD2D8] pb-4">
                <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#844D60]">{study.durationLabel}</p>
                <p className="text-sm text-[#493D46] leading-relaxed">{study.recommendedSummary}</p>
              </div>
              <div className="space-y-3.5 text-xs">
                <div className="p-4 rounded-sm bg-[#F2EEF1] border-l-2 border-[#B77F91] space-y-1">
                  <p className="font-semibold text-[#2A2128]">{study.beforeCaption}</p>
                  <p className="text-[#493D46] leading-relaxed">{study.beforeNote}</p>
                </div>
                <div className="p-4 rounded-sm bg-[#E7DFEB]/55 border-l-2 border-[#493D46] space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-14 rounded-xs overflow-hidden border border-[#DCD2D8] shrink-0">
                      <StudioPicture mediaId={study.targetSwatchMediaId} altOverride={study.targetSwatchLabel} sizes="64px" className="w-full h-full" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-[#2A2128]">{study.afterCaption}</p>
                      <p className="text-[11px] text-[#844D60] font-medium">{study.targetSwatchLabel}</p>
                    </div>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-[#493D46]">
                    {study.proposedSteps.map((step) => <li key={step}>{step}</li>)}
                  </ul>
                  <p className="text-[11px] text-[#493D46]/85 pt-1 border-t border-[#DCD2D8]/80">{study.afterNote}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => openEnquiry({ serviceId: study.serviceId, sourceLabel: `Transformation Consultation (${study.label})` })}
                  className="px-6 py-3 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#844D60] transition-colors cursor-pointer"
                >
                  Request a Consultation →
                </button>
                {manualOverride && !reducedMotion && (
                  <button type="button" onClick={resumeScroll} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#DCD2D8] text-xs text-[#2A2128] hover:bg-[#E7DFEB] cursor-pointer">
                    <RotateCcw className="w-3.5 h-3.5" /> Resume Scroll Wipe
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
