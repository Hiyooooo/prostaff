import { describe, expect, it } from "vitest";
import { ATTENDANCE_SEED, lateMs, shiftStartMs, summarize } from "./attendance";
import { formatDuration } from "./format";

// Test vector: docs/04 §5.4.
describe("shiftStartMs", () => {
  it("09:00:00.000 WIB pada tanggal WIB yang sama", () => {
    expect(shiftStartMs(1792461434382)).toBe(1792461600000);
    expect(shiftStartMs(1792494725771)).toBe(1792461600000);
    expect(shiftStartMs(1792548461020)).toBe(1792548000000);
  });
});

describe("lateMs", () => {
  it("keterlambatan relatif terhadap jam mulai shift", () => {
    expect(lateMs(1792461434382)).toBe(0);
    expect(lateMs(1792548461020)).toBe(461020);
    expect(lateMs(Date.UTC(2026, 9, 13, 2, 0, 0, 0))).toBe(0);
  });

  it("formatDuration untuk keterlambatan vektor", () => {
    expect(formatDuration(461020)).toBe("0j 7m 41dtk 20ms");
  });
});

describe("summarize", () => {
  it("rekap seed 5 hari sesuai vektor", () => {
    expect(summarize(ATTENDANCE_SEED)).toEqual({
      hadir: 5,
      terlambat: 2,
      totalLateMs: 1140142,
      totalWorkMs: 165042650,
    });
  });

  it("durasi per hari seed sesuai tabel 04 §5.3", () => {
    const durasi = ATTENDANCE_SEED.map((d) => formatDuration((d.keluarMs ?? 0) - d.masukMs));
    expect(durasi).toEqual([
      "9j 11m 18dtk 94ms",
      "9j 0m 9dtk 775ms",
      "9j 8m 55dtk 517ms",
      "9j 40m 31dtk 424ms",
      "8j 49m 47dtk 840ms",
    ]);
  });
});
