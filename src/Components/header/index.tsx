import { Bio } from "./bio";
import Links from "../links";
import profilePic from "/src/assets/images/pfp_2023.png";
import { useSectionVisibility } from "../../hooks/useSectionVisibility";

const scrollToContent = () => {
  const first = document.querySelector<HTMLElement>("#skills, #education, #infra");
  if (first) {
    first.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }
};

export const Header = () => {
  const sectionRef = useSectionVisibility("Header");

  return (
    <header
      ref={sectionRef}
      className="flex flex-col items-center justify-center text-center min-h-screen px-6 py-10"
    >
      {/* Desktop: side-by-side; mobile: stacked */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-12 w-full max-w-4xl">
        <img
          src={profilePic}
          alt="Nathaniel Bowman, Full-Stack Software Engineer - Professional headshot"
          className="h-64 md:h-72 object-contain py-4 md:py-0 self-center md:flex-shrink-0"
          width="288"
          height="288"
          loading="eager"
        />
        <div className="flex flex-col items-center md:items-start md:text-left">
          <Bio />
          {/* Mobile: inline links (desktop uses the fixed dock) */}
          <div className="mt-4 md:hidden">
            <Links />
          </div>
        </div>
      </div>
      <button
        className="arrow mt-10 cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
        aria-label="Scroll down to content"
        onClick={scrollToContent}
        onKeyDown={(e) => e.key === "Enter" && scrollToContent()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </header>
  );
};
