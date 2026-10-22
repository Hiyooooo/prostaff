export type FeatureGroup = { module: string; items: string[] };

export const FEATURES: FeatureGroup[] = [
  {
    module: "Library",
    items: [
      "Direktori dokumentasi markdown berhierarki folder",
      "Pencarian dokumen dengan navigasi keyboard",
      "Knowledge base SOP",
      "Arsip dokumen perusahaan",
      "Modul e-learning",
    ],
  },
  {
    module: "Perizinan",
    items: [
      "Form perizinan keyboard-friendly dengan shortcut",
      "Log status perizinan transparan",
      "Workflow approval cuti",
      "Izin sakit",
      "Lembur",
      "Transparansi sisa cuti",
    ],
  },
  {
    module: "Absensi",
    items: [
      "Check-in satu klik",
      "Log presensi berstempel waktu milidetik",
      "Clock-in dan clock-out",
      "GPS geofencing",
      "Shift kerja",
      "Rekap kehadiran",
    ],
  },
  {
    module: "Gaji",
    items: [
      "Breakdown komponen gaji dalam tabel",
      "Ekspor CSV dan PDF",
      "Kalkulasi gaji otomatis",
      "PPh 21",
      "BPJS",
      "Slip gaji digital",
      "Reimbursement",
    ],
  },
  {
    module: "Exam",
    items: [
      "Uji teknis berbasis studi kasus terstruktur",
      "Assessment rekrutmen online",
      "Evaluasi kinerja",
      "Uji kompetensi",
      "Proctoring berbasis log fokus jendela",
    ],
  },
];
