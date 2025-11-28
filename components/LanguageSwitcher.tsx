'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'

const languages = [
  { code: 'en' as const },
  { code: 'th' as const },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = languages.find(lang => lang.code === language) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Change language"
      >
        <Image
          src={`/assets/img/flag/${currentLang.code}.png`}
          alt={currentLang.code}
          width={20}
          height={15}
          className="object-contain"
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  language === lang.code ? 'bg-pink-50 dark:bg-pink-900/20' : ''
                }`}
              >
                <Image
                  src={`/assets/img/flag/${lang.code}.png`}
                  alt={lang.code}
                  width={24}
                  height={18}
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

