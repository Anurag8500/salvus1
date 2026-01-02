import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Vendor from '@/models/Vendor'
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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    const { id } = params

    let vendor = null

    if (mongoose.Types.ObjectId.isValid(id)) {
      vendor = await Vendor.findOne({ _id: id, createdBy: user.userId }).populate('campaignId', 'name')
    }
    if (!vendor) {
      vendor = await Vendor.findOne({ storeId: id, createdBy: user.userId }).populate('campaignId', 'name')
    }

    if (!vendor) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(vendor, { status: 200 })
  } catch (error: any) {
    console.error('Vendors [id] GET Error:', error)
    const message = error.message || 'Internal Server Error'
    return NextResponse.json({ message }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    await dbConnect()
    const { id } = params

    let vendor = null
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id, createdBy: user.userId }
      : { storeId: id, createdBy: user.userId }

    vendor = await Vendor.findOneAndUpdate(
      query,
      { $set: body },
      { new: true }
    )

    if (!vendor) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(vendor, { status: 200 })
  } catch (error: any) {
    console.error('Vendors [id] PATCH Error:', error)
    const message = error.message || 'Internal Server Error'
    return NextResponse.json({ message }, { status: 500 })
  }
}
