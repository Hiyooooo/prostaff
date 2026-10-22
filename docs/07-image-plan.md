# 07 — Rencana Gambar (WAJIB: foto asli)

**Ketentuan pemilik:** ilustrasi suasana, orang, tempat kerja, dan objek nyata **harus berupa foto asli**. Bukan ilustrasi vektor buatan sendiri, bukan gambar AI, bukan emoji atau ikon yang dipakai sebagai gambar.

**Tetap dibuat dengan kode (bukan foto):** UI produk (jendela Library, form, tabel, log), diagram alur data, wordmark ProStaff, ikon Lucide, keycap, crosshair.

## 1. Prinsip

1. Foto **menjelaskan** audiens dan suasana kerja; foto bukan pengisi ruang.
2. **Satu gaya foto**: dokumenter alami, cahaya alami, komposisi bersih, hitam-putih seragam dari file.
3. Foto tidak boleh menyiratkan klaim palsu (pelanggan, karyawan, testimoni, produk berjalan di layar).
4. Minimalisme: subjek tunggal, ruang kosong, geometri jelas. Foto ramai dan penuh warna ditolak.

## 2. Peta Visual per Section

| Section | Visual utama | Slot foto |
|---|---|---|
| Hero | H1 tipografis + foto kolom kanan + `HeroWindow` (kode) | IMG-01 |
| Spesifikasi | strip 4 sel angka (kode) | — |
| Audiens | 4 kolom foto + teks | IMG-02, IMG-03, IMG-04, IMG-05 |
| Prinsip | tabel shortcut dengan keycap (kode) | — |
| Library | jendela 3 panel interaktif (kode) | — |
| Perizinan | form + log status (kode) | — |
| Absensi | tombol besar + log + rekap (kode) | — |
| Gaji | tabel keuangan + pratinjau CSV/PDF (kode) | — |
| Exam | lembar kasus + rubrik (kode) | — |
| Alur data | diagram 4 baris (kode) | — |
| Implementasi | langkah bernomor + foto | IMG-06 |
| FAQ | akordeon `<details>` (kurang dari satu layar saat tertutup) | — |
| CTA penutup | foto latar + overlay datar | IMG-07 |
| Footer | kolom tautan | — |

Total **7 slot foto** (minimum 6): hero 1, audiens 4, cara kerja 1, CTA penutup 1.

## 3. Tabel Slot Foto

| ID | Berkas | Section | Rasio dan ukuran (sumber min → ekspor) | Subjek dan suasana | Kata kunci (EN / ID) | Hindari | Alt (Indonesia) | Catatan komposisi |
|---|---|---|---|---|---|---|---|---|
| IMG-01 | `hero-meja-kerja.webp` | Hero | 4:5, sumber ≥ 1600×2000 → ekspor 800×1000 | Meja kerja minimalis: satu buku catatan dan secangkir kopi, cahaya jendela dari samping, laptop tertutup. Tanpa orang atau hanya tangan | `minimal desk workspace natural light notebook` / `meja kerja minimalis buku catatan cahaya alami` | Layar menyala, logo laptop terbaca, tata letak flat-lay gaya media sosial, teks terbaca di buku | Meja kerja minimalis dengan buku catatan dan secangkir kopi di bawah cahaya jendela | Subjek condong ke atas-kiri; sisakan area bawah-kiri kosong untuk chip `FOTO ILUSTRASI` |
| IMG-02 | `audiens-hukum.webp` | Audiens | 4:3, sumber ≥ 1600×1200 → ekspor 800×600 | Ruang kerja konsultan hukum: rak arsip dengan map polos dan meja berisi tumpukan dokumen | `law office archive shelves documents` / `kantor hukum rak arsip map dokumen` | Patung dewi keadilan, palu hakim, timbangan, jabat tangan, label atau teks terbaca pada map, logo | Rak arsip dan meja berisi map dokumen di ruang kerja kantor hukum | Area bawah kosong untuk chip; horizon rak lurus |
| IMG-03 | `audiens-arsitek.webp` | Audiens | 4:3, sumber ≥ 1600×1200 → ekspor 800×600 | Tangan menggambar sketsa denah di meja gambar; penggaris dan maket kertas putih | `architect sketching floor plan desk` / `arsitek sketsa denah meja gambar` | Helm proyek, pose menunjuk cetak biru, teks atau ukuran terbaca pada gambar, merek pensil | Tangan menggambar sketsa denah di atas meja gambar di studio arsitektur | Wajah tidak perlu terlihat; fokus pada tangan dan garis |
| IMG-04 | `audiens-developer.webp` | Audiens | 4:3, sumber ≥ 1600×1200 → ekspor 800×600 | Dua rekan berdiskusi di meja dengan catatan kertas; layar tidak terlihat atau mati | `software team discussing at desk paper notes` / `tim developer berdiskusi di meja catatan kertas` | Kode atau UI terbaca, hoodie "hacker", layar hijau, tim tertawa menatap laptop, papan kaca | Dua rekan kerja berdiskusi di meja dengan catatan kertas di kantor software | Sudut samping atau belakang; wajah tidak dapat dikenali |
| IMG-05 | `audiens-kantor.webp` | Audiens | 4:3, sumber ≥ 1600×1200 → ekspor 800×600 | Staf administrasi atau akuntan merapikan berkas dan kalkulator di meja kantor kecil | `accountant desk calculator papers office` / `akuntan meja kerja kalkulator berkas` | Angka atau teks terbaca di kertas, merek kalkulator, uang tunai, senyum ke kamera | Staf administrasi merapikan berkas dan kalkulator di meja kerja kantor kecil | Subjek di sepertiga kiri; area bawah kosong untuk chip |
| IMG-06 | `implementasi-rapat.webp` | Implementasi | 3:2, sumber ≥ 1800×1200 → ekspor 1200×800 | Pandangan atas meja rapat kecil: dokumen cetak, pena, dua pasang tangan menyusun berkas | `team organizing documents meeting table top view` / `rapat kecil menyusun dokumen meja pandangan atas` | Papan kaca, sticky note berwarna, jabat tangan, laptop berisi UI, teks terbaca | Dua orang menyusun dokumen cetak di meja rapat kecil, dilihat dari atas | Area tengah kosong; chip kiri bawah |
| IMG-07 | `cta-kantor-pagi.webp` | CTA penutup | 16:9, sumber ≥ 2400×1350 → ekspor 1920×1080 (turun ke 1600×900 bila > 220 KB) | Ruang kantor kosong yang rapi di pagi hari; cahaya jendela jatuh di meja dan kursi | `empty modern office morning light desks` / `ruang kantor kosong pagi cahaya jendela meja` | Orang terlihat jelas, logo, tulisan di dinding, area putih terbakar (blown-out), warna sangat mencolok | Ruang kantor kosong yang rapi dengan cahaya pagi dari jendela | Sisi kiri relatif kosong untuk H2 putih di atas overlay datar 64% |

