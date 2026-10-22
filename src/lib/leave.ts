export type LeaveType = "cuti" | "sakit" | "lembur";
export type LeaveRequest = { type: LeaveType; startIso?: string; endIso?: string; hours?: number };
export type ValidationContext = { available: number; holidays: string[] };
export type ValidationResult = { ok: true; days: number } | { ok: false; message: string };
export type LeaveStatus = "DIAJUKAN" | "DISETUJUI" | "DITOLAK";
export type LogEntry = { requestId: string; waktu: string; aktor: string; aksi: string; status: LeaveStatus };

// ILUSTRATIF: hanya satu libur untuk demo.
export const HOLIDAYS = ["2026-12-25"];

// ILUSTRATIF: perusahaan, nama karyawan, angka gaji, dan log dummy. Bukan data pelanggan.
export const LEAVE_LOG_SEED: LogEntry[] = [
  {
    requestId: "r1",
    waktu: "2026-10-14T17:30:12+07:00",
    aktor: "Laras Wulandari",
    aksi: "Mengajukan lembur 6 jam pada 2026-10-14",
    status: "DIAJUKAN",
  },
  {
    requestId: "r1",
    waktu: "2026-10-15T08:12:40+07:00",
    aktor: "Bima Santoso",
    aksi: "Menyetujui lembur Laras Wulandari",
    status: "DISETUJUI",
  },
  {
    requestId: "r2",
    waktu: "2026-10-16T10:20:05+07:00",
    aktor: "Raka Mahendra",
    aksi: "Mengajukan cuti 2026-12-21 sampai 2026-12-25 (4 hari kerja)",
    status: "DIAJUKAN",
  },
  {
    requestId: "r2",
    waktu: "2026-10-16T14:02:33+07:00",
    aktor: "Bima Santoso",
    aksi: "Menyetujui cuti Raka Mahendra",
    status: "DISETUJUI",
  },
];

const DAY_MS = 24 * 60 * 60 * 1000;

function toUtcMs(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function workingDays(startIso: string, endIso: string, holidays: string[]): number {
  const start = toUtcMs(startIso);
  const end = toUtcMs(endIso);
  if (end < start) return 0;
  let n = 0;
  for (let t = start; t <= end; t += DAY_MS) {
    const day = new Date(t).getUTCDay();
    if (day === 0 || day === 6) continue;
    if (holidays.includes(new Date(t).toISOString().slice(0, 10))) continue;
    n += 1;
  }
  return n;
}

export function availableLeave(total: number, approved: number, pending: number): number {
  return total - approved - pending;
}

export function validateRequest(req: LeaveRequest, ctx: ValidationContext): ValidationResult {
  const { type, startIso, endIso, hours } = req;
  if (type === "cuti" || type === "sakit") {
    if (!startIso || !endIso) return { ok: false, message: "Isi tanggal mulai dan selesai." };
    if (toUtcMs(endIso) < toUtcMs(startIso)) {
      return { ok: false, message: "Tanggal selesai sebelum tanggal mulai." };
    }
    const days = workingDays(startIso, endIso, ctx.holidays);
    if (days === 0) return { ok: false, message: "Rentang tanggal tidak memuat hari kerja." };
    if (type === "cuti" && days > ctx.available) {
      return { ok: false, message: `Melebihi sisa cuti (${ctx.available} hari).` };
    }
    return { ok: true, days };
  }
  if (!startIso) return { ok: false, message: "Isi tanggal mulai dan selesai." };
  if (hours === undefined || !Number.isInteger(hours) || hours < 1 || hours > 8) {
    return { ok: false, message: "Jam lembur harus bilangan bulat 1 sampai 8." };
  }
  return { ok: true, days: 0 };
}

// Log hanya menambah entri: tidak ada fungsi sunting atau hapus. // KLAIM: K6
export function appendLog(log: LogEntry[], entry: LogEntry): LogEntry[] {
  return [...log, entry];
}
