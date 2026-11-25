# Implementation Plan & Asset Backlog

## Visual Refinement V2 Architecture
- **Palette & Typography**: Shifted from pale lilac/beige to warm sunlit Soft White (`#FCFAF7`), Soft Peach (`#F4E5DA`), Warm Clay (`#EFE0D5`), Muted Rose (`#DEB0A3`), Terracotta (`#B76E5D` / accessible `#9A5343`), Cocoa (`#493B36`), and Espresso (`#2C221E`), led by expressive upright `@fontsource-variable/fraunces` display headers paired with `@fontsource-variable/syne` structural headings and `@fontsource-variable/plus-jakarta-sans` copy & `₹` prices.
- **Natural Commercial Copy**: Removed internal demo jargon across sections while keeping one discreet footer disclosure and clear submission notice, preserving `demoMode` WhatsApp payload previewing and `publishLocalBusinessSchema: false`.
- **Signature Choreography**:
  - Redesigned salon entrance (`doors-closed.jpg` walnut/fluted glass storefront doors -> `sanctuary-sunlit.jpg` airy sunlit styling corridor with live stylists -> seamless transition into arched hero).
  - Living Mirror Wall (`01 Haircuts & Styling`, `02 Hair Colour`, `03 Skincare`, `04 Bridal & Makeup`) with distinct photography per mirror.
  - Pinned liquid-displacement process sequence (desktop pinned forward/reverse scroll, mobile selector fallback).
  - Scroll-driven + direct-drag interactive Before & After with keyboard control integrated directly inside the photograph and non-fighting drag locking.
  - Pinned horizontal `Meet Our Stylists` showcase on desktop with smooth native swipe on tablet/mobile.

## Asset Generation & Remaining Backlog
- **Completed V2 Assets (23 total compiled in `public/media/`)**: Real salon frosted double entrance doors, airy sunlit interior corridor (`sanctuary-sunlit`, `studio-aisle-daylight`), hero salon craft centerpiece (`hero-craft`), 3 genuine documentary craft stages (`stage-consultation`, `stage-colour`, `stage-blowout`), Indian bridal jasmine chignon (`bridal-indian`), skincare facial sculpting (`skincare-facial`), unshaped before-hair reference (`before-hair`), distinct chestut layer / booking / dusk / courtyard plates, plus high-resolution practitioner crops (`stylist-cut`, `stylist-colour`, `stylist-styling`, `stylist-skin`).
- **Remaining Asset Backlog (Blocked by HTTP 429 image-gen capacity limit resetting after ~5 hours)**:
  1. Dedicated **same-subject studio Before/After pair** edited/shot cleanly on the exact same frame (`before-hair` -> matching edited glossed After twin; currently using an illustrative pairing of distinct Before and After plates with transparent captioning and zero CSS brightness/saturation filters).
  2. Dedicated standalone **unisex stylist studio portraits** (including male Creative Director representation and 4 bespoke studio headshots replacing documentary craft crops).
