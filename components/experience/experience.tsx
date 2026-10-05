import { experience } from "@/lib/content";
import { Section } from "@/components/section";

export function Experience() {
  return (
    <Section id="experience" index="03" label="Experience" title="Where I've shipped.">
      <ol className="relative border-l border-line">
        {experience.map((e) => (
          <li key={`${e.company}-${e.period}`} className="relative grid gap-4 pb-16 pl-8 last:pb-0 md:grid-cols-[12rem_1fr] md:gap-12">
            <span aria-hidden className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-background bg-accent" />
            <p className="font-mono text-sm text-muted">{e.period}</p>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{e.role}</h3>
              <p className="text-muted">{e.company}</p>
              <ul className="mt-5 space-y-2 leading-relaxed">
                {e.achievements.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden className="text-accent">–</span>
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-xs text-muted">{e.stack.join(" · ")}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
