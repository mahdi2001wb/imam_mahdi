/**
 * Locale registry — the ONLY place you register a language.
 *
 * To add a new language:
 *  1. Create messages/<code>.json (missing keys fall back to English automatically)
 *  2. Add an entry below (and a flag in components/layout/Flags.tsx)
 *  3. Add its name to the `localeNames` object used by the language selector (same entry)
 */
export const localeConfig = {
  en: { name: "English", dir: "ltr", ogLocale: "en_US", flag: "gb" },
  it: { name: "Italiano", dir: "ltr", ogLocale: "it_IT", flag: "it" },
  bn: { name: "বাংলা", dir: "ltr", ogLocale: "bn_BD", flag: "bd" },
  es: { name: "Español", dir: "ltr", ogLocale: "es_ES", flag: "es" },
  fr: { name: "Français", dir: "ltr", ogLocale: "fr_FR", flag: "fr" },
  de: { name: "Deutsch", dir: "ltr", ogLocale: "de_DE", flag: "de" },
  ar: { name: "العربية", dir: "rtl", ogLocale: "ar_AR", flag: "sa" },
} as const;

export type Locale = keyof typeof localeConfig;
export type FlagId = (typeof localeConfig)[Locale]["flag"];

export const locales = Object.keys(localeConfig) as Locale[];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && value in localeConfig;
}
