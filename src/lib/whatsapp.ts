import { studioConfig } from '../config/studio.config';

export interface WhatsAppEnquiryContext {
  sourceLabel: string;
  ritualName?: string;
  artisanName?: string;
  hairLength?: string;
  preferredWindow?: string;
  guestName?: string;
  notes?: string;
}

export function buildWhatsAppMessage(ctx: WhatsAppEnquiryContext): string {
  const lines: string[] = [
    `Hello ${studioConfig.brand.fullName} (${studioConfig.locale.neighborhood}, ${studioConfig.locale.city}),`,
    `I would like to request an appointment enquiry (${ctx.sourceLabel}).`,
  ];

  if (ctx.ritualName) lines.push(`• Ritual / Look: ${ctx.ritualName}`);
  if (ctx.hairLength) lines.push(`• Hair Length / Profile: ${ctx.hairLength}`);
  if (ctx.artisanName) lines.push(`• Preferred Specialist: ${ctx.artisanName}`);
  if (ctx.preferredWindow) lines.push(`• Preferred Window: ${ctx.preferredWindow}`);
  if (ctx.guestName) lines.push(`• Name: ${ctx.guestName}`);
  if (ctx.notes) lines.push(`• Notes: ${ctx.notes}`);

  lines.push('Could you kindly share upcoming availability and consultation details?');
  return lines.join('\n');
}

export function buildWhatsAppUri(ctx: WhatsAppEnquiryContext): string | null {
  const digits = studioConfig.whatsapp.verifiedDigits.replace(/\D/g, '');
  if (studioConfig.whatsapp.demoMode || !digits) {
    return null;
  }
  const encoded = encodeURIComponent(buildWhatsAppMessage(ctx));
  return `https://wa.me/${digits}?text=${encoded}`;
}
