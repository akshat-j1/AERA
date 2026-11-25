# Motion Design Specification

## Core Synchronization Engine
- `Lenis` (`lerp: 0.085`, `smoothWheel: true`, `autoRaf: false`) is driven strictly inside `gsap.ticker.add((time) => lenis.raf(time * 1000))` with `gsap.ticker.lagSmoothing(0)`.
- `lenis.on('scroll', ScrollTrigger.update)` keeps scroll-scrubbed timelines frame-locked.
- All animations wrap inside `@gsap/react`'s `useGSAP()` scoped per component and clean up cleanly across routes.

## Signature Motion Primitives
1. **3D Perspective Door Swing**: `perspective(1400px)` hinged `rotateY` + rotational shadow + scale push; zero layout reflow (`transform`/`opacity` only).
2. **Organic Liquid Silk Transition**: Shared hidden SVG filter (`#aera-silk-refract` using `feTurbulence` + `feDisplacementMap` animated via GSAP `attr: { scale }` `0 → 38 → 0`) paired with GPU `clip-path: inset()` curves—zero shiny chrome or heavy Three.js overhead.
3. **Linen Veil Route Transitions**: Translucent `#E6DDEB`/`#F8F5F1` silk sheet glides cleanly during client route navigation and resets scroll to `0`.

## Accessibility & Device Fallbacks
- `useReducedMotion()` listens to `(prefers-reduced-motion: reduce)`: bypasses entrance animation immediately, disables Lenis inertia, turns off SVG displacement filters, and keeps all scroll elements visible (`opacity: 1`).
- Mobile viewports replace hover-dependent interactions with crisp touch controls and native touch momentum without rigid scroll-jacking traps.
