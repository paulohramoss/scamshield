"use client";

import { useState, useCallback, createContext, useContext, useMemo } from "react";
import { pt } from "./pt";
import { en } from "./en";
import type { Translations } from "./pt";

export type Locale = "pt" | "en";

const TRANSLATIONS: Record<Locale, Translations> = { pt, en };
const STORAGE_KEY = "scamshield_locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === "pt" || stored === "en") return stored;
  const browser = navigator.language.toLowerCase();
  return browser.startsWith("pt") ? "pt" : "en";
}

interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

import { createElement } from "react";

export const I18nContext = createContext<I18nContextValue>({
  locale: "pt",
  t: pt,
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, l);
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, t: TRANSLATIONS[locale], setLocale }),
    [locale, setLocale]
  );

  return createElement(I18nContext.Provider, { value }, children);
}

export function useI18n() {
  return useContext(I18nContext);
}
