# 02 — Design System (SUMBER KEBENARAN visual)

Semua keputusan visual ada di sini. Bila `03` atau `04` bertentangan, file ini menang. Angka kontras di bawah **dihitung dengan skrip** (rumus WCAG 2.x).

## 1. Identitas Ringkas

| Aspek | Keputusan |
|---|---|
| Mode | Terang dominan dengan **pita hitam** sebagai pembalik (inverse). Tidak ada mode gelap penuh dan tidak ada toggle tema |
| Warna | Hitam `#000000`, putih `#FFFFFF`, abu-abu netral `#71717A`, plus turunan netral. **Tanpa warna aksen.** Hitam adalah aksen |
| Font | **Geist** (sans) + **Geist Mono** (mono) |
| Bentuk | Radius 0 untuk kontainer dan chip, 2px kontrol, 3px keycap. Garis hairline 1px. Tanpa bayangan |
| Layout | Bingkai halaman bergaris (rel kiri dan kanan), grid dengan sel berbatas hairline (hero 2 kolom teks + foto, strip spesifikasi 4 kolom), jendela aplikasi sebagai bintang halaman |
| Visual khas | Motif **crosshair** `+` di perpotongan garis, eyebrow berformat jalur `prostaff / library`, keycap `kbd`, jendela aplikasi 2 panel, foto hitam-putih |
| Motion | Hampir nol. Hanya transisi warna 100ms. Tanpa animasi masuk, tanpa looping |

**Alasan pemilihan:** Geist dirancang untuk antarmuka teknis dan punya padanan mono, cocok untuk audiens developer dan hukum. Kombinasi monokrom murni, radius hampir siku, motif crosshair, dan eyebrow berformat jalur membuat identitas ini mudah dikenali dan tidak bergantung pada warna.

## 2. Token Warna

Letakkan di `src/app/globals.css`. **Hanya file ini dan `src/lib/brand.ts` yang boleh memuat hex.**

```css
:root {
  /* Input pemilik */
  --pure-black: #000000;
  --true-white: #FFFFFF;
  --neutral-gray: #71717A;

  /* Permukaan */
  --surface: #FFFFFF;
  --surface-subtle: #FAFAFA;
  --surface-hover: #F4F4F5;          /* hanya di bawah teks hitam atau --text-secondary */
  --surface-inverse: #000000;
  --surface-inverse-raised: #0A0A0A;

  /* Garis */
  --line: #E4E4E7;                   /* hairline dekoratif: 1.27:1 vs putih. DILARANG sebagai batas kontrol */
  --line-strong: #71717A;            /* batas kontrol: 4.83:1 vs putih, 4.10:1 vs #0A0A0A, 4.35:1 vs hitam */
  --line-mid: #D4D4D8;               /* garis antara: keycap, kotak title bar, ikon pohon. Bukan batas kontrol */
  --line-inverse: #27272A;           /* hairline dekoratif di hitam: 1.41:1 */

  /* Teks di permukaan terang */
  --text: #000000;                   /* 21.00 (putih), 20.12 (#FAFAFA), 19.11 (#F4F4F5) */
  --text-secondary: #52525B;         /* 7.73 (putih), 7.41 (#FAFAFA), 7.03 (#F4F4F5) */
  --text-muted: #71717A;             /* 4.83 (putih), 4.63 (#FAFAFA). GAGAL di #F4F4F5 (4.40) */

  /* Teks di permukaan hitam */
  --text-inverse: #FFFFFF;           /* 21.00 (#000), 19.80 (#0A0A0A) */
  --text-inverse-secondary: #D4D4D8; /* 14.21 (#000), 13.40 (#0A0A0A) */
  --text-inverse-muted: #A1A1AA;     /* 8.19 (#000), 7.72 (#0A0A0A) */

  /* Fokus */
  --focus-ring: #000000;             /* di permukaan terang, 21.00 */
  --focus-ring-inverse: #FFFFFF;     /* di permukaan hitam, 21.00 */

  /* Overlay foto (datar, tanpa gradien) */
  --photo-overlay: rgb(0 0 0 / 0.64); /* teks putih di atas piksel putih terburuk: 6.69:1 */
}
```

**Tidak ada token status berwarna.** Status dibedakan oleh **teks + bentuk** (lihat §6.6).

### 2.1 Tabel pemakaian dan kontras

