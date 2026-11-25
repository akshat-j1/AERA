import { studioConfig } from '../config/studio.config';
import { salonServices } from '../config/services.config';

export interface RouteSeoMeta {
  path: string;
  title: string;
  description: string;
  ogImage: string;
}

export const routeSeoMap: Record<string, RouteSeoMeta> = {
  '/': {
    path: '/',
    title: 'AERA Beauty Studio — Bengaluru Hair, Skin & Bridal Sanctuary',
    description:
      'Step inside AERA Beauty Studio: an interactive soft-luxury beauty sanctuary in Bengaluru showcasing architectural cutting, mineral colour, botanical skin care, and bridal styling.',
    ogImage: '/media/portrait-silk-waves-960.webp',
  },
  '/services': {
    path: '/services',
    title: 'Rituals & Investment — AERA Beauty Studio',
    description:
      'Explore hair architecture, ammonia-free mineral balayage, rose-quartz barrier facials, and transparent ₹ INR consultation pricing.',
    ogImage: '/media/mirror-wall-960.webp',
  },
  '/team': {
    path: '/team',
    title: 'Artisans & Specialists — AERA Beauty Studio',
    description:
      'Meet AERA’s creative director, mineral colourist, bridal sculpt lead, and botanical skin specialist.',
    ogImage: '/media/portrait-natural-profile-960.webp',
  },
  '/bridal': {
    path: '/bridal',
    title: 'Bridal & Private Sanctuary — AERA Beauty Studio',
    description:
      'Bespoke bridal trials, 12-week hair and skin preparation timelines, and serene wedding-morning studio suites.',
    ogImage: '/media/portrait-chignon-960.webp',
  },
  '/gallery': {
    path: '/gallery',
    title: 'Lookbook & Transformations — AERA Beauty Studio',
    description:
      'Mood-filtered editorial beauty looks, daylight before-and-after studies, and contextual ritual dossiers.',
    ogImage: '/media/portrait-balayage-960.webp',
  },
  '/about': {
    path: '/about',
    title: 'The Studio & Ethos — AERA Beauty Studio',
    description:
      'Discover AERA’s north-daylight colour philosophy, calm botanical formulations, and Indiranagar showcase coordinates.',
    ogImage: '/media/sanctuary-sunlit-960.webp',
  },
  '/enquire': {
    path: '/enquire',
    title: 'Demo Appointment Request — AERA Beauty Studio',
    description:
      'Preview AERA’s consultative 3-step appointment request flow and WhatsApp concierge payload generator.',
    ogImage: '/media/sanctuary-sunlit-960.webp',
  },
};

export function getRouteSeo(pathname: string): RouteSeoMeta {
  return routeSeoMap[pathname] ?? routeSeoMap['/']!;
}

/**
 * Generates Schema.org HairSalon/BeautySalon JSON-LD ONLY when
 * studioConfig.seo.publishLocalBusinessSchema is explicitly enabled
 * with verified real-world business NAP details.
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
      postalCode: studioConfig.location.postalCode,
      addressCountry: studioConfig.locale.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: studioConfig.location.latitude,
      longitude: studioConfig.location.longitude,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Studio Rituals',
      itemListElement: salonServices.map((s) => ({
        '@type': 'Offer',
        priceCurrency: studioConfig.locale.currency,
        price: s.startingPriceInr,
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.summary,
        },
      })),
    },
  };
}
