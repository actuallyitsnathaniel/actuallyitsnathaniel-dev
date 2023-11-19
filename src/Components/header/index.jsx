import { Bio } from "./bio";
import profilePic from "../../assets/images/pfp_2023.png";

export const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center text-center min-h-[100vh]">
      <img
        src={profilePic}
        alt="profile-pic"
        className="flex h-72 object-contain py-5"
      />
      <Bio />
      <div className="arrow">⬇</div>
    </header>
  );
};
