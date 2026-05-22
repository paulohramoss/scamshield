import type { AnalysisResult, AnalysisRequest } from "@/types/analysis";

export interface StoredAnalysis {
  id: string;
  message: string | null;
  url: string | null;
  context: string | null;
  source: string | null;
  risk_score: number;
  risk_level: string;
  verdict: string;
  explanation: string;
  red_flags: string[];
  recommended_actions: string[];
  do_not_do: string[];
  safe_reply: string | null;
  confidence: number | null;
  category: string | null;
  created_at: string;
}

const KEY = "scamshield_history";
const MAX_ITEMS = 50;

export function saveAnalysis(request: AnalysisRequest, result: AnalysisResult): StoredAnalysis {
  const entry: StoredAnalysis = {
    id: crypto.randomUUID(),
    message: request.message || null,
    url: request.url || null,
    context: request.context || null,
    source: request.source || null,
    risk_score: result.riskScore,
    risk_level: result.riskLevel,
    verdict: result.verdict,
    explanation: result.explanation,
    red_flags: result.redFlags,
    recommended_actions: result.recommendedActions,
    do_not_do: result.doNotDo,
    safe_reply: result.safeReply || null,
    confidence: result.confidence,
    category: result.category,
    created_at: new Date().toISOString(),
  };

  const existing = loadHistory();
  const updated = [entry, ...existing].slice(0, MAX_ITEMS);
  localStorage.setItem(KEY, JSON.stringify(updated));
  return entry;
}

export function loadHistory(): StoredAnalysis[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredAnalysis[];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem(KEY);
}

export function deleteAnalysis(id: string): void {
  const existing = loadHistory();
  localStorage.setItem(KEY, JSON.stringify(existing.filter((a) => a.id !== id)));
}
