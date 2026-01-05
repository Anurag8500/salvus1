import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Beneficiary from '@/models/Beneficiary'
import Campaign from '@/models/Campaign'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

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

export async function GET() {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const beneficiary = await Beneficiary.findOne({ userId: user.userId })
    if (!beneficiary) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }

    const campaign = await Campaign.findById(beneficiary.campaignId)
    if (!campaign) {
      return NextResponse.json({ message: 'Campaign not found' }, { status: 404 })
    }

    const beneficiaryCap = campaign.beneficiaryCap || 0
    const beneficiarySpent = beneficiary.totalSpent || 0
    const beneficiaryRemaining = Math.max(0, beneficiaryCap - beneficiarySpent)
    const campaignRemaining = Math.max(0, (campaign.fundsRaised || 0) - (campaign.fundsSpent || 0))

    return NextResponse.json({
      beneficiaryCap,
      beneficiarySpent,
      beneficiaryRemaining,
      campaignRemaining,
    }, { status: 200 })
  } catch (error) {
    console.error('Beneficiary Status GET Error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
