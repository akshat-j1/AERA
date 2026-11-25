export interface BridalPackage {
  id: string;
  name: string;
  subtitle: string;
  durationSummary: string;
  startingInvestmentInr?: number;
  customQuoteLabel?: string;
  includes: string[];
}

export interface BridalTimelineStep {
  phase: string;
  title: string;
  detail: string;
}

export const bridalPackages: BridalPackage[] = [
  {
    id: 'private-bride-sanctuary',
    name: 'The Private Bridal Suite',
    subtitle: 'Your full wedding-morning hair styling, soft skin makeup, saree draping, and pre-wedding trial.',
    durationSummary: 'Trial (2 hrs) + Wedding Morning (3.5 hrs)',
    startingInvestmentInr: 38000,
    includes: [
      'Private sunlight suite reserved exclusively for you in Indiranagar (or travel to your venue)',
      '2-hour hair and makeup trial with blouse neckline and veil pinning',
      'Hydrating radiance facial 48 hours before your ceremony',
      'Fresh white jasmine floral work and a wedding-day touch-up kit',
    ],
  },
  {
    id: 'bridal-party-atelier',
    name: 'Bride & Family Package',
    subtitle: 'Calm coordinated hair, makeup, and saree draping for the bride plus up to 4 family members.',
    durationSummary: 'Dedicated 2-Artist Team · Half Day',
    startingInvestmentInr: 68000,
    includes: [
      'Complete Private Bridal Suite experience plus styling for 4 family guests',
      'Relaxed wedding-morning schedule with herbal tea and zero rush',
      'Dedicated assistant for saree pleating, lehenga pinning, and dupatta draping',
    ],
  },
  {
    id: 'multi-day-destination',
    name: 'Multi-Event Bridal Curation',
    subtitle: 'Distinct, coordinated hair and makeup looks across Haldi, Mehendi, Sangeet, and Reception.',
    durationSummary: '2–3 Day Custom Schedule',
    customQuoteLabel: 'Custom Proposal',
    includes: [
      'Custom hair & skin plan matched to every outfit and lighting setting',
      'Lead hairstylist and makeup artist travelling across Bengaluru or destination venues',
      'Post-wedding hair wash and soothing skin recovery appointment back at the salon',
    ],
  },
];

export const bridalTimeline: BridalTimelineStep[] = [
  {
    phase: '12 Weeks Out',
    title: 'Hair & Colour Care',
    detail: 'Settle your cut shape, refresh rich hair gloss, and start gentle scalp hydration.',
  },
  {
    phase: '4 Weeks Out',
    title: 'Bridal Trial Session',
    detail: 'Test hairline softness, chignon balance, earrings, and saree draping together in natural daylight.',
  },
  {
    phase: '48 Hours Out',
    title: 'Pre-Wedding Facial',
    detail: 'Calming lymphatic massage and deep hydration so skin looks rested with zero redness.',
  },
  {
    phase: 'Wedding Day',
    title: 'Unhurried Ready Time',
    detail: 'Quiet music, fresh flowers pinned securely, and luminous natural finish.',
  },
];
