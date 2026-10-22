"use client";

import { useState, useRef } from "react";
import { RotateCcw } from "lucide-react";
import {
  LeaveType,
  LeaveRequest,
  LogEntry,
  LEAVE_LOG_SEED,
  HOLIDAYS,
  workingDays,
  availableLeave,
  validateRequest,
  appendLog,
} from "@/lib/leave";
import { formatWib } from "@/lib/format";
import { Kbd } from "@/components/ui/Kbd";
import { StatusChip } from "@/components/ui/StatusChip";
import { cn } from "@/lib/cn";

const TOTAL_QUOTA = 12;
const APPROVED_INITIAL = 4;

export function PermitDemo() {
  const [leaveType, setLeaveType] = useState<LeaveType>("cuti");
  const [startDate, setStartDate] = useState<string>("2026-11-02");
  const [endDate, setEndDate] = useState<string>("2026-11-06");
  const [overtimeHours, setOvertimeHours] = useState<number>(3);
  const [note, setNote] = useState<string>("Cuti tahunan serah terima tugas.");
  const [logs, setLogs] = useState<LogEntry[]>(LEAVE_LOG_SEED);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [liveMessage, setLiveMessage] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate pending days for cuti
  const pendingCutiDays = logs
    .filter((l) => l.status === "DIAJUKAN" && l.aksi.includes("cuti"))
    .reduce((acc, curr) => {
      const match = curr.aksi.match(/(\d+)\s+hari/);
      return acc + (match ? parseInt(match[1], 10) : 0);
    }, 0);

  const available = availableLeave(TOTAL_QUOTA, APPROVED_INITIAL, pendingCutiDays);

  const calculatedWorkingDays =
    startDate && endDate
      ? workingDays(startDate, endDate, HOLIDAYS)
      : 0;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isEditing =
      document.activeElement?.tagName === "INPUT" ||
      document.activeElement?.tagName === "TEXTAREA";

    // Ctrl+Enter to submit
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
      return;
    }

    // Esc to reset form
    if (e.key === "Escape") {
      e.preventDefault();
      handleClearForm();
      return;
    }

    // Numbers 1, 2, 3 only when not inside input or textarea
    if (!isEditing) {
      if (e.key === "1") {
        e.preventDefault();
        setLeaveType("cuti");
        setErrorMessage("");
      } else if (e.key === "2") {
        e.preventDefault();
        setLeaveType("sakit");
        setErrorMessage("");
      } else if (e.key === "3") {
        e.preventDefault();
        setLeaveType("lembur");
        setErrorMessage("");
      }
    }
  };

  const handleFillExample = () => {
    setLeaveType("cuti");
    setStartDate("2026-11-02");
    setEndDate("2026-11-06");
    setNote("Cuti tahunan persiapan proyek akhir tahun.");
    setErrorMessage("");
    setLiveMessage("Form diisi dengan data contoh cuti");
  };

  const handleClearForm = () => {
    setStartDate("");
    setEndDate("");
    setOvertimeHours(1);
    setNote("");
    setErrorMessage("");
    setLiveMessage("Form perizinan dikosongkan");
  };

  const handleSubmit = () => {
    const req: LeaveRequest = {
      type: leaveType,
      startIso: startDate,
      endIso: leaveType === "lembur" ? startDate : endDate,
      hours: leaveType === "lembur" ? overtimeHours : undefined,
    };

    const res = validateRequest(req, { available, holidays: HOLIDAYS });
    if (!res.ok) {
      setErrorMessage(res.message);
      setLiveMessage(`Gagal: ${res.message}`);
      return;
    }

    setErrorMessage("");

    const newReqId = `r${Date.now()}`;
    const nowIso = new Date().toISOString();
    let actionDesc = "";

    if (leaveType === "cuti") {
      actionDesc = `Mengajukan cuti ${startDate} sampai ${endDate} (${res.days} hari kerja)`;
    } else if (leaveType === "sakit") {
      actionDesc = `Mengajukan izin sakit ${startDate} sampai ${endDate} (${res.days} hari kerja)`;
    } else {
      actionDesc = `Mengajukan lembur ${overtimeHours} jam pada ${startDate}`;
    }

    const newEntry: LogEntry = {
      requestId: newReqId,
      waktu: nowIso,
      aktor: "Pengguna (Demo)",
      aksi: actionDesc,
      status: "DIAJUKAN",
    };

    setLogs((prev) => appendLog(prev, newEntry));
    setLiveMessage(`Pengajuan berhasil dicatat ke dalam log: ${actionDesc}`);
    handleClearForm();
  };

  const handleDecision = (requestId: string, approve: boolean) => {
    const target = logs.find((l) => l.requestId === requestId && l.status === "DIAJUKAN");
    if (!target) return;

    const nowIso = new Date().toISOString();
    const decisionStatus = approve ? "DISETUJUI" : "DITOLAK";
    const decisionDesc = `${approve ? "Menyetujui" : "Menolak"} pengajuan: ${target.aksi}`;

    const decisionEntry: LogEntry = {
      requestId: target.requestId,
      waktu: nowIso,
      aktor: "Bima Santoso (Atasan)",
      aksi: decisionDesc,
      status: decisionStatus,
    };

    setLogs((prev) => appendLog(prev, decisionEntry));
    setLiveMessage(`Pengajuan ${target.requestId} telah ${decisionStatus}`);
  };

  const handleResetDemo = () => {
    setLogs(LEAVE_LOG_SEED);
    handleFillExample();
    setLiveMessage("Demo perizinan direset ke data awal");
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Demo interaktif modul Perizinan"
      className="mt-8 border border-line bg-surface text-ink outline-none focus-visible:ring-1 focus-visible:ring-line-mid"
    >
      {/* Window Title Bar */}
      <div className="flex h-10 items-center justify-between border-b border-line px-4 font-mono text-[11px] text-ink-muted">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="ml-2 font-mono text-ink">prostaff.example / perizinan</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDemo}
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

      {/* Grid 5/12 Form and 7/12 Log */}
      <div className="grid grid-cols-1 divide-y divide-line lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        {/* Left Column: Form (5/12) */}
        <div className="p-5 lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-2 mb-4 font-mono text-[11px] text-ink-muted">
              <span>FORM PENGAJUAN</span>
              <span>Laras Wulandari</span>
            </div>

            {/* Leave Type Radiogroup */}
            <div>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-2">
                Pilih Jenis Izin (Tekan 1, 2, atau 3)
              </span>
              <div
                role="radiogroup"
                aria-label="Pilihan jenis perizinan"
                className="grid grid-cols-3 gap-2 font-mono text-[12px]"
              >
                {[
                  { id: "cuti", label: "Cuti", key: "1" },
                  { id: "sakit", label: "Izin sakit", key: "2" },
                  { id: "lembur", label: "Lembur", key: "3" },
                ].map((item) => {
                  const isSelected = leaveType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setLeaveType(item.id as LeaveType);
                        setErrorMessage("");
                      }}
                      className={cn(
                        "flex items-center justify-between border px-2.5 py-2 transition-colors",
                        isSelected
                          ? "border-ink bg-ink text-surface font-semibold"
                          : "border-line bg-surface hover:bg-surface-hover text-ink"
                      )}
                    >
                      <span>{item.label}</span>
                      <Kbd className={isSelected ? "bg-surface text-ink border-line" : ""}>
                        {item.key}
                      </Kbd>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SOP Link for Lembur */}
            {leaveType === "lembur" && (
              <div className="mt-3 border border-line bg-surface-subtle p-2 font-mono text-[11px] text-ink-muted">
                <span>Rujukan SOP: </span>
                <a
                  href="#library"
                  className="font-medium text-ink underline underline-offset-2 hover:text-ink-secondary"
                >
                  SDM / Kebijakan / Lembur
                </a>
              </div>
            )}

            {/* Form Fields */}
            <div className="mt-4 space-y-3 font-mono text-[12px]">
              {leaveType === "lembur" ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="overtime-date" className="block text-[11px] text-ink-muted mb-1">
                      Tanggal Lembur
                    </label>
                    <input
                      id="overtime-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full border border-line bg-surface p-2 text-ink outline-none focus:border-ink"
                    />
                  </div>
                  <div>
                    <label htmlFor="overtime-hours" className="block text-[11px] text-ink-muted mb-1">
                      Jam Lembur (1-8 jam)
                    </label>
                    <input
                      id="overtime-hours"
                      type="number"
                      min={1}
                      max={8}
                      value={overtimeHours}
                      onChange={(e) => setOvertimeHours(parseInt(e.target.value, 10) || 1)}
                      className="w-full border border-line bg-surface p-2 text-ink outline-none focus:border-ink"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="permit-start-date" className="block text-[11px] text-ink-muted mb-1">
                      Tanggal Mulai
                    </label>
                    <input
                      id="permit-start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full border border-line bg-surface p-2 text-ink outline-none focus:border-ink"
                    />
                  </div>
                  <div>
                    <label htmlFor="permit-end-date" className="block text-[11px] text-ink-muted mb-1">
                      Tanggal Selesai
                    </label>
                    <input
                      id="permit-end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full border border-line bg-surface p-2 text-ink outline-none focus:border-ink"
                    />
                  </div>
                </div>
              )}

              {/* Working days counter preview */}
              {leaveType !== "lembur" && startDate && endDate && (
                <div className="text-[11.5px] text-ink-muted">
                  Hari kerja dihitung:{" "}
                  <strong className="text-ink">{calculatedWorkingDays} hari</strong>{" "}
                  (tanpa akhir pekan &amp; libur nasional)
                </div>
              )}

              <div>
                <label htmlFor="permit-note" className="block text-[11px] text-ink-muted mb-1">
                  Keterangan (Maks 80 karakter)
                </label>
                <textarea
                  id="permit-note"
                  rows={2}
                  maxLength={80}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Keterangan pengajuan..."
                  className="w-full border border-line bg-surface p-2 text-ink outline-none focus:border-ink resize-none"
                />
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div
                  role="alert"
                  className="border border-ink bg-surface-hover p-2 text-[11.5px] font-semibold text-ink"
                >
                  {errorMessage}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-6 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11.5px]">
              <button
                type="button"
                onClick={handleSubmit}
                className="border border-ink bg-ink px-4 py-2 font-medium text-surface hover:opacity-90 transition-opacity"
              >
                Kirim pengajuan
              </button>
              <button
                type="button"
                onClick={handleFillExample}
                className="border border-line bg-surface px-3 py-2 text-ink hover:bg-surface-hover transition-colors"
              >
                Isi contoh
              </button>
              <button
                type="button"
                onClick={handleClearForm}
                className="border border-line bg-surface px-3 py-2 text-ink-secondary hover:text-ink transition-colors"
              >
                Kosongkan
              </button>
            </div>
            <p className="mt-2 font-mono text-[10.5px] text-ink-muted">
              Pintasan: <Kbd>Ctrl</Kbd>+<Kbd>Enter</Kbd> untuk kirim, <Kbd>Esc</Kbd> kosongkan
            </p>
          </div>
        </div>

        {/* Right Column: Quota & Append-only Log (7/12) */}
        <div className="p-5 lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Quota Panel */}
            <div className="grid grid-cols-4 border border-line bg-surface divide-x divide-line font-mono text-center">
              <div className="p-3">
                <span className="block text-[10.5px] text-ink-muted uppercase">Jatah</span>
                <span className="text-[18px] font-bold text-ink">{TOTAL_QUOTA}</span>
              </div>
              <div className="p-3">
                <span className="block text-[10.5px] text-ink-muted uppercase">Terpakai</span>
                <span className="text-[18px] font-bold text-ink">{APPROVED_INITIAL}</span>
              </div>
              <div className="p-3">
                <span className="block text-[10.5px] text-ink-muted uppercase">Menunggu</span>
                <span className="text-[18px] font-bold text-ink">{pendingCutiDays}</span>
              </div>
              <div className="p-3 bg-surface-subtle">
                <span className="block text-[10.5px] text-ink-muted uppercase font-semibold">Tersedia</span>
                <span className="text-[18px] font-bold text-ink">{available}</span>
              </div>
            </div>

            {/* Log Panel */}
            <div className="mt-5">
              <div className="flex items-center justify-between border-b border-line pb-2 mb-2 font-mono text-[11px] text-ink-muted">
                <span>LOG STATUS PERIZINAN (APPEND-ONLY)</span>
                <span>{logs.length} entri</span>
              </div>

              <div className="overflow-x-auto border border-line">
                <table className="w-full text-left font-mono text-[11.5px]">
                  <thead className="border-b border-line bg-surface-subtle text-[10.5px] text-ink-muted">
                    <tr>
                      <th scope="col" className="p-2.5">Waktu (WIB)</th>
                      <th scope="col" className="p-2.5">Aktor</th>
                      <th scope="col" className="p-2.5">Aksi</th>
                      <th scope="col" className="p-2.5">Status</th>
                      <th scope="col" className="p-2.5 text-right">Opsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {logs.map((entry, idx) => {
                      const isPending = entry.status === "DIAJUKAN";
                      return (
                        <tr key={idx} className="hover:bg-surface-hover transition-colors">
                          <td className="p-2.5 whitespace-nowrap text-ink-muted text-[11px]">
                            {formatWib(Date.parse(entry.waktu), false)}
                          </td>
                          <td className="p-2.5 whitespace-nowrap font-medium text-ink">
                            {entry.aktor}
                          </td>
                          <td className="p-2.5 text-ink-secondary min-w-[200px]">
                            {entry.aksi}
                          </td>
                          <td className="p-2.5 whitespace-nowrap">
                            <StatusChip status={entry.status} />
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-right">
                            {isPending && (
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleDecision(entry.requestId, true)}
                                  className="border border-ink bg-ink px-2 py-0.5 text-[10.5px] text-surface hover:opacity-90"
                                >
                                  Setujui
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDecision(entry.requestId, false)}
                                  className="border border-line bg-surface px-2 py-0.5 text-[10.5px] text-ink hover:bg-surface-hover"
                                >
                                  Tolak
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="mt-4 font-mono text-[10.5px] text-ink-muted">
            Log hanya menambah baris. Tidak ada fungsi edit atau hapus (KLAIM: K6 audit trail).
          </p>
        </div>
      </div>
    </div>
  );
}
