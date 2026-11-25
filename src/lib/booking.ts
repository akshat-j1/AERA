import { z } from 'zod';
import { bookingWindows, hairProfiles } from '../config/booking.config';
import { salonServices } from '../config/services.config';
import { studioConfig } from '../config/studio.config';
import { artisans, type ArtisanProfile } from '../config/team.config';
import type { EnquiryDraft } from './StudioContext';

const dateFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: studioConfig.locale.timeZone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const dateSchema = z.iso.date();
const emailSchema = z.email();

export function todayAtStudio(now = new Date()) {
  const parts = dateFormat.formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

function canBook(artisan: ArtisanProfile, serviceId: string) {
  const service = salonServices.find((item) => item.id === serviceId);
  return !!service && (
    artisan.pillarId === service.pillarId || !!artisan.additionalServiceIds?.includes(service.id)
  );
}

export function eligibleArtisans(serviceId: string) {
  return artisans.filter((artisan) => canBook(artisan, serviceId));
}

function isContact(value: string) {
  if (emailSchema.safeParse(value).success) return true;
  const digits = value.replace(/\D/g, '');
  return /^(?:\+?\d|\(\d)[\d .()-]*$/.test(value) &&
    digits.length >= 7 && digits.length <= 15;
}

const bookingSchema = z.object({
  serviceId: z.string().refine(
    (value) => salonServices.some((service) => service.id === value),
    'Choose a service.'
  ),
  artisanId: z.string(),
  hairLength: z.enum(hairProfiles, { error: 'Choose a hair length or focus.' }),
  preferredWindow: z.enum(bookingWindows, { error: 'Choose a time window.' }),
  preferredDate: z.string().refine(
    (value) => !value || (dateSchema.safeParse(value).success && value >= todayAtStudio()),
    'Choose today or a later date.'
  ),
  guestName: z.string().trim().min(2, 'Enter your name.').max(100, 'Use 100 characters or fewer.'),
  contactHandle: z.string().trim().max(254, 'Use 254 characters or fewer.').refine(
    isContact,
    'Enter a valid email address or phone number.'
  ),
  notes: z.string().max(400, 'Use 400 characters or fewer.'),
  companyWebsite: z.string().max(0),
}).superRefine(({ serviceId, artisanId }, ctx) => {
  if (artisanId && !eligibleArtisans(serviceId).some((artisan) => artisan.id === artisanId)) {
    ctx.addIssue({ code: 'custom', path: ['artisanId'], message: 'Choose a stylist who offers this service.' });
  }
});

export function initialBooking(draft?: EnquiryDraft) {
  const artisan = artisans.find((item) => item.id === draft?.artisanId);
  const service = salonServices.find((item) => item.id === draft?.serviceId) ??
    (artisan && salonServices.find((item) => item.pillarId === artisan.pillarId)) ??
    salonServices[0]!;
  return {
    serviceId: service.id,
    artisanId: artisan && canBook(artisan, service.id) ? artisan.id : '',
    hairLength: draft?.hairLength ?? hairProfiles[1],
    preferredWindow: draft?.preferredWindow ?? bookingWindows[0],
    preferredDate: '',
    guestName: '',
    contactHandle: '',
    notes: draft?.notes ?? '',
    companyWebsite: '',
  };
}

export type Booking = ReturnType<typeof initialBooking>;
export type BookingField = keyof Booking;

export function bookingErrors(booking: Booking) {
  const result = bookingSchema.safeParse(booking);
  const errors: Partial<Record<BookingField, string>> = {};
  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as BookingField;
      errors[field] ??= issue.message;
    }
  }
  return errors;
}
