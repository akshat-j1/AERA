import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { Info, MessageSquare } from 'lucide-react';
import { bookingWindows, hairProfiles } from '../../config/booking.config';
import { lookbookEntries } from '../../config/lookbook.config';
import { salonServices } from '../../config/services.config';
import { studioConfig } from '../../config/studio.config';
import { bookingErrors, eligibleArtisans, initialBooking, todayAtStudio, type BookingField } from '../../lib/booking';
import { formatCurrency, formatDuration } from '../../lib/format';
import { useStudio, type EnquiryDraft } from '../../lib/StudioContext';

const steps = [
  { label: 'Service', fields: ['serviceId', 'hairLength'] },
  { label: 'Stylist & Time', fields: ['artisanId', 'preferredWindow', 'preferredDate'] },
  { label: 'Your Details', fields: ['guestName', 'contactHandle', 'notes', 'companyWebsite'] },
] as const satisfies ReadonlyArray<{ label: string; fields: readonly BookingField[] }>;

const inputClass = 'w-full p-2.5 rounded-sm border border-[#DCD2D8] bg-[#FAF8F7] text-[#2A2128] aria-invalid:border-[#844D60]';
const nextClass = 'flex-1 py-3 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs uppercase tracking-[0.16em] hover:bg-[#844D60] cursor-pointer';
const backClass = 'px-4 py-2.5 rounded-full border border-[#DCD2D8] text-xs cursor-pointer';

