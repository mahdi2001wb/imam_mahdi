import ButtonLink from "@/components/shared/ButtonLink";
import type { Tier } from "@/lib/services/types";

/** Links to the order/inquiry page with the service (and optionally package) pre-selected. */
export default function OrderButton({
  slug, tier, children, variant = "primary", size, className,
}: {
  slug: string;
  tier?: Tier;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "dark";
  size?: "md" | "lg";
  className?: string;
}) {
  const query = `service=${slug}${tier ? `&package=${tier}` : ""}`;
  return (
    <ButtonLink href={`/order?${query}`} variant={variant} size={size} className={className}>
      {children}
    </ButtonLink>
  );
}
