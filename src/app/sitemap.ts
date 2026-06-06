import type { MetadataRoute } from "next";

/* ─── sitemap.xml — Next.js App Router (v1.1.0 Phase 2A) ─── */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://resturaunt.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
