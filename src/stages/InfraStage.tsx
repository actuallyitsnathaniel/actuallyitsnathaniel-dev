interface InfraRow {
  status: "green" | "amber";
  name: string;
  stat: string;
  desc: string;
  metric: { v: string; su?: string; u?: string; qualitative?: boolean };
  aliases: string[];
}

const ROWS: InfraRow[] = [
  {
    status: "green",
    name: "performance + seo",
    stat: "operational",
    desc: "actively boosting seo scores across multiple artist websites — beating many shopify, cargo, and wordpress templates.",
    metric: { v: "90+", su: "", u: "lighthouse seo" },
    aliases: ["seo", "lighthouse", "performance", "speed", "vitals"],
  },
  {
    status: "green",
    name: "audience tooling",
    stat: "operational",
    desc: "successfully integrated a blog that is read regularly by fans for jessica lea mayfield — content managed directly in strapi.",
    metric: { v: "3k+", su: "readers", u: "per month · jlm blog" },
    aliases: ["audience", "blog", "readers", "content"],
  },
  {
    status: "green",
    name: "media pipeline",
    stat: "operational",
    desc: "implemented an image converter inside a headless cms that operates within the upload stream, conserving remote bucket storage.",
    metric: { v: "−50%", su: "", u: "storage spend" },
    aliases: ["media", "image", "images", "pipeline", "storage", "cms"],
  },
  {
    status: "green",
    name: "open-source tooling",
    stat: "operational",
    desc: "saving hundreds of dollars for every client by screening and implementing top-tier open-source tools over costly proprietary alternatives.",
    metric: { v: "$100s", su: "", u: "saved · per client" },
    aliases: ["opensource", "tools", "tooling", "cost", "savings"],
  },
  {
    status: "green",
    name: "ci / cd",
    stat: "operational",
    desc: "jenkins → harness pipeline standardization at lightfeather — reduced deployment friction across government and commercial clients.",
    metric: { v: "enterprise", qualitative: true, u: "2021–present" },
    aliases: [
      "cicd",
      "ci",
      "cd",
      "deploy",
      "deployment",
      "pipeline",
      "jenkins",
      "harness",
    ],
  },
  {
    status: "green",
    name: "observability",
    stat: "operational",
    desc: "production monitoring with new relic and splunk — proactively catching regressions before they reach end users.",
    metric: { v: "enterprise", qualitative: true, u: "always-on" },
    aliases: [
      "observability",
      "monitoring",
      "alerts",
      "newrelic",
      "splunk",
      "logs",
    ],
  },
];

interface InfraStageProps {
  filter: string;
}

export function InfraStage({ filter }: InfraStageProps) {
  const query =
    filter.startsWith(":") || filter.startsWith("~")
      ? ""
      : filter.toLowerCase().trim();

  const matchesRow = (row: InfraRow): boolean => {
    if (!query) return true;
    return (
      row.name.toLowerCase().includes(query) ||
      row.desc.toLowerCase().includes(query) ||
      row.aliases.some((a) => a.includes(query))
    );
  };

  return (
    <div>
      <h2>infra</h2>
      <div className="lede">
        systems i've shipped and maintained. metrics are real.
      </div>
      <div
        className="mt-4.5 border border-rule rounded-[3px] overflow-hidden bg-bg1"
        role="table"
        aria-label="infrastructure status"
      >
        {/* header row — hidden on mobile */}
        <div
          className="grid grid-cols-[240px_1fr_160px] gap-4.5 px-4 py-2.5 bg-bg2 border-b border-rule text-[10px] tracking-[0.18em] uppercase text-faint md:hidden"
          role="row"
        >
          <div>service</div>
          <div>description</div>
          <div className="text-right">metric</div>
        </div>

        {ROWS.map((row) => {
          const visible = matchesRow(row);
          return (
            <div
              key={row.aliases[0]}
              className={`grid grid-cols-[240px_1fr_160px] gap-4.5 px-4 py-3.5 border-b border-rule last:border-b-0 items-center transition-[background] duration-120 hover:bg-[rgba(255,255,255,0.012)] md:grid-cols-1 md:gap-1.5 md:px-3.5 ${visible ? "" : "hidden"}`}
              data-status={row.status}
              data-aliases={row.aliases.join(",")}
              role="row"
            >
              <div className="flex items-center gap-2.5">
                {/* sb-dot color controlled by data-status CSS selectors */}
                <span
                  className="sb-dot w-2 h-2 rounded-full shrink-0"
                  aria-hidden="true"
                />
                <span className="text-ink text-t14">{row.name}</span>
                <span
                  className={`ml-auto text-[9.5px] tracking-[0.18em] uppercase md:ml-0 md:pl-4.5 ${row.status === "amber" ? "text-warn" : "text-faint"}`}
                >
                  {row.stat}
                </span>
              </div>
              <div className="text-dim text-t14 leading-normal text-pretty">
                {row.desc}
              </div>
              <div className="text-right flex flex-col items-end gap-0.5 md:text-left md:items-start md:pl-4.5">
                <span
                  className={`text-ink font-medium ${row.metric.qualitative ? "text-[12px] font-normal tracking-[0.14em] uppercase text-dim" : "text-t18"}`}
                >
                  {row.metric.v}
                  {row.metric.su && (
                    <span className="text-faint text-[12px] font-normal ml-px">
                      {" "}
                      {row.metric.su}
                    </span>
                  )}
                </span>
                {row.metric.u && (
                  <span className="text-faint text-[9.5px] tracking-[0.16em] uppercase">
                    {row.metric.u}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3.5 text-[11px] text-faint">
        <span className="text-accent uppercase tracking-[0.16em] text-[9.5px] mr-2.5">
          note
        </span>
        all metrics are real and defensible. enterprise rows show qualitative
        status.
      </p>
    </div>
  );
}
