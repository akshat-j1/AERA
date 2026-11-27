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
      className="grid place-items-center p-4! overflow-y-auto bg-[#2A2028]/45 backdrop-blur-xs"
      onDismiss={closeWhatsappPreview}
      dismissOnBackdrop
    >
      <div
        className="w-full max-w-lg rounded-sm bg-[#FCFAFA] text-[#2A2028] border border-[#DED2DA] p-6 space-y-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#DED2DA] pb-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#7B4A60]">
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
            className="p-1.5 rounded-sm border border-[#DED2DA] hover:bg-[#E8DFED] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#40343D] leading-relaxed">
          {studioConfig.whatsapp.demoMode
            ? 'This portfolio preview composes the message locally. You can review or copy it here.'
            : 'Review your pre-filled salon inquiry message below before opening WhatsApp.'}
        </p>

        <pre className="whitespace-pre-wrap wrap-anywhere font-sans text-xs p-4 rounded-sm bg-[#F5F0F3] border border-[#DED2DA] text-[#2A2028] leading-relaxed">
          {message}
        </pre>

        <p role="status" className="text-xs text-[#40343D]">
          {copyStatus === 'copied' && 'Message copied.'}
          {copyStatus === 'failed' && 'Could not copy automatically. Select and copy the preview text.'}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={copyPayload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#40343D]/35 text-xs hover:bg-[#E8DFED] cursor-pointer"
          >
            {copyStatus === 'copied' ? <Check className="w-3.5 h-3.5 text-[#7B4A60]" /> : <Copy className="w-3.5 h-3.5" />}
            {copyStatus === 'copied' ? 'Copied Message' : 'Copy Message'}
          </button>

          {liveUri ? (
            <a
              href={liveUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#40343D] text-[#FCFAFA] text-xs"
            >
              Open in WhatsApp <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-[11px] text-[#40343D]/80">
              Live <code>wa.me</code> dialing disabled in showcase mode
            </span>
          )}
        </div>
      </div>
    </StudioDialog>
  );
}
