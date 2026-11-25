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
      className="fixed inset-0 z-50 flex justify-end bg-[#2C221E]/45 backdrop-blur-xs"
      onClick={closeEnquiry}
    >
      <div
        className="w-full max-w-lg h-full bg-[#FCFAF7] text-[#2C221E] border-l border-[#D4BEB0] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#D4BEB0]/60 pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#874030]">
              AERA Indiranagar
            </p>
            <h2 id="enquiry-drawer-title" className="font-editorial text-2xl font-medium mt-0.5">
              Book an Appointment
            </h2>
          </div>
          <button
            type="button"
            onClick={closeEnquiry}
            aria-label="Close appointment drawer"
            className="p-1.5 rounded-sm border border-[#D4BEB0] hover:bg-[#F4E5DA] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <EnquiryForm />
      </div>
    </div>
  );
}
