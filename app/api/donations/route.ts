import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Donation from "@/src/models/Donation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectDB();
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    let payload: any;
    try {
      payload = jwt.verify(token.value, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const donations = await Donation.find({ userId: payload.userId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: donations });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
