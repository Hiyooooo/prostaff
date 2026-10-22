// KLAIM: K4 PPh 21 dan BPJS disederhanakan; lihat daftar penyederhanaan (a) sampai (h).
// SEDERHANA: (a) PPh 21 memakai tarif progresif Pasal 17 atas neto bulanan x 12; metode TER tidak dipakai.
// SEDERHANA: (b) Status PTKP TK/0 (Rp54.000.000) untuk semua karyawan.
// SEDERHANA: (c) Biaya jabatan 5% dari bruto bulanan, maksimum Rp500.000 per bulan.
// SEDERHANA: (d) Iuran BPJS karyawan (Kesehatan 1%, JHT 2%, JP 1%) mengurangi penghasilan bruto untuk pajak.
// SEDERHANA: (e) Basis iuran = gaji pokok + tunjangan jabatan; batas Kesehatan Rp12.000.000 dan JP Rp10.000.000 nilai ilustratif.
// SEDERHANA: (f) Tanpa iuran sisi perusahaan, tunjangan pajak, bonus/THR, dan pro-rata.
// SEDERHANA: (g) Lembur hari kerja biasa: upah per jam = upah tetap / 173; jam pertama 1,5x, berikutnya 2x.
// SEDERHANA: (h) Reimbursement ditambahkan setelah pajak dan tidak dikenai pajak.

export type PayrollInput = {
  nama: string;
  pokok: number;
  jabatan: number;
  transport: number;
  makan: number;
  lemburJam: number;
  reimbursement: number;
};

export type PayrollResult = {
  nama: string;
  upahTetap: number;
  lembur: number;
  bruto: number;
  kes: number;
  jht: number;
  jp: number;
  bpjs: number;
  biayaJabatan: number;
  netoBulanan: number;
  netoTahunan: number;
  pkp: number;
  pajakTahunan: number;
  pph: number;
  thp: number;
};

// ILUSTRATIF: perusahaan, nama karyawan, angka gaji, dan log dummy. Bukan data pelanggan.
export const EMPLOYEES: PayrollInput[] = [
  {
    nama: "Raka Mahendra",
    pokok: 18000000,
    jabatan: 3000000,
    transport: 1200000,
    makan: 900000,
    lemburJam: 0,
    reimbursement: 350000,
  },
  {
    nama: "Laras Wulandari",
    pokok: 9000000,
    jabatan: 1500000,
    transport: 900000,
    makan: 600000,
    lemburJam: 6,
    reimbursement: 0,
  },
  {
    nama: "Intan Safitri",
    pokok: 4000000,
    jabatan: 0,
    transport: 500000,
    makan: 500000,
    lemburJam: 0,
    reimbursement: 0,
  },
];

export function overtimePay(upahTetap: number, jam: number): number {
  if (jam <= 0) return 0;
  return Math.round((upahTetap / 173) * (1.5 + 2 * (jam - 1)));
}

export function progressiveTax(pkp: number): number {
  const lapis = [
    { atas: 60000000, tarif: 0.05 },
    { atas: 250000000, tarif: 0.15 },
    { atas: 500000000, tarif: 0.25 },
    { atas: 5000000000, tarif: 0.3 },
  ];
  let pajak = 0;
  let bawah = 0;
  for (const l of lapis) {
    if (pkp > bawah) {
      pajak += (Math.min(pkp, l.atas) - bawah) * l.tarif;
      bawah = l.atas;
    }
  }
  return Math.round(pajak);
}

export function calculatePayroll(input: PayrollInput): PayrollResult {
  const upahTetap = input.pokok + input.jabatan;
  const lembur = overtimePay(upahTetap, input.lemburJam);
  const bruto = input.pokok + input.jabatan + input.transport + input.makan + lembur;
  const kes = Math.round(0.01 * Math.min(upahTetap, 12000000));
  const jht = Math.round(0.02 * upahTetap);
  const jp = Math.round(0.01 * Math.min(upahTetap, 10000000));
  const bpjs = kes + jht + jp;
  const biayaJabatan = Math.min(Math.round(0.05 * bruto), 500000);
  const netoBulanan = bruto - bpjs - biayaJabatan;
  const netoTahunan = netoBulanan * 12;
  const pkp = Math.floor(Math.max(0, netoTahunan - 54000000) / 1000) * 1000;
  const pajakTahunan = progressiveTax(pkp);
  const pph = Math.round(pajakTahunan / 12);
  const thp = bruto - bpjs - pph + input.reimbursement;
  return {
    nama: input.nama,
    upahTetap,
    lembur,
    bruto,
    kes,
    jht,
    jp,
    bpjs,
    biayaJabatan,
    netoBulanan,
    netoTahunan,
    pkp,
    pajakTahunan,
    pph,
    thp,
  };
}
