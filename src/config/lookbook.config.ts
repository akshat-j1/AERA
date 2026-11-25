import type { MediaId } from './media.config';
import type { PillarId } from './services.config';

export type LookbookMood = 'All' | 'Haircuts' | 'Hair Colour' | 'Skincare' | 'Bridal';

export interface LookbookEntry {
  id: string;
  indexCode: string;
  title: string;
  mood: Exclude<LookbookMood, 'All'>;
  pillarId: PillarId;
  mediaId: string;
  imagePosition?: string;
  summary: string;
  recommendedServiceId: string;
  recommendedArtisanId: string;
  durationMinutes: number;
  startingPriceInr: number;
  careNote: string;
}

export interface TransformationStudy {
  id: string;
  label: string;
  subtitle: string;
  mediaId: string;
  beforeMediaId: MediaId;
  /** Set only for a verified result with the same subject, pose, framing and light. */
  afterMediaId: MediaId | null;
  targetSwatchMediaId: string;
  targetSwatchLabel: string;
  beforeCaption: string;
  afterCaption: string;
  beforeNote: string;
  afterNote: string;
  proposedSteps: string[];
  durationLabel: string;
  recommendedSummary: string;
  serviceId: string;
}

export const lookbookMoods: LookbookMood[] = ['All', 'Haircuts', 'Hair Colour', 'Skincare', 'Bridal'];

export const lookbookEntries: LookbookEntry[] = [
  {
    id: 'jasmine-bridal-chignon',
    indexCode: '01',
    title: 'Jasmine & Silk Chignon',
    mood: 'Bridal',
    pillarId: 'bridal-suite',
    mediaId: 'bridal-indian',
    imagePosition: '50% 24%',
    summary:
      'Braided low bun woven with fresh mogra buds paired with dewy sunlit skin and soft rose-berry lip tone.',
    recommendedServiceId: 'bridal-atelier-trial',
    recommendedArtisanId: 'ananya-krishnan',
    durationMinutes: 120,
    startingPriceInr: 9500,
    careNote: 'Pinned weightlessly without stiff spray so you stay relaxed all ceremony.',
  },
  {
    id: 'espresso-caramel-balayage',
    indexCode: '02',
    title: 'Dimensional Brunette Balayage',
    mood: 'Hair Colour',
    pillarId: 'sculptural-colour',
    mediaId: 'portrait-balayage',
    imagePosition: '50% 34%',
    summary:
      'Fine hand-painted honeyed bronze ribbons melted naturally into deep brunette waves for sun-washed dimension.',
    recommendedServiceId: 'mineral-balayage',
    recommendedArtisanId: 'kavya-nair',
    durationMinutes: 180,
    startingPriceInr: 8500,
    careNote: 'Sealed with bond care so roots blend smoothly as hair grows.',
  },
  {
    id: 'lymphatic-glow-facial',
    indexCode: '03',
    title: 'Sculpted Radiance Facial',
    mood: 'Skincare',
    pillarId: 'botanical-skin',
    mediaId: 'skincare-facial',
    imagePosition: '50% 42%',
    summary:
      'Gentle jawline lymphatic sculpting and ceramide serum layering for rested, luminous bare skin.',
    recommendedServiceId: 'barrier-sculpt-facial',
    recommendedArtisanId: 'ananya-krishnan',
    durationMinutes: 90,
    startingPriceInr: 4200,
    careNote: 'Custom blended for sensitive or travel-tired skin with zero harsh peels.',
  },
  {
    id: 'warm-chestnut-layers',
    indexCode: '04',
    title: 'Layered Chestnut Cut',
    mood: 'Haircuts',
    pillarId: 'hair-craft',
    mediaId: 'look-chestnut-layers',
    imagePosition: '50% 22%',
    summary:
      'Face-framing internal layers tailored to hold effortless bounce even after a simple air dry.',
    recommendedServiceId: 'sculptural-cut',
    recommendedArtisanId: 'meera-rao',
    durationMinutes: 75,
    startingPriceInr: 2800,
    careNote: 'Shaped around your natural wave pattern for easy morning styling.',
  },
  {
    id: 'weightless-gloss-waves',
    indexCode: '05',
    title: 'Soft Caramel Blowout',
    mood: 'Haircuts',
    pillarId: 'hair-craft',
    mediaId: 'stage-blowout',
    imagePosition: '48% 26%',
    summary:
      'Polished movement and healthy shine achieved through gentle mist conditioning and round-brush finish.',
    recommendedServiceId: 'silk-blowout-ritual',
    recommendedArtisanId: 'meera-rao',
    durationMinutes: 60,
    startingPriceInr: 2400,
    careNote: 'Weightless botanical mist keeps waves touchably soft without sticky spray.',
  },
  {
    id: 'soft-evening-updo',
    indexCode: '06',
    title: 'Evening Low Updo & Glow',
    mood: 'Bridal',
    pillarId: 'bridal-suite',
    mediaId: 'portrait-chignon',
    imagePosition: '50% 20%',
    summary:
      'Relaxed low twist with soft tendrils around the cheek and luminous rose-berry glow.',
    recommendedServiceId: 'bridal-atelier-trial',
    recommendedArtisanId: 'ananya-krishnan',
    durationMinutes: 120,
    startingPriceInr: 9500,
    careNote: 'Designed for Sangeet evenings or intimate reception dinners.',
  },
];

