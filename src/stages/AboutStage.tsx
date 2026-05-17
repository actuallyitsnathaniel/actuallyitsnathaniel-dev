export function AboutStage() {
  return (
    <div className="grid grid-cols-1 gap-[22px]">
      <h2>about</h2>
      <div className="lede">who i am and where i come from.</div>

      <p>
        i build backend infrastructure for systems that can't afford to fall over. four years in production at lightfeather —
        serverless aws, ci/cd pipelines, observability, the load-bearing parts of the stack. on the side, i build sites and
        small tools for independent musicians, because the people who make my favorite records shouldn't have to fight their own software.
      </p>

      <blockquote className="border-l-[2px] border-accent pl-[18px] py-2 m-0 text-ink text-t18 leading-[1.55] not-italic max-w-[56ch] text-pretty">
        the best engineering looks invisible — just as good production sits behind a song instead of in front of it.
      </blockquote>

      <div className="flex gap-2 flex-wrap mt-[6px]">
        <div className="inline-flex items-center gap-2 bg-bg2 border border-rule2 rounded-[2px] px-[10px] py-[5px] text-[11px] tracking-[0.06em] text-dim">
          <span className="w-[6px] h-[6px] rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" aria-hidden="true" />
          <span className="text-faint uppercase text-[10px] tracking-[0.16em]">edu</span>
          <span className="text-ink">azusa pacific university · b.s. computer science · 2021</span>
        </div>
        <div className="inline-flex items-center gap-2 bg-bg2 border border-rule2 rounded-[2px] px-[10px] py-[5px] text-[11px] tracking-[0.06em] text-dim">
          <span className="w-[6px] h-[6px] rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" aria-hidden="true" />
          <span className="text-faint uppercase text-[10px] tracking-[0.16em]">exp</span>
          <span className="text-ink">4 yrs production · lightfeather.io</span>
        </div>
        <div className="inline-flex items-center gap-2 bg-bg2 border border-rule2 rounded-[2px] px-[10px] py-[5px] text-[11px] tracking-[0.06em] text-dim">
          <span className="w-[6px] h-[6px] rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" aria-hidden="true" />
          <span className="text-faint uppercase text-[10px] tracking-[0.16em]">loc</span>
          <span className="text-ink">los angeles · pst</span>
        </div>
        <div className="inline-flex items-center gap-2 bg-bg2 border border-rule2 rounded-[2px] px-[10px] py-[5px] text-[11px] tracking-[0.06em] text-dim">
          <span className="w-[6px] h-[6px] rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" aria-hidden="true" />
          <span className="text-faint uppercase text-[10px] tracking-[0.16em]">stack</span>
          <span className="text-ink">react · node · aws · postgres</span>
        </div>
      </div>
    </div>
  );
}
