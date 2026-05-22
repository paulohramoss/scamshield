import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Package,
  ShoppingBag,
  Monitor,
  MessageSquare,
  Briefcase,
  Gift,
  Heart,
  AlertTriangle,
  CheckCircle,
  Search,
} from "lucide-react";

const EXAMPLES = [
  {
    type: "Phishing bancário",
    icon: Building2,
    color: "bg-red-100 text-red-700",
    badgeColor: "bg-red-100 text-red-800 border-red-200",
    message:
      "Prezado cliente, seu acesso ao Banco XYZ foi temporariamente bloqueado por suspeita de fraude. Acesse o link abaixo para validar seus dados cadastrais e evitar o cancelamento da sua conta: http://bancoxyz-validacao-segura.online/atualizar",
    whyScam: [
      "Cria urgência e medo de perder o acesso",
      "O link não é o domínio oficial do banco (bancoxyz.com.br)",
      "Bancos reais nunca pedem validação por link de SMS ou WhatsApp",
      "Usa palavras genéricas como 'Prezado cliente'",
    ],
    whatToDo: [
      "Não clique no link",
      "Acesse o app ou site oficial do banco diretamente",
      "Ligue para o telefone no verso do seu cartão",
      "Reporte ao banco se necessário",
    ],
  },
  {
    type: "Entrega falsa (Correios)",
    icon: Package,
    color: "bg-orange-100 text-orange-700",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    message:
      "Correios: Seu objeto foi retido na unidade de distribuição. É necessário pagar a taxa de R$8,70 para liberação. Acesse: http://correios-taxaentrega.site/liberar para efetuar o pagamento.",
    whyScam: [
      "Link não pertence ao domínio oficial dos Correios (correios.com.br)",
      "Cria urgência com 'retido na unidade'",
      "Os Correios nunca cobram taxas por link de SMS",
      "Site com extensão diferente do oficial",
    ],
    whatToDo: [
      "Não acesse o link",
      "Rastreie pelo site oficial: correios.com.br",
      "Se houver taxa real, pague apenas pelos canais oficiais",
      "Denuncie ao serviço de spam do seu operador",
    ],
  },
  {
    type: "Golpe de marketplace",
    icon: ShoppingBag,
    color: "bg-yellow-100 text-yellow-700",
    badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
    message:
      "Olá! Vi seu anúncio. Tenho interesse no produto. Sou de outro estado e prefiro pagar via transferência bancária direta para garantir mais rapidez. Pode me passar seus dados bancários? Vou pagar adiantado e retiro com motoboy.",
    whyScam: [
      "Pede pagamento fora da plataforma (sem proteção ao vendedor)",
      "Cria pressão com 'pago adiantado'",
      "Histórico clássico de golpe de comprador falso",
      "Se pago fora da plataforma, o marketplace não pode ajudar",
    ],
    whatToDo: [
      "Recuse pagamentos fora da plataforma",
      "Use apenas os sistemas de pagamento do marketplace",
      "Denuncie o usuário na plataforma",
      "Nunca entregue o produto antes de confirmar o recebimento",
    ],
  },
  {
    type: "Falso suporte técnico",
    icon: Monitor,
    color: "bg-blue-100 text-blue-700",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    message:
      "ALERTA DE SEGURANÇA MICROSOFT: Detectamos atividade suspeita no seu computador (vírus Trojan). Ligue AGORA para o suporte técnico: 0800-555-1234. Não desligue o computador ou seus dados podem ser perdidos.",
    whyScam: [
      "A Microsoft nunca entra em contato proativamente por vírus",
      "Usa medo e urgência para pressionar",
      "Número de telefone falso se passando por suporte oficial",
      "Objetivo: instalar software espião ou cobrar por 'reparo' falso",
    ],
    whatToDo: [
      "Ignore completamente a mensagem",
      "Feche a janela ou anúncio",
      "Não ligue para o número informado",
      "Execute um antivírus legítimo se quiser verificar seu PC",
    ],
  },
  {
    type: "Roubo de conta WhatsApp",
    icon: MessageSquare,
    color: "bg-purple-100 text-purple-700",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    message:
      "Oi! Sou do suporte do WhatsApp. Precisamos confirmar seu número para evitar o bloqueio da sua conta. Você receberá um código SMS agora. Me envie esse código para validar sua conta.",
    whyScam: [
      "O WhatsApp nunca pede código via mensagem ou ligação",
      "O código SMS é a chave de acesso à sua conta",
      "Ao enviar o código, o golpista assume o controle do WhatsApp",
      "Golpistas usam a conta para pedir dinheiro para seus contatos",
    ],
    whatToDo: [
      "Nunca compartilhe o código SMS de verificação",
      "Ignore a mensagem completamente",
      "Ative a verificação em duas etapas no WhatsApp",
      "Avise seus contatos se suspeitar que caiu no golpe",
    ],
  },
  {
    type: "Vaga de emprego falsa",
    icon: Briefcase,
    color: "bg-teal-100 text-teal-700",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    message:
      "Parabéns! Você foi selecionado para uma vaga home office de R$3.500/mês. Trabalho apenas 2h por dia. Para liberar seu acesso à plataforma de trabalho, é necessário pagar uma taxa de cadastro de R$97,00 via PIX.",
    whyScam: [
      "Empresas sérias não cobram taxa de cadastro de candidatos",
      "Salário desproporcional ao esforço é sinal de alerta",
      "Pagamento antecipado para 'liberar acesso' é clássico golpe",
      "Geralmente envolve pirâmide financeira ou lavagem de dinheiro",
    ],
    whatToDo: [
      "Nunca pague para conseguir um emprego",
      "Pesquise a empresa em sites oficiais",
      "Desconfie de vagas com salários altíssimos para pouco trabalho",
      "Reporte a oferta nas plataformas de emprego",
    ],
  },
  {
    type: "Promoção falsa",
    icon: Gift,
    color: "bg-pink-100 text-pink-700",
    badgeColor: "bg-pink-100 text-pink-800 border-pink-200",
    message:
      "🎉 PARABÉNS! Você foi o visitante número 1.000.000 do nosso site e GANHOU um iPhone 15 Pro! Para retirar seu prêmio, clique agora: http://premios-gratis.xyz/iphone e pague apenas a taxa de envio de R$45.",
    whyScam: [
      "Ninguém dá iPhone grátis aleatoriamente",
      "A 'taxa de envio' é o golpe real — você paga e não recebe nada",
      "Link suspeito com domínio não oficial",
      "Urgência criada para não dar tempo de pensar",
    ],
    whatToDo: [
      "Não clique no link",
      "Não pague nenhuma taxa",
      "Compartilhe o alerta com família e amigos",
      "Reporte como spam/phishing para seu navegador",
    ],
  },
  {
    type: "Romance scam (golpe do amor)",
    icon: Heart,
    color: "bg-rose-100 text-rose-700",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    message:
      "Oi linda! Sou engenheiro trabalhando em navio offshore. Nos conhecemos há 3 semanas e já me apaixonei. Preciso muito da sua ajuda: tive um acidente e preciso de R$2.000 para a cirurgia. Prometo te pagar de volta quando chegar ao Brasil.",
    whyScam: [
      "Relacionamento online intenso em tempo curto é sinal de alerta",
      "Pessoas em situação de emergência sempre pedem dinheiro",
      "Criação de vínculo emocional antes do pedido de dinheiro",
      "A pessoa nunca existe de fato — fotos e histórias são falsos",
    ],
    whatToDo: [
      "Nunca envie dinheiro a alguém que não conhece pessoalmente",
      "Faça pesquisa reversa da foto do perfil (Google Imagens)",
      "Converse com amigos ou familiares sobre a situação",
      "Bloqueie e denuncie o perfil na plataforma",
    ],
  },
];

