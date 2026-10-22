# 05 — SEO, OpenGraph, dan Kualitas

## 1. `src/lib/site.ts`

Title dan description **dipakai persis** dari pemilik (huruf, tanda baca, spasi). Jumlah karakter sudah dihitung dengan skrip.

```ts
// src/lib/site.ts
export const SITE = {
  name: "ProStaff HRIS",
  // ILUSTRATIF: domain placeholder, ganti sebelum rilis.
  url: "https://prostaff.example",
  locale: "id_ID",
  // 56 karakter
  title: "ProStaff HRIS - Sistem Manajemen SDM Minimalis & Efisien",
  // 103 karakter
  description:
    "Antarmuka bersih bebas distraksi. Solusi manajemen karyawan, arsip dokumen, dan penggajian profesional.",
  // ILUSTRATIF: email dan kota placeholder.
  contactEmail: "halo@prostaff.example",
  city: "Jakarta",
} as const;

export const CONTACT_MAILTO = `mailto:${SITE.contactEmail}?subject=Jadwal%20demo%20ProStaff%20HRIS`;
export const QUESTION_MAILTO = `mailto:${SITE.contactEmail}`;
```

| Properti | Nilai | Panjang |
|---|---|---|
| `title` | `ProStaff HRIS - Sistem Manajemen SDM Minimalis & Efisien` | 56 |
| `description` | `Antarmuka bersih bebas distraksi. Solusi manajemen karyawan, arsip dokumen, dan penggajian profesional.` | 103 |

Tulis unit test kecil: `expect(SITE.title.length).toBe(56)` dan `expect(SITE.description.length).toBe(103)`. Tanda hubung pada title adalah `-` biasa (bukan em dash), dan `&` ditulis apa adanya (React/Next melakukan escape).

`src/lib/brand.ts` (satu-satunya file selain `globals.css` yang boleh memuat hex):

```ts
export const BRAND = {
  black: "#000000",
  white: "#FFFFFF",
  gray: "#71717A",
  grayLight: "#A1A1AA", // 8.19:1 di atas #000000
  line: "#27272A",
} as const;
```

## 2. Metadata (`src/app/layout.tsx`)

```tsx
import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { absolute: SITE.title },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    locale: SITE.locale,
    title: SITE.title,
    description: SITE.description,
    // og:image otomatis dari src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    // twitter:image otomatis dari src/app/twitter-image.tsx
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: BRAND.white,
};
```

- `<html lang="id">`. Ikon: `src/app/icon.svg` (kotak hitam 32×32 dengan persegi putih 12×12 di tengah). Tidak ada `apple-icon` kecuali pemilik menyediakan PNG.
- Verifikasi hasil `<head>` di HTML build: `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale`, `og:image` (+ `width`, `height`, `alt`), `twitter:card`, `twitter:image`, `canonical`, `robots`.

## 3. OG Image 1200×630 (desain unik)

`src/app/opengraph-image.tsx` dan `src/app/twitter-image.tsx` memanggil builder bersama `src/lib/og-image.tsx` (`renderOg()`), memakai `ImageResponse` dari `next/og`. Setiap berkas mendeklarasikan **literal**:

```tsx
export const alt = "ProStaff HRIS: navigasi cepat, layar bersih, nol bloatware";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
```

**Desain (hanya hitam, putih, abu-abu; tanpa gradien, tanpa foto):**

| Elemen | Spesifikasi |
|---|---|
| Latar | `BRAND.black` penuh |
| Bingkai | garis 1px `BRAND.line` inset 24px dari tepi |
| Crosshair | tanda `+` 15×15px putih 1px di empat sudut bingkai |
| Logo (kiri atas, x 72, y 72) | kotak putih 20×20 + teks "ProStaff" Geist Mono 500 28px putih, jarak 12px |
| Headline (x 72, y mulai 190) | tiga baris: `Navigasi cepat.` · `Layar bersih.` · `Nol bloatware.` Geist Mono 500 84px putih, line-height 1.05, tracking -0.03em |
| Baris modul (bawah, y 500) | lima sel berbatas 1px `BRAND.line`: `Library` `Perizinan` `Absensi` `Gaji` `Exam`, Geist Mono 400 22px `BRAND.grayLight`, padding 12px 20px |
| URL (kanan bawah) | `prostaff.example` Geist Mono 400 20px `BRAND.grayLight` |

