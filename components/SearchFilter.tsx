'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

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

interface SearchFilterProps {
  products: Product[]
  onFilteredProductsChange: (filtered: Product[]) => void
}

export default function SearchFilter({ products, onFilteredProductsChange }: SearchFilterProps) {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc' | 'newest'>('newest')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))]

  // Get min and max prices
  const prices = products.map(p => Number(p.price) || 0)
  const minPrice = Math.min(...prices, 0)
  const maxPrice = Math.max(...prices, 100000)

  useEffect(() => {
    // Update price range when products change
    if (prices.length > 0) {
      setPriceRange([minPrice, maxPrice])
    }
  }, [products])

  useEffect(() => {
    // Filter and sort products
    let filtered = [...products]

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term)
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = Number(product.price) || 0
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-asc':
          return (Number(a.price) || 0) - (Number(b.price) || 0)
        case 'price-desc':
          return (Number(b.price) || 0) - (Number(a.price) || 0)
        case 'newest':
        default:
          const aDate = a.created_at ? new Date(a.created_at).getTime() : 0
          const bDate = b.created_at ? new Date(b.created_at).getTime() : 0
          return bDate - aDate
      }
    })

    onFilteredProductsChange(filtered)
  }, [searchTerm, selectedCategory, sortBy, priceRange, products, onFilteredProductsChange])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('search.searchProducts')}
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('common.category')}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? t('common.allCategories') : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('common.sortBy')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="newest">{t('common.newest')}</option>
            <option value="name">{t('common.nameAZ')}</option>
            <option value="price-asc">{t('common.priceLowToHigh')}</option>
            <option value="price-desc">{t('common.priceHighToLow')}</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="lg:col-span-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('search.priceRange')}: ฿{priceRange[0].toLocaleString()} - ฿{priceRange[1].toLocaleString()}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{t('search.minPrice')}</label>
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{t('search.maxPrice')}</label>
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(searchTerm || selectedCategory !== 'all' || priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setPriceRange([minPrice, maxPrice])
              setSortBy('newest')
            }}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
          >
            {t('search.clearAllFilters')}
          </button>
        </div>
      )}
    </div>
  )
}

