import type { PlanType, UserPlan } from "@/types/analysis";

export const PLAN_LIMITS: Record<PlanType, number | null> = {
  free: 10,
  premium: null,
  business: null,
};

export const PLAN_LABELS: Record<PlanType, string> = {
  free: "Gratuito",
  premium: "Premium",
  business: "Empresa",
};

export const PLAN_FEATURES: Record<PlanType, string[]> = {
  free: [
    "10 análises por mês",
    "Análise de texto e links",
    "Histórico de 30 dias",
  ],
  premium: [
    "Análises ilimitadas",
    "Análise de imagem/print",
    "Modo família",
    "Histórico completo",
    "Prioridade no processamento",
  ],
  business: [
    "Tudo do Premium",
    "Dashboard compartilhado para equipe",
    "Modo empresa (fornecedores, boletos, clientes)",
    "API key própria",
    "Relatórios mensais",
    "Suporte prioritário",
  ],
};

export function canAnalyze(plan: UserPlan): boolean {
  if (plan.monthlyLimit === null) return true;
  return plan.usedThisMonth < plan.monthlyLimit;
}

export function getRemainingAnalyses(plan: UserPlan): number | null {
  if (plan.monthlyLimit === null) return null;
  return Math.max(0, plan.monthlyLimit - plan.usedThisMonth);
}

export function getDefaultPlan(): UserPlan {
  const now = new Date();
  const resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
  return {
    type: "free",
    monthlyLimit: PLAN_LIMITS.free,
    usedThisMonth: 0,
    resetDate,
  };
}
