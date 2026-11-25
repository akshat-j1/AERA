import type { PillarId } from './services.config';

export interface ArtisanProfile {
  id: string;
  name: string;
  role: string;
  pillarId: PillarId;
  experienceYears: number;
  mediaId: string;
  imagePosition?: string;
  quote: string;
  specialties: string[];
  consultationTierInr: number;
}

export const artisans: ArtisanProfile[] = [
  {
    id: 'meera-rao',
    name: 'Meera Rao',
    role: 'Creative Director & Hair Architect',
    pillarId: 'hair-craft',
    experienceYears: 11,
    mediaId: 'portrait-natural-profile',
    imagePosition: '50% 20%',
    quote:
      'A great haircut respects how your hair naturally falls at 8 AM—long after the salon mirrors are behind you.',
    specialties: ['Dry Architectural Cutting', 'Soft Fringe Geometry', 'Natural Wave Calibration'],
    consultationTierInr: 3400,
  },
  {
    id: 'kavya-nair',
    name: 'Kavya Nair',
    role: 'Master Mineral Colourist',
    pillarId: 'sculptural-colour',
    experienceYears: 9,
    mediaId: 'portrait-balayage',
    imagePosition: '50% 25%',
    quote:
      'We read colour in pure north window daylight so every espresso ribbon grows out like quiet sunlight.',
    specialties: ['Ammonia-Free Balayage', 'Champagne Espresso Glazes', 'Corrective Tonal Balance'],
    consultationTierInr: 8500,
  },
  {
    id: 'ananya-krishnan',
    name: 'Ananya Krishnan',
    role: 'Bridal & Editorial Sculpt Lead',
    pillarId: 'bridal-suite',
    experienceYears: 10,
    mediaId: 'portrait-chignon',
    imagePosition: '50% 18%',
    quote:
      'Modern Indian bridal styling should feel weightless, personal, and serene enough that you forget pins exist.',
    specialties: ['Sculpted Low Chignons', 'Veil & Floral Integration', 'Editorial Texture'],
    consultationTierInr: 9500,
  },
  {
    id: 'rhea-deshmukh',
    name: 'Rhea Deshmukh',
    role: 'Botanical Skin & Lymphatic Specialist',
    pillarId: 'botanical-skin',
    experienceYears: 8,
    mediaId: 'portrait-silk-waves',
    imagePosition: '50% 20%',
    quote:
      'Luminosity begins when inflammation slows down—calm barriers reflect daylight better than highlighter.',
    specialties: ['Rose-Quartz Lymphatic Release', 'Ceramide Skin Prep', 'Sensitive Barrier Care'],
    consultationTierInr: 3900,
  },
];
