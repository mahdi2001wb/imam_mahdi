"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/components/currency/CurrencyProvider";
import { currencies, currencyConfig } from "@/lib/currency";

export default function CurrencySwitcher() {
  const t = useTranslations("navigation");
  const { currency, setCurrency } = useCurrency();

  return (
    <Menu as="div" className="relative">
      <MenuButton
        aria-label={`${t("currency")}: ${currency}`}
        className="flex h-10 items-center gap-1.5 rounded-md border border-darkColor/15 bg-white/60 px-2.5 text-sm font-semibold hover:border-darkOrange hover:text-darkOrange hoverEffect data-[open]:border-darkOrange"
      >
        <span aria-hidden="true">{currencyConfig[currency].symbol}</span>
        <span className="hidden sm:inline">{currency}</span>
        <ChevronDown className="size-4 opacity-60" aria-hidden="true" />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="z-[60] mt-2 w-44 rounded-lg border border-darkColor/10 bg-white p-1 shadow-xl focus:outline-none [--anchor-gap:4px]"
      >
        {currencies.map((code) => {
          const active = code === currency;
          return (
            <MenuItem key={code}>
              <button
                type="button"
                onClick={() => setCurrency(code)}
                aria-current={active ? "true" : undefined}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-start text-sm data-[focus]:bg-darkOrange/10 ${
                  active ? "bg-darkOrange/10 font-bold text-darkOrange" : "font-medium text-darkColor"
                }`}
              >
                <span className="w-4 text-center font-bold" aria-hidden="true">
                  {currencyConfig[code].symbol}
                </span>
                <span className="flex-1">{code}</span>
                {active && <Check className="size-4" aria-hidden="true" />}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
