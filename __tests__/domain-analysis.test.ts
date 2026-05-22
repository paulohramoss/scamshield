import { describe, it, expect } from "vitest";
import { analyzeDomain, isValidUrl } from "@/lib/domain-analysis";

describe("isValidUrl", () => {
  it("accepts valid https URLs", () => {
    expect(isValidUrl("https://www.google.com")).toBe(true);
    expect(isValidUrl("https://nubank.com.br")).toBe(true);
  });

  it("accepts valid http URLs", () => {
    expect(isValidUrl("http://example.com")).toBe(true);
  });

  it("accepts URLs without protocol (assumes https)", () => {
    expect(isValidUrl("example.com")).toBe(true);
  });

  it("rejects invalid URLs", () => {
    expect(isValidUrl("not a url")).toBe(false);
    expect(isValidUrl("")).toBe(false);
  });
});

describe("analyzeDomain", () => {
  it("detects missing HTTPS", () => {
    const result = analyzeDomain("http://banco-login.com");
    expect(result.isHttps).toBe(false);
    expect(result.signals.some((s) => s.includes("HTTPS"))).toBe(true);
    expect(result.riskScore).toBeGreaterThan(0);
  });

  it("marks HTTPS as secure", () => {
    const result = analyzeDomain("https://nubank.com.br");
    expect(result.isHttps).toBe(true);
  });

  it("detects URL shorteners", () => {
    const result = analyzeDomain("https://bit.ly/abc123");
    expect(result.isShortener).toBe(true);
    expect(result.shortenerService).toBe("bit.ly");
    expect(result.riskScore).toBeGreaterThan(20);
  });

  it("detects typosquatting", () => {
    const result = analyzeDomain("https://nubank-seguro-login.com");
    expect(result.similarToFamousBrand).toBe("nubank");
    expect(result.riskScore).toBeGreaterThan(30);
  });

  it("gives low risk to legitimate domains", () => {
    const result = analyzeDomain("https://example.com");
    expect(result.isHttps).toBe(true);
    expect(result.isShortener).toBe(false);
    expect(result.signals).toHaveLength(0);
  });

  it("caps risk score at 100", () => {
    const result = analyzeDomain("http://bit.ly/fake-nubank-login");
    expect(result.riskScore).toBeLessThanOrEqual(100);
  });

  it("returns domain and protocol", () => {
    const result = analyzeDomain("https://www.example.com/path?q=1");
    expect(result.protocol).toBe("https");
    expect(result.domain).toContain("example");
  });

  it("detects deceptive subdomains", () => {
    const result = analyzeDomain("https://banco.fakepage.com");
    expect(result.hasDeceptiveSubdomain).toBe(true);
  });
});
