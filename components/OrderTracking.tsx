'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface OrderStatus {
  status: string
  timestamp: string
  description?: string
}

interface OrderTrackingProps {
  orderId: number
  status: string
  createdAt: string
  updatedAt?: string
}

export default function OrderTracking({ orderId, status, createdAt, updatedAt }: OrderTrackingProps) {
  const { t } = useLanguage()

  const getStatusSteps = (): OrderStatus[] => {
    const steps: OrderStatus[] = [
      {
        status: 'pending',
        timestamp: createdAt,
        description: t('order.pending')
      }
    ]

    if (status !== 'pending') {
      steps.push({
        status: 'processing',
        timestamp: updatedAt || createdAt,
        description: t('order.processing')
      })
    }

    if (status === 'paid' || status === 'completed' || status === 'shipped' || status === 'delivered') {
      steps.push({
        status: 'shipped',
        timestamp: updatedAt || createdAt,
        description: t('order.shipped')
      })
    }

    if (status === 'completed' || status === 'delivered') {
      steps.push({
        status: 'delivered',
        timestamp: updatedAt || createdAt,
        description: t('order.delivered')
      })
    }

    if (status === 'cancelled') {
      steps.push({
        status: 'cancelled',
        timestamp: updatedAt || createdAt,
        description: t('order.cancelled')
      })
    }

    return steps
  }

  const getStatusColor = (stepStatus: string) => {
    const currentStatusIndex = getStatusSteps().findIndex(step => step.status === status)
    const stepIndex = getStatusSteps().findIndex(step => step.status === stepStatus)
    
    if (status === 'cancelled' && stepStatus === 'cancelled') {
      return 'text-red-600 dark:text-red-400'
    }
    
    if (stepIndex <= currentStatusIndex) {
      return 'text-green-600 dark:text-green-400'
    }
    
    return 'text-gray-400 dark:text-gray-500'
  }

  const getStatusIcon = (stepStatus: string, index: number) => {
    const steps = getStatusSteps()
    const currentStatusIndex = steps.findIndex(step => step.status === status)
    
    if (status === 'cancelled' && stepStatus === 'cancelled') {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
    
    if (index <= currentStatusIndex) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
    
    return (
      <div className="w-6 h-6 rounded-full border-2 border-current" />
    )
  }

  const steps = getStatusSteps()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-display font-bold mb-6 text-gray-900 dark:text-gray-100">
        {t('order.timeline')}
      </h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={`flex-shrink-0 ${getStatusColor(step.status)}`}>
              {getStatusIcon(step.status, index)}
            </div>
            <div className="flex-1">
              <p className={`font-semibold ${getStatusColor(step.status)}`}>
                {step.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {new Date(step.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

