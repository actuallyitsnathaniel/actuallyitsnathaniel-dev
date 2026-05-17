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
    let cls = "tool";
    if (query) cls += matchesFilter(skill, query) ? " hit" : " dim";
    return (
      <a
        key={skill.id}
        href={skill.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        data-b={bucket}
        aria-label={skill.name}
      >
        <span className="d" aria-hidden="true" />
        {skill.name}
      </a>
    );
  };

  return (
    <div>
      <div className="edu-row">
        <span className="edu-k">edu</span>
        <span className="edu-v">azusa pacific university · b.s. computer science</span>
        <span className="edu-year">2021</span>
      </div>

      <h2>toolbelt</h2>
      <div className="lede">technologies i use, have used, and am learning.</div>

      <div className="tool-grid">
        <div className="tool-col">
          <div className="tool-col-h">
            <span className="dot solid" aria-hidden="true" />used daily
          </div>
          <div className="tool-list">{daily.map(renderTool)}</div>
        </div>
        <div className="tool-col">
          <div className="tool-col-h">
            <span className="dot hollow" aria-hidden="true" />used in past
          </div>
          <div className="tool-list">{past.map(renderTool)}</div>
        </div>
        <div className="tool-col">
          <div className="tool-col-h">
            <span className="dot pulse-warn" aria-hidden="true" />learning
          </div>
          <div className="tool-list">{learning.map(renderTool)}</div>
        </div>
      </div>
    </div>
  );
}
