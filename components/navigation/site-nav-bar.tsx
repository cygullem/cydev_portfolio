"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { works } from "@/lib/works";
import { Close, GitHub, LinkedIn, Menu } from "@/components/icons";

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/works", label: `Work (${works.length})` },
  { href: "/#contact", label: "Contact" },
];

export function SiteNavBar({ animateIn }: { animateIn?: boolean }) {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <>
      <header
        {...(animateIn ? { "data-ph-in": true } : {})}
        className="relative z-40 flex items-center justify-between px-5 py-6 sm:px-10 sm:py-8"
      >
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight sm:text-xl"
        >
          {site.brand}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em]">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="cursor-pointer text-white/85 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1 border-l border-white/25 pl-6">
            <Link
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid size-9 cursor-pointer place-items-center text-white/85 transition-colors hover:text-white"
            >
              <GitHub />
            </Link>
            <Link
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid size-9 cursor-pointer place-items-center text-white/85 transition-colors hover:text-white"
            >
              <LinkedIn />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-9 cursor-pointer place-items-center text-white/85 transition-colors hover:text-white"
          >
            <GitHub />
          </Link>
          <Link
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid size-9 cursor-pointer place-items-center text-white/85 transition-colors hover:text-white"
          >
            <LinkedIn />
          </Link>
          <button
            type="button"
            aria-expanded={menu}
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu((o) => !o)}
            className="flex cursor-pointer flex-col gap-1.5"
          >
            {menu ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {menu && (
        <ul className="relative z-40 border-y border-white/20 px-5 py-4 font-mono text-sm uppercase tracking-widest md:hidden">
          {primaryNav.map((item) => (
            <li key={item.label}>
              <Link href={item.href} onClick={() => setMenu(false)} className="block py-2">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
