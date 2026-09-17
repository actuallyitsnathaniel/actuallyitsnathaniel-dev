import { json, jsonError, optionsOk, readJsonBody } from "../../src/lib/agent-http.js";
import { SITE_EMAIL, SITE_URL } from "../../src/lib/site.js";

export const config = { runtime: "edge" };

const YEAR = new Date().getFullYear() + 1;
const ASSERTION_EXPIRES = `${YEAR}-01-01T00:00:00.000Z`;

function claimBlock(claimToken: string) {
  return {
    user_code: String(Date.now()).slice(-6),
    expires_in: 600,
    verification_uri: `${SITE_URL}/contact?claim=${encodeURIComponent(claimToken)}`,
    interval: 5,
  };
}

function anonymousRegistration() {
  const claimToken = `clm_${crypto.randomUUID()}`;
  return {
    registration_id: `reg_${crypto.randomUUID()}`,
    registration_type: "anonymous",
    identity_assertion: "anonymous",
    assertion_expires: ASSERTION_EXPIRES,
    pre_claim_scopes: ["api.read"],
    claim_url: `${SITE_URL}/agent/identity/claim`,
    claim_token: claimToken,
    claim_token_expires: ASSERTION_EXPIRES,
    post_claim_scopes: ["api.read"],
    note: "This portfolio API is public and read-only. Anonymous registration is enough; no secret is required to call GET /api/v1.",
  };
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return optionsOk();

  const url = new URL(req.url);
  const path = url.pathname
    .replace(/^\/api\/agent\/?/, "")
    .replace(/^\/agent\/?/, "");
  const parts = path.split("/").filter(Boolean);
  const head = parts[0] ?? "";

  if (head === "event" && (parts[1] === "notify" || parts[1] === undefined)) {
    if (req.method === "GET") {
      return json({
        ok: true,
        events_endpoint: `${SITE_URL}/agent/event/notify`,
        hint: "Providers POST Security Event Tokens here. This public API acknowledges events and does not revoke anonymous read access.",
      });
    }
    if (req.method === "POST") {
      return json({ accepted: true }, 202);
    }
    return jsonError(405, "method_not_allowed", "Use GET, POST, or OPTIONS.", "See /auth.md");
  }

  if (head === "identity" && parts[1] === "claim") {
    if (req.method === "GET") {
      return json({
        claim_endpoint: `${SITE_URL}/agent/identity/claim`,
        hint: "POST { claim_token, email } to start an optional claim ceremony. The public API does not gate reads on a claim.",
      });
    }
    if (req.method === "POST") {
      const body = await readJsonBody(req);
      const claimToken = typeof body.claim_token === "string" ? body.claim_token : `clm_${crypto.randomUUID()}`;
      const email = typeof body.email === "string" ? body.email : SITE_EMAIL;
      return json({
        registration_id: `reg_${crypto.randomUUID()}`,
        claim_attempt_id: `cla_${crypto.randomUUID()}`,
        status: "initiated",
        expires_at: ASSERTION_EXPIRES,
        email,
        claim_attempt: claimBlock(claimToken),
        note: "Claim is optional. Continue using anonymous access_token against GET /api/v1.",
      });
    }
    return jsonError(405, "method_not_allowed", "Use GET, POST, or OPTIONS.", "See /auth.md");
  }

  if (head === "identity" || head === "auth" || head === "") {
    if (req.method === "GET") {
      return json({
        identity_endpoint: `${SITE_URL}/agent/identity`,
        identity_types_supported: ["anonymous", "identity_assertion", "service_auth"],
        hint: 'POST {"type":"anonymous"} — this API is public and read-only.',
        skill: `${SITE_URL}/auth.md`,
      });
    }
    if (req.method === "POST") {
      const body = await readJsonBody(req);
      const type = typeof body.type === "string" ? body.type : "anonymous";

      if (type === "service_auth") {
        const claimToken = `clm_${crypto.randomUUID()}`;
        return json({
          registration_id: `reg_${crypto.randomUUID()}`,
          registration_type: "service_auth",
          claim_url: `${SITE_URL}/agent/identity/claim`,
          claim_token: claimToken,
          claim_token_expires: ASSERTION_EXPIRES,
          post_claim_scopes: ["api.read"],
          claim: claimBlock(claimToken),
          note: "Human claim is optional. The read-only API accepts anonymous access without completing this ceremony.",
        });
      }

      if (type === "identity_assertion") {
        return json({
          registration_id: `reg_${crypto.randomUUID()}`,
          registration_type: "identity_assertion",
          identity_assertion: "anonymous",
          assertion_expires: ASSERTION_EXPIRES,
          scopes: ["api.read"],
          note: "ID-JAG is accepted but not required. This API issues the same read-only grant as anonymous.",
        });
      }

      return json(anonymousRegistration());
    }
    return jsonError(405, "method_not_allowed", "Use GET, POST, or OPTIONS.", "See /auth.md");
  }

  return jsonError(404, "not_found", "Unknown agent endpoint.", "Valid paths: /agent/identity, /agent/identity/claim, /agent/event/notify. See /auth.md.");
}