export default function ExemplosPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-orange-100 p-3">
            <AlertTriangle className="h-7 w-7 text-orange-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Exemplos de golpes digitais</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Conheça os golpes mais comuns no Brasil e aprenda a identificá-los antes de cair.
          Cada exemplo mostra a mensagem real, por que é golpe e o que fazer.
        </p>
      </div>

      <div className="space-y-6">
        {EXAMPLES.map((ex, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${ex.color}`}>
                  <ex.icon className="h-5 w-5" />
                </div>
                <div>
                  <Badge className={`${ex.badgeColor} border text-xs`}>{ex.type}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Message example */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Mensagem típica:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 italic leading-relaxed">
                  &ldquo;{ex.message}&rdquo;
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Why scam */}
                <div>
                  <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Por que é golpe:
                  </p>
                  <ul className="space-y-1.5">
                    {ex.whyScam.map((reason, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-red-400 mt-1 shrink-0">●</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What to do */}
                <div>
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5" />
                    O que fazer:
                  </p>
                  <ul className="space-y-1.5">
                    {ex.whatToDo.map((action, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center bg-blue-50 border border-blue-200 rounded-xl p-8">
        <Search className="h-10 w-10 text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-blue-900 mb-2">
          Recebeu algo parecido?
        </h2>
        <p className="text-blue-700 mb-6 text-sm">
          Não arrisque. Cole a mensagem no nosso analisador e receba um veredito detalhado
          com o que fazer.
        </p>
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
