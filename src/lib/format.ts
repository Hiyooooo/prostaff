// Format angka dan waktu demo. WIB = UTC+7 tetap, tanpa Intl.
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

export function formatRupiah(n: number): string {
  return "Rp" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatWib(ms: number, withMs = true): string {
  const d = new Date(ms + WIB_OFFSET_MS);
  const p2 = (v: number) => v.toString().padStart(2, "0");
  const tanggal = `${d.getUTCFullYear()}-${p2(d.getUTCMonth() + 1)}-${p2(d.getUTCDate())}`;
  const jam = `${p2(d.getUTCHours())}:${p2(d.getUTCMinutes())}:${p2(d.getUTCSeconds())}`;
  const milidetik = withMs ? `.${d.getUTCMilliseconds().toString().padStart(3, "0")}` : "";
  return `${tanggal} ${jam}${milidetik} WIB`;
}

export function formatDuration(ms: number): string {
  const jam = Math.floor(ms / 3600000);
  const menit = Math.floor((ms % 3600000) / 60000);
  const detik = Math.floor((ms % 60000) / 1000);
  return `${jam}j ${menit}m ${detik}dtk ${ms % 1000}ms`;
}
