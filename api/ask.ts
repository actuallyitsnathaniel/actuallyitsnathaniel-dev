import { searchHits } from "../src/lib/portfolio.js";
import { json, jsonError, optionsOk, readJsonBody } from "../src/lib/agent-http.js";

export const config = { runtime: "edge" };

const VERSION = "0.55";

function parseQuery(body: Record<string, unknown>, url: URL): string {
  const fromBody =
    (typeof body.query === "string" && body.query) ||
    (body.query && typeof body.query === "object" && typeof (body.query as { text?: unknown }).text === "string"
      ? (body.query as { text: string }).text
      : "");
  return (fromBody || url.searchParams.get("query") || url.searchParams.get("q") || "").trim();
}

function wantsStream(req: Request, body: Record<string, unknown>, url: URL): boolean {
  const accept = req.headers.get("accept") || "";
  if (/\btext\/event-stream\b/i.test(accept)) return true;
  const prefer = body.prefer;
  if (prefer && typeof prefer === "object" && (prefer as { streaming?: unknown }).streaming === true) {
    return true;
  }
  const streaming = body.streaming ?? url.searchParams.get("streaming");
  return streaming === true || streaming === "true" || streaming === "1";
}

function answerPayload(query: string, results: ReturnType<typeof searchHits>) {
  const top = results[0];
  return {
    query_id: `ask_${crypto.randomUUID()}`,
    query,
    results,
    answer: top
      ? `${top.name}: ${top.description}`
      : "No matching content. Try questions about Nathaniel Bowman, his projects, stack, resume, or how to contact him.",
    _meta: {
      response_type: results.length ? "answer" : "failure",
      response_format: "conversational_search",
      version: VERSION,
      mode: "list",
      site: "dev.actuallyitsnathaniel.com",
    },
  };
}

function sse(query: string, results: ReturnType<typeof searchHits>): Response {
  const payload = answerPayload(query, results);
  const chunks = [
    `event: start\ndata: ${JSON.stringify({ _meta: { ...payload._meta, streaming: true } })}\n\n`,
    ...results.map((item) => `event: result\ndata: ${JSON.stringify({ ...item, schema_object: item })}\n\n`),
    `event: complete\ndata: ${JSON.stringify({ _meta: { version: VERSION } })}\n\n`,
  ];
  return new Response(chunks.join(""), {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return optionsOk();
  if (req.method !== "GET" && req.method !== "POST") {
    return jsonError(405, "method_not_allowed", "Use GET or POST.", "POST JSON { query: { text } } or GET ?query=");
  }

  const url = new URL(req.url);
  const body = req.method === "POST" ? await readJsonBody(req) : {};
  const query = parseQuery(body, url);
  if (!query) {
    return jsonError(
      400,
      "missing_query",
      "Provide a natural-language query.",
      'POST {"query":{"text":"Who is Nathaniel Bowman?"}} or GET /ask?query=...',
    );
  }

  const results = searchHits(query);
  if (wantsStream(req, body, url)) return sse(query, results);
  return json(answerPayload(query, results));
}
