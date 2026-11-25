export type PillarId = 'hair-craft' | 'sculptural-colour' | 'botanical-skin' | 'bridal-suite';

export interface LengthTier {
  label: string;
  priceInr: number;
}

export interface SalonService {
  id: string;
  pillarId: PillarId;
  name: string;
  summary: string;
  durationMinutes: number;
  startingPriceInr: number;
  lengthTiers?: LengthTier[];
  consultationNote: string;
  featuredInMirror?: boolean;
}

export interface StudioMirrorPillar {
  id: PillarId;
  mirrorIndex: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  reflectionMediaId: string;
  reflectionObjectPosition?: string;
  startingLabel: string;
  headlineRitual: string;
  headlineDuration: string;
  hotspotStyle: {
    left: string;
    top: string;
    width: string;
    height: string;
    borderRadius: string;
  };
}

export const mirrorPillars: StudioMirrorPillar[] = [
  {
    id: 'hair-craft',
    mirrorIndex: '01',
    shortLabel: 'Hair',
    title: 'Architectural Hair Craft',
    subtitle: 'Movement mapping, dry precision shaping & botanical scalp steam.',
    reflectionMediaId: 'portrait-natural-profile',
    reflectionObjectPosition: '50% 24%',
    startingLabel: 'From ₹2,800',
    headlineRitual: 'Dry Sculptural Cut & Scalp Ritual',
    headlineDuration: '75 min',
    hotspotStyle: {
      left: '13.4%',
      top: '29.5%',
      width: '12.1%',
      height: '55.2%',
      borderRadius: '2px',
    },
  },
  {
    id: 'sculptural-colour',
    mirrorIndex: '02',
    shortLabel: 'Colour',
    title: 'Sculptural Mineral Colour',
    subtitle: 'Ammonia-free gloss painting calibrated under true north daylight.',
    reflectionMediaId: 'portrait-balayage',
    reflectionObjectPosition: '50% 35%',
    startingLabel: 'From ₹4,200',
    headlineRitual: 'Mineral Dimensional Balayage',
    headlineDuration: '180 min',
    hotspotStyle: {
      left: '33.8%',
      top: '35.4%',
      width: '9.2%',
      height: '35.1%',
      borderRadius: '999px',
    },
  },
  {
    id: 'botanical-skin',
    mirrorIndex: '03',
    shortLabel: 'Skin',
    title: 'Botanical Skin Sanctuary',
    subtitle: 'Lymphatic rose-quartz sculpting & lipid barrier recovery.',
    reflectionMediaId: 'portrait-silk-waves',
    reflectionObjectPosition: '50% 22%',
    startingLabel: 'From ₹3,900',
    headlineRitual: 'Barrier Restoration & Lymphatic Sculpt',
    headlineDuration: '90 min',
    hotspotStyle: {
      left: '50.9%',
      top: '36.6%',
      width: '25.3%',
      height: '37.2%',
      borderRadius: '2px',
    },
  },
  {
    id: 'bridal-suite',
    mirrorIndex: '04',
    shortLabel: 'Bridal',
    title: 'Bridal & Private Suite',
    subtitle: 'Calm bespoke trials, veil architecture & luminous celebration skin.',
    reflectionMediaId: 'portrait-chignon',
    reflectionObjectPosition: '50% 20%',
    startingLabel: 'Custom Suite',
    headlineRitual: 'Private Atelier Bridal Trial & Morning',
    headlineDuration: 'Half-Day Suite',
    hotspotStyle: {
      left: '82.8%',
      top: '28.4%',
      width: '10.4%',
      height: '48.1%',
      borderRadius: '999px 999px 2px 2px',
    },
  },
];

