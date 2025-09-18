"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

import { Card } from "./Card";
import { ChevronRight } from "lucide-react";

const FAQ_ITEMS: { title: string; answers: string }[] = [
  {
    title: "Is this just another ChatGPT wrapper?",
    answers:
      "No. Simple wrappers are Information Agents, they give you text. AugmentShell is an Execution Agent. Our power comes from our deep Perception Layer that understands your live system, and our Safety Layer that turns AI suggestions into auditable, approved plans.",
  },
  {
    title: "How do you prevent the AI from doing something dangerous?",
    answers:
      "This is the core of our philosophy. The AI is never in control, you are. Every action, from a file change to a kubectl apply, must be presented in a clear plan that the human operator explicitly approves. We are a co-pilot, not an autopilot.",
  },
  {
    title: "What kind of environments does this work in?",
    answers:
      "AugmentShell is built for the modern DevOps landscape. Our Private Alpha will be focused on Linux environments, with deep integrations for Docker and Kubernetes. Our enterprise plan will support self-hosting in your own private cloud (AWS, GCP, Azure).",
  },
];

export const MobileFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  // Track which panels have ever been opened so we mount once then keep
  const [mounted, setMounted] = useState<boolean[]>(
    () => Array(FAQ_ITEMS.length).fill(false)
  );

  useEffect(() => {
    if (activeIndex === null) return;
    setMounted((prev) => {
      if (prev[activeIndex]) return prev;
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

      <div className="flex flex-col gap-4 w-full">
        {FAQ_ITEMS.map((item, i) => {
          const isActive = activeIndex === i;

          return (
            <Card
              key={i}
              onClick={() =>
                setActiveIndex((prev) => (prev === i ? null : i))
              }
              className="w-full cursor-pointer"
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
              {/* Header row (title + chevron) */}
              <div className="flex justify-between items-center w-full">
                <h2 className="w-[80%]">{item.title}</h2>
                <ChevronRight
                  className={`transition-transform ${isActive ? "rotate-90" : ""}`}
                  aria-hidden
                />
              </div>

              {/* Expanding area INSIDE the same Card */}
              <motion.div
                id={`faq-panel-${i}`}
                className="grid overflow-hidden"
                animate={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                initial={false}
                transition={TRANSITION}
                aria-hidden={!isActive}
              >
                <motion.div
                  className="min-h-0"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {/* Keep content mounted after first open */}
                  {mounted[i] && (
                    <div className="pt-3">
                      {item.answers}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
