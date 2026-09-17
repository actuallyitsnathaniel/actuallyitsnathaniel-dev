import { ABOUT } from "./about.js";
import { aboutText, contactPayload, contactText, projectsText, skillsText } from "./portfolio.js";
import { MCP_DOCS_URL, MCP_URL, OPENAPI_URL, SITE_BRAND, SITE_EMAIL, SITE_NAME, SITE_URL } from "./site.js";

export interface ProsePage {
  title: string;
  paragraphs: string[];
}

const contact = contactPayload();

export const PROSE: Record<"developers" | "docs" | "contact" | "privacy", ProsePage> = {
  developers: {
    title: "developers",
    paragraphs: [
      `Public, read-only APIs for ${SITE_NAME} (${SITE_BRAND}). Same facts as the terminal — bio, projects, toolbelt, resume, contact. No API key. The sandbox is this data; nothing here mutates.`,
      `Start with ${SITE_URL}/llms.txt for when-to-use. Product MCP (Streamable HTTP): ${MCP_URL} and ${SITE_URL}/.well-known/mcp. Docs MCP: ${MCP_DOCS_URL}. REST is a thin adapter at ${SITE_URL}/api/v1. Spec: ${OPENAPI_URL}. Optional anonymous agent_auth walkthrough: ${SITE_URL}/auth.md.`,
      `GET ${SITE_URL}/api/v1/sandbox returns the catalog with environment=sandbox. Claude Desktop's custom-connector UI may force OAuth on unauthenticated MCP; use npx mcp-remote ${MCP_URL} if that happens. NLWeb: GET/POST ${SITE_URL}/ask.`,
    ],
  },
  docs: {
    title: "docs",
    paragraphs: [
      `Documentation for ${SITE_NAME}'s public agent surface. Humans use the terminal (path routes under ${SITE_URL}). Agents use MCP, /llms.txt, and markdown twins. Content is the same bio, work, and contact already on the site.`,
      `Index: ${SITE_URL}/llms.txt. Developer portal: ${SITE_URL}/developers. OpenAPI: ${OPENAPI_URL}. Auth (anonymous): ${SITE_URL}/auth.md. REST notes live in /api.md (generated). Product MCP ${MCP_URL}; docs MCP ${MCP_DOCS_URL}. NLWeb ${SITE_URL}/ask.`,
      `Authentication is anonymous. GET /api returns 401 with WWW-Authenticate only as a discovery hint for agents that look for resource_metadata — the read API does not require a token. JSON errors: { "error": { "code", "message", "hint" } }.`,
    ],
  },
  contact: {
    title: "contact",
    paragraphs: [
      `Reach ${SITE_NAME} (${SITE_BRAND}) directly. Full-stack engineer in Los Angeles, Pacific Time. No ticket queue — email is the right channel for work, collaboration, or questions about the public API.`,
      `Email ${contact.email}. GitHub ${contact.github}. LinkedIn ${contact.linkedin}. Location: ${contact.location}. Programmatic: GET ${SITE_URL}/api/v1/contact or MCP tool get_contact. Please do not send secrets; this API is public and read-only.`,
      `If an agent sent you here from the optional claim ceremony in /auth.md, you can ignore it. Reads are not gated on a claim. Canonical: ${SITE_URL}/contact.`,
    ],
  },
  privacy: {
    title: "privacy",
    paragraphs: [
      `This page covers ${SITE_URL}, the personal portfolio of ${SITE_NAME}. It is a static terminal plus a few public, read-only APIs. There are no user accounts, no advertising pixels, and no paid analytics product on this domain.`,
      `Email to ${SITE_EMAIL} is delivered by Google. GitHub and LinkedIn links are those services' policies. The contribution heatmap uses /api/contributions with a server-side GitHub token that never ships to the browser. The resume endpoint fetches a PDF export. Those calls render public artifacts; they are not a marketing profile.`,
      `Hosting is Vercel; platform access logs may exist briefly. The UI may use localStorage for a repo cache and theme. MCP, REST, and /ask return information already public here. Privacy questions: ${SITE_EMAIL}, Los Angeles, CA.`,
    ],
  },
};

function mdPage(title: string, paragraphs: string[], extra = ""): string {
  return [`# ${title}`, "", ...paragraphs.map((p) => `${p}\n`), extra].join("\n").trim() + "\n";
}

