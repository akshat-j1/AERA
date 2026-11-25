export interface SalonMotionReel {
  id: string;
  indexCode: string;
  title: string;
  category: string;
  caption: string;
  durationLabel: string;
  /** Local fast-start MP4 path or self-hosted video URL */
  videoSrc: string;
  /** Crisp poster image shown before playback */
  posterSrc: string;
  /** Source and per-file license evidence must be verified before publication. */
  licenseNote: string;
  /** Optional public Instagram Reel or video permalink configured per client */
  externalReelUrl?: string;
}

export const motionReelsConfig: {
  eyebrow: string;
  heading: string;
  subcopy: string;
  instagramHandleLabel?: string;
  instagramProfileUrl?: string;
  reels: SalonMotionReel[];
} = {
  eyebrow: 'AERA in Motion',
  heading: 'Quiet daylight rituals, straight from the styling floor.',
  subcopy:
    'Short vertical studies capturing calm hair brushing, warm scalp rinses, mirror bridal prep, and gentle skin finishing—tap any frame to play.',
  reels: [
    {
      id: 'reel-hair-brushing',
      indexCode: '01',
      title: 'Silk Detangling & Finish',
      category: 'Haircuts & Styling',
      caption: 'Gentle boar-bristle smoothing after weightless layer work.',
      durationLabel: '0:06',
      videoSrc: '/media/videos/hair-brushing.mp4',
      posterSrc: '/media/videos/hair-brushing-poster.jpg',
      licenseNote: 'Reported Mixkit source. Original item and per-clip license are unverified.',
    },
    {
      id: 'reel-scalp-wash',
      indexCode: '02',
      title: 'Warm Botanical Washbasin',
      category: 'Scalp Therapy',
      caption: 'Slow lukewarm water cleanse paired with soothing neck release.',
      durationLabel: '0:06',
      videoSrc: '/media/videos/scalp-wash.mp4',
      posterSrc: '/media/videos/scalp-wash-poster.jpg',
      licenseNote: 'Reported Mixkit source. Original item and per-clip license are unverified.',
    },
    {
      id: 'reel-mirror-makeup',
      indexCode: '03',
      title: 'Mirror Prep & Dew Finish',
      category: 'Bridal & Makeup',
      caption: 'Checking soft eye balance and natural luminosity in daylight.',
      durationLabel: '0:06',
      videoSrc: '/media/videos/mirror-makeup.mp4',
      posterSrc: '/media/videos/mirror-makeup-poster.jpg',
      licenseNote: 'Reported Mixkit source. Original item and per-clip license are unverified.',
    },
    {
      id: 'reel-bridal-brush',
      indexCode: '04',
      title: 'Feather-Light Skin Set',
      category: 'Skin & Bridal',
      caption: 'Sheer veil finishing brush applied before stepping outdoors.',
      durationLabel: '0:06',
      videoSrc: '/media/videos/bridal-brush.mp4',
      posterSrc: '/media/videos/bridal-brush-poster.jpg',
      licenseNote: 'Reported Mixkit source. Original item and per-clip license are unverified.',
    },
  ],
};
