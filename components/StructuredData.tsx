'use client'

interface Product {
  id: number
  name: string
  description?: string
  price: number
  image_url?: string
  category?: string
  stock: number
}

interface StructuredDataProps {
  type: 'organization' | 'product' | 'breadcrumb'
  data?: Product | { items: Array<{ name: string; url: string }> }
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Sugarbunny Stores',
          url: typeof window !== 'undefined' ? window.location.origin : '',
          logo: typeof window !== 'undefined' ? `${window.location.origin}/favicon.ico` : '',
          description: 'Premium virtual products and services. Your premier destination for virtual airlines, bots, and website development services.',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'support@sugarbunny.com',
            contactType: 'Customer Service',
            availableLanguage: 'English'
          },
          sameAs: [
            // Add your social media links here
          ]
        }

      case 'product':
        if (!data || !('id' in data)) return null
        const product = data as Product
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description || '',
          image: product.image_url || '',
          sku: `SB-${product.id}`,
          category: product.category || '',
          brand: {
            '@type': 'Brand',
            name: 'Sugarbunny Stores'
          },
          offers: {
            '@type': 'Offer',
            url: typeof window !== 'undefined' ? `${window.location.origin}/products/${product.id}` : '',
            priceCurrency: 'THB',
            price: product.price,
            availability: product.stock > 0 
              ? 'https://schema.org/InStock' 
              : 'https://schema.org/OutOfStock',
            priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          }
        }

      case 'breadcrumb':
        if (!data || !('items' in data)) return null
        const breadcrumbs = data.items as Array<{ name: string; url: string }>
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: typeof window !== 'undefined' 
              ? `${window.location.origin}${item.url}` 
              : item.url
          }))
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

