import { escrowContract } from "./blockchain";

escrowContract.on(
  "PaymentReleased",
  async (beneficiary, payoutWallet, amount) => {
    console.log("Payment released:", {
      beneficiary,
      payoutWallet,
      amount: amount.toString(),
    });

    // 🔜 NEXT STEP:
    // Call Onmeta off-ramp here
  }
);
