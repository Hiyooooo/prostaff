export type AttendanceDay = { masukMs: number; keluarMs?: number };
export type UpcomingStatus = "CUTI" | "LIBUR NASIONAL";

const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

// Epoch ms untuk jam WIB (UTC+7) pada tanggal tertentu.
function wibMs(y: number, mo: number, d: number, h: number, mi: number, s: number, ms: number): number {
  return Date.UTC(y, mo - 1, d, h, mi, s, ms) - WIB_OFFSET_MS;
}

// ILUSTRATIF: perusahaan, nama karyawan, angka gaji, dan log dummy. Bukan data pelanggan.
export const ATTENDANCE_SEED: AttendanceDay[] = [
  { masukMs: wibMs(2026, 10, 12, 8, 52, 3, 114), keluarMs: wibMs(2026, 10, 12, 18, 3, 21, 208) },
  { masukMs: wibMs(2026, 10, 13, 9, 0, 0, 0), keluarMs: wibMs(2026, 10, 13, 18, 0, 9, 775) },
  { masukMs: wibMs(2026, 10, 14, 9, 6, 48, 502), keluarMs: wibMs(2026, 10, 14, 18, 15, 44, 19) },
  { masukMs: wibMs(2026, 10, 15, 8, 49, 30, 907), keluarMs: wibMs(2026, 10, 15, 18, 30, 2, 331) },
  { masukMs: wibMs(2026, 10, 16, 9, 12, 11, 640), keluarMs: wibMs(2026, 10, 16, 18, 1, 59, 480) },
];

// ILUSTRATIF: cuti disetujui di Perizinan (r2) dan satu libur nasional.
export const UPCOMING_CALENDAR: { iso: string; label: UpcomingStatus }[] = [
  { iso: "2026-12-21", label: "CUTI" },
  { iso: "2026-12-22", label: "CUTI" },
  { iso: "2026-12-23", label: "CUTI" },
  { iso: "2026-12-24", label: "CUTI" },
  { iso: "2026-12-25", label: "LIBUR NASIONAL" },
];

export function shiftStartMs(ms: number): number {
  const wib = new Date(ms + WIB_OFFSET_MS);
  return Date.UTC(wib.getUTCFullYear(), wib.getUTCMonth(), wib.getUTCDate(), 9, 0, 0, 0) - WIB_OFFSET_MS;
}

// KLAIM: K3 stempel waktu milidetik menyebut resolusi penyimpanan, bukan akurasi jam perangkat.
export function lateMs(masukMs: number): number {
  return Math.max(0, masukMs - shiftStartMs(masukMs));
}

export function summarize(days: AttendanceDay[]): {
  hadir: number;
  terlambat: number;
  totalLateMs: number;
  totalWorkMs: number;
} {
  let terlambat = 0;
  let totalLateMs = 0;
  let totalWorkMs = 0;
  for (const d of days) {
    const l = lateMs(d.masukMs);
    if (l > 0) {
      terlambat += 1;
      totalLateMs += l;
    }
    if (d.keluarMs !== undefined) totalWorkMs += d.keluarMs - d.masukMs;
  }
  return { hadir: days.length, terlambat, totalLateMs, totalWorkMs };
}
