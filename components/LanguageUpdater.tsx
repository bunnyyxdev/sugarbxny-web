'use client'

import { useEffect } from 'react'

export default function LanguageUpdater() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'en'
    }
  }, [])

  return null
}

