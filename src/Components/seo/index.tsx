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
  image,
  url,
  type = "website",
  jsonLd,
}: SEOProps) => {
  // Use environment variables for URLs
  const siteUrl =
    import.meta.env.VITE_SITE_URL || "https://dev.actuallyitsnathaniel.com";
  const isProduction = import.meta.env.VITE_IS_PRODUCTION === "true";

  const finalUrl = url || siteUrl;
  const finalImage = image || `${siteUrl}/og-image.jpg`;
  const fullTitle = title.includes("Nathaniel Bowman")
    ? title
    : `${title} | Nathaniel Bowman`;

  useHead({
    title: fullTitle,
    meta: [
      { name: "title", content: fullTitle },
      { name: "description", content: description },
      // Use noindex on dev/staging to prevent duplicate content
      {
        name: "robots",
        content: isProduction ? "index, follow" : "noindex, nofollow",
      },
      { name: "language", content: "English" },
      { name: "author", content: "Nathaniel Bowman" },
      { property: "og:type", content: type },
      { property: "og:url", content: finalUrl },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: finalImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "627" },
      { property: "og:image:alt", content: fullTitle },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Nathaniel Bowman" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: finalUrl },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: finalImage },
    ],
    link: [{ rel: "canonical", href: finalUrl }],
    script: jsonLd
      ? [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }]
      : [],
  });

  return null;
};

export default SEO;
