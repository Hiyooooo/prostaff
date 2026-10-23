import { renderOg } from "@/lib/og-image";

export const runtime = "nodejs";

export async function GET() {
  return renderOg();
}
