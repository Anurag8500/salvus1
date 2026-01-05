// src/onmeta/onramp.ts

export async function initiateOnRamp({
  donor,
  amountInr,
}: {
  donor: string;
  amountInr: number;
}) {
  // 🔁 DEMO FX RATE (same idea as off-ramp)
  const FX_RATE = 83; // 1 USDC = ₹83
  const usdcAmount = Number((amountInr / FX_RATE).toFixed(2));

  console.log("🟢 DEMO ON-RAMP INITIATED");
  console.log("  Donor:", donor);
  console.log("  INR Paid:", amountInr);
  console.log("  USDC Minted:", usdcAmount);

  return {
    status: "SUCCESS",
    donor,
    amountInr,
    usdcAmount,
  };
}
