import { ABOUT } from "./about.js";
import { PROJECTS, type ProjectEntry } from "./projects.js";
import { SKILLS, type SkillEntry } from "./skills.js";
import { SITE_EMAIL, SITE_URL } from "./site.js";

export function searchProjects(query?: string): ProjectEntry[] {
  const q = query?.toLowerCase().trim() ?? "";
  return PROJECTS.filter(
    (p) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q) ||
      p.stack.toLowerCase().includes(q) ||
      p.aliases.some((a) => a.includes(q)),
  );
}

export function searchSkills(query?: string): SkillEntry[] {
  const q = query?.toLowerCase().trim() ?? "";
  return SKILLS.filter(
    (s) =>
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.keywords.some((k) => k.toLowerCase().includes(q)),
  );
}

export function aboutPayload() {
  return {
    name: "Nathaniel Bowman",
    brand: "actuallyitsnathaniel",
    bio: ABOUT.bio,
    tagline: ABOUT.tagline,
    note: ABOUT.noteShort,
    facts: ABOUT.facts,
  };
}

export function contactPayload() {
  return {
    email: SITE_EMAIL,
    github: "https://github.com/actuallyitsnathaniel",
    linkedin: "https://linkedin.com/in/nathaniel-bowman",
    location: "Los Angeles, CA (PST)",
  };
}

export function projectsText(query?: string): string {
  const matches = searchProjects(query);
  return (
    matches
      .map(
        (p) =>
          `${p.name} (${p.date})\nrole: ${p.role}\nstack: ${p.stack}` +
          (p.liveUrl ? `\nlive: ${p.liveUrl}` : "") +
          `\n${p.bullets.map((b) => `- ${b.text}`).join("\n")}`,
      )
      .join("\n\n") || "no matching projects"
  );
}

export function skillsText(query?: string): string {
  const matches = searchSkills(query);
  return matches.map((s) => `${s.name} — ${s.category}`).join("\n") || "no matching tools";
}

export function aboutText(): string {
  return [
    `${ABOUT.bio} ${ABOUT.tagline}`,
    ABOUT.noteShort,
    ...ABOUT.facts.map((f) => `${f.label}: ${f.value}`),
  ].join("\n\n");
}

export function contactText(): string {
  const c = contactPayload();
  return [`email: ${c.email}`, `github: ${c.github}`, `linkedin: ${c.linkedin}`].join("\n");
}

export function apiCatalog(environment: "live" | "sandbox") {
  return {
    name: "Nathaniel Bowman public API",
    description:
      "Read-only REST adapter over the same data as the MCP server. No API key required.",
    environment,
    sandbox: true,
    auth: "anonymous",
    docs: `${SITE_URL}/developers`,
    openapi: `${SITE_URL}/openapi.json`,
    mcp: `${SITE_URL}/api/mcp`,
    resources: {
      about: `${SITE_URL}/api/v1/about`,
      projects: `${SITE_URL}/api/v1/projects`,
      skills: `${SITE_URL}/api/v1/skills`,
      contact: `${SITE_URL}/api/v1/contact`,
      resume: `${SITE_URL}/api/v1/resume`,
      sandbox: `${SITE_URL}/api/v1/sandbox`,
      health: `${SITE_URL}/api/v1/health`,
    },
  };
}

export type NlHit = {
  "@context": "https://schema.org";
  "@type": "Thing";
  "@id": string;
  name: string;
  description: string;
  url: string;
};

export function searchHits(query: string): NlHit[] {
  const q = query.toLowerCase();
  const tokens = q.split(/[^a-z0-9]+/).filter((t) => t.length > 2);
  const hit = (blob: string) => !tokens.length || tokens.some((t) => blob.includes(t));
  const hits: NlHit[] = [];

  const aboutBlob =
    `${ABOUT.bio} ${ABOUT.tagline} ${ABOUT.noteShort} nathaniel bowman actuallyitsnathaniel resume contact email hire review reading accountability`.toLowerCase();
  if (!q || hit(aboutBlob)) {
    hits.push({
      "@context": "https://schema.org",
      "@type": "Thing",
      "@id": `${SITE_URL}/about`,
      name: "Nathaniel Bowman",
      description: `${ABOUT.bio} ${ABOUT.tagline} ${ABOUT.noteShort}`,
      url: `${SITE_URL}/about`,
    });
  }

  for (const p of searchProjects(query)) {
    hits.push({
      "@context": "https://schema.org",
      "@type": "Thing",
      "@id": p.liveUrl || `${SITE_URL}/work`,
      name: p.name,
      description: `${p.role}. ${p.tag}. ${p.stack}. ${p.bullets[0]?.text ?? ""}`,
      url: p.liveUrl || `${SITE_URL}/work`,
    });
  }

  if (q) {
    for (const s of searchSkills(query).slice(0, 8)) {
      hits.push({
        "@context": "https://schema.org",
        "@type": "Thing",
        "@id": s.href,
        name: s.name,
        description: `${s.name} — ${s.category}`,
        url: s.href,
      });
    }
  }

  if (!q || hit("mcp api rest openapi developer agent documentation")) {
    hits.push({
      "@context": "https://schema.org",
      "@type": "Thing",
      "@id": `${SITE_URL}/developers`,
      name: "Developer resources",
      description: `MCP at ${SITE_URL}/api/mcp, REST at ${SITE_URL}/api/v1, OpenAPI at ${SITE_URL}/openapi.json. Email ${SITE_EMAIL}.`,
      url: `${SITE_URL}/developers`,
    });
  }

  return hits.slice(0, 12);
}
