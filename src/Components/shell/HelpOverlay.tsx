import { useState } from "react";
import type { ThemeName } from "../../hooks/useTheme";

const THEME_HEX: Record<ThemeName, string> = {
  green:    "#7ee787",
  amber:    "#ffb86c",
  mono:     "#c8c8c8",
  red:      "#f87171",
  orange:   "#fb923c",
  yellow:   "#facc15",
  lime:     "#a3e635",
  teal:     "#2dd4bf",
  cyan:     "#22d3ee",
  sky:      "#38bdf8",
  blue:     "#60a5fa",
  indigo:   "#818cf8",
  violet:   "#a78bfa",
  purple:   "#c084fc",
  fuchsia:  "#e879f9",
  pink:     "#f472b6",
  rose:     "#fb7185",
  slate:    "#94a3b8",
  zinc:     "#a1a1aa",
  gold:     "#d4a843",
  coral:    "#ff6b6b",
  mint:     "#00e5cc",
  lavender: "#b39ddb",
  peach:    "#ffab76",
  sage:     "#8fb996",
  dusk:     "#9b8ea8",
  ember:    "#e8613a",
  frost:    "#a8d8ea",
  neon:     "#39ff14",
};

const ALL_THEMES = Object.keys(THEME_HEX) as ThemeName[];

interface HelpOverlayProps {
  open: boolean;
  onClose: () => void;
  setTheme: (t: ThemeName) => void;
  currentTheme: ThemeName;
}

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block border border-rule2 px-1.5 py-px rounded-xs text-[11px] text-ink bg-bg2">
    {children}
  </span>
);

const Row = ({
  keys,
  desc,
  className,
}: {
  keys: React.ReactNode;
  desc: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`grid grid-cols-[110px_1fr] gap-3.5 py-1.5 text-[13px] text-dim ${className ?? ""}`}
  >
    <div className="flex gap-1 items-center flex-wrap">{keys}</div>
    <div>{desc}</div>
  </div>
);

export function HelpOverlay({ open, onClose, setTheme, currentTheme }: HelpOverlayProps) {
  const [themesExpanded, setThemesExpanded] = useState(false);

  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.78)] z-200 ${open ? "flex" : "hidden"} items-center justify-center backdrop-blur-xs`}
      aria-modal={open}
      role="dialog"
      aria-label="keyboard shortcuts"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-bg1 border border-rule2 rounded-sm w-[min(440px,92vw)] px-7 py-6 max-h-[80vh] overflow-y-auto">
        <h3 className="m-0 mb-4 font-mono text-[11px] tracking-[0.18em] uppercase text-faint">
          keyboard shortcuts
        </h3>

        <Row
          keys={
            <>
              <Kbd>g</Kbd>
              <span className="text-faint text-[10px]">then</span>
              <Kbd>w</Kbd>
            </>
          }
          desc="~/work"
        />
        <Row
          keys={
            <>
              <Kbd>g</Kbd>
              <span className="text-faint text-[10px]">then</span>
              <Kbd>a</Kbd>
            </>
          }
          desc="~/about"
        />
        <Row
          keys={
            <>
              <Kbd>g</Kbd>
              <span className="text-faint text-[10px]">then</span>
              <Kbd>t</Kbd>
            </>
          }
          desc="~/toolbelt"
        />
        <Row
          keys={
            <>
              <Kbd>g</Kbd>
              <span className="text-faint text-[10px]">then</span>
              <Kbd>i</Kbd>
            </>
          }
          desc="~/infra"
        />
        <Row
          keys={
            <>
              <Kbd>g</Kbd>
              <span className="text-faint text-[10px]">then</span>
              <Kbd>r</Kbd>
            </>
          }
          desc="~/repos"
        />
        <Row
          keys={
            <>
              <Kbd>g</Kbd>
              <span className="text-faint text-[10px]">then</span>
              <Kbd>m</Kbd>
            </>
          }
          desc="~/misc"
        />
        <Row
          keys={
            <>
              <Kbd>g</Kbd>
              <span className="text-faint text-[10px]">then</span>
              <Kbd>h</Kbd>
            </>
          }
          desc="~/ home"
        />

        <div className="mt-3.5 pt-3 border-t border-rule">
          <div className="text-faint text-[10px] tracking-[0.14em] uppercase">
            input modes
          </div>
        </div>
        <Row keys={<Kbd>/</Kbd>} desc="filter · default mode" />
        <Row keys={<Kbd>:</Kbd>} desc="command" />
        <Row
          keys={<Kbd>~</Kbd>}
          desc={
            <>
              navigate (e.g. <Kbd>~/work</Kbd>)
            </>
          }
        />
        <Row keys={<Kbd>*</Kbd>} desc="wipe filter · show all" />
        <Row keys={<Kbd>esc</Kbd>} desc="blur / close" />
        <Row keys={<Kbd>?</Kbd>} desc="this overlay" />

        <div className="mt-3.5 pt-3 border-t border-rule">
          <div className="text-faint text-[10px] tracking-[0.14em] uppercase">
            commands
          </div>
        </div>
        <Row keys={<Kbd>:resume</Kbd>} desc="download résumé" />
        <Row keys={<Kbd>:contact</Kbd>} desc="contact info · copy-paste" />
        <Row keys={<Kbd>:crt</Kbd>} desc="toggle scanlines + phosphor" />

        {/* :theme row with expandable swatch picker */}
        <div className="grid grid-cols-[110px_1fr] gap-3.5 py-1.5 text-[13px] text-dim">
          <div className="flex gap-1 items-center">
            <Kbd>:theme</Kbd>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-dim text-[12px]">{ALL_THEMES.length} colors</span>
            <button
              className="text-[10px] tracking-[0.1em] uppercase border border-rule2 px-1.5 py-px rounded-xs text-faint transition-[color,border-color] duration-120 hover:text-accent hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)]"
              onClick={() => setThemesExpanded((v) => !v)}
              aria-expanded={themesExpanded}
            >
              {themesExpanded ? "collapse ↑" : "expand ↓"}
            </button>
          </div>
        </div>

        {themesExpanded && (
          <div className="mt-1 mb-1.5 grid grid-cols-3 gap-1.5 pl-[110px]">
            {ALL_THEMES.map((t) => {
              const isActive = currentTheme === t;
              return (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-xs border text-[11px] text-left transition-[border-color,background] duration-120 ${
                    isActive
                      ? "border-[color-mix(in_srgb,var(--accent)_50%,transparent)] bg-[color-mix(in_srgb,var(--accent)_6%,transparent)] text-accent"
                      : "border-rule text-faint hover:border-rule2 hover:text-dim"
                  }`}
                  aria-pressed={isActive}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: THEME_HEX[t] }}
                    aria-hidden="true"
                  />
                  {t}
                </button>
              );
            })}
          </div>
        )}

        <Row keys={<Kbd>:home</Kbd>} desc="~/whoami" />
        <Row keys={<Kbd>:back</Kbd>} desc="previous section" />
        <Row keys={<Kbd>:github</Kbd>} desc="open github profile" />
        <Row keys={<Kbd>:linkedin</Kbd>} desc="open linkedin" />
        <Row keys={<Kbd>:share</Kbd>} desc="copy url to clipboard" />
        <Row keys={<Kbd>:log</Kbd>} desc="view full activity log" />
        <Row keys={<Kbd>:?</Kbd>} desc="this overlay" />

        <div className="mt-3.5 pt-3 border-t border-rule text-faint text-[11px] text-center">
          esc to close
        </div>
      </div>
    </div>
  );
}
