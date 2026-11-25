import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations("common");
  return (
    <div>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 rtl:focus:left-auto rtl:focus:right-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-darkOrange focus:px-4 focus:py-2 focus:text-white"
      >
        {t("skipToContent")}
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
