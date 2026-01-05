export async function initiateDemoOffRamp({
  amountInr,
  beneficiary,
  txHash,
}: {
  amountInr: number;
  beneficiary: string;
  txHash: string;
}) {
  console.log("🟢 DEMO OFF-RAMP INITIATED");

  return {
    status: "SUCCESS",
    referenceId: txHash,
    amountInr,
    beneficiary,
    processedAt: new Date().toISOString(),
  };
}
