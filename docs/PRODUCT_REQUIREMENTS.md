# Product Requirements — AERA Beauty Studio Showcase

## Routes & Commercial Coverage
- `/` — Guided 5-act journey (Entrance → Living Mirrors → Transformation → Artisans → Lookbook → Chair Sanctuary).
- `/services` — Interactive ritual menu filtered by pillar, hair length/complexity tiers in `₹ INR`, duration, consultation prep notes, and direct enquiry triggers.
- `/team` — Lead specialist profiles, creative philosophy, and artist-scoped request routing.
- `/bridal` — Private Bridal Suite showcase, 12-week-to-wedding-morning timeline, and bespoke packages.
- `/gallery` — Filterable editorial lookbook + before/after transformation studies + `Get This Look` consultation dossier.
- `/about` — Studio philosophy, botanical clean-care approach, Bengaluru showcase coordinates, hours, and directions layout.
- `/enquire` (plus global Enquiry Drawer) — Multi-step consultative Demo Appointment Request + live WhatsApp Payload Previewer.

## Configurability (`src/config/*`)
- `studio.config.ts`: Brand identity, Bengaluru showcase location, hours, INR locale (`en-IN`), WhatsApp adapter (`demoMode: true`), SEO publish flags.
- `theme.config.ts`, `services.config.ts`, `team.config.ts`, `bridal.config.ts`, `lookbook.config.ts`, `media.config.ts`.

## Strict Honesty & Compliance
1. Every appointment form and drawer clearly labels submissions as a **Demo Appointment Request** (*no real booking transmitted or confirmed*).
2. WhatsApp preview mode composes real URL-encoded messages for client handoff review without dialing or messaging an invented phone number.
3. LocalBusiness `HairSalon` JSON-LD generator stays disabled (`publishLocalBusinessSchema: false`) in the fictional showcase so non-existent salon data is not published as verified local business info.
4. Zero invented customer reviews, ratings, or press/award credentials.
