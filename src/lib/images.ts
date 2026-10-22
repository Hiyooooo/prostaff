export type PhotoId = "IMG-01" | "IMG-02" | "IMG-03" | "IMG-04" | "IMG-05" | "IMG-06" | "IMG-07";
export type Photo = { id: PhotoId; src: string | null; alt: string; width: number; height: number };

export const PHOTOS: Record<PhotoId, Photo> = {
  "IMG-01": { id: "IMG-01", src: "/images/hero-meja-kerja.webp", alt: "Meja kerja minimalis dengan buku catatan dan secangkir kopi di bawah cahaya jendela", width: 800, height: 1000 },
  "IMG-02": { id: "IMG-02", src: "/images/audiens-hukum.webp", alt: "Rak arsip dan meja berisi map dokumen di ruang kerja kantor hukum", width: 800, height: 600 },
  "IMG-03": { id: "IMG-03", src: "/images/audiens-arsitek.webp", alt: "Tangan menggambar sketsa denah di atas meja gambar di studio arsitektur", width: 800, height: 600 },
  "IMG-04": { id: "IMG-04", src: "/images/audiens-developer.webp", alt: "Dua rekan kerja berdiskusi di meja dengan catatan kertas di kantor software", width: 800, height: 600 },
  "IMG-05": { id: "IMG-05", src: "/images/audiens-kantor.webp", alt: "Staf administrasi merapikan berkas dan kalkulator di meja kerja kantor kecil", width: 800, height: 600 },
  "IMG-06": { id: "IMG-06", src: "/images/implementasi-rapat.webp", alt: "Dua orang menyusun dokumen cetak di meja rapat kecil, dilihat dari atas", width: 1200, height: 800 },
  "IMG-07": { id: "IMG-07", src: "/images/cta-kantor-pagi.webp", alt: "Ruang kantor kosong yang rapi dengan cahaya pagi dari jendela", width: 1920, height: 1080 },
};
// Bila slot BLOCKER, ubah src menjadi null (jangan hapus entri).
