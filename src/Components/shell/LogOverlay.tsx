import { useEffect, useRef } from "react";
import { useActivityLog } from "../../context/ActivityLogContext";

interface LogOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function LogOverlay({ open, onClose }: LogOverlayProps) {
  const { logs } = useActivityLog();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [open, logs.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.78)] z-[200] ${open ? "flex" : "hidden"} items-center justify-center backdrop-blur-[4px]`}
      aria-modal={open}
      role="dialog"
      aria-label="activity log"
      onClick={onClose}
    >
      <div
        className="bg-bg1 border border-rule2 rounded-[4px] w-[min(560px,92vw)] px-[28px] py-[24px] max-h-[70vh] overflow-y-auto flex flex-col gap-0"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="m-0 mb-4 font-mono text-[11px] tracking-[0.18em] uppercase text-faint shrink-0">
          activity log
        </h3>
        {logs.length === 0 ? (
          <div className="text-faint text-t12 py-2">no activity yet.</div>
        ) : (
          <div className="flex flex-col gap-0 font-mono text-[11px] leading-[1.7]">
            {logs.map(entry => (
              <div key={entry.id} className="grid grid-cols-[60px_64px_1fr] gap-[10px] py-[2px]">
                <span className="text-faint">{entry.timestamp}</span>
                <span className="text-accent">[{entry.type}]</span>
                <span className="text-dim">{entry.message}</span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
        <div className="mt-[14px] pt-[12px] border-t border-rule text-faint text-[11px] text-center shrink-0">
          esc to close
        </div>
      </div>
    </div>
  );
}
