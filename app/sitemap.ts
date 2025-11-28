import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const routes = [
    '',
    '/products',
    '/virtual-airlines',
    '/bots',
    '/website',
    '/reviews',
    '/contact',
    '/faq',
    '/terms',
    '/privacy',
    '/cookies',
    '/redeem',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}

