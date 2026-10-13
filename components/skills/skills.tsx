import Link from "next/link";
import { site, skills } from "@/lib/content";
import { works } from "@/lib/works";

function projectsUsing(name: string) {
  return works.filter((p) => p.frontend.includes(name) || p.backend.includes(name));
}

export function Skills() {
  return (
    <div className="overflow-hidden rounded-sm border border-line bg-surface">
      <div className="border-b border-line px-5 py-4 sm:px-6">
        <p className="text-sm text-muted">
          <span className="font-medium text-foreground">Frontend-first</span> — {site.stack}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 lg:divide-x lg:divide-line">
        {skills.map(({ group, items }, groupIndex) => (
          <div
            key={group}
            className={`border-t border-line px-5 py-6 first:border-t-0 sm:px-6 sm:py-7 lg:border-t-0 ${
              groupIndex === 0 ? "bg-[color-mix(in_oklab,var(--hero-orange)_4%,var(--surface))]" : "bg-surface"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{group}</h4>
              {groupIndex === 0 && (
                <span className="rounded-full bg-hero-orange/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                  Core
                </span>
              )}
            </div>

            <ul className="mt-5 space-y-0">
              {items.map(({ name, note }) => {
                const matched = projectsUsing(name);
                const slug = matched[0]?.slug;
                return (
                  <li
                    key={name}
                    className="flex items-start justify-between gap-4 border-t border-line py-3.5 first:border-t-0 first:pt-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug text-foreground">{name}</p>
                      {note && <p className="mt-0.5 text-xs text-muted">{note}</p>}
                    </div>
                    {matched.length > 0 ? (
                      slug ? (
                        <Link
                          href={`/works/${slug}`}
                          className="shrink-0 text-right text-[11px] leading-tight text-muted underline decoration-line underline-offset-2 transition-colors hover:text-accent hover:decoration-accent/40"
                        >
                          {matched.length > 1 ? `${matched.length} projects` : matched[0].name}
                        </Link>
                      ) : (
                        <span className="shrink-0 text-[11px] text-muted">{matched[0].name}</span>
                      )
                    ) : (
                      <span className="shrink-0 text-[11px] text-muted/70">Supporting</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
