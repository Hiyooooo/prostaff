# 04 — Modul, Demo, Rumus, dan Test Vector

Semua angka di file ini **dihitung dengan skrip** dan harus muncul **identik** di UI, unit test, dan JSON-LD (bila relevan). Tulis fungsi murni di `src/lib/` lebih dulu, tulis test dari tabel vektor, lalu bangun komponen.

## 1. Hero Mockup (`HeroWindow.tsx`)

Statis (server component). Gambar suatu momen pencarian di Library. Pembungkus `<figure>` dengan `<figcaption class="sr-only">Contoh pencarian dokumen di Library: kata "dokumen" menghasilkan 3 hasil.</figcaption>`. Seluruh isi jendela `aria-hidden="true"`.

| Elemen | Isi |
|---|---|
| Title bar | tiga kotak 8×8px outline hitam + jalur mono `prostaff.example / library` |
| Panel kiri (240px, tersembunyi < 768px) | pohon: `Hukum 2`, `Operasional 2`, `SDM 2`, `Teknik 2` (ikon `Folder` 16px, hitungan mono rata kanan) |
| Panel kanan, baris input | keycap `/` + teks `dokumen` + penanda jumlah `3 hasil` (rata kanan) |
| Hasil 1 (terpilih: bg hitam, teks putih) | `Hukum / Kebijakan / Retensi Dokumen` · skor `5` |
| Hasil 2 | `Teknik / Standar / Penamaan Berkas` · skor `1` |
| Hasil 3 | `SDM / Kebijakan / Kerja Jarak Jauh` · skor `1` |
| Baris bawah | `↑` `↓` pilih · `Enter` buka · `Esc` tutup (keycap + mono 12px) |

Data hero **harus sama** dengan vektor pencarian `dokumen` di §3.4. Jangan menambah animasi (tanpa kursor berkedip).

## 2. Konvensi Demo (berlaku untuk semua)

- Komponen demo: `"use client"`, state lokal (`useState`/`useReducer`). **Tanpa** `fetch`, kamera, geolokasi, `localStorage`, unduhan, `setInterval`, `requestAnimationFrame`.
- Logika di `src/lib/`; komponen memanggil fungsi murni. Data seed di `src/lib/` (konstanta, bertanda `// ILUSTRATIF:`).
- Area hasil/log memakai `aria-live="polite"` (status) atau `role="alert"` (error). Pesan `aria-live` di-render ke `<p class="sr-only">` terpisah.
- Pintasan keyboard hanya aktif saat fokus berada **di dalam panel demo** (`onKeyDown` pada pembungkus), tidak pernah di `window`. Jangan merebut ketikan di elemen `input`, `textarea`, `select` kecuali dinyatakan.
- Semua kontrol dapat dijangkau dengan `Tab`, punya fokus terlihat, dan target sentuh ≥ 44px pada mobile.
- Reduced motion: tidak ada gerak untuk dimatikan; state berubah instan (lihat `02` §9).
- Reset: setiap demo punya tombol sekunder "Reset demo" yang mengembalikan seed.

---

## 3. Library (Bintang Utama)

**Ikon** `BookOpen` · **H3**: "Temukan dokumen dalam hitungan ketikan." · **Deskripsi** (18 kata): "Wiki internal berbasis markdown dengan hierarki folder. Cari berdasarkan judul, jalur, dan isi, lalu buka dokumen dari keyboard."

### 3.1 Tabel sub-fitur (tampil di section, tebal = sorotan)

| Fitur | Keterangan |
|---|---|
| **Direktori markdown berhierarki** | Folder berlapis (kategori / jenis / dokumen), dokumen ditulis dalam markdown, tampil sebagai sumber atau hasil render |
| **Pencarian keyboard** | `/` fokus cari, `↑` `↓` pindah hasil, `Enter` buka. Menjangkau judul, jalur, dan isi pembuka |
| Knowledge base SOP | Folder `Operasional/SOP` dan `SDM/Kebijakan` memuat prosedur yang ditautkan dari modul lain |
| Arsip dokumen perusahaan | Folder `Hukum` menyimpan template dan kebijakan retensi dokumen; akses diatur per folder **[K6]** |
| Modul e-learning | Dokumen bertipe `kursus` menampilkan daftar langkah yang bisa dicentang dan persentase kemajuan |

### 3.2 Bentuk demo (`LibraryDemo.tsx`)

Jendela 3 panel (desktop ≥ 1024px, tinggi tetap 480px). Mobile: panel tersusun vertikal; pohon dibungkus `<details>` "Folder".

1. **Panel kiri, pohon folder** (240px): level 1 `Hukum`, `Operasional`, `SDM`, `Teknik`; level 2 sub-folder; level 3 dokumen. Folder bisa dibuka/ditutup (ikon `Folder`/`FolderOpen`, `aria-expanded`). Default terbuka: `Operasional` dan `SDM`.
2. **Panel tengah-atas, bilah cari**: input dengan keycap `/` di kanan. Saat query tidak kosong, pohon digantikan **daftar hasil** (jalur mono + skor di kanan).
3. **Panel kanan, dokumen**: breadcrumb (`Operasional / SOP / Pengajuan Cuti`), tombol segmen `Tampilan` | `Sumber` (`aria-pressed`), badge `KURSUS` untuk dokumen bertipe kursus, lalu isi.
4. Dokumen terbuka default: **d2 Pengajuan Cuti**.
5. Interaksi: klik/`Enter` pada dokumen membukanya; `Esc` di bilah cari mengosongkan query. Panah `↑`/`↓` memindahkan baris terpilih (`aria-activedescendant`, pola listbox).
6. Pesan live: `"{n} hasil untuk {query}"` atau `"Tidak ada hasil untuk {query}"`.
7. Dokumen `kursus` (d1): daftar 4 langkah dengan checkbox, label "Kemajuan: {x}/4 ({persen}%)". State centang lokal.

### 3.3 Data seed (`src/lib/library.ts`)

