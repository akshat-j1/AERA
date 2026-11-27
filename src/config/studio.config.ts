export interface StudioConfig {
  brand: {
    name: string;
    wordmark: string;
    entranceSubline: string;
    heroHeadline: string;
    heroDescription: string;
    fullName: string;
    tagline: string;
    subline: string;
    footerDisclosure: string;
    submissionNotice: string;
  };
  locale: {
    city: string;
    neighborhood: string;
    country: string;
    currency: string;
    numberLocale: string;
    timeZone: string;
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
     * In demoMode (fictional showcase), opens a formatted WhatsApp message preview
     * instead of dialing unverified numbers. Set demoMode: false and supply verifiedDigits
     * when deploying for a live salon client.
     */
    demoMode: boolean;
    verifiedDigits: string;
    displayLabel: string;
  };
  seo: {
    siteUrl: string;
    defaultTitle: string;
    defaultDescription: string;
    publishLocalBusinessSchema: boolean;
    allowIndexing: boolean;
  };
  navigation: Array<{ label: string; to: string }>;
}

export const studioConfig: StudioConfig = {
  brand: {
    name: 'AERA',
    wordmark: 'A E R A',
    entranceSubline: 'Hair · Skin · Beauty',
    heroHeadline: 'Beauty, in good light.',
    heroDescription: 'Precision cuts, dimensional colour and gentle skincare in Indiranagar, Bengaluru.',
    fullName: 'AERA Beauty Studio',
    tagline: 'Contemporary hair, luminous skin, and quiet bridal craft in Indiranagar.',
    subline:
      'Precision haircuts shaped by natural daylight, ammonia-free dimensional colour, soothing facial sculpting, and unhurried salon care.',
    footerDisclosure:
      'Portfolio Concept Showcase · Fictional Bengaluru salon data (₹ INR). Submissions preview locally—no live bookings or messages are dispatched.',
    submissionNotice:
      'This site is a portfolio concept showcase—no real salon appointment is reserved or transmitted.',
  },
  locale: {
    city: 'Bengaluru',
    neighborhood: 'Indiranagar',
    country: 'IN',
    currency: 'INR',
    numberLocale: 'en-IN',
    timeZone: 'Asia/Kolkata',
  },
  location: {
    addressLine1: '12th Main, HAL 2nd Stage',
    addressLine2: 'Indiranagar, Bengaluru, Karnataka',
    postalCode: '560038',
    latitude: 12.9716,
    longitude: 77.6412,
    directionsNote: 'Just off 100 Feet Road beneath shaded rain trees in Indiranagar.',
    hours: [
      { days: 'Tuesday – Friday', hours: '10:30 AM – 8:00 PM' },
      { days: 'Saturday – Sunday', hours: '10:00 AM – 8:30 PM' },
      { days: 'Monday', hours: 'Closed' },
    ],
  },
  whatsapp: {
    demoMode: true,
    verifiedDigits: '',
    displayLabel: 'Message on WhatsApp',
  },
  seo: {
    siteUrl: import.meta.env.VITE_AERA_SITE_URL ?? '',
    defaultTitle: 'AERA Beauty Studio — Bengaluru Hair, Skin & Bridal Salon',
    defaultDescription:
      'A calm daylight beauty salon in Indiranagar, Bengaluru offering precision haircuts, ammonia-free hair colour, facials, and bridal hair & makeup.',
    publishLocalBusinessSchema: false,
    allowIndexing: false,
  },
  navigation: [
    { label: 'Services', to: '/services' },
    { label: 'Stylists', to: '/team' },
    { label: 'Bridal', to: '/bridal' },
    { label: 'Lookbook', to: '/gallery' },
    { label: 'Our Studio', to: '/about' },
  ],
};
