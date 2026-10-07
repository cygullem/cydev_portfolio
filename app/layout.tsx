import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono, Instrument_Serif, Oswald, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/content";
import { SiteChrome } from "@/components/layout/site-chrome";
import "./globals.css";
import Link from "next/link";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bebas = Oswald({
  weight: ["400", "500", "600", "700"],
  variable: "--font-bebas",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const featuredSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-featured-serif",
  subsets: ["latin"],
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: site.name, title, description: site.description },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#ef6534",
};

const lightOnlyScript = `try{var e=document.documentElement;e.classList.remove("dark");e.style.colorScheme="light";localStorage.setItem("theme","light")}catch(_){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${space.variable} ${archivo.variable} ${bebas.variable} ${geistMono.variable} ${featuredSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: lightOnlyScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <div id="top" />
        <Link
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </Link>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
