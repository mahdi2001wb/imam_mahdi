import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "dark" | "whatsapp" | "light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-darkOrange text-white border-darkOrange hover:bg-darkOrange/90",
  outline:
    "bg-transparent text-primary border-primary/25 hover:border-darkOrange hover:text-darkOrange",
  dark: "bg-primary text-white border-primary hover:bg-primary/85",
  whatsapp: "bg-[#25D366] text-white border-[#25D366] hover:bg-[#1fb857]",
  light: "bg-white text-primary border-white hover:bg-white/90",
};
const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md border font-bold tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-darkBlue";

export const buttonClass = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  cn(base, variants[variant], sizes[size], className);

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

/** Internal (locale-aware) link styled as a button. */
export default function ButtonLink({ href, children, variant, size, className }: Props) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}

/** External anchor (WhatsApp, mailto…) styled as a button. */
export function ButtonAnchor({
  href,
  children,
  variant,
  size,
  className,
  external,
}: Props & { external?: boolean }) {
  return (
    <a
      href={href}
      className={buttonClass(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
