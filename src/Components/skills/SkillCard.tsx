import type { Skill } from "../../types/skill.types";

export const SkillCard = ({ skill }: { skill: Skill }) => {
  const Icon = skill.icon;

  return (
    <a
      href={skill.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center p-2"
    >
      <div className="relative flex items-center justify-center w-24 h-24 transition-all duration-150 md:grayscale md:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105">
        <Icon
          size={64}
          className="transition-colors duration-150"
          style={{ color: skill.color }}
        />
      </div>
      <span className="mt-1 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        {skill.name}
      </span>
    </a>
  );
};
