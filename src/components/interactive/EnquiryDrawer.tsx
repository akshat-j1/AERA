import { lazy, Suspense } from 'react';
import { StudioDialog } from '../layout/StudioDialog';
import { X } from 'lucide-react';
import { useStudio } from '../../lib/StudioContext';
const EnquiryForm = lazy(() => import('./EnquiryForm').then((module) => ({ default: module.EnquiryForm })));

export function EnquiryDrawer() {
  const { enquiryOpen, enquiryDraft, closeEnquiry } = useStudio();


  if (!enquiryOpen) return null;

  return (
    <StudioDialog
      labelledBy="enquiry-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#2A2128]/45 backdrop-blur-xs"
      onDismiss={closeEnquiry}
      dismissOnBackdrop
    >
      <div
        className="w-full max-w-lg h-full bg-[#FAF8F7] text-[#2A2128] border-l border-[#DCD2D8] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#DCD2D8] pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#844D60]">
              AERA Indiranagar
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
            className="p-1.5 rounded-sm border border-[#DCD2D8] hover:bg-[#E7DFEB] cursor-pointer"
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
