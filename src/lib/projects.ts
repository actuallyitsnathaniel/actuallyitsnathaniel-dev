export interface ProjectEntry {
  ver: string;
  date: string;
  name: string;
  tag: string;
  role: string;
  stack: string;
  liveUrl?: string;
  bullets: Array<{ type: "add" | "note"; text: string }>;
  aliases: string[];
}

export const PROJECTS: ProjectEntry[] = [
  {
    ver: "v0.5.0",
    date: "2026–present",
    name: "jessica lea mayfield",
    tag: "full-stack · musician site",
    role: "full-stack engineer",
    stack:
      "react · typescript · vite · tailwindcss · strapi · railway · supabase · vercel",
    liveUrl: "https://jessicaleamayfieldofficial.com",
    aliases: ["jlm", "jessica", "mayfield"],
    bullets: [
      {
        type: "add",
        text: "built and maintained the full-stack site — frontend (react/ts), headless strapi cms, and cloud deployment on aws/vercel.",
      },
      {
        type: "add",
        text: "implemented lazy loading and image optimization for fast load times on mobile.",
      },
      {
        type: "add",
        text: "built real-time integrations for tour dates and content updates.",
      },
      {
        type: "add",
        text: "3k+ readers/mo on integrated blog — content managed directly in strapi.",
      },
      {
        type: "add",
        text: "custom contact forms, seo-optimized landing pages, 90+ lighthouse seo score.",
      },
      {
        type: "note",
        text: "image converter integrated inside the upload stream — −50% remote bucket storage vs. naive uploads.",
      },
    ],
  },
  {
    ver: "v0.4.0",
    date: "2023",
    name: "sahil jindal",
    tag: "full-stack · composer · SPA",
    role: "full-stack engineer",
    stack:
      "react · typescript · vite · tailwindcss · strapi · railway · supabase · vercel",
    liveUrl: "https://sahiljindal.com",
    aliases: ["sahil", "jindal", "composer"],
    bullets: [
      {
        type: "add",
        text: "single-page web app for composer with credits across netflix, dreamworks, and amazon prime.",
      },
      {
        type: "add",
        text: "custom audio player fitted for both mobile and desktop.",
      },
      {
        type: "add",
        text: "headless strapi cms so sahil manages his own content and credits without engineering support.",
      },
      {
        type: "note",
        text: "same image converter pipeline as jlm — deployed consistently across all strapi sites.",
      },
    ],
  },
  {
    ver: "v0.3.0",
    date: "2024-present",
    name: "dave wilbert music",
    tag: "custom shopify · popular country artist",
    role: "full-stack engineer · designer",
    stack: "shopify · liquid · custom theme · bandsintown api",
    liveUrl: "https://davewilbertmusic.com",
    aliases: ["dave", "wilbert", "shopify", "liquid"],
    bullets: [
      {
        type: "add",
        text: "shopify website built entirely from the ground up in liquid — the entire theme is custom, zero boilerplate.",
      },
      {
        type: "add",
        text: "designed entirely by me — layout, typography, color system, component library.",
      },
      {
        type: "add",
        text: "fully-custom audio player showcasing previews of his latest record.",
      },
      {
        type: "add",
        text: "site architected so any content editor familiar with the shopify theme editor can make deep changes.",
      },
      {
        type: "add",
        text: "custom tour dates page using bandsintown api — dramatically better than their embed widget.",
      },
      {
        type: "note",
        text: "saved hundreds in shopify app costs by implementing equivalent features natively.",
      },
    ],
  },
  {
    ver: "v0.2.0",
    date: "2023",
    name: "john white music",
    tag: "full-stack · songwriter",
    role: "full-stack engineer · designer",
    stack:
      "react · typescript · vite · tailwindcss · strapi · railway · supabase · vercel · bandsintown api",
    liveUrl: "https://johnwhitemusic.com",
    aliases: ["john", "white", "songwriter"],
    bullets: [
      {
        type: "add",
        text: "custom website with headless strapi cms — john manages his own content.",
      },
      {
        type: "add",
        text: "bandsintown tour component, stylized to fit the site theme (which i also designed).",
      },
      {
        type: "add",
        text: "custom discography component — metadata, platform links, streamlined ux so any user can click/tap directly to the song they want on their preferred platform.",
      },
      {
        type: "note",
        text: "discography component's design iterated from ryland and reused here with theme-specific tweaks.",
      },
    ],
  },
  {
    ver: "v0.1.0",
    date: "2022",
    name: "ryland",
    tag: "full-stack · indie alt band",
    role: "full-stack engineer · designer",
    stack:
      "react · typescript · vite · tailwindcss · strapi · railway · supabase · vercel · bandsintown api",
    liveUrl: "https://rylandband.com",
    aliases: ["ryland", "band", "origin"],
    bullets: [
      {
        type: "add",
        text: "the first site to feature the custom bandsintown component — now reused across the entire artist-sites portfolio.",
      },
      {
        type: "add",
        text: "the first to feature the custom discography component — same story.",
      },
      {
        type: "add",
        text: "headless strapi cms for content editing and updates.",
      },
      {
        type: "note",
        text: "this is the origin. every pattern (tour dates, discography, strapi cms, image pipeline) traces back to this build.",
      },
    ],
  },
  {
    ver: "v0.0.2",
    date: "2021",
    name: "cube",
    tag: "mobile · satellite telemetry · apu space research",
    role: "mobile engineer",
    stack: "react native · typescript · google cloud platform",
    aliases: ["cube", "cubesat", "satellite", "telemetry", "apu", "space"],
    bullets: [
      {
        type: "add",
        text: "mobile app parsing live telemetry from a CubeSat to user smartphones — built with react native and typescript.",
      },
      {
        type: "add",
        text: "integrated google cloud platform for data relay between satellite hardware and the mobile client.",
      },
      {
        type: "note",
        text: "built as part of azusa pacific university's space research program — production-adjacent hardware constraints.",
      },
    ],
  },
  {
    ver: "v0.0.1",
    date: "2019",
    name: "fiber path tool",
    tag: "tooling · google apps script · apu it",
    role: "developer",
    stack: "google apps script · javascript · google sheets",
    aliases: ["fiber", "fiberpath", "gsheets", "appsscript", "apu", "network"],
    bullets: [
      {
        type: "add",
        text: "database parsing tool inside google sheets — iterates fiber optic cabling documentation and generates the interconnected route between any two locations.",
      },
      {
        type: "add",
        text: "custom menu injected directly into the google sheets ui via apps script — zero external tooling required for end users.",
      },
      {
        type: "note",
        text: "first production tool. written during university it work before formal engineering experience.",
      },
    ],
  },
];
