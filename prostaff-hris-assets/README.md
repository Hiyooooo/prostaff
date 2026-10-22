# Aset OpenDesign — ProStaff HRIS

Sumber: project OpenDesign **"Prototype ProStaff HRIS"** (id `b921b661-5dad-481c-bd6b-01a13171e729`), diekspor 21 Okt 2026. Semua berkas diverifikasi byte-identik dengan sumbernya.

**Jangan dihapus** — dipakai sebagai bahan saat membangun ulang situs.

## Isi

| Berkas | Kegunaan nanti |
|---|---|
| `index.html` + `assets/prostaff.css` + `assets/prostaff.js` | Prototipe HTML acuan. `docs/02-design-system.md` sudah diselaraskan dengan nilai-nilai di CSS ini (tipografi, spacing, komponen, breakpoint) |
| `brand-spec.md` | Ringkasan token warna/font versi prototipe |
| `assets/fonts/geist-latin.woff2`, `geist-mono-latin.woff2` | Font lokal (bahan; build memakai `next/font/google`, lihat `AGENTS.md` §5) |

## Foto kandidat slot (7 slot, lihat `docs/07-image-plan.md` §3)

| Slot | Berkas | Peran di prototipe |
|---|---|---|
| IMG-01 | `assets/img/hero-desk.jpg` | Hero (meja kerja) |
| IMG-02 | `assets/img/audience-law.jpg` | Audiens konsultan hukum |
| IMG-03 | `assets/img/audience-arch.jpg` | Audiens studio arsitektur |
| IMG-04 | `assets/img/audience-software.jpg` | Audiens software house |
| IMG-05 | `assets/img/audience-professional.jpg` | Audiens kantor profesional |
| IMG-06 | `assets/img/implementation.jpg` | Implementasi (rapat) |
| IMG-07 | `assets/img/cta-office.jpg` | CTA penutup (kantor pagi) |

Semua masih JPEG berwarna (prototipe memakai `filter: grayscale(1)`). Build wajib melewati `scripts/optimize-images.mjs` (`grayscale()`, rasio slot, webp q78, ≤ 220 KB) sesuai `docs/07` §5.

## Sebelum dipakai

- Foto berasal dari unduhan stok saat pembuatan prototipe. **Identifikasi sumber dan lisensinya dulu** untuk `public/images/CREDITS.md` (wajib, `docs/07` §7), atau ganti dengan foto milik pemilik. Kandidat alternatif yang ditolak/diuji tidak ikut diekspor.
- Nilai angka di prototipe (gaji, log, skor) hanya ilustratif. Angka resmi ada di test vector `docs/04-modules.md` — situs dan unit test harus memakai angka itu, bukan angka prototipe.
