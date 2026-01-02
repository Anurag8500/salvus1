import mongoose from 'mongoose'

const CampaignSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a campaign name'],
  },
  slug: {
    type: String,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  managedBy: {
    type: String, // NGO Name or Organization
    default: 'Salvus Relief',
  },
  status: {
    type: String,
    enum: ['Active', 'Paused', 'Closed'],
    default: 'Active',
  },
  totalFundsAllocated: {
    type: Number,
    default: 0,
  },
  fundsRaised: {
    type: Number,
    default: 0,
  },
  categories: {
    type: [String],
    default: ['Food', 'Medicine', 'Shelter', 'Transport'],
  },
  description: {
    type: String,
  },
  urgency: {
    type: String,
    enum: ['High', 'Medium', 'Low', 'Critical'],
    default: 'High',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

CampaignSchema.pre('save', function() {
  if (this.name && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
});

export default mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema)
