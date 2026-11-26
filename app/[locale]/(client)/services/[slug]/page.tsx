import type { Metadata } from "next";
import { Check, ChevronRight, Clock, RefreshCw } from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Container from "@/components/Container";
import { Price } from "@/components/currency/Price";
import OrderButton from "@/components/inquiry/OrderButton";
import JsonLd from "@/components/shared/JsonLd";
import ButtonLink, { ButtonAnchor } from "@/components/shared/ButtonLink";
import FAQ, { type FaqItem } from "@/components/shared/FAQ";
import SectionHeading from "@/components/shared/SectionHeading";
import PricingComparison from "@/components/services/PricingComparison";
import PricingPackages from "@/components/services/PricingPackages";
import RelatedServices from "@/components/services/RelatedServices";
import ServiceGallery from "@/components/services/ServiceGallery";
import ServiceThumb from "@/components/services/ServiceThumb";
import { whatsappLink } from "@/config/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import {
  getRelated, getService, getServiceSlugs, keyFeatures, startingPrice, text, toSummary,
} from "@/lib/services";
import { PRICING_STATUS } from "@/lib/services/prices";
import { tiers } from "@/lib/services/types";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = service.seo?.title ? text(service.seo.title, locale as Locale) : t("serviceTitle", { title: text(service.title, locale as Locale) });
  const description = service.seo?.description ? text(service.seo.description, locale as Locale) : text(service.short, locale as Locale);
  return pageMetadata({ locale: locale as Locale, path: `/services/${slug}`, title, description, siteName: t("siteName") });
}

