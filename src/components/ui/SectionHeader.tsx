import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// 02 §10: eyebrow berformat jalur `prostaff / {path}`, huruf kecil.
export function SectionHeader({
  path,
  title,
  lead,
  className,
}: {
  path: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[720px]", className)}>
      <p className="mb-5 font-mono text-xs leading-[1.2] tracking-[0.04em] text-ink-muted">
        prostaff / {path}
      </p>
      <h2
        id={`${path}-judul`}
        className="text-[clamp(28px,3.2vw,40px)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink"
      >
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 max-w-[58ch] text-base leading-[1.65] text-ink-secondary">{lead}</p>
      ) : null}
    </div>
  );
}
