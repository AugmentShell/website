"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export type CardProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  hoverable?: boolean;
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      children,
      hoverable = false,
      transition = { type: "tween", duration: 0.18 },
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn("rounded-2xl p-4 px-8 card shadow-sm", className)}
        initial={false}
        transition={transition}
        // only apply whileHover if hoverable is true
        whileHover={hoverable ? { scale: 1.05 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";