import { studioConfig } from '../config/studio.config';
import { PageShell } from '../components/layout/PageShell';
import { EnquiryForm } from '../components/interactive/EnquiryForm';
import { StudioPicture } from '../components/layout/StudioPicture';

export function EnquirePage() {
  return (
    <PageShell
      eyebrow="Consultative Appointment Flow"
      titlePrefix="Request a"
      titleItalic="demo chair."
      description="Experience AERA’s unhurried 3-step request journey. Submitting previews local confirmation and lets you inspect the exact WhatsApp concierge payload."
      surface="lilac"
    >
      <section className="py-14 md:py-20 bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 p-6 md:p-8 rounded-sm bg-[#F8F5F1] border border-[#C8B49D]/65 shadow-sm">
            <EnquiryForm />
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="aspect-[16/10] rounded-sm overflow-hidden border border-[#C8B49D]/55">
              <StudioPicture mediaId="sanctuary-sunlit" sizes="480px" className="w-full h-full" />
            </div>

            <div className="p-6 rounded-sm bg-[#F3EEF5] border border-[#C8B49D]/50 space-y-3 text-xs text-[#504348]">
              <h2 className="font-sculpt text-lg font-semibold text-[#2D2328]">
                How Studio Confirmation Works (For Client Deployments)
              </h2>
              <p>
                Unlike rigid automated slot calendars that misjudge hair density or colour correction history, AERA’s consultative flow gathers ritual scope and timing windows first—then lets the salon concierge confirm exact chair time personally.
              </p>
              <p className="pt-2 border-t border-[#C8B49D]/40 text-[11px]">
                <strong>Showcase Location:</strong> {studioConfig.locale.neighborhood}, {studioConfig.locale.city} ({studioConfig.locale.currency})
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
