interface Day {
  date: string;
  contributionCount: number;
}

interface Week {
  contributionDays: Day[];
}

interface Props {
  weeks: Week[];
}

function intensity(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

const CELL_COLORS: Record<number, string> = {
  0: "bg-bg2",
  1: "bg-[color-mix(in_srgb,var(--accent)_18%,transparent)]",
  2: "bg-[color-mix(in_srgb,var(--accent)_38%,transparent)]",
  3: "bg-[color-mix(in_srgb,var(--accent)_65%,transparent)]",
  4: "bg-accent",
};

export function ContribHeatmap({ weeks }: Props) {
  if (!weeks.length) return null;

  // Flatten all days into one array
  const days = weeks.flatMap((w) => w.contributionDays);

  // Pad to the next multiple of 7 so the grid is always a clean rectangle
  const remainder = days.length % 7;
  const padCount = remainder === 0 ? 0 : 7 - remainder;
  const paddedDays: (Day | null)[] = [...days, ...Array(padCount).fill(null)];

  // Chunk into columns of 7 (rows = days of week, columns = weeks)
  const columns: (Day | null)[][] = [];
  for (let i = 0; i < paddedDays.length; i += 7) {
    columns.push(paddedDays.slice(i, i + 7));
  }

  const numCols = columns.length;

  return (
    <div
      className="mt-2.5 w-full"
      style={{ display: "grid", gridTemplateColumns: `repeat(${numCols}, 1fr)`, gridTemplateRows: "repeat(7, 1fr)", gridAutoFlow: "column", gap: "1px" }}
      aria-label="GitHub contribution heatmap"
      role="img"
    >
      {columns.map((col, ci) =>
        col.map((day, di) => {
          if (!day) {
            return (
              <div
                key={`${ci}-${di}`}
                className="rounded-[0.5px] border border-rule2"
                style={{ aspectRatio: "1" }}
              />
            );
          }
          const lvl = intensity(day.contributionCount);
          return (
            <div
              key={day.date}
              className={`rounded-[0.5px] ${CELL_COLORS[lvl]}`}
              style={{ aspectRatio: "1" }}
              title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
            />
          );
        })
      )}
    </div>
  );
}
