'use client'

interface LoadingSkeletonProps {
  type?: 'product-grid' | 'product-card' | 'table' | 'text'
  count?: number
}

export default function LoadingSkeleton({ type = 'product-grid', count = 6 }: LoadingSkeletonProps) {
  if (type === 'product-grid') {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse"
          >
            <div className="h-48 bg-gradient-to-br from-pink-200 to-blue-200 dark:from-pink-900 dark:to-blue-900" />
            <div className="p-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-4" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4" />
              <div className="flex items-center justify-between">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'product-card') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="h-64 bg-gradient-to-br from-pink-200 to-blue-200 dark:from-pink-900 dark:to-blue-900" />
        <div className="p-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-4" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-6" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        </div>
      </div>
    )
  }

  if (type === 'table') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-pink-500 to-blue-500">
              <tr>
                {Array.from({ length: 7 }).map((_, i) => (
                  <th key={i} className="px-6 py-4">
                    <div className="h-4 bg-white/30 rounded w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {Array.from({ length: count }).map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse">
                  {Array.from({ length: 7 }).map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Text skeleton
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${
            i === count - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  )
}

