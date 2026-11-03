"use client";

import { SiteNavBar } from "./site-nav-bar";

export function Nav() {
  return (
    <div className="sticky top-0 z-60 bg-hero-orange text-white">
      <div className="mx-auto max-w-[100rem] border-x border-white/20">
        <div className="border-b border-white/20">
          <SiteNavBar />
        </div>
      </div>
    </div>
  );
}
