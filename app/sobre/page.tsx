import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Target,
  Users,
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  Phone,
  Info,
  Search,
} from "lucide-react";

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-blue-100 p-3">
            <Shield className="h-7 w-7 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Sobre o ScamShield</h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Uma ferramenta de inteligência artificial criada para ajudar pessoas comuns a
          identificar golpes digitais antes de se tornarem vítimas.
        </p>
      </div>

      <div className="space-y-6">
        {/* What is it */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 p-2.5 shrink-0">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">O que é o ScamShield?</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  O ScamShield é um detector inteligente de golpes digitais. Você cola uma
                  mensagem suspeita, insere um link ou descreve uma situação, e nossa IA analisa
                  os sinais de risco, gerando um veredito claro com score de risco, explicação
                  simples e orientações práticas sobre o que fazer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* For who */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-green-100 p-2.5 shrink-0">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">Para quem é?</h2>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  {[
                    "Pessoas comuns que recebem mensagens suspeitas no dia a dia",
                    "Idosos e suas famílias, que são alvos frequentes de golpistas",
                    "Pequenos comerciantes e MEIs que usam marketplaces",
                    "Qualquer pessoa que usa PIX, redes sociais ou e-commerce",
                    "Quem deseja aprender a identificar golpes digitais",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How it helps */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-purple-100 p-2.5 shrink-0">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">O que a ferramenta analisa?</h2>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  {[
                    "Phishing bancário e financeiro",
                    "Engenharia social e manipulação psicológica",
                    "Links suspeitos e domínios falsos",
                    "Golpes de marketplace e compra/venda",
                    "Falsas promoções e prêmios",
                    "Romance scam e golpe do amor",
                    "Vagas de emprego falsas",
                    "Falso suporte técnico",
                    "Roubo de contas de WhatsApp e redes sociais",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Eye className="h-4 w-4 text-purple-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limitations */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-amber-100 p-2.5 shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">Limitações importantes</h2>
                <ul className="space-y-1.5 text-sm text-amber-800">
                  {[
                    "A análise é feita por IA e pode conter erros — sempre use o bom senso",
                    "Não substitui análise jurídica, policial ou de especialistas em segurança",
                    "Não confirma nem descarta com 100% de certeza se algo é golpe",
                    "Links não são acessados — apenas o texto/URL é analisado",
                    "Em caso de dúvida, sempre contate a empresa pelos canais oficiais",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best practices */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 p-2.5 shrink-0">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 mb-3">Boas práticas de segurança digital</h2>
                <ul className="space-y-2 text-sm text-gray-600">
                  {[
                    "Nunca compartilhe senhas, códigos SMS ou dados bancários completos",
                    "Ative a verificação em duas etapas em todas as suas contas",
                    "Desconfie de urgência e pressão para agir imediatamente",
                    "Verifique o remetente antes de clicar em links",
                    "Acesse sites de bancos e lojas digitando o endereço diretamente",
                    "Use senhas diferentes para cada serviço",
                    "Mantenha seu celular e apps atualizados",
                    "Converse com família e amigos sobre golpes comuns",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What to do if fell for scam */}
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-red-100 p-2.5 shrink-0">
                <Phone className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">
                  Caiu em um golpe? Veja o que fazer
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  Se você acredita que foi vítima de um golpe digital, aja rapidamente.
                </p>
                <Link href="/cai-em-golpe">
                  <Button variant="outline" className="gap-2 border-red-300 text-red-700 hover:bg-red-50">
                    <AlertTriangle className="h-4 w-4" />
                    Ver checklist completo
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 text-center">
        <Link href="/analisar">
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Search className="h-4 w-4" />
            Analisar mensagem suspeita
          </Button>
        </Link>
      </div>
    </div>
  );
}
