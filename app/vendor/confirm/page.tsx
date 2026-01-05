'use client'
import { useEffect, useState } from 'react'

export default function VendorConfirmPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [data, setData] = useState<any | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get('token')
    setToken(t)
    if (!t) {
      setError('Missing token')
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        const res = await fetch(`/api/vendor/confirm?token=${t}`)
        if (!res.ok) {
          const err = await res.json().catch(() => ({ message: 'Failed to load' }))
          throw new Error(err.message || 'Failed to load')
        }
        const json = await res.json()
        setData(json)
      } catch (e: any) {
        setError(e.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const confirm = async () => {
    if (!token) return
    setSubmitting(true)
    setMessage(null)
    try {
      const res = await fetch('/api/vendor/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(json.message || 'Confirmation failed')
      }
      setMessage('Payment released successfully')
    } catch (e: any) {
      setMessage(e.message || 'Confirmation failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full glass-card rounded-2xl p-6 border border-white/10">
        <h1 className="text-2xl font-bold mb-4">Confirm Purchase</h1>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {!loading && !error && data && (
          <>
            <div className="space-y-2 text-gray-300 mb-6">
              <div><span className="text-gray-400">Beneficiary:</span> {data.beneficiaryName} ({data.beneficiaryId})</div>
              <div><span className="text-gray-400">Campaign:</span> {data.campaignName}</div>
              <div><span className="text-gray-400">Vendor:</span> {data.vendorName}</div>
              <div><span className="text-gray-400">Category:</span> {data.category}</div>
              <div><span className="text-gray-400">Amount:</span> {data.amount}</div>
            </div>
            <button
              onClick={confirm}
              disabled={submitting}
              className="w-full py-3 bg-accent text-black font-bold rounded-xl disabled:opacity-50"
            >
              {submitting ? 'Processing...' : 'Confirm Purchase'}
            </button>
            {message && (
              <div className="mt-4 text-center text-gray-300">{message}</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
