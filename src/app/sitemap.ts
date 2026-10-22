import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // ILUSTRATIF: ganti tanggal saat rilis.
  return [
    {
      url: SITE.url,
      lastModified: new Date("2026-10-20"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
