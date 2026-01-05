import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  campaignName: {
    type: String,
    required: true,
  },
  inrAmount: Number,
  usdcAmount: Number,
  txHash: String,
  status: {
    type: String,
    default: "SUCCESS",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
