import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n/locales";
import { absoluteUrl } from "@/lib/seo";
import { getServiceSlugs } from "@/lib/services";

// /order is intentionally excluded (noindex).
const staticPaths = ["/", "/services", "/projects", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...getServiceSlugs().map((s) => `/services/${s}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path.startsWith("/services/") ? 0.7 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(l, path)])),
          "x-default": absoluteUrl(defaultLocale, path),
        },
      },
    }))
  );
}
