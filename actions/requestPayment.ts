import { ethers } from "ethers";
import SalvusEscrowABI from "@/lib/abis/SalvusEscrow.json";
import { connectWallet } from "@/lib/wallet";

export async function requestPayment(amount: string) {
  // 1️⃣ Connect wallet
  const { signer } = await connectWallet();

  // 2️⃣ Get beneficiary address
  const beneficiaryAddress = await signer.getAddress();

  // 3️⃣ Optional: Ask backend if allowed
  const res = await fetch(
    `/api/beneficiary/status?address=${beneficiaryAddress}`
  );
  const data = await res.json();

  if (Number(amount) > Number(data.remaining)) {
    throw new Error("Amount exceeds remaining allocation");
  }

  // 4️⃣ Call smart contract
  const escrow = new ethers.Contract(
    process.env.NEXT_PUBLIC_ESCROW_ADDRESS!,
    (SalvusEscrowABI as any).abi,
    signer
  );

  const tx = await escrow.requestPayment(
    ethers.parseUnits(amount, 6)
  );

  await tx.wait();

  return tx.hash;
}
