import { skills } from "../Components/skills/skills-data";
import type { Skill } from "../types/skill.types";

interface ToolbeltStageProps {
  filter: string;
}

function bucketSkill(skill: Skill): "daily" | "past" | "learning" {
  const daily: string[] = [
    "react", "typescript", "javascript", "nodejs", "tailwindcss",
    "postgresql", "aws", "vercel", "github", "docker", "express",
    "shopify", "claude-code",
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
    (skill.keywords ?? []).some(k => k.toLowerCase().includes(q))
  );
}

export function ToolbeltStage({ filter }: ToolbeltStageProps) {
  const query = filter.startsWith(":") || filter.startsWith("~") ? "" : filter.toLowerCase().trim();

  const daily = skills.filter(s => bucketSkill(s) === "daily");
  const past = skills.filter(s => bucketSkill(s) === "past");
  const learning = skills.filter(s => bucketSkill(s) === "learning");

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
        className={`tool inline-flex items-center gap-[6px] px-[9px] py-1 bg-bg2 border rounded-[2px] text-[11.5px] transition-[color,border-color,background] duration-[120ms] no-underline ${
          hit
            ? "border-accent text-ink bg-[rgba(126,231,135,0.04)]"
            : dim
            ? "border-rule2 text-dim opacity-20"
            : "border-rule2 text-dim hover:text-ink hover:border-faint hover:bg-[rgba(255,255,255,0.02)]"
        }`}
        data-b={bucket}
        aria-label={skill.name}
      >
        <span className="d w-[5px] h-[5px] rounded-full" aria-hidden="true" />
        {skill.name}
      </a>
    );
  };

  return (
    <div>
      <div className="flex gap-3 items-baseline flex-wrap px-[14px] py-[10px] bg-bg2 border border-rule rounded-[2px] text-t12 tracking-[0.06em] text-dim mb-[18px]">
        <span className="text-accent uppercase text-[10px] tracking-[0.16em]">edu</span>
        <span className="text-ink">azusa pacific university · b.s. computer science</span>
        <span className="text-faint">2021</span>
      </div>

      <h2>toolbelt</h2>
      <div className="lede">technologies i use, have used, and am learning.</div>

      <div className="grid grid-cols-3 gap-0 border border-rule rounded-[3px] overflow-hidden mt-[22px] md:grid-cols-1">
        {/* daily */}
        <div className="px-[20px] py-[18px] border-r border-rule md:border-r-0 md:border-b">
          <div className="flex items-center gap-2 font-medium text-[10.5px] tracking-[0.16em] uppercase text-faint mb-[14px] pb-[10px] border-b border-rule">
            <span className="dot solid w-[7px] h-[7px] rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" aria-hidden="true" />
            used daily
          </div>
          <div className="flex flex-wrap gap-[5px]">{daily.map(renderTool)}</div>
        </div>

        {/* past */}
        <div className="px-[20px] py-[18px] border-r border-rule md:border-r-0 md:border-b">
          <div className="flex items-center gap-2 font-medium text-[10.5px] tracking-[0.16em] uppercase text-faint mb-[14px] pb-[10px] border-b border-rule">
            <span className="dot hollow w-[7px] h-[7px] rounded-full border border-rule2 bg-transparent" aria-hidden="true" />
            used in past
          </div>
          <div className="flex flex-wrap gap-[5px]">{past.map(renderTool)}</div>
        </div>

        {/* learning */}
        <div className="px-[20px] py-[18px] md:border-b-0">
          <div className="flex items-center gap-2 font-medium text-[10.5px] tracking-[0.16em] uppercase text-faint mb-[14px] pb-[10px] border-b border-rule">
            <span className="dot pulse-warn w-[7px] h-[7px] rounded-full bg-warn shadow-[0_0_6px_var(--warn)] animate-[tpulse_1.6s_infinite]" aria-hidden="true" />
            learning
          </div>
          <div className="flex flex-wrap gap-[5px]">{learning.map(renderTool)}</div>
        </div>
      </div>
    </div>
  );
}
