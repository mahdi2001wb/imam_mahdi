import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./locales";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Always prefix: /en, /it, /bn, /es, /fr, /de, /ar
  localePrefix: "always",
  // Remember a manual language choice (cookie is only written once a locale is
  // chosen by URL; it never overrides an explicit /xx URL).
  localeCookie: { name: "NEXT_LOCALE", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" },
});
