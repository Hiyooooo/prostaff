"use client";

import { useState } from "react";
import { FileSpreadsheet, FileText, RotateCcw } from "lucide-react";
import { EMPLOYEES, calculatePayroll, PayrollResult } from "@/lib/payroll";
import { formatRupiah } from "@/lib/format";
import { toCsv } from "@/lib/csv";
import { cn } from "@/lib/cn";

export function PayrollDemo() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [showCsv, setShowCsv] = useState<boolean>(false);
  const [showPdf, setShowPdf] = useState<boolean>(false);
  const [liveMessage, setLiveMessage] = useState<string>("");

  const results: PayrollResult[] = EMPLOYEES.map(calculatePayroll);
  const selectedResult = results[selectedIdx];
  const selectedEmp = EMPLOYEES[selectedIdx];

  const totalBruto = results.reduce((acc, r) => acc + r.bruto, 0);
  const totalThp = results.reduce((acc, r) => acc + r.thp, 0);

  const handleSelectEmployee = (idx: number) => {
    setSelectedIdx(idx);
    setLiveMessage(`Karyawan ${EMPLOYEES[idx].nama} dipilih`);
  };

  const handleToggleCsv = () => {
    const next = !showCsv;
    setShowCsv(next);
    if (next) setShowPdf(false);
    setLiveMessage(next ? "Pratinjau CSV ditampilkan" : "Pratinjau CSV ditutup");
  };

  const handleTogglePdf = () => {
    const next = !showPdf;
    setShowPdf(next);
    if (next) setShowCsv(false);
    setLiveMessage(
      next
        ? `Pratinjau PDF ditampilkan untuk ${selectedEmp.nama}`
        : "Pratinjau PDF ditutup"
    );
  };

  const handleReset = () => {
    setSelectedIdx(0);
    setShowCsv(false);
    setShowPdf(false);
    setLiveMessage("Demo gaji direset ke kondisi awal");
  };

  // Generate 4-line exact CSV
  const csvHeaders = [
    "nama",
    "pokok",
    "jabatan",
    "tunjangan",
    "lembur",
    "bruto",
    "bpjs",
    "pph21",
    "reimburse",
    "thp",
  ];
  const csvRows = [
    csvHeaders,
    ...EMPLOYEES.map((emp, i) => {
      const res = results[i];
      return [
        emp.nama,
        emp.pokok,
        emp.jabatan,
        emp.transport + emp.makan,
        res.lembur,
        res.bruto,
        res.bpjs,
        res.pph,
        emp.reimbursement,
        res.thp,
      ];
    }),
  ];
  const csvContent = toCsv(csvRows);

  const tableRows = [
    {
      label: "Gaji pokok",
      values: EMPLOYEES.map((e) => formatRupiah(e.pokok)),
      bold: false,
    },
    {
      label: "Tunjangan jabatan",
      values: EMPLOYEES.map((e) => formatRupiah(e.jabatan)),
      bold: false,
    },
    {
      label: "Tunjangan transport",
      values: EMPLOYEES.map((e) => formatRupiah(e.transport)),
      bold: false,
    },
    {
      label: "Tunjangan makan",
      values: EMPLOYEES.map((e) => formatRupiah(e.makan)),
      bold: false,
    },
    {
      label: "Lembur (dari Perizinan)",
      values: results.map((r) => formatRupiah(r.lembur)),
      bold: false,
    },
    {
      label: "Bruto",
      values: results.map((r) => formatRupiah(r.bruto)),
      bold: true,
      rowBorder: true,
    },
    {
      label: "BPJS Kesehatan (1%)",
      values: results.map((r) => formatRupiah(r.kes)),
      bold: false,
    },
    {
      label: "BPJS JHT (2%)",
      values: results.map((r) => formatRupiah(r.jht)),
      bold: false,
    },
    {
      label: "BPJS JP (1%)",
      values: results.map((r) => formatRupiah(r.jp)),
      bold: false,
    },
    {
      label: "PPh 21 (bulanan)",
      values: results.map((r) => formatRupiah(r.pph)),
      bold: false,
    },
    {
      label: "Reimbursement",
      values: EMPLOYEES.map((e) => formatRupiah(e.reimbursement)),
      bold: false,
    },
    {
      label: "Take-home pay",
      values: results.map((r) => formatRupiah(r.thp)),
      bold: true,
      thpBorder: true,
    },
  ];

  return (
    <div
      tabIndex={0}
      aria-label="Demo interaktif modul Gaji"
      className="mt-8 border border-line bg-surface text-ink outline-none focus-visible:ring-1 focus-visible:ring-line-mid"
    >
      {/* Title Bar */}
      <div className="flex h-10 items-center justify-between border-b border-line px-4 font-mono text-[11px] text-ink-muted">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="ml-2 font-mono text-ink">prostaff.example / gaji</span>
        </div>
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

      {/* Screen reader live announcements */}
      <div className="sr-only" aria-live="polite">
        {liveMessage}
      </div>

      <div className="p-5">
        {/* Table caption & description */}
        <div className="flex flex-wrap items-center justify-between border-b border-line pb-2 mb-4 font-mono text-[11.5px] text-ink-muted">
          <span>TABEL PENGGAJIAN · Periode Oktober 2026</span>
          <span>Pilih kolom nama untuk rincian PPh 21</span>
        </div>

        {/* 12 Rows Table */}
        <div className="overflow-x-auto border border-line">
          <table className="w-full text-left font-mono text-[12px]">
            <thead className="border-b border-line bg-surface-subtle">
              <tr>
                <th scope="col" className="p-3 text-ink-muted font-normal">
                  Komponen
                </th>
                {EMPLOYEES.map((emp, idx) => {
                  const isSelected = selectedIdx === idx;
                  return (
                    <th
                      key={emp.nama}
                      scope="col"
                      className={cn(
                        "p-0 text-right transition-colors",
                        isSelected
                          ? "border-x border-line-mid bg-surface-hover"
                          : ""
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectEmployee(idx)}
                        aria-pressed={isSelected}
                        className="w-full p-3 text-right font-mono font-semibold text-ink hover:bg-surface-hover"
                      >
                        {emp.nama}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {tableRows.map((row) => (
                <tr
                  key={row.label}
                  className={cn(
                    "hover:bg-surface-hover transition-colors",
                    row.thpBorder ? "border-t-2 border-ink bg-surface-subtle" : "",
                    row.rowBorder ? "bg-surface-subtle font-semibold" : ""
                  )}
                >
                  <td
                    className={cn(
                      "p-3 text-ink",
                      row.bold ? "font-bold text-ink" : "text-ink-secondary"
                    )}
                  >
                    {row.label}
                  </td>
                  {row.values.map((val, idx) => {
                    const isSelected = selectedIdx === idx;
                    return (
                      <td
                        key={idx}
                        className={cn(
                          "p-3 text-right whitespace-nowrap",
                          row.bold ? "font-bold text-ink" : "text-ink",
                          isSelected
                            ? "border-x border-line-mid bg-surface-hover/50"
                            : ""
                        )}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Summary Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between border border-line bg-surface-subtle p-3 font-mono text-[11.5px]">
          <span className="text-ink-muted uppercase">
            Total Semua Karyawan (3 orang)
          </span>
          <div className="flex items-center gap-6">
            <span>
              Bruto: <strong className="text-ink">{formatRupiah(totalBruto)}</strong>
            </span>
            <span>
              Take-home:{" "}
              <strong className="text-ink">{formatRupiah(totalThp)}</strong>
            </span>
          </div>
        </div>

        {/* Bottom Section: Detail PPh 21 & Export Actions */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Detail PPh 21 (7/12) */}
          <div className="lg:col-span-7 border border-line p-4">
            <div className="flex items-center justify-between border-b border-line pb-2 mb-3 font-mono text-[11px] text-ink-muted">
              <span>DETAIL PPH 21: {selectedEmp.nama.toUpperCase()}</span>
              <span>Status PTKP TK/0</span>
            </div>
            <div className="grid grid-cols-2 gap-y-1.5 font-mono text-[11.5px]">
              <span className="text-ink-muted">Bruto bulanan:</span>
              <span className="text-right text-ink">
                {formatRupiah(selectedResult.bruto)}
              </span>

              <span className="text-ink-muted">Biaya jabatan (5%, maks 500rb):</span>
              <span className="text-right text-ink">
                -{formatRupiah(selectedResult.biayaJabatan)}
              </span>

              <span className="text-ink-muted">Iuran BPJS karyawan (K+JHT+JP):</span>
              <span className="text-right text-ink">
                -{formatRupiah(selectedResult.bpjs)}
              </span>

              <span className="text-ink-muted font-semibold">Neto bulanan:</span>
              <span className="text-right font-semibold text-ink">
                {formatRupiah(selectedResult.netoBulanan)}
              </span>

              <span className="text-ink-muted">Neto tahunan (x12):</span>
              <span className="text-right text-ink">
                {formatRupiah(selectedResult.netoTahunan)}
              </span>

              <span className="text-ink-muted">PTKP (TK/0):</span>
              <span className="text-right text-ink">-Rp54.000.000</span>

              <span className="text-ink-muted font-semibold">
                Penghasilan Kena Pajak (PKP):
              </span>
              <span className="text-right font-semibold text-ink">
                {formatRupiah(selectedResult.pkp)}
              </span>

              <span className="text-ink-muted">Pajak tahunan (Pasal 17):</span>
              <span className="text-right text-ink">
                {formatRupiah(selectedResult.pajakTahunan)}
              </span>

              <div className="col-span-2 border-t border-line my-1" />

              <span className="font-bold text-ink">PPh 21 bulanan:</span>
              <span className="text-right font-bold text-ink">
                {formatRupiah(selectedResult.pph)}
              </span>
            </div>
          </div>

          {/* Action Buttons & Note (5/12) */}
          <div className="lg:col-span-5 flex flex-col justify-between border border-line p-4">
            <div>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-3">
                Ekspor Dokumen
              </span>
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleToggleCsv}
                  aria-expanded={showCsv}
                  className={cn(
                    "flex items-center justify-between border p-3 font-mono text-xs transition-colors",
                    showCsv
                      ? "border-ink bg-ink text-surface"
                      : "border-line bg-surface text-ink hover:bg-surface-hover"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Ekspor CSV (Rekap)</span>
                  </div>
                  <span>{showCsv ? "Tutup" : "Pratinjau"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleTogglePdf}
                  aria-expanded={showPdf}
                  className={cn(
                    "flex items-center justify-between border p-3 font-mono text-xs transition-colors",
                    showPdf
                      ? "border-ink bg-ink text-surface"
                      : "border-line bg-surface text-ink hover:bg-surface-hover"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Ekspor PDF ({selectedEmp.nama})</span>
                  </div>
                  <span>{showPdf ? "Tutup" : "Pratinjau"}</span>
                </button>
              </div>
            </div>

            <p className="mt-4 font-mono text-[10.5px] text-ink-muted">
              Angka ilustratif, bukan data payroll sungguhan. Nilai dihitung
              secara langsung sesuai ketentuan tarif Pasal 17 dan batasan BPJS.
            </p>
          </div>
        </div>

        {/* CSV Preview Panel */}
        {showCsv && (
          <div className="mt-6 border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line bg-surface-subtle px-4 py-2 font-mono text-xs text-ink-muted">
              <span>Pratinjau CSV: gaji-2026-10.csv</span>
              <span className="text-[11px]">4 baris</span>
            </div>
            <div className="p-4">
              <p className="font-mono text-xs text-ink-muted mb-2">
                Pratinjau CSV. Demo ini tidak mengunduh berkas.
              </p>
              <pre
                tabIndex={0}
                aria-label="Pratinjau berkas CSV"
                className="border border-line bg-surface-subtle p-3 font-mono text-xs text-ink overflow-x-auto whitespace-pre"
              >
                {csvContent}
              </pre>
            </div>
          </div>
        )}

        {/* PDF Slip Preview Panel */}
        {showPdf && (
          <div className="mt-6 border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line bg-surface-subtle px-4 py-2 font-mono text-xs text-ink-muted">
              <span>Pratinjau slip PDF: {selectedEmp.nama}</span>
              <span className="text-[11px]">Rasio 1:1.414 · 1 halaman</span>
            </div>
            <div className="p-4">
              <p className="font-mono text-xs text-ink-muted mb-3">
                Pratinjau PDF. Demo ini tidak mengunduh berkas.
              </p>

              {/* Sheet with 1:1.414 A4-like aspect ratio */}
              <div className="mx-auto max-w-md border border-ink bg-surface p-6 font-mono text-xs text-ink">
                <div className="flex items-start justify-between border-b border-ink pb-3 mb-4">
                  <div>
                    <span className="block font-bold text-sm tracking-wide">
                      PROSTAFF HRIS
                    </span>
                    <span className="text-[11px] text-ink-muted">
                      SLIP GAJI · Oktober 2026
                    </span>
                  </div>
                  <div className="text-right text-[11px]">
                    <span className="block">No. 2026-10-0{selectedIdx + 1}</span>
                    <span className="font-semibold text-ink">
                      {selectedEmp.nama}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11.5px]">
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Gaji Pokok:</span>
                    <span>{formatRupiah(selectedEmp.pokok)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Tunjangan Jabatan:</span>
                    <span>{formatRupiah(selectedEmp.jabatan)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Tunjangan Transport:</span>
                    <span>{formatRupiah(selectedEmp.transport)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Tunjangan Makan:</span>
                    <span>{formatRupiah(selectedEmp.makan)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">
                      Lembur ({selectedEmp.lemburJam} jam):
                    </span>
                    <span>{formatRupiah(selectedResult.lembur)}</span>
                  </div>

                  <div className="flex justify-between border-t border-line pt-1 font-semibold">
                    <span>Penghasilan Bruto:</span>
                    <span>{formatRupiah(selectedResult.bruto)}</span>
                  </div>

                  <div className="flex justify-between text-ink-secondary pt-1">
                    <span className="text-ink-muted">BPJS (K+JHT+JP):</span>
                    <span>-{formatRupiah(selectedResult.bpjs)}</span>
                  </div>
                  <div className="flex justify-between text-ink-secondary">
                    <span className="text-ink-muted">PPh 21 (Bulanan):</span>
                    <span>-{formatRupiah(selectedResult.pph)}</span>
                  </div>
                  {selectedEmp.reimbursement > 0 && (
                    <div className="flex justify-between text-ink-secondary">
                      <span className="text-ink-muted">Reimbursement:</span>
                      <span>+{formatRupiah(selectedEmp.reimbursement)}</span>
                    </div>
                  )}

                  <div className="flex justify-between border-t-2 border-ink pt-2 font-bold text-[13px]">
                    <span>Take-home pay:</span>
                    <span>{formatRupiah(selectedResult.thp)}</span>
                  </div>
                </div>

                <div className="mt-8 border-t border-dashed border-line pt-3 text-center text-[10.5px] text-ink-muted">
                  Dokumen contoh. Bukan bukti pembayaran.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