Field `summary` adalah **paragraf pembuka** yang ikut dicari. Pencarian **tidak** menjangkau seluruh isi markdown (lihat penyederhanaan di §3.6).

| id | path | title | kind | summary |
|---|---|---|---|---|
| d1 | `Operasional/SOP/Onboarding Karyawan` | Onboarding Karyawan | kursus | Langkah hari pertama laptop akun dan akses repositori |
| d2 | `Operasional/SOP/Pengajuan Cuti` | Pengajuan Cuti | sop | Cuti diajukan lewat form perizinan dan disetujui atasan langsung |
| d3 | `Hukum/Template/Perjanjian Kerahasiaan` | Perjanjian Kerahasiaan | sop | Template NDA untuk klien dan karyawan baru |
| d4 | `Hukum/Kebijakan/Retensi Dokumen` | Retensi Dokumen | sop | Arsip berkas klien disimpan lima tahun setelah perkara selesai |
| d5 | `Teknik/Standar/Review Kode` | Review Kode | sop | Setiap pull request ditinjau satu rekan sebelum merge |
| d6 | `Teknik/Standar/Penamaan Berkas` | Penamaan Berkas | sop | Gunakan huruf kecil dan tanda hubung untuk dokumen gambar kerja |
| d7 | `SDM/Kebijakan/Lembur` | Kebijakan Lembur | sop | Lembur wajib disetujui sebelum dikerjakan lewat modul perizinan |
| d8 | `SDM/Kebijakan/Kerja Jarak Jauh` | Kerja Jarak Jauh | sop | Presensi tetap dicatat dan dokumen sensitif tidak dibawa keluar |

Tiap dokumen punya `markdown` (string). Struktur minimal: `# {title}`, paragraf = `summary` (boleh dengan `**tebal**`), `## Langkah` atau `## Aturan` dengan 2 sampai 3 butir `- `. Dokumen **d2** memakai teks persis berikut (jadikan template untuk yang lain):

```md
# Pengajuan Cuti

Cuti diajukan lewat form **Perizinan** dan disetujui atasan langsung.

## Langkah
- Buka form Perizinan dan pilih jenis Cuti
- Isi tanggal mulai dan tanggal selesai
- Kirim dengan Ctrl + Enter

## Aturan
- Hari kerja dihitung tanpa akhir pekan dan libur nasional
- Pengajuan yang melebihi sisa cuti ditolak otomatis
```

Dokumen **d7** menyebut Perizinan: butir "Ajukan lembur lewat form Perizinan sebelum jam kerja tambahan dimulai". Dokumen **d1** (kursus) punya 4 langkah: "Ambil laptop dan akun", "Atur akses repositori dan folder bersama", "Baca SOP Pengajuan Cuti", "Isi presensi pertama".

### 3.4 Fungsi dan test vector

**`searchDocs(query, docs)`**: `q = query.trim().toLowerCase()`. Bila `q` kosong, kembalikan `[]`. Skor per dokumen: `+3` bila `title` memuat `q`, `+2` bila `path` memuat `q`, `+1` bila `summary` memuat `q` (substring, tanpa peka huruf besar-kecil). Buang skor 0. Urutkan skor menurun, seri diurutkan `id` menaik (`localeCompare`). Kembalikan `{ id, score }[]`.

| query | hasil (id:skor, berurutan) |
|---|---|
| `dokumen` | d4:5, d6:1, d8:1 |
| `cuti` | d2:6 |
| `kebijakan` | d7:5, d4:2, d8:2 |
| `klien` | d3:1, d4:1 |
| `xyz` | (kosong) |
| `   ` (spasi) | (kosong) |
| `DOKUMEN` (huruf besar) | sama dengan `dokumen` |

**`breadcrumb(path)`** = `path.split("/")`.

| input | keluaran |
|---|---|
| `Hukum/Kebijakan/Retensi Dokumen` | `["Hukum","Kebijakan","Retensi Dokumen"]` |

**`countByRoot(docs)`** menghitung dokumen per folder level 1.

| keluaran |
|---|
| `{ Hukum: 2, Operasional: 2, SDM: 2, Teknik: 2 }` (total 8) |

**`progressPercent(done, total)`** = `total === 0 ? 0 : Math.round(done / total * 100)`.

| done, total | hasil |
|---|---|
| 2, 4 | 50 |
| 0, 4 | 0 |
| 4, 4 | 100 |
| 1, 3 | 33 |
| 0, 0 | 0 |

**`parseMarkdown(src)`** (di `markdown.ts`) mendukung subset: `# `, `## `, `- ` (butir), paragraf (baris berurutan digabung dengan spasi, dipisah baris kosong). Keluaran: `{ t: "h1"|"h2"|"p"|"li", x: string }[]`. **`parseInline(text)`** memecah `**tebal**` menjadi `string | { b: string }`. Render ke elemen React (`<h1>`, `<h2>`, `<p>`, `<ul><li>`, `<strong>`). **Dilarang** `dangerouslySetInnerHTML`.

Input:
```
# Kebijakan Lembur

Lembur wajib disetujui **sebelum** dikerjakan.

## Alur
- Ajukan lewat form
- Atasan menyetujui
```
Keluaran `parseMarkdown`:
```json
[{"t":"h1","x":"Kebijakan Lembur"},
 {"t":"p","x":"Lembur wajib disetujui **sebelum** dikerjakan."},
 {"t":"h2","x":"Alur"},
 {"t":"li","x":"Ajukan lewat form"},
 {"t":"li","x":"Atasan menyetujui"}]
```
`parseInline("Lembur wajib disetujui **sebelum** dikerjakan.")` →
`["Lembur wajib disetujui ", { "b": "sebelum" }, " dikerjakan."]`

### 3.5 Verifikasi akhir Library

