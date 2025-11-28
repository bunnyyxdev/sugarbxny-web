'use client'

import { useState } from 'react'
import { useToast } from '@/contexts/ToastContext'

interface StockNotificationProps {
  productId: number
  productName: string
}

export default function StockNotification({ productId, productName }: StockNotificationProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const { showToast } = useToast()

  const checkSubscription = () => {
    if (typeof window !== 'undefined') {
      const subscriptions = JSON.parse(localStorage.getItem('stockNotifications') || '[]')
      return subscriptions.some((sub: { productId: number }) => sub.productId === productId)
    }
    return false
  }

  useState(() => {
    setSubscribed(checkSubscription())
  })

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      showToast('Email Address is required', 'error')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showToast('Invalid email address', 'error')
      return
    }

    setLoading(true)

    try {
      // In a real app, you would send this to your API
      // For now, we'll store it in localStorage
      const subscriptions = JSON.parse(localStorage.getItem('stockNotifications') || '[]')
      
      // Check if already subscribed
      if (subscriptions.some((sub: { productId: number; email: string }) => 
        sub.productId === productId && sub.email === email)) {
        showToast('You are already subscribed to notifications for this product', 'info')
        setSubscribed(true)
        return
      }

      subscriptions.push({
        productId,
        productName,
        email,
        subscribedAt: new Date().toISOString()
      })

      localStorage.setItem('stockNotifications', JSON.stringify(subscriptions))
      showToast('You will be notified when this product is back in stock', 'success')
      setSubscribed(true)
      setEmail('')
    } catch (error) {
      showToast('Failed to subscribe. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (subscribed) {
    return (
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-green-800 dark:text-green-300">
            You are already subscribed to notifications for this product
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Notify Me When Available
      </h3>
      <form onSubmit={handleSubscribe} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:from-pink-600 hover:to-blue-600 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '...' : 'Subscribe'}
        </button>
      </form>
    </div>
  )
}

