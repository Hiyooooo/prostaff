import Image from "next/image";
import { cn } from "@/lib/cn";

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
    <span className={cn("inline-flex items-center gap-2.5", className)}>
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
        <span
          aria-hidden
          className="inline-block h-5 w-5 shrink-0 bg-primary [mask-image:url(/icon.svg)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
        />
      )}
      <span className="text-[15px] font-semibold tracking-[-0.02em] text-ink">{name}</span>
    </span>
  );
}
