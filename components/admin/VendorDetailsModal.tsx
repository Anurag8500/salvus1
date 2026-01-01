'use client'

import { motion } from 'framer-motion'
import { XCircle, CheckCircle, AlertTriangle, Store, MapPin, Phone, Shield, FileText, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

interface VendorDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    vendorId?: string // In real app, fetch data by ID
}

export default function VendorDetailsModal({ isOpen, onClose, vendorId }: VendorDetailsModalProps) {
    const [data, setData] = useState({
        id: vendorId || 'STR-201',
        name: 'City Meds',
        type: 'Medical Store',
        owner: 'Dr. A. Khan',
        phone: '+91 999 888 7777',
        location: {
            state: 'Kerala',
            district: 'Wayanad',
            address: 'Main Road, Kalpetta'
        },
        status: 'Verified',
        allowedCategories: ['Medicine', 'Hygiene'],
        priceCaps: {
            'Medicine': 'MRP + 0%',
            'Hygiene': '₹50/unit cap'
        },
        proofType: 'Drug License',
        proofId: 'KL-WAY-1234 (Verified)',
        totalPaid: '₹45,000',
        riskFlags: [],
        notes: 'Trusted vendor since 2021.'
    })

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-3xl glass-card rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="px-8 py-6 border-b border-white/5 flex justify-between items-start bg-white/5">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-2xl font-black text-white tracking-tight">{data.name}</h2>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${data.status === 'Verified' ? 'bg-green-500/10 text-green-400' :
                                    data.status === 'Pending' ? 'bg-orange-500/10 text-orange-400' : 'bg-red-500/10 text-red-400'
                                }`}>
                                {data.status}
                            </span>
                        </div>
                        <div className="text-sm text-gray-400 font-mono">ID: {data.id}</div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        <XCircle className="w-8 h-8" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">

                    {/* 1. KEY METADATA */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Vendor Type</div>
                            <div className="text-white font-bold">{data.type}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Total Paid</div>
                            <div className="text-white font-mono font-bold text-accent">{data.totalPaid}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Compliance</div>
                            <div className="text-white font-bold flex items-center gap-2">
                                <Shield className="w-3 h-3 text-green-400" /> {data.proofType}
                            </div>
                        </div>
                    </div>

                    {/* 2. BUSINESS DETAILS */}
                    <div className="glass-card rounded-xl p-6 border border-white/5 grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Owner / Contact</label>
                            <div className="text-gray-300 font-medium mt-1">{data.owner}</div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Phone & Location</label>
                            <div className="text-gray-300 font-medium mt-1">{data.phone}</div>
                            <div className="text-gray-500 text-xs mt-1">{data.location.address}</div>
                        </div>
                    </div>

                    {/* 3. SELLING RULES & LIMITS */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-purple-400" /> Authorized Selling Rules
                        </h3>
                        <div className="glass-card rounded-xl border border-white/5 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Category</th>
                                        <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Price Cap Rule</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.allowedCategories.map(cat => (
                                        <tr key={cat}>
                                            <td className="px-6 py-3 text-gray-300 font-medium">{cat}</td>
                                            <td className="px-6 py-3 text-gray-400 font-mono text-xs">
                                                {data.priceCaps[cat as keyof typeof data.priceCaps]}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/5 bg-black/20 backdrop-blur-sm flex justify-between items-center">
                    <button className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
                        Flag for Audit
                    </button>

                    <div className="flex gap-3">
                        {data.status === 'Verified' ? (
                            <button className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold hover:bg-red-500/20 transition-all">
                                Suspend Vendor
                            </button>
                        ) : (
                            <button className="px-6 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold transition-all shadow-lg shadow-green-500/20">
                                Verify & Authorize
                            </button>
                        )}
                    </div>
                </div>

            </motion.div>
        </div>
    )
}
