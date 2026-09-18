import { useActivityLog } from "../context/ActivityLogContext";
import { PROJECTS, type ProjectEntry } from "../lib/projects";
import shotJlm from "../assets/images/work/jlm.webm";
import shotSahil from "../assets/images/work/sahil.webm";
import shotDave from "../assets/images/work/dave.webm";
import shotJohn from "../assets/images/work/john.webm";
import shotRyland from "../assets/images/work/ryland.webm";

const SCREENSHOTS: Record<string, string> = {
  jlm: shotJlm,
  sahil: shotSahil,
  dave: shotDave,
  john: shotJohn,
  ryland: shotRyland,
};

type WorkEntry = ProjectEntry;

const ENTRIES: WorkEntry[] = PROJECTS;

interface WorkStageProps {
  filter: string;
  openEntries: string[];
  onToggleEntry: (alias: string) => void;
}

export function WorkStage({
  filter,
  openEntries,
  onToggleEntry,
}: WorkStageProps) {
  const { log } = useActivityLog();
  const query = filter.toLowerCase().trim();

  const matchesEntry = (entry: WorkEntry): boolean => {
    if (!query) return true;
    return (
      entry.name.toLowerCase().includes(query) ||
      entry.tag.toLowerCase().includes(query) ||
      entry.ver.toLowerCase().includes(query) ||
      entry.aliases.some((a) => a.includes(query))
    );
  };

  const visibleEntries = ENTRIES.filter(matchesEntry);
  const autoExpand =
    query && visibleEntries.length === 1 ? visibleEntries[0].aliases[0] : null;

  const handleToggle = (entry: WorkEntry) => {
    const isOpen = openEntries.includes(entry.aliases[0]);
    log(
      "event",
      `changelog · ${isOpen ? "collapsed" : "expanded"} · ${entry.name}`,
    );
    onToggleEntry(entry.aliases[0]);
  };

  return (
    <div>
      <h2>work</h2>
      <div className="lede">selected projects. newest first.</div>
      <ol
        className="list-none p-0 mt-5.5 border-t border-rule"
        aria-label="project changelog"
      >
        {ENTRIES.map((entry) => {
          const alias = entry.aliases[0];
          const isOpen = openEntries.includes(alias) || autoExpand === alias;
          const visible = matchesEntry(entry);
          if (!visible) return null;
          return (
            <li
              key={alias}
              className={`border-b border-rule transition-[background] duration-150 ${isOpen ? "open" : ""} hover:bg-[rgba(255,255,255,0.012)]`}
              data-aliases={entry.aliases.join(",")}
            >
              {/* cl-head — grid layout kept in CSS for sm media query grid-template-areas */}
              <div
                className="cl-head grid gap-4.5 items-baseline px-1 py-4 cursor-pointer select-none"
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => handleToggle(entry)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && handleToggle(entry)
                }
              >
                <span className="cl-ver text-accent text-t12 tracking-[0.04em]">
                  {entry.ver}
                </span>
                <span className="cl-date text-faint text-[11px] tracking-[0.06em]">
                  {entry.date}
                </span>
                <span className="cl-name text-ink text-t14">{entry.name}</span>
                <span className="cl-tag text-dim text-[10.5px] tracking-[0.14em] uppercase px-2 py-0.75 bg-bg2 border border-rule2 rounded-xs justify-self-end">
                  {entry.tag}
                </span>
                <span
                  className={`cl-toggle text-[11px] text-right transition-[color] duration-120 ${isOpen ? "text-accent" : "text-faint"}`}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </div>
              <div className={`px-1 pb-5.5 ${isOpen ? "block" : "hidden"}`}>
                <div className="flex gap-5.5 flex-wrap py-1 pb-3.5 text-[11.5px] text-dim border-b border-dashed border-rule mb-3.5">
                  <span>
                    <span className="text-faint uppercase tracking-[0.14em] text-[10px] mr-2">
                      role
                    </span>
                    {entry.role}
                  </span>
                  <span>
                    <span className="text-faint uppercase tracking-[0.14em] text-[10px] mr-2">
                      stack
                    </span>
                    {entry.stack}
                  </span>
                  {entry.liveUrl && (
                    <span>
                      <span className="text-faint uppercase tracking-[0.14em] text-[10px] mr-2">
                        live
                      </span>
                      <a
                        href={entry.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                      >
                        {entry.liveUrl.replace("https://", "")} ↗
                      </a>
                    </span>
                  )}
                </div>
                <ul className="list-none p-0 mb-4">
                  {entry.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[18px_1fr] gap-1 py-1 text-t14 leading-[1.55] text-pretty"
                    >
                      <span
                        className={`font-semibold ${b.type === "add" ? "text-accent" : "text-faint"}`}
                      >
                        {b.type === "add" ? "+" : "~"}
                      </span>
                      <span
                        className={b.type === "note" ? "text-dim" : "text-ink"}
                      >
                        {b.text}
                      </span>
                    </li>
                  ))}
                </ul>
                {/* cl-shot — kept in CSS: complex diagonal stripe background */}
                <div className="cl-shot" aria-hidden="true">
                  {SCREENSHOTS[alias] ? (
                    <video
                      src={SCREENSHOTS[alias]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="cl-shot-video"
                    />
                  ) : (
                    `screenshot · ${entry.name}`
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
