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
      {/* TODO: CRT effect
      http://aleclownes.com/2017/02/01/crt-display.html */}
      <VideoBackground />
      <CRTToggle {...{ HandleCRT }} />
      <Header />
      {/* TODO: add all website projects here. */}
      <Projects />
      <AboutMe />
      <EducationAndSkills />
      <Footer />
    </div>
  );
};

export default App;
