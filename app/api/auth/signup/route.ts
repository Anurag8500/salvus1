import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Please provide all fields' },
        { status: 400 }
      )
    }

    await dbConnect()

    const userExists = await User.findOne({ email })

    if (userExists) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const verificationToken = crypto.randomBytes(32).toString('hex')

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    })

    await sendVerificationEmail(user.email, user.verificationToken)

    return NextResponse.json(
      { message: 'User created successfully. Please verify your email.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
