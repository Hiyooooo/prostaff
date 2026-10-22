# 06 — Anti-Slop (aturan keras)

"Slop" = tampilan dan teks generik hasil template. Untuk ProStaff, slop paling mudah muncul sebagai **dekorasi yang menolak minimalisme**: gradien, glow, kartu membulat, ikon berwarna, kopi klise. Aturan di bawah mengikat dan menang atas `02` sampai `05`.

## 1. Visual Dilarang

- **Gradien** apa pun (CSS, Tailwind, SVG), termasuk pada teks dan overlay foto.
- **Bayangan** (`box-shadow`, `drop-shadow`), **blur** (`filter`, `backdrop-filter`), **glow**, glassmorphism, mesh background, blob melayang.
- **Warna** selain hitam, putih, dan turunan netral di `02` §2. Tanpa aksen biru/ungu/hijau, tanpa status merah/hijau/kuning.
- Sudut membulat > 4px, bentuk pil, avatar bulat, kartu "melayang".
- Animasi: looping, scroll-reveal, counter naik, marquee, parallax, kursor berkedip, skeleton shimmer, konfeti.
- Emoji, ikon selain Lucide, ilustrasi vektor orang/maskot, gambar 3D, ikon dalam lingkaran berwarna.
- Mockup perangkat (laptop/ponsel) dengan layar berwarna. UI produk digambar langsung sebagai jendela bergaris.
- Bagian "Dipercaya oleh", baris logo klien, badge penghargaan, lencana "No. 1".
- **Gambar:** foto klise (jabat tangan, tim tertawa menatap laptop, pose menunjuk papan kaca, senyum korporat dipaksakan); patung dewi keadilan, palu hakim, timbangan; helm proyek dengan gulungan cetak biru sambil menunjuk; "hacker" berhoodie atau layar penuh kode hijau; foto dengan layar yang menampilkan UI atau teks terbaca; **wajah hasil AI**; hotlink ke situs foto; foto tanpa lisensi jelas; ilustrasi vektor atau gambar AI sebagai pengganti foto; foto orang asli di dalam mockup UI (avatar memakai inisial atau siluet kode).

## 2. Klaim, Logo, dan Merek Dilarang

- Logo atau lambang asli: perusahaan, bank, instansi, kementerian, pengadilan, lambang negara (Garuda), BPJS, DJP, OJK, lembaga sertifikasi (ISO dan sejenisnya), merek ERP/perangkat. Semua logo dibuat sendiri dan ditandai ilustratif.
- Menyebut atau meniru produk atau situs lain sebagai pembanding (termasuk referensi gaya). Referensi gaya tidak boleh muncul di copy, komentar, atau kode.
- Testimoni, kutipan pelanggan, jumlah pengguna, rating, studi kasus pelanggan, harga.
- Klaim sertifikasi atau kepatuhan sebagai fakta.

**Dilarang → gunakan**

| Dilarang | Gunakan |
|---|---|
| "Sesuai peraturan pajak" | "Perhitungan mengacu pada ketentuan PPh 21 dan BPJS yang berlaku. Konfigurasi final diverifikasi pengguna." |
| "100% aman" / "anti-bobol" | "Akses diatur per folder dan setiap perubahan tercatat di log audit." |
| "Log tidak bisa diubah" | "Log hanya menambah entri. Tidak ada fungsi sunting." |
| "Terhubung langsung ke DJP/BPJS" | "Ekspor CSV untuk keperluan pelaporan." |
| "Bersertifikat ISO 27001" | (hapus) atau "Sertifikasi belum diklaim." |
| "Proctoring AI" / "pengawasan kamera" | "Proctoring berbasis log fokus jendela. Tanpa rekaman kamera atau layar." |
| "Real-time" tanpa mekanisme | "Rekap diperbarui saat catatan baru disimpan." |
| "Ekspor instan" | "Ekspor CSV atau PDF tanpa menunggu antrean." |
| "Dipercaya 500+ kantor" | (hapus) |
| "Lebih cepat dari X" | "Aksi utama selesai dalam satu klik atau satu shortcut." |

## 3. Copy Dilarang

