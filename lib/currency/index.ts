export const currencies = ["EUR", "USD"] as const;
export type Currency = (typeof currencies)[number];
export const defaultCurrency: Currency = "EUR";
export const CURRENCY_COOKIE = "currency";
export const CURRENCY_STORAGE_KEY = "currency";

/** Formatting locales per currency, as specified: en-IE for EUR, en-US for USD. */
export const currencyConfig: Record<
  Currency,
  { symbol: string; locale: string; name: string }
> = {
  EUR: { symbol: "€", locale: "en-IE", name: "Euro" },
  USD: { symbol: "$", locale: "en-US", name: "US Dollar" },
};

export function isCurrency(v: string | null | undefined): v is Currency {
  return v === "EUR" || v === "USD";
}

/** Formats an amount that was configured explicitly in this currency. No conversion ever happens. */
export function formatPrice(amount: number, currency: Currency): string {
  const { locale } = currencyConfig[currency];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Inline script run before first paint. Reads the saved currency and sets
 * <html data-currency="…"> so server-rendered prices show the right currency
 * without a flash or a hydration mismatch.
 */
export const currencyInitScript = `(function(){try{var m=document.cookie.match(/(?:^|; )${CURRENCY_COOKIE}=(EUR|USD)/);var c=m&&m[1];if(!c){c=localStorage.getItem('${CURRENCY_STORAGE_KEY}')}if(c==='EUR'||c==='USD'){document.documentElement.setAttribute('data-currency',c)}}catch(e){}})();`;
