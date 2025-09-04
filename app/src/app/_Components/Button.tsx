"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

type Variant = "default" | "warning" | "link";
type Size = "xs" | "sm" | "md" | "lg";

// 👇 NEW: add scrollToId & smoothScroll props
type OwnProps = {
  variant?: Variant;
  size?: Size;
  scrollToId?: string;      // e.g., "contact-footer"
  smoothScroll?: boolean;   // default true
};

type ButtonProps = OwnProps & HTMLMotionProps<"button">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      disabled,
      // 👇 NEW defaults
      scrollToId,
      smoothScroll = true,
      onClick, // keep any caller-provided onClick
      ...props
    },
    ref
  ) => {
    const colors = React.useMemo(() => {
      const palette: Record<
        Variant,
        { bg: string; fg: string; hoverBg: string; hoverFg: string }
      > = {
        default: {
          bg: "var(--color-button, #16a34a)",
          fg: "var(--color-text, #0b0f12)",
          hoverBg: "var(--color-text, #0b0f12)",
          hoverFg: "var(--color-button, #16a34a)",
        },
        warning: {
          bg: "var(--color-error, #ef4444)",
          fg: "rgba(254, 226, 226, 1)",
          hoverBg: "rgba(254, 226, 226, 1)",
          hoverFg: "var(--color-error, #ef4444)",
        },
        link: {
          bg: "transparent",
          fg: "var(--color-text, #0b0f12)",
          hoverBg: "transparent",
          hoverFg: "var(--color-text, #0b0f12)",
        },
      };
      return palette[variant];
    }, [variant]);

    const base =
      "inline-flex w-fit items-center justify-center select-none font-medium rounded-2xl focus:outline-none";

    const sizeClasses: Record<Size, string> = {
      xs: variant === "link" ? "text-xs px-0 py-0" : "px-2 py-1 text-xs",
      sm: variant === "link" ? "text-sm px-0 py-0" : "px-3 py-1.5 text-sm",
      md: variant === "link" ? "text-base px-0 py-0" : "px-4 py-2 text-base",
      lg: variant === "link" ? "text-lg px-0 py-0" : "px-6 py-3 text-lg",
    };

    const animateStyle = React.useMemo(() => {
      return variant === "link"
        ? ({
            backgroundColor: colors.bg,
            color: colors.fg,
            textDecoration: "none",
          } as const)
        : ({
            backgroundColor: colors.bg,
            color: colors.fg,
          } as const);
    }, [variant, colors.bg, colors.fg]);

    const hoverStyle =
      variant === "link"
        ? {
            scale: 1.1,
            textDecoration: "underline" as const,
            transition: { type: "tween" as const, duration: 0.12 },
          }
        : {
            backgroundColor: colors.hoverBg,
            color: colors.hoverFg,
            scale: 1.1,
            transition: { type: "tween" as const, duration: 0.12 },
          };

    const tapStyle =
      variant === "link"
        ? { scale: 0.98, transition: { type: "tween" as const, duration: 0.08 } }
        : {
            backgroundColor: colors.hoverBg,
            color: colors.hoverFg,
            scale: 0.95,
            transition: { type: "tween" as const, duration: 0.08 },
          };

    // 👇 NEW: wrap onClick to perform scroll if scrollToId is provided
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (scrollToId) {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: smoothScroll ? "smooth" : "auto" });
        }
      }
      // call any consumer onClick after
      onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          base,
          sizeClasses[size],
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer underline-offset-4",
          className
        )}
        style={animateStyle}
        initial={false}
        animate={animateStyle}
        whileHover={!disabled ? hoverStyle : undefined}
        whileTap={!disabled ? tapStyle : undefined}
        disabled={disabled}
        onClick={handleClick}   // 👈 use the wrapped handler
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
