import Link from "next/link";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-360 flex-col gap-6 px-5 py-12 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>
          © {new Date().getFullYear()} {site.name}
          <span className="mx-2 text-line">·</span>
          Next.js · TypeScript · Motion · GSAP
        </p>
        <ul className="flex flex-wrap gap-6">
          <li>
            <Link href="/works" className="cursor-pointer hover:text-foreground">
              Works
            </Link>
          </li>
          <li>
            <Link href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              GitHub
            </Link>
          </li>
          <li>
            <Link href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              LinkedIn
            </Link>
          </li>
          <li>
            <Link href={`mailto:${site.email}`} className="hover:text-foreground">
              Email
            </Link>
          </li>
          <li>
            <Link href="/#top" className="hover:text-foreground">
              ↑ Top
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
