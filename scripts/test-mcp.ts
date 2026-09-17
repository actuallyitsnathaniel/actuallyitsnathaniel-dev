import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";
import handler from "../api/mcp.ts";

// handler is a Node (req, res) Vercel Function — exercise it over a real
// HTTP server rather than mocking IncomingMessage/ServerResponse by hand.
const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    (req as unknown as { body: unknown }).body = body ? JSON.parse(body) : undefined;
    handler(req as never, res as never).catch((e) => {
      console.error(e);
      res.statusCode = 500;
      res.end();
    });
  });
});
await new Promise<void>((resolve) => server.listen(0, resolve));
const base = `http://localhost:${(server.address() as AddressInfo).port}/api/mcp`;

let nextId = 1;

async function rpc(method: string, params?: unknown) {
  const res = await fetch(base, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: nextId++, method, params }),
  });
  const raw = await res.text();
  const line = raw.split("\n").find((l) => l.startsWith("data: "));
  assert.ok(line, `expected an SSE data line in response, got: ${raw}`);
  return JSON.parse(line.slice("data: ".length));
}

async function callTool(name: string, args: Record<string, unknown> = {}) {
  const { result } = await rpc("tools/call", { name, arguments: args });
  return result as { content: { type: string; text: string }[]; isError?: boolean };
}

async function main() {
  await rpc("initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "test-client", version: "1.0.0" },
  });

  const { result: list } = await rpc("tools/list");
  const names = list.tools.map((t: { name: string }) => t.name).sort();
  assert.deepEqual(
    names,
    ["get_about", "get_contact", "get_github_activity", "get_resume", "get_toolbelt", "search_projects"].sort(),
  );

  const projects = await callTool("search_projects", { query: "shopify" });
  assert.ok(projects.content[0].text.includes("dave wilbert music"));

  const toolbelt = await callTool("get_toolbelt", { query: "react" });
  assert.ok(toolbelt.content[0].text.toLowerCase().includes("react"));

  const about = await callTool("get_about");
  assert.ok(about.content[0].text.includes("lightfeather"));
  assert.ok(about.content[0].text.includes("generating code is cheap"));
  assert.ok(
    !about.content[0].text.includes("leftover-human"),
    "get_about must not include the long human-only note",
  );

  const resume = await callTool("get_resume");
  assert.ok(resume.content[0].text.startsWith("https://"));

  const contact = await callTool("get_contact");
  assert.ok(contact.content[0].text.includes("nathanielrbowman@gmail.com"));

  const activity = await callTool("get_github_activity");
  assert.ok(activity.content[0].text.length > 0);

  const unknown = await callTool("not_a_real_tool");
  assert.ok(unknown.isError, "calling an unknown tool should come back as a tool error, not throw");

  const { agentFiles } = await import("../src/lib/pages.ts");
  const aboutMd = agentFiles()["/about.md"] ?? "";
  assert.ok(aboutMd.includes("generating code is cheap"));
  assert.ok(
    !aboutMd.includes("leftover-human"),
    "/about.md must not include the long human-only note",
  );

  console.log("mcp: all checks passed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => server.close());
