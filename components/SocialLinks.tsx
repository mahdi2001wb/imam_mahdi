import { Facebook, Github, Linkedin, Mail } from "lucide-react";
import { mailtoLink, siteConfig } from "@/config/site";

const footerData = [
  { label: "GitHub", href: siteConfig.social.github, icon: <Github />, external: true },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: <Linkedin />, external: true },
  { label: "Facebook", href: siteConfig.social.facebook, icon: <Facebook />, external: true },
  { label: "Email", href: mailtoLink(), icon: <Mail />, external: false },
];

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3">
      {footerData.map((item) => (
        <a
          href={item.href}
          key={item.label}
          aria-label={item.label}
          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="border border-darkOrange/50 p-2 rounded-lg text-primary/80 hover:border-darkOrange hover:text-darkOrange hover:bg-darkOrange/5 hoverEffect"
        >
          <span>{item.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
