"use client";

import { useUsage } from "@/lib/usage";
import { PLAN_LABELS } from "@/lib/plan";
import { Zap, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function UsageIndicator() {
  const { plan, remaining } = useUsage();

  if (plan.type !== "free") {
    return (
      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
        <Zap className="h-3.5 w-3.5" />
        {PLAN_LABELS[plan.type]} — ilimitado
      </div>
    );
  }

  const used = plan.usedThisMonth;
  const limit = plan.monthlyLimit ?? 10;
  const pct = Math.min(100, (used / limit) * 100);
  const isLow = (remaining ?? 0) <= 2;

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          {isLow ? (
            <Lock className="h-3.5 w-3.5 text-orange-500" />
          ) : (
            <Zap className="h-3.5 w-3.5 text-blue-500" />
          )}
          <span className={cn("text-xs font-medium", isLow ? "text-orange-600" : "text-gray-600")}>
            {remaining !== null ? `${remaining} análise${remaining !== 1 ? "s" : ""} restante${remaining !== 1 ? "s" : ""}` : "ilimitado"}
          </span>
        </div>
        <div className="h-1 w-24 rounded-full bg-gray-200 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              pct >= 80 ? "bg-red-400" : pct >= 60 ? "bg-orange-400" : "bg-blue-400"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
