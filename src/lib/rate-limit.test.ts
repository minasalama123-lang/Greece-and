import { describe, it, expect, beforeEach } from "vitest";
import { rateLimit, __resetRateLimiter } from "./rate-limit";

describe("rateLimit", () => {
  beforeEach(() => __resetRateLimiter());

  it("allows requests up to the limit", () => {
    const key = "ip-1";
    for (let i = 0; i < 3; i++) {
      expect(rateLimit(key, 3, 60_000, 1000).success).toBe(true);
    }
  });

  it("blocks the request that exceeds the limit", () => {
    const key = "ip-2";
    rateLimit(key, 2, 60_000, 1000);
    rateLimit(key, 2, 60_000, 1000);
    const third = rateLimit(key, 2, 60_000, 1000);
    expect(third.success).toBe(false);
    expect(third.remaining).toBe(0);
  });

  it("decrements remaining on each allowed call", () => {
    const key = "ip-3";
    expect(rateLimit(key, 5, 60_000, 1000).remaining).toBe(4);
    expect(rateLimit(key, 5, 60_000, 1000).remaining).toBe(3);
  });

  it("resets after the window elapses", () => {
    const key = "ip-4";
    rateLimit(key, 1, 1_000, 1000); // consumes the single slot
    expect(rateLimit(key, 1, 1_000, 1500).success).toBe(false); // still in window
    expect(rateLimit(key, 1, 1_000, 2500).success).toBe(true); // window passed
  });

  it("tracks separate keys independently", () => {
    rateLimit("a", 1, 60_000, 1000);
    expect(rateLimit("a", 1, 60_000, 1000).success).toBe(false);
    expect(rateLimit("b", 1, 60_000, 1000).success).toBe(true);
  });
});
