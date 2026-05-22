import { CheckCircle, XCircle } from "lucide-react";

interface RecommendedActionsListProps {
  actions: string[];
  doNotDo: string[];
}

export function RecommendedActionsList({ actions, doNotDo }: RecommendedActionsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          O que fazer agora
        </h3>
        <ul className="space-y-2">
          {actions.map((action, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              {action}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <XCircle className="h-4 w-4 text-red-500" />
          O que NÃO fazer
        </h3>
        <ul className="space-y-2">
          {doNotDo.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
