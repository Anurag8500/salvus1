"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Building2,
    Mail,
    Globe,
    FileText,
    AlertTriangle,
    CheckCircle2,
    Download,
    Calendar,
    User,
    ShieldAlert,
    ShieldCheck
} from "lucide-react";
import StatusBadge from "@/components/headquarters/StatusBadge";
import RequestActionModal from "@/components/headquarters/RequestActionModal";

export default function RequestDetailPage({ params }: { params: { id: string } }) {
    const [status, setStatus] = useState<"Pending" | "Approved" | "Rejected">("Pending");
    const [modalType, setModalType] = useState<"approve" | "reject" | null>(null);

    // Mock Data
    const request = {
        id: params.id,
        orgName: "Global Relif Fund",
        type: "NGO",
        regNumber: "NGO-8829-XJ",
        website: "www.global-relief-fund.org",
        submittedDate: "2024-03-15",
        contactPerson: "Sarah Jenkins",
        email: "sarah.j@gmail.com",
        phone: "+1 (555) 012-3456",
        mission: "To provide immediate assistance to families affected by natural disasters through direct monetary support and supply distribution.",
        documents: [
            { name: "Registration_Cert.pdf", size: "2.4 MB" },
            { name: "Tax_Exemption_Letter.pdf", size: "1.1 MB" },
            { name: "Bank_Statement_Feb.pdf", size: "3.5 MB" },
        ],
        auditLog: [
            { action: "Submitted", user: "System", time: "2024-03-15 09:42 AM", note: "Application received via portal." },
            { action: "Automated Check", user: "System", time: "2024-03-15 09:43 AM", note: "Email domain warning detected." },
        ]
    };

    const handleAction = (reason?: string) => {
        if (modalType === "approve") {
            setStatus("Approved");
        } else if (modalType === "reject") {
            setStatus("Rejected");
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-20 animate-in fade-in zoom-in-95 duration-500">
            {/* Breadcrumb & Header */}
            <div className="mb-10">
                <Link href="/headquarters/requests" className="inline-flex items-center text-sm text-slate-500 hover:text-white mb-6 transition-colors group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Requests
                </Link>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <StatusBadge status={status} />
                            <span className="text-xs text-slate-500 font-mono bg-white/5 px-2 py-0.5 rounded">ID: {request.id}</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">{request.orgName}</h1>
                        <p className="text-slate-400 flex items-center">
                            <Building2 className="w-4 h-4 mr-2 text-accent" />
                            {request.type} • Submitted on {request.submittedDate}
                        </p>
                    </div>

                    {status === "Pending" && (
                        <div className="flex gap-4">
                            <button
                                onClick={() => setModalType("reject")}
                                className="px-6 py-3 rounded-xl border border-red-500/20 text-red-400 font-bold hover:bg-red-500/10 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.05)]"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => setModalType("approve")}
                                className="px-8 py-3 rounded-xl bg-accent text-dark-darker font-bold hover:bg-teal-300 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:scale-105 active:scale-95"
                            >
                                Approve & Register
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Risk Card */}
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <AlertTriangle className="w-32 h-32" />
                        </div>
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
                                <ShieldAlert className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-amber-500 uppercase tracking-widest text-xs mb-2">Automated Risk Detection</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start text-amber-200/90 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2 flex-shrink-0"></span>
                                        Official email uses a public domain (gmail.com).
                                    </li>
                                    <li className="flex items-start text-amber-200/90 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2 flex-shrink-0"></span>
                                        Organization name has potential spelling discrepancies ("Relif" vs "Relief").
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <section className="glass-panel p-8 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <User className="w-5 h-5 text-accent" />
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Contact Person</label>
                                <p className="text-white font-medium text-lg">{request.contactPerson}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Official Email</label>
                                <p className="text-white font-medium text-lg flex items-center">
                                    {request.email}
                                    <span className="ml-3 px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] font-bold rounded border border-amber-500/20">PUBLIC DOMAIN</span>
                                </p>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Phone</label>
                                <p className="text-white font-medium text-lg">{request.phone}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Website</label>
                                <a href={`https://${request.website}`} target="_blank" className="text-accent hover:text-teal-300 font-medium text-lg hover:underline flex items-center">
                                    {request.website} <Globe className="w-4 h-4 ml-2" />
                                </a>
                            </div>
                        </div>
                    </section>

                    <section className="glass-panel p-8 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <Building2 className="w-5 h-5 text-accent" />
                            Organization Details
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Registration Number</label>
                                <p className="text-white font-mono text-lg bg-black/20 inline-block px-4 py-2 rounded-lg border border-white/5">
                                    {request.regNumber}
                                </p>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Mission Statement</label>
                                <div className="relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/30 rounded-full"></div>
                                    <p className="text-slate-300 italic pl-5 py-1 text-lg leading-relaxed">
                                        "{request.mission}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <section className="glass-panel p-6 rounded-2xl">
                        <h3 className="font-bold text-white mb-4 flex items-center text-sm uppercase tracking-wide">
                            <FileText className="w-4 h-4 mr-2 text-slate-500" />
                            Submitted Documents
                        </h3>
                        <div className="space-y-3">
                            {request.documents.map((doc, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/5 hover:border-white/20 transition-all bg-white/[0.02] hover:bg-white/[0.05] group">
                                    <div className="flex items-center overflow-hidden">
                                        <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0 mr-3 border border-red-500/20">
                                            <span className="text-[10px] font-bold">PDF</span>
                                        </div>
                                        <div className="truncate">
                                            <p className="text-sm font-medium text-slate-200 truncate group-hover:text-white transition-colors">{doc.name}</p>
                                            <p className="text-xs text-slate-500">{doc.size}</p>
                                        </div>
                                    </div>
                                    <button className="text-slate-500 hover:text-accent transition-colors p-2">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="glass-panel p-6 rounded-2xl relative overflow-hidden">

                        <h3 className="font-bold text-white mb-6 flex items-center text-sm uppercase tracking-wide">
                            <ShieldCheck className="w-4 h-4 mr-2 text-slate-500" />
                            Audit Traceability
                        </h3>
                        <div className="relative border-l border-white/10 ml-2 space-y-8 py-2">
                            {request.auditLog.map((log, i) => (
                                <div key={i} className="pl-6 relative">
                                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-slate-600"></div>
                                    <p className="text-[10px] text-slate-500 font-mono mb-1">{log.time}</p>
                                    <p className="text-sm font-bold text-white mb-0.5">{log.action}</p>
                                    <p className="text-xs text-slate-400">
                                        By: {log.user}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1 italic">
                                        "{log.note}"
                                    </p>
                                </div>
                            ))}
                            {status !== "Pending" && (
                                <div className="pl-6 relative">
                                    <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${status === 'Approved' ? 'bg-accent border-accent shadow-[0_0_10px_rgba(45,212,191,0.5)]' : 'bg-red-500 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>
                                    <p className="text-[10px] text-accent font-mono mb-1">Just Now</p>
                                    <p className={`text-sm font-bold ${status === 'Approved' ? 'text-accent' : 'text-red-400'}`}>
                                        Request {status}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        By: Super Admin
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>

            <RequestActionModal
                isOpen={!!modalType}
                onClose={() => setModalType(null)}
                type={modalType as "approve" | "reject"}
                onConfirm={handleAction}
                orgName={request.orgName}
            />
        </div>
    );
}