- Ketik `dokumen` di bilah cari → 3 hasil berurutan d4, d6, d8 dengan skor 5, 1, 1; pesan live "3 hasil untuk dokumen".
- Ketik `xyz` → "Tidak ada hasil untuk xyz".
- `↓` lalu `Enter` pada hasil kedua membuka d6 dan breadcrumb menjadi `Teknik / Standar / Penamaan Berkas`.
- Di d1, centang 2 langkah → "Kemajuan: 2/4 (50%)".
- Tombol `Sumber` menampilkan markdown mentah d2 dalam `<pre>` mono; `Tampilan` menampilkan hasil render.

### 3.6 Penyederhanaan Library (daftar eksplisit)

(a) Pencarian menjangkau `title`, `path`, dan `summary`, bukan seluruh isi markdown.
(b) Tidak ada pencarian toleran salah ketik atau stemming.
(c) Parser markdown hanya mendukung subset di §3.4. Tulis komentar kode: `// SEDERHANA: subset markdown untuk demo`.

---

## 4. Perizinan

**Ikon** `CalendarCheck` · **H3**: "Ajukan, setujui, dan telusuri izin dari keyboard." · **Deskripsi** (20 kata): "Form izin dengan shortcut cepat dan log status yang tidak bisa disunting diam-diam. Sisa cuti terhitung otomatis dengan libur nasional."

### 4.1 Tabel sub-fitur

| Fitur | Keterangan |
|---|---|
| **Form keyboard-friendly** | `1` `2` `3` pilih jenis, `Tab` pindah kolom, `Ctrl` + `Enter` kirim, `Esc` kosongkan |
| **Log status transparan** | Setiap pengajuan dan keputusan menambah satu baris berstempel waktu. Tidak ada fungsi sunting atau hapus **[K6]** |
| Workflow approval cuti | Diajukan → disetujui atau ditolak atasan (simulasi tombol atasan di demo) |
| Izin sakit | Tidak mengurangi jatah cuti |
| Lembur | Jam 1 sampai 8, otomatis menjadi komponen di Gaji setelah disetujui |
| Transparansi sisa cuti | Panel: jatah, terpakai, menunggu, tersedia |

### 4.2 Bentuk demo (`PermitDemo.tsx`)

Dua kolom di desktop: **form** (kiri, 5/12) dan **log + sisa cuti** (kanan, 7/12). Mobile: tersusun vertikal.

Form:
1. Jenis izin (radiogroup horizontal): `1 Cuti` · `2 Izin sakit` · `3 Lembur` (keycap kecil di label). Default: Cuti.
2. Cuti dan Sakit: `Tanggal mulai`, `Tanggal selesai` (`<input type="date">`). Lembur: `Tanggal` dan `Jam lembur` (`<input type="number" min=1 max=8>`).
3. `Keterangan` (opsional, `<input type="text">`, maks 80 karakter).
4. Baris keluar: pratinjau "Hari kerja: {n}" (Cuti/Sakit) dihitung langsung; tombol primer **Kirim** + keycap `Ctrl` + `Enter`; tombol tautan "Isi contoh" (mengisi 2026-11-02 sampai 2026-11-06).
5. Bila Lembur dipilih, tampilkan tautan SOP: "SOP terkait: SDM / Kebijakan / Lembur (Library)".

Pintasan (aktif di dalam pembungkus form; abaikan angka `1`..`3` bila fokus di `input`/`textarea`): `1` Cuti, `2` Sakit, `3` Lembur, `Ctrl`/`Cmd` + `Enter` kirim, `Esc` reset form.

Kolom kanan:
- **Panel sisa cuti** (`Raka Mahendra`): `Jatah 12 · Terpakai (disetujui) 4 · Menunggu {n} · Tersedia {m}` dengan `m = jatah − terpakai − menunggu`. Awal: tersedia **8**.
- **Log** (tabel mono, urut waktu naik): kolom `Waktu (WIB)` · `Aktor` · `Aksi` · `Status` (StatusChip). Baris pengajuan yang berstatus `DIAJUKAN` dan belum diputus menampilkan tombol kecil **Setujui (simulasi atasan)** dan **Tolak**. Keputusan **menambah baris baru** dengan aktor `Bima Santoso (simulasi)`; baris lama tidak berubah. Setelah diputus, tombol hilang.

### 4.3 Data seed log (ILUSTRATIF)

| requestId | Waktu | Aktor | Aksi | Status |
|---|---|---|---|---|
| r1 | 2026-10-14T17:30:12+07:00 | Laras Wulandari | Mengajukan lembur 6 jam pada 2026-10-14 | DIAJUKAN |
| r1 | 2026-10-15T08:12:40+07:00 | Bima Santoso | Menyetujui lembur Laras Wulandari | DISETUJUI |
| r2 | 2026-10-16T10:20:05+07:00 | Raka Mahendra | Mengajukan cuti 2026-12-21 sampai 2026-12-25 (4 hari kerja) | DIAJUKAN |
| r2 | 2026-10-16T14:02:33+07:00 | Bima Santoso | Menyetujui cuti Raka Mahendra | DISETUJUI |

Daftar libur nasional demo: `["2026-12-25"]` (Hari Natal). `// ILUSTRATIF: hanya satu libur untuk demo`.

### 4.4 Fungsi dan test vector (`leave.ts`, `format.ts`)

**`workingDays(startIso, endIso, holidays)`**: hitung hari Senin sampai Jumat, **inklusif** kedua ujung, bukan anggota `holidays`. Bila `end < start`, kembalikan 0. Hitung berbasis tanggal kalender (UTC, tanpa zona waktu).

| start | end | libur | hasil |
|---|---|---|---|
| 2026-12-21 | 2026-12-25 | 2026-12-25 | **4** |
| 2026-11-02 | 2026-11-06 | (tidak ada) | **5** |
| 2026-10-24 | 2026-10-25 | (tidak ada) | **0** (Sabtu dan Minggu) |
| 2026-12-24 | 2026-12-28 | 2026-12-25 | **2** (Kamis 24 dan Senin 28) |
| 2026-11-02 | 2026-11-13 | (tidak ada) | **10** |

