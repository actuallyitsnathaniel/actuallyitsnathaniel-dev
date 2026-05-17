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
        className="status-board"
        role="table"
        aria-label="infrastructure status"
      >
        <div className="sb-head" role="row">
          <div>service</div>
          <div>description</div>
          <div className="sb-metric">metric</div>
        </div>
        {ROWS.map((row) => {
          const visible = matchesRow(row);
          return (
            <div
              key={row.aliases[0]}
              className={`sb-row${visible ? "" : " hidden"}`}
              data-status={row.status}
              data-aliases={row.aliases.join(",")}
              role="row"
            >
              <div className="sb-svc">
                <span className="sb-dot" aria-hidden="true" />
                <span className="sb-name">{row.name}</span>
                <span className="sb-stat">{row.stat}</span>
              </div>
              <div className="sb-desc">{row.desc}</div>
              <div className="sb-metric">
                <span className={`m-v${row.metric.qualitative ? " m-q" : ""}`}>
                  {row.metric.v}
                  {row.metric.su && (
                    <span className="m-su"> {row.metric.su}</span>
                  )}
                </span>
                {row.metric.u && <span className="m-u">{row.metric.u}</span>}
              </div>
            </div>
          );
        })}
      </div>
      <p className="sb-foot">
        <span className="sb-foot-k">note</span>
        all metrics are real and defensible. enterprise rows show qualitative
        status.
      </p>
    </div>
  );
}
