import { studioConfig } from '../config/studio.config';
import { PageShell } from '../components/layout/PageShell';
import { EnquiryForm } from '../components/interactive/EnquiryForm';
import { StudioPicture } from '../components/layout/StudioPicture';

export function EnquirePage() {
  return (
    <PageShell
      eyebrow={`${studioConfig.locale.neighborhood}, ${studioConfig.locale.city}`}
      titlePrefix="Book your"
      titleAccent="next visit."
      description="Choose a service, stylist preference and time window to preview an appointment request."
      surface="lilac"
    >
      <section className="py-14 md:py-20 bg-[#FCFAFA]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 p-6 md:p-8 rounded-sm bg-[#FCFAFA] border border-[#DED2DA] shadow-sm">
            <EnquiryForm />
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="aspect-[16/10] rounded-sm overflow-hidden border border-[#DED2DA]">
              <StudioPicture mediaId="booking-station" sizes="480px" className="w-full h-full" />
            </div>

            <div className="p-6 rounded-sm bg-[#F5F0F3] border border-[#DED2DA] space-y-3 text-xs text-[#40343D]">
              <h2 className="font-campaign text-lg font-bold text-[#2A2028]">
                How Bookings Work
              </h2>
              <p className="leading-relaxed">
                Hair colour, texture shaping and bridal fittings vary by hair length and history. The preview shows the information a studio would use to plan a consultation.
              </p>
              <p className="pt-2 border-t border-[#DED2DA] text-[11px] text-[#2A2028]">
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
