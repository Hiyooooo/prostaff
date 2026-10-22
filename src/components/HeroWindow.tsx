import { Folder } from "lucide-react";
import { Kbd } from "@/components/ui/Kbd";

const TREE = [
  { label: "Hukum", count: 2 },
  { label: "Operasional", count: 2 },
  { label: "SDM", count: 2 },
  { label: "Teknik", count: 2 },
];

const RESULTS = [
  { path: "Hukum / Kebijakan / Retensi Dokumen", score: 5, selected: true },
  { path: "Teknik / Standar / Penamaan Berkas", score: 1, selected: false },
  { path: "SDM / Kebijakan / Kerja Jarak Jauh", score: 1, selected: false },
];

// Statistis: momen pencarian "dokumen", data identik dengan vektor searchDocs (04 §3.4).
export function HeroWindow() {
  return (
    <figure className="mt-10 lg:mt-16">
      <figcaption className="sr-only">
        {'Contoh pencarian dokumen di Library: kata "dokumen" menghasilkan 3 hasil.'}
      </figcaption>
      <div aria-hidden className="border border-ink bg-surface">
        <div className="flex h-[38px] items-center gap-3 border-b border-line px-3">
          <span className="flex gap-1">
            <span className="block h-1.5 w-1.5 border border-line-mid" />
            <span className="block h-1.5 w-1.5 border border-line-mid" />
            <span className="block h-1.5 w-1.5 border border-line-mid" />
          </span>
          <span className="truncate font-mono text-[11.5px] tracking-[0.02em] text-ink-secondary">
            prostaff.example / library
          </span>
          <span className="ml-auto font-mono text-[11px] text-ink-muted">v2.4.0</span>
        </div>
        <div className="grid min-[768px]:grid-cols-[240px_minmax(0,1fr)]">
          <div className="hidden border-r border-line py-2.5 min-[768px]:block">
            {TREE.map((t) => (
              <div key={t.label} className="flex min-h-8 items-center gap-2 px-3 text-[13px] text-ink-secondary">
                <Folder size={14} strokeWidth={1.5} className="text-ink-muted" />
                {t.label}
                <span className="ml-auto font-mono text-[11px] text-ink-muted">{t.count}</span>
              </div>
            ))}
          </div>
          <div className="p-3.5">
            <div className="flex h-[38px] items-center gap-2 rounded-control border border-line-strong px-2.5">
              <Kbd>/</Kbd>
              <span className="font-mono text-[12.5px] text-ink">dokumen</span>
              <span className="ml-auto font-mono text-[11.5px] text-ink-muted">3 hasil</span>
            </div>
            <div className="mt-2.5 border-t border-line">
              {RESULTS.map((r) => (
                <div
                  key={r.path}
                  className={
                    r.selected
                      ? "flex items-center gap-2.5 bg-ink px-2.5 py-2.5 text-surface"
                      : "flex items-center gap-2.5 border-b border-line px-2.5 py-2.5"
                  }
                >
                  <span className="truncate font-mono text-[11.5px] tracking-[0.02em]">{r.path}</span>
                  <span
                    className={
                      r.selected
                        ? "ml-auto font-mono text-[10.5px] text-surface"
                        : "ml-auto font-mono text-[10.5px] text-ink-muted"
                    }
                  >
                    skor {r.score}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5 font-mono text-xs text-ink-muted">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              <span>pilih</span>
              <span>·</span>
              <Kbd>Enter</Kbd>
              <span>buka</span>
              <span>·</span>
              <Kbd>Esc</Kbd>
              <span>tutup</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
