export const SITE = {
  name: "ProStaff HRIS",
  // ILUSTRATIF: domain placeholder, ganti sebelum rilis.
  url: "https://prostaff.example",
  locale: "id_ID",
  // 56 karakter
  title: "ProStaff HRIS - Sistem Manajemen SDM Minimalis & Efisien",
  // 103 karakter
  description:
    "Antarmuka bersih bebas distraksi. Solusi manajemen karyawan, arsip dokumen, dan penggajian profesional.",
  // ILUSTRATIF: email dan kota placeholder.
  contactEmail: "halo@prostaff.example",
  city: "Jakarta",
} as const;

export const CONTACT_MAILTO = `mailto:${SITE.contactEmail}?subject=Jadwal%20demo%20ProStaff%20HRIS`;
export const QUESTION_MAILTO = `mailto:${SITE.contactEmail}`;
