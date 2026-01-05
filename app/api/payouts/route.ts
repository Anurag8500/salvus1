import { connectDB } from "@/src/lib/db";
import Payout from "@/src/models/Payout";

export async function GET() {
  try {
    await connectDB();

    const payouts = await Payout.find()
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      success: true,
      data: payouts,
    });
  } catch (err: any) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
