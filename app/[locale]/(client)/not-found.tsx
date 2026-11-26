import { Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("common");
  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-darkOrange/10 to-darkOrange/20 via-darkOrange/10 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center py-20 md:py-32">
        <div className="space-y-4">
          <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
          <p className="text-3xl font-semibold text-gray-600">{t("notFoundTitle")}</p>
          <p className="text-xl text-gray-500">{t("notFoundText")}</p>
        </div>
        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-2 text-base font-medium rounded-md text-white bg-darkOrange hover:bg-darkOrange/90 transition-colors duration-300"
          >
            <Home className="h-5 w-5" />
            {t("goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
