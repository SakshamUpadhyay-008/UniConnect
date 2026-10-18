import mongoose from 'mongoose';

const verificationRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      index: true,
    },
    membershipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CollegeMembership',
    },
    employmentClaimId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmploymentClaim',
    },
    verificationType: {
      type: String,
      enum: ['collegeAffiliation', 'employment'],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'inReview', 'verified', 'rejected', 'expired'],
      default: 'pending',
      index: true,
    },
    verificationMethod: {
      type: String,
      enum: [
        'official_email_token',
        'admin_manual_review',
        'institutional_sso',
        'employment_document',
        'corporate_domain_check',
      ],
      required: true,
    },
    // Sensitive evidence references are NOT selected by default to protect privacy
    evidenceReference: {
      type: String,
      select: false,
    },
    reviewerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewerNotes: {
      type: String,
      select: false,
      maxlength: 2000,
    },
    verifiedAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

verificationRecordSchema.index({ userId: 1, status: 1, verificationType: 1 });

export default mongoose.models.VerificationRecord ||
  mongoose.model('VerificationRecord', verificationRecordSchema);
