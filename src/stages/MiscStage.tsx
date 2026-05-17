import faveSongWebp from "/src/assets/images/kora.webp";

const SONG = {
  title: "Kora",
  artist: "Skrillex, Varg² , Eurohead, SIIICKBRAIN, swedm",
  artwork: faveSongWebp,
  spotify: "https://open.spotify.com/track/4BJ5k8vAGaHHW5KFksavW2",
  apple: "https://music.apple.com/us/song/kora/1867888654",
  tidal: "https://listen.tidal.com/track/488528581",
  youtube: "https://youtu.be/k3r0Jx4d1xc?si=rGbC9v02ThkJ5TSt",
};

export function MiscStage() {
  return (
    <div>
      {/* misc-stage h2 overrides .stage h2 — kept as inline override */}
      <h2
        style={{
          fontFamily: "var(--mono)",
          fontWeight: 500,
          fontSize: "var(--t-18)",
          letterSpacing: "0.02em",
        }}
      >
        // miscellaneous
      </h2>
      <div className="lede">what's playing. what i'm into.</div>

      {/* transmission grid: 2-col → 1-col at sm (600px — use arbitrary breakpoint) */}
      <div className="mt-2 grid grid-cols-[200px_1fr] gap-[36px] items-center pt-[28px] pb-3 max-[600px]:grid-cols-1 max-[600px]:gap-6 max-[600px]:pt-[18px]">
        {/* vinyl — ALL vinyl classes STAY IN CSS */}
        <a
          className="vinyl"
          href={SONG.spotify}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`listen to ${SONG.title} by ${SONG.artist} on spotify`}
        >
          <div className="vinyl-disc">
            <div className="vinyl-label">
              <img
                src={SONG.artwork}
                alt={`${SONG.title} album artwork`}
                width="78"
                height="78"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="vinyl-spindle" aria-hidden="true" />
          <div className="vinyl-needle" aria-hidden="true" />
        </a>

        <div>
          <div className="text-accent text-[10.5px] tracking-[0.18em] uppercase mb-[6px]">
            currently obsessed with
          </div>
          <div className="font-display font-normal text-[46px] leading-none m-0 mb-[6px] text-ink">
            {SONG.title}
          </div>
          <div className="text-dim text-t14 tracking-[0.04em] mb-[18px]">
            {SONG.artist}
          </div>
          <div className="flex gap-[6px] flex-wrap mb-[22px]">
            <a
              className="inline-flex items-center px-[10px] py-[5px] bg-bg2 border border-rule2 rounded-[2px] text-[11px] tracking-[0.04em] text-dim transition-[color,border-color] duration-[120ms] no-underline hover:text-accent hover:border-[rgba(126,231,135,0.4)]"
              href={SONG.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              spotify ↗
            </a>
            <a
              className="inline-flex items-center px-[10px] py-[5px] bg-bg2 border border-rule2 rounded-[2px] text-[11px] tracking-[0.04em] text-dim transition-[color,border-color] duration-[120ms] no-underline hover:text-accent hover:border-[rgba(126,231,135,0.4)]"
              href={SONG.apple}
              target="_blank"
              rel="noopener noreferrer"
            >
              apple music ↗
            </a>
            <a
              className="inline-flex items-center px-[10px] py-[5px] bg-bg2 border border-rule2 rounded-[2px] text-[11px] tracking-[0.04em] text-dim transition-[color,border-color] duration-[120ms] no-underline hover:text-accent hover:border-[rgba(126,231,135,0.4)]"
              href={SONG.tidal}
              target="_blank"
              rel="noopener noreferrer"
            >
              tidal ↗
            </a>
            <a
              className="inline-flex items-center px-2.5 py-[5px] bg-bg2 border border-rule2 rounded-[2px] text-[11px] tracking-[0.04em] text-dim transition-[color,border-color] duration-[120ms] no-underline hover:text-accent hover:border-[rgba(126,231,135,0.4)]"
              href={SONG.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              youtube ↗
            </a>
          </div>
          <div className="pt-[14px] border-t border-dashed border-rule text-faint text-[10.5px] tracking-[0.06em] uppercase">
            <span className="text-accent mr-[10px]">eof</span>
            transmission end · v3.0.0 · nathaniel bowman
          </div>
        </div>
      </div>
    </div>
  );
}
