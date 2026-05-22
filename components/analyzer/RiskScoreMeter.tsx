"use client";

import { useEffect, useState } from "react";
import { getRiskColorClasses } from "@/lib/risk";
import type { RiskLevel } from "@/types/analysis";
import { cn } from "@/lib/utils";

interface RiskScoreMeterProps {
  score: number;
  level: RiskLevel | string;
  animated?: boolean;
}

export function RiskScoreMeter({ score, level, animated = true }: RiskScoreMeterProps) {
  const [displayed, setDisplayed] = useState(animated ? 0 : score);
  const colors = getRiskColorClasses(level);

  useEffect(() => {
    if (!animated) return;
    const duration = 1000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayed(score);
        clearInterval(timer);
      } else {
        setDisplayed(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [score, animated]);

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (displayed / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={cn("transition-all duration-100", {
              "stroke-green-500": level === "Baixo risco",
              "stroke-yellow-500": level === "Atenção",
              "stroke-orange-500": level === "Alto risco",
              "stroke-red-500": level === "Golpe provável",
            })}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-4xl font-bold", colors.text)}>{displayed}</span>
          <span className="text-xs text-gray-400 font-medium">/ 100</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 font-medium">Score de risco</p>
    </div>
  );
}
