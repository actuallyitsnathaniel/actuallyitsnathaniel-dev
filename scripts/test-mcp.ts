import assert from "node:assert/strict";
import handler from "../api/mcp.ts";

let nextId = 1;

async function rpc(method: string, params?: unknown) {
  const res = await handler(
    new Request("http://localhost/api/mcp", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
      body: JSON.stringify({ jsonrpc: "2.0", id: nextId++, method, params }),
    }),
  );
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

  const resume = await callTool("get_resume");
  assert.ok(resume.content[0].text.startsWith("https://"));

  const contact = await callTool("get_contact");
  assert.ok(contact.content[0].text.includes("nathanielrbowman@gmail.com"));

  const activity = await callTool("get_github_activity");
  assert.ok(activity.content[0].text.length > 0);

  const unknown = await callTool("not_a_real_tool");
  assert.ok(unknown.isError, "calling an unknown tool should come back as a tool error, not throw");

  console.log("mcp: all checks passed");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
