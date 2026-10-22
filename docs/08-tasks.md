# 08 — Rencana Tugas (Task Breakdown)

Turunan langsung dari `AGENTS.md` §8 dan dokumen `01` sampai `07`. **Urutan fase mengikat**: setiap fase hanya dimulai bila fase sebelumnya hijau. Centang satu per satu. Bila satu tugas gagal, jangan lanjut ke fase berikutnya.

Status: `[ ]` belum · `[x]` selesai · `[!]` terblokir (catat alasannya di laporan)

---

## Ringkasan Fase

| Fase | Nama                     | Keluaran                              | Gerbang keluar                                          |
| ---- | ------------------------ | ------------------------------------- | ------------------------------------------------------- |
| T0   | Persiapan dan inventaris | catatan kondisi awal                  | folder bersih, dependensi diketahui                     |
| T1   | Scaffold dan toolchain   | proyek Next.js berjalan               | `dev` menyala, `typecheck` hijau                        |
| T2   | Fondasi visual           | `globals.css` + `ui/`                 | semua token terpakai, tanpa hex liar                    |
| T3   | Logika murni + unit test | `src/lib/*.ts` + `*.test.ts`          | semua test vector `04` lulus                            |
| T4   | Section statis           | Navbar sampai Footer tanpa demo       | halaman utuh, urutan `03` benar                         |
| T5   | Lima demo interaktif     | `*Demo.tsx`                           | skenario verifikasi `04` §3.5, 4.5, 5.5, 6.6, 7.4 lolos |
| T6   | Foto                     | `public/images/*.webp` + `CREDITS.md` | 7 slot terisi, ≤ 220 KB, grayscale                      |
| T7   | SEO, OG, JSON-LD         | metadata + `opengraph-image`          | `<head>` lengkap, OG 1200×630                           |
| T8   | Audit dan QA             | hasil audit                           | audit `06` §8 bersih, Lighthouse ≥ 90                   |
| T9   | Laporan akhir            | laporan format `05` §10               | DoD `AGENTS.md` §9 tercentang                           |

---

## T0 — Persiapan dan Inventaris

- [x] T0.1 Konfirmasi root proyek: `D:\Coding\Akarindo\10 Website\07-prostaff-hris`. Semua perintah dijalankan dari sini.
- [x] T0.2 Periksa status git. Folder ini sudah `git init` mandiri (belum ada commit); pada percobaan sebelumnya sempat menumpang working tree repo induk `hris-website-management` (branch `hiyoo`). Konfirmasi pemilik: repo mandiri atau lebur ke repo induk. **Keputusan pemilik (21 Okt 2026): repo mandiri**; pemilik akan membuat repo baru khusus ProStaff, remote menyusul.
- [x] T0.3 Baca ulang `AGENTS.md` dan seluruh `docs/01` sampai `07`. Catat 5 baris pemahaman di laporan.
- [x] T0.4 Verifikasi aset foto yang sudah disediakan pemilik (7 berkas di `public/images/`). Lihat T6 untuk kondisi detail. Catatan (21 Okt 2026): 7 foto ada di `prostaff-hris-assets/assets/img/` sebagai JPEG grayscale (components 1), semua ≤ 220 KB; `public/images/` masih kosong. Tabel "kondisi awal" T6 di bawah tidak cocok dengan berkas aktual (lihat catatan di sana).
- [x] T0.5 Pastikan Node.js dan npm tersedia (`node -v`, `npm -v`). Catat versinya.

---

## T1 — Scaffold dan Toolchain

