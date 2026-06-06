import type { MetadataRoute } from "next";

/* ─── robots.txt — Next.js App Router (v1.1.0 Phase 2A) ─── */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://resturaunt.vercel.app/sitemap.xml",
  };
}
