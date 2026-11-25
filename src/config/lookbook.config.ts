import type { PillarId } from './services.config';

export type LookbookMood = 'All' | 'Bridal Calm' | 'Mineral Colour' | 'Silk Volume' | 'Botanical Skin';

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
  beforeCaption: string;
  afterCaption: string;
  beforeNote: string;
  afterNote: string;
  serviceId: string;
}

export const lookbookMoods: LookbookMood[] = [
  'All',
  'Bridal Calm',
  'Mineral Colour',
  'Silk Volume',
  'Botanical Skin',
];

export const lookbookEntries: LookbookEntry[] = [
  {
    id: 'sculpted-low-chignon',
    indexCode: 'LOOK 01',
    title: 'Sculpted Low Chignon & Veil Skin',
    mood: 'Bridal Calm',
    pillarId: 'bridal-suite',
    mediaId: 'portrait-chignon',
    imagePosition: '50% 18%',
    summary:
      'Architectural nape knot with delicate face-framing tendrils paired with luminous hydrated skin and muted rose tint.',
    recommendedServiceId: 'bridal-atelier-trial',
    recommendedArtisanId: 'ananya-krishnan',
    durationMinutes: 120,
    startingPriceInr: 9500,
    careNote: 'Prepared with weightless botanical texture cream so pins stay comfortable for 12 hours.',
  },
  {
    id: 'espresso-champagne-silk',
    indexCode: 'LOOK 02',
    title: 'Espresso & Champagne Mineral Silk',
    mood: 'Mineral Colour',
    pillarId: 'sculptural-colour',
    mediaId: 'portrait-balayage',
    imagePosition: '50% 25%',
    summary:
      'Micro-painted muted champagne ribbons woven softly through deep warm espresso waves without harsh bleaching.',
    recommendedServiceId: 'mineral-balayage',
    recommendedArtisanId: 'kavya-nair',
    durationMinutes: 180,
    startingPriceInr: 8500,
    careNote: 'Sealed with acidic amino-bond glaze for zero brassy grow-out over 4 months.',
  },
  {
    id: 'silk-dew-waves',
    indexCode: 'LOOK 03',
    title: 'Northlight Dew & Weightless Waves',
    mood: 'Botanical Skin',
    pillarId: 'botanical-skin',
    mediaId: 'portrait-silk-waves',
    imagePosition: '50% 16%',
    summary:
      'Barrier-plumped skin glow paired with soft air-diffused length movement calibrated beside sheer dusty-rose light.',
    recommendedServiceId: 'barrier-sculpt-facial',
    recommendedArtisanId: 'rhea-deshmukh',
    durationMinutes: 90,
    startingPriceInr: 4200,
    careNote: 'Ideal duo before portraits—combines lymphatic drainage with silk steam finish.',
  },
  {
    id: 'architectural-soft-wave',
    indexCode: 'LOOK 04',
    title: 'Warm Chestnut Architectural Shape',
    mood: 'Silk Volume',
    pillarId: 'hair-craft',
    mediaId: 'portrait-studio-waves',
    imagePosition: '50% 20%',
    summary:
      'Internal dry layering sculpted to create effortless cheek-grazing bounce without heavy styling tools.',
    recommendedServiceId: 'sculptural-cut',
    recommendedArtisanId: 'meera-rao',
    durationMinutes: 75,
    startingPriceInr: 2800,
    careNote: 'Designed for graceful self-styling in Bengaluru humidity.',
  },
  {
    id: 'soft-profile-movement',
    indexCode: 'LOOK 05',
    title: 'Sunlit Chestnut & Rosemary Polish',
    mood: 'Silk Volume',
    pillarId: 'hair-craft',
    mediaId: 'portrait-natural-profile',
    imagePosition: '50% 20%',
    summary:
      'Natural shoulder-length layering paired with warm botanical oil gloss for calm, touchable fluidity.',
    recommendedServiceId: 'silk-blowout-ritual',
    recommendedArtisanId: 'meera-rao',
    durationMinutes: 60,
    startingPriceInr: 2400,
    careNote: 'Silicone-free lightweight finish that leaves hair supple rather than stiff.',
  },
];

export const transformationStudies: TransformationStudy[] = [
  {
    id: 'mineral-gloss-study',
    label: '01 · Mineral Silk Glaze',
    subtitle: 'Visual study demonstrating tonal contrast between unglazed matte cuticle and northlight amino mineral gloss.',
    mediaId: 'portrait-balayage',
    beforeCaption: 'Before · Dry Unglazed Cuticle (Demo Simulation)',
    afterCaption: 'After · Champagne-Espresso Mineral Glaze',
    beforeNote: 'Porous mid-lengths lacking light reflection and dimensional softness.',
    afterNote: 'Ammonia-free mineral tone + amino bond seal creates subtle daylight luster.',
    serviceId: 'mineral-balayage',
  },
  {
    id: 'barrier-luminosity-study',
    label: '02 · Barrier & Wave Harmony',
    subtitle: 'Visual study contrasting fatigued skin texture with calm lymphatic barrier restoration and steam-set movement.',
    mediaId: 'portrait-silk-waves',
    beforeCaption: 'Before · Fatigued Barrier & Flat Texture (Demo Simulation)',
    afterCaption: 'After · Lymphatic Dew & Soft Silk Finish',
    beforeNote: 'Dehydrated surface tone and weighed-down mid-length movement.',
    afterNote: 'Rose-quartz drainage + botanical mist finish restores soft ambient glow.',
    serviceId: 'barrier-sculpt-facial',
  },
];
