import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { en, type Content } from './en';

/**
 * Locale registry. To add Slovenian: create `sl.ts` exporting `const sl: Content`,
 * register it below, and render a language switch that calls `setLocale('sl')`.
 */
export const locales = { en } satisfies Record<string, Content>;
export type Locale = keyof typeof locales;
export const defaultLocale: Locale = 'en';

type Ctx = { t: Content; locale: Locale; setLocale: (l: Locale) => void };
const LocaleContext = createContext<Ctx>({ t: en, locale: defaultLocale, setLocale: () => {} });

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const value = useMemo(() => ({ t: locales[locale], locale, setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export const useT = () => useContext(LocaleContext).t;
export const useLocale = () => useContext(LocaleContext);
