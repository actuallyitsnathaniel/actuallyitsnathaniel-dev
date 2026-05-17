export function AboutStage() {
  return (
    <div className="grid grid-cols-1 gap-5.5">
      <h2>about</h2>
      <p>
        i build backend infrastructure for systems that can't afford to fall
        over. four years in production at lightfeather — serverless aws, ci/cd
        pipelines, observability, the load-bearing parts of the stack. on the
        side, i build sites and small tools for independent musicians, because
        the people who make my favorite records shouldn't have to fight their
        own software.{" "}
        <i>
          the best engineering looks invisible — just as good production sits
          behind a song instead of in front of it.
        </i>
      </p>

      <div className="flex gap-2 flex-wrap mt-1.5">
        <div className="inline-flex items-center gap-2 bg-bg2 border border-rule2 rounded-xs px-2.5 py-1.25 text-[11px] tracking-[0.06em] text-dim">
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]"
            aria-hidden="true"
          />
          <span className="text-faint uppercase text-[10px] tracking-[0.16em]">
            edu
          </span>
          <span className="text-ink">
            azusa pacific university · b.s. computer science · 2021
          </span>
        </div>
        <div className="inline-flex items-center gap-2 bg-bg2 border border-rule2 rounded-xs px-2.5 py-1.25 text-[11px] tracking-[0.06em] text-dim">
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]"
            aria-hidden="true"
          />
          <span className="text-faint uppercase text-[10px] tracking-[0.16em]">
            exp
          </span>
          <span className="text-ink">4 yrs production · lightfeather.io</span>
        </div>
        <div className="inline-flex items-center gap-2 bg-bg2 border border-rule2 rounded-xs px-2.5 py-1.25 text-[11px] tracking-[0.06em] text-dim">
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]"
            aria-hidden="true"
          />
          <span className="text-faint uppercase text-[10px] tracking-[0.16em]">
            loc
          </span>
          <span className="text-ink">los angeles · pst</span>
        </div>
        <div className="inline-flex items-center gap-2 bg-bg2 border border-rule2 rounded-xs px-2.5 py-1.25 text-[11px] tracking-[0.06em] text-dim">
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]"
            aria-hidden="true"
          />
          <span className="text-faint uppercase text-[10px] tracking-[0.16em]">
            stack
          </span>
          <span className="text-ink">react · node · aws · postgres</span>
        </div>
      </div>
    </div>
  );
}
