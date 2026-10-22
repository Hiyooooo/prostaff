// SEDERHANA: subset markdown untuk demo (h1, h2, butir, paragraf, **tebal**).
export type Block = { t: "h1" | "h2" | "p" | "li"; x: string };

export function parseMarkdown(src: string): Block[] {
  const out: Block[] = [];
  let paragraf: string[] = [];
  const flush = () => {
    if (paragraf.length > 0) {
      out.push({ t: "p", x: paragraf.join(" ") });
      paragraf = [];
    }
  };
  for (const line of src.split("\n")) {
    const s = line.trim();
    if (s.startsWith("# ")) {
      flush();
      out.push({ t: "h1", x: s.slice(2) });
    } else if (s.startsWith("## ")) {
      flush();
      out.push({ t: "h2", x: s.slice(3) });
    } else if (s.startsWith("- ")) {
      flush();
      out.push({ t: "li", x: s.slice(2) });
    } else if (s === "") {
      flush();
    } else {
      paragraf.push(s);
    }
  }
  flush();
  return out;
}

export type Inline = string | { b: string };

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  const re = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null = re.exec(text);
  while (m !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push({ b: m[1] });
    last = m.index + m[0].length;
    m = re.exec(text);
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