**`availableLeave(total, approved, pending)`** = `total - approved - pending`.

| total, approved, pending | hasil |
|---|---|
| 12, 4, 0 | 8 |
| 12, 4, 5 | 3 |
| 12, 4, 8 | 0 |

**`validateRequest(req, ctx)`** dengan `ctx = { available, holidays }`. Urutan pemeriksaan dan pesan **persis**:

| # | Kondisi | Hasil |
|---|---|---|
| 1 | Jenis cuti/sakit dan salah satu tanggal kosong; atau lembur dan tanggal kosong | `{ ok:false, message:"Isi tanggal mulai dan selesai." }` |
| 2 | Cuti/sakit dengan `end < start` | `{ ok:false, message:"Tanggal selesai sebelum tanggal mulai." }` |
| 3 | Cuti/sakit dengan `workingDays = 0` | `{ ok:false, message:"Rentang tanggal tidak memuat hari kerja." }` |
| 4 | Cuti dengan `days > available` | `{ ok:false, message:"Melebihi sisa cuti (" + available + " hari)." }` |
| 5 | Lembur dengan jam bukan bilangan bulat 1..8 | `{ ok:false, message:"Jam lembur harus bilangan bulat 1 sampai 8." }` |
| 6 | Lainnya | `{ ok:true, days }` (lembur: `days = 0`) |

| req | available | hasil |
|---|---|---|
| cuti 2026-11-02 sampai 2026-11-06 | 8 | `{ ok:true, days:5 }` |
| cuti 2026-12-24 sampai 2026-12-28 (libur 12-25) | 8 | `{ ok:true, days:2 }` |
| cuti 2026-11-02 sampai 2026-11-13 | 8 | `{ ok:false, message:"Melebihi sisa cuti (8 hari)." }` |
| cuti 2026-10-24 sampai 2026-10-25 | 8 | `{ ok:false, message:"Rentang tanggal tidak memuat hari kerja." }` |
| cuti 2026-11-06 sampai 2026-11-02 | 8 | `{ ok:false, message:"Tanggal selesai sebelum tanggal mulai." }` |
| sakit 2026-11-02 sampai 2026-11-03 | 0 | `{ ok:true, days:2 }` (sakit tidak memeriksa jatah) |
| cuti (tanggal selesai kosong) | 8 | `{ ok:false, message:"Isi tanggal mulai dan selesai." }` |
| lembur 2026-11-02, jam 6 | 8 | `{ ok:true, days:0 }` |
| lembur 2026-11-02, jam 0 | 8 | `{ ok:false, message:"Jam lembur harus bilangan bulat 1 sampai 8." }` |
| lembur 2026-11-02, jam 9 | 8 | idem |
| lembur 2026-11-02, jam 2.5 | 8 | idem |

**`appendLog(log, entry)`** mengembalikan **array baru** (`[...log, entry]`), tidak mengubah array asli.

| aksi | hasil |
|---|---|
| `appendLog(seed(4 entri), e)` | panjang 5; panjang `seed` tetap 4 |

**`formatWib(ms, withMs = true)`** (`format.ts`), zona tetap UTC+7 (jangan memakai zona perangkat):

| ms | withMs | keluaran |
|---|---|---|
| 1792461434382 | true | `2026-10-20 08:57:14.382 WIB` |
| 1792461434382 | false | `2026-10-20 08:57:14 WIB` |

### 4.5 Verifikasi akhir Perizinan

- Awal: panel "Tersedia 8". Tekan `1`, klik "Isi contoh", `Ctrl` + `Enter` → log bertambah 1 baris `DIAJUKAN` ("Mengajukan cuti 2026-11-02 sampai 2026-11-06 (5 hari kerja)"); panel: Menunggu 5, Tersedia **3**.
- Kirim cuti 2026-11-09 sampai 2026-11-13 (5 hari) saat tersedia 3 → pesan error "Melebihi sisa cuti (3 hari)." dan log tidak bertambah.
- Klik **Setujui (simulasi atasan)** pada pengajuan baru → baris baru `DISETUJUI`; Terpakai 9, Menunggu 0, Tersedia **3**.
- Pilih `3` (Lembur), jam `9` → error jam. Jam `6` → berhasil, log +1.
- Tidak ada tombol sunting atau hapus di log. `Esc` mengosongkan form.

---

## 5. Absensi

**Ikon** `Fingerprint` · **H3**: "Presensi satu klik, tercatat sampai milidetik." · **Deskripsi** (21 kata): "Satu tombol untuk masuk dan keluar. Setiap catatan tersimpan dengan stempel waktu WIB presisi milidetik dalam log histori yang mudah dibaca."

### 5.1 Tabel sub-fitur

| Fitur | Keterangan |
|---|---|
| **Check-in 1 klik** | Satu tombol besar bergantian Masuk dan Keluar |
| **Log berstempel milidetik** | `YYYY-MM-DD HH:mm:ss.SSS WIB`, urut waktu, mono **[K3]** |
| Clock-in/out | Selisih keluar dikurangi masuk ditampilkan per hari sebagai durasi |
| GPS geofencing | Chip "Geofence: radius 150 m dari Kantor Pusat Jakarta (simulasi, tanpa akses lokasi)" |
| Shift kerja | Chip "Shift reguler 09:00 sampai 18:00 WIB"; keterlambatan dihitung terhadap jam mulai |
| Rekap kehadiran | Kartu rekap: hadir, terlambat, total keterlambatan, total jam kerja. Diperbarui saat catatan baru disimpan |

### 5.2 Bentuk demo (`AttendanceDemo.tsx`)

Layout: kolom kiri **tombol besar** (tinggi 96px, lebar penuh kolom, primer hitam, teks Geist 600 24px "Masuk" atau "Keluar", ikon `Fingerprint`) dengan status di bawahnya; kolom kanan **rekap** (4 angka) lalu **log histori**. Di bawah: daftar "Kalender mendatang".

