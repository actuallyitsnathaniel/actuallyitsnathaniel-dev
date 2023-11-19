import React from "react";
import "./index.css";

import EducationAndSkills from "./Pages/EducationAndSkills";
import AboutMe from "./Pages/AboutMe";
import Projects from "./Pages/Projects";

import { Footer } from "./Components/footer";
import { Header } from "./Components/header";
import { Links } from "./Components/links";
import { VideoBackground } from "./Components/video-background";

const App = () => {
  return (
    <div className="flex flex-wrap overflow-clip flex-col font-pokemon text-white lowercase">
      <VideoBackground />
      <Links />
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
