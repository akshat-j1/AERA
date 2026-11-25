import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useStudio } from '../../lib/StudioContext';
import { EnquiryForm } from './EnquiryForm';

export function EnquiryDrawer() {
  const { enquiryOpen, closeEnquiry } = useStudio();

  useEffect(() => {
    if (!enquiryOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeEnquiry();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enquiryOpen, closeEnquiry]);

  if (!enquiryOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#2D2328]/45 backdrop-blur-xs"
      onClick={closeEnquiry}
    >
      <div
        className="w-full max-w-lg h-full bg-[#F8F5F1] text-[#2D2328] border-l border-[#C8B49D]/60 overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#C8B49D]/40 pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#504348]">Consultative Request Flow</p>
            <h2 id="enquiry-drawer-title" className="font-sculpt text-2xl font-semibold mt-0.5">
              Request a <span className="font-whisper font-normal text-[#504348]">Demo Chair</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={closeEnquiry}
            aria-label="Close appointment request drawer"
            className="p-1.5 rounded-sm border border-[#C8B49D]/60 hover:bg-[#E6DDEB]/45 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <EnquiryForm />
      </div>
    </div>
  );
}
