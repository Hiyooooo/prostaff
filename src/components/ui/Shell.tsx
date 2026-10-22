import type { ReactNode } from "react";
import { Crosshair } from "@/components/ui/Crosshair";
import { cn } from "@/lib/cn";

// Bingkai halaman 02 §4.1: rel kiri-kanan 1200px, hilang di ≤ 700px.
// Dipakai per section supaya latar pita bisa bleed penuh seperti prototipe.
export function Shell({
  className,
  children,
  crosshairBand,
}: {
  className?: string;
  children: ReactNode;
  crosshairBand?: "light" | "subtle" | "dark";
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[1200px] border-t border-line px-5 md:border-x md:px-8 2xl:px-10",
        className,
      )}
    >
      {crosshairBand ? (
        <>
          <Crosshair side="left" band={crosshairBand} />
          <Crosshair side="right" band={crosshairBand} />
        </>
      ) : null}
      {children}
    </div>
  );
}
