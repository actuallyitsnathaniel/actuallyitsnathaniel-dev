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

// Maps contribution count to one of 5 intensity levels
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

  return (
    <div
      className="flex gap-px mt-2.5"
      aria-label="GitHub contribution heatmap"
      role="img"
    >
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-px">
          {week.contributionDays.map((day) => {
            const lvl = intensity(day.contributionCount);
            return (
              <div
                key={day.date}
                className={`w-[3px] h-[3px] rounded-[0.5px] ${CELL_COLORS[lvl]}`}
                title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
