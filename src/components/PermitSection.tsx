import type { ReactNode } from "react";
import { CalendarCheck } from "lucide-react";
import { DataTable, Td, Th } from "@/components/ui/DataTable";
import { Kbd } from "@/components/ui/Kbd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shell } from "@/components/ui/Shell";
import { PermitDemo } from "@/components/PermitDemo";

const ROWS: { fitur: string; keterangan: ReactNode; sorotan?: boolean }[] = [
  {
    fitur: "Form keyboard-friendly",
    sorotan: true,
    keterangan: (
      <>
        <Kbd>1</Kbd> <Kbd>2</Kbd> <Kbd>3</Kbd> pilih jenis, <Kbd>Tab</Kbd> pindah kolom,{" "}
        <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd> kirim, <Kbd>Esc</Kbd> kosongkan
      </>
    ),
  },
  {
    // KLAIM: K6 log hanya menambah entri; tidak ada fungsi sunting atau hapus.
    fitur: "Log status transparan",
    sorotan: true,
    keterangan:
      "Setiap pengajuan dan keputusan menambah satu baris berstempel waktu. Tidak ada fungsi sunting atau hapus",
  },
  {
    fitur: "Workflow approval cuti",
    keterangan: "Diajukan → disetujui atau ditolak atasan (simulasi tombol atasan di demo)",
  },
  {
    fitur: "Izin sakit",
    keterangan: "Tidak mengurangi jatah cuti",
  },
  {
    fitur: "Lembur",
    keterangan: "Jam 1 sampai 8, otomatis menjadi komponen di Gaji setelah disetujui",
  },
  {
    fitur: "Transparansi sisa cuti",
    keterangan: "Panel: jatah, terpakai, menunggu, tersedia",
  },
];

export function PermitSection() {
  return (
    <section id="perizinan" aria-labelledby="perizinan-judul" className="bg-surface-subtle">
      <Shell crosshairBand="light" className="py-14 md:py-[72px] 2xl:py-[88px]">
        <SectionHeader
          path="perizinan"
          title="Perizinan: ajukan dari keyboard, telusuri dari log."
          lead={
            <>
              Pilih jenis izin dengan <Kbd>1</Kbd>, <Kbd>2</Kbd>, atau <Kbd>3</Kbd>. Kirim dengan{" "}
              <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd>. Setiap perubahan status menambah satu baris log.
            </>
          }
        />
        <div className="mt-10 flex items-start gap-3">
          <CalendarCheck aria-hidden size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-ink" />
          <div>
            <h3 className="text-xl font-semibold leading-[1.25] tracking-[-0.02em] text-ink">
              Ajukan, setujui, dan telusuri izin dari keyboard.
            </h3>
            <p className="mt-2 max-w-[58ch] text-sm leading-[1.6] text-ink-secondary">
              Form izin dengan shortcut cepat dan log status yang tidak bisa disunting diam-diam.
              Sisa cuti terhitung otomatis dengan libur nasional.
            </p>
          </div>
        </div>
        {/* Slot demo PermitDemo diisi pada fase T5. */}
        <PermitDemo />
        <p className="mt-4 flex flex-wrap items-center gap-1.5 font-mono text-xs text-ink-muted">
          <span>Coba: tekan</span>
          <Kbd>1</Kbd>
          <span>, isi tanggal, lalu</span>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>Enter</Kbd>
          <span>.</span>
        </p>
        <DataTable
          caption="Sub-fitur Perizinan"
          ariaLabel="Sub-fitur modul Perizinan"
          className="mt-10"
        >
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
