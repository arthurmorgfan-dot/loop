"use client";
import { createContext, useContext } from "react";
import { translations, type Locale } from "./locale";
const LocaleContext = createContext<Locale>("nl");
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}
export function useLocale() {
  const locale = useContext(LocaleContext);
  return { locale, t: translations(locale) };
}
