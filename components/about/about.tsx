import { about, principles } from "@/lib/content";
import { Section } from "@/components/section";
import { Skills } from "@/components/skills/skills";

export function About() {
  return (
    <Section id="about" index="02" label="About" title="Product thinking, engineered into the interface.">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="space-y-5 text-lg leading-relaxed text-pretty">
          {about.map((p, i) => (
            <p key={i} className={i ? "text-muted" : undefined}>
              {p}
            </p>
          ))}
        </div>
        <ol className="divide-y divide-line border-y border-line">
          {principles.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[2.5rem_1fr] py-5">
              <span className="font-mono text-xs leading-7 text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-1 text-sm text-muted">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <h3 className="mt-24 text-xl font-semibold tracking-tight">Toolkit</h3>
      <p className="mt-2 mb-8 text-sm text-muted">Technologies I use in production. Marked ones link back to projects above.</p>
      <Skills />
    </Section>
  );
}
