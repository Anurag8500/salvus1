'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Shield, Flag, Users, Store as StoreIcon, ClipboardList, Eye, Settings, CheckCircle, PauseCircle, XCircle, Building2, Calendar, Plus } from 'lucide-react'

export default function AdminDashboard() {
  const [showCampaignCreate, setShowCampaignCreate] = useState(false)
  const [showBeneficiaryOnboard, setShowBeneficiaryOnboard] = useState(false)
  const [showStoreAdd, setShowStoreAdd] = useState(false)
  const [activeCampaignView, setActiveCampaignView] = useState<string | null>(null)
  const stats = useMemo(() => ([
    { icon: ClipboardList, label: 'Active Campaigns', value: 3 },
    { icon: Users, label: 'Approved Beneficiaries', value: 128 },
    { icon: StoreIcon, label: 'Verified Stores', value: 42 },
    { icon: Flag, label: 'Alerts / Flags', value: 2 },
  ]), [])
  const campaigns = useMemo(() => ([
    { name: 'Assam Flood Relief 2025', location: 'Assam', status: 'Active', categories: ['Food', 'Medicine', 'Transport', 'Shelter'], createdOn: '12 Jun 2025' },
    { name: 'Kerala Flood Response', location: 'Kerala', status: 'Active', categories: ['Food', 'Medicine', 'Shelter'], createdOn: '02 Jun 2025' },
    { name: 'Cyclone Michaung Relief', location: 'Tamil Nadu', status: 'Closed', categories: ['Food', 'Transport'], createdOn: '20 May 2025' },
  ]), [])
  const beneficiaries = useMemo(() => ([
    { id: 'BEN-4821', campaign: 'Assam Flood Relief 2025', status: 'Pending', approvedBy: '—', approvalDate: '—' },
    { id: 'BEN-4730', campaign: 'Kerala Flood Response', status: 'Approved', approvedBy: 'Helping Hands NGO', approvalDate: '13 Jun 2025' },
    { id: 'BEN-4688', campaign: 'Kerala Flood Response', status: 'Suspended', approvedBy: 'State Relief Cell', approvalDate: '05 Jun 2025' },
  ]), [])
  const stores = useMemo(() => ([
    { name: 'City Medicals', category: 'Medicine', verified: true, totalPaid: 18500, active: true },
    { name: 'Assam Relief Store #1', category: 'Food', verified: true, totalPaid: 9200, active: true },
    { name: 'Transit Hub Services', category: 'Transport', verified: true, totalPaid: 3100, active: false },
  ]), [])
  const [beneficiaryAction, setBeneficiaryAction] = useState<{ id: string; action: 'Approve' | 'Suspend' } | null>(null)
  const [storeToggle, setStoreToggle] = useState<{ name: string; active: boolean } | null>(null)
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-dark-darker via-dark-darker to-dark">
      <div className="border-b border-dark-lighter/30 bg-dark-darker/60 backdrop-blur">
        <div className="container mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-white font-extrabold tracking-tight">SALVUS</span>
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent tracking-tight">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60">
              <div className="w-6 h-6 rounded-full bg-dark-lighter/60 text-white flex items-center justify-center text-xs font-bold">A</div>
              <div className="flex flex-col">
                <span className="text-sm text-white leading-tight">Anurag</span>
                <span className="text-xs text-gray-400 leading-tight inline-flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> Helping Hands NGO</span>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 text-gray-300 hover:bg-dark-lighter/50">Logout</button>
          </div>
        </div>
      </div>
      {/* Background accent glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      <div className="container mx-auto px-6 lg:px-12 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="relative glass rounded-2xl p-6 border border-dark-lighter/50 hover:border-accent/40 hover:bg-dark-lighter/30 shadow-lg shadow-black/20"
                >
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/40 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="text-sm text-gray-300 font-medium">{s.label}</div>
                  </div>
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">{s.value ?? '—'}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-bold tracking-tight">Relief Campaigns</h2>
            <button onClick={() => setShowCampaignCreate(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white shadow-lg shadow-accent/20 transition-all duration-300">
              <Plus className="w-4 h-4" />
              <span>Create Campaign</span>
            </button>
          </div>
          <div className="glass rounded-2xl border border-dark-lighter/50 hover:border-accent/40 transition-colors overflow-hidden mb-8 shadow-lg shadow-black/20">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-dark-lighter/30 to-dark-lighter/10 border-b border-dark-lighter/50">
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Campaign Name</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Location</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Categories Enabled</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Created On</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-lighter/30">
                  {campaigns.map((c, i) => (
                    <tr key={i} className="hover:bg-dark-lighter/30 transition-all duration-200">
                      <td className="px-6 py-3 text-white">{c.name}</td>
                      <td className="px-6 py-3 text-gray-300">{c.location}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${c.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                          {c.status === 'Active' ? <CheckCircle className="w-3.5 h-3.5" /> : <PauseCircle className="w-3.5 h-3.5" />}
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-300">{c.categories.join(', ')}</td>
                      <td className="px-6 py-3 text-gray-300">{c.createdOn}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setActiveCampaignView(c.name)} className="px-3 py-1.5 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 hover:border-accent/40 text-gray-300 hover:text-white hover:bg-dark-lighter/60 inline-flex items-center gap-1.5 transition-all">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">View</span>
                          </button>
                          <button onClick={() => setActiveCampaignView(c.name)} className="px-3 py-1.5 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 hover:border-accent/40 text-gray-300 hover:text-white hover:bg-dark-lighter/60 inline-flex items-center gap-1.5 transition-all">
                            <Settings className="w-4 h-4" />
                            <span className="text-sm">Edit Rules</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {activeCampaignView && (
            <div className="glass rounded-xl p-6 border border-dark-lighter/50 mb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold">Category Rules</h3>
                <div className="text-xs text-gray-400">Spending rules are enforced automatically.</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Food', 'Medicine', 'Transport', 'Shelter'].map((cat) => (
                  <div key={cat} className="glass rounded-lg p-4 border border-dark-lighter/50">
                    <div className="text-sm text-gray-300 mb-2">{cat}</div>
                    <div className="text-xs text-gray-400 mb-1">Maximum per-beneficiary limit</div>
                    <input type="number" min={0} placeholder="₹" className="w-full px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-bold tracking-tight">Beneficiary Management</h2>
            <button onClick={() => setShowBeneficiaryOnboard(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white shadow-lg shadow-accent/20 transition-all duration-300">
              <Plus className="w-4 h-4" />
              <span>Onboard Beneficiary</span>
            </button>
          </div>
          <div className="glass rounded-2xl border border-dark-lighter/50 hover:border-accent/40 transition-colors overflow-hidden mb-8 shadow-lg shadow-black/20">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-dark-lighter/30 to-dark-lighter/10 border-b border-dark-lighter/50">
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Beneficiary ID</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Campaign</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Approved by</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Approval Date</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-lighter/30">
                  {beneficiaries.map((b) => (
                    <tr key={b.id} className="hover:bg-dark-lighter/30 transition-all duration-200">
                      <td className="px-6 py-3 text-white">{b.id}</td>
                      <td className="px-6 py-3 text-gray-300">{b.campaign}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          b.status === 'Approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          b.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                          'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}>
                          {b.status === 'Approved' ? <CheckCircle className="w-3.5 h-3.5" /> : b.status === 'Pending' ? <PauseCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-300">{b.approvedBy}</td>
                      <td className="px-6 py-3 text-gray-300">{b.approvalDate}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setBeneficiaryAction({ id: b.id, action: 'Approve' })} className="px-3 py-1.5 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 hover:border-accent/40 text-gray-300 hover:text-white hover:bg-dark-lighter/60 text-sm transition-all">Approve</button>
                          <button onClick={() => setBeneficiaryAction({ id: b.id, action: 'Suspend' })} className="px-3 py-1.5 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 hover:border-accent/40 text-gray-300 hover:text-white hover:bg-dark-lighter/60 text-sm transition-all">Suspend</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {beneficiaryAction && (
            <div className="glass rounded-xl p-6 border border-dark-lighter/50 mb-8">
              <div className="text-white font-semibold mb-2">{beneficiaryAction.action} Beneficiary: {beneficiaryAction.id}</div>
              <div className="text-xs text-gray-400 mb-4">All admin actions are recorded for transparency.</div>
              <div className="flex items-center gap-3">
                <button onClick={() => setBeneficiaryAction(null)} className="px-4 py-2 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 text-gray-300 hover:bg-dark-lighter/50">Close</button>
                <button onClick={() => setBeneficiaryAction(null)} className="px-4 py-2 rounded-lg bg-accent text-white">Confirm</button>
              </div>
            </div>
          )}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-bold tracking-tight">Store Management</h2>
            <button onClick={() => setShowStoreAdd(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white shadow-lg shadow-accent/20 transition-all duration-300">
              <Plus className="w-4 h-4" />
              <span>Add Store</span>
            </button>
          </div>
          <div className="glass rounded-2xl border border-dark-lighter/50 hover:border-accent/40 transition-colors overflow-hidden mb-8 shadow-lg shadow-black/20">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-dark-lighter/30 to-dark-lighter/10 border-b border-dark-lighter/50">
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Store Name</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Category</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Verification Status</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Total Paid</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Active / Disabled</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-lighter/30">
                  {stores.map((s) => (
                    <tr key={s.name} className="hover:bg-dark-lighter/30 transition-all duration-200">
                      <td className="px-6 py-3 text-white">{s.name}</td>
                      <td className="px-6 py-3 text-gray-300">{s.category}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${s.verified ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                          {s.verified ? <CheckCircle className="w-3.5 h-3.5" /> : <PauseCircle className="w-3.5 h-3.5" />}
                          {s.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-300">₹{s.totalPaid.toLocaleString()}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${s.active ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                          {s.active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setStoreToggle({ name: s.name, active: true })} className="px-3 py-1.5 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 hover:border-accent/40 text-gray-300 hover:text-white hover:bg-dark-lighter/60 text-sm transition-all">Enable</button>
                          <button onClick={() => setStoreToggle({ name: s.name, active: false })} className="px-3 py-1.5 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 hover:border-accent/40 text-gray-300 hover:text-white hover:bg-dark-lighter/60 text-sm transition-all">Disable</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {storeToggle && (
            <div className="glass rounded-xl p-6 border border-dark-lighter/50 mb-8">
              <div className="text-white font-semibold mb-2">{storeToggle.active ? 'Enable' : 'Disable'} Store: {storeToggle.name}</div>
              <div className="text-xs text-gray-400 mb-4">Admins approve eligibility, not payments.</div>
              <div className="flex items-center gap-3">
                <button onClick={() => setStoreToggle(null)} className="px-4 py-2 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 text-gray-300 hover:bg-dark-lighter/50">Close</button>
                <button onClick={() => setStoreToggle(null)} className="px-4 py-2 rounded-lg bg-accent text-white">Confirm</button>
              </div>
            </div>
          )}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-bold tracking-tight">Admin Action Log</h2>
            <div className="text-xs text-gray-400">All admin actions are recorded for transparency.</div>
          </div>
          <div className="glass rounded-2xl border border-dark-lighter/50 hover:border-accent/40 transition-colors overflow-hidden shadow-lg shadow-black/20">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-dark-lighter/30 to-dark-lighter/10 border-b border-dark-lighter/50">
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Action Performed</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Admin Name</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Timestamp</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-300">Related Entity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-lighter/30">
                  {[
                    { action: 'Created Campaign: Assam Flood Relief 2025', admin: 'Anurag', time: '12 Jun 2025, 10:14 AM', entity: 'Campaign' },
                    { action: 'Approved Beneficiary: BEN-4821', admin: 'Anurag', time: '12 Jun 2025, 10:32 AM', entity: 'Beneficiary' },
                    { action: 'Disabled Store: Transit Hub Services', admin: 'Anurag', time: '12 Jun 2025, 11:05 AM', entity: 'Store' },
                  ].map((l, i) => (
                    <tr key={i} className="hover:bg-dark-lighter/30 transition-all duration-200">
                      <td className="px-6 py-3 text-white">{l.action}</td>
                      <td className="px-6 py-3 text-gray-300">{l.admin}</td>
                      <td className="px-6 py-3 text-gray-300">{l.time}</td>
                      <td className="px-6 py-3 text-gray-300">{l.entity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
      {showCampaignCreate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center z-50">
          <div className="w-full md:max-w-lg glass rounded-t-2xl md:rounded-2xl p-6 border border-dark-lighter/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-accent" />
                <h3 className="text-white font-semibold">Create Campaign</h3>
              </div>
              <button onClick={() => setShowCampaignCreate(false)} className="px-3 py-1.5 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 text-gray-300 hover:bg-dark-lighter/50">Close</button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-300 mb-2">Campaign Name</div>
                <input type="text" className="w-full px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
              </div>
              <div>
                <div className="text-sm text-gray-300 mb-2">Location</div>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" className="w-full pl-10 px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-300 mb-2">Short Description</div>
                <input type="text" className="w-full px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-300 mb-2">Start Date</div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="date" className="w-full pl-10 px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-300 mb-2">End Date (optional)</div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="date" className="w-full pl-10 px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400">These limits control how funds can be used. Admins cannot withdraw funds.</div>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setShowCampaignCreate(false)} className="px-4 py-2 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 text-gray-300 hover:bg-dark-lighter/50">Cancel</button>
                <button onClick={() => setShowCampaignCreate(false)} className="px-4 py-2 rounded-lg bg-accent text-white">Create Campaign</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showBeneficiaryOnboard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center z-50">
          <div className="w-full md:max-w-lg glass rounded-t-2xl md:rounded-2xl p-6 border border-dark-lighter/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                <h3 className="text-white font-semibold">Onboard Beneficiary</h3>
              </div>
              <button onClick={() => setShowBeneficiaryOnboard(false)} className="px-3 py-1.5 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 text-gray-300 hover:bg-dark-lighter/50">Close</button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-300 mb-2">Beneficiary ID</div>
                <input type="text" placeholder="BEN-XXXX or NGO reference" className="w-full px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
              </div>
              <div>
                <div className="text-sm text-gray-300 mb-2">Assigned Campaign</div>
                <select className="w-full px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20">
                  {campaigns.map((c) => <option key={c.name} value={c.name} className="bg-dark-lighter">{c.name}</option>)}
                </select>
              </div>
              <div>
                <div className="text-sm text-gray-300 mb-2">Notes (optional)</div>
                <input type="text" className="w-full px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setShowBeneficiaryOnboard(false)} className="px-4 py-2 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 text-gray-300 hover:bg-dark-lighter/50">Cancel</button>
                <button onClick={() => setShowBeneficiaryOnboard(false)} className="px-4 py-2 rounded-lg bg-accent text-white">Submit for Approval</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showStoreAdd && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center z-50">
          <div className="w-full md:max-w-lg glass rounded-t-2xl md:rounded-2xl p-6 border border-dark-lighter/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <StoreIcon className="w-5 h-5 text-accent" />
                <h3 className="text-white font-semibold">Add Store</h3>
              </div>
              <button onClick={() => setShowStoreAdd(false)} className="px-3 py-1.5 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 text-gray-300 hover:bg-dark-lighter/50">Close</button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-300 mb-2">Store Name</div>
                <input type="text" className="w-full px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
              </div>
              <div>
                <div className="text-sm text-gray-300 mb-2">Category</div>
                <select className="w-full px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20">
                  {['Food','Medicine','Transport','Shelter'].map((cat) => <option key={cat} value={cat} className="bg-dark-lighter">{cat}</option>)}
                </select>
              </div>
              <div>
                <div className="text-sm text-gray-300 mb-2">Verification Status</div>
                <select className="w-full px-3 py-2 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20">
                  {['Verified','Pending'].map((v) => <option key={v} value={v} className="bg-dark-lighter">{v}</option>)}
                </select>
              </div>
              <div className="text-xs text-gray-400">Admins approve eligibility, not payments.</div>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setShowStoreAdd(false)} className="px-4 py-2 rounded-lg bg-dark-lighter/40 border border-dark-lighter/60 text-gray-300 hover:bg-dark-lighter/50">Cancel</button>
                <button onClick={() => setShowStoreAdd(false)} className="px-4 py-2 rounded-lg bg-accent text-white">Add Store</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
