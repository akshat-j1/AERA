# Motion Design Specification

## Core Synchronization Engine
- `Lenis` (`lerp: 0.085`, `smoothWheel: true`, `autoRaf: false`) is driven strictly inside `gsap.ticker.add((time) => lenis.raf(time * 1000))` with `gsap.ticker.lagSmoothing(0)`.
- `lenis.on('scroll', ScrollTrigger.update)` keeps scroll-scrubbed timelines frame-locked.
- All animations wrap inside `@gsap/react`'s `useGSAP()` scoped per component and clean up cleanly across routes.

## Signature Motion Primitives
1. **3D door swing** — The aperture and both opaque leaves share one photographic crop. The lintel crest exits before the hinges move, then the façade scales outward. The live hero copy enters late in the push. The native dialog clears at 2.44s and has a 2.54s fail-open timer.
2. **Hero to mirrors** — The room photo, foreground portrait and vertical rule travel at different rates into two opposing kinetic type tracks. The mirror aperture expands diagonally on the same background and the scene resolves into the service ledger.
3. **Liquid Process** — Scroll selects the next stage on desktop and tablet. The ripple runs on its own after the threshold is crossed, so a pause in scrolling still lets the image and copy settle. The same transition runs in reverse when the visitor crosses back. An elliptical wipe and `#aera-silk-refract` share one timeline. Refraction turns off at rest. Phones use the stage controls.
4. **Before & After** — Desktop sticky framing holds the eye line through the wipe. Pointer and keyboard input take ownership until the frame leaves view or the visitor resumes scroll. The stylist and reel sections keep native horizontal overflow. Desktop scroll also drives the stylist rail across its measured overflow without a third pin. Arrow controls and card focus take priority, and mobile and tablet keep native swipe.
5. **Linen route veil** — A translucent silk sheet runs on client navigation. Playback of the architectural entrance suppresses that veil while the doors are active.

## Accessibility & Device Fallbacks
- `useReducedMotion()` listens to `(prefers-reduced-motion: reduce)`: bypasses entrance animation immediately, disables Lenis inertia, turns off SVG displacement filters, and keeps all scroll elements visible (`opacity: 1`).
- Mobile viewports replace hover-dependent interactions with crisp touch controls and native touch momentum without rigid scroll-jacking traps.
