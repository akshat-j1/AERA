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
    alt: 'Closed fluted-glass double entrance doors to AERA Beauty Studio',
    objectPosition: '50% 50%',
  },
  'sanctuary-sunlit': {
    alt: 'Sunlit AERA styling corridor with tall oak arched mirrors, warm styling chairs, and stylists working with clients',
    objectPosition: '50% 50%',
  },
  'studio-aisle-daylight': {
    alt: 'Daylight salon walkway showing tall arched mirrors and stylists at work',
    objectPosition: '50% 50%',
  },
  'hero-craft': {
    alt: 'Stylist shaping soft layered waves beside a tall sunlit linen curtain and arched wall',
    objectPosition: '52% 28%',
  },
  'mirror-wall': {
    alt: 'Calm plastered studio wall featuring four distinct architectural mirrors above a travertine console shelf',
    objectPosition: '50% 50%',
  },
  'stage-consultation': {
    alt: 'Hairstylist holding a tortoiseshell comb while studying natural wave movement beside a salon mirror',
    objectPosition: '50% 24%',
  },
  'stage-colour': {
    alt: 'Colour specialist in black linen apron hand-painting dimensional ribbons with brush in daylight',
    objectPosition: '55% 24%',
  },
  'stage-blowout': {
    alt: 'Finished dimensional caramel-espresso layered hair in soft movement beside a styling mirror',
    objectPosition: '48% 26%',
  },
  'skincare-facial': {
    alt: 'Aesthetician performing soothing lymphatic jawline massage in clean daylight',
    objectPosition: '50% 42%',
  },
  'bridal-indian': {
    alt: 'Contemporary Indian bride in ivory handloom silk wearing fresh jasmine flowers woven into a braided chignon',
    objectPosition: '50% 24%',
  },
  'before-hair': {
    alt: 'Single baseline hair profile photograph showing unlayered dry shoulder-length hair before styling',
    objectPosition: '48% 30%',
  },
  'look-chestnut-layers': {
    alt: 'Three-quarter beauty study highlighting soft chestnut waves beside natural window drape',
    objectPosition: '50% 24%',
  },
  'portrait-balayage': {
    alt: 'Back-angle view of glossy dimensional chestnut and bronze hair ribbons catching daylight',
    objectPosition: '50% 34%',
  },
  'portrait-chignon': {
    alt: 'Relaxed low chignon updo with soft face-framing tendrils and rose-berry lip finish',
    objectPosition: '50% 20%',
  },
  'portrait-natural-profile': {
    alt: 'Profile hair movement study in quiet studio daylight',
    objectPosition: '50% 22%',
  },
  'portrait-studio-waves': {
    alt: 'Shoulder-length sculpted waves with natural sheen in front of plaster wall',
    objectPosition: '50% 22%',
  },
  'stylist-cut': {
    alt: 'Senior stylist Meera Rao holding a tortoiseshell comb during consultation beside arched mirror',
    objectPosition: '58% 22%',
  },
  'stylist-colour': {
    alt: 'Colour specialist Kavya Nair hand-painting natural highlights in her apron',
    objectPosition: '54% 24%',
  },
  'stylist-styling': {
    alt: 'Bridal and finishing specialist Ananya Krishnan shaping soft layered waves beside the window',
    objectPosition: '56% 24%',
  },
  'stylist-skin': {
    alt: 'Skin therapist Rhea Deshmukh performing gentle facial sculpting inside the treatment room',
    objectPosition: '60% 44%',
  },
  'suite-dusk': {
    alt: 'Quiet private bridal suite with illuminated arched mirror and cream bouclé chair',
    objectPosition: '50% 50%',
  },
  'studio-courtyard': {
    alt: 'Honed stone studio foyer doorway with botanical greenery',
    objectPosition: '50% 50%',
  },
  'booking-station': {
    alt: 'Empty sunlit salon chair and softly backlit arched mirror awaiting your visit',
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
