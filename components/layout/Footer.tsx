import Link from "next/link";
import { Shield, AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-blue-700 mb-3">
              <Shield className="h-5 w-5" />
              ScamShield
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Detector inteligente de golpes digitais. Proteja-se de fraudes,
              phishing e engenharia social com análise por IA.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/analisar" className="text-sm text-gray-500 hover:text-blue-700 transition-colors">
                  Analisar mensagem
                </Link>
              </li>
              <li>
                <Link href="/exemplos" className="text-sm text-gray-500 hover:text-blue-700 transition-colors">
                  Exemplos de golpes
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-gray-500 hover:text-blue-700 transition-colors">
                  Sobre o ScamShield
                </Link>
              </li>
              <li>
                <Link href="/cai-em-golpe" className="text-sm text-gray-500 hover:text-blue-700 transition-colors">
                  Caí em um golpe
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wider">
              Avisos importantes
            </h3>
            <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              <p>
                Esta ferramenta <strong>não substitui</strong> análise jurídica,
                policial ou de especialistas. Na dúvida, contate a empresa por
                canais oficiais.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ScamShield. Ferramenta educativa para prevenção de fraudes digitais.
          </p>
          <p className="text-xs text-gray-400">
            Nunca informe senhas, códigos ou dados bancários a ninguém.
          </p>
        </div>
      </div>
    </footer>
  );
}
