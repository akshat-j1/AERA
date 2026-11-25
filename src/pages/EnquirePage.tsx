import { studioConfig } from '../config/studio.config';
import { PageShell } from '../components/layout/PageShell';
import { EnquiryForm } from '../components/interactive/EnquiryForm';
import { StudioPicture } from '../components/layout/StudioPicture';

export function EnquirePage() {
  return (
    <PageShell
      eyebrow="Indiranagar, Bengaluru"
      titlePrefix="Book your"
      titleAccent="next visit."
      description="Choose your service, stylist preference, and ideal window—we match enough quiet chair time so nothing feels rushed."
      surface="lilac"
    >
      <section className="py-14 md:py-20 bg-[#FAF8F7]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 p-6 md:p-8 rounded-sm bg-[#FAF8F7] border border-[#DCD2D8] shadow-sm">
            <EnquiryForm />
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="aspect-[16/10] rounded-sm overflow-hidden border border-[#DCD2D8]">
              <StudioPicture mediaId="booking-station" sizes="480px" className="w-full h-full" />
            </div>

            <div className="p-6 rounded-sm bg-[#F2EEF1] border border-[#DCD2D8] space-y-3 text-xs text-[#493D46]">
              <h2 className="font-campaign text-lg font-bold text-[#2A2128]">
                How Bookings Work
              </h2>
              <p className="leading-relaxed">
                Hair colour, texture shaping, and bridal fittings vary with length and history. Taking your preferred service first allows our reception team to reserve dedicated consultation time.
              </p>
              <p className="pt-2 border-t border-[#DCD2D8] text-[11px] text-[#2A2128]">
                <strong>Studio Location:</strong> {studioConfig.locale.neighborhood},{' '}
                {studioConfig.locale.city} ({studioConfig.locale.currency})
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
