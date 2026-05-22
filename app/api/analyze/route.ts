import { NextRequest, NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/gemini";
import { analyzeDomain } from "@/lib/domain-analysis";
import { analysisSchema } from "@/lib/validations";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 10;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) return false;
  entry.count++;
  return true;
}

const IMAGE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB in bytes (base64 is ~4/3 ratio)
const BASE64_SIZE_LIMIT = Math.ceil(IMAGE_SIZE_LIMIT * (4 / 3));

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Muitas requisições. Aguarde 1 minuto antes de tentar novamente." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const parsed = analysisSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Dados inválidos." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (data.imageBase64 && data.imageBase64.length > BASE64_SIZE_LIMIT) {
    return NextResponse.json(
      { error: "Imagem muito grande. O limite é 5MB." },
      { status: 413 }
    );
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Serviço de análise não configurado. Configure a chave GEMINI_API_KEY." },
      { status: 503 }
    );
  }

  let result;
  try {
    result = await analyzeWithGemini(data);
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Erro ao processar análise. Tente novamente em alguns instantes." },
      { status: 500 }
    );
  }

  // Run domain analysis locally if a URL was provided
  if (data.url && data.url.trim().length > 0) {
    try {
      result.domainSignals = analyzeDomain(data.url);
    } catch {
      // Domain analysis is best-effort
    }
  }

  return NextResponse.json(result);
}
