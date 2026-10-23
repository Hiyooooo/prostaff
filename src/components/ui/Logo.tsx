import Image from "next/image";
import { cn } from "@/lib/cn";

// 02 §6.8: wordmark ilustratif, kotak 12×12 + teks atau logo dinamis via Next/Image unoptimized.
export function Logo({
  className,
  src,
  name = "ProStaff",
}: {
  className?: string;
  src?: string | null;
  name?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {src ? (
        <Image
          unoptimized
          src={src}
          alt={name}
          width={24}
          height={24}
          className="h-5 w-auto object-contain"
        />
      ) : (
        <span aria-hidden className="h-3 w-3 bg-primary" />
      )}
      <span className="text-[15px] font-semibold tracking-[-0.02em] text-ink">{name}</span>
    </span>
  );
}
