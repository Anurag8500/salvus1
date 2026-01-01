'use client'

import { motion } from 'framer-motion'
import { XCircle, CheckCircle, AlertTriangle, User, MapPin, Phone, Shield, Clock, FileText, History } from 'lucide-react'
import { useState } from 'react'

interface BeneficiaryDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    beneficiaryId?: string // In real app, fetch data by ID
}

export default function BeneficiaryDetailsModal({ isOpen, onClose, beneficiaryId }: BeneficiaryDetailsModalProps) {
    // Mock Data - In real app, fetch this
    const [data, setData] = useState({
        id: beneficiaryId || 'BEN-101',
        name: 'Ramesh Kumar',
        age: 42,
        gender: 'Male',
        phone: '+91 98765 43210',
        email: 'ramesh.k@example.com', // Optional
        aadhaar: 'XXXX XXXX 1234', // Masked
        location: {
            state: 'Kerala',
            district: 'Wayanad',
            locality: 'Meppadi, Ward 4'
        },
        status: 'Approved',
        campaign: 'Kerala Flood Relief',
        joinedAt: '2 days ago',
        riskFlags: ['Location Mismatch'], // Example
        notes: 'Verified by field volunteer. House partially damaged.'
    })

    const [editNotes, setEditNotes] = useState(false)

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
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${data.status === 'Approved' ? 'bg-green-500/10 text-green-400' :
                                    data.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
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
                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Campaign</div>
                            <div className="text-white font-bold">{data.campaign}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Location</div>
                            <div className="text-white font-bold flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-accent" />
                                {data.location.district}
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Risk Profile</div>
                            <div className="text-white font-bold flex items-center gap-2">
                                {data.riskFlags.length > 0 ? (
                                    <span className="text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {data.riskFlags.join(', ')}</span>
                                ) : (
                                    <span className="text-green-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Low Risk</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 2. PERSONAL DETAILS */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-400" /> Personal Identity
                        </h3>
                        <div className="glass-card rounded-xl p-6 border border-white/5 grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                                <div className="text-gray-300 font-medium mt-1">{data.name}</div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Age / Gender</label>
                                <div className="text-gray-300 font-medium mt-1">{data.age} / {data.gender}</div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                                <div className="text-gray-300 font-medium mt-1 font-mono">{data.phone}</div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">ID Proof (Aadhaar)</label>
                                <div className="text-gray-300 font-medium mt-1 font-mono">{data.aadhaar} <span className="text-xs text-gray-500 ml-2">(Masked)</span></div>
                            </div>
                        </div>
                    </div>

                    {/* 3. ADMIN NOTES */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-400" /> Internal Notes
                            </h3>
                            <button
                                onClick={() => setEditNotes(!editNotes)}
                                className="text-xs font-bold text-accent hover:underline"
                            >
                                {editNotes ? 'Save' : 'Edit'}
                            </button>
                        </div>
                        {editNotes ? (
                            <textarea
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-gray-300 focus:outline-none focus:border-accent/50"
                                value={data.notes}
                                onChange={(e) => setData({ ...data, notes: e.target.value })}
                            />
                        ) : (
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-gray-400 italic">
                                "{data.notes}"
                            </div>
                        )}
                    </div>

                    {/* 4. HISTORY LOG */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <History className="w-5 h-5 text-purple-400" /> Activity Log
                        </h3>
                        <div className="space-y-4 border-l-2 border-white/10 pl-6 relative">
                            <div className="relative">
                                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-green-500"></div>
                                <div className="text-sm font-bold text-white">Approved by Admin</div>
                                <div className="text-xs text-gray-500">Today, 10:00 AM</div>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-gray-600"></div>
                                <div className="text-sm font-bold text-gray-300">Registered via Field App</div>
                                <div className="text-xs text-gray-500">Yesterday, 4:30 PM</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/5 bg-black/20 backdrop-blur-sm flex justify-between items-center">
                    <button className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors">
                        Archive Record
                    </button>

                    <div className="flex gap-3">
                        {data.status === 'Approved' ? (
                            <button className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold hover:bg-red-500/20 transition-all">
                                Suspend Beneficiary
                            </button>
                        ) : (
                            <button className="px-6 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold transition-all shadow-lg shadow-green-500/20">
                                Approve Beneficiary
                            </button>
                        )}
                    </div>
                </div>

            </motion.div>
        </div>
    )
}
