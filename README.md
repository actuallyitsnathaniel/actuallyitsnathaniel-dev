# My First Site Using Vite + React, HTML, and CSS.

<p align="center">
  <img width="auto" height="450" src="https://github.com/user-attachments/assets/2f075a61-7044-41a4-b37f-6f6646d43737">
</p>


## Installation

```bash
npm i
```

## Development

`npm run dev`

## MCP Server

`api/mcp.ts` exposes a Model Context Protocol server at **`https://dev.actuallyitsnathaniel.com/api/mcp`** (Node runtime, Streamable HTTP transport) with 6 tools: `search_projects`, `get_toolbelt`, `get_about`, `get_resume`, `get_contact`, `get_github_activity`. No auth — every tool reads data that's already public on the site.

To test it:

- `npm run test:mcp` — automated check: spins up a real Node HTTP server wrapping the handler and exercises every tool (init → list → call each tool → unknown-tool error path)
- `npx vercel dev`, then point [MCP Inspector](https://github.com/modelcontextprotocol/inspector) (`npx @modelcontextprotocol/inspector`) at `http://localhost:3000/api/mcp` for an interactive UI
- `npx vercel build` — reproduces Vercel's real bundler/runtime locally; catches deploy-only failures (e.g. edge vs. node runtime bundling issues) before pushing

**Gotcha:** `package.json` has `"type": "module"`, so Node's real ESM loader requires explicit `.js` extensions on every relative import reachable from `api/mcp.ts` (e.g. `../src/lib/projects.js`, not `../src/lib/projects`) — TypeScript's `bundler` resolution accepts either, and `tsx`/`vercel dev` silently tolerate a missing extension, so this only breaks in the actual deployed function (`ERR_MODULE_NOT_FOUND`, ready but 500ing on every request). `npm run test:mcp` and `vercel dev` **cannot** catch this class of bug. To verify for real: `npx vercel build`, then load the compiled output directly under plain Node —
```bash
cd .vercel/output/functions/api/mcp.func && node --input-type=module -e "await import('./api/mcp.js')"
```
If that throws `ERR_MODULE_NOT_FOUND`, an extension is missing somewhere in the import chain. This is also why `api/mcp.ts` reads from `src/lib/skills.ts` (plain data) instead of `src/Components/skills/skills-data.ts` — the latter pulls in JSX icon components with their own relative imports, widening the surface area for this exact bug.

### Connecting from Claude

Claude's custom-connector UI (claude.ai and Claude Desktop) currently forces an OAuth Dynamic Client Registration attempt on *any* custom remote MCP connector, even ones — like this one — that advertise no auth at all. That produces a **"Couldn't register with … sign-in service"** error and is a known, Anthropic-acknowledged, currently-unfixed limitation of the connector UI (closed "not planned": [anthropics/claude-ai-mcp#457](https://github.com/anthropics/claude-ai-mcp/issues/457), [#402](https://github.com/anthropics/claude-ai-mcp/issues/402)) — not a bug in this server.

Workaround for Claude Desktop: bypass the web connector flow with a local [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) stdio bridge instead. Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "nathaniel-portfolio": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://dev.actuallyitsnathaniel.com/api/mcp"]
    }
  }
}
```

Restart Claude Desktop after editing. Other MCP clients that don't go through the web custom-connector flow (Claude Code CLI, MCP Inspector, etc.) connect directly with no workaround needed.
