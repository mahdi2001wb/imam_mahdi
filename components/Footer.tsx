import React from "react";
import { useTranslations } from "next-intl";
import Container from "./Container";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { headerLinks } from "@/constants/data";
import { Link } from "@/i18n/navigation";
import { categories } from "@/lib/services/categories";
import { mailtoLink, siteConfig, whatsappLink } from "@/config/site";

const Footer = () => {
  const t = useTranslations("footer");
  const nav = useTranslations("navigation");
  const services = useTranslations("services.categories");
  const common = useTranslations("common");
  const whatsapp = useTranslations("whatsapp");

  const linkClass = "hover:text-darkOrange hoverEffect";
  const colTitle = "text-base capitalize font-semibold text-primary/80";
  const colList = "flex flex-col mt-2 gap-2 text-sm font-medium text-primary/80";

  return (
    <div className="py-12 bg-primary/5">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-5 lg:gap-20">
        <div className="flex flex-col gap-3 lg:col-span-3">
          <Logo className="w-[88px]">Imam Mahdi</Logo>
          <p className="text-sm tracking-wide">
            {t("about", { years: siteConfig.stats.yearsExperience })}
          </p>
          <SocialLinks />
        </div>
        <div className="hidden lg:inline-flex" />
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h2 className={colTitle}>{t("usefulLinks")}</h2>
            <div className={colList}>
              {headerLinks.map(({ key, href }) => (
                <Link key={key} href={href} className={linkClass}>
                  {nav(key)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className={colTitle}>{t("servicesTitle")}</h2>
            <div className={colList}>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/services?category=${c.id}`}
                  className={linkClass}
                >
                  {services(`${c.id}.name`)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className={colTitle}>{t("contactTitle")}</h2>
            <div className={colList}>
              <a href={mailtoLink()} className={linkClass}>
                {common("email")}
              </a>
              <a
                href={whatsappLink(whatsapp("general"))}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {common("whatsapp")}
              </a>
              <Link href="/order" className={linkClass}>
                {t("orderProject")}
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <Container className="mt-10 border-t border-primary/10 pt-6 text-sm text-primary/70">
        {t("rights", { year: new Date().getFullYear() })}
      </Container>
    </div>
  );
};

export default Footer;
