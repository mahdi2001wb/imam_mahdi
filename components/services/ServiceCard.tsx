import Image from "next/image";
import { useTranslations } from "next-intl";
import { Price } from "@/components/currency/Price";
import ButtonLink from "@/components/shared/ButtonLink";
import { Link } from "@/i18n/navigation";
import type { ServiceSummary } from "@/lib/services/types";
import ServiceThumb from "./ServiceThumb";

export default function ServiceCard({ service }: { service: ServiceSummary }) {
  const t = useTranslations("services");
  const common = useTranslations("common");
  const href = `/services/${service.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-darkOrange/40 hover:shadow-lg">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
        {service.thumbnail ? (
          <Image
            src={service.thumbnail}
            alt=""
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ServiceThumb
            category={service.category}
            icon={service.icon}
            className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="w-fit rounded-full bg-darkBlue/10 px-3 py-1 text-xs font-semibold text-darkBlue">
          {t(`categories.${service.category}.name`)}
        </span>
        <h3 className="text-lg font-bold leading-snug">
          <Link href={href} className="hover:text-darkOrange hoverEffect">
            {service.title}
          </Link>
        </h3>
        <p className="line-clamp-3 flex-1 text-sm leading-6 text-primary/70">{service.short}</p>

        <div className="flex items-end justify-between gap-3 border-t border-primary/10 pt-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary/60">
            {common("startingAt")}
          </span>
          <Price
            eur={service.startingEur}
            usd={service.startingUsd}
            unit={service.unit}
            className="text-2xl font-extrabold text-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ButtonLink href={href} variant="outline">
            {common("viewDetails")}
          </ButtonLink>
          <ButtonLink href={`/order?service=${service.slug}`} variant="primary">
            {common("orderNow")}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
