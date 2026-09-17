import { defineConfig, loadEnv, type Plugin, type PreviewServer, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import tailwindcss from "@tailwindcss/vite";
import type { IncomingMessage, ServerResponse } from "node:http";
import { agentFiles, crawlerHtml } from "./src/lib/pages";
import { isSpaPath, WELL_KNOWN_FILES } from "./src/lib/sections";

const WELL_KNOWN_EXTRA: Record<string, string> = {
  "/api/llms.txt": "/docs/api-llms.txt",
  "/api/openapi.json": "/openapi.json",
};

function contentType(path: string): string {
  if (path.endsWith(".md")) return "text/markdown; charset=utf-8";
  if (path.endsWith(".json")) return "application/json; charset=utf-8";
  return "text/plain; charset=utf-8";
}

function attachRewrites(server: ViteDevServer | PreviewServer) {
  server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const url = new URL(req.url || "/", "http://localhost");
    const path = url.pathname.replace(/\/$/, "") || "/";

    const wellKnown = WELL_KNOWN_FILES[path] ?? WELL_KNOWN_EXTRA[path];
    if (wellKnown) {
      const dest = typeof wellKnown === "string" ? wellKnown : wellKnown.file;
      req.url = dest + url.search;
      next();
      return;
    }

    const files = agentFiles();
    const body = files[url.pathname] ?? files[path];
    if (body) {
      res.statusCode = 200;
      res.setHeader("Content-Type", contentType(path));
      res.end(body);
      return;
    }

    const accept = String(req.headers.accept || "");
    if (isSpaPath(path) && /\btext\/markdown\b/i.test(accept)) {
      const md = files[`${path}.md`] ?? (path === "/" ? files["/index.md"] : undefined);
      if (md) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/markdown; charset=utf-8");
        res.setHeader("Vary", "Accept");
        res.end(md);
        return;
      }
    }

    const passthrough =
      isSpaPath(path) ||
      path.startsWith("/assets") ||
      path.startsWith("/api") ||
      path.startsWith("/@") ||
      path.startsWith("/src") ||
      path.startsWith("/node_modules") ||
      path.startsWith("/__") ||
      /\.[a-zA-Z0-9]+$/.test(path);

    if (passthrough) {
      next();
      return;
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
    res.end(`# 404 Not Found\n\nThe path \`${path}\` does not exist. See /llms.txt or /developers.\n`);
  });
}

function agentSurfaces(): Plugin {
  return {
    name: "agent-surfaces",
    transformIndexHtml(html) {
      return html.replace("<!-- crawler-html -->", crawlerHtml());
    },
    generateBundle() {
      for (const [path, source] of Object.entries(agentFiles())) {
        if (path.startsWith("/api/")) continue;
        this.emitFile({
          type: "asset",
          fileName: path.replace(/^\//, ""),
          source,
        });
      }
    },
    configureServer: attachRewrites,
    configurePreviewServer: attachRewrites,
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.REACT_APP_GIT_USERNAME": JSON.stringify(
        env.REACT_APP_GIT_USERNAME,
      ),
      "process.env.VITE_GIT_TOKEN": JSON.stringify(env.VITE_GIT_TOKEN),
    },
    base: "/",
    plugins: [
      agentSurfaces(),
      tailwindcss(),
      react(),
      svgr(),
      ViteImageOptimizer({
        test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
        exclude: undefined,
        include: undefined,
        includePublic: true,
        logStats: true,
        ansiColors: true,
        svg: {
          multipass: true,
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  cleanupNumericValues: false,
                  removeViewBox: false, // https://github.com/svg/svgo/issues/1128
                },
              },
            },
            "sortAttrs",
            {
              name: "addAttributesToSVGElement",
              params: {
                attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
              },
            },
          ],
        },
        png: {
          quality: 66,
        },
        jpeg: {
          quality: 66,
        },
        jpg: {
          quality: 66,
        },
        tiff: {
          quality: 66,
        },
        gif: {},
        webp: {
          lossless: false,
          quality: 80,
        },
        avif: {
          lossless: false,
          quality: 75,
        },
      }),
    ],
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      outDir: "./build",
    },
    server: {
      open: true,
      port: 5173,
    },
  };
});
