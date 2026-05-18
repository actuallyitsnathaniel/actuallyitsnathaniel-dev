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
    <button
      className={`text-[10px] tracking-[0.12em] uppercase border px-2 py-0.75 rounded-xs transition-[color,border-color] duration-120 ${
        ok
          ? "text-accent border-[color-mix(in_srgb,var(--accent)_40%,transparent)]"
          : "text-faint border-rule2 hover:text-accent hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)]"
      }`}
      onClick={copy}
    >
      {ok ? "copied" : "copy"}
    </button>
  );
}

export function ContactOverlay({ open, onClose }: ContactOverlayProps) {
  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.78)] z-200 ${open ? "flex" : "hidden"} items-center justify-center backdrop-blur-xs`}
      aria-modal={open}
      role="dialog"
      aria-label="contact information"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-bg1 border border-rule2 rounded-sm w-[min(420px,92vw)] px-6.5 py-5.5">
        <h3 className="m-0 mb-4.5 text-[11px] tracking-[0.18em] uppercase text-faint">
          ~/contact
        </h3>

        <div className="grid grid-cols-[70px_1fr_auto] gap-3.5 py-2.5 text-[13px] items-baseline">
          <span className="text-faint text-[10px] tracking-[0.16em] uppercase">
            email
          </span>
          <a
            href="mailto:nathanielrbowman@gmail.com"
            className="break-all"
          >
            nathanielrbowman@gmail.com
          </a>
          <CopyButton value="nathanielrbowman@gmail.com" />
        </div>

        <div className="grid grid-cols-[70px_1fr_auto] gap-3.5 py-2.5 border-t border-rule text-[13px] items-baseline">
          <span className="text-faint text-[10px] tracking-[0.16em] uppercase">
            github
          </span>
          <a
            href="https://github.com/actuallyitsnathaniel"
            target="_blank"
            rel="noopener noreferrer"
            className="break-all"
          >
            github.com/actuallyitsnathaniel ↗
          </a>
          <CopyButton value="https://github.com/actuallyitsnathaniel" />
        </div>

        <div className="grid grid-cols-[70px_1fr_auto] gap-3.5 py-2.5 border-t border-rule text-[13px] items-baseline">
          <span className="text-faint text-[10px] tracking-[0.16em] uppercase">
            linkedin
          </span>
          <a
            href="https://linkedin.com/in/nathaniel-bowman"
            target="_blank"
            rel="noopener noreferrer"
            className="break-all"
          >
            linkedin.com/in/nathaniel-bowman ↗
          </a>
          <CopyButton value="https://linkedin.com/in/nathaniel-bowman" />
        </div>

        <div className="mt-3.5 pt-3 border-t border-rule text-faint text-[11px] text-center">
          esc to close
        </div>
      </div>
    </div>
  );
}
