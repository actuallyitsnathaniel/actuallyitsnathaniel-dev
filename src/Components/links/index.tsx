import { Link } from "./link";
import { useResumeDownload } from "../../hooks/useResumeDownload";

import linkedin from "/src/assets/images/linkedin-svg.svg";
import github from "/src/assets/images/skills/github_square_icon.svg";
import mail from "/src/assets/images/mail-svg.svg";
import resumeIcon from "/src/assets/images/resume-icon.svg";

const Links = () => {
  const { isDownloading, downloadResume } = useResumeDownload();

  return (
    <div className="flex flex-row duration-100 md:fixed md:bottom-0 md:left-0 justify-around content-stretch items-center md:hover:bottom-3 md:animate-none animate-mobile-links z-2 md:bg-black/80 md:backdrop-blur-sm md:border-t md:border-gray-800 md:px-2 cursor-pointer">
      <Link image={mail} href="mailto:nathanielrbowman@gmail.com" alt="email" />
      <Link
        image={linkedin}
        href="https://linkedin.com/in/actuallyitsnathaniel"
        alt="linkedin"
      />
      <Link
        image={github}
        href="https://github.com/actuallyitsnathaniel"
        alt="github"
      />
      <Link
        image={resumeIcon}
        alt={isDownloading ? "Downloading resume..." : "Download Resume PDF"}
        onClick={downloadResume}
        disabled={isDownloading}
      />
    </div>
  );
};

export default Links;
