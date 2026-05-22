export type RiskLevel = "Baixo risco" | "Atenção" | "Alto risco" | "Golpe provável";

export type ScamCategory =
  | "Phishing"
  | "Golpe financeiro"
  | "Engenharia social"
  | "Malware"
  | "Falso suporte"
  | "Falsa promoção"
  | "Romance scam"
  | "Marketplace"
  | "Vaga falsa"
  | "Baixo risco"
  | "Indeterminado";

export type MessageSource =
  | "WhatsApp"
  | "SMS"
  | "E-mail"
  | "Instagram"
  | "Facebook"
  | "Marketplace"
  | "Ligação"
  | "Site"
  | "Outro";

export interface AnalysisRequest {
  message?: string;
  url?: string;
  context?: string;
  source?: MessageSource;
}

export interface AnalysisResult {
  riskScore: number;
  riskLevel: RiskLevel;
  verdict: string;
  explanation: string;
  redFlags: string[];
  recommendedActions: string[];
  doNotDo: string[];
  safeReply?: string;
  confidence: number;
  category: ScamCategory;
}

export interface ScamAnalysis {
  id: string;
  user_id: string | null;
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
