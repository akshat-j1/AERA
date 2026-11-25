# Technical Architecture

## Stack
- **UI**: React 19 + TypeScript (strict) + Vite 6 + Tailwind CSS v4 (`@tailwindcss/vite`).
- **Routing & Static Prerendering**: React Router v7 (`BrowserRouter` client hydration + `StaticRouter` build-time SSR prerendering via `scripts/prerender.mjs`) producing static `index.html` per route with injected route titles, descriptions, OpenGraph tags, and `sitemap.xml` / `robots.txt`.
- **Media Optimization**: `scripts/optimize-media.mjs` (`sharp`) compiles raw photography into responsive `AVIF` and `WebP` (`480w`, `960w`, `1600w`) plus base64 blur LQIP placeholders and explicit aspect metadata in `src/config/media.generated.ts`.
- **Validation & Security**: `zod` validation on Demo Request form, honeypot spam guard, `rel="noopener noreferrer"` on external anchors, strict CSP-friendly self-hosted fonts and zero client secrets.
- **Verification**: Vitest (`tests/unit`) for config integrity, currency formatting, WhatsApp payload builders, and JSON-LD generators; Playwright (`tests/e2e`) across `1440×900`, `768×1024`, and `390×844` with reduced-motion checks, accessibility audits, video capture, and Web Vitals telemetry.
