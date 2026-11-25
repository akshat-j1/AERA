import { GENERATED_MEDIA, type MediaAssetEntry } from './media.generated';

export type MediaId =
  | 'doors-closed'
  | 'sanctuary-sunlit'
  | 'studio-aisle-daylight'
  | 'hero-craft'
  | 'mirror-wall'
  | 'stage-consultation'
  | 'stage-colour'
  | 'stage-blowout'
  | 'skincare-facial'
  | 'bridal-indian'
  | 'before-hair'
  | 'look-chestnut-layers'
  | 'portrait-balayage'
  | 'portrait-chignon'
  | 'portrait-natural-profile'
  | 'portrait-studio-waves'
  | 'stylist-cut'
  | 'stylist-colour'
  | 'stylist-styling'
  | 'stylist-skin'
  | 'suite-dusk'
  | 'studio-courtyard'
  | 'booking-station';

export interface MediaMetadata {
  alt: string;
  objectPosition?: string;
}

export const mediaMeta: Record<MediaId, MediaMetadata> = {
  'doors-closed': {
    alt: 'Closed dark walnut and fluted frosted-glass double entrance doors to AERA Beauty Studio framed by warm travertine and olive planters',
    objectPosition: '50% 50%',
  },
  'sanctuary-sunlit': {
    alt: 'Spacious sunlit AERA salon aisle with arched oak mirrors, caramel bouclé styling chairs, and stylists working with clients',
    objectPosition: '50% 50%',
  },
  'studio-aisle-daylight': {
    alt: 'Airy daylight salon walkway showing styling stations, botanical jars, and a stylist consulting beside the mirrors',
    objectPosition: '50% 50%',
  },
  'hero-craft': {
    alt: 'Senior stylist gently shaping a client’s soft layered waves beside a tall sunlit linen curtain and terracotta plaster arch',
    objectPosition: '52% 28%',
  },
  'mirror-wall': {
    alt: 'Warm plastered salon wall featuring four sculpted mirrors above a honed travertine styling shelf',
    objectPosition: '50% 50%',
  },
  'stage-consultation': {
    alt: 'Hairstylist holding a tortoiseshell comb while examining a client’s natural wave pattern beside a mirror in soft daylight',
    objectPosition: '50% 24%',
  },
  'stage-colour': {
    alt: 'Colour specialist in black linen apron hand-painting warm caramel highlights with a brush and ceramic mixing bowl',
    objectPosition: '55% 24%',
  },
  'stage-blowout': {
    alt: 'Finished glossy caramel-espresso layered hair in soft movement beside a styling mirror with a stylist brushing softly in the background',
    objectPosition: '48% 26%',
  },
  'skincare-facial': {
    alt: 'Aesthetician performing a serene upward jawline facial massage on a relaxed client in soft ivory linen',
    objectPosition: '50% 42%',
  },
  'bridal-indian': {
    alt: 'Contemporary Indian bride in ivory handloom silk wearing fresh white jasmine flowers woven into a sculpted braided chignon',
    objectPosition: '50% 24%',
  },
  'before-hair': {
    alt: 'Illustrative Before photo showing dry unshaped shoulder-length hair with flat ends before salon shaping and gloss treatment',
    objectPosition: '48% 30%',
  },
  'look-chestnut-layers': {
    alt: 'Three-quarter beauty portrait displaying warm chestnut hair with soft layered movement beside natural window linen',
    objectPosition: '50% 24%',
  },
  'portrait-balayage': {
    alt: 'Back-angle view of dimensional chestnut and caramel balayage waves catching natural studio light',
    objectPosition: '50% 34%',
  },
  'portrait-chignon': {
    alt: 'Updo styling portrait with face-framing tendrils, natural glow finish, and warm neutral silk drape',
    objectPosition: '50% 20%',
  },
  'portrait-natural-profile': {
    alt: 'Profile view showing soft natural hair movement and warm skin luminosity by a sunlit window',
    objectPosition: '50% 22%',
  },
  'portrait-studio-waves': {
    alt: 'Portrait highlighting relaxed shoulder-length waves with healthy surface sheen against warm neutral walls',
    objectPosition: '50% 22%',
  },
  'stylist-cut': {
    alt: 'Senior stylist Meera Rao holding a tortoiseshell comb during a hair consultation in the studio',
    objectPosition: '58% 22%',
  },
  'stylist-colour': {
    alt: 'Colour specialist Kavya Nair hand-painting warm caramel ribbons in daylight',
    objectPosition: '54% 24%',
  },
  'stylist-styling': {
    alt: 'Bridal and finishing specialist Ananya Krishnan gently shaping soft layered waves beside the window',
    objectPosition: '56% 24%',
  },
  'stylist-skin': {
    alt: 'Skin therapist Rhea Deshmukh performing gentle facial sculpting inside the skincare treatment room',
    objectPosition: '52% 38%',
  },
  'suite-dusk': {
    alt: 'Quiet private bridal and evening suite with warm softly illuminated arched mirror and cream styling seating',
    objectPosition: '50% 50%',
  },
  'studio-courtyard': {
    alt: 'Calm honed travertine hallway with olive planters and soft natural window illumination',
    objectPosition: '50% 50%',
  },
  'booking-station': {
    alt: 'Quiet sunlit salon station ready for your appointment with warm indirect mirror light and greenery',
    objectPosition: '50% 50%',
  },
};

export function getMediaAsset(id: string): MediaAssetEntry & MediaMetadata {
  const entry = GENERATED_MEDIA[id] ?? GENERATED_MEDIA['hero-craft'];
  const meta = mediaMeta[id as MediaId] ?? {
    alt: 'AERA Beauty Studio editorial photograph',
    objectPosition: '50% 50%',
  };
  return {
    ...(entry as MediaAssetEntry),
    ...meta,
  };
}
