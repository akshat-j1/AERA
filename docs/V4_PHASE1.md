# V4 Phase 1 technical foundation

V3 reference: annotated local tag `v3-audited-baseline` at `7872fe9`. The independent audit and its evidence are in the ignored `audit-captures/independent-v3-7872fe9/` directory. Phase 1 browser and performance evidence is in `audit-captures/v4-phase1/`.

## Local verification

Run `npm ci` on Node 22 (22.12 or later), Node 24, or Node 26 or later, as supported by the locked Vitest version. Run `npm run typecheck`, `npm test`, and `npm run build`. The production preview runs with `npm run preview -- --port 4192 --strictPort`. After building, run `CI=1 AERA_PREVIEW_PORT=4194 npm run test:e2e` against a free loopback port. Playwright starts its own production preview. E2E uses the existing Chromium binaries and records the desktop and mobile journeys.

## Antigravity handoff

| Area | Interface or constraint |
| --- | --- |
| Arrival | `index.html` contains the single prerendered native `#aera-entrance` dialog and its independent bootstrap. The 3D rules are in `src/styles/index.css`. `StudioContext` exposes `enterHome`, `triggerEntranceReplay` and `entranceActive`. Keep the static markup usable when the app bundle or hero asset fails. Preserve immediate Skip focus, the session key, reduced-motion bypass, a bounded runtime and one closed set of doors. |
| Hero and mirrors | `HeroSection`, `LivingMirrorWall` and `EthosSpacer` own the live arrival composition, service selectors and opposing typography. The entrance remains separate from hero hydration. Keep art directed hero images behind that same live aperture and preserve `StudioPicture` dimensions and error fallback. |
| Process and comparison | `TransformationSection` owns stage pinning and one scoped ripple timeline. `TransformationComparison` owns the scroll wipe and visible slider. Use `transformationStages` and `transformationStudies` in `src/config/lookbook.config.ts`. A verified matching photo goes in `afterMediaId` and must be a registered `MediaId`. Leave it null until subject, pose, clothing, framing, light and background match. The consultation panel shows the current fallback. The adjacent reference swatch is a separate asset. |
| Motion | The desktop pins require both reduced-motion permission and the app enhancement flag. Keep the static layout usable and retain `pan-y` on the comparison canvas. `SmoothScrollProvider` drives Lenis through the GSAP ticker with `autoRaf: false`. Scope tweens and updates with `useGSAP` cleanup and preserve mobile swiping for the stylist rail. |
| Booking and modal surfaces | Use `StudioDialog` and the studio context to open modal layers. Native modal stacking preserves the calling surface and its focus. Enquiry openings take a fresh draft. Booking windows and profile options are in `booking.config.ts`, service eligibility in `team.config.ts`, and validation and studio-date logic in `lib/booking.ts`. The form builds a local preview and has no booking transport. Keep `demoMode` enabled for AERA. |
| Reels | `InMotionSection` coordinates one playing clip and pauses on exit from the viewport or when the page is hidden. Use `videos.config.ts` to change clips and posters. Keep visible pause and retry controls and on-demand media loading. Add an accessible audio and caption model if replacement assets contain meaningful audio. |
| Routes and SEO | `routePaths.ts` and `routePages.ts` define the route inventory and lazy modules. `entry-server.tsx` and `scripts/prerender.mjs` emit individual page documents and `dist/404.html`. Services queries enhance the generic prerender after hydration. Keep the known fallback document and status in the hosting rules. |

The next creative pass owns photographic doors and hero integration, image hierarchy and pacing, authentic matched Before/After assets, distinctive stylist portraits, and final reel selection. Playwright currently verifies the fallback comparison with both endpoints. Repeat the comparison check with the approved paired photographs when available.

## Media provenance

The repository identifies these four files as reported Mixkit clips. Original item URLs, IDs, specific license categories and commercial redistribution rights are still open.

| File | Provenance |
| --- | --- |
| `hair-brushing.mp4` | Original item and license unverified |
| `scalp-wash.mp4` | Original item and license unverified |
| `mirror-makeup.mp4` | Original item and license unverified |
| `bridal-brush.mp4` | Original item and license unverified |

Record each clip's original item URL, license category, acquisition date and permitted purpose before publication. Confirm commercial template handoff separately where it includes redistributing assets. Also establish provenance for the final replacement photography.

## Publication configuration

- Point the eventual host at `dist/`. Serve the generated directory indexes for all named routes and return `dist/404.html` with HTTP 404 on unknown document URLs. Missing media and script requests should return HTTP 404 as well. Avoid a catch-all rewrite to the homepage with status 200. The Vite preview demonstrates the document status behavior locally.
- Replace the `.example` site URL in `studio.config.ts` with the approved HTTPS origin before publication. The fictional build emits `noindex, follow`, keeps a robots file that permits crawlers to see the directive, and omits the sitemap. Use verified business data before enabling the indexing or LocalBusiness schema flags on a real salon project. The demo flag suppresses both indexing and LocalBusiness publication.
- Use an authenticated preview if the content needs to stay private. Search directives do not control access. Keep the fictional address disclosure and preview language for the showcase. A live booking integration needs its own verified business details, transport, validation, consent, persistence, abuse controls and privacy review.
- Configure production security headers on the actual host. Validate a CSP with the exact inline entry bootstrap hash from built HTML, local scripts and fonts, explicit local media scope, and the CSS and image policies required by runtime styles and data-URI placeholders. Test the GSAP and image paths under the policy. Prevent framing where the host requires it, serve HTTPS, and validate headers with real production responses.
- Deploy with consistent HTML and hashed asset versions so a route and its dynamic imports stay available together. Cache fingerprinted bundles separately from the route HTML and unversioned media, then verify all direct URLs against host cache and 404 behavior.

Physical devices, assistive-technology speech output, production hosting and real-user Web Vitals are outside the local build verification.
