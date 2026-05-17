import { useEffect, useRef } from "react";
import "./index.css";

import { ActivityLogProvider, useActivityLog } from "./context/ActivityLogContext";
import { ActivityLogBackground } from "./Components/activity-log-background";
import { Shell } from "./Components/shell/Shell";
import SEO from "./Components/seo";

import { useRouter } from "./hooks/useRouter";
import { useTheme } from "./hooks/useTheme";

import { HomeStage } from "./stages/HomeStage";
import { AboutStage } from "./stages/AboutStage";
import { ToolbeltStage } from "./stages/ToolbeltStage";
import { WorkStage } from "./stages/WorkStage";
import { InfraStage } from "./stages/InfraStage";
import { ReposStage } from "./stages/ReposStage";
import { MiscStage } from "./stages/MiscStage";

import type { RouterState } from "./hooks/useRouter";

function renderStage(state: RouterState, onToggleEntry: (alias: string) => void) {
  const { current, filter, openEntries } = state;
  switch (current) {
    case "home":     return <HomeStage />;
    case "about":    return <AboutStage />;
    case "toolbelt": return <ToolbeltStage filter={filter} />;
    case "work":     return <WorkStage filter={filter} openEntries={openEntries} onToggleEntry={onToggleEntry} />;
    case "infra":    return <InfraStage filter={filter} />;
    case "repos":    return <ReposStage />;
    case "misc":     return <MiscStage />;
    default:         return <HomeStage />;
  }
}

const AppContent = () => {
  const { state, go, setFilter, toggleEntry } = useRouter();
  const { crt, toggleCrt, setTheme } = useTheme();
  const { log } = useActivityLog();
  const isFirstRender = useRef(true);
  const hasBooted = useRef(false);

  // Boot sequence — hasBooted guard inside effect handles StrictMode double-invoke
  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const interval = 150;
    const msgs: Array<[Parameters<typeof log>[0], string]> = [
      ["system", "initializing terminal..."],
      ["system", `platform: ${navigator.platform ?? "unknown"}`],
      ["system", `browser: ${
        navigator.userAgent.includes("Firefox") ? "firefox"
        : navigator.userAgent.includes("Edg") ? "edge"
        : navigator.userAgent.includes("Chrome") ? "chrome"
        : navigator.userAgent.includes("Safari") ? "safari"
        : "unknown"
      }`],
      ["system", `cpu cores: ${navigator.hardwareConcurrency ?? "unknown"}`],
      ["system", `display: ${window.screen.width}x${window.screen.height} @${window.devicePixelRatio ?? 1}x`],
      ["system", `locale: ${navigator.language ?? "unknown"}`],
      ["system", "session ready · v3.0.0-c · ship"],
    ];
    msgs.forEach(([type, msg], i) => setTimeout(() => log(type, msg), i * interval));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mark that first render has happened (for Stage transition suppression)
  const firstRender = isFirstRender.current;
  isFirstRender.current = false;

  return (
    <>
      <SEO
        title="Nathaniel Bowman — full-stack · infra · music software"
        description="nathaniel bowman — full-stack engineer, infra, and a soft spot for music software. day job at lightfeather; weekends are sites for musicians."
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": (import.meta.env.VITE_SITE_URL || "https://actuallyitsnathaniel.dev") + "/#website",
              url: import.meta.env.VITE_SITE_URL || "https://actuallyitsnathaniel.dev",
              name: "Nathaniel Bowman",
              description: "nathaniel bowman — full-stack engineer, infra, and a soft spot for music software.",
            },
            {
              "@type": "Person",
              "@id": (import.meta.env.VITE_SITE_URL || "https://actuallyitsnathaniel.dev") + "/#person",
              name: "Nathaniel Bowman",
              url: import.meta.env.VITE_SITE_URL || "https://actuallyitsnathaniel.dev",
              jobTitle: "Full-Stack Software Engineer",
              alumniOf: { "@type": "CollegeOrUniversity", name: "Azusa Pacific University", url: "https://www.apu.edu/" },
              sameAs: [
                "https://github.com/actuallyitsnathaniel",
                "https://linkedin.com/in/nathaniel-bowman",
              ],
            },
          ],
        }}
      />
      <ActivityLogBackground isCRT={crt} />
      <Shell
        routerState={state}
        go={go}
        setFilter={setFilter}
        toggleEntry={toggleEntry}
        crt={crt}
        onToggleCrt={toggleCrt}
        setTheme={setTheme}
        isFirstRender={firstRender}
      >
        {renderStage}
      </Shell>
    </>
  );
};

const App = () => (
  <ActivityLogProvider>
    <AppContent />
  </ActivityLogProvider>
);

export default App;
