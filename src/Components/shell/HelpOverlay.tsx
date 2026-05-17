interface HelpOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function HelpOverlay({ open, onClose }: HelpOverlayProps) {
  return (
    <div className={`help-overlay${open ? " open" : ""}`} aria-modal={open} role="dialog" aria-label="keyboard shortcuts">
      <div className="card">
        <h3>keyboard shortcuts</h3>
        <div className="row"><div className="keys"><span className="kbd">g</span><span>then</span><span className="kbd">w</span></div><div>~/work</div></div>
        <div className="row"><div className="keys"><span className="kbd">g</span><span>then</span><span className="kbd">a</span></div><div>~/about</div></div>
        <div className="row"><div className="keys"><span className="kbd">g</span><span>then</span><span className="kbd">t</span></div><div>~/toolbelt</div></div>
        <div className="row"><div className="keys"><span className="kbd">g</span><span>then</span><span className="kbd">i</span></div><div>~/infra</div></div>
        <div className="row"><div className="keys"><span className="kbd">g</span><span>then</span><span className="kbd">r</span></div><div>~/repos</div></div>
        <div className="row"><div className="keys"><span className="kbd">g</span><span>then</span><span className="kbd">m</span></div><div>~/misc</div></div>
        <div className="row"><div className="keys"><span className="kbd">g</span><span>then</span><span className="kbd">h</span></div><div>~/ home</div></div>
        <div className="row section-divider">
          <div className="keys section-label">input modes</div><div></div>
        </div>
        <div className="row"><div className="keys"><span className="kbd">/</span></div><div>filter · default mode</div></div>
        <div className="row"><div className="keys"><span className="kbd">:</span></div><div>command</div></div>
        <div className="row"><div className="keys"><span className="kbd">~</span></div><div>navigate (e.g. <span className="kbd">~/work</span>)</div></div>
        <div className="row"><div className="keys"><span className="kbd">*</span></div><div>wipe filter · show all</div></div>
        <div className="row"><div className="keys"><span className="kbd">esc</span></div><div>blur / close</div></div>
        <div className="row"><div className="keys"><span className="kbd">?</span></div><div>this overlay</div></div>
        <div className="row section-divider">
          <div className="keys section-label">commands</div><div></div>
        </div>
        <div className="row"><div className="keys"><span className="kbd">:resume</span></div><div>download résumé</div></div>
        <div className="row"><div className="keys"><span className="kbd">:contact</span></div><div>contact info · copy-paste</div></div>
        <div className="row"><div className="keys"><span className="kbd">:crt</span></div><div>toggle scanlines + phosphor</div></div>
        <div className="row"><div className="keys"><span className="kbd">:theme</span></div><div><span className="kbd">green</span> · <span className="kbd">amber</span> · <span className="kbd">mono</span></div></div>
        <div className="row"><div className="keys"><span className="kbd">:home</span></div><div>~/whoami</div></div>
        <div className="row"><div className="keys"><span className="kbd">:back</span></div><div>previous section</div></div>
        <div className="row"><div className="keys"><span className="kbd">:github</span></div><div>open github profile</div></div>
        <div className="row"><div className="keys"><span className="kbd">:linkedin</span></div><div>open linkedin</div></div>
        <div className="row"><div className="keys"><span className="kbd">:share</span></div><div>copy url to clipboard</div></div>
        <div className="row"><div className="keys"><span className="kbd">:?</span></div><div>this overlay</div></div>
        <div className="close-hint">esc to close</div>
      </div>
    </div>
  );
}
