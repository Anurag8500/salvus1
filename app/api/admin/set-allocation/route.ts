import { NextResponse } from "next/server";
import { escrowContract } from "@/lib/blockchain";
import { ethers } from "ethers";

export async function POST(req: Request) {
  try {
    const { beneficiary, amount } = await req.json();

    if (!ethers.isAddress(beneficiary)) {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    }

    const amountWei = ethers.parseUnits(amount.toString(), 6);

    const tx = await escrowContract.setAllocation(
      beneficiary,
      amountWei
    );

    await tx.wait();

    return NextResponse.json({
      success: true,
      txHash: tx.hash,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
