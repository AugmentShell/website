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
    "transition-[background,box-shadow,transform,color,text-decoration] duration-150 " +
    "focus:outline-none";

  // Variant styles
  const variantClasses =
    variant === "warning"
      ? "rounded-2xl shadow-sm hover:shadow-md bg-[var(--color-error)] text-red-200 hover:bg-[var(--color-error-hover)] active:translate-y-px active:shadow-sm"
      : variant === "link"
      ? "text-[var(--color-button-hover)] underline-offset-4 underline hover:text-[var(--color-button)]"
      : // default (green card)
        "rounded-2xl shadow-sm hover:shadow-md bg-[var(--color-button)] text-[var(--color-foreground)] hover:bg-[var(--color-button-hover)] active:translate-y-px active:shadow-sm";

  // Size styles (padding + text size)
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