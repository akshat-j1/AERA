import React, { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';
import type { LookbookEntry } from '../config/lookbook.config';
import type { WhatsAppEnquiryContext } from './whatsapp';

export interface EnquiryDraft {
  serviceId?: string;
  artisanId?: string;
  lookId?: string;
  hairLength?: string;
  preferredWindow?: string;
  notes?: string;
  sourceLabel?: string;
}

interface StudioContextValue {
  selectedLook: LookbookEntry | null;
  openLookbook: (look: LookbookEntry) => void;
  closeLookbook: () => void;

  enquiryOpen: boolean;
  enquiryDraft: EnquiryDraft;
  openEnquiry: (draft?: EnquiryDraft) => void;
  closeEnquiry: () => void;

  whatsappPreview: WhatsAppEnquiryContext | null;
  openWhatsappPreview: (ctx: WhatsAppEnquiryContext) => void;
  closeWhatsappPreview: () => void;

  entranceActive: boolean;
  triggerEntranceReplay: () => void;
}

declare global {
  interface Window {
    aeraEntrance?: { open: (replay?: boolean) => void; close: () => void; isOpen: () => boolean };
  }
}

function subscribeEntrance(onChange: () => void) {
  window.addEventListener('aera-entrance-change', onChange);
  return () => window.removeEventListener('aera-entrance-change', onChange);
}

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [selectedLook, setSelectedLook] = useState<LookbookEntry | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryDraft, setEnquiryDraft] = useState<EnquiryDraft>({});
  const [whatsappPreview, setWhatsappPreview] = useState<WhatsAppEnquiryContext | null>(null);
  const pathname = useLocation().pathname;
  const replayRequested = useRef(false);
  const [replayRequest, setReplayRequest] = useState(0);
  const entranceActive = useSyncExternalStore(
    subscribeEntrance,
    () => window.aeraEntrance?.isOpen() ?? false,
    () => false
  );

  useEffect(() => {
    if (pathname === '/' || pathname === '/index.html') {
      window.aeraEntrance?.open(replayRequested.current);
      replayRequested.current = false;
    } else {
      window.aeraEntrance?.close();
    }
  }, [pathname, replayRequest]);

  const openLookbook = useCallback((look: LookbookEntry) => {
    setSelectedLook(look);
  }, []);

  const closeLookbook = useCallback(() => {
    setSelectedLook(null);
  }, []);

  const openEnquiry = useCallback((draft?: EnquiryDraft) => {
    setEnquiryDraft(draft ?? {});
    setEnquiryOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setEnquiryOpen(false);
  }, []);

  const openWhatsappPreview = useCallback((ctx: WhatsAppEnquiryContext) => {
    setWhatsappPreview(ctx);
  }, []);

  const closeWhatsappPreview = useCallback(() => {
    setWhatsappPreview(null);
  }, []);

  const triggerEntranceReplay = useCallback(() => {
    replayRequested.current = true;
    setReplayRequest((request) => request + 1);
  }, []);

  return (
    <StudioContext.Provider
      value={{
        selectedLook,
        openLookbook,
        closeLookbook,
        enquiryOpen,
        enquiryDraft,
        openEnquiry,
        closeEnquiry,
        whatsappPreview,
        openWhatsappPreview,
        closeWhatsappPreview,
        entranceActive,
        triggerEntranceReplay,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio(): StudioContextValue {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error('useStudio must be used within StudioProvider');
  return ctx;
}
