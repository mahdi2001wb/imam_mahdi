import {
  Bug, Briefcase, CreditCard, Database, FileCode, Frame, Gauge, ImageIcon,
  LayoutGrid, LayoutTemplate, Megaphone, MousePointerClick, Package, Rocket,
  Search, Share2, ShoppingCart, SlidersHorizontal, Store, User, Wrench,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/lib/services/categories";
import type { CategoryId, ServiceIcon } from "@/lib/services/types";
import { cn } from "@/lib/utils";

const icons: Record<ServiceIcon, LucideIcon> = {
  FileCode, Database, Rocket, Briefcase, User, ShoppingCart, Store, Package,
  LayoutTemplate, SlidersHorizontal, MousePointerClick, Megaphone, Search,
  Share2, CreditCard, ImageIcon, Frame, LayoutGrid, Bug, Gauge, Wrench,
};

interface Props {
  category: CategoryId;
  icon: ServiceIcon;
  /** Accessible description (decorative when omitted). */
  alt?: string;
  className?: string;
  large?: boolean;
}

/**
 * Generated service thumbnail: category gradient + service icon.
 * Avoids stock/fake imagery; pass a real `thumbnail` on a service to override.
 */
export default function ServiceThumb({ category, icon, alt, className, large }: Props) {
  const Icon = icons[icon];
  const gradient = categories.find((c) => c.id === category)?.gradient ?? "from-primary to-darkGray";
  return (
    <div
      role={alt ? "img" : undefined}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br text-white",
        gradient,
        className
      )}
    >
      <span className="absolute -top-10 -end-10 size-40 rounded-full bg-white/10" />
      <span className="absolute -bottom-12 -start-8 size-36 rounded-full bg-white/10" />
      <Icon className={large ? "size-24 md:size-32" : "size-14"} strokeWidth={1.4} aria-hidden="true" />
    </div>
  );
}
