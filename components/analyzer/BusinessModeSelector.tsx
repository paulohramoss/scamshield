"use client";

import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BusinessScamType } from "@/types/analysis";

const BUSINESS_SCAM_OPTIONS: { value: BusinessScamType; label: string; description: string }[] = [
  { value: "falso-fornecedor", label: "Falso fornecedor", description: "Empresa ou pessoa fingindo vender produto/serviço" },
  { value: "boleto-falso", label: "Boleto falso", description: "Boleto com dados bancários adulterados" },
  { value: "falso-cliente", label: "Falso cliente", description: "Pessoa fingindo ser cliente para aplicar golpe" },
  { value: "pedido-urgente", label: "Pedido urgente", description: "Pressão por transferência imediata" },
  { value: "marketplace", label: "Marketplace", description: "Golpe em plataforma de vendas" },
  { value: "falso-suporte", label: "Falso suporte", description: "Fingindo ser suporte de sistema ou banco" },
];

interface BusinessModeSelectorProps {
  selected: BusinessScamType | null;
  onChange: (type: BusinessScamType | null) => void;
  disabled?: boolean;
}

export function BusinessModeSelector({ selected, onChange, disabled }: BusinessModeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Building2 className="h-4 w-4 text-blue-600" />
        Tipo de situação empresarial
        <span className="text-gray-400 font-normal">(opcional)</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {BUSINESS_SCAM_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(selected === opt.value ? null : opt.value)}
            className={cn(
              "text-left rounded-lg border-2 p-2.5 transition-all text-xs",
              selected === opt.value
                ? "border-blue-500 bg-blue-50 text-blue-800"
                : "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50/30"
            )}
          >
            <div className="font-semibold">{opt.label}</div>
            <div className="text-gray-400 mt-0.5 text-[11px] leading-tight">{opt.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
