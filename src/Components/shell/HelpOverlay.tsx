interface HelpOverlayProps {
  open: boolean;
}

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block border border-rule2 px-[6px] py-[1px] rounded-[2px] text-[11px] text-ink bg-bg2">
    {children}
  </span>
);

const Row = ({ keys, desc, className }: { keys: React.ReactNode; desc: React.ReactNode; className?: string }) => (
  <div className={`grid grid-cols-[110px_1fr] gap-[14px] py-[6px] text-[13px] text-dim ${className ?? ""}`}>
    <div className="flex gap-1 items-center flex-wrap">{keys}</div>
    <div>{desc}</div>
  </div>
);

export function HelpOverlay({ open }: HelpOverlayProps) {
  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.78)] z-[200] ${open ? "flex" : "hidden"} items-center justify-center backdrop-blur-[4px]`}
      aria-modal={open}
      role="dialog"
      aria-label="keyboard shortcuts"
    >
      <div className="bg-bg1 border border-rule2 rounded-[4px] w-[min(440px,92vw)] px-[28px] py-[24px] max-h-[80vh] overflow-y-auto">
        <h3 className="m-0 mb-4 font-mono text-[11px] tracking-[0.18em] uppercase text-faint">
          keyboard shortcuts
        </h3>

        <Row keys={<><Kbd>g</Kbd><span className="text-faint text-[10px]">then</span><Kbd>w</Kbd></>} desc="~/work" />
        <Row keys={<><Kbd>g</Kbd><span className="text-faint text-[10px]">then</span><Kbd>a</Kbd></>} desc="~/about" />
        <Row keys={<><Kbd>g</Kbd><span className="text-faint text-[10px]">then</span><Kbd>t</Kbd></>} desc="~/toolbelt" />
        <Row keys={<><Kbd>g</Kbd><span className="text-faint text-[10px]">then</span><Kbd>i</Kbd></>} desc="~/infra" />
        <Row keys={<><Kbd>g</Kbd><span className="text-faint text-[10px]">then</span><Kbd>r</Kbd></>} desc="~/repos" />
        <Row keys={<><Kbd>g</Kbd><span className="text-faint text-[10px]">then</span><Kbd>m</Kbd></>} desc="~/misc" />
        <Row keys={<><Kbd>g</Kbd><span className="text-faint text-[10px]">then</span><Kbd>h</Kbd></>} desc="~/ home" />

        <div className="mt-[14px] pt-[12px] border-t border-rule">
          <div className="text-faint text-[10px] tracking-[0.14em] uppercase">input modes</div>
        </div>
        <Row keys={<Kbd>/</Kbd>} desc="filter · default mode" />
        <Row keys={<Kbd>:</Kbd>} desc="command" />
        <Row keys={<Kbd>~</Kbd>} desc={<>navigate (e.g. <Kbd>~/work</Kbd>)</>} />
        <Row keys={<Kbd>*</Kbd>} desc="wipe filter · show all" />
        <Row keys={<Kbd>esc</Kbd>} desc="blur / close" />
        <Row keys={<Kbd>?</Kbd>} desc="this overlay" />

        <div className="mt-[14px] pt-[12px] border-t border-rule">
          <div className="text-faint text-[10px] tracking-[0.14em] uppercase">commands</div>
        </div>
        <Row keys={<Kbd>:resume</Kbd>} desc="download résumé" />
        <Row keys={<Kbd>:contact</Kbd>} desc="contact info · copy-paste" />
        <Row keys={<Kbd>:crt</Kbd>} desc="toggle scanlines + phosphor" />
        <Row keys={<Kbd>:theme</Kbd>} desc={<><Kbd>green</Kbd> · <Kbd>amber</Kbd> · <Kbd>mono</Kbd></>} />
        <Row keys={<Kbd>:home</Kbd>} desc="~/whoami" />
        <Row keys={<Kbd>:back</Kbd>} desc="previous section" />
        <Row keys={<Kbd>:github</Kbd>} desc="open github profile" />
        <Row keys={<Kbd>:linkedin</Kbd>} desc="open linkedin" />
        <Row keys={<Kbd>:share</Kbd>} desc="copy url to clipboard" />
        <Row keys={<Kbd>:log</Kbd>} desc="view full activity log" />
        <Row keys={<Kbd>:?</Kbd>} desc="this overlay" />

        <div className="mt-[14px] pt-[12px] border-t border-rule text-faint text-[11px] text-center">
          esc to close
        </div>
      </div>
    </div>
  );
}
