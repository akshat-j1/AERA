# Implementation Plan & Asset Backlog

## Milestones
- **Milestone 0**: Git init, `AGENTS.md` + `docs/*`, Vite + React 19 + TS + Tailwind v4 + GSAP + Lenis + Vitest + Playwright scaffold.
- **Milestone 1**: Media optimization (`sharp`), `src/config/*` (Bengaluru/INR defaults), self-hosted variable fonts, Navigation, Footer, Silk Page Transitions, Mobile Sticky Bar, `LookbookDossier` & `EnquiryDrawer`.
- **Milestone 2**: Homepage full journey (Closed-to-Open 3D Entrance, Spatial Breath, Living Mirror Wall, Transformation + Before/After, Artisans, Mood-Filtered Lookbook, Sunlit Chair Sanctuary) + multi-viewport browser visual refinement.
- **Milestone 3**: Full inner pages (`/services`, `/team`, `/bridal`, `/gallery`, `/about`, `/enquire`) built to homepage visual parity + browser refinement.
- **Milestone 4**: Static prerendering (`scripts/prerender.mjs`), SEO metadata, keyboard focus traps, WCAG contrast checks, `prefers-reduced-motion` tuning.
- **Milestone 5**: Complete Vitest + Playwright verification across desktop/tablet/mobile, entrance & scroll video recordings, Web Vitals & a11y measurements, final cleanup commits.

## Asset Improvement Backlog
Because image generation hit temporary `HTTP 429` capacity limits during planning:
- Currently reusing/cropping among our 10 generated bespoke plates (`doors-closed.jpg`, `sanctuary-sunlit.jpg`, `mirror-wall.jpg`, `portrait-silk-waves.jpg`, `portrait-chignon.jpg`, `portrait-balayage.jpg`, `portrait-natural-profile.jpg`, `portrait-studio-waves.jpg`, `suite-dusk.jpg`, `studio-courtyard.jpg`).
- **Backlog for future studio polish / client handover**:
  1. Dedicated matched **Before & After** photography pair of the same client (unglazed dry texture vs. finished mineral gloss).
  2. Dedicated individual **Bridal Trial** portrait (with organic jasmine/silk styling) and **3 distinct Stylist Portraits** so Artisans, Lookbook, and Mirrors never share overlapping faces.
  3. Dedicated wide sunlit **Living Salon Action** frame (stylist gently finishing hair in daylight) to enhance the post-door entrance depth.
