import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useStudio } from '../../lib/StudioContext';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { studioConfig } from '../../config/studio.config';

const SESSION_KEY = 'aera_entrance_seen';

export function GrandEntranceOverlay() {
  const { entranceReplayKey, entranceActive, setEntranceActive } = useStudio();
  const reducedMotion = useReducedMotion();

  const overlayRef = useRef<HTMLDivElement>(null);
  const surroundRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const shadeLeftRef = useRef<HTMLDivElement>(null);
  const shadeRightRef = useRef<HTMLDivElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reducedMotion) {
      setEntranceActive(false);
      document.documentElement.removeAttribute('data-aera-entrance');
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      seen = false;
    }

    if (!seen || entranceReplayKey > 0) {
      setEntranceActive(true);
    } else {
      setEntranceActive(false);
      document.documentElement.removeAttribute('data-aera-entrance');
    }
  }, [entranceReplayKey, reducedMotion, setEntranceActive]);

  useEffect(() => {
    if (!entranceActive) return;
    document.documentElement.removeAttribute('data-aera-entrance');
  }, [entranceActive]);

  const finishEntrance = () => {
    tlRef.current?.kill();
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // Ignore storage write error
    }
    setEntranceActive(false);
  };

  useEffect(() => {
    if (!entranceActive || reducedMotion) return;

    const finish = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // Ignore storage write error
      }
      setEntranceActive(false);
    };

    const ctx = gsap.context(() => {
      gsap.set([doorLeftRef.current, doorRightRef.current], {
        rotationY: 0,
        force3D: true,
      });
      gsap.set([shadeLeftRef.current, shadeRightRef.current], { opacity: 0 });
      gsap.set(portalRef.current, { scale: 1, opacity: 1 });
      gsap.set(surroundRef.current, { opacity: 1 });
      gsap.set(crestRef.current, { opacity: 1, y: 0 });
      gsap.set(overlayRef.current, { opacity: 1 });

      const tl = gsap.timeline({ onComplete: finish });
      tlRef.current = tl;

      // 1. Momentary pause on 100% closed salon doors -> wordmark fades as doors begin parting
      tl.to(
        crestRef.current,
        { opacity: 0, y: -12, duration: 0.34, ease: 'power2.out' },
        0.16
      )
        // 2. Doors swing open cleanly along outer hinges -> transparent doorway aperture immediately unveils Twin Arches + AERA Hero behind!
        .to(
          doorLeftRef.current,
          { rotationY: 92, duration: 1.08, ease: 'power2.inOut' },
          0.18
        )
        .to(
          doorRightRef.current,
          { rotationY: -92, duration: 1.08, ease: 'power2.inOut' },
          0.18
        )
        .to(
          [shadeLeftRef.current, shadeRightRef.current],
          { opacity: 0.22, duration: 0.78, ease: 'power2.in' },
          0.26
        )
        // 3. Soft Lilac surround clears while portal glides seamlessly into settled hero
        .to(
          surroundRef.current,
          { opacity: 0, duration: 0.65, ease: 'power2.out' },
          0.88
        )
        .to(
          portalRef.current,
          { scale: 1.95, opacity: 0, duration: 0.96, ease: 'power2.inOut' },
          0.98
        )
        .to(
          overlayRef.current,
          { opacity: 0, duration: 0.36, ease: 'power2.out' },
          1.76
        );
    }, overlayRef);

    return () => {
      ctx.revert();
    };
  }, [entranceActive, entranceReplayKey, reducedMotion, setEntranceActive]);

  if (!entranceActive || reducedMotion) return null;

  return (
    <div
      ref={overlayRef}
      role="region"
      aria-label="AERA Beauty Studio entrance sequence"
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center entrance-perspective pointer-events-auto"
    >
      {/* Scaling Architectural Doorway Frame (bg-transparent center -> live Twin-Arch Hero gleams cleanly through from t=0!) */}
      <div
        ref={portalRef}
        className="relative w-[min(86vw,720px)] h-[min(76vh,640px)] bg-transparent border-[12px] border-[#FAF8F7] ring-2 ring-[#493D46] shadow-[0_32px_90px_rgba(42,33,40,0.16)] flex items-center justify-center entrance-perspective"
        style={{ transformOrigin: '50% 50%', willChange: 'transform, opacity' }}
      >
        {/* Exterior Lilac Surround Cast Purely Outside Aperture Box (Zero Fill Inside Center Doorway) */}
        <div
          ref={surroundRef}
          className="absolute -inset-[12px] pointer-events-none"
          style={{
            boxShadow: '0 0 0 150vmax #E7DFEB',
            willChange: 'opacity',
          }}
        />
        {/* Swinging 3D Opaque Dusty Rose-Plum Fluted Double Doors */}
        <div className="relative w-full h-full grid grid-cols-2 entrance-perspective bg-transparent">
          {/* Left Swinging Door Leaf */}
          <div
            ref={doorLeftRef}
            className="door-leaf-3d relative w-full h-full border border-[#493D46] overflow-hidden flex items-end justify-end pb-[24%]"
            style={{
              transformOrigin: 'left center',
              background: 'linear-gradient(155deg, #DFBCC3 0%, #C693A1 100%)',
            }}
          >
            <div
              className="absolute inset-0 opacity-35 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(250,248,247,0.45) 0px, rgba(250,248,247,0.45) 1px, transparent 1px, transparent 10px)',
              }}
            />
            <div className="absolute inset-3 border border-[#493D46]/30 pointer-events-none" />
            <div className="mr-3.5 w-1.5 h-16 rounded-full bg-[#493D46] shadow-xs" />
            <div ref={shadeLeftRef} className="absolute inset-0 bg-[#2A2128] pointer-events-none" />
          </div>

          {/* Right Swinging Door Leaf */}
          <div
            ref={doorRightRef}
            className="door-leaf-3d relative w-full h-full border border-l-0 border-[#493D46] overflow-hidden flex items-end justify-start pb-[24%]"
            style={{
              transformOrigin: 'right center',
              background: 'linear-gradient(205deg, #DFBCC3 0%, #C693A1 100%)',
            }}
          >
            <div
              className="absolute inset-0 opacity-35 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(250,248,247,0.45) 0px, rgba(250,248,247,0.45) 1px, transparent 1px, transparent 10px)',
              }}
            />
            <div className="absolute inset-3 border border-[#493D46]/30 pointer-events-none" />
            <div className="ml-3.5 w-1.5 h-16 rounded-full bg-[#493D46] shadow-xs" />
            <div ref={shadeRightRef} className="absolute inset-0 bg-[#2A2128] pointer-events-none" />
          </div>
        </div>

        {/* Centered Threshold Wordmark (Symmetric pl === tracking so letters center across door seam) */}
        <div
          ref={crestRef}
          className="absolute inset-x-6 top-[23%] sm:top-[24%] flex flex-col items-center text-center pointer-events-none"
        >
          <span className="font-campaign text-4xl sm:text-5xl font-bold tracking-[0.34em] pl-[0.34em] text-[#493D46]">
            {studioConfig.brand.name}
          </span>
          <span className="mt-2.5 text-[11px] uppercase tracking-[0.3em] pl-[0.3em] font-semibold text-[#493D46]">
            Hair · Skin · Beauty
          </span>
        </div>
      </div>

      {/* Skip Entrance Button */}
      <button
        type="button"
        onClick={finishEntrance}
        className="absolute bottom-6 right-6 z-50 px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] rounded-full backdrop-blur-md border border-[#493D46]/35 bg-[#493D46] text-[#FAF8F7] hover:bg-[#844D60] transition-colors cursor-pointer"
      >
        Skip Entrance →
      </button>
    </div>
  );
}
