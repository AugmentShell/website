"use client";

import * as React from "react";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "warning";
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
    "inline-flex w-fit items-center justify-center select-none " +
    "rounded-2xl font-medium shadow-sm hover:shadow-md " +
    "transition-[background,box-shadow,transform] duration-150 " +
    "active:translate-y-px active:shadow-sm focus:outline-none";

  // Variant styles
  const variantClasses =
    variant === "warning"
      ? "bg-[var(--color-error)] text-red-200 hover:bg-[var(--color-error-hover)]"
      : "bg-[var(--color-button)] text-[var(--color-foreground)] hover:bg-[var(--color-button-hover)]";

  // Size styles (padding + text size)
  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }[size];

  return (
    <button
      className={cn(base, variantClasses, sizeClasses, className)}
      {...props}
    />
  );
}