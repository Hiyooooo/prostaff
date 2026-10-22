# AGENTS.md — ProStaff HRIS (Website 07)

Baca file ini lebih dulu, lalu baca `docs/` sesuai urutan di §2. Semua aturan di sini mengikat.

---

## 1. Misi

Bangun **situs landing page promosi** (bukan aplikasi internal) untuk **ProStaff HRIS**, sistem manajemen SDM yang minimalis dan efisien.

| Aspek | Keputusan |
|---|---|
| Produk | ProStaff HRIS, 5 modul: Library, Perizinan, Absensi, Gaji, Exam |
| Audiens | Konsultan hukum, arsitek, developer software, dan kantor profesional yang menyukai antarmuka minim gangguan. Pengambil keputusan: managing partner, principal studio, CTO, office manager |
| Bintang halaman | **Library**: direktori dokumentasi berbasis markdown dengan hierarki folder |
| Gaya | **Minimalist Monochrome**: hitam, putih, abu-abu netral, garis hairline 1px, tipografi monospace + sans bersih |
| Sorotan hero | Headline tipografis tegas tentang navigasi cepat dan nol bloatware |
| Konten | Seluruh konten dan data demo ditulis di komponen dan `src/lib/` |

Situs ini **hanya mempromosikan**. Semua demo adalah mockup interaktif dengan state lokal.

---

## 2. Urutan Baca dan Prioritas Konflik

Urutan baca:
1. `AGENTS.md` (file ini)
2. `docs/01-brief.md`
3. `docs/02-design-system.md`
4. `docs/03-page-structure.md`
5. `docs/04-modules.md`
6. `docs/07-image-plan.md`
7. `docs/06-anti-slop.md`
8. `docs/05-seo-og-quality.md`

Prioritas bila dua dokumen bertentangan (kiri menang):
`AGENTS.md` > `06-anti-slop.md` > `02-design-system.md` > `07-image-plan.md` > `04-modules.md` > `03-page-structure.md` > `05-seo-og-quality.md` > `01-brief.md`

Bila masih ambigu, pilih opsi yang **lebih sederhana dan lebih monokrom**, lalu catat di laporan akhir.

---

## 3. Format Produk

- **Alur persuasi** (urutan section tetap, lihat `03` §1): Hero → Spesifikasi → Audiens → Prinsip antarmuka → Library → Perizinan → Absensi → Gaji → Exam → Alur data → Implementasi → FAQ → CTA penutup → Footer.
- **CTA primer "Jadwalkan demo" muncul 6×** (navbar, hero, audiens, alur data, implementasi, CTA penutup). Minimum 5.
- **Setiap klaim didukung visual atau demo.** Tidak ada klaim tanpa elemen visual di sebelahnya.
- **Tiap section punya elemen visual**: foto asli (lihat `07`), demo UI, tabel, atau diagram buatan kode.
- Bahasa halaman: **Bahasa Indonesia**. Sapaan: **"Anda"**. Tone: spesifikasi teknis, kalimat pendek, berangka.

---

## 4. Lima Modul Wajib

Nama persis. Urutan tampil: Library dulu (bintang, terbesar), lalu Perizinan, Absensi, Gaji, Exam. Detail lengkap di `docs/04-modules.md`.

| Modul | Ikon Lucide | Peran | Sub-fitur wajib (**tebal** = sorotan tema) |
|---|---|---|---|
| **Library** (bintang) | `BookOpen` | Wiki internal | **Direktori markdown berhierarki folder**, **pencarian judul/jalur/isi dengan navigasi keyboard**, Knowledge base SOP, Arsip dokumen perusahaan, Modul e-learning |
| **Perizinan** | `CalendarCheck` | Izin dan persetujuan | **Form dengan shortcut keyboard**, **log status transparan (hanya menambah entri)**, Workflow approval cuti, Izin sakit, Lembur, Transparansi sisa cuti |
| **Absensi** | `Fingerprint` | Presensi | **Check-in 1 klik**, **log histori berstempel waktu milidetik (WIB)**, Clock-in/out, GPS geofencing (simulasi), Shift kerja, Rekap kehadiran |
| **Gaji** | `Wallet` | Penggajian | **Breakdown komponen dalam tabel keuangan**, **Ekspor CSV dan PDF (pratinjau)**, Kalkulasi otomatis, PPh 21, BPJS, Slip gaji digital, Reimbursement |
| **Exam** | `ClipboardCheck` | Uji teknis | **Studi kasus terstruktur dengan rubrik berbobot**, Assessment rekrutmen, Evaluasi kinerja, Uji kompetensi, Proctoring (log fokus jendela, simulasi) |