- Kata klise: revolusioner, terdepan, seamless, game-changer, all-in-one, canggih, inovatif, solusi terbaik, kelas dunia, cutting-edge, next-level, powerful, supercharge, unlock, effortless.
- Tanda seru. Pertanyaan retoris. Em dash "—" di halaman.
- Kalimat tanpa angka atau mekanisme yang menyatakan keunggulan ("sangat mudah digunakan", "cepat dan andal").
- Sapaan "kamu", "Bapak/Ibu", dan nada akrab atau bercanda.
- Kalimat > 20 kata (kecuali jawaban FAQ ≤ 50 kata dan lead ≤ 28 kata).

## 4. Copy Wajib

- Sapaan "Anda". Kalimat deklaratif pendek.
- Setiap klaim fitur menyebut **mekanisme** (shortcut, format, rumus) atau **angka** (1 klik, 4 kriteria, 29 sub-fitur).
- Istilah teknis dan shortcut dalam `<kbd>` atau mono.
- Angka rupiah penuh dengan titik ribuan. Zona waktu "WIB" untuk stempel waktu.
- Placeholder dan klaim ditandai di kode (`// ILUSTRATIF:`, `// KLAIM:`).

## 5. Kode Dilarang

- `any`, `@ts-ignore` tanpa alasan tertulis, `as unknown as`.
- Hex atau `rgb()` di komponen; `style={{ color|background|border }}` berisi warna; kelas palet Tailwind default (`bg-zinc-500`, `text-red-600`, ...) dan `bg-black`/`text-white` langsung (pakai token).
- `fetch`, `XMLHttpRequest`, `navigator.geolocation`, `getUserMedia`, `URL.createObjectURL`, atribut `download`, `localStorage`, `sessionStorage`, `setInterval`, `requestAnimationFrame`, `window.open`.
- Pendengar keyboard global (`window.addEventListener("keydown")`). Pintasan hanya di pembungkus demo.
- `dangerouslySetInnerHTML` selain di `JsonLd.tsx`.
- Library animasi, chart, UI kit, set ikon selain `lucide-react`. Tag `<svg>` buatan sendiri di `src/components` (ikon harus dari Lucide; crosshair memakai elemen `span`).

## 6. Visual Wajib (penanda desain disengaja)

1. **Hairline 1px** sebagai satu-satunya bahasa garis; bingkai halaman dengan rel kiri dan kanan di ≥ 768px.
2. **Crosshair `+`** di sudut section (≤ 2 per section, ≥ 768px).
3. **Eyebrow berformat jalur** `prostaff / {section}` di setiap section.
4. **Keycap `<kbd>`** untuk setiap shortcut yang disebut di copy dan demo.
5. **Status chip bentuk + teks** (putus-putus, solid, terisi hitam), tidak pernah hanya warna.
6. **Angka mono rata kanan** di semua tabel, log, dan rupiah.
7. **Foto hitam-putih** berperlakuan seragam (`02` §6.10) dengan chip "FOTO ILUSTRASI".
8. **Ritme latar** putih / `#FAFAFA` / hitam sesuai `02` §4.2, dan bentuk demo berbeda per modul.
9. Hero memuat H1 tiga baris pendek dan jendela pencarian statis.

## 7. Uji Anti-Slop (jawab di laporan akhir; semua harus sesuai)

| # | Pertanyaan | Jawaban yang benar |
|---|---|---|
| 1 | Adakah warna selain hitam, putih, dan abu-abu netral di tampilan mana pun? | Tidak |
| 2 | Adakah gradien, bayangan, blur, atau glow? | Tidak |
| 3 | Adakah sudut membulat > 4px atau bentuk pil? | Tidak |
| 4 | Apakah setiap section punya elemen visual selain teks (foto, demo, tabel, diagram)? | Ya |
| 5 | Apakah semua status terbaca tanpa warna (teks dan bentuk)? | Ya |
| 6 | Adakah foto bergaya stok klise atau layar berisi UI/teks terbaca? | Tidak |
| 7 | Adakah animasi yang berulang atau muncul saat scroll? | Tidak |
| 8 | Apakah semua angka di UI sama dengan test vector `04`? | Ya |
| 9 | Adakah klaim tanpa angka atau mekanisme, atau kata klise? | Tidak |
| 10 | Apakah setiap demo bisa dioperasikan hanya dengan keyboard? | Ya |

