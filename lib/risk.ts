import type { RiskLevel } from "@/types/analysis";

export function getRiskLevel(score: number): RiskLevel {
  if (score <= 25) return "Baixo risco";
  if (score <= 50) return "Atenção";
  if (score <= 75) return "Alto risco";
  return "Golpe provável";
}

export function getRiskColor(level: RiskLevel | string): string {
  switch (level) {
    case "Baixo risco":
      return "green";
    case "Atenção":
      return "yellow";
    case "Alto risco":
      return "orange";
    case "Golpe provável":
      return "red";
    default:
      return "gray";
  }
}

export function getRiskColorClasses(level: RiskLevel | string) {
  switch (level) {
    case "Baixo risco":
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-700",
        badge: "bg-green-100 text-green-800 border-green-200",
        progress: "bg-green-500",
        icon: "text-green-600",
      };
    case "Atenção":
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-700",
        badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
        progress: "bg-yellow-500",
        icon: "text-yellow-600",
      };
    case "Alto risco":
      return {
        bg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-700",
        badge: "bg-orange-100 text-orange-800 border-orange-200",
        progress: "bg-orange-500",
        icon: "text-orange-600",
      };
    case "Golpe provável":
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        badge: "bg-red-100 text-red-800 border-red-200",
        progress: "bg-red-500",
        icon: "text-red-600",
      };
    default:
      return {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-700",
        badge: "bg-gray-100 text-gray-800 border-gray-200",
        progress: "bg-gray-500",
        icon: "text-gray-600",
      };
  }
}

export function getRiskEmoji(level: RiskLevel | string): string {
  switch (level) {
    case "Baixo risco":
      return "✅";
    case "Atenção":
      return "⚠️";
    case "Alto risco":
      return "🚨";
    case "Golpe provável":
      return "🛑";
    default:
      return "❓";
  }
}
