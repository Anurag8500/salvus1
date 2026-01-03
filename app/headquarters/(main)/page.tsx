"use client";

import Link from "next/link";
import {
    Users,
    Clock,
    CheckCircle,
    XCircle,
    ArrowRight,
    MoreHorizontal
} from "lucide-react";
import StatCard from "@/components/headquarters/StatCard";
import StatusBadge from "@/components/headquarters/StatusBadge";

export default function HeadquartersDashboard() {
    const recentRequests = [
        { id: 101, org: "Global Relief Fund", type: "NGO", date: "2024-03-15", status: "Pending", email: "contact@grf.org" },
        { id: 102, org: "Local Shelter Initiative", type: "NGO", date: "2024-03-14", status: "Approved", email: "info@shelter.org" },
        { id: 103, org: "Dept of Disaster Mgmt", type: "Govt", date: "2024-03-12", status: "Pending", email: "admin@ddm.gov" },
        { id: 104, org: "Fake Charity Corp", type: "NGO", date: "2024-03-10", status: "Rejected", email: "ceo@gmail.com" },
        { id: 105, org: "Wildlife Rescue", type: "NGO", date: "2024-03-09", status: "Approved", email: "help@wildlife.org" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-400 mt-2">Welcome back, Commander. Realtime platform metrics.</p>
                </div>
                <div className="text-sm font-mono text-accent/80 bg-accent/5 px-3 py-1 rounded border border-accent/10">
                    SYSTEM STATUS: ONLINE
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Requests"
                    value="1,248"
                    icon={Users}
                    color="blue"
                    trend="+12%"
                />
                <StatCard
                    title="Pending Actions"
                    value="42"
                    icon={Clock}
                    color="amber"
                />
                <StatCard
                    title="Active Partners"
                    value="890"
                    icon={CheckCircle}
                    color="emerald"
                />
                <StatCard
                    title="Rejected"
                    value="316"
                    icon={XCircle}
                    color="red"
                />
            </div>

            {/* Recent Requests Table */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <h2 className="font-bold text-lg text-white flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                        Recent Campaign Requests
                    </h2>
                    <Link href="/headquarters/requests" className="text-sm text-slate-400 hover:text-white flex items-center font-medium transition-colors group">
                        View All <ArrowRight className="w-4 h-4 ml-2 text-accent group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-white/[0.03] text-slate-200 uppercase text-xs font-semibold tracking-wider">
                            <tr>
                                <th className="px-8 py-4">Organization</th>
                                <th className="px-8 py-4">Type</th>
                                <th className="px-8 py-4">Submitted</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                                                {req.org.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white group-hover:text-accent transition-colors">{req.org}</p>
                                                <p className="text-xs text-slate-500 font-mono">{req.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${req.type === 'Govt' ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' : 'bg-slate-700/30 text-slate-300 border-slate-600/30'}`}>
                                            {req.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4 font-mono text-xs">{req.date}</td>
                                    <td className="px-8 py-4">
                                        <StatusBadge status={req.status} />
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <Link
                                            href={`/headquarters/requests/${req.id}`}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
