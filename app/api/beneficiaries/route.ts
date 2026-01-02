import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Beneficiary from '@/models/Beneficiary'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import User from '@/models/User'

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

export async function POST(req: Request) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    await dbConnect()

    // Check if email already exists in User collection
    const existingUser = await User.findOne({ email: body.email })
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered in system' }, { status: 400 })
    }

    // Generate random BEN ID
    const beneficiaryId = `BEN-${Math.floor(1000 + Math.random() * 9000)}`

    // Create User account for Beneficiary
    // Password is blank, user must verify and set up password later
    const newUser = await User.create({
      name: body.fullName,
      email: body.email,
      password: "",
      role: 'Beneficiary',
      isVerified: false,
      requiresPasswordSetup: true
    })

    const beneficiary = await Beneficiary.create({
      ...body,
      userId: newUser._id, // Link to User account
      beneficiaryId,
      createdBy: user.userId,
      activityLog: [{
        action: 'Created',
        details: `Beneficiary onboarded by ${user.email}`,
        timestamp: new Date()
      }]
    })

    return NextResponse.json(beneficiary, { status: 201 })
  } catch (error) {
    console.error('Beneficiaries POST Error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
