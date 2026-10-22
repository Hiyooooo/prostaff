"use client";

import { useState, useRef } from "react";
import { RotateCcw } from "lucide-react";
import { WEIGHTS, scoreRubric, isPass } from "@/lib/exam";
import { StatusChip } from "@/components/ui/StatusChip";
import { cn } from "@/lib/cn";

interface CaseStudy {
  id: string;
  tabLabel: string;
  org: string;
  title: string;
  description: string;
}

const CASES: CaseStudy[] = [
  {
    id: "tab-rekrutmen",
    tabLabel: "Rekrutmen",
    org: "Kodeksa Teknologi",
    title: "Antrean izin yang lambat",
    description:
      "Halaman daftar izin memuat 4.000 baris dan butuh 6 detik. Tulis analisis penyebab, usulkan perbaikan, dan jelaskan cara mengukur hasilnya.",
  },
  {
    id: "tab-kinerja",
    tabLabel: "Evaluasi kinerja",
    org: "Studio Rancang Tenggara",
    title: "Revisi gambar kerja",
    description:
      "Klien meminta perubahan denah lantai 2 setelah gambar kerja terbit. Susun daftar dampak ke dokumen lain, urutan revisi, dan pesan ke klien.",
  },
  {
    id: "tab-kompetensi",
    tabLabel: "Kompetensi",
    org: "Arunika & Rekan",
    title: "Klausul kerahasiaan",
    description:
      "Sebuah NDA mewajibkan kerahasiaan tanpa batas waktu dan tanpa pengecualian. Identifikasi risikonya dan tulis usulan revisi klausul.",
  },
];

const DELIVERABLES = [
  "Analisis singkat (maks. 200 kata)",
  "Usulan solusi",
  "Ringkasan untuk non-teknis",
];

const CRITERIA = [
  { name: "Analisis masalah", weight: WEIGHTS[0] },
  { name: "Kualitas solusi", weight: WEIGHTS[1] },
  { name: "Kejelasan komunikasi", weight: WEIGHTS[2] },
  { name: "Ketepatan waktu", weight: WEIGHTS[3] },
];

const SCALE_LABELS = [
  "Tidak ada",
  "Kurang",
  "Cukup",
  "Baik",
  "Sangat baik",
];

function formatScore(score: number): string {
  if (score % 1 === 0) return score.toString();
  return score.toString().replace(".", ",");
}

