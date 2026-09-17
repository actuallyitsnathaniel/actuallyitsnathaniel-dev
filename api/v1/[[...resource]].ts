import {
  aboutPayload,
  apiCatalog,
  contactPayload,
  searchProjects,
  searchSkills,
} from "../../src/lib/portfolio.js";
import { SITE_URL } from "../../src/lib/site.js";
import { json, jsonError, optionsOk } from "../../src/lib/agent-http.js";

// Edge: JSON adapter over src/lib/portfolio — no Node APIs. MCP stays on Node
// because StreamableHTTPServerTransport needs IncomingMessage/ServerResponse.

export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return optionsOk();
  if (req.method !== "GET") {
    return jsonError(
      405,
      "method_not_allowed",
      "This API is read-only.",
      "Use GET. See /openapi.json for operations.",
    );
  }

  const url = new URL(req.url);
  const parts = url.pathname.replace(/^\/api\/v1\/?/, "").split("/").filter(Boolean);
  const resource = parts[0] ?? "";
  const q = url.searchParams.get("q") ?? "";

  switch (resource) {
    case "":
      return json(apiCatalog("live"));
    case "sandbox":
      return json(apiCatalog("sandbox"), 200, { "X-Environment": "sandbox" });
    case "health":
      return json({ ok: true, service: "actuallyitsnathaniel-dev", sandbox: true });
    case "about":
      return json(aboutPayload());
    case "projects":
      return json({
        query: q || null,
        results: searchProjects(q).map((p) => ({
          name: p.name,
          date: p.date,
          tag: p.tag,
          role: p.role,
          stack: p.stack,
          liveUrl: p.liveUrl ?? null,
          bullets: p.bullets.map((b) => b.text),
        })),
      });
    case "skills":
      return json({
        query: q || null,
        results: searchSkills(q).map((s) => ({
          name: s.name,
          category: s.category,
          href: s.href,
        })),
      });
    case "contact":
      return json(contactPayload());
    case "resume":
      return json({ url: `${SITE_URL}/api/resume`, format: "application/pdf" });
    default:
      return jsonError(
        404,
        "not_found",
        `Unknown resource "${resource}".`,
        "Valid resources: about, projects, skills, contact, resume, sandbox, health. See /openapi.json.",
      );
  }
}
