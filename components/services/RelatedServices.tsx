import type { ServiceSummary } from "@/lib/services/types";
import ServiceCard from "./ServiceCard";

export default function RelatedServices({ services }: { services: ServiceSummary[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <ServiceCard key={s.slug} service={s} />
      ))}
    </div>
  );
}
