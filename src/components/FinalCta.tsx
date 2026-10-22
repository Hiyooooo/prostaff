import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Shell } from "@/components/ui/Shell";
import { CONTACT_MAILTO, QUESTION_MAILTO } from "@/lib/site";

export function FinalCta() {
  return (
    <section id="demo" aria-labelledby="demo-judul" className="relative overflow-hidden on-inverse bg-surface-inverse">
      <PhotoSlot
        id="IMG-07"
        ratio="16 / 9"
        sizes="(min-width: 1200px) 1200px, 100vw"
        chip
        className="absolute inset-0 h-full w-full border-0"
      />
      <Shell crosshairBand="subtle" className="relative z-10 py-[72px] md:py-[104px]">
        <div className="max-w-[640px]">
          <p className="mb-5 font-mono text-xs leading-[1.2] tracking-[0.04em] text-ink-muted">
            prostaff / demo
          </p>
          <h2
            id="demo-judul"
            className="text-[clamp(32px,4vw,56px)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink"
          >
            Lihat ProStaff bekerja dengan data kantor Anda.
          </h2>
          {/* ILUSTRATIF: penawaran demo placeholder. // KLAIM: K7 */}
          <p className="mt-5 max-w-[58ch] text-base leading-[1.65] text-ink-secondary">
            Demo 30 menit. Kami memakai struktur folder dan daftar karyawan contoh dari kantor Anda.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={CONTACT_MAILTO} icon={<ArrowRight />}>
              Jadwalkan demo
            </ButtonLink>
            <ButtonLink href={QUESTION_MAILTO} variant="secondary">
              Kirim pertanyaan
            </ButtonLink>
          </div>
        </div>
      </Shell>
    </section>
  );
}
