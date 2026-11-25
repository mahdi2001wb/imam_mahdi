import { locales } from "@/i18n/locales";
import { currencies } from "@/lib/currency";

export const inquiryFields = [
  "name", "email", "service", "package", "currency", "language",
  "description", "budget", "deadline", "reference",
] as const;
export type InquiryField = (typeof inquiryFields)[number];

/** Error codes map to messages → forms.errors.<code> */
export type InquiryErrorCode =
  | "required" | "nameShort" | "emailInvalid" | "descriptionShort"
  | "descriptionLong" | "budgetInvalid" | "deadlineInvalid" | "deadlinePast"
  | "urlInvalid";

export interface InquiryData {
  name: string;
  email: string;
  /** "general" or a service slug */
  service: string;
  /** "" (not sure) or basic | standard | premium */
  package: string;
  currency: string;
  language: string;
  description: string;
  budget: string;
  deadline: string;
  reference: string;
}

export type InquiryErrors = Partial<Record<InquiryField, InquiryErrorCode>>;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const str = (v: unknown, max = 5000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function validateInquiry(
  input: Partial<Record<InquiryField, unknown>>,
  isKnownService: (slug: string) => boolean = () => true
): { data: InquiryData; errors: InquiryErrors } {
  const data: InquiryData = {
    name: str(input.name, 200),
    email: str(input.email, 320),
    service: str(input.service, 100) || "general",
    package: str(input.package, 20),
    currency: str(input.currency, 5) || "EUR",
    language: str(input.language, 5) || "en",
    description: str(input.description, 3100),
    budget: str(input.budget, 30).replace(",", "."),
    deadline: str(input.deadline, 10),
    reference: str(input.reference, 600),
  };
  const errors: InquiryErrors = {};

  if (!data.name) errors.name = "required";
  else if (data.name.length < 2 || data.name.length > 100) errors.name = "nameShort";

  if (!data.email) errors.email = "required";
  else if (data.email.length > 254 || !EMAIL_RE.test(data.email)) errors.email = "emailInvalid";

  if (data.service !== "general" && !isKnownService(data.service)) errors.service = "required";
  if (data.package && !["basic", "standard", "premium"].includes(data.package)) data.package = "";
  if (!(currencies as readonly string[]).includes(data.currency)) data.currency = "EUR";
  if (!(locales as string[]).includes(data.language)) data.language = "en";

  if (!data.description) errors.description = "required";
  else if (data.description.length < 20) errors.description = "descriptionShort";
  else if (data.description.length > 3000) errors.description = "descriptionLong";

  if (data.budget && !/^\d{1,9}(\.\d{1,2})?$/.test(data.budget)) errors.budget = "budgetInvalid";

  if (data.deadline) {
    const d = /^\d{4}-\d{2}-\d{2}$/.test(data.deadline) ? new Date(`${data.deadline}T00:00:00Z`) : null;
    if (!d || Number.isNaN(d.getTime())) errors.deadline = "deadlineInvalid";
    else if (d.getTime() < Date.now() - 36 * 3600 * 1000) errors.deadline = "deadlinePast"; // timezone tolerance
  }

  if (data.reference) {
    try {
      const u = new URL(data.reference);
      if (!["http:", "https:"].includes(u.protocol)) errors.reference = "urlInvalid";
    } catch {
      errors.reference = "urlInvalid";
    }
  }

  return { data, errors };
}
