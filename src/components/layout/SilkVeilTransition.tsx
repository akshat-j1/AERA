import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { useStudio } from '../../lib/StudioContext';

export function SilkVeilTransition() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  const veil = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { entranceActive } = useStudio();

  useGSAP(() => {
    const navigated = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (!navigated || reducedMotion || entranceActive || !veil.current) return;

    gsap.timeline()
      .fromTo(veil.current, { clipPath: 'inset(100% 0 0 0)', autoAlpha: 0.94 }, {
        clipPath: 'inset(0 0 0 0)', autoAlpha: 0.98, duration: 0.24, ease: 'power2.out',
      })
      .to(veil.current, {
        clipPath: 'inset(0 0 100% 0)', autoAlpha: 0, duration: 0.34, ease: 'power3.out',
      });
  }, { scope: veil, dependencies: [pathname, reducedMotion, entranceActive], revertOnUpdate: true });

  return (
    <div
      ref={veil}
      data-route-veil
      aria-hidden="true"
      className="fixed inset-0 z-50 invisible pointer-events-none"
      style={{ background: 'linear-gradient(155deg, #FAF8F7 0%, #E7DFEB 55%, #D8ADB6 100%)' }}
    />
  );
}
