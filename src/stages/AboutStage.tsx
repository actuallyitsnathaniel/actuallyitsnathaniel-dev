export function AboutStage() {
  return (
    <div className="about-grid">
      <h2>about</h2>
      <div className="lede">who i am and where i come from.</div>

      <p>
        i build backend infrastructure for systems that can't afford to fall over. four years in production at lightfeather —
        serverless aws, ci/cd pipelines, observability, the load-bearing parts of the stack. on the side, i build sites and
        small tools for independent musicians, because the people who make my favorite records shouldn't have to fight their own software.
      </p>

      <blockquote className="pull">
        the best engineering looks invisible — just as good production sits behind a song instead of in front of it.
      </blockquote>

      <div className="creds">
        <div className="cred-chip">
          <span className="dot" aria-hidden="true" />
          <span className="k">edu</span>
          <span className="v">azusa pacific university · b.s. computer science · 2021</span>
        </div>
        <div className="cred-chip">
          <span className="dot" aria-hidden="true" />
          <span className="k">exp</span>
          <span className="v">4 yrs production · lightfeather.io</span>
        </div>
        <div className="cred-chip">
          <span className="dot" aria-hidden="true" />
          <span className="k">loc</span>
          <span className="v">los angeles · pst</span>
        </div>
        <div className="cred-chip">
          <span className="dot" aria-hidden="true" />
          <span className="k">stack</span>
          <span className="v">react · node · aws · postgres</span>
        </div>
      </div>
    </div>
  );
}
