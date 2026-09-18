import { useEffect, useState } from "react";

export const THEME_NAMES = [
  "green", "amber", "mono",
  "red", "orange", "yellow", "lime", "teal", "cyan",
  "sky", "blue", "indigo", "violet", "purple", "fuchsia",
  "pink", "rose", "slate", "zinc",
  "gold", "coral", "mint", "lavender", "peach",
  "sage", "dusk", "ember", "frost", "neon",
] as const;

export type ThemeName = (typeof THEME_NAMES)[number];

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
