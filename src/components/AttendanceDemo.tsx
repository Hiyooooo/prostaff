"use client";

import { useState, useRef } from "react";
import { Fingerprint, RotateCcw } from "lucide-react";
import {
  AttendanceDay,
  ATTENDANCE_SEED,
  UPCOMING_CALENDAR,
  lateMs,
  summarize,
} from "@/lib/attendance";
import { formatWib, formatDuration } from "@/lib/format";
import { StatusChip } from "@/components/ui/StatusChip";
import { cn } from "@/lib/cn";

export interface AttendanceDemoProps {
  now?: () => number;
}

export function AttendanceDemo({ now = Date.now }: AttendanceDemoProps) {
  const [days, setDays] = useState<AttendanceDay[]>(ATTENDANCE_SEED);
  const [currentClockIn, setCurrentClockIn] = useState<number | null>(null);
  const [liveMessage, setLiveMessage] = useState<string>("");

  const clockBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const summary = summarize(days);
  const isClockedIn = currentClockIn !== null;

  const handleToggleClock = () => {
    const timestamp = now();
    if (!isClockedIn) {
      // Clock in
      setCurrentClockIn(timestamp);
      const isLate = lateMs(timestamp) > 0;
      const formatted = formatWib(timestamp, true);
      const msg = `Masuk dicatat pukul ${formatted}${isLate ? " (TERLAMBAT)" : ""}`;
      setLiveMessage(msg);
    } else {
      // Clock out
      const newDay: AttendanceDay = {
        masukMs: currentClockIn,
        keluarMs: timestamp,
      };
      setDays((prev) => [...prev, newDay]);
      setCurrentClockIn(null);
      const formatted = formatWib(timestamp, true);
      const duration = formatDuration(timestamp - currentClockIn);
      setLiveMessage(`Keluar dicatat pukul ${formatted}. Durasi kerja: ${duration}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Space toggles clock when focusing container
    if (e.key === " " && document.activeElement !== clockBtnRef.current) {
      e.preventDefault();
      handleToggleClock();
    }
  };

  const handleReset = () => {
    setDays(ATTENDANCE_SEED);
    setCurrentClockIn(null);
    setLiveMessage("Demo absensi direset ke data awal");
  };

  // Build log list (seed days + active session)
  const logs = days.flatMap((d) => {
    const items = [
      {
        time: d.masukMs,
        event: "Masuk",
        isLate: lateMs(d.masukMs) > 0,
      },
    ];
    if (d.keluarMs !== undefined) {
      items.push({
        time: d.keluarMs,
        event: "Keluar",
        isLate: false,
      });
    }
    return items;
  });

  if (currentClockIn !== null) {
    logs.push({
      time: currentClockIn,
      event: "Masuk (Sesi Aktif)",
      isLate: lateMs(currentClockIn) > 0,
    });
  }

  // Sort logs descending by timestamp
  logs.sort((a, b) => b.time - a.time);

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Demo interaktif modul Absensi"
      className="mt-8 border border-line bg-surface text-ink outline-none focus-visible:ring-1 focus-visible:ring-line-mid"
    >
      {/* Title Bar */}
      <div className="flex h-10 items-center justify-between border-b border-line px-4 font-mono text-[11px] text-ink-muted">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="inline-block h-2 w-2 border border-line-mid" />
          <span className="ml-2 font-mono text-ink">prostaff.example / absensi</span>
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

      {/* Content Layout */}
      <div className="grid grid-cols-1 divide-y divide-line lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        {/* Left Column: Clock Button & Quick Status (5/12) */}
        <div className="p-5 lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-2 mb-4 font-mono text-[11px] text-ink-muted">
              <span>PRESENSI GEOFENCE</span>
              <span>Raka Mahendra</span>
            </div>

            {/* Context Chips */}
            <div className="flex flex-wrap gap-2 mb-4 font-mono text-[11px]">
              <span className="border border-line bg-surface-subtle px-2 py-1 text-ink-secondary">
                Geofence: radius 150 m (simulasi)
              </span>
              <span className="border border-line bg-surface-subtle px-2 py-1 text-ink-secondary">
                Shift: 09:00-18:00 WIB
              </span>
            </div>

            {/* Big 96px Clock-In/Out Button */}
            <button
              ref={clockBtnRef}
              type="button"
              onClick={handleToggleClock}
              className={cn(
                "w-full h-24 border flex items-center justify-between px-6 transition-colors font-sans select-none",
                isClockedIn
                  ? "border-primary bg-surface text-ink hover:bg-surface-hover"
                  : "border-primary bg-primary text-primary-text hover:opacity-90"
              )}
            >
              <div className="flex items-center gap-4 text-left">
                <Fingerprint className="h-10 w-10 shrink-0" strokeWidth={1.5} />
                <div>
                  <span className="block text-[22px] font-bold leading-none">
                    {isClockedIn ? "Keluar" : "Masuk"}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] text-ink-muted">
                    Tekan Space atau klik untuk mencatat
                  </span>
                </div>
              </div>
              <div className="text-right font-mono text-[11px]">
                <span className="block text-ink-muted">Status</span>
                <span className="font-semibold text-[13px]">
                  {isClockedIn ? "Bekerja" : "Belum Masuk"}
                </span>
              </div>
            </button>

            {/* Live Message feedback banner */}
            {liveMessage && (
              <div
                role="status"
                className="mt-4 border border-line bg-surface-subtle p-3 font-mono text-[11.5px] text-ink"
              >
                {liveMessage}
              </div>
            )}
          </div>

          {/* Upcoming Calendar with StatusChip */}
          <div className="mt-6 border-t border-line pt-4">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-2">
              Kalender Mendatang
            </span>
            <div className="space-y-1.5 font-mono text-[11.5px]">
              {UPCOMING_CALENDAR.map((cal) => (
                <div
                  key={cal.iso}
                  className="flex items-center justify-between border border-line bg-surface p-2"
                >
                  <span className="text-ink">{cal.iso}</span>
                  <StatusChip status={cal.label} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recap & Millisecond Log (7/12) */}
        <div className="p-5 lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* 4 Recap Numbers from summarize() */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border border-line bg-surface divide-y sm:divide-y-0 sm:divide-x divide-line font-mono text-center">
              <div className="p-3">
                <span className="block text-[10.5px] text-ink-muted uppercase">Hadir</span>
                <span className="text-[20px] font-bold text-ink">{summary.hadir}</span>
              </div>
              <div className="p-3">
                <span className="block text-[10.5px] text-ink-muted uppercase">Terlambat</span>
                <span className="text-[20px] font-bold text-ink">{summary.terlambat}</span>
              </div>
              <div className="p-3">
                <span className="block text-[10.5px] text-ink-muted uppercase">Keterlambatan</span>
                <span className="text-[12.5px] font-bold text-ink truncate block">
                  {formatDuration(summary.totalLateMs)}
                </span>
              </div>
              <div className="p-3 bg-surface-subtle">
                <span className="block text-[10.5px] text-ink-muted uppercase font-semibold">
                  Total Kerja
                </span>
                <span className="text-[12.5px] font-bold text-ink truncate block">
                  {formatDuration(summary.totalWorkMs)}
                </span>
              </div>
            </div>

            {/* Millisecond Log Table */}
            <div className="mt-5">
              <div className="flex items-center justify-between border-b border-line pb-2 mb-2 font-mono text-[11px] text-ink-muted">
                <span>HISTORI PRESENSI (STEMPEL MILIDETIK WIB)</span>
                <span>{logs.length} catatan</span>
              </div>

              <div className="overflow-x-auto border border-line max-h-[300px]">
                <table className="w-full text-left font-mono text-[11.5px]">
                  <thead className="border-b border-line bg-surface-subtle text-[10.5px] text-ink-muted sticky top-0">
                    <tr>
                      <th scope="col" className="p-2.5">Stempel Waktu (WIB)</th>
                      <th scope="col" className="p-2.5">Peristiwa</th>
                      <th scope="col" className="p-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {logs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-surface-hover transition-colors">
                        <td className="p-2.5 whitespace-nowrap text-ink">
                          {formatWib(log.time, true)}
                        </td>
                        <td className="p-2.5 whitespace-nowrap text-ink-secondary">
                          {log.event}
                        </td>
                        <td className="p-2.5 whitespace-nowrap text-right">
                          {log.isLate ? (
                            <StatusChip status="TERLAMBAT" />
                          ) : (
                            <span className="border border-line bg-surface px-1.5 py-0.5 text-[10.5px] text-ink-muted">
                              Tepat Waktu
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="mt-4 font-mono text-[10.5px] text-ink-muted">
            Presensi tanpa akses lokasi perangkat keras. Log disimpan dengan stempel waktu UTC+07:00 (WIB) berpresisi milidetik.
          </p>
        </div>
      </div>
    </div>
  );
}
