import { PRM_URL, SITE_URL } from "./site.js";

export function corsHeaders(extra?: HeadersInit): Headers {
  const h = new Headers(extra);
  h.set("Access-Control-Allow-Origin", "*");
  h.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  h.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, mcp-session-id, mcp-protocol-version",
  );
  h.set("Access-Control-Expose-Headers", "WWW-Authenticate, Link");
  return h;
}

export function json(data: unknown, status = 200, extra?: HeadersInit): Response {
  const headers = corsHeaders(extra);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { status, headers });
}

export function jsonError(
  status: number,
  code: string,
  message: string,
  hint: string,
  extra?: HeadersInit,
): Response {
  return json(
    {
      error: { code, message, hint, docs: `${SITE_URL}/llms.txt`, openapi: `${SITE_URL}/openapi.json` },
    },
    status,
    extra,
  );
}

export function optionsOk(): Response {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export function unauthorizedHint(): Response {
  const headers = corsHeaders();
  headers.set("WWW-Authenticate", `Bearer resource_metadata="${PRM_URL}"`);
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(
    JSON.stringify({
      error: {
        code: "unauthorized",
        message:
          "This resource advertises agent auth metadata. The public API itself does not require a token — use GET /api/v1 or anonymous registration.",
        hint: `Fetch ${PRM_URL} or read ${SITE_URL}/auth.md. Then call GET ${SITE_URL}/api/v1/.`,
      },
    }),
    { status: 401, headers },
  );
}

export async function readJsonBody(req: Request): Promise<Record<string, unknown>> {
  try {
    const text = await req.text();
    if (!text) return {};
    const parsed = JSON.parse(text) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}
