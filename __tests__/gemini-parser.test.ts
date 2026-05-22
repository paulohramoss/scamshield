import { describe, it, expect } from "vitest";

// We test the parsing/validation logic that mirrors validateAndParseResult
// without calling the actual Gemini API

function parseGeminiResponse(text: string) {
  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Resposta da IA não é um JSON válido");
  }

  const obj = parsed as Record<string, unknown>;

  if (
    typeof obj.riskScore !== "number" ||
    typeof obj.riskLevel !== "string" ||
    typeof obj.verdict !== "string" ||
    typeof obj.explanation !== "string" ||
    !Array.isArray(obj.redFlags) ||
    !Array.isArray(obj.recommendedActions) ||
    !Array.isArray(obj.doNotDo)
  ) {
    throw new Error("JSON da IA com campos obrigatórios ausentes");
  }

  return {
    riskScore: Math.max(0, Math.min(100, obj.riskScore as number)),
    riskLevel: obj.riskLevel,
    verdict: obj.verdict,
    explanation: obj.explanation,
    redFlags: obj.redFlags,
    recommendedActions: obj.recommendedActions,
    doNotDo: obj.doNotDo,
    safeReply: typeof obj.safeReply === "string" ? obj.safeReply : undefined,
    confidence: typeof obj.confidence === "number" ? Math.max(0, Math.min(100, obj.confidence as number)) : 70,
    category: (obj.category as string) || "Indeterminado",
    protectionTips: Array.isArray(obj.protectionTips) ? obj.protectionTips : [],
    familyMessage: typeof obj.familyMessage === "string" ? obj.familyMessage : undefined,
  };
}

const VALID_RESPONSE = JSON.stringify({
  riskScore: 85,
  riskLevel: "Golpe provável",
  verdict: "Link de phishing do banco",
  explanation: "A mensagem contém link falso que imita banco real.",
  redFlags: ["URL suspeita", "Urgência artificial"],
  recommendedActions: ["Não clique no link", "Contate o banco"],
  doNotDo: ["Não informe senha", "Não acesse o link"],
  safeReply: null,
  confidence: 92,
  category: "Phishing",
  protectionTips: ["Sempre verifique o endereço do banco", "Use o app oficial"],
  familyMessage: "⚠️ Atenção: Isso é um golpe. Não clique em links.",
});

describe("parseGeminiResponse", () => {
  it("parses a valid response", () => {
    const result = parseGeminiResponse(VALID_RESPONSE);
    expect(result.riskScore).toBe(85);
    expect(result.riskLevel).toBe("Golpe provável");
    expect(result.verdict).toBe("Link de phishing do banco");
    expect(result.redFlags).toHaveLength(2);
    expect(result.confidence).toBe(92);
    expect(result.protectionTips).toHaveLength(2);
    expect(result.familyMessage).toContain("Atenção");
  });

  it("strips markdown code fences", () => {
    const withFences = "```json\n" + VALID_RESPONSE + "\n```";
    const result = parseGeminiResponse(withFences);
    expect(result.riskScore).toBe(85);
  });

  it("clamps riskScore to 0-100", () => {
    const response = JSON.stringify({ ...JSON.parse(VALID_RESPONSE), riskScore: 150 });
    const result = parseGeminiResponse(response);
    expect(result.riskScore).toBe(100);
  });

  it("clamps negative riskScore to 0", () => {
    const response = JSON.stringify({ ...JSON.parse(VALID_RESPONSE), riskScore: -10 });
    const result = parseGeminiResponse(response);
    expect(result.riskScore).toBe(0);
  });

  it("defaults confidence to 70 when missing", () => {
    const parsed = JSON.parse(VALID_RESPONSE);
    delete parsed.confidence;
    const result = parseGeminiResponse(JSON.stringify(parsed));
    expect(result.confidence).toBe(70);
  });

  it("defaults category to Indeterminado when missing", () => {
    const parsed = JSON.parse(VALID_RESPONSE);
    delete parsed.category;
    const result = parseGeminiResponse(JSON.stringify(parsed));
    expect(result.category).toBe("Indeterminado");
  });

  it("defaults protectionTips to [] when missing", () => {
    const parsed = JSON.parse(VALID_RESPONSE);
    delete parsed.protectionTips;
    const result = parseGeminiResponse(JSON.stringify(parsed));
    expect(result.protectionTips).toEqual([]);
  });

  it("throws on invalid JSON", () => {
    expect(() => parseGeminiResponse("not json at all")).toThrow("JSON válido");
  });

  it("throws when required fields are missing", () => {
    expect(() => parseGeminiResponse(JSON.stringify({ riskScore: 50 }))).toThrow("campos obrigatórios");
  });

  it("safeReply is undefined when null", () => {
    const result = parseGeminiResponse(VALID_RESPONSE);
    expect(result.safeReply).toBeUndefined();
  });

  it("safeReply is string when provided", () => {
    const withReply = JSON.stringify({ ...JSON.parse(VALID_RESPONSE), safeReply: "Não reconheço esta mensagem." });
    const result = parseGeminiResponse(withReply);
    expect(result.safeReply).toBe("Não reconheço esta mensagem.");
  });
});
