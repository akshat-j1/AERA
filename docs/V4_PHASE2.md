# V4 Phase 2 — Creative Redesign, Media Provenance & Repository Publication

V4 Phase 2 builds directly on Codex's technical remediation (`fix/v4-technical-foundation` at `c9a594f`, branched from `v3-audited-baseline` at `7872fe9`).

## Summary of V4 Phase 2 Changes

1. **Unified Fluted-Glass Architectural Entrance & Asymmetric Hero**
   - Replaced boxed pink entrance doors with smoked-walnut and fluted frosted-glass double doors (`#aera-entrance` in `index.html` and `src/styles/index.css`) opening directly over the live sunlit studio hero (`HeroSection.tsx`).
   - Consolidated desktop arrival typography using `Syne Variable`, restrained `Fraunces Variable` italic accents in accessible berry ink (`#844D60`), and hairline secondary actions (`rounded-sm`).
   - Kept mobile above-the-fold focused on a single primary CTA by deferring `MobileConciergeBar.tsx` on `/` until scrolled past the hero (`scrollY > 440`).

2. **Matched Same-Subject Before/After & Media Deduplication**
   - Added `src/assets/media/raw/after-hair-matched.jpg` edited directly from `before-hair.jpg` (`TransformationComparison.tsx`, `src/config/lookbook.config.ts`) so the pinned scroll wipe and manual divider align pixel-for-pixel across subject, garment, wall, and light.
   - Removed byte-identical duplicate `portrait-natural-profile.jpg` and its generated variants, updated Living Mirror hotspots (`portrait-studio-waves`, `portrait-balayage`), and recompiled `23` responsive assets via `npm run optimize:media`.

3. **Verified Commercial Video Provenance (`src/config/videos.config.ts`)**
   - Replaced previous non-commercial Mixkit Restricted clips with four individually verified **Mixkit Stock Video Free License** clips (`#40592`, `#52141`, `#40583`, `#40560`), re-encoded locally to `540×960` H.264 24fps fast-start MP4s with poster JPEGs.
   - Converted mobile reels (`InMotionSection.tsx`) to a horizontal snap rail.

4. **Scroll Pacing & Configuration Hygiene**
   - Removed the third homepage scroll pin (`ArtisansPreview.tsx`), tightened remaining pinned durations (`TransformationSection.tsx` `172vh`, `TransformationComparison.tsx` `150vh`), removed duplicated transformation sections from `GalleryPage.tsx`, and routed remaining hardcoded neighborhood labels (`ChairSanctuarySection.tsx`, `EnquiryDrawer.tsx`, etc.) through `studioConfig`.

## Remaining Open Items (Honest Scope)
- Server capacity (`HTTP 503 UNAVAILABLE`) prevented generating a fourth standalone stylist portrait (`Rhea Deshmukh`); `src/config/team.config.ts` stays at the verified 3-person team (`meera-rao`, `kavya-nair`, `ananya-krishnan`).
- Several secondary crops (`stylist-cut`/`stage-consultation`, `stylist-colour`/`stage-colour`, `stylist-styling`/`hero-craft`, plus unused `stylist-skin`/`skincare-facial`) originate from shared shoot compositions; real client shoots should replace AI-generated showcase photography before commercial launch.
- Codex Phase 3 independent audit and live booking backend integration remain future milestones.
