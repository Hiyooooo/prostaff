import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

// 02 §6.9: tabel asli dengan caption, th scope, dan wadah gulir yang bisa difokus.
export function DataTable({
  caption,
  captionSrOnly,
  ariaLabel,
  className,
  children,
}: {
  caption: string;
  captionSrOnly?: boolean;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div tabIndex={0} aria-label={ariaLabel} className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse font-mono text-xs">
        <caption
          className={cn(
            "text-left font-mono text-[11.5px] uppercase tracking-[0.06em] text-ink-muted",
            captionSrOnly ? "sr-only" : "pb-2.5",
          )}
        >
          {caption}
        </caption>
        {children}
      </table>
    </div>
  );
}

export function Th({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "border-b border-line px-2.5 pb-[9px] text-left font-mono text-[11.5px] font-medium whitespace-nowrap uppercase tracking-[0.04em] text-ink-muted first:pl-0 last:pr-0",
        className,
      )}
      {...props}
    />
  );
}

export function Td({ numeric, className, ...props }: ComponentProps<"td"> & { numeric?: boolean }) {
  return (
    <td
      className={cn(
        "border-b border-line px-2.5 py-[9px] align-middle first:pl-0 last:pr-0",
        numeric ? "text-right font-variant-numeric tabular-nums whitespace-nowrap" : null,
        className,
      )}
      {...props}
    />
  );
}
