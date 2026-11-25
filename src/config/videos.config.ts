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
  /** Complete asset provenance & verified commercial permissions */
  sourceUrl: string;
  assetId: string;
  creator: string;
  licenseName: string;
  licenseUrl: string;
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
    'Four short studies across soft hair setting, facial sculpting, and sunlit bridal prep—tap any frame to play.',
  reels: [
    {
      id: 'reel-hair-brushing',
      indexCode: '01',
      title: 'Daylight Wave Styling',
      category: 'Haircuts & Styling',
      caption: 'Gentle wave setting and serene temple framing before the mirror.',
      durationLabel: '0:06',
      videoSrc: '/media/videos/hair-brushing.mp4',
      posterSrc: '/media/videos/hair-brushing-poster.jpg',
      sourceUrl: 'https://mixkit.co/free-stock-video/bride-getting-her-makeup-and-hair-done-40592/',
      assetId: 'mixkit-40592',
      creator: 'Not listed on Mixkit clip page',
      licenseName: 'Mixkit Stock Video Free License',
      licenseUrl: 'https://mixkit.co/license/#videoFree',
      licenseNote: 'Verified commercial free license on Mixkit clip page (#40592); re-encoded locally to 540x960 fast-start MP4.',
    },
    {
      id: 'reel-scalp-wash',
      indexCode: '02',
      title: 'Sculpted Facial Therapy',
      category: 'Skincare & Facials',
      caption: 'Unhurried jawline lymphatic release in a bright quiet treatment room.',
      durationLabel: '0:06',
      videoSrc: '/media/videos/scalp-wash.mp4',
      posterSrc: '/media/videos/scalp-wash-poster.jpg',
      sourceUrl: 'https://mixkit.co/free-stock-video/woman-receiving-a-facial-treatment-at-the-spa-52141/',
      assetId: 'mixkit-52141',
      creator: 'Not listed on Mixkit clip page',
      licenseName: 'Mixkit Stock Video Free License',
      licenseUrl: 'https://mixkit.co/license/#videoFree',
      licenseNote: 'Verified commercial free license on Mixkit clip page (#52141); re-encoded locally to 540x960 fast-start MP4.',
    },
    {
      id: 'reel-mirror-makeup',
      indexCode: '03',
      title: 'Brow & Dewy Balance',
      category: 'Bridal & Makeup',
      caption: 'Delicate brow grooming and natural luminous skin prep beside window light.',
      durationLabel: '0:06',
      videoSrc: '/media/videos/mirror-makeup.mp4',
      posterSrc: '/media/videos/mirror-makeup-poster.jpg',
      sourceUrl: 'https://mixkit.co/free-stock-video/stylist-and-makeup-artist-working-on-a-bride-40583/',
      assetId: 'mixkit-40583',
      creator: 'Not listed on Mixkit clip page',
      licenseName: 'Mixkit Stock Video Free License',
      licenseUrl: 'https://mixkit.co/license/#videoFree',
      licenseNote: 'Verified commercial free license on Mixkit clip page (#40583); re-encoded locally to 540x960 fast-start MP4.',
    },
    {
      id: 'reel-bridal-brush',
      indexCode: '04',
      title: 'Chignon & Floral Finish',
      category: 'Bridal Suite',
      caption: 'Checking low chignon poise and soft veil placement in daylight.',
      durationLabel: '0:06',
      videoSrc: '/media/videos/bridal-brush.mp4',
      posterSrc: '/media/videos/bridal-brush-poster.jpg',
      sourceUrl: 'https://mixkit.co/free-stock-video/bride-admiring-her-makeup-40560/',
      assetId: 'mixkit-40560',
      creator: 'Not listed on Mixkit clip page',
      licenseName: 'Mixkit Stock Video Free License',
      licenseUrl: 'https://mixkit.co/license/#videoFree',
      licenseNote: 'Verified commercial free license on Mixkit clip page (#40560); re-encoded locally to 540x960 fast-start MP4.',
    },
  ],
};