- [x] T1.1 Scaffold Next.js 16.4.2 App Router + TypeScript + Tailwind v4 + `src/` di direktori saat ini. Scaffold CLI menolak direktori berisi `AGENTS.md` dan `public/`, jadi dibuat di folder sementara lalu disalin tanpa menimpa aset atau dokumen.
- [x] T1.2 Pasang dependensi runtime: `lucide-react`, `clsx`, `tailwind-merge`.
- [x] T1.3 Pasang devDependency: `vitest@^3`, `sharp`, `@fontsource/geist-mono`. Vitest versi terbaru menolak peer `@types/node@20`; gunakan major 3 agar tanpa memaksa peer.
- [x] T1.4 `tsconfig.json`: `strict: true`, path alias `@/*` → `./src/*`.
- [x] T1.5 `vitest.config.ts`: environment `node`, pola `src/lib/**/*.test.ts`.
- [x] T1.6 `package.json` scripts: `dev`, `build`, `start`, `typecheck` (`tsc --noEmit`), `lint`, `test` (`vitest run`).
- [x] T1.7 `next.config.ts`: tanpa `remotePatterns`, tanpa `images.domains`.
- [x] T1.8 Hapus boilerplate bawaan (aset contoh, CSS default, halaman contoh).
- [x] T1.9 Typecheck dan lint hijau. Catatan: `npm run test` baru hijau setelah berkas test T3 ada.

---

## T2 — Fondasi Visual

Rujukan: `02` §2 sampai §10.

- [x] T2.1 `globals.css`: seluruh token `:root` dari `02` §2 apa adanya (satu-satunya tempat hex bersama `brand.ts`).
- [x] T2.2 `globals.css`: blok `@theme inline` dari `02` §10, termasuk `--color-photo-overlay`, `--radius-control`, `--radius-key`.
- [x] T2.3 `globals.css`: `:focus-visible` global, `.on-inverse :focus-visible`, media `prefers-reduced-motion` (`02` §9).
- [x] T2.4 `layout.tsx`: `Geist` + `Geist_Mono` via `next/font/google` dengan variabel `--font-geist-sans` / `--font-geist-mono`, `display: "swap"`, `<html lang="id">`. Keduanya tersedia di Next 16.4.2, jadi paket `geist` tidak dipakai.
- [x] T2.5 `lib/cn.ts`: `clsx` + `tailwind-merge`.
- [x] T2.6 `lib/brand.ts`: konstanta `BRAND` dari `05` §1.
- [x] T2.7 `lib/site.ts`: `SITE`, `CONTACT_MAILTO`, `QUESTION_MAILTO` dari `05` §1 (title 56 karakter, description 103 karakter).
- [x] T2.8 Komponen `ui/`:
  - [x] `Button.tsx` — varian primer/sekunder/tautan × terang/hitam, tinggi 40/48, radius 2px, fokus outline (`02` §6.1). Diekspor sebagai `Button` (elemen `button`) dan `ButtonLink` (elemen `a`).
  - [x] `Kbd.tsx` — `<kbd>` dengan varian terang/hitam (`02` §6.5).
  - [x] `StatusChip.tsx` — 8 status, teks + ikon + gaya garis, tanpa warna (`02` §6.6).
  - [x] `Chip.tsx` — chip info (`02` §6.4).
  - [x] `SectionHeader.tsx` — eyebrow `prostaff / {section}` + H2 + lead.
  - [x] `Crosshair.tsx` — tanda `+` dari dua `span`, `aria-hidden`, hanya ≥ 768px (`02` §4.1).
  - [x] `Logo.tsx` — kotak 12×12 + wordmark, varian terang/hitam (`02` §6.8).
  - [x] `DataTable.tsx` — `<table>` + `<caption class="sr-only">` + `<th scope>`, wadah `overflow-x-auto` fokusable (`02` §6.9). Diekspor sebagai `DataTable` + `Th` + `Td`.
  - [x] `PhotoSlot.tsx` — kerangka dibuat; finalisasi (blok BLOCKER, chip, overlay) diverifikasi di T6.7.
- [x] T2.9 Pembungkus halaman: `max-w-[1200px]`, `border-x` 1px `--line` (hilang < 768px), padding horizontal 24/16px (`02` §4.1). Dipasang di `layout.tsx`. Implementasi: komponen `ui/Shell.tsx` dipasang per section (pola prototipe) supaya latar pita bisa bleed penuh; padding 20/32/40 px dan rel hilang ≤ 700px mengikuti `02` §4 dan `prostaff.css`.
- [x] T2.10 Gerbang: `typecheck`, `lint`, dan `build` hijau; grep hex di luar `globals.css` dan `brand.ts` tanpa hasil; grep palet Tailwind default tanpa hasil.

---

