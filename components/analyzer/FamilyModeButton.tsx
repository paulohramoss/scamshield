"use client";

import { useState } from "react";
import { Users, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import type { AnalysisResult } from "@/types/analysis";

interface FamilyModeButtonProps {
  result: AnalysisResult;
}

export function FamilyModeButton({ result }: FamilyModeButtonProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = result.familyMessage || generateFallbackMessage(result);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      toast.success("Mensagem copiada! Agora é só colar no WhatsApp.");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Não foi possível copiar. Selecione o texto manualmente.");
    }
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2 border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300"
        onClick={() => setExpanded((v) => !v)}
      >
        <Users className="h-4 w-4" />
        Explicação para familiar (WhatsApp)
        {expanded ? <ChevronUp className="h-4 w-4 ml-auto" /> : <ChevronDown className="h-4 w-4 ml-auto" />}
      </Button>

      {expanded && (
        <Card className="border-violet-200 bg-violet-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <CardContent className="pt-4 space-y-3">
            <p className="text-xs text-violet-600 font-medium">
              Texto simples para enviar no WhatsApp para um familiar:
            </p>
            <div className="bg-white rounded-lg p-3 border border-violet-200 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {message}
            </div>
            <Button
              type="button"
              size="sm"
              className="w-full gap-2 bg-violet-600 hover:bg-violet-700 text-white"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copiar para WhatsApp
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function generateFallbackMessage(result: AnalysisResult): string {
  const emoji = result.riskScore >= 75 ? "🛑" : result.riskScore >= 50 ? "🚨" : "⚠️";
  return `${emoji} Atenção: recebi uma mensagem suspeita e analisei com o ScamShield.

${result.verdict}

${result.explanation}

${result.recommendedActions.length > 0 ? `O que fazer: ${result.recommendedActions[0]}` : ""}

Se receber algo parecido, não clique em links e não passe dados pessoais. Em caso de dúvida, ligue diretamente para o banco ou empresa pelo número oficial.`;
}
