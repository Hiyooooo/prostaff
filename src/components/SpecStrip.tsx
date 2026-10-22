import { Shell } from "@/components/ui/Shell";

const CELLS = [
  {
    n: "5",
    t: "modul dalam satu layar kerja",
    d: "library · perizinan · absensi · gaji · exam",
    cls: "border-t-0 md:border-l-0",
  },
  {
    n: "1",
    t: "klik untuk mencatat presensi",
    d: "masuk dan keluar dari tombol yang sama",
    cls: "md:border-t-0",
  },
  {
    n: "0",
    // KLAIM: K1 tanpa pop-up/tur onboarding di aplikasi (prinsip desain, pemilik wajib konfirmasi).
    t: "pop-up di dalam aplikasi",
    d: "form, log, dan pratinjau tetap di halaman",
    cls: "md:border-l-0 xl:border-l xl:border-t-0",
  },
  {
    n: "2",
    // KLAIM: K2 ekspor CSV/PDF "tanpa menunggu antrean".
    t: "format ekspor gaji: CSV dan PDF",
    d: "csv untuk rekap · pdf untuk slip",
    cls: "xl:border-t-0",
  },
];

export function SpecStrip() {
  return (
    <section id="spesifikasi" aria-label="Spesifikasi ringkas">
      <Shell crosshairBand="light" className="py-14 md:py-[72px] 2xl:py-[88px]">
        <ul className="grid gap-px bg-line md:grid-cols-2 xl:grid-cols-4">
          {CELLS.map((c) => (
            <li key={c.n} className={`bg-surface px-0 py-6 md:px-7 md:first:pl-0 md:last:pr-0 ${c.cls}`}>
              <span className="block font-mono text-[44px] font-medium leading-[0.9] tracking-[-0.04em] tabular-nums text-ink md:text-[52px]">
                {c.n}
              </span>
              <p className="mt-4 text-[15px] leading-[1.4] tracking-[-0.01em] text-ink">{c.t}</p>
              <p className="mt-2 font-mono text-[11.5px] text-ink-muted">{c.d}</p>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
