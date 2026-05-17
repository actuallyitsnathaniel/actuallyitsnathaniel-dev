import { skills } from "../Components/skills/skills-data";
import type { Skill } from "../types/skill.types";

interface ToolbeltStageProps {
  filter: string;
}

function bucketSkill(skill: Skill): "daily" | "past" | "learning" {
  const daily: string[] = [
    "react",
    "typescript",
    "javascript",
    "nodejs",
    "tailwindcss",
    "postgresql",
    "aws",
    "vercel",
    "github",
    "docker",
    "express",
    "shopify",
    "claude-code",
  ];
  const learning: string[] = ["angular", "springboot", "gcp"];

  if (daily.includes(skill.id)) return "daily";
  if (learning.includes(skill.id)) return "learning";
  return "past";
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

  const daily = skills.filter((s) => bucketSkill(s) === "daily");
  const past = skills.filter((s) => bucketSkill(s) === "past");
  const learning = skills.filter((s) => bucketSkill(s) === "learning");

  const renderTool = (skill: Skill) => {
    const bucket = bucketSkill(skill);
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
        data-b={bucket}
        aria-label={skill.name}
      >
        <span className="d w-1.25 h-1.25 rounded-full" aria-hidden="true" />
        {skill.name}
      </a>
    );
  };

  return (
    <div>
      <h2>toolbelt</h2>
      <div className="lede">
        technologies i use, have used, and am learning.
      </div>

      <div className="grid grid-cols-1 gap-0 border border-rule rounded-[3px] overflow-hidden mt-5.5 md:grid-cols-3 lede">
        {/* daily */}
        <div className="px-5 py-4.5 border-b border-rule md:border-b-0 md:border-r">
          <div className="flex items-center gap-2 font-medium text-[10.5px] tracking-[0.16em] uppercase text-faint mb-3.5 pb-2.5 border-b border-rule">
            <span
              className="dot solid w-1.75 h-1.75 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]"
              aria-hidden="true"
            />
            used daily
          </div>
          <div className="flex flex-wrap gap-1.25">{daily.map(renderTool)}</div>
        </div>

        {/* past */}
        <div className="px-5 py-4.5 border-b border-rule md:border-b-0 md:border-r">
          <div className="flex items-center gap-2 font-medium text-[10.5px] tracking-[0.16em] uppercase text-faint mb-3.5 pb-2.5 border-b border-rule">
            <span
              className="dot hollow w-1.75 h-1.75 rounded-full border border-rule2 bg-transparent"
              aria-hidden="true"
            />
            used in past
          </div>
          <div className="flex flex-wrap gap-1.25">{past.map(renderTool)}</div>
        </div>

        {/* learning */}
        <div className="px-5 py-4.5">
          <div className="flex items-center gap-2 font-medium text-[10.5px] tracking-[0.16em] uppercase text-faint mb-3.5 pb-2.5 border-b border-rule">
            <span
              className="dot pulse-warn w-1.75 h-1.75 rounded-full bg-warn shadow-[0_0_6px_var(--warn)] animate-[tpulse_1.6s_infinite]"
              aria-hidden="true"
            />
            learning
          </div>
          <div className="flex flex-wrap gap-1.25">
            {learning.map(renderTool)}
          </div>
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
