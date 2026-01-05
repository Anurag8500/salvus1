import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import SalvusEscrowABI from "@/lib/abis/SalvusEscrow.json";

export async function POST(req: NextRequest) {
  try {
    const { beneficiary, amount } = await req.json();

    if (!beneficiary || !amount) {
      return NextResponse.json(
        { error: "Missing beneficiary or amount" },
        { status: 400 }
      );
    }

    if (!ethers.isAddress(beneficiary)) {
      return NextResponse.json(
        { error: "Invalid beneficiary address" },
        { status: 400 }
      );
    }

    // ✅ CREATE PROVIDER & WALLET AT RUNTIME (CRITICAL)
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY!,
      provider
    );

    const escrow = new ethers.Contract(
      process.env.ESCROW_ADDRESS!,
      SalvusEscrowABI.abi,
      wallet
    );

    const allocationWei = ethers.parseUnits(amount.toString(), 6);

    const tx = await escrow.setAllocation(
      beneficiary,
      allocationWei
    );

    await tx.wait();

    return NextResponse.json({
      success: true,
      txHash: tx.hash,
    });
  } catch (err: any) {
    console.error("set-allocation error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