## 8. Audit Otomatis

Jalankan dari root proyek. **Setiap blok harus tanpa keluaran** (kecuali pengecualian sah di bawahnya). Perbaiki sumbernya, jangan mengakali pola.

```bash
# 1. Em dash di kode dan copy
grep -rn "—" src --include="*.ts" --include="*.tsx" --include="*.css"

# 2. Gradien, bayangan, blur
grep -rnE "gradient|\bvia-|\bfrom-\[|\bto-\[|shadow|blur|backdrop-" src

# 3. Radius berlebih
grep -rnE "rounded-(sm|md|lg|xl|2xl|3xl|full)|border-radius: *([5-9]|[1-9][0-9])px" src

# 4. Warna di luar token: hex (selain globals.css dan brand.ts), palet Tailwind, black/white langsung, style inline warna
grep -rnE "#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b|rgba?\(" src --include="*.ts" --include="*.tsx" --include="*.css" \
  | grep -v "src/app/globals.css" | grep -v "src/lib/brand.ts"
grep -rnE "\b(bg|text|border|ring|fill|stroke)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone|black|white)(-[0-9]{2,3})?\b" src
grep -rnE "style=\{\{[^}]*(color|background|border)" src

# 5. Animasi
grep -rnE "infinite|animate-|@keyframes|setInterval|requestAnimationFrame" src

# 6. Jaringan dan perangkat
grep -rnE "fetch\(|XMLHttpRequest|geolocation|getUserMedia|createObjectURL|localStorage|sessionStorage|window\.open| download=" src
grep -rn "addEventListener(\"keydown\"" src

# 7. Ikon, svg buatan sendiri, emoji
grep -rnE "from \"(react-icons|@heroicons|@fortawesome|@phosphor|@tabler)" src
grep -rn "<svg" src/components
grep -rnP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" src

# 8. Copy klise, tanda seru, klaim terlarang, brand lain
grep -rniE "revolusioner|terdepan|seamless|game-changer|all-in-one|canggih|inovatif|solusi terbaik|kelas dunia|cutting-edge|next-level|supercharge|effortless" src
grep -rnE "[A-Za-z0-9)]!( |$|\"|'|<)" src/components src/lib/faq.ts
grep -rniE "100% ?aman|tidak bisa diubah|iso ?27001|bersertifikat|tersertifikasi|terhubung langsung|dipercaya oleh|aggregateRating|\"review\"|offers" src
grep -rniE "notion|vercel" src

# 9. Foto
grep -rn "<img" src
grep -rnE "remotePatterns" next.config.ts
grep -rnE "https?://(images\.unsplash|images\.pexels|pixabay|cdn\.|unsplash\.com|pexels\.com)" src next.config.ts
grep -rn "priority" src

# 10. Dependensi terlarang
grep -nE "framer-motion|gsap|lottie|recharts|chart\.js|\"d3|react-icons|@heroicons|shadcn|@mui|@chakra" package.json
```

**Pengecualian sah (hanya ini):**
- Blok 4: `#` pada tautan anchor (`href="#library"`) tidak cocok pola heksa 3/6 digit selama id bukan kombinasi `[0-9A-F]` murni; bila cocok, ganti nama id.
- Blok 6: `Date.now` boleh ada (tidak diaudit) sebagai nilai default prop `now` di `AttendanceDemo.tsx`.
- Blok 8: baris `!` hasil operator (`!==`, `!x`) tidak cocok pola; bila `x!` (non-null assertion) terdeteksi, ganti dengan pengecekan eksplisit.
- Blok 9 `priority`: boleh muncul **hanya** di `PhotoSlot.tsx` (definisi prop) dan satu pemanggilan untuk IMG-01. `public/images/CREDITS.md` memuat URL sumber dan berada di luar audit hotlink.
- `dangerouslySetInnerHTML` hanya di `JsonLd.tsx`:
  ```bash
  grep -rn "dangerouslySetInnerHTML" src | grep -v "src/components/JsonLd.tsx"
  ```
  harus tanpa keluaran.
