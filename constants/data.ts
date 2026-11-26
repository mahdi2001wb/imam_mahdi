// Header navigation. Labels live in messages/*.json → navigation.<key>.
export const headerLinks = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

// Homepage statistics now live in config/site.ts → siteConfig.stats