**Aturan integrasi antar modul** (diperagakan di section Alur data, angkanya di `04` §8):
1. Lembur disetujui di Perizinan menambah komponen Lembur di slip Gaji.
2. Cuti disetujui di Perizinan menandai hari terkait sebagai CUTI di Absensi dan mengurangi sisa cuti.
3. Form Perizinan menautkan SOP terkait di Library.
4. Hasil Exam yang lulus diarsipkan sebagai dokumen di Library.

Sub-fitur dasar yang kurang relevan tetap tampil sebagai chip atau baris pelengkap. **Jangan dihapus.**

---

## 5. Tech Stack Wajib

- Next.js 15+ (App Router), React, TypeScript `strict`
- Tailwind CSS v4 (`@theme` di `globals.css`)
- `lucide-react` (satu-satunya sumber ikon)
- `next/font/google`: **Geist** (sans) dan **Geist Mono** (mono). Hanya dua font ini.
  - Bila `Geist`/`Geist_Mono` tidak tersedia di versi Next terpasang, pakai paket npm `geist` dan laporkan di "perlu keputusan pemilik".
- `next/image` untuk semua foto
- Library tambahan minimal: `clsx`, `tailwind-merge`, `vitest`. DevDependency: `sharp` (skrip optimasi foto), `@fontsource/geist-mono` (hanya untuk menyalin berkas font OG).
- **Dilarang**: framer-motion, GSAP, Lottie, chart library apa pun, ikon selain Lucide, UI kit (shadcn/MUI/Chakra).

Pohon folder:

```
07-prostaff/
├── AGENTS.md
├── docs/                         # 01..07
├── next.config.ts                # tanpa remotePatterns
├── package.json                  # scripts: dev, build, start, typecheck, lint, test
├── vitest.config.ts
├── scripts/
│   └── optimize-images.mjs       # sharp: grayscale, pangkas, webp q78, tanpa EXIF
├── public/
│   └── images/
│       ├── CREDITS.md
│       └── *.webp                # hasil unduh + optimasi (lihat 07)
└── src/
    ├── app/
    │   ├── layout.tsx            # font, metadata, JSON-LD
    │   ├── page.tsx              # merakit semua section
    │   ├── globals.css           # token warna + @theme (satu-satunya tempat hex, selain brand.ts)
    │   ├── icon.svg
    │   ├── opengraph-image.tsx
    │   ├── twitter-image.tsx
    │   ├── robots.ts
    │   └── sitemap.ts
    ├── assets/fonts/             # GeistMono .woff untuk OG image
    ├── components/
    │   ├── ui/                   # Button, Kbd, StatusChip, PhotoSlot, Crosshair, SectionHeader, Logo, DataTable
    │   ├── Navbar.tsx
    │   ├── Hero.tsx
    │   ├── HeroWindow.tsx
    │   ├── SpecStrip.tsx
    │   ├── Audience.tsx
    │   ├── Principles.tsx
    │   ├── LibrarySection.tsx    # + LibraryDemo.tsx ("use client")
    │   ├── PermitSection.tsx     # + PermitDemo.tsx ("use client")
    │   ├── AttendanceSection.tsx # + AttendanceDemo.tsx ("use client")
    │   ├── PayrollSection.tsx    # + PayrollDemo.tsx ("use client")
    │   ├── ExamSection.tsx       # + ExamDemo.tsx ("use client")
    │   ├── DataFlow.tsx
    │   ├── Implementation.tsx
    │   ├── Faq.tsx
    │   ├── FinalCta.tsx
    │   ├── Footer.tsx
    │   └── JsonLd.tsx
    └── lib/
        ├── site.ts               # title, description, URL, kontak placeholder
        ├── brand.ts              # konstanta hex untuk OG image
        ├── images.ts             # manifest foto
        ├── faq.ts                # data FAQ (dipakai UI dan JSON-LD)
        ├── features.ts           # daftar sub-fitur (dipakai UI dan JSON-LD)
        ├── cn.ts
        ├── format.ts             # formatRupiah, formatWib, formatDuration
        ├── library.ts            # data dokumen, searchDocs, breadcrumb, countByRoot, progressPercent
        ├── markdown.ts           # parseMarkdown, parseInline
        ├── leave.ts              # workingDays, availableLeave, validateRequest
        ├── attendance.ts         # lateMs, summarize
        ├── payroll.ts            # calculatePayroll, progressiveTax, overtimePay
        ├── csv.ts                # toCsv
        ├── exam.ts               # scoreRubric
        └── *.test.ts             # satu berkas test per berkas lib, memakai test vector dari 04
```