Jangan menganggap sumber ≥ ekspor sebagai ukuran akhir: **file di `public/images/` adalah hasil ekspor**, bukan sumber.

## 4. Kriteria Foto (semua harus terpenuhi)

- Gaya dokumenter alami, cahaya alami, tanpa HDR berlebihan atau filter.
- Konteks Indonesia atau Asia Tenggara diutamakan; tempat kerja realistis dan wajar.
- **Layak hitam-putih**: kontras tonal cukup, tidak bergantung pada warna untuk terbaca; hindari foto dominan putih datar atau gelap pekat.
- Komposisi minimal: subjek tunggal, ruang kosong, garis bersih.
- **Tanpa** logo, merek, atau teks terbaca. **Tanpa** lambang negara atau instansi. **Tanpa** anak atau pasien yang dapat dikenali. **Tanpa** layar berisi UI aplikasi atau kode.
- **Tanpa** klise: jabat tangan, tim tertawa menatap laptop, pose menunjuk papan kaca, senyum korporat dipaksakan, patung dewi keadilan, palu hakim.
- Wajah, bila ada, tidak dominan dan tidak dapat dikaitkan dengan identitas tertentu.

## 5. Prosedur Perolehan (agent wajib mengikuti urutan)

1. **Cek akses jaringan.** Bila ada kunci API di env (`UNSPLASH_ACCESS_KEY`, `PEXELS_API_KEY`), gunakan API resmi. Bila tidak ada, gunakan pencarian web dan halaman sumber, lalu **unduh berkas gambar** dari sumber berlisensi. Bila jaringan atau pengunduhan tidak dimungkinkan, lompat ke §6.
2. **Kumpulkan 3 kandidat per slot.** Buka dan **lihat setiap gambar** (bukan hanya membaca judul atau deskripsi). Pilih yang paling sesuai dengan §3 dan §4; tolak kandidat yang melanggar kriteria. Jangan memilih tanpa melihat.
3. **Unduh ke penyimpanan lokal**: simpan berkas mentah di `raw-images/` (masukkan ke `.gitignore`), hasil ekspor di `public/images/`. **Dilarang hotlink.**
4. **Catat** di `public/images/CREDITS.md`, satu baris per slot: ID slot, judul foto, fotografer, URL halaman sumber, jenis lisensi, tanggal unduh, catatan model release atau orang yang tampak.
5. **Optimasi** dengan `scripts/optimize-images.mjs` (`sharp`):
   ```js
   // per slot: sharp(masukan).rotate().grayscale()
   //   .resize(lebar, tinggi, { fit: "cover", position: "attention" })
   //   .webp({ quality: 78 }).toFile(keluaran)
   // rotate() menerapkan orientasi EXIF sebelum metadata dibuang (sharp membuang EXIF secara default).
   // Bila ukuran > 220 KB, turunkan quality 4 poin sampai ≤ 220 KB.
   ```
   Hasil: hitam-putih, rasio sesuai slot, tanpa EXIF atau lokasi, ≤ 220 KB per foto, IMG-01 ≤ 220 KB (di atas lipatan ≤ 600 KB), seluruhnya ≤ 1.400 KB.
6. **Verifikasi akhir**: dimensi dan rasio berkas; `alt` ada; `sizes` benar; CLS 0; tampilan di 375, 768, 1024, 1440 px; kontras teks di atas foto (CTA penutup: overlay datar, teks putih ≥ 6.69:1).

