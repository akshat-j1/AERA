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
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const shadeLeftRef = useRef<HTMLDivElement>(null);
  const shadeRightRef = useRef<HTMLDivElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);
  const seamGlowRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const doorsAsset = getMediaAsset('doors-closed');
  const interiorAsset = getMediaAsset('sanctuary-sunlit');

  // Decide on mount / replay whether entrance should play
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reducedMotion) {
      setEntranceActive(false);
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

  // Keep 16:9 door stage mathematically cover-fitted across any viewport (desktop/tablet/mobile)
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

  // Run automatic 2.75s Closed -> Swing Open -> Forward Walk-In -> Live Homepage choreography
  useEffect(() => {
    if (!entranceActive || reducedMotion) return;

    const finish = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // Ignore storage errors
      }
      setEntranceActive(false);
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: finish,
      });
      tlRef.current = tl;

      // Reset closed baseline (0.00s)
      gsap.set(doorLeftRef.current, { rotateY: 0 });
      gsap.set(doorRightRef.current, { rotateY: 0 });
      gsap.set([shadeLeftRef.current, shadeRightRef.current], { opacity: 0 });
      gsap.set(crestRef.current, { opacity: 1 });
      gsap.set(seamGlowRef.current, { opacity: 0 });
      gsap.set(portalRef.current, { scale: 1, opacity: 1 });

      // Phase 1 (0.32s -> 1.72s): Doors physically swing inward with perspective & cast shadow
      tl.to(crestRef.current, { opacity: 0, duration: 0.32, ease: 'power2.out' }, 0.28)
        .to(doorLeftRef.current, { rotateY: 84, duration: 1.42, ease: 'power3.inOut' }, 0.32)
        .to(doorRightRef.current, { rotateY: -84, duration: 1.42, ease: 'power3.inOut' }, 0.32)
        .to([shadeLeftRef.current, shadeRightRef.current], { opacity: 0.34, duration: 1.2, ease: 'power2.inOut' }, 0.38)
        .to(seamGlowRef.current, { opacity: 0.7, duration: 0.55, ease: 'power2.out' }, 0.35)
        .to(seamGlowRef.current, { opacity: 0, duration: 0.65, ease: 'power2.in' }, 1.05)

        // Phase 2 (1.62s -> 2.70s): Camera walks forward through open doors into sunlit studio
        .to(
          portalRef.current,
          { scale: 3.1, duration: 1.08, ease: 'power2.inOut' },
          1.62
        )
        .to(
          overlayRef.current,
          { opacity: 0, duration: 0.52, ease: 'power2.out' },
          2.22
        );
    }, overlayRef);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finish();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      ctx.revert();
    };
  }, [entranceActive, entranceReplayKey, reducedMotion, setEntranceActive]);

  if (!entranceActive || reducedMotion) return null;

  return (
    <div
      ref={overlayRef}
      role="region"
      aria-label="AERA Beauty Studio entrance sequence"
      className="fixed inset-0 z-50 overflow-hidden bg-[#F8F5F1] flex items-center justify-center"
    >
      {/* Door-free sunlit interior behind open doorway (prevents duplicate baked doors) */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={interiorAsset.fallbackSrc}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover scale-105 opacity-95"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 48%, rgba(248,245,241,0.45), rgba(243,230,223,0.28) 55%, rgba(80,67,72,0.16) 100%)',
          }}
        />
      </div>

      {/* 3D Perspective Portal Wrapper */}
      <div
        ref={portalRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        style={{ transformOrigin: '50% 52%', willChange: 'transform, opacity' }}
      >
        <div ref={stageRef} className="relative shrink-0 entrance-perspective">
          <div
            ref={seamGlowRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                'radial-gradient(ellipse at 50% 52%, rgba(248,245,241,0.95), rgba(243,230,223,0.42) 38%, transparent 72%)',
            }}
          />

          {/* Outer Limestone Architecture + Fixed Sidelights (4 pure rectangular insets to avoid polygon cutout artifacts) */}
          {[
            { inset: 'inset(0% 0% 87.85% 0%)', primary: true },
            { inset: 'inset(92.75% 0% 0% 0%)', primary: false },
            { inset: 'inset(12.1% 66.55% 7.2% 0%)', primary: false },
            { inset: 'inset(12.1% 0% 7.2% 66.55%)', primary: false },
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

          {/* Left Swinging Photographic Door Leaf */}
          <div
            ref={doorLeftRef}
            className="door-leaf-3d absolute overflow-hidden"
            style={{
              left: '33.4%',
              top: '12.1%',
              width: '16.6%',
              height: '80.7%',
              transformOrigin: 'left center',
            }}
          >
            <img
              src={doorsAsset.fallbackSrc}
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-201.205%',
                top: '-14.994%',
                width: '602.41%',
                height: '123.916%',
                maxWidth: 'none',
              }}
            />
            <div ref={shadeLeftRef} className="absolute inset-0 bg-[#2D2328] pointer-events-none" />
          </div>

          {/* Right Swinging Photographic Door Leaf */}
          <div
            ref={doorRightRef}
            className="door-leaf-3d absolute overflow-hidden"
            style={{
              left: '50%',
              top: '12.1%',
              width: '16.6%',
              height: '80.7%',
              transformOrigin: 'right center',
            }}
          >
            <img
              src={doorsAsset.fallbackSrc}
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-301.205%',
                top: '-14.994%',
                width: '602.41%',
                height: '123.916%',
                maxWidth: 'none',
              }}
            />
            <div ref={shadeRightRef} className="absolute inset-0 bg-[#2D2328] pointer-events-none" />
          </div>
        </div>

        {/* Subtle Threshold Etched Branding Plaque on Closed Doors */}
        <div
          ref={crestRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6"
        >
          <div className="bg-[#2D2328]/45 backdrop-blur-sm border border-[#F8F5F1]/25 px-5 py-2.5 rounded-xs -translate-y-24 md:-translate-y-28 shadow-sm">
            <p className="font-sculpt text-xs md:text-sm uppercase tracking-[0.42em] font-semibold text-[#F8F5F1]">
              {studioConfig.brand.wordmark}
            </p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#F8F5F1]/90 mt-1.5">
              {studioConfig.locale.neighborhood} · {studioConfig.locale.city}
            </p>
          </div>
        </div>
      </div>

      {/* Skip Entrance Control (Available from t=0) */}
      <button
        type="button"
        onClick={finishEntrance}
        className="absolute bottom-6 right-6 z-50 px-4 py-2 text-[11px] uppercase tracking-[0.16em] rounded-sm backdrop-blur-md border border-[#F8F5F1]/45 bg-[#2D2328]/55 text-[#F8F5F1] hover:bg-[#2D2328]/75 transition-colors cursor-pointer"
      >
        Skip Entrance →
      </button>
    </div>
  );
}
