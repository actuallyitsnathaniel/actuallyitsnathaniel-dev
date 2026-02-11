import apu from "/src/assets/images/apu_white.svg";
import { SkillsSection } from "../Components/skills";
import { useSectionVisibility } from "../hooks/useSectionVisibility";

const SkillsAndExperience = () => {
  const sectionRef = useSectionVisibility("Education & Skills");

  return (
    <div
      ref={sectionRef}
      className="flex flex-row flex-wrap text-center justify-center md:w-full text-sm text-white min-h-full py-10"
    >
      <div className="color-white md:basis-1/2 p-4 w-full">
        <h2 className="underline text-5xl py-5" id="education">
          EDUCATION
        </h2>
        <a href={"https://www.apu.edu/"} className="flex justify-center">
          <img
            src={apu}
            alt="Azusa Pacific University logo"
            className="md:max-w-[80%] p-4"
            width="600"
            height="200"
            loading="lazy"
          />
        </a>
        <p className="text-2xl py-5">
          B.S. Computer Science ~ Dept. of ECS <br />
          B.S. Honors Humanitites ~ APU Honors College
        </p>
      </div>
      <SkillsSection />
    </div>
  );
};

export default SkillsAndExperience;
