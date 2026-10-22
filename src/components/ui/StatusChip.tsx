import { CalendarCheck, Check, Clock, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

// 02 §6.6: status dibedakan oleh teks, ikon, dan gaya garis. Tanpa warna.
export type Status =
  | "DIAJUKAN"
  | "DISETUJUI"
  | "DITOLAK"
  | "LULUS"
  | "BELUM LULUS"
  | "TERLAMBAT"
  | "CUTI"
  | "LIBUR NASIONAL";

const STATUS: Record<Status, { icon: LucideIcon; className: string }> = {
  DIAJUKAN: { icon: Clock, className: "border-dashed border-line-strong text-ink" },
  DISETUJUI: { icon: Check, className: "border-ink bg-ink text-surface" },
  DITOLAK: { icon: X, className: "border-ink text-ink" },
  LULUS: { icon: Check, className: "border-ink bg-ink text-surface" },
  "BELUM LULUS": { icon: X, className: "border-ink text-ink" },
  TERLAMBAT: { icon: Clock, className: "border-line-strong bg-surface-hover text-ink-secondary" },
  CUTI: { icon: CalendarCheck, className: "border-line-strong text-ink-secondary" },
  "LIBUR NASIONAL": { icon: CalendarCheck, className: "border-line-strong bg-surface-subtle text-ink-secondary" },
};

export function StatusChip({ status, className }: { status: Status; className?: string }) {
  const meta = STATUS[status];
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-[5px] border px-[7px] font-mono text-[11px] leading-none uppercase tracking-[0.05em] whitespace-nowrap",
        meta.className,
        className,
      )}
    >
      <Icon aria-hidden size={12} strokeWidth={1.5} />
      {status}
    </span>
  );
}