export default async function ServicePage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const service = getService(slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "services" });
  const common = await getTranslations({ locale, namespace: "common" });
  const pricing = await getTranslations({ locale, namespace: "pricing" });
  const faqT = await getTranslations({ locale, namespace: "faq" });
  const wa = await getTranslations({ locale, namespace: "whatsapp" });
  const nav = await getTranslations({ locale, namespace: "navigation" });

  const title = text(service.title, locale);
  const start = startingPrice(service);
  const features = keyFeatures(service);

  const faqItems: FaqItem[] = [
    ...(["delivery", "revisions", "payment", "custom"] as const).map((k) => ({
      q: faqT(`common.${k}.q`),
      a: faqT(`common.${k}.a`),
    })),
    ...(["a", "b"] as const).map((k) => ({
      q: faqT(`categories.${service.category}.${k}.q`),
      a: faqT(`categories.${service.category}.${k}.a`),
    })),
    ...(service.faqs ?? []).map((f) => ({ q: text(f.q, locale), a: text(f.a, locale) })),
  ];

  const related = getRelated(service).map((s) => toSummary(s, locale));
  const url = absoluteUrl(locale, `/services/${slug}`);
  const whatsappHref = whatsappLink(wa("service", { service: title }));

  // Prices go into structured data only once they are final (not while draft).
  const offers =
    PRICING_STATUS === "final"
      ? [
          start.eur !== null && { "@type": "Offer", price: start.eur, priceCurrency: "EUR", url },
          start.usd !== null && { "@type": "Offer", price: start.usd, priceCurrency: "USD", url },
        ].filter(Boolean)
      : undefined;

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: title,
              description: text(service.short, locale),
              url,
              inLanguage: locale,
              serviceType: t(`categories.${service.category}.name`),
              provider: { "@type": "Person", name: "Imam Mahdi" },
              areaServed: "Worldwide",
              ...(offers && offers.length ? { offers } : {}),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: nav("services"), item: absoluteUrl(locale, "/services") },
                { "@type": "ListItem", position: 2, name: title, item: url },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqItems.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      {/* Hero */}
      <section className="bg-primary/5 border-b border-primary/10">
        <Container className="py-10 md:py-14">
          <nav aria-label={t("breadcrumb")} className="mb-6 flex items-center gap-1.5 text-sm text-primary/70">
            <Link href="/services" className="hover:text-darkOrange">{nav("services")}</Link>
            <ChevronRight className="size-4 flip-rtl" aria-hidden="true" />
            <span aria-current="page" className="font-semibold text-primary">{title}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <Link
                href={`/services?category=${service.category}`}
                className="w-fit rounded-full bg-darkBlue/10 px-3 py-1 text-xs font-semibold text-darkBlue hover:bg-darkBlue/20"
              >
                {t(`categories.${service.category}.name`)}
              </Link>
              <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">{title}</h1>
              <p className="text-lg text-primary/75">{text(service.short, locale)}</p>

              <div className="flex items-baseline gap-3">
                <span className="text-sm font-semibold uppercase tracking-wide text-primary/60">{common("startingAt")}</span>
                <Price eur={start.eur} usd={start.usd} unit={service.unit} className="text-4xl font-extrabold" />
              </div>

              <div className="flex flex-wrap gap-3">
                <OrderButton slug={service.slug} size="lg">{common("orderNow")}</OrderButton>
                <ButtonLink href={`/contact?service=${service.slug}`} variant="outline" size="lg">
                  {common("contactMe")}
                </ButtonLink>
                <ButtonAnchor href={whatsappHref} variant="whatsapp" size="lg" external>
                  <FaWhatsapp className="size-5" aria-hidden="true" />
                  {common("whatsapp")}
                </ButtonAnchor>
              </div>
            </div>

            {service.thumbnail ? (
              <Image
                src={service.thumbnail}
                alt={t("thumbnailAlt", { title })}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[16/10] w-full rounded-2xl object-cover shadow-lg"
              />
            ) : (
              <ServiceThumb
                category={service.category}
                icon={service.icon}
                alt={t("thumbnailAlt", { title })}
                large
                className="aspect-[16/10] w-full rounded-2xl shadow-lg"
              />
            )}
          </div>
        </Container>
      </section>

      <Container className="space-y-16 py-14 md:py-20">
        {/* Overview + features + technologies */}
        <section className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading title={t("overview")} />
            <p className="text-base leading-7 text-primary/80">{text(service.short, locale)}</p>
            <p className="mt-4 text-base leading-7 text-primary/80">{t(`categories.${service.category}.description`)}</p>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="mb-3 text-xl font-bold">{t("keyFeatures")}</h2>
              <ul className="space-y-2.5 text-sm">
                {features.map((feature) => (
                  <li key={feature.key} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{pricing(`features.${feature.key}`, { count: feature.value ?? "" })}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-primary/60">{t("keyFeaturesNote")}</p>
            </div>
            <div>
              <h2 className="mb-3 text-xl font-bold">{t("technologies")}</h2>
              <ul className="flex flex-wrap gap-2" dir="ltr">
                {service.technologies.map((tech) => (
                  <li key={tech} className="rounded-full border border-primary/15 bg-white px-3 py-1 text-sm font-medium">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="scroll-mt-24">
          <SectionHeading title={t("packagesTitle")} subtitle={t("packagesText")} align="center" />
          <PricingPackages service={service} />
          <div className="mt-10">
            <h3 className="mb-4 text-xl font-bold">{pricing("compareTitle")}</h3>
            <PricingComparison service={service} />
          </div>
        </section>

        {/* Delivery & revisions */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-primary/10 bg-white p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Clock className="size-5 text-darkOrange" aria-hidden="true" />
              {t("deliveryTitle")}
            </h2>
            <ul className="mt-3 space-y-1 text-sm font-semibold">
              {tiers.map((tier) => (
                <li key={tier} className="flex justify-between">
                  <span>{pricing(tier)}</span>
                  <span>{pricing("deliveryDays", { count: service.packages[tier].deliveryDays })}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-primary/70">{t("deliveryText")}</p>
          </div>
          <div className="rounded-xl border border-primary/10 bg-white p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <RefreshCw className="size-5 text-darkOrange" aria-hidden="true" />
              {t("revisionTitle")}
            </h2>
            <ul className="mt-3 space-y-1 text-sm font-semibold">
              {tiers.map((tier) => (
                <li key={tier} className="flex justify-between">
                  <span>{pricing(tier)}</span>
                  <span>{pricing("revisionCount", { count: service.packages[tier].revisions })}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-primary/70">{t("revisionText")}</p>
          </div>
        </section>

        {/* Portfolio gallery */}
        {service.gallery.length > 0 && (
          <section>
            <SectionHeading title={t("gallery")} />
            <ServiceGallery images={service.gallery} title={title} />
          </section>
        )}

        {/* FAQ */}
        <section>
          <SectionHeading title={t("faqTitle")} />
          <FAQ items={faqItems} />
        </section>

        {/* Help CTA */}
        <section className="rounded-2xl bg-gradient-to-r from-darkOrange to-darkBlue p-8 text-center text-white md:p-12">
          <h2 className="text-2xl font-extrabold md:text-3xl">{t("helpTitle")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">{t("helpText")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href={`/contact?service=${service.slug}`} variant="light" size="lg">
              {common("contactMe")}
            </ButtonLink>
            <ButtonAnchor href={whatsappHref} variant="whatsapp" size="lg" external>
              <FaWhatsapp className="size-5" aria-hidden="true" />
              {common("whatsapp")}
            </ButtonAnchor>
          </div>
        </section>

        {/* Related */}
        <section>
          <SectionHeading title={t("related")} />
          <RelatedServices services={related} />
        </section>
      </Container>
    </div>
  );
}
