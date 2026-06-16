import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";
import { __resetRateLimiter } from "@/lib/rate-limit";

/**
 * Integration tests for the inquiry API route.
 *
 * Exercises the full handler path: rate limiting → defensive JSON parsing →
 * honeypot → shared Zod validation → success. The rate limiter is module-scoped
 * in-memory state, so it is reset before every test for isolation.
 */

const valid = {
  name: "Layla Hassan",
  email: "layla@example.com",
  message: "I would love to know the lead time for the Aria sofa.",
  company: "",
};

/** Build a POST request to the route. Pass `raw` to send a malformed body. */
function makeRequest(
  body: unknown,
  { ip = "10.0.0.1", raw }: { ip?: string; raw?: string } = {},
): NextRequest {
  return new NextRequest("http://localhost/api/inquiry", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: raw !== undefined ? raw : JSON.stringify(body),
  });
}

describe("POST /api/inquiry", () => {
  let infoSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    __resetRateLimiter();
    // Spy on the delivery log line so tests can assert whether a submission was
    // actually processed. Mocking the implementation also keeps output clean.
    infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("accepts a valid inquiry with 200 + { ok: true }", async () => {
    const res = await POST(makeRequest(valid));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    // A real submission must reach the delivery step.
    expect(infoSpy).toHaveBeenCalledWith(
      "[inquiry] received",
      expect.anything(),
    );
  });

  it("treats a filled honeypot as a bot and returns a fake success", async () => {
    const res = await POST(
      makeRequest({ ...valid, company: "Acme Spam Co" }),
    );
    // The bot must not learn it was caught: 200 + { ok: true }, no field errors.
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    // ...and crucially the submission is dropped — delivery never runs.
    expect(infoSpy).not.toHaveBeenCalled();
  });

  it("returns 400 for a malformed JSON body", async () => {
    const res = await POST(makeRequest(null, { raw: "{ not valid json" }));
    expect(res.status).toBe(400);
    const payload = await res.json();
    expect(payload.ok).toBe(false);
    expect(payload.error).toBeDefined();
  });

  it("returns 422 with field errors when validation fails", async () => {
    const res = await POST(
      makeRequest({ ...valid, email: "not-an-email", message: "short" }),
    );
    expect(res.status).toBe(422);
    const payload = await res.json();
    expect(payload.ok).toBe(false);
    expect(payload.fieldErrors).toBeDefined();
    expect(payload.fieldErrors.email).toBeDefined();
    expect(payload.fieldErrors.message).toBeDefined();
  });

  it("returns 429 once the per-IP rate limit is exceeded", async () => {
    const ip = "203.0.113.7";

    // The route allows 5 requests per minute per IP — all should pass.
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest(valid, { ip }));
      expect(res.status).toBe(200);
    }

    // The 6th request from the same IP is throttled.
    const blocked = await POST(makeRequest(valid, { ip }));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBeTruthy();
    const payload = await blocked.json();
    expect(payload.ok).toBe(false);
    expect(payload.error).toBeDefined();
  });

  it("rate-limits each IP independently", async () => {
    // Exhaust the limit for one IP.
    for (let i = 0; i < 5; i++) {
      await POST(makeRequest(valid, { ip: "198.51.100.1" }));
    }
    const blocked = await POST(makeRequest(valid, { ip: "198.51.100.1" }));
    expect(blocked.status).toBe(429);

    // A different IP still gets through on its first request.
    const other = await POST(makeRequest(valid, { ip: "198.51.100.2" }));
    expect(other.status).toBe(200);
  });
});
