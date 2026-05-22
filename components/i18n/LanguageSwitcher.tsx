"use client";

import { useI18n, type Locale } from "@/i18n";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const options: { value: Locale; label: string; flag: string }[] = [
    { value: "pt", label: "PT", flag: "🇧🇷" },
    { value: "en", label: "EN", flag: "🇺🇸" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-0.5">
      <Globe className="h-3.5 w-3.5 text-gray-400 ml-1.5" />
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLocale(opt.value)}
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors",
            locale === opt.value
              ? "bg-blue-600 text-white"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          )}
          aria-label={`Switch to ${opt.label}`}
        >
          <span>{opt.flag}</span>
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
