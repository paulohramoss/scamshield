"use client";

import { useEffect, useState } from "react";
import { getRiskColorClasses } from "@/lib/risk";
import type { RiskLevel } from "@/types/analysis";
import { cn } from "@/lib/utils";

interface RiskScoreBarProps {
  score: number;
  level: RiskLevel;
}

const MARKERS = [
  { label: "Seguro", position: 12 },
  { label: "Atenção", position: 37 },
  { label: "Alto risco", position: 62 },
  { label: "Golpe", position: 87 },
];

export function RiskScoreBar({ score, level }: RiskScoreBarProps) {
  const [animated, setAnimated] = useState(0);
  const colors = getRiskColorClasses(level);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 font-medium">Score de risco</span>
        <span className={cn("text-sm font-bold", colors.text)}>{score}/100</span>
      </div>

      {/* Track */}
      <div className="relative h-3 rounded-full bg-gradient-to-r from-green-200 via-yellow-200 via-orange-200 to-red-300 overflow-hidden">
        {/* Fill overlay (darkens right side) */}
        <div
          className="absolute inset-y-0 right-0 bg-gray-100/70 transition-all duration-700 ease-out rounded-r-full"
          style={{ width: `${100 - animated}%` }}
        />
        {/* Needle */}
        <div
          className={cn(
            "absolute top-0 h-full w-1 rounded-full shadow-md transition-all duration-700 ease-out",
            colors.progress
          )}
          style={{ left: `calc(${animated}% - 2px)` }}
        />
      </div>

      {/* Zone labels */}
      <div className="relative h-4">
        {MARKERS.map((m) => (
          <span
            key={m.label}
            className="absolute -translate-x-1/2 text-[10px] text-gray-400 whitespace-nowrap"
            style={{ left: `${m.position}%` }}
          >
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
