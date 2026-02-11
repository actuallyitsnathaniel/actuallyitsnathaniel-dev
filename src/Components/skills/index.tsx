import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { skills } from "./skills-data";
import { SkillSearch } from "./SkillSearch";
import { SkillsGrid } from "./SkillsGrid";
import { useActivityLog } from "../../context/ActivityLogContext";

export const SkillsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 150);
  const { log } = useActivityLog();

  const filteredSkills = useMemo(() => {
    if (!debouncedQuery.trim()) return skills;

    const query = debouncedQuery.toLowerCase().trim();

    const results = skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(query) ||
        skill.category.includes(query) ||
        skill.keywords.some((kw) => kw.includes(query)),
    );

    return results.length > 0 ? results : skills;
  }, [debouncedQuery]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      log("event", `Search: "${debouncedQuery}" → ${filteredSkills.length} results`);
    }
  }, [debouncedQuery, filteredSkills.length, log]);

  return (
    <div className="flex flex-wrap content-center md:basis-1/2 justify-center p-1 fill-white">
      <h2 className="underline text-5xl py-5 w-full text-center" id="skills">
        SKILLS
      </h2>
      <div className="flex flex-col items-center w-full">
        <SkillSearch value={searchQuery} onChange={setSearchQuery} />
        <SkillsGrid skills={filteredSkills} />
      </div>
    </div>
  );
};
