import { works } from "@/lib/works";
import { skills } from "@/lib/content";

export function Skills() {
  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-[#e5e5e5] bg-[#e5e5e5] sm:grid-cols-2">
      {skills.map(({ group, items }) => (
        <div key={group} className="bg-white p-6">
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#737373]">{group}</h4>
          <ul className="mt-4 flex flex-wrap gap-2">
            {items.map(({ name, note }) => {
              const usedIn = works.filter(
                (p) => p.frontend.includes(name) || p.backend.includes(name),
              ).map((p) => p.name);
              const detail = [note, usedIn.length ? `Used on ${usedIn.slice(0, 2).join(", ")}` : ""].filter(Boolean).join(". ");
              const id = `skill-${group}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <li
                  key={name}
                  tabIndex={detail ? 0 : undefined}
                  aria-describedby={detail ? id : undefined}
                  className="group/chip relative rounded-md border border-[#eee] bg-[#fafafa] px-2.5 py-1 text-sm text-[#404040] transition-colors hover:border-[#e63946]/40"
                >
                  {name}
                  {detail && (
                    <>
                      <span aria-hidden className="ml-1.5 inline-block size-1.5 rounded-full bg-[#e63946] align-middle" />
                      <span
                        id={id}
                        role="tooltip"
                        className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-max max-w-56 rounded-md border border-[#eee] bg-white px-2.5 py-1.5 text-xs text-[#525252] opacity-0 shadow-lg transition-opacity group-hover/chip:opacity-100 group-focus-visible/chip:opacity-100"
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
