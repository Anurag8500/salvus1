import mongoose from "mongoose";

const PayoutSchema = new mongoose.Schema({
  beneficiary: String,
  payoutWallet: String,
  usdcAmount: Number,
  inrAmount: Number,
  txHash: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Payout ||
  mongoose.model("Payout", PayoutSchema);
