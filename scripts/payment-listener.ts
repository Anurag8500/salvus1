import { ethers } from "ethers";
import * as dotenv from "dotenv";
import SalvusEscrowArtifact from "../artifacts/contracts/SalvusEscrow.sol/SalvusEscrow.json";
import { initiateDemoOffRamp } from "../src/onmeta/demo-offramp";
import Payout from "../src/models/Payout";
import { connectDB } from "../src/lib/db";

dotenv.config();

async function main() {
  // 1️⃣ Connect DB once
  await connectDB();

  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const escrowAddress = process.env.ESCROW_ADDRESS!;

  if (!escrowAddress) {
    throw new Error("ESCROW_ADDRESS missing in .env");
  }

  const iface = new ethers.Interface(SalvusEscrowArtifact.abi);

  const eventFragment = iface.getEvent("PaymentReleased");
  if (!eventFragment) {
    throw new Error("PaymentReleased event not found in ABI");
  }

  const eventTopic = eventFragment.topicHash;

  console.log("👂 Polling for PaymentReleased events (DEMO MODE)...");

  let lastBlock = await provider.getBlockNumber();

  // 🔒 Prevent double-processing (runtime)
  const processedTxs = new Set<string>();

  setInterval(async () => {
    try {
      const currentBlock = await provider.getBlockNumber();
      if (currentBlock <= lastBlock) return;

      const logs = await provider.getLogs({
        address: escrowAddress,
        fromBlock: lastBlock + 1,
        toBlock: currentBlock,
        topics: [eventTopic],
      });

      for (const log of logs) {
        if (processedTxs.has(log.transactionHash)) continue;

        const parsed = iface.parseLog(log);
        if (!parsed) continue;

        const beneficiary = parsed.args.beneficiary;
        const payoutWallet = parsed.args.payoutWallet;
        const amount = parsed.args.amount;

        const usdcAmount = Number(ethers.formatUnits(amount, 6));

        console.log("💸 Payment Released:");
        console.log("  Beneficiary:", beneficiary);
        console.log("  Payout Wallet:", payoutWallet);
        console.log("  Amount (USDC):", usdcAmount);
        console.log("  Tx Hash:", log.transactionHash);

        // 🔁 DEMO FX rate (mock)
        const inrAmount = Math.round(usdcAmount * 83);

        // 2️⃣ DEMO off-ramp
        const result = await initiateDemoOffRamp({
          amountInr: inrAmount,
          beneficiary,
          txHash: log.transactionHash,
        });

        console.log("🟢 DEMO Off-ramp completed:", result);

        // 3️⃣ STORE payout in MongoDB (CRITICAL)
        await Payout.create({
          beneficiary,
          payoutWallet,
          usdcAmount,
          inrAmount,
          txHash: log.transactionHash,
          status: "SUCCESS",
        });

        console.log("🗄️ Payout stored in DB");

        processedTxs.add(log.transactionHash);
      }

      lastBlock = currentBlock;
    } catch (err) {
      console.error("Polling error:", err);
    }
  }, 10_000);
}

main().catch(console.error);
