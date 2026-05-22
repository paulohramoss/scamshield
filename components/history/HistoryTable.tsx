"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RiskBadge } from "@/components/analyzer/RiskBadge";
import { RedFlagsList } from "@/components/analyzer/RedFlagsList";
import { RecommendedActionsList } from "@/components/analyzer/RecommendedActionsList";
import { EmptyState } from "@/components/ui/empty-state";
import { getRiskColorClasses } from "@/lib/risk";
import type { StoredAnalysis } from "@/lib/history-storage";
import { History, Eye, MessageSquare, Link2, Calendar, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HistoryTableProps {
  analyses: StoredAnalysis[];
}

const FILTERS = [
  { label: "Todos", value: "all" },
  { label: "Golpe provável", value: "Golpe provável" },
  { label: "Alto risco", value: "Alto risco" },
  { label: "Atenção", value: "Atenção" },
  { label: "Baixo risco", value: "Baixo risco" },
];

export function HistoryTable({ analyses }: HistoryTableProps) {
  const [selected, setSelected] = useState<StoredAnalysis | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? analyses : analyses.filter((a) => a.risk_level === filter);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="mb-4 flex flex-wrap h-auto gap-1">
          {FILTERS.map((f) => (
            <TabsTrigger key={f.value} value={f.value} className="text-xs">
              {f.label}
              <span className="ml-1.5 text-xs text-gray-400">
                ({f.value === "all" ? analyses.length : analyses.filter((a) => a.risk_level === f.value).length})
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {FILTERS.map((f) => (
          <TabsContent key={f.value} value={f.value}>
            {filtered.length === 0 ? (
              <EmptyState
                icon={History}
                title="Nenhuma análise encontrada"
                description="Você ainda não tem análises nesta categoria."
                action={
                  <Link href="/analisar">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Fazer primeira análise
                    </Button>
                  </Link>
                }
              />
            ) : (
              <div className="space-y-3">
                {filtered.map((analysis) => {
                  const colors = getRiskColorClasses(analysis.risk_level);
                  return (
                    <Card
                      key={analysis.id}
                      className={cn(
                        "hover:shadow-md transition-shadow cursor-pointer border",
                        colors.border
                      )}
                      onClick={() => setSelected(analysis)}
                    >
                      <CardContent className="pt-4 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <RiskBadge level={analysis.risk_level} size="sm" />
                              {analysis.category && (
                                <Badge variant="outline" className="text-xs">
                                  {analysis.category}
                                </Badge>
                              )}
                              {analysis.source && (
                                <Badge variant="secondary" className="text-xs">
                                  {analysis.source}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm font-medium text-gray-800 line-clamp-1">
                              {analysis.verdict}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(analysis.created_at)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Cpu className="h-3 w-3" />
                                Score: {analysis.risk_score}/100
                              </span>
                              {analysis.message && (
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  Mensagem
                                </span>
                              )}
                              {analysis.url && (
                                <span className="flex items-center gap-1">
                                  <Link2 className="h-3 w-3" />
                                  Link
                                </span>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-1.5 shrink-0">
                            <Eye className="h-4 w-4" />
                            Ver detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <RiskBadge level={selected.risk_level} size="md" />
                <span className="text-base font-semibold">{selected.verdict}</span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-5 mt-2">
              <div className="flex items-center gap-4 flex-wrap text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(selected.created_at)}
                </span>
                <span>Score: {selected.risk_score}/100</span>
                {selected.confidence && <span>Confiança: {selected.confidence}%</span>}
                {selected.source && <span>Origem: {selected.source}</span>}
                {selected.category && <Badge variant="outline" className="text-xs">{selected.category}</Badge>}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Explicação</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{selected.explanation}</p>
              </div>

              {selected.message && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Mensagem analisada</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border line-clamp-4">
                    {selected.message}
                  </p>
                </div>
              )}

              {selected.url && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Link analisado</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border break-all">
                    {selected.url}
                  </p>
                </div>
              )}

              {selected.red_flags?.length > 0 && (
                <RedFlagsList flags={selected.red_flags} />
              )}

              {(selected.recommended_actions?.length > 0 || selected.do_not_do?.length > 0) && (
                <RecommendedActionsList
                  actions={selected.recommended_actions || []}
                  doNotDo={selected.do_not_do || []}
                />
              )}

              {selected.safe_reply && (
                <div>
                  <h4 className="text-sm font-semibold text-blue-700 mb-1">Resposta segura sugerida</h4>
                  <p className="text-sm text-blue-600 italic bg-blue-50 rounded-lg p-3 border border-blue-200">
                    &ldquo;{selected.safe_reply}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
