import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}
          <span className="mx-2">·</span>
          Built with Next.js and TypeScript
        </p>
        <ul className="flex gap-6">
          <li><a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a></li>
          <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a></li>
          <li><a href={`mailto:${site.email}`} className="hover:text-foreground">Email</a></li>
          <li><a href="#top" className="hover:text-foreground">↑ Back to top</a></li>
        </ul>
      </div>
    </footer>
  );
}
