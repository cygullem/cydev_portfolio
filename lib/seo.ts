import type { Metadata } from "next";
import { site } from "@/lib/content";

export const OG_IMAGE_PATH = "/thumbnail/THUMBNAIL-01.png";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 1200;

const defaultTitle = `${site.name} — ${site.role}`;

export const seoKeywords = [
  site.name,
  site.role,
  "Full-Stack Developer Philippines",
  "Next.js developer",
  "React developer",
  "TypeScript",
  site.location,
  site.brand,
  "portfolio",
  "frontend developer",
  "web developer Cebu",
  "open to work",
];

export function siteOpenGraphImages() {
  return [
    {
      url: OG_IMAGE_PATH,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: `${site.name} — ${site.role} portfolio on ${site.brand}`,
      type: "image/png",
    },
  ];
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: { default: defaultTitle, template: `%s — ${site.name}` },
    description: site.description,
    applicationName: site.brand,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    keywords: seoKeywords,
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: "/",
      languages: { "en-US": "/" },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      siteName: site.brand,
      title: defaultTitle,
      description: site.description,
      images: siteOpenGraphImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: site.description,
      images: [OG_IMAGE_PATH],
    },
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png" }],
      apple: [{ url: "/favicon.png", type: "image/png" }],
    },
    other: {
      "geo.region": "PH-CEB",
      "geo.placename": site.location,
    },
  };
}
