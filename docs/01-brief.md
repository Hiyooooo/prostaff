# 01 — Brief: ProStaff HRIS

## 1. Ringkasan Produk

ProStaff HRIS adalah sistem manajemen SDM dengan antarmuka monokrom tanpa distraksi. Lima modul: **Library** (wiki dokumen markdown), **Perizinan**, **Absensi**, **Gaji**, **Exam**. Ide produknya satu kalimat: *HRIS tidak boleh lebih berisik daripada pekerjaan yang dikelolanya.*

Halaman ini adalah landing page promosi. Fungsinya membuat pengambil keputusan menjadwalkan demo.

## 2. Target Audiens

**Pengambil keputusan** (membaca halaman ini):
- Managing partner kantor hukum, 10 sampai 60 orang
- Principal studio arsitektur, 10 sampai 80 orang
- CTO atau engineering manager software house, 20 sampai 100 orang
- Office manager kantor profesional lain (akuntan publik, konsultan)

**Pengguna harian** (menentukan apakah produk dipakai):
- Associate hukum, drafter dan arsitek, engineer, staf administrasi

**Keluhan nyata yang dijawab halaman:**

| Keluhan | Jawaban di halaman |
|---|---|
| Menu HRIS terlalu banyak, setiap tugas butuh banyak klik | Presensi 1 klik, form izin dari keyboard |
| Pop-up, banner, dan tur onboarding menyela pekerjaan | Prinsip "tanpa gangguan" (`KLAIM`) |
| SOP dan template tersebar di banyak folder bersama | Library dengan hierarki folder dan pencarian |
| Slip gaji dan rekap sulit dibawa ke pembukuan | Tabel rapi + ekspor CSV dan PDF |
| Uji rekrutmen pilihan ganda tidak mencerminkan kerja nyata | Exam berbasis studi kasus dengan rubrik |
| Riwayat persetujuan izin tidak jelas siapa mengubah apa | Log status yang hanya menambah entri |

## 3. Tujuan Halaman (berurut prioritas)

1. **Konversi utama**: klik "Jadwalkan demo" (tautan `mailto` placeholder).
2. **Konversi sekunder**: membuka dan mencoba demo Library (bintang halaman).
3. **Tes 5 detik**: pengunjung paham bahwa ini HRIS yang bersih dan cepat dari headline, sub, dan jendela hero.
4. **Tes 30 sampai 60 detik**: pengunjung sudah mencoba minimal satu demo (Library atau Absensi) dan melihat tabel Gaji.

## 4. Proposisi Nilai

> Semua urusan SDM kantor profesional dalam satu layar monokrom, dengan aksi utama yang selesai dari keyboard dan tanpa pop-up.

Tiga pilar: **navigasi cepat** (keyboard dan pencarian), **layar bersih** (hitam, putih, abu-abu, hairline), **nol bloatware** (tanpa pop-up, banner, tur onboarding di dalam aplikasi, `KLAIM`).

## 5. Kerangka Persuasi

Masalah (terlalu berisik) → Prinsip (empat aturan antarmuka) → Bukti (lima demo yang bisa dicoba) → Integrasi (alur data antar modul) → Implementasi (tiga langkah) → Keberatan (FAQ) → Ajakan (demo).

Argumen dibuka dengan **cara kerja antarmuka**, bukan dengan daftar fitur. Fitur muncul sebagai bukti.

## 6. Tone dan Voice

| Ciri | Aturan |
|---|---|
| Sapaan | "Anda". Tanpa "kamu", tanpa "Bapak/Ibu" |
| Gaya | Spesifikasi teknis: kalimat deklaratif pendek, maksimal 20 kata |
| Isi | Setiap klaim memuat angka, satuan, atau mekanisme |
| Nada | Datar, presisi, tanpa antusiasme berlebih. Tanpa humor, tanpa retorika |
| Format kata | Istilah teknis dan nama shortcut dalam huruf mono (`Ctrl`, `Enter`) |
| **Dihindari** | revolusioner, terdepan, seamless, game-changer, all-in-one, canggih, inovatif, solusi terbaik, tanda seru, pertanyaan retoris |

Contoh benar: "Satu klik mencatat masuk. Stempel waktu tersimpan sampai milidetik."
Contoh salah: "Rasakan pengalaman presensi revolusioner yang seamless!"

Tone ini **dingin dan ringkas** seperti dokumentasi teknis. Jangan memakai nada hangat, ramah, atau bercerita.

## 7. Referensi Gaya

Inspirasi: antarmuka wiki dan dokumentasi teknis monokrom (hierarki folder, pencarian cepat, keycap). Ambil prinsip: ruang kosong, hairline, tipografi sebagai elemen utama. **Jangan menyalin** tata letak, kopi, atau aset siapa pun.

## 8. Di Luar Cakupan

- Aplikasi HRIS sungguhan, autentikasi, basis data
- Halaman harga, blog, halaman kebijakan privasi lengkap, multi-bahasa
- Ekspor/unduhan file sungguhan, akses kamera atau lokasi
- Testimoni, logo klien, studi kasus pelanggan

## 9. Default yang Diasumsikan

| Hal | Asumsi (ubah hanya atas keputusan pemilik) |
|---|---|
| CTA primer | "Jadwalkan demo" → `mailto:halo@prostaff.example?subject=Jadwal%20demo%20ProStaff%20HRIS`. Domain `.example` adalah **placeholder** |
| CTA sekunder | "Lihat Library" → `#library` |
| Harga | Tidak ditampilkan. Tidak ada `offers` di JSON-LD |
| Logo | Wordmark ProStaff dibuat dengan kode, **ilustratif** |
| Testimoni, logo klien, rating | Tidak ada |
| Sertifikasi | Tidak ada klaim sertifikasi apa pun |
| Dummy | Perusahaan ilustratif: Arunika & Rekan (hukum), Studio Rancang Tenggara (arsitek), Kodeksa Teknologi (software). Karyawan: Raka Mahendra, Laras Wulandari, Intan Safitri, Bima Santoso (atasan). Mata uang IDR, zona waktu WIB (UTC+07:00), kota Jakarta |
| Domain situs | `https://prostaff.example` (placeholder, di `site.ts`) |

**Klaim teknis yang harus ditandai `KLAIM`** (komentar kode + laporan akhir):

| ID | Klaim | Wording aman |
|---|---|---|
| K1 | Tanpa pop-up, banner, atau tur onboarding di aplikasi | Tulis sebagai prinsip desain, bukan jaminan |
| K2 | Ekspor CSV/PDF "instan" | "tanpa menunggu antrean" |
| K3 | Stempel waktu presisi milidetik | Menyebut resolusi penyimpanan, bukan akurasi jam perangkat |
| K4 | Perhitungan PPh 21 dan BPJS | "mengacu pada ketentuan yang berlaku", disederhanakan di demo |
| K5 | Proctoring | "log fokus jendela", bukan rekaman kamera atau AI |
| K6 | Akses per folder dan log audit | Fitur dijelaskan, tidak ada klaim keamanan absolut |
| K7 | "Demo 30 menit, tanpa kartu kredit" | Placeholder penawaran, pemilik wajib konfirmasi |
