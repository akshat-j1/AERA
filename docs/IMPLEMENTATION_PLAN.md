# Implementation Plan & Asset Backlog

## Visual Refinement V3 Architecture
- **Palette & Contemporary Display System**: Neutral Porcelain (`#FAF8F7`, ~70%) and Alabaster (`#F2EEF1`) surfaces enriched by Soft Lilac (`#E7DFEB`), Dusty Rose (`#D8ADB6`), Muted Berry (`#B77F91` / accessible WCAG-AA `#844D60`), Plum Ink (`#493D46`), and Deep Aubergine (`#2A2128`), pairing sculptural geometric display (`@fontsource-variable/syne`) and clean modern display sans (`@fontsource-variable/plus-jakarta-sans`) so headlines feel unmistakably contemporary rather than traditional serif-heavy templates.
- **Unified Entrance-to-Hero Continuity**: `GrandEntranceOverlay` opens frosted Dusty Rose & Plum Ink fluted double salon doors directly onto the live Twin-Arched sunlit salon sanctuary & central `A E R A` (`Hair · Skin · Beauty`) hero canvas with zero sudden scene crossfade.
- **Focused 7-Experience Homepage Flow**:
  1. Unified Opening & Seamless Hero (`GrandEntranceOverlay` + `HeroSection` with corner-drifting skincare & colour gallery cards).
  2. Dual-Direction Opposing Scroll-Controlled Typography Strip (`EthosSpacer`).
  3. Interactive Mirror Room (`LivingMirrorWall`) with frost-clearing reveals.
  4. Our Process (`TransformationSection` Part A: CSS-sticky sequence with oversized bleed-safe `<feDisplacementMap>` & `<feTurbulence>` wave ripple).
  5. Pinned Before & After (`TransformationSection` Part B: stationary viewport CSS-sticky pin tracking scroll forward/reverse, direct inside-photo pointer drag with zero conflict and zero separate control bar, and honest same-subject mapping overlay).
  6. Meet Our Stylists (`ArtisansPreview` horizontal sticky scroll track featuring verified working stylist imagery).
  7. AERA in Motion (`InMotionSection` staggered 9:16 vertical clips sourced locally under Mixkit license with configurable `videos.config.ts`) & Empty Chair + Illuminating Mirror Booking Finale (`ChairSanctuarySection`).

## Asset Backlog (Blocked by HTTP 429 Image-Generation Capacity Limit)
1. **Same-subject edited After photograph (`after-hair-matched`)**: Image-generation subagent attempt editing `before-hair.jpg` hit `RESOURCE_EXHAUSTED` (`HTTP 429`, ~4h reset window). Currently ships an honest same-subject studio consultation mapping overlay + target shade swatch (`portrait-balayage`) without substituting unrelated portraits or CSS filters.
2. **4 standalone studio headshots for unisex stylist roster (including male Creative Director & dedicated skin therapist portrait `Rhea Deshmukh`)**: Currently displays the 3 verified working salon stylist photographs (`stylist-cut`, `stylist-colour`, `stylist-styling`).
3. **Individual Mixkit license badge perma-check**: Clip HTML pages briefly hit Mixkit's scraper rate limiter (`HTTP 429`); general `Mixkit Stock Video Free License` commercial terms verified cleanly via `mixkit.co/license` and web search docs, with self-hosted optimized 9:16 MP4s (`public/media/videos/*`) ready to swap per client.
