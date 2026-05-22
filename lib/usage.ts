"use client";

import { useState, useEffect, useCallback } from "react";
import type { UserPlan } from "@/types/analysis";
import { getDefaultPlan, canAnalyze, getRemainingAnalyses } from "./plan";

const STORAGE_KEY = "scamshield_usage";

function loadPlan(): UserPlan {
  if (typeof window === "undefined") return getDefaultPlan();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultPlan();
    const plan = JSON.parse(raw) as UserPlan;

    // Reset usage if past reset date
    if (new Date(plan.resetDate) <= new Date()) {
      const fresh = getDefaultPlan();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    return plan;
  } catch {
    return getDefaultPlan();
  }
}

function savePlan(plan: UserPlan): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
}

export function useUsage() {
  const [plan, setPlan] = useState<UserPlan>(getDefaultPlan);

  useEffect(() => {
    setPlan(loadPlan());
  }, []);

  const recordUsage = useCallback(() => {
    setPlan((current) => {
      const updated = { ...current, usedThisMonth: current.usedThisMonth + 1 };
      savePlan(updated);
      return updated;
    });
  }, []);

  const upgradePlan = useCallback((type: UserPlan["type"]) => {
    setPlan((current) => {
      const updated: UserPlan = {
        ...current,
        type,
        monthlyLimit: type === "free" ? 10 : null,
      };
      savePlan(updated);
      return updated;
    });
  }, []);

  return {
    plan,
    canAnalyze: canAnalyze(plan),
    remaining: getRemainingAnalyses(plan),
    recordUsage,
    upgradePlan,
  };
}
