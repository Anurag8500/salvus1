import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { initiateOnRamp } from "@/src/onmeta/onramp";
import SalvusEscrowABI from "@/artifacts/contracts/SalvusEscrow.sol/SalvusEscrow.json";
import Donation from "@/src/models/Donation";
import { connectDB } from "@/src/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { donor, amountInr } = await req.json();

    if (!donor || !amountInr) {
      throw new Error("Missing donor or amountInr");
    }

    const {
      RPC_URL,
      PRIVATE_KEY,
      ESCROW_ADDRESS,
      MOCK_USDC_ADDRESS,
    } = process.env;

    if (!RPC_URL || !PRIVATE_KEY || !ESCROW_ADDRESS || !MOCK_USDC_ADDRESS) {
      throw new Error("Missing required blockchain env variables");
    }

    // 1️⃣ DEMO ON-RAMP (INR → USDC)
    const onrampResult = await initiateOnRamp({ donor, amountInr });

    // 2️⃣ Blockchain setup
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    // 3️⃣ Attach contracts
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

    // 4️⃣ Convert USDC → 6 decimals
    const usdcAmount = ethers.parseUnits(
      onrampResult.usdcAmount.toString(),
      6
    );

    // 5️⃣ APPROVE
    const approveTx = await usdc.approve(ESCROW_ADDRESS, usdcAmount);
    console.log("🟢 Approve tx sent:", approveTx.hash);
    await approveTx.wait();

    // 6️⃣ DONATE
    const donateTx = await escrow.donate(usdcAmount);
    console.log("🟢 Donate tx sent:", donateTx.hash);
    await donateTx.wait();

    // 7️⃣ STORE DONATION IN DB (🔥 IMPORTANT)
    await connectDB();

    await Donation.create({
      donor,
      inrAmount: amountInr,
      usdcAmount: onrampResult.usdcAmount,
      txHash: donateTx.hash,
      status: "SUCCESS",
    });

    console.log("🗄️ Donation stored in DB");

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
