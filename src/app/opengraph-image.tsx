import { renderOg } from "@/lib/og-image";

export const alt = "ProStaff HRIS: navigasi cepat, layar bersih, nol bloatware";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg();
}
