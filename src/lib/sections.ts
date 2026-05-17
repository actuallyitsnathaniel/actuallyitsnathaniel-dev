export type SectionId = "home" | "about" | "toolbelt" | "work" | "infra" | "repos" | "misc";

export interface Section {
  id: SectionId;
  path: string;
  label: string;
  aliases: string[];
}

export const SECTIONS: Section[] = [
  { id: "home",     path: "~/",        label: "~/",         aliases: ["home", "whoami", "~/", "~/whoami"] },
  { id: "about",    path: "~/about",   label: "~/about",    aliases: ["about", "~/about"] },
  { id: "toolbelt", path: "~/toolbelt",label: "~/toolbelt", aliases: ["toolbelt", "tools", "skills", "~/toolbelt"] },
  { id: "work",     path: "~/work",    label: "~/work",     aliases: ["work", "projects", "~/work"] },
  { id: "infra",    path: "~/infra",   label: "~/infra",    aliases: ["infra", "infrastructure", "~/infra"] },
  { id: "repos",    path: "~/repos",   label: "~/repos",    aliases: ["repos", "github", "~/repos"] },
  { id: "misc",     path: "~/misc",    label: "~/misc",     aliases: ["misc", "miscellaneous", "~/misc"] },
];

export const SECTION_MAP = Object.fromEntries(SECTIONS.map(s => [s.id, s])) as Record<SectionId, Section>;

export const GO_MAP: Record<string, SectionId> = {
  w: "work", a: "about", t: "toolbelt", i: "infra", r: "repos", m: "misc", h: "home",
};

export function sectionFromUrl(): SectionId {
  const p = new URLSearchParams(window.location.search).get("p");
  return SECTIONS.find(s => s.id === p)?.id ?? "home";
}

export function filterFromUrl(): string {
  return new URLSearchParams(window.location.search).get("f") ?? "";
}

export function entriesFromUrl(): string[] {
  const e = new URLSearchParams(window.location.search).get("e") ?? "";
  return e ? e.split(",").filter(Boolean) : [];
}

export function defaultOpenEntries(): string[] {
  return [];
}
