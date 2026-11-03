import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { workSlugs } from "@/lib/works";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...workSlugs().map((slug) => ({
      url: `${base}/works/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
