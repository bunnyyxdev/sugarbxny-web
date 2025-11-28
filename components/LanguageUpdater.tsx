'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageUpdater() {
  const { language } = useLanguage()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const langMap: Record<string, string> = {
        en: 'en',
        th: 'th',
        zh: 'zh-CN',
        ja: 'ja',
      }
      document.documentElement.lang = langMap[language] || 'en'
    }
  }, [language])

  return null
}

