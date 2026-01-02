import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Campaign from '@/models/Campaign'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

// Helper to get user from token
async function getUser() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) return null

  try {
    const decoded: any = jwt.verify(token.value, process.env.JWT_SECRET!)
    return decoded
  } catch (error) {
    return null
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect()
    
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const campaigns = await Campaign.find({ createdBy: user.userId }).sort({ createdAt: -1 })

    return NextResponse.json(campaigns, { status: 200 })
  } catch (error) {
    console.error('Campaigns GET Error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    await dbConnect()

    // Create Campaign
    const campaign = await Campaign.create({
      ...body,
      createdBy: user.userId,
    })

    return NextResponse.json(campaign, { status: 201 })
  } catch (error: any) {
    console.error('Campaigns POST Error:', error)
    const message = error.message || 'Internal Server Error'
    return NextResponse.json({ message }, { status: error.name === 'ValidationError' ? 400 : 500 })
  }
}
