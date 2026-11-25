import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { CheckCircle2, Info, MessageSquare } from 'lucide-react';
import { salonServices } from '../../config/services.config';
import { artisans } from '../../config/team.config';
import { lookbookEntries } from '../../config/lookbook.config';
import { studioConfig } from '../../config/studio.config';
import { formatCurrency, formatDuration } from '../../lib/format';
import { useStudio } from '../../lib/StudioContext';

const enquirySchema = z.object({
  serviceId: z.string().min(1, 'Please choose a service'),
  artisanId: z.string().optional(),
  hairLength: z.string().min(1),
  preferredWindow: z.string().min(1),
  preferredDate: z.string().optional(),
  guestName: z.string().trim().min(2, 'Please enter your name'),
  contactHandle: z.string().trim().min(5, 'Please enter an email or phone number'),
  notes: z.string().max(400).optional(),
  companyWebsite: z.string().max(0).optional(),
});

const WINDOWS = [
  'Weekday Morning (10:30 – 13:30)',
  'Weekday Afternoon (14:00 – 17:30)',
  'Weekday Evening (17:30 – 20:00)',
  'Weekend (Sat / Sun)',
];

const HAIR_PROFILES = [
  'Short / Cropped',
  'Shoulder / Medium Length',
  'Long & Thick',
  'Skincare / Bridal Trial',
];

