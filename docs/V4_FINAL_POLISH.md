# AERA V4 — Final Visual Polish

Branch: `feat/v4-final-visual-polish` (branched from `58641ed`, preserved as local checkpoint tag `v4-motion-craftsmanship-baseline`).

## 1. Visual Polish Changes Retained

### Finalized Alternative A — Richer Soft Luxury Palette
- Applied approved palette across `src/config/theme.config.ts`, `index.html`, `src/styles/index.css`, `SilkVeilTransition.tsx`, and all sections, pages, and modal dialogs:
  - Porcelain canvas: `#FCFAFA` (dominant light ground)
  - Soft Lilac: `#E8DFED` (selective hero lower bloom, ethos track, chair sanctuary frame, selective route banners, modal summary blocks)
  - Dusty Rose: `#DDBBC7` (text selection tint, silk route veil gradient end, hero upper radial bloom, chair sanctuary mirror halo)
  - Rich Mauve: `#98647A` (hairline architectural borders, quote rules, vertical hero thread, scrollbar thumb, interactive control accents)
  - Plum Ink: `#40343D` (body copy, primary action pills, slider chrome; `11.37:1` on Porcelain)
- Functional accessibility adjustments (`src/config/theme.config.ts` & `src/styles/index.css`):
  - `#7B4A60` (`--accent-berry-ink`): darkened shade of `#98647A` used for `10–12px` uppercase labels, inline whisper headings, focus outlines, form validation alerts, and CTA hover fills (`6.75:1` on `#FCFAFA`, `5.42:1` on `#E8DFED`, avoiding borderline `4.55:1` / `3.65:1` contrast of unadjusted `#98647A` on tinted lilac).
  - `#2A2028` (`--ink-aubergine`): deepest Plum Ink display tone for headings and navigation active contrast.
  - `#F5F0F3` (`--surface-alabaster`) and `#DED2DA` (`--border-mist`): light neutral surfaces and crisp hairlines balanced between Porcelain and Soft Lilac.

### Upgraded Matched Before & After Campaign Pair + Audit Disclosure
- Replaced `src/assets/media/raw/before-hair.jpg` and `after-hair-matched.jpg` (`896×1200`) with a cohesive campaign shoot of an Indian woman wearing a soft oyster-ivory brushed silk boat-neck blouse against a porcelain-lilac limewash plaster wall and blurred travertine ledge (`src/config/media.config.ts`, `src/config/lookbook.config.ts`), compiled cleanly via `npm run optimize:media`.
- Moved the illustrative-study disclosure (`Illustrative same-subject cut & gloss study`) directly beside the `"A softer shape. More dimension."` heading in `src/components/sections/TransformationComparison.tsx`, paired with a non-duplicative caption (`Drag divider or use the arrow keys to compare.`) beneath the frame.

## 2. Changes Evaluated and Rejected / Left Unchanged
- **Rejected After Candidate `after_hair_campaign_v4_v2`**: Visually expressive curl silhouette, but 50% overlay & 4x pixel difference measured a `13.07` left-profile/garment mean diff with ~12px head/sleeve ghosting. Kept `v1` (`4.65` mean left-profile diff, near-zero blouse/travertine drift).
- **Process Photography (`Crafted in daylight.`)**: Left existing `stage-consultation`, `stage-colour`, and `stage-blowout` photography untouched (`v4-desktop-06a/b/c`); stage differentiation, focal framing inside the arch, and light quality already read clearly without replacement.
- **Preserved Architecture & Scope Boundaries**: Untouched closed-door entrance choreography (`58641ed`), Hero geometry, typography hierarchy, Living Mirror Room interactions, Process liquid refraction timing, stylist native rail scrolling, booking workflow, and demo/SEO safeguards.

## 3. Handoff for Codex
- **Base for Review**: Compare `v4-motion-craftsmanship-baseline` (`58641ed`) against `feat/v4-final-visual-polish`.
- **Intentional Token Extensions**: Non-black functional shades `#7B4A60` (AA text/hover ink) and `#2A2028` (display ink) plus `#F5F0F3` / `#DED2DA` bridge shades derive from `#98647A` / `#40343D` / `#FCFAFA` / `#E8DFED` so every component satisfies WCAG AA without heavy uniform pink fills.
- **Suggested Future Codex Focus (Out of Scope Here)**: Process liquid displacement edge smoothing, mid-page Process-to-Compare pacing, stylist portrait variety when real photography replaces concept assets, and release/media-rights gates prior to public merge/deployment.
