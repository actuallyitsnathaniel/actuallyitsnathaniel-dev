import { useActivityLog } from "../context/ActivityLogContext";

interface WorkEntry {
  ver: string;
  date: string;
  name: string;
  tag: string;
  role: string;
  stack: string;
  liveUrl?: string;
  bullets: Array<{ type: "add" | "note"; text: string }>;
  aliases: string[];
}

const ENTRIES: WorkEntry[] = [
  {
    ver: "v0.5.0",
    date: "2026–present",
    name: "jessica lea mayfield",
    tag: "full-stack · musician site",
    role: "full-stack engineer",
    stack:
      "react · typescript · vite · tailwindcss · strapi · railway · supabase · vercel",
    liveUrl: "https://jessicaleamayfieldofficial.com",
    aliases: ["jlm", "jessica", "mayfield"],
    bullets: [
      {
        type: "add",
        text: "built and maintained the full-stack site — frontend (react/ts), headless strapi cms, and cloud deployment on aws/vercel.",
      },
      {
        type: "add",
        text: "implemented lazy loading and image optimization for fast load times on mobile.",
      },
      {
        type: "add",
        text: "built real-time integrations for tour dates and content updates.",
      },
      {
        type: "add",
        text: "3k+ readers/mo on integrated blog — content managed directly in strapi.",
      },
      {
        type: "add",
        text: "custom contact forms, seo-optimized landing pages, 90+ lighthouse seo score.",
      },
      {
        type: "note",
        text: "image converter integrated inside the upload stream — −50% remote bucket storage vs. naive uploads.",
      },
    ],
  },
  {
    ver: "v0.4.0",
    date: "2023",
    name: "sahil jindal",
    tag: "full-stack · composer · SPA",
    role: "full-stack engineer",
    stack:
      "react · typescript · vite · tailwindcss · strapi · railway · supabase · vercel",
    liveUrl: "https://sahiljindal.com",
    aliases: ["sahil", "jindal", "composer"],
    bullets: [
      {
        type: "add",
        text: "single-page web app for composer with credits across netflix, dreamworks, and amazon prime.",
      },
      {
        type: "add",
        text: "custom audio player fitted for both mobile and desktop.",
      },
      {
        type: "add",
        text: "headless strapi cms so sahil manages his own content and credits without engineering support.",
      },
      {
        type: "note",
        text: "same image converter pipeline as jlm — deployed consistently across all strapi sites.",
      },
    ],
  },
  {
    ver: "v0.3.0",
    date: "2024-present",
    name: "dave wilbert music",
    tag: "custom shopify · popular country artist",
    role: "full-stack engineer · designer",
    stack: "shopify · liquid · custom theme · bandsintown api",
    liveUrl: "https://davewilbertmusic.com",
    aliases: ["dave", "wilbert", "shopify", "liquid"],
    bullets: [
      {
        type: "add",
        text: "shopify website built entirely from the ground up in liquid — the entire theme is custom, zero boilerplate.",
      },
      {
        type: "add",
        text: "designed entirely by me — layout, typography, color system, component library.",
      },
      {
        type: "add",
        text: "fully-custom audio player showcasing previews of his latest record.",
      },
      {
        type: "add",
        text: "site architected so any content editor familiar with the shopify theme editor can make deep changes.",
      },
      {
        type: "add",
        text: "custom tour dates page using bandsintown api — dramatically better than their embed widget.",
      },
      {
        type: "note",
        text: "saved hundreds in shopify app costs by implementing equivalent features natively.",
      },
    ],
  },
  {
    ver: "v0.2.0",
    date: "2023",
    name: "john white music",
    tag: "full-stack · songwriter",
    role: "full-stack engineer · designer",
    stack:
      "react · typescript · vite · tailwindcss · strapi · railway · supabase · vercel · bandsintown api",
    liveUrl: "https://johnwhitemusic.com",
    aliases: ["john", "white", "songwriter"],
    bullets: [
      {
        type: "add",
        text: "custom website with headless strapi cms — john manages his own content.",
      },
      {
        type: "add",
        text: "bandsintown tour component, stylized to fit the site theme (which i also designed).",
      },
      {
        type: "add",
        text: "custom discography component — metadata, platform links, streamlined ux so any user can click/tap directly to the song they want on their preferred platform.",
      },
      {
        type: "note",
        text: "discography component's design iterated from ryland and reused here with theme-specific tweaks.",
      },
    ],
  },
  {
    ver: "v0.1.0",
    date: "2022",
    name: "ryland",
    tag: "full-stack · indie alt band",
    role: "full-stack engineer · designer",
    stack:
      "react · typescript · vite · tailwindcss · strapi · railway · supabase · vercel · bandsintown api",
    liveUrl: "https://rylandband.com",
    aliases: ["ryland", "band", "origin"],
    bullets: [
      {
        type: "add",
        text: "the first site to feature the custom bandsintown component — now reused across the entire artist-sites portfolio.",
      },
      {
        type: "add",
        text: "the first to feature the custom discography component — same story.",
      },
      {
        type: "add",
        text: "headless strapi cms for content editing and updates.",
      },
      {
        type: "note",
        text: "this is the origin. every pattern (tour dates, discography, strapi cms, image pipeline) traces back to this build.",
      },
    ],
  },
];

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
  const query =
    filter.startsWith(":") || filter.startsWith("~")
      ? ""
      : filter.toLowerCase().trim();

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
                  screenshot · {entry.name}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
