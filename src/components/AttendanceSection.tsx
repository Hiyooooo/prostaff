import type { ReactNode } from "react";
import { Fingerprint } from "lucide-react";
import { AttendanceDemo } from "@/components/AttendanceDemo";
import { DataTable, Td, Th } from "@/components/ui/DataTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shell } from "@/components/ui/Shell";

const ROWS: { fitur: string; keterangan: ReactNode; sorotan?: boolean }[] = [
  {
    fitur: "Check-in 1 klik",
    sorotan: true,
    keterangan: "Satu tombol besar bergantian Masuk dan Keluar",
  },
  {
    // KLAIM: K3 stempel waktu milidetik menyebut resolusi penyimpanan, bukan akurasi jam perangkat.
    fitur: "Log berstempel milidetik",
    sorotan: true,
    keterangan: (
      <>
        <span className="font-mono text-xs">YYYY-MM-DD HH:mm:ss.SSS WIB</span>, urut waktu, mono
      </>
    ),
  },
  {
    fitur: "Clock-in/out",
    keterangan: "Selisih keluar dikurangi masuk ditampilkan per hari sebagai durasi",
  },
  {
    fitur: "GPS geofencing",
    keterangan:
      "Geofence: radius 150 m dari Kantor Pusat Jakarta (simulasi, tanpa akses lokasi)",
  },
  {
    fitur: "Shift kerja",
    keterangan: "Shift reguler 09:00 sampai 18:00 WIB; keterlambatan dihitung terhadap jam mulai",
  },
  {
    fitur: "Rekap kehadiran",
    keterangan:
      "Kartu rekap: hadir, terlambat, total keterlambatan, total jam kerja. Diperbarui saat catatan baru disimpan",
  },
];

export function AttendanceSection() {
  return (
    <section id="absensi" aria-labelledby="absensi-judul">
      <Shell crosshairBand="subtle" className="py-14 md:py-[72px] 2xl:py-[88px]">
        <SectionHeader
          path="absensi"
          title="Absensi: satu klik, satu baris log."
          // KLAIM: K3 stempel waktu milidetik menyebut resolusi penyimpanan, bukan akurasi jam perangkat.
          lead="Tombol Masuk dan Keluar mencatat stempel waktu WIB sampai milidetik. Rekap diperbarui saat catatan baru disimpan."
        />
        <div className="mt-10 flex items-start gap-3">
          <Fingerprint aria-hidden size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-ink" />
          <div>
            <h3 className="text-xl font-semibold leading-[1.25] tracking-[-0.02em] text-ink">
              Presensi satu klik, tercatat sampai milidetik.
            </h3>
            <p className="mt-2 max-w-[58ch] text-sm leading-[1.6] text-ink-secondary">
              Satu tombol untuk masuk dan keluar. Setiap catatan tersimpan dengan stempel waktu WIB
              presisi milidetik dalam log histori yang mudah dibaca.
            </p>
          </div>
        </div>
        <AttendanceDemo />
        <DataTable caption="Sub-fitur Absensi" ariaLabel="Sub-fitur modul Absensi" className="mt-10">
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
