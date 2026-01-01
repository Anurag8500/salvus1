'use client'

import Link from 'next/link'
import { Bell, Building2, LogOut } from 'lucide-react'

export default function AdminNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass-nav border-b border-white/5 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
         {/* Logo */}
         <Link href="/admin/dashboard" className="group flex items-center gap-2">
            <div className="text-2xl font-black tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-blue-400 transition-all duration-300">
              Salvus. <span className="text-xs tracking-widest font-medium text-gray-500 ml-1 uppercase">Admin</span>
            </div>
         </Link>

         {/* Right Actions */}
         <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
               <Building2 className="w-4 h-4 text-accent" />
               <span className="text-xs font-bold text-gray-300">Helping Hands NGO</span>
            </div>

            <div className="h-6 w-px bg-white/10 mx-1 hidden md:block"></div>

            <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all relative group">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            
            <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-red-400 transition-all text-sm font-medium">
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
            </Link>
         </div>
      </div>
    </nav>
  )
}
