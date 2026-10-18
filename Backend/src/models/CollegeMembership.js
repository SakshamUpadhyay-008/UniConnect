import mongoose from 'mongoose';

const collegeMembershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: [true, 'College reference is required'],
    },
    relationshipType: {
      type: String,
      enum: ['student', 'alumni'],
      required: [true, 'Relationship type must be student or alumni'],
    },
    studentIdReference: {
      type: String,
      select: false,
    },
    department: {
      type: String,
      required: [true, 'Academic department is required'],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, 'Degree program is required'],
      trim: true,
    },
    graduationYear: {
      type: Number,
    },
    enrollmentYear: {
      type: Number,
    },
    affiliationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected', 'expired'],
      default: 'pending',
    },
    verificationMethod: {
      type: String,
      default: 'pendingVerification',
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

// Prevent duplicate active memberships for the same user and college
collegeMembershipSchema.index({ userId: 1, collegeId: 1 }, { unique: true });
collegeMembershipSchema.index({ collegeId: 1, affiliationStatus: 1, relationshipType: 1 });

export default mongoose.models.CollegeMembership ||
  mongoose.model('CollegeMembership', collegeMembershipSchema);
