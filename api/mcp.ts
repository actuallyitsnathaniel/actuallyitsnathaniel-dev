import type { VercelRequest, VercelResponse } from "@vercel/node";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { PROJECTS } from "../src/lib/projects.js";
import { ABOUT } from "../src/lib/about.js";
import { SKILLS } from "../src/lib/skills.js";

const GH_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

type ToolResult = { content: { type: "text"; text: string }[]; isError?: boolean };

// ponytail: wraps every tool handler in one try/catch so a thrown error becomes
// a clean MCP tool error instead of a 500 — no per-tool boilerplate needed.
function safe<Args extends unknown[]>(
  fn: (...args: Args) => Promise<ToolResult>,
): (...args: Args) => Promise<ToolResult> {
  return async (...args: Args) => {
    try {
      return await fn(...args);
    } catch (e) {
      return {
        isError: true,
        content: [{ type: "text", text: `error: ${e instanceof Error ? e.message : String(e)}` }],
      };
    }
  };
}

const READ_ONLY = { readOnlyHint: true, openWorldHint: false, idempotentHint: true };

// ponytail: per-isolate cache only — resets on cold start, not shared across
// edge regions. Upgrade to Vercel KV/Upstash if that ever actually matters.
let ghCache: { total: number; expires: number } | null = null;
const GH_CACHE_TTL_MS = 10 * 60 * 1000;

function buildServer() {
  const server = new McpServer(
    { name: "nathaniel-bowman-portfolio", version: "1.0.0" },
    {
      instructions:
        "Use these tools to answer questions about Nathaniel Bowman, a full-stack engineer: " +
        "search_projects for his work history, get_toolbelt for technologies he uses, get_about " +
        "for a short bio, get_resume for his resume, get_contact for how to reach him, and " +
        "get_github_activity for his recent GitHub contribution count.",
    },
  );

  server.registerTool(
    "search_projects",
    {
      title: "Search projects",
      description:
        "Search Nathaniel Bowman's project history (client sites, tools, mobile apps) by name, tech stack, or keyword.",
      inputSchema: {
        query: z
          .string()
          .optional()
          .describe(
            "Keyword to match against project name, tag, or stack. Omit to list everything.",
          ),
      },
      annotations: READ_ONLY,
    },
    safe(async ({ query }: { query?: string }) => {
      const q = query?.toLowerCase().trim() ?? "";
      const matches = PROJECTS.filter(
        (p) =>
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q) ||
          p.stack.toLowerCase().includes(q) ||
          p.aliases.some((a) => a.includes(q)),
      );
      const text = matches
        .map(
          (p) =>
            `${p.name} (${p.date})\nrole: ${p.role}\nstack: ${p.stack}` +
            (p.liveUrl ? `\nlive: ${p.liveUrl}` : "") +
            `\n${p.bullets.map((b) => `- ${b.text}`).join("\n")}`,
        )
        .join("\n\n");
      return { content: [{ type: "text", text: text || "no matching projects" }] };
    }),
  );

  server.registerTool(
    "get_toolbelt",
    {
      title: "Get toolbelt",
      description:
        "Search the technologies Nathaniel Bowman works with (languages, frontend, backend, database, devops, cloud, tools) by name, category, or keyword.",
      inputSchema: {
        query: z
          .string()
          .optional()
          .describe("Keyword to match against name, category, or keywords. Omit to list everything."),
      },
      annotations: READ_ONLY,
    },
    safe(async ({ query }: { query?: string }) => {
      const q = query?.toLowerCase().trim() ?? "";
      const matches = SKILLS.filter(
        (s) =>
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.keywords.some((k) => k.toLowerCase().includes(q)),
      );
      const text = matches.map((s) => `${s.name} — ${s.category}`).join("\n");
      return { content: [{ type: "text", text: text || "no matching tools" }] };
    }),
  );

  server.registerTool(
    "get_about",
    {
      title: "Get about",
      description: "Returns a short bio for Nathaniel Bowman plus key facts (education, experience, location, stack).",
      inputSchema: {},
      annotations: READ_ONLY,
    },
    safe(async () => ({
      content: [
        {
          type: "text",
          text: [
            `${ABOUT.bio} ${ABOUT.tagline}`,
            ...ABOUT.facts.map((f) => `${f.label}: ${f.value}`),
          ].join("\n\n"),
        },
      ],
    })),
  );

  server.registerTool(
    "get_resume",
    {
      title: "Get resume",
      description: "Returns the URL to Nathaniel Bowman's current resume PDF.",
      inputSchema: {},
      annotations: READ_ONLY,
    },
    safe(async () => ({
      content: [{ type: "text", text: "https://actuallyitsnathaniel.dev/api/resume" }],
    })),
  );

  server.registerTool(
    "get_contact",
    {
      title: "Get contact info",
      description: "Returns Nathaniel Bowman's email, GitHub, and LinkedIn.",
      inputSchema: {},
      annotations: READ_ONLY,
    },
    safe(async () => ({
      content: [
        {
          type: "text",
          text: [
            "email: nathanielrbowman@gmail.com",
            "github: https://github.com/actuallyitsnathaniel",
            "linkedin: https://linkedin.com/in/nathaniel-bowman",
          ].join("\n"),
        },
      ],
    })),
  );

  server.registerTool(
    "get_github_activity",
    {
      title: "Get GitHub activity",
      description: "Returns Nathaniel Bowman's total GitHub contributions over the past year.",
      inputSchema: {},
      annotations: READ_ONLY,
    },
    safe(async () => {
      if (ghCache && ghCache.expires > Date.now()) {
        return { content: [{ type: "text", text: `${ghCache.total} contributions in the last year` }] };
      }

      const token = process.env.GH_TOKEN;
      if (!token) return { content: [{ type: "text", text: "not configured" }] };

      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "actuallyitsnathaniel-dev",
        },
        body: JSON.stringify({
          query: GH_QUERY,
          variables: { login: "actuallyitsnathaniel" },
        }),
      });
      if (!res.ok) {
        return { content: [{ type: "text", text: `GitHub error: ${res.status}` }] };
      }
      const json = await res.json();
      const total =
        json?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
      ghCache = { total, expires: Date.now() + GH_CACHE_TTL_MS };
      return { content: [{ type: "text", text: `${total} contributions in the last year` }] };
    }),
  );

  return server;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, mcp-session-id, mcp-protocol-version",
    );
    res.status(204).end();
    return;
  }

  const server = buildServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
}
