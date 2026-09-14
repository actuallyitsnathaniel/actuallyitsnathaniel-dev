export interface AboutFact {
  label: string;
  value: string;
}

export const ABOUT = {
  bio:
    "i build full-stack systems with an emphasis on infrastructure and craftsmanship for systems that can't afford to fall over. " +
    "four years in production at lightfeather — serverless aws, ci/cd pipelines, observability, the load-bearing parts of the stack. " +
    "on the side, i build sites and small tools for independent musicians, because the people who make my favorite records shouldn't " +
    "have to fight their own software.",
  tagline:
    "the best engineering looks invisible — just as good production sits behind a song instead of in front of it.",
  facts: [
    { label: "edu", value: "azusa pacific university · b.s. computer science · 2021" },
    { label: "cert", value: "unqork creator · 2026" },
    { label: "exp", value: "4 yrs production · lightfeather.io" },
    { label: "loc", value: "los angeles · pst" },
    { label: "stack", value: "react · node · aws · postgres" },
  ] as AboutFact[],
};
