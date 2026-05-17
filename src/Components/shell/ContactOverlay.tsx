import { useState } from "react";

interface ContactOverlayProps {
  open: boolean;
  onClose: () => void;
}

function CopyButton({ value }: { value: string }) {
  const [ok, setOk] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setOk(true);
      setTimeout(() => setOk(false), 1400);
    });
  };
  return (
    <button className={`copy-btn${ok ? " ok" : ""}`} onClick={copy}>
      {ok ? "copied" : "copy"}
    </button>
  );
}

export function ContactOverlay({ open, onClose }: ContactOverlayProps) {
  return (
    <div
      className={`contact-overlay${open ? " open" : ""}`}
      aria-modal={open}
      role="dialog"
      aria-label="contact information"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="card">
        <h3>~/contact</h3>
        <div className="c-row">
          <span className="k">email</span>
          <a href="mailto:nathanielrbowman@gmail.com">nathanielrbowman@gmail.com</a>
          <CopyButton value="nathanielrbowman@gmail.com" />
        </div>
        <div className="c-row">
          <span className="k">github</span>
          <a href="https://github.com/actuallyitsnathaniel" target="_blank" rel="noopener noreferrer">
            github.com/actuallyitsnathaniel ↗
          </a>
          <CopyButton value="https://github.com/actuallyitsnathaniel" />
        </div>
        <div className="c-row">
          <span className="k">linkedin</span>
          <a href="https://linkedin.com/in/nathaniel-bowman" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/nathaniel-bowman ↗
          </a>
          <CopyButton value="https://linkedin.com/in/nathaniel-bowman" />
        </div>
        <div className="close-hint">esc to close</div>
      </div>
    </div>
  );
}
