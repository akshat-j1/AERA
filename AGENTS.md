# AGENTS.md — AERA Beauty Studio Workspace Rules

This repository houses **AERA Beauty Studio**, a flagship soft-luxury beauty sanctuary portfolio showcase and reusable commercial salon template. Any agent or engineer modifying this repository MUST preserve the rules below.

## 1. Creative & Visual Identity Guardrails
- **Direction**: *Lumière Atelier* enriched with expressive portrait layering, kinetic typography, and mood-filtered lookbook interactions (`docs/CREATIVE_DIRECTION.md`).
- **Palette Balance**: Lead with calm light Porcelain (`#F8F5F1`, ~68%) warmed by Soft Peach-Champagne (`#F3E6DF`), selective Soft Lilac (`#E6DDEB`), delicate Dusty Rose (`#D5B4B8`) silk motion highlights, Muted Champagne (`#C8B49D`) stone/hairlines, and Deep Mauve (`#504348`) / Plum Ink (`#2D2328`). Never drift into black-heavy UIs, shiny gold metallic gradients, neon glows, or flat pastel monotony.
- **Typography**: Self-hosted `@fontsource-variable/syne` (sculptural modern display), `@fontsource-variable/fraunces` (soft italic whisper accents sparingly), and `@fontsource-variable/plus-jakarta-sans` (body & tabular `₹` pricing). Never revert to `Bodoni Moda` oversized serif layouts or copy `shreeji-fashion-puce.vercel.app`.
- **Pacing**: Maintain ~70% calm comfortable design, ~20% refined motion, ~10% signature moments. One clear creative idea per section.
- **Human-Centered Craft**: Never leave mirrors, portals, or hero bands feeling like sterile empty furniture catalogues.

## 2. Signature Entrance Rule
- First arrival in a session MUST begin with **100% closed** double salon doors (`doors-closed`), automatically swing open in 3D perspective (`rotateY`), push smoothly forward into the living studio, and reveal the live homepage (`~2.75s`).
- Never place duplicate open doors behind the swinging doors.
- Always provide an accessible `Skip Entrance →` button, play automatically once per `sessionStorage` (with explicit replay trigger available), and bypass cleanly under `prefers-reduced-motion: reduce`.

## 3. Product, Demo Honesty & Reusability Rules
- **Single Source of Config**: All branding, services, INR pricing, team profiles, bridal suites, lookbook entries, locations, and media manifests MUST live in `src/config/*`. UI components must remain reusable across future salon clients.
- **Strict Demo Honesty**: This showcase demonstrates fictional Bengaluru salon data (`₹ INR`). Never claim real chair slots are confirmed or transmitted to a live salon. Never wire `wa.me` links to invented phone numbers (`demoMode: true` shows an interactive WhatsApp Concierge Message Preview modal instead). Never publish fake LocalBusiness schema as verified business data when `publishLocalBusinessSchema` is `false`. Never invent testimonials, star ratings, or awards.

## 4. Engineering & Verification Discipline
- Unify `Lenis` (`autoRaf: false`) onto `gsap.ticker` with `gsap.ticker.lagSmoothing(0)` (`docs/MOTION_DESIGN.md`).
- Animate only GPU-friendly properties (`transform`, `opacity`, `clip-path`) plus lightweight SVG `<feDisplacementMap>` attributes where gated by reduced-motion checks.
- Do NOT consider any milestone complete just because code compiles or unit tests pass. Inspect rendered routes in Chromium across `1440×900`, `768×1024`, and `390×844`, verify recordings of motion sequences, and report measured Web Vitals & accessibility checks truthfully.
- Require explicit user approval before creating remote repositories, deploying publicly, introducing paid services, or handling real credentials.
