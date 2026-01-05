import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Transaction from '@/models/Transaction'
import Beneficiary from '@/models/Beneficiary'
import Campaign from '@/models/Campaign'
import Vendor from '@/models/Vendor'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import crypto from 'crypto'
import { sendVendorConfirmationEmail } from '@/lib/mailer'

async function getUser() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  if (!token) return null
  try {
    const decoded: any = jwt.verify(token.value, process.env.JWT_SECRET!)
    return decoded
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { transactionId } = await req.json()
    if (!transactionId) {
      return NextResponse.json({ message: 'Missing transactionId' }, { status: 400 })
    }

    await dbConnect()

    const txn = await Transaction.findById(transactionId)
    if (!txn) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 })
    }

    const beneficiary = await Beneficiary.findOne({ _id: txn.beneficiaryId, userId: user.userId })
    if (!beneficiary) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }
    if (txn.status !== 'Pending') {
      return NextResponse.json({ message: 'Transaction not pending' }, { status: 400 })
    }

    const vendor = await Vendor.findById(txn.vendorId)
    const campaign = await Campaign.findById(txn.campaignId)
    if (!vendor || !campaign) {
      return NextResponse.json({ message: 'Invalid transaction data' }, { status: 400 })
    }
    if (!vendor.email) {
      return NextResponse.json({ message: 'Vendor email not available' }, { status: 400 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    txn.confirmationToken = token
    await txn.save()

    let previewUrl: string | undefined
    try {
      const result = await sendVendorConfirmationEmail(vendor.email, {
        beneficiaryName: beneficiary.fullName,
        beneficiaryId: beneficiary.beneficiaryId || String(beneficiary._id),
        category: (txn as any).category,
        amount: (txn as any).amount,
        campaignName: campaign.name,
        vendorName: vendor.name,
        token
      })
      previewUrl = result.previewUrl
    } catch (mailErr) {
      console.error('Mailer error:', mailErr)
    }

    return NextResponse.json({ success: true, previewUrl }, { status: 200 })
  } catch (error) {
    console.error('Confirm Purchase Error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
