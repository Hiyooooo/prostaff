import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// 02 §6.5. Keycap label statis, bukan kontrol interaktif.
export function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-key border border-line-mid border-b-2 bg-surface-subtle px-1.5 font-mono text-xs leading-none tracking-[0.02em] text-ink-secondary",
        className,
      )}
      {...props}
    />
  );
}