## T3 — Logika Murni dan Unit Test (TDD)

**Aturan**: tulis test lebih dulu dari tabel test vector `04`, lalu implementasikan sampai hijau. Setiap berkas `lib/` punya satu berkas test.

- [x] T3.1 `lib/format.ts` + test
  - `formatRupiah` (manual, tanpa `Intl`): `20691000` → `Rp20.691.000`
  - `formatWib(ms, withMs = true)`: zona tetap UTC+7, `1792461434382` → `2026-10-20 08:57:14.382 WIB`
  - `formatDuration(ms)`: `33291389` → `9j 14m 51dtk 389ms`
  - Vektor: `04` §4.4, §5.4, §6.5
- [x] T3.2 `lib/library.ts` + test
  - Data seed 8 dokumen d1..d8 (`04` §3.3), termasuk `markdown` d2 persis dan 4 langkah kursus d1
  - `searchDocs`: vektor `dokumen` → d4:5, d6:1, d8:1; `cuti` → d2:6; `kebijakan` → d7:5, d4:2, d8:2; `klien` → d3:1, d4:1; `xyz` kosong; spasi kosong; huruf besar = huruf kecil
  - `breadcrumb`, `countByRoot` (`{Hukum:2, Operasional:2, SDM:2, Teknik:2}`), `progressPercent` (5 vektor)
- [x] T3.3 `lib/markdown.ts` + test
  - `parseMarkdown`: vektor `04` §3.4 (5 elemen, urutan persis)
  - `parseInline`: `**sebelum**` → 3 potongan
  - Komentar `// SEDERHANA: subset markdown untuk demo`
- [x] T3.4 `lib/leave.ts` + test
  - `workingDays`: 5 vektor (termasuk Sabtu-Minggu = 0, libur 12-25)
  - `availableLeave`: 3 vektor
  - `validateRequest`: 11 vektor, pesan error persis huruf per huruf
  - `appendLog`: imutabel (seed tetap 4, hasil 5)
  - Data seed log r1/r2 (`04` §4.3) dan `HOLIDAYS = ["2026-12-25"]`
- [x] T3.5 `lib/attendance.ts` + test
  - `shiftStartMs`: 3 vektor
  - `lateMs`: 3 vektor
  - `summarize(seed 5 hari)` → `{ hadir: 5, terlambat: 2, totalLateMs: 1140142, totalWorkMs: 165042650 }`
  - Data seed log `04` §5.3 dan kalender mendatang
- [x] T3.6 `lib/payroll.ts` + test
  - `progressiveTax`: 5 vektor
  - `overtimePay(10.500.000, jam)`: 1 → 91.040, 2 → 212.428, 6 → 697.977, 0 → 0
  - `calculatePayroll`: seluruh tabel `04` §6.5 untuk 3 karyawan (bruto, BPJS, neto, PKP, pajak, PPh bulanan, THP)
  - Total bruto `40.797.977`, total THP `37.217.039`
  - Komentar `// SEDERHANA:` untuk (a) sampai (h)
- [x] T3.7 `lib/csv.ts` + test
  - `toCsv`: escaping koma, kutip ganda, tanpa BOM, tanpa baris kosong di akhir
  - CSV pratinjau 4 baris persis `04` §6.5
- [x] T3.8 `lib/exam.ts` + test
  - `scoreRubric`: 8 vektor termasuk batas 70 (`[4,2,3,0]`, `[4,2,2,2]`)
  - `RangeError` untuk `[5,0,0,0]` dan `[2.5,0,0,0]`
  - `isPass`, `WEIGHTS`, `PASS_THRESHOLD`
- [x] T3.9 `lib/faq.ts` — 8 pertanyaan `03` §12 tanpa penanda `[K#]`
- [x] T3.10 `lib/features.ts` + test — 29 butir, `flatMap(...).length === 29`
- [x] T3.11 `lib/images.ts` — manifest `PHOTOS` 7 slot dari `07` §9
- [x] T3.12 Test tambahan: `SITE.title.length === 56`, `SITE.description.length === 103`
- [x] T3.13 Gerbang: `npm run test` hijau, semua vektor `04` tercakup. Hitung jumlah test untuk laporan. **48 test di 10 berkas, semua lulus (21 Okt 2026).**

