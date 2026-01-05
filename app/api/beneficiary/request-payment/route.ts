import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Beneficiary from '@/models/Beneficiary'
import Campaign from '@/models/Campaign'
import Vendor from '@/models/Vendor'
import Transaction from '@/models/Transaction'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import mongoose from 'mongoose'

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

    const { category, storeId, amount } = await req.json()
    if (!category || !storeId || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
    }

    await dbConnect()

    const beneficiary = await Beneficiary.findOne({ userId: user.userId })
    if (!beneficiary) {
      return NextResponse.json({ message: 'Beneficiary not found' }, { status: 404 })
    }
    if (beneficiary.status !== 'Approved') {
      return NextResponse.json({ message: 'Beneficiary not approved' }, { status: 403 })
    }

    const campaign = await Campaign.findById(beneficiary.campaignId)
    if (!campaign) {
      return NextResponse.json({ message: 'Campaign not found' }, { status: 404 })
    }

    let vendor = await Vendor.findOne({ storeId, campaignId: campaign._id, status: 'Approved' })
    if (!vendor) {
      vendor = await Vendor.findOne({ name: storeId, campaignId: campaign._id, status: 'Approved' })
    }
    if (!vendor) {
      return NextResponse.json({ message: 'Vendor not approved for this campaign' }, { status: 400 })
    }
    if (vendor.authorizedCategories && vendor.authorizedCategories.length > 0) {
      if (!vendor.authorizedCategories.includes(category)) {
        return NextResponse.json({ message: 'Vendor not authorized for selected category' }, { status: 400 })
      }
    }

    if (Array.isArray(campaign.categories) && campaign.categories.length) {
      if (!campaign.categories.includes(category)) {
        return NextResponse.json({ message: 'Category not allowed in this campaign' }, { status: 400 })
      }
    }

    const beneficiaryCap = campaign.beneficiaryCap || 0
    const beneficiarySpent = beneficiary.totalSpent || 0
    const beneficiaryRemaining = Math.max(0, beneficiaryCap - beneficiarySpent)
    if (amount > beneficiaryRemaining) {
      return NextResponse.json({ message: 'Amount exceeds beneficiary remaining allocation' }, { status: 400 })
    }

    const campaignRemaining = Math.max(0, (campaign.fundsRaised || 0) - (campaign.fundsSpent || 0))
    if (amount > campaignRemaining) {
      return NextResponse.json({ message: 'Amount exceeds campaign remaining funds' }, { status: 400 })
    }

    let categoryRemaining = Infinity
    if (campaign.categoryLimits && (campaign.categoryLimits as Map<string, number>).size > 0) {
      const limit = (campaign.categoryLimits as Map<string, number>).get(category) || 0
      if (limit > 0) {
        const spentAgg = await Transaction.aggregate([
          { $match: { beneficiaryId: new mongoose.Types.ObjectId(beneficiary._id), category } },
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ])
        const spent = spentAgg[0]?.total || 0
        categoryRemaining = Math.max(0, limit - spent)
        if (amount > categoryRemaining) {
          return NextResponse.json({ message: 'Amount exceeds category remaining allocation' }, { status: 400 })
        }
      }
    }

    const txn = await Transaction.create({
      campaignId: campaign._id,
      beneficiaryId: beneficiary._id,
      vendorId: vendor._id,
      amount,
      category,
      status: 'Pending',
      timestamp: new Date(),
    })

    return NextResponse.json({
      success: true,
      transactionId: txn._id,
      checks: {
        beneficiaryCap,
        beneficiarySpent,
        beneficiaryRemaining,
        campaignRemaining,
        categoryRemaining: isFinite(categoryRemaining) ? categoryRemaining : null,
      },
      next: 'Call requestPayment on the client wallet and wait for on-chain event',
    }, { status: 200 })
  } catch (error) {
    console.error('Beneficiary Request Payment POST Error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
