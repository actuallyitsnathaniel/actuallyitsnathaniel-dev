import { CHIP_SECTIONS, type SectionId } from "../../lib/sections";
import {
  killToEnd,
  killToStart,
  killWordBefore,
  matchNavSection,
  parseCanonical,
  tabComplete,
  toCanonical,
  type PromptMode,
} from "../../lib/prompt";
import { useLineHistory } from "../../hooks/useLineHistory";
import { useEffect, useRef, useState } from "react";

interface FilterBarProps {
  current: SectionId;
  mode: PromptMode;
  onModeChange: (mode: PromptMode) => void;
  filter: string;
  onFilterChange: (v: string) => void;
  draft: string;
  onDraftChange: (v: string) => void;
  onNavigate: (id: SectionId) => void;
  onCommand: (cmd: string) => boolean;
  onOpenHelp: () => void;
  onHighlight: (id: SectionId | null) => void;
  onFocusChange?: (focused: boolean) => void;
  onCollapse?: () => void;
  onCloseOverlays: () => void;
  onClearLog: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

function getPlaceholder(
  mode: PromptMode,
  current: SectionId,
  focused: boolean,
  isMobile: boolean,
  searching: boolean,
): string {
  if (searching) return "reverse-i-search";
  if (isMobile && !focused) return "tap for /pages and :commands";
  if (mode === ":") return 'command · try "theme amber"';
  if (mode === "~") return "path · try work";
  switch (current) {
    case "toolbelt":
      return 'filter tools · try "aws"';
    case "work":
      return 'filter projects · try "jlm"';
    case "infra":
      return 'filter infra · try "cicd"';
    default:
      return "filter, or :command";
  }
}

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setMobile(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function ariaFor(mode: PromptMode, searching: boolean): string {
  if (searching) return "reverse search";
  if (mode === ":") return "command input";
  if (mode === "~") return "path input";
  return "filter input";
}

export function FilterBar({
  current,
  mode,
  onModeChange,
  filter,
  onFilterChange,
  draft,
  onDraftChange,
  onNavigate,
  onCommand,
  onOpenHelp,
  onHighlight,
  onFocusChange,
  onCollapse,
  onCloseOverlays,
  onClearLog,
  inputRef,
}: FilterBarProps) {
  const [focused, setFocused] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPreview, setSearchPreview] = useState("");
  const searchIndexRef = useRef<number | null>(null);
  const preSearchRef = useRef({ mode: "/" as PromptMode, payload: "" });
  const cycleStemRef = useRef<string | null>(null);
  const cycleIndexRef = useRef(-1);
  const prefixShownRef = useRef(false);
  const isMobile = useIsMobile();
  const history = useLineHistory();

  const payload = mode === "/" ? filter : draft;
  const displayValue = searching ? searchPreview : payload;
  const prefix = searching ? "r" : mode;

  const setCaret = (pos: number) => {
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (el) el.setSelectionRange(pos, pos);
    });
  };

  const setPayload = (next: string) => {
    if (mode === "/") onFilterChange(next);
    else onDraftChange(next);
  };

  const applyCanonical = (line: string) => {
    cycleStemRef.current = null;
    cycleIndexRef.current = -1;
    prefixShownRef.current = false;
    const parsed = parseCanonical(line);
    onModeChange(parsed.mode);
    if (parsed.mode === "/") {
      onFilterChange(parsed.payload);
      highlightFilter(parsed.payload);
    } else {
      onDraftChange(parsed.payload);
      onHighlight(null);
    }
    setCaret(parsed.payload.length);
  };

  const highlightFilter = (v: string) => {
    const query = v.toLowerCase().trim();
    if (!query) {
      onHighlight(null);
      return;
    }
    const match = CHIP_SECTIONS.find(
      (s) =>
        s.aliases.some((a) => a.includes(query)) ||
        s.id.includes(query) ||
        s.label.includes(query),
    );
    onHighlight(match?.id ?? null);
  };

  const returnToFilter = (opts?: { clearFilter?: boolean; blur?: boolean }) => {
    onModeChange("/");
    onDraftChange("");
    if (opts?.clearFilter) onFilterChange("");
    onHighlight(null);
    if (opts?.blur) {
      onCollapse?.();
      inputRef.current?.blur();
    }
  };

  const exitSearch = (restore: boolean) => {
    setSearching(false);
    setSearchQuery("");
    setSearchPreview("");
    searchIndexRef.current = null;
    if (restore) {
      const snap = preSearchRef.current;
      onModeChange(snap.mode);
      if (snap.mode === "/") {
        onFilterChange(snap.payload);
        highlightFilter(snap.payload);
      } else {
        onDraftChange(snap.payload);
        onHighlight(null);
      }
    }
  };

  const beginOrAdvanceSearch = () => {
    const before =
      searchIndexRef.current === null
        ? history.lines.length - 1
        : searchIndexRef.current - 1;
    const hit = history.searchFrom(searchQuery, before);
    if (!hit) return;
    searchIndexRef.current = hit.index;
    setSearchPreview(hit.line);
  };

  const handleFocus = () => {
    setFocused(true);
    onFocusChange?.(true);
  };
  const handleBlur = () => {
    setFocused(false);
    onFocusChange?.(false);
  };

  const handleChange = (v: string) => {
    if (searching) return;
    history.resetWalk(toCanonical(mode, v));
    cycleStemRef.current = null;
    cycleIndexRef.current = -1;
    prefixShownRef.current = false;

    if (mode === "/" && v === "*") {
      onHighlight(null);
      onFilterChange("");
      return;
    }

    setPayload(v);
    if (mode === "/") highlightFilter(v);
    else onHighlight(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    const caret = el.selectionStart ?? 0;
    const ctrl = e.ctrlKey && !e.metaKey && !e.altKey;

    if (searching) {
      if (e.key === "Escape" || (ctrl && e.key.toLowerCase() === "c")) {
        e.preventDefault();
        e.stopPropagation();
        exitSearch(true);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const line = searchPreview;
        exitSearch(false);
        if (line) applyCanonical(line);
        return;
      }
      if (ctrl && e.key.toLowerCase() === "r") {
        e.preventDefault();
        beginOrAdvanceSearch();
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        const next = searchQuery.slice(0, -1);
        setSearchQuery(next);
        searchIndexRef.current = null;
        const hit = history.searchFrom(next, history.lines.length - 1);
        searchIndexRef.current = hit?.index ?? null;
        setSearchPreview(hit?.line ?? "");
        return;
      }
      if (e.key.length === 1 && !e.metaKey && !e.altKey && !ctrl) {
        e.preventDefault();
        const next = searchQuery + e.key;
        setSearchQuery(next);
        searchIndexRef.current = null;
        const hit = history.searchFrom(next, history.lines.length - 1);
        searchIndexRef.current = hit?.index ?? null;
        setSearchPreview(hit?.line ?? "");
      }
      return;
    }

    if (ctrl && e.key.toLowerCase() === "r") {
      e.preventDefault();
      preSearchRef.current = { mode, payload };
      setSearching(true);
      setSearchQuery("");
      searchIndexRef.current = null;
      const hit = history.searchFrom("", history.lines.length - 1);
      searchIndexRef.current = hit?.index ?? null;
      setSearchPreview(hit?.line ?? "");
      return;
    }

    if (ctrl && e.key.toLowerCase() === "l") {
      e.preventDefault();
      onCloseOverlays();
      onClearLog();
      setPayload("");
      onHighlight(null);
      return;
    }

    if (ctrl && e.key.toLowerCase() === "a") {
      e.preventDefault();
      el.setSelectionRange(0, 0);
      return;
    }
    if (ctrl && e.key.toLowerCase() === "e") {
      e.preventDefault();
      const len = payload.length;
      el.setSelectionRange(len, len);
      return;
    }
    if (ctrl && e.key.toLowerCase() === "u") {
      e.preventDefault();
      const next = killToStart(payload, caret);
      setPayload(next.value);
      setCaret(next.caret);
      history.resetWalk(toCanonical(mode, next.value));
      return;
    }
    if (ctrl && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const next = killToEnd(payload, caret);
      setPayload(next.value);
      setCaret(next.caret);
      history.resetWalk(toCanonical(mode, next.value));
      return;
    }
    if (ctrl && e.key.toLowerCase() === "w") {
      e.preventDefault();
      const next = killWordBefore(payload, caret);
      setPayload(next.value);
      setCaret(next.caret);
      history.resetWalk(toCanonical(mode, next.value));
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      if (cycleStemRef.current === null) cycleStemRef.current = payload;
      const dir: 1 | -1 = e.shiftKey ? -1 : 1;
      const result = tabComplete(
        mode,
        cycleStemRef.current,
        cycleIndexRef.current,
        dir,
        prefixShownRef.current,
      );
      cycleIndexRef.current = result.cycle;
      prefixShownRef.current = result.prefixShown;
      setPayload(result.value);
      setCaret(result.value.length);
      if (mode === "/") highlightFilter(result.value);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const line = history.up(toCanonical(mode, payload));
      if (line != null) applyCanonical(line);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const line = history.down();
      if (line != null) applyCanonical(line);
      return;
    }

    if (
      (e.key === ":" || e.key === "~") &&
      caret === 0 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      e.preventDefault();
      const nextMode: PromptMode = e.key === ":" ? ":" : "~";
      cycleStemRef.current = null;
      cycleIndexRef.current = -1;
      prefixShownRef.current = false;
      onModeChange(nextMode);
      onDraftChange("");
      onHighlight(null);
      return;
    }

    if (e.key === "Backspace" && mode !== "/" && payload === "" && caret === 0) {
      e.preventDefault();
      returnToFilter();
      highlightFilter(filter);
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onCloseOverlays();
      if (mode !== "/") {
        returnToFilter({ blur: true });
        highlightFilter(filter);
        return;
      }
      onFilterChange("");
      onHighlight(null);
      onCollapse?.();
      el.blur();
      return;
    }

    if (e.key === "Enter") {
      const v = payload.trim();
      if (mode === ":") {
        if (!v) return;
        const canonical = toCanonical(":", v);
        history.push(canonical);
        onCommand(canonical);
        returnToFilter();
        highlightFilter(filter);
        return;
      }
      if (mode === "~") {
        if (!v) return;
        const match = matchNavSection(v);
        if (match) {
          history.push(match.path);
          onNavigate(match.id);
          returnToFilter();
        }
        return;
      }
      if (!v) return;
      history.push(v);
      const match = CHIP_SECTIONS.find(
        (s) =>
          s.aliases.some((a) => a.includes(v.toLowerCase())) ||
          s.id.startsWith(v.toLowerCase()),
      );
      if (match) {
        onNavigate(match.id);
        onHighlight(null);
      }
    }
  };

  return (
    <div className="flex items-center gap-2.5 px-(--pad-x) py-2 border-b border-rule">
      <span
        className="text-accent text-t14 font-medium shrink-0 select-none"
        aria-hidden="true"
      >
        {prefix}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={getPlaceholder(
          mode,
          current,
          focused,
          isMobile,
          searching,
        )}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label={ariaFor(mode, searching)}
        className="flex-1 bg-transparent border-0 outline-none text-ink font-mono text-t14 max-sm:text-base lowercase p-0 placeholder:text-faint"
      />
      <span
        className="shrink-0 text-faint text-[10px] tracking-[0.12em] uppercase cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="open shortcuts"
        onClick={onOpenHelp}
        onKeyDown={(e) => e.key === "Enter" && onOpenHelp()}
      >
        <span className="inline-block border border-rule2 px-1.25 py-px rounded-xs mr-1.5 text-[10px] text-dim">
          ?
        </span>
        shortcuts
      </span>
    </div>
  );
}
