import { NextRequest, NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/gemini";
import { analyzeDomain } from "@/lib/domain-analysis";
import { apiKeyAnalysisSchema } from "@/lib/validations";
import { validateApiKeyFormat } from "@/lib/api-keys";

// B2B API rate limiting (per API key)
const keyRateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkKeyRateLimit(key: string, limit = 60): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;

  const entry = keyRateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    keyRateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid Authorization header. Use: Bearer ss_live_YOUR_KEY" },
      { status: 401 }
    );
  }

  const apiKey = authHeader.slice(7).trim();
  if (!validateApiKeyFormat(apiKey)) {
    return NextResponse.json(
      { error: "Invalid API key format." },
      { status: 401 }
    );
  }

  // TODO: Validate key against Supabase when B2B is launched publicly
  // const { valid, record } = await validateApiKey(apiKey);
  // if (!valid || !record?.is_active) return 401

  if (!checkKeyRateLimit(apiKey)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Maximum 60 requests per minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = apiKeyAnalysisSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid data." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "Analysis service not configured." }, { status: 503 });
  }

  let result;
  try {
    result = await analyzeWithGemini(data);
  } catch (error) {
    console.error("Gemini API error (v1):", error);
    return NextResponse.json(
      { error: "Failed to process analysis. Please try again." },
      { status: 500 }
    );
  }

  if (data.url && data.url.trim().length > 0) {
    try {
      result.domainSignals = analyzeDomain(data.url);
    } catch {
      // best-effort
    }
  }

  return NextResponse.json({
    ...result,
    _meta: { apiVersion: "1.0", model: process.env.GEMINI_MODEL || "gemini-2.5-flash" },
  });
}
