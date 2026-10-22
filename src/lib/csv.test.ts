import { describe, expect, it } from "vitest";
import { calculatePayroll, EMPLOYEES } from "./payroll";
import { toCsv } from "./csv";

// Test vector: docs/04 §6.5.
describe("toCsv", () => {
  it("mengutip sel yang memuat koma", () => {
    expect(
      toCsv([
        ["nama", "thp"],
        ["Sari, Dewi", 100],
      ]),
    ).toBe('nama,thp\n"Sari, Dewi",100');
  });

  it("menggandakan tanda kutip di dalam sel", () => {
    expect(toCsv([['a"b']])).toBe('"a""b"');
  });

  it("tanpa baris kosong di akhir", () => {
    expect(toCsv([["a"], ["b"]])).toBe("a\nb");
  });
});

describe("pratinjau CSV payroll", () => {
  it("4 baris persis 04 §6.5", () => {
    const rows: (string | number)[][] = [
      ["nama", "pokok", "jabatan", "tunjangan", "lembur", "bruto", "bpjs", "pph21", "reimburse", "thp"],
    ];
    for (const e of EMPLOYEES) {
      const h = calculatePayroll(e);
      rows.push([
        e.nama,
        e.pokok,
        e.jabatan,
        e.transport + e.makan,
        h.lembur,
        h.bruto,
        h.bpjs,
        h.pph,
        e.reimbursement,
        h.thp,
      ]);
    }
    expect(toCsv(rows)).toBe(
      "nama,pokok,jabatan,tunjangan,lembur,bruto,bpjs,pph21,reimburse,thp\n" +
        "Raka Mahendra,18000000,3000000,2100000,0,23100000,640000,2119000,350000,20691000\n" +
        "Laras Wulandari,9000000,1500000,1500000,697977,12697977,415000,592438,0,11690539\n" +
        "Intan Safitri,4000000,0,1000000,0,5000000,160000,4500,0,4835500",
    );
  });
});
