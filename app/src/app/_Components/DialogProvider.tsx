"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type DialogContextType = {
  openDialog: (content: React.ReactNode) => void;
  closeDialog: () => void;
  isOpen: boolean;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used within DialogProvider");
  return ctx;
};

export const DialogProvier: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState<React.ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Ensure portals only render on the client
  useEffect(() => setMounted(true), []);

  // Body scroll lock while modal is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (isOpen) root.classList.add("overflow-hidden");
    else root.classList.remove("overflow-hidden");
    return () => root.classList.remove("overflow-hidden");
  }, [isOpen]);

  const openDialog = useCallback((node: React.ReactNode) => {
    setContent(node);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeDialog();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeDialog]);

  // The actual modal tree
  const modalTree = isOpen ? (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Backdrop (50% black) */}
      <div className="absolute inset-0 bg-black/50" onClick={closeDialog} />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-[min(80vw,42rem)] max-h-[90vh] overflow-auto
             rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] p-6 shadow-xl"
        ref={panelRef}
      >
        {content}
      </div>
    </div>
  ) : null;

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, isOpen }}>
      {children}
      {mounted && isOpen ? createPortal(modalTree, document.body) : null}
    </DialogContext.Provider>
  );
};