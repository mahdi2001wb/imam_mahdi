import { siteConfig } from "@/config/site";
import { getService } from "@/lib/services";
import type { InquiryData } from "@/lib/validation/inquiry";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export type SendResult = { ok: true } | { ok: false; reason: "notConfigured" | "failed" };

/** Sends the inquiry to the site owner with Resend. Reads RESEND_API_KEY from the environment. */
export async function sendInquiryEmail(data: InquiryData): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "notConfigured" };

  const to = process.env.INQUIRY_TO_EMAIL || siteConfig.contact.inquiryToEmail;
  // Resend's shared test sender only delivers to the Resend account owner.
  // For production, verify your own domain in Resend and set INQUIRY_FROM_EMAIL.
  const from = process.env.INQUIRY_FROM_EMAIL || "Website Inquiries <onboarding@resend.dev>";

  const service = data.service === "general" ? null : getService(data.service);
  const serviceName = service ? service.title.en : "General inquiry";
  const packageName = data.package ? data.package[0].toUpperCase() + data.package.slice(1) : "Not specified";
  const budget = data.budget ? `${data.budget} ${data.currency}` : "Not specified";

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Service", serviceName],
    ["Package", packageName],
    ["Preferred currency", data.currency],
    ["Preferred language", data.language],
    ["Budget", budget],
    ["Expected deadline", data.deadline || "Not specified"],
    ["Reference URL", data.reference || "Not specified"],
  ];

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nProject description:\n${data.description}\n`;
  const html =
    `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">` +
    rows.map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`).join("") +
    `</table><h3 style="font-family:sans-serif">Project description</h3>` +
    `<p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(data.description)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: oneLine(`[Inquiry] ${serviceName} – ${data.name}`).slice(0, 200),
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Resend rejected inquiry email:", res.status, await res.text().catch(() => ""));
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("Resend request failed:", err);
    return { ok: false, reason: "failed" };
  }
}
