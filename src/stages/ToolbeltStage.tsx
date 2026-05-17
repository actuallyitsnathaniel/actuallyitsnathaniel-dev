import { skills } from "../Components/skills/skills-data";
import type { Skill } from "../types/skill.types";

interface ToolbeltStageProps {
  filter: string;
}

function matchesFilter(skill: Skill, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    skill.name.toLowerCase().includes(q) ||
    skill.id.toLowerCase().includes(q) ||
    skill.category.toLowerCase().includes(q) ||
    (skill.keywords ?? []).some((k) => k.toLowerCase().includes(q))
  );
}

export function ToolbeltStage({ filter }: ToolbeltStageProps) {
  const query =
    filter.startsWith(":") || filter.startsWith("~")
      ? ""
      : filter.toLowerCase().trim();

  const renderTool = (skill: Skill) => {
    const hit = query && matchesFilter(skill, query);
    const dim = query && !matchesFilter(skill, query);

    return (
      <a
        key={skill.id}
        href={skill.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`tool inline-flex items-center gap-1.5 px-2.25 py-1 bg-bg2 border rounded-xs text-[11.5px] transition-[color,border-color,background] duration-120 no-underline ${
          hit
            ? "border-accent text-ink bg-[rgba(126,231,135,0.04)]"
            : dim
              ? "border-rule2 text-dim opacity-20"
              : "border-rule2 text-dim hover:text-ink hover:border-faint hover:bg-[rgba(255,255,255,0.02)]"
        }`}
        aria-label={skill.name}
      >
        {skill.name}
      </a>
    );
  };

  return (
    <div>
      <h2>toolbelt</h2>
      <div className="lede">technologies i work with.</div>

      <div className="border border-rule rounded-[3px] px-5 py-4.5 mt-5.5">
        <div className="flex flex-wrap gap-1.25">
          {skills.map(renderTool)}
        </div>
      </div>

      <div className="flex gap-3 items-baseline flex-wrap px-3.5 py-2.5 bg-bg2 border border-rule rounded-xs text-t12 tracking-[0.06em] text-dim mb-4.5">
        <span className="text-accent uppercase text-[10px] tracking-[0.16em]">
          edu
        </span>
        <span className="text-ink">
          azusa pacific university · b.s. computer science
        </span>
        <span className="text-faint">2021</span>
      </div>
    </div>
  );
}
