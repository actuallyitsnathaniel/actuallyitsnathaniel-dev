import { Bio } from "./bio";
import Links from "../links";
import profilePic from "/src/assets/images/pfp_2023.png";
import { useSectionVisibility } from "../../hooks/useSectionVisibility";

export const Header = () => {
  const sectionRef = useSectionVisibility("Header");

  return (
    <header
      ref={sectionRef}
      className="flex flex-col items-center justify-center text-center min-h-screen"
    >
      <img
        src={profilePic}
        alt="Nathaniel Bowman, Full-Stack Software Engineer - Professional headshot"
        className="flex h-72 object-contain py-6 mt-4"
        width="288"
        height="288"
        loading="eager"
      />
      <Links />
      <Bio />
      <div className="arrow">⬇</div>
    </header>
  );
};
