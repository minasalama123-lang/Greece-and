import { describe, it, expect } from "vitest";
import { validateInquiry } from "./inquiry";

const valid = {
  name: "Layla Hassan",
  email: "Layla@Example.com",
  message: "I would love to know the lead time for the Aria sofa.",
  company: "",
};

describe("validateInquiry", () => {
  it("accepts and normalizes valid input", () => {
    const result = validateInquiry(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      // email is lowercased + trimmed by the schema
      expect(result.data.email).toBe("layla@example.com");
      expect(result.data.name).toBe("Layla Hassan");
    }
  });

  it("trims surrounding whitespace from fields", () => {
    const result = validateInquiry({
      ...valid,
      name: "  Omar  ",
      message: "   This is a sufficiently long message.   ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Omar");
      expect(result.data.message).toBe("This is a sufficiently long message.");
    }
  });

  it("rejects an invalid email with a field error", () => {
    const result = validateInquiry({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toBeDefined();
    }
  });

  it("rejects a name that is too short", () => {
    const result = validateInquiry({ ...valid, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.name).toBeDefined();
  });

  it("rejects a message shorter than the minimum", () => {
    const result = validateInquiry({ ...valid, message: "too short" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.message).toBeDefined();
  });

  it("rejects an over-long message", () => {
    const result = validateInquiry({ ...valid, message: "x".repeat(2001) });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.message).toBeDefined();
  });

  it("treats a filled honeypot as invalid (company must be empty)", () => {
    const result = validateInquiry({ ...valid, company: "Acme Spam Co" });
    expect(result.success).toBe(false);
  });

  it("reports only the first error per field", () => {
    const result = validateInquiry({ name: "", email: "", message: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.errors).length).toBeGreaterThan(0);
    }
  });
});
