import profilePic from "/src/assets/images/pfp_2023.png";
import { useResumeDownload } from "../hooks/useResumeDownload";

export function HomeStage() {
  const { downloadResume } = useResumeDownload();

  return (
    <div className="grid grid-cols-[220px_1fr] gap-[40px] items-start pb-8 border-b border-rule md:grid-cols-1 md:gap-[28px]">
      {/* portrait */}
      <div className="relative w-[220px] h-[220px] rounded-[2px] overflow-hidden bg-bg2 border border-rule2">
        <img
          src={profilePic}
          alt="Nathaniel Bowman, Full-Stack Software Engineer"
          width="220"
          height="220"
          loading="eager"
          className="w-full h-full object-cover [filter:grayscale(0.15)_contrast(1.02)]"
        />
        {/* frame overlay — kept in CSS (.hero-portrait .frame) for complex gradient */}
        <div className="frame absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute left-[8px] bottom-[6px] text-[9px] tracking-[0.18em] text-dim uppercase"
          aria-hidden="true"
        >
          <span
            className="w-[5px] h-[5px] rounded-full bg-accent inline-block mr-[5px] align-[1px] shadow-[0_0_6px_var(--accent)] animate-[pulse_2.4s_infinite]"
          />
          id · 0421
        </div>
      </div>

      {/* bio */}
      <div>
        <div className="text-t12 text-faint tracking-[0.02em] mb-2">
          // software engineer · ↑1 → 2026
        </div>
        <h1>nathaniel<br /><span className="accent text-accent">bowman</span></h1>
        <div className="text-ink text-t18 leading-[1.5] my-2 mb-[18px] text-balance max-w-[36ch]">
          full-stack, infra, and a soft spot for music software.
        </div>
        <div className="text-dim text-t14 mb-[22px] max-w-[56ch]">
          the day job is full-stack infrastructure at lightfeather — the kind of work that gets noticed only when it breaks.
          weekends are sites for musicians who shouldn't have to fight their own software.
        </div>

        {/* status row */}
        <div className="flex gap-[14px] items-center text-t10 tracking-[0.12em] text-faint uppercase py-2 pb-[18px] border-t border-rule mt-[18px] flex-wrap">
          <span className="flex items-center gap-[6px]">
            <span className="w-[6px] h-[6px] rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" />
            last deploy 3d ago
          </span>
          <span>la</span>
          <span>pst</span>
        </div>

        {/* cta row */}
        <div className="flex gap-2 flex-wrap">
          <button
            className="inline-flex items-center gap-2 px-[14px] py-[9px] border border-accent rounded-[3px] bg-accent text-black text-t12 tracking-[0.04em] font-medium transition-[color,border-color,background,transform] duration-150 hover:bg-[#92ee9c] hover:border-[#92ee9c] hover:-translate-y-px no-underline border-b-accent"
            onClick={downloadResume}
            aria-label="download résumé PDF"
          >
            résumé ↓
          </button>
          <a
            className="inline-flex items-center gap-2 px-[14px] py-[9px] border border-rule2 rounded-[3px] text-dim text-t12 tracking-[0.04em] transition-[color,border-color,background,transform] duration-150 hover:text-ink hover:border-ink hover:bg-[rgba(255,255,255,0.02)] no-underline"
            href="mailto:nathanielrbowman@gmail.com"
            aria-label="send email"
          >
            email
          </a>
          <a
            className="inline-flex items-center gap-2 px-[14px] py-[9px] border border-rule2 rounded-[3px] text-dim text-t12 tracking-[0.04em] transition-[color,border-color,background,transform] duration-150 hover:text-ink hover:border-ink hover:bg-[rgba(255,255,255,0.02)] no-underline"
            href="https://github.com/actuallyitsnathaniel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github profile"
          >
            github ↗
          </a>
          <a
            className="inline-flex items-center gap-2 px-[14px] py-[9px] border border-rule2 rounded-[3px] text-dim text-t12 tracking-[0.04em] transition-[color,border-color,background,transform] duration-150 hover:text-ink hover:border-ink hover:bg-[rgba(255,255,255,0.02)] no-underline"
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
