import type { Skill } from "../../types/skill.types";
import { SkillCard } from "./SkillCard";

export const SkillsGrid = ({ skills }: { skills: Skill[] }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 h-[240px] md:h-[260px] overflow-y-auto">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
};
