import { useEffect, useRef, useState } from "react";
import { SECTIONS, type SectionId } from "../../lib/sections";

interface FilterBarProps {
  current: SectionId;
  value: string;
  onChange: (v: string) => void;
  onNavigate: (id: SectionId) => void;
  onCommand: (cmd: string) => boolean;
  onOpenHelp: () => void;
  onHighlight: (id: SectionId | null) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

function getMode(v: string): "/" | ":" | "~" {
  if (v.startsWith(":")) return ":";
  if (v.startsWith("~")) return "~";
  return "/";
}

function getPlaceholder(current: SectionId): string {
  switch (current) {
    case "toolbelt": return 'filter tools · try "aws"';
    case "work":     return 'filter projects · try "jlm"';
    case "infra":    return 'filter infra · try "cicd"';
    default:         return "filter or :command";
  }
}

export function FilterBar({
  current, value, onChange, onNavigate, onCommand, onOpenHelp, onHighlight, inputRef,
}: FilterBarProps) {
  const [mode, setMode] = useState<"/" | ":" | "~">(getMode(value));

  useEffect(() => { setMode(getMode(value)); }, [value]);

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
      if (!query) { onHighlight(null); return; }
      const match = SECTIONS.find(s =>
        s.aliases.some(a => a.includes(query)) || s.id.includes(query) || s.label.includes(query)
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
      (e.target as HTMLInputElement).blur();
      return;
    }

    if (e.key === "Enter") {
      const v = value.trim();

      if (v.startsWith(":")) {
        if (v === ":?" || v === ":help") { onOpenHelp(); onChange(""); return; }
        onCommand(v);
        onChange("");
        return;
      }

      if (v.startsWith("~")) {
        const query = v.toLowerCase();
        const match = SECTIONS.find(s =>
          s.aliases.some(a => a === query || a.startsWith(query)) || s.path.startsWith(query)
        );
        if (match) { onNavigate(match.id); onChange(""); }
        return;
      }

      const query = v.toLowerCase();
      if (!query) return;

      const match = SECTIONS.find(s =>
        s.aliases.some(a => a.includes(query)) || s.id.startsWith(query)
      );
      if (match) { onNavigate(match.id); onChange(""); onHighlight(null); }
    }
  };

  return (
    <div className="filter">
      <span className="prompt" aria-hidden="true">{mode}</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={getPlaceholder(current)}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label="filter or command input"
      />
      <span
        className="hint"
        role="button"
        tabIndex={0}
        aria-label="open shortcuts"
        onClick={onOpenHelp}
        onKeyDown={e => e.key === "Enter" && onOpenHelp()}
        style={{ cursor: "pointer" }}
      >
        <span className="kbd">?</span>shortcuts
      </span>
    </div>
  );
}
