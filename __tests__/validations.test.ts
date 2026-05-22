import { describe, it, expect } from "vitest";
import { analysisSchema, authLoginSchema, authRegisterSchema } from "@/lib/validations";

describe("analysisSchema", () => {
  it("rejects empty submission", () => {
    const result = analysisSchema.safeParse({});
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toContain("pelo menos");
  });

  it("accepts message only", () => {
    const result = analysisSchema.safeParse({ message: "texto suspeito aqui" });
    expect(result.success).toBe(true);
  });

  it("accepts url only", () => {
    const result = analysisSchema.safeParse({ url: "https://site-suspeito.com" });
    expect(result.success).toBe(true);
  });

  it("accepts image only", () => {
    const result = analysisSchema.safeParse({
      imageBase64: "abc123base64data",
      imageMimeType: "image/png",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid URL format", () => {
    const result = analysisSchema.safeParse({ url: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("accepts empty string URL (optional)", () => {
    const result = analysisSchema.safeParse({ message: "msg", url: "" });
    expect(result.success).toBe(true);
  });

  it("rejects message over 5000 chars", () => {
    const result = analysisSchema.safeParse({ message: "x".repeat(5001) });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toContain("5000");
  });

  it("allows omitting analysisType (optional)", () => {
    const result = analysisSchema.safeParse({ message: "test" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.analysisType).toBeUndefined();
    }
  });

  it("accepts business analysisType with scam type", () => {
    const result = analysisSchema.safeParse({
      message: "teste",
      analysisType: "business",
      businessScamType: "boleto-falso",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid businessScamType", () => {
    const result = analysisSchema.safeParse({
      message: "teste",
      analysisType: "business",
      businessScamType: "tipo-inexistente",
    });
    expect(result.success).toBe(false);
  });
});

describe("authLoginSchema", () => {
  it("accepts valid credentials", () => {
    const result = authLoginSchema.safeParse({ email: "user@example.com", password: "senha123" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = authLoginSchema.safeParse({ email: "not-email", password: "senha123" });
    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = authLoginSchema.safeParse({ email: "user@example.com", password: "abc" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toContain("6 caracteres");
  });
});

describe("authRegisterSchema", () => {
  it("accepts matching passwords", () => {
    const result = authRegisterSchema.safeParse({
      email: "user@example.com",
      password: "senha123",
      confirmPassword: "senha123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = authRegisterSchema.safeParse({
      email: "user@example.com",
      password: "senha123",
      confirmPassword: "outrasenha",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toContain("não coincidem");
  });
});
