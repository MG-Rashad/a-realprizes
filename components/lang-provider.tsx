'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, translations } from '@/lib/i18n'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: typeof translations.ar
}

const LangContext = createContext<LangContextType>({
  lang: 'ar',
  setLang: () => {},
  t: translations.ar,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar')

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    document.documentElement.lang = newLang
    document.documentElement.dir = translations[newLang].dir
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = translations[lang].dir
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
