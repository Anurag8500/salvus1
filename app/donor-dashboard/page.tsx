'use client'

import { motion } from 'framer-motion'
import DonorOverview from '@/components/dashboard/DonorOverview'
import ActiveCampaigns from '@/components/dashboard/ActiveCampaigns'
import DonateSection from '@/components/dashboard/DonateSection'
import DonationHistory from '@/components/dashboard/DonationHistory'
import ImpactBreakdown from '@/components/dashboard/ImpactBreakdown'

export default function DonorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-darker via-dark-darker to-dark">
      <div className="container mx-auto px-6 lg:px-12 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Donor Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Enable easy donations with full trust and visibility</p>
        </motion.div>

        {/* Donor Overview Panel */}
        <DonorOverview />

        {/* Active Relief Campaigns */}
        <ActiveCampaigns />

        {/* Donate to a Campaign - Full Width */}
        <div className="mt-8" id="donate-section">
          <DonateSection />
        </div>

        {/* Impact Breakdown - Below Donate Section */}
        <div className="mt-8">
          <ImpactBreakdown />
        </div>

        {/* Donation History */}
        <DonationHistory />
      </div>
    </div>
  )
}

