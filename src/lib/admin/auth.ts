/**
 * Admin session auth — a small, dependency-free HMAC-signed cookie.
 *
 * One admin (the owner) logs in with ADMIN_PASSWORD; on success we set a signed
 * token cookie. Both the Node API routes and the Edge middleware verify it via
 * Web Crypto (`crypto.subtle`), which is available in both runtimes, so there
 * is no per-runtime auth code to keep in sync.
 *
 * This is intentionally simple — a single shared password for the site owner,
 * not a multi-user system. Personal data (leads) sits behind it, so keep
 * ADMIN_PASSWORD and AUTH_SECRET strong and never commit them.
 */

export const SESSION_COOKIE = "admin_session";
/** Session lifetime in seconds (7 days). */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const encoder = new TextEncoder();

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function toBase64Url(bytes: ArrayBuffer): string {
  const b64 = btoa(String.fromCharCode(...new Uint8Array(bytes)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): Uint8Array {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
}

/** Create a signed session token. Payload carries the issue time (ms). */
export async function createSessionToken(secret: string): Promise<string> {
  const payload = `admin.${Date.now()}`;
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toBase64Url(sig)}`;
}

/** Verify a session token's signature and (soft) expiry. */
export async function verifySessionToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token || !secret) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;

  const payload = token.slice(0, dot);
  if (!payload.startsWith("admin.")) return false;

  // Expiry check from the issued-at stamp.
  const issuedAt = Number(payload.slice("admin.".length));
  if (!Number.isFinite(issuedAt)) return false;
  if (Date.now() - issuedAt > SESSION_MAX_AGE * 1000) return false;

  try {
    const key = await hmacKey(secret);
    const sig = fromBase64Url(token.slice(dot + 1));
    return await crypto.subtle.verify(
      "HMAC",
      key,
      sig,
      encoder.encode(payload),
    );
  } catch {
    return false;
  }
}
