import type { DomainSignals } from "@/types/analysis";
import { ShieldCheck, ShieldAlert, AlertTriangle, Link2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface DomainSignalsCardProps {
  signals: DomainSignals;
}

export function DomainSignalsCard({ signals }: DomainSignalsCardProps) {
  const riskColor =
    signals.riskScore >= 60
      ? "border-red-200 bg-red-50"
      : signals.riskScore >= 30
      ? "border-yellow-200 bg-yellow-50"
      : "border-green-200 bg-green-50";

  const hasIssues = signals.signals.length > 0;

  return (
    <div className={cn("rounded-xl border-2 p-4 space-y-3", riskColor)}>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-sm flex items-center gap-2 text-gray-800">
          <Globe className="h-4 w-4 text-blue-600" />
          Análise técnica do link
        </h4>
        <span
          className={cn(
            "text-xs font-bold px-2 py-0.5 rounded-full",
            signals.riskScore >= 60
              ? "bg-red-100 text-red-700"
              : signals.riskScore >= 30
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          )}
        >
          Risco {signals.riskScore}/100
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Signal
          ok={signals.isHttps}
          label={signals.isHttps ? "HTTPS seguro" : "Sem HTTPS"}
          icon={signals.isHttps ? ShieldCheck : ShieldAlert}
        />
        {signals.isShortener && (
          <Signal ok={false} label={`Encurtado: ${signals.shortenerService || "desconhecido"}`} icon={Link2} />
        )}
        {signals.similarToFamousBrand && (
          <Signal ok={false} label={`Imita: ${signals.similarToFamousBrand}`} icon={AlertTriangle} />
        )}
        {signals.hasSuspiciousChars && (
          <Signal ok={false} label="Chars suspeitos" icon={AlertTriangle} />
        )}
        {signals.hasDeceptiveSubdomain && (
          <Signal ok={false} label="Subdomínio enganoso" icon={AlertTriangle} />
        )}
      </div>

      {hasIssues && (
        <ul className="space-y-1">
          {signals.signals.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
              <span className="text-red-500 mt-0.5 shrink-0">•</span>
              {s}
            </li>
          ))}
        </ul>
      )}

      {!hasIssues && (
        <p className="text-xs text-green-700">Nenhum sinal técnico suspeito detectado neste link.</p>
      )}
    </div>
  );
}

function Signal({
  ok,
  label,
  icon: Icon,
}: {
  ok: boolean;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border",
        ok
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
