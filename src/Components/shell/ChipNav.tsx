import { SECTIONS, type SectionId } from "../../lib/sections";

interface ChipNavProps {
  current: SectionId;
  onNavigate: (id: SectionId) => void;
  onCommand: (cmd: string) => void;
  highlightedSection?: SectionId | null;
}

export function ChipNav({ current, onNavigate, onCommand, highlightedSection }: ChipNavProps) {
  return (
    <div className="chips" role="navigation" aria-label="section navigation">
      {SECTIONS.map(s => {
        const isActive = current === s.id;
        const isMatch = highlightedSection === s.id;
        let cls = "chip";
        if (isActive) cls += " active";
        else if (highlightedSection !== undefined && highlightedSection !== null) {
          cls += isMatch ? " match" : " dim";
        }
        return (
          <button
            key={s.id}
            className={cls}
            onClick={() => onNavigate(s.id)}
            aria-current={isActive ? "page" : undefined}
            aria-label={`navigate to ${s.path}`}
          >
            {s.label}
          </button>
        );
      })}
      <span className="chip sep" aria-hidden="true">|</span>
      <button className="chip cmd" onClick={() => onCommand(":resume")} aria-label="download résumé">
        :resume
      </button>
      <button className="chip cmd" onClick={() => onCommand(":contact")} aria-label="open contact info">
        :contact
      </button>
    </div>
  );
}
