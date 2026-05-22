"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskAnalyzerForm } from "@/components/analyzer/RiskAnalyzerForm";
import { RiskResultCard } from "@/components/analyzer/RiskResultCard";
import { LoadingAnalysis } from "@/components/analyzer/LoadingAnalysis";
import type { AnalysisFormData } from "@/lib/validations";
import type { AnalysisResult } from "@/types/analysis";
import { saveAnalysis } from "@/lib/history-storage";
import { Shield } from "lucide-react";
import { toast } from "sonner";

export default function AnalisarPage() {
  const [state, setState] = useState<"form" | "loading" | "result">("form");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [lastRequest, setLastRequest] = useState<AnalysisFormData | null>(null);

  const handleSubmit = async (data: AnalysisFormData) => {
    setState("loading");
    setLastRequest(data);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Erro ao processar análise.");
      }

      saveAnalysis(data, json);
      setResult(json);
      setState("result");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ocorreu um erro inesperado.";
      toast.error(message);
      setState("form");
    }
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setLastRequest(null);
    setState("form");
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      {state === "form" && (
        <Card className="shadow-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-blue-100 p-3">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Analisar mensagem ou link</CardTitle>
            <CardDescription className="text-base">
              Cole uma mensagem suspeita, insira um link ou descreva a situação.
              A IA vai identificar sinais de golpe em segundos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RiskAnalyzerForm onSubmit={handleSubmit} isLoading={false} />
          </CardContent>
        </Card>
      )}

      {state === "loading" && (
        <Card className="shadow-sm">
          <CardContent>
            <LoadingAnalysis />
          </CardContent>
        </Card>
      )}

      {state === "result" && result && (
        <RiskResultCard result={result} onNewAnalysis={handleNewAnalysis} />
      )}
    </div>
  );
}
