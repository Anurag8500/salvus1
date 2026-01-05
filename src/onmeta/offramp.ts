import axios from "axios";
import crypto from "crypto";

// -------------------------------
// ENV VALIDATION (CRITICAL)
// -------------------------------
const BASE_URL = process.env.ONMETA_BASE_URL;
const API_KEY = process.env.ONMETA_API_KEY;
const SECRET_RAW = process.env.ONMETA_SECRET;

if (!BASE_URL || !API_KEY || !SECRET_RAW) {
  throw new Error(
    "❌ Onmeta env vars missing. Check ONMETA_BASE_URL, ONMETA_API_KEY, ONMETA_SECRET"
  );
}

// ✅ TypeScript now KNOWS this is a string
const SECRET: string = SECRET_RAW;

// -------------------------------
// SIGN PAYLOAD
// -------------------------------
function signPayload(payload: string): string {
  return crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");
}

// -------------------------------
// OFF-RAMP INITIATION
// -------------------------------
export async function initiateOffRamp({
  amountInr,
  beneficiary,
  txHash,
}: {
  amountInr: number;
  beneficiary: string;
  txHash: string;
}) {
  const payloadObject = {
    amount: amountInr,
    crypto: "USDC",
    network: "polygon",
    referenceId: txHash,
    beneficiaryAddress: beneficiary,
  };

  const payload = JSON.stringify(payloadObject);
  const signature = signPayload(payload);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/offramp/initiate`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "x-signature": signature,
        },
        timeout: 10_000,
      }
    );

    console.log("🏦 Onmeta response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Onmeta off-ramp failed");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error(error.message);
    }

    throw error;
  }
}
