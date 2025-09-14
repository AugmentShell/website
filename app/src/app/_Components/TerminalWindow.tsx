"use client";

import { useState } from "react";
import { red, green } from "../_Animations/messages";
import TerminalTyper from "../_Animations/TerminalTyper";
import { Button } from "./Button";
import { motion } from "framer-motion";

type TerminalWindowProps = { className?: string };

export default function TerminalWindow({ className = "" }: TerminalWindowProps) {
  const [erase, setErase] = useState(false);
  const [done, setDone] = useState(false);
  const [typeDone, setTypeDone] = useState(false);

  return (
    <div className={["flex flex-col items-center w-full", className].join(" ")}>
      {/* === Container with a hard clip mask for the backgrounds === */}
      <div className="relative h-[40vh] lg:h-[75vh] w-[80%] rounded-2xl">
        {/* MASK: clips both BG layers perfectly to the same radius */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          {/* BG FAIL */}
          <motion.div
            aria-hidden
            className="absolute inset-0 terminal-fail will-change-transform"
            initial={false}
            animate={{ opacity: done ? 0 : 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {/* BG SUCCESS */}
          <motion.div
            aria-hidden
            className="absolute inset-0 terminal will-change-transform"
            initial={false}
            animate={{ opacity: done ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>

        {/* BORDER OVERLAY: sits on top, so nothing can “leak” past it */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl border-[8px] lg:border-[16px] border-solid transition-colors duration-[2000ms] ease-in-out"
          style={{ boxSizing: "border-box" }}
          initial={false}
          animate={{
            borderColor: done ? "var(--success-border)" : "var(--fail-border)",
          }}
          transition={{ duration: .5, ease: "easeInOut" }}
        />

        {/* CONTENT LAYER: we animate this (not the border) to avoid edge reveal */}
        <motion.div
          className="relative h-full w-full rounded-2xl p-4"
          initial={false}
          animate={{
            scale: done ? 1 : 0.997, // tiny, content-only; border overlay stays fixed
            filter: done ? "none" : "grayscale(0.04)",
          }}
          transition={{ duration: .5, ease: "easeInOut" }}
        >
          <div className="body-2 h-full">
            {!done ? (
              <TerminalTyper
                typingSpeed={2}
                eraseSpeed={1}
                linePause={50}
                eraseTrigger={erase}
                setEraseDone={setDone}
                linesToType={red}
                setTypeDone={setTypeDone}
              />
            ) : (
              <TerminalTyper
                typingSpeed={10}
                eraseSpeed={15}
                linePause={700}
                eraseTrigger={erase}
                setEraseDone={setDone}
                setEraseTrigger={setErase}
                linesToType={green}
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* Button (long transition, no glow) */}
      <motion.div
        className="mt-6 hidden md:flex"
        initial={false}
        animate={{
          opacity: typeDone ? 1 : 0.6,
          filter: typeDone ? "none" : "grayscale(0.7)",
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Button
          className={done
            ? "transition-[background-color,color] !duration-[2000ms] ease-in-out"
            : "!transition-none"}
          disabled={!typeDone}
          variant={done ? "default" : "warning"}
          onClick={() => { if (!done) setErase(true); }}
        >
          <h3>ACTIVATE AUGMENTSHELL</h3>
        </Button>
      </motion.div>

      {/* Button (long transition, no glow) */}
      <motion.div
        className="mt-6 flex md:hidden"
        initial={false}
        animate={{
          opacity: typeDone ? 1 : 0.6,
          filter: typeDone ? "none" : "grayscale(0.7)",
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Button
          className={done
            ? "transition-[background-color,color] !duration-[2000ms] ease-in-out"
            : "!transition-none"}
          disabled={!typeDone}
          variant={done ? "default" : "warning"}
          size="xs"
          onClick={() => { if (!done) setErase(true); }}
        >
          <h3>ACTIVATE AUGMENTSHELL</h3>
        </Button>
      </motion.div>
    </div>
  );
}
