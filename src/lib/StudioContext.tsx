import React, { createContext, useCallback, useContext, useState } from 'react';
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
  updateEnquiryDraft: (patch: Partial<EnquiryDraft>) => void;

  whatsappPreview: WhatsAppEnquiryContext | null;
  openWhatsappPreview: (ctx: WhatsAppEnquiryContext) => void;
  closeWhatsappPreview: () => void;

  entranceReplayKey: number;
  entranceActive: boolean;
  setEntranceActive: (active: boolean) => void;
  triggerEntranceReplay: () => void;
}

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [selectedLook, setSelectedLook] = useState<LookbookEntry | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryDraft, setEnquiryDraft] = useState<EnquiryDraft>({});
  const [whatsappPreview, setWhatsappPreview] = useState<WhatsAppEnquiryContext | null>(null);
  const [entranceReplayKey, setEntranceReplayKey] = useState(0);
  const [entranceActive, setEntranceActive] = useState(false);

  const openLookbook = useCallback((look: LookbookEntry) => {
    setSelectedLook(look);
  }, []);

  const closeLookbook = useCallback(() => {
    setSelectedLook(null);
  }, []);

  const openEnquiry = useCallback((draft?: EnquiryDraft) => {
    if (draft) {
      setEnquiryDraft((prev) => ({ ...prev, ...draft }));
    }
    setSelectedLook(null);
    setEnquiryOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setEnquiryOpen(false);
  }, []);

  const updateEnquiryDraft = useCallback((patch: Partial<EnquiryDraft>) => {
    setEnquiryDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const openWhatsappPreview = useCallback((ctx: WhatsAppEnquiryContext) => {
    setWhatsappPreview(ctx);
  }, []);

  const closeWhatsappPreview = useCallback(() => {
    setWhatsappPreview(null);
  }, []);

  const triggerEntranceReplay = useCallback(() => {
    try {
      sessionStorage.removeItem('aera_entrance_seen');
    } catch {
      // Ignore storage access errors
    }
    setEntranceActive(true);
    setEntranceReplayKey((k) => k + 1);
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
        updateEnquiryDraft,
        whatsappPreview,
        openWhatsappPreview,
        closeWhatsappPreview,
        entranceReplayKey,
        entranceActive,
        setEntranceActive,
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
