import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

// 02 §6.1. Warna ikut token; di pita hitam (.on-inverse) primer otomatis putih.
const BASE =
  "inline-flex items-center justify-center gap-2.5 rounded-control border font-medium -tracking-[0.01em] whitespace-nowrap transition-colors duration-100 ease-linear disabled:cursor-not-allowed disabled:opacity-55";

const SIZES = {
  default: "min-h-11 px-[18px] text-sm max-[420px]:px-[14px]",
  sm: "min-h-8 px-2.5 font-mono text-xs tracking-[0.02em]",
} as const;

const VARIANTS = {
  primary: "border-primary bg-primary text-primary-text hover:opacity-90 transition-opacity",
  secondary: "border-line-strong bg-transparent text-ink hover:border-primary hover:text-primary hover:bg-surface-hover",
  quiet: "border-transparent bg-transparent px-1 text-ink hover:border-primary hover:text-primary",
} as const;

type Common = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  icon?: ReactNode;
};

function buttonClass({ variant = "primary", size = "default", className }: Common & { className?: string }) {
  return cn(BASE, SIZES[size], VARIANTS[variant], className);
}

export function Button({
  variant = "primary",
  size = "default",
  icon,
  className,
  children,
  disabled,
  ...props
}: ComponentProps<"button"> & Common) {
  return (
    <button
      className={buttonClass({ variant, size, className })}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...props}
    >
      {children}
      {icon ? (
        <span aria-hidden className="shrink-0 [&_svg]:size-4">
          {icon}
        </span>
      ) : null}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "default",
  icon,
  className,
  children,
  ...props
}: ComponentProps<"a"> & Common) {
  return (
    <a className={buttonClass({ variant, size, className })} {...props}>
      {children}
      {icon ? (
        <span aria-hidden className="shrink-0 [&_svg]:size-4">
          {icon}
        </span>
      ) : null}
    </a>
  );
}
