'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { DollarSign, ShoppingCart, Activity, Users } from 'lucide-react'

interface CounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  isInView: boolean
}

function Counter({ value, suffix = '', prefix = '', duration = 2, isInView }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const endValue = value

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(Math.floor(easeOutQuart * endValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(endValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function ImpactMetrics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const metrics = [
    {
      icon: DollarSign,
      value: 8500,
      prefix: '₹',
      suffix: '',
      label: 'Total Funds Collected',
      color: 'text-accent',
    },
    {
      icon: ShoppingCart,
      value: 6500,
      prefix: '₹',
      suffix: '',
      label: 'Funds Spent on Essentials',
      color: 'text-accent-light',
    },
    {
      icon: Activity,
      value: 12,
      prefix: '',
      suffix: '',
      label: 'Active Relief Campaigns',
      color: 'text-accent',
    },
    {
      icon: Users,
      value: 2450,
      prefix: '',
      suffix: '',
      label: 'Beneficiaries Supported',
      color: 'text-accent-light',
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-dark border-y border-dark-lighter/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-xl bg-dark-lighter/30 border border-accent/20 ${metric.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {metric.prefix}
                  {isInView ? (
                    <Counter
                      value={metric.value}
                      suffix={metric.suffix}
                      prefix=""
                      isInView={isInView}
                    />
                  ) : (
                    <span>0</span>
                  )}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">
                  {metric.label}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-7 py-3 glass neon border-2 border-accent-neon shadow-neon rounded-full animate-pulse-slow backdrop-blur-md">
            <span className="text-accent-neon text-lg font-bold drop-shadow-neon animate-glow">✔</span>
            <span className="text-gray-100 font-semibold tracking-wide uppercase text-shadow-lg">Fully Auditable System</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

