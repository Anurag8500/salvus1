'use client'

import { motion } from 'framer-motion'
import { DollarSign, Heart, TrendingUp, Calendar, Sparkles } from 'lucide-react'

export default function DonorOverview() {
  const stats = [
    {
      icon: DollarSign,
      label: 'Total Donated',
      value: '₹8,500',
      color: 'text-accent',
      bgGradient: 'from-accent/20 to-accent/5',
      borderColor: 'border-accent/30',
      glow: 'shadow-accent/20',
    },
    {
      icon: Heart,
      label: 'Campaigns Supported',
      value: '12',
      color: 'text-accent-light',
      bgGradient: 'from-accent-light/20 to-accent-light/5',
      borderColor: 'border-accent-light/30',
      glow: 'shadow-accent-light/20',
    },
    {
      icon: TrendingUp,
      label: 'Funds Utilized',
      value: '₹6,500',
      color: 'text-accent',
      bgGradient: 'from-accent/20 to-accent/5',
      borderColor: 'border-accent/30',
      glow: 'shadow-accent/20',
    },
    {
      icon: Calendar,
      label: 'Last Donation Date',
      value: 'Dec 15, 2024',
      color: 'text-accent-light',
      bgGradient: 'from-accent-light/20 to-accent-light/5',
      borderColor: 'border-accent-light/30',
      glow: 'shadow-accent-light/20',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', bounce: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`relative glass rounded-2xl p-6 border-2 ${stat.borderColor} bg-gradient-to-br ${stat.bgGradient} hover:border-accent/50 transition-all duration-300 overflow-hidden group ${stat.glow} shadow-lg`}
          >
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            {/* Sparkle effect */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className={`w-4 h-4 ${stat.color} animate-pulse`} />
            </div>

            <div className="relative z-10">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.bgGradient} border-2 ${stat.borderColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
              >
                {stat.value}
              </motion.div>
              
              <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
