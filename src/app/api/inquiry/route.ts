import { NextResponse, type NextRequest } from "next/server";
import { validateInquiry } from "@/lib/validation/inquiry";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Inquiry submission endpoint.
 *
 * Security measures, in order:
 *  1. Rate limiting per client IP (fixed window) — blunts spam/abuse.
 *  2. Honeypot field (`company`) — must be empty; bots that fill it are dropped
 *     with a fake success so they don't learn they were caught.
 *  3. Zod validation + normalization — the SAME schema the client uses, so
 *     nothing untrusted reaches downstream logic. Output is trimmed/typed.
 *
 * Delivery is intentionally pluggable: today it logs (dev) / would email
 * (prod). Wire a real provider with EMAIL_API_KEY from the environment — never
 * hardcode secrets.
 */

export const runtime = "nodejs";

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  // 1. Rate limit: 5 inquiries per minute per IP.
  const ip = clientIp(req);
  const limit = rateLimit(`inquiry:${ip}`, 5, 60_000);
  if (!limit.success) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  // Parse body defensively — malformed JSON should not throw a 500.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // 2. Honeypot: a filled `company` field means a bot. Pretend success.
  if (
    body &&
    typeof body === "object" &&
    "company" in body &&
    typeof (body as Record<string, unknown>).company === "string" &&
    ((body as Record<string, unknown>).company as string).length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  // 3. Validate + normalize with the shared schema.
  const result = validateInquiry(body);
  if (!result.success) {
    return NextResponse.json(
      { ok: false, fieldErrors: result.errors },
      { status: 422 },
    );
  }

  const { name, email, message, productSlug } = result.data;

  // --- Delivery (pluggable) ---
  // In production, send via your transactional email provider here, e.g.:
  //   await sendEmail({ to: process.env.INQUIRY_NOTIFY_EMAIL, ... })
  // Keys come from the environment; nothing is hardcoded.
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console -- dev-only visibility
    console.info("[inquiry] received", {
      name,
      email,
      productSlug: productSlug || null,
      messagePreview: message.slice(0, 80),
    });
  }

  return NextResponse.json({ ok: true });
}
