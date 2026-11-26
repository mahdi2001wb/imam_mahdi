/* eslint-disable @next/next/no-page-custom-font -- fonts in the root layout apply to every page (App Router) */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { localeConfig } from "@/i18n/locales";
import { CurrencyProvider } from "@/components/currency/CurrencyProvider";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { currencyInitScript, defaultCurrency } from "@/lib/currency";
import { getSiteUrl } from "@/config/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    metadataBase: new URL(getSiteUrl()),
    title: t("home.title"),
    description: t("home.description"),
    applicationName: t("siteName"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={localeConfig[locale].dir}
      data-currency={defaultCurrency}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap"
        />
        {locale === "ar" && (
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400..800&display=swap"
          />
        )}
        {locale === "bn" && (
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400..800&display=swap"
          />
        )}
        <script dangerouslySetInnerHTML={{ __html: currencyInitScript }} />
      </head>
      <body className="antialiased font-sans">
        <NextIntlClientProvider>
          <CurrencyProvider>
            {children}
            <WhatsAppButton />
          </CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