---

## T4 — Section Statis

Urutan mengikat `03` §1. Copy disalin persis, tanpa em dash, tanpa tanda seru.

- [x] T4.1 `page.tsx` merakit 15 section berurutan + `JsonLd`.
- [x] T4.2 Skip link "Lewati ke konten" + `Navbar` (sticky 56px, 6 tautan, CTA, `<details>` mobile) — CTA #1.
- [x] T4.3 `Hero`: eyebrow, H1 tiga baris blok, sub, CTA primer (#2) + sekunder, catatan mikro, `PhotoSlot` IMG-01, `HeroWindow`.
- [x] T4.4 `HeroWindow` statis: title bar, pohon 4 folder `2`, input `/` + `dokumen` + `3 hasil`, 3 hasil dengan skor 5/1/1 (hasil 1 terpilih hitam), baris keycap. `aria-hidden` + `figcaption` sr-only.
- [x] T4.5 `SpecStrip`: 4 sel `<ul aria-label="Spesifikasi ringkas">` (5/1/0/2).
- [x] T4.6 `Audience`: 4 kolom foto + H3 + teks, keterangan "Foto ilustrasi...", CTA #3.
- [x] T4.7 `Principles` (pita hitam): 4 aturan bernomor + tabel shortcut 7 baris keycap.
- [x] T4.8 Kerangka 5 section modul: eyebrow + ikon Lucide + H2 + lead + slot demo + tabel sub-fitur. Section Library menyertakan tautan `#alur`.
- [x] T4.9 `DataFlow` (pita hitam): 4 baris Dari → Peristiwa → Ke → Dampak, angka dari `04` §8, CTA #4.
- [x] T4.10 `Implementation`: IMG-06 + 3 langkah + catatan, CTA #5.
- [x] T4.11 `Faq`: `<details>`/`<summary>` dari `lib/faq.ts` (tanpa JS).
- [x] T4.12 `FinalCta` (pita hitam + IMG-07 + overlay datar): H2, sub, CTA #6 + "Kirim pertanyaan".
- [x] T4.13 `Footer` (hitam): 4 kolom + baris bawah mono + "Foto ilustrasi."
- [x] T4.14 Ritme latar sesuai `02` §4.2; maksimum 3 pita hitam + footer.
- [x] T4.15 Crosshair ≤ 2 per section, hanya ≥ 768px.
- [x] T4.16 Gerbang: urutan section benar, CTA primer tepat 6×, `typecheck` hijau, tanpa scroll horizontal di 375/768/1024/1440. **Diverifikasi terhadap build produksi via browser: keempat lebar tanpa scroll horizontal (21 Okt 2026).**

---

## T5 — Lima Demo Interaktif

Aturan umum (`04` §2): `"use client"`, state lokal, logika di `lib/`, `aria-live` untuk pesan status, `onKeyDown` pada pembungkus panel (bukan `window`), target sentuh ≥ 44px, tombol "Reset demo" di setiap demo.

- [x] T5.1 `LibraryDemo.tsx`
  - 3 panel, tinggi 480px di ≥ 1024px; mobile: pohon dalam `<details>` "Folder"
  - Pohon folder buka/tutup (`Folder`/`FolderOpen`, `aria-expanded`), default `Operasional` + `SDM` terbuka
  - Bilah cari + keycap `/`; query tidak kosong → pohon diganti daftar hasil (jalur mono + skor)
  - Panel dokumen: breadcrumb, segmen `Tampilan`/`Sumber` (`aria-pressed`), badge `KURSUS`, isi
  - Default terbuka d2; pola listbox `aria-activedescendant` untuk `↑`/`↓`; `Enter` buka; `Esc` kosongkan query
  - Pesan live "{n} hasil untuk {query}" / "Tidak ada hasil untuk {query}"
  - d1: 4 checkbox langkah + "Kemajuan: {x}/4 ({persen}%)"
  - Render markdown ke elemen React (tanpa `dangerouslySetInnerHTML`)
  - Lolos skenario `04` §3.5 (5 poin)
- [x] T5.2 `PermitDemo.tsx`
  - Form kiri (5/12) + log & sisa cuti kanan (7/12); mobile vertikal
  - Radiogroup `1 Cuti` / `2 Izin sakit` / `3 Lembur` dengan keycap di label
  - Field kondisional: tanggal mulai/selesai atau tanggal + jam lembur (1..8)
  - Keterangan opsional maks 80 karakter; pratinjau "Hari kerja: {n}"; "Isi contoh" (2026-11-02..06)
  - Pintasan `1`/`2`/`3`, `Ctrl`+`Enter`, `Esc`; angka diabaikan saat fokus di `input`/`textarea`
  - Panel sisa cuti: Jatah 12 · Terpakai 4 · Menunggu n · Tersedia m (awal 8)
  - Log tabel mono: Waktu (WIB) · Aktor · Aksi · Status; tombol Setujui/Tolak hanya pada baris `DIAJUKAN`; keputusan menambah baris baru, baris lama utuh
  - Tautan SOP `SDM / Kebijakan / Lembur` saat Lembur dipilih
  - Lolos skenario `04` §4.5 (5 poin)
- [x] T5.3 `AttendanceDemo.tsx`
  - Prop `now?: () => number` (default `Date.now`)
  - Tombol besar 96px bergantian Masuk/Keluar + ikon `Fingerprint`
  - Chip Geofence (radius 150 m, simulasi) dan Shift (09:00-18:00 WIB) di atas tombol; tanpa permintaan lokasi
  - Rekap 4 angka (hadir, terlambat, total keterlambatan, total jam kerja) dari `summarize`
  - Log `YYYY-MM-DD HH:mm:ss.SSS WIB` urut waktu; `TERLAMBAT` saat masuk > 09:00:00.000
  - Durasi hari tampil setelah Keluar; kalender mendatang dengan `StatusChip` CUTI/LIBUR NASIONAL
  - Pesan live "Masuk dicatat pukul {formatWib}"
  - Lolos skenario `04` §5.5 (5 poin, termasuk `now` palsu `1792548461020`)
- [x] T5.4 `PayrollDemo.tsx`
  - `DataTable` 12 baris × 3 kolom karyawan; header karyawan `<button aria-pressed>`; kolom terpilih `border-x` hitam + bg header `--surface-hover`
  - Baris Bruto dan Take-home tebal; Take-home `border-t` hitam
  - Panel "Detail PPh 21: {nama}" 9 baris mono; baris Total (bruto + THP)
  - "Ekspor CSV" → `<pre>` CSV persis 4 baris + label "Pratinjau CSV. Demo ini tidak mengunduh berkas."
  - "Ekspor PDF" → lembar slip rasio 1:1.414 untuk karyawan terpilih + label serupa
  - Pesan live untuk kedua pratinjau
  - Lolos skenario `04` §6.6 (4 poin)
- [x] T5.5 `ExamDemo.tsx`
  - Tablist `Rekrutmen` / `Evaluasi kinerja` / `Kompetensi`, panah kiri/kanan, ganti mode mengosongkan skor
  - Lembar kasus (H3 + paragraf + 3 butir kumpulan) sesuai tabel `04` §7.2
  - Rubrik 4 kriteria berbobot 40/30/20/10, radiogroup `0`..`4` dengan label di bawah angka
  - Hasil hanya bila 4 kriteria terisi: "Skor {angka}/100" + `StatusChip` LULUS/BELUM LULUS; sebelum itu "Belum dinilai"
  - "Isi contoh" → `[4,3,3,2]`; "Reset demo"
  - Panel Proctoring statis (2 baris log + "2 kejadian, total 11 dtk") + catatan tanpa rekaman kamera
  - Angka desimal koma Indonesia (`82,5`), bulat tanpa desimal (`60`)
  - Lolos skenario `04` §7.4 (5 poin)
- [x] T5.6 Verifikasi lintas modul (`04` §9): `697.977` konsisten di Gaji/Alur data/test; sisa cuti `8` konsisten; hasil `dokumen` identik di `HeroWindow` dan `LibraryDemo`; `featureList` JSON-LD memuat semua sub-fitur.
- [x] T5.7 Uji tanpa jaringan: matikan jaringan di DevTools, ulangi satu skenario per modul.
- [x] T5.8 Gerbang: `typecheck`, `lint`, `test` hijau; semua demo dioperasikan penuh dengan keyboard. **Semua 5 modul terpasang, typecheck dan lint 0 error, 48 unit test hijau.**

---

## T6 — Foto

**Kondisi awal (periksa ulang; temuan percobaan sebelumnya)**: 7 berkas foto disediakan pemilik, **belum sesuai `07`**:

| Slot   | Berkas                    | Dimensi sekarang | Ukuran     | Masalah                        |
| ------ | ------------------------- | ---------------- | ---------- | ------------------------------ |
| IMG-01 | `hero-meja-kerja.webp`    | 1281×1920        | 52 KB      | rasio 2:3, target 4:5          |
| IMG-02 | `audiens-hukum.webp`      | 1200×1200        | 148 KB     | persegi, target 4:3            |
| IMG-03 | `audiens-arsitek.webp`    | 1920×1280        | **300 KB** | melebihi 220 KB                |
| IMG-04 | `audiens-developer.webp`  | 1280×1920        | 80 KB      | **potret**, target 4:3 lanskap |
| IMG-05 | `audiens-kantor.webp`     | 1920×1280        | 144 KB     | perlu resize                   |
| IMG-06 | `implementasi-rapat.webp` | 1920×1282        | **237 KB** | melebihi 220 KB                |
| IMG-07 | `cta-kantor-pagi.webp`    | 1920×1280        | **279 KB** | melebihi 220 KB                |

Metadata WebP tidak menyatakan grayscale/berwarna, jadi status warna harus dipastikan secara visual di T6.1. `CREDITS.md` wajib dibuat.

- [x] T6.1 **Lihat setiap foto** (`vision_analyze`) dan nilai terhadap `07` §4: klise terlarang, logo/teks terbaca, wajah dominan, kelayakan hitam-putih.
- [x] T6.2 Putuskan per slot: dipakai, dipotong ulang, atau diganti.
- [x] T6.3 Tulis `scripts/optimize-images.mjs` (sharp): `rotate()` → `grayscale()` → `resize(w, h, { fit: "cover", position: "attention" })` → `webp({ quality: 78 })`; turunkan quality 4 poin bila > 220 KB. Simpan sumber mentah di `raw-images/` (masuk `.gitignore`).
- [x] T6.4 Jalankan skrip untuk 7 slot ke dimensi target `07` §3 (800×1000, 800×600 ×4, 1200×800, 1920×1080).
- [x] T6.5 Verifikasi: grayscale, EXIF hilang, ≤ 220 KB per foto, total ≤ 1.400 KB, dimensi dan rasio sesuai slot. **7 WebP total 253,5 KB, terbesar 88 KB, semua lolos.**
- [x] T6.6 Tulis `public/images/CREDITS.md`: ID · judul · fotografer · URL sumber · lisensi · tanggal unduh · catatan orang.
- [x] T6.7 `PhotoSlot.tsx` final: `src: null` → blok `--surface-hover` + `data-photo-blocked`; chip `FOTO ILUSTRASI`; overlay IMG-07 datar; `priority` hanya IMG-01; `sizes` sesuai tabel `07` §9.
- [x] T6.8 `alt` Indonesia di setiap foto dari manifest.
- [x] T6.9 Gerbang: tidak ada `<img>`, tidak ada `remotePatterns`, tidak ada hotlink; CLS 0.

---

## T7 — SEO, OG, JSON-LD

- [x] T7.1 `layout.tsx`: `metadata` + `viewport` persis `05` §2 (`metadataBase`, canonical `/`, robots, openGraph, twitter).
- [x] T7.2 `src/app/icon.svg`: 32×32 hitam dengan persegi putih 12×12.
- [x] T7.3 Salin `geist-mono-latin-400-normal.woff` dan `-500-normal.woff` dari `@fontsource/geist-mono` ke `src/assets/fonts/`.
- [x] T7.4 `lib/og-image.tsx`: `renderOg()` dengan `ImageResponse`, font lokal via `fs/promises` (tanpa `fetch`), layout sesuai tabel `05` §3.
- [x] T7.5 `opengraph-image.tsx` + `twitter-image.tsx`: literal `alt`, `size`, `contentType`.
- [x] T7.6 `sitemap.ts` + `robots.ts` dari `05` §4.
- [x] T7.7 `JsonLd.tsx`: satu `@graph` (Organization, WebSite, SoftwareApplication, FAQPage), escape `</` → `\u003c`, tanpa `offers`/`aggregateRating`/`review`/`sameAs`.
- [x] T7.8 Verifikasi `<head>` hasil build: 12 properti `05` §2 lengkap.
- [x] T7.9 Verifikasi OG: `npm run build` berhasil menghasilkan route `/opengraph-image`, `/twitter-image`, `/icon.svg`, `/sitemap.xml`, `/robots.txt`.

---

## T8 — Audit dan QA

- [x] T8.1 Jalankan 10 blok audit `grep` `06` §8 dari root proyek. Setiap blok harus tanpa keluaran (kecuali pengecualian sah yang terdaftar). **Lolos bersih via `npm run audit`.**
- [x] T8.2 Perbaiki sumber setiap temuan. Jangan mengakali pola grep.
- [x] T8.3 Jawab 10 pertanyaan uji anti-slop `06` §7; semua harus sesuai.
- [x] T8.4 `npm run typecheck` · `lint` · `test` · `build` — keempatnya hijau.
- [x] T8.5 Lighthouse mobile (Performance, Accessibility, Best Practices, SEO) ≥ 90. Catat skor, First Load JS, CLS, LCP.
- [x] T8.6 Uji responsif di 375, 768, 1024, 1440 px: tanpa scroll horizontal, target sentuh ≥ 44px, tidak ada teks terpotong.
- [x] T8.7 Uji keyboard-only: Tab melewati seluruh kontrol, fokus terlihat, semua demo bisa dioperasikan tanpa mouse.
- [x] T8.8 Uji `prefers-reduced-motion: reduce`: transisi 0ms, tidak ada gerak lain.
- [x] T8.9 Uji kontras pasangan terlarang `02` §2.1 tidak terpakai (terutama `--text-muted` di atas `--surface-hover` dan di atas hitam).
- [x] T8.10 Checklist final `05` §9 seluruhnya tercentang.

---

## T9 — Laporan Akhir

- [x] T9.1 Tulis laporan format `05` §10: SELESAI · ASUMSI · GAMBAR · PENYEDERHANAAN RUMUS · SKOR · PERLU KEPUTUSAN PEMILIK.
- [x] T9.2 Isi "Perlu keputusan pemilik" minimal: domain/email asli, konfirmasi K1-K7, verifikasi PPh 21/BPJS + batas iuran tahun berjalan, daftar libur nasional, lisensi/atribusi foto, ketersediaan font Geist, asal foto yang disediakan, penawaran "Demo 30 menit, tanpa kartu kredit".
- [x] T9.3 Centang DoD `AGENTS.md` §9 satu per satu, laporkan yang belum.

---

## Catatan Terbuka (perlu keputusan pemilik, dikumpulkan di awal)

1. **Git**: folder ini di dalam working tree repo induk `hris-website-management` (branch `hiyoo`). Pisahkan dengan `git init` mandiri?
2. **Foto**: 7 berkas sudah disediakan tetapi belum grayscale, sebagian rasionya tidak cocok slot (IMG-02 persegi, IMG-04 potret), dan 3 melebihi 220 KB. Boleh dipotong ulang dengan `fit: cover`? Bila potret IMG-04 dipaksa ke 4:3, subjek bisa terpotong.
3. **Asal dan lisensi foto**: `CREDITS.md` wajib memuat fotografer, URL sumber, lisensi, tanggal. Data ini harus dari pemilik.
4. **Domain dan email**: `prostaff.example` dan `halo@prostaff.example` masih placeholder.
5. **Klaim K1-K7**: perlu konfirmasi pemilik sebelum rilis.
6. **Penyederhanaan pajak** (a) sampai (h) di `payroll.ts`: verifikasi konsultan pajak.
