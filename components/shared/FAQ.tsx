import { ChevronDown } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

/** Accessible accordion using native <details>; no client JavaScript. */
export default function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-primary/10 rounded-lg border border-primary/10 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown
              className="size-5 shrink-0 text-darkOrange transition-transform duration-300 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-sm leading-6 text-primary/75">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
