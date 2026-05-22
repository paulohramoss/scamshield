import { AlertTriangle } from "lucide-react";

interface RedFlagsListProps {
  flags: string[];
}

export function RedFlagsList({ flags }: RedFlagsListProps) {
  if (!flags || flags.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-orange-500" />
        Sinais de alerta encontrados
      </h3>
      <ul className="space-y-2">
        {flags.map((flag, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-red-500 mt-0.5 shrink-0">●</span>
            {flag}
          </li>
        ))}
      </ul>
    </div>
  );
}
