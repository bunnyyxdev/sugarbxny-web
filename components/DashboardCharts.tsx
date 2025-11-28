'use client'

import { useTheme } from '@/contexts/ThemeContext'

interface ChartData {
  date: string
  value: number
  label: string
}

interface DashboardChartsProps {
  revenueData: ChartData[]
  ordersData: ChartData[]
  productsData: ChartData[]
}

function SimpleBarChart({ data, title, color = 'pink' }: { data: ChartData[], title: string, color?: 'pink' | 'blue' | 'green' | 'yellow' }) {
  const { theme } = useTheme()
  const maxValue = Math.max(...data.map(d => d.value), 1)
  const colorClasses = {
    pink: theme === 'dark' ? 'from-pink-500 to-pink-600' : 'from-pink-400 to-pink-500',
    blue: theme === 'dark' ? 'from-blue-500 to-blue-600' : 'from-blue-400 to-blue-500',
    green: theme === 'dark' ? 'from-green-500 to-green-600' : 'from-green-400 to-green-500',
    yellow: theme === 'dark' ? 'from-yellow-500 to-yellow-600' : 'from-yellow-400 to-yellow-500',
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{title}</h3>
      <div className="flex items-end justify-between gap-2 h-48">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full h-full flex items-end">
                <div
                  className={`w-full bg-gradient-to-t ${colorClasses[color]} rounded-t transition-all duration-500 hover:opacity-80`}
                  style={{ height: `${height}%`, minHeight: item.value > 0 ? '4px' : '0' }}
                  title={`${item.label}: ${item.value.toLocaleString()}`}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-center truncate w-full">
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SimpleLineChart({ data, title, color = 'pink' }: { data: ChartData[], title: string, color?: 'pink' | 'blue' | 'green' }) {
  const { theme } = useTheme()
  const maxValue = Math.max(...data.map(d => d.value), 1)
  const width = 100 / data.length
  const colorValue = theme === 'dark' 
    ? (color === 'pink' ? '#ec4899' : color === 'blue' ? '#3b82f6' : '#10b981')
    : (color === 'pink' ? '#f472b6' : color === 'blue' ? '#60a5fa' : '#34d399')

  const points = data.map((item, index) => {
    const x = (index * width) + (width / 2)
    const y = 100 - (item.value / maxValue) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{title}</h3>
      <div className="h-48 relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={colorValue}
            strokeWidth="2"
            points={points}
            className="transition-all duration-500"
          />
          {data.map((item, index) => {
            const x = (index * width) + (width / 2)
            const y = 100 - (item.value / maxValue) * 100
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill={colorValue}
                className="transition-all duration-500"
              />
            )
          })}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 dark:text-gray-400">
          {data.map((item, index) => (
            <span key={index} className="truncate" style={{ width: `${width}%` }}>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function PieChart({ data, title }: { data: { label: string; value: number; color: string }[], title: string }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    currentAngle += angle

    const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180)
    const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180)
    const x2 = 50 + 40 * Math.cos((startAngle + angle - 90) * Math.PI / 180)
    const y2 = 50 + 40 * Math.sin((startAngle + angle - 90) * Math.PI / 180)
    const largeArc = angle > 180 ? 1 : 0

    return {
      path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: item.color,
      label: item.label,
      value: item.value,
      percentage: percentage.toFixed(1)
    }
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{title}</h3>
      <div className="flex items-center justify-center gap-8">
        <div className="flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-48 h-48">
            {segments.map((segment, index) => (
              <g key={index}>
                <path
                  d={segment.path}
                  fill={segment.color}
                  className="transition-all duration-300 hover:opacity-80"
                />
              </g>
            ))}
          </svg>
        </div>
        <div className="flex-1 space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {segment.label}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {segment.percentage}%
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {segment.value.toLocaleString()} items
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DashboardCharts({ revenueData, ordersData, productsData }: DashboardChartsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleBarChart data={revenueData} title="Revenue (Last 7 Days)" color="pink" />
        <SimpleLineChart data={ordersData} title="Orders (Last 7 Days)" color="blue" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleBarChart data={productsData} title="Products Sold (Last 7 Days)" color="green" />
        <PieChart
          title="Order Status Distribution"
          data={[
            { label: 'Completed', value: ordersData.reduce((sum, d) => sum + (d.value > 0 ? 1 : 0), 0), color: '#10b981' },
            { label: 'Pending', value: ordersData.length - ordersData.reduce((sum, d) => sum + (d.value > 0 ? 1 : 0), 0), color: '#f59e0b' },
          ]}
        />
      </div>
    </div>
  )
}