- Prop `now?: () => number` (default `Date.now`) agar bisa diuji. Klik menambah entri dengan `ms = now()`.
- Tombol bergantian: bila entri terakhir `masuk` (belum ada `keluar` di hari yang sama), tombol menjadi "Keluar". Hari baru (tanggal WIB berbeda) memulai dengan "Masuk".
- Saat `masuk` setelah jam mulai shift hari itu, tampilkan `StatusChip TERLAMBAT` dan keterlambatan dengan `formatDuration`.
- `Space`/`Enter` pada tombol terfokus (native `<button>`) mencatat. Pesan live: "Masuk dicatat pukul {formatWib}".
- Setelah `Keluar`, tampilkan durasi hari itu.
- Chip Geofence dan Shift ditampilkan di atas tombol. **Jangan meminta lokasi.**

### 5.3 Data seed log (ILUSTRATIF, WIB)

| Tanggal | Masuk | Keluar | Durasi | Keterlambatan |
|---|---|---|---|---|
| 2026-10-12 | 08:52:03.114 | 18:03:21.208 | 9j 11m 18dtk 94ms | tidak |
| 2026-10-13 | 09:00:00.000 | 18:00:09.775 | 9j 0m 9dtk 775ms | tidak (tepat 09:00:00.000 bukan terlambat) |
| 2026-10-14 | 09:06:48.502 | 18:15:44.019 | 9j 8m 55dtk 517ms | **0j 6m 48dtk 502ms** |
| 2026-10-15 | 08:49:30.907 | 18:30:02.331 | 9j 40m 31dtk 424ms | tidak |
| 2026-10-16 | 09:12:11.640 | 18:01:59.480 | 8j 49m 47dtk 840ms | **0j 12m 11dtk 640ms** |

Kalender mendatang (statis, `StatusChip`): 2026-12-21, 22, 23, 24 → `CUTI` (dari Perizinan r2); 2026-12-25 → `LIBUR NASIONAL` (Hari Natal). Catatan: "Cuti yang disetujui di Perizinan tampil sebagai CUTI, bukan alpa."

### 5.4 Fungsi dan test vector (`attendance.ts`, `format.ts`)

**`shiftStartMs(ms)`**: epoch ms pukul 09:00:00.000 WIB pada tanggal WIB dari `ms`.

| ms | hasil |
|---|---|
| 1792461434382 (2026-10-20 08:57:14.382 WIB) | 1792461600000 |
| 1792494725771 (2026-10-20 18:12:05.771 WIB) | 1792461600000 |
| 1792548461020 (2026-10-21 09:07:41.020 WIB) | 1792548000000 |

**`lateMs(masukMs)`** = `Math.max(0, masukMs - shiftStartMs(masukMs))`.

| masuk | terlambat (ms) | `formatDuration` |
|---|---|---|
| 2026-10-20 08:57:14.382 | 0 | `0j 0m 0dtk 0ms` |
| 2026-10-21 09:07:41.020 | 461020 | `0j 7m 41dtk 20ms` |
| 2026-10-13 09:00:00.000 | 0 | `0j 0m 0dtk 0ms` |

**`formatDuration(ms)`** = `{jam}j {menit}m {detik}dtk {ms}ms` (jam tidak dibatasi 24; tanpa nol di depan; `ms` = sisa milidetik 0..999).

| ms | keluaran |
|---|---|
| 33291389 | `9j 14m 51dtk 389ms` |
| 33078094 | `9j 11m 18dtk 94ms` |
| 461020 | `0j 7m 41dtk 20ms` |
| 0 | `0j 0m 0dtk 0ms` |

Selisih contoh: masuk 2026-10-20 08:57:14.382 (1792461434382) dan keluar 2026-10-20 18:12:05.771 (1792494725771) → 33291389 ms → `9j 14m 51dtk 389ms`.

**`summarize(days)`** dengan `days = { masukMs, keluarMs? }[]` → `{ hadir, terlambat, totalLateMs, totalWorkMs }`. `hadir` = jumlah hari; `terlambat` = jumlah hari dengan `lateMs > 0`; `totalWorkMs` = jumlah `(keluar - masuk)` untuk hari yang punya keluar.

| input | hasil |
|---|---|
| seed 5 hari §5.3 | `{ hadir: 5, terlambat: 2, totalLateMs: 1140142, totalWorkMs: 165042650 }` |

Tampil: Hadir `5`, Terlambat `2`, Total keterlambatan `0j 19m 0dtk 142ms`, Total jam kerja `45j 50m 42dtk 650ms`.

### 5.5 Verifikasi akhir Absensi

- Seed: rekap menampilkan Hadir 5, Terlambat 2, `0j 19m 0dtk 142ms`, `45j 50m 42dtk 650ms`.
- Klik "Masuk" → baris baru di log dengan format `YYYY-MM-DD HH:mm:ss.SSS WIB` dan tombol berubah "Keluar"; rekap Hadir menjadi 6.
- Klik "Keluar" → durasi hari itu tampil.
- Test dengan `now` palsu: `now = () => 1792548461020` → entri `2026-10-21 09:07:41.020 WIB` dan keterlambatan `0j 7m 41dtk 20ms`.
- Tidak ada permintaan izin lokasi di browser.

---

## 6. Gaji

**Ikon** `Wallet` · **H3**: "Komponen gaji terbaca dalam satu tabel." · **Deskripsi** (19 kata): "Breakdown pendapatan, potongan BPJS, dan PPh 21 per karyawan dalam tabel keuangan. Ekspor CSV atau PDF tanpa menunggu antrean." **[K2]**

### 6.1 Tabel sub-fitur

