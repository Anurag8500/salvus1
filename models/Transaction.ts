import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true,
  },
  beneficiaryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beneficiary',
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  usdcAmount: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['Pending', 'VendorConfirmed', 'Completed', 'Failed'],
    default: 'Pending',
  },
  confirmationToken: {
    type: String,
  },
  confirmedAt: {
    type: Date,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)
