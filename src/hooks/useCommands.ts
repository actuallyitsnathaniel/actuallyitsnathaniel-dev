import { useCallback } from "react";
import { SECTIONS, type SectionId } from "../lib/sections";
import { THEME_NAMES, type ThemeName } from "./useTheme";
import type { LogType } from "../context/ActivityLogContext";

interface CommandContext {
  go: (id: SectionId) => void;
  toggleCrt: () => void;
  setTheme: (t: ThemeName) => void;
  openHelp: () => void;
  openLog: () => void;
  clearLog: () => void;
  downloadResume: () => void;
  logActivity: (type: LogType, msg: string) => void;
}

const THEME_SET = new Set<string>(THEME_NAMES);

export function useCommands(ctx: CommandContext) {
  const run = useCallback(
    (raw: string): boolean => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd.startsWith(":")) return false;
      const parts = cmd.slice(1).split(/\s+/);
      const name = parts[0];
      const arg = parts[1] ?? "";

      switch (name) {
        case "resume":
        case "cv":
          ctx.downloadResume();
          ctx.logActivity("event", ":resume · download requested");
          return true;
        case "contact":
          ctx.go("contact");
          ctx.logActivity("system", "cd ~/contact");
          return true;
        case "crt":
          ctx.toggleCrt();
          ctx.logActivity("event", ":crt · toggled");
          return true;
        case "theme":
          if (THEME_SET.has(arg)) {
            ctx.setTheme(arg as ThemeName);
            ctx.logActivity("event", `:theme ${arg}`);
          }
          return true;
        case "home":
          ctx.go("home");
          ctx.logActivity("system", "cd ~/");
          return true;
        case "back":
          history.back();
          return true;
        case "github":
        case "gh":
          window.open(
            "https://github.com/actuallyitsnathaniel",
            "_blank",
            "noopener",
          );
          ctx.logActivity("event", ":github · opened");
          return true;
        case "linkedin":
        case "li":
          window.open(
            "https://linkedin.com/in/nathaniel-bowman",
            "_blank",
            "noopener",
          );
          ctx.logActivity("event", ":linkedin · opened");
          return true;
        case "play":
          ctx.go("misc");
          window.open(
            "https://open.spotify.com/track/4BJ5k8vAGaHHW5KFksavW2",
            "_blank",
            "noopener",
          );
          ctx.logActivity("event", ":play · ~/misc + spotify");
          return true;
        case "share":
          navigator.clipboard.writeText(window.location.href).then(() => {
            ctx.logActivity(
              "event",
              ":share · current url copied to clipboard",
            );
          });
          return true;
        case "mcp":
          navigator.clipboard
            .writeText("https://dev.actuallyitsnathaniel.com/api/mcp")
            .then(() => {
              ctx.logActivity(
                "event",
                ":mcp · MCP server endpoint copied — for AI agents/clients",
              );
            });
          return true;
        case "log":
          ctx.openLog();
          ctx.logActivity("event", ":log · activity log opened");
          return true;
        case "clear":
          ctx.clearLog();
          return true;
        case "?":
        case "help":
          ctx.openHelp();
          ctx.logActivity("event", ":? · shortcuts opened");
          return true;
        default: {
          const section = SECTIONS.find((s) => s.id === name);
          if (section) {
            ctx.go(section.id);
            ctx.logActivity("system", `cd ${section.path}`);
            return true;
          }
          ctx.logActivity("system", `unknown command: :${name}`);
          return true;
        }
      }
    },
    [ctx],
  );

  return { run };
}
