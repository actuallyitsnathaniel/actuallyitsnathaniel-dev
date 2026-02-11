import { useState, useEffect } from "react";
import "./index.css";

import EducationAndSkills from "./Pages/EducationAndSkills";
import AboutMe from "./Pages/AboutMe";
import Projects from "./Pages/Projects";

import { Footer } from "./Components/footer";
import { Header } from "./Components/header";
import { ActivityLogBackground } from "./Components/activity-log-background";
import { CRTToggle } from "./Components/crt-toggle";
import SEO from "./Components/seo";
import {
  ActivityLogProvider,
  useActivityLog,
} from "./context/ActivityLogContext";

const AppContent = () => {
  const [isCRT, setIsCRT] = useState(true);
  const { log } = useActivityLog();

  useEffect(() => {
    log("system", "Session started");

    const handleClick = (e: MouseEvent) => {
      log("event", `Click @ (${e.clientX}, ${e.clientY})`);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [log]);

  const HandleCRT = () => {
    const newValue = !isCRT;
    setIsCRT(newValue);
    log("event", `CRT effect: ${newValue ? "enabled" : "disabled"}`);
  };

  return (
    <>
      <SEO
        title="Nathaniel Bowman - Full-Stack Developer & Software Engineer"
        description="Portfolio of Nathaniel Bowman - Full-Stack Web & Mobile Developer specializing in React, TypeScript, AWS, and modern web technologies. B.S. Computer Science from APU."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id":
            (import.meta.env.VITE_SITE_URL ||
              "https://dev.actuallyitsnathaniel.com") + "/#person",
          name: "Nathaniel Bowman",
          url:
            import.meta.env.VITE_SITE_URL ||
            "https://dev.actuallyitsnathaniel.com",
          image:
            (import.meta.env.VITE_SITE_URL ||
              "https://dev.actuallyitsnathaniel.com") + "/og-image.jpg",
          description:
            "Full-Stack Web & Mobile Developer specializing in React, TypeScript, AWS, and modern web technologies.",
          jobTitle: "Full-Stack Developer & Software Engineer",
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Azusa Pacific University",
            url: "https://www.apu.edu/",
          },
          knowsAbout: [
            "React",
            "TypeScript",
            "JavaScript",
            "AWS",
            "Firebase",
            "Docker",
            "Node.js",
            "MongoDB",
            "PostgreSQL",
            "Web Development",
            "Mobile Development",
            "Full-Stack Development",
          ],
          sameAs: [
            "https://github.com/actuallyitsnathaniel",
            "https://linkedin.com/in/actuallyitsnathaniel",
          ],
        }}
      />
      <div
        className={`flex flex-wrap overflow-clip flex-col font-pokemon text-white lowercase ${
          isCRT && "crt"
        }`}
      >
        <ActivityLogBackground isCRT={isCRT} />
        <CRTToggle {...{ HandleCRT }} />
        <Header />
        {/* TODO: ensure all really cool website projects are here. */}
        <EducationAndSkills />
        <Projects />
        <AboutMe />
        <Footer />
      </div>
    </>
  );
};

const App = () => {
  return (
    <ActivityLogProvider>
      <AppContent />
    </ActivityLogProvider>
  );
};

export default App;
