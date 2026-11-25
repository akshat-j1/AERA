import { StudioDialog } from '../layout/StudioDialog';
import { useEffect, useRef, useState } from 'react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { useStudio } from '../../lib/StudioContext';
import { buildWhatsAppMessage, buildWhatsAppUri } from '../../lib/whatsapp';
import { studioConfig } from '../../config/studio.config';

export function WhatsappPreviewModal() {
  const { whatsappPreview, closeWhatsappPreview } = useStudio();
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copyTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);
  useEffect(() => {
    window.clearTimeout(copyTimer.current);
    setCopyStatus('idle');
  }, [whatsappPreview]);


  if (!whatsappPreview) return null;

  const message = buildWhatsAppMessage(whatsappPreview);
  const liveUri = buildWhatsAppUri(whatsappPreview);

  const copyPayload = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus('copied');
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      // Clipboard API may fail in non-HTTPS contexts
    }
  };

  return (
    <StudioDialog
      labelledBy="wa-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A2128]/45 backdrop-blur-xs"
      onDismiss={closeWhatsappPreview}
      dismissOnBackdrop
    >
      <div
        className="w-full max-w-lg rounded-sm bg-[#FAF8F7] text-[#2A2128] border border-[#DCD2D8] p-6 space-y-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#DCD2D8] pb-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#844D60]">
              WhatsApp Integration
            </p>
            <h2 id="wa-modal-title" className="font-campaign text-xl font-bold mt-0.5">
              Pre-Filled Salon Message
            </h2>
          </div>
          <button
            type="button"
            onClick={closeWhatsappPreview}
            data-dialog-initial-focus
            aria-label="Close WhatsApp message preview"
            className="p-1.5 rounded-sm border border-[#DCD2D8] hover:bg-[#E7DFEB] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#493D46] leading-relaxed">
          {studioConfig.whatsapp.demoMode
            ? 'In this portfolio showcase, live WhatsApp dialing is paused because no salon phone number is connected. Here is the formatted message sent when configured for a live salon client:'
            : 'Review your pre-filled salon inquiry message below before opening WhatsApp.'}
        </p>

        <pre className="whitespace-pre-wrap font-sans text-xs p-4 rounded-sm bg-[#F2EEF1] border border-[#DCD2D8] text-[#2A2128] leading-relaxed">
          {message}
        </pre>

        <p role="status" className="text-xs text-[#493D46]">
          {copyStatus === 'copied' && 'Message copied.'}
          {copyStatus === 'failed' && 'Could not copy automatically. Select and copy the preview text.'}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={copyPayload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#493D46]/35 text-xs hover:bg-[#E7DFEB] cursor-pointer"
          >
            {copyStatus === 'copied' ? <Check className="w-3.5 h-3.5 text-[#844D60]" /> : <Copy className="w-3.5 h-3.5" />}
            {copyStatus === 'copied' ? 'Copied Message' : 'Copy Message'}
          </button>

          {liveUri ? (
            <a
              href={liveUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#493D46] text-[#FAF8F7] text-xs"
            >
              Open in WhatsApp <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-[11px] text-[#493D46]/80">
              Live <code>wa.me</code> dialing disabled in showcase mode
            </span>
          )}
        </div>
      </div>
    </StudioDialog>
  );
}
