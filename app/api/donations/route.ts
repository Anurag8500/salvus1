import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Donation from "@/src/models/Donation";

export async function GET() {
  try {
    await connectDB();
    const donations = await Donation.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: donations });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
