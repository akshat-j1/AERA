# Technical Architecture

## Stack
- **UI**: React 19 + TypeScript 5.8 (strict) + Vite 7 + Tailwind CSS v4 (`@tailwindcss/vite`).
- **Motion & Smooth Scroll**: GSAP 3 + `@gsap/react` + Lenis (`autoRaf: false` synchronized via `gsap.ticker` with `lagSmoothing(0)`), paired with CSS 3D door choreography and reduced-motion fallbacks.
- **Routing & Static Prerendering**: React Router v7 (`BrowserRouter` client hydration + `StaticRouter` build-time SSR prerendering via `scripts/prerender.mjs`) producing static route directories (`index.html`), `404.html`, `robots.txt`, and optional `sitemap.xml` when `studioConfig.seo.allowIndexing` is enabled.
- **Media Optimization**: `scripts/optimize-media.mjs` (`sharp`) compiles raw photography in `src/assets/media/raw/` into responsive `AVIF` and `WebP` (`480w`, `960w`, `1600w` or intrinsic cap `<= 1800px`) plus base64 WebP LQIP placeholders and aspect-ratio metadata in `src/config/media.generated.ts`.
- **Validation & Security**: Zod schema validation on the Demo Appointment Request flow, Bengaluru studio-date validation, honeypot spam guard, `rel="noopener noreferrer"` on external anchors, self-hosted `@fontsource-variable` fonts, and zero client secrets.
- **Verification**: Vitest (`tests/unit`) for configuration, media/provenance resolution, INR formatting, WhatsApp preview composition, and routing helpers; Playwright + `@axe-core/playwright` (`tests/e2e`) across `1440×900`, `1280×800`, `768×1024`, and `390×844`.
