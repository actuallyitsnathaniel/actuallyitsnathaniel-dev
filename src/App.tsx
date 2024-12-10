import { useState } from "react";
import "./index.css";

import EducationAndSkills from "./Pages/EducationAndSkills";
import AboutMe from "./Pages/AboutMe";
import Projects from "./Pages/Projects";

import { Footer } from "./Components/footer";
import { Header } from "./Components/header";
import { VideoBackground } from "./Components/video-background";
import { CRTToggle } from "./Components/crt-toggle";

const App = () => {
  const [isCRT, setIsCRT] = useState(true);

  const HandleCRT = () => {
    setIsCRT(!isCRT);
  };
  return (
    <div
      className={`flex flex-wrap overflow-clip flex-col font-pokemon text-white lowercase ${
        isCRT && "crt"
      }`}
    >
      <VideoBackground />
      <CRTToggle {...{ HandleCRT }} />
      <Header />
      {/* TODO: ensure all really cool website projects are here. */}
      <Projects />
      <AboutMe />
      <EducationAndSkills />
      <Footer />
    </div>
  );
};

export default App;