export function EnquiryForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const { enquiryDraft, openWhatsappPreview } = useStudio();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [serviceId, setServiceId] = useState(enquiryDraft.serviceId || salonServices[0]!.id);
  const [artisanId, setArtisanId] = useState(enquiryDraft.artisanId || '');
  const [hairLength, setHairLength] = useState(enquiryDraft.hairLength || HAIR_PROFILES[1]!);
  const [preferredWindow, setPreferredWindow] = useState(enquiryDraft.preferredWindow || WINDOWS[0]!);
  const [preferredDate, setPreferredDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [contactHandle, setContactHandle] = useState('');
  const [notes, setNotes] = useState(enquiryDraft.notes || '');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (enquiryDraft.serviceId) setServiceId(enquiryDraft.serviceId);
    if (enquiryDraft.artisanId) setArtisanId(enquiryDraft.artisanId);
    if (enquiryDraft.hairLength) setHairLength(enquiryDraft.hairLength);
    if (enquiryDraft.preferredWindow) setPreferredWindow(enquiryDraft.preferredWindow);
    if (enquiryDraft.notes) setNotes(enquiryDraft.notes);
  }, [enquiryDraft]);

  const selectedService = salonServices.find((s) => s.id === serviceId) ?? salonServices[0]!;
  const selectedArtisan = artisans.find((a) => a.id === artisanId);
  const selectedLook = lookbookEntries.find((l) => l.id === enquiryDraft.lookId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const parsed = enquirySchema.safeParse({
      serviceId,
      artisanId,
      hairLength,
      preferredWindow,
      preferredDate,
      guestName,
      contactHandle,
      notes,
      companyWebsite,
    });

    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message ?? 'Please review your entered details.');
      return;
    }

    const demoCode = `AERA-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(demoCode);
    onSubmitted?.();
  };

  if (submittedRef) {
    return (
      <div className="space-y-5 p-6 rounded-sm bg-[#E7DFEB]/55 border border-[#DCD2D8]">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#844D60] shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#844D60] font-semibold">
              Preview Logged Locally · Ref {submittedRef}
            </p>
            <h3 className="font-campaign text-xl font-bold text-[#2A2128]">
              Thank you, {guestName}.
            </h3>
            <p className="text-xs text-[#493D46] leading-relaxed">
              {studioConfig.brand.submissionNotice}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-sm bg-[#FAF8F7] border border-[#DCD2D8] text-xs space-y-1.5">
          <p>
            <span className="text-[#493D46]/80">Service:</span>{' '}
            <strong>{selectedService.name}</strong>
          </p>
          <p>
            <span className="text-[#493D46]/80">Length / Focus:</span> {hairLength}
          </p>
          <p>
            <span className="text-[#493D46]/80">Stylist:</span>{' '}
            {selectedArtisan ? selectedArtisan.name : 'Any Available Stylist'}
          </p>
          <p>
            <span className="text-[#493D46]/80">Time Preference:</span> {preferredWindow}
            {preferredDate ? ` (${preferredDate})` : ''}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() =>
              openWhatsappPreview({
                sourceLabel: `Appointment Preview ${submittedRef}`,
                ritualName: selectedService.name,
                artisanName: selectedArtisan?.name,
                hairLength,
                preferredWindow,
                guestName,
                notes,
              })
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs hover:bg-[#844D60] cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Preview WhatsApp Message
          </button>
          <button
            type="button"
            onClick={() => {
              setSubmittedRef(null);
              setStep(1);
            }}
            className="px-4 py-2.5 rounded-full border border-[#493D46]/35 text-xs text-[#2A2128] cursor-pointer"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {selectedLook && (
        <div className="px-3.5 py-2.5 rounded-sm bg-[#E7DFEB]/55 border border-[#DCD2D8] text-xs flex justify-between items-center">
          <span>
            Selected Look: <strong>{selectedLook.title}</strong>
          </span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-[#844D60] font-semibold">
            Look {selectedLook.indexCode}
          </span>
        </div>
      )}

      {/* Step Tabs */}
      <div className="grid grid-cols-3 gap-2 text-[11px]">
        {[
          [1, '1 · Service'],
          [2, '2 · Stylist & Time'],
          [3, '3 · Your Details'],
        ].map(([num, label]) => (
          <button
            key={num}
            type="button"
            onClick={() => setStep(num as 1 | 2 | 3)}
            className={`py-2 px-2.5 rounded-sm border text-left transition-colors cursor-pointer ${
              step === num
                ? 'border-[#493D46] bg-[#493D46] text-[#FAF8F7] font-medium'
                : 'border-[#DCD2D8] bg-[#FAF8F7] text-[#493D46]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Step 1: Service */}
      {step === 1 && (
        <div className="space-y-4">
          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#493D46]">Select Service</span>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#DCD2D8] bg-[#FAF8F7] text-[#2A2128]"
            >
              {salonServices.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — From {formatCurrency(s.startingPriceInr)} (
                  {formatDuration(s.durationMinutes)})
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#493D46]">Hair Length / Focus</span>
            <select
              value={hairLength}
              onChange={(e) => setHairLength(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#DCD2D8] bg-[#FAF8F7] text-[#2A2128]"
            >
              {HAIR_PROFILES.map((hp) => (
                <option key={hp} value={hp}>
                  {hp}
                </option>
              ))}
            </select>
          </label>

          <div className="p-3.5 rounded-sm bg-[#F2EEF1] text-xs text-[#493D46] space-y-1">
            <p className="font-medium text-[#2A2128]">{selectedService.name}</p>
            <p>{selectedService.consultationNote}</p>
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs uppercase tracking-[0.16em] hover:bg-[#844D60] cursor-pointer"
          >
            Continue to Stylist &amp; Time →
          </button>
        </div>
      )}

      {/* Step 2: Stylist & Time */}
      {step === 2 && (
        <div className="space-y-4">
          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#493D46]">Preferred Stylist</span>
            <select
              value={artisanId}
              onChange={(e) => setArtisanId(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#DCD2D8] bg-[#FAF8F7] text-[#2A2128]"
            >
              <option value="">First Available Stylist</option>
              {artisans.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} — {a.role}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#493D46]">Preferred Time Window</span>
            <select
              value={preferredWindow}
              onChange={(e) => setPreferredWindow(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#DCD2D8] bg-[#FAF8F7] text-[#2A2128]"
            >
              {WINDOWS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#493D46]">Preferred Date (Optional)</span>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#DCD2D8] bg-[#FAF8F7] text-[#2A2128]"
            />
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-full border border-[#DCD2D8] text-xs text-[#2A2128] cursor-pointer"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex-1 py-2.5 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs uppercase tracking-[0.16em] hover:bg-[#844D60] cursor-pointer"
            >
              Continue to Your Details →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact & Submit */}
      {step === 3 && (
        <div className="space-y-4">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            className="hidden"
          />

          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#493D46]">Full Name *</span>
            <input
              type="text"
              required
              placeholder="e.g., Aditi Sharma"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#DCD2D8] bg-[#FAF8F7] text-[#2A2128]"
            />
          </label>

          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#493D46]">Email or Phone Number *</span>
            <input
              type="text"
              required
              placeholder="e.g., aditi@example.com"
              value={contactHandle}
              onChange={(e) => setContactHandle(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#DCD2D8] bg-[#FAF8F7] text-[#2A2128]"
            />
          </label>

          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#493D46]">
              Notes (Previous Colour, Hair History, Event Dates)
            </span>
            <textarea
              rows={3}
              placeholder="Share anything helpful for your stylist ahead of the appointment."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#DCD2D8] bg-[#FAF8F7] text-[#2A2128]"
            />
          </label>

          <div className="p-3 rounded-sm bg-[#F2EEF1] border border-[#DCD2D8] flex items-start gap-2 text-[11px] text-[#493D46]">
            <Info className="w-3.5 h-3.5 text-[#844D60] shrink-0 mt-0.5" />
            <span>{studioConfig.brand.submissionNotice}</span>
          </div>

          {errorMsg && (
            <p role="alert" className="text-xs text-[#6E1F34] bg-[#D8ADB6]/35 px-3 py-2 rounded-sm">
              {errorMsg}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-full border border-[#DCD2D8] text-xs cursor-pointer"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#844D60] cursor-pointer"
            >
              Submit Appointment Request
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