export function ExamDemo() {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const [scores, setScores] = useState<(number | null)[]>([null, null, null, null]);
  const [liveMessage, setLiveMessage] = useState<string>("");

  const tabListRef = useRef<HTMLDivElement>(null);
  const activeCase = CASES[activeTabIdx];

  const handleTabChange = (idx: number) => {
    setActiveTabIdx(idx);
    setScores([null, null, null, null]);
    setLiveMessage(`Mode berpindah ke ${CASES[idx].tabLabel}. Skor dikosongkan.`);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIdx = (activeTabIdx + 1) % CASES.length;
      handleTabChange(nextIdx);
      const tabs = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      tabs?.[nextIdx]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIdx = (activeTabIdx - 1 + CASES.length) % CASES.length;
      handleTabChange(prevIdx);
      const tabs = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      tabs?.[prevIdx]?.focus();
    }
  };

  const handleSetScore = (critIdx: number, val: number) => {
    const nextScores = [...scores];
    nextScores[critIdx] = val;
    setScores(nextScores);

    if (nextScores.every((s): s is number => s !== null)) {
      const total = scoreRubric(nextScores);
      const passed = isPass(total);
      const statusLabel = passed ? "LULUS" : "BELUM LULUS";
      setLiveMessage(`Skor ${formatScore(total)} dari 100, ${statusLabel}`);
    }
  };

  const handleFillSample = () => {
    const sample = [4, 3, 3, 2];
    setScores(sample);
    const total = scoreRubric(sample);
    const passed = isPass(total);
    const statusLabel = passed ? "LULUS" : "BELUM LULUS";
    setLiveMessage(`Contoh terisi: Skor ${formatScore(total)} dari 100, ${statusLabel}`);
  };

  const handleReset = () => {
    setActiveTabIdx(0);
    setScores([null, null, null, null]);
    setLiveMessage("Demo exam direset ke kondisi awal");
  };

  const isAllFilled = scores.every((s): s is number => s !== null);
  const totalScore = isAllFilled ? scoreRubric(scores as number[]) : null;
  const passed = totalScore !== null ? isPass(totalScore) : false;

  return (
    <div
      tabIndex={0}
      aria-label="Demo interaktif modul Exam"
      className="mt-8 border border-line bg-surface text-ink outline-none focus-visible:ring-1 focus-visible:ring-line-mid"
    >
      {/* Title Bar */}
      <div className="flex h-10 items-center justify-between border-b border-line px-4 font-mono text-[11px] text-ink-muted">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="ml-2 font-mono text-ink">prostaff.example / exam</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleFillSample}
            className="text-ink hover:text-ink-secondary underline decoration-dotted underline-offset-2"
          >
            Isi contoh
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-ink hover:text-ink-secondary"
            title="Reset demo ke kondisi awal"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset demo</span>
          </button>
        </div>
      </div>

      {/* Screen reader live announcements */}
      <div className="sr-only" aria-live="polite">
        {liveMessage}
      </div>

      {/* Tablist */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Jenis uji kasus"
        onKeyDown={handleTabKeyDown}
        className="flex border-b border-line bg-surface-subtle font-mono text-xs overflow-x-auto"
      >
        {CASES.map((cs, idx) => {
          const isSelected = activeTabIdx === idx;
          return (
            <button
              key={cs.id}
              role="tab"
              id={cs.id}
              aria-selected={isSelected}
              aria-controls="panel-exam"
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleTabChange(idx)}
              className={cn(
                "px-5 py-3 border-r border-line transition-colors whitespace-nowrap",
                isSelected
                  ? "bg-surface text-ink font-semibold border-b-2 border-b-ink -mb-px"
                  : "text-ink-muted hover:text-ink hover:bg-surface-hover"
              )}
            >
              {cs.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Tab Panel Content */}
      <div
        id="panel-exam"
        role="tabpanel"
        aria-labelledby={activeCase.id}
        className="grid grid-cols-1 divide-y divide-line lg:grid-cols-12 lg:divide-x lg:divide-y-0"
      >
        {/* Left Column: Case Study Document (5/12) */}
        <div className="p-5 lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-2 mb-4 font-mono text-[11px] text-ink-muted">
              <span>LEMBAR KASUS TERSTRUKTUR</span>
              <span>{activeCase.org}</span>
            </div>

            <h3 className="text-lg font-bold text-ink tracking-tight mb-2">
              {activeCase.title}
            </h3>

            <p className="font-sans text-[13.5px] leading-relaxed text-ink-secondary mb-6">
              {activeCase.description}
            </p>

            <div className="border-t border-line pt-4">
              <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-2">
                Yang harus Anda kumpulkan:
              </span>
              <ul className="space-y-1.5 font-mono text-xs text-ink-secondary">
                {DELIVERABLES.map((del, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-ink font-bold">0{i + 1}.</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Static Proctoring Panel (Simulated) */}
          <div className="mt-8 border border-line bg-surface-subtle p-3.5">
            <div className="flex items-center justify-between border-b border-line pb-1.5 mb-2 font-mono text-[11px] text-ink-muted">
              <span className="font-semibold text-ink">
                Log fokus jendela (simulasi)
              </span>
              <span>2 kejadian, total 11 dtk</span>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-ink-secondary">
              <div className="flex justify-between">
                <span>10:14:22</span>
                <span>Jendela kehilangan fokus</span>
                <span className="text-right">8 dtk</span>
              </div>
              <div className="flex justify-between">
                <span>10:31:05</span>
                <span>Jendela kehilangan fokus</span>
                <span className="text-right">3 dtk</span>
              </div>
            </div>
            <p className="mt-2.5 border-t border-line pt-2 font-mono text-[10.5px] text-ink-muted">
              ProStaff tidak merekam kamera atau layar. Log mendeteksi peristiwa fokus browser secara lokal.
            </p>
          </div>
        </div>

        {/* Right Column: Scoring Rubric & Results (7/12) */}
        <div className="p-5 lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-2 mb-4 font-mono text-[11px] text-ink-muted">
              <span>RUBRIK PENILAIAN BERBOBOT</span>
              <span>Ambang kelulusan: 70/100</span>
            </div>

            {/* 4 Rubric Criteria */}
            <div className="space-y-6">
              {CRITERIA.map((crit, critIdx) => {
                const currentVal = scores[critIdx];
                return (
                  <div
                    key={crit.name}
                    role="radiogroup"
                    aria-label={`${crit.name} (bobot ${crit.weight}%)`}
                    className="border border-line p-3 bg-surface"
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-2">
                      <span className="font-semibold text-ink">{crit.name}</span>
                      <span className="text-ink-muted">
                        Bobot {crit.weight}%
                        {currentVal !== null && (
                          <span className="ml-2 text-ink font-semibold">
                            (Skor: {currentVal}/4)
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Radio group scale 0..4 */}
                    <div className="grid grid-cols-5 gap-1 pt-1 font-mono text-center">
                      {[0, 1, 2, 3, 4].map((num) => {
                        const isChecked = currentVal === num;
                        return (
                          <label
                            key={num}
                            className={cn(
                              "border p-2 cursor-pointer transition-colors flex flex-col items-center justify-between",
                              isChecked
                                ? "border-ink bg-ink text-surface"
                                : "border-line bg-surface text-ink hover:bg-surface-hover"
                            )}
                          >
                            <input
                              type="radio"
                              name={`rubric-${critIdx}`}
                              value={num}
                              checked={isChecked}
                              onChange={() => handleSetScore(critIdx, num)}
                              className="sr-only"
                            />
                            <span className="text-sm font-bold block mb-1">
                              {num}
                            </span>
                            <span
                              className={cn(
                                "text-[10px] block leading-tight",
                                isChecked ? "text-surface/80" : "text-ink-muted"
                              )}
                            >
                              {SCALE_LABELS[num]}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scoring Result Banner */}
          <div className="mt-8 border-t border-line pt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                Hasil Penilaian
              </span>
              {totalScore !== null ? (
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-sans text-[36px] font-bold leading-none text-ink">
                    {formatScore(totalScore)}
                  </span>
                  <span className="font-mono text-sm text-ink-muted">/100</span>
                </div>
              ) : (
                <span className="block font-mono text-sm font-semibold text-ink-secondary mt-1">
                  Belum dinilai (isi keempat kriteria)
                </span>
              )}
            </div>

            {totalScore !== null && (
              <div>
                <StatusChip status={passed ? "LULUS" : "BELUM LULUS"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
