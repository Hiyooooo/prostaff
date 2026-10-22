import type { ReactNode } from "react";
import { DataTable, Td, Th } from "@/components/ui/DataTable";
import { Kbd } from "@/components/ui/Kbd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shell } from "@/components/ui/Shell";

const RULES = [
  {
    n: "01",
    judul: "Satu aksi, satu kontrol.",
    teks: "Presensi, kirim izin, dan buka dokumen masing-masing punya satu kontrol yang jelas.",
  },
  {
    n: "02",
    judul: "Keyboard lebih dulu.",
    teks: "Setiap aksi utama punya shortcut. Mouse tetap bisa dipakai.",
  },
  {
    n: "03",
    // KLAIM: K1 tanpa pop-up/tur onboarding di aplikasi (prinsip desain, pemilik wajib konfirmasi).
    judul: "Tanpa gangguan.",
    teks: "Tanpa pop-up, banner promosi, atau tur onboarding di dalam aplikasi.",
  },
  {
    n: "04",
    judul: "Data terbaca di tabel.",
    teks: "Angka rata kanan, huruf mono, rupiah ditulis penuh.",
  },
];

const SHORTCUTS: { modul: string; keys: string[]; combo?: boolean; aksi: ReactNode }[] = [
  { modul: "Library", keys: ["/"], aksi: "Fokus ke kolom cari" },
  { modul: "Library", keys: ["↑", "↓"], aksi: "Pindah antar hasil" },
  { modul: "Library", keys: ["Enter"], aksi: "Buka dokumen terpilih" },
  { modul: "Perizinan", keys: ["1", "2", "3"], aksi: "Pilih jenis izin: Cuti, Sakit, Lembur" },
  { modul: "Perizinan", keys: ["Ctrl", "Enter"], combo: true, aksi: "Kirim pengajuan" },
  { modul: "Perizinan", keys: ["Esc"], aksi: "Kosongkan form" },
  {
    modul: "Absensi",
    keys: ["Space"],
    aksi: "Catat Masuk atau Keluar (tombol terfokus)",
  },
];

export function Principles() {
  return (
    <section id="prinsip" aria-labelledby="prinsip-judul" className="on-inverse bg-surface-inverse">
      <Shell crosshairBand="subtle" className="py-14 md:py-[72px] 2xl:py-[88px]">
        <SectionHeader
          path="prinsip"
          title="Empat aturan antarmuka."
          lead="Aturan ini berlaku untuk setiap layar di ProStaff."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-[72px]">
          <ol className="border-t border-line">
            {RULES.map((r) => (
              <li key={r.n} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-b border-line py-5">
                <span className="pt-1 font-mono text-xs text-ink-muted">{r.n}</span>
                <div>
                  <h3 className="text-[17px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink">
                    {r.judul}
                  </h3>
                  <p className="mt-1 text-sm leading-[1.55] text-ink-secondary">{r.teks}</p>
                </div>
              </li>
            ))}
          </ol>
          <div>
            <DataTable
              caption="Shortcut di demo halaman ini"
              ariaLabel="Shortcut di demo halaman ini"
            >
              <thead>
                <tr>
                  <Th scope="col">Modul</Th>
                  <Th scope="col">Shortcut</Th>
                  <Th scope="col">Aksi</Th>
                </tr>
              </thead>
              <tbody>
                {SHORTCUTS.map((s, i) => (
                  <tr key={i}>
                    <Td className="text-ink-secondary">{s.modul}</Td>
                    <Td>
                      <span className="flex flex-wrap items-center gap-1">
                        {s.keys.map((k, j) => (
                          <span key={j} className="flex items-center gap-1">
                            {j > 0 ? <span>{s.combo ? "+" : ""}</span> : null}
                            <Kbd>{k}</Kbd>
                          </span>
                        ))}
                      </span>
                    </Td>
                    <Td className="font-sans text-[13px] text-ink-secondary">{s.aksi}</Td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
            <p className="mt-4 font-mono text-xs text-ink-muted">
              Berlaku saat panel demo sedang difokus.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}
