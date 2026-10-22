// Sumber tunggal FAQ: dipakai UI dan JSON-LD FAQPage.
// ILUSTRATIF: jawaban menandai klaim K1 sampai K6 yang wajib dikonfirmasi pemilik.
export type FaqItem = { question: string; answer: string };

export const FAQ: FaqItem[] = [
  {
    question: "Apakah ProStaff memakai pop-up atau tur onboarding?",
    answer:
      "Tidak. Tidak ada pop-up, banner promosi, atau tur onboarding di dalam aplikasi. Panduan pemakaian tersedia sebagai dokumen biasa di Library.",
  },
  {
    question: "Bagaimana presensi dicatat?",
    answer:
      "Satu klik pada tombol Masuk atau Keluar. Sistem menyimpan stempel waktu WIB sampai milidetik dan menampilkannya di log histori. Geofencing opsional membatasi lokasi presensi.",
  },
  {
    question: "Apakah perhitungan PPh 21 dan BPJS sudah sesuai aturan?",
    answer:
      "Perhitungan mengacu pada ketentuan yang berlaku dan dikonfigurasi bersama Anda. Contoh di halaman ini disederhanakan untuk demonstrasi. Konfigurasi final sebaiknya diverifikasi konsultan pajak Anda.",
  },
  {
    question: "Format ekspor apa yang tersedia?",
    answer:
      "CSV dan PDF. CSV memuat satu baris per karyawan dengan kolom pokok, jabatan, tunjangan, lembur, bruto, BPJS, PPh 21, reimbursement, dan take-home pay.",
  },
  {
    question: "Apakah Library mendukung markdown?",
    answer:
      "Ya. Dokumen ditulis dalam markdown dan disusun dalam hierarki folder. Pencarian menjangkau judul, jalur folder, dan isi dokumen.",
  },
  {
    question: "Bagaimana uji teknis dinilai?",
    answer:
      "Kandidat mengerjakan studi kasus. Penilai memberi skor 0 sampai 4 pada empat kriteria berbobot, lalu sistem menghitung skor 0 sampai 100. Ambang lulus ditetapkan tim Anda. Proctoring memakai log fokus jendela, bukan rekaman kamera.",
  },
  {
    question: "Siapa yang bisa membuka dokumen di Library?",
    answer:
      "Akses diatur per folder: baca, tulis, atau tersembunyi. Setiap perubahan dokumen tercatat di log audit.",
  },
  {
    question: "Bagaimana dengan keamanan data?",
    answer:
      "Data karyawan dan dokumen dilindungi kontrol akses berbasis peran dan log audit. Kebijakan penyimpanan dan enkripsi dijelaskan dalam dokumen keamanan yang dibagikan saat demo. Sertifikasi belum diklaim.",
  },
];
