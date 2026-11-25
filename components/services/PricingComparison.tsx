import { useTranslations } from "next-intl";
import { Price } from "@/components/currency/Price";
import { tiers, type Service } from "@/lib/services/types";

export default function PricingComparison({ service }: { service: Service }) {
  const t = useTranslations("pricing");
  const th = "px-4 py-3 text-start text-sm font-bold";
  const td = "px-4 py-3 text-sm";
  return (
    <div className="overflow-x-auto rounded-xl border border-primary/10 bg-white">
      <table className="w-full min-w-[480px] border-collapse">
        <caption className="sr-only">{t("compareTitle")}</caption>
        <thead>
          <tr className="border-b border-primary/10 bg-primary/5">
            <td className={td} />
            {tiers.map((tier) => (
              <th key={tier} scope="col" className={`${th} ${tier === "standard" ? "text-darkOrange" : ""}`}>
                {t(tier)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/10">
          <tr>
            <th scope="row" className={th}>{t("price")}</th>
            {tiers.map((tier) => (
              <td key={tier} className={`${td} font-bold`}>
                <Price eur={service.packages[tier].price.eur} usd={service.packages[tier].price.usd} unit={service.unit} />
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={th}>{t("deliveryTime")}</th>
            {tiers.map((tier) => (
              <td key={tier} className={td}>{t("deliveryDays", { count: service.packages[tier].deliveryDays })}</td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={th}>{t("revisions")}</th>
            {tiers.map((tier) => (
              <td key={tier} className={td}>{t("revisionCount", { count: service.packages[tier].revisions })}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
