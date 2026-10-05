import Image from "next/image";
import { projects, type Project } from "@/lib/content";
import { Section } from "@/components/section";
import { ArrowUpRight } from "@/components/icons";

function Visual({ p, featured }: { p: Project; featured: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-line bg-surface ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
      {p.image ? (
        <Image
          src={p.image}
          alt={`${p.name} — ${p.tagline}`}
          fill
          sizes={featured ? "(min-width: 1152px) 1088px, 100vw" : "(min-width: 1024px) 540px, 100vw"}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      ) : (
        <div aria-hidden className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="absolute inset-[12%] flex flex-col rounded-lg border border-line bg-background shadow-[0_20px_60px_-30px_color-mix(in_oklab,var(--accent)_50%,transparent)] transition-transform duration-700 ease-out group-hover:-translate-y-1 motion-reduce:transition-none">
            <div className="flex gap-1.5 border-b border-line px-3 py-2.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2 rounded-full bg-line" />
              ))}
            </div>
            <div className="grid flex-1 place-items-center font-mono text-sm text-muted">{p.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function Links({ p }: { p: Project }) {
  if (!p.live && !p.repo) return null;
  return (
    <div className="mt-8 flex flex-wrap gap-5 text-sm font-medium">
      {p.live && (
        <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
          Live site <ArrowUpRight />
          <span className="sr-only">for {p.name}</span>
        </a>
      )}
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
          Source <ArrowUpRight />
          <span className="sr-only">for {p.name}</span>
        </a>
      )}
    </div>
  );
}

function Details({ p }: { p: Project }) {
  return (
    <div className="grid gap-8 text-sm leading-relaxed sm:grid-cols-2">
      <div>
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted">The challenge</h4>
        <p className="mt-3">{p.challenge}</p>
      </div>
      <div>
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted">My contribution</h4>
        <ul className="mt-3 space-y-1.5">
          {p.contribution.map((c) => (
            <li key={c} className="flex gap-2">
              <span aria-hidden className="text-accent">–</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
      {p.impact.length > 0 && (
        <div className="sm:col-span-2">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Impact</h4>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-base font-semibold">
            {p.impact.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Meta({ p, n }: { p: Project; n: number }) {
  return (
    <>
      <p className="font-mono text-xs text-muted">{String(n).padStart(2, "0")}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{p.name}</h3>
      <p className="mt-1 text-muted">{p.tagline}</p>
      <p className="mt-5 max-w-prose leading-relaxed text-pretty">{p.description}</p>
      <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <li key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
            {s}
          </li>
        ))}
      </ul>
    </>
  );
}

export function Projects() {
  const [first, ...rest] = projects;
  return (
    <Section id="work" index="01" label="Selected work" title="Products I've designed, built and shipped.">
      <article className="group">
        <Visual p={first} featured />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Meta p={first} n={1} />
            <Links p={first} />
          </div>
          <Details p={first} />
        </div>
      </article>

      <div className="mt-24 space-y-24">
        {rest.map((p, i) => (
          <article key={p.name} className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={i % 2 ? "lg:order-2" : undefined}>
              <Visual p={p} featured={false} />
            </div>
            <div>
              <Meta p={p} n={i + 2} />
              <div className="mt-8">
                <Details p={p} />
              </div>
              <Links p={p} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
