'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, MapPin, Calendar, CheckCircle, Loader2, Store, CreditCard, History, Info, HeartPulse, BusFront, Home, Soup } from 'lucide-react'
import { useState } from 'react'

export default function BeneficiaryDashboard() {
  const [category, setCategory] = useState('Food')
  const [store, setStore] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [storeOpen, setStoreOpen] = useState(false)

  const categories = ['Food', 'Medicine', 'Transport', 'Shelter']
  const stores = ['Assam Relief Store #1', 'Northeast Pharma Verified', 'Assam Transit Hub', 'Safe Shelter Assam']

  const balances = [
    { label: 'Food', icon: Soup, remaining: 3500, limit: 5000 },
    { label: 'Medicine', icon: HeartPulse, remaining: 2200, limit: 4000 },
    { label: 'Transport', icon: BusFront, remaining: 1200, limit: 3000 },
    { label: 'Shelter', icon: Home, remaining: 8000, limit: 10000 },
  ]

  const history = [
    { store: 'Assam Relief Store #1', category: 'Food', amount: 650, date: '12 Jun 2025', status: 'Paid' },
    { store: 'Northeast Pharma Verified', category: 'Medicine', amount: 1200, date: '11 Jun 2025', status: 'Paid' },
    { store: 'Assam Transit Hub', category: 'Transport', amount: 300, date: '10 Jun 2025', status: 'Paid' },
  ]

  const progressPercent = (remaining: number, limit: number) => Math.min(100, Math.round((remaining / limit) * 100))
  const categoryIconMap: Record<string, any> = { Food: Soup, Medicine: HeartPulse, Transport: BusFront, Shelter: Home }
  const totalRemaining = balances.reduce((sum, b) => sum + b.remaining, 0)
  const totalLimit = balances.reduce((sum, b) => sum + b.limit, 0)
  const totalPercentRemaining = Math.min(100, Math.round((totalRemaining / totalLimit) * 100))

  const submitPurchase = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setTimeout(() => {
      setLoading(false)
      setMessage('Purchase confirmed. You do not need to pay. Salvus pays the store directly.')
      setAmount('')
      setStore('')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-darker via-dark-darker to-dark">
      <div className="container mx-auto px-6 lg:px-12 py-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 relative"
        >
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Beneficiary Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Your approved relief, safely and respectfully</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass neon rounded-2xl p-8 border-2 border-accent-neon shadow-neon mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-accent-light/10 rounded-full blur-3xl"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-semibold">Status: Approved</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50">
                <BadgeCheck className="w-4 h-4 text-accent" />
                <span className="text-sm text-gray-200">Relief Campaign: <span className="font-semibold text-white">Assam Flood Relief 2025</span></span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm text-gray-200">Location: <span className="font-semibold text-white">Assam</span></span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50">
                <Store className="w-4 h-4 text-accent" />
                <span className="text-sm text-gray-200">Approved by: <span className="font-semibold text-white">Helping Hands NGO</span></span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-sm text-gray-200">Approval date: <span className="font-semibold text-white">12 June 2025</span></span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50">
                <History className="w-4 h-4 text-accent" />
                <span className="text-sm text-gray-200">Campaign status: <span className="font-semibold text-white">Active</span></span>
              </div>
            </div>
            <div className="flex lg:justify-end">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                <span className="text-sm">🟢 Active Campaign</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-xl p-6 border border-dark-lighter/50 mb-8"
        >
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="text-sm text-gray-300">Your Available Support</div>
              <div className="text-3xl font-extrabold text-white mb-1 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                ₹{totalRemaining.toLocaleString()} Remaining
              </div>
              <div className="text-xs text-gray-400">Across all essential categories</div>
            </div>
            <div className="text-base text-gray-300 font-bold">
              Total approved limit: ₹{totalLimit.toLocaleString()}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-start text-xs text-gray-400 mb-1">
              <span>{totalPercentRemaining}% remaining</span>
            </div>
            <div className="h-2 bg-dark-lighter/40 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${totalPercentRemaining}%` }}
                transition={{ duration: 0.8 }}
                className="h-2 bg-gradient-to-r from-accent via-teal-400 to-accent rounded-full"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {balances.map(({ label, icon: Icon, remaining, limit }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative overflow-hidden glass rounded-xl p-5 border border-dark-lighter/50 shadow-lg"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent/20 to-accent-light/10 border border-accent/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-white font-semibold text-sm">{label}</span>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-2xl font-extrabold text-white">
                  ₹{remaining.toLocaleString()} <span className="text-base font-semibold text-gray-300">Remaining</span>
                </div>
                <div className="text-sm text-gray-300">of ₹{limit.toLocaleString()}</div>
              </div>
              <div className="text-xs text-gray-400 mb-1">{progressPercent(remaining, limit)}% remaining</div>
              <div className="h-2.5 bg-dark-lighter/40 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent(remaining, limit)}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-2.5 bg-gradient-to-r from-accent via-teal-400 to-accent rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          <div className="glass neon rounded-xl p-6 border-2 border-accent-neon lg:col-span-2 shadow-neon">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent" />
                <h2 className="text-white font-semibold">Purchase Essentials</h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30">
                <span className="text-xs">Verified Stores</span>
              </div>
            </div>
            <form onSubmit={submitPurchase} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className="w-full pl-4 pr-10 py-3 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 appearance-none flex items-center justify-between"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="w-7 h-7 rounded-md bg-gradient-to-br from-accent/20 to-accent-light/10 border border-accent/30 flex items-center justify-center">
                        {(() => {
                          const Icon = categoryIconMap[category]
                          return <Icon className="w-4 h-4 text-accent" />
                        })()}
                      </span>
                      <span className="text-sm font-semibold">{category}</span>
                    </span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {categoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-20 mt-2 w-full glass rounded-lg border border-dark-lighter/50 p-2 shadow-neon"
                    >
                      {categories.map((c) => {
                        const Icon = categoryIconMap[c]
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => {
                              setCategory(c)
                              setCategoryOpen(false)
                            }}
                            className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md hover:bg-dark-lighter/50 ${c === category ? 'bg-dark-lighter/40' : ''}`}
                          >
                            <span className="inline-flex items-center gap-2">
                              <span className="w-7 h-7 rounded-md bg-gradient-to-br from-accent/20 to-accent-light/10 border border-accent/30 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-accent" />
                              </span>
                              <span className="text-sm text-white">{c}</span>
                            </span>
                            {c === category && (
                              <span className="text-xs text-accent font-semibold">Selected</span>
                            )}
                          </button>
                        )
                      })}
                    </motion.div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Verified Store</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setStoreOpen(!storeOpen)}
                    className="w-full pl-4 pr-10 py-3 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 appearance-none flex items-center justify-between"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="w-7 h-7 rounded-md bg-gradient-to-br from-accent/20 to-accent-light/10 border border-accent/30 flex items-center justify-center">
                        <Store className="w-4 h-4 text-accent" />
                      </span>
                      <span className="text-sm font-semibold">{store || 'Select a store'}</span>
                    </span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {storeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-20 mt-2 w-full glass rounded-lg border border-dark-lighter/50 p-2 shadow-neon"
                    >
                      {stores.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            setStore(s)
                            setStoreOpen(false)
                          }}
                          className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md hover:bg-dark-lighter/50 ${s === store ? 'bg-dark-lighter/40' : ''}`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <span className="w-7 h-7 rounded-md bg-gradient-to-br from-accent/20 to-accent-light/10 border border-accent/30 flex items-center justify-center">
                              <Store className="w-4 h-4 text-accent" />
                            </span>
                            <span className="text-sm text-white">{s}</span>
                          </span>
                          {s === store && (
                            <span className="text-xs text-accent font-semibold">Selected</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Enter amount"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white transition-colors disabled:opacity-70 shadow-lg shadow-accent/20 font-semibold"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                <span>Confirm Purchase</span>
              </motion.button>
              <p className="text-xs text-gray-400 mt-2">
                You do not need to pay. Salvus pays the store directly.
              </p>
              {message && (
                <div className="mt-3 text-sm text-green-400">
                  {message}
                </div>
              )}
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass neon rounded-xl p-6 border-2 border-accent-neon shadow-neon"
        >
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-accent" />
            <h2 className="text-white font-semibold">Purchase History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-dark-lighter/40">
                  <th className="py-2 pr-4">Store name</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {history.map((h, i) => (
                  <tr key={i} className="border-b border-dark-lighter/30">
                    <td className="py-2 pr-4">{h.store}</td>
                    <td className="py-2 pr-4">{h.category}</td>
                    <td className="py-2 pr-4">₹{h.amount}</td>
                    <td className="py-2 pr-4">{h.date}</td>
                    <td className="py-2 pr-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 text-green-400 px-2 py-0.5 border border-green-500/20">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass neon rounded-xl p-6 border-2 border-accent-neon mt-8 shadow-neon"
        >
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-accent" />
            <h2 className="text-white font-semibold">Usage Rules</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-300">
            <li className="glass rounded-lg p-3 border border-dark-lighter/50">Essentials only</li>
            <li className="glass rounded-lg p-3 border border-dark-lighter/50">No cash withdrawals</li>
            <li className="glass rounded-lg p-3 border border-dark-lighter/50">Misuse leads to suspension</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
