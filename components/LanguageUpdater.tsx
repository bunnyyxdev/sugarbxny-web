'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageUpdater() {
  const { language } = useLanguage()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  return null
}

