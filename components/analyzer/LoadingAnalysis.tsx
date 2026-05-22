import { Shield } from "lucide-react";
import { SkeletonResult } from "./SkeletonResult";

const STEPS = [
  "Verificando padrões de phishing...",
  "Analisando sinais de engenharia social...",
  "Checando links e domínios suspeitos...",
  "Identificando táticas de golpe...",
  "Gerando dicas de proteção...",
];

export function LoadingAnalysis() {
  return (
    <div className="space-y-8 w-full max-w-2xl mx-auto">
      {/* Header animation */}
      <div className="flex flex-col items-center justify-center py-6 gap-5">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-75" />
          <div className="relative rounded-full bg-blue-100 p-5">
            <Shield className="h-10 w-10 text-blue-600 animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-1.5">
          <h3 className="text-lg font-semibold text-gray-800">Analisando conteúdo...</h3>
          <p className="text-sm text-gray-500">A IA está verificando sinais de risco</p>
        </div>

        <div className="w-full max-w-sm space-y-2">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm text-gray-500 opacity-0 animate-fadeIn"
              style={{ animationDelay: `${i * 0.5}s`, animationFillMode: "forwards" }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0 animate-pulse" />
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton preview of result */}
      <SkeletonResult />
    </div>
  );
}
