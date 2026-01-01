'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, AlertCircle, Clock, TrendingUp, Eye, Heart, Utensils, Pill, Car, Home, BadgeCheck } from 'lucide-react'

export default function ActiveCampaigns() {
  const campaigns = [
    {
      id: 'kerala',
      name: 'Kerala Flood Relief 2024',
      location: 'Kerala, India',
      description: 'Emergency aid for flood-affected families in coastal regions',
      urgency: 'High',
      urgencyColor: 'text-red-400',
      urgencyBg: 'bg-red-400/10',
      urgencyBorder: 'border-red-400/30',
      fundsAllocated: 45000,
      target: 75000,
      categories: ['Food', 'Medicine', 'Transport', 'Shelter'],
    },
    {
      id: 'cyclone',
      name: 'Cyclone Michaung Response',
      location: 'Tamil Nadu, India',
      description: 'Essential supplies for communities impacted by severe cyclonic storm',
      urgency: 'High',
      urgencyColor: 'text-red-400',
      urgencyBg: 'bg-red-400/10',
      urgencyBorder: 'border-red-400/30',
      fundsAllocated: 32000,
      target: 50000,
      categories: ['Food', 'Medicine', 'Shelter'],
    },
    {
      id: 'uttarakhand',
      name: 'Uttarakhand Landslide Relief',
      location: 'Uttarakhand, India',
      description: 'Supporting families displaced by recent landslides in hilly regions',
      urgency: 'Medium',
      urgencyColor: 'text-yellow-400',
      urgencyBg: 'bg-yellow-400/10',
      urgencyBorder: 'border-yellow-400/30',
      fundsAllocated: 18000,
      target: 30000,
      categories: ['Food', 'Transport', 'Shelter'],
    },
    {
      id: 'assam',
      name: 'Assam Flood Recovery',
      location: 'Assam, India',
      description: 'Long-term recovery assistance for flood-affected communities',
      urgency: 'Ongoing',
      urgencyColor: 'text-blue-400',
      urgencyBg: 'bg-blue-400/10',
      urgencyBorder: 'border-blue-400/30',
      fundsAllocated: 28000,
      target: 40000,
      categories: ['Food', 'Medicine', 'Transport'],
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food':
        return Utensils
      case 'Medicine':
        return Pill
      case 'Transport':
        return Car
      case 'Shelter':
        return Home
      default:
        return Heart
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return AlertCircle
      case 'Medium':
        return Clock
      default:
        return TrendingUp
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass rounded-2xl p-8 border border-dark-lighter/50 relative overflow-hidden mb-8"
    >
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Active Relief Campaigns
          </h2>
          <p className="text-gray-400 text-sm">Compare campaigns and choose where to donate</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign, index) => {
            const progress = (campaign.fundsAllocated / campaign.target) * 100
            const UrgencyIcon = getUrgencyIcon(campaign.urgency)

            return (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative p-6 rounded-xl border-2 border-dark-lighter/50 bg-gradient-to-br from-dark-lighter/20 to-dark-lighter/10 hover:border-accent/30 hover:bg-dark-lighter/30 transition-all duration-300 overflow-hidden"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                        {campaign.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{campaign.location}</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${campaign.urgencyBorder} ${campaign.urgencyBg}`}>
                      <UrgencyIcon className={`w-4 h-4 ${campaign.urgencyColor}`} />
                      <span className={`text-xs font-semibold ${campaign.urgencyColor}`}>
                        {campaign.urgency}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4">{campaign.description}</p>

                  {/* Funding Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400">Funds allocated vs target</span>
                      <span className="text-sm font-semibold text-accent">
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-dark-lighter/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full relative"
                      >
                        <motion.div
                          animate={{ x: ['0%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: index * 0.1 + 1.3 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                      </motion.div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹{campaign.fundsAllocated.toLocaleString()}</span>
                      <span>₹{campaign.target.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {campaign.categories.map((category, catIndex) => {
                        const CategoryIcon = getCategoryIcon(category)
                        return (
                          <div
                            key={catIndex}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20"
                          >
                            <CategoryIcon className="w-3.5 h-3.5 text-accent" />
                            <span className="text-xs font-medium text-accent">{category}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-dark-lighter/30 hover:bg-dark-lighter/40 border border-dark-lighter/50 hover:border-accent/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm font-semibold"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </motion.button>
                    {/* View Public Audit */}
                    <Link
                      href={`/transparency?campaign=${(() => {
                        const map: Record<string, string> = {
                          kerala: 'kerala-2024',
                          cyclone: 'cyclone-michaung',
                          assam: 'assam-flood-2025',
                          uttarakhand: 'assam-flood-2025',
                        }
                        return map[campaign.id] || 'assam-flood-2025'
                      })()}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-dark-lighter/30 hover:bg-dark-lighter/40 border border-dark-lighter/50 hover:border-accent/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm font-semibold"
                    >
                      <BadgeCheck className="w-4 h-4" />
                      <span>View Public Audit</span>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        // Store campaign ID in sessionStorage for pre-selection
                        sessionStorage.setItem('selectedCampaignId', campaign.id)
                        sessionStorage.setItem('selectedCampaignName', campaign.name)
                        
                        // Smooth scroll to donate section
                        const donateSection = document.getElementById('donate-section')
                        if (donateSection) {
                          donateSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white rounded-lg transition-all duration-300 text-sm font-semibold shadow-lg shadow-accent/20"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Donate</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

