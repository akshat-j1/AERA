import { studioConfig } from '../config/studio.config';

export interface RouteSeoMeta {
  path: string;
  title: string;
  description: string;
  ogImage: string;
}

export const routeSeoMap: Record<string, RouteSeoMeta> = {
  '/': {
    path: '/',
    title: 'AERA Beauty Studio — Bengaluru Hair, Skin & Bridal Salon',
    description:
      'A calm daylight beauty salon in Indiranagar, Bengaluru offering precision haircuts, ammonia-free hair colour, lymphatic facials, and bridal hair & makeup.',
    ogImage: '/media/hero-craft-896.webp',
  },
  '/services': {
    path: '/services',
    title: 'Services & Pricing — AERA Beauty Studio',
    description:
      'Browse haircuts, hand-painted balayage, restorative facials, and bridal trials with transparent ₹ INR pricing by hair length.',
    ogImage: '/media/mirror-wall-960.webp',
  },
  '/team': {
    path: '/team',
    title: 'Meet Our Stylists — AERA Beauty Studio',
    description:
      'Meet the hairstylists, colour specialists, bridal artists, and skincare therapists at AERA Beauty Studio in Indiranagar.',
    ogImage: '/media/stylist-cut-750.webp',
  },
  '/bridal': {
    path: '/bridal',
    title: 'Bridal & Makeup — AERA Beauty Studio',
    description:
      'Private bridal suites, wedding-day hair & skin timelines, jasmine chignons, and unhurried morning styling in Bengaluru.',
    ogImage: '/media/bridal-indian-896.webp',
  },
  '/gallery': {
    path: '/gallery',
    title: 'Lookbook & Before / After — AERA Beauty Studio',
    description:
      'Filter finished salon looks by category, see illustrative before-and-after results, and book matching styles.',
    ogImage: '/media/stage-blowout-896.webp',
  },
  '/about': {
    path: '/about',
    title: 'Our Studio — AERA Beauty Studio',
    description:
      'Inside AERA Beauty Studio: natural daylight philosophy, hours, and salon location in Indiranagar, Bengaluru.',
    ogImage: '/media/sanctuary-sunlit-960.webp',
  },
  '/enquire': {
    path: '/enquire',
    title: 'Book an Appointment — AERA Beauty Studio',
    description:
      'Request an appointment by selecting your service, preferred stylist, and convenient time window at AERA Beauty Studio.',
    ogImage: '/media/sanctuary-sunlit-960.webp',
  },
};

export function getRouteSeo(pathname: string): RouteSeoMeta {
  return routeSeoMap[pathname] ?? routeSeoMap['/']!;
}

/**
 * Generates Schema.org HairSalon/BeautySalon JSON-LD only when
 * studioConfig.seo.publishLocalBusinessSchema is enabled with verified business data.
 */
export function buildSalonJsonLd(): Record<string, unknown> | null {
  if (!studioConfig.seo.publishLocalBusinessSchema) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': ['HairSalon', 'BeautySalon'],
    name: studioConfig.brand.fullName,
    url: studioConfig.seo.siteUrl,
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: studioConfig.location.addressLine1,
      addressLocality: studioConfig.locale.city,
      addressRegion: 'Karnataka',
      postalCode: studioConfig.location.postalCode,
      addressCountry: studioConfig.locale.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: studioConfig.location.latitude,
      longitude: studioConfig.location.longitude,
    },
  };
}
