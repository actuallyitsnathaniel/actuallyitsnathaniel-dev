import { useEffect, useState } from "react";
import profilePic from "/src/assets/images/pfp_2023.png";
import { useResumeDownload } from "../hooks/useResumeDownload";
import { timeAgo } from "../utils/timeAgo";

const CACHE_KEY = "ain_repos_v3";
const CACHE_TTL = 60 * 60 * 1000;

export function HomeStage() {
  const { downloadResume } = useResumeDownload();
  const [lastPush, setLastPush] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL && data[0]?.pushed_at) {
          setLastPush(data[0].pushed_at);
          return;
        }
      } catch {
        /* ignore */
      }
    }
    fetch(
      "https://api.github.com/users/actuallyitsnathaniel/repos?per_page=1&sort=pushed",
    )
      .then((r) => r.json())
      .then((data) => {
        if (data[0]?.pushed_at) setLastPush(data[0].pushed_at);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="grid pb-8 border-b border-rule md:grid-cols-2 gap-10 md:w-4/5">
      {/* portrait */}
      <div className="relative w-55 h-55 rounded-xs overflow-hidden bg-bg2 border border-rule2 md:justify-self-end">
        <img
          src={profilePic}
          alt="Nathaniel Bowman, Full-Stack Software Engineer"
          width="220"
          height="220"
          loading="eager"
          className="w-full h-full object-cover filter-[grayscale(0.15)_contrast(1.02)]"
        />
        {/* frame overlay — kept in CSS (.hero-portrait .frame) for complex gradient */}
        <div
          className="frame absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* bio */}
      <div className="justify-self-start">
        <div className="text-t12 text-faint tracking-[0.02em] mb-2">
          // software engineer · ↑1 → 2026
        </div>
        <h1>
          nathaniel
          <br />
          <span className="accent text-accent">bowman</span>
        </h1>
        <div className="text-ink text-t18 leading-normal my-2 mb-4.5 text-balance max-w-[36ch]">
          full-stack, infra, and a soft spot for music software.
        </div>
        <div className="text-dim text-t14 mb-5.5 max-w-[56ch]">
          the day job is full-stack infrastructure at lightfeather — the kind of
          work that gets noticed only when it breaks. weekends are sites for
          musicians who shouldn't have to fight their own software.
        </div>

        {/* status row */}
        <div className="flex gap-3.5 items-center text-t10 tracking-[0.12em] text-faint uppercase py-2 pb-4.5 border-t border-rule mt-4.5 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" />
            {lastPush ? `last push ${timeAgo(lastPush)}` : "last push …"}
          </span>
          <span>la</span>
          <span>pst</span>
        </div>

        {/* cta row */}
        <div className="flex gap-2 flex-wrap">
          <button
            className="inline-flex items-center gap-2 px-3.5 py-2.25 border border-accent rounded-[3px] bg-accent text-black text-t12 tracking-[0.04em] font-medium transition-[color,border-color,background,transform] duration-150 hover:bg-[#92ee9c] hover:border-[#92ee9c] hover:-translate-y-px no-underline border-b-accent"
            onClick={downloadResume}
            aria-label="download résumé PDF"
          >
            résumé ↓
          </button>
          <a
            className="inline-flex items-center gap-2 px-3.5 py-2.25 border border-rule2 rounded-[3px] text-dim text-t12 tracking-[0.04em] transition-[color,border-color,background,transform] duration-150 hover:text-ink hover:border-ink hover:bg-[rgba(255,255,255,0.02)] no-underline"
            href="mailto:nathanielrbowman@gmail.com"
            aria-label="send email"
          >
            email
          </a>
          <a
            className="inline-flex items-center gap-2 px-3.5 py-2.25 border border-rule2 rounded-[3px] text-dim text-t12 tracking-[0.04em] transition-[color,border-color,background,transform] duration-150 hover:text-ink hover:border-ink hover:bg-[rgba(255,255,255,0.02)] no-underline"
            href="https://github.com/actuallyitsnathaniel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github profile"
          >
            github ↗
          </a>
          <a
            className="inline-flex items-center gap-2 px-3.5 py-2.25 border border-rule2 rounded-[3px] text-dim text-t12 tracking-[0.04em] transition-[color,border-color,background,transform] duration-150 hover:text-ink hover:border-ink hover:bg-[rgba(255,255,255,0.02)] no-underline"
            href="https://linkedin.com/in/nathaniel-bowman"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin profile"
          >
            linkedin ↗
          </a>
        </div>
      </div>
    </div>
  );
}
