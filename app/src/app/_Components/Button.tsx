"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center select-none font-medium",
    "px-6 py-3 rounded-2xl",
    "shadow-sm hover:shadow-md",
    "transition-[background,box-shadow,transform] duration-150",
    "active:translate-y-px active:shadow-sm",
    "focus:outline-none"
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-button)]",
          "text-[var(--color-foreground)]",
          "hover:bg-[var(--color-button-hover)]"
        ].join(" "),
        warning: [
          "bg-[var(--color-error)]",
          "text-red-200",
          "hover:bg-[var(--color-error-hover)]"
        ].join(" "),
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-lg",
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