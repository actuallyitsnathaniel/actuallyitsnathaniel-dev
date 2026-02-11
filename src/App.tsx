import { useState, useEffect, useRef } from "react";
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
  const hasBooted = useRef(false);

  useEffect(() => {
    // Prevent double-run from React StrictMode
    if (hasBooted.current) return;
    hasBooted.current = true;

    // Stagger the boot logs for effect
    const interval = 150;
    const originalLog = log;
    const delayedLogs: Array<() => void> = [];

    const delayedLog = (type: "system", message: string) => {
      delayedLogs.push(() => originalLog(type, message));
    };

    // Temporarily replace log with delayed version
    const tempLog = delayedLog as typeof log;

    // Build the sequence
    tempLog("system", "Initializing terminal...");

    const platform = navigator.platform || "Unknown";
    tempLog("system", `Platform: ${platform}`);

    const ua = navigator.userAgent;
    let browser = "Unknown";
    if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Edg")) browser = "Edge";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Safari")) browser = "Safari";
    else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
    tempLog("system", `Browser: ${browser}`);

    const cores = navigator.hardwareConcurrency || "Unknown";
    tempLog("system", `CPU Cores: ${cores}`);

    const memory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    tempLog("system", `Memory: ${memory ? `${memory}GB` : "Unknown"}`);

    const width = window.screen.width;
    const height = window.screen.height;
    const dpr = window.devicePixelRatio || 1;
    tempLog("system", `Display: ${width}x${height} @${dpr}x`);

    const touchPoints = navigator.maxTouchPoints || 0;
    const inputType = touchPoints > 0 ? "Touch" : "Desktop";
    tempLog("system", `Input: ${inputType}`);

    const locale = navigator.language || "Unknown";
    tempLog("system", `Locale: ${locale}`);

    const connection = (
      navigator as Navigator & {
        connection?: { effectiveType?: string };
      }
    ).connection;
    const networkType = connection?.effectiveType || "Unknown";
    tempLog("system", `Network: ${networkType}`);

    tempLog("system", "Session ready");

    // Execute with staggered timing
    delayedLogs.forEach((fn, i) => {
      setTimeout(fn, i * interval);
    });

    // Click handler (after boot sequence)
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
