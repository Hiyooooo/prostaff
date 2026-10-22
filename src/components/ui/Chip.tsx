import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

// 02 §6.4. Varian foto dipakai PhotoSlot (FOTO ILUSTRASI).
export function Chip({
  variant = "info",
  icon: Icon,
  className,
  children,
}: {
  variant?: "info" | "ghost" | "foto";
  icon?: LucideIcon;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap font-mono uppercase",
        variant === "foto"
          ? "bg-ink px-[7px] py-1 text-[10.5px] leading-none tracking-[0.07em] text-surface"
          : "h-6 gap-[5px] border px-[7px] text-[11px] leading-none tracking-[0.05em]",
        variant === "info" ? "border-line-strong text-ink" : null,
        variant === "ghost" ? "border-dashed border-line-strong text-ink-muted" : null,
        className,
      )}
    >
      {Icon ? <Icon aria-hidden size={12} strokeWidth={1.5} /> : null}
      {children}
    </span>
  );
}
