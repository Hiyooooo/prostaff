import { describe, expect, it } from "vitest";
import { appendLog, availableLeave, LEAVE_LOG_SEED, validateRequest, workingDays } from "./leave";

// Test vector: docs/04 §4.4.
const LIBUR = ["2026-12-25"];

describe("workingDays", () => {
  it("Senin-Jumat inklusif tanpa libur nasional", () => {
    expect(workingDays("2026-12-21", "2026-12-25", LIBUR)).toBe(4);
    expect(workingDays("2026-11-02", "2026-11-06", [])).toBe(5);
    expect(workingDays("2026-10-24", "2026-10-25", [])).toBe(0);
    expect(workingDays("2026-12-24", "2026-12-28", LIBUR)).toBe(2);
    expect(workingDays("2026-11-02", "2026-11-13", [])).toBe(10);
  });
});

describe("availableLeave", () => {
  it("jatah dikurangi terpakai dan menunggu", () => {
    expect(availableLeave(12, 4, 0)).toBe(8);
    expect(availableLeave(12, 4, 5)).toBe(3);
    expect(availableLeave(12, 4, 8)).toBe(0);
  });
});

describe("validateRequest", () => {
  const ctx = { available: 8, holidays: LIBUR };

  it("cuti seminggu valid dengan 5 hari kerja", () => {
    expect(
      validateRequest({ type: "cuti", startIso: "2026-11-02", endIso: "2026-11-06" }, ctx),
    ).toEqual({ ok: true, days: 5 });
  });

  it("libur nasional memotong hari kerja", () => {
    expect(
      validateRequest({ type: "cuti", startIso: "2026-12-24", endIso: "2026-12-28" }, ctx),
    ).toEqual({ ok: true, days: 2 });
  });

  it("melebihi sisa cuti ditolak dengan pesan persis", () => {
    expect(
      validateRequest({ type: "cuti", startIso: "2026-11-02", endIso: "2026-11-13" }, ctx),
    ).toEqual({ ok: false, message: "Melebihi sisa cuti (8 hari)." });
  });

  it("rentang tanpa hari kerja ditolak", () => {
    expect(
      validateRequest({ type: "cuti", startIso: "2026-10-24", endIso: "2026-10-25" }, ctx),
    ).toEqual({ ok: false, message: "Rentang tanggal tidak memuat hari kerja." });
  });

  it("selesai sebelum mulai ditolak", () => {
    expect(
      validateRequest({ type: "cuti", startIso: "2026-11-06", endIso: "2026-11-02" }, ctx),
    ).toEqual({ ok: false, message: "Tanggal selesai sebelum tanggal mulai." });
  });

  it("sakit tidak memeriksa jatah cuti", () => {
    expect(
      validateRequest({ type: "sakit", startIso: "2026-11-02", endIso: "2026-11-03" }, { available: 0, holidays: [] }),
    ).toEqual({ ok: true, days: 2 });
  });

  it("tanggal kosong ditolak", () => {
    expect(validateRequest({ type: "cuti", startIso: "2026-11-02" }, ctx)).toEqual({
      ok: false,
      message: "Isi tanggal mulai dan selesai.",
    });
  });

  it("lembur valid menghasilkan 0 hari", () => {
    expect(
      validateRequest({ type: "lembur", startIso: "2026-11-02", hours: 6 }, ctx),
    ).toEqual({ ok: true, days: 0 });
  });

  it("jam lembur di luar 1..8 atau bukan bulat ditolak", () => {
    const pesan = { ok: false, message: "Jam lembur harus bilangan bulat 1 sampai 8." };
    expect(validateRequest({ type: "lembur", startIso: "2026-11-02", hours: 0 }, ctx)).toEqual(pesan);
    expect(validateRequest({ type: "lembur", startIso: "2026-11-02", hours: 9 }, ctx)).toEqual(pesan);
    expect(validateRequest({ type: "lembur", startIso: "2026-11-02", hours: 2.5 }, ctx)).toEqual(pesan);
  });
});

describe("appendLog", () => {
  it("mengembalikan array baru tanpa mengubah asli", () => {
    const seed = LEAVE_LOG_SEED;
    const hasil = appendLog(seed, {
      requestId: "r3",
      waktu: "2026-10-20T09:00:00+07:00",
      aktor: "Raka Mahendra",
      aksi: "Mengajukan izin",
      status: "DIAJUKAN",
    });
    expect(hasil).toHaveLength(5);
    expect(seed).toHaveLength(4);
  });
});
