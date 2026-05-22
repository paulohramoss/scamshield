"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, History, Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-700">
          <Shield className="h-6 w-6 text-blue-600" />
          <span>ScamShield</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/analisar" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">
            Analisar
          </Link>
          <Link href="/exemplos" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">
            Exemplos
          </Link>
          <Link href="/sobre" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">
            Sobre
          </Link>
          <Link href="/historico">
            <Button variant="outline" size="sm" className="gap-2">
              <History className="h-4 w-4" />
              Histórico
            </Button>
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
          <Link href="/analisar" className="text-sm font-medium text-gray-700 py-2" onClick={() => setMenuOpen(false)}>
            Analisar
          </Link>
          <Link href="/exemplos" className="text-sm font-medium text-gray-700 py-2" onClick={() => setMenuOpen(false)}>
            Exemplos
          </Link>
          <Link href="/sobre" className="text-sm font-medium text-gray-700 py-2" onClick={() => setMenuOpen(false)}>
            Sobre
          </Link>
          <Link href="/historico" onClick={() => setMenuOpen(false)}>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <History className="h-4 w-4" />
              Histórico
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
