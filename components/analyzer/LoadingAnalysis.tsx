import { Shield } from "lucide-react";

export function LoadingAnalysis() {
  const steps = [
    "Verificando padrões de phishing...",
    "Analisando sinais de engenharia social...",
    "Checando links suspeitos...",
    "Identificando táticas de golpe...",
    "Gerando veredito...",
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-75" />
        <div className="relative rounded-full bg-blue-100 p-5">
          <Shield className="h-10 w-10 text-blue-600 animate-pulse" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Analisando conteúdo...</h3>
        <p className="text-sm text-gray-500">A IA está verificando sinais de risco</p>
      </div>

      <div className="w-full max-w-sm space-y-2">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-sm text-gray-500 opacity-0 animate-fadeIn"
            style={{ animationDelay: `${i * 0.4}s`, animationFillMode: "forwards" }}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
