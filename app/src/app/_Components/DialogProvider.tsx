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
import { AnimatePresence, motion } from "framer-motion";

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

export const DialogProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
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
    // Let AnimatePresence play the exit animation; clear content after exit
    setIsOpen(false);
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

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = {
    initial: { opacity: 0, scale: 0.98, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: 8 },
  };

  // Modal tree with AnimatePresence (keeps node in DOM for exit animation)
  const modalTree = (
    <AnimatePresence
      // When the modal finishes exiting, clear the content to free memory
      onExitComplete={() => {
        if (!isOpen) setContent(null);
      }}
    >
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            key="overlay"
            className="absolute inset-0 bg-black/50"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onClick={closeDialog}
          />
          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-[min(80vw,42rem)] max-h-[90vh] overflow-auto
                       rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] p-6 shadow-xl"
            ref={panelRef}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {content}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, isOpen }}>
      {children}
      {mounted ? createPortal(modalTree, document.body) : null}
    </DialogContext.Provider>
  );
};
