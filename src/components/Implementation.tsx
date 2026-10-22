import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shell } from "@/components/ui/Shell";
import { CONTACT_MAILTO } from "@/lib/site";

const STEPS = [
  {
    n: "01",
    judul: "Impor",
    teks: "Unggah struktur folder SOP dan daftar karyawan dalam format CSV.",
  },
  {
    n: "02",
    judul: "Atur",
    teks: "Tetapkan jam shift, jenis izin, komponen gaji, dan rubrik Exam.",
  },
  {
    n: "03",
    judul: "Jalankan",
    teks: "Tim memakai Absensi dan Perizinan sejak hari pertama. Library terisi bertahap.",
  },
];

export function Implementation() {
  return (
    <section id="implementasi" aria-labelledby="implementasi-judul">
      <Shell crosshairBand="dark" className="py-14 md:py-[72px] 2xl:py-[88px]">
        <SectionHeader
          path="implementasi"
          title="Tiga langkah menuju hari kerja pertama."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14">
          <div>
            <ol className="border-t border-line">
              {STEPS.map((s) => (
                <li key={s.n} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-b border-line py-5">
                  <span className="pt-1 font-mono text-[11px] tracking-[0.06em] text-ink-muted">{s.n}</span>
                  <div>
                    <h3 className="text-lg font-semibold leading-[1.25] tracking-[-0.02em] text-ink">
                      {s.judul}
                    </h3>
                    <p className="mt-1.5 text-sm leading-[1.55] text-ink-secondary">{s.teks}</p>
                  </div>
                </li>
              ))}
            </ol>
            {/* ILUSTRATIF: durasi implementasi placeholder, dibahas saat demo. */}
            <p className="mt-5 font-mono text-[11.5px] text-ink-muted">
              Durasi implementasi bergantung pada ukuran kantor dan dibahas saat demo.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={CONTACT_MAILTO} icon={<ArrowRight />}>
                Jadwalkan demo
              </ButtonLink>
            </div>
          </div>
          <PhotoSlot
            id="IMG-06"
            ratio="3 / 2"
            sizes="(min-width: 1024px) 552px, 100vw"
            chip
            className="w-full max-w-[560px] lg:max-w-none"
          />
        </div>
      </Shell>
    </section>
  );
}
