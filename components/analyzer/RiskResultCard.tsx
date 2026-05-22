"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "./RiskBadge";
import { RiskScoreMeter } from "./RiskScoreMeter";
import { RiskScoreBar } from "./RiskScoreBar";
import { RedFlagsList } from "./RedFlagsList";
import { RecommendedActionsList } from "./RecommendedActionsList";
import { ProtectionTips } from "./ProtectionTips";
import { FamilyModeButton } from "./FamilyModeButton";
import { DomainSignalsCard } from "./DomainSignals";
import { getRiskColorClasses } from "@/lib/risk";
import type { AnalysisResult } from "@/types/analysis";
import { Copy, Check, RefreshCw, MessageSquare, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface RiskResultCardProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

export function RiskResultCard({ result, onNewAnalysis }: RiskResultCardProps) {
  const [copied, setCopied] = useState(false);
  const colors = getRiskColorClasses(result.riskLevel);

  const handleCopy = async () => {
    const text = `
🛡️ ScamShield — Análise de Risco

Nível: ${result.riskLevel} (Score: ${result.riskScore}/100)
Categoria: ${result.category}
Veredito: ${result.verdict}

📋 Explicação:
${result.explanation}

🚩 Sinais de alerta:
${result.redFlags.map((f) => `• ${f}`).join("\n")}

✅ O que fazer:
${result.recommendedActions.map((a) => `• ${a}`).join("\n")}

❌ O que NÃO fazer:
${result.doNotDo.map((d) => `• ${d}`).join("\n")}
${result.safeReply ? `\n💬 Resposta sugerida:\n"${result.safeReply}"` : ""}
${result.protectionTips.length > 0 ? `\n🛡️ Como se proteger:\n${result.protectionTips.map((t) => `• ${t}`).join("\n")}` : ""}

Analisado por ScamShield
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Resultado copiado para a área de transferência!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Não foi possível copiar. Tente selecionar o texto manualmente.");
    }
  };

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main result card */}
      <Card className={cn("border-2 transition-all", colors.border, colors.bg)}>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <RiskScoreMeter score={result.riskScore} level={result.riskLevel} />
            <div className="flex-1 text-center sm:text-left space-y-3">
              <RiskBadge level={result.riskLevel} size="lg" />
              <p className={cn("text-lg font-semibold leading-snug", colors.text)}>{result.verdict}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{result.explanation}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {result.category}
                </Badge>
                <Badge variant="outline" className="text-xs text-gray-500">
                  Confiança: {result.confidence}%
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Score bar inside main card */}
        <CardContent className="pt-0 pb-5">
          <Separator className="mb-4" />
          <RiskScoreBar score={result.riskScore} level={result.riskLevel} />
        </CardContent>
      </Card>

      {/* Domain signals (if URL was analyzed) */}
      {result.domainSignals && result.domainSignals.signals.length > 0 && (
        <DomainSignalsCard signals={result.domainSignals} />
      )}

      {/* Red flags */}
      {result.redFlags.length > 0 && (
        <Card className="animate-in fade-in duration-300" style={{ animationDelay: "100ms" }}>
          <CardContent className="pt-6">
            <RedFlagsList flags={result.redFlags} />
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card className="animate-in fade-in duration-300" style={{ animationDelay: "200ms" }}>
        <CardContent className="pt-6">
          <RecommendedActionsList
            actions={result.recommendedActions}
            doNotDo={result.doNotDo}
          />
        </CardContent>
      </Card>

      {/* Safe reply */}
      {result.safeReply && (
        <Card
          className="border-blue-200 bg-blue-50 animate-in fade-in duration-300"
          style={{ animationDelay: "300ms" }}
        >
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Resposta segura sugerida
            </h3>
            <p className="text-sm text-blue-700 italic bg-white rounded-lg p-3 border border-blue-200">
              &ldquo;{result.safeReply}&rdquo;
            </p>
          </CardContent>
        </Card>
      )}

      {/* Protection tips */}
      {result.protectionTips.length > 0 && (
        <div className="animate-in fade-in duration-300" style={{ animationDelay: "400ms" }}>
          <ProtectionTips tips={result.protectionTips} />
        </div>
      )}

      {/* Family mode */}
      <div className="animate-in fade-in duration-300" style={{ animationDelay: "450ms" }}>
        <FamilyModeButton result={result} />
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-200">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <p>
          Esta análise é gerada por IA e tem caráter informativo. Não substitui análise
          jurídica ou policial. Em casos de golpe real, registre boletim de ocorrência.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="flex-1 gap-2" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copiado!" : "Copiar resultado"}
        </Button>
        <Button
          className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={onNewAnalysis}
        >
          <RefreshCw className="h-4 w-4" />
          Nova análise
        </Button>
      </div>
    </div>
  );
}
