import { GENERATED_MEDIA, type MediaAssetEntry } from './media.generated';

export type MediaId =
  | 'doors-closed'
  | 'sanctuary-sunlit'
  | 'mirror-wall'
  | 'portrait-silk-waves'
  | 'portrait-chignon'
  | 'portrait-balayage'
  | 'portrait-natural-profile'
  | 'portrait-studio-waves'
  | 'suite-dusk'
  | 'studio-courtyard';

export interface MediaMetadata {
  alt: string;
  objectPosition?: string;
}

export const mediaMeta: Record<MediaId, MediaMetadata> = {
  'doors-closed': {
    alt: 'AERA Beauty Studio closed double fluted-glass and smoked-mauve walnut salon entrance doors framed in porcelain stone',
    objectPosition: '50% 50%',
  },
  'sanctuary-sunlit': {
    alt: 'Bright sunlit AERA salon sanctuary with sculptural cream bouclé chair, warmly lit arched mirror, and olive branches',
    objectPosition: '50% 50%',
  },
  'mirror-wall': {
    alt: 'Panoramic porcelain and soft-lilac limewash salon wall with four asymmetrically shaped architectural mirrors above a travertine ledge',
    objectPosition: '50% 50%',
  },
  'portrait-silk-waves': {
    alt: 'Woman in soft natural daylight beside translucent dusty-rose and soft-lilac silk drapery showing luminous skin and wavy espresso hair',
    objectPosition: '50% 20%',
  },
  'portrait-chignon': {
    alt: 'Editorial portrait featuring a sculpted low-knot updo with wispy framing strands and muted rose finish against pale lilac limewash',
    objectPosition: '50% 18%',
  },
  'portrait-balayage': {
    alt: 'Back three-quarter portrait displaying dimensional espresso and muted champagne balayage waves beside draped dusty-rose linen',
    objectPosition: '50% 28%',
  },
  'portrait-natural-profile': {
    alt: 'Side-profile portrait in warm window daylight highlighting silky soft hair waves and calm minimalist styling',
    objectPosition: '50% 20%',
  },
  'portrait-studio-waves': {
    alt: 'Three-quarter editorial portrait in sunlit neutral tailoring displaying natural chestnut hair movement',
    objectPosition: '50% 20%',
  },
  'suite-dusk': {
    alt: 'Warm deep-mauve private bridal and evening styling alcove with softly backlit travertine mirror and cream bouclé chair',
    objectPosition: '50% 50%',
  },
  'studio-courtyard': {
    alt: 'Architectural sunlit salon hallway crafted in honed travertine, linen seating, and olive branch stoneware',
    objectPosition: '50% 50%',
  },
};

export function getMediaAsset(id: string): (MediaAssetEntry & MediaMetadata) {
  const entry = GENERATED_MEDIA[id] ?? GENERATED_MEDIA['portrait-silk-waves'];
  const meta = mediaMeta[id as MediaId] ?? {
    alt: 'AERA Beauty Studio editorial image',
    objectPosition: '50% 50%',
  };
  return {
    ...(entry as MediaAssetEntry),
    ...meta,
  };
}
