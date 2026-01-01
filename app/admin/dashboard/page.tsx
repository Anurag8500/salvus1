'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Shield, Flag, Users, Store as StoreIcon, ClipboardList, Eye, Settings,
  CheckCircle, PauseCircle, XCircle, Building2, Calendar, Plus,
  Bell, LogOut, Search, Filter, AlertTriangle, AlertOctagon, TrendingUp, CreditCard, UserPlus, Store
} from 'lucide-react'
import { useState, useMemo } from 'react'
import AdminNavbar from '@/components/admin/AdminNavbar'
import EnhancedStatCard from '@/components/admin/EnhancedStatCard'
import ActionCenterPanel, { ActionItem } from '@/components/admin/ActionCenterPanel'
import ActivitySnapshot from '@/components/admin/ActivitySnapshot'
import CreateCampaignModal from '@/components/admin/CreateCampaignModal'

export default function AdminDashboard() {
  const [showCampaignCreate, setShowCampaignCreate] = useState(false)

  // --- MOCK DATA ---

  const stats = useMemo(() => ([
    {
      icon: ClipboardList,
      label: 'Active Campaigns',
      value: 3,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      breakdown: [
        { label: 'Active', value: 3, color: 'text-green-400' },
        { label: 'Paused', value: 1, color: 'text-yellow-400' },
        { label: 'Closed', value: 5, color: 'text-gray-400' }
      ]
    },
    {
      icon: Users,
      label: 'Beneficiaries',
      value: 128,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      breakdown: [
        { label: 'Pending', value: 12, color: 'text-red-400' },
        { label: 'Approved', value: 110, color: 'text-green-400' },
        { label: 'Suspended', value: 6, color: 'text-gray-400' }
      ]
    },
    {
      icon: StoreIcon,
      label: 'Vendors / Stores',
      value: 42,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      breakdown: [
        { label: 'Verified', value: 38, color: 'text-green-400' },
        { label: 'Pending', value: 3, color: 'text-orange-400' },
        { label: 'Flagged', value: 1, color: 'text-red-400' }
      ]
    },
    {
      icon: Flag,
      label: 'Alerts / Flags',
      value: 2,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      breakdown: [
        { label: 'High Risk', value: 1, color: 'text-red-500' },
        { label: 'Suspicious', value: 1, color: 'text-orange-400' },
        { label: 'Unusual', value: 0, color: 'text-yellow-400' }
      ]
    },
  ]), [])

  const actionItems: ActionItem[] = useMemo(() => ([
    { id: '1', priority: 'high', message: '12 Beneficiaries pending approval', campaignName: 'Assam Flood Relief 2025', campaignId: 'assam-2025', timestamp: '2h ago' },
    { id: '2', priority: 'medium', message: '3 Vendors awaiting verification', campaignName: 'Kerala Flood Relief', campaignId: 'kerala-2024', timestamp: '5h ago' },
    { id: '3', priority: 'high', message: 'Campaign exceeding medicine budget', campaignName: 'Cyclone Michaung Relief', campaignId: 'tn-cyclone', timestamp: '1d ago' },
    { id: '4', priority: 'low', message: '2 Unusual transaction patterns detected', campaignName: 'Assam Flood Relief 2025', campaignId: 'assam-2025', timestamp: '3h ago' },
  ]), [])

  const campaigns = useMemo(() => ([
    {
      id: 'kerala-2024',
      name: 'Kerala Flood Relief',
      location: 'Kerala',
      status: 'Active',
      categories: ['Food', 'Medicine', 'Shelter'],
      issues: 3,
      beneficiaries: 450,
      vendors: 12
    },
    {
      id: 'assam-2025',
      name: 'Assam Flood Relief 2025',
      location: 'Assam',
      status: 'Active',
      categories: ['Food', 'Medicine', 'Transport', 'Shelter'],
      issues: 12, // High issues
      beneficiaries: 1200,
      vendors: 28
    },
    {
      id: 'tn-cyclone',
      name: 'Cyclone Michaung Relief',
      location: 'Tamil Nadu',
      status: 'Closed',
      categories: ['Food', 'Transport'],
      issues: 0,
      beneficiaries: 800,
      vendors: 15
    },
  ]), [])

  const recentPayments = [
    { id: 'p1', title: '₹1,200 to City Meds', subtitle: 'Medicine - Assam Relief', timestamp: '10m ago', icon: CreditCard, type: 'payment' as const },
    { id: 'p2', title: '₹500 to Fresh Foods', subtitle: 'Food - Kerala Relief', timestamp: '25m ago', icon: CreditCard, type: 'payment' as const },
    { id: 'p3', title: '₹2,000 to Relief Transport', subtitle: 'Logistics - TN Cyclone', timestamp: '1h ago', icon: CreditCard, type: 'payment' as const },
  ]

  const recentBeneficiaries = [
    { id: 'b1', title: 'Ramesh Kumar approved', subtitle: 'Assam Relief', timestamp: '5m ago', icon: UserPlus, type: 'beneficiary' as const },
    { id: 'b2', title: 'Sita Devi approved', subtitle: 'Kerala Relief', timestamp: '1h ago', icon: UserPlus, type: 'beneficiary' as const },
  ]

  const recentVendors = [
    { id: 'v1', title: 'City Meds verified', subtitle: 'Pharmacy - Assam', timestamp: '2h ago', icon: Store, type: 'vendor' as const },
  ]

  // --- RENDER ---

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-gray-200">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <AdminNavbar />

      <div className="container mx-auto px-6 lg:px-12 py-12 pt-28 relative z-10 space-y-12">

        {/* SECTION 1: PLATFORM OVERVIEW */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                Admin <span className="text-accent">Dashboard</span>
              </h1>
              <p className="text-gray-400 text-lg">Platform-wide health and status overview.</p>
            </div>
            <div className="flex gap-3">
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors">
                <Filter className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <EnhancedStatCard key={i} {...s} delay={i * 0.1} onClick={() => { }} />
            ))}
          </div>
        </div>

        {/* SECTION 3: RELIEF CAMPAIGNS HUB */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-accent" />
              Relief Campaigns
            </h2>
            <button
              onClick={() => setShowCampaignCreate(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-dark text-dark-darker font-bold transition-all shadow-lg shadow-accent/20 hover:shadow-accent/40"
            >
              <Plus className="w-5 h-5" />
              <span>Create New</span>
            </button>
          </div>

          <div className="glass-card rounded-3xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Campaign Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Quick Stats</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Health</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {campaigns.map((c, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white group-hover:text-accent transition-colors text-lg">{c.name}</div>
                        <div className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-1">
                          <Building2 className="w-3 h-3" /> {c.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${c.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${c.status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-1.5" title="Beneficiaries">
                            <Users className="w-4 h-4 text-blue-400" /> {c.beneficiaries}
                          </div>
                          <div className="flex items-center gap-1.5" title="Vendors">
                            <StoreIcon className="w-4 h-4 text-purple-400" /> {c.vendors}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {c.issues > 0 ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {c.issues} Issues
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 text-green-400 text-xs font-bold">
                            <CheckCircle className="w-4 h-4" /> Healthy
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/campaigns/${c.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-gray-300 border border-white/10 transition-all font-bold text-sm"
                        >
                          <span>Manage Campaign</span>
                          <Settings className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: ADMIN ACTION CENTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ActionCenterPanel actions={actionItems} />
        </motion.div>

        {/* SECTION 4: PLATFORM ACTIVITY SNAPSHOT */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            Platform Activity Snapshot
          </h2>
          <ActivitySnapshot
            payments={recentPayments}
            beneficiaries={recentBeneficiaries}
            vendors={recentVendors}
          />
        </motion.section>

      </div>

      {/* Create Campaign Modal */}
      <AnimatePresence>
        {showCampaignCreate && (
          <CreateCampaignModal
            isOpen={showCampaignCreate}
            onClose={() => setShowCampaignCreate(false)}
          />
        )}
      </AnimatePresence>

    </div>
  )
}
