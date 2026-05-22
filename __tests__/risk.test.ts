import { describe, it, expect } from "vitest";
import { getRiskLevel, getRiskColor, getRiskEmoji, getRiskColorClasses } from "@/lib/risk";

describe("getRiskLevel", () => {
  it("returns Baixo risco for 0-25", () => {
    expect(getRiskLevel(0)).toBe("Baixo risco");
    expect(getRiskLevel(12)).toBe("Baixo risco");
    expect(getRiskLevel(25)).toBe("Baixo risco");
  });

  it("returns Atenção for 26-50", () => {
    expect(getRiskLevel(26)).toBe("Atenção");
    expect(getRiskLevel(38)).toBe("Atenção");
    expect(getRiskLevel(50)).toBe("Atenção");
  });

  it("returns Alto risco for 51-75", () => {
    expect(getRiskLevel(51)).toBe("Alto risco");
    expect(getRiskLevel(63)).toBe("Alto risco");
    expect(getRiskLevel(75)).toBe("Alto risco");
  });

  it("returns Golpe provável for 76-100", () => {
    expect(getRiskLevel(76)).toBe("Golpe provável");
    expect(getRiskLevel(90)).toBe("Golpe provável");
    expect(getRiskLevel(100)).toBe("Golpe provável");
  });
});

describe("getRiskColor", () => {
  it("maps each level to correct color", () => {
    expect(getRiskColor("Baixo risco")).toBe("green");
    expect(getRiskColor("Atenção")).toBe("yellow");
    expect(getRiskColor("Alto risco")).toBe("orange");
    expect(getRiskColor("Golpe provável")).toBe("red");
  });

  it("returns gray for unknown level", () => {
    expect(getRiskColor("Desconhecido")).toBe("gray");
  });
});

describe("getRiskEmoji", () => {
  it("returns correct emoji per level", () => {
    expect(getRiskEmoji("Baixo risco")).toBe("✅");
    expect(getRiskEmoji("Atenção")).toBe("⚠️");
    expect(getRiskEmoji("Alto risco")).toBe("🚨");
    expect(getRiskEmoji("Golpe provável")).toBe("🛑");
    expect(getRiskEmoji("Desconhecido")).toBe("❓");
  });
});

describe("getRiskColorClasses", () => {
  it("returns object with all required keys", () => {
    const result = getRiskColorClasses("Baixo risco");
    expect(result).toHaveProperty("bg");
    expect(result).toHaveProperty("border");
    expect(result).toHaveProperty("text");
    expect(result).toHaveProperty("badge");
    expect(result).toHaveProperty("progress");
    expect(result).toHaveProperty("icon");
  });

  it("returns green classes for Baixo risco", () => {
    const result = getRiskColorClasses("Baixo risco");
    expect(result.bg).toContain("green");
  });

  it("returns red classes for Golpe provável", () => {
    const result = getRiskColorClasses("Golpe provável");
    expect(result.bg).toContain("red");
  });
});
