"use client";

import { useState,useEffect } from "react";
import { motion, useAnimationControls, Variants, AnimatePresence } from "framer-motion";
import TerminalTyper from "./TerminalTyper";
import { defaultMessage } from "./messages";
import type { ComponentProps } from "react";

type TyperProps = ComponentProps<typeof TerminalTyper>;
type LinesProp = TyperProps["linesToType"];

type Props = {
  className?: string;
  linesToType?: LinesProp;
  isOpen?: boolean;              // control open/close
  mountOn?: "visible" | "hidden"; // optional: if you ever want to mount on hidden end
};

const curtainVariants: Variants = {
  hidden: {
    scaleY: 0,
    transformOrigin: "top",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  visible: {
    scaleY: 1,
    transformOrigin: "top",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: {
    scaleY: 0,
    transformOrigin: "top",
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

export default function FramerTerminalVariants({
  className = "",
  linesToType = defaultMessage,
  isOpen = true,
  mountOn = "visible",
}: Props) {

  const controls = useAnimationControls();
  const [showTyper, setShowTyper] = useState(false);
  const [erase, setErase] = useState(true)

  // Drive the parent animation, then mount/unmount the typer after it completes.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Always unmount the typer before changing curtain state
      setShowTyper(false);

      if (isOpen) {
        await controls.start("visible");
        if (!cancelled && mountOn === "visible") setShowTyper(true);
      } else {
        await controls.start("hidden");
        if (!cancelled && mountOn === "hidden") setShowTyper(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, mountOn, controls]);

  return (
    <div className="flex flex-col items-center w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={isOpen ? "open" : "closed"} // helps exit when unmounting the whole thing
          className={` h-[75vh] md:h-[115vh] lg:h-[90vh] xl:h-[67vh] w-full bg-[#2a2b2a] border-8 px-0.5 rounded terminal terminal-frame-success ${className}`}
          variants={curtainVariants}
          initial="hidden"
          animate={controls}
          exit="exit"
          style={{ overflow: "hidden" }}
        >
          <div className="body-2 h-full">
            {showTyper && (
              <TerminalTyper 
              typingSpeed={2} 
              eraseSpeed={1} 
              linePause={50} 
              linesToType={linesToType}/>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}