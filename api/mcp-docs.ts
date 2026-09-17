import type { VercelRequest, VercelResponse } from "@vercel/node";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { agentFiles } from "../src/lib/pages.js";

// Node runtime (default): same transport constraint as api/mcp.ts.
// Doc bodies come from agentFiles() — the same generator Vite writes into the build.

const READ_ONLY = { readOnlyHint: true, openWorldHint: false, idempotentHint: true };

type ToolResult = { content: { type: "text"; text: string }[]; isError?: boolean };

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

function files(): Record<string, string> {
  return agentFiles();
}

function lookup(name: string): { path: string; body: string } | null {
  const all = files();
  const key = name.toLowerCase().trim();
  const candidates = [
    key.startsWith("/") ? key : `/${key}`,
    key.startsWith("/") ? key : `/${key}.md`,
    key.startsWith("/") ? key : `/${key}.txt`,
  ];
  for (const path of candidates) {
    if (all[path]) return { path, body: all[path] };
  }
  const stripped = key.replace(/^\//, "").replace(/\.(txt|md|json)$/, "");
  for (const [path, body] of Object.entries(all)) {
    const base = path.replace(/^\//, "").replace(/\.(txt|md)$/, "");
    if (base === stripped || base.endsWith(`/${stripped}`)) return { path, body };
  }
  return null;
}

function buildServer() {
  const server = new McpServer(
    { name: "nathaniel-bowman-docs", version: "1.0.0" },
    {
      instructions:
        "Documentation MCP for Nathaniel Bowman's developer site. Use list_docs to see pages, " +
        "search_docs to find a passage, and get_doc to fetch the full markdown or OpenAPI document.",
    },
  );

  server.registerTool(
    "list_docs",
    {
      title: "List docs",
      description: "List documentation pages agents can fetch (llms.txt, auth.md, OpenAPI, developer portal, etc.).",
      inputSchema: {},
      annotations: READ_ONLY,
    },
    safe(async () => ({
      content: [
        {
          type: "text",
          text: Object.keys(files())
            .map((path) => path.replace(/^\//, "").replace(/\.(txt|md)$/, "") + `: ${path}`)
            .join("\n"),
        },
      ],
    })),
  );

  server.registerTool(
    "get_doc",
    {
      title: "Get doc",
      description:
        "Fetch a documentation page by name (llms, auth, developers, docs, api, about, contact, privacy, llms-full).",
      inputSchema: {
        name: z.string().describe("Document name from list_docs."),
      },
      annotations: READ_ONLY,
    },
    safe(async ({ name }: { name: string }) => {
      const hit = lookup(name);
      if (!hit) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `unknown doc "${name}". valid: ${Object.keys(files()).join(", ")}`,
            },
          ],
        };
      }
      return { content: [{ type: "text", text: hit.body }] };
    }),
  );

  server.registerTool(
    "search_docs",
    {
      title: "Search docs",
      description: "Keyword-search generated llms.txt, auth.md, developers.md, and docs.md.",
      inputSchema: {
        query: z.string().describe("Keyword or phrase to find in the developer docs."),
      },
      annotations: READ_ONLY,
    },
    safe(async ({ query }: { query: string }) => {
      const q = query.toLowerCase();
      const all = files();
      const targets = ["/llms.txt", "/auth.md", "/developers.md", "/docs.md"];
      const chunks: string[] = [];
      for (const path of targets) {
        const text = all[path];
        if (!text) continue;
        const hits = text
          .split("\n")
          .map((line, i) => ({ line, i }))
          .filter(({ line }) => line.toLowerCase().includes(q))
          .slice(0, 8)
          .map(({ line, i }) => `${path}:${i + 1}: ${line.trim()}`);
        if (hits.length) chunks.push(hits.join("\n"));
      }
      return { content: [{ type: "text", text: chunks.join("\n\n") || "no matches" }] };
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
