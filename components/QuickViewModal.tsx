'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'

interface Product {
  id: number
  name: string
  description?: string
  price: number
  category?: string
  image_url?: string
  stock: number
  is_active: boolean
  created_at?: string
}

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
  onLoginRequired: () => void
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  isAuthenticated,
  onLoginRequired
}: QuickViewModalProps) {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) {
    return null
  }

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      showToast('This product is out of stock and cannot be purchased.', 'error')
      return
    }

    if (!isAuthenticated) {
      onLoginRequired()
      onClose()
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      image_url: product.image_url,
      category: product.category
    })
    showToast('Product added to cart!', 'success')
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Image */}
            <div className="relative h-64 md:h-96 bg-gradient-to-br from-pink-200 to-blue-200 dark:from-pink-900 dark:to-blue-900 rounded-lg overflow-hidden">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.stock > 0
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                  }`}
                >
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="px-3 py-1 rounded-full text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300">
                  {product.category || 'Uncategorized'}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {product.name}
              </h2>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-pink-600 dark:text-pink-400">
                    ฿{((Number(product.price) || 0) * 1.07).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    (incl. VAT)
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Base price: ฿{(Number(product.price) || 0).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description || 'No description available for this product.'}
                </p>
              </div>

              <div className="mt-auto space-y-3">
                {product.stock > 0 ? (
                  <button
                    onClick={handleAddToCart}
                    className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:from-pink-600 hover:to-blue-600 transition-all font-semibold shadow-lg"
                  >
                    {isAuthenticated ? 'Add to Cart' : 'Login to Buy'}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed font-semibold"
                  >
                    Out of Stock
                  </button>
                )}

                <Link
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="block w-full px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-pink-300 dark:border-pink-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-500 transition-all font-semibold text-center"
                >
                  View Full Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

