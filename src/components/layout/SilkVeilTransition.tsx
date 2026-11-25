import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../lib/useReducedMotion';

export function SilkVeilTransition() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const veilRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;

    if (reducedMotion || !veilRef.current) return;

    setActive(true);
    const el = veilRef.current;
    const tl = gsap.timeline({
      onComplete: () => setActive(false),
    });

    tl.fromTo(
      el,
      { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.92 },
      { clipPath: 'inset(0% 0% 0% 0%)', opacity: 0.96, duration: 0.24, ease: 'power2.out' }
    ).to(el, {
      clipPath: 'inset(0% 0% 100% 0%)',
      opacity: 0,
      duration: 0.34,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, [location.pathname, reducedMotion]);

  return (
    <div
      ref={veilRef}
      aria-hidden="true"
      className={`fixed inset-0 z-50 pointer-events-none ${active ? 'block' : 'hidden'}`}
      style={{
        background: 'linear-gradient(160deg, #F8F5F1 0%, #E6DDEB 55%, #F3E6DF 100%)',
      }}
    />
  );
}
