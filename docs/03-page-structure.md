# 03 — Struktur Halaman dan Copy

Urutan section **tetap**. Salin copy persis. Aturan penulisan di §4. Tanda **[P]** = placeholder ilustratif (tulis komentar `// ILUSTRATIF:`). Tanda **[K#]** = klaim (tulis komentar `// KLAIM: K#`, lihat `01` §9).

## 1. Peta Section

| # | Section | id | Latar | Visual utama | Slot foto |
|---|---|---|---|---|---|
| 0 | Skip link + Navbar | — | putih | navbar bergaris | — |
| 1 | Hero | `hero` | putih | H1 tipografis + foto + `HeroWindow` (palet pencarian) | IMG-01 |
| 2 | Spesifikasi | `spesifikasi` | putih | strip 4 sel angka | — |
| 3 | Audiens | `audiens` | `#FAFAFA` | 4 kolom foto + teks | IMG-02, IMG-03, IMG-04, IMG-05 |
| 4 | Prinsip | `prinsip` | **hitam** | tabel shortcut keycap | — |
| 5 | Library (bintang) | `library` | putih | jendela 3 panel interaktif | — |
| 6 | Perizinan | `perizinan` | `#FAFAFA` | form + log status | — |
| 7 | Absensi | `absensi` | putih | tombol besar + log + rekap | — |
| 8 | Gaji | `gaji` | `#FAFAFA` | tabel keuangan + pratinjau CSV/PDF | — |
| 9 | Exam | `exam` | putih | lembar kasus + rubrik | — |
| 10 | Alur data | `alur` | **hitam** | diagram 4 baris | — |
| 11 | Implementasi | `implementasi` | putih | 3 langkah + foto | IMG-06 |
| 12 | FAQ | `faq` | `#FAFAFA` | akordeon `<details>` | — |
| 13 | CTA penutup | `demo` | **hitam** + foto | foto + overlay datar | IMG-07 |
| 14 | Footer | — | **hitam** | kolom tautan | — |

**CTA primer "Jadwalkan demo" (6×):** Navbar (#0), Hero (#1), Audiens (#3), Alur data (#10), Implementasi (#11), CTA penutup (#13). Semua ke `CONTACT_MAILTO` di `site.ts`.

## 2. Copy per Section

### 0. Navbar
- Tautan: Library · Perizinan · Absensi · Gaji · Exam · FAQ
- CTA: **Jadwalkan demo**
- Skip link: "Lewati ke konten"

### 1. Hero (`hero`)
- Eyebrow: `prostaff / hris`
- H1 (tiga baris, tiap baris elemen blok): 
  - `Navigasi cepat.`
  - `Layar bersih.`
  - `Nol bloatware.`
- Sub: "ProStaff HRIS menyatukan arsip dokumen, presensi, perizinan, penggajian, dan uji teknis dalam satu antarmuka monokrom. Aksi utama selesai dari keyboard, tanpa pop-up dan tanpa tur onboarding." **[K1]**
- CTA primer: **Jadwalkan demo** · sekunder: **Lihat Library** (`#library`)
- Catatan mikro: "Demo 30 menit bersama tim kami. Tidak perlu kartu kredit." **[P][K7]**
- Foto: IMG-01 (4:5) di kolom kanan desktop; di mobile tampil setelah CTA. Chip `FOTO ILUSTRASI`.
- `HeroWindow` (lebar penuh di bawah H1, statis, lihat `04` §1).

Tata letak desktop: baris atas 12 kolom = H1 + sub + CTA (kolom 1 sampai 8) dan foto (kolom 9 sampai 12). `HeroWindow` di bawahnya selebar 12 kolom.

### 2. Spesifikasi (`spesifikasi`)
Empat sel (tanpa H2, `<ul>` dengan `aria-label="Spesifikasi ringkas"`):

| Angka | Label |
|---|---|
| `5` | modul dalam satu layar kerja |
| `1` | klik untuk mencatat presensi |
| `0` | pop-up di dalam aplikasi **[K1]** |
| `2` | format ekspor gaji: CSV dan PDF **[K2]** |

### 3. Audiens (`audiens`)
- Eyebrow: `prostaff / audiens`
- H2: "Dibuat untuk kantor yang bekerja dengan dokumen."
- Lead: "Empat jenis kantor, satu keluhan yang sama: terlalu banyak menu dan terlalu sedikit waktu."

Empat kolom, tiap kolom = foto + H3 + teks:

| Slot | H3 | Teks |
|---|---|---|
| IMG-02 | Konsultan hukum | Berkas, SOP, dan template perjanjian tersimpan dalam satu hierarki folder. Lembur tercatat sebelum dikerjakan. |
| IMG-03 | Studio arsitektur | Jam studio berbeda tiap proyek. Presensi satu klik mencatat masuk dan keluar tanpa menyela sesi menggambar. |
| IMG-04 | Software house | Uji teknis berupa studi kasus nyata, dinilai dengan rubrik yang sama untuk setiap kandidat. |
| IMG-05 | Kantor profesional | Akuntan dan konsultan menerima tabel gaji rapi dan ekspor CSV untuk pembukuan. |

- Keterangan di bawah grup foto (mono 12px): "Foto ilustrasi. Orang dalam foto bukan pelanggan atau karyawan ProStaff."
- CTA primer: **Jadwalkan demo**

### 4. Prinsip (`prinsip`) — pita hitam
- Eyebrow: `prostaff / prinsip`
- H2: "Empat aturan antarmuka."
- Lead: "Aturan ini berlaku untuk setiap layar di ProStaff."

Empat aturan (daftar bernomor `01`..`04`, mono):

| No | Judul | Teks |
|---|---|---|
| 01 | Satu aksi, satu kontrol. | Presensi, kirim izin, dan buka dokumen masing-masing punya satu kontrol yang jelas. |
| 02 | Keyboard lebih dulu. | Setiap aksi utama punya shortcut. Mouse tetap bisa dipakai. |
| 03 | Tanpa gangguan. | Tanpa pop-up, banner promosi, atau tur onboarding di dalam aplikasi. **[K1]** |
| 04 | Data terbaca di tabel. | Angka rata kanan, huruf mono, rupiah ditulis penuh. |

Tabel shortcut (visual utama; judul kecil `Shortcut di demo halaman ini`; catatan: "Berlaku saat panel demo sedang difokus."):

| Modul | Shortcut | Aksi |
|---|---|---|
| Library | `/` | Fokus ke kolom cari |
| Library | `↑` `↓` | Pindah antar hasil |
| Library | `Enter` | Buka dokumen terpilih |
| Perizinan | `1` `2` `3` | Pilih jenis izin: Cuti, Sakit, Lembur |
| Perizinan | `Ctrl` + `Enter` | Kirim pengajuan |
| Perizinan | `Esc` | Kosongkan form |
| Absensi | `Space` | Catat Masuk atau Keluar (tombol terfokus) |

### 5. Library (`library`) — bintang halaman
- Eyebrow: `prostaff / library`
- Ikon `BookOpen`, H2: "Library: wiki dokumen yang Anda telusuri dari keyboard."
- Lead: "Folder berlapis, dokumen ditulis dalam markdown, pencarian menjangkau judul, jalur, dan isi."
- Demo: `LibraryDemo` (`04` §3).
- Petunjuk di bawah demo (mono 12px): "Coba: tekan `/`, ketik `dokumen`, lalu `Enter`."
- Tabel sub-fitur ringkas di samping/bawah demo (isi `04` §3.1).
- Tautan teks: "Lihat alur data antar modul" → `#alur`.

### 6. Perizinan (`perizinan`)
- Eyebrow: `prostaff / perizinan`
- Ikon `CalendarCheck`, H2: "Perizinan: ajukan dari keyboard, telusuri dari log."
- Lead: "Pilih jenis izin dengan `1`, `2`, atau `3`. Kirim dengan `Ctrl` + `Enter`. Setiap perubahan status menambah satu baris log."
- Demo: `PermitDemo` (`04` §4). Petunjuk: "Coba: tekan `1`, isi tanggal, lalu `Ctrl` + `Enter`."

### 7. Absensi (`absensi`)
- Eyebrow: `prostaff / absensi`
- Ikon `Fingerprint`, H2: "Absensi: satu klik, satu baris log."
- Lead: "Tombol Masuk dan Keluar mencatat stempel waktu WIB sampai milidetik. Rekap diperbarui saat catatan baru disimpan." **[K3]**
- Demo: `AttendanceDemo` (`04` §5).

### 8. Gaji (`gaji`)
- Eyebrow: `prostaff / gaji`
- Ikon `Wallet`, H2: "Gaji: komponen terbaca dalam satu tabel."
- Lead: "Pendapatan, iuran BPJS, PPh 21, dan reimbursement per karyawan. Pilih satu kolom untuk melihat perhitungan pajaknya."
- Demo: `PayrollDemo` (`04` §6).
- Catatan mikro di bawah tabel: "Angka ilustratif. Perhitungan disederhanakan untuk demonstrasi. PPh 21 dan BPJS mengacu pada ketentuan yang berlaku dan diverifikasi saat konfigurasi." **[K4]**

### 9. Exam (`exam`)
- Eyebrow: `prostaff / exam`
- Ikon `ClipboardCheck`, H2: "Exam: uji kemampuan lewat kasus kerja nyata."
- Lead: "Setiap kandidat mengerjakan studi kasus yang sama dan dinilai dengan rubrik empat kriteria berbobot."
- Demo: `ExamDemo` (`04` §7).

### 10. Alur data (`alur`) — pita hitam
- Eyebrow: `prostaff / alur-data`
- H2: "Satu persetujuan, beberapa modul ikut berubah."
- Lead: "Data berpindah antar modul tanpa input ulang. Empat alur di bawah memakai angka dari demo di atas."
- Visual: `DataFlow` (`04` §8).
- CTA primer: **Jadwalkan demo**

### 11. Implementasi (`implementasi`)
- Eyebrow: `prostaff / implementasi`
- H2: "Tiga langkah menuju hari kerja pertama."
- Foto: IMG-06 (3:2), chip `FOTO ILUSTRASI`.
- Langkah (daftar bernomor):

| No | Judul | Teks |
|---|---|---|
| 01 | Impor | Unggah struktur folder SOP dan daftar karyawan dalam format CSV. |
| 02 | Atur | Tetapkan jam shift, jenis izin, komponen gaji, dan rubrik Exam. |
| 03 | Jalankan | Tim memakai Absensi dan Perizinan sejak hari pertama. Library terisi bertahap. |

- Catatan: "Durasi implementasi bergantung pada ukuran kantor dan dibahas saat demo." **[P]**
- CTA primer: **Jadwalkan demo**

### 12. FAQ (`faq`)
- Eyebrow: `prostaff / faq`
- H2: "Pertanyaan yang sering diajukan."
- 8 pertanyaan, `<details>`/`<summary>` (tanpa JS). **Sumber tunggal: `src/lib/faq.ts`** (dipakai UI dan JSON-LD `FAQPage`).

| # | Pertanyaan | Jawaban |
|---|---|---|
| 1 | Apakah ProStaff memakai pop-up atau tur onboarding? | Tidak. Tidak ada pop-up, banner promosi, atau tur onboarding di dalam aplikasi. Panduan pemakaian tersedia sebagai dokumen biasa di Library. **[K1]** |
| 2 | Bagaimana presensi dicatat? | Satu klik pada tombol Masuk atau Keluar. Sistem menyimpan stempel waktu WIB sampai milidetik dan menampilkannya di log histori. Geofencing opsional membatasi lokasi presensi. **[K3]** |
| 3 | Apakah perhitungan PPh 21 dan BPJS sudah sesuai aturan? | Perhitungan mengacu pada ketentuan yang berlaku dan dikonfigurasi bersama Anda. Contoh di halaman ini disederhanakan untuk demonstrasi. Konfigurasi final sebaiknya diverifikasi konsultan pajak Anda. **[K4]** |
| 4 | Format ekspor apa yang tersedia? | CSV dan PDF. CSV memuat satu baris per karyawan dengan kolom pokok, jabatan, tunjangan, lembur, bruto, BPJS, PPh 21, reimbursement, dan take-home pay. **[K2]** |
| 5 | Apakah Library mendukung markdown? | Ya. Dokumen ditulis dalam markdown dan disusun dalam hierarki folder. Pencarian menjangkau judul, jalur folder, dan isi dokumen. |
| 6 | Bagaimana uji teknis dinilai? | Kandidat mengerjakan studi kasus. Penilai memberi skor 0 sampai 4 pada empat kriteria berbobot, lalu sistem menghitung skor 0 sampai 100. Ambang lulus ditetapkan tim Anda. Proctoring memakai log fokus jendela, bukan rekaman kamera. **[K5]** |
| 7 | Siapa yang bisa membuka dokumen di Library? | Akses diatur per folder: baca, tulis, atau tersembunyi. Setiap perubahan dokumen tercatat di log audit. **[K6]** |
| 8 | Bagaimana dengan keamanan data? | Data karyawan dan dokumen dilindungi kontrol akses berbasis peran dan log audit. Kebijakan penyimpanan dan enkripsi dijelaskan dalam dokumen keamanan yang dibagikan saat demo. Sertifikasi belum diklaim. **[K6]** |

### 13. CTA penutup (`demo`) — foto + overlay datar
- Foto latar IMG-07 (16:9) dengan `--photo-overlay`; chip `FOTO ILUSTRASI` di kiri bawah.
- H2 (Display 56/32px): "Lihat ProStaff bekerja dengan data kantor Anda."
- Sub: "Demo 30 menit. Kami memakai struktur folder dan daftar karyawan contoh dari kantor Anda." **[P][K7]**
- CTA primer: **Jadwalkan demo** · sekunder: **Kirim pertanyaan** (`mailto` tanpa subjek demo)

### 14. Footer
- Kolom 1: Logo + "Sistem manajemen SDM minimalis dan efisien."
- Kolom 2 "Modul": Library, Perizinan, Absensi, Gaji, Exam (anchor)
- Kolom 3 "Halaman": Spesifikasi, Alur data, Implementasi, FAQ (anchor)
- Kolom 4 "Kontak": `halo@prostaff.example` **[P]**, "Jakarta, Indonesia" **[P]**
- Baris bawah (mono 12px): "© 2026 ProStaff. Situs demonstrasi. Logo, nama perusahaan, dan data pada halaman ini ilustratif." · "Foto ilustrasi."

## 3. Komentar Kode Wajib

Tulis persis di tempat terkait:

```ts
// ILUSTRATIF: perusahaan, nama karyawan, angka gaji, dan log dummy. Bukan data pelanggan.
// ILUSTRATIF: domain placeholder, ganti dengan domain dan email asli sebelum rilis.
// KLAIM: K1 tanpa pop-up/tur onboarding di aplikasi (prinsip desain, pemilik wajib konfirmasi).
// KLAIM: K4 PPh 21 dan BPJS disederhanakan; lihat daftar penyederhanaan (a) sampai (h) di payroll.ts.
```

## 4. Aturan Copywriting

- **Tanpa tanda "—" (em dash) di halaman.** Boleh di docs, jangan di `src/`. Gunakan titik atau titik dua.
- Tanpa tanda seru. Tanpa pertanyaan retoris. Sapaan "Anda".
- Batas panjang: H1 per baris ≤ 3 kata. H2 ≤ 64 karakter. Lead ≤ 28 kata. Deskripsi modul ≤ 24 kata. Teks kartu ≤ 28 kata. Jawaban FAQ ≤ 50 kata.
- Kata dilarang: revolusioner, terdepan, seamless, game-changer, all-in-one, canggih, inovatif, solusi terbaik.
- Nama shortcut ditulis sebagai `<kbd>`. Angka memakai pemisah titik ribuan Indonesia (`Rp20.691.000`).
- **Data dummy:** perusahaan ilustratif Arunika & Rekan, Studio Rancang Tenggara, Kodeksa Teknologi; karyawan Raka Mahendra, Laras Wulandari, Intan Safitri; atasan Bima Santoso; mata uang IDR; zona waktu WIB (UTC+07:00); kota Jakarta; tanggal sekitar 12 sampai 20 Oktober 2026.
- Tidak ada testimoni, logo klien, harga, rating, atau angka pengguna.
- Tautan eksternal: tidak ada selain `mailto`.
