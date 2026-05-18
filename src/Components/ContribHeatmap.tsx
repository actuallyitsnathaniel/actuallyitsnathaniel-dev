import { useEffect, useRef, useState } from "react";

interface Day {
  date: string;
  contributionCount: number;
}

interface Week {
  contributionDays: Day[];
}

interface Props {
  weeks: Week[];
  loading?: boolean;
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

const SKELETON_COLS = 52;
const SKELETON_CELLS = SKELETON_COLS * 7;

const BASE_NOISE = Array.from({ length: SKELETON_CELLS }, () => Math.random());

export function ContribHeatmap({ weeks, loading = false }: Props) {
  const [offset, setOffset] = useState(0);
  const [revealCol, setRevealCol] = useState(-1);
  const rafRef = useRef<number>(0);

  const days = weeks.flatMap((w) => w.contributionDays);
  const remainder = days.length % 7;
  const padCount = remainder === 0 ? 0 : 7 - remainder;
  const paddedDays: (Day | null)[] = [...days, ...Array(padCount).fill(null)];
  const realColumns: (Day | null)[][] = [];
  for (let i = 0; i < paddedDays.length; i += 7) {
    realColumns.push(paddedDays.slice(i, i + 7));
  }
  const numCols = realColumns.length || SKELETON_COLS;

  const noiseCeil = days.length
    ? Math.max(1, Math.floor(intensity(Math.max(...days.map((d) => d.contributionCount))) / 2))
    : 2;

  // noise wave while loading
  useEffect(() => {
    if (!loading) return;
    setRevealCol(-1);
    let last = 0;
    function tick(now: number) {
      if (now - last > 50) {
        setOffset((o) => (o + 1) % SKELETON_COLS);
        last = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loading]);

  // kick off reveal wave once data arrives
  useEffect(() => {
    if (loading) return;
    setRevealCol(0);
  }, [loading]);

  // advance reveal wave one column at a time
  useEffect(() => {
    if (revealCol < 0 || revealCol >= numCols) return;
    const id = setTimeout(() => setRevealCol((c) => c + 1), 12);
    return () => clearTimeout(id);
  }, [revealCol, numCols]);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${SKELETON_COLS}, 1fr)`,
    gridTemplateRows: "repeat(7, 1fr)",
    gridAutoFlow: "column",
    gap: "1px",
  };

  return (
    <div className="mt-2.5 w-full" style={gridStyle} aria-label="GitHub contribution heatmap" role="img">
      {Array.from({ length: SKELETON_CELLS }).map((_, i) => {
        const ci = Math.floor(i / 7);
        const di = i % 7;
        const revealed = revealCol >= 0 && ci < revealCol;

        if (revealed) {
          const day = realColumns[ci]?.[di] ?? null;
          if (!day) {
            return (
              <div
                key={i}
                className="rounded-[0.5px] border border-rule2"
                style={{ aspectRatio: "1" }}
              />
            );
          }
          const lvl = intensity(day.contributionCount);
          return (
            <div
              key={i}
              className={`rounded-[0.5px] ${CELL_COLORS[lvl]}`}
              style={{ aspectRatio: "1" }}
              title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
            />
          );
        }

        // noise
        const shiftedCol = (ci + offset) % SKELETON_COLS;
        const baseVal = BASE_NOISE[shiftedCol * 7 + di];
        const wave = 0.5 + 0.5 * Math.sin((ci / SKELETON_COLS) * Math.PI * 4 - (offset / SKELETON_COLS) * Math.PI * 4);
        const lvl = Math.min(4, Math.round(baseVal * wave * noiseCeil)) as 0 | 1 | 2 | 3 | 4;
        return (
          <div
            key={i}
            className={`rounded-[0.5px] ${CELL_COLORS[lvl]}`}
            style={{ aspectRatio: "1" }}
          />
        );
      })}
    </div>
  );
}
