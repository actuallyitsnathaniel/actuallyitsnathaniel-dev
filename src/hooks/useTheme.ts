import { useEffect, useState } from "react";

export type ThemeName = "green" | "amber" | "mono";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(
    () => (localStorage.getItem("ain_theme") as ThemeName) ?? "green"
  );
  const [crt, setCrtState] = useState<boolean>(
    () => localStorage.getItem("ain_crt") === "1"
  );

  const setTheme = (t: ThemeName) => setThemeState(t);
  const setCrt = (v: boolean) => setCrtState(v);
  const toggleCrt = () => setCrtState(v => !v);

  useEffect(() => {
    if (theme === "green") document.body.removeAttribute("data-theme");
    else document.body.dataset.theme = theme;
    localStorage.setItem("ain_theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("crt-on", crt);
    localStorage.setItem("ain_crt", crt ? "1" : "0");
  }, [crt]);

  return { theme, setTheme, crt, setCrt, toggleCrt };
}
