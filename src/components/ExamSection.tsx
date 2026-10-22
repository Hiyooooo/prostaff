import type { ReactNode } from "react";
import { ClipboardCheck } from "lucide-react";
import { ExamDemo } from "@/components/ExamDemo";
import { DataTable, Td, Th } from "@/components/ui/DataTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shell } from "@/components/ui/Shell";

const ROWS: { fitur: string; keterangan: ReactNode; sorotan?: boolean }[] = [
  {
    fitur: "Studi kasus terstruktur",
    sorotan: true,
    keterangan: "Satu kasus, satu lembar jawaban, rubrik empat kriteria berbobot",
  },
  {
    fitur: "Assessment rekrutmen",
    keterangan: "Mode Rekrutmen: kasus software (Kodeksa Teknologi)",
  },
  {
    fitur: "Evaluasi kinerja",
    keterangan: "Mode Evaluasi kinerja: kasus arsitektur (Studio Rancang Tenggara)",
  },
  {
    fitur: "Uji kompetensi",
    keterangan: "Mode Kompetensi: kasus hukum (Arunika & Rekan)",
  },
  {
    // KLAIM: K5 proctoring memakai log fokus jendela, bukan rekaman kamera atau AI.
    fitur: "Proctoring",
    keterangan:
      "Panel Log fokus jendela (simulasi). ProStaff tidak merekam kamera atau layar",
  },
];

export function ExamSection() {
  return (
    <section id="exam" aria-labelledby="exam-judul">
      <Shell crosshairBand="subtle" className="py-14 md:py-[72px] 2xl:py-[88px]">
        <SectionHeader
          path="exam"
          title="Exam: uji kemampuan lewat kasus kerja nyata."
          lead="Setiap kandidat mengerjakan studi kasus yang sama dan dinilai dengan rubrik empat kriteria berbobot."
        />
        <div className="mt-10 flex items-start gap-3">
          <ClipboardCheck aria-hidden size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-ink" />
          <div>
            <h3 className="text-xl font-semibold leading-[1.25] tracking-[-0.02em] text-ink">
              Uji kemampuan lewat kasus kerja nyata.
            </h3>
            <p className="mt-2 max-w-[58ch] text-sm leading-[1.6] text-ink-secondary">
              Uji teknis berupa studi kasus terstruktur dengan rubrik berbobot, sehingga setiap
              kandidat dan karyawan dinilai dengan ukuran yang sama.
            </p>
          </div>
        </div>
        <ExamDemo />
        <DataTable caption="Sub-fitur Exam" ariaLabel="Sub-fitur modul Exam" className="mt-10">
          <thead>
            <tr>
              <Th scope="col">Fitur</Th>
              <Th scope="col">Keterangan</Th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.fitur}>
                <Td className="font-sans text-[13.5px] text-ink-secondary">
                  {r.sorotan ? <strong className="font-semibold text-ink">{r.fitur}</strong> : r.fitur}
                </Td>
                <Td className="font-sans text-[13.5px] text-ink-secondary">{r.keterangan}</Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </Shell>
    </section>
  );
}
