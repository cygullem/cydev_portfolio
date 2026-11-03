"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer/footer";
import { Nav } from "@/components/navigation/nav";

export function SiteChrome({ children }: { children: ReactNode }) {
  const onHome = usePathname() === "/";

  return (
    <>
      {!onHome && <Nav />}
      <main id="main" className="flex-1">
        {children}
      </main>
      {!onHome && <Footer />}
    </>
  );
}
