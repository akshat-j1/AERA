import { describe, it, expect } from 'vitest';
import { mirrorPillars, salonServices } from '../../src/config/services.config';
import { artisans } from '../../src/config/team.config';
import { lookbookEntries, transformationStages, transformationStudies } from '../../src/config/lookbook.config';
import { motionReelsConfig } from '../../src/config/videos.config';
import { GENERATED_MEDIA } from '../../src/config/media.generated';
import { formatCurrency, formatDuration } from '../../src/lib/format';
import { buildWhatsAppMessage, buildWhatsAppUri } from '../../src/lib/whatsapp';
import { buildSalonJsonLd, getRouteSeo } from '../../src/lib/seo';
import { bookingErrors, eligibleArtisans, initialBooking, todayAtStudio } from '../../src/lib/booking';
import { getRoutePath } from '../../src/lib/routePaths';

describe('AERA configuration & helper integrity', () => {
  it('resolves every configured mediaId to a generated optimized media asset', () => {
    const usedIds = [
      ...mirrorPillars.map((m) => m.reflectionMediaId),
      ...artisans.map((a) => a.mediaId),
      ...lookbookEntries.map((l) => l.mediaId),
      ...transformationStages.map((stage) => stage.mediaId),
      ...transformationStudies.flatMap((t) =>
        [t.mediaId, t.beforeMediaId, t.targetSwatchMediaId, t.afterMediaId].filter(
          (v): v is string => Boolean(v)
        )
      ),
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
      expect(eligibleArtisans(look.recommendedServiceId).map((a) => a.id)).toContain(look.recommendedArtisanId);
    }
  });

  it('exposes configured vertical salon video reels with local MP4, poster paths, and verified commercial provenance', () => {
    expect(motionReelsConfig.reels.length).toBeGreaterThanOrEqual(4);
    for (const reel of motionReelsConfig.reels) {
      expect(reel.videoSrc.endsWith('.mp4')).toBe(true);
      expect(reel.posterSrc.endsWith('.jpg') || reel.posterSrc.endsWith('.webp')).toBe(true);
      expect(reel.sourceUrl).toMatch(/^https:\/\/mixkit\.co\/free-stock-video\/.+-\d+\/$/);
      expect(reel.licenseName).toBe('Mixkit Stock Video Free License');
      expect(reel.licenseUrl).toContain('mixkit.co/license');
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
      preferredDate: '2026-12-01',
    });

    expect(msg).toContain('Hand-Painted Balayage & Gloss');
    expect(msg).toContain('Kavya Nair');
    expect(msg).toContain('Preferred Date: 2026-12-01');
    expect(buildWhatsAppUri({ sourceLabel: 'Inquiry' })).toBeNull();
  });

  it('does not emit verified LocalBusiness schema in fictional portfolio mode', () => {
    expect(buildSalonJsonLd()).toBeNull();
  });

  it('validates studio dates in the configured time zone and rejects invalid contact formats', () => {
    expect(todayAtStudio(new Date('2026-11-25T19:00:00Z'))).toBe('2026-11-26');
    const booking = { ...initialBooking(), guestName: 'Audit Visitor' };
    expect(bookingErrors({ ...booking, preferredDate: '2020-01-01', contactHandle: 'xxxxx' }))
      .toMatchObject({ preferredDate: expect.any(String), contactHandle: expect.any(String) });
    expect(bookingErrors({ ...booking, preferredDate: todayAtStudio(), contactHandle: '+91 98765 43210' })).toEqual({});
  });

  it('chooses a compatible default for a stylist and rejects a mismatched explicit service', () => {
    expect(initialBooking({ artisanId: 'kavya-nair' })).toMatchObject({
      serviceId: 'mineral-balayage',
      artisanId: 'kavya-nair',
    });
    expect(initialBooking({ serviceId: 'sculptural-cut', artisanId: 'kavya-nair' }).artisanId).toBe('');
    expect(bookingErrors({ ...initialBooking(), artisanId: 'kavya-nair' }).artisanId)
      .toBe('Choose a stylist who offers this service.');
  });

  it('normalizes static index URLs and supplies dedicated unknown-route metadata', () => {
    expect(getRoutePath('/services/index.html')).toBe('/services');
    expect(getRoutePath('/gallery/')).toBe('/gallery');
    expect(getRoutePath('/%zZ')).toBe('/404');
    expect(getRouteSeo('/shop').title).toContain('Page Not Found');
  });
});
