import { Bio } from "./bio";
import Links from "../links";
import profilePic from "/src/assets/images/pfp_2023.png";

export const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center text-center min-h-[100vh]">
      <img
        src={profilePic}
        alt="profile-pic"
        className="flex h-72 object-contain py-6 mt-4"
      />
      <Links />
      <Bio />
      <div className="arrow">⬇</div>
    </header>
  );
};
