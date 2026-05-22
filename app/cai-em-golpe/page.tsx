import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Camera,
  CreditCard,
  Key,
  Shield,
  Bell,
  FileText,
  Users,
  Eye,
  Phone,
  CheckCircle,
  Search,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-600",
    title: "Pare de interagir com o golpista",
    desc: "Não responda mais mensagens, não faça mais pagamentos e não instale nenhum programa que ele pedir. Quanto menos interação, melhor.",
  },
  {
    number: "02",
    icon: Camera,
    color: "bg-blue-100 text-blue-600",
    title: "Tire prints de tudo",
    desc: "Capture screenshots de todas as conversas, links, perfis, comprovantes e qualquer evidência. Esses registros serão importantes para a polícia ou banco.",
  },
  {
    number: "03",
    icon: CreditCard,
    color: "bg-orange-100 text-orange-600",
    title: "Bloqueie cartões e movimentações se necessário",
    desc: "Se informou dados bancários ou fez transações, ligue imediatamente para o seu banco pelo número do verso do cartão. Peça bloqueio preventivo do cartão e monitoramento da conta.",
  },
  {
    number: "04",
    icon: Key,
    color: "bg-purple-100 text-purple-600",
    title: "Troque suas senhas",
    desc: "Mude imediatamente as senhas do e-mail, banco, redes sociais e qualquer serviço que possa ter sido comprometido. Use senhas fortes e diferentes para cada conta.",
  },
  {
    number: "05",
    icon: Shield,
    color: "bg-green-100 text-green-600",
    title: "Ative autenticação em dois fatores",
    desc: "Ative a verificação em duas etapas em todas as suas contas importantes: WhatsApp, Instagram, e-mail, banco digital, etc. Isso dificulta invasões futuras.",
  },
  {
    number: "06",
    icon: Bell,
    color: "bg-yellow-100 text-yellow-600",
    title: "Avise o banco ou instituição financeira",
    desc: "Se foi um golpe financeiro (PIX, TED, cartão), comunique imediatamente ao banco. Em alguns casos é possível tentar o estorno ou bloquear a transação. Peça o protocolo do atendimento.",
  },
  {
    number: "07",
    icon: FileText,
    color: "bg-gray-100 text-gray-600",
    title: "Registre boletim de ocorrência",
    desc: "Em vários estados do Brasil é possível registrar B.O. online pelo site da Delegacia Virtual. Registre mesmo que não recupere o valor — é importante para estatísticas e investigações.",
  },
  {
    number: "08",
    icon: Users,
    color: "bg-pink-100 text-pink-600",
    title: "Avise familiares e empresa",
    desc: "Se a conta de WhatsApp foi comprometida, avise seus contatos imediatamente para que ninguém envie dinheiro para o golpista usando seu nome. Se foi via e-mail corporativo, avise o TI.",
  },
  {
    number: "09",
    icon: Eye,
    color: "bg-teal-100 text-teal-600",
    title: "Monitore suas contas e documentos",
    desc: "Verifique frequentemente suas contas bancárias, extratos e consulte o Serasa/SPC para checar se foram feitos empréstimos ou financiamentos em seu nome. Fique atento nos próximos meses.",
  },
];

const USEFUL_CONTACTS = [
  { label: "Banco Central", info: "Registre reclamações em bcb.gov.br/cidadania", icon: CreditCard },
  { label: "Delegacia Virtual SP", info: "delegaciaeletronica.policiacivil.sp.gov.br", icon: FileText },
  { label: "Procon", info: "Cada estado tem seu Procon. Procure o de sua cidade.", icon: Phone },
  { label: "SaferNet Brasil", info: "safernet.org.br — denúncias de crimes online", icon: Shield },
];

export default function CaiEmGolpePage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle className="h-7 w-7 text-red-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Caí em um golpe. E agora?</h1>
        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
          Calma. Isso acontece com muitas pessoas. O mais importante é agir rápido e com
          clareza. Siga o checklist abaixo na ordem indicada.
        </p>
      </div>

      {/* Alert */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 rounded-xl p-4 mb-8">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          <strong>Importante:</strong> Estas são orientações gerais. Não constituem
          aconselhamento jurídico. Para situações específicas, consulte um advogado ou
          entre em contato com as autoridades competentes de sua região.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-10">
        {STEPS.map((step, i) => (
          <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.color}`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-300">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-gray-200 shrink-0 mt-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Useful contacts */}
      <Card className="bg-blue-50 border-blue-200 mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-blue-900 flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Canais e recursos úteis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {USEFUL_CONTACTS.map((contact, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-blue-200">
                <contact.icon className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">{contact.label}</p>
                  <p className="text-xs text-blue-700">{contact.info}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 text-center">
        <p className="text-xs text-gray-500 leading-relaxed">
          Estas informações têm caráter educativo e geral. As leis, prazos e procedimentos podem
          variar conforme o estado, tipo de golpe e instituições envolvidas. Consulte sempre um
          profissional qualificado para orientação específica ao seu caso.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Suspeita de outro golpe? Use o analisador para verificar.
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
