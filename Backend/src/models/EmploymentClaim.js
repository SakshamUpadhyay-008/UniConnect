import mongoose from 'mongoose';

const employmentClaimSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    employerName: {
      type: String,
      required: [true, 'Employer name is required'],
      trim: true,
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    isCurrent: {
      type: Boolean,
      default: true,
    },
    claimStatus: {
      type: String,
      enum: ['selfReported', 'pending', 'verified', 'rejected', 'expired'],
      default: 'selfReported',
    },
    verificationMethod: {
      type: String,
      default: 'none',
    },
    verifiedAt: {
      type: Date,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

employmentClaimSchema.index({ userId: 1, isCurrent: 1 });
employmentClaimSchema.index({ claimStatus: 1 });

export default mongoose.models.EmploymentClaim ||
  mongoose.model('EmploymentClaim', employmentClaimSchema);
