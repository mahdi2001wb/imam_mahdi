import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Logo = ({ children, className }: Props) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "text-xl font-bold hover:text-darkOrange hoverEffect group",
        className
      )}
    >
      <p className="flex items-end relative">
        {children}
        <span className="absolute -right-5 rtl:-left-5 rtl:right-auto -bottom-1 text-darkOrange group-hover:text-darkColor">
          <Dot className="w-7 h-7" />
        </span>
      </p>
    </Link>
  );
};

export default Logo;
