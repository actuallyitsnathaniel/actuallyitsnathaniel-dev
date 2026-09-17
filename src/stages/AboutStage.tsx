import { ABOUT } from "../lib/about";

export function AboutStage() {
  return (
    <div className="grid grid-cols-1 gap-5.5">
      <h2>about</h2>
      <p>
        {ABOUT.bio} <i>{ABOUT.tagline}</i>
      </p>
      <div className="flex gap-2 flex-wrap mt-1.5">
        {ABOUT.facts.map((fact) => (
          <div
            key={fact.label}
            className="inline-flex items-center gap-2 bg-bg2 border border-rule2 rounded-xs px-2.5 py-1.25 text-[11px] tracking-[0.06em] text-dim"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]"
              aria-hidden="true"
            />
            <span className="text-faint uppercase text-[10px] tracking-[0.16em]">
              {fact.label}
            </span>
            <span className="text-ink">{fact.value}</span>
          </div>
        ))}
      </div>
      <section
        id="note"
        className="grid grid-cols-1 gap-1 pt-5.5 mt-2 border-t border-rule"
      >
        <h3 className="font-display font-normal text-t18 leading-tight m-0 mb-2 text-ink tracking-[0.02em]">
          {ABOUT.noteTitle}
        </h3>
        {ABOUT.note.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </section>
    </div>
  );
}
