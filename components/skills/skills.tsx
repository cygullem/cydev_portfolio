import { skills } from "@/lib/content";
import { SkillIcon } from "@/components/skills/skill-icons";

export function Skills() {
  return (
    <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
      {skills.map(({ group, items }) => (
        <div key={group}>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {group}
          </h4>
          <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
            {items.map(({ name }) => (
              <li
                key={name}
                className="flex aspect-square flex-col items-center justify-center gap-2.5 rounded-xl border border-line bg-surface p-2 text-center"
              >
                <SkillIcon name={name} className="size-7 shrink-0" />
                <span className="text-[11px] font-medium leading-tight">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
