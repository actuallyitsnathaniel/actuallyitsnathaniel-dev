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
    <div className="flex flex-wrap flex-col w-screen font-vcr text-white">
      <VideoBackground />
      {/* TODO: floating animation for links */}
      <Links />
      <Header />
      <Projects />
      <AboutMe />
      <EducationAndSkills />
      <Footer />
    </div>
  );
};

export default App;
