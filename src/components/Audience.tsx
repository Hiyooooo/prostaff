import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shell } from "@/components/ui/Shell";
import { CONTACT_MAILTO } from "@/lib/site";

const ITEMS = [
  {
    id: "IMG-02" as const,
    h3: "Konsultan hukum",
    teks: "Berkas, SOP, dan template perjanjian tersimpan dalam satu hierarki folder. Lembur tercatat sebelum dikerjakan.",
  },
  {
    id: "IMG-03" as const,
    h3: "Studio arsitektur",
    teks: "Jam studio berbeda tiap proyek. Presensi satu klik mencatat masuk dan keluar tanpa menyela sesi menggambar.",
  },
  {
    id: "IMG-04" as const,
    h3: "Software house",
    teks: "Uji teknis berupa studi kasus nyata, dinilai dengan rubrik yang sama untuk setiap kandidat.",
  },
  {
    id: "IMG-05" as const,
    h3: "Kantor profesional",
    teks: "Akuntan dan konsultan menerima tabel gaji rapi dan ekspor CSV untuk pembukuan.",
  },
];

export function Audience() {
  return (
    <section id="audiens" aria-labelledby="audiens-judul" className="bg-surface-subtle">
      <Shell crosshairBand="light" className="py-14 md:py-[72px] 2xl:py-[88px]">
        <SectionHeader
          path="audiens"
          title="Dibuat untuk kantor yang bekerja dengan dokumen."
          lead="Empat jenis kantor, satu keluhan yang sama: terlalu banyak menu dan terlalu sedikit waktu."
        />
        <ul className="mt-14 grid gap-px bg-line md:grid-cols-2 xl:grid-cols-4">
          {ITEMS.map((item, i) => (
            <li key={item.id} className="bg-surface-subtle p-6">
              <PhotoSlot
                id={item.id}
                ratio="4 / 3"
                sizes="(min-width: 1024px) 288px, (min-width: 768px) 50vw, 100vw"
                chip={i === 0}
                className="border-line-strong"
              />
              <h3 className="mt-4 text-xl font-semibold leading-[1.25] tracking-[-0.02em] text-ink">
                {item.h3}
              </h3>
              <p className="mt-1.5 text-sm leading-[1.6] text-ink-secondary">{item.teks}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-xs text-ink-muted">
          Foto ilustrasi. Orang dalam foto bukan pelanggan atau karyawan ProStaff.
        </p>
        <div className="mt-8">
          <ButtonLink href={CONTACT_MAILTO} icon={<ArrowRight />}>
            Jadwalkan demo
          </ButtonLink>
        </div>
      </Shell>
    </section>
  );
}
