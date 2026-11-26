import { useTranslations } from "next-intl";
import { formatPrice, type Currency } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface PriceProps {
  eur: number | null;
  usd: number | null;
  unit?: "project" | "month";
  className?: string;
}

/**
 * Renders BOTH configured prices; CSS (see globals.css) shows the one that
 * matches <html data-currency>. Works in server and client components, needs no
 * JS to switch, and never converts between currencies.
 */
export function Price({ eur, usd, unit = "project", className }: PriceProps) {
  const t = useTranslations("common");

  const render = (amount: number | null, currency: Currency) =>
    amount === null ? (
      <span className="text-[0.85em] font-semibold">{t("priceOnRequest")}</span>
    ) : (
      <>
        <bdi dir="ltr">{formatPrice(amount, currency)}</bdi>
        {unit === "month" && (
          <span className="ms-1 text-[0.6em] font-medium opacity-70">{t("perMonth")}</span>
        )}
      </>
    );

  return (
    <span className={cn("inline-block", className)}>
      <span data-cur="EUR">{render(eur, "EUR")}</span>
      <span data-cur="USD">{render(usd, "USD")}</span>
    </span>
  );
}
