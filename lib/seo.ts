import type { Metadata } from "next";
import { getSiteUrl } from "@/config/site";
import { defaultLocale, localeConfig, locales, type Locale } from "@/i18n/locales";

/** "/services" → "/en/services"; "/" → "/en" */
export function localizedPath(locale: Locale, path = "/"): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function absoluteUrl(locale: Locale, path = "/"): string {
  return `${getSiteUrl()}${localizedPath(locale, path)}`;
}

/** Canonical + hreflang alternates (including x-default → English). */
export function alternates(locale: Locale, path = "/") {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl(defaultLocale, path);
  return { canonical: absoluteUrl(locale, path), languages };
}

interface PageMetaInput {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  siteName: string;
  /** Orders/inquiry pages with query params should not be indexed separately. */
  noIndex?: boolean;
}

export function pageMetadata({
  locale,
  path = "/",
  title,
  description,
  siteName,
  noIndex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(locale, path);
  return {
    title,
    description,
    alternates: alternates(locale, path),
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName,
      locale: localeConfig[locale].ogLocale,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeConfig[l].ogLocale),
    },
    twitter: { card: "summary", title, description },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
