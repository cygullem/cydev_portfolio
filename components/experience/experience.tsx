import { experience } from "@/lib/content";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function duration(period: string) {
  const [start, end] = period.split("—").map((s) => s.trim().split(" "));
  const total = (+end[1] - +start[1]) * 12 + months.indexOf(end[0]) - months.indexOf(start[0]) + 1;
  return `${total} mo${total === 1 ? "" : "s"}`;
}

function emphasize(text: string) {
  return text.split(/(~?\d+(?:%|\+)?)/g).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

const span = `${experience.at(-1)?.period.split("—")[0].trim()} — ${experience[0]?.period.split("—")[1].trim()}`;

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-360 px-5 sm:px-10">
        <header className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">03 / Experience</p>
            <h2
              id="experience-title"
              className="font-display mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              Where I&apos;ve shipped.
            </h2>
          </div>
          <dl className="grid grid-cols-2 gap-x-10 gap-y-1 font-mono text-xs text-muted sm:flex sm:gap-10">
            <div>
              <dt className="uppercase tracking-widest">Roles</dt>
              <dd className="mt-1 text-sm text-foreground">{String(experience.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest">Span</dt>
              <dd className="mt-1 text-sm text-foreground">{span}</dd>
            </div>
          </dl>
        </header>

        <ol className="mt-16 border-b border-line">
          {experience.map((e, i) => {
            const [title, product] = e.role.split(" · ");
            return (
              <li
                key={`${e.company}-${e.period}`}
                className="group grid gap-6 border-t border-line py-10 transition-colors hover:bg-surface/60 sm:py-12 lg:grid-cols-12 lg:gap-10 lg:px-4"
              >
                <div className="flex items-baseline justify-between gap-4 lg:col-span-3 lg:flex-col lg:justify-start lg:gap-2">
                  <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="text-right lg:text-left">
                    <p className="font-mono text-sm text-foreground">{e.period}</p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {duration(e.period)} · {e.location}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-[1.75rem]">
                    {title}
                  </h3>
                  <p className="mt-2 text-muted">
                    {product && <span className="text-foreground">{product}</span>}
                    {product && <span aria-hidden className="mx-2 text-line">/</span>}
                    {e.company}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <ul className="space-y-3 text-[0.9375rem] leading-relaxed text-muted">
                    {e.achievements.map((a) => (
                      <li key={a} className="grid grid-cols-[1rem_1fr]">
                        <span aria-hidden className="mt-[0.7em] h-px w-2.5 bg-accent" />
                        <span>{emphasize(a)}</span>
                      </li>
                    ))}
                  </ul>
                  <ul aria-label="Stack" className="mt-6 flex flex-wrap gap-1.5">
                    {e.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
