import { Check, Clock, RefreshCw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Price } from "@/components/currency/Price";
import type { Locale } from "@/i18n/locales";
import { ADDON_PRICES } from "@/lib/services/prices";
import { text } from "@/lib/services";
import { tiers, type AddonKey, type Service } from "@/lib/services/types";
import { buttonClass } from "@/components/shared/ButtonLink";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default function PricingPackages({ service }: { service: Service }) {
  const t = useTranslations("pricing");
  const locale = useLocale() as Locale;

  const addons: AddonKey[] = [];
  for (const tier of tiers)
    for (const a of service.packages[tier].addons ?? []) if (!addons.includes(a)) addons.push(a);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
        {tiers.map((tier) => {
          const pkg = service.packages[tier];
          const recommended = tier === "standard";
          const name = pkg.name ? text(pkg.name, locale) : t(tier);
          const description = pkg.description ? text(pkg.description, locale) : t(`tierDescription.${tier}`);
          return (
            <section
              key={tier}
              aria-labelledby={`pkg-${tier}`}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm",
                recommended
                  ? "border-darkOrange ring-2 ring-darkOrange/30 lg:-my-2 lg:py-8 shadow-lg"
                  : "border-primary/10"
              )}
            >
              {recommended && (
                <span className="absolute -top-3 start-6 rounded-full bg-darkOrange px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {t("recommended")}
                </span>
              )}
              <h3 id={`pkg-${tier}`} className="text-xl font-bold">
                {name}
              </h3>
              <p className="mt-1 min-h-10 text-sm text-primary/70">{description}</p>

              <div className="mt-4 mb-5">
                <Price
                  eur={pkg.price.eur}
                  usd={pkg.price.usd}
                  unit={service.unit}
                  className="text-4xl font-extrabold"
                />
              </div>

              <dl className="mb-5 grid grid-cols-2 gap-3 rounded-lg bg-primary/5 p-3 text-sm">
                <div>
                  <dt className="flex items-center gap-1.5 text-primary/60">
                    <Clock className="size-4" aria-hidden="true" />
                    {t("deliveryTime")}
                  </dt>
                  <dd className="mt-1 font-semibold">{t("deliveryDays", { count: pkg.deliveryDays })}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-primary/60">
                    <RefreshCw className="size-4" aria-hidden="true" />
                    {t("revisions")}
                  </dt>
                  <dd className="mt-1 font-semibold">{t("revisionCount", { count: pkg.revisions })}</dd>
                </div>
              </dl>

              <ul className="mb-6 flex-1 space-y-2.5 text-sm" aria-label={t("included")}>
                {pkg.features.map((feature) => (
                  <li key={feature.key} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{t(`features.${feature.key}`, { count: feature.value ?? "" })}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/order?service=${service.slug}&package=${tier}`}
                className={buttonClass(recommended ? "primary" : "outline", "md", "w-full")}
              >
                {t("selectPackage")}
              </Link>
            </section>
          );
        })}
      </div>

      {addons.length > 0 && (
        <div className="mt-8 rounded-xl border border-primary/10 bg-white p-5">
          <h3 className="font-bold">{t("extras")}</h3>
          <p className="mt-1 text-sm text-primary/60">{t("extrasNote")}</p>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {addons.map((a) => (
              <li key={a} className="flex items-center justify-between gap-3 rounded-md bg-primary/5 px-3 py-2 text-sm">
                <span>{t(`addons.${a}`)}</span>
                <span className="font-bold">
                  +<Price eur={ADDON_PRICES[a].eur} usd={ADDON_PRICES[a].usd} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-primary/60">{t("note")}</p>
    </div>
  );
}
