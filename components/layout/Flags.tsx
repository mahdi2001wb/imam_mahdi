import type { FlagId } from "@/i18n/locales";

/** Small inline SVG flags (emoji flags do not render on Windows). 24×16 viewBox. */
const flags: Record<FlagId, React.ReactNode> = {
  gb: (
    <>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#fff" strokeWidth="3" />
      <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="5" />
      <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="3" />
    </>
  ),
  it: (
    <>
      <rect width="8" height="16" fill="#009246" />
      <rect x="8" width="8" height="16" fill="#fff" />
      <rect x="16" width="8" height="16" fill="#CE2B37" />
    </>
  ),
  bd: (
    <>
      <rect width="24" height="16" fill="#006A4E" />
      <circle cx="10.5" cy="8" r="4.5" fill="#F42A41" />
    </>
  ),
  es: (
    <>
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
    </>
  ),
  fr: (
    <>
      <rect width="8" height="16" fill="#0055A4" />
      <rect x="8" width="8" height="16" fill="#fff" />
      <rect x="16" width="8" height="16" fill="#EF4135" />
    </>
  ),
  de: (
    <>
      <rect width="24" height="5.34" fill="#000" />
      <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
      <rect y="10.66" width="24" height="5.34" fill="#FFCE00" />
    </>
  ),
  // Simplified (green field with white sword line)
  sa: (
    <>
      <rect width="24" height="16" fill="#006C35" />
      <path d="M5 11.5H19" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M7 6.5H17" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="1.6 1.2" />
    </>
  ),
};

export function Flag({ id, className = "h-4 w-6" }: { id: FlagId; className?: string }) {
  return (
    <span className="inline-flex shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/15">
      <svg viewBox="0 0 24 16" className={className} aria-hidden="true" focusable="false">
        {flags[id]}
      </svg>
    </span>
  );
}
