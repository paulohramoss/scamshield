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
  | "Falso fornecedor"
  | "Boleto falso"
  | "Falso cliente"
  | "Pedido urgente"
  | "Golpe marketplace empresa"
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

export type AnalysisType = "personal" | "business";

export type BusinessScamType =
  | "falso-fornecedor"
  | "boleto-falso"
  | "falso-cliente"
  | "pedido-urgente"
  | "marketplace"
  | "falso-suporte";

export interface DomainSignals {
  domain: string;
  protocol: string;
  isHttps: boolean;
  isShortener: boolean;
  shortenerService?: string;
  similarToFamousBrand?: string;
  hasSuspiciousChars: boolean;
  suspiciousChars?: string[];
  hasDeceptiveSubdomain: boolean;
  deceptiveSubdomain?: string;
  riskScore: number;
  signals: string[];
}

export interface AnalysisRequest {
  message?: string;
  url?: string;
  context?: string;
  source?: MessageSource;
  imageBase64?: string;
  imageMimeType?: string;
  analysisType?: AnalysisType;
  businessScamType?: BusinessScamType;
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
  protectionTips: string[];
  familyMessage?: string;
  domainSignals?: DomainSignals;
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
  protection_tips: string[];
  analysis_type: string | null;
  created_at: string;
}

export type PlanType = "free" | "premium" | "business";

export interface UserPlan {
  type: PlanType;
  monthlyLimit: number | null;
  usedThisMonth: number;
  resetDate: string;
}

export interface ApiKeyRecord {
  id: string;
  key: string;
  name: string;
  owner_id: string;
  plan: PlanType;
  monthly_limit: number | null;
  used_this_month: number;
  created_at: string;
  last_used_at: string | null;
  is_active: boolean;
}
