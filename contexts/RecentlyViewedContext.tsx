'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Product {
  id: number
  name: string
  price: number
  image_url?: string
  category?: string
}

interface RecentlyViewedContextType {
  items: Product[]
  addToRecentlyViewed: (product: Product) => void
  clearRecentlyViewed: () => void
  getItems: (limit?: number) => Product[]
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined)

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const MAX_ITEMS = 20 // Maximum number of items to keep

  // Load recently viewed from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentlyViewed')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setItems(parsed)
        } catch (e) {
          console.error('Error loading recently viewed:', e)
          setItems([])
        }
      }
    }
  }, [])

  // Save recently viewed to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('recentlyViewed', JSON.stringify(items))
    }
  }, [items])

  const addToRecentlyViewed = (product: Product) => {
    setItems((prevItems) => {
      // Remove if already exists
      const filtered = prevItems.filter((item) => item.id !== product.id)
      // Add to beginning
      const newItems = [product, ...filtered]
      // Keep only MAX_ITEMS
      return newItems.slice(0, MAX_ITEMS)
    })
  }

  const clearRecentlyViewed = () => {
    setItems([])
  }

  const getItems = (limit?: number) => {
    if (limit) {
      return items.slice(0, limit)
    }
    return items
  }

  return (
    <RecentlyViewedContext.Provider
      value={{
        items,
        addToRecentlyViewed,
        clearRecentlyViewed,
        getItems,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider')
  }
  return context
}

