import { ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProtectionTipsProps {
  tips: string[];
}

export function ProtectionTips({ tips }: ProtectionTipsProps) {
  if (!tips || tips.length === 0) return null;

  return (
    <Card className="border-emerald-200 bg-emerald-50">
      <CardContent className="pt-5">
        <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2 text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Como se proteger de golpes parecidos
        </h3>
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-emerald-700">
              <span className="text-emerald-500 font-bold shrink-0 mt-0.5">{i + 1}.</span>
              {tip}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
