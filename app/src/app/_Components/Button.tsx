"use client";

import * as React from "react";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "warning" | "link";
  size?: "xs" | "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  // Base shared styles
  const base =
    "inline-flex w-fit items-center justify-center select-none font-medium " +
    "transition-colors transition-transform duration-150 " +
    "focus:outline-none rounded-2xl";

  // Variant styles
  const variantClasses =
    variant === "warning"
      ? [
          // Normal
          "bg-[var(--color-error)] text-red-200",
          // Hover invert
          "hover:bg-red-200 hover:text-[var(--color-error)]",
          // Press feedback
          "active:translate-y-px shadow-sm hover:shadow-md",
        ].join(" ")
      : variant === "link"
      ? [
          "text-[var(--color-text)] underline-offset-4 underline md:no-underline md:hover:underline",
          // No padding/card background for link style
          "bg-transparent rounded-none shadow-none",
        ].join(" ")
      : [
          // Default green
          "bg-[var(--color-button)] text-[var(--color-foreground)]",
          // Hover invert
          "hover:bg-[var(--color-text)] hover:text-[var(--color-button)]",
          // Press feedback
          "active:translate-y-px shadow-sm hover:shadow-md",
        ].join(" ");

  // Size styles
  const sizeClasses = {
    xs: variant === "link" ? "text-xs px-0 py-0" : "px-2 py-1 text-xs",
    sm: variant === "link" ? "text-sm px-0 py-0" : "px-3 py-1.5 text-sm",
    md: variant === "link" ? "text-base px-0 py-0" : "px-4 py-2 text-base",
    lg: variant === "link" ? "text-lg px-0 py-0" : "px-6 py-3 text-lg",
  }[size];

  return (
    <button
      className={cn(base, variantClasses, sizeClasses, className)}
      {...props}
    />
  );
}