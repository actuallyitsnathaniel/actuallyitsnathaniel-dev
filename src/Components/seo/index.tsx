import { useHead } from "@unhead/react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "music.album" | "music.song" | "profile";
  jsonLd?: object;
}

const SEO = ({
  title = "Nathaniel Bowman - Full-Stack Developer & Software Engineer",
  description = "Portfolio of Nathaniel Bowman - Full-Stack Web & Mobile Developer specializing in React, TypeScript, AWS, and modern web technologies. B.S. Computer Science from APU.",
  image = "https://actuallyitsnathaniel.dev/og-image.png",
  url = "https://actuallyitsnathaniel.dev",
  type = "website",
  jsonLd,
}: SEOProps) => {
  const fullTitle = title.includes("Nathaniel Bowman") ? title : `${title} | Nathaniel Bowman`;

  useHead({
    title: fullTitle,
    meta: [
      { name: "title", content: fullTitle },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { name: "language", content: "English" },
      { name: "author", content: "Nathaniel Bowman" },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:site_name", content: "Nathaniel Bowman" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: url },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    link: [{ rel: "canonical", href: url }],
    script: jsonLd ? [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] : [],
  });

  return null;
};

export default SEO;
