import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "../../lib/sections";

interface FilterBarProps {
  current: SectionId;
  value: string;
  onChange: (v: string) => void;
  onNavigate: (id: SectionId) => void;
  onCommand: (cmd: string) => boolean;
  onOpenHelp: () => void;
  onHighlight: (id: SectionId | null) => void;
  onFocusChange?: (focused: boolean) => void;
  onCollapse?: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

function getMode(v: string): "/" | ":" | "~" {
  if (v.startsWith(":")) return ":";
  if (v.startsWith("~")) return "~";
  return "/";
}

function getPlaceholder(
  current: SectionId,
  focused: boolean,
  isMobile: boolean,
): string {
  if (isMobile && !focused) return "tap for /pages and :commands";
  switch (current) {
    case "toolbelt":
      return 'navigate, filter tools, or :command · try "aws"';
    case "work":
      return 'navigate, filter projects, or :command · try "jlm"';
    case "infra":
      return 'navigate, filter infra, or :command · try "cicd"';
    default:
      return "navigate, filter, or :command";
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

export function FilterBar({
  current,
  value,
  onChange,
  onNavigate,
  onCommand,
  onOpenHelp,
  onHighlight,
  onFocusChange,
  onCollapse,
  inputRef,
}: FilterBarProps) {
  const [mode, setMode] = useState<"/" | ":" | "~">(getMode(value));
  const [focused, setFocused] = useState(false);
  const isMobile = useIsMobile();

  const handleFocus = () => {
    setFocused(true);
    onFocusChange?.(true);
  };
  const handleBlur = () => {
    setFocused(false);
    onFocusChange?.(false);
  };

  useEffect(() => {
    setMode(getMode(value));
  }, [value]);

  const handleChange = (v: string) => {
    onChange(v);
    setMode(getMode(v));

    if (v === "*") {
      onHighlight(null);
      onChange("");
      return;
    }

    const m = getMode(v);
    if (m === "/") {
      const query = v.toLowerCase().trim();
      if (!query) {
        onHighlight(null);
        return;
      }
      const match = SECTIONS.find(
        (s) =>
          s.aliases.some((a) => a.includes(query)) ||
          s.id.includes(query) ||
          s.label.includes(query),
      );
      onHighlight(match?.id ?? null);
    } else {
      onHighlight(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onChange("");
      onHighlight(null);
      onCollapse?.();
      (e.target as HTMLInputElement).blur();
      return;
    }

    if (e.key === "Enter") {
      const v = value.trim();

      if (v.startsWith(":")) {
        if (v === ":?" || v === ":help") {
          onOpenHelp();
          onChange("");
          return;
        }
        onCommand(v);
        onChange("");
        return;
      }

      if (v.startsWith("~")) {
        const query = v.toLowerCase();
        const match = SECTIONS.find(
          (s) =>
            s.aliases.some((a) => a === query || a.startsWith(query)) ||
            s.path.startsWith(query),
        );
        if (match) {
          onNavigate(match.id);
          onChange("");
        }
        return;
      }

      const query = v.toLowerCase();
      if (!query) return;

      const match = SECTIONS.find(
        (s) =>
          s.aliases.some((a) => a.includes(query)) || s.id.startsWith(query),
      );
      if (match) {
        onNavigate(match.id);
        onChange("");
        onHighlight(null);
      }
    }
  };

  return (
    <div className="flex items-center gap-2.5 px-(--pad-x) py-2 border-b border-rule">
      <span
        className="text-accent text-[14px] font-medium shrink-0 select-none"
        aria-hidden="true"
      >
        {mode}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={getPlaceholder(current, focused, isMobile)}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label="filter or command input"
        className="flex-1 bg-transparent border-0 outline-none text-ink font-mono text-t14 lowercase p-0 placeholder:text-faint"
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
