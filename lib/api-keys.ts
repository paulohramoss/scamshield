import type { ApiKeyRecord, PlanType } from "@/types/analysis";

export function generateApiKey(): string {
  const prefix = "ss_live_";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = prefix;
  for (let i = 0; i < 40; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

export function maskApiKey(key: string): string {
  if (key.length <= 12) return "****";
  return key.slice(0, 10) + "****" + key.slice(-4);
}

export function validateApiKeyFormat(key: string): boolean {
  return /^ss_live_[A-Za-z0-9]{40}$/.test(key);
}

export interface ApiKeyValidationResult {
  valid: boolean;
  record?: ApiKeyRecord;
  error?: string;
}

export async function validateApiKey(key: string): Promise<ApiKeyValidationResult> {
  if (!validateApiKeyFormat(key)) {
    return { valid: false, error: "Formato de API key inválido" };
  }

  // Server-side: query Supabase for the key
  // This function is meant to be called from API routes only
  // The actual Supabase query is done in the route handler
  return { valid: true };
}

export const API_KEY_PLAN_LIMITS: Record<PlanType, number | null> = {
  free: 100,       // 100 req/month for B2B free tier
  premium: 10000,  // 10k req/month
  business: null,  // unlimited
};

export const API_DOCS_SCHEMA = {
  version: "1.0.0",
  baseUrl: "/api/v1",
  authentication: {
    type: "Bearer token",
    header: "Authorization: Bearer ss_live_YOUR_KEY",
  },
  endpoints: [
    {
      method: "POST",
      path: "/analyze",
      description: "Analisa texto, URL ou imagem para detectar golpes",
      requestBody: {
        message: "string (opcional) — Texto suspeito",
        url: "string (opcional) — Link suspeito",
        context: "string (opcional) — Contexto adicional",
        source: "string (opcional) — WhatsApp | SMS | E-mail | ...",
        analysisType: "string (opcional) — personal | business",
      },
      response: {
        riskScore: "number 0-100",
        riskLevel: "string",
        verdict: "string",
        explanation: "string",
        redFlags: "string[]",
        recommendedActions: "string[]",
        confidence: "number",
        category: "string",
        protectionTips: "string[]",
      },
    },
  ],
};
