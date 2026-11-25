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
  serviceId: z.string().min(1, 'Please select a ritual'),
  artisanId: z.string().optional(),
  hairLength: z.string().min(1),
  preferredWindow: z.string().min(1),
  preferredDate: z.string().optional(),
  guestName: z.string().trim().min(2, 'Please enter at least 2 characters for your name'),
  contactHandle: z.string().trim().min(5, 'Please provide a demo phone or email handle'),
  notes: z.string().max(400).optional(),
  companyWebsite: z.string().max(0).optional(), // honeypot
});

const WINDOWS = [
  'Weekday Morning (10:30 – 13:30 IST)',
  'Weekday Afternoon (14:00 – 17:30 IST)',
  'Weekday Early Evening (17:30 – 20:00 IST)',
  'Weekend Atelier Slot (Sat/Sun)',
];

const HAIR_PROFILES = [
  'Short / Cropped',
  'Shoulder / Medium Length',
  'Long & Dense',
  'Skin / Bridal Consultation Only',
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
      setErrorMsg(parsed.error.issues[0]?.message ?? 'Please check the entered details.');
      return;
    }

    const demoCode = `AERA-DEMO-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(demoCode);
    onSubmitted?.();
  };

  if (submittedRef) {
    return (
      <div className="space-y-5 p-5 rounded-sm bg-[#F3EEF5] border border-[#C8B49D]/60">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#504348] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#504348]">
              Demo Request Logged Locally · {submittedRef}
            </p>
            <h3 className="font-sculpt text-xl font-semibold text-[#2D2328]">
              Thank you, {guestName}.
            </h3>
            <p className="text-xs text-[#504348] leading-relaxed">
              This is a <strong>portfolio demonstration</strong>—no real booking was transmitted to a live salon or confirmed for an actual chair slot.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-sm bg-[#F8F5F1] border border-[#C8B49D]/45 text-xs space-y-1.5">
          <p><span className="text-[#504348]/75">Ritual:</span> <strong>{selectedService.name}</strong></p>
          <p><span className="text-[#504348]/75">Profile:</span> {hairLength}</p>
          <p><span className="text-[#504348]/75">Specialist:</span> {selectedArtisan ? selectedArtisan.name : 'First Available Specialist'}</p>
          <p><span className="text-[#504348]/75">Preferred Window:</span> {preferredWindow}{preferredDate ? ` (${preferredDate})` : ''}</p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() =>
              openWhatsappPreview({
                sourceLabel: `Demo Request ${submittedRef}`,
                ritualName: selectedService.name,
                artisanName: selectedArtisan?.name,
                hairLength,
                preferredWindow,
                guestName,
                notes,
              })
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Inspect Generated WhatsApp Payload
          </button>
          <button
            type="button"
            onClick={() => {
              setSubmittedRef(null);
              setStep(1);
            }}
            className="px-4 py-2.5 rounded-sm border border-[#504348]/35 text-xs text-[#2D2328] cursor-pointer"
          >
            Test Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honest Demo Notice Banner */}
      <div className="p-3 rounded-sm bg-[#E6DDEB]/65 border border-[#C8B49D]/55 flex items-start gap-2.5 text-[11px] text-[#2D2328]">
        <Info className="w-4 h-4 text-[#504348] shrink-0 mt-0.5" />
        <p>{studioConfig.brand.demoNotice}</p>
      </div>

      {selectedLook && (
        <div className="px-3 py-2 rounded-sm bg-[#F3E6DF] border border-[#C8B49D]/50 text-xs flex justify-between items-center">
          <span>Pre-filled from Lookbook: <strong>{selectedLook.title}</strong></span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-[#504348]">{selectedLook.indexCode}</span>
        </div>
      )}

      {/* Calm Step Indicators */}
      <div className="grid grid-cols-3 gap-2 text-[11px]">
        {[
          [1, '01 · Ritual'],
          [2, '02 · Timing'],
          [3, '03 · Guest Details'],
        ].map(([num, label]) => (
          <button
            key={num}
            type="button"
            onClick={() => setStep(num as 1 | 2 | 3)}
            className={`py-2 px-2.5 rounded-sm border text-left transition-colors cursor-pointer ${
              step === num
                ? 'border-[#504348] bg-[#504348] text-[#F8F5F1]'
                : 'border-[#C8B49D]/50 bg-[#F8F5F1] text-[#504348]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Step 1: Ritual & Hair Profile */}
      {step === 1 && (
        <div className="space-y-4">
          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#504348]">Select Ritual</span>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#C8B49D]/70 bg-[#F8F5F1] text-[#2D2328]"
            >
              {salonServices.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — From {formatCurrency(s.startingPriceInr)} ({formatDuration(s.durationMinutes)})
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#504348]">Hair Length / Focus</span>
            <select
              value={hairLength}
              onChange={(e) => setHairLength(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#C8B49D]/70 bg-[#F8F5F1] text-[#2D2328]"
            >
              {HAIR_PROFILES.map((hp) => (
                <option key={hp} value={hp}>{hp}</option>
              ))}
            </select>
          </label>

          <div className="p-3 rounded-sm bg-[#F3EEF5] text-xs text-[#504348] space-y-1">
            <p className="font-medium text-[#2D2328]">{selectedService.name}</p>
            <p>{selectedService.consultationNote}</p>
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full py-2.5 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.16em] cursor-pointer"
          >
            Continue to Specialist &amp; Timing →
          </button>
        </div>
      )}

      {/* Step 2: Specialist & Time Window */}
      {step === 2 && (
        <div className="space-y-4">
          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#504348]">Preferred Specialist</span>
            <select
              value={artisanId}
              onChange={(e) => setArtisanId(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#C8B49D]/70 bg-[#F8F5F1] text-[#2D2328]"
            >
              <option value="">First Available Specialist</option>
              {artisans.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} — {a.role}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#504348]">Preferred Studio Window</span>
            <select
              value={preferredWindow}
              onChange={(e) => setPreferredWindow(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#C8B49D]/70 bg-[#F8F5F1] text-[#2D2328]"
            >
              {WINDOWS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </label>

          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#504348]">Ideal Date (Optional)</span>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#C8B49D]/70 bg-[#F8F5F1] text-[#2D2328]"
            />
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-sm border border-[#504348]/35 text-xs cursor-pointer"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex-1 py-2.5 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.16em] cursor-pointer"
            >
              Continue to Guest Details →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Guest Details & Submit */}
      {step === 3 && (
        <div className="space-y-4">
          {/* Honeypot */}
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
            <span className="uppercase tracking-[0.14em] text-[#504348]">Your Name *</span>
            <input
              type="text"
              required
              placeholder="e.g., Aditi Sharma"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#C8B49D]/70 bg-[#F8F5F1] text-[#2D2328]"
            />
          </label>

          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#504348]">Demo Contact (Email or Phone Placeholder) *</span>
            <input
              type="text"
              required
              placeholder="e.g., aditi@example.com"
              value={contactHandle}
              onChange={(e) => setContactHandle(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#C8B49D]/70 bg-[#F8F5F1] text-[#2D2328]"
            />
          </label>

          <label className="block space-y-1.5 text-xs">
            <span className="uppercase tracking-[0.14em] text-[#504348]">Hair History / Sensitivity Notes</span>
            <textarea
              rows={3}
              placeholder="Optional notes on past colour, henna, scalp sensitivity, or bridal dates."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 rounded-sm border border-[#C8B49D]/70 bg-[#F8F5F1] text-[#2D2328]"
            />
          </label>

          {errorMsg && (
            <p role="alert" className="text-xs text-[#6B2130] bg-[#D5B4B8]/30 px-3 py-2 rounded-sm">
              {errorMsg}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-sm border border-[#504348]/35 text-xs cursor-pointer"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-sm bg-[#504348] text-[#F8F5F1] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#3A2E33] cursor-pointer"
            >
              Submit Demo Appointment Request
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
