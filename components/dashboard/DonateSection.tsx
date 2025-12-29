'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, X, CheckCircle, MapPin, Users, TrendingUp } from 'lucide-react'

export default function DonateSection() {
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('UPI')
  const [showModal, setShowModal] = useState(false)
  const [donationDetails, setDonationDetails] = useState<any>(null)

  // Pre-select campaign if coming from Active Campaigns section
  useEffect(() => {
    const campaignId = sessionStorage.getItem('selectedCampaignId')
    if (campaignId) {
      setSelectedCampaign(campaignId)
      sessionStorage.removeItem('selectedCampaignId')
      sessionStorage.removeItem('selectedCampaignName')
    }
  }, [])

  const campaigns = [
    {
      id: 'kerala',
      name: 'Kerala Flood Relief 2024',
      location: 'Kerala, India',
      progress: 60,
      beneficiaries: 2450,
    },
    {
      id: 'cyclone',
      name: 'Cyclone Michaung Response',
      location: 'Tamil Nadu, India',
      progress: 64,
      beneficiaries: 1800,
    },
    {
      id: 'uttarakhand',
      name: 'Uttarakhand Landslide Relief',
      location: 'Uttarakhand, India',
      progress: 60,
      beneficiaries: 1200,
    },
    {
      id: 'assam',
      name: 'Assam Flood Recovery',
      location: 'Assam, India',
      progress: 70,
      beneficiaries: 2100,
    },
  ]

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCampaign || !amount) return

    const campaign = campaigns.find((c) => c.id === selectedCampaign)
    const refId = `SALVUS-${Date.now().toString().slice(-8)}`
    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'medium',
    })

    setDonationDetails({
      amount,
      campaign: campaign?.name || selectedCampaign,
      timestamp,
      referenceId: refId,
      paymentMethod,
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedCampaign('')
    setAmount('')
    setPaymentMethod('UPI')
    setDonationDetails(null)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass rounded-2xl p-8 border border-dark-lighter/50 relative overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="relative">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Donate to a Campaign
            </h2>
            <p className="text-gray-400">Choose a campaign and make a difference</p>
          </div>

          <form onSubmit={handleDonate} className="space-y-6">
            {/* Campaign Selector - Modern Card Grid */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                Select Campaign
              </label>
              <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {campaigns.map((campaign, index) => (
                  <motion.button
                    key={campaign.id}
                    type="button"
                    onClick={() => setSelectedCampaign(campaign.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
                      selectedCampaign === campaign.id
                        ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20'
                        : 'border-dark-lighter/50 bg-dark-lighter/20 hover:border-accent/50 hover:bg-dark-lighter/30'
                    }`}
                  >
                    {selectedCampaign === campaign.id && (
                      <motion.div
                        layoutId="selectedCampaign"
                        className="absolute inset-0 border-2 border-accent rounded-xl"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-bold text-base ${
                          selectedCampaign === campaign.id ? 'text-accent' : 'text-white'
                        }`}>
                          {campaign.name}
                        </h3>
                        {selectedCampaign === campaign.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 rounded-full bg-accent flex items-center justify-center"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{campaign.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{campaign.beneficiaries.toLocaleString()} people</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-accent font-semibold">{campaign.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-dark-lighter/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${campaign.progress}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Amount Input - Enhanced */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-accent">
                  ₹
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="1"
                  className="w-full pl-12 pr-4 py-4 bg-dark-lighter/30 border-2 border-dark-lighter/50 rounded-xl text-white text-lg font-semibold placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            {/* Payment Method - Enhanced */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === 'UPI'
                      ? 'bg-gradient-to-br from-accent/20 to-accent/10 border-accent text-accent shadow-lg shadow-accent/20'
                      : 'bg-dark-lighter/30 border-dark-lighter/50 text-gray-300 hover:border-accent/50 hover:bg-dark-lighter/40'
                  }`}
                >
                  <span className="font-bold text-lg">UPI</span>
                  {paymentMethod === 'UPI' && (
                    <motion.div
                      layoutId="paymentMethod"
                      className="absolute inset-0 border-2 border-accent rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === 'Card'
                      ? 'bg-gradient-to-br from-accent/20 to-accent/10 border-accent text-accent shadow-lg shadow-accent/20'
                      : 'bg-dark-lighter/30 border-dark-lighter/50 text-gray-300 hover:border-accent/50 hover:bg-dark-lighter/40'
                  }`}
                >
                  <span className="font-bold text-lg">Card</span>
                  {paymentMethod === 'Card' && (
                    <motion.div
                      layoutId="paymentMethod"
                      className="absolute inset-0 border-2 border-accent rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Donate Now Button - Enhanced */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!selectedCampaign || !amount}
              className="w-full py-4 bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-accent/30 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-lg">Donate Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Enhanced Confirmation Modal */}
      <AnimatePresence>
        {showModal && donationDetails && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="glass rounded-2xl p-8 border border-dark-lighter/50 max-w-md w-full relative overflow-hidden"
            >
              {/* Background effect */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10"></div>
              
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6 relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
                  className="flex justify-center mb-4"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full flex items-center justify-center border-2 border-accent/50">
                    <CheckCircle className="w-12 h-12 text-accent" />
                  </div>
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Donation Successful!
                </h3>
                <p className="text-gray-400">Your contribution is making a difference</p>
              </div>

              <div className="space-y-3 bg-gradient-to-br from-dark-lighter/40 to-dark-lighter/20 rounded-xl p-5 mb-6 border border-dark-lighter/30 relative z-10">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-white font-bold text-lg">₹{donationDetails.amount}</span>
                </div>
                <div className="h-px bg-dark-lighter/50"></div>
                <div className="flex justify-between items-start py-2">
                  <span className="text-gray-400">Campaign</span>
                  <span className="text-white font-semibold text-right max-w-[60%]">{donationDetails.campaign}</span>
                </div>
                <div className="h-px bg-dark-lighter/50"></div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Payment Method</span>
                  <span className="text-white font-semibold">{donationDetails.paymentMethod}</span>
                </div>
                <div className="h-px bg-dark-lighter/50"></div>
                <div className="flex justify-between items-start py-2">
                  <span className="text-gray-400">Timestamp</span>
                  <span className="text-white font-semibold text-sm text-right max-w-[60%]">{donationDetails.timestamp}</span>
                </div>
                <div className="h-px bg-dark-lighter/50"></div>
                <div className="flex justify-between items-center py-2 pt-3 bg-accent/5 rounded-lg px-3 -mx-1">
                  <span className="text-gray-300 font-semibold">Reference ID</span>
                  <span className="text-accent font-mono font-bold text-sm">{donationDetails.referenceId}</span>
                </div>
              </div>

              <motion.button
                onClick={handleCloseModal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 relative z-10"
              >
                Close
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
