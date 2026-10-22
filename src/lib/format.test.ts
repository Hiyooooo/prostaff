import { describe, expect, it } from "vitest";
import { formatDuration, formatRupiah, formatWib } from "./format";

// Test vector: docs/04 §4.4, §5.4, §6.5.
describe("formatRupiah", () => {
  it("menulis titik ribuan tanpa Intl", () => {
    expect(formatRupiah(20691000)).toBe("Rp20.691.000");
    expect(formatRupiah(4500)).toBe("Rp4.500");
    expect(formatRupiah(0)).toBe("Rp0");
    expect(formatRupiah(40797977)).toBe("Rp40.797.977");
  });
});

describe("formatWib", () => {
  it("memformat stempel WIB dengan milidetik", () => {
    expect(formatWib(1792461434382)).toBe("2026-10-20 08:57:14.382 WIB");
  });

  it("memformat tanpa milidetik saat withMs false", () => {
    expect(formatWib(1792461434382, false)).toBe("2026-10-20 08:57:14 WIB");
  });
});

describe("formatDuration", () => {
  it("memformat durasi jam-menit-detik-milidetik", () => {
    expect(formatDuration(33291389)).toBe("9j 14m 51dtk 389ms");
    expect(formatDuration(33078094)).toBe("9j 11m 18dtk 94ms");
    expect(formatDuration(461020)).toBe("0j 7m 41dtk 20ms");
    expect(formatDuration(0)).toBe("0j 0m 0dtk 0ms");
  });
});
