export interface BridalPackage {
  id: string;
  name: string;
  subtitle: string;
  durationSummary: string;
  startingInvestmentInr?: number;
  customQuoteLabel?: string;
  includes: string[];
}

export interface BridalTimelineStep {
  phase: string;
  title: string;
  detail: string;
}

export const bridalPackages: BridalPackage[] = [
  {
    id: 'private-bride-sanctuary',
    name: 'The Private Bride Suite',
    subtitle: 'Full ceremony morning hair architecture, sheer luminous skin finish & dedicated trial.',
    durationSummary: 'Trial (2 hrs) + Wedding Morning (3.5 hrs)',
    startingInvestmentInr: 38000,
    includes: [
      'Private daylight suite reservation in Indiranagar (or curated venue call)',
      '2-hour architectural hair & skin luminosity trial with veil/dupatta testing',
      'Botanical barrier hydration facial 48 hours before ceremony',
      'Custom fresh floral pinning & touch-up silk kit',
    ],
  },
  {
    id: 'bridal-party-atelier',
    name: 'Bridal Party & Family Quiet Morning',
    subtitle: 'Harmonized natural waves, sculpted chignons, and soft skin prep for up to 5 loved ones.',
    durationSummary: 'Dedicated Dual-Artisan Team · Half Day',
    startingInvestmentInr: 68000,
    includes: [
      'Full Private Bride experience plus hair & skin finish for up to 4 family members',
      'Coordinated calm studio schedule with herbal infusions & zero rush',
      'Dedicated pinning specialist for sarees, lehengas & veils',
    ],
  },
  {
    id: 'multi-day-destination',
    name: 'Bespoke Multi-Day Celebration Curation',
    subtitle: 'Tailored editorial continuity across Haldi, Mehendi, Sangeet & Ceremony events.',
    durationSummary: '2–3 Day Custom Studio Itinerary',
    customQuoteLabel: 'Custom Proposal',
    includes: [
      'Event-by-event hair & skin moodboard tailored to garment tones & lighting',
      'Dedicated AERA lead duo travelling across Bengaluru or destination venues',
      'Post-celebration mineral hair & barrier recovery session at the studio',
    ],
  },
];

export const bridalTimeline: BridalTimelineStep[] = [
  {
    phase: '12 Weeks Prior',
    title: 'Hair Health & Tone Calibration',
    detail: 'Establish gentle scalp rituals, dry architectural shape, and low-ammonia gloss tone.',
  },
  {
    phase: '4 Weeks Prior',
    title: 'Private Suite Trial',
    detail: 'Bring blouse necklines, heirloom pins, and veil weight to refine proportions in true daylight.',
  },
  {
    phase: '48 Hours Prior',
    title: 'Northlight Skin Calm',
    detail: 'Zero-downtime lymphatic rose-quartz sculpt and lipid barrier hydration.',
  },
  {
    phase: 'Ceremony Morning',
    title: 'Unhurried Sanctuary Finish',
    detail: 'Soft music, herbal tea, weightless pinning, and calm natural radiance.',
  },
];