| Fitur | Keterangan |
|---|---|
| **Breakdown dalam tabel keuangan** | Kolom = karyawan, baris = komponen, rupiah penuh, mono rata kanan, baris total |
| **Ekspor CSV dan PDF** | Tombol "Ekspor CSV" dan "Ekspor PDF" membuka pratinjau teks CSV dan lembar slip. Demo tidak mengunduh berkas |
| Kalkulasi otomatis | Semua angka dihitung fungsi murni dari data input |
| PPh 21 | Panel detail per karyawan: neto, PTKP, PKP, pajak tahunan dan bulanan **[K4]** |
| BPJS | Baris Kesehatan 1%, JHT 2%, JP 1% **[K4]** |
| Slip gaji digital | Pratinjau PDF berupa lembar slip untuk karyawan terpilih |
| Reimbursement | Baris tambahan setelah pajak (contoh: Raka Mahendra Rp350.000, "Transport klien 14 Okt") |

### 6.2 Bentuk demo (`PayrollDemo.tsx`)

Tabel penuh selebar section (komponen `DataTable`), periode "Oktober 2026".

Kolom: `Komponen` · `Raka Mahendra` · `Laras Wulandari` · `Intan Safitri`. Header kolom karyawan adalah `<button>` (`aria-pressed`) yang memilih karyawan; kolom terpilih diberi `border-x` 1px hitam dan header bg `--surface-hover`. Baris:

1. Gaji pokok
2. Tunjangan jabatan
3. Tunjangan transport
4. Tunjangan makan
5. Lembur (dari Perizinan)
6. **Bruto** (tebal)
7. BPJS Kesehatan (1%)
8. BPJS JHT (2%)
9. BPJS JP (1%)
10. PPh 21 (bulanan)
11. Reimbursement
12. **Take-home pay** (tebal, `border-t` hitam)

Di bawah tabel: panel **Detail PPh 21: {nama}** (daftar 2 kolom mono: bruto, biaya jabatan, iuran BPJS, neto bulanan, neto tahunan, PTKP, PKP, pajak tahunan, pajak bulanan), baris **Total** semua karyawan (bruto dan take-home), lalu tombol **Ekspor CSV** dan **Ekspor PDF**.

- **Ekspor CSV** → menampilkan `<pre>` berisi CSV (lihat §6.5) dengan label "Pratinjau CSV. Demo ini tidak mengunduh berkas."
- **Ekspor PDF** → menampilkan lembar slip bergaya kertas (rasio 1:1.414, bg putih, border 1px hitam, mono) untuk karyawan terpilih dengan judul "SLIP GAJI · Oktober 2026", nama, daftar komponen, take-home pay. Label yang sama "Pratinjau PDF. Demo ini tidak mengunduh berkas."
- Pesan live: "Pratinjau CSV ditampilkan" / "Pratinjau PDF ditampilkan untuk {nama}".

### 6.3 Data input (ILUSTRATIF)

| Karyawan | Pokok | Jabatan | Transport | Makan | Lembur (jam) | Reimbursement |
|---|---|---|---|---|---|---|
| Raka Mahendra | 18.000.000 | 3.000.000 | 1.200.000 | 900.000 | 0 | 350.000 |
| Laras Wulandari | 9.000.000 | 1.500.000 | 900.000 | 600.000 | **6** (disetujui di Perizinan r1) | 0 |
| Intan Safitri | 4.000.000 | 0 | 500.000 | 500.000 | 0 | 0 |

### 6.4 Rumus dan penyederhanaan (`payroll.ts`)

Urutan perhitungan `calculatePayroll(input)`:

1. `upahTetap = pokok + jabatan`
2. `lembur = lemburJam > 0 ? round(upahTetap / 173 × (1,5 + 2 × (lemburJam − 1))) : 0`
3. `bruto = pokok + jabatan + transport + makan + lembur`
4. `kes = round(0,01 × min(upahTetap, 12.000.000))`; `jht = round(0,02 × upahTetap)`; `jp = round(0,01 × min(upahTetap, 10.000.000))`; `bpjs = kes + jht + jp`
5. `biayaJabatan = min(round(0,05 × bruto), 500.000)`
6. `netoBulanan = bruto − bpjs − biayaJabatan`; `netoTahunan = netoBulanan × 12`
7. `pkp = floor(max(0, netoTahunan − 54.000.000) / 1000) × 1000`
8. `pajakTahunan = progressiveTax(pkp)`: 5% sampai Rp60.000.000, 15% di atas Rp60.000.000 sampai Rp250.000.000, 25% di atas Rp250.000.000 sampai Rp500.000.000, 30% di atas Rp500.000.000 sampai Rp5.000.000.000
9. `pph = round(pajakTahunan / 12)`
10. `thp = bruto − bpjs − pph + reimbursement`

`round` = pembulatan ke bilangan bulat terdekat, 0,5 ke atas (`Math.round`).

**Penyederhanaan (wajib terdaftar, tulis komentar kode `// SEDERHANA:` di `payroll.ts` dan masukkan ke "perlu keputusan pemilik"):**

(a) PPh 21 memakai tarif progresif Pasal 17 atas neto bulanan × 12. Metode tarif efektif rata-rata (TER) bulanan **tidak** dipakai.
(b) Status PTKP TK/0 (Rp54.000.000) untuk semua karyawan.
(c) Biaya jabatan 5% dari bruto bulanan, maksimum Rp500.000 per bulan.
(d) Iuran BPJS karyawan (Kesehatan 1%, JHT 2%, JP 1%) diperlakukan sebagai pengurang penghasilan bruto untuk pajak.
(e) Basis iuran = gaji pokok + tunjangan jabatan. Batas atas Kesehatan Rp12.000.000 dan JP Rp10.000.000 adalah nilai ilustratif dan wajib diverifikasi untuk tahun berjalan.
(f) Tanpa iuran dan premi sisi perusahaan (JKK, JKM, Kesehatan perusahaan), tanpa tunjangan pajak, tanpa bonus/THR, tanpa pro-rata.
(g) Lembur hanya hari kerja biasa: upah per jam = upah tetap / 173; jam pertama 1,5×, jam berikutnya 2×.
(h) Reimbursement ditambahkan setelah pajak dan tidak dikenai pajak.

