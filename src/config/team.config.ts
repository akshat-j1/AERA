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
    role: 'Founder & Cutting Director',
    pillarId: 'hair-craft',
    experienceYears: 11,
    mediaId: 'stylist-cut',
    imagePosition: '58% 22%',
    quote:
      'A good haircut works with how your hair naturally moves—looking effortless weeks after your visit.',
    specialties: ['Precision Dry Cuts', 'Soft Layers & Bangs', 'Natural Texture Shaping'],
    consultationTierInr: 2800,
  },
  {
    id: 'kavya-nair',
    name: 'Kavya Nair',
    role: 'Lead Colour Specialist',
    pillarId: 'sculptural-colour',
    experienceYears: 9,
    mediaId: 'stylist-colour',
    imagePosition: '54% 24%',
    quote:
      'Hair colour looks its best when it catches real daylight cleanly without feeling over-processed.',
    specialties: ['Hand-Painted Balayage', 'Caramel & Espresso Gloss', 'Root Melting'],
    consultationTierInr: 4200,
  },
  {
    id: 'ananya-krishnan',
    name: 'Ananya Krishnan',
    role: 'Bridal & Finishing Director',
    pillarId: 'bridal-suite',
    experienceYears: 10,
    mediaId: 'stylist-styling',
    imagePosition: '56% 24%',
    quote:
      'Bridal hair and soft skin care should feel light, radiant, and true to your own personality all day.',
    specialties: ['Bridal Chignons & Jasmine Pins', 'Soft Dew Makeup', 'Pre-Bridal Facial Prep'],
    consultationTierInr: 9500,
  },
];
