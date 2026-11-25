import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subtitle?: string;
  as?: "h2" | "h3";
  className?: string;
  align?: "center" | "start";
  id?: string;
}

export default function SectionHeading({ title, subtitle, as: Tag = "h2", className, align = "start", id }: Props) {
  return (
    <div className={cn("mb-8", align === "center" && "text-center", className)}>
      <Tag id={id} className="text-2xl md:text-3xl font-bold tracking-wide">
        {title}
      </Tag>
      {subtitle && <p className="mt-2 text-primary/70">{subtitle}</p>}
    </div>
  );
}
