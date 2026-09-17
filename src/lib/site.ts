import { ABOUT } from "./about.js";

export const SITE_URL = "https://dev.actuallyitsnathaniel.com";
export const SITE_NAME = "Nathaniel Bowman";
export const SITE_BRAND = "actuallyitsnathaniel";
export const SITE_EMAIL = "nathanielrbowman@gmail.com";
export const SITE_DESCRIPTION =
  "Nathaniel Bowman (actuallyitsnathaniel) is a full-stack engineer in Los Angeles. Portfolio, MCP server, and public API covering work history, toolbelt, resume, and contact.";

export const SAME_AS = [
  "https://github.com/actuallyitsnathaniel",
  "https://linkedin.com/in/nathaniel-bowman",
] as const;

export const ADDRESS = {
  "@type": "PostalAddress" as const,
  addressLocality: "Los Angeles",
  addressRegion: "CA",
  addressCountry: "US",
};

export const CONTACT_POINT = {
  "@type": "ContactPoint" as const,
  email: SITE_EMAIL,
  contactType: "professional",
  availableLanguage: "English",
};

export const MCP_URL = `${SITE_URL}/api/mcp`;
export const MCP_DOCS_URL = `${SITE_URL}/api/mcp-docs`;
export const OPENAPI_URL = `${SITE_URL}/openapi.json`;
export const API_BASE = `${SITE_URL}/api/v1`;
export const PRM_URL = `${SITE_URL}/.well-known/oauth-protected-resource`;

export function jsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: SITE_BRAND,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        alternateName: SITE_BRAND,
        url: SITE_URL,
        email: SITE_EMAIL,
        jobTitle: "Full-Stack Software Engineer",
        description: SITE_DESCRIPTION,
        image: `${SITE_URL}/og-image.jpg`,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Azusa Pacific University",
          url: "https://www.apu.edu/",
        },
        worksFor: {
          "@type": "Organization",
          name: "Lightfeather",
          url: "https://lightfeather.io",
        },
        address: ADDRESS,
        sameAs: [...SAME_AS],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: SITE_BRAND,
        url: SITE_URL,
        email: SITE_EMAIL,
        description: SITE_DESCRIPTION,
        founder: { "@id": `${SITE_URL}/#person` },
        logo: `${SITE_URL}/logo512.png`,
        address: ADDRESS,
        contactPoint: CONTACT_POINT,
        sameAs: [...SAME_AS],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "Full-stack engineering by Nathaniel Bowman",
        url: `${SITE_URL}/developers`,
        serviceType: "Software engineering",
        provider: { "@id": `${SITE_URL}/#person` },
        areaServed: "US",
        description:
          "Full-stack, infrastructure, and music-software engineering. Public MCP and REST API for agents that need Nathaniel Bowman's bio, projects, skills, or contact info.",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is Nathaniel Bowman?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nathaniel Bowman (actuallyitsnathaniel) is a full-stack software engineer in Los Angeles. He has four years of production experience at Lightfeather and builds sites and tools for independent musicians.",
            },
          },
          {
            "@type": "Question",
            name: "Why hire Nathaniel Bowman?",
            acceptedAnswer: {
              "@type": "Answer",
              text: ABOUT.noteShort,
            },
          },
          {
            "@type": "Question",
            name: "How do I contact Nathaniel Bowman?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Email nathanielrbowman@gmail.com, or use GitHub (actuallyitsnathaniel) and LinkedIn (nathaniel-bowman). Programmatic contact: GET https://dev.actuallyitsnathaniel.com/api/v1/contact or the MCP tool get_contact.",
            },
          },
          {
            "@type": "Question",
            name: "How do AI agents use this site?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Connect to the MCP server at https://dev.actuallyitsnathaniel.com/api/mcp (also /.well-known/mcp), read /llms.txt, or call the public REST API at /api/v1. No API key is required. Auth details are in /auth.md.",
            },
          },
          {
            "@type": "Question",
            name: "Where is the OpenAPI spec?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "https://dev.actuallyitsnathaniel.com/openapi.json — also linked from /developers and /.well-known/api-catalog.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
          { "@type": "ListItem", position: 3, name: "Developers", item: `${SITE_URL}/developers` },
          { "@type": "ListItem", position: 4, name: "Docs", item: `${SITE_URL}/docs` },
        ],
      },
    ],
  };
}
