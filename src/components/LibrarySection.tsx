import type { ReactNode } from "react";
import { BookOpen } from "lucide-react";
import { DataTable, Td, Th } from "@/components/ui/DataTable";
import { Kbd } from "@/components/ui/Kbd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shell } from "@/components/ui/Shell";
import { LibraryDemo } from "@/components/LibraryDemo";

const ROWS: { fitur: string; keterangan: ReactNode; sorotan?: boolean }[] = [
  {
    fitur: "Direktori markdown berhierarki",
    sorotan: true,
    keterangan:
      "Folder berlapis (kategori / jenis / dokumen), dokumen ditulis dalam markdown, tampil sebagai sumber atau hasil render",
  },
  {
    fitur: "Pencarian keyboard",
    sorotan: true,
    keterangan: (
      <>
        <Kbd>/</Kbd> fokus cari, <Kbd>↑</Kbd> <Kbd>↓</Kbd> pindah hasil, <Kbd>Enter</Kbd> buka.
        Menjangkau judul, jalur, dan isi pembuka
      </>
    ),
  },
  {
    fitur: "Knowledge base SOP",
    keterangan: (
      <>
        Folder <span className="font-mono text-xs">Operasional/SOP</span> dan{" "}
        <span className="font-mono text-xs">SDM/Kebijakan</span> memuat prosedur yang ditautkan dari
        modul lain
      </>
    ),
  },
  {
    // KLAIM: K6 akses per folder dan log audit; fitur dijelaskan, tanpa klaim keamanan absolut.
    fitur: "Arsip dokumen perusahaan",
    keterangan: (
      <>
        Folder <span className="font-mono text-xs">Hukum</span> menyimpan template dan kebijakan
        retensi dokumen; akses diatur per folder
      </>
    ),
  },
  {
    fitur: "Modul e-learning",
    keterangan: (
      <>
        Dokumen bertipe <span className="font-mono text-xs">kursus</span> menampilkan daftar langkah
        yang bisa dicentang dan persentase kemajuan
      </>
    ),
  },
];

export function LibrarySection() {
  return (
    <section id="library" aria-labelledby="library-judul">
      <Shell crosshairBand="dark" className="py-14 md:py-[72px] 2xl:py-[88px]">
        <SectionHeader
          path="library"
          title="Library: wiki dokumen yang Anda telusuri dari keyboard."
          lead="Folder berlapis, dokumen ditulis dalam markdown, pencarian menjangkau judul, jalur, dan isi."
        />
        <div className="mt-10 flex items-start gap-3">
          <BookOpen aria-hidden size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-ink" />
          <div>
            <h3 className="text-xl font-semibold leading-[1.25] tracking-[-0.02em] text-ink">
              Temukan dokumen dalam hitungan ketikan.
            </h3>
            <p className="mt-2 max-w-[58ch] text-sm leading-[1.6] text-ink-secondary">
              Wiki internal berbasis markdown dengan hierarki folder. Cari berdasarkan judul, jalur,
              dan isi, lalu buka dokumen dari keyboard.
            </p>
          </div>
        </div>
        {/* Slot demo LibraryDemo diisi pada fase T5. */}
        <LibraryDemo />
        <p className="mt-4 flex flex-wrap items-center gap-1.5 font-mono text-xs text-ink-muted">
          <span>Coba: tekan</span>
          <Kbd>/</Kbd>
          <span>, ketik</span>
          <span className="font-mono">dokumen</span>
          <span>, lalu</span>
          <Kbd>Enter</Kbd>
          <span>.</span>
        </p>
        <DataTable caption="Sub-fitur Library" ariaLabel="Sub-fitur modul Library" className="mt-10">
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
        <p className="mt-6">
          <a
            href="#alur"
            className="border-b border-ink font-mono text-xs text-ink transition-colors duration-100 ease-linear hover:border-transparent"
          >
            Lihat alur data antar modul
          </a>
        </p>
      </Shell>
    </section>
  );
}