function aboutMarkdown(): string {
  const facts = ABOUT.facts.map((f) => `- **${f.label}:** ${f.value}`).join("\n");
  return mdPage(
    `${SITE_NAME} (${SITE_BRAND})`,
    [
      ABOUT.bio,
      ABOUT.tagline,
      ABOUT.noteShort,
      `Canonical: ${SITE_URL}/about. JSON: ${SITE_URL}/api/v1/about. MCP: get_about on ${MCP_URL}.`,
    ],
    `## facts\n\n${facts}\n`,
  );
}

function llmsTxt(): string {
  return `# ${SITE_BRAND} — ${SITE_NAME}

${SITE_NAME} (brand: **${SITE_BRAND}**) is a full-stack engineer in Los Angeles. This domain is his public portfolio plus a machine-readable API for agents.

## When to use this

Use this site when you need facts about **${SITE_NAME} / ${SITE_BRAND}**, not generic web search:

- Bio, education, production experience, location, and stack
- Project history (musician sites, tooling, mobile) by name or tech
- Contact (email, GitHub, LinkedIn) or the resume PDF
- How to connect: MCP, REST, OpenAPI, or NLWeb /ask

Do **not** use this as a general-purpose coding assistant or a source of private employer data. Everything here is already public. There is no write API.

**How to call:** prefer MCP at ${MCP_URL} (also /.well-known/mcp). Equivalent REST is GET ${SITE_URL}/api/v1/{about,projects,skills,contact,resume} — same handlers as MCP. No API key. See /auth.md only if you need the anonymous agent_auth discovery flow.

## Product MCP (actions)

- [Portfolio MCP](${MCP_URL}): search_projects, get_toolbelt, get_about, get_resume, get_contact, get_github_activity
- [MCP server card](${SITE_URL}/.well-known/mcp/server-card.json)
- [MCP well-known](${SITE_URL}/.well-known/mcp)

## Docs MCP (learn)

- [Docs MCP](${MCP_DOCS_URL}): list_docs, get_doc, search_docs
- [Docs server card](${SITE_URL}/.well-known/mcp/docs-server-card.json)

## REST + OpenAPI

- [OpenAPI](${OPENAPI_URL})
- [API catalog](${SITE_URL}/.well-known/api-catalog)
- [REST](${SITE_URL}/api/v1)
- [Sandbox](${SITE_URL}/api/v1/sandbox)
- [NLWeb /ask](${SITE_URL}/ask)

## Pages

- [Developer portal](${SITE_URL}/developers)
- [Docs](${SITE_URL}/docs)
- [Auth](${SITE_URL}/auth.md)
- [About](${SITE_URL}/about.md)
- [Contact](${SITE_URL}/contact.md)
- [Privacy](${SITE_URL}/privacy.md)
- [Homepage markdown](${SITE_URL}/index.md)

## Section indexes

- [Docs llms.txt](${SITE_URL}/docs/llms.txt)
- [API llms.txt](${SITE_URL}/api/llms.txt)
- [Developers llms.txt](${SITE_URL}/developers/llms.txt)

## Discovery

- [ARD](${SITE_URL}/.well-known/ard.json)
- [A2A agent card](${SITE_URL}/.well-known/agent-card.json)
- [Agent skills](${SITE_URL}/.well-known/agent-skills/index.json)
- [Plugin](${SITE_URL}/plugin.json)
`;
}

