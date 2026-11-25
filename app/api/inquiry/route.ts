import { NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { getService } from "@/lib/services";
import { validateInquiry } from "@/lib/validation/inquiry";

export const runtime = "nodejs";

type ApiError = "spam" | "rateLimited" | "invalid" | "notConfigured" | "sendFailed";
const fail = (code: ApiError, status: number, extra?: object) =>
  NextResponse.json({ ok: false, code, ...extra }, { status });

const MIN_FILL_MS = 3_000; // humans need more than 3s to fill the form
const MAX_AGE_MS = 7 * 24 * 3600 * 1000;

export async function POST(request: Request) {
  // Same-origin check (browsers always send Origin on cross-site POSTs)
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return fail("spam", 403);

  if (Number(request.headers.get("content-length") ?? 0) > 20_000) return fail("invalid", 413);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("invalid", 400);
  }

  // Honeypot: real users never see or fill this field
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return fail("spam", 400);
  }

  // Timing check
  const startedAt = Number(body.startedAt);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < MIN_FILL_MS || elapsed > MAX_AGE_MS) {
    return fail("spam", 400);
  }

  // Rate limit per IP
  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (!rateLimit(`inquiry:${ip}`)) return fail("rateLimited", 429);

  const { data, errors } = validateInquiry(body, (slug) => !!getService(slug));
  if (Object.keys(errors).length > 0) return fail("invalid", 422, { errors });

  const result = await sendInquiryEmail(data);
  if (!result.ok) {
    return result.reason === "notConfigured" ? fail("notConfigured", 503) : fail("sendFailed", 502);
  }
  return NextResponse.json({ ok: true });
}
