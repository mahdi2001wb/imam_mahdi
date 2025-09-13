import { Facebook, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const footerData = [
  { label: "Github", href: "https://github.com/mahdi2001wb", icon: <Github /> },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/imam-mahdi-60a06a28b/",
    icon: <Linkedin />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/imam.mahdi.490907?_rdc=1&_rdr#",
    icon: <Facebook />,
  },
  {
    label: "Email",
    href: "mahsiimam0@gmail.com",
    icon: <Mail />,
  },
];

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3">
      {footerData?.map((item) => (
        <Link
          href={item?.href}
          key={item?.label}
          className="border border-darkOrange/50 p-2 rounded-lg text-primary/80 hover:border-darkOrange hover:text-darkOrange hover:bg-darkOrange/5 hoverEffect"
        >
          <span>{item?.icon}</span>
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
