import { describe, expect, it } from "vitest";
import { breadcrumb, countByRoot, DOCS, progressPercent, searchDocs } from "./library";

// Test vector: docs/04 §3.4.
describe("searchDocs", () => {
  it("dokumen -> d4:5, d6:1, d8:1", () => {
    expect(searchDocs("dokumen", DOCS)).toEqual([
      { id: "d4", score: 5 },
      { id: "d6", score: 1 },
      { id: "d8", score: 1 },
    ]);
  });

  it("cuti -> d2:6", () => {
    expect(searchDocs("cuti", DOCS)).toEqual([{ id: "d2", score: 6 }]);
  });

  it("kebijakan -> d7:5, d4:2, d8:2 (seri diurut id)", () => {
    expect(searchDocs("kebijakan", DOCS)).toEqual([
      { id: "d7", score: 5 },
      { id: "d4", score: 2 },
      { id: "d8", score: 2 },
    ]);
  });

  it("klien -> d3:1, d4:1", () => {
    expect(searchDocs("klien", DOCS)).toEqual([
      { id: "d3", score: 1 },
      { id: "d4", score: 1 },
    ]);
  });

  it("kata tak dikenal dan spasi menghasilkan kosong", () => {
    expect(searchDocs("xyz", DOCS)).toEqual([]);
    expect(searchDocs("   ", DOCS)).toEqual([]);
  });

  it("tidak peka huruf besar-kecil", () => {
    expect(searchDocs("DOKUMEN", DOCS)).toEqual(searchDocs("dokumen", DOCS));
  });
});

describe("breadcrumb", () => {
  it("memecah jalur per folder", () => {
    expect(breadcrumb("Hukum/Kebijakan/Retensi Dokumen")).toEqual([
      "Hukum",
      "Kebijakan",
      "Retensi Dokumen",
    ]);
  });
});

describe("countByRoot", () => {
  it("menghitung dokumen per folder level 1", () => {
    expect(countByRoot(DOCS)).toEqual({ Hukum: 2, Operasional: 2, SDM: 2, Teknik: 2 });
  });
});

describe("progressPercent", () => {
  it("menghitung persen pembulatan terdekat", () => {
    expect(progressPercent(2, 4)).toBe(50);
    expect(progressPercent(0, 4)).toBe(0);
    expect(progressPercent(4, 4)).toBe(100);
    expect(progressPercent(1, 3)).toBe(33);
    expect(progressPercent(0, 0)).toBe(0);
  });
});
