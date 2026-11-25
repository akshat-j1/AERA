export interface StudioConfig {
  brand: {
    name: string;
    wordmark: string;
    fullName: string;
    tagline: string;
    subline: string;
    demoNotice: string;
  };
  locale: {
    city: string;
    neighborhood: string;
    country: string;
    currency: string;
    numberLocale: string;
    coordinatesLabel: string;
  };
  location: {
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    directionsNote: string;
    hours: Array<{ days: string; hours: string }>;
  };
  whatsapp: {
    /**
     * In demoMode (default for fictional portfolio showcase), triggers an in-app
     * WhatsApp Concierge Message Preview modal instead of dialing an unverified number.
     * Set demoMode: false and supply verifiedDigits when deploying for a real client.
     */
    demoMode: boolean;
    verifiedDigits: string;
    displayLabel: string;
  };
  seo: {
    siteUrl: string;
    defaultTitle: string;
    defaultDescription: string;
    /**
     * LocalBusiness JSON-LD remains disabled by default in fictional showcase mode
     * so non-existent physical business records are never emitted as verified listings.
     */
    publishLocalBusinessSchema: boolean;
  };
  navigation: Array<{ label: string; to: string }>;
}

export const studioConfig: StudioConfig = {
  brand: {
    name: 'AERA',
    wordmark: 'A E R A',
    fullName: 'AERA Beauty Studio',
    tagline: 'Sunlight, movement, and effortless craft.',
    subline:
      'Architectural haircuts, low-ammonia mineral colour, and calm barrier facials inside a luminous Indiranagar sanctuary.',
    demoNotice:
      'Portfolio Showcase — Fictional studio data in Bengaluru (₹ INR). Demo appointment requests preview locally and do not confirm live salon slots.',
  },
  locale: {
    city: 'Bengaluru',
    neighborhood: 'Indiranagar',
    country: 'IN',
    currency: 'INR',
    numberLocale: 'en-IN',
    coordinatesLabel: 'BLR · 12.97° N',
  },
  location: {
    addressLine1: '12th Main, HAL 2nd Stage (Showcase Concept Address)',
    addressLine2: 'Indiranagar, Bengaluru, Karnataka',
    postalCode: '560038',
    latitude: 12.9716,
    longitude: 77.6412,
    directionsNote:
      'Fictional showcase sanctuary concept set amid shaded avenue trees off 100 Feet Road, Indiranagar.',
    hours: [
      { days: 'Tuesday – Friday', hours: '10:30 AM – 8:00 PM' },
      { days: 'Saturday – Sunday', hours: '10:00 AM – 8:30 PM' },
      { days: 'Monday', hours: 'Closed for Studio Rest' },
    ],
  },
  whatsapp: {
    demoMode: true,
    verifiedDigits: '',
    displayLabel: 'Concierge Preview',
  },
  seo: {
    siteUrl: 'https://aera-beauty-studio.example',
    defaultTitle: 'AERA Beauty Studio — Bengaluru Hair, Skin & Bridal Sanctuary',
    defaultDescription:
      'AERA Beauty Studio blends architectural spatial storytelling, sculptural hair craft, mineral colour, and calm botanical skin rituals in a reusable soft-luxury showcase.',
    publishLocalBusinessSchema: false,
  },
  navigation: [
    { label: 'Rituals', to: '/services' },
    { label: 'Artisans', to: '/team' },
    { label: 'Bridal', to: '/bridal' },
    { label: 'Lookbook', to: '/gallery' },
    { label: 'Studio', to: '/about' },
  ],
};
