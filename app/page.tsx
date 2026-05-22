import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Search,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Link2,
  Phone,
  ShoppingBag,
  Heart,
  Briefcase,
  Gift,
  Building2,
  ArrowRight,
  Lock,
  Eye,
  Info,
} from "lucide-react";

const HOW_IT_WORKS = [
  {
    step: "1",
    icon: MessageSquare,
    title: "Cole a mensagem ou link",
    desc: "Copie o texto suspeito, o link ou descreva a situação que você recebeu.",
  },
  {
    step: "2",
    icon: Search,
    title: "A IA identifica os sinais",
    desc: "Nossa inteligência artificial analisa padrões de golpe, phishing e engenharia social.",
  },
  {
    step: "3",
    icon: Shield,
    title: "Você recebe um veredito claro",
    desc: "Veja o score de risco, as explicações e exatamente o que fazer para se proteger.",
  },
];

const SCAM_TYPES = [
  { icon: Building2, label: "Falso banco", color: "bg-red-100 text-red-700" },
  { icon: Phone, label: "Falso suporte técnico", color: "bg-orange-100 text-orange-700" },
  { icon: Link2, label: "Link rastreamento falso", color: "bg-yellow-100 text-yellow-700" },
  { icon: ShoppingBag, label: "Golpe de marketplace", color: "bg-blue-100 text-blue-700" },
  { icon: MessageSquare, label: "Código de verificação", color: "bg-purple-100 text-purple-700" },
  { icon: Gift, label: "Falsa promoção", color: "bg-pink-100 text-pink-700" },
  { icon: Heart, label: "Romance scam", color: "bg-rose-100 text-rose-700" },
  { icon: Briefcase, label: "Vaga de emprego falsa", color: "bg-teal-100 text-teal-700" },
];

const TRUST_ITEMS = [
  {
    icon: Info,
    text: "Não substitui análise jurídica ou policial. Use como ferramenta educativa.",
  },
  {
    icon: Lock,
    text: 'Nunca informe senhas, códigos ou dados bancários a ninguém — nem "ao banco".',
  },
  {
    icon: Eye,
    text: "Na dúvida, contate a empresa por canais oficiais antes de agir.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/20 text-sm px-4 py-1.5">
                <Shield className="h-4 w-4 mr-2" />
                Proteção inteligente contra golpes digitais
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Descubra se uma mensagem, link ou situação pode ser{" "}
              <span className="text-yellow-300">golpe</span> antes de cair.
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Cole uma mensagem suspeita, envie um link ou descreva o caso. A IA analisa
              sinais de fraude e explica o risco em linguagem simples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link href="/analisar">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-base px-8 py-6 gap-2 shadow-lg"
                >
                  <Search className="h-5 w-5" />
                  Analisar agora
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/exemplos">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/60 text-white hover:bg-white/10 hover:text-white text-base px-8 py-6 gap-2"
                >
                  <Eye className="h-5 w-5" />
                  Ver exemplos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Como funciona</h2>
            <p className="text-gray-500 text-lg">Simples, rápido e sem precisar de conhecimento técnico</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scam types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Exemplos de golpes que detectamos</h2>
            <p className="text-gray-500 text-lg">Golpes financeiros, phishing, engenharia social e muito mais</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {SCAM_TYPES.map((scam, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-5 flex flex-col items-center gap-3 text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${scam.color}`}>
                    <scam.icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{scam.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/exemplos">
              <Button variant="outline" className="gap-2">
                Ver todos os exemplos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For who */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">Para quem é o ScamShield?</h2>
                <p className="text-gray-500 leading-relaxed">
                  Criamos esta ferramenta pensando em quem mais precisa de proteção contra
                  golpes digitais — sem precisar ser especialista em tecnologia.
                </p>
                <ul className="space-y-3">
                  {[
                    "Pessoas comuns que recebem mensagens suspeitas",
                    "Idosos e famílias preocupados com golpes",
                    "Pequenos comerciantes e MEIs",
                    "Quem usa marketplace, PIX e redes sociais",
                    "Qualquer pessoa que queira mais segurança digital",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                {TRUST_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <item.icon className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <AlertTriangle className="h-12 w-12 mx-auto text-yellow-300 opacity-90" />
            <h2 className="text-3xl font-bold">
              Recebeu algo suspeito? Analise agora, de graça.
            </h2>
            <p className="text-blue-100 text-lg">
              Não caia em golpe por falta de informação. Nossa IA analisa a mensagem em
              segundos e te diz o que fazer.
            </p>
            <Link href="/analisar">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-base px-10 py-6 gap-2"
              >
                <Shield className="h-5 w-5" />
                Analisar mensagem agora
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
