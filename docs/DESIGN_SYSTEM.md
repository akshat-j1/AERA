# Design System — Tokens, Typography & Spatial Rules

## Color Palette Tokens (`src/config/theme.config.ts`)
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--surface-porcelain` | `#F8F5F1` | Primary restful canvas (~68% area) |
| `--surface-peach-mist` | `#F3E6DF` | Warm daylight hero layer & bright sanctuary backdrop |
| `--surface-lilac-mist` | `#E6DDEB` | Living Mirror Wall ambient wash & Lookbook gallery |
| `--accent-dusty-rose` | `#D5B4B8` | Sheer silk refraction veil, mood chips, editorial borders |
| `--accent-champagne` | `#C8B49D` | Matte travertine console, hairline dividers, soft mirror halo |
| `--brand-mauve` | `#504348` | Architectural timber, primary buttons, secondary headings |
| `--ink-plum` | `#2D2328` | High-contrast body ink (`12.8:1` on Porcelain) |

### Guardrails
- No black-heavy UIs (`#000`/`#0a0a0a` avoided), no metallic gold gradients, no neon glows, no all-pink/all-beige monotony.
- Maintain WCAG AA/AAA text contrast across every tinted surface.

## Typography System (Self-Hosted `@fontsource-variable`)
- **Architectural Display (`Syne Variable`)**: Weights `500–700`, tight `-0.025em` tracking for expressive modern headlines, mirror numbers, and the `A E R A` wordmark.
- **Whisper Organic Serif (`Fraunces Variable`)**: Italic weight `300`, `SOFT: 100` reserved sparingly for 2–3 word emotional phrases (*"and quiet confidence"*, *"to make your own"*).
- **Editorial Body & Tabular Currency (`Plus Jakarta Sans Variable`)**: Weights `300–600`, `font-variant-numeric: tabular-nums` for `₹ INR` rates and consultation times.
