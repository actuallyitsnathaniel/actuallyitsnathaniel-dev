import { useCallback, useRef, useState } from "react";

const STORAGE_KEY = "ain_hist";
const MAX_LINES = 100;

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string").slice(-MAX_LINES);
  } catch {
    return [];
  }
}

function save(lines: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* quota / private mode */
  }
}

export function useLineHistory() {
  const [lines, setLines] = useState<string[]>(load);
  const indexRef = useRef<number | null>(null);
  const draftRef = useRef("");

  const push = useCallback((canonical: string) => {
    const line = canonical.trim();
    if (!line) return;
    setLines((prev) => {
      const next =
        prev[prev.length - 1] === line ? prev : [...prev, line].slice(-MAX_LINES);
      save(next);
      return next;
    });
    indexRef.current = null;
    draftRef.current = "";
  }, []);

  const resetWalk = useCallback((currentCanonical: string) => {
    indexRef.current = null;
    draftRef.current = currentCanonical;
  }, []);

  const up = useCallback(
    (currentCanonical: string): string | null => {
      if (lines.length === 0) return null;
      if (indexRef.current === null) {
        draftRef.current = currentCanonical;
        indexRef.current = lines.length - 1;
      } else if (indexRef.current > 0) {
        indexRef.current -= 1;
      }
      return lines[indexRef.current];
    },
    [lines],
  );

  const down = useCallback((): string | null => {
    if (indexRef.current === null) return null;
    if (indexRef.current < lines.length - 1) {
      indexRef.current += 1;
      return lines[indexRef.current];
    }
    indexRef.current = null;
    return draftRef.current;
  }, [lines]);

  const searchFrom = useCallback(
    (
      query: string,
      beforeIndex: number,
    ): { line: string; index: number } | null => {
      if (lines.length === 0) return null;
      const q = query.toLowerCase();
      const start = Math.min(beforeIndex, lines.length - 1);
      for (let i = start; i >= 0; i--) {
        if (q === "" || lines[i].toLowerCase().includes(q)) {
          return { line: lines[i], index: i };
        }
      }
      return null;
    },
    [lines],
  );

  return { lines, push, resetWalk, up, down, searchFrom };
}
