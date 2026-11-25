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
    role: 'Founder & Senior Hairstylist',
    pillarId: 'hair-craft',
    experienceYears: 11,
    mediaId: 'stylist-cut',
    imagePosition: '58% 22%',
    quote:
      'A good haircut works with how your hair naturally moves—looking effortless weeks after your visit.',
    specialties: ['Precision Dry Cuts', 'Soft Layers & Bangs', 'Natural Texture Styling'],
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
    role: 'Bridal Hair & Makeup Artist',
    pillarId: 'bridal-suite',
    experienceYears: 10,
    mediaId: 'stylist-styling',
    imagePosition: '56% 24%',
    quote:
      'Bridal hair and makeup should feel light, radiant, and true to your own personality all day.',
    specialties: ['Bridal Chignons & Jasmine Pins', 'Soft Dew Makeup', 'Veil & Saree Styling'],
    consultationTierInr: 9500,
  },
  {
    id: 'rhea-deshmukh',
    name: 'Rhea Deshmukh',
    role: 'Lead Skin Therapist',
    pillarId: 'botanical-skin',
    experienceYears: 8,
    mediaId: 'stylist-skin',
    imagePosition: '52% 38%',
    quote:
      'Healthy glow comes from calm hydration and gentle facial sculpting, not heavy cover-up.',
    specialties: ['Lymphatic Facial Massage', 'Sensitive Skin Recovery', 'Bridal Skin Prep'],
    consultationTierInr: 3900,
  },
];
