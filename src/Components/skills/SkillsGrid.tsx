import type { Skill } from "../../types/skill.types";
import { SkillCard } from "./SkillCard";

export const SkillsGrid = ({ skills }: { skills: Skill[] }) => {
  return (
    <div className="grid md:grid-cols-6 grid-cols-3 gap-4 p-4 h-60 md:h-65 overflow-y-auto">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
};
