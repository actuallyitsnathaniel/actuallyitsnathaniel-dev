import { SECTIONS, type SectionId } from "../../lib/sections";

interface ChipNavProps {
  current: SectionId;
  onNavigate: (id: SectionId) => void;
  onCommand: (cmd: string) => void;
  highlightedSection?: SectionId | null;
}

export function ChipNav({
  current,
  onNavigate,
  onCommand,
  highlightedSection,
}: ChipNavProps) {
  return (
    <div
      className="chips flex flex-wrap gap-1.5 px-(--pad-x) py-2"
      role="navigation"
      aria-label="section navigation"
    >
      {SECTIONS.map((s) => {
        const isActive = current === s.id;
        const isMatch = highlightedSection === s.id;
        const hasFocus =
          highlightedSection !== undefined && highlightedSection !== null;

        let className =
          "chip inline-flex items-center gap-1.5 px-2.5 py-1 bg-bg1 border border-rule rounded-xs text-dim text-[11.5px] tracking-[0.02em] transition-[color,border-color,background] duration-150";

        if (isActive) {
          className =
            "chip active inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-xs text-[11.5px] tracking-[0.02em] transition-[color,border-color,background] duration-150 text-accent border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_4%,transparent)]";
        } else if (hasFocus && isMatch) {
          className =
            "chip match inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-xs text-[11.5px] tracking-[0.02em] transition-[color,border-color,background] duration-150 text-accent border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--accent)_6%,transparent)]";
        } else if (hasFocus) {
          className =
            "chip dim inline-flex items-center gap-1.5 px-2.5 py-1 bg-bg1 border border-rule rounded-xs text-dim text-[11.5px] tracking-[0.02em] transition-[color,border-color,background] duration-150 opacity-30";
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
        className="chip cmd inline-flex items-center gap-1.5 px-2.5 py-1 bg-bg1 border border-rule rounded-xs text-faint text-[11.5px] tracking-[0.02em] opacity-60 transition-[color,border-color,background,opacity] duration-150 hover:text-accent hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:opacity-100"
        onClick={() => onCommand(":resume")}
        aria-label="download résumé"
      >
        :resume
      </button>
      <button
        className="chip cmd inline-flex items-center gap-1.5 px-2.5 py-1 bg-bg1 border border-rule rounded-xs text-faint text-[11.5px] tracking-[0.02em] opacity-60 transition-[color,border-color,background,opacity] duration-150 hover:text-accent hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:opacity-100"
        onClick={() => onCommand(":contact")}
        aria-label="open contact info"
      >
        :contact
      </button>
      <button
        className="chip cmd inline-flex items-center gap-1.5 px-2.5 py-1 bg-bg1 border border-rule rounded-xs text-faint text-[11.5px] tracking-[0.02em] opacity-60 transition-[color,border-color,background,opacity] duration-150 hover:text-accent hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] hover:opacity-100"
        onClick={() => onCommand(":log")}
        aria-label="view activity log"
      >
        :log
      </button>
    </div>
  );
}
