import { getRiskColorClasses, getRiskEmoji } from "@/lib/risk";
import type { RiskLevel } from "@/types/analysis";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: RiskLevel | string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RiskBadge({ level, size = "md", className }: RiskBadgeProps) {
  const colors = getRiskColorClasses(level);
  const emoji = getRiskEmoji(level);

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        colors.badge,
        sizeClasses[size],
        className
      )}
    >
      <span>{emoji}</span>
      {level}
    </span>
  );
}
