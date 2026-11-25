import { getMediaAsset, type MediaId } from './media.config';

declare const __AERA_LOCAL_REEL_FILES__: readonly string[];

export interface SalonMotionReel {
  id: string;
  title: string;
  category: string;
  caption: string;
  durationLabel: string;
  filename: string;
  posterMedia: MediaId;
  sourceUrl: string;
  assetId: string;
  creator: string;
  licenseName: string;
  licenseUrl: string;
  externalReelUrl?: string;
}

const localFiles = typeof __AERA_LOCAL_REEL_FILES__ === 'undefined' ? [] : __AERA_LOCAL_REEL_FILES__;
const localRoot = '/media/local-reels/';
const license = {
  licenseName: 'Mixkit Stock Video Free License',
  licenseUrl: 'https://mixkit.co/license/modal/videoFree/',
};

export function getReelMedia(reel: SalonMotionReel) {
  const video = reel.filename + '.mp4';
  const poster = reel.filename + '-poster.jpg';
  const fallback = getMediaAsset(reel.posterMedia);
  return {
    videoSrc: localFiles.includes(video) ? localRoot + video : null,
    posterSrc: localFiles.includes(video) && localFiles.includes(poster)
      ? localRoot + poster
      : fallback.avifSrcset.split(' ')[0] || fallback.fallbackSrc,
    link: reel.externalReelUrl ?? reel.sourceUrl,
  };
}

export const motionReelsConfig = {
  eyebrow: 'AERA in Motion',
  heading: 'From the styling floor.',
  reels: [
    {
      id: 'reel-hair-brushing',
      title: 'Daylight Wave Styling',
      category: 'Haircuts & Styling',
      caption: 'Soft waves take shape during wedding prep.',
      durationLabel: '0:06',
      filename: 'hair-brushing',
      posterMedia: 'hero-craft',
      sourceUrl: 'https://mixkit.co/free-stock-video/bride-getting-her-makeup-and-hair-done-40592/',
      assetId: 'mixkit-40592',
      creator: '@rubenvelasco',
      ...license,
    },
    {
      id: 'reel-scalp-wash',
      title: 'Facial Massage',
      category: 'Skincare & Facials',
      caption: 'A close look at a facial treatment.',
      durationLabel: '0:06',
      filename: 'scalp-wash',
      posterMedia: 'skincare-facial',
      sourceUrl: 'https://mixkit.co/free-stock-video/woman-receiving-a-facial-treatment-at-the-spa-52141/',
      assetId: 'mixkit-52141',
      creator: '@mixkit',
      ...license,
    },
    {
      id: 'reel-mirror-makeup',
      title: 'Bridal Makeup Prep',
      category: 'Bridal & Makeup',
      caption: 'A makeup artist finishes the brows as the hair is set.',
      durationLabel: '0:06',
      filename: 'mirror-makeup',
      posterMedia: 'portrait-chignon',
      sourceUrl: 'https://mixkit.co/free-stock-video/stylist-and-makeup-artist-working-on-a-bride-40583/',
      assetId: 'mixkit-40583',
      creator: '@rubenvelasco',
      ...license,
    },
    {
      id: 'reel-bridal-brush',
      title: 'Chignon & Floral Finish',
      category: 'Bridal Suite',
      caption: 'A bride checks the final look in the mirror.',
      durationLabel: '0:06',
      filename: 'bridal-brush',
      posterMedia: 'bridal-indian',
      sourceUrl: 'https://mixkit.co/free-stock-video/bride-admiring-her-makeup-40560/',
      assetId: 'mixkit-40560',
      creator: '@edgarfernandez',
      ...license,
    },
  ] satisfies SalonMotionReel[],
};