| Teks | Latar | Rasio | Boleh? |
|---|---|---|---|
| `--text` | `--surface` | 21.00 | Ya |
| `--text-secondary` | `--surface` / `--surface-subtle` | 7.73 / 7.41 | Ya |
| `--text-muted` (#71717A) | `--surface` | 4.83 | Ya (teks ≥ 12px) |
| `--text-muted` | `--surface-subtle` | 4.63 | Ya |
| `--text-muted` | `--surface-hover` (#F4F4F5) | **4.40** | **DILARANG** |
| `--text-muted` (#71717A) | `#000000` | **4.35** | **DILARANG** (gagal 4.5). Pakai `--text-inverse-muted` |
| `--text-muted` | `#0A0A0A` | **4.10** | **DILARANG** |
| `--text-inverse` | `#000000` / `#0A0A0A` | 21.00 / 19.80 | Ya |
| `--text-inverse-secondary` | `#000000` / `#0A0A0A` | 14.21 / 13.40 | Ya |
| `--text-inverse-muted` (#A1A1AA) | `#000000` / `#0A0A0A` | 8.19 / 7.72 | Ya |
| `--text-inverse-muted` | `--surface` (putih) | **2.56** | **DILARANG** |
| `#FFFFFF` | `#71717A` | 4.83 | Hanya bila terpaksa; **hindari fill abu-abu** |
| Teks putih | `--photo-overlay` di atas foto | ≥ 6.69 | Ya |

Aturan tambahan:
- **Aturan abu-abu (perubahan pemakaian, warna input tidak diubah):** `#71717A` adalah teks sekunder **hanya di atas putih dan `#FAFAFA`**. Di pita hitam, teks sekunder wajib memakai `#A1A1AA`. `#71717A` di atas hitam hanya boleh sebagai **garis atau ikon** (batas UI ≥ 3:1, 4.35:1).
- **Batas kontrol** (input, tombol sekunder, checkbox, radio) wajib `--line-strong` atau lebih gelap, bukan `--line`. Keycap memakai `--line-mid`: label statis, bukan kontrol interaktif.
- Hairline dekoratif (`--line`, `--line-inverse`) hanya memisahkan section, baris tabel, dan sel. Jangan pernah satu-satunya penanda kontrol.
- Tidak ada warna lain. Dilarang menambah token berwarna.
- **Tanpa gradien.** Tanpa `box-shadow`, `filter: blur`, `backdrop-filter`.
- Tidak ada aksen: tombol primer = hitam, bukan warna merek.

## 3. Tipografi

Font dimuat dengan `next/font/google` (`display: "swap"`), variabel CSS `--font-sans` dan `--font-mono`.

| Peran | Font | Desktop | Mobile | Weight | Tracking | Line-height |
|---|---|---|---|---|---|---|
| Display (H1) | Geist | 76px | 40px | 600 | -0.04em | 0.98 |
| H2 | Geist | 40px | 28px | 600 | -0.04em | 1.04 |
| H3 | Geist | 20px | 20px | 600 | -0.02em | 1.25 |
| Lead | Geist | 16px | 16px | 400 | 0 | 1.65 |
| Body | Geist | 16px | 16px | 400 | 0 | 1.6 |
| Body kecil | Geist | 14px | 14px | 400 | 0 | 1.6 |
| Eyebrow / label | Geist Mono | 12px | 12px | 400 | 0.04em | 1.2 |
| Data / tabel | Geist Mono | 12px | 12px | 400 | 0 | 1.5 |
| Keycap | Geist Mono | 12px | 12px | 400 | 0.02em | 1 |
| Tombol | Geist | 14px | 14px | 500 | -0.01em | 1.43 |

Aturan:
- **Angka** di sans memakai `font-variant-numeric: tabular-nums`. Angka di tabel, log, rupiah, dan stempel waktu **selalu mono**, rata kanan.
- Ukuran minimum: 13,5px untuk teks isi, 11px untuk label mono (eyebrow, header tabel, caption, chip). Pengecualian mikro 10,5px hanya untuk chip foto, label versi/jejak, dan label tab di layar sempit. Eyebrow berformat huruf kecil (bukan huruf kapital semua).
- Heading maksimum 2 baris di desktop. H1 ditulis 3 baris pendek (lihat `03`).
- Panjang baris lead dan paragraf maksimum 58 karakter (`max-width: 58ch`; di hero 56ch).

## 4. Spacing, Radius, Layout

| Token | Nilai |
|---|---|
| Skala spacing | 4, 8, 12, 16, 24, 32, 48, 64, 96 px |
| Padding section (vertikal) | 88px (> 1120px), 72px (≤ 1120px), 56px (≤ 700px). CTA penutup 104px, footer 56px atas / 24px bawah |
| Radius | `0` kontainer, kartu, dan chip; `2px` tombol/input; `3px` keycap. Dilarang > 4px, dilarang `rounded-full` |
| Container | `max-width: 1200px`, tengah, padding horizontal 40px (32px ≤ 1120px, 20px ≤ 700px) |
| Grid | Sel dibatasi hairline `--line`; gap 0. Strip spesifikasi 4 kolom; hero 2 kolom (teks + foto 380px) |
| Breakpoint | 375 (basis), 560, 700, 860, 960, 1120; konten maksimum tetap 1200px |

### 4.1 Bingkai halaman dan crosshair

- Pembungkus seluruh halaman (`max-w-[1200px] mx-auto`) memiliki `border-x` 1px `--line` (rel kiri dan kanan setinggi halaman). Di layar ≤ 700px rel dihilangkan.
- Setiap section dipisahkan `border-t` 1px `--line` yang membentang selebar pembungkus.
- **Crosshair** (`ui/Crosshair.tsx`): tanda `+` 9×9px dari dua garis 1px berwarna `--text-muted` (`--text-inverse-muted` di pita hitam), dipotong latar berwarna section sehingga hanya tanda `+` yang terlihat, `aria-hidden`, diposisikan di perpotongan garis section dan rel (sudut kiri atas dan kanan atas section). Maksimum 2 crosshair per section. Hanya di atas 700px.

### 4.2 Ritme latar antar section

| Urutan | Section | Latar |
|---|---|---|
| 1 | Navbar | `--surface` |
| 2 | Hero | `--surface` |
| 3 | Spesifikasi | `--surface` (sel hairline) |
| 4 | Audiens | `--surface-subtle` |
| 5 | Prinsip | **hitam** |
| 6 | Library | `--surface` |
| 7 | Perizinan | `--surface-subtle` |
| 8 | Absensi | `--surface` |
| 9 | Gaji | `--surface-subtle` |
| 10 | Exam | `--surface` |
| 11 | Alur data | **hitam** |
| 12 | Implementasi | `--surface` |
| 13 | FAQ | `--surface-subtle` |
| 14 | CTA penutup | **hitam** (foto + overlay datar) |
| 15 | Footer | **hitam** (dipisah hairline `--line-inverse`) |

Setiap modul memakai **bentuk kontainer demo berbeda** (lihat `04`): jendela 3 panel (Library), form + log (Perizinan), satu tombol besar + daftar (Absensi), tabel keuangan penuh (Gaji), lembar kasus + rubrik (Exam). Jangan memakai pola kartu yang sama di semua section.

## 5. Aturan Warna Keras (ringkas)

1. Pasangan yang gagal kontras di §2.1 **dilarang**.
2. Tanpa gradien, bayangan, blur, opasitas dekoratif. Satu-satunya efek: overlay datar foto (`--photo-overlay`).
3. Tanpa warna selain turunan netral di §2.
4. Luas hitam solid: pita hitam maksimum 3 section + footer. Jangan menambah.
5. Hex hanya di `globals.css` dan `src/lib/brand.ts`. Komponen memakai kelas Tailwind dari `@theme` (§10).

## 6. Komponen

### 6.1 Tombol (`ui/Button.tsx`)

| Varian | Di terang | Di hitam |
|---|---|---|
| Primer | bg `--pure-black`, teks putih, border 1px hitam. Hover: bg putih, teks hitam | bg putih, teks hitam, border 1px putih. Hover: bg hitam, teks putih |
| Sekunder | transparan, teks hitam, border 1px `--line-strong`. Hover: bg `--surface-hover`, border `--text` | transparan, teks putih, border 1px putih. Hover: bg `--surface-inverse-raised` |
| Tautan (`btn--quiet`) | transparan tanpa border, teks hitam. Hover: border 1px hitam | idem dengan putih |

- Tinggi minimum 44px di semua ukuran (sudah memenuhi target sentuh). Padding horizontal 18px (14px di ≤ 420px). Radius 2px. Jarak ikon 10px.
- Varian kecil (`btn--sm`, toolbar demo): tinggi 32px, Geist Mono 12px, padding 0 10px.
- Ikon Lucide opsional di kanan (`ArrowRight`, 16px).
- **Fokus**: `outline: 2px solid var(--focus-ring); outline-offset: 2px`. Di pita hitam pakai `--focus-ring-inverse`.
- Disabled: `opacity: 0.55`, `cursor: not-allowed`, `aria-disabled`. (Disabled dikecualikan dari kontras.)
- Target sentuh ≥ 44px melekat pada tinggi minimum tombol.
- Tanpa animasi selain `transition: background-color, color, border-color 100ms linear`.

### 6.2 Kartu / sel

- Tanpa bayangan. Border 1px `--line`. Radius 0. Padding 24px.
- Sel grid berbagi border (gunakan `border-r` dan `border-b`, jangan menggandakan garis).
- Sel yang dapat diklik (baris daftar): hover `--surface-hover`, teks tetap `--text` atau `--text-secondary`.

### 6.3 Input (form demo)

- Tinggi minimum 44px, padding 10px 12px, border 1px `--line-strong`, radius 2px, bg `--surface`, teks `--text` 14px, placeholder `--text-muted`. Hover: border `--text`.
- Label di atas input, Geist Mono 11px, huruf kapital, tracking 0.06em, `--text-muted`. Pesan bantu 12px `--text-secondary`.
- Fokus: border `--text` + outline 2px hitam offset 1px. Error: border tetap `--line-strong`, tambahkan ikon `CircleAlert` + teks error `--text` tebal 500 dengan `role="alert"` (tanpa warna merah).
- Radio dan checkbox: kotak 16px border 1px hitam; terpilih = isi hitam (radio: titik putih di tengah). Gunakan elemen native dengan `appearance: none` + gaya.

### 6.4 Badge / chip

- Chip info (`ui/Chip.tsx`): Geist Mono 11px, huruf kapital, tracking 0.05em, tinggi 24px, padding 0 7px, border 1px `--line-strong`, radius 0, teks `--text`. Ikon 12px opsional. Dipakai untuk sub-fitur pelengkap (mis. `GPS geofencing`, `Modul e-learning`).
- Chip konteks (`chip--ghost`): bentuk sama, border **putus-putus** `--line-strong`, teks `--text-muted`. Untuk konteks non-status (mis. `Geofence radius 150 m (simulasi)`, `Shift 09:00-18:00 WIB`).
- Chip foto (`FOTO ILUSTRASI`): bg hitam, teks putih, Geist Mono 10,5px, tracking 0.07em, padding 4px 7px, radius 0, posisi kiri bawah foto dengan inset 8px.

### 6.5 Keycap (`ui/Kbd.tsx`)

`<kbd>`: Geist Mono 12px, tinggi 22px, `min-width` 22px, padding 0 6px, border 1px `--line-mid`, `border-bottom-width: 2px`, radius 3px, bg `--surface-subtle`, teks `--text-secondary`. Di pita hitam: bg `--surface-inverse-raised`, border `--text-inverse-muted`, teks putih. Kombinasi tombol ditulis dua `kbd` dengan teks " + " di antaranya (mis. `Ctrl` + `Enter`).

### 6.6 Status chip (`ui/StatusChip.tsx`) — tanpa warna

Status dibedakan oleh **teks, ikon Lucide 14px, dan gaya garis**. Selalu tampil teks.

| Status | Gaya | Ikon |
|---|---|---|
| `DIAJUKAN` | border 1px **putus-putus** `--line-strong`, bg transparan, teks `--text` | `Clock` |
| `DISETUJUI` | **bg `--text`**, teks putih | `Check` |
| `DITOLAK` | border 1px **solid** `--text`, bg transparan, teks `--text` | `X` |
| `LULUS` | bg `--text`, teks putih | `Check` |
| `BELUM LULUS` | border solid `--text`, bg transparan, teks `--text` | `X` |
| `TERLAMBAT` | bg `--surface-hover`, border solid `--line-strong`, teks `--text-secondary` | `Clock` |
| `CUTI` | border solid `--line-strong`, teks `--text-secondary` | `CalendarCheck` |
| `LIBUR NASIONAL` | bg `--surface-subtle`, border solid `--line-strong` | `CalendarCheck` |

Font Geist Mono 11px, huruf kapital, tracking 0.05em, tinggi 24px, padding 0 7px, radius 0. Ikon 12px.

### 6.7 Navbar (`Navbar.tsx`)

- `position: sticky; top: 0`, tinggi 56px, bg `--surface`, `border-b` 1px `--line`. Tanpa blur.
- Kiri: Logo. Tengah (≥ 961px): tautan Library, Perizinan, Absensi, Gaji, Exam, FAQ (Geist Mono 12px, tracking 0.02em, `--text-secondary`, hover `--text` + garis bawah 1px). Kanan: tombol primer "Jadwalkan demo" (tinggi 44px).
- Mobile (≤ 960px): tautan masuk ke `<details><summary>` (tanpa JS) berisi daftar tautan vertikal setinggi baris 48px. Tombol ikon `Menu` Lucide 44×44px.
- Sertakan **skip link** "Lewati ke konten" di awal body, tampil saat fokus.

### 6.8 Logo (`ui/Logo.tsx`)

Dibuat sendiri, **ilustratif**: kotak solid 12×12px (`--text`) + teks "ProStaff" Geist 600 15px, tracking -0.02em, jarak 8px. Di pita hitam, kotak dan teks putih. Tidak ada lambang lain. `icon.svg`: 32×32, latar hitam, persegi putih 12×12 di tengah.

### 6.9 Tabel data (`ui/DataTable.tsx`)

- Header: Geist Mono 11,5px, huruf kapital, tracking 0.04em, `--text-muted`, `border-b` 1px `--line`. Baris: Geist Mono 12px (tabel gaji 12,5px), `border-b` 1px `--line`, padding 9px 10px, hover `--surface-subtle`.
- Kolom angka rata kanan, mono, `tabular-nums`. Baris total: `border-t` 1px hitam, teks 600. Label kolom pertama boleh sans 13,5px `--text-secondary`.
- Wajib `<table>`, `<caption>` tampil sebagai label mono 11,5px huruf kapital `--text-muted` (atau `sr-only` bila konteksnya sudah jelas), `<th scope>`. Di mobile, bungkus dengan `overflow-x-auto` dan beri `tabindex="0"` + `aria-label` pada wadah gulir.

### 6.10 Foto (perlakuan seragam, lihat `07`)

- Wadah `aspect-ratio` sesuai slot, border 1px `--text` (foto utama) atau `--line-strong` (foto segmen audiens), radius 0, `overflow: hidden`, `next/image` `fill` + `object-fit: cover`.
- Foto sudah **hitam-putih dari file** (skrip optimasi `07`); jangan memakai CSS `filter`.
- Chip `FOTO ILUSTRASI` (§6.4) di kiri bawah pada foto utama setiap grup.
- Teks di atas foto: hanya di CTA penutup, memakai overlay datar `--photo-overlay` seluas foto. **Tanpa gradien.**
- Slot kosong (BLOCKER): blok `--surface-hover` dengan border 1px `--line` dan teks mono 12px `--text-secondary` berisi ID slot.

## 7. Visual dan Diagram Khas Tema

1. **Jendela aplikasi** (`HeroWindow`, `LibraryDemo`): bingkai border 1px `--text` (hitam), title bar 38px berisi tiga kotak 6×6px outline `--line-mid`, jalur `prostaff.example / library` mono 11,5px `--text-secondary`, dan label versi mono 11px `--text-muted` di kanan. Panel dipisah hairline. Tanpa bayangan, tanpa lingkaran lampu lalu lintas.
2. **Strip spesifikasi** (`SpecStrip`): 4 sel sebaris (2×2 di ≤ 960px, 1 kolom di ≤ 700px). Tiap sel: angka Geist Mono 500 52px (`tabular-nums`, 44px di ≤ 700px), label Geist 15px `--text`, deskripsi mono 11,5px `--text-muted`. Border 1px `--line` antar sel, padding sel 0 28px.
3. **Tabel shortcut** (`Principles`): daftar keycap di pita hitam, 3 kolom (Modul · Shortcut · Aksi).
4. **Diagram alur data** (`DataFlow`): empat baris "Dari → Peristiwa → Ke → Dampak" dengan kotak node berborder 1px putih dan ikon `ArrowRight`. Wajib berupa `<table>` atau `<ol>` yang bisa dibaca screen reader. Tanpa SVG kompleks.
5. **Log histori** (Perizinan, Absensi): tabel mono 12,5px berstempel waktu `YYYY-MM-DD HH:mm:ss.SSS` (Perizinan) dan `YYYY-MM-DD HH:mm:ss.SSS WIB` (Absensi).
6. **Tabel keuangan** (Gaji): kolom = karyawan, baris = komponen, rupiah penuh `Rp20.691.000` mono rata kanan.

Aturan aksesibilitas visual: semua informasi di diagram juga tersedia sebagai teks. Dekorasi (crosshair, kotak title bar) `aria-hidden="true"`.

## 8. Ikonografi

- Hanya `lucide-react`, `strokeWidth={1.5}`, ukuran 16 (inline) atau 20 (judul kartu).
- Ikon modul: Library `BookOpen`, Perizinan `CalendarCheck`, Absensi `Fingerprint`, Gaji `Wallet`, Exam `ClipboardCheck`. Pendukung: `ArrowRight`, `Check`, `X`, `Clock`, `CircleAlert`, `FileText`, `Folder`, `FolderOpen`, `Search`, `Menu`, `Download`, `Keyboard`, `MapPin`.
- Tanpa emoji. Tanpa ikon merek. Glyph keyboard di keycap (`⌘`, `↑`, `↓`, `↵`) ditulis sebagai teks karakter, bukan emoji.

## 9. Motion

| Aturan | Nilai |
|---|---|
| Durasi | 100ms |
| Easing | `linear` |
| **Diizinkan** | Transisi `background-color`, `color`, `border-color` pada hover dan fokus. **Itu saja.** |
| **Dilarang** | Animasi masuk saat scroll, parallax, counter, kursor berkedip, skeleton shimmer, marquee, animasi looping apa pun (`infinite`) |
| Perubahan state demo | **Instan** (tanpa transisi) |
| `scroll-behavior` | Tidak diatur (default `auto`) |
| `prefers-reduced-motion: reduce` | Paksa `transition-duration: 0ms !important`. Tidak ada gerak lain yang perlu dimatikan |

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0ms !important; animation: none !important; }
}
```

## 10. Implementasi Tailwind v4 + Next.js

`globals.css` (cuplikan; token §2 ada di `:root`):

```css
@import "tailwindcss";

@theme inline {
  --color-pure-black: var(--pure-black);
  --color-true-white: var(--true-white);
  --color-surface: var(--surface);
  --color-surface-subtle: var(--surface-subtle);
  --color-surface-hover: var(--surface-hover);
  --color-surface-inverse: var(--surface-inverse);
  --color-surface-inverse-raised: var(--surface-inverse-raised);
  --color-line: var(--line);
  --color-line-strong: var(--line-strong);
  --color-line-mid: var(--line-mid);
  --color-line-inverse: var(--line-inverse);
  --color-ink: var(--text);
  --color-ink-secondary: var(--text-secondary);
  --color-ink-muted: var(--text-muted);
  --color-ink-inverse: var(--text-inverse);
  --color-ink-inverse-secondary: var(--text-inverse-secondary);
  --color-ink-inverse-muted: var(--text-inverse-muted);
  --color-photo-overlay: var(--photo-overlay);
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace;
  --radius-control: 2px;
  --radius-key: 3px;
}

html { background: var(--surface); color: var(--text); font-family: var(--font-sans); }
:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
.on-inverse :focus-visible { outline-color: var(--focus-ring-inverse); }
```

`layout.tsx` (cuplikan):

```tsx
import { Geist, Geist_Mono } from "next/font/google";
const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
// <html lang="id" className={`${sans.variable} ${mono.variable}`}>
```

Pemetaan kelas yang dipakai: `bg-surface`, `bg-surface-subtle`, `bg-surface-inverse`, `text-ink`, `text-ink-secondary`, `text-ink-muted`, `text-ink-inverse`, `text-ink-inverse-muted`, `border-line`, `border-line-strong`, `border-line-mid`, `border-line-inverse`, `font-mono`, `rounded-control`. Komponen pita hitam memakai pembungkus `on-inverse` agar fokus berwarna putih.

Komponen kunci yang harus ada di `components/ui/`: `Button`, `Kbd`, `StatusChip`, `Chip`, `PhotoSlot`, `Crosshair`, `SectionHeader` (eyebrow jalur + H2 + lead), `Logo`, `DataTable`.

`SectionHeader` menerima `path` (mis. `"library"`) dan merender eyebrow `prostaff / {path}` (mono 12px, `--text-muted` di terang, `--text-inverse-muted` di hitam).
