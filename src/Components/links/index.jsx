import { Link } from "./link";

import resume from "../../assets/files/resume.pdf";
import linkedin from "../../assets/images/linkedin-svg.svg";
import github from "../../assets/images/skills/github_square_icon.svg";
import mail from "../../assets/images/mail-svg.svg";
import resumeIcon from "../../assets/images/resume-icon.svg";

export const Links = () => {
  return (
    <div className="flex flex-row duration-100 md:fixed md:bottom-0 z-10 justify-around content-stretch items-center md:hover:bottom-3 md:animate-none animate-mobile-links">
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
        href={resume}
        alt="github"
        type="application/pdf"
        download="nathaniel-bowman_resume"
      />
    </div>
  );
};
