import { json, jsonError, optionsOk } from "../../src/lib/agent-http.js";

export const config = { runtime: "edge" };

const YEAR = new Date().getFullYear() + 1;

function tokenResponse(scope = "api.read") {
  return {
    access_token: "anonymous",
    token_type: "Bearer",
    expires_in: 31536000,
    scope,
    identity_assertion: "anonymous",
    assertion_expires: `${YEAR}-01-01T00:00:00.000Z`,
  };
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return optionsOk();

  const url = new URL(req.url);
  const action = url.pathname.split("/").filter(Boolean).pop();

  if (action === "revoke") {
    if (req.method !== "POST" && req.method !== "GET") {
      return jsonError(405, "method_not_allowed", "Use POST or OPTIONS.", "RFC 7009 token revocation.");
    }
    return json({ revoked: true, note: "Anonymous tokens are stateless; revocation is a no-op." });
  }

  if (action !== "token") {
    return jsonError(404, "not_found", "Unknown OAuth endpoint.", "Valid paths: /oauth2/token, /oauth2/revoke.");
  }

  if (req.method === "GET") {
    return json({
      token_endpoint: url.href.replace(/\/$/, ""),
      grant_types_supported: [
        "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "urn:workos:agent-auth:grant-type:claim",
      ],
      hint: "POST grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=anonymous",
    });
  }

  if (req.method !== "POST") {
    return jsonError(405, "method_not_allowed", "Use POST.", "See /auth.md Step 5.");
  }

  const ct = req.headers.get("content-type") || "";
  let grant = "";
  if (ct.includes("application/json")) {
    try {
      const body = (await req.json()) as { grant_type?: string };
      grant = body.grant_type ?? "";
    } catch {
      grant = "";
    }
  } else {
    const form = await req.formData().catch(() => null);
    grant = String(form?.get("grant_type") ?? "");
  }

  if (grant === "urn:workos:agent-auth:grant-type:claim") {
    return json(tokenResponse("api.read"));
  }

  return json(tokenResponse());
}
