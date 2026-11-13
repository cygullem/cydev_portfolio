import Image from "next/image";
import Link from "next/link";
import {
  about,
  experience,
  highlights,
  principles,
  processSteps,
  site,
} from "@/lib/content";
import { works } from "@/lib/works";
import { ArrowUpRight } from "@/components/icons";
import { StatValue } from "@/components/about/stat-value";
import { Skills } from "@/components/skills/skills";

const stats = [
  ...highlights.slice(0, 2),
  { value: String(works.length), label: "Projects in the archive" },
  { value: String(experience.length), label: "Roles on product teams" },
];

const shots = works.flatMap((w) =>
  w.gallery?.[0] ? [{ name: w.name, src: w.gallery[0] }] : [],
);

function ShotRow({ decorative = false }: { decorative?: boolean }) {
  return (
    <ul aria-hidden={decorative || undefined} className="flex shrink-0 gap-4 pr-4">
      {shots.map((shot) => (
        <li
          key={shot.name}
          className="relative h-40 w-64 overflow-hidden rounded-xl border border-line bg-surface sm:h-52 sm:w-80"
        >
          <Image
            src={shot.src}
            alt={decorative ? "" : `${shot.name} landing page`}
            fill
            sizes="320px"
            className="object-cover object-top"
          />
        </li>
      ))}
    </ul>
  );
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="overflow-hidden border-t border-line bg-background"
    >
      <div className="mx-auto max-w-360 px-5 pb-20 pt-16 sm:px-10 sm:pb-28 sm:pt-20">
        <div
          data-reveal
          className="flex items-center justify-between gap-4"
        >
          <p className="text-sm font-medium text-accent">02 / About</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-hero-orange"
            />
            {site.status.replace(/_/g, " ")}
          </span>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12 lg:pt-4">
          <div className="lg:col-span-6">
            <h2
              id="about-title"
              className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-balance"
            >
              <span data-reveal-mask className="block">
                Building products,{" "}
                <span className="text-muted">not just pages.</span>
              </span>
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-lg text-base leading-[1.7] sm:text-[1.0625rem]"
            >
              {about[0]}
            </p>
            <Link
              data-reveal
              href="/works"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline decoration-accent/35 underline-offset-[6px] transition-colors hover:decoration-accent"
            >
              View selected work
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-6">
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                className={`flex min-h-36 flex-col justify-between rounded-2xl p-5 sm:min-h-44 sm:p-6 ${
                  i === 0
                    ? "bg-hero-orange text-white"
                    : "border border-line bg-surface"
                }`}
              >
                <StatValue
                  value={s.value}
                  className="font-hero text-[clamp(3rem,7vw,5.5rem)] leading-none tracking-tight tabular-nums"
                />
                <dt
                  className={`text-xs leading-snug sm:text-sm ${i === 0 ? "text-white/85" : "text-muted"}`}
                >
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div data-reveal className="flex overflow-hidden">
        <div className="about-marquee-track flex w-max hover:[animation-play-state:paused]">
          <ShotRow />
          <ShotRow decorative />
        </div>
      </div>

      <div className="mx-auto max-w-360 px-5 pb-20 pt-20 sm:px-10 sm:pb-28">
        <h3
          data-reveal
          className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
        >
          How I work
        </h3>
        <ol className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-3">
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              className="flex min-h-64 flex-col rounded-2xl bg-[#f3f3f3] p-6 text-[#f4efe6] sm:p-7"
            >
              <span className="font-mono text-xs tabular-nums text-[#000000]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-8 flex h-[2em] items-end font-hero text-[clamp(2.75rem,5vw,4rem)] uppercase leading-none tracking-tight text-hero-orange">
                {step.title}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#000000]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <ul
          data-reveal
          aria-label="What I optimize for"
          className="mt-4 flex flex-wrap gap-2"
        >
          {principles.map((p) => (
            <li
              key={p.title}
              className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-foreground sm:text-sm"
            >
              {p.title}
            </li>
          ))}
        </ul>

        <div className="mt-20 border-t border-line pt-16">
          <h3
            data-reveal
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Stack
          </h3>
          <div data-reveal className="mt-8">
            <Skills />
          </div>
        </div>

        <div className="mt-16 grid gap-3 sm:gap-4 md:grid-cols-2">
          <div
            data-reveal
            className="rounded-2xl border border-line bg-surface p-6 sm:p-7"
          >
            <p className="text-xs uppercase tracking-widest text-muted">
              Education
            </p>
            <p className="mt-6 font-display text-xl font-semibold sm:text-2xl">
              {site.education.degree}
            </p>
            <p className="mt-1 text-sm text-muted">{site.education.school}</p>
            <p className="mt-2 font-mono text-xs text-muted">
              {site.education.period}
            </p>
          </div>
          <div
            data-reveal
            className="rounded-2xl border border-line bg-surface p-6 sm:p-7"
          >
            <p className="text-xs uppercase tracking-widest text-muted">
              Certifications
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.certifications.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    {c.name}
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
