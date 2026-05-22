import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScamShield — Detector de Golpes Digitais",
  description:
    "Descubra se uma mensagem, link ou situação pode ser golpe antes de cair. A IA analisa sinais de fraude e explica o risco em linguagem simples.",
  keywords: "golpe, phishing, fraude, scam, detector, segurança digital, proteção",
  openGraph: {
    title: "ScamShield — Detector de Golpes Digitais",
    description:
      "Cole uma mensagem suspeita, envie um link ou descreva o caso. A IA analisa e explica o risco.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
