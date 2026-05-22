"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { analysisSchema, type AnalysisFormData } from "@/lib/validations";
import { AlertTriangle, Link2, MessageSquare, Search, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const EXAMPLE_MESSAGES = [
  "Seu acesso ao banco foi bloqueado. Atualize seus dados imediatamente em http://banco-seguro-validacao.com",
  "Olá, sou do suporte técnico da Microsoft. Detectamos vírus no seu computador. Instale este programa para removermos remotamente.",
  "Parabéns! Você ganhou um iPhone. Pague apenas a taxa de entrega clicando no link abaixo.",
  "Oi mãe, meu celular quebrou. Me chama nesse novo número e faz um Pix urgente.",
];

interface RiskAnalyzerFormProps {
  onSubmit: (data: AnalysisFormData) => void;
  isLoading: boolean;
}

export function RiskAnalyzerForm({ onSubmit, isLoading }: RiskAnalyzerFormProps) {
  const [source, setSource] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AnalysisFormData>({
    resolver: zodResolver(analysisSchema),
  });

  const messageValue = watch("message") || "";
  const charCount = messageValue.length;

  const handleExampleClick = (msg: string) => {
    setValue("message", msg, { shouldValidate: true });
  };

  const handleFormSubmit = (data: AnalysisFormData) => {
    onSubmit({ ...data, source: (source || undefined) as AnalysisFormData["source"] });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Security warning */}
      <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
        <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
        <p>
          <strong>Atenção:</strong> Não cole senhas, códigos de verificação, números
          completos de cartão ou documentos sensíveis neste campo.
        </p>
      </div>

      {/* Message field */}
      <div className="space-y-2">
        <Label htmlFor="message" className="flex items-center gap-2 text-sm font-medium">
          <MessageSquare className="h-4 w-4 text-blue-600" />
          Mensagem suspeita
        </Label>
        <Textarea
          id="message"
          placeholder="Cole aqui a mensagem suspeita que você recebeu por WhatsApp, SMS, e-mail, etc..."
          className={cn("min-h-[140px] resize-y text-sm", errors.message && "border-red-400")}
          {...register("message")}
          disabled={isLoading}
        />
        <div className="flex justify-between items-center">
          {errors.message ? (
            <p className="text-xs text-red-500">{errors.message.message}</p>
          ) : (
            <span />
          )}
          <span className={cn("text-xs", charCount > 4500 ? "text-orange-500" : "text-gray-400")}>
            {charCount}/5000
          </span>
        </div>
      </div>

      {/* URL field */}
      <div className="space-y-2">
        <Label htmlFor="url" className="flex items-center gap-2 text-sm font-medium">
          <Link2 className="h-4 w-4 text-blue-600" />
          Link suspeito{" "}
          <span className="text-gray-400 font-normal">(opcional)</span>
        </Label>
        <Input
          id="url"
          type="url"
          placeholder="https://exemplo-suspeito.com/link"
          className={cn("text-sm", errors.url && "border-red-400")}
          {...register("url")}
          disabled={isLoading}
        />
        {errors.url && (
          <p className="text-xs text-red-500">{errors.url.message}</p>
        )}
      </div>

      {/* Context and Source */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="context" className="flex items-center gap-2 text-sm font-medium">
            <Info className="h-4 w-4 text-blue-600" />
            Contexto adicional{" "}
            <span className="text-gray-400 font-normal">(opcional)</span>
          </Label>
          <Textarea
            id="context"
            placeholder="Descreva a situação: de onde veio, o que aconteceu antes..."
            className="min-h-[100px] resize-y text-sm"
            {...register("context")}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            Origem da mensagem{" "}
            <span className="text-gray-400 font-normal">(opcional)</span>
          </Label>
          <Select onValueChange={(v: string | null) => setSource(v)} disabled={isLoading}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Selecione a origem..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
              <SelectItem value="SMS">SMS</SelectItem>
              <SelectItem value="E-mail">E-mail</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Marketplace">Marketplace</SelectItem>
              <SelectItem value="Ligação">Ligação</SelectItem>
              <SelectItem value="Site">Site</SelectItem>
              <SelectItem value="Outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Example messages */}
      <div className="space-y-2">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Exemplos para testar:
        </p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_MESSAGES.map((msg, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleExampleClick(msg)}
              className="text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md px-2 py-1 transition-colors text-left max-w-[200px] truncate"
              disabled={isLoading}
            >
              Exemplo {i + 1}
            </button>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-base py-6"
        size="lg"
      >
        <Search className="h-5 w-5" />
        {isLoading ? "Analisando..." : "Analisar risco"}
      </Button>
    </form>
  );
}
