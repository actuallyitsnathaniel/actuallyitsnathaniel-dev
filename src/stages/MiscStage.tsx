import faveSongWebp from "/src/assets/images/dolphin-600x600bb.webp";

const SONG = {
  title: "Hard to Pretend",
  artist: "Tennyson, Leslie",
  artwork: faveSongWebp,
  spotify: "https://open.spotify.com/track/1zPak0T7bSZGbIx5GJNiSH",
  apple: "https://music.apple.com/us/song/hard-to-pretend/1764952014",
  tidal: "https://listen.tidal.com/track/383356090",
  youtube: "https://www.youtube.com/watch?v=MR_C21-PmWs",
};

export function MiscStage() {
  return (
    <div className="misc-stage">
      <h2>// miscellaneous</h2>
      <div className="lede">what's playing. what i'm into.</div>

      <div className="transmission">
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
                width="78" height="78"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="vinyl-spindle" aria-hidden="true" />
          <div className="vinyl-needle" aria-hidden="true" />
        </a>

        <div>
          <div className="tx-tag">currently obsessed with</div>
          <div className="tx-title">{SONG.title}</div>
          <div className="tx-artist">{SONG.artist}</div>
          <div className="tx-platforms">
            <a className="tx-p" href={SONG.spotify} target="_blank" rel="noopener noreferrer">spotify ↗</a>
            <a className="tx-p" href={SONG.apple} target="_blank" rel="noopener noreferrer">apple music ↗</a>
            <a className="tx-p" href={SONG.tidal} target="_blank" rel="noopener noreferrer">tidal ↗</a>
            <a className="tx-p" href={SONG.youtube} target="_blank" rel="noopener noreferrer">youtube ↗</a>
          </div>
          <div className="tx-foot">
            <span className="tx-foot-k">eof</span>
            transmission end · v3.0.0-c · nathaniel bowman
          </div>
        </div>
      </div>
    </div>
  );
}
