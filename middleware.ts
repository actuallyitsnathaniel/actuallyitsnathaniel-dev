import { markdownForPath, agentFiles } from "./src/lib/pages.js";
import { isSpaPath, WELL_KNOWN_FILES, KNOWN_PREFIXES } from "./src/lib/sections.js";
import { SITE_URL } from "./src/lib/site.js";

const LINK = [
  `</sitemap.xml>; rel="sitemap"`,
  `</index.md>; rel="alternate"; type="text/markdown"`,
  `</openapi.json>; rel="service-desc"; type="application/json"`,
  `</.well-known/api-catalog>; rel="api-catalog"`,
  `</.well-known/ard.json>; rel="ard"`,
].join(", ");

const BOT_UA =
  /GPTBot|ClaudeBot|ChatGPT-User|PerplexityBot|Google-Extended|Applebot-Extended|ora-agent|DeepSeekBot|OAI-SearchBot|anthropic-ai|Claude-Web|CCBot|Bytespider|Amazonbot|Meta-ExternalAgent/i;

function wantsMarkdown(req: Request): boolean {
  const accept = req.headers.get("accept") || "";
  return /\btext\/markdown\b/i.test(accept);
}

function isBot(req: Request): boolean {
  return BOT_UA.test(req.headers.get("user-agent") || "");
}

function hasExt(pathname: string): boolean {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

function isKnown(pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  if (isSpaPath(path) || path === "/ask") return true;
  if (hasExt(path)) return true;
  return KNOWN_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`) || pathname.startsWith(p),
  );
}

function typeFor(path: string): string {
  if (path.endsWith(".md")) return "text/markdown; charset=utf-8";
  if (path.endsWith(".txt")) return "text/plain; charset=utf-8";
  return "text/plain; charset=utf-8";
}

function mdHeaders(contentType = "text/markdown; charset=utf-8"): Headers {
  return new Headers({
    "Content-Type": contentType,
    Vary: "Accept",
    "Access-Control-Allow-Origin": "*",
    Link: LINK,
  });
}

function notFoundBody(pathname: string): string {
  return [
    "# 404 Not Found",
    "",
    `The path \`${pathname}\` does not exist on this site.`,
    "",
    `See [llms.txt](${SITE_URL}/llms.txt), the [sitemap](${SITE_URL}/sitemap.xml), or the [developer portal](${SITE_URL}/developers) for live resources.`,
    "",
  ].join("\n");
}

async function fetchText(origin: string, path: string): Promise<string | null> {
  try {
    const res = await fetch(new URL(path, origin));
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname, searchParams } = url;
  const origin = url.origin;
  const path = pathname.replace(/\/$/, "") || "/";

  const wellKnown = WELL_KNOWN_FILES[pathname] ?? WELL_KNOWN_FILES[path];
  if (wellKnown && request.method !== "OPTIONS") {
    const body = await fetchText(origin, wellKnown.file);
    if (body != null) {
      return new Response(body, {
        headers: {
          "Content-Type": wellKnown.type,
          "Access-Control-Allow-Origin": "*",
          Link: LINK,
        },
      });
    }
  }

  const files = agentFiles();
  const generated = files[pathname] ?? files[path];
  if (generated && request.method !== "OPTIONS") {
    return new Response(generated, { headers: mdHeaders(typeFor(pathname)) });
  }

  if (pathname === "/" && searchParams.get("mode") === "agent") {
    const accept = request.headers.get("accept") || "";
    const markdown = files["/agents.md"] ?? "";
    if (/\bapplication\/json\b/i.test(accept) && !wantsMarkdown(request)) {
      return new Response(
        JSON.stringify({
          mode: "agent",
          name: "Nathaniel Bowman",
          brand: "actuallyitsnathaniel",
          docs: `${SITE_URL}/llms.txt`,
          openapi: `${SITE_URL}/openapi.json`,
          api: `${SITE_URL}/api/v1`,
          mcp: `${SITE_URL}/api/mcp`,
          mcp_docs: `${SITE_URL}/api/mcp-docs`,
          auth: `${SITE_URL}/auth.md`,
          markdown,
        }),
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Vary: "Accept",
            "Access-Control-Allow-Origin": "*",
            Link: LINK,
          },
        },
      );
    }
    return new Response(markdown, { headers: mdHeaders() });
  }

  if (wantsMarkdown(request) || isBot(request)) {
    const body = markdownForPath(pathname);
    if (body) return new Response(body, { headers: mdHeaders() });
  }

  if (!isKnown(pathname)) {
    const body = notFoundBody(pathname);
    if (wantsMarkdown(request) || isBot(request)) {
      return new Response(body, { status: 404, headers: mdHeaders() });
    }
    return new Response(
      `<!doctype html><html lang="en"><head><meta charset="utf-8"/><title>404 — Nathaniel Bowman</title></head><body><h1>404 Not Found</h1><p>The path <code>${pathname}</code> does not exist. See <a href="/llms.txt">llms.txt</a> or <a href="/developers">/developers</a>.</p></body></html>`,
      {
        status: 404,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          Vary: "Accept",
          Link: LINK,
        },
      },
    );
  }
}

export const config = {
  matcher: ["/", "/((?!assets/).*)"],
};
