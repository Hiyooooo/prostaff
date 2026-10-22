import { ArrowRight } from "lucide-react";
import { HeroWindow } from "@/components/HeroWindow";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Shell } from "@/components/ui/Shell";
import { CONTACT_MAILTO } from "@/lib/site";

export interface HeroProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  waNumber?: string;
  waMessage?: string;
}

export function Hero({
  headline,
  subheadline,
  ctaText = "Jadwalkan demo",
  ctaLink,
  ctaSecondaryText = "Lihat Library",
  ctaSecondaryLink = "#library",
  waNumber,
  waMessage,
}: HeroProps) {
  // If waNumber is configured, point the primary CTA directly to WhatsApp
  const cleanNumber = waNumber ? waNumber.replace(/\D/g, "") : "";
  const targetHref = cleanNumber
    ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
        waMessage || "Halo Admin ProStaff, saya ingin menjadwalkan demo."
      )}`
    : ctaLink || CONTACT_MAILTO;

  const defaultLines = ["Navigasi cepat.", "Layar bersih.", "Nol bloatware."];
  const lines = headline
    ? headline.split(/(?<=\.)\s+/).filter(Boolean)
    : defaultLines;

  return (
    <section id="hero" aria-labelledby="hero-judul">
      <Shell className="border-t-0 pt-10 pb-0 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 font-mono text-xs leading-[1.2] tracking-[0.04em] text-ink-muted">
              prostaff / hris
            </p>
            <h1
              id="hero-judul"
              className="text-[clamp(40px,5.6vw,76px)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink"
            >
              {lines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-[56ch] text-base leading-[1.65] text-ink-secondary">
              {subheadline || (
                <>
                  {/* KLAIM: K1 tanpa pop-up/tur onboarding di aplikasi (prinsip desain, pemilik wajib konfirmasi). */}
                  ProStaff HRIS menyatukan arsip dokumen, presensi, perizinan, penggajian, dan uji
                  teknis dalam satu antarmuka monokrom. Aksi utama selesai dari keyboard, tanpa pop-up
                  dan tanpa tur onboarding.
                </>
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={targetHref} icon={<ArrowRight />}>
                {ctaText}
              </ButtonLink>
              <ButtonLink href={ctaSecondaryLink} variant="secondary">
                {ctaSecondaryText}
              </ButtonLink>
            </div>
            {/* ILUSTRATIF: penawaran demo placeholder. // KLAIM: K7 */}
            <p className="mt-5 font-mono text-[11.5px] tracking-[0.02em] text-ink-muted">
              Demo 30 menit bersama tim kami. Tidak perlu kartu kredit.
            </p>
          </div>
          <PhotoSlot
            id="IMG-01"
            ratio="4 / 5"
            sizes="(min-width: 1024px) 384px, 100vw"
            chip
            priority
            className="w-full max-w-[420px] lg:max-w-none"
          />
        </div>
        <HeroWindow />
      </Shell>
    </section>
  );
}
