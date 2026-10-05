import { about, principles, site } from "@/lib/content";
import { Section } from "@/components/section";
import { Skills } from "@/components/skills/skills";

export function About() {
  return (
    <Section id="about" index="02" label="About" title="Building products, not just pages.">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="space-y-5 text-lg leading-relaxed text-pretty">
          {about.map((p, i) => (
            <p key={i} className={i ? "text-muted" : undefined}>
              {p}
            </p>
          ))}
          <dl className="mt-8 grid gap-4 border-t border-line pt-8 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-muted">Education</dt>
              <dd className="mt-2 font-medium">{site.education.degree}</dd>
              <dd className="text-muted">{site.education.school}</dd>
              <dd className="font-mono text-xs text-muted">{site.education.period}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-muted">Certifications</dt>
              <dd className="mt-2">
                <ul className="space-y-1 text-muted">
                  {site.certifications.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
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

      <h3 className="font-display mt-24 text-2xl font-semibold tracking-tight">Stack</h3>
      <p className="mt-2 mb-8 text-sm text-muted">Tools I reach for on client and product work.</p>
      <Skills />
    </Section>
  );
}
