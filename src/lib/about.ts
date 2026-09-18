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
  /** Short hire-me graf. MCP, REST, markdown twins, crawler HTML — not the long note. */
  noteShort:
    "in an ai-saturated stack, generating code is cheap. deciding whether it should ship is not. " +
    "i use the models; i even build surfaces for them. the hire is for what happens after the output exists — " +
    "reading the change, seeing the blast radius, and putting my name on what lands in a system that cannot afford to fall over. " +
    "that used to sit on top of the job. it's the job now.",
  /** Long note. Human AboutStage only — never agent adapters. */
  noteTitle: "why hire me? — an essay",
  note: [
    "in the last few years, the cost of writing software collapsed. a model now drafts the function, the test, the pr — all faster than most people can open the file. that's useful, and it's certainly not the scarce part of the work. the scarce part is (and always has been) understanding the system well enough to decide whether that change belongs in it.",
    'writing was never what distinguished this job at the end of the table. reading was. reviewing was. knowing which "correct" patch takes down a path that only fails under load, or only for this tenant, or only after the cache expires. models are strong (VERY strong) on the common case. production, however, is a pile of uncommon cases that accumulate for reasons no readme can fully explain. someone still has to see those.',
    'i\'m not arguing from what models cannot do. that list shrinks every quarter, and "they struggle with niche cases, so you still need a human" is a leftover-human pitch. frankly, i use the generators. this site speaks to agents on purpose. you hire me for what happens after the output exists: someone who can tell a confident wrong answer from a real api, a clever shortcut from a future incident, a green ci from a system that is actually safe — and who is still the name on the commit when it ships. a model does not own the outage. a model does not remember that this service is the one that pages if you touch the wrong iam statement. a person who has lived in load-bearing systems does.',
    "so the stance is not \"ai writes, humans remain for the scraps.\" the stance is: i will use every tool that makes me faster, and i will still be the one who reads the result. i'm not allergic to the tooling. i'm allergic to shipping something i did not understand. that is the difference between output and engineering.",
    'you should hire me for that difference. four years in federal enterprise at lightfeather — serverless aws, pipelines, observability, the parts of the stack that only get noticed when they break. on the side, sites for musicians who should not have to fight their own software. both are the same job: make the system hold, and keep the craft out of the way. on an ai-saturated team, that looks like review. it looks like saying no to a clever pr. it looks like calling out the "smoking gun" that was actually a blank.',
    "the best engineering still looks invisible, because most of that invisibility has always been reading.",
    "",
    "p.s. em-dashes for life. don’t let AI ruin what i was taught to use in school.",
  ],
  facts: [
    {
      label: "edu",
      value: "azusa pacific university · b.s. computer science · 2021",
    },
    { label: "cert", value: "unqork creator · 2026" },
    { label: "exp", value: "4 yrs production · lightfeather.io" },
    { label: "loc", value: "los angeles · pst" },
    { label: "stack", value: "react · node · aws · postgres" },
  ] as AboutFact[],
};
