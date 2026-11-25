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
    shortLabel: 'Haircuts',
    title: 'Haircuts & Styling',
    subtitle: 'Tailored haircuts shaped around your natural texture, plus soothing scalp washes and weightless blowouts.',
    reflectionMediaId: 'hero-craft',
    reflectionObjectPosition: '52% 28%',
    startingLabel: 'From ₹2,400',
    headlineRitual: 'Precision Haircut & Blowout',
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
    title: 'Hair Colour',
    subtitle: 'Low-ammonia balayage, soft caramel highlights, and demi-permanent shine glosses mixed for natural daylight.',
    reflectionMediaId: 'stage-colour',
    reflectionObjectPosition: '50% 25%',
    startingLabel: 'From ₹4,200',
    headlineRitual: 'Hand-Painted Balayage & Gloss',
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
    shortLabel: 'Skincare',
    title: 'Skincare & Facials',
    subtitle: 'Calming lymphatic facials, gentle enzyme polish, and barrier hydration for a fresh, rested complexion.',
    reflectionMediaId: 'skincare-facial',
    reflectionObjectPosition: '50% 42%',
    startingLabel: 'From ₹3,900',
    headlineRitual: 'Signature Lymphatic Glow Facial',
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
    title: 'Bridal & Makeup',
    subtitle: 'Private bridal trials, effortless jasmine chignons, saree and veil pinning, and radiant morning styling.',
    reflectionMediaId: 'bridal-indian',
    reflectionObjectPosition: '50% 22%',
    startingLabel: 'Custom Suites',
    headlineRitual: 'Bridal Hair & Makeup Trial',
    headlineDuration: '120 min',
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
    name: 'Precision Haircut & Blowout',
    summary:
      'Custom shape mapped to your natural hair fall, paired with a soothing rosemary scalp cleanse, warm towel compression, and diffused finish.',
    durationMinutes: 75,
    startingPriceInr: 2800,
    lengthTiers: [
      { label: 'Short / Cropped', priceInr: 2800 },
      { label: 'Shoulder / Mid-Length', priceInr: 3400 },
      { label: 'Long & Dense', priceInr: 4100 },
    ],
    consultationNote: 'Includes a personal wash-and-go routine matched to humid Bengaluru mornings.',
    featuredInMirror: true,
  },
  {
    id: 'silk-blowout-ritual',
    pillarId: 'hair-craft',
    name: 'Silk Smooth Wash & Blowout',
    summary:
      'Deep conditioning mist treatment followed by low-heat round brushing for soft bounce and natural movement without stiff hold.',
    durationMinutes: 60,
    startingPriceInr: 2400,
    lengthTiers: [
      { label: 'Short / Mid', priceInr: 2400 },
      { label: 'Long & Dense', priceInr: 3100 },
    ],
    consultationNote: 'Ideal ahead of dinners, portraits, or family occasions.',
  },
  {
    id: 'scalp-micro-therapy',
    pillarId: 'hair-craft',
    name: 'Soothing Scalp Care Treatment',
    summary:
      'Gentle exfoliating scalp tonic, relaxing neck and temple massage, and nourishing hydration steam.',
    durationMinutes: 50,
    startingPriceInr: 2600,
    consultationNote: 'Recommended monthly for stressed or weather-sensitive scalps.',
  },
  {
    id: 'mineral-balayage',
    pillarId: 'sculptural-colour',
    name: 'Hand-Painted Balayage & Gloss',
    summary:
      'Warm caramel, copper, or toasted hazelnut highlights hand-blended softly into your base with bond protection so roots grow out gracefully.',
    durationMinutes: 180,
    startingPriceInr: 8500,
    lengthTiers: [
      { label: 'Partial Framing', priceInr: 8500 },
      { label: 'Full Shoulder / Mid', priceInr: 11500 },
      { label: 'Long & Dense', priceInr: 14200 },
    ],
    consultationNote: 'Includes a complimentary allergy patch check 48 hours before first colour sessions.',
    featuredInMirror: true,
  },
  {
    id: 'botanical-gloss-tint',
    pillarId: 'sculptural-colour',
    name: 'Ammonia-Free Hair Colour & Shine Gloss',
    summary:
      'Rich, ammonia-free root coverage or all-over glaze for soft shine and lasting tone.',
    durationMinutes: 90,
    startingPriceInr: 4200,
    lengthTiers: [
      { label: 'Roots / Short', priceInr: 4200 },
      { label: 'Medium', priceInr: 5400 },
      { label: 'Long', priceInr: 6600 },
    ],
    consultationNote: 'Leaves hair smooth and glossy without harsh ammonia odour.',
  },
  {
    id: 'barrier-sculpt-facial',
    pillarId: 'botanical-skin',
    name: 'Signature Lymphatic Glow Facial',
    summary:
      'Gentle enzyme exfoliation, calming ceramide serum infusion, and sculpted facial massage to reduce puffiness and boost radiance.',
    durationMinutes: 90,
    startingPriceInr: 4200,
    consultationNote: 'Tailored on arrival for sensitive, combination, or travel-tired skin.',
    featuredInMirror: true,
  },
  {
    id: 'bridal-prep-glow',
    pillarId: 'botanical-skin',
    name: 'Hydrating Radiance Facial',
    summary:
      'Zero-downtime plumping facial treatment designed to make skin glow naturally under bare skin tints or wedding makeup.',
    durationMinutes: 75,
    startingPriceInr: 3900,
    consultationNote: 'Safe 24–48 hours ahead of events with zero redness.',
  },
  {
    id: 'bridal-atelier-trial',
    pillarId: 'bridal-suite',
    name: 'Bridal Hair & Makeup Trial',
    summary:
      'A relaxed 2-hour one-on-one session testing saree draping, jasmine styling, soft glow makeup, and veil pinning in daylight.',
    durationMinutes: 120,
    startingPriceInr: 9500,
    consultationNote: 'Held in our quiet private suite—feel free to bring your outfit and jewellery photos.',
    featuredInMirror: true,
  },
];
