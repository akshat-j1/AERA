import { lazy, Suspense } from 'react';
import { StudioDialog } from '../layout/StudioDialog';
import { X } from 'lucide-react';
import { studioConfig } from '../../config/studio.config';
import { useStudio } from '../../lib/StudioContext';
const EnquiryForm = lazy(() => import('./EnquiryForm').then((module) => ({ default: module.EnquiryForm })));

export function EnquiryDrawer() {
  const { enquiryOpen, enquiryDraft, closeEnquiry } = useStudio();


  if (!enquiryOpen) return null;

  return (
    <StudioDialog
      labelledBy="enquiry-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#2A2028]/45 backdrop-blur-xs"
      onDismiss={closeEnquiry}
      dismissOnBackdrop
    >
      <div
        className="w-full max-w-lg h-full bg-[#FCFAFA] text-[#2A2028] border-l border-[#DED2DA] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#DED2DA] pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7B4A60]">
              {studioConfig.brand.name} {studioConfig.locale.neighborhood}
            </p>
            <h2 id="enquiry-drawer-title" className="font-campaign text-2xl font-bold mt-0.5">
              Book a Visit
            </h2>
          </div>
          <button
            type="button"
            onClick={closeEnquiry}
            data-dialog-initial-focus
            aria-label="Close appointment drawer"
            className="p-1.5 rounded-sm border border-[#DED2DA] hover:bg-[#E8DFED] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <Suspense fallback={<p role="status" className="text-sm">Loading appointment preview…</p>}>
          <EnquiryForm draft={enquiryDraft} />
        </Suspense>
      </div>
    </StudioDialog>
  );
}
