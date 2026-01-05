import { NextResponse } from "next/server";
import { escrowContract } from "@/lib/blockchain";
import { ethers } from "ethers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address || !ethers.isAddress(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }

  const remaining = await escrowContract.getRemainingAllocation(address);

  return NextResponse.json({
    remaining: ethers.formatUnits(remaining, 6),
  });
}
