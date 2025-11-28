import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn about how Sugarbunny Stores uses cookies to enhance your browsing experience.',
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

