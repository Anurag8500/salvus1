import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { initiateOnRamp } from "@/src/onmeta/onramp";
import SalvusEscrowABI from "@/lib/abis/SalvusEscrow.json";
import Donation from "@/src/models/Donation";
import Campaign from "@/models/Campaign";
import { connectDB } from "@/src/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    let payload: any;
    try {
      payload = jwt.verify(token.value, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = payload.userId;

    // 📥 2️⃣ Read request body
    const { amountInr, campaignId } = await req.json();

    if (!amountInr || !campaignId) {
      throw new Error("Missing amountInr or campaignId");
    }

    // 🗄️ 3️⃣ DB connection
    await connectDB();

    const userDoc = await User.findById(userId).select("name");
    const userName = userDoc?.name || "Donor";

    // 🎯 4️⃣ Fetch campaign
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    // 🌐 5️⃣ Env checks
    const {
      RPC_URL,
      PRIVATE_KEY,
      ESCROW_ADDRESS,
      MOCK_USDC_ADDRESS,
    } = process.env;

    const envMissing =
      !RPC_URL || !PRIVATE_KEY || !ESCROW_ADDRESS || !MOCK_USDC_ADDRESS;

    // 💱 6️⃣ DEMO ON-RAMP (INR → USDC)
    const onrampResult = await initiateOnRamp({
      donor: userName,
      amountInr,
    });

    // If blockchain env is missing, store donation in demo mode and return success
    if (envMissing) {
      await Donation.create({
        userId,
        userName,
        campaignId: campaign._id,
        campaignName: campaign.name,
        inrAmount: amountInr,
        usdcAmount: onrampResult.usdcAmount,
        txHash: `demo-${Date.now()}`,
        status: "SUCCESS",
      });
      return NextResponse.json({
        success: true,
        message: "Donation recorded (demo mode)",
        txHash: `demo-${Date.now()}`,
        usdcAmount: onrampResult.usdcAmount,
      });
    }

    // 🔗 7️⃣ Blockchain setup
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const escrow = new ethers.Contract(
      ESCROW_ADDRESS,
      SalvusEscrowABI.abi,
      wallet
    );

    const usdc = new ethers.Contract(
      MOCK_USDC_ADDRESS,
      [
        "function approve(address spender, uint256 amount) external returns (bool)",
      ],
      wallet
    );

    // 🔢 8️⃣ Convert USDC → 6 decimals
    const usdcAmount = ethers.parseUnits(
      onrampResult.usdcAmount.toString(),
      6
    );

    // ✅ 9️⃣ Approve
    const approveTx = await usdc.approve(ESCROW_ADDRESS, usdcAmount);
    await approveTx.wait();

    // 💸 🔟 Donate
    const donateTx = await escrow.donate(usdcAmount);
    await donateTx.wait();

    // 🗄️ 1️⃣1️⃣ Store donation (IMPORTANT)
    await Donation.create({
      userId,
      userName,
      campaignId: campaign._id,
      campaignName: campaign.name,
      inrAmount: amountInr,
      usdcAmount: onrampResult.usdcAmount,
      txHash: donateTx.hash,
      status: "SUCCESS",
    });

    return NextResponse.json({
      success: true,
      message: "Donation successful",
      txHash: donateTx.hash,
      usdcAmount: onrampResult.usdcAmount,
    });

  } catch (err: any) {
    console.error("Donate API error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
