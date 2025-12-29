'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, ExternalLink } from 'lucide-react'

export default function ActiveCampaigns() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const campaigns = [
    {
      name: 'Kerala Flood Relief 2024',
      location: 'Kerala, India',
      description: 'Emergency aid for flood-affected families in coastal regions',
      fundsUsed: 45000,
      fundsAvailable: 75000,
      status: 'Active',
    },
    {
      name: 'Cyclone Michaung Response',
      location: 'Tamil Nadu, India',
      description: 'Essential supplies for communities impacted by severe cyclonic storm',
      fundsUsed: 32000,
      fundsAvailable: 50000,
      status: 'Active',
    },
    {
      name: 'Uttarakhand Landslide Relief',
      location: 'Uttarakhand, India',
      description: 'Supporting families displaced by recent landslides in hilly regions',
      fundsUsed: 18000,
      fundsAvailable: 30000,
      status: 'Active',
    },
    {
      name: 'Assam Flood Recovery',
      location: 'Assam, India',
      description: 'Long-term recovery assistance for flood-affected communities',
      fundsUsed: 28000,
      fundsAvailable: 40000,
      status: 'Active',
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-dark">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Active <span className="text-accent">Disaster Campaigns</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-time relief operations with full transparency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign, index) => {
            const progress = (campaign.fundsUsed / campaign.fundsAvailable) * 100

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-dark-lighter/30 border border-dark-lighter/50 rounded-xl p-6 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                        {campaign.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{campaign.location}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-accent/20 border border-accent/30 text-accent text-xs font-semibold rounded-full">
                      {campaign.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-6 flex-1">
                    {campaign.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>
                        ₹{campaign.fundsUsed.toLocaleString()} used
                      </span>
                      <span>
                        ₹{campaign.fundsAvailable.toLocaleString()} available
                      </span>
                    </div>
                    <div className="w-full h-2 bg-dark rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${progress}%` } : {}}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-dark border border-dark-lighter/50 hover:border-accent/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 group/btn">
                    <span className="font-medium">View Campaign</span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

