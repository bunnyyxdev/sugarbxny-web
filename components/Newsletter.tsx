'use client'

import { useState } from 'react'
import { useToast } from '@/contexts/ToastContext'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      showToast('Please enter your email address', 'error')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address', 'error')
      return
    }

    setLoading(true)
    
    try {
      // In a real app, you would send this to your API
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      showToast('Thank you for subscribing!', 'success')
      setEmail('')
    } catch (error) {
      showToast('Failed to subscribe. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-r from-pink-500 to-blue-500 dark:from-pink-700 dark:to-blue-700 rounded-xl shadow-lg p-8 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
          Stay Updated
        </h3>
        <p className="text-white/90 mb-6">
          Subscribe to our newsletter and get the latest updates on new products, special offers, and exclusive deals!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-white text-pink-600 rounded-lg hover:bg-gray-100 transition-all font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        <p className="text-xs text-white/80 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  )
}