### 6.5 Test vector

**`progressiveTax(pkp)`**

| pkp | pajak tahunan |
|---|---|
| 60.000.000 | 3.000.000 |
| 60.001.000 | 3.000.150 |
| 250.000.000 | 31.500.000 |
| 209.520.000 | 25.428.000 |
| 0 | 0 |

**`overtimePay(upahTetap, jam)`** (upahTetap 10.500.000)

| jam | lembur |
|---|---|
| 1 | 91.040 |
| 2 | 212.428 |
| 6 | 697.977 |
| 0 | 0 |

**`calculatePayroll`** (rupiah)

| Komponen | Raka Mahendra | Laras Wulandari | Intan Safitri |
|---|---|---|---|
| Lembur | 0 | 697.977 | 0 |
| **Bruto** | **23.100.000** | **12.697.977** | **5.000.000** |
| BPJS Kesehatan | 120.000 | 105.000 | 40.000 |
| BPJS JHT | 420.000 | 210.000 | 80.000 |
| BPJS JP | 100.000 | 100.000 | 40.000 |
| Total BPJS | 640.000 | 415.000 | 160.000 |
| Biaya jabatan | 500.000 | 500.000 | 250.000 |
| Neto bulanan | 21.960.000 | 11.782.977 | 4.590.000 |
| Neto tahunan | 263.520.000 | 141.395.724 | 55.080.000 |
| PKP | 209.520.000 | 87.395.000 | 1.080.000 |
| Pajak tahunan | 25.428.000 | 7.109.250 | 54.000 |
| **PPh 21 bulanan** | **2.119.000** | **592.438** | **4.500** |
| Reimbursement | 350.000 | 0 | 0 |
| **Take-home pay** | **20.691.000** | **11.690.539** | **4.835.500** |

Total semua karyawan: **Bruto Rp40.797.977**, **Take-home Rp37.217.039**.

Catatan pembulatan: pajak bulanan Laras = 7.109.250 / 12 = 592.437,5 → **592.438** (0,5 naik). PKP Laras = 141.395.724 − 54.000.000 = 87.395.724 → dibulatkan ke bawah ke kelipatan 1.000 = **87.395.000**.

**`formatRupiah(n)`** (manual, titik ribuan, tanpa `Intl`)

| n | keluaran |
|---|---|
| 20691000 | `Rp20.691.000` |
| 4500 | `Rp4.500` |
| 0 | `Rp0` |
| 40797977 | `Rp40.797.977` |

**`toCsv(rows)`**: pemisah koma, baris dipisah `\n`, **tanpa** baris kosong di akhir, tanpa BOM. Sel diberi tanda kutip ganda bila memuat `,` `"` atau baris baru; tanda kutip di dalam sel digandakan.

| input | keluaran |
|---|---|
| `[["nama","thp"],["Sari, Dewi",100]]` | `nama,thp` ⏎ `"Sari, Dewi",100` |
| `[['a"b']]` | `"a""b"` |

**CSV pratinjau (persis)**; `tunjangan` = transport + makan:

```csv
nama,pokok,jabatan,tunjangan,lembur,bruto,bpjs,pph21,reimburse,thp
Raka Mahendra,18000000,3000000,2100000,0,23100000,640000,2119000,350000,20691000
Laras Wulandari,9000000,1500000,1500000,697977,12697977,415000,592438,0,11690539
Intan Safitri,4000000,0,1000000,0,5000000,160000,4500,0,4835500
```

### 6.6 Verifikasi akhir Gaji

- Tabel menampilkan Take-home: `Rp20.691.000`, `Rp11.690.539`, `Rp4.835.500`; total Bruto `Rp40.797.977`, total Take-home `Rp37.217.039`.
- Memilih kolom Laras → panel detail: Neto tahunan `Rp141.395.724`, PKP `Rp87.395.000`, Pajak tahunan `Rp7.109.250`, Pajak bulanan `Rp592.438`.
- "Ekspor CSV" menampilkan tepat 4 baris CSV di atas. "Ekspor PDF" menampilkan slip karyawan terpilih. Tidak ada unduhan.
- Menghitung ulang di unit test: semua nilai tabel §6.5 identik.

---

## 7. Exam

**Ikon** `ClipboardCheck` · **H3**: "Uji kemampuan lewat kasus kerja nyata." · **Deskripsi** (19 kata): "Uji teknis berupa studi kasus terstruktur dengan rubrik berbobot, sehingga setiap kandidat dan karyawan dinilai dengan ukuran yang sama."

### 7.1 Tabel sub-fitur

| Fitur | Keterangan |
|---|---|
| **Studi kasus terstruktur** | Satu kasus, satu lembar jawaban, rubrik empat kriteria berbobot |
| Assessment rekrutmen | Mode "Rekrutmen": kasus software (Kodeksa Teknologi) |
| Evaluasi kinerja | Mode "Evaluasi kinerja": kasus arsitektur (Studio Rancang Tenggara) |
| Uji kompetensi | Mode "Kompetensi": kasus hukum (Arunika & Rekan) |
| Proctoring | Panel "Log fokus jendela (simulasi)". ProStaff tidak merekam kamera atau layar **[K5]** |

### 7.2 Bentuk demo (`ExamDemo.tsx`)

Lembar kasus gaya dokumen (bukan kartu): kolom kiri **kasus**, kolom kanan **rubrik penilaian**.

1. **Tab mode** (`role="tablist"`): `Rekrutmen` · `Evaluasi kinerja` · `Kompetensi`. Panah kiri/kanan berpindah tab. Berganti mode mengganti kasus dan **mengosongkan skor**.
2. **Kasus** (judul H3 + paragraf + butir "Yang harus Anda kumpulkan"):

