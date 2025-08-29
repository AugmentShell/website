"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentProps } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

import { Card } from "./Card";
import FramerTerminal from "../_Animations/FramerTerminal";
import { mixedErrors, mixedSuccess, fullSuccess } from "../_Animations/messages";
import { ChevronRight } from "lucide-react";

// If your FramerTerminal exposes the type, great; otherwise we just pass the arrays directly.
type LinesProp = ComponentProps<typeof FramerTerminal>["linesToType"];

const FAQ_ITEMS: { title: string; lines: LinesProp }[] = [
  { title: "How do we get started?", lines: mixedErrors },
  { title: "Can we really trust AI agents to accomplish tasks?", lines: mixedSuccess },
  { title: "What platforms do you currently support?", lines: fullSuccess },
];

export const MobileFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  // Track which panels have ever been opened so we mount their terminal once, then keep it.
  const [mounted, setMounted] = useState<boolean[]>(
    () => Array(FAQ_ITEMS.length).fill(false)
  );

  useEffect(() => {
    if (activeIndex === null) return;
    setMounted((prev) => {
      if (prev[activeIndex]) return prev; // already mounted; no state churn
      const next = prev.slice();
      next[activeIndex] = true;
      return next;
    });
  }, [activeIndex]);

  const TRANSITION: Transition = prefersReduced
    ? { duration: 0 }
    : { type: "spring", stiffness: 260, damping: 26 };

  return (
    <div className="flex md:hidden flex-col gap-4 w-[90%] items-center mt-5">
      <h1 className="md:mx-8">Frequently Asked Questions</h1>

      <div className="flex flex-col gap-8 w-full">
        {FAQ_ITEMS.map((item, i) => {
          const isActive = activeIndex === i;

          return (
            <div key={i} className="w-full">
              <Card
                onClick={() =>
                  setActiveIndex((prev) => (prev === i ? null : i))
                }
                className="flex justify-between items-center w-full mb-4"
                role="button"
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex((prev) => (prev === i ? null : i));
                  }
                }}
                aria-expanded={isActive}
                aria-controls={`faq-panel-${i}`}
              >
                <h2 className="w-[80%]">{item.title}</h2>
                <ChevronRight
                  className={`transition-transform ${isActive ? "rotate-90" : ""}`}
                />
              </Card>

              {/* Always-mounted panel wrapper: smooth open/close both ways without unmounting anything */}
              <motion.div
                id={`faq-panel-${i}`}
                className="grid overflow-hidden"
                animate={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                initial={false}
                transition={TRANSITION}
                aria-hidden={!isActive}
              >
                {/* Content can fade/slide while staying mounted */}
                <motion.div
                  className="min-h-0"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {/* Mount each terminal at most once, then keep it mounted (no churn) */}
                  {mounted[i] && (
                    <FramerTerminal
                      // Do NOT key this; do NOT conditionally mount/unmount on every toggle
                      className="[--panel-h:100%]"
                      linesToType={item.lines}
                      // If your FramerTerminal supports isOpen, you can pass it;
                      // otherwise it will just keep its own typing logic running.
                      // isOpen={isActive}
                    />
                  )}
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};