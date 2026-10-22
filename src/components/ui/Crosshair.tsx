import { cn } from "@/lib/cn";

// 02 §4.1: tanda + di perpotongan garis section dan rel. Dua span garis 1px;
// latar menutup garis di sekitarnya. `band` = warna pita yang mendahului garis.
export function Crosshair({ side, band }: { side: "left" | "right"; band: "light" | "subtle" | "dark" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute -top-[5px] z-[3] hidden h-[9px] w-[9px] md:block",
        side === "left" ? "-left-[5px]" : "-right-[5px]",
        band === "dark" ? "bg-surface-inverse" : band === "subtle" ? "bg-surface-subtle" : "bg-surface",
      )}
    >
      <span
        className={cn(
          "absolute top-[4px] right-0 left-0 h-px",
          band === "dark" ? "bg-ink-inverse-muted" : "bg-ink-muted",
        )}
      />
      <span
        className={cn(
          "absolute top-0 bottom-0 left-[4px] w-px",
          band === "dark" ? "bg-ink-inverse-muted" : "bg-ink-muted",
        )}
      />
    </span>
  );
}
