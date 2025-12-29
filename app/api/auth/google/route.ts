import { NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)

export async function POST(req: Request) {
  try {
    const { credential } = await req.json()

    if (!credential) {
      return NextResponse.json(
        { message: 'Google credential is required' },
        { status: 400 }
      )
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()

    if (!payload) {
      return NextResponse.json(
        { message: 'Invalid Google token' },
        { status: 400 }
      )
    }

    const { email, name, sub: googleId, picture } = payload

    if (!email) {
      return NextResponse.json(
        { message: 'Email not found in Google token' },
        { status: 400 }
      )
    }

    await dbConnect()

    let user = await User.findOne({ email })

    if (user) {
      let updated = false
      if (!user.googleId) {
        user.googleId = googleId
        updated = true
      }
      if (!user.profilePicture && picture) {
        user.profilePicture = picture
        updated = true
      }
      user.authProvider = 'google'
      if (updated) {
        await user.save()
      }
    } else {
      user = await User.create({
        name,
        email,
        googleId,
        profilePicture: picture,
        authProvider: 'google',
        isVerified: true,
        requiresPasswordSetup: true,
      })
    }

    if (!user.password || user.requiresPasswordSetup) {
      const pwdToken = jwt.sign(
        { userId: user._id, type: 'pwd_setup' },
        process.env.JWT_SECRET!,
        { expiresIn: '30m' }
      )
      const response = NextResponse.json(
        { needsPasswordSetup: true },
        { status: 200 }
      )
      response.cookies.set('pwd_setup_token', pwdToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 60,
        path: '/',
      })
      return response
    } else {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '30d' }
      )
      const response = NextResponse.json(
        { message: 'Login successful', user: { name: user.name, email: user.email } },
        { status: 200 }
      )
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      return response
    }

  } catch (error) {
    console.error('Google Auth Error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
