import { highlights, site } from "@/lib/content";
import { GitHub, LinkedIn, Mail } from "@/components/icons";

const socials = [
  { href: site.github, label: "GitHub", Icon: GitHub, external: true },
  { href: site.linkedin, label: "LinkedIn", Icon: LinkedIn, external: true },
  { href: `mailto:${site.email}`, label: "Email", Icon: Mail, external: false },
];

const terminal = [
  ["whoami", site.role.toLowerCase()],
  ["stack", site.stack],
  ["location", site.location],
  ["status", site.status],
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative -mt-18 overflow-hidden pt-18">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(60%_50%_at_30%_0%,color-mix(in_oklab,var(--accent)_14%,transparent),transparent)]"
      />
      <div className="mx-auto grid max-w-6xl gap-16 px-5 pt-16 pb-20 sm:px-8 sm:pt-24 lg:grid-cols-[1fr_22rem] lg:items-end lg:pb-28">
        <div>
          <p className="rise inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-emerald-500" />
            </span>
            Available for opportunities
          </p>

          <h1 id="hero-title" className="lift mt-8 max-w-4xl text-5xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-7xl lg:text-[5.5rem]">
            {site.headline}
          </h1>

          <p className="rise mt-8 max-w-xl text-lg leading-relaxed text-muted text-pretty [--d:120ms]">
            <span className="text-foreground">{site.name}</span> — {site.summary}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3 [--d:200ms]">
            <a href="#work" className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-px active:translate-y-0">
              View projects
            </a>
            <a href="#contact" className="inline-flex h-11 items-center rounded-full border border-line px-6 text-sm font-medium transition-colors hover:bg-surface">
              Contact me
            </a>
            <ul className="flex items-center gap-1 sm:ml-3">
              {socials.map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="rise hidden rounded-xl border border-line bg-surface/60 p-5 font-mono text-[13px] leading-6 [--d:300ms] lg:block">
          {terminal.map(([cmd, out]) => (
            <div key={cmd} className="mb-3 last:mb-0">
              <dt className="text-muted">
                <span aria-hidden className="text-accent">$ </span>
                {cmd}
              </dt>
              <dd className="truncate">{out}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
          {highlights.map((h) => (
            <li key={h.value} className="bg-background p-5 sm:p-6">
              <p className="text-lg font-semibold tracking-tight sm:text-xl">{h.value}</p>
              <p className="mt-1 text-sm text-muted">{h.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
