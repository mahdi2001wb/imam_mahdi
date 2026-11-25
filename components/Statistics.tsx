import React from "react";
import { useTranslations } from "next-intl";
import Container from "./Container";
import Counter from "./Counter";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

const Statistics = () => {
  const t = useTranslations("homepage");
  return (
    <div className=" w-full bg-darkGray text-primaryWhite mt-5">
      <Container className="py-10 flex items-center justify-between md:justify-normal gap-10 md:gap-32">
        <div>
          <h2 className="text-lg font-semibold leading-6">{t("statsTitle")}</h2>
          <Link
            href="/about"
            className="mt-5 inline-block bg-darkYellow text-primary text-sm px-6 py-2 rounded-sm font-semibold border border-darkYellow hover:bg-transparent hover:text-white hoverEffect"
          >
            {t("knowMore")}
          </Link>
        </div>
        <div>
          {siteConfig.stats.breakdown.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-10 justify-between w-full md:min-w-[310px] space-y-2 border-b border-b-primaryWhite/40 py-1 text-sm font-medium"
            >
              <p>{t(`statLabels.${item.key}`)}</p>
              <p className="font-semibold">
                <Counter end={item.number} />
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Statistics;
