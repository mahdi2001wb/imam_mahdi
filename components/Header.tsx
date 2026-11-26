"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import Container from "./Container";
import Logo from "./Logo";
import LanguageSwitcher from "./layout/LanguageSwitcher";
import CurrencySwitcher from "./layout/CurrencySwitcher";
import { headerLinks } from "@/constants/data";
import { Link, usePathname } from "@/i18n/navigation";

interface Props {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

const MobileNavButton = ({ showMenu, setShowMenu }: Props) => {
  const t = useTranslations("navigation");
  return (
    <button
      type="button"
      onClick={() => setShowMenu(!showMenu)}
      aria-expanded={showMenu}
      aria-controls="mobile-nav"
      aria-label={showMenu ? t("closeMenu") : t("openMenu")}
      className="flex size-10 items-center justify-center cursor-pointer rounded-lg hover:bg-black/5 lg:hidden duration-300"
    >
      {showMenu ? (
        <X className="size-6 text-gray-950" />
      ) : (
        <Menu className="size-6 text-gray-950" />
      )}
    </button>
  );
};

export const MobileNav = ({ showMenu, setShowMenu }: Props) => {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  return (
    <div className="lg:hidden" id="mobile-nav">
      {showMenu && (
        <nav aria-label={t("main")} className="flex flex-col px-4 pb-4 space-y-2">
          {headerLinks.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{
                duration: 0.15,
                ease: "easeInOut",
                rotateX: { duration: 0.3, delay: index * 0.1 },
              }}
              key={item.href}
              className="w-full flex flex-col"
              onClick={() => setShowMenu(false)}
            >
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={`text-sm hover:text-darkOrange uppercase font-semibold bg-darkColor/5 w-full px-5 py-2.5 ${
                  isActive(pathname, item.href) ? "text-darkOrange" : "text-primary"
                }`}
              >
                {t(item.key)}
              </Link>
            </motion.div>
          ))}
        </nav>
      )}
    </div>
  );
};

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navigation");
  return (
    <div className="bg-white sticky top-0 z-50 bg-white/70 backdrop-blur-md">
      <Container className="flex items-center justify-between gap-4 border-b border-b-darkColor/10 py-4">
        <Logo>Mahdi</Logo>
        <nav
          aria-label={t("main")}
          className="hidden lg:inline-flex items-center gap-7 font-semibold text-sm tracking-wide"
        >
          {headerLinks.map(({ key, href }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={key}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`${
                  active ? "text-darkOrange" : ""
                } relative group overflow-hidden hover:text-darkOrange hoverEffect`}
              >
                {t(key)}
                <span
                  className={`${
                    active ? "translate-x-0" : ""
                  } block w-full h-px bg-darkOrange -translate-x-[110%] rtl:translate-x-[110%] group-hover:translate-x-0 hoverEffect`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <CurrencySwitcher />
          <MobileNavButton showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
      </Container>
      <MobileNav showMenu={showMenu} setShowMenu={setShowMenu} />
    </div>
  );
};

export default Header;