## 6. Kondisi Terblokir (jaringan atau lisensi tidak memungkinkan)

- **Jangan** mengganti foto dengan ilustrasi buatan sendiri atau gambar AI.
- Pertahankan slot dengan **blok netral** (`PhotoSlot` merender blok `--surface-hover` dengan ID slot) agar layout tidak rusak. Atur `src: null` pada manifest.
- Tandai **BLOCKER** di laporan akhir: daftar slot kosong, kata kunci pencariannya (§3), dan permintaan agar pemilik menyediakan foto atau membuka akses jaringan.
- **Build tidak boleh gagal** karena foto belum ada.

## 7. Sumber dan Lisensi (prioritas)

1. Foto milik pemilik/klien dengan **izin tertulis**.
2. Foto berlisensi bebas komersial dari Unsplash, Pexels, atau Pixabay sesuai lisensi masing-masing (tanpa wajib atribusi).

Hindari lisensi yang mewajibkan atribusi, kecuali atribusi dipasang di halaman dan dicatat di `CREDITS.md`. Dilarang memakai foto dari sumber tanpa lisensi jelas, hasil tangkap layar, atau hasil AI. Lisensi stok umumnya tidak menjamin model release untuk setiap foto; karena itu foto dengan wajah dominan ditolak (§4) dan keterangan di §8 wajib dipasang.

## 8. Aturan Orang di Foto

- Foto tidak boleh menyiratkan bahwa orang di dalamnya adalah pelanggan, karyawan ProStaff, atau pemberi testimoni.
- **Jangan** memasangkan foto wajah dengan nama atau jabatan. Avatar di mockup UI memakai **inisial atau siluet buatan kode**, bukan foto.
- Tampilkan keterangan **"Foto ilustrasi"**: chip `FOTO ILUSTRASI` pada foto utama tiap grup (IMG-01, IMG-02 sampai IMG-05 sebagai grup dengan keterangan di bawahnya, IMG-06, IMG-07), dan satu kalimat di footer ("Foto ilustrasi.").

## 9. Integrasi Next.js

`next.config.ts` **tanpa** `remotePatterns` dan tanpa `images.domains`. Semua gambar lokal di `public/images/`.

```ts
// src/lib/images.ts
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
```

`PhotoSlot.tsx` (`ui/`), props: `id: PhotoId`, `ratio: string` (mis. `"4 / 5"`), `sizes: string`, `priority?: boolean`, `chip?: boolean`, `className?`.

- Wadah: `relative overflow-hidden border border-line` dengan `style={{ aspectRatio: ratio }}`.
- Bila `src` ada: `<Image src alt fill sizes className="object-cover" />` dengan `loading="lazy"` secara default; **hanya IMG-01** yang `priority`.
- Bila `src === null`: `<div data-photo-blocked={id}>` bg `--surface-hover`, teks mono 12px `--text-secondary` berisi ID slot.
- Chip `FOTO ILUSTRASI` (02 §6.4) bila `chip`.
- IMG-07: tambahkan lapisan `absolute inset-0` memakai token `bg-photo-overlay` (`--color-photo-overlay` di `@theme`), **datar, tanpa gradien**.

Nilai `sizes` per slot:

| Slot | `sizes` |
|---|---|
| IMG-01 | `(min-width: 1024px) 384px, 100vw` |
| IMG-02 sampai IMG-05 | `(min-width: 1024px) 288px, (min-width: 768px) 50vw, 100vw` |
| IMG-06 | `(min-width: 1024px) 552px, 100vw` |
| IMG-07 | `(min-width: 1200px) 1200px, 100vw` |

Tanpa `filter` CSS (hitam-putih sudah di berkas), tanpa bayangan, tanpa radius.

## 10. Checklist Gambar (juga dipakai di `05` §9)

- [ ] 7 slot terisi foto asli, atau slot kosong tercatat BLOCKER dengan blok netral
- [ ] Setiap foto dilihat langsung dan dipilih dari 3 kandidat; yang ditolak tidak dipakai
- [ ] Semua berkas lokal di `public/images/`; tanpa hotlink; `next.config` tanpa `remotePatterns`
- [ ] `CREDITS.md` memuat ID, judul, fotografer, URL sumber, lisensi, tanggal unduh, catatan orang
- [ ] Hitam-putih, EXIF dihapus, ≤ 220 KB per foto, seluruhnya ≤ 1.400 KB, IMG-01 di atas lipatan ≤ 600 KB
- [ ] `alt` Indonesia di setiap foto; `sizes` sesuai tabel; tanpa CLS
- [ ] Hanya IMG-01 yang `priority`; lainnya `loading="lazy"`
- [ ] Tidak ada logo, teks terbaca, lambang negara, klise, atau wajah dominan
- [ ] Chip/keterangan "Foto ilustrasi" ada di grup foto dan footer
- [ ] Teks di atas foto hanya di CTA penutup, dengan overlay datar ≥ 6.69:1
- [ ] Tidak ada ilustrasi vektor atau gambar AI sebagai pengganti foto
