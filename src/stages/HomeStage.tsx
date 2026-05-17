import profilePic from "/src/assets/images/pfp_2023.png";
import { useResumeDownload } from "../hooks/useResumeDownload";

export function HomeStage() {
  const { downloadResume } = useResumeDownload();

  return (
    <div className="hero">
      <div className="hero-portrait">
        <img
          src={profilePic}
          alt="Nathaniel Bowman, Full-Stack Software Engineer"
          width="220" height="220"
          loading="eager"
        />
        <div className="frame" aria-hidden="true" />
        <div className="id" aria-hidden="true">
          <span className="dot" />id · 0421
        </div>
      </div>

      <div className="hero-bio">
        <div className="tagline">// software engineer · ↑1 → 2026</div>
        <h1>nathaniel<br /><span className="accent">bowman</span></h1>
        <div className="role">full-stack, infra, and a soft spot for music software.</div>
        <div className="bio">
          the day job is full-stack infrastructure at lightfeather — the kind of work that gets noticed only when it breaks.
          weekends are sites for musicians who shouldn't have to fight their own software.
        </div>
        <div className="status-row">
          <span className="item"><span className="dot" />last deploy 3d ago</span>
          <span className="item">la</span>
          <span className="item">pst</span>
        </div>
        <div className="cta-row">
          <button className="btn primary" onClick={downloadResume} aria-label="download résumé PDF">
            résumé ↓
          </button>
          <a className="btn" href="mailto:nathanielrbowman@gmail.com" aria-label="send email">
            email
          </a>
          <a className="btn" href="https://github.com/actuallyitsnathaniel" target="_blank" rel="noopener noreferrer" aria-label="github profile">
            github ↗
          </a>
          <a className="btn" href="https://linkedin.com/in/nathaniel-bowman" target="_blank" rel="noopener noreferrer" aria-label="linkedin profile">
            linkedin ↗
          </a>
        </div>
      </div>
    </div>
  );
}