function authMarkdown(): string {
  return `# Auth for agents — ${SITE_NAME}

You are an agent. This portfolio API is **public and read-only**. No API key. Anonymous is enough.

Canonical skill: ${SITE_URL}/auth.md

The \`agent_auth\` block is on \`/.well-known/oauth-authorization-server\`: \`skill\`, \`identity_endpoint\`, \`claim_endpoint\`, \`events_endpoint\`, \`identity_types_supported\` (\`anonymous\`, \`identity_assertion\`, \`service_auth\`). The ID-JAG URN belongs in \`identity_assertion.assertion_types_supported\`, not at the top level.

## Step 1 — Discover

A 401 on \`GET /api\` is a discovery hint, not a lock. It carries \`WWW-Authenticate\`:

\`\`\`http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="${SITE_URL}/.well-known/oauth-protected-resource"
\`\`\`

### 1a. Protected Resource Metadata

GET ${SITE_URL}/.well-known/oauth-protected-resource

### 1b. Authorization Server metadata

GET ${SITE_URL}/.well-known/oauth-authorization-server

Read \`issuer\`, \`token_endpoint\`, \`revocation_endpoint\`, \`grant_types_supported\`, and \`agent_auth\` (\`skill\` points at this file).

## Step 2 — Pick a method

Use \`anonymous\`. \`identity_assertion\` + id-jag and \`service_auth\` are accepted but map to the same read-only grant.

## Step 3 — Register

POST ${SITE_URL}/agent/identity \`{"type":"anonymous"}\`

## Step 4 — Claim

Optional. POST ${SITE_URL}/agent/identity/claim. Reads are not gated on a claim.

## Step 5 — Exchange

POST ${SITE_URL}/oauth2/token with \`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=anonymous\`

## Step 6 — Use the access_token

\`Authorization: Bearer anonymous\` is optional. GET ${SITE_URL}/api/v1/about works without it.

JSON errors: \`{ "error": { "code", "message", "hint" } }\`.

## Errors

401 on GET /api — discovery hint with resource_metadata. 404/405 JSON on /api/v1.

## Revocation

POST ${SITE_URL}/oauth2/revoke — anonymous tokens are stateless. Events: ${SITE_URL}/agent/event/notify.
`;
}

export function crawlerHtml(): string {
  const c = contactPayload();
  return `<h1>${SITE_NAME} — full-stack engineer (${SITE_BRAND})</h1>
<p>${ABOUT.bio} ${ABOUT.tagline} ${ABOUT.noteShort} Education and facts: ${ABOUT.facts.map((f) => `${f.label} ${f.value}`).join("; ")}.</p>
<h2>About</h2>
<p>${aboutText().replace(/\n/g, " ")}</p>
<h2>Contact</h2>
<p>${PROSE.contact.paragraphs.join(" ")}</p>
<p>Email <a href="mailto:${c.email}">${c.email}</a>. GitHub <a href="${c.github}">${c.github}</a>. LinkedIn <a href="${c.linkedin}">${c.linkedin}</a>.</p>
<h2>Privacy</h2>
<p>${PROSE.privacy.paragraphs.join(" ")}</p>
<h2>Developers</h2>
<p>${PROSE.developers.paragraphs.join(" ")}</p>
<p><a href="/developers">developers</a> · <a href="/docs">docs</a> · <a href="/about">about</a> · <a href="/contact">contact</a> · <a href="/privacy">privacy</a> · <a href="/llms.txt">llms.txt</a></p>`;
}

export function markdownForPath(pathname: string): string | null {
  const files = agentFiles();
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return files["/index.md"] ?? null;
  if (path.endsWith(".md") || path.endsWith(".txt")) return files[path] ?? null;
  const md = `${path}.md`;
  return files[md] ?? files[path] ?? null;
}

