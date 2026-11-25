"use client";

import { CheckCircle2, Loader2, MoveUpRight, TriangleAlert } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useCurrency } from "@/components/currency/CurrencyProvider";
import Input, { Label } from "@/components/Input";
import { localeConfig, locales } from "@/i18n/locales";
import { currencies, currencyConfig, isCurrency } from "@/lib/currency";
import {
  validateInquiry, type InquiryData, type InquiryErrors, type InquiryField,
} from "@/lib/validation/inquiry";

export interface ServiceOption {
  slug: string;
  title: string;
  category: string;
}

type Status = "idle" | "sending" | "success" | "error";

const selectClass =
  "w-full bg-primary/5 text-base px-4 py-2.5 outline-none border rounded-md focus:border-primary focus:bg-transparent";

export default function ProjectInquiryForm({ services }: { services: ServiceOption[] }) {
  const t = useTranslations("forms");
  const pricing = useTranslations("pricing");
  const common = useTranslations("common");
  const categoryNames = useTranslations("services.categories");
  const locale = useLocale();
  const params = useSearchParams();
  const { currency } = useCurrency();

  const startedAt = useRef<number>(0);
  const [form, setForm] = useState({
    name: "", email: "", service: "general", package: "", currency: "EUR",
    language: locale, description: "", budget: "", deadline: "", reference: "",
    company_website: "", // honeypot
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState("");

  // Pre-select service/package from the URL and the visitor's currency; start the timing check.
  useEffect(() => {
    if (!startedAt.current) startedAt.current = Date.now();
    const service = params.get("service");
    const pkg = params.get("package");
    setForm((f) => ({
      ...f,
      service: service && services.some((s) => s.slug === service) ? service : f.service,
      package: pkg && ["basic", "standard", "premium"].includes(pkg) ? pkg : f.package,
    }));
  }, [params, services]);

  useEffect(() => {
    if (isCurrency(currency)) setForm((f) => ({ ...f, currency }));
  }, [currency]);

  const set = (name: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [name]: e.target.value }));
    if (name in errors) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const errorText = (field: InquiryField) => (errors[field] ? t(`errors.${errors[field]}`) : null);
  const fieldProps = (field: InquiryField) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    disabled: status === "sending",
  });
  const FieldError = ({ field }: { field: InquiryField }) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1 text-sm font-medium text-red-600">
        {errorText(field)}
      </p>
    ) : null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    const result = validateInquiry(form, (slug) => services.some((s) => s.slug === slug));
    if (Object.keys(result.errors).length > 0) {
      setErrors(result.errors);
      setStatus("error");
      setFormError(t("errors.fixErrors"));
      return;
    }
    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, company_website: form.company_website, startedAt: startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean; code?: string; errors?: InquiryErrors;
      };

      if (res.ok && json.ok === true) {
        setSentTo((result.data as InquiryData).email);
        setStatus("success");
        return;
      }
      setStatus("error");
      if (json.errors) setErrors(json.errors);
      const map: Record<string, string> = {
        invalid: "fixErrors", notConfigured: "notConfigured", rateLimited: "rateLimited",
        spam: "spam", sendFailed: "sendFailed",
      };
      setFormError(t(`errors.${map[json.code ?? ""] ?? "sendFailed"}`));
    } catch {
      setStatus("error");
      setFormError(t("errors.network"));
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto size-14 text-emerald-600" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold text-emerald-900">{t("successTitle")}</h3>
        <p className="mt-2 text-emerald-900/80">{t("successText", { email: sentTo })}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setForm((f) => ({ ...f, description: "", budget: "", deadline: "", reference: "" }));
            startedAt.current = Date.now();
          }}
          className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary/85"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  const sending = status === "sending";
  const group = "flex flex-col w-full";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {formError && (
        <div role="alert" className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <span>{formError}</span>
        </div>
      )}

      {/* Honeypot – hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" value={form.company_website} onChange={set("company_website")} />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className={group}>
          <Label htmlFor="name">{t("nameLabel")}</Label>
          <Input id="name" name="name" autoComplete="name" placeholder={t("namePlaceholder")} value={form.name} onChange={set("name")} required {...fieldProps("name")} />
          <FieldError field="name" />
        </div>
        <div className={group}>
          <Label htmlFor="email">{t("emailLabel")}</Label>
          <Input id="email" name="email" type="email" dir="ltr" autoComplete="email" placeholder={t("emailPlaceholder")} value={form.email} onChange={set("email")} required {...fieldProps("email")} />
          <FieldError field="email" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className={group}>
          <Label htmlFor="service">{t("serviceLabel")}</Label>
          <select id="service" name="service" className={selectClass} value={form.service} onChange={set("service")} {...fieldProps("service")}>
            <option value="general">{t("serviceGeneral")}</option>
            {Array.from(new Set(services.map((s) => s.category))).map((cat) => (
              <optgroup key={cat} label={categoryNames(`${cat}.name`)}>
                {services.filter((s) => s.category === cat).map((s) => (
                  <option key={s.slug} value={s.slug}>{s.title}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <FieldError field="service" />
        </div>
        <div className={group}>
          <Label htmlFor="package">{t("packageLabel")}</Label>
          <select id="package" name="package" className={selectClass} value={form.package} onChange={set("package")} {...fieldProps("package")}>
            <option value="">{t("packageNotSure")}</option>
            <option value="basic">{pricing("basic")}</option>
            <option value="standard">{pricing("standard")}</option>
            <option value="premium">{pricing("premium")}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className={group}>
          <Label htmlFor="currency">{t("currencyLabel")}</Label>
          <select id="currency" name="currency" className={selectClass} value={form.currency} onChange={set("currency")} {...fieldProps("currency")}>
            {currencies.map((c) => (
              <option key={c} value={c}>{currencyConfig[c].symbol} {c}</option>
            ))}
          </select>
        </div>
        <div className={group}>
          <Label htmlFor="language">{t("languageLabel")}</Label>
          <select id="language" name="language" className={selectClass} value={form.language} onChange={set("language")} {...fieldProps("language")}>
            {locales.map((l) => (
              <option key={l} value={l} lang={l}>{localeConfig[l].name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={group}>
        <Label htmlFor="description">{t("descriptionLabel")}</Label>
        <textarea
          id="description" name="description" rows={6} maxLength={3100}
          placeholder={t("descriptionPlaceholder")} value={form.description} onChange={set("description")} required
          className="w-full bg-primary/5 text-base px-4 py-2 outline-none border rounded-md focus:border-primary focus:bg-transparent resize-y disabled:bg-primary/20"
          {...fieldProps("description")}
        />
        <FieldError field="description" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className={group}>
          <Label htmlFor="budget">
            {t("budgetLabel")} ({form.currency}) <span className="font-normal text-primary/60">· {common("optional")}</span>
          </Label>
          <Input id="budget" name="budget" inputMode="decimal" dir="ltr" placeholder={t("budgetPlaceholder")} value={form.budget} onChange={set("budget")} {...fieldProps("budget")} />
          <FieldError field="budget" />
        </div>
        <div className={group}>
          <Label htmlFor="deadline">
            {t("deadlineLabel")} <span className="font-normal text-primary/60">· {common("optional")}</span>
          </Label>
          <Input id="deadline" name="deadline" type="date" dir="ltr" min={new Date().toISOString().slice(0, 10)} value={form.deadline} onChange={set("deadline")} {...fieldProps("deadline")} />
          <FieldError field="deadline" />
        </div>
      </div>

      <div className={group}>
        <Label htmlFor="reference">
          {t("referenceLabel")} <span className="font-normal text-primary/60">· {common("optional")}</span>
        </Label>
        <Input id="reference" name="reference" type="url" dir="ltr" inputMode="url" placeholder={t("referencePlaceholder")} value={form.reference} onChange={set("reference")} {...fieldProps("reference")} />
        <FieldError field="reference" />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-darkOrange px-6 py-3 font-bold text-white transition-colors hover:bg-darkOrange/90 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto md:min-w-56"
      >
        {sending ? t("sending") : t("submit")}
        {sending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <MoveUpRight className="size-4 flip-rtl" aria-hidden="true" />}
      </button>
    </form>
  );
}
