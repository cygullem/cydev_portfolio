"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { DockNav } from "@/components/navigation/dock-nav";
import { SiteTicker } from "@/components/navigation/site-ticker";

export function SiteChrome({ children }: { children: ReactNode }) {
  const onHome = usePathname() === "/";

  return (
    <>
      <SmoothScroll />
      <SiteTicker />
      <main id="main" className={onHome ? "flex-1" : "flex-1 pt-9"}>
        {children}
      </main>
      {!onHome && <Footer />}
      <DockNav />
    </>
  );
}
