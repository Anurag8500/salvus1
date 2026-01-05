import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  donor: String,
  inrAmount: Number,
  usdcAmount: Number,
  txHash: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Donation ||
  mongoose.model("Donation", DonationSchema);
