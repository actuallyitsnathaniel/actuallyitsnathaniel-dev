import { useCallback } from "react";
import { SECTIONS, type SectionId } from "../lib/sections";
import type { ThemeName } from "./useTheme";
import type { LogType } from "../context/ActivityLogContext";

interface CommandContext {
  go: (id: SectionId) => void;
  toggleCrt: () => void;
  setTheme: (t: ThemeName) => void;
  openContact: () => void;
  openHelp: () => void;
  openLog: () => void;
  downloadResume: () => void;
  logActivity: (type: LogType, msg: string) => void;
}

export function useCommands(ctx: CommandContext) {
  const run = useCallback((raw: string): boolean => {
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
        ctx.openContact();
        ctx.logActivity("event", ":contact · panel opened");
        return true;
      case "crt":
        ctx.toggleCrt();
        ctx.logActivity("event", ":crt · toggled");
        return true;
      case "theme":
        if ([
          "green", "amber", "mono",
          "red", "orange", "yellow", "lime", "teal", "cyan",
          "sky", "blue", "indigo", "violet", "purple", "fuchsia",
          "pink", "rose", "slate", "zinc",
          "gold", "coral", "mint", "lavender", "peach",
          "sage", "dusk", "ember", "frost", "neon",
        ].includes(arg)) {
          ctx.setTheme(arg as ThemeName);
          ctx.logActivity("event", `:theme ${arg}`);
        }
        return true;
      case "home":
        ctx.go("home");
        ctx.logActivity("system", "cd ~/");
        return true;
      case "about":
      case "toolbelt":
      case "work":
      case "infra":
      case "repos":
      case "misc": {
        const section = SECTIONS.find(s => s.id === name);
        if (section) { ctx.go(section.id as SectionId); ctx.logActivity("system", `cd ~/${name}`); }
        return true;
      }
      case "back":
        history.back();
        return true;
      case "github":
      case "gh":
        window.open("https://github.com/actuallyitsnathaniel", "_blank", "noopener");
        ctx.logActivity("event", ":github · opened");
        return true;
      case "linkedin":
      case "li":
        window.open("https://linkedin.com/in/nathaniel-bowman", "_blank", "noopener");
        ctx.logActivity("event", ":linkedin · opened");
        return true;
      case "play":
        ctx.go("misc");
        window.open("https://open.spotify.com/track/7mTOO2lDThh4vIqDWn9Cdv", "_blank", "noopener");
        ctx.logActivity("event", ":play · ~/misc + spotify");
        return true;
      case "share":
        navigator.clipboard.writeText(window.location.href).then(() => {
          ctx.logActivity("event", ":share · url copied to clipboard");
        });
        return true;
      case "log":
        ctx.openLog();
        ctx.logActivity("event", ":log · activity log opened");
        return true;
      case "?":
      case "help":
        ctx.openHelp();
        ctx.logActivity("event", ":? · shortcuts opened");
        return true;
      default:
        ctx.logActivity("system", `unknown command: :${name}`);
        return true;
    }
  }, [ctx]);

  return { run };
}
