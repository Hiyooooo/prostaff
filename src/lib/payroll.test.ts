import { describe, expect, it } from "vitest";
import { calculatePayroll, EMPLOYEES, overtimePay, progressiveTax } from "./payroll";

// Test vector: docs/04 §6.5.
describe("progressiveTax", () => {
  it("tarif progresif Pasal 17", () => {
    expect(progressiveTax(60000000)).toBe(3000000);
    expect(progressiveTax(60001000)).toBe(3000150);
    expect(progressiveTax(250000000)).toBe(31500000);
    expect(progressiveTax(209520000)).toBe(25428000);
    expect(progressiveTax(0)).toBe(0);
  });
});

describe("overtimePay", () => {
  it("upah tetap 10.500.000 per jam lembur", () => {
    expect(overtimePay(10500000, 1)).toBe(91040);
    expect(overtimePay(10500000, 2)).toBe(212428);
    expect(overtimePay(10500000, 6)).toBe(697977);
    expect(overtimePay(10500000, 0)).toBe(0);
  });
});

describe("calculatePayroll", () => {
  it("seluruh komponen tiga karyawan identik dengan 04 §6.5", () => {
    const [raka, laras, intan] = EMPLOYEES.map(calculatePayroll);

    expect(raka).toMatchObject({
      lembur: 0,
      bruto: 23100000,
      kes: 120000,
      jht: 420000,
      jp: 100000,
      bpjs: 640000,
      biayaJabatan: 500000,
      netoBulanan: 21960000,
      netoTahunan: 263520000,
      pkp: 209520000,
      pajakTahunan: 25428000,
      pph: 2119000,
      thp: 20691000,
    });

    expect(laras).toMatchObject({
      lembur: 697977,
      bruto: 12697977,
      kes: 105000,
      jht: 210000,
      jp: 100000,
      bpjs: 415000,
      biayaJabatan: 500000,
      netoBulanan: 11782977,
      netoTahunan: 141395724,
      pkp: 87395000,
      pajakTahunan: 7109250,
      pph: 592438,
      thp: 11690539,
    });

    expect(intan).toMatchObject({
      lembur: 0,
      bruto: 5000000,
      kes: 40000,
      jht: 80000,
      jp: 40000,
      bpjs: 160000,
      biayaJabatan: 250000,
      netoBulanan: 4590000,
      netoTahunan: 55080000,
      pkp: 1080000,
      pajakTahunan: 54000,
      pph: 4500,
      thp: 4835500,
    });
  });

  it("total bruto dan take-home sesuai 04 §6.5", () => {
    const hasil = EMPLOYEES.map(calculatePayroll);
    const bruto = hasil.reduce((a, h) => a + h.bruto, 0);
    const thp = hasil.reduce((a, h) => a + h.thp, 0);
    expect(bruto).toBe(40797977);
    expect(thp).toBe(37217039);
  });
});
