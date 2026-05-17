import { SECTION_MAP, type SectionId } from "../../lib/sections";

interface StatusBarProps {
  current: SectionId;
  crt: boolean;
  onToggleCrt: () => void;
}

export function StatusBar({ current, crt, onToggleCrt }: StatusBarProps) {
  const path = SECTION_MAP[current]?.path ?? "~/";

  return (
    <div className="status">
      <div className="left">
        <span className="pulse" aria-hidden="true" />
        <span className="brand">
          <span className="acc">nathaniel</span>
          <span className="at">@</span>portfolio
        </span>
        <span className="sep">·</span>
        <span className="path" aria-label={`current section: ${path}`}>{path}</span>
      </div>
      <div className="right">
        <span className="item hide-sm">
          <span className="k">deploy</span>
          <span className="v">3d ago</span>
        </span>
        <span className="item hide-sm">
          <span className="k">la</span>
          <span className="v">pst</span>
        </span>
        <button
          className={`crt-btn${crt ? " on" : ""}`}
          onClick={onToggleCrt}
          aria-pressed={crt}
          aria-label="toggle CRT effect"
        >
          crt · {crt ? "on" : "off"}
        </button>
      </div>
    </div>
  );
}
