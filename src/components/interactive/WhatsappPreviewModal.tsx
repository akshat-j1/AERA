import { useEffect, useState } from 'react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { useStudio } from '../../lib/StudioContext';
import { buildWhatsAppMessage, buildWhatsAppUri } from '../../lib/whatsapp';
import { studioConfig } from '../../config/studio.config';

export function WhatsappPreviewModal() {
  const { whatsappPreview, closeWhatsappPreview } = useStudio();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!whatsappPreview) return;
    setCopied(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWhatsappPreview();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [whatsappPreview, closeWhatsappPreview]);

  if (!whatsappPreview) return null;

  const message = buildWhatsAppMessage(whatsappPreview);
  const liveUri = buildWhatsAppUri(whatsappPreview);

  const copyPayload = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may fail in non-HTTPS contexts
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C221E]/45 backdrop-blur-xs"
      onClick={closeWhatsappPreview}
    >
      <div
        className="w-full max-w-lg rounded-sm bg-[#FCFAF7] text-[#2C221E] border border-[#D4BEB0] p-6 space-y-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#D4BEB0]/60 pb-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#874030]">
              WhatsApp Integration
            </p>
            <h2 id="wa-modal-title" className="font-editorial text-xl font-medium mt-0.5">
              Pre-Filled Salon Message
            </h2>
          </div>
          <button
            type="button"
            onClick={closeWhatsappPreview}
            aria-label="Close WhatsApp message preview"
            className="p-1.5 rounded-sm border border-[#D4BEB0] hover:bg-[#F4E5DA] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#493B36] leading-relaxed">
          {studioConfig.whatsapp.demoMode
            ? 'In this portfolio showcase, live WhatsApp dialing is paused because no salon phone number is connected. Here is the formatted message sent when configured for a live salon client:'
            : 'Review your pre-filled salon inquiry message below before opening WhatsApp.'}
        </p>

        <pre className="whitespace-pre-wrap font-sans text-xs p-4 rounded-sm bg-[#F4E5DA]/65 border border-[#D4BEB0] text-[#2C221E] leading-relaxed">
          {message}
        </pre>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={copyPayload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-[#493B36]/35 text-xs hover:bg-[#F4E5DA] cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#874030]" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Message' : 'Copy Message'}
          </button>

          {liveUri ? (
            <a
              href={liveUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#493B36] text-[#FCFAF7] text-xs"
            >
              Open in WhatsApp <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-[11px] text-[#493B36]/80">
              Live <code>wa.me</code> dialing disabled in showcase mode
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
