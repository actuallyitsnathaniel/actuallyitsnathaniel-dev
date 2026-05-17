import { SECTION_MAP, type SectionId } from "../../lib/sections";

interface StatusBarProps {
  current: SectionId;
  crt: boolean;
  onToggleCrt: () => void;
}

export function StatusBar({ current, crt, onToggleCrt }: StatusBarProps) {
  const path = SECTION_MAP[current]?.path ?? "~/";

  return (
    <div className="flex items-center justify-between px-[var(--pad-x)] border-b border-rule bg-[rgba(10,10,10,0.92)] backdrop-blur-[8px] text-t12 gap-4 z-5">
      <div className="flex items-center gap-[14px] min-w-0">
        <span
          className="pulse w-[7px] h-[7px] rounded-full bg-accent shadow-[0_0_8px_var(--accent)] shrink-0 animate-[pulse_2.4s_infinite]"
          aria-hidden="true"
        />
        <span className="text-ink whitespace-nowrap">
          <span className="text-accent">nathaniel</span>
          <span className="text-faint">@</span>portfolio
        </span>
        <span className="text-faint">·</span>
        <span
          className="text-accent whitespace-nowrap overflow-hidden text-ellipsis"
          aria-label={`current section: ${path}`}
        >
          {path}
        </span>
      </div>
      <div className="flex items-center gap-[14px] text-faint text-[11px] tracking-[0.04em]">
        <span className="hide-sm whitespace-nowrap">
          <span className="text-faint mr-[6px]">deploy</span>
          <span className="text-dim">3d ago</span>
        </span>
        <span className="hide-sm whitespace-nowrap">
          <span className="text-faint mr-[6px]">la</span>
          <span className="text-dim">pst</span>
        </span>
        <button
          className={`border border-rule2 px-[9px] py-[3px] rounded-[2px] text-[10px] tracking-[0.14em] uppercase transition-[color,border-color] duration-150 ${
            crt
              ? "text-accent border-[rgba(126,231,135,0.4)]"
              : "text-faint hover:text-ink hover:border-ink"
          }`}
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