Aturan teknis Satori: gunakan `display: "flex"` untuk setiap kontainer, tanpa CSS grid, tanpa `box-shadow`. **Font lokal, tanpa fetch jaringan saat build:**

1. Salin `geist-mono-latin-400-normal.woff` dan `geist-mono-latin-500-normal.woff` dari paket `@fontsource/geist-mono` ke `src/assets/fonts/` (Satori tidak menerima WOFF2; nama berkas dapat berbeda, verifikasi isi paket).
2. Baca dengan `fs/promises` (`readFile(path.join(process.cwd(), "src/assets/fonts/..."))`) dan berikan ke opsi `fonts`.
3. Dilarang `fetch(...)` untuk font atau gambar.

Verifikasi: `npm run build`, jalankan `npm start`, unduh `/opengraph-image` secara lokal dan periksa dengan `file` bahwa hasilnya `PNG image data, 1200 x 630`. Ukuran berkas ≤ 150 KB. Periksa visual: teks tidak terpotong, kontras abu-abu `#A1A1AA` di hitam 8.19:1.

## 4. Sitemap dan Robots

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  // ILUSTRATIF: ganti tanggal saat rilis.
  return [{ url: SITE.url, lastModified: new Date("2026-10-20"), changeFrequency: "monthly", priority: 1 }];
}
```

```ts
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${SITE.url}/sitemap.xml` };
}
```

## 5. JSON-LD (`JsonLd.tsx`, satu `@graph`)

`JsonLd.tsx` adalah **satu-satunya** berkas yang boleh memakai `dangerouslySetInnerHTML` (untuk `<script type="application/ld+json">`). Wajib escape: `JSON.stringify(graph).replace(/</g, "\\u003c")`.

Isi `@graph`:

| Node | Isi |
|---|---|
| `Organization` | `@id` `${url}/#org`, `name: "ProStaff"`, `url`, `logo: ${url}/icon.svg` |
| `WebSite` | `@id` `${url}/#website`, `url`, `name`, `inLanguage: "id-ID"`, `publisher` → org |
| `SoftwareApplication` | `name: "ProStaff HRIS"`, `applicationCategory: "BusinessApplication"`, `operatingSystem: "Web"`, `description: SITE.description`, `provider` → org, `featureList` = **seluruh** isi `FEATURES` (29 butir, di bawah). **Tanpa `offers`** (harga placeholder) |
| `FAQPage` | `mainEntity` dari `src/lib/faq.ts` (8 pertanyaan), **sumber data yang sama dengan UI**. Penanda `[K#]` di docs `03` **tidak** ikut ke data |

**Dilarang**: `aggregateRating`, `review`, `offers`, `sameAs` ke akun yang tidak ada.

`src/lib/features.ts` (teks persis; jumlah butir 29):

```ts
export const FEATURES = [
  { module: "Library", items: [
    "Direktori dokumentasi markdown berhierarki folder",
    "Pencarian dokumen dengan navigasi keyboard",
    "Knowledge base SOP",
    "Arsip dokumen perusahaan",
    "Modul e-learning",
  ]},
  { module: "Perizinan", items: [
    "Form perizinan keyboard-friendly dengan shortcut",
    "Log status perizinan transparan",
    "Workflow approval cuti",
    "Izin sakit",
    "Lembur",
    "Transparansi sisa cuti",
  ]},
  { module: "Absensi", items: [
    "Check-in satu klik",
    "Log presensi berstempel waktu milidetik",
    "Clock-in dan clock-out",
    "GPS geofencing",
    "Shift kerja",
    "Rekap kehadiran",
  ]},
  { module: "Gaji", items: [
    "Breakdown komponen gaji dalam tabel",
    "Ekspor CSV dan PDF",
    "Kalkulasi gaji otomatis",
    "PPh 21",
    "BPJS",
    "Slip gaji digital",
    "Reimbursement",
  ]},
  { module: "Exam", items: [
    "Uji teknis berbasis studi kasus terstruktur",
    "Assessment rekrutmen online",
    "Evaluasi kinerja",
    "Uji kompetensi",
    "Proctoring berbasis log fokus jendela",
  ]},
] as const;
```

