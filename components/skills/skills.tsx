import { projects, skills } from "@/lib/content";

export function Skills() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {skills.map(({ group, items }) => (
        <div key={group} className="bg-background p-6">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted">{group}</h4>
          <ul className="mt-4 flex flex-wrap gap-2">
            {items.map(({ name, note }) => {
              const usedIn = projects.filter((p) => p.stack.includes(name)).map((p) => p.name);
              const detail = [note, usedIn.length ? `Used in ${usedIn.join(", ")}` : ""].filter(Boolean).join(". ");
              const id = `skill-${group}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <li
                  key={name}
                  tabIndex={detail ? 0 : undefined}
                  aria-describedby={detail ? id : undefined}
                  className="group/chip relative rounded-md border border-line bg-surface/50 px-2.5 py-1 text-sm transition-colors hover:border-foreground/30"
                >
                  {name}
                  {detail && (
                    <>
                      <span aria-hidden className="ml-1.5 inline-block size-1.5 rounded-full bg-accent align-middle" />
                      <span
                        id={id}
                        role="tooltip"
                        className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-max max-w-56 rounded-md border border-line bg-background px-2.5 py-1.5 text-xs text-muted opacity-0 shadow-lg transition-opacity group-hover/chip:opacity-100 group-focus-visible/chip:opacity-100"
                      >
                        {detail}
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
