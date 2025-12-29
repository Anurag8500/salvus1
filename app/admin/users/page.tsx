'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Shield, CheckCircle, XCircle, Loader2, User, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'

interface UserData {
  _id: string
  name: string
  email: string
  isVerified: boolean
  createdAt: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users')
        if (!res.ok) {
          throw new Error('Failed to fetch users')
        }
        const data = await res.json()
        setUsers(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-darker via-dark-darker to-dark px-6 py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="inline-block mb-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                SALVUS <span className="text-accent text-lg ml-2">Admin</span>
              </h1>
            </Link>
            <p className="text-gray-400">Manage registered users</p>
          </div>
          <div className="bg-dark-lighter/30 px-4 py-2 rounded-lg border border-dark-lighter/50">
            <span className="text-gray-400 text-sm">Total Users:</span>
            <span className="text-white font-bold ml-2">{users.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-accent animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-6 py-4 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="glass rounded-xl border border-dark-lighter/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-dark-lighter/30 border-b border-dark-lighter/50">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">User</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-lighter/30">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-dark-lighter/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-dark-lighter/50 flex items-center justify-center border border-dark-lighter">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{user.name}</div>
                            <div className="text-sm text-gray-400 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.isVerified ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                            <Loader2 className="w-3.5 h-3.5" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {users.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No users found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
