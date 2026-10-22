export type DocKind = "sop" | "kursus";

export type Doc = {
  id: string;
  path: string;
  title: string;
  kind: DocKind;
  summary: string;
  markdown: string;
  steps?: string[];
};

// ILUSTRATIF: perusahaan, nama karyawan, angka gaji, dan log dummy. Bukan data pelanggan.
export const DOCS: Doc[] = [
  {
    id: "d1",
    path: "Operasional/SOP/Onboarding Karyawan",
    title: "Onboarding Karyawan",
    kind: "kursus",
    summary: "Langkah hari pertama laptop akun dan akses repositori",
    markdown: `# Onboarding Karyawan

Langkah hari pertama laptop akun dan akses repositori.

## Langkah
- Ambil laptop dan akun
- Atur akses repositori dan folder bersama
- Baca SOP Pengajuan Cuti
- Isi presensi pertama`,
    steps: [
      "Ambil laptop dan akun",
      "Atur akses repositori dan folder bersama",
      "Baca SOP Pengajuan Cuti",
      "Isi presensi pertama",
    ],
  },
  {
    id: "d2",
    path: "Operasional/SOP/Pengajuan Cuti",
    title: "Pengajuan Cuti",
    kind: "sop",
    summary: "Cuti diajukan lewat form perizinan dan disetujui atasan langsung",
    markdown: `# Pengajuan Cuti

Cuti diajukan lewat form **Perizinan** dan disetujui atasan langsung.

## Langkah
- Buka form Perizinan dan pilih jenis Cuti
- Isi tanggal mulai dan tanggal selesai
- Kirim dengan Ctrl + Enter

## Aturan
- Hari kerja dihitung tanpa akhir pekan dan libur nasional
- Pengajuan yang melebihi sisa cuti ditolak otomatis`,
  },
  {
    id: "d3",
    path: "Hukum/Template/Perjanjian Kerahasiaan",
    title: "Perjanjian Kerahasiaan",
    kind: "sop",
    summary: "Template NDA untuk klien dan karyawan baru",
    markdown: `# Perjanjian Kerahasiaan

Template NDA untuk klien dan karyawan baru.

## Aturan
- Ganti nama pihak sebelum dokumen dikirim
- Simpan versi final di folder Hukum`,
  },
  {
    id: "d4",
    path: "Hukum/Kebijakan/Retensi Dokumen",
    title: "Retensi Dokumen",
    kind: "sop",
    summary: "Arsip berkas klien disimpan lima tahun setelah perkara selesai",
    markdown: `# Retensi Dokumen

Arsip berkas klien disimpan lima tahun setelah perkara selesai.

## Aturan
- Hitung retensi sejak perkara ditutup
- Musnahkan berkas dengan berita acara`,
  },
  {
    id: "d5",
    path: "Teknik/Standar/Review Kode",
    title: "Review Kode",
    kind: "sop",
    summary: "Setiap pull request ditinjau satu rekan sebelum merge",
    markdown: `# Review Kode

Setiap pull request ditinjau satu rekan sebelum merge.

## Langkah
- Buka pull request dengan deskripsi singkat
- Minta tinjauan satu rekan sebelum merge`,
  },
  {
    id: "d6",
    path: "Teknik/Standar/Penamaan Berkas",
    title: "Penamaan Berkas",
    kind: "sop",
    summary: "Gunakan huruf kecil dan tanda hubung untuk dokumen gambar kerja",
    markdown: `# Penamaan Berkas

Gunakan huruf kecil dan tanda hubung untuk dokumen gambar kerja.

## Aturan
- Hindari spasi pada nama berkas
- Tambahkan tanggal revisi di akhir nama`,
  },
  {
    id: "d7",
    path: "SDM/Kebijakan/Lembur",
    title: "Kebijakan Lembur",
    kind: "sop",
    summary: "Lembur wajib disetujui sebelum dikerjakan lewat modul perizinan",
    markdown: `# Kebijakan Lembur

Lembur wajib disetujui sebelum dikerjakan lewat modul perizinan.

## Langkah
- Ajukan lembur lewat form Perizinan sebelum jam kerja tambahan dimulai
- Lampirkan alasan lembur pada form`,
  },
  {
    id: "d8",
    path: "SDM/Kebijakan/Kerja Jarak Jauh",
    title: "Kerja Jarak Jauh",
    kind: "sop",
    summary: "Presensi tetap dicatat dan dokumen sensitif tidak dibawa keluar",
    markdown: `# Kerja Jarak Jauh

Presensi tetap dicatat dan dokumen sensitif tidak dibawa keluar.

## Aturan
- Catat masuk dan keluar seperti hari kantor
- Simpan dokumen sensitif di folder terkunci`,
  },
];

// SEDERHANA: pencarian hanya judul, jalur, dan summary (bukan seluruh isi markdown).
export function searchDocs(query: string, docs: Doc[]): { id: string; score: number }[] {
  const q = query.trim().toLowerCase();
  if (q === "") return [];
  return docs
    .map((d) => {
      let score = 0;
      if (d.title.toLowerCase().includes(q)) score += 3;
      if (d.path.toLowerCase().includes(q)) score += 2;
      if (d.summary.toLowerCase().includes(q)) score += 1;
      return { id: d.id, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}

export function breadcrumb(path: string): string[] {
  return path.split("/");
}

export function countByRoot(docs: Doc[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const d of docs) {
    const root = d.path.split("/")[0];
    out[root] = (out[root] ?? 0) + 1;
  }
  return out;
}

export function progressPercent(done: number, total: number): number {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}