| Mode | Judul | Isi |
|---|---|---|
| Rekrutmen | Antrean izin yang lambat | Halaman daftar izin memuat 4.000 baris dan butuh 6 detik. Tulis analisis penyebab, usulkan perbaikan, dan jelaskan cara mengukur hasilnya. |
| Evaluasi kinerja | Revisi gambar kerja | Klien meminta perubahan denah lantai 2 setelah gambar kerja terbit. Susun daftar dampak ke dokumen lain, urutan revisi, dan pesan ke klien. |
| Kompetensi | Klausul kerahasiaan | Sebuah NDA mewajibkan kerahasiaan tanpa batas waktu dan tanpa pengecualian. Identifikasi risikonya dan tulis usulan revisi klausul. |

Butir kumpulan (sama di semua mode): "Analisis singkat (maks. 200 kata)", "Usulan solusi", "Ringkasan untuk non-teknis".

3. **Rubrik** (4 baris, tiap baris radiogroup `0`..`4` dengan label di bawah angka: 0 Tidak ada, 1 Kurang, 2 Cukup, 3 Baik, 4 Sangat baik):

| Kriteria | Bobot |
|---|---|
| Analisis masalah | 40 |
| Kualitas solusi | 30 |
| Kejelasan komunikasi | 20 |
| Ketepatan waktu | 10 |

4. **Hasil**: ditampilkan hanya bila keempat kriteria sudah dinilai: `Skor {angka}/100` (Geist 600 40px) + StatusChip `LULUS` atau `BELUM LULUS` (ambang 70). Sebelum itu: "Belum dinilai".
5. Tombol tautan "Isi contoh" mengisi skor `[4,3,3,2]`. Tombol sekunder "Reset demo".
6. **Panel Proctoring (statis, simulasi)**: judul "Log fokus jendela (simulasi)", dua baris mono: `10:14:22  Jendela kehilangan fokus  8 dtk` dan `10:31:05  Jendela kehilangan fokus  3 dtk`; ringkasan "2 kejadian, total 11 dtk". Catatan: "ProStaff tidak merekam kamera atau layar." **[K5]**
7. Pesan live: "Skor {angka} dari 100, {LULUS|BELUM LULUS}".

### 7.3 Fungsi dan test vector (`exam.ts`)

`WEIGHTS = [40, 30, 20, 10]`, `PASS_THRESHOLD = 70`.

**`scoreRubric(scores)`** = `Σ WEIGHTS[i] × scores[i] / 4`. Skor harus bilangan bulat 0..4; di luar itu lempar `RangeError`. **`isPass(score)`** = `score >= 70`.

| scores | total | isPass |
|---|---|---|
| [4,3,3,2] | **82,5** | ya |
| [2,2,3,4] | **60** | tidak |
| [4,4,4,4] | **100** | ya |
| [0,0,0,0] | **0** | tidak |
| [3,3,3,3] | **75** | ya |
| [4,2,3,0] | **70** | ya (batas tepat) |
| [4,2,2,2] | **70** | ya (batas tepat) |
| [4,1,3,2] | **67,5** | tidak |
| [5,0,0,0] | `RangeError` | |
| [2.5,0,0,0] | `RangeError` | |

Tampilkan angka dengan koma desimal Indonesia (`82,5`), tanpa desimal bila bulat (`60`).

### 7.4 Verifikasi akhir Exam

- Mode Rekrutmen, klik "Isi contoh" → `Skor 82,5/100`, `LULUS`.
- Atur skor `2,2,3,4` → `Skor 60/100`, `BELUM LULUS`.
- Atur `4,2,3,0` → `Skor 70/100`, `LULUS`.
- Ganti mode → skor kosong kembali "Belum dinilai".
- Tab dapat dioperasikan dengan panah kiri/kanan; radio rubrik dengan panah.
- Panel Proctoring menyebut "2 kejadian, total 11 dtk" dan tidak ada permintaan kamera.

---

## 8. Alur Data Antar Modul (`DataFlow.tsx`, pita hitam)

Tampilkan empat baris sebagai `<table>` (atau `<ol>`) di pita hitam. Tiap baris: node asal (kotak border 1px putih) → ikon `ArrowRight` → node tujuan, lalu kolom Peristiwa dan Dampak. Semua angka diambil dari demo di atas.

| # | Dari | Peristiwa | Ke | Dampak |
|---|---|---|---|---|
| 1 | Perizinan | Lembur 6 jam milik Laras Wulandari disetujui (2026-10-15) | Gaji | Komponen Lembur `Rp697.977`; bruto naik dari `Rp12.000.000` menjadi `Rp12.697.977` |
| 2 | Perizinan | Cuti Raka Mahendra 2026-12-21 sampai 2026-12-25 disetujui | Absensi | 21 sampai 24 Des ditandai `CUTI`, 25 Des `LIBUR NASIONAL`; sisa cuti 12 → 8 |
| 3 | Library | Form lembur menautkan SOP `SDM / Kebijakan / Lembur` | Perizinan | Pemohon membaca aturan sebelum mengirim |
| 4 | Exam | Skor 70 atau lebih | Library | Hasil uji diarsipkan sebagai dokumen di folder SDM (jalur contoh `SDM/Arsip/Hasil Uji`, **[P]** tidak ada di data demo) |

Bruto sebelum lembur Laras: 9.000.000 + 1.500.000 + 900.000 + 600.000 = **12.000.000**; setelah: **12.697.977** (selisih 697.977, sama dengan `overtimePay(10.500.000, 6)`).

## 9. Verifikasi Akhir Lintas Modul

- Angka `697.977` identik di Gaji, Alur data, dan test `overtimePay`.
- Sisa cuti `8` identik di Perizinan, Alur data (baris 2), dan test `availableLeave(12,4,0)`.
- Hasil pencarian `dokumen` identik di `HeroWindow` dan `LibraryDemo`.
- `featureList` JSON-LD (`05` §5) memuat semua sub-fitur di tabel §3.1, §4.1, §5.1, §6.1, §7.1.
- Semua demo bekerja tanpa jaringan: matikan jaringan di DevTools dan ulangi satu skenario tiap modul.