---

## 6. Aturan Mutlak

**DO**
- Pakai token dari `docs/02-design-system.md`. Hex hanya di `globals.css` dan `src/lib/brand.ts`.
- Tulis logika demo sebagai **fungsi murni di `src/lib/`** + unit test dengan test vector dari `04`. Komponen hanya menampilkan.
- Semua demo memakai **state lokal**. Tanpa `fetch`, kamera, geolokasi, unduhan sungguhan, `localStorage`.
- Pakai foto asli untuk ilustrasi (lihat `07`). UI produk dibuat dengan kode.
- Tandai klaim berisiko dengan komentar `// KLAIM:` dan data placeholder dengan `// ILUSTRATIF:`.
- Hormati `prefers-reduced-motion` (hampir tidak ada gerak; lihat `02` §9).
- Render semua string sebagai teks React. Parser markdown menghasilkan elemen React, bukan HTML string.

**DON'T**
- Tanpa gradien, bayangan (`box-shadow`), blur, glow, glassmorphism, warna aksen.
- Tanpa animasi looping, scroll-reveal, counter beranimasi, marquee.
- Tanpa emoji, ikon selain Lucide, logo asli perusahaan/bank/instansi/lembaga sertifikasi.
- Tanpa testimoni, logo klien, rating, harga, atau statistik pengguna (semua tidak ada datanya).
- Tanpa em dash "—" di halaman (di docs boleh). Tanpa tanda seru. Tanpa kata klise (daftar di `06`).
- Tanpa ilustrasi vektor atau gambar AI sebagai pengganti foto. Bila foto terblokir, pakai blok netral dan tandai BLOCKER.
- Jangan menyebut situs, brand, atau produk lain sebagai pembanding.

---

## 7. Kualitas Minimum

- `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build` semua hijau.
- Lighthouse mobile ≥ 90 (Performance, Accessibility, Best Practices, SEO). CLS < 0.05.
- Responsif dan diperiksa di **375, 768, 1024, 1440 px**. Tanpa scroll horizontal di halaman.
- WCAG 2.2 AA: kontras sesuai tabel di `02` §2, fokus terlihat, target sentuh ≥ 44px pada kontrol utama, semua fungsi demo bisa dioperasikan dengan keyboard.
- SEO/OG lengkap sesuai `05`. Title dan description OpenGraph **persis** seperti di `05` §1.

---

## 8. Alur Kerja Agent

1. Baca `AGENTS.md` dan seluruh `docs/` sesuai §2.
2. Buat daftar tugas dan tandai selesai satu per satu.
3. Scaffold Next.js, pasang dependensi §5, atur `tsconfig` strict, `vitest`, skrip `package.json`.
4. Tulis `globals.css` (token dan `@theme`), font di `layout.tsx`, dan komponen `ui/`.
5. **Tulis test dulu** untuk semua berkas `src/lib/` memakai test vector dari `04`, lalu implementasikan fungsi sampai hijau.
6. Bangun section sesuai peta di `03` §1, urutan tetap. Bangun demo sesuai `04`.
7. **Foto**: ikuti prosedur `07` §5 (cek jaringan, 3 kandidat per slot, unduh lokal, `CREDITS.md`, optimasi). Bila terblokir, ikuti `07` §6.
8. Tulis metadata, JSON-LD, OG image, sitemap, robots sesuai `05`.
9. Jalankan audit `grep` dan uji anti-slop dari `06`. Perbaiki sampai bersih.
10. Jalankan checklist final `05` §9. Kirim laporan akhir sesuai `05` §10.

---

## 9. Definition of Done

- [ ] Semua section `03` ada, urutan tetap, CTA primer ≥ 5×
- [ ] 5 modul lengkap (sub-fitur dasar + sorotan), demo interaktif berfungsi dengan keyboard
- [ ] Semua test vector di `04` lolos sebagai unit test; angka di UI, JSON-LD, dan OG identik dengan docs
- [ ] ≥ 6 slot foto asli terisi, `CREDITS.md` lengkap, atau BLOCKER dilaporkan dengan blok netral
- [ ] Audit `grep` di `06` §8 tanpa hasil (selain pengecualian sah)
- [ ] `typecheck`, `lint`, `test`, `build` hijau; Lighthouse ≥ 90
- [ ] Laporan akhir ditulis, daftar "perlu keputusan pemilik" terisi

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
