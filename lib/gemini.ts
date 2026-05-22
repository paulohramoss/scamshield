import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AnalysisRequest, AnalysisResult } from "@/types/analysis";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function buildPrompt(data: AnalysisRequest): string {
  const parts: string[] = [];

  parts.push(`Você é um especialista em prevenção de fraudes digitais, phishing, engenharia social e golpes online no contexto brasileiro. Analise o conteúdo abaixo e retorne um JSON estruturado com a análise de risco.

INSTRUÇÕES IMPORTANTES:
- Use linguagem simples, clara e direta, como se explicasse para uma pessoa leiga
- Não afirme certeza absoluta quando não houver evidência suficiente
- Oriente sempre a verificar canais oficiais
- Nunca peça dados sensíveis
- Considere o contexto brasileiro (PIX, Correios, bancos nacionais, marketplaces como Mercado Livre, OLX etc.)
- Seja objetivo e útil, sem alarmismo desnecessário`);

  if (data.source) {
    parts.push(`\nORIGEM DA MENSAGEM: ${data.source}`);
  }

  if (data.message) {
    parts.push(`\nMENSAGEM RECEBIDA:\n${data.message}`);
  }

  if (data.url) {
    parts.push(`\nLINK SUSPEITO: ${data.url}`);
  }

  if (data.context) {
    parts.push(`\nCONTEXTO ADICIONAL:\n${data.context}`);
  }

  parts.push(`
Retorne APENAS um JSON válido com exatamente esta estrutura (sem texto antes ou depois):
{
  "riskScore": <número de 0 a 100>,
  "riskLevel": <"Baixo risco" | "Atenção" | "Alto risco" | "Golpe provável">,
  "verdict": <string curta, máx 100 caracteres>,
  "explanation": <string explicativa em linguagem simples, 2-4 frases>,
  "redFlags": <array de strings com os sinais de alerta encontrados>,
  "recommendedActions": <array de strings com o que fazer>,
  "doNotDo": <array de strings com o que NÃO fazer>,
  "safeReply": <string opcional com resposta segura sugerida, ou null>,
  "confidence": <número de 0 a 100 representando confiança na análise>,
  "category": <"Phishing" | "Golpe financeiro" | "Engenharia social" | "Malware" | "Falso suporte" | "Falsa promoção" | "Romance scam" | "Marketplace" | "Vaga falsa" | "Baixo risco" | "Indeterminado">
}

Critérios de pontuação:
- 0-25: Baixo risco (comunicação aparentemente legítima)
- 26-50: Atenção (alguns sinais suspeitos, mas inconclusivo)
- 51-75: Alto risco (múltiplos sinais de golpe)
- 76-100: Golpe provável (forte evidência de fraude)

Lembre-se: retorne APENAS o JSON, sem markdown, sem explicações adicionais.`);

  return parts.join("");
}

function validateAndParseResult(text: string): AnalysisResult {
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
    riskScore: Math.max(0, Math.min(100, obj.riskScore)),
    riskLevel: obj.riskLevel as AnalysisResult["riskLevel"],
    verdict: obj.verdict,
    explanation: obj.explanation,
    redFlags: obj.redFlags as string[],
    recommendedActions: obj.recommendedActions as string[],
    doNotDo: obj.doNotDo as string[],
    safeReply: typeof obj.safeReply === "string" ? obj.safeReply : undefined,
    confidence: typeof obj.confidence === "number" ? Math.max(0, Math.min(100, obj.confidence)) : 70,
    category: (obj.category as AnalysisResult["category"]) || "Indeterminado",
  };
}

export async function analyzeWithGemini(data: AnalysisRequest): Promise<AnalysisResult> {
  const model = genAI.getGenerativeModel({ model: MODEL });
  const prompt = buildPrompt(data);

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return validateAndParseResult(text);
}
