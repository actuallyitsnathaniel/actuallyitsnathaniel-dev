import { useState } from "react";
import { contactPayload } from "../lib/portfolio";

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

export function ContactStage() {
  const c = contactPayload();
  const rows = [
    { label: "email", href: `mailto:${c.email}`, text: c.email, copy: c.email },
    { label: "github", href: c.github, text: "github.com/actuallyitsnathaniel ↗", copy: c.github },
    { label: "linkedin", href: c.linkedin, text: "linkedin.com/in/nathaniel-bowman ↗", copy: c.linkedin },
  ];
  return (
    <div className="grid grid-cols-1 gap-5.5">
      <h2>contact</h2>
      <p>
        los angeles · pst. email is the right channel — no ticket queue. the public
        api is read-only; don&apos;t send secrets.
      </p>
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`grid grid-cols-[70px_1fr_auto] gap-3.5 py-2.5 text-[13px] items-baseline ${i ? "border-t border-rule" : ""}`}
        >
          <span className="text-faint text-[10px] tracking-[0.16em] uppercase">{row.label}</span>
          <a href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="break-all">
            {row.text}
          </a>
          <CopyButton value={row.copy} />
        </div>
      ))}
    </div>
  );
}
