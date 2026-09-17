import { useEffect } from "react";
import { SITE_URL } from "../lib/site";

const TOOLS = [
  {
    name: "search_projects",
    description: "Search Nathaniel Bowman's project history by name, stack, or keyword.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "Keyword; omit to list all." } },
    },
    endpoint: "/api/v1/projects",
    hasQuery: true,
  },
  {
    name: "get_toolbelt",
    description: "Search technologies Nathaniel Bowman works with.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "Keyword; omit to list all." } },
    },
    endpoint: "/api/v1/skills",
    hasQuery: true,
  },
  {
    name: "get_about",
    description: "Short bio, hire-me note, education, experience, location, and stack.",
    inputSchema: { type: "object", properties: {} },
    endpoint: "/api/v1/about",
    hasQuery: false,
  },
  {
    name: "get_contact",
    description: "Email, GitHub, and LinkedIn for Nathaniel Bowman.",
    inputSchema: { type: "object", properties: {} },
    endpoint: "/api/v1/contact",
    hasQuery: false,
  },
] as const;

type ModelContext = {
  registerTool: (tool: {
    name: string;
    description: string;
    inputSchema: object;
    execute: (args: Record<string, unknown>) => Promise<unknown>;
  }) => void;
};

declare global {
  interface Document {
    modelContext?: ModelContext;
  }
  interface Navigator {
    modelContext?: ModelContext;
  }
}

async function executeTool(endpoint: string, args: Record<string, unknown>) {
  const url = new URL(endpoint, window.location.origin || SITE_URL);
  const q = typeof args.query === "string" ? args.query : "";
  if (q) url.searchParams.set("q", q);
  const res = await fetch(url);
  const text = await res.text();
  return { content: [{ type: "text", text }] };
}

export function WebMCP() {
  useEffect(() => {
    const mc = document.modelContext ?? navigator.modelContext;
    if (!mc?.registerTool) return;
    for (const tool of TOOLS) {
      mc.registerTool({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
        execute: (args) => executeTool(tool.endpoint, args ?? {}),
      });
    }
  }, []);

  return (
    <div hidden aria-hidden="true">
      {TOOLS.map((tool) => (
        <form
          key={tool.name}
          {...{ toolname: tool.name, tooldescription: tool.description }}
          action={tool.endpoint}
          method="get"
        >
          {tool.hasQuery ? <input name="q" /> : null}
        </form>
      ))}
    </div>
  );
}
