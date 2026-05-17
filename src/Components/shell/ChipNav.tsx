import { SECTIONS, type SectionId } from "../../lib/sections";

interface ChipNavProps {
  current: SectionId;
  onNavigate: (id: SectionId) => void;
  onCommand: (cmd: string) => void;
  highlightedSection?: SectionId | null;
}

export function ChipNav({ current, onNavigate, onCommand, highlightedSection }: ChipNavProps) {
  return (
    <div
      className="chips flex gap-[6px] px-[var(--pad-x)] py-2 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none]"
      role="navigation"
      aria-label="section navigation"
    >
      {SECTIONS.map(s => {
        const isActive = current === s.id;
        const isMatch = highlightedSection === s.id;
        const hasFocus = highlightedSection !== undefined && highlightedSection !== null;

        let className =
          "chip inline-flex items-center gap-[6px] px-[10px] py-1 bg-bg1 border border-rule rounded-[2px] text-dim text-[11.5px] tracking-[0.02em] whitespace-nowrap shrink-0 transition-[color,border-color,background] duration-150";

        if (isActive) {
          className =
            "chip active inline-flex items-center gap-[6px] px-[10px] py-1 border rounded-[2px] text-[11.5px] tracking-[0.02em] whitespace-nowrap shrink-0 transition-[color,border-color,background] duration-150 text-accent border-[rgba(126,231,135,0.35)] bg-[rgba(126,231,135,0.04)]";
        } else if (hasFocus && isMatch) {
          className =
            "chip match inline-flex items-center gap-[6px] px-[10px] py-1 border rounded-[2px] text-[11.5px] tracking-[0.02em] whitespace-nowrap shrink-0 transition-[color,border-color,background] duration-150 text-accent border-[rgba(126,231,135,0.4)] bg-[rgba(126,231,135,0.06)]";
        } else if (hasFocus) {
          className =
            "chip dim inline-flex items-center gap-[6px] px-[10px] py-1 bg-bg1 border border-rule rounded-[2px] text-dim text-[11.5px] tracking-[0.02em] whitespace-nowrap shrink-0 transition-[color,border-color,background] duration-150 opacity-30";
        }

        return (
          <button
            key={s.id}
            className={className}
            onClick={() => onNavigate(s.id)}
            aria-current={isActive ? "page" : undefined}
            aria-label={`navigate to ${s.path}`}
          >
            {s.label}
          </button>
        );
      })}
      <span
        className="chip sep inline-flex items-center bg-transparent border-0 pointer-events-none p-0 text-rule2 self-center text-[11.5px]"
        aria-hidden="true"
      >
        |
      </span>
      <button
        className="chip cmd inline-flex items-center gap-[6px] px-[10px] py-1 bg-bg1 border border-rule rounded-[2px] text-faint text-[11.5px] tracking-[0.02em] whitespace-nowrap shrink-0 transition-[color,border-color,background] duration-150 hover:text-accent hover:border-[rgba(126,231,135,0.3)]"
        onClick={() => onCommand(":resume")}
        aria-label="download résumé"
      >
        :resume
      </button>
      <button
        className="chip cmd inline-flex items-center gap-[6px] px-[10px] py-1 bg-bg1 border border-rule rounded-[2px] text-faint text-[11.5px] tracking-[0.02em] whitespace-nowrap shrink-0 transition-[color,border-color,background] duration-150 hover:text-accent hover:border-[rgba(126,231,135,0.3)]"
        onClick={() => onCommand(":contact")}
        aria-label="open contact info"
      >
        :contact
      </button>
    </div>
  );
}
