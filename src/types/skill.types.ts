import type { IconType } from "react-icons";

export type SkillCategory =
  | "language"
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "cloud"
  | "tools";

export interface Skill {
  id: string;
  name: string;
  icon: IconType;
  href: string;
  category: SkillCategory;
  keywords: string[];
  color: string;
}
