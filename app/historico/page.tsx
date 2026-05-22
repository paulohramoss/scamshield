"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HistoryTable } from "@/components/history/HistoryTable";
import { EmptyState } from "@/components/ui/empty-state";
import { History, Shield, Trash2 } from "lucide-react";
import { loadHistory, clearHistory, type StoredAnalysis } from "@/lib/history-storage";
import { toast } from "sonner";

export default function HistoricoPage() {
  const [analyses, setAnalyses] = useState<StoredAnalysis[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setAnalyses(loadHistory());
    setLoaded(true);
  }, []);

  const handleClear = () => {
    clearHistory();
    setAnalyses([]);
    toast.success("Histórico apagado.");
  };

  if (!loaded) return null;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-2.5">
            <History className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Histórico de análises</h1>
            <p className="text-sm text-gray-500">
              {analyses.length === 0
                ? "Nenhuma análise ainda"
                : `${analyses.length} análise${analyses.length !== 1 ? "s" : ""} salvas neste dispositivo`}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {analyses.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleClear}
            >
              <Trash2 className="h-4 w-4" />
              Apagar tudo
            </Button>
          )}
          <Link href="/analisar">
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Shield className="h-4 w-4" />
              Nova análise
            </Button>
          </Link>
        </div>
      </div>

      {analyses.length === 0 ? (
        <EmptyState
          icon={History}
          title="Nenhuma análise encontrada"
          description="Você ainda não fez nenhuma análise neste dispositivo. O histórico é salvo automaticamente a cada análise."
          action={
            <Link href="/analisar">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Fazer primeira análise
              </Button>
            </Link>
          }
        />
      ) : (
        <HistoryTable analyses={analyses} />
      )}
    </div>
  );
}
