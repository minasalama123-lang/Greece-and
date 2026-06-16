/**
 * Minimal in-memory, fixed-window rate limiter.
 *
 * Suitable for a single-instance deployment and basic spam mitigation on the
 * inquiry endpoint. For multi-instance / serverless scale, swap the Map for a
 * shared store (e.g. Upstash Redis) behind the same `rateLimit` signature.
 *
 * State lives in module scope so it persists across requests within one
 * server process.
 */

interface Window {
  count: number;
  /** Epoch ms when the current window resets. */
  resetAt: number;
}

const buckets = new Map<string, Window>();

export interface RateLimitResult {
  success: boolean;
  /** Remaining requests in the current window. */
  remaining: number;
  /** Epoch ms when the window resets. */
  resetAt: number;
}

/**
 * @param key      Identifier to throttle on (e.g. client IP).
 * @param limit    Max requests allowed per window.
 * @param windowMs Window length in milliseconds.
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
  now: number = Date.now(),
): RateLimitResult {
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
  };
}

/** Test helper — clears all buckets. */
export function __resetRateLimiter(): void {
  buckets.clear();
}
