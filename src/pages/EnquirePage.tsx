import { studioConfig } from '../config/studio.config';
import { PageShell } from '../components/layout/PageShell';
import { EnquiryForm } from '../components/interactive/EnquiryForm';
import { StudioPicture } from '../components/layout/StudioPicture';

export function EnquirePage() {
  return (
    <PageShell
      eyebrow="Indiranagar, Bengaluru"
      titlePrefix="Book an"
      titleAccent="appointment."
      description="Pick your service, preferred stylist, and a comfortable window—our team confirms every consultation timing individually."
      surface="peach"
    >
      <section className="py-14 md:py-20 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 p-6 md:p-8 rounded-sm bg-[#FCFAF7] border border-[#D4BEB0] shadow-sm">
            <EnquiryForm />
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="aspect-[16/10] rounded-sm overflow-hidden border border-[#D4BEB0]">
              <StudioPicture mediaId="booking-station" sizes="480px" className="w-full h-full" />
            </div>

            <div className="p-6 rounded-sm bg-[#F4E5DA] border border-[#D4BEB0] space-y-3 text-xs text-[#493B36]">
              <h2 className="font-sculpt text-lg font-semibold text-[#2C221E]">
                How Bookings Work
              </h2>
              <p className="leading-relaxed">
                Hair colour and bridal appointments can vary depending on hair length and history. By collecting your preferred service and timing first, our stylist team makes sure enough relaxed time is set aside for your visit.
              </p>
              <p className="pt-2 border-t border-[#D4BEB0] text-[11px] text-[#2C221E]">
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