/** Static agent files written into the Vite build output. */
export function agentFiles(): Record<string, string> {
  const d = PROSE.developers;
  const docs = PROSE.docs;
  const index = mdPage(`${SITE_NAME} — ${SITE_BRAND}`, [
    `${SITE_NAME} (brand **${SITE_BRAND}**) is a full-stack software engineer in Los Angeles. Day job: production infrastructure at Lightfeather. Weekends: sites for independent musicians.`,
    ABOUT.bio,
    ABOUT.tagline,
    ABOUT.noteShort,
    `When to use this: facts about ${SITE_NAME}. Prefer MCP ${MCP_URL} or REST ${SITE_URL}/api/v1 over scraping the terminal. No API key.`,
    `Contact: ${contactText().replace(/\n/g, " · ")}`,
  ]);
  const agents = mdPage(`Agent view — ${SITE_NAME}`, [
    `Machine-readable homepage (?mode=agent).`,
    PROSE.developers.paragraphs[0],
    `MCP: ${MCP_URL}. Docs MCP: ${MCP_DOCS_URL}. REST: ${SITE_URL}/api/v1. OpenAPI: ${OPENAPI_URL}. Auth: ${SITE_URL}/auth.md.`,
  ]);
  const api = mdPage(`API — ${SITE_NAME} public REST`, [
    `Thin HTTP adapter over the same functions as MCP. Base: ${SITE_URL}/api/v1`,
    `Auth: none required. GET /api is a 401 discovery hint (WWW-Authenticate / resource_metadata).`,
    `GET /api/v1, /about, /projects?q=, /skills?q=, /contact, /resume, /sandbox, /health.`,
    `Errors: JSON { "error": { "code", "message", "hint" } }. OpenAPI: ${OPENAPI_URL}.`,
  ]);
  const sandbox = mdPage(`Sandbox — ${SITE_BRAND} API`, [
    `Every REST and MCP method is read-only. GET ${SITE_URL}/api/v1/sandbox for the catalog with environment=sandbox. See /developers.`,
  ]);

  return {
    "/llms.txt": llmsTxt(),
    "/llms.md": llmsTxt(),
    "/llms-full.txt": `${llmsTxt()}\n## Full bio\n\n${aboutText()}\n`,
    "/index.md": index,
    "/agents.md": agents,
    "/auth.md": authMarkdown(),
    "/about.md": aboutMarkdown(),
    "/contact.md": mdPage(`Contact ${SITE_NAME}`, PROSE.contact.paragraphs),
    "/privacy.md": mdPage(`Privacy — ${SITE_NAME}`, PROSE.privacy.paragraphs),
    "/developers.md": mdPage(`${SITE_BRAND} developer portal`, d.paragraphs),
    "/docs.md": mdPage(`Docs — ${SITE_BRAND}`, docs.paragraphs),
    "/api.md": api,
    "/sandbox.md": sandbox,
    "/docs/llms.txt": `# Docs llms.txt — ${SITE_NAME}\n\n- [Docs](${SITE_URL}/docs.md)\n- [Developers](${SITE_URL}/developers.md)\n- [Auth](${SITE_URL}/auth.md)\n- [OpenAPI](${OPENAPI_URL})\n`,
    "/developers/llms.txt": `# Developers llms.txt — ${SITE_BRAND}\n\n- [Portal](${SITE_URL}/developers.md)\n- [OpenAPI](${OPENAPI_URL})\n- [MCP](${MCP_URL})\n- [Docs MCP](${MCP_DOCS_URL})\n- [Auth](${SITE_URL}/auth.md)\n`,
    "/docs/api-llms.txt": `# API llms.txt — ${SITE_NAME} REST\n\n- [API notes](${SITE_URL}/api.md)\n- [OpenAPI](${OPENAPI_URL})\n- [Catalog](${SITE_URL}/api/v1)\n- [Auth](${SITE_URL}/auth.md)\n`,
    "/api/llms.txt": `# API llms.txt — ${SITE_NAME} REST\n\n- [API notes](${SITE_URL}/api.md)\n- [OpenAPI](${OPENAPI_URL})\n- [Catalog](${SITE_URL}/api/v1)\n- [Auth](${SITE_URL}/auth.md)\n`,
    "/work.md": mdPage(`Work — ${SITE_NAME}`, [
      `Project history for ${SITE_NAME}. Same entries as MCP search_projects and GET ${SITE_URL}/api/v1/projects.`,
      projectsText(),
    ]),
    "/toolbelt.md": mdPage(`Toolbelt — ${SITE_NAME}`, [
      `Tools ${SITE_NAME} uses. Same list as MCP get_toolbelt and GET ${SITE_URL}/api/v1/skills.`,
      skillsText(),
    ]),
    "/infra.md": mdPage(`Infra — ${SITE_NAME}`, [
      `Operational notes from the terminal at ${SITE_URL}/infra — performance/SEO work, audience tooling, media pipeline, open-source substitutions. Project detail lives in /work.md.`,
    ]),
    "/repos.md": mdPage(`Repos — ${SITE_NAME}`, [
      `Public GitHub: https://github.com/actuallyitsnathaniel. Heatmap data: GET ${SITE_URL}/api/contributions. MCP: get_github_activity.`,
    ]),
    "/misc.md": mdPage(`Misc — ${SITE_NAME}`, [
      `Personal extras from the terminal at ${SITE_URL}/misc. Currently listening: Kora — Skrillex, Varg², Eurohead, SIIICKBRAIN, swedm.`,
    ]),
  };
}