Tulis test: `FEATURES.flatMap(g => g.items).length === 29`.

## 6. HTML Semantik

- Satu `<h1>` (hero). Urutan heading tidak melompat (h1 → h2 per section → h3 di dalam).
- Struktur: `<a class="skip">`, `<header>` (navbar), `<main id="konten">` berisi `<section id=... aria-labelledby=...>`, `<footer>`.
- Daftar sebagai `<ul>/<ol>`; tabel sebagai `<table>` dengan `<caption class="sr-only">` dan `<th scope>`.
- FAQ memakai `<details>/<summary>` (tanpa JS).
- Tautan teks bermakna ("Lihat Library", bukan "klik di sini").
- `scroll-margin-top: 72px` pada setiap `section[id]` agar anchor tidak tertutup navbar sticky (WCAG 2.4.11).

## 7. Aksesibilitas (WCAG 2.2 AA)

| Kriteria | Pemeriksaan |
|---|---|
| Kontras teks (1.4.3) | Semua pasangan sesuai `02` §2.1; teks body ≥ 4.5:1 |
| Kontras non-teks (1.4.11) | Batas kontrol memakai `--line-strong` (≥ 4.10:1); keycap, radio, checkbox terlihat |
| Fokus terlihat (2.4.7, 2.4.13) | Outline 2px offset 2px di semua kontrol; putih di pita hitam |
| Fokus tidak tertutup (2.4.11) | `scroll-margin-top` section; navbar sticky 56px |
| Target (2.5.8) | Kontrol utama ≥ 44px di mobile, minimal 24px di desktop |
| Keyboard (2.1.1) | Semua demo dapat dioperasikan tanpa mouse; tidak ada jebakan fokus |
| Nama, peran, nilai (4.1.2) | `aria-pressed`, `aria-expanded`, `role="tablist"/"tab"`, `aria-activedescendant` pada listbox pencarian |
| Pesan status (4.1.3) | `aria-live="polite"` untuk hasil; `role="alert"` untuk error form |
| Gerak (2.3.3 / 2.2.2) | Tidak ada animasi; `prefers-reduced-motion` dihormati |
| Reflow (1.4.10) | Tanpa scroll horizontal di 320px; tabel lebar berada di wadah `overflow-x-auto` dengan `tabindex="0"` |
| Bahasa (3.1.1) | `lang="id"` |

Jalankan Lighthouse Accessibility dan satu pemeriksaan manual dengan keyboard saja untuk seluruh halaman.

## 8. Performa

| Metrik | Target |
|---|---|
| Lighthouse mobile (Performance, Accessibility, Best Practices, SEO) | ≥ 90 masing-masing |
| CLS | < 0.05 (semua foto dalam wadah `aspect-ratio`; demo punya tinggi minimum tetap) |
| LCP | elemen H1 atau IMG-01; hanya IMG-01 yang `priority` |
| First Load JS rute `/` | ≤ 130 kB gzip (baca keluaran `next build`; bila lebih, pecah demo di bawah lipatan dengan `next/dynamic` dan laporkan) |
| Berat foto | ≤ 220 KB per foto, ≤ 600 KB untuk foto di atas lipatan, ≤ 1.400 KB seluruh foto |
| OG image | ≤ 150 KB |
| Font | hanya Geist dan Geist Mono, `display: swap`, subset `latin` |

Tidak ada library animasi atau chart. Tidak ada skrip pihak ketiga.

## 9. Checklist Final

**Format dan konten**
- [ ] Semua section `03` §1 ada, urutan tetap; CTA primer "Jadwalkan demo" 6×
- [ ] Copy persis dari `03`; tanpa em dash, tanpa tanda seru, tanpa kata klise
- [ ] Placeholder bertanda `// ILUSTRATIF:`; klaim bertanda `// KLAIM:`
- [ ] Tidak ada testimoni, logo klien, harga, rating

