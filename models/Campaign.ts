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
  stateRegion: {
    type: String,
    required: true,
  },
  district: {
    type: String,
  },
  managedBy: {
    type: String,
    default: 'Salvus Relief',
  },
  disasterType: {
    type: String,
    required: true,
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
  beneficiaryCap: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  fundsRaised: {
    type: Number,
    default: 0,
  },
  categories: {
    type: [String],
    validate: [(v: string[]) => Array.isArray(v) && v.length > 0, 'Allowed categories are required'],
    default: undefined,
  },
  categoryLimits: {
    type: Map,
    of: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
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

CampaignSchema.path('categoryLimits').validate(function (this: any, v: Map<string, number>) {
  if (!this.categories || !Array.isArray(this.categories) || this.categories.length === 0) return false
  for (const cat of this.categories) {
    const val = v?.get(cat)
    if (typeof val !== 'number' || !(val > 0)) return false
  }
  const sum = Array.from((v || new Map()).values()).reduce((a, b) => a + b, 0)
  return sum === this.beneficiaryCap
}, 'Category limits must be provided for all allowed categories')

CampaignSchema.path('beneficiaryCap').validate(function (this: any, v: number) {
  return typeof v === 'number' && v < this.totalFundsAllocated
}, 'Per-beneficiary cap must be less than total campaign budget')

export default mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema)
