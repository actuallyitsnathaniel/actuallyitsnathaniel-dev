import { useEffect, useRef } from "react";
import { GO_MAP, type SectionId } from "../lib/sections";
import { isTypingTarget, type PromptMode } from "../lib/prompt";

interface KeyboardContext {
  go: (id: SectionId) => void;
  openHelp: () => void;
  closeOverlays: () => void;
  focusFilter: (opts?: { mode?: PromptMode }) => void;
}

export function useKeyboard(ctx: KeyboardContext) {
  const gPending = useRef(false);
  const gTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const inInput = isTypingTarget(e.target);

      if (e.key === "Escape") {
        ctx.closeOverlays();
        if (inInput) (e.target as HTMLInputElement).blur?.();
        return;
      }

      if (inInput) return;

      if (e.key === "?") {
        e.preventDefault();
        ctx.openHelp();
        return;
      }

      if (e.key === "/" || e.key === ":") {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        e.preventDefault();
        ctx.closeOverlays();
        ctx.focusFilter({ mode: e.key === ":" ? ":" : "/" });
        return;
      }

      if (gPending.current) {
        gPending.current = false;
        if (gTimer.current) clearTimeout(gTimer.current);
        const dest = GO_MAP[e.key.toLowerCase()];
        if (dest) {
          ctx.go(dest);
          return;
        }
      }

      if (e.key.toLowerCase() === "g") {
        gPending.current = true;
        gTimer.current = setTimeout(() => {
          gPending.current = false;
        }, 1000);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [ctx]);
}
