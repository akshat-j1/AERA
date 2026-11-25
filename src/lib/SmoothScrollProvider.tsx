import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from './useReducedMotion';
import { useStudio } from './StudioContext';
import { themeConfig } from '../config/theme.config';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();
  const { entranceActive } = useStudio();
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: themeConfig.motion.lenisLerp,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
      prevent: (node) => !!node.closest("dialog"),
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (entranceActive) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [entranceActive]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return <>{children}</>;
}
