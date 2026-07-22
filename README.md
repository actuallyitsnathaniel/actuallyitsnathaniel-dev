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

`api/mcp.ts` exposes a Model Context Protocol server at `/api/mcp` (Node runtime, Streamable HTTP transport) with 6 tools: `search_projects`, `get_toolbelt`, `get_about`, `get_resume`, `get_contact`, `get_github_activity`.

To test it:

- `npm run test:mcp` — automated check: spins up a real Node HTTP server wrapping the handler and exercises every tool (init → list → call each tool → unknown-tool error path)
- `npx vercel dev`, then point [MCP Inspector](https://github.com/modelcontextprotocol/inspector) (`npx @modelcontextprotocol/inspector`) at `http://localhost:3000/api/mcp` for an interactive UI
- `npx vercel build` — reproduces Vercel's real bundler/runtime locally; catches deploy-only failures (e.g. edge vs. node runtime bundling issues) before pushing
