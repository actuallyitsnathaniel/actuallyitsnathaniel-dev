import { useState } from "react";
import "./index.css";

import EducationAndSkills from "./Pages/EducationAndSkills";
import AboutMe from "./Pages/AboutMe";
import Projects from "./Pages/Projects";

import { Footer } from "./Components/footer";
import { Header } from "./Components/header";
import { VideoBackground } from "./Components/video-background";
import { CRTToggle } from "./Components/crt-toggle";
import SEO from "./Components/seo";

const App = () => {
  const [isCRT, setIsCRT] = useState(true);

  const HandleCRT = () => {
    setIsCRT(!isCRT);
  };
  return (
    <>
      <SEO
        title="Nathaniel Bowman - Full-Stack Developer & Software Engineer"
        description="Portfolio of Nathaniel Bowman - Full-Stack Web & Mobile Developer specializing in React, TypeScript, AWS, and modern web technologies. B.S. Computer Science from APU."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Nathaniel Bowman",
          "url": import.meta.env.VITE_SITE_URL || "https://actuallyitsnathaniel.dev",
          "jobTitle": "Full-Stack Developer & Software Engineer",
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "Azusa Pacific University",
            "url": "https://www.apu.edu/"
          },
          "knowsAbout": ["React", "TypeScript", "JavaScript", "AWS", "Firebase", "Docker", "Node.js", "MongoDB", "PostgreSQL", "Web Development", "Mobile Development", "Full-Stack Development"],
          "sameAs": [
            "https://github.com/actuallyitsnathaniel",
            "https://linkedin.com/in/actuallyitsnathaniel"
          ]
        }}
      />
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
    </>
  );
};

export default App;
