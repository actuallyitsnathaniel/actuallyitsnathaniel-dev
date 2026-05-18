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
  1: "bg-[color-mix(in_srgb,var(--accent)_35%,transparent)]",
  2: "bg-[color-mix(in_srgb,var(--accent)_64%,transparent)]",
  3: "bg-[color-mix(in_srgb,var(--accent)_100%,transparent)]",
  4: "bg-[var(--accent)]",
};

const SKELETON_COLS = 52;
const SKELETON_CELLS = SKELETON_COLS * 7;

const BASE_NOISE = Array.from({ length: SKELETON_CELLS }, () => Math.random());

// per-cell reveal jitter: each cell reveals at a slightly different point in the sweep
const REVEAL_JITTER = Array.from(
  { length: SKELETON_CELLS },
  () => (Math.random() - 0.5) * 18,
);

// per-cell random phase so each lit cell pulses independently
const PULSE_PHASE = Array.from(
  { length: SKELETON_CELLS },
  () => Math.random() * Math.PI * 2,
);

export function ContribHeatmap({ weeks, loading = false }: Props) {
  const offsetRef = useRef(0);
  const revealRef = useRef(-1);
  const dataReadyRef = useRef(false);
  const numColsRef = useRef(SKELETON_COLS);
  const rafRef = useRef<number>(0);
  const [, setTick] = useState(0);

  const days = weeks.flatMap((w) => w.contributionDays);
  const remainder = days.length % 7;
  const padCount = remainder === 0 ? 0 : 7 - remainder;
  const paddedDays: (Day | null)[] = [...days, ...Array(padCount).fill(null)];
  const realColumns: (Day | null)[][] = [];
  for (let i = 0; i < paddedDays.length; i += 7) {
    realColumns.push(paddedDays.slice(i, i + 7));
  }
  numColsRef.current = realColumns.length || SKELETON_COLS;

  // single rAF loop — starts on mount, never restarts
  useEffect(() => {
    let last = 0;
    function frame(now: number) {
      const dt = now - last;
      last = now;

      // noise wave always advances
      offsetRef.current = (offsetRef.current + dt * 0.02) % SKELETON_COLS;

      // reveal wave advances once data is ready
      if (dataReadyRef.current && revealRef.current < numColsRef.current) {
        if (revealRef.current < 0) revealRef.current = 0;
        revealRef.current += dt / 12;
      }

      // stop loop once reveal is complete
      if (revealRef.current >= numColsRef.current) {
        setTick((t) => t + 1);
        return;
      }

      setTick((t) => t + 1);
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // signal data ready — enforce 1.5s minimum animation time
  const loadStartRef = useRef(Date.now());
  useEffect(() => {
    if (!loading) {
      const elapsed = Date.now() - loadStartRef.current;
      const remaining = Math.max(0, 1500 - elapsed);
      if (remaining === 0) {
        dataReadyRef.current = true;
      } else {
        const t = setTimeout(() => {
          dataReadyRef.current = true;
        }, remaining);
        return () => clearTimeout(t);
      }
    }
  }, [loading]);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${SKELETON_COLS}, 1fr)`,
    gridTemplateRows: "repeat(7, 1fr)",
    gridAutoFlow: "column",
    gap: "1px",
  };

  const offset = offsetRef.current;
  const revealProgress = revealRef.current;

  return (
    <div
      className="mt-2.5 w-full"
      style={gridStyle}
      aria-label="GitHub contribution heatmap"
      role="img"
    >
      {Array.from({ length: SKELETON_CELLS }).map((_, i) => {
        const ci = Math.floor(i / 7);
        const di = i % 7;

        if (revealRef.current >= 0 && ci < revealProgress - REVEAL_JITTER[i]) {
          // revealed — show real data
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

        // unrevealed — animated noise wave
        const shiftedCol =
          (ci - Math.floor(offset) + SKELETON_COLS * 4) % SKELETON_COLS;
        const baseVal = BASE_NOISE[shiftedCol * 7 + di];
        const wave =
          0.5 +
          0.5 *
            Math.sin(
              (ci / SKELETON_COLS) * Math.PI * 4 -
                (offset / SKELETON_COLS) * Math.PI * 4,
            );
        const threshold = 0.78 - wave * 0.15;
        const lvl = (baseVal > threshold ? 1 : 0) as 0 | 1 | 2 | 3 | 4;
        const pulse =
          lvl === 1
            ? 0.72 + 0.28 * Math.sin(offset * 0.001 + PULSE_PHASE[i])
            : 1;
        return (
          <div
            key={i}
            className={`rounded-[0.5px] ${CELL_COLORS[lvl]}`}
            style={{ aspectRatio: "1", opacity: pulse }}
          />
        );
      })}
    </div>
  );
}
