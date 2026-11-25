"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeConfig, locales, type Locale } from "@/i18n/locales";
import { Flag } from "./Flags";

export default function LanguageSwitcher() {
  const t = useTranslations("navigation");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    // Keep the current page, query string and hash; next-intl stores the choice in the NEXT_LOCALE cookie.
    const { search, hash } = window.location;
    startTransition(() => {
      router.replace(`${pathname}${search}${hash}`, { locale: next });
    });
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton
        aria-label={`${t("language")}: ${localeConfig[locale].name}`}
        className="flex h-10 items-center gap-2 rounded-md border border-darkColor/15 bg-white/60 px-2.5 text-sm font-semibold hover:border-darkOrange hover:text-darkOrange hoverEffect data-[open]:border-darkOrange"
      >
        <Flag id={localeConfig[locale].flag} />
        <span className="hidden sm:inline uppercase">{locale}</span>
        <ChevronDown className="size-4 opacity-60" aria-hidden="true" />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="z-[60] mt-2 w-52 origin-top rounded-lg border border-darkColor/10 bg-white p-1 shadow-xl focus:outline-none [--anchor-gap:4px]"
      >
        {locales.map((code) => {
          const active = code === locale;
          return (
            <MenuItem key={code}>
              <button
                type="button"
                lang={code}
                disabled={pending}
                onClick={() => switchTo(code)}
                aria-current={active ? "true" : undefined}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-start text-sm data-[focus]:bg-darkOrange/10 ${
                  active ? "bg-darkOrange/10 font-bold text-darkOrange" : "font-medium text-darkColor"
                }`}
              >
                <Flag id={localeConfig[code].flag} />
                <span className="flex-1">{localeConfig[code].name}</span>
                {active && <Check className="size-4" aria-hidden="true" />}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
