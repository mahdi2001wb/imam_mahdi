"use client";

import { Search, SearchX } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useCurrency } from "@/components/currency/CurrencyProvider";
import SectionHeading from "@/components/shared/SectionHeading";
import { formatPrice } from "@/lib/currency";
import { categories, isCategoryId } from "@/lib/services/categories";
import type { CategoryId, ServiceSummary } from "@/lib/services/types";
import ServiceCard from "./ServiceCard";

type CategoryFilter = CategoryId | "all";
type Sort = "featured" | "priceLow" | "priceHigh" | "name";

/** Price filter ranges, applied to the starting price in the selected currency. */
const ranges = [
  { id: "any" },
  { id: "under", max: 50 },
  { id: "mid", min: 50, max: 150 },
  { id: "high", min: 150, max: 400 },
  { id: "over", min: 400 },
] as const;
type RangeId = (typeof ranges)[number]["id"];

const fold = (s: string, locale: string) =>
  s.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase(locale);

const selectClass =
  "h-11 w-full rounded-md border border-primary/20 bg-white px-3 text-sm font-medium outline-none focus:border-darkOrange";

export default function ServiceBrowser({ services }: { services: ServiceSummary[] }) {
  const t = useTranslations("services");
  const locale = useLocale();
  const { currency } = useCurrency();
  const params = useSearchParams();

  const initial = params.get("category");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(isCategoryId(initial) ? initial : "all");
  const [range, setRange] = useState<RangeId>("any");
  const [sort, setSort] = useState<Sort>("featured");

  const startOf = (s: ServiceSummary) => (currency === "EUR" ? s.startingEur : s.startingUsd);

  const rangeLabel = (r: (typeof ranges)[number]) => {
    const fmt = (n: number) => formatPrice(n, currency);
    if (r.id === "any") return t("anyPrice");
    if (r.id === "under") return t("priceUnder", { price: fmt(r.max) });
    if (r.id === "over") return t("priceOver", { price: fmt(r.min) });
    return t("priceBetween", { min: fmt(r.min), max: fmt(r.max) });
  };

  const filtering = query.trim() !== "" || category !== "all" || range !== "any";

  const visible = useMemo(() => {
    const q = fold(query.trim(), locale);
    const r = ranges.find((x) => x.id === range)!;
    const min = "min" in r ? r.min : 0;
    const max = "max" in r ? r.max : Infinity;

    const list = services.filter((s) => {
      if (category !== "all" && s.category !== category) return false;
      if (q && !fold(`${s.title} ${s.short}`, locale).includes(q)) return false;
      if (range !== "any") {
        const price = currency === "EUR" ? s.startingEur : s.startingUsd;
        if (price === null || price < min || price >= max) return false;
      }
      return true;
    });

    const price = (s: ServiceSummary) =>
      (currency === "EUR" ? s.startingEur : s.startingUsd) ?? Number.POSITIVE_INFINITY;
    const sorted = [...list];
    if (sort === "priceLow") sorted.sort((a, b) => price(a) - price(b));
    if (sort === "priceHigh")
      sorted.sort((a, b) => {
        const pa = price(a), pb = price(b);
        if (pa === Infinity && pb === Infinity) return 0;
        if (pa === Infinity) return 1;
        if (pb === Infinity) return -1;
        return pb - pa;
      });
    if (sort === "name") sorted.sort((a, b) => a.title.localeCompare(b.title, locale));
    if (sort === "featured") sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [services, query, category, range, sort, currency, locale]);

  const featured = services.filter((s) => s.featured);
  void startOf;

  const reset = () => {
    setQuery("");
    setCategory("all");
    setRange("any");
    setSort("featured");
  };

  const pill = (active: boolean) =>
    `whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
      active
        ? "border-darkOrange bg-darkOrange text-white"
        : "border-primary/20 bg-white hover:border-darkOrange hover:text-darkOrange"
    }`;

  return (
    <div>
      {!filtering && featured.length > 0 && (
        <section className="mb-16" aria-labelledby="featured-heading">
          <SectionHeading id="featured-heading" title={t("featuredTitle")} subtitle={t("featuredText")} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </section>
      )}

      <section id="all-services" aria-labelledby="all-heading" className="scroll-mt-24">
        <SectionHeading id="all-heading" title={t("allTitle")} />

        <div className="mb-6 space-y-4 rounded-xl border border-primary/10 bg-white p-4 md:p-5">
          <div className="relative">
            <label htmlFor="service-search" className="sr-only">
              {t("searchLabel")}
            </label>
            <Search
              className="pointer-events-none absolute start-3 top-1/2 size-5 -translate-y-1/2 text-primary/50"
              aria-hidden="true"
            />
            <input
              id="service-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="h-12 w-full rounded-md border border-primary/20 ps-10 pe-4 text-base outline-none focus:border-darkOrange"
            />
          </div>

          <div
            role="group"
            aria-label={t("category")}
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
          >
            <button type="button" onClick={() => setCategory("all")} aria-pressed={category === "all"} className={pill(category === "all")}>
              {t("allCategories")}
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                aria-pressed={category === c.id}
                className={pill(category === c.id)}
              >
                {t(`categories.${c.id}.name`)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="price-filter" className="mb-1 block text-sm font-semibold">
                {t("price")}
              </label>
              <select id="price-filter" value={range} onChange={(e) => setRange(e.target.value as RangeId)} className={selectClass}>
                {ranges.map((r) => (
                  <option key={r.id} value={r.id}>
                    {rangeLabel(r)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sort" className="mb-1 block text-sm font-semibold">
                {t("sort")}
              </label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={selectClass}>
                <option value="featured">{t("sortFeatured")}</option>
                <option value="priceLow">{t("sortPriceLow")}</option>
                <option value="priceHigh">{t("sortPriceHigh")}</option>
                <option value="name">{t("sortName")}</option>
              </select>
            </div>
          </div>
        </div>

        <p className="mb-4 text-sm font-medium text-primary/70" role="status" aria-live="polite">
          {t("resultsCount", { count: visible.length })}
        </p>

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-primary/20 py-16 text-center">
            <SearchX className="size-10 text-primary/40" aria-hidden="true" />
            <p className="text-lg font-semibold">{t("noResults")}</p>
            <p className="text-sm text-primary/70">{t("noResultsHint")}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 rounded-md bg-darkOrange px-5 py-2.5 text-sm font-bold text-white hover:bg-darkOrange/90"
            >
              {t("reset")}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
