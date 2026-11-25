import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { whatsappLink } from "@/config/site";

/** Floating WhatsApp button (desktop + mobile). Number is configured in config/site.ts. */
export default function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  return (
    <a
      href={whatsappLink(t("general"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("floatingLabel")}
      title={t("floatingLabel")}
      className="fixed bottom-5 end-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-white/70 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E] print:hidden"
    >
      <FaWhatsapp className="size-8" aria-hidden="true" />
    </a>
  );
}
