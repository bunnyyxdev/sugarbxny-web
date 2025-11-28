'use client'

interface FlagIconProps {
  code: 'en' | 'th' | 'zh' | 'ja'
  className?: string
}

export default function FlagIcon({ code, className = 'w-5 h-5' }: FlagIconProps) {
  const flags = {
    en: (
      <svg className={className} viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="480" fill="#012169"/>
        <path d="M0 0h256v256H0z" fill="#FFF"/>
        <path d="M256 0h256v256H256z" fill="#C8102E"/>
        <path d="M0 0l256 256M256 0L0 256" stroke="#FFF" strokeWidth="42.67"/>
        <path d="M0 0l256 256M256 0L0 256" stroke="#C8102E" strokeWidth="29.87"/>
        <path d="M160 0v256M0 128h256" stroke="#FFF" strokeWidth="64" strokeLinecap="round"/>
        <path d="M160 0v256M0 128h256" stroke="#C8102E" strokeWidth="42.67" strokeLinecap="round"/>
      </svg>
    ),
    th: (
      <svg className={className} viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="600" fill="#ED1C24"/>
        <rect y="100" width="900" height="100" fill="#FFF"/>
        <rect y="200" width="900" height="200" fill="#241D4F"/>
        <rect y="400" width="900" height="100" fill="#FFF"/>
      </svg>
    ),
    zh: (
      <svg className={className} viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="600" fill="#DE2910"/>
        <path d="M0 0h900v600H0z" fill="#FFDE00"/>
        <circle cx="450" cy="300" r="120" fill="#DE2910"/>
        <circle cx="450" cy="300" r="100" fill="#FFDE00"/>
        <path d="M450 200l30 90-80-60h100l-80 60z" fill="#DE2910"/>
        <path d="M450 400l30-90-80 60h100l-80-60z" fill="#DE2910"/>
        <path d="M350 300l90 30-60-80v100l60-80z" fill="#DE2910"/>
        <path d="M550 300l-90 30 60-80v100l-60-80z" fill="#DE2910"/>
      </svg>
    ),
    ja: (
      <svg className={className} viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="600" fill="#FFF"/>
        <circle cx="450" cy="300" r="180" fill="#BC002D"/>
      </svg>
    ),
  }

  return <span className="inline-block">{flags[code]}</span>
}

