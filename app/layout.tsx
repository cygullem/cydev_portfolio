import type { Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { SiteChrome } from "@/components/layout/site-chrome";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";
import Link from "next/link";

const bricolage = localFont({
  src: [
    { path: "../public/fonts/BricolageGrotesque-Regular.ttf", weight: "400" },
    { path: "../public/fonts/BricolageGrotesque-Medium.ttf", weight: "500" },
    { path: "../public/fonts/BricolageGrotesque-SemiBold.ttf", weight: "600" },
    { path: "../public/fonts/BricolageGrotesque-Bold.ttf", weight: "700" },
  ],
  variable: "--font-bricolage",
  display: "swap",
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
      className={`${bricolage.variable} h-full antialiased`}
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
