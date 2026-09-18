import faveSongWebp from "/src/assets/images/kora.webp";
import magnificaCover from "/src/assets/images/magnifica-humanitas.webp";

const SONG = {
  title: "Kora",
  artist: "Skrillex, Varg² , Eurohead, SIIICKBRAIN, swedm",
  artwork: faveSongWebp,
  spotify: "https://open.spotify.com/track/4BJ5k8vAGaHHW5KFksavW2",
  apple: "https://music.apple.com/us/song/kora/1867888654",
  tidal: "https://listen.tidal.com/track/488528581",
  youtube: "https://youtu.be/k3r0Jx4d1xc?si=rGbC9v02ThkJ5TSt",
};

const BOOK = {
  title: "Magnifica Humanitas (Word on Fire edition)",
  subtitle:
    "On Safeguarding the Human Person in the Time of Artificial Intelligence",
  author: "Pope Leo XIV",
  cover: magnificaCover,
  note: "leo xiv on ai, dignity, labor, and the person. he quotes Tolkien, it's awesome.",
  format:
    "the letter is free on vatican.va. i'm showing this printed copy because i like real pages and the foreword is a perfect appetizer into the content.",
  vatican:
    "https://www.vatican.va/content/leo-xiv/en/encyclicals/documents/20260515-magnifica-humanitas.html",
  printed:
    "https://bookstore.wordonfire.org/products/magnifica-humanitas?variant=45884795060281",
};

const chipBase =
  "inline-flex items-center min-h-11 px-2.5 py-1.25 rounded-xs text-[11px] tracking-[0.04em] cursor-pointer no-underline transition-[color,border-color,background] duration-150 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const outboundChipClass = `${chipBase} bg-bg2 border border-rule2 text-dim hover:text-accent hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)]`;

const vaticanChipClass = `${chipBase} text-accent border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_4%,transparent)] hover:border-[color-mix(in_srgb,var(--accent)_55%,transparent)]`;

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
        miscellaneous
      </h2>
      <div className="lede">more fun deets about me</div>

      <section aria-label="currently obsessed with">
        <div className="text-accent text-[10.5px] tracking-[0.18em] uppercase mb-1.5">
          currently obsessed with
        </div>

        <div className="mt-2 grid grid-cols-[200px_1fr] gap-9 items-center pt-4 pb-3 max-[600px]:grid-cols-1 max-[600px]:gap-6 max-[600px]:pt-3">
          <a
            href={"https://skrillex.lnk.to/KoraEP"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`listen to ${SONG.title} by ${SONG.artist}`}
            className="block w-50 rounded-sm overflow-hidden border border-rule2 shrink-0"
          >
            <img
              src={SONG.artwork}
              alt={`${SONG.title} album artwork`}
              width="200"
              height="200"
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </a>

          <div>
            <div className="text-faint text-[10.5px] tracking-[0.16em] uppercase mb-1.5">
              listening
            </div>
            <div className="font-display font-normal text-[46px] leading-none m-0 mb-1.5 text-ink">
              {SONG.title}
            </div>
            <div className="text-dim text-t14 tracking-[0.04em] mb-4.5">
              {SONG.artist}
            </div>
            <div className="flex gap-1.5 flex-wrap mb-2">
              <a
                className={outboundChipClass}
                href={SONG.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                spotify ↗
              </a>
              <a
                className={outboundChipClass}
                href={SONG.apple}
                target="_blank"
                rel="noopener noreferrer"
              >
                apple music ↗
              </a>
              <a
                className={outboundChipClass}
                href={SONG.tidal}
                target="_blank"
                rel="noopener noreferrer"
              >
                tidal ↗
              </a>
              <a
                className={outboundChipClass}
                href={SONG.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                youtube ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-7 pt-7 border-t border-dashed border-rule grid grid-cols-[200px_1fr] gap-9 items-start max-[600px]:grid-cols-1 max-[600px]:gap-6">
          <img
            src={BOOK.cover}
            alt={`Printed cover of ${BOOK.title}`}
            width="200"
            height="279"
            loading="lazy"
            decoding="async"
            className="w-50 h-auto block rounded-sm border border-rule2 shrink-0"
          />
          <div>
            <div className="text-faint text-[10.5px] tracking-[0.16em] uppercase mb-1.5">
              reading
            </div>
            <div className="font-display font-normal text-[46px] leading-none m-0 mb-1.5 text-ink text-balance">
              {BOOK.title}
            </div>
            <div className="text-dim text-t14 tracking-[0.04em] mb-3 max-w-[52ch]">
              {BOOK.subtitle}
            </div>
            <div className="text-faint text-[11px] tracking-[0.04em] mb-3">
              {BOOK.author}
            </div>
            <div className="text-dim text-t14 max-w-[52ch] mb-3">
              {BOOK.note}
            </div>
            <div className="text-faint text-t12 tracking-[0.02em] max-w-[52ch] mb-4">
              {BOOK.format}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <a
                className={vaticanChipClass}
                href={BOOK.vatican}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`read ${BOOK.title} free on vatican.va (opens in a new tab)`}
              >
                vatican ↗
              </a>
              <a
                className={outboundChipClass}
                href={BOOK.printed}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Word on Fire printed edition of ${BOOK.title} (opens in a new tab)`}
              >
                printed copy ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 pt-3.5 border-t border-dashed border-rule text-faint text-[10.5px] tracking-[0.06em] uppercase">
        <span className="text-accent mr-2.5">eof</span>v3.0.0 · nathaniel bowman
      </div>
    </div>
  );
}