**5 modul**
- [ ] Library: direktori markdown, pencarian keyboard, SOP, arsip, e-learning (kursus d1)
- [ ] Perizinan: form + shortcut, log append-only, cuti, sakit, lembur, sisa cuti
- [ ] Absensi: 1 klik, log milidetik, clock-in/out, geofence (simulasi), shift, rekap
- [ ] Gaji: tabel keuangan, CSV/PDF (pratinjau), kalkulasi, PPh 21, BPJS, slip, reimbursement
- [ ] Exam: studi kasus + rubrik, rekrutmen, evaluasi kinerja, kompetensi, proctoring (simulasi)
- [ ] Alur data 4 baris dengan angka dari demo

**Integritas angka**
- [ ] Semua test vector `04` menjadi unit test dan lulus
- [ ] `697.977`, `8`, `5/1/1` (pencarian), `82,5`, `Rp37.217.039`, `1.140.142 ms` identik di UI, test, dan docs
- [ ] Panjang title 56 dan description 103 diuji

**Gambar**
- [ ] ≥ 6 slot foto asli terisi (7 direncanakan) atau BLOCKER dilaporkan
- [ ] `public/images/CREDITS.md` lengkap; tanpa hotlink; `next.config` tanpa `remotePatterns`
- [ ] Foto hitam-putih, EXIF dihapus, berat sesuai §8
- [ ] `alt` Indonesia di setiap foto; hanya IMG-01 `priority`; tanpa CLS
- [ ] Chip/keterangan "Foto ilustrasi" ada; tanpa nama atau jabatan di dekat wajah

**Desain dan anti-slop**
- [ ] Hanya token netral; tanpa gradien, bayangan, blur, aksen warna
- [ ] Motif crosshair, eyebrow jalur, keycap, status chip bentuk+teks hadir
- [ ] Audit `grep` `06` §8 tanpa hasil; uji anti-slop 10/10

**SEO dan OG**
- [ ] `<head>` memuat semua meta di §2; OG image 1200×630 terverifikasi
- [ ] JSON-LD valid (Organization, WebSite, SoftwareApplication tanpa `offers`, FAQPage)
- [ ] `sitemap.xml` dan `robots.txt` tersaji

**Teknis**
- [ ] `typecheck`, `lint`, `test`, `build` hijau
- [ ] Lighthouse mobile ≥ 90; First Load JS ≤ 130 kB gzip
- [ ] Diperiksa di 375, 768, 1024, 1440 px; keyboard-only; `prefers-reduced-motion`

## 10. Format Laporan Akhir Agent

```
SELESAI
- Ringkasan satu paragraf: apa yang dibangun dan hasil build/test.

ASUMSI
- Daftar asumsi yang diambil (default di 01 §9, keputusan lain).

GAMBAR
- Tabel slot: ID · berkas · sumber (URL halaman) · lisensi · fotografer.
- Slot yang BLOCKER (bila ada) + kata kunci pencarian + yang dibutuhkan dari pemilik.

PENYEDERHANAAN RUMUS
- Gaji (a) sampai (h) dan Library (a) sampai (c): konfirmasi sudah dikomentari di kode.

SKOR
- Lighthouse mobile: Performance / Accessibility / Best Practices / SEO
- First Load JS rute /, CLS, LCP
- Jumlah test dan hasilnya

PERLU KEPUTUSAN PEMILIK
1. ...
```

Isi minimal "Perlu keputusan pemilik": domain dan email asli (placeholder `.example`); konfirmasi klaim K1 sampai K7 (`01` §9); verifikasi rumus PPh 21/BPJS dengan konsultan pajak dan batas iuran tahun berjalan; daftar libur nasional untuk demo; lisensi dan atribusi foto; ketersediaan font Geist di versi Next terpasang; apakah memakai foto milik sendiri sebagai ganti foto stok; penawaran "Demo 30 menit, tanpa kartu kredit".
