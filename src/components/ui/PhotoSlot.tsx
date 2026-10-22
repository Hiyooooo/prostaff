import Image from "next/image";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";
import { PHOTOS, type PhotoId } from "@/lib/images";

// 07 §9: foto lokal hitam-putih dari berkas, tanpa filter CSS.
export function PhotoSlot({
  id,
  ratio,
  sizes,
  priority,
  chip,
  className,
}: {
  id: PhotoId;
  ratio: string;
  sizes: string;
  priority?: boolean;
  chip?: boolean;
  className?: string;
}) {
  const photo = PHOTOS[id];
  return (
    <figure className={cn("relative overflow-hidden border border-ink", className)} style={{ aspectRatio: ratio }}>
      {photo.src ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className="object-cover"
          loading={priority ? undefined : "lazy"}
          priority={priority}
        />
      ) : (
        <div data-photo-blocked={id} className="flex h-full w-full items-center justify-center bg-surface-hover">
          <span className="font-mono text-xs text-ink-secondary">{id}</span>
        </div>
      )}
      {id === "IMG-07" ? <span aria-hidden className="absolute inset-0 bg-photo-overlay" /> : null}
      {chip ? (
        <span className="absolute bottom-2 left-2">
          <Chip variant="foto">FOTO ILUSTRASI</Chip>
        </span>
      ) : null}
    </figure>
  );
}
