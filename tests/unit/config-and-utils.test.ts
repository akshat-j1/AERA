import { describe, it, expect } from 'vitest';
import { mirrorPillars, salonServices } from '../../src/config/services.config';
import { artisans } from '../../src/config/team.config';
import { lookbookEntries, transformationStudies } from '../../src/config/lookbook.config';
import { GENERATED_MEDIA } from '../../src/config/media.generated';
import { formatCurrency, formatDuration } from '../../src/lib/format';
import { buildWhatsAppMessage, buildWhatsAppUri } from '../../src/lib/whatsapp';
import { buildSalonJsonLd } from '../../src/lib/seo';

describe('AERA configuration & helper integrity', () => {
  it('resolves every configured mediaId to a generated optimized media asset', () => {
    const usedIds = [
      ...mirrorPillars.map((m) => m.reflectionMediaId),
      ...artisans.map((a) => a.mediaId),
      ...lookbookEntries.map((l) => l.mediaId),
      ...transformationStudies.flatMap((t) => [t.mediaId, t.beforeMediaId, t.afterMediaId]),
    ];

    for (const id of usedIds) {
      expect(GENERATED_MEDIA[id], `Missing generated asset for ${id}`).toBeDefined();
      expect(GENERATED_MEDIA[id]?.avifSrcset).toContain('.avif');
      expect(GENERATED_MEDIA[id]?.webpSrcset).toContain('.webp');
    }
  });

  it('references valid service and artisan IDs in lookbook entries', () => {
    const serviceIds = new Set(salonServices.map((s) => s.id));
    const artisanIds = new Set(artisans.map((a) => a.id));

    for (const look of lookbookEntries) {
      expect(serviceIds.has(look.recommendedServiceId)).toBe(true);
      expect(artisanIds.has(look.recommendedArtisanId)).toBe(true);
    }
  });

  it('formats Indian Rupee pricing cleanly with en-IN grouping', () => {
    expect(formatCurrency(2800)).toBe('₹2,800');
    expect(formatCurrency(38000)).toBe('₹38,000');
    expect(formatDuration(90)).toBe('1 hr 30 min');
    expect(formatDuration(120)).toBe('2 hr');
  });

  it('composes WhatsApp inquiry while strictly disabling live wa.me dialing in demoMode', () => {
    const msg = buildWhatsAppMessage({
      sourceLabel: 'Lookbook',
      ritualName: 'Hand-Painted Balayage & Gloss',
      artisanName: 'Kavya Nair',
      preferredWindow: 'Weekday Morning',
    });

    expect(msg).toContain('Hand-Painted Balayage & Gloss');
    expect(msg).toContain('Kavya Nair');
    expect(buildWhatsAppUri({ sourceLabel: 'Inquiry' })).toBeNull();
  });

  it('does not emit verified LocalBusiness schema in fictional portfolio mode', () => {
    expect(buildSalonJsonLd()).toBeNull();
  });
});