export const transformationStudies: TransformationStudy[] = [
  {
    id: 'cut-and-gloss-study',
    label: 'Cut & Shine Gloss',
    subtitle:
      'Drag the divider or use the arrow keys to reveal the consultation plan.',
    mediaId: 'portrait-balayage',
    beforeMediaId: 'before-hair',
    afterMediaId: null,
    targetSwatchMediaId: 'portrait-balayage',
    targetSwatchLabel: 'Target Gloss Tone Reference',
    beforeCaption: 'Before · Unshaped Baseline Length',
    afterCaption: 'Planned Transformation · Soft Internal Layers & Gloss',
    beforeNote: 'Natural unlayered length with flat silhouette and dry mid-to-end texture.',
    afterNote:
      'Proposed dry perimeter balance, face-framing movement, and ammonia-free bond gloss.',
    proposedSteps: [
      'Shape soft shoulder-skimming layers in natural fall',
      'Apply cool-neutral espresso bond gloss for mirror shine',
      'Finish with diffused silk movement and zero heavy hold',
    ],
    durationLabel: '2 hrs · Precision Cut & Shine Gloss',
    recommendedSummary: 'Includes dry consultation, shaping cut, bond wash, and weightless blowout.',
    serviceId: 'sculptural-cut',
  },
  {
    id: 'balayage-colour-study',
    label: 'Hand-Painted Balayage',
    subtitle:
      'Drag the divider or use the arrow keys to reveal the consultation plan.',
    mediaId: 'portrait-balayage',
    beforeMediaId: 'before-hair',
    afterMediaId: null,
    targetSwatchMediaId: 'stage-blowout',
    targetSwatchLabel: 'Target Dimension Swatch',
    beforeCaption: 'Before · Uniform Single-Tone Base',
    afterCaption: 'Planned Transformation · Seam-Free Ribbon Placement',
    beforeNote: 'Uniform dark base without subtle dimension around the temple and ends.',
    afterNote:
      'Fine hand-painted brunette ribbons placed in natural window light for soft grow-out.',
    proposedSteps: [
      'Fine diagonal micro-veils placed below crown for effortless regrowth',
      'Low-ammonia pearl-bronze toning glaze seals porosity',
      'Bond-repair mist locks light reflection outdoors',
    ],
    durationLabel: '3 hrs · Balayage & Bond Treatment',
    recommendedSummary: 'Includes custom tone formulation, allergy patch check, and finishing blowout.',
    serviceId: 'mineral-balayage',
  },
];

export const transformationStages = [
  {
    code: '01',
    title: 'Quiet Daylight Mapping',
    description:
      'Every appointment starts beside natural window light—studying your dry hair movement, density, and face framing before making the first cut.',
    mediaId: 'stage-consultation',
  },
  {
    code: '02',
    title: 'Hand-Painted Dimension',
    description:
      'Custom ammonia-free shades are placed with gentle brushwork in true daylight so subtle highlights grow out seamlessly without harsh banding.',
    mediaId: 'stage-colour',
  },
  {
    code: '03',
    title: 'Weightless Gloss Finish',
    description:
      'Restorative botanical moisture mist and relaxed brushwork leave hair bouncy, reflective, and naturally effortless days later.',
    mediaId: 'stage-blowout',
  },
];
