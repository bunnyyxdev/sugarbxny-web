'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  price: number
  image_url?: string
  category?: string
  stock: number
}

interface RelatedProductsProps {
  currentProductId: number
  currentCategory?: string
  limit?: number
}

export default function RelatedProducts({ 
  currentProductId, 
  currentCategory,
  limit = 4 
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRelatedProducts()
  }, [currentProductId, currentCategory])

  const fetchRelatedProducts = async () => {
    try {
      setLoading(true)
      const url = currentCategory 
        ? `/api/products/category?category=${encodeURIComponent(currentCategory)}`
        : '/api/products'
      
      const response = await fetch(url, { cache: 'no-store' })
      if (!response.ok) return

      const data = await response.json()
      const allProducts = data.products || []
      
      // Filter out current product and get related products
      const related = allProducts
        .filter((p: Product) => p.id !== currentProductId && p.stock > 0)
        .slice(0, limit)
      
      setProducts(related)
    } catch (error) {
      console.error('Error fetching related products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-display font-bold mb-6 text-gray-800 dark:text-gray-200">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-display font-bold mb-6 text-gray-800 dark:text-gray-200">
        Related Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group"
          >
            <div className="relative h-32 bg-gradient-to-br from-pink-200 to-blue-200 dark:from-pink-900 dark:to-blue-900">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">
                {product.name}
              </h3>
              <p className="text-xs font-bold text-pink-600 dark:text-pink-400">
                ฿{((Number(product.price) || 0) * 1.07).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

