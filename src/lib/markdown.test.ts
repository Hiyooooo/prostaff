import { describe, expect, it } from "vitest";
import { parseInline, parseMarkdown } from "./markdown";

// Test vector: docs/04 §3.4.
describe("parseMarkdown", () => {
  it("mengenali h1, paragraf, h2, dan butir sesuai urutan", () => {
    const src = `# Kebijakan Lembur

Lembur wajib disetujui **sebelum** dikerjakan.

## Alur
- Ajukan lewat form
- Atasan menyetujui`;
    expect(parseMarkdown(src)).toEqual([
      { t: "h1", x: "Kebijakan Lembur" },
      { t: "p", x: "Lembur wajib disetujui **sebelum** dikerjakan." },
      { t: "h2", x: "Alur" },
      { t: "li", x: "Ajukan lewat form" },
      { t: "li", x: "Atasan menyetujui" },
    ]);
  });

  it("menggabung baris paragraf berurutan dengan spasi", () => {
    expect(parseMarkdown("baris satu\nbaris dua")).toEqual([
      { t: "p", x: "baris satu baris dua" },
    ]);
  });
});

describe("parseInline", () => {
  it("memecah **tebal** menjadi tiga potongan", () => {
    expect(parseInline("Lembur wajib disetujui **sebelum** dikerjakan.")).toEqual([
      "Lembur wajib disetujui ",
      { b: "sebelum" },
      " dikerjakan.",
    ]);
  });

  it("mengembalikan satu string utuh bila tanpa tebal", () => {
    expect(parseInline("tanpa tebal")).toEqual(["tanpa tebal"]);
  });
});
