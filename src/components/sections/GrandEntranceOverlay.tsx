import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useStudio } from '../../lib/StudioContext';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { getMediaAsset } from '../../config/media.config';
import { studioConfig } from '../../config/studio.config';

const SESSION_KEY = 'aera_entrance_seen';

export function GrandEntranceOverlay() {
  const { entranceReplayKey, entranceActive, setEntranceActive } = useStudio();
  const reducedMotion = useReducedMotion();

  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLImageElement>(null);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const shadeLeftRef = useRef<HTMLDivElement>(null);
  const shadeRightRef = useRef<HTMLDivElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);
  const seamGlowRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const doorsAsset = getMediaAsset('doors-closed');
  const interiorAsset = getMediaAsset('sanctuary-sunlit');

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

    const syncStageSize = () => {
      const overlay = overlayRef.current;
      const stage = stageRef.current;
      if (!overlay || !stage) return;
      const rect = overlay.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const scale = Math.max(rect.width / 16, rect.height / 9);
      stage.style.width = `${Math.ceil(scale * 16)}px`;
      stage.style.height = `${Math.ceil(scale * 9)}px`;
    };

    syncStageSize();
    window.addEventListener('resize', syncStageSize);
    return () => window.removeEventListener('resize', syncStageSize);
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
      gsap.set(seamGlowRef.current, { opacity: 0, scaleX: 0.2 });
      gsap.set(portalRef.current, { scale: 1, opacity: 1 });
      gsap.set(interiorRef.current, { scale: 0.94, opacity: 0.96 });
      gsap.set(crestRef.current, { opacity: 1, y: 0 });
      gsap.set(overlayRef.current, { opacity: 1 });

      const tl = gsap.timeline({ onComplete: finish });
      tlRef.current = tl;

      // 1. Momentary pause on 100% closed salon doors -> subtle crest dissolve
      tl.to(crestRef.current, { opacity: 0, y: -14, duration: 0.45, ease: 'power2.out' }, 0.18)
        // 2. Doors swing smoothly INTO the bright sunlit salon along true outer jamb hinges
        .to(
          doorLeftRef.current,
          { rotationY: 84, duration: 1.18, ease: 'power2.inOut' },
          0.26
        )
        .to(
          doorRightRef.current,
          { rotationY: -84, duration: 1.18, ease: 'power2.inOut' },
          0.26
        )
        .to(
          [shadeLeftRef.current, shadeRightRef.current],
          { opacity: 0.24, duration: 0.85, ease: 'power2.in' },
          0.42
        )
        .to(
          seamGlowRef.current,
          { opacity: 0.52, scaleX: 1, duration: 0.72, ease: 'power2.out' },
          0.36
        )
        // 3. Camera glides steadily down the corridor into the sunlit styling aisle
        .to(
          portalRef.current,
          { scale: 2.55, opacity: 0, duration: 1.18, ease: 'power2.in' },
          1.12
        )
        .to(
          interiorRef.current,
          { scale: 1.07, duration: 1.45, ease: 'power2.out' },
          1.05
        )
        // 4. Seamless transition onto the live homepage hero
        .to(
          overlayRef.current,
          { opacity: 0, duration: 0.56, ease: 'power2.out' },
          2.26
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
      className="fixed inset-0 z-50 overflow-hidden bg-[#FCFAF7] flex items-center justify-center"
    >
      {/* Active Sunlit Salon Aisle Revealed Through Opening Doors */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={interiorRef}
          src={interiorAsset.fallbackSrc}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ willChange: 'transform, opacity' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 48%, rgba(252,250,247,0.12), rgba(244,229,218,0.22) 60%, rgba(44,34,30,0.16) 100%)',
          }}
        />
      </div>

      {/* 3D Architectural Doorway Stage */}
      <div
        ref={portalRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        style={{ transformOrigin: '50% 56%', willChange: 'transform, opacity' }}
      >
        <div ref={stageRef} className="relative shrink-0 entrance-perspective">
          <div
            ref={seamGlowRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                'radial-gradient(ellipse at 50% 56%, rgba(252,250,247,0.7), rgba(244,229,218,0.28) 38%, transparent 70%)',
            }}
          />

          {/* Outer Travertine Facade + Glass Olive Bays (4 rectangular clips around 33.2%..66.8%, 22.1%..89.3%) */}
          {[
            { inset: 'inset(0% 0% 77.85% 0%)', primary: true },
            { inset: 'inset(89.25% 0% 0% 0%)', primary: false },
            { inset: 'inset(22.1% 66.75% 10.65% 0%)', primary: false },
            { inset: 'inset(22.1% 0% 10.65% 66.75%)', primary: false },
          ].map((panel, idx) => (
            <img
              key={idx}
              src={doorsAsset.fallbackSrc}
              alt={panel.primary ? doorsAsset.alt : ''}
              aria-hidden={panel.primary ? undefined : true}
              fetchPriority={panel.primary ? 'high' : undefined}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ clipPath: panel.inset }}
            />
          ))}

          {/* Left Swinging Smoked-Walnut & Fluted-Glass Door */}
          <div
            ref={doorLeftRef}
            className="door-leaf-3d absolute overflow-hidden"
            style={{
              left: '33.2%',
              top: '22.1%',
              width: '16.8%',
              height: '67.2%',
              transformOrigin: 'left center',
            }}
          >
            <img
              src={doorsAsset.fallbackSrc}
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-197.619%',
                top: '-32.887%',
                width: '595.238%',
                height: '148.81%',
                maxWidth: 'none',
              }}
            />
            <div ref={shadeLeftRef} className="absolute inset-0 bg-[#2C221E] pointer-events-none" />
          </div>

          {/* Right Swinging Smoked-Walnut & Fluted-Glass Door */}
          <div
            ref={doorRightRef}
            className="door-leaf-3d absolute overflow-hidden"
            style={{
              left: '50%',
              top: '22.1%',
              width: '16.8%',
              height: '67.2%',
              transformOrigin: 'right center',
            }}
          >
            <img
              src={doorsAsset.fallbackSrc}
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-297.619%',
                top: '-32.887%',
                width: '595.238%',
                height: '148.81%',
                maxWidth: 'none',
              }}
            />
            <div ref={shadeRightRef} className="absolute inset-0 bg-[#2C221E] pointer-events-none" />
          </div>
        </div>

        {/* Frosted Threshold Signage Plaque (Positioned cleanly clear of brass handles) */}
        <div
          ref={crestRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6"
        >
          <div className="bg-[#2C221E]/55 backdrop-blur-md border border-[#FCFAF7]/30 px-6 py-2.5 rounded-xs -translate-y-10 shadow-sm">
            <p className="font-sculpt text-xs md:text-sm uppercase tracking-[0.42em] font-semibold text-[#FCFAF7]">
              {studioConfig.brand.wordmark}
            </p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#F4E5DA] mt-1">
              Hair · Skin · Bridal
            </p>
          </div>
        </div>
      </div>

      {/* Skip Entrance Button */}
      <button
        type="button"
        onClick={finishEntrance}
        className="absolute bottom-6 right-6 z-50 px-4 py-2 text-[11px] uppercase tracking-[0.16em] rounded-sm backdrop-blur-md border border-[#FCFAF7]/45 bg-[#2C221E]/65 text-[#FCFAF7] hover:bg-[#493B36] transition-colors cursor-pointer"
      >
        Skip Entrance →
      </button>
    </div>
  );
}
