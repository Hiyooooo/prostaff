import type { ReactNode } from "react";
import { Wallet } from "lucide-react";
import { PayrollDemo } from "@/components/PayrollDemo";
import { DataTable, Td, Th } from "@/components/ui/DataTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shell } from "@/components/ui/Shell";

const ROWS: { fitur: string; keterangan: ReactNode; sorotan?: boolean }[] = [
  {
    fitur: "Breakdown dalam tabel keuangan",
    sorotan: true,
    keterangan: "Kolom = karyawan, baris = komponen, rupiah penuh, mono rata kanan, baris total",
  },
  {
    // KLAIM: K2 ekspor CSV/PDF "tanpa menunggu antrean".
    fitur: "Ekspor CSV dan PDF",
    sorotan: true,
    keterangan:
      "Tombol Ekspor CSV dan Ekspor PDF membuka pratinjau teks CSV dan lembar slip. Demo tidak mengunduh berkas",
  },
  {
    fitur: "Kalkulasi otomatis",
    keterangan: "Semua angka dihitung fungsi murni dari data input",
  },
  {
    // KLAIM: K4 PPh 21 dan BPJS disederhanakan untuk demo, mengacu pada ketentuan yang berlaku.
    fitur: "PPh 21",
    keterangan: "Panel detail per karyawan: neto, PTKP, PKP, pajak tahunan dan bulanan",
  },
  {
    // KLAIM: K4 batas iuran ilustratif, wajib diverifikasi untuk tahun berjalan.
    fitur: "BPJS",
    keterangan: "Baris Kesehatan 1%, JHT 2%, JP 1%",
  },
  {
    fitur: "Slip gaji digital",
    keterangan: "Pratinjau PDF berupa lembar slip untuk karyawan terpilih",
  },
  {
    fitur: "Reimbursement",
    keterangan:
      "Baris tambahan setelah pajak (contoh: Raka Mahendra Rp350.000, Transport klien 14 Okt)",
  },
];

export function PayrollSection() {
  return (
    <section id="gaji" aria-labelledby="gaji-judul" className="bg-surface-subtle">
      <Shell crosshairBand="light" className="py-14 md:py-[72px] 2xl:py-[88px]">
        <SectionHeader
          path="gaji"
          title="Gaji: komponen terbaca dalam satu tabel."
          lead="Pendapatan, iuran BPJS, PPh 21, dan reimbursement per karyawan. Pilih satu kolom untuk melihat perhitungan pajaknya."
        />
        <div className="mt-10 flex items-start gap-3">
          <Wallet aria-hidden size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-ink" />
          <div>
            <h3 className="text-xl font-semibold leading-[1.25] tracking-[-0.02em] text-ink">
              Komponen gaji terbaca dalam satu tabel.
            </h3>
            <p className="mt-2 max-w-[58ch] text-sm leading-[1.6] text-ink-secondary">
              Breakdown pendapatan, potongan BPJS, dan PPh 21 per karyawan dalam tabel keuangan.
              Ekspor CSV atau PDF tanpa menunggu antrean.
            </p>
          </div>
        </div>
        <PayrollDemo />
        {/* KLAIM: K4 PPh 21 dan BPJS disederhanakan; konfigurasi final diverifikasi konsultan pajak. */}
        <p className="mt-4 font-mono text-[11.5px] text-ink-muted">
          Angka ilustratif. Perhitungan disederhanakan untuk demonstrasi. PPh 21 dan BPJS mengacu
          pada ketentuan yang berlaku dan diverifikasi saat konfigurasi.
        </p>
        <DataTable caption="Sub-fitur Gaji" ariaLabel="Sub-fitur modul Gaji" className="mt-10">
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
