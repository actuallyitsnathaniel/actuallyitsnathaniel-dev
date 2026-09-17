export type SectionId =
  | "home"
  | "about"
  | "toolbelt"
  | "work"
  | "infra"
  | "repos"
  | "misc"
  | "developers"
  | "docs"
  | "contact"
  | "privacy";

export interface Section {
  id: SectionId;
  /** Public URL path. */
  href: string;
  /** Terminal path label. */
  path: string;
  label: string;
  aliases: string[];
  /** Shown in chip nav. Default true. */
  chip?: boolean;
}

export const SECTIONS: Section[] = [
  { id: "home", href: "/", path: "~/", label: "~/", aliases: ["home", "whoami", "~/", "~/whoami"] },
  { id: "about", href: "/about", path: "~/about", label: "~/about", aliases: ["about", "~/about"] },
  { id: "toolbelt", href: "/toolbelt", path: "~/toolbelt", label: "~/toolbelt", aliases: ["toolbelt", "tools", "skills", "~/toolbelt"] },
  { id: "work", href: "/work", path: "~/work", label: "~/work", aliases: ["work", "projects", "~/work"] },
  { id: "infra", href: "/infra", path: "~/infra", label: "~/infra", aliases: ["infra", "infrastructure", "~/infra"] },
  { id: "repos", href: "/repos", path: "~/repos", label: "~/repos", aliases: ["repos", "github", "~/repos"] },
  { id: "misc", href: "/misc", path: "~/misc", label: "~/misc", aliases: ["misc", "miscellaneous", "~/misc"] },
  { id: "developers", href: "/developers", path: "~/developers", label: "~/developers", aliases: ["developers", "dev", "developer", "~/developers", "~/dev"], chip: false },
  { id: "docs", href: "/docs", path: "~/docs", label: "~/docs", aliases: ["docs", "documentation", "~/docs"], chip: false },
  { id: "contact", href: "/contact", path: "~/contact", label: "~/contact", aliases: ["contact", "~/contact"], chip: false },
  { id: "privacy", href: "/privacy", path: "~/privacy", label: "~/privacy", aliases: ["privacy", "~/privacy"], chip: false },
];

export const SECTION_MAP = Object.fromEntries(SECTIONS.map((s) => [s.id, s])) as Record<
  SectionId,
  Section
>;

/** Sections shown in chip nav / filter matching. */
export const CHIP_SECTIONS = SECTIONS.filter((s) => s.chip !== false);

export const GO_MAP: Record<string, SectionId> = {
  w: "work",
  a: "about",
  t: "toolbelt",
  i: "infra",
  r: "repos",
  m: "misc",
  h: "home",
};

/** Pathname aliases that share a section. */
export const PATH_ALIASES: Record<string, SectionId> = {
  "/sandbox": "developers",
};

export const SPA_PATHS = [
  ...SECTIONS.map((s) => s.href),
  ...Object.keys(PATH_ALIASES),
];

export const WELL_KNOWN_FILES: Record<string, { file: string; type: string }> = {
  "/.well-known/api-catalog": {
    file: "/.well-known/api-catalog.json",
    type: 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
  },
  "/.well-known/oauth-protected-resource": {
    file: "/.well-known/oauth-protected-resource.json",
    type: "application/json; charset=utf-8",
  },
  "/.well-known/oauth-authorization-server": {
    file: "/.well-known/oauth-authorization-server.json",
    type: "application/json; charset=utf-8",
  },
  "/.well-known/http-message-signatures-directory": {
    file: "/.well-known/http-message-signatures-directory.json",
    type: "application/http-message-signatures-directory+json",
  },
  "/.well-known/llms.txt": { file: "/llms.txt", type: "text/plain; charset=utf-8" },
};

export const KNOWN_PREFIXES = [
  "/api",
  "/.well-known",
  "/agent",
  "/oauth2",
  "/assets",
  "/feeds/",
  "/skills/",
];

export function sectionFromPathname(pathname: string): SectionId | null {
  const path = pathname.replace(/\/$/, "") || "/";
  if (PATH_ALIASES[path]) return PATH_ALIASES[path];
  return SECTIONS.find((s) => s.href === path)?.id ?? null;
}

export function isSpaPath(pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  return SPA_PATHS.includes(path);
}

export function defaultOpenEntries(): string[] {
  return [];
}

export function filterFromUrl(): string {
  return new URLSearchParams(window.location.search).get("f") ?? "";
}

export function entriesFromUrl(): string[] {
  const e = new URLSearchParams(window.location.search).get("e") ?? "";
  return e ? e.split(",").filter(Boolean) : [];
}

export function sectionFromUrl(): SectionId {
  const byPath = sectionFromPathname(window.location.pathname);
  if (byPath) return byPath;
  const p = new URLSearchParams(window.location.search).get("p");
  return SECTIONS.find((s) => s.id === p)?.id ?? "home";
}
