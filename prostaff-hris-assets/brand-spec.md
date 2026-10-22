# ProStaff HRIS · brand spec

Sumber: brief pengguna (spesifikasi warna dan tipografi eksplisit). Tidak ada design system aktif, jadi token di bawah adalah kontrak visual untuk seluruh halaman.

## Enam token inti

| Token | Nilai | OKLch | Pakai |
|---|---|---|---|
| `--bg` | `#FFFFFF` | `oklch(100% 0 0)` | latar utama |
| `--surface` | `#FFFFFF` | `oklch(100% 0 0)` | jendela aplikasi, lembar dokumen |
| `--fg` | `#000000` | `oklch(0% 0 0)` | teks utama, isi tombol primer |
| `--muted` | `#71717A` | `oklch(55.17% 0.0138 285.9)` | teks sekunder di atas putih dan `#FAFAFA` |
| `--border` | `#E4E4E7` | `oklch(91.97% 0.004 286.3)` | hairline dekoratif |
| `--accent` | `#000000` | `oklch(0% 0 0)` | tanpa aksen warna; hitam adalah satu-satunya penekanan |

Turunan netral: `#FAFAFA` (98.51% 0 0), `#F4F4F5` (96.74% 0.0013 286.4), `#D4D4D8` (87.11% 0.0055 286.3), `#52525B` (44.19% 0.0146 285.8), `#A1A1AA` (71.18% 0.0129 286.1), `#0A0A0A` (14.48% 0 0), `#27272A` (27.39% 0.0055 286).

Aturan kontras terukur: `#71717A` di atas putih 4.83:1 dan di atas `#FAFAFA` 4.63:1. Di atas `#F4F4F5` nilainya 4.40:1, jadi teks sekunder pada permukaan hover memakai `#52525B` (7.73:1 di atas putih). Di atas hitam teks sekunder memakai `#A1A1AA` (8.19:1). Batas kontrol memakai `#71717A` atau lebih gelap.

## Font

- Display: `Geist` 600, tracking `-0.04em`, line-height 0.98. Berkas: `assets/fonts/geist-latin.woff2`.
- Body: `Geist` 400/500, 16px, line-height 1.6.
- Mono: `Geist Mono` 400/500 untuk eyebrow, label, tabel, log, angka, keycap. Berkas: `assets/fonts/geist-mono-latin.woff2`.

## Lima aturan yang membentuk bahasa visual

1. Semua pemisah adalah hairline 1px. Tidak ada kartu berbayang, tidak ada sudut membulat lebih dari 3px.
2. Rel vertikal 1px mengapit container 1200px, dan setiap section dipisah garis selebar container itu. Crosshair `+` menandai perpotongannya, maksimal dua per section.
3. Status dibaca dari bentuk, bukan warna: putus-putus untuk menunggu, isi hitam untuk disetujui, garis solid untuk ditolak.
4. Angka selalu mono, rata kanan, tabular. Satuan dan presisi ditulis penuh, termasuk milidetik.
5. Gerak hanya transisi warna 100ms. Tidak ada gradien, bayangan, blur, atau animasi berulang.

Satu kalimat: dokumen teknis yang bisa diklik, hitam di atas putih, dengan garis rambut sebagai satu-satunya ornamen.
