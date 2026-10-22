import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable, Td, Th } from "@/components/ui/DataTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shell } from "@/components/ui/Shell";
import { StatusChip } from "@/components/ui/StatusChip";
import { CONTACT_MAILTO } from "@/lib/site";

// Angka identik dengan demo dan test vector 04 §8.
const ROWS: { dari: string; peristiwa: ReactNode; ke: string; dampak: ReactNode }[] = [
  {
    dari: "Perizinan",
    peristiwa: "Lembur 6 jam milik Laras Wulandari disetujui (2026-10-15)",
    ke: "Gaji",
    dampak: (
      <>
        Komponen Lembur <strong className="font-medium text-ink">Rp697.977</strong>; bruto naik dari{" "}
        <strong className="font-medium text-ink">Rp12.000.000</strong> menjadi{" "}
        <strong className="font-medium text-ink">Rp12.697.977</strong>
      </>
    ),
  },
  {
    dari: "Perizinan",
    peristiwa: "Cuti Raka Mahendra 2026-12-21 sampai 2026-12-25 disetujui",
    ke: "Absensi",
    dampak: (
      <>
        21 sampai 24 Des ditandai <StatusChip status="CUTI" />, 25 Des{" "}
        <StatusChip status="LIBUR NASIONAL" />; sisa cuti{" "}
        <strong className="font-medium text-ink">12 → 8</strong>
      </>
    ),
  },
  {
    dari: "Library",
    peristiwa: (
      <>
        Form lembur menautkan SOP{" "}
        <span className="font-mono text-[12px]">SDM / Kebijakan / Lembur</span>
      </>
    ),
    ke: "Perizinan",
    dampak: "Pemohon membaca aturan sebelum mengirim",
  },
  {
    dari: "Exam",
    peristiwa: "Skor 70 atau lebih",
    ke: "Library",
    // ILUSTRATIF: jalur contoh, tidak ada di data demo.
    dampak: (
      <>
        Hasil uji diarsipkan sebagai dokumen di folder SDM (jalur contoh{" "}
        <span className="font-mono text-[12px]">SDM/Arsip/Hasil Uji</span>)
      </>
    ),
  },
];

function NodeBox({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 border border-ink px-2.5 py-1 font-mono text-xs text-ink">
      {label}
    </span>
  );
}

export function DataFlow() {
  return (
    <section id="alur" aria-labelledby="alur-data-judul" className="on-inverse bg-surface-inverse">
      <Shell crosshairBand="light" className="py-14 md:py-[72px] 2xl:py-[88px]">
        <SectionHeader
          path="alur-data"
          title="Satu persetujuan, beberapa modul ikut berubah."
          lead="Data berpindah antar modul tanpa input ulang. Empat alur di bawah memakai angka dari demo di atas."
        />
        <DataTable
          caption="Alur data antar modul"
          ariaLabel="Alur data antar modul"
          className="mt-10"
        >
          <thead>
            <tr>
              <Th scope="col">Dari</Th>
              <Th scope="col">Peristiwa</Th>
              <Th scope="col">Ke</Th>
              <Th scope="col">Dampak</Th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={i}>
                <Td>
                  <span className="flex items-center gap-2">
                    <NodeBox label={r.dari} />
                    <ArrowRight aria-hidden size={13} strokeWidth={1.5} className="text-ink-muted" />
                  </span>
                </Td>
                <Td className="font-sans text-sm text-ink">{r.peristiwa}</Td>
                <Td>
                  <NodeBox label={r.ke} />
                </Td>
                <Td className="text-[11.5px] leading-[1.6] text-ink-secondary">{r.dampak}</Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
        <div className="mt-8">
          <ButtonLink href={CONTACT_MAILTO} icon={<ArrowRight />}>
            Jadwalkan demo
          </ButtonLink>
        </div>
      </Shell>
    </section>
  );
}
