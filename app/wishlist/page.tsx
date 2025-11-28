'use client'

import { useWishlist } from '@/contexts/WishlistContext'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify')
      const data = await response.json()
      setIsAuthenticated(data.authenticated || false)
    } catch (error) {
      setIsAuthenticated(false)
    }
  }

  const handleAddToCart = (product: typeof items[0]) => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/wishlist`)
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      category: product.category
    })
    showToast('Product added to cart!', 'success')
  }

  const handleRemove = (id: number) => {
    removeFromWishlist(id)
    showToast('Removed from wishlist', 'info')
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all items from your wishlist?')) {
      clearWishlist()
      showToast('Wishlist cleared', 'info')
    }
  }

  return (
    <div className="py-12 bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 max-w-2xl mx-auto">
              <div className="mb-6">
                <svg className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Your Wishlist is Empty
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Start adding products you love to your wishlist!
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:from-pink-600 hover:to-blue-600 transition-all font-semibold shadow-lg"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-48 bg-gradient-to-br from-pink-200 to-blue-200 dark:from-pink-900 dark:to-blue-900">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleRemove(product.id)
                      }}
                      className="absolute top-4 right-4 p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </Link>
                <div className="p-6">
                  {product.category && (
                    <div className="mb-2">
                      <span className="px-3 py-1 rounded-full text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300">
                        {product.category}
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                        ฿{((Number(product.price) || 0) * 1.07).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        (incl. VAT)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:from-pink-600 hover:to-blue-600 transition-all font-medium text-sm"
                    >
                      Add to Cart
                    </button>
                    <Link
                      href={`/products/${product.id}`}
                      className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-pink-300 dark:border-pink-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-500 transition-all font-medium text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