export const salonServices: SalonService[] = [
  {
    id: 'sculptural-cut',
    pillarId: 'hair-craft',
    name: 'Dry Sculptural Cut & Botanical Scalp Wash',
    summary:
      'Cut in natural texture prior to an unhurried rosemary-oat scalp cleanse, warm towel compression, and soft diffused finish.',
    durationMinutes: 75,
    startingPriceInr: 2800,
    lengthTiers: [
      { label: 'Short / Cropped', priceInr: 2800 },
      { label: 'Shoulder / Mid-Length', priceInr: 3400 },
      { label: 'Long & Dense', priceInr: 4100 },
    ],
    consultationNote: 'Includes hair growth-pattern diagnostic and effortless home-air-dry styling guidance.',
    featuredInMirror: true,
  },
  {
    id: 'silk-blowout-ritual',
    pillarId: 'hair-craft',
    name: 'Amino Silk Bond Wash & Natural Movement Blowout',
    summary:
      'Restorative lipid mask steamed softly under mist, finished with low-heat round brushing for weightless movement.',
    durationMinutes: 60,
    startingPriceInr: 2400,
    lengthTiers: [
      { label: 'Short / Mid', priceInr: 2400 },
      { label: 'Long & Dense', priceInr: 3100 },
    ],
    consultationNote: 'Ideal before intimate events or portraits without stiff hairspray buildup.',
  },
  {
    id: 'scalp-micro-therapy',
    pillarId: 'hair-craft',
    name: 'Cedarwood & Rosewater Scalp Therapy',
    summary:
      'Exfoliating botanical tonic, acupressure neck release, and barrier-soothing mist session.',
    durationMinutes: 50,
    startingPriceInr: 2600,
    consultationNote: 'Recommended seasonally for humid or high-pollution scalp sensitivity.',
  },
  {
    id: 'mineral-balayage',
    pillarId: 'sculptural-colour',
    name: 'Mineral Dimensional Balayage & Silk Glaze',
    summary:
      'Hand-painted sun-ribbon warmth blended seamlessly into natural Indian espresso or dark brunette bases, sealed with bond care.',
    durationMinutes: 180,
    startingPriceInr: 8500,
    lengthTiers: [
      { label: 'Partial Framing', priceInr: 8500 },
      { label: 'Full Shoulder / Mid', priceInr: 11500 },
      { label: 'Long & Dense', priceInr: 14200 },
    ],
    consultationNote: 'Sensitivity patch note confirmed 48 hours ahead for first-time colour guests.',
    featuredInMirror: true,
  },
  {
    id: 'botanical-gloss-tint',
    pillarId: 'sculptural-colour',
    name: 'Translucent Mineral Gloss & Root Blend',
    summary:
      'Ammonia-free demi-permanent tone veil adding mirror-soft shine and muted champagne or espresso richness.',
    durationMinutes: 90,
    startingPriceInr: 4200,
    lengthTiers: [
      { label: 'Short / Roots', priceInr: 4200 },
      { label: 'Medium', priceInr: 5400 },
      { label: 'Long', priceInr: 6600 },
    ],
    consultationNote: 'Refreshes warmth or cools brassiness without altering virgin base health.',
  },
  {
    id: 'barrier-sculpt-facial',
    pillarId: 'botanical-skin',
    name: 'Barrier Restoration & Rose-Quartz Lymphatic Sculpt',
    summary:
      'Gentle enzyme polish, niacinamide-ceramide infusion, and chilled stone lymphatic drainage for luminous calm.',
    durationMinutes: 90,
    startingPriceInr: 4200,
    consultationNote: 'Custom formulated on arrival for sensitive, reactive, or travel-fatigued skin.',
    featuredInMirror: true,
  },
  {
    id: 'bridal-prep-glow',
    pillarId: 'botanical-skin',
    name: 'Northlight Dew Hydration Ritual',
    summary:
      'Pre-event micro-current lift and deep hydration layer designed to make minimal skin tint sit effortlessly.',
    durationMinutes: 75,
    startingPriceInr: 3900,
    consultationNote: 'Zero downtime; ideal 24–48 hours prior to wedding or editorial appearances.',
  },
  {
    id: 'bridal-atelier-trial',
    pillarId: 'bridal-suite',
    name: 'Private Bridal Hair & Skin Consultation Trial',
    summary:
      'Two-hour calm exploration testing veil anchor points, organic floral silhouettes, and daylight skin luminosity.',
    durationMinutes: 120,
    startingPriceInr: 9500,
    consultationNote: 'Held inside AERA’s private daylight suite with garment & dupatta colour swatches.',
    featuredInMirror: true,
  },
];
