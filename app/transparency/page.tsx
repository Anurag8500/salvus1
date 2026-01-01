'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { MapPin, CheckCircle, ArrowRight, Filter, Shield, Building2, Calendar } from 'lucide-react'

type Txn = {
  amount: number
  category: 'Food' | 'Medicine' | 'Transport' | 'Shelter'
  store: string
  datetime: string
  status: 'Paid'
}

export default function TransparencyPage() {
  const search = useSearchParams()
  const campaignParam = (search.get('campaign') || '').toLowerCase()

  const campaigns = useMemo(() => ([
    { id: 'assam-flood-2025', name: 'Assam Flood Relief 2025', location: 'Assam, India', status: 'Active', categories: ['Food', 'Medicine', 'Transport', 'Shelter'], txCount: 128 },
    { id: 'kerala-2024', name: 'Kerala Flood Relief 2024', location: 'Kerala, India', status: 'Active', categories: ['Food', 'Medicine', 'Transport', 'Shelter'], txCount: 94 },
    { id: 'cyclone-michaung', name: 'Cyclone Michaung Response', location: 'Tamil Nadu, India', status: 'Closed', categories: ['Food', 'Medicine', 'Shelter'], txCount: 57 },
  ]), [])

  const selectedCampaign = campaigns.find(c => c.id === campaignParam) || campaigns[0]

  const [filters, setFilters] = useState({
    campaign: selectedCampaign.id,
    category: '',
    store: '',
    startDate: '',
    endDate: '',
  })

  const transactions: Txn[] = useMemo(() => ([
    { amount: 650, category: 'Food', store: 'Assam Relief Store #1', datetime: '12 Jun 2025, 10:12 AM', status: 'Paid' },
    { amount: 1200, category: 'Medicine', store: 'Northeast Pharma Verified', datetime: '11 Jun 2025, 02:45 PM', status: 'Paid' },
    { amount: 300, category: 'Transport', store: 'Assam Transit Hub', datetime: '10 Jun 2025, 04:05 PM', status: 'Paid' },
    { amount: 950, category: 'Shelter', store: 'Safe Shelter Assam', datetime: '09 Jun 2025, 11:31 AM', status: 'Paid' },
  ]), [])

  const timeline = useMemo(() => ([
    { action: 'Campaign created', role: 'Admin', time: '02 Jun 2025, 09:00 AM' },
    { action: 'Category limits set', role: 'Admin', time: '02 Jun 2025, 09:15 AM' },
    { action: 'Beneficiaries approved', role: 'Admin', time: '03 Jun 2025, 02:10 PM' },
    { action: 'Store enabled: Assam Relief Store #1', role: 'Admin', time: '04 Jun 2025, 11:22 AM' },
    { action: 'Payment completed', role: 'System', time: '12 Jun 2025, 10:12 AM' },
  ]), [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-darker via-dark-darker to-dark">
      <div className="container mx-auto px-6 lg:px-12 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Transparency & Audit
          </h1>
          <p className="text-gray-400 text-lg mt-3">
            This page shows how relief funds are used — openly and responsibly. No personal data is shown. No actions can be hidden.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="glass rounded-2xl p-6 border border-dark-lighter/50 lg:col-span-2">
            <div className="text-white font-semibold mb-4">How Funds Move</div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50 text-white font-semibold">Donor</div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <div className="px-4 py-2 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50 text-white font-semibold">Relief Campaign</div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <div className="px-4 py-2 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50 text-white font-semibold">Spending Category</div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <div className="px-4 py-2 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50 text-white font-semibold">Verified Store</div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
              <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 font-semibold inline-flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Paid
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-4">
              Funds can only move through these steps. No cash withdrawals. No direct transfers.
            </div>
          </div>
          <div className="glass rounded-2xl p-6 border border-dark-lighter/50">
            <div className="text-white font-semibold mb-4">Campaign Overview</div>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm text-gray-200">Campaign: <span className="font-semibold text-white">{selectedCampaign.name}</span></span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm text-gray-200">Location: <span className="font-semibold text-white">{selectedCampaign.location}</span></span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50">
                <Building2 className="w-4 h-4 text-accent" />
                <span className="text-sm text-gray-200">Status: <span className="font-semibold text-white">{selectedCampaign.status}</span></span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50">
                <span className="text-sm text-gray-200">Categories: <span className="font-semibold text-white">{selectedCampaign.categories.join(', ')}</span></span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50">
                <span className="text-sm text-gray-200">Transactions Completed: <span className="font-semibold text-white">{selectedCampaign.txCount}</span></span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass rounded-2xl p-6 border border-dark-lighter/50 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white font-semibold">Transaction Explorer</div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50 text-gray-300">
              <Filter className="w-4 h-4" />
              <span className="text-xs">Filters</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <select value={filters.campaign} onChange={e => setFilters({ ...filters, campaign: e.target.value })} className="w-full px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20">
              {campaigns.map(c => <option key={c.id} value={c.id} className="bg-dark-lighter">{c.name}</option>)}
            </select>
            <select value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })} className="w-full px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20">
              <option value="" className="bg-dark-lighter">All Categories</option>
              {['Food', 'Medicine', 'Transport', 'Shelter'].map(cat => <option key={cat} value={cat} className="bg-dark-lighter">{cat}</option>)}
            </select>
            <input value={filters.store} onChange={e => setFilters({ ...filters, store: e.target.value })} placeholder="Store (optional)" className="w-full px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="date" value={filters.startDate} onChange={e => setFilters({ ...filters, startDate: e.target.value })} className="w-full pl-10 px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="date" value={filters.endDate} onChange={e => setFilters({ ...filters, endDate: e.target.value })} className="w-full pl-10 px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
              </div>
            </div>
          </div>
          <div className="glass rounded-xl border border-dark-lighter/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-dark-lighter/30 border-b border-dark-lighter/50">
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Amount</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Category</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Store</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Date & Time</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-lighter/30">
                  {transactions.map((t, i) => (
                    <tr key={i} className="hover:bg-dark-lighter/20 transition-colors">
                      <td className="px-6 py-3 text-white">₹{t.amount.toLocaleString()}</td>
                      <td className="px-6 py-3 text-gray-300">{t.category}</td>
                      <td className="px-6 py-3 text-gray-300">{t.store}</td>
                      <td className="px-6 py-3 text-gray-300">{t.datetime}</td>
                      <td className="px-6 py-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-3">All listed transactions represent completed purchases at verified stores.</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-2xl p-6 border border-dark-lighter/50">
            <div className="text-white font-semibold mb-4">Admin & System Accountability Timeline</div>
            <div className="space-y-3">
              {timeline.map((e, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 rounded-lg bg-dark-lighter/30 border border-dark-lighter/50">
                  <div className="text-sm text-white">{e.action}</div>
                  <div className="text-xs text-gray-400">{e.role} • {e.time}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-6 border border-dark-lighter/50">
            <div className="text-white font-semibold mb-4">What This Page Proves</div>
            <div className="space-y-2 text-sm text-gray-300">
              <div>Funds cannot be diverted to cash</div>
              <div>Only essentials can be purchased</div>
              <div>Stores are paid only after confirmation</div>
              <div>Administrative actions are visible</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