export function EnquiryForm({ draft }: { draft?: EnquiryDraft }) {
  const { openWhatsappPreview } = useStudio();
  const [booking, setBooking] = useState(() => initialBooking(draft));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<ReturnType<typeof bookingErrors>>({});
  const [preview, setPreview] = useState(false);
  const focusTarget = useRef<BookingField | 'preview' | null>(null);
  const region = useRef<HTMLDivElement>(null);
  const id = useId();

  const selectedService = salonServices.find((service) => service.id === booking.serviceId)!;
  const availableArtisans = eligibleArtisans(booking.serviceId);
  const selectedArtisan = availableArtisans.find((artisan) => artisan.id === booking.artisanId);
  const selectedLook = lookbookEntries.find((look) => look.id === draft?.lookId);

  useEffect(() => {
    if (!focusTarget.current) return;
    const target = document.getElementById(`${id}-${focusTarget.current}`);
    if (target && region.current?.contains(target)) target.focus();
    focusTarget.current = null;
  }, [id, errors, preview, step]);

  const update = (name: BookingField, value: string) => {
    setBooking((current) => ({
      ...current,
      [name]: value,
      ...(name === 'serviceId' && !eligibleArtisans(value).some((a) => a.id === current.artisanId)
        ? { artisanId: '' } : {}),
    }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const field = (name: BookingField) => ({
    id: `${id}-${name}`,
    value: booking[name],
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      update(name, event.target.value),
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
    className: inputClass,
  });

  const error = (name: BookingField) => errors[name] && (
    <span id={`${id}-${name}-error`} className="block text-[#844D60] text-xs" role="alert">
      {errors[name]}
    </span>
  );

  const validate = (throughStep: number) => {
    const found = bookingErrors(booking);
    for (const [index, item] of steps.entries()) {
      if (index > throughStep) break;
      const firstError = item.fields.find((name) => found[name]);
      if (!firstError) continue;

      const visibleErrors = Object.fromEntries(item.fields.map((name) => [name, found[name]]));
      focusTarget.current = firstError === 'companyWebsite' ? 'guestName' : firstError;
      setErrors(visibleErrors);
      setStep(index);
      return false;
    }
    setErrors({});
    return true;
  };

  const goTo = (target: number) => {
    if (target === step || (target > step && !validate(target - 1))) return;
    focusTarget.current = steps[target]!.fields[0];
    setStep(target);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < steps.length - 1) {
      goTo(step + 1);
    } else if (validate(step)) {
      focusTarget.current = 'preview';
      setPreview(true);
    }
  };

  return (
    <div ref={region}>
      {preview ? (
        <div className="space-y-5 p-6 rounded-sm bg-[#E7DFEB]/55 border border-[#DCD2D8]">
          <div className="space-y-1.5">
            <h3 id={`${id}-preview`} tabIndex={-1} className="font-campaign text-xl font-bold text-[#2A2128]">
              Your appointment preview
            </h3>
            <p className="text-xs text-[#493D46] leading-relaxed">{studioConfig.brand.submissionNotice}</p>
          </div>

          <div className="p-4 rounded-sm bg-[#FAF8F7] border border-[#DCD2D8] text-xs space-y-1.5">
            <p><strong>{selectedService.name}</strong></p>
            <p>Length / Focus: {booking.hairLength}</p>
            <p>Stylist: {selectedArtisan?.name ?? 'No preference'}</p>
            <p>Time preference: {booking.preferredWindow}{booking.preferredDate ? ` (${booking.preferredDate})` : ''}</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => openWhatsappPreview({
                sourceLabel: draft?.sourceLabel ?? 'Appointment Preview',
                ritualName: selectedService.name,
                artisanName: selectedArtisan?.name,
                hairLength: booking.hairLength,
                preferredWindow: booking.preferredWindow,
                preferredDate: booking.preferredDate,
                guestName: booking.guestName.trim(),
                notes: booking.notes,
              })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs hover:bg-[#844D60] cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Preview WhatsApp Message
            </button>
            <button
              type="button"
              className={backClass}
              onClick={() => {
                setBooking(initialBooking(draft));
                setErrors({});
                setStep(0);
                focusTarget.current = 'serviceId';
                setPreview(false);
              }}
            >
              Start Over
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {selectedLook && (
            <p className="px-3.5 py-2.5 rounded-sm bg-[#E7DFEB]/55 border border-[#DCD2D8] text-xs">
              Selected look: <strong>{selectedLook.title}</strong>
            </p>
          )}
          <p className="text-xs text-[#493D46]">{studioConfig.brand.submissionNotice}</p>

          <div className="grid grid-cols-3 gap-2 text-[11px]">
            {steps.map(({ label }, index) => (
              <button
                key={label}
                type="button"
                aria-current={step === index ? 'step' : undefined}
                onClick={() => goTo(index)}
                className={`py-2 px-2.5 rounded-sm border text-left transition-colors cursor-pointer ${
                  step === index
                    ? 'border-[#493D46] bg-[#493D46] text-[#FAF8F7] font-medium'
                    : 'border-[#DCD2D8] bg-[#FAF8F7] text-[#493D46]'
                }`}
              >
                {index + 1} · {label}
              </button>
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <label className="block space-y-1.5 text-xs">
                <span className="uppercase tracking-[0.14em] text-[#493D46]">Select Service</span>
                <select {...field('serviceId')}>
                  {salonServices.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} — From {formatCurrency(service.startingPriceInr)} ({formatDuration(service.durationMinutes)})
                    </option>
                  ))}
                </select>
              </label>
              {error('serviceId')}
              <label className="block space-y-1.5 text-xs">
                <span className="uppercase tracking-[0.14em] text-[#493D46]">Hair Length / Focus</span>
                <select {...field('hairLength')}>
                  {hairProfiles.map((profile) => <option key={profile}>{profile}</option>)}
                </select>
              </label>
              {error('hairLength')}
              <div className="p-3.5 rounded-sm bg-[#F2EEF1] text-xs text-[#493D46] space-y-1">
                <p className="font-medium text-[#2A2128]">{selectedService.name}</p>
                <p>{selectedService.consultationNote}</p>
              </div>
              <button type="button" onClick={() => goTo(1)} className={`w-full ${nextClass}`}>
                Continue to Stylist &amp; Time →
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <label className="block space-y-1.5 text-xs">
                <span className="uppercase tracking-[0.14em] text-[#493D46]">Preferred Stylist</span>
                <select {...field('artisanId')}>
                  <option value="">No preference</option>
                  {availableArtisans.map((artisan) => (
                    <option key={artisan.id} value={artisan.id}>{artisan.name} — {artisan.role}</option>
                  ))}
                </select>
              </label>
              {error('artisanId')}
              <label className="block space-y-1.5 text-xs">
                <span className="uppercase tracking-[0.14em] text-[#493D46]">Preferred Time Window</span>
                <select {...field('preferredWindow')}>
                  {bookingWindows.map((window) => <option key={window}>{window}</option>)}
                </select>
              </label>
              {error('preferredWindow')}
              <label className="block space-y-1.5 text-xs">
                <span className="uppercase tracking-[0.14em] text-[#493D46]">Preferred Date (Optional)</span>
                <input type="date" min={todayAtStudio()} {...field('preferredDate')} />
              </label>
              {error('preferredDate')}
              <div className="flex gap-2">
                <button type="button" onClick={() => goTo(0)} className={backClass}>← Back</button>
                <button type="button" onClick={() => goTo(2)} className={nextClass}>
                  Continue to Your Details →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <input type="hidden" {...field('companyWebsite')} />
              {errors.companyWebsite && <p role="alert" className="text-xs text-[#844D60]">Please review the form.</p>}
              <label className="block space-y-1.5 text-xs">
                <span className="uppercase tracking-[0.14em] text-[#493D46]">Full Name *</span>
                <input type="text" required autoComplete="name" placeholder="e.g., Aditi Sharma" {...field('guestName')} />
              </label>
              {error('guestName')}
              <label className="block space-y-1.5 text-xs">
                <span className="uppercase tracking-[0.14em] text-[#493D46]">Email or Phone Number *</span>
                <input type="text" required placeholder="e.g., aditi@example.com" {...field('contactHandle')} />
              </label>
              {error('contactHandle')}
              <label className="block space-y-1.5 text-xs">
                <span className="uppercase tracking-[0.14em] text-[#493D46]">Notes</span>
                <textarea rows={3} placeholder="Share anything helpful for your stylist." {...field('notes')} />
              </label>
              {error('notes')}
              <p className="flex items-start gap-2 text-xs text-[#493D46]">
                <Info aria-hidden="true" className="w-3.5 h-3.5 text-[#844D60] shrink-0 mt-0.5" />
                Use sample contact details for this portfolio preview.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button type="button" onClick={() => goTo(1)} className={backClass}>← Back</button>
                <button type="submit" className={nextClass}>Preview Appointment Request →</button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
