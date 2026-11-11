import type { Viewport } from "next";
import Script from "next/script";
import {
  Archivo,
  Geist_Mono,
  Instrument_Serif,
  Oswald,
  Space_Grotesk,
} from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import { rootMetadata } from "@/lib/seo";
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

export const metadata = rootMetadata();

export const viewport: Viewport = {
  themeColor: "#ef6534",
};

const lightOnlyScript = `try{var e=document.documentElement;e.classList.remove("dark");e.style.colorScheme="light";localStorage.setItem("theme","light")}catch(_){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${space.variable} ${archivo.variable} ${bebas.variable} ${geistMono.variable} ${featuredSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Script id="theme-light-only" strategy="beforeInteractive">
          {lightOnlyScript}
        </Script>
        <div id="top" />
        <Link
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-12 focus:left-3 focus:z-80 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </Link>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
