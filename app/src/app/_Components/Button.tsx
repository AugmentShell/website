"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

const buttonVariants = cva(
  [
    // content-sized button
    "inline-flex w-fit items-center justify-center select-none",
    // look & feel
    "rounded-2xl px-4 py-4 font-medium",
    "shadow-sm hover:shadow-md",
    "transition-[background,box-shadow,transform] duration-150",
    "active:translate-y-px active:shadow-sm",
    "focus:outline-none", // no ring
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-button)]",
          "text-[var(--color-foreground)]",
          "hover:bg-[var(--color-button-hover)]",
        ].join(" "),
        warning: [
          "bg-[var(--color-error)]",
          "text-red-200",
          "hover:bg-[var(--color-error-hover)]",
        ].join(" "),
      },
      // size controls ONLY typography; no fixed heights
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };